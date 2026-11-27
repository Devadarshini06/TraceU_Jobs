package domain

import "time"

// Requisition represents a hiring requisition request.
type Requisition struct {
	ID         uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	Code       string    `gorm:"column:code;size:30;unique;not null" json:"code"`
	Title      string    `gorm:"column:title;size:150;not null" json:"title"`
	Department string    `gorm:"column:department;size:100;not null" json:"department"`
	Status     string    `gorm:"column:status;size:30;default:open;not null" json:"status"`
	Headcount  int       `gorm:"column:headcount;default:1;not null" json:"headcount"`
	CreatedAt  time.Time `gorm:"column:created_at" json:"created_at"`
	UpdatedAt  time.Time `gorm:"column:updated_at" json:"updated_at"`
}

func (Requisition) TableName() string {
	return "requisitions"
}

// Job represents a job or internship posting.
type Job struct {
	ID            uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	Title         string    `gorm:"column:title;size:150;not null" json:"title"`
	Department    string    `gorm:"column:department;size:100;not null" json:"department"`
	JobType       string    `gorm:"column:job_type;size:30;default:full_time;not null" json:"job_type"` // full_time, internship, contract, part_time
	Location      string    `gorm:"column:location;size:100;default:Bengaluru;not null" json:"location"`
	Company       string    `gorm:"column:company;size:120;default:TraceU;not null" json:"company"`
	WorkMode      string    `gorm:"column:work_mode;size:40;default:Hybrid;not null" json:"work_mode"`
	Duration      string    `gorm:"column:duration;size:60;default:3 months;not null" json:"duration"`
	Stipend       string    `gorm:"column:stipend;size:60;default:₹15,000;not null" json:"stipend"`
	Skills        string    `gorm:"column:skills;type:text" json:"skills"`
	Description   string    `gorm:"column:description;type:text" json:"description"`
	Requirements  string    `gorm:"column:requirements;type:text" json:"requirements"`
	Source        string    `gorm:"column:source;size:60;default:TraceU;not null" json:"source"`
	Status        string    `gorm:"column:status;size:30;default:published;not null" json:"status"` // published, open, draft, paused, closed
	Views         int       `gorm:"column:views;default:0;not null" json:"views"`
	RequisitionID *uint     `gorm:"column:requisition_id" json:"requisition_id,omitempty"`
	CreatedAt     time.Time `gorm:"column:created_at" json:"created_at"`
	UpdatedAt     time.Time `gorm:"column:updated_at" json:"updated_at"`
}

func (Job) TableName() string {
	return "jobs"
}

// Candidate represents a job applicant.
type Candidate struct {
	ID           uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	Name         string    `gorm:"column:name;size:120;not null" json:"name"`
	Email        string    `gorm:"column:email;size:150;unique;not null" json:"email"`
	Phone        string    `gorm:"column:phone;size:30" json:"phone"`
	CurrentRole  string    `gorm:"column:current_role;size:120;default:Software Engineer;not null" json:"current_role"`
	Department   string    `gorm:"column:department;size:100;default:Engineering;not null" json:"department"`
	Experience   string    `gorm:"column:experience;size:50;default:2+ yrs;not null" json:"experience"`
	Skills       string    `gorm:"column:skills;type:text" json:"skills"`
	Location     string    `gorm:"column:location;size:100;default:Bengaluru;not null" json:"location"`
	Source       string    `gorm:"column:source;size:60;default:LinkedIn;not null" json:"source"`
	Status       string    `gorm:"column:status;size:30;default:active;not null" json:"status"`
	Availability    string    `gorm:"column:availability;size:40;default:Active;not null" json:"availability"`
	NoticePeriod    string    `gorm:"column:notice_period;size:40" json:"notice_period"`
	Salary          string    `gorm:"column:salary;size:60" json:"salary"`
	About           string    `gorm:"column:about;type:text" json:"about"`
	Company         string    `gorm:"column:company;size:120" json:"company"`
	EducationDegree string    `gorm:"column:education_degree;size:120" json:"education_degree"`
	EducationSchool string    `gorm:"column:education_school;size:150" json:"education_school"`
	EducationPeriod string    `gorm:"column:education_period;size:60" json:"education_period"`
	InTalentPool bool      `gorm:"column:in_talent_pool;default:false;not null" json:"in_talent_pool"`
	GithubURL    string    `gorm:"column:github_url;size:255" json:"github_url"`
	LinkedInURL  string    `gorm:"column:linkedin_url;size:255" json:"linkedin_url"`
	PhotoURL     string    `gorm:"column:photo_url;type:longtext" json:"photo_url"`
	ResumeURL    string    `gorm:"column:resume_url;size:255" json:"resume_url"`
	ResumeName   string    `gorm:"column:resume_name;size:255" json:"resume_name"`
	ResumeSize   string    `gorm:"column:resume_size;size:40" json:"resume_size"`
	CreatedAt    time.Time `gorm:"column:created_at" json:"created_at"`
	UpdatedAt    time.Time `gorm:"column:updated_at" json:"updated_at"`
}

func (Candidate) TableName() string {
	return "candidates"
}

// Application tracks a candidate's progress through the hiring pipeline.
type Application struct {
	ID          uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	CandidateID uint      `gorm:"column:candidate_id;not null;index" json:"candidate_id"`
	JobID       uint      `gorm:"column:job_id;not null;index" json:"job_id"`
	Stage       string    `gorm:"column:stage;size:30;default:applied;not null" json:"stage"` // applied, screening, shortlisted, interview, selected, offered, hired, rejected
	MatchScore  int       `gorm:"column:match_score;default:80;not null" json:"match_score"`
	AppliedAt   time.Time `gorm:"column:applied_at" json:"applied_at"`
	UpdatedAt   time.Time `gorm:"column:updated_at" json:"updated_at"`
	Candidate   Candidate `gorm:"foreignKey:CandidateID" json:"candidate,omitempty"`
	Job         Job       `gorm:"foreignKey:JobID" json:"job,omitempty"`
}

func (Application) TableName() string {
	return "applications"
}

// Interview represents a scheduled candidate interview.
type Interview struct {
	ID            uint        `gorm:"primaryKey;autoIncrement" json:"id"`
	ApplicationID uint        `gorm:"column:application_id;not null;index" json:"application_id"`
	ScheduledAt   time.Time   `gorm:"column:scheduled_at;not null" json:"scheduled_at"`
	Status        string      `gorm:"column:status;size:30;default:scheduled;not null" json:"status"` // scheduled, completed, cancelled
	Interviewer   string      `gorm:"column:interviewer;size:120" json:"interviewer"`
	Notes         string      `gorm:"column:notes;type:text" json:"notes"`
	CreatedAt     time.Time   `gorm:"column:created_at" json:"created_at"`
	Application   Application `gorm:"foreignKey:ApplicationID" json:"application,omitempty"`
}

func (Interview) TableName() string {
	return "interviews"
}

// ActivityLog records recent recruitment events for the dashboard feed.
type ActivityLog struct {
	ID          uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	Title       string    `gorm:"column:title;size:150;not null" json:"title"`
	Description string    `gorm:"column:description;size:255;not null" json:"description"`
	EntityType  string    `gorm:"column:entity_type;size:50" json:"entity_type"`
	EntityID    uint      `gorm:"column:entity_id" json:"entity_id"`
	CreatedAt   time.Time `gorm:"column:created_at" json:"created_at"`
}

func (ActivityLog) TableName() string {
	return "activity_logs"
}

// CareersSyncConfig stores careers website integration and sync state.
type CareersSyncConfig struct {
	ID           uint       `gorm:"primaryKey;autoIncrement" json:"id"`
	WebsiteURL   string     `gorm:"column:website_url;size:255;not null" json:"website_url"`
	Connected    bool       `gorm:"column:connected;default:true;not null" json:"connected"`
	AutoSync     bool       `gorm:"column:auto_sync;default:true;not null" json:"auto_sync"`
	JobsUpdated  int        `gorm:"column:jobs_updated;default:0;not null" json:"jobs_updated"`
	JobsImported int        `gorm:"column:jobs_imported;default:0;not null" json:"jobs_imported"`
	LastSyncedAt *time.Time `gorm:"column:last_synced_at" json:"last_synced_at"`
	CreatedAt    time.Time  `gorm:"column:created_at" json:"created_at"`
	UpdatedAt    time.Time  `gorm:"column:updated_at" json:"updated_at"`
}

func (CareersSyncConfig) TableName() string {
	return "careers_sync_configs"
}

// CompanyPartner stores invited partner companies for the internship program.
type CompanyPartner struct {
	ID        uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	Company   string    `gorm:"column:company;size:150;not null" json:"company"`
	Email     string    `gorm:"column:email;size:150;not null" json:"email"`
	Program   string    `gorm:"column:program;size:150;default:Summer Internship 2026;not null" json:"program"`
	Status    string    `gorm:"column:status;size:30;default:invited;not null" json:"status"`
	CreatedAt time.Time `gorm:"column:created_at" json:"created_at"`
}

func (CompanyPartner) TableName() string {
	return "company_partners"
}

