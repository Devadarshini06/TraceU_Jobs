package model

import "time"

// DashboardSummary holds the top 6 KPI cards on the admin dashboard.
type DashboardSummary struct {
	OpenRequisitions  int64 `json:"open_requisitions"`
	TotalApplications int64 `json:"total_applications"`
	Shortlisted       int64 `json:"shortlisted"`
	Interviews        int64 `json:"interviews"`
	Offers            int64 `json:"offers"`
	Internships       int64 `json:"internships"`
}

// PipelineStageItem represents a stage count and percentage in the hiring pipeline.
type PipelineStageItem struct {
	Stage      string  `json:"stage"`
	Count      int64   `json:"count"`
	Percentage float64 `json:"percentage"`
}

// PipelineTrendPoint represents a point on the applications vs hires chart.
type PipelineTrendPoint struct {
	Date         string `json:"date"`
	Applications int64  `json:"applications"`
	Hires        int64  `json:"hires"`
}

// RecentApplicationItem formats an application row for the dashboard table.
type RecentApplicationItem struct {
	ID            uint      `json:"id"`
	CandidateName string    `json:"candidate_name"`
	Role          string    `json:"role"`
	Stage         string    `json:"stage"`
	AppliedAt     time.Time `json:"applied_at"`
}

// UpcomingInterviewItem formats an interview row for the dashboard table.
type UpcomingInterviewItem struct {
	ID            uint      `json:"id"`
	CandidateName string    `json:"candidate_name"`
	Role          string    `json:"role"`
	ScheduledAt   time.Time `json:"scheduled_at"`
	Status        string    `json:"status"`
}

// TopJobItem formats a top-performing job row.
type TopJobItem struct {
	ID           uint   `json:"id"`
	Title        string `json:"title"`
	Applications int64  `json:"applications"`
	Views        int    `json:"views"`
}

// SourceBreakdownItem represents applications grouped by candidate source.
type SourceBreakdownItem struct {
	Source     string  `json:"source"`
	Count      int64   `json:"count"`
	Percentage float64 `json:"percentage"`
}

// RecruitmentInsights holds the bottom insights section of the dashboard.
type RecruitmentInsights struct {
	TimeToHireDays       float64               `json:"time_to_hire_days"`
	TimeToFillDays       float64               `json:"time_to_fill_days"`
	OfferAcceptanceRate  float64               `json:"offer_acceptance_rate"`
	TopSource            string                `json:"top_source"`
	ApplicationsBySource []SourceBreakdownItem `json:"applications_by_source"`
}

// DashboardResponse aggregates all sections for GET /api/v1/admin/dashboard.
type DashboardResponse struct {
	Days               int                     `json:"days"`
	Summary            DashboardSummary        `json:"summary"`
	PipelineStages     []PipelineStageItem     `json:"pipeline_stages"`
	PipelineTrend      []PipelineTrendPoint    `json:"pipeline_trend"`
	RecentApplications []RecentApplicationItem `json:"recent_applications"`
	UpcomingInterviews []UpcomingInterviewItem `json:"upcoming_interviews"`
	TopJobs            []TopJobItem            `json:"top_jobs"`
	RecentActivity     interface{}             `json:"recent_activity"`
	Insights           RecruitmentInsights     `json:"insights"`
}

// CreateJobRequest defines payload for creating a job or internship.
type CreateJobRequest struct {
	Title         string `json:"title"`
	Department    string `json:"department"`
	Location      string `json:"location"`
	JobType       string `json:"job_type"`
	Status        string `json:"status"`
	Description   string `json:"description"`
	Requirements  string `json:"requirements"`
	Source        string `json:"source"`
	RequisitionID *uint  `json:"requisition_id"`
}

// UpdateJobRequest defines payload for editing an existing job posting.
type UpdateJobRequest struct {
	Title        string `json:"title"`
	Department   string `json:"department"`
	Location     string `json:"location"`
	JobType      string `json:"job_type"`
	Status       string `json:"status"`
	Description  string `json:"description"`
	Requirements string `json:"requirements"`
	Source       string `json:"source"`
}

// UpdateJobStatusRequest updates a job's status.
type UpdateJobStatusRequest struct {
	Status string `json:"status"`
}

// CreateRequisitionRequest defines payload for creating a hiring requisition.
type CreateRequisitionRequest struct {
	Code       string `json:"code"`
	Title      string `json:"title"`
	Department string `json:"department"`
	Headcount  int    `json:"headcount"`
}

// UpdateRequisitionRequest defines payload for editing an existing requisition.
type UpdateRequisitionRequest struct {
	Title      string `json:"title"`
	Department string `json:"department"`
	Headcount  int    `json:"headcount"`
	Status     string `json:"status"`
}

// UpdateRequisitionStatusRequest updates a requisition's status.
type UpdateRequisitionStatusRequest struct {
	Status string `json:"status"`
}

// UpdateCareersSyncRequest updates careers website sync settings.
type UpdateCareersSyncRequest struct {
	AutoSync   *bool  `json:"auto_sync"`
	WebsiteURL string `json:"website_url"`
}

// CreateCandidateRequest defines payload for adding or editing a candidate.
type CreateCandidateRequest struct {
	Name        string `json:"name"`
	Email       string `json:"email"`
	Phone       string `json:"phone"`
	CurrentRole string `json:"current_role"`
	Department  string `json:"department"`
	Experience  string `json:"experience"`
	Skills      string `json:"skills"`
	Location    string `json:"location"`
	Source      string `json:"source"`
	Status      string `json:"status"`
	GithubURL   string `json:"github_url"`
	LinkedInURL string `json:"linkedin_url"`
	PhotoURL    string `json:"photo_url"`
}

// UpdateCandidateStatusRequest updates a candidate's status or talent pool membership.
type UpdateCandidateStatusRequest struct {
	Status       string `json:"status"`
	InTalentPool *bool  `json:"in_talent_pool"`
}

// ImportCandidatesRequest handles bulk candidate import.
type ImportCandidatesRequest struct {
	Candidates []CreateCandidateRequest `json:"candidates"`
}

// UpdateApplicationStageRequest updates an application's pipeline stage.
type UpdateApplicationStageRequest struct {
	Stage string `json:"stage"`
}

// CreateApplicationRequest creates a new ATS application.
type CreateApplicationRequest struct {
	CandidateID    uint   `json:"candidate_id"`
	CandidateName  string `json:"candidate_name"`
	CandidateEmail string `json:"candidate_email"`
	JobID          uint   `json:"job_id"`
	JobTitle       string `json:"job_title"`
	Stage          string `json:"stage"`
	MatchScore     int    `json:"match_score"`
}

// CreateInterviewRequest schedules a new interview.
type CreateInterviewRequest struct {
	ApplicationID uint      `json:"application_id"`
	ScheduledAt   time.Time `json:"scheduled_at"`
	Interviewer   string    `json:"interviewer"`
	Notes         string    `json:"notes"`
}

