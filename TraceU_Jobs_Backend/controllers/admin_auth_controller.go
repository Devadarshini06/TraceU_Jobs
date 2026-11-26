package controllers

import (
	"crypto/rand"
	"encoding/hex"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"

	"traceu-jobs-backend/database"
	"traceu-jobs-backend/domain"
	"traceu-jobs-backend/middleware"
	"traceu-jobs-backend/model"
)

func tokenTTL(keepSignedIn bool) time.Duration {
	if keepSignedIn {
		return 30 * 24 * time.Hour
	}
	return 24 * time.Hour
}

func buildLoginResponse(admin domain.AdminUser, keepSignedIn bool) (model.AdminLoginResponse, error) {
	token, expiresAt, err := middleware.GenerateTokenWithTTL(admin, tokenTTL(keepSignedIn))
	if err != nil {
		return model.AdminLoginResponse{}, err
	}
	return model.AdminLoginResponse{
		Token:     token,
		ExpiresAt: expiresAt,
		Admin: model.AdminProfile{
			ID:        admin.ID,
			Name:      admin.Name,
			Email:     admin.Email,
			Role:      admin.Role,
			AvatarURL: admin.AvatarURL,
		},
	}, nil
}

// AdminLogin authenticates an administrator via credentials or 1-click direct access.
func AdminLogin(c *fiber.Ctx) error {
	var req model.AdminLoginRequest
	// Allow empty body for 1-click direct access
	if len(c.Body()) > 0 {
		if err := c.BodyParser(&req); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
				Success: false,
				Message: "Invalid request payload",
				Error:   err.Error(),
			})
		}
	}

	email := strings.TrimSpace(strings.ToLower(req.Email))
	var admin domain.AdminUser

	if email == "" && req.Password == "" {
		// Direct 1-Click Access (No credentials required)
		if result := database.DB.Order("id ASC").First(&admin); result.Error != nil {
			return c.Status(fiber.StatusUnauthorized).JSON(model.APIResponse{
				Success: false,
				Message: "No admin account configured for direct access",
			})
		}
	} else {
		if email == "" || req.Password == "" {
			return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
				Success: false,
				Message: "Both email and password are required when signing in with credentials",
			})
		}
		if result := database.DB.Where("LOWER(email) = ?", email).First(&admin); result.Error != nil {
			return c.Status(fiber.StatusUnauthorized).JSON(model.APIResponse{
				Success: false,
				Message: "Invalid email or password",
			})
		}
		if !middleware.VerifyPassword(req.Password, admin.PasswordHash) {
			return c.Status(fiber.StatusUnauthorized).JSON(model.APIResponse{
				Success: false,
				Message: "Invalid email or password",
			})
		}
	}

	resp, err := buildLoginResponse(admin, req.KeepSignedIn)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to generate authentication token",
			Error:   err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(model.APIResponse{
		Success: true,
		Message: "Login successful",
		Data:    resp,
	})
}

// AdminOAuthLogin handles Google or LinkedIn sign-in for the admin portal.
func AdminOAuthLogin(c *fiber.Ctx) error {
	provider := strings.ToLower(c.Params("provider"))
	if provider != "google" && provider != "linkedin" {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Unsupported OAuth provider (use google or linkedin)",
		})
	}

	var req model.OAuthLoginRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Invalid request payload",
			Error:   err.Error(),
		})
	}

	email := strings.TrimSpace(strings.ToLower(req.Email))
	if email == "" {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Email is required for OAuth login",
		})
	}

	var admin domain.AdminUser
	if result := database.DB.Where("LOWER(email) = ?", email).First(&admin); result.Error != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(model.APIResponse{
			Success: false,
			Message: "This account does not have admin portal access. Please request access.",
		})
	}

	if req.AvatarURL != "" && admin.AvatarURL != req.AvatarURL {
		database.DB.Model(&admin).Updates(map[string]interface{}{
			"avatar_url": req.AvatarURL,
			"provider":   provider,
		})
		admin.AvatarURL = req.AvatarURL
	}

	resp, err := buildLoginResponse(admin, req.KeepSignedIn)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to generate authentication token",
			Error:   err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(model.APIResponse{
		Success: true,
		Message: "OAuth login successful",
		Data:    resp,
	})
}

// AdminForgotPassword generates a short-lived password reset token for an existing admin.
func AdminForgotPassword(c *fiber.Ctx) error {
	var req model.ForgotPasswordRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Invalid request payload",
			Error:   err.Error(),
		})
	}

	email := strings.TrimSpace(strings.ToLower(req.Email))
	if email == "" {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Email is required",
		})
	}

	var admin domain.AdminUser
	if result := database.DB.Where("LOWER(email) = ?", email).First(&admin); result.Error != nil {
		// Return generic success to avoid leaking whether an email exists
		return c.Status(fiber.StatusOK).JSON(model.APIResponse{
			Success: true,
			Message: "If the email exists, password reset instructions have been generated",
		})
	}

	raw := make([]byte, 24)
	if _, err := rand.Read(raw); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to generate reset token",
		})
	}
	tokenStr := hex.EncodeToString(raw)

	resetRecord := domain.PasswordResetToken{
		Email:     admin.Email,
		Token:     tokenStr,
		ExpiresAt: time.Now().Add(15 * time.Minute),
	}
	database.DB.Create(&resetRecord)

	return c.Status(fiber.StatusOK).JSON(model.APIResponse{
		Success: true,
		Message: "Password reset token generated",
		Data: fiber.Map{
			"reset_token": tokenStr,
			"expires_at":  resetRecord.ExpiresAt,
		},
	})
}

// AdminResetPassword updates an admin's password using a valid reset token.
func AdminResetPassword(c *fiber.Ctx) error {
	var req model.ResetPasswordRequest
	if err := c.BodyParser(&req); err != nil || req.Token == "" || len(req.NewPassword) < 6 {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Valid reset token and new_password (min 6 chars) are required",
		})
	}

	var resetRecord domain.PasswordResetToken
	if result := database.DB.Where("token = ? AND used = ?", req.Token, false).First(&resetRecord); result.Error != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Invalid or already used reset token",
		})
	}
	if time.Now().After(resetRecord.ExpiresAt) {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Reset token has expired",
		})
	}

	hash, err := middleware.HashPassword(req.NewPassword)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to hash new password",
		})
	}

	database.DB.Model(&domain.AdminUser{}).Where("LOWER(email) = ?", strings.ToLower(resetRecord.Email)).Update("password_hash", hash)
	database.DB.Model(&resetRecord).Update("used", true)

	return c.Status(fiber.StatusOK).JSON(model.APIResponse{
		Success: true,
		Message: "Password updated successfully",
	})
}

// AdminRequestAccess records a "Request Access" submission from the admin login page.
func AdminRequestAccess(c *fiber.Ctx) error {
	var req model.RequestAccessPayload
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Invalid request payload",
			Error:   err.Error(),
		})
	}

	req.Name = strings.TrimSpace(req.Name)
	req.Email = strings.TrimSpace(strings.ToLower(req.Email))
	if req.Name == "" || req.Email == "" {
		return c.Status(fiber.StatusBadRequest).JSON(model.APIResponse{
			Success: false,
			Message: "Name and email are required",
		})
	}

	entry := domain.AdminAccessRequest{
		Name:   req.Name,
		Email:  req.Email,
		Reason: strings.TrimSpace(req.Reason),
		Status: "pending",
	}
	if result := database.DB.Create(&entry); result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.APIResponse{
			Success: false,
			Message: "Failed to submit access request",
			Error:   result.Error.Error(),
		})
	}

	return c.Status(fiber.StatusCreated).JSON(model.APIResponse{
		Success: true,
		Message: "Access request submitted successfully",
		Data:    entry,
	})
}

// AdminLogout acknowledges admin sign-out (client discards the bearer token).
func AdminLogout(c *fiber.Ctx) error {
	return c.Status(fiber.StatusOK).JSON(model.APIResponse{
		Success: true,
		Message: "Logged out successfully",
	})
}

// GetAdminProfile returns the currently authenticated admin user's profile.
func GetAdminProfile(c *fiber.Ctx) error {
	adminID, ok := c.Locals("admin_id").(uint)
	if !ok || adminID == 0 {
		return c.Status(fiber.StatusUnauthorized).JSON(model.APIResponse{
			Success: false,
			Message: "Unauthorized",
		})
	}

	var admin domain.AdminUser
	if result := database.DB.First(&admin, adminID); result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(model.APIResponse{
			Success: false,
			Message: "Admin user not found",
		})
	}

	return c.Status(fiber.StatusOK).JSON(model.APIResponse{
		Success: true,
		Message: "Admin profile retrieved successfully",
		Data: model.AdminProfile{
			ID:        admin.ID,
			Name:      admin.Name,
			Email:     admin.Email,
			Role:      admin.Role,
			AvatarURL: admin.AvatarURL,
		},
	})
}
