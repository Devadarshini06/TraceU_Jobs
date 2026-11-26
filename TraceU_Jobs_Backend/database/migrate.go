package database

import (
	"log"

	"traceu-jobs-backend/domain"
	"traceu-jobs-backend/middleware"
)

// AutoMigrateAndSeed creates missing tables and seeds a default admin user if none exist.
func AutoMigrateAndSeed() {
	if DB == nil {
		return
	}

	err := DB.AutoMigrate(
		&domain.Employee{},
		&domain.AdminUser{},
		&domain.AdminAccessRequest{},
		&domain.PasswordResetToken{},
		&domain.Requisition{},
		&domain.Job{},
		&domain.Candidate{},
		&domain.Application{},
		&domain.Interview{},
		&domain.ActivityLog{},
		&domain.CareersSyncConfig{},
	)
	if err != nil {
		log.Printf("⚠️ AutoMigrate failed: %v", err)
		return
	}

	var count int64
	DB.Model(&domain.AdminUser{}).Count(&count)
	if count == 0 {
		hash, err := middleware.HashPassword("Admin@123")
		if err != nil {
			log.Printf("⚠️ Failed to hash default admin password: %v", err)
			return
		}
		DB.Create(&domain.AdminUser{
			Name:         "Admin",
			Email:        "admin@traceu.in",
			PasswordHash: hash,
			Role:         "Administrator",
		})
		log.Println("✅ Seeded default admin user: admin@traceu.in")
	}

	var syncCount int64
	DB.Model(&domain.CareersSyncConfig{}).Count(&syncCount)
	if syncCount == 0 {
		DB.Create(&domain.CareersSyncConfig{
			WebsiteURL:   "https://careers.traceu.com",
			Connected:    true,
			AutoSync:     true,
			JobsUpdated:  0,
			JobsImported: 0,
		})
	}
}

