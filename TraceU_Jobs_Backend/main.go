package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"

	"traceu-jobs-backend/database"
	"traceu-jobs-backend/routes"
)

func main() {
	// 1. Connect to Database & Migrate Tables
	database.ConnectDB()
	database.AutoMigrateAndSeed()

	// 2. Initialize Fiber App with CORS
	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
		AllowMethods: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
	}))

	// 3. Static uploads & Routes
	app.Static("/uploads", "./uploads")
	routes.SetupRoutes(app)

	// 4. Start Server
	log.Fatal(app.Listen(":3000"))
}
