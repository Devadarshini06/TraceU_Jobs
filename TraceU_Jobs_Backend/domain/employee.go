package domain

import "time"

// Employee represents the entity in the MySQL database
type Employee struct {
	ID         uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	Name       string    `gorm:"column:name;size:100;not null" json:"name"`
	Email      string    `gorm:"column:email;size:100;unique;not null" json:"email"`
	Position   string    `gorm:"column:position;size:100;not null" json:"position"`
	Department string    `gorm:"column:department;size:100;not null" json:"department"`
	Salary     float64   `gorm:"column:salary;type:decimal(10,2);not null" json:"salary"`
	CreatedAt  time.Time `gorm:"column:created_at" json:"created_at"`
	UpdatedAt  time.Time `gorm:"column:updated_at" json:"updated_at"`
}

// TableName explicitly maps the struct to the MySQL table name
func (Employee) TableName() string {
	return "employees"
}
