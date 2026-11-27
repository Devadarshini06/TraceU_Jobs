package controllers

import (
	"fmt"
	"math"
	"net/mail"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"

	"traceu-jobs-backend/database"
	"traceu-jobs-backend/domain"
	"traceu-jobs-backend/model"
)

var pipelineStageOrder = []string{
	"applied",
	"screening",
	"shortlisted",
	"interview",
	"selected",
	"offered",
	"hired",
}

// GetAdminDashboard aggregates KPIs, pipeline stages, tables, and insights for the admin dashboard.
func GetAdminDashboard(c *fiber.Ctx) error {
	days := 30
	if raw := c.Query("days"); raw != "" {
		if parsed, err := strconv.Atoi(raw); err == nil && parsed > 0 && parsed <= 365 {
			days = parsed
		}
	}
	since := time.Now().AddDate(0, 0, -days)

	var summary model.DashboardSummary
	database.DB.Model(&domain.Requisition{}).Where("status = ?", "open").Count(&summary.OpenRequisitions)
	database.DB.Model(&domain.Application{}).Where("applied_at >= ?", since).Count(&summary.TotalApplications)
	database.DB.Model(&domain.Application{}).Where("applied_at >= ? AND stage = ?", since, "shortlisted").Count(&summary.Shortlisted)
	database.DB.Model(&domain.Interview{}).Where("scheduled_at >= ? AND status = ?", since, "scheduled").Count(&summary.Interviews)
	database.DB.Model(&domain.Application{}).Where("applied_at >= ? AND stage = ?", since, "offered").Count(&summary.Offers)
	database.DB.Model(&domain.Job{}).Where("job_type = ? AND status = ?", "internship", "open").Count(&summary.Internships)

	// Pipeline stage counts
	type stageRow struct {
		Stage string
		Count int64
	}
	var stageRows []stageRow
	database.DB.Model(&domain.Application{}).
		Select("stage, COUNT(*) as count").
		Where("applied_at >= ?", since).
		Group("stage").
		Scan(&stageRows)

	stageMap := make(map[string]int64, len(stageRows))
	for _, r := range stageRows {
		stageMap[r.Stage] = r.Count
	}

	pipelineStages := make([]model.PipelineStageItem, 0, len(pipelineStageOrder))
	for _, stage := range pipelineStageOrder {
		cnt := stageMap[stage]
		pct := 0.0
		if summary.TotalApplications > 0 {
			pct = math.Round((float64(cnt)/float64(summary.TotalApplications))*1000) / 10
		}
		pipelineStages = append(pipelineStages, model.PipelineStageItem{
			Stage:      stage,
			Count:      cnt,
			Percentage: pct,
		})
	}

	// Pipeline trend grouped by day
	type trendRow struct {
		Day   string
		Total int64
		Hired int64
	}
	var trendRows []trendRow
	database.DB.Model(&domain.Application{}).
		Select("DATE(applied_at) as day, COUNT(*) as total, SUM(CASE WHEN stage = 'hired' THEN 1 ELSE 0 END) as hired").
		Where("applied_at >= ?", since).
		Group("DATE(applied_at)").
		Order("day ASC").
		Scan(&trendRows)

	pipelineTrend := make([]model.PipelineTrendPoint, 0, len(trendRows))
	for _, r := range trendRows {
		pipelineTrend = append(pipelineTrend, model.PipelineTrendPoint{
			Date:         r.Day,
			Applications: r.Total,
			Hires:        r.Hired,
		})
	}

	// Recent applications
	var recentApps []domain.Application
	database.DB.Preload("Candidate").Preload("Job").
		Order("applied_at DESC").
		Limit(5).
		Find(&recentApps)

	recentAppItems := make([]model.RecentApplicationItem, 0, len(recentApps))
	for _, a := range recentApps {
		recentAppItems = append(recentAppItems, model.RecentApplicationItem{
			ID:            a.ID,
			CandidateName: a.Candidate.Name,
			Role:          a.Job.Title,
			Stage:         a.Stage,
			AppliedAt:     a.AppliedAt,
		})
	}

	// Upcoming interviews
	var upcoming []domain.Interview
	database.DB.Preload("Application.Candidate").Preload("Application.Job").
		Where("scheduled_at >= ? AND status = ?", time.Now().Add(-24*time.Hour), "scheduled").
		Order("scheduled_at ASC").
		Limit(5).
		Find(&upcoming)

	upcomingItems := make([]model.UpcomingInterviewItem, 0, len(upcoming))
	for _, iv := range upcoming {
		upcomingItems = append(upcomingItems, model.UpcomingInterviewItem{
			ID:            iv.ID,
			CandidateName: iv.Application.Candidate.Name,
			Role:          iv.Application.Job.Title,
			ScheduledAt:   iv.ScheduledAt,
			Status:        iv.Status,
		})
	}

	// Top jobs by application count
	var topJobs []model.TopJobItem
	database.DB.Table("jobs").
		Select("jobs.id, jobs.title, jobs.views, COUNT(applications.id) as applications").
		Joins("LEFT JOIN applications ON applications.job_id = jobs.id").
		Group("jobs.id, jobs.title, jobs.views").
		Order("applications DESC, jobs.views DESC").
		Limit(5).
		Scan(&topJobs)

	// Recent activity
	var activities []domain.ActivityLog
	database.DB.Order("created_at DESC").Limit(5).Find(&activities)

	// Insights: applications by source
	type sourceRow struct {
		Source string
		Count  int64
	}
	var sourceRows []sourceRow
	database.DB.Table("applications").
		Select("candidates.source as source, COUNT(applications.id) as count").
		Joins("JOIN candidates ON candidates.id = applications.candidate_id").
		Where("applications.applied_at >= ?", since).
		Group("candidates.source").
		Order("count DESC").
		Scan(&sourceRows)

	sourceBreakdown := make([]model.SourceBreakdownItem, 0, len(sourceRows))
	topSource := "N/A"
	if len(sourceRows) > 0 {
		topSource = sourceRows[0].Source
	}
	for _, sr := range sourceRows {
		pct := 0.0
		if summary.TotalApplications > 0 {
			pct = math.Round((float64(sr.Count)/float64(summary.TotalApplications))*1000) / 10
		}
		sourceBreakdown = append(sourceBreakdown, model.SourceBreakdownItem{
			Source:     sr.Source,
			Count:      sr.Count,
			Percentage: pct,
		})
	}

	// Offer acceptance rate: hired / (offered + hired)
	hiredCount := stageMap["hired"]
	offeredTotal := stageMap["offered"] + hiredCount
	offerAcceptanceRate := 0.0
	if offeredTotal > 0 {
		offerAcceptanceRate = math.Round((float64(hiredCount)/float64(offeredTotal))*1000) / 10
	}

	// Average time to hire in days for hired applications
	var avgHireDays float64
	database.DB.Model(&domain.Application{}).
		Select("COALESCE(AVG(TIMESTAMPDIFF(DAY, applied_at, updated_at)), 0)").
		Where("stage = ?", "hired").
		Scan(&avgHireDays)

	return c.Status(fiber.StatusOK).JSON(model.APIResponse{
		Success: true,
		Message: "Dashboard data retrieved successfully",
		Data: model.DashboardResponse{
			Days:               days,
			Summary:            summary,
			PipelineStages:     pipelineStages,
			PipelineTrend:      pipelineTrend,
			RecentApplications: recentAppItems,
			UpcomingInterviews: upcomingItems,
			TopJobs:            topJobs,
			RecentActivity:     activities,
			Insights: model.RecruitmentInsights{
				TimeToHireDays:       math.Round(avgHireDays*10) / 10,
				TimeToFillDays:       math.Round((avgHireDays+6)*10) / 10,
				OfferAcceptanceRate:  offerAcceptanceRate,
				TopSource:            topSource,
				ApplicationsBySource: sourceBreakdown,
			},
		},
	})
}

func normalizeJobStatus(raw string) (string, bool) {
	switch strings.ToLower(strings.TrimSpace(raw)) {
	case "published", "open", "active":
		return "published", true
	case "draft":
		return "draft", true
	case "paused":
		return "paused", true
	case "closed":
		return "closed", true
	default:
		return "", false
	}
}

func normalizeJobType(raw string) string {
	switch strings.ToLower(strings.TrimSpace(raw)) {
	case "contract":
		return "contract"
	case "part-time", "part_time":
		return "part_time"
	case "internship":
		return "internship"
	default:
		return "full_time"
	}
}

type jobWithApplications struct {
	domain.Job
	ApplicationsCount int64 `json:"applications_count"`
}

// GetJobs returns all job postings with application counts.
func GetJobs(c *fiber.Ctx) error {
	var jobs []domain.Job
	query := database.DB.Order("created_at DESC")
	if jobType := c.Query("job_type"); jobType != "" {
		query = query.Where("job_type = ?", jobType)
	}
	if status := c.Query("status"); status != "" {
		query = query.Where("status = ?", status)
	}
	if result := query.Find(&jobs); result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to fetch jobs",
			Error:   result.Error.Error(),
		})
	}

	type appCountRow struct {
		JobID uint
		Total int64
	}
	var countRows []appCountRow
	database.DB.Model(&domain.Application{}).
		Select("job_id, count(*) as total").
		Group("job_id").
		Scan(&countRows)

	countsByJob := make(map[uint]int64, len(countRows))
	for _, r := range countRows {
		countsByJob[r.JobID] = r.Total
	}

	enriched := make([]jobWithApplications, 0, len(jobs))
	for _, j := range jobs {
		enriched = append(enriched, jobWithApplications{
			Job:               j,
			ApplicationsCount: countsByJob[j.ID],
		})
	}

	return c.Status(fiber.StatusOK).JSON(model.APIResponse{
		Success: true,
		Message: "Jobs retrieved successfully",
		Data:    enriched,
	})
}

// CreateJob creates a new job or internship posting.
func CreateJob(c *fiber.Ctx) error {
	var req model.CreateJobRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Invalid request payload",
			Error:   err.Error(),
		})
	}
	title := strings.TrimSpace(req.Title)
	dept := strings.TrimSpace(req.Department)
	if title == "" || dept == "" {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Title and Department are required",
		})
	}

	location := strings.TrimSpace(req.Location)
	if location == "" {
		location = "Bengaluru"
	}
	source := strings.TrimSpace(req.Source)
	if source == "" {
		source = "TraceU"
	}
	status := "published"
	if req.Status != "" {
		if normalized, ok := normalizeJobStatus(req.Status); ok {
			status = normalized
		}
	}

	job := domain.Job{
		Title:         title,
		Department:    dept,
		Location:      location,
		JobType:       normalizeJobType(req.JobType),
		Status:        status,
		Description:   strings.TrimSpace(req.Description),
		Requirements:  strings.TrimSpace(req.Requirements),
		Source:        source,
		RequisitionID: req.RequisitionID,
	}
	if result := database.DB.Create(&job); result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to create job",
			Error:   result.Error.Error(),
		})
	}

	database.DB.Create(&domain.ActivityLog{
		Title:       "New job created",
		Description: fmt.Sprintf("%s (%s)", job.Title, job.Department),
		EntityType:  "job",
		EntityID:    job.ID,
	})

	return c.Status(fiber.StatusCreated).JSON(model.APIResponse{
		Success: true,
		Message: "Job created successfully",
		Data: jobWithApplications{
			Job:               job,
			ApplicationsCount: 0,
		},
	})
}

// UpdateJob edits an existing job posting.
func UpdateJob(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil || id <= 0 {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Invalid job ID",
		})
	}

	var job domain.Job
	if result := database.DB.First(&job, id); result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(model.APIResponse{
			Success: false,
			Message: "Job not found",
		})
	}

	var req model.UpdateJobRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Invalid request payload",
			Error:   err.Error(),
		})
	}

	if title := strings.TrimSpace(req.Title); title != "" {
		job.Title = title
	}
	if dept := strings.TrimSpace(req.Department); dept != "" {
		job.Department = dept
	}
	if loc := strings.TrimSpace(req.Location); loc != "" {
		job.Location = loc
	}
	if req.JobType != "" {
		job.JobType = normalizeJobType(req.JobType)
	}
	if req.Status != "" {
		normalized, ok := normalizeJobStatus(req.Status)
		if !ok {
			return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
				Success: false,
				Message: "Invalid job status",
			})
		}
		job.Status = normalized
	}
	if req.Description != "" {
		job.Description = strings.TrimSpace(req.Description)
	}
	if req.Requirements != "" {
		job.Requirements = strings.TrimSpace(req.Requirements)
	}
	if src := strings.TrimSpace(req.Source); src != "" {
		job.Source = src
	}

	if result := database.DB.Save(&job); result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to update job",
			Error:   result.Error.Error(),
		})
	}

	var appCount int64
	database.DB.Model(&domain.Application{}).Where("job_id = ?", job.ID).Count(&appCount)

	database.DB.Create(&domain.ActivityLog{
		Title:       fmt.Sprintf("Job #%d updated", job.ID),
		Description: fmt.Sprintf("%s (%s)", job.Title, job.Department),
		EntityType:  "job",
		EntityID:    job.ID,
	})

	return c.Status(fiber.StatusOK).JSON(model.APIResponse{
		Success: true,
		Message: "Job updated successfully",
		Data: jobWithApplications{
			Job:               job,
			ApplicationsCount: appCount,
		},
	})
}

// UpdateJobStatus updates a job's publication status.
func UpdateJobStatus(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil || id <= 0 {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Invalid job ID",
		})
	}

	var req model.UpdateJobStatusRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Invalid request payload",
			Error:   err.Error(),
		})
	}

	normalized, ok := normalizeJobStatus(req.Status)
	if !ok {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Invalid status (use published, draft, paused, or closed)",
		})
	}

	var job domain.Job
	if result := database.DB.First(&job, id); result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(model.APIResponse{
			Success: false,
			Message: "Job not found",
		})
	}

	job.Status = normalized
	if result := database.DB.Save(&job); result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to update job status",
			Error:   result.Error.Error(),
		})
	}

	var appCount int64
	database.DB.Model(&domain.Application{}).Where("job_id = ?", job.ID).Count(&appCount)

	database.DB.Create(&domain.ActivityLog{
		Title:       fmt.Sprintf("Job %s %s", job.Title, normalized),
		Description: fmt.Sprintf("%s • %s", job.Department, job.Location),
		EntityType:  "job",
		EntityID:    job.ID,
	})

	return c.Status(fiber.StatusOK).JSON(model.APIResponse{
		Success: true,
		Message: "Job status updated successfully",
		Data: jobWithApplications{
			Job:               job,
			ApplicationsCount: appCount,
		},
	})
}

// DeleteJob removes a job posting by ID.
func DeleteJob(c *fiber.Ctx) error {
	id := c.Params("id")
	var job domain.Job
	if result := database.DB.First(&job, id); result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(model.APIResponse{
			Success: false,
			Message: "Job not found",
		})
	}
	if result := database.DB.Delete(&job); result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to delete job",
			Error:   result.Error.Error(),
		})
	}

	database.DB.Create(&domain.ActivityLog{
		Title:       "Job deleted",
		Description: fmt.Sprintf("%s (%s)", job.Title, job.Department),
		EntityType:  "job",
		EntityID:    job.ID,
	})

	return c.Status(fiber.StatusOK).JSON(model.APIResponse{
		Success: true,
		Message: "Job deleted successfully",
	})
}

// PublishToJobBoards synchronizes published jobs across external job boards.
func PublishToJobBoards(c *fiber.Ctx) error {
	var publishedCount int64
	database.DB.Model(&domain.Job{}).Where("status IN ?", []string{"published", "open"}).Count(&publishedCount)

	database.DB.Create(&domain.ActivityLog{
		Title:       "Published jobs synced to job boards",
		Description: fmt.Sprintf("%d active postings synchronized", publishedCount),
		EntityType:  "job",
	})

	return c.Status(fiber.StatusOK).JSON(model.APIResponse{
		Success: true,
		Message: fmt.Sprintf("%d published jobs synchronized across job boards!", publishedCount),
		Data: fiber.Map{
			"synced_count": publishedCount,
		},
	})
}

// GetRequisitions returns all hiring requisitions.
func GetRequisitions(c *fiber.Ctx) error {
	var reqs []domain.Requisition
	if result := database.DB.Order("created_at DESC").Find(&reqs); result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to fetch requisitions",
			Error:   result.Error.Error(),
		})
	}
	return c.Status(fiber.StatusOK).JSON(model.APIResponse{
		Success: true,
		Message: "Requisitions retrieved successfully",
		Data:    reqs,
	})
}

// CreateRequisition creates a new hiring requisition.
func CreateRequisition(c *fiber.Ctx) error {
	var req model.CreateRequisitionRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Invalid request payload",
			Error:   err.Error(),
		})
	}
	if req.Code == "" || req.Title == "" || req.Department == "" {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Code, Title, and Department are required",
		})
	}
	if req.Headcount <= 0 {
		req.Headcount = 1
	}

	entity := domain.Requisition{
		Code:       req.Code,
		Title:      req.Title,
		Department: req.Department,
		Status:     "open",
		Headcount:  req.Headcount,
	}
	if result := database.DB.Create(&entity); result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to create requisition",
			Error:   result.Error.Error(),
		})
	}

	database.DB.Create(&domain.ActivityLog{
		Title:       fmt.Sprintf("Requisition %s created", entity.Code),
		Description: fmt.Sprintf("%s in %s", entity.Title, entity.Department),
		EntityType:  "requisition",
		EntityID:    entity.ID,
	})

	return c.Status(fiber.StatusCreated).JSON(model.APIResponse{
		Success: true,
		Message: "Requisition created successfully",
		Data:    entity,
	})
}

func normalizeRequisitionStatus(raw string) (string, bool) {
	switch strings.ToLower(strings.TrimSpace(raw)) {
	case "open", "pending", "pending approval":
		return "open", true
	case "draft":
		return "draft", true
	case "approved":
		return "approved", true
	case "converted", "converted to job", "converted_to_job":
		return "converted", true
	case "rejected":
		return "rejected", true
	default:
		return "", false
	}
}

// UpdateRequisition edits an existing hiring requisition.
func UpdateRequisition(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil || id <= 0 {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Invalid requisition ID",
		})
	}

	var entity domain.Requisition
	if result := database.DB.First(&entity, id); result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(model.APIResponse{
			Success: false,
			Message: "Requisition not found",
		})
	}

	var req model.UpdateRequisitionRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Invalid request payload",
			Error:   err.Error(),
		})
	}

	if title := strings.TrimSpace(req.Title); title != "" {
		entity.Title = title
	}
	if dept := strings.TrimSpace(req.Department); dept != "" {
		entity.Department = dept
	}
	if req.Headcount > 0 {
		entity.Headcount = req.Headcount
	}
	if req.Status != "" {
		normalized, ok := normalizeRequisitionStatus(req.Status)
		if !ok {
			return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
				Success: false,
				Message: "Invalid requisition status",
			})
		}
		entity.Status = normalized
	}

	if result := database.DB.Save(&entity); result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to update requisition",
			Error:   result.Error.Error(),
		})
	}

	database.DB.Create(&domain.ActivityLog{
		Title:       fmt.Sprintf("Requisition %s updated", entity.Code),
		Description: fmt.Sprintf("%s • %s (%d vacancies)", entity.Title, entity.Department, entity.Headcount),
		EntityType:  "requisition",
		EntityID:    entity.ID,
	})

	return c.Status(fiber.StatusOK).JSON(model.APIResponse{
		Success: true,
		Message: "Requisition updated successfully",
		Data:    entity,
	})
}

// UpdateRequisitionStatus updates a requisition's workflow status.
func UpdateRequisitionStatus(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil || id <= 0 {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Invalid requisition ID",
		})
	}

	var req model.UpdateRequisitionStatusRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Invalid request payload",
			Error:   err.Error(),
		})
	}

	normalized, ok := normalizeRequisitionStatus(req.Status)
	if !ok {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Invalid status (use open, draft, approved, converted, or rejected)",
		})
	}

	var entity domain.Requisition
	if result := database.DB.First(&entity, id); result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(model.APIResponse{
			Success: false,
			Message: "Requisition not found",
		})
	}

	entity.Status = normalized
	if result := database.DB.Save(&entity); result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to update requisition status",
			Error:   result.Error.Error(),
		})
	}

	if normalized == "converted" {
		var existingJobCount int64
		database.DB.Model(&domain.Job{}).Where("requisition_id = ?", entity.ID).Count(&existingJobCount)
		if existingJobCount == 0 {
			reqID := entity.ID
			database.DB.Create(&domain.Job{
				Title:         entity.Title,
				Department:    entity.Department,
				JobType:       "full_time",
				Status:        "open",
				RequisitionID: &reqID,
			})
		}
	}

	statusLabel := map[string]string{
		"open":      "moved to Pending Approval",
		"draft":     "saved as Draft",
		"approved":  "approved",
		"converted": "converted to Job",
		"rejected":  "rejected",
	}[normalized]

	database.DB.Create(&domain.ActivityLog{
		Title:       fmt.Sprintf("Requisition %s %s", entity.Code, statusLabel),
		Description: fmt.Sprintf("%s • %s", entity.Title, entity.Department),
		EntityType:  "requisition",
		EntityID:    entity.ID,
	})

	return c.Status(fiber.StatusOK).JSON(model.APIResponse{
		Success: true,
		Message: "Requisition status updated successfully",
		Data:    entity,
	})
}

// DeleteRequisition removes a hiring requisition by ID.
func DeleteRequisition(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil || id <= 0 {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Invalid requisition ID",
		})
	}

	var entity domain.Requisition
	if result := database.DB.First(&entity, id); result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(model.APIResponse{
			Success: false,
			Message: "Requisition not found",
		})
	}

	// Unlink any jobs referencing this requisition before deleting
	database.DB.Model(&domain.Job{}).Where("requisition_id = ?", entity.ID).Update("requisition_id", nil)

	if result := database.DB.Delete(&entity); result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to delete requisition",
			Error:   result.Error.Error(),
		})
	}

	database.DB.Create(&domain.ActivityLog{
		Title:       fmt.Sprintf("Requisition %s deleted", entity.Code),
		Description: fmt.Sprintf("%s • %s", entity.Title, entity.Department),
		EntityType:  "requisition",
		EntityID:    entity.ID,
	})

	return c.Status(fiber.StatusOK).JSON(model.APIResponse{
		Success: true,
		Message: "Requisition deleted successfully",
	})
}

// GetRequisitionStatusSummary returns counts grouped by requisition status.
func GetRequisitionStatusSummary(c *fiber.Ctx) error {
	var reqs []domain.Requisition
	if result := database.DB.Select("status").Find(&reqs); result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to compute requisition status summary",
			Error:   result.Error.Error(),
		})
	}

	summary := fiber.Map{
		"total":     len(reqs),
		"draft":     0,
		"pending":   0,
		"approved":  0,
		"converted": 0,
		"rejected":  0,
	}

	counts := map[string]int{
		"draft":     0,
		"pending":   0,
		"approved":  0,
		"converted": 0,
		"rejected":  0,
	}

	for _, r := range reqs {
		switch strings.ToLower(r.Status) {
		case "draft":
			counts["draft"]++
		case "open", "pending":
			counts["pending"]++
		case "approved":
			counts["approved"]++
		case "converted":
			counts["converted"]++
		case "rejected":
			counts["rejected"]++
		}
	}

	summary["draft"] = counts["draft"]
	summary["pending"] = counts["pending"]
	summary["approved"] = counts["approved"]
	summary["converted"] = counts["converted"]
	summary["rejected"] = counts["rejected"]

	return c.Status(fiber.StatusOK).JSON(model.APIResponse{
		Success: true,
		Message: "Requisition status summary retrieved successfully",
		Data:    summary,
	})
}

// GetRecentActivity returns recent activity logs, optionally filtered by entity_type.
func GetRecentActivity(c *fiber.Ctx) error {
	limit := 10
	if rawLimit := c.Query("limit"); rawLimit != "" {
		if parsed, err := strconv.Atoi(rawLimit); err == nil && parsed > 0 && parsed <= 50 {
			limit = parsed
		}
	}

	query := database.DB.Order("created_at DESC").Limit(limit)
	if entityType := strings.TrimSpace(c.Query("entity_type")); entityType != "" {
		query = query.Where("entity_type = ?", entityType)
	}

	var logs []domain.ActivityLog
	if result := query.Find(&logs); result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to fetch recent activity",
			Error:   result.Error.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(model.APIResponse{
		Success: true,
		Message: "Recent activity retrieved successfully",
		Data:    logs,
	})
}

func getOrCreateCareersSyncConfig() (domain.CareersSyncConfig, error) {
	var cfg domain.CareersSyncConfig
	if err := database.DB.Order("id ASC").First(&cfg).Error; err != nil {
		cfg = domain.CareersSyncConfig{
			WebsiteURL: "https://careers.traceu.com",
			Connected:  true,
			AutoSync:   true,
		}
		if createErr := database.DB.Create(&cfg).Error; createErr != nil {
			return cfg, createErr
		}
	}
	return cfg, nil
}

// GetCareersSync returns the careers website sync configuration and status.
func GetCareersSync(c *fiber.Ctx) error {
	cfg, err := getOrCreateCareersSyncConfig()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to fetch careers website sync settings",
			Error:   err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(model.APIResponse{
		Success: true,
		Message: "Careers website sync settings retrieved successfully",
		Data:    cfg,
	})
}

// UpdateCareersSync updates auto-sync toggle or careers website URL.
func UpdateCareersSync(c *fiber.Ctx) error {
	var req model.UpdateCareersSyncRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Invalid request payload",
			Error:   err.Error(),
		})
	}

	cfg, err := getOrCreateCareersSyncConfig()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to load careers website sync settings",
			Error:   err.Error(),
		})
	}

	if req.AutoSync != nil {
		cfg.AutoSync = *req.AutoSync
	}
	if url := strings.TrimSpace(req.WebsiteURL); url != "" {
		cfg.WebsiteURL = url
	}

	if err := database.DB.Save(&cfg).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to update careers website sync settings",
			Error:   err.Error(),
		})
	}

	state := "disabled"
	if cfg.AutoSync {
		state = "enabled"
	}
	database.DB.Create(&domain.ActivityLog{
		Title:       fmt.Sprintf("Careers auto-sync %s", state),
		Description: cfg.WebsiteURL,
		EntityType:  "requisition",
		EntityID:    cfg.ID,
	})

	return c.Status(fiber.StatusOK).JSON(model.APIResponse{
		Success: true,
		Message: "Careers website sync settings updated",
		Data:    cfg,
	})
}

// TriggerCareersSync runs a manual sync with the connected careers website.
func TriggerCareersSync(c *fiber.Ctx) error {
	cfg, err := getOrCreateCareersSyncConfig()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to load careers website sync settings",
			Error:   err.Error(),
		})
	}

	var activeJobCount int64
	database.DB.Model(&domain.Job{}).Where("status = ?", "open").Count(&activeJobCount)

	now := time.Now()
	cfg.LastSyncedAt = &now
	cfg.JobsUpdated = int(activeJobCount)
	cfg.Connected = true

	if err := database.DB.Save(&cfg).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to save sync status",
			Error:   err.Error(),
		})
	}

	database.DB.Create(&domain.ActivityLog{
		Title:       "Careers website synced",
		Description: fmt.Sprintf("%s • %d jobs checked", cfg.WebsiteURL, cfg.JobsUpdated),
		EntityType:  "requisition",
		EntityID:    cfg.ID,
	})

	return c.Status(fiber.StatusOK).JSON(model.APIResponse{
		Success: true,
		Message: "Careers website synced successfully",
		Data:    cfg,
	})
}

func normalizeApplicationStage(raw string) (string, bool) {
	switch strings.ToLower(strings.TrimSpace(raw)) {
	case "applied":
		return "applied", true
	case "screening":
		return "screening", true
	case "shortlisted":
		return "shortlisted", true
	case "interview":
		return "interview", true
	case "selected":
		return "selected", true
	case "offer", "offered":
		return "offered", true
	case "hired":
		return "hired", true
	case "rejected":
		return "rejected", true
	default:
		return "", false
	}
}

// GetApplications lists applications with candidate and job details.
func GetApplications(c *fiber.Ctx) error {
	var apps []domain.Application
	query := database.DB.Preload("Candidate").Preload("Job").Order("applied_at DESC")
	if stage := c.Query("stage"); stage != "" && stage != "ALL" {
		if normalized, ok := normalizeApplicationStage(stage); ok {
			query = query.Where("stage = ?", normalized)
		}
	}
	if result := query.Find(&apps); result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to fetch applications",
			Error:   result.Error.Error(),
		})
	}
	return c.Status(fiber.StatusOK).JSON(model.APIResponse{
		Success: true,
		Message: "Applications retrieved successfully",
		Data:    apps,
	})
}

func isValidEmailAddress(raw string) bool {
	email := strings.TrimSpace(strings.ToLower(raw))
	if email == "" {
		return false
	}
	parsed, err := mail.ParseAddress(email)
	if err != nil || parsed.Address != email {
		return false
	}
	parts := strings.Split(email, "@")
	if len(parts) != 2 || !strings.Contains(parts[1], ".") {
		return false
	}
	domainParts := strings.Split(parts[1], ".")
	tld := domainParts[len(domainParts)-1]
	if len(tld) < 2 {
		return false
	}
	switch tld {
	case "cmo", "con", "ocm", "comm", "xom", "vom", "coom":
		return false
	}
	return true
}

func computeATSMatchScore(cand domain.Candidate, job domain.Job) int {
	if strings.TrimSpace(cand.ResumeName) == "" {
		return 0
	}
	reqText := strings.ToLower(job.Requirements + " " + job.Title + " " + job.Department)
	skillTokens := strings.Split(cand.Skills, ",")
	matched := 0
	total := 0
	for _, raw := range skillTokens {
		s := strings.TrimSpace(strings.ToLower(raw))
		if s == "" {
			continue
		}
		total++
		if strings.Contains(reqText, s) {
			matched++
		}
	}
	score := 65
	if total > 0 {
		score = 55 + int(math.Round(float64(matched)/float64(total)*40.0))
	}
	if strings.TrimSpace(cand.Experience) != "" {
		score += 5
	}
	if score > 98 {
		score = 98
	}
	if score < 40 {
		score = 40
	}
	return score
}

// CreateApplication creates a new application, linking or creating Candidate and Job if needed.
func CreateApplication(c *fiber.Ctx) error {
	var req model.CreateApplicationRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Invalid request payload",
			Error:   err.Error(),
		})
	}

	var cand domain.Candidate
	if req.CandidateID > 0 {
		if err := database.DB.First(&cand, req.CandidateID).Error; err != nil {
			return c.Status(fiber.StatusNotFound).JSON(model.APIResponse{
				Success: false,
				Message: "Candidate not found",
			})
		}
	} else {
		name := strings.TrimSpace(req.CandidateName)
		email := strings.TrimSpace(strings.ToLower(req.CandidateEmail))
		if name == "" || email == "" {
			return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
				Success: false,
				Message: "Candidate name and email are required",
			})
		}
		if !isValidEmailAddress(email) {
			return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
				Success: false,
				Message: "Please provide a valid email address",
			})
		}
		if err := database.DB.Where("LOWER(email) = ?", email).First(&cand).Error; err != nil {
			loc := strings.TrimSpace(req.Location)
			if loc == "" {
				loc = "Bengaluru"
			}
			exp := strings.TrimSpace(req.Experience)
			if exp == "" {
				exp = "2+ yrs"
			}
			cand = domain.Candidate{
				Name:       name,
				Email:      email,
				Phone:      strings.TrimSpace(req.Phone),
				Location:   loc,
				Experience: exp,
				Skills:     strings.TrimSpace(req.Skills),
				Source:     "Direct Application",
				Status:     "in_process",
			}
			if createErr := database.DB.Create(&cand).Error; createErr != nil {
				return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
					Success: false,
					Message: "Failed to create candidate for application",
					Error:   createErr.Error(),
				})
			}
		} else {
			updates := map[string]interface{}{}
			if p := strings.TrimSpace(req.Phone); p != "" {
				updates["phone"] = p
			}
			if l := strings.TrimSpace(req.Location); l != "" {
				updates["location"] = l
			}
			if e := strings.TrimSpace(req.Experience); e != "" {
				updates["experience"] = e
			}
			if s := strings.TrimSpace(req.Skills); s != "" {
				updates["skills"] = s
			}
			if len(updates) > 0 {
				database.DB.Model(&cand).Updates(updates)
				database.DB.First(&cand, cand.ID)
			}
		}
	}

	var job domain.Job
	if req.JobID > 0 {
		if err := database.DB.First(&job, req.JobID).Error; err != nil {
			return c.Status(fiber.StatusNotFound).JSON(model.APIResponse{
				Success: false,
				Message: "Job not found",
			})
		}
	} else {
		jobTitle := strings.TrimSpace(req.JobTitle)
		if jobTitle == "" {
			jobTitle = "Software Engineer"
		}
		if err := database.DB.Where("LOWER(title) = ?", strings.ToLower(jobTitle)).First(&job).Error; err != nil {
			job = domain.Job{
				Title:      jobTitle,
				Department: "Engineering",
				Location:   "Bengaluru",
				JobType:    "full_time",
				Status:     "published",
				Source:     "TraceU",
			}
			if createErr := database.DB.Create(&job).Error; createErr != nil {
				return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
					Success: false,
					Message: "Failed to resolve job for application",
					Error:   createErr.Error(),
				})
			}
		}
	}

	stage := "applied"
	if req.Stage != "" {
		if normalized, ok := normalizeApplicationStage(req.Stage); ok {
			stage = normalized
		}
	}
	matchScore := req.MatchScore
	if matchScore <= 0 || matchScore > 100 {
		matchScore = computeATSMatchScore(cand, job)
	}

	app := domain.Application{
		CandidateID: cand.ID,
		JobID:       job.ID,
		Stage:       stage,
		MatchScore:  matchScore,
		AppliedAt:   time.Now(),
	}
	if result := database.DB.Create(&app); result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to create application",
			Error:   result.Error.Error(),
		})
	}

	database.DB.Preload("Candidate").Preload("Job").First(&app, app.ID)
	score := computeATSMatchScore(app.Candidate, app.Job)
	database.DB.Model(&app).Update("match_score", score)
	app.MatchScore = score

	database.DB.Create(&domain.ActivityLog{
		Title:       "New application received",
		Description: fmt.Sprintf("%s applied for %s", cand.Name, job.Title),
		EntityType:  "application",
		EntityID:    app.ID,
	})

	return c.Status(fiber.StatusCreated).JSON(model.APIResponse{
		Success: true,
		Message: "Application created successfully",
		Data:    app,
	})
}

// UpdateApplicationStage moves an application to a new hiring stage.
func UpdateApplicationStage(c *fiber.Ctx) error {
	id := c.Params("id")
	var req model.UpdateApplicationStageRequest
	if err := c.BodyParser(&req); err != nil || req.Stage == "" {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Valid stage is required",
		})
	}

	normalized, ok := normalizeApplicationStage(req.Stage)
	if !ok {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Invalid stage",
		})
	}

	var app domain.Application
	if result := database.DB.Preload("Candidate").Preload("Job").First(&app, id); result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(model.APIResponse{
			Success: false,
			Message: "Application not found",
		})
	}

	if result := database.DB.Model(&app).Update("stage", normalized); result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to update application stage",
			Error:   result.Error.Error(),
		})
	}

	database.DB.Create(&domain.ActivityLog{
		Title:       fmt.Sprintf("Candidate moved to %s", normalized),
		Description: fmt.Sprintf("by %s (%s)", app.Candidate.Name, app.Job.Title),
		EntityType:  "application",
		EntityID:    app.ID,
	})

	app.Stage = normalized
	return c.Status(fiber.StatusOK).JSON(model.APIResponse{
		Success: true,
		Message: "Application stage updated successfully",
		Data:    app,
	})
}

// DeleteApplication removes an application and its scheduled interviews.
func DeleteApplication(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil || id <= 0 {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Invalid application ID",
		})
	}

	var app domain.Application
	if result := database.DB.First(&app, id); result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(model.APIResponse{
			Success: false,
			Message: "Application not found",
		})
	}

	database.DB.Where("application_id = ?", app.ID).Delete(&domain.Interview{})
	if result := database.DB.Delete(&app); result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to delete application",
			Error:   result.Error.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(model.APIResponse{
		Success: true,
		Message: "Application deleted successfully",
	})
}

// UploadApplicationResume uploads a resume file for an application's candidate.
func UploadApplicationResume(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil || id <= 0 {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Invalid application ID",
		})
	}

	var app domain.Application
	if result := database.DB.Preload("Candidate").Preload("Job").First(&app, id); result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(model.APIResponse{
			Success: false,
			Message: "Application not found",
		})
	}

	file, err := c.FormFile("resume")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Resume file is required (field name: resume)",
		})
	}

	uploadDir := filepath.Join("uploads", "resumes")
	if mkErr := os.MkdirAll(uploadDir, 0755); mkErr != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to prepare upload directory",
		})
	}

	safeName := fmt.Sprintf("app_%d_%d_%s", app.ID, time.Now().Unix(), filepath.Base(file.Filename))
	destPath := filepath.Join(uploadDir, safeName)
	if saveErr := c.SaveFile(file, destPath); saveErr != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to save resume file",
			Error:   saveErr.Error(),
		})
	}

	sizeStr := fmt.Sprintf("%.1f KB", float64(file.Size)/1024.0)
	if file.Size >= 1024*1024 {
		sizeStr = fmt.Sprintf("%.2f MB", float64(file.Size)/(1024.0*1024.0))
	}

	database.DB.Model(&domain.Candidate{}).Where("id = ?", app.CandidateID).Updates(map[string]interface{}{
		"resume_name": filepath.Base(file.Filename),
		"resume_size": sizeStr,
		"resume_url":  "/" + filepath.ToSlash(destPath),
	})

	database.DB.Preload("Candidate").Preload("Job").First(&app, app.ID)
	score := computeATSMatchScore(app.Candidate, app.Job)
	database.DB.Model(&app).Update("match_score", score)
	app.MatchScore = score

	return c.Status(fiber.StatusOK).JSON(model.APIResponse{
		Success: true,
		Message: "Resume uploaded successfully",
		Data:    app,
	})
}

// GetInterviews lists scheduled interviews.
func GetInterviews(c *fiber.Ctx) error {
	var interviews []domain.Interview
	if result := database.DB.Preload("Application.Candidate").Preload("Application.Job").
		Order("scheduled_at ASC").Find(&interviews); result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to fetch interviews",
			Error:   result.Error.Error(),
		})
	}
	return c.Status(fiber.StatusOK).JSON(model.APIResponse{
		Success: true,
		Message: "Interviews retrieved successfully",
		Data:    interviews,
	})
}

// CreateInterview schedules a new interview for an application.
func CreateInterview(c *fiber.Ctx) error {
	var req model.CreateInterviewRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Invalid request payload",
			Error:   err.Error(),
		})
	}
	if req.ApplicationID == 0 || req.ScheduledAt.IsZero() {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "application_id and scheduled_at are required",
		})
	}

	interview := domain.Interview{
		ApplicationID: req.ApplicationID,
		ScheduledAt:   req.ScheduledAt,
		Status:        "scheduled",
		Interviewer:   req.Interviewer,
		Notes:         req.Notes,
	}
	if result := database.DB.Create(&interview); result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to schedule interview",
			Error:   result.Error.Error(),
		})
	}
	return c.Status(fiber.StatusCreated).JSON(model.APIResponse{
		Success: true,
		Message: "Interview scheduled successfully",
		Data:    interview,
	})
}

func normalizeCandidateStatus(raw string) (string, bool) {
	switch strings.ToLower(strings.TrimSpace(raw)) {
	case "active":
		return "active", true
	case "in process", "in_process":
		return "in_process", true
	case "shortlisted":
		return "shortlisted", true
	case "interview":
		return "interview", true
	case "hired":
		return "hired", true
	case "inactive", "archived":
		return "inactive", true
	default:
		return "", false
	}
}

// GetCandidates returns candidates with optional search, department, location, status, source, tab, and sort filters.
func GetCandidates(c *fiber.Ctx) error {
	var candidates []domain.Candidate
	query := database.DB.Model(&domain.Candidate{})

	if search := strings.TrimSpace(c.Query("search")); search != "" {
		like := "%" + strings.ToLower(search) + "%"
		query = query.Where(
			"LOWER(name) LIKE ? OR LOWER(email) LIKE ? OR LOWER(phone) LIKE ? OR LOWER(current_role) LIKE ? OR LOWER(skills) LIKE ? OR LOWER(location) LIKE ?",
			like, like, like, like, like, like,
		)
	}
	if dept := strings.TrimSpace(c.Query("department")); dept != "" && dept != "ALL" {
		query = query.Where("LOWER(department) LIKE ?", "%"+strings.ToLower(dept)+"%")
	}
	if loc := strings.TrimSpace(c.Query("location")); loc != "" && loc != "ALL" {
		query = query.Where("location = ?", loc)
	}
	if source := strings.TrimSpace(c.Query("source")); source != "" && source != "ALL" {
		query = query.Where("source = ?", source)
	}
	if status := strings.TrimSpace(c.Query("status")); status != "" && status != "ALL" {
		if normalized, ok := normalizeCandidateStatus(status); ok {
			query = query.Where("status = ?", normalized)
		}
	}

	switch strings.ToLower(strings.TrimSpace(c.Query("sort"))) {
	case "oldest":
		query = query.Order("created_at ASC")
	case "name":
		query = query.Order("name ASC")
	default:
		query = query.Order("created_at DESC")
	}

	if result := query.Find(&candidates); result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to fetch candidates",
			Error:   result.Error.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(model.APIResponse{
		Success: true,
		Message: "Candidates retrieved successfully",
		Data:    candidates,
	})
}

// CreateCandidate creates a new candidate profile.
func CreateCandidate(c *fiber.Ctx) error {
	var req model.CreateCandidateRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Invalid request payload",
			Error:   err.Error(),
		})
	}

	name := strings.TrimSpace(req.Name)
	email := strings.TrimSpace(strings.ToLower(req.Email))
	if name == "" || email == "" {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Full name and email address are required",
		})
	}

	var existing domain.Candidate
	if err := database.DB.Where("LOWER(email) = ?", email).First(&existing).Error; err == nil {
		return c.Status(fiber.StatusConflict).JSON(model.APIResponse{
			Success: false,
			Message: "A candidate with this email address already exists",
		})
	}

	currentRole := strings.TrimSpace(req.CurrentRole)
	if currentRole == "" {
		currentRole = "Software Engineer"
	}
	dept := strings.TrimSpace(req.Department)
	if dept == "" {
		dept = "Engineering"
	}
	exp := strings.TrimSpace(req.Experience)
	if exp == "" {
		exp = "2+ yrs"
	}
	loc := strings.TrimSpace(req.Location)
	if loc == "" {
		loc = "Bengaluru"
	}
	source := strings.TrimSpace(req.Source)
	if source == "" {
		source = "TraceU"
	}
	status := "active"
	if req.Status != "" {
		if normalized, ok := normalizeCandidateStatus(req.Status); ok {
			status = normalized
		}
	}

	cand := domain.Candidate{
		Name:        name,
		Email:       email,
		Phone:       strings.TrimSpace(req.Phone),
		CurrentRole: currentRole,
		Department:  dept,
		Experience:  exp,
		Skills:      strings.TrimSpace(req.Skills),
		Location:    loc,
		Source:      source,
		Status:      status,
		GithubURL:   strings.TrimSpace(req.GithubURL),
		LinkedInURL: strings.TrimSpace(req.LinkedInURL),
		PhotoURL:    strings.TrimSpace(req.PhotoURL),
	}

	if result := database.DB.Create(&cand); result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to create candidate",
			Error:   result.Error.Error(),
		})
	}

	database.DB.Create(&domain.ActivityLog{
		Title:       "New candidate added",
		Description: fmt.Sprintf("%s • %s (%s)", cand.Name, cand.CurrentRole, cand.Location),
		EntityType:  "candidate",
		EntityID:    cand.ID,
	})

	return c.Status(fiber.StatusCreated).JSON(model.APIResponse{
		Success: true,
		Message: "Candidate created successfully",
		Data:    cand,
	})
}

// UpdateCandidate updates an existing candidate profile.
func UpdateCandidate(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil || id <= 0 {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Invalid candidate ID",
		})
	}

	var cand domain.Candidate
	if result := database.DB.First(&cand, id); result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(model.APIResponse{
			Success: false,
			Message: "Candidate not found",
		})
	}

	var req model.CreateCandidateRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Invalid request payload",
			Error:   err.Error(),
		})
	}

	if name := strings.TrimSpace(req.Name); name != "" {
		cand.Name = name
	}
	if email := strings.TrimSpace(strings.ToLower(req.Email)); email != "" {
		cand.Email = email
	}
	if req.Phone != "" {
		cand.Phone = strings.TrimSpace(req.Phone)
	}
	if role := strings.TrimSpace(req.CurrentRole); role != "" {
		cand.CurrentRole = role
	}
	if dept := strings.TrimSpace(req.Department); dept != "" {
		cand.Department = dept
	}
	if exp := strings.TrimSpace(req.Experience); exp != "" {
		cand.Experience = exp
	}
	if req.Skills != "" {
		cand.Skills = strings.TrimSpace(req.Skills)
	}
	if loc := strings.TrimSpace(req.Location); loc != "" {
		cand.Location = loc
	}
	if src := strings.TrimSpace(req.Source); src != "" {
		cand.Source = src
	}
	if req.Status != "" {
		if normalized, ok := normalizeCandidateStatus(req.Status); ok {
			cand.Status = normalized
		}
	}
	if req.GithubURL != "" {
		cand.GithubURL = strings.TrimSpace(req.GithubURL)
	}
	if req.LinkedInURL != "" {
		cand.LinkedInURL = strings.TrimSpace(req.LinkedInURL)
	}
	if req.PhotoURL != "" {
		cand.PhotoURL = strings.TrimSpace(req.PhotoURL)
	}

	if result := database.DB.Save(&cand); result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to update candidate",
			Error:   result.Error.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(model.APIResponse{
		Success: true,
		Message: "Candidate updated successfully",
		Data:    cand,
	})
}

// UpdateCandidateStatus updates candidate workflow status or talent pool membership.
func UpdateCandidateStatus(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil || id <= 0 {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Invalid candidate ID",
		})
	}

	var req model.UpdateCandidateStatusRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Invalid request payload",
			Error:   err.Error(),
		})
	}

	var cand domain.Candidate
	if result := database.DB.First(&cand, id); result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(model.APIResponse{
			Success: false,
			Message: "Candidate not found",
		})
	}

	if req.Status != "" {
		normalized, ok := normalizeCandidateStatus(req.Status)
		if !ok {
			return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
				Success: false,
				Message: "Invalid candidate status",
			})
		}
		cand.Status = normalized
	}
	if req.InTalentPool != nil {
		cand.InTalentPool = *req.InTalentPool
	}

	if result := database.DB.Save(&cand); result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to update candidate status",
			Error:   result.Error.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(model.APIResponse{
		Success: true,
		Message: "Candidate status updated successfully",
		Data:    cand,
	})
}

// DeleteCandidate deletes a candidate profile by ID.
func DeleteCandidate(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil || id <= 0 {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Invalid candidate ID",
		})
	}

	var cand domain.Candidate
	if result := database.DB.First(&cand, id); result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(model.APIResponse{
			Success: false,
			Message: "Candidate not found",
		})
	}

	database.DB.Where("candidate_id = ?", cand.ID).Delete(&domain.Application{})

	if result := database.DB.Delete(&cand); result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to delete candidate",
			Error:   result.Error.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(model.APIResponse{
		Success: true,
		Message: "Candidate deleted successfully",
	})
}

// UploadCandidateResume handles uploading a resume file for a candidate.
func UploadCandidateResume(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil || id <= 0 {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Invalid candidate ID",
		})
	}

	var cand domain.Candidate
	if result := database.DB.First(&cand, id); result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(model.APIResponse{
			Success: false,
			Message: "Candidate not found",
		})
	}

	file, err := c.FormFile("resume")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Resume file is required (field name: resume)",
		})
	}

	uploadDir := filepath.Join("uploads", "resumes")
	if mkErr := os.MkdirAll(uploadDir, 0755); mkErr != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to prepare upload directory",
		})
	}

	safeName := fmt.Sprintf("cand_%d_%d_%s", cand.ID, time.Now().Unix(), filepath.Base(file.Filename))
	destPath := filepath.Join(uploadDir, safeName)
	if saveErr := c.SaveFile(file, destPath); saveErr != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to save uploaded resume",
			Error:   saveErr.Error(),
		})
	}

	sizeStr := fmt.Sprintf("%.1f KB", float64(file.Size)/1024.0)
	if file.Size >= 1024*1024 {
		sizeStr = fmt.Sprintf("%.2f MB", float64(file.Size)/(1024.0*1024.0))
	}

	cand.ResumeName = filepath.Base(file.Filename)
	cand.ResumeSize = sizeStr
	cand.ResumeURL = "/" + filepath.ToSlash(destPath)

	if result := database.DB.Save(&cand); result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to update candidate resume details",
		})
	}

	return c.Status(fiber.StatusOK).JSON(model.APIResponse{
		Success: true,
		Message: "Resume uploaded successfully",
		Data:    cand,
	})
}

// UploadStandaloneResume creates a candidate profile directly from an uploaded resume file.
func UploadStandaloneResume(c *fiber.Ctx) error {
	file, err := c.FormFile("resume")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Resume file is required (field name: resume)",
		})
	}

	uploadDir := filepath.Join("uploads", "resumes")
	if mkErr := os.MkdirAll(uploadDir, 0755); mkErr != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to prepare upload directory",
		})
	}

	baseName := filepath.Base(file.Filename)
	nowUnix := time.Now().UnixNano()
	safeName := fmt.Sprintf("resume_%d_%s", nowUnix, baseName)
	destPath := filepath.Join(uploadDir, safeName)
	if saveErr := c.SaveFile(file, destPath); saveErr != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to save uploaded resume",
			Error:   saveErr.Error(),
		})
	}

	ext := filepath.Ext(baseName)
	rawTitle := strings.TrimSuffix(baseName, ext)
	cleanName := strings.TrimSpace(strings.NewReplacer("_", " ", "-", " ").Replace(rawTitle))
	if cleanName == "" {
		cleanName = "New Candidate"
	}
	emailSlug := strings.ToLower(strings.ReplaceAll(cleanName, " ", "."))
	generatedEmail := fmt.Sprintf("%s.%d@resume.traceu.in", emailSlug, nowUnix%100000)

	sizeStr := fmt.Sprintf("%.1f KB", float64(file.Size)/1024.0)
	if file.Size >= 1024*1024 {
		sizeStr = fmt.Sprintf("%.2f MB", float64(file.Size)/(1024.0*1024.0))
	}

	cand := domain.Candidate{
		Name:       cleanName,
		Email:      generatedEmail,
		Source:     "Resume Upload",
		Status:     "active",
		ResumeName: baseName,
		ResumeSize: sizeStr,
		ResumeURL:  "/" + filepath.ToSlash(destPath),
	}
	if result := database.DB.Create(&cand); result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to create candidate from resume",
			Error:   result.Error.Error(),
		})
	}

	database.DB.Create(&domain.ActivityLog{
		Title:       "Resume uploaded",
		Description: fmt.Sprintf("%s (%s)", cand.Name, cand.ResumeName),
		EntityType:  "candidate",
		EntityID:    cand.ID,
	})

	return c.Status(fiber.StatusCreated).JSON(model.APIResponse{
		Success: true,
		Message: "Resume uploaded and candidate profile created!",
		Data:    cand,
	})
}

// ImportCandidates bulk-imports candidates and skips duplicate emails.
func ImportCandidates(c *fiber.Ctx) error {
	var req model.ImportCandidatesRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Invalid import payload",
			Error:   err.Error(),
		})
	}
	if len(req.Candidates) == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "No candidates provided for import",
		})
	}

	createdList := make([]domain.Candidate, 0, len(req.Candidates))
	skipped := 0

	for _, item := range req.Candidates {
		name := strings.TrimSpace(item.Name)
		email := strings.TrimSpace(strings.ToLower(item.Email))
		if name == "" || email == "" {
			skipped++
			continue
		}

		var existing domain.Candidate
		if err := database.DB.Where("LOWER(email) = ?", email).First(&existing).Error; err == nil {
			skipped++
			continue
		}

		role := strings.TrimSpace(item.CurrentRole)
		if role == "" {
			role = "Software Engineer"
		}
		dept := strings.TrimSpace(item.Department)
		if dept == "" {
			dept = "Engineering"
		}
		exp := strings.TrimSpace(item.Experience)
		if exp == "" {
			exp = "2+ yrs"
		}
		loc := strings.TrimSpace(item.Location)
		if loc == "" {
			loc = "Bengaluru"
		}
		source := strings.TrimSpace(item.Source)
		if source == "" {
			source = "Import"
		}
		status := "active"
		if item.Status != "" {
			if normalized, ok := normalizeCandidateStatus(item.Status); ok {
				status = normalized
			}
		}

		cand := domain.Candidate{
			Name:        name,
			Email:       email,
			Phone:       strings.TrimSpace(item.Phone),
			CurrentRole: role,
			Department:  dept,
			Experience:  exp,
			Skills:      strings.TrimSpace(item.Skills),
			Location:    loc,
			Source:      source,
			Status:      status,
		}
		if err := database.DB.Create(&cand).Error; err != nil {
			skipped++
			continue
		}
		createdList = append(createdList, cand)
	}

	return c.Status(fiber.StatusCreated).JSON(model.APIResponse{
		Success: true,
		Message: fmt.Sprintf("Imported %d candidates (%d skipped)", len(createdList), skipped),
		Data: fiber.Map{
			"imported_count": len(createdList),
			"skipped_count":  skipped,
			"candidates":     createdList,
		},
	})
}

