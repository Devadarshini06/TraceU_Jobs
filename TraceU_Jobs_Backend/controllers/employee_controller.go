package controllers

import (
	"github.com/gofiber/fiber/v2"

	"traceu-jobs-backend/database"
	"traceu-jobs-backend/domain"
	"traceu-jobs-backend/model"
)

// GetEmployees retrieves all employee records from MySQL
func GetEmployees(c *fiber.Ctx) error {
	var employees []domain.Employee

	if result := database.DB.Find(&employees); result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to fetch employees from database",
			Error:   result.Error.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(model.APIResponse{
		Success: true,
		Message: "Employees retrieved successfully",
		Data:    employees,
	})
}

// GetEmployeeByID retrieves a single employee by ID from MySQL
func GetEmployeeByID(c *fiber.Ctx) error {
	id := c.Params("id")
	var employee domain.Employee

	if result := database.DB.First(&employee, id); result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(model.APIResponse{
			Success: false,
			Message: "Employee not found",
			Error:   result.Error.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(model.APIResponse{
		Success: true,
		Message: "Employee found",
		Data:    employee,
	})
}

// CreateEmployee creates a new employee record in MySQL
func CreateEmployee(c *fiber.Ctx) error {
	var req model.CreateEmployeeRequest

	// Parse JSON body
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Invalid request payload",
			Error:   err.Error(),
		})
	}

	// Validation
	if req.Name == "" || req.Email == "" {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Name and Email are required fields",
		})
	}

	// Create domain entity
	employee := domain.Employee{
		Name:       req.Name,
		Email:      req.Email,
		Position:   req.Position,
		Department: req.Department,
		Salary:     req.Salary,
	}

	// Insert into MySQL via GORM
	if result := database.DB.Create(&employee); result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to create employee in database",
			Error:   result.Error.Error(),
		})
	}

	return c.Status(fiber.StatusCreated).JSON(model.APIResponse{
		Success: true,
		Message: "Employee created successfully",
		Data:    employee,
	})
}

// UpdateEmployeeName updates only the name of an existing employee by ID
func UpdateEmployeeName(c *fiber.Ctx) error {
	id := c.Params("id")
	var req model.UpdateEmployeeNameRequest

	// Parse JSON body
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Invalid request payload",
			Error:   err.Error(),
		})
	}

	// Validate name
	if req.Name == "" {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Name field cannot be empty",
		})
	}

	// Check if the employee exists
	var employee domain.Employee
	if result := database.DB.First(&employee, id); result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(model.APIResponse{
			Success: false,
			Message: "Employee not found",
			Error:   result.Error.Error(),
		})
	}

	// Update only the 'name' column in MySQL
	if result := database.DB.Model(&employee).Update("name", req.Name); result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to update employee name",
			Error:   result.Error.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(model.APIResponse{
		Success: true,
		Message: "Employee name updated successfully",
		Data:    employee,
	})
}

// DeleteEmployee deletes an employee record by ID from MySQL
func DeleteEmployee(c *fiber.Ctx) error {
	id := c.Params("id")
	var employee domain.Employee

	// Check if the employee exists before deleting
	if result := database.DB.First(&employee, id); result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(model.APIResponse{
			Success: false,
			Message: "Employee not found",
			Error:   result.Error.Error(),
		})
	}

	// Delete from MySQL via GORM
	if result := database.DB.Delete(&employee); result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to delete employee",
			Error:   result.Error.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(model.APIResponse{
		Success: true,
		Message: "Employee deleted successfully",
	})
}
