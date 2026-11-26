import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

// material-ui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

// icons
import MailOutlined from '@ant-design/icons/MailOutlined';
import LockOutlined from '@ant-design/icons/LockOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined';
import CrownOutlined from '@ant-design/icons/CrownOutlined';
import BankOutlined from '@ant-design/icons/BankOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';

// project imports
import { GoogleIcon, LinkedInIcon } from 'components/icons/SocialIcons';
import { adminForgotPassword, adminLogin, adminOAuthLogin } from 'api/adminAuth';

// ==============================|| TRACEU LOGIN CARD ||============================== //

export default function TraceULoginCard({ portalType }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Portal configuration - Unified for identical layout & typography
  const config = {
    admin: {
      badgeIcon: <CrownOutlined style={{ fontSize: 22, color: '#6929e2' }} />,
      badgeBg: '#f3edff',
      title: 'Admin Login',
      subtitle: 'Enter your administrator credentials to sign in to the platform.',
      emailLabel: 'Admin Email Address',
      emailPlaceholder: 'Enter admin email',
      passwordPlaceholder: 'Enter password',
      footerNote: '🔒 Authorized Administrators Only',
      bottomBox: {
        title: 'New to TraceU Jobs?',
        desc: 'Contact administrator for platform access.',
        action: { label: 'Request Access', to: '/register' }
      }
    },
    employer: {
      badgeIcon: <BankOutlined style={{ fontSize: 22, color: '#6929e2' }} />,
      badgeBg: '#f3edff',
      title: 'Employer Login',
      subtitle: 'Enter your company or recruiter credentials to sign in.',
      emailLabel: 'Work Email Address',
      emailPlaceholder: 'Enter work email',
      passwordPlaceholder: 'Enter password',
      footerNote: '🔒 Secure Employer Access',
      bottomBox: {
        title: 'New to TraceU Jobs?',
        desc: 'Create a company account and start hiring.',
        action: { label: 'Register Free', to: '/register' }
      }
    },
    candidate: {
      badgeIcon: <UserOutlined style={{ fontSize: 22, color: '#6929e2' }} />,
      badgeBg: '#f3edff',
      title: 'Candidate Login',
      subtitle: 'Enter your candidate credentials to sign in.',
      emailLabel: 'Candidate Email Address',
      emailPlaceholder: 'Enter email',
      passwordPlaceholder: 'Enter password',
      footerNote: '🔒 Secure Candidate Access',
      bottomBox: {
        title: 'New to TraceU Jobs?',
        desc: 'Create an account to apply for top jobs.',
        action: { label: 'Register Free', to: '/register' }
      }
    }
  }[portalType] || {};

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim() || !password) {
      setError('Please enter both email address and password.');
      return;
    }

    if (portalType === 'admin') {
      setLoading(true);
      try {
        const res = await adminLogin({
          email,
          password,
          keepSignedIn: rememberMe
        });
        const adminName = res?.data?.admin?.name || 'Admin';
        setSuccess(`Signing in as ${adminName}... Redirecting to Admin Dashboard...`);
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 250);
      } catch (err) {
        setLoading(false);
        setError(err.message || 'Unable to sign in to Admin Portal');
      }
      return;
    }

    // Active portal role
    const activeRole = portalType === 'employer' ? 'hr' : portalType;
    const trimmedEmail = email.trim();
    const displayName = trimmedEmail
      .split('@')[0]
      .replace(/[._]/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());

    localStorage.setItem('traceu_current_portal', activeRole);
    localStorage.setItem(
      'traceu_auth_user',
      JSON.stringify({
        name: displayName,
        email: trimmedEmail,
        role: activeRole
      })
    );

    const targetDashboard = {
      employer: '/hr/dashboard',
      candidate: '/candidate/dashboard'
    }[portalType] || '/candidate/dashboard';

    setLoading(true);
    setSuccess(`Signing in as ${displayName}... Redirecting to ${config.title ? config.title.replace('Login', 'Dashboard') : 'Dashboard'}...`);
    setTimeout(() => {
      navigate(targetDashboard);
    }, 250);
  };

  const handleOAuthLogin = async (provider) => {
    setError('');
    setSuccess('');

    if (!email.trim()) {
      setError(`Please enter your email address to continue with ${provider}.`);
      return;
    }

    if (portalType === 'admin') {
      setLoading(true);
      try {
        const res = await adminOAuthLogin(provider, {
          email,
          keepSignedIn: rememberMe
        });
        const adminName = res?.data?.admin?.name || 'Admin';
        setSuccess(`Signed in with ${provider} as ${adminName}... Redirecting...`);
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 250);
      } catch (err) {
        setLoading(false);
        setError(err.message || `Unable to sign in with ${provider}`);
      }
      return;
    }

    const activeRole = portalType === 'employer' ? 'hr' : portalType;
    const trimmedEmail = email.trim();
    const displayName = trimmedEmail
      .split('@')[0]
      .replace(/[._]/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());

    localStorage.setItem('traceu_current_portal', activeRole);
    localStorage.setItem(
      'traceu_auth_user',
      JSON.stringify({
        name: displayName,
        email: trimmedEmail,
        role: activeRole
      })
    );

    const targetDashboard = {
      employer: '/hr/dashboard',
      candidate: '/candidate/dashboard'
    }[portalType] || '/candidate/dashboard';

    setLoading(true);
    setSuccess(`Signing in with ${provider}... Redirecting...`);
    setTimeout(() => {
      navigate(targetDashboard);
    }, 250);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (portalType !== 'admin') {
      setSuccess('Password reset link sent to your registered email.');
      return;
    }

    if (!email.trim()) {
      setError('Please enter your admin email address first.');
      return;
    }

    try {
      const res = await adminForgotPassword(email);
      setSuccess(res?.message || 'If the email exists, password reset instructions have been generated.');
    } catch (err) {
      setError(err.message || 'Failed to request password reset');
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        p: { xs: 3, sm: 4 },
        borderRadius: '20px',
        bgcolor: '#ffffff',
        boxShadow: '0 20px 45px rgba(83, 14, 240, 0.08), 0 2px 8px rgba(0, 0, 0, 0.03)',
        border: '1px solid rgba(230, 232, 245, 0.9)',
        width: '100%',
        maxWidth: 480,
        mx: 'auto',
        fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`
      }}
    >
      {/* Interactive Portal Switcher Tabs */}
      <Stack
        direction="row"
        spacing={0.5}
        alignItems="center"
        sx={{
          bgcolor: '#f1f5f9',
          p: 0.5,
          borderRadius: '10px',
          mb: 3,
          minHeight: 42
        }}
      >
        <Button
          fullWidth
          size="small"
          onClick={() => navigate('/candidate-login')}
          sx={{
            height: 34,
            minHeight: 34,
            borderRadius: '8px',
            fontSize: 13,
            fontWeight: portalType === 'candidate' ? 600 : 500,
            color: portalType === 'candidate' ? '#530EF0' : '#4B5563',
            bgcolor: portalType === 'candidate' ? '#FFFFFF' : 'transparent',
            boxShadow: portalType === 'candidate' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
            textTransform: 'none',
            whiteSpace: 'nowrap',
            px: 1,
            '&:hover': { bgcolor: portalType === 'candidate' ? '#FFFFFF' : '#E2E8F0' }
          }}
        >
          Candidate
        </Button>
        <Button
          fullWidth
          size="small"
          onClick={() => navigate('/employer-login')}
          sx={{
            height: 34,
            minHeight: 34,
            borderRadius: '8px',
            fontSize: 13,
            fontWeight: portalType === 'employer' ? 600 : 500,
            color: portalType === 'employer' ? '#530EF0' : '#4B5563',
            bgcolor: portalType === 'employer' ? '#FFFFFF' : 'transparent',
            boxShadow: portalType === 'employer' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
            textTransform: 'none',
            whiteSpace: 'nowrap',
            px: 1,
            '&:hover': { bgcolor: portalType === 'employer' ? '#FFFFFF' : '#E2E8F0' }
          }}
        >
          Employer (HR)
        </Button>
        <Button
          fullWidth
          size="small"
          onClick={() => navigate('/admin-login')}
          sx={{
            height: 34,
            minHeight: 34,
            borderRadius: '8px',
            fontSize: 13,
            fontWeight: portalType === 'admin' ? 600 : 500,
            color: portalType === 'admin' ? '#530EF0' : '#4B5563',
            bgcolor: portalType === 'admin' ? '#FFFFFF' : 'transparent',
            boxShadow: portalType === 'admin' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
            textTransform: 'none',
            whiteSpace: 'nowrap',
            px: 1,
            '&:hover': { bgcolor: portalType === 'admin' ? '#FFFFFF' : '#E2E8F0' }
          }}
        >
          Admin
        </Button>
      </Stack>

      {/* Top Badge Icon (For Admin & Employer & Candidate) */}
      {config.badgeIcon && (
        <Box
          sx={{
            width: 46,
            height: 46,
            borderRadius: '12px',
            bgcolor: config.badgeBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2.2
          }}
        >
          {config.badgeIcon}
        </Box>
      )}

      {/* Header Titles */}
      <Typography variant="h1" sx={{ fontWeight: 700, fontSize: { xs: 22, sm: 24 }, color: '#111827', mb: 0.8, letterSpacing: '-0.3px' }}>
        {config.title}
      </Typography>
      <Typography variant="body1" sx={{ color: '#6b7280', fontSize: 14, fontWeight: 400, mb: 2.8, lineHeight: 1.5, minHeight: { sm: 40 } }}>
        {config.subtitle}
      </Typography>

      {/* Alert Messages */}
      {error && (
        <Alert severity="error" sx={{ mb: 2.5, borderRadius: '10px', fontSize: 13, fontWeight: 400 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2.5, borderRadius: '10px', fontSize: 13, fontWeight: 400 }}>
          {success}
        </Alert>
      )}

      {/* Login Form */}
      <Box component="form" onSubmit={handleSubmit} noValidate>
        {/* Email Field */}
        <Box sx={{ mb: 2 }}>
          <Typography component="label" sx={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1f2937', mb: 0.8 }}>
            {config.emailLabel}
          </Typography>
          <TextField
            fullWidth
            required
            type="email"
            placeholder={config.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlined style={{ color: '#9ca3af', fontSize: 16 }} />
                  </InputAdornment>
                )
              }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                bgcolor: '#fafbff',
                '&:hover fieldset': {
                  borderColor: '#530EF0'
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#530EF0',
                  borderWidth: 2
                }
              },
              '& input': {
                py: 1,
                fontSize: 14,
                fontWeight: 400
              }
            }}
          />
        </Box>

        {/* Password Field */}
        <Box sx={{ mb: 2 }}>
          <Typography component="label" sx={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1f2937', mb: 0.8 }}>
            Password
          </Typography>
          <TextField
            fullWidth
            required
            type={showPassword ? 'text' : 'password'}
            placeholder={config.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined style={{ color: '#9ca3af', fontSize: 16 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                      sx={{ color: '#9ca3af' }}
                    >
                      {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </IconButton>
                  </InputAdornment>
                )
              }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                bgcolor: '#fafbff',
                '&:hover fieldset': {
                  borderColor: '#530EF0'
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#530EF0',
                  borderWidth: 2
                }
              },
              '& input': {
                py: 1,
                fontSize: 14,
                fontWeight: 400
              }
            }}
          />
        </Box>

        {/* Remember Me & Forgot Password */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2.8 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                size="small"
                sx={{
                  color: '#d1d5db',
                  '&.Mui-checked': {
                    color: '#6929e2'
                  }
                }}
              />
            }
            label={
              <Typography sx={{ fontSize: 13, fontWeight: 400, color: '#4b5563', userSelect: 'none' }}>
                Keep me signed in
              </Typography>
            }
          />
          <Link
            component={RouterLink}
            to="#"
            onClick={handleForgotPassword}
            sx={{
              fontSize: 13,
              fontWeight: 600,
              color: '#6929e2',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            Forgot password?
          </Link>
        </Stack>

        {/* Submit Button */}
        <Button
          fullWidth
          type="submit"
          disabled={loading}
          variant="contained"
          sx={{
            height: 44,
            minHeight: 44,
            borderRadius: '8px',
            bgcolor: '#530EF0',
            boxShadow: '0 4px 14px rgba(83, 14, 240, 0.3)',
            fontSize: 14,
            fontWeight: 600,
            textTransform: 'none',
            color: '#ffffff',
            gap: 1,
            '&:hover': {
              bgcolor: '#430BC2',
              boxShadow: '0 6px 18px rgba(83, 14, 240, 0.4)'
            }
          }}
        >
          {loading ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            <>
              Login <ArrowRightOutlined style={{ fontSize: 14 }} />
            </>
          )}
        </Button>
      </Box>

      {/* Divider */}
      <Divider sx={{ my: 2.6, color: '#9ca3af', fontSize: 12, fontWeight: 500 }}>
        OR
      </Divider>

      {/* Social Logins - Unified across all portals */}
      <Stack direction="row" spacing={1.5}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => handleOAuthLogin('Google')}
          startIcon={<GoogleIcon size={18} />}
          sx={{
            height: 40,
            minHeight: 40,
            borderRadius: '8px',
            borderColor: '#e5e7eb',
            color: '#1f2937',
            fontSize: 13.5,
            fontWeight: 600,
            textTransform: 'none',
            bgcolor: '#ffffff',
            '&:hover': {
              bgcolor: '#f9fafb',
              borderColor: '#d1d5db'
            }
          }}
        >
          Google
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => handleOAuthLogin('LinkedIn')}
          startIcon={<LinkedInIcon size={18} />}
          sx={{
            height: 40,
            minHeight: 40,
            borderRadius: '8px',
            borderColor: '#e5e7eb',
            color: '#1f2937',
            fontSize: 13.5,
            fontWeight: 600,
            textTransform: 'none',
            bgcolor: '#ffffff',
            '&:hover': {
              bgcolor: '#f9fafb',
              borderColor: '#d1d5db'
            }
          }}
        >
          LinkedIn
        </Button>
      </Stack>

      {/* Bottom Announcement / Register Card - Uniform height & alignment */}
      {config.bottomBox && (
        <Box
          sx={{
            mt: 2.8,
            p: 1.8,
            minHeight: 66,
            borderRadius: '12px',
            bgcolor: '#f6f4fe',
            border: '1px solid #ebe5fc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1.5
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 600, fontSize: 13.5, color: '#1e1b4b', mb: 0.3 }}>
              {config.bottomBox.title}
            </Typography>
            <Typography sx={{ fontSize: 12, fontWeight: 400, color: '#6b7280', lineHeight: 1.4 }}>
              {config.bottomBox.desc}
            </Typography>
          </Box>

          {config.bottomBox.action && (
            <Button
              component={RouterLink}
              to={config.bottomBox.action.to}
              variant="outlined"
              size="small"
              sx={{
                flexShrink: 0,
                minWidth: 104,
                height: 32,
                minHeight: 32,
                borderRadius: '8px',
                borderColor: '#530EF0',
                color: '#530EF0',
                bgcolor: '#ffffff',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: 12,
                px: 1.5,
                whiteSpace: 'nowrap',
                '&:hover': {
                  bgcolor: '#f3edff',
                  borderColor: '#430BC2'
                }
              }}
            >
              {config.bottomBox.action.label}
            </Button>
          )}
        </Box>
      )}

      {/* Security & Trust Footer Note */}
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mt: 3, pt: 2, borderTop: '1px solid #f1f5f9' }}>
        <Typography sx={{ fontSize: 12, fontWeight: 400, color: '#6b7280' }}>
          {config.footerNote}
        </Typography>
        <Typography sx={{ fontSize: 12, color: '#9ca3af' }}>•</Typography>
        <Typography sx={{ fontSize: 12, color: '#10b981', fontWeight: 500 }}>
          🔒 256-bit SSL
        </Typography>
      </Stack>
    </Card>
  );
}

TraceULoginCard.propTypes = {
  portalType: PropTypes.oneOf(['admin', 'employer', 'candidate']).isRequired
};
