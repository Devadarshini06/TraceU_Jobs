package model

import "time"

// CreateEmployeeRequest defines the payload required to create a new employee
type CreateEmployeeRequest struct {
	Name       string  `json:"name"`
	Email      string  `json:"email"`
	Position   string  `json:"position"`
	Department string  `json:"department"`
	Salary     float64 `json:"salary"`
}

// UpdateEmployeeNameRequest defines the payload to update only the employee's name
type UpdateEmployeeNameRequest struct {
	Name string `json:"name"`
}

// EmployeeResponse formats employee data for API responses
type EmployeeResponse struct {
	ID         uint      `json:"id"`
	Name       string    `json:"name"`
	Email      string    `json:"email"`
	Position   string    `json:"position"`
	Department string    `json:"department"`
	Salary     float64   `json:"salary"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}

// APIResponse represents standard API output
type APIResponse struct {
	Success bool        `json:"success"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty"`
}
