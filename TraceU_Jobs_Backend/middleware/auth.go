package middleware

import (
	"crypto/hmac"
	"crypto/rand"
	"crypto/sha256"
	"crypto/subtle"
	"encoding/base64"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"

	"traceu-jobs-backend/domain"
	"traceu-jobs-backend/model"
)

type tokenClaims struct {
	Sub   uint   `json:"sub"`
	Email string `json:"email"`
	Role  string `json:"role"`
	Exp   int64  `json:"exp"`
}

func jwtSecret() []byte {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		secret = "traceu-jobs-dev-secret-change-in-production"
	}
	return []byte(secret)
}

// HashPassword creates a salted SHA-256 hash formatted as "<salt>$<hash>".
func HashPassword(password string) (string, error) {
	salt := make([]byte, 16)
	if _, err := rand.Read(salt); err != nil {
		return "", err
	}
	sum := sha256.Sum256(append(salt, []byte(password)...))
	return hex.EncodeToString(salt) + "$" + hex.EncodeToString(sum[:]), nil
}

// VerifyPassword compares a plaintext password against a stored "<salt>$<hash>" value.
func VerifyPassword(password, encoded string) bool {
	parts := strings.SplitN(encoded, "$", 2)
	if len(parts) != 2 {
		return false
	}
	salt, err := hex.DecodeString(parts[0])
	if err != nil {
		return false
	}
	expectedHash, err := hex.DecodeString(parts[1])
	if err != nil {
		return false
	}
	actual := sha256.Sum256(append(salt, []byte(password)...))
	return subtle.ConstantTimeCompare(actual[:], expectedHash) == 1
}

// GenerateToken signs an HMAC-SHA256 bearer token valid for 24 hours.
func GenerateToken(admin domain.AdminUser) (string, error) {
	token, _, err := GenerateTokenWithTTL(admin, 24*time.Hour)
	return token, err
}

// GenerateTokenWithTTL signs an HMAC-SHA256 bearer token with a custom expiration duration.
func GenerateTokenWithTTL(admin domain.AdminUser, ttl time.Duration) (string, int64, error) {
	expiresAt := time.Now().Add(ttl).Unix()
	headerB64 := base64.RawURLEncoding.EncodeToString([]byte(`{"alg":"HS256","typ":"JWT"}`))
	claimsBytes, err := json.Marshal(tokenClaims{
		Sub:   admin.ID,
		Email: admin.Email,
		Role:  admin.Role,
		Exp:   expiresAt,
	})
	if err != nil {
		return "", 0, err
	}
	payloadB64 := base64.RawURLEncoding.EncodeToString(claimsBytes)
	signingInput := headerB64 + "." + payloadB64

	mac := hmac.New(sha256.New, jwtSecret())
	mac.Write([]byte(signingInput))
	sigB64 := base64.RawURLEncoding.EncodeToString(mac.Sum(nil))
	return signingInput + "." + sigB64, expiresAt, nil
}

// ParseToken validates an HMAC-SHA256 bearer token and returns its claims.
func ParseToken(token string) (*tokenClaims, error) {
	parts := strings.Split(token, ".")
	if len(parts) != 3 {
		return nil, errors.New("invalid token format")
	}

	signingInput := parts[0] + "." + parts[1]
	mac := hmac.New(sha256.New, jwtSecret())
	mac.Write([]byte(signingInput))
	expectedSig := mac.Sum(nil)

	actualSig, err := base64.RawURLEncoding.DecodeString(parts[2])
	if err != nil || !hmac.Equal(actualSig, expectedSig) {
		return nil, errors.New("invalid token signature")
	}

	payloadBytes, err := base64.RawURLEncoding.DecodeString(parts[1])
	if err != nil {
		return nil, fmt.Errorf("invalid token payload: %w", err)
	}

	var claims tokenClaims
	if err := json.Unmarshal(payloadBytes, &claims); err != nil {
		return nil, err
	}
	if time.Now().Unix() > claims.Exp {
		return nil, errors.New("token expired")
	}
	return &claims, nil
}

// AdminAuthMiddleware protects admin endpoints using a Bearer token.
func AdminAuthMiddleware(c *fiber.Ctx) error {
	authHeader := c.Get("Authorization")
	if !strings.HasPrefix(authHeader, "Bearer ") {
		return c.Status(fiber.StatusUnauthorized).JSON(model.APIResponse{
			Success: false,
			Message: "Missing or invalid Authorization header",
		})
	}

	token := strings.TrimSpace(strings.TrimPrefix(authHeader, "Bearer "))
	claims, err := ParseToken(token)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(model.APIResponse{
			Success: false,
			Message: "Unauthorized",
			Error:   err.Error(),
		})
	}

	c.Locals("admin_id", claims.Sub)
	c.Locals("admin_email", claims.Email)
	c.Locals("admin_role", claims.Role)
	return c.Next()
}

