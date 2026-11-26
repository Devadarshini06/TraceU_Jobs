package model

// AdminLoginRequest defines credentials for admin authentication.
// If Email and Password are both empty, 1-click direct access is used.
type AdminLoginRequest struct {
	Email        string `json:"email"`
	Password     string `json:"password"`
	KeepSignedIn bool   `json:"keep_signed_in"`
}

// AdminLoginResponse returns the access token, expiry timestamp, and admin profile.
type AdminLoginResponse struct {
	Token     string       `json:"token"`
	ExpiresAt int64        `json:"expires_at"`
	Admin     AdminProfile `json:"admin"`
}

// AdminProfile represents safe admin details returned to the frontend.
type AdminProfile struct {
	ID        uint   `json:"id"`
	Name      string `json:"name"`
	Email     string `json:"email"`
	Role      string `json:"role"`
	AvatarURL string `json:"avatar_url,omitempty"`
}

// ForgotPasswordRequest initiates an admin password reset.
type ForgotPasswordRequest struct {
	Email string `json:"email"`
}

// ResetPasswordRequest completes an admin password reset using a token.
type ResetPasswordRequest struct {
	Token       string `json:"token"`
	NewPassword string `json:"new_password"`
}

// RequestAccessPayload submits a new admin portal access request.
type RequestAccessPayload struct {
	Name   string `json:"name"`
	Email  string `json:"email"`
	Reason string `json:"reason"`
}

// OAuthLoginRequest handles Google / LinkedIn sign-in payloads from the frontend.
type OAuthLoginRequest struct {
	Email        string `json:"email"`
	Name         string `json:"name"`
	AvatarURL    string `json:"avatar_url"`
	KeepSignedIn bool   `json:"keep_signed_in"`
}
