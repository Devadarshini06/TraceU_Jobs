package domain

import "time"

// AdminUser represents an administrator account in MySQL.
type AdminUser struct {
	ID           uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	Name         string    `gorm:"column:name;size:100;not null" json:"name"`
	Email        string    `gorm:"column:email;size:150;unique;not null" json:"email"`
	PasswordHash string    `gorm:"column:password_hash;size:255;not null" json:"-"`
	Role         string    `gorm:"column:role;size:50;default:Administrator;not null" json:"role"`
	AvatarURL    string    `gorm:"column:avatar_url;size:255" json:"avatar_url"`
	Provider     string    `gorm:"column:provider;size:30;default:local;not null" json:"provider"`
	CreatedAt    time.Time `gorm:"column:created_at" json:"created_at"`
	UpdatedAt    time.Time `gorm:"column:updated_at" json:"updated_at"`
}

// TableName explicitly maps the struct to the admins table.
func (AdminUser) TableName() string {
	return "admins"
}

// AdminAccessRequest stores "Request Access" submissions from the admin login page.
type AdminAccessRequest struct {
	ID        uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	Name      string    `gorm:"column:name;size:120;not null" json:"name"`
	Email     string    `gorm:"column:email;size:150;not null" json:"email"`
	Reason    string    `gorm:"column:reason;size:255" json:"reason"`
	Status    string    `gorm:"column:status;size:30;default:pending;not null" json:"status"`
	CreatedAt time.Time `gorm:"column:created_at" json:"created_at"`
}

func (AdminAccessRequest) TableName() string {
	return "admin_access_requests"
}

// PasswordResetToken stores short-lived tokens for admin password resets.
type PasswordResetToken struct {
	ID        uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	Email     string    `gorm:"column:email;size:150;not null;index" json:"email"`
	Token     string    `gorm:"column:token;size:128;unique;not null" json:"token"`
	ExpiresAt time.Time `gorm:"column:expires_at;not null" json:"expires_at"`
	Used      bool      `gorm:"column:used;default:false;not null" json:"used"`
	CreatedAt time.Time `gorm:"column:created_at" json:"created_at"`
}

func (PasswordResetToken) TableName() string {
	return "password_reset_tokens"
}
