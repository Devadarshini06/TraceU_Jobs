package database

import (
	"fmt"
	"log"
	"os"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

// DB is the global database instance
var DB *gorm.DB

// ConnectDB establishes the connection to MySQL
func ConnectDB() {
	user := os.Getenv("DB_USER")
	if user == "" {
		user = "u933738861_traceu_master"
	}
	password := os.Getenv("DB_PASSWORD")
	if password == "" {
		password = "Prajai@2023"
	}
	host := os.Getenv("DB_HOST")
	if host == "" {
		host = "srv2206.hstgr.io"
	}
	port := os.Getenv("DB_PORT")
	if port == "" {
		port = "3306"
	}
	dbname := os.Getenv("DB_NAME")
	if dbname == "" {
		dbname = "u933738861_traceu_master"
	}

	dsn := fmt.Sprintf("%s:%s@tcp4(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		user, password, host, port, dbname,
	)

	var err error
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Warn),
	})
	if err != nil {
		log.Fatalf("❌ Failed to connect to database: %v", err)
	}

	if sqlDB, err := DB.DB(); err == nil {
		sqlDB.SetMaxIdleConns(15)
		sqlDB.SetMaxOpenConns(30)
		sqlDB.SetConnMaxLifetime(30 * time.Minute)
	}

	log.Println("✅ Database connection established successfully!")
}
