import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// material-ui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';

// icons
import HomeOutlined from '@ant-design/icons/HomeOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import CrownOutlined from '@ant-design/icons/CrownOutlined';
import Divider from '@mui/material/Divider';

// project imports
import TraceULoginCard from './TraceULoginCard';
import { useBrand } from 'contexts/BrandContext';

// images
import adminArt from 'assets/images/auth/admin-login-hero.jpg';
import employerArt from 'assets/images/auth/employer-login-hero.jpg';
import candidateArt from 'assets/images/auth/candidate-login-v4.jpg';

// ==============================|| TRACEU LOGIN MASTER LAYOUT ||============================== //

export default function TraceULoginLayout({ portalType }) {
  const navigate = useNavigate();
  const { companyName, companyLogo, primaryColor } = useBrand();

  const initials = companyName
    ? companyName
        .split(' ')
        .filter(Boolean)
        .map((w) => w[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : 'TU';

  const heroImageMap = {
    admin: adminArt,
    employer: employerArt,
    candidate: candidateArt
  };

  const taglineMap = {
    admin: 'Platform Administration & Governance',
    employer: 'Find Talent. Build Great Teams.',
    candidate: 'Find Jobs. Build Your Career.'
  };

  const portalNameMap = {
    admin: 'Admin Portal',
    employer: 'Employer Portal',
    candidate: 'Candidate Portal'
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f8f9fd',
        backgroundImage:
          'radial-gradient(at 0% 0%, rgba(105, 41, 226, 0.05) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(105, 41, 226, 0.06) 0px, transparent 50%)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`
      }}
    >
      {/* Top Navigation Bar */}
      <Box
        component="header"
        sx={{
          py: 2,
          px: { xs: 2, sm: 3, md: 5 },
          borderBottom: '1px solid rgba(226, 232, 240, 0.6)',
          bgcolor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(8px)',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}
      >
        <Container maxWidth="xl" disableGutters>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            {/* Logo and Brand */}
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box
                onClick={() => navigate('/')}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  cursor: 'pointer',
                  userSelect: 'none'
                }}
              >
                {companyLogo ? (
                  <Box
                    component="img"
                    src={companyLogo}
                    alt={companyName || 'Logo'}
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '10px',
                      objectFit: 'contain',
                      bgcolor: '#ffffff',
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '10px',
                      background: `linear-gradient(135deg, ${primaryColor || '#6929e2'} 0%, #311075 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      fontWeight: 800,
                      fontSize: 16,
                      letterSpacing: '0.5px',
                      boxShadow: `0 4px 14px ${primaryColor || '#6929e2'}40`
                    }}
                  >
                    {initials}
                  </Box>
                )}
                <Box>
                  <Typography sx={{ fontWeight: 800, fontSize: { xs: 16, sm: 18 }, color: '#111827', lineHeight: 1.15 }}>
                    {companyName || 'TraceU Jobs'}
                  </Typography>
                  <Typography sx={{ fontSize: 11.5, color: '#6b7280', fontWeight: 500, display: { xs: 'none', sm: 'block' } }}>
                    {taglineMap[portalType]}
                  </Typography>
                </Box>
              </Box>

              <Chip
                label={portalNameMap[portalType]}
                size="small"
                sx={{
                  bgcolor: '#f3edff',
                  color: '#6929e2',
                  fontWeight: 700,
                  fontSize: 11.5,
                  height: 26,
                  borderRadius: '8px',
                  px: 0.5,
                  display: { xs: 'none', sm: 'inline-flex' }
                }}
              />
            </Stack>

            {/* Mobile Home Button */}
            <IconButton
              size="small"
              onClick={() => navigate('/')}
              sx={{
                display: { xs: 'flex', md: 'none' },
                color: '#4b5563',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                p: 0.8
              }}
            >
              <HomeOutlined style={{ fontSize: 16 }} />
            </IconButton>

            {/* Header Right Nav - Uniform Portal Switcher & Homepage Button */}
            <Stack direction="row" alignItems="center" spacing={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={() => navigate('/candidate-login')}
                startIcon={<UserOutlined style={{ fontSize: 14 }} />}
                sx={{
                  color: portalType === 'candidate' ? '#6929e2' : '#4b5563',
                  bgcolor: portalType === 'candidate' ? '#f3edff' : 'transparent',
                  fontWeight: portalType === 'candidate' ? 700 : 600,
                  fontSize: 13,
                  textTransform: 'none',
                  borderRadius: '8px',
                  px: 1.4,
                  py: 0.6,
                  '&:hover': { bgcolor: '#f3edff', color: '#6929e2' }
                }}
              >
                Candidate
              </Button>
              <Button
                onClick={() => navigate('/employer-login')}
                startIcon={<TeamOutlined style={{ fontSize: 14 }} />}
                sx={{
                  color: portalType === 'employer' ? '#6929e2' : '#4b5563',
                  bgcolor: portalType === 'employer' ? '#f3edff' : 'transparent',
                  fontWeight: portalType === 'employer' ? 700 : 600,
                  fontSize: 13,
                  textTransform: 'none',
                  borderRadius: '8px',
                  px: 1.4,
                  py: 0.6,
                  '&:hover': { bgcolor: '#f3edff', color: '#6929e2' }
                }}
              >
                Employer (HR)
              </Button>
              <Button
                onClick={() => navigate('/admin-login')}
                startIcon={<CrownOutlined style={{ fontSize: 14 }} />}
                sx={{
                  color: portalType === 'admin' ? '#6929e2' : '#4b5563',
                  bgcolor: portalType === 'admin' ? '#f3edff' : 'transparent',
                  fontWeight: portalType === 'admin' ? 700 : 600,
                  fontSize: 13,
                  textTransform: 'none',
                  borderRadius: '8px',
                  px: 1.4,
                  py: 0.6,
                  '&:hover': { bgcolor: '#f3edff', color: '#6929e2' }
                }}
              >
                Admin
              </Button>

              <Divider orientation="vertical" flexItem sx={{ height: 20, my: 'auto', mx: 0.5, borderColor: '#e5e7eb' }} />

              <Button
                variant="outlined"
                onClick={() => navigate('/')}
                startIcon={<HomeOutlined style={{ fontSize: 14 }} />}
                sx={{
                  borderColor: '#e5e7eb',
                  color: '#4b5563',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: 13,
                  borderRadius: '8px',
                  py: 0.6,
                  px: 1.6,
                  '&:hover': { bgcolor: '#f9fafb', borderColor: '#d1d5db', color: '#111827' }
                }}
              >
                Go to Homepage
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', py: { xs: 3, md: 4.5 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 3, md: 4, lg: 5 }} alignItems="center" justifyContent="center">
            {/* Left Hero Graphic Section */}
            <Grid size={{ xs: 12, md: 6, lg: 6.5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box
                sx={{
                  width: '100%',
                  aspectRatio: { xs: '1.2 / 1', md: '1.45 / 1' },
                  borderRadius: '24px',
                  overflow: 'hidden',
                  bgcolor: '#ffffff',
                  boxShadow: '0 20px 45px rgba(105, 41, 226, 0.07), 0 2px 10px rgba(0, 0, 0, 0.03)',
                  border: '1px solid rgba(230, 232, 245, 0.9)',
                  position: 'relative',
                  p: { xs: 1, md: 1.5 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Box
                  component="img"
                  src={heroImageMap[portalType]}
                  alt={`${portalType} portal overview`}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    borderRadius: '16px',
                    display: 'block'
                  }}
                />
              </Box>

              {/* Trust & capability indicators */}
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
                sx={{ mt: 2.5, px: 2 }}
              >
                <Stack direction="row" alignItems="center" spacing={0.8}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10b981' }} />
                  <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: '#4b5563' }}>
                    AI Matching
                  </Typography>
                </Stack>
                <Typography sx={{ color: '#cbd5e1' }}>•</Typography>
                <Stack direction="row" alignItems="center" spacing={0.8}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#6929e2' }} />
                  <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: '#4b5563' }}>
                    Verified Profiles
                  </Typography>
                </Stack>
                <Typography sx={{ color: '#cbd5e1' }}>•</Typography>
                <Stack direction="row" alignItems="center" spacing={0.8}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#f59e0b' }} />
                  <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: '#4b5563' }}>
                    Real-time Hiring
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            {/* Right Login Card Section */}
            <Grid size={{ xs: 12, md: 6, lg: 5.5 }}>
              <TraceULoginCard portalType={portalType} />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Bottom Footer Info */}
      <Box
        component="footer"
        sx={{
          py: 2.2,
          px: { xs: 2, sm: 4 },
          borderTop: '1px solid rgba(226, 232, 240, 0.6)',
          bgcolor: '#ffffff'
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          spacing={1.5}
          maxWidth="xl"
          sx={{ mx: 'auto' }}
        >
          <Typography sx={{ fontSize: 12, color: '#9ca3af' }}>
            © {new Date().getFullYear()} TraceU Jobs. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={2.5}>
            <Typography onClick={() => navigate('/')} sx={{ fontSize: 12, color: '#6b7280', cursor: 'pointer', '&:hover': { color: '#6929e2' } }}>
              Home
            </Typography>
            <Typography onClick={() => navigate('/')} sx={{ fontSize: 12, color: '#6b7280', cursor: 'pointer', '&:hover': { color: '#6929e2' } }}>
              Privacy Policy
            </Typography>
            <Typography onClick={() => navigate('/')} sx={{ fontSize: 12, color: '#6b7280', cursor: 'pointer', '&:hover': { color: '#6929e2' } }}>
              Terms of Service
            </Typography>
            <Typography onClick={() => navigate('/')} sx={{ fontSize: 12, color: '#6b7280', cursor: 'pointer', '&:hover': { color: '#6929e2' } }}>
              Help & Support
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

TraceULoginLayout.propTypes = {
  portalType: PropTypes.oneOf(['admin', 'employer', 'candidate']).isRequired
};

