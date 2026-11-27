package routes

import (
	"github.com/gofiber/fiber/v2"

	"traceu-jobs-backend/controllers"
	"traceu-jobs-backend/middleware"
)

// SetupRoutes registers all application endpoints
func SetupRoutes(app *fiber.App) {
	api := app.Group("/api/v1")

	// Employee endpoints
	employees := api.Group("/employees")
	employees.Get("/getemployee", controllers.GetEmployees) // GET /api/v1/employees/getemployee (Fetch all)
	employees.Get("/:id", controllers.GetEmployeeByID)      // GET /api/v1/employees/:id (Fetch one)
	employees.Post("/", controllers.CreateEmployee)         // POST /api/v1/employees (Create)
	employees.Put("/:id", controllers.UpdateEmployeeName)   // PUT /api/v1/employees/:id (Update name)
	employees.Patch("/:id", controllers.UpdateEmployeeName) // PATCH /api/v1/employees/:id (Update name)
	employees.Delete("/:id", controllers.DeleteEmployee)    // DELETE /api/v1/employees/:id (Delete)

	// Admin authentication & access (public)
	api.Post("/admin/login", controllers.AdminLogin)
	api.Post("/admin/oauth/:provider", controllers.AdminOAuthLogin)
	api.Post("/admin/forgot-password", controllers.AdminForgotPassword)
	api.Post("/admin/reset-password", controllers.AdminResetPassword)
	api.Post("/admin/request-access", controllers.AdminRequestAccess)
	api.Post("/admin/logout", controllers.AdminLogout)

	// Protected admin endpoints
	admin := api.Group("/admin", middleware.AdminAuthMiddleware)
	admin.Get("/me", controllers.GetAdminProfile)
	admin.Get("/dashboard", controllers.GetAdminDashboard)

	admin.Get("/jobs", controllers.GetJobs)
	admin.Post("/jobs", controllers.CreateJob)
	admin.Post("/jobs/publish-boards", controllers.PublishToJobBoards)
	admin.Put("/jobs/:id", controllers.UpdateJob)
	admin.Patch("/jobs/:id/status", controllers.UpdateJobStatus)
	admin.Delete("/jobs/:id", controllers.DeleteJob)

	admin.Get("/requisitions", controllers.GetRequisitions)
	admin.Get("/requisitions/status-summary", controllers.GetRequisitionStatusSummary)
	admin.Post("/requisitions", controllers.CreateRequisition)
	admin.Put("/requisitions/:id", controllers.UpdateRequisition)
	admin.Patch("/requisitions/:id/status", controllers.UpdateRequisitionStatus)
	admin.Delete("/requisitions/:id", controllers.DeleteRequisition)

	admin.Get("/activity", controllers.GetRecentActivity)

	admin.Get("/careers-sync", controllers.GetCareersSync)
	admin.Patch("/careers-sync", controllers.UpdateCareersSync)
	admin.Post("/careers-sync/sync", controllers.TriggerCareersSync)

	admin.Get("/candidates", controllers.GetCandidates)
	admin.Post("/candidates", controllers.CreateCandidate)
	admin.Post("/candidates/import", controllers.ImportCandidates)
	admin.Post("/candidates/upload-resume", controllers.UploadStandaloneResume)
	admin.Put("/candidates/:id", controllers.UpdateCandidate)
	admin.Patch("/candidates/:id/status", controllers.UpdateCandidateStatus)
	admin.Post("/candidates/:id/resume", controllers.UploadCandidateResume)
	admin.Delete("/candidates/:id", controllers.DeleteCandidate)

	admin.Get("/applications", controllers.GetApplications)
	admin.Post("/applications", controllers.CreateApplication)
	admin.Patch("/applications/:id/stage", controllers.UpdateApplicationStage)
	admin.Post("/applications/:id/resume", controllers.UploadApplicationResume)
	admin.Delete("/applications/:id", controllers.DeleteApplication)

	admin.Get("/interviews", controllers.GetInterviews)
	admin.Post("/interviews", controllers.CreateInterview)

	admin.Get("/talent-pool", controllers.GetTalentPool)
	admin.Post("/talent-pool", controllers.AddToTalentPool)
	admin.Post("/talent-pool/import", controllers.ImportTalentPool)
	admin.Patch("/talent-pool/:id/availability", controllers.UpdateTalentPoolAvailability)
	admin.Get("/talent-pool/:id/notes", controllers.GetTalentPoolNotes)
	admin.Post("/talent-pool/:id/notes", controllers.AddTalentPoolNote)
	admin.Post("/talent-pool/:id/contact", controllers.ContactTalentPoolCandidate)
	admin.Delete("/talent-pool/:id", controllers.RemoveFromTalentPool)

	admin.Get("/internships", controllers.GetInternships)
	admin.Post("/internships", controllers.CreateInternship)
	admin.Post("/internships/invite-company", controllers.InviteInternshipCompany)
	admin.Get("/internships/:id/applications", controllers.GetInternshipApplications)
	admin.Put("/internships/:id", controllers.UpdateInternship)
	admin.Patch("/internships/:id/status", controllers.UpdateInternshipStatus)
	admin.Delete("/internships/:id", controllers.DeleteInternship)

	admin.Get("/analytics", controllers.GetAnalytics)
}
