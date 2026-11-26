package middleware

import (
	"testing"

	"traceu-jobs-backend/domain"
)

func TestPasswordHashingAndVerification(t *testing.T) {
	hash, err := HashPassword("Admin@123")
	if err != nil {
		t.Fatalf("HashPassword returned error: %v", err)
	}
	if !VerifyPassword("Admin@123", hash) {
		t.Fatal("VerifyPassword failed for valid password")
	}
	if VerifyPassword("wrong-password", hash) {
		t.Fatal("VerifyPassword succeeded for invalid password")
	}
}

func TestGenerateAndParseToken(t *testing.T) {
	admin := domain.AdminUser{
		ID:    1,
		Email: "admin@traceu.in",
		Role:  "Administrator",
	}
	token, err := GenerateToken(admin)
	if err != nil {
		t.Fatalf("GenerateToken returned error: %v", err)
	}
	claims, err := ParseToken(token)
	if err != nil {
		t.Fatalf("ParseToken returned error: %v", err)
	}
	if claims.Sub != admin.ID || claims.Email != admin.Email || claims.Role != admin.Role {
		t.Fatalf("unexpected claims: %+v", claims)
	}
}

