import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';

// icons
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined';
import PlayCircleOutlined from '@ant-design/icons/PlayCircleOutlined';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import StarFilled from '@ant-design/icons/StarFilled';
import DownOutlined from '@ant-design/icons/DownOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import BankOutlined from '@ant-design/icons/BankOutlined';
import CrownOutlined from '@ant-design/icons/CrownOutlined';
import ThunderboltOutlined from '@ant-design/icons/ThunderboltOutlined';
import SafetyCertificateOutlined from '@ant-design/icons/SafetyCertificateOutlined';
import LineChartOutlined from '@ant-design/icons/LineChartOutlined';
import SolutionOutlined from '@ant-design/icons/SolutionOutlined';
import ScheduleOutlined from '@ant-design/icons/ScheduleOutlined';
import GlobalOutlined from '@ant-design/icons/GlobalOutlined';
import RobotOutlined from '@ant-design/icons/RobotOutlined';
import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import LinkedinFilled from '@ant-design/icons/LinkedinFilled';
import TwitterSquareFilled from '@ant-design/icons/TwitterSquareFilled';
import YoutubeFilled from '@ant-design/icons/YoutubeFilled';

// images
import candidateArt from 'assets/images/auth/candidate-login-v4.jpg';
import employerArt from 'assets/images/auth/employer-login-hero.jpg';
import adminArt from 'assets/images/auth/admin-login-hero.jpg';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';

// ==============================|| TRACEU JOBS - LANDING PAGE ||============================== //

export default function LandingPage() {
  const navigate = useNavigate();

  // Login dropdown menu state
  const [loginMenuAnchor, setLoginMenuAnchor] = useState(null);
  const isLoginMenuOpen = Boolean(loginMenuAnchor);

  // Video Demo Dialog State
  const [demoOpen, setDemoOpen] = useState(false);

  const handleOpenLoginMenu = (event) => {
    setLoginMenuAnchor(event.currentTarget);
  };

  const handleCloseLoginMenu = () => {
    setLoginMenuAnchor(null);
  };

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ bgcolor: '#ffffff', color: '#111827', overflowX: 'hidden' }}>
      {/* ========================================================================= */}
      {/* 1. TOP NAVBAR                                                             */}
      {/* ========================================================================= */}
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          bgcolor: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(226, 232, 240, 0.7)',
          py: 1.8,
          px: { xs: 2, sm: 4, md: 6 }
        }}
      >
        <Container maxWidth="xl" disableGutters>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            {/* Logo */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={1.5}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              sx={{ cursor: 'pointer', userSelect: 'none' }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #6929e2 0%, #4f1db5 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: 16,
                  boxShadow: '0 4px 14px rgba(105, 41, 226, 0.35)'
                }}
              >
                TU
              </Box>
              <Typography sx={{ fontWeight: 800, fontSize: { xs: 18, sm: 20 }, color: '#111827', letterSpacing: '-0.2px' }}>
                TraceU Jobs
              </Typography>
            </Stack>

            {/* Navigation links (Desktop) */}
            <Stack direction="row" alignItems="center" spacing={{ md: 3, lg: 4 }} sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Typography
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                sx={{ fontSize: 14.5, fontWeight: 600, color: '#6929e2', cursor: 'pointer', '&:hover': { color: '#5b1fd9' } }}
              >
                Home
              </Typography>
              <Typography
                onClick={() => handleScrollTo('features')}
                sx={{ fontSize: 14.5, fontWeight: 500, color: '#4b5563', cursor: 'pointer', '&:hover': { color: '#6929e2' } }}
              >
                Features
              </Typography>
              <Typography
                onClick={() => handleScrollTo('stakeholders')}
                sx={{ fontSize: 14.5, fontWeight: 500, color: '#4b5563', cursor: 'pointer', '&:hover': { color: '#6929e2' } }}
              >
                For Companies
              </Typography>
              <Typography
                onClick={() => handleScrollTo('stakeholders')}
                sx={{ fontSize: 14.5, fontWeight: 500, color: '#4b5563', cursor: 'pointer', '&:hover': { color: '#6929e2' } }}
              >
                For Job Seekers
              </Typography>
              <Typography
                onClick={() => handleScrollTo('integrations')}
                sx={{ fontSize: 14.5, fontWeight: 500, color: '#4b5563', cursor: 'pointer', '&:hover': { color: '#6929e2' } }}
              >
                Pricing
              </Typography>
              <Typography
                onClick={() => handleScrollTo('ai-studio')}
                sx={{ fontSize: 14.5, fontWeight: 500, color: '#4b5563', cursor: 'pointer', '&:hover': { color: '#6929e2' } }}
              >
                Resources
              </Typography>
            </Stack>

            {/* Right Buttons: Login & Get Started */}
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Button
                variant="outlined"
                onClick={handleOpenLoginMenu}
                endIcon={<DownOutlined style={{ fontSize: 11 }} />}
                sx={{
                  borderColor: '#d1d5db',
                  color: '#1f2937',
                  fontWeight: 600,
                  fontSize: 14,
                  textTransform: 'none',
                  borderRadius: '10px',
                  px: 2.2,
                  py: 0.8,
                  '&:hover': {
                    borderColor: '#6929e2',
                    color: '#6929e2',
                    bgcolor: '#f5f3ff'
                  }
                }}
              >
                Login
              </Button>

              {/* Login Dropdown Menu */}
              <Menu
                anchorEl={loginMenuAnchor}
                open={isLoginMenuOpen}
                onClose={handleCloseLoginMenu}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                slotProps={{
                  paper: {
                    sx: {
                      mt: 1.5,
                      borderRadius: '14px',
                      minWidth: 230,
                      boxShadow: '0 15px 35px rgba(105, 41, 226, 0.15)',
                      border: '1px solid #f0edff',
                      p: 0.5
                    }
                  }
                }}
              >
                <Box sx={{ px: 2, py: 1 }}>
                  <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    Select Your Portal
                  </Typography>
                </Box>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem
                  onClick={() => {
                    handleCloseLoginMenu();
                    navigate('/candidate-login');
                  }}
                  sx={{ py: 1.2, borderRadius: '8px' }}
                >
                  <ListItemIcon>
                    <UserOutlined style={{ color: '#6929e2', fontSize: 18 }} />
                  </ListItemIcon>
                  <ListItemText primary="Candidate Login" secondary="Find jobs & track applications" primaryTypographyProps={{ fontWeight: 600, fontSize: 13.5 }} secondaryTypographyProps={{ fontSize: 11 }} />
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseLoginMenu();
                    navigate('/employer-login');
                  }}
                  sx={{ py: 1.2, borderRadius: '8px' }}
                >
                  <ListItemIcon>
                    <BankOutlined style={{ color: '#6929e2', fontSize: 18 }} />
                  </ListItemIcon>
                  <ListItemText primary="HR / Company Login" secondary="Post vacancies & hire talent" primaryTypographyProps={{ fontWeight: 600, fontSize: 13.5 }} secondaryTypographyProps={{ fontSize: 11 }} />
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseLoginMenu();
                    navigate('/admin-login');
                  }}
                  sx={{ py: 1.2, borderRadius: '8px' }}
                >
                  <ListItemIcon>
                    <CrownOutlined style={{ color: '#6929e2', fontSize: 18 }} />
                  </ListItemIcon>
                  <ListItemText primary="Admin Login" secondary="Manage platform & portals" primaryTypographyProps={{ fontWeight: 600, fontSize: 13.5 }} secondaryTypographyProps={{ fontSize: 11 }} />
                </MenuItem>
              </Menu>

              {/* Get Started CTA */}
              <Button
                variant="contained"
                onClick={() => navigate('/candidate-login')}
                sx={{
                  background: 'linear-gradient(135deg, #6929e2 0%, #5b1fd9 100%)',
                  boxShadow: '0 6px 18px rgba(105, 41, 226, 0.35)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: 14,
                  textTransform: 'none',
                  borderRadius: '10px',
                  px: 2.6,
                  py: 0.85,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5b1fd9 0%, #4a15be 100%)',
                    boxShadow: '0 8px 22px rgba(105, 41, 226, 0.45)'
                  }
                }}
              >
                Get Started
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION                                                           */}
      {/* ========================================================================= */}
      <Box
        sx={{
          pt: { xs: 6, sm: 8, md: 10 },
          pb: { xs: 8, sm: 10, md: 12 },
          background: 'radial-gradient(ellipse at 85% 15%, rgba(105, 41, 226, 0.08) 0%, transparent 55%), radial-gradient(ellipse at 15% 85%, rgba(79, 70, 229, 0.06) 0%, transparent 50%), #fafbff',
          position: 'relative'
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 5, md: 6 }} alignItems="center">
            {/* Left Content */}
            <Grid size={{ xs: 12, md: 6.5 }}>
              <Box sx={{ maxWidth: 620 }}>
                {/* Pill Tag */}
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    bgcolor: '#f3edff',
                    color: '#6929e2',
                    px: 2,
                    py: 0.7,
                    borderRadius: '30px',
                    fontWeight: 700,
                    fontSize: 12,
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase',
                    mb: 3,
                    border: '1px solid #ebd9ff'
                  }}
                >
                  <ThunderboltOutlined style={{ fontSize: 13 }} />
                  AI-POWERED RECRUITMENT PLATFORM
                </Box>

                {/* Main Headline */}
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: 36, sm: 46, md: 54 },
                    lineHeight: 1.15,
                    color: '#111827',
                    letterSpacing: '-1px',
                    mb: 2.5
                  }}
                >
                  Find the Right Talent.{' '}
                  <Box component="span" sx={{ color: '#6929e2', display: { xs: 'inline', sm: 'block' } }}>
                    Build a Brighter Tomorrow.
                  </Box>
                </Typography>

                {/* Subtitle Description */}
                <Typography
                  sx={{
                    fontSize: { xs: 15, sm: 16.5 },
                    color: '#6b7280',
                    lineHeight: 1.65,
                    mb: 4
                  }}
                >
                  TraceU Jobs simplifies the complete hiring process for companies, HR teams, and job seekers with the power of AI. Post jobs, find candidates, track applications and hire faster — all in one intelligent platform.
                </Typography>

                {/* Hero CTAs */}
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4.5 }}>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/candidate-login')}
                    endIcon={<ArrowRightOutlined />}
                    sx={{
                      background: 'linear-gradient(135deg, #6929e2 0%, #5b1fd9 100%)',
                      boxShadow: '0 8px 24px rgba(105, 41, 226, 0.35)',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: 15,
                      textTransform: 'none',
                      borderRadius: '12px',
                      px: 3.5,
                      py: 1.4,
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5b1fd9 0%, #4a15be 100%)',
                        boxShadow: '0 10px 28px rgba(105, 41, 226, 0.45)'
                      }
                    }}
                  >
                    Get Started
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={() => setDemoOpen(true)}
                    startIcon={<PlayCircleOutlined />}
                    sx={{
                      borderColor: '#e5e7eb',
                      bgcolor: '#ffffff',
                      color: '#1f2937',
                      fontWeight: 600,
                      fontSize: 15,
                      textTransform: 'none',
                      borderRadius: '12px',
                      px: 3,
                      py: 1.4,
                      '&:hover': {
                        bgcolor: '#f9fafb',
                        borderColor: '#6929e2',
                        color: '#6929e2'
                      }
                    }}
                  >
                    Watch Demo
                  </Button>
                </Stack>

                {/* Bullet Highlights */}
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 1.5, sm: 3 }}
                  alignItems={{ xs: 'flex-start', sm: 'center' }}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CheckCircleFilled style={{ color: '#6929e2', fontSize: 16 }} />
                    <Typography sx={{ fontSize: 13.5, fontWeight: 600, color: '#374151' }}>
                      Smarter Hiring
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CheckCircleFilled style={{ color: '#6929e2', fontSize: 16 }} />
                    <Typography sx={{ fontSize: 13.5, fontWeight: 600, color: '#374151' }}>
                      AI-Powered Matching
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CheckCircleFilled style={{ color: '#6929e2', fontSize: 16 }} />
                    <Typography sx={{ fontSize: 13.5, fontWeight: 600, color: '#374151' }}>
                      End-to-End Recruitment
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Grid>

            {/* Right Hero Image + Floating Feature Cards */}
            <Grid size={{ xs: 12, md: 5.5 }}>
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: { xs: 380, sm: 480 }
                }}
              >
                {/* Decorative Background Blob */}
                <Box
                  sx={{
                    position: 'absolute',
                    width: '90%',
                    height: '90%',
                    borderRadius: '35% 65% 55% 45% / 45% 45% 55% 55%',
                    background: 'linear-gradient(135deg, rgba(105, 41, 226, 0.15) 0%, rgba(235, 217, 255, 0.5) 100%)',
                    filter: 'blur(35px)',
                    zIndex: 0
                  }}
                />

                {/* Main Hero Card with Candidate Character */}
                <Card
                  elevation={0}
                  sx={{
                    position: 'relative',
                    zIndex: 1,
                    borderRadius: '28px',
                    overflow: 'hidden',
                    maxWidth: 420,
                    width: '100%',
                    bgcolor: '#ffffff',
                    boxShadow: '0 25px 60px rgba(105, 41, 226, 0.16)',
                    border: '1px solid rgba(226, 232, 240, 0.8)'
                  }}
                >
                  <Box
                    component="img"
                    src={candidateArt}
                    alt="TraceU Jobs Candidate"
                    sx={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: 380,
                      objectFit: 'contain',
                      display: 'block'
                    }}
                  />
                </Card>

                {/* Floating Card 1: Best Match 95% (Top Left) */}
                <Card
                  elevation={0}
                  sx={{
                    position: 'absolute',
                    top: -10,
                    left: { xs: -10, sm: -25 },
                    zIndex: 2,
                    p: 1.5,
                    px: 2,
                    borderRadius: '16px',
                    bgcolor: '#ffffff',
                    boxShadow: '0 12px 30px rgba(105, 41, 226, 0.18)',
                    border: '1px solid #ebd9ff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5
                  }}
                >
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: '50%',
                      border: '3px solid #6929e2',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: 13,
                      color: '#6929e2'
                    }}
                  >
                    95%
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 11, color: '#6b7280', fontWeight: 600 }}>Best Match</Typography>
                    <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: '#111827' }}>Top Recommendation</Typography>
                  </Box>
                </Card>

                {/* Floating Card 2: Top Candidates (Top Right) */}
                <Card
                  elevation={0}
                  sx={{
                    position: 'absolute',
                    top: 25,
                    right: { xs: -10, sm: -30 },
                    zIndex: 2,
                    p: 1.5,
                    px: 2,
                    borderRadius: '16px',
                    bgcolor: '#ffffff',
                    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08)',
                    border: '1px solid #e5e7eb'
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.8 }}>
                    <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: '#111827' }}>
                      Top Candidates
                    </Typography>
                    <Stack direction="row" spacing={0.3}>
                      {[...Array(5)].map((_, i) => (
                        <StarFilled key={i} style={{ fontSize: 11, color: '#f59e0b' }} />
                      ))}
                    </Stack>
                  </Stack>
                  <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 28, height: 28, fontSize: 12 } }}>
                    <Avatar alt="User 1" src={avatar1} />
                    <Avatar alt="User 2" src={avatar2} />
                    <Avatar alt="User 3" src={avatar3} />
                    <Avatar alt="User 4" src={avatar4} />
                  </AvatarGroup>
                </Card>

                {/* Floating Card 3: AI Generate Job Description (Bottom Left) */}
                <Card
                  elevation={0}
                  sx={{
                    position: 'absolute',
                    bottom: 30,
                    left: { xs: -15, sm: -35 },
                    zIndex: 2,
                    p: 1.4,
                    px: 1.8,
                    borderRadius: '14px',
                    bgcolor: '#ffffff',
                    boxShadow: '0 10px 28px rgba(105, 41, 226, 0.15)',
                    border: '1px solid #ebd9ff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.2
                  }}
                >
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '8px',
                      bgcolor: '#6929e2',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: 12
                    }}
                  >
                    Ai
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#111827' }}>
                      Generate Job Description
                    </Typography>
                    <Typography sx={{ fontSize: 10, color: '#6b7280' }}>
                      1-click AI drafts
                    </Typography>
                  </Box>
                </Card>

                {/* Floating Card 4: Resume Parsing (Bottom Right) */}
                <Card
                  elevation={0}
                  sx={{
                    position: 'absolute',
                    bottom: -15,
                    right: { xs: -10, sm: -20 },
                    zIndex: 2,
                    p: 1.5,
                    px: 2,
                    borderRadius: '16px',
                    bgcolor: '#ffffff',
                    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08)',
                    border: '1px solid #e5e7eb',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.2
                  }}
                >
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '8px',
                      bgcolor: '#eff6ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#3b82f6'
                    }}
                  >
                    <FileTextOutlined style={{ fontSize: 16 }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#111827' }}>Resume Parsing</Typography>
                    <Typography sx={{ fontSize: 10, color: '#6b7280' }}>Auto-extract skills & exp</Typography>
                  </Box>
                </Card>

                {/* Handwritten Floating Tag */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '48%',
                    right: { xs: -25, sm: -45 },
                    zIndex: 3,
                    transform: 'rotate(12deg)',
                    bgcolor: '#ffffff',
                    border: '1px dashed #6929e2',
                    borderRadius: '12px',
                    px: 1.8,
                    py: 0.6,
                    boxShadow: '0 8px 20px rgba(105, 41, 226, 0.15)'
                  }}
                >
                  <Typography sx={{ fontSize: 12, fontWeight: 800, color: '#6929e2', fontStyle: 'italic' }}>
                    Great People. Better Teams ✨
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ========================================================================= */}
      {/* 3. STATS BAR SECTION                                                      */}
      {/* ========================================================================= */}
      <Container maxWidth="xl" sx={{ mt: -5, mb: 10, position: 'relative', zIndex: 10 }}>
        <Card
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: '24px',
            bgcolor: '#ffffff',
            boxShadow: '0 15px 45px rgba(0, 0, 0, 0.06)',
            border: '1px solid #f0f0f5'
          }}
        >
          <Grid container spacing={{ xs: 3, sm: 4 }} alignItems="center" justifyContent="space-between">
            {/* Stat 1 */}
            <Grid size={{ xs: 6, sm: 3 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '14px',
                    bgcolor: '#eff6ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#2563eb'
                  }}
                >
                  <BankOutlined style={{ fontSize: 22 }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 800, fontSize: { xs: 22, sm: 26 }, color: '#111827', lineHeight: 1.1 }}>
                    2,500+
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: '#6b7280', fontWeight: 500 }}>
                    Companies
                  </Typography>
                </Box>
              </Stack>
            </Grid>

            {/* Stat 2 */}
            <Grid size={{ xs: 6, sm: 3 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '14px',
                    bgcolor: '#f5f3ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6929e2'
                  }}
                >
                  <TeamOutlined style={{ fontSize: 22 }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 800, fontSize: { xs: 22, sm: 26 }, color: '#111827', lineHeight: 1.1 }}>
                    500,000+
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: '#6b7280', fontWeight: 500 }}>
                    Job Seekers
                  </Typography>
                </Box>
              </Stack>
            </Grid>

            {/* Stat 3 */}
            <Grid size={{ xs: 6, sm: 3 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '14px',
                    bgcolor: '#ecfdf5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#059669'
                  }}
                >
                  <SolutionOutlined style={{ fontSize: 22 }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 800, fontSize: { xs: 22, sm: 26 }, color: '#111827', lineHeight: 1.1 }}>
                    25,000+
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: '#6b7280', fontWeight: 500 }}>
                    Job Openings
                  </Typography>
                </Box>
              </Stack>
            </Grid>

            {/* Stat 4 */}
            <Grid size={{ xs: 6, sm: 3 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '14px',
                    bgcolor: '#fff7ed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ea580c'
                  }}
                >
                  <ThunderboltOutlined style={{ fontSize: 22 }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 800, fontSize: { xs: 22, sm: 26 }, color: '#111827', lineHeight: 1.1 }}>
                    90%
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: '#6b7280', fontWeight: 500 }}>
                    Faster Hiring
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Card>
      </Container>

      {/* ========================================================================= */}
      {/* 4. BUILT FOR EVERY STAKEHOLDER (THREE PORTALS, ONE ECOSYSTEM)             */}
      {/* ========================================================================= */}
      <Box id="stakeholders" sx={{ py: { xs: 6, md: 10 }, bgcolor: '#fafbff' }}>
        <Container maxWidth="xl">
          {/* Section Heading */}
          <Box sx={{ textAlign: 'center', maxWidth: 700, mx: 'auto', mb: { xs: 5, md: 7 } }}>
            <Box
              sx={{
                display: 'inline-block',
                bgcolor: '#f3edff',
                color: '#6929e2',
                px: 2,
                py: 0.6,
                borderRadius: '30px',
                fontWeight: 700,
                fontSize: 11.5,
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                mb: 1.8,
                border: '1px solid #ebd9ff'
              }}
            >
              THREE PORTALS, ONE POWERFUL ECOSYSTEM
            </Box>
            <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: 28, sm: 38 }, color: '#111827', mb: 1.5, letterSpacing: '-0.5px' }}>
              Built for Every Stakeholder
            </Typography>
            <Typography sx={{ fontSize: { xs: 14.5, sm: 16 }, color: '#6b7280', lineHeight: 1.6 }}>
              A seamless recruitment experience for companies, job seekers and administrators.
            </Typography>
          </Box>

          {/* Three Stakeholder Cards */}
          <Grid container spacing={3.5}>
            {/* Card 1: For Companies (HR) */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  borderRadius: '24px',
                  bgcolor: '#ffffff',
                  border: '1px solid #eef0f8',
                  p: { xs: 3, sm: 3.5 },
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 20px 40px rgba(105, 41, 226, 0.1)',
                    borderColor: '#ebd9ff'
                  }
                }}
              >
                {/* Header Icon + Image */}
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2.5 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '14px',
                      bgcolor: '#f3edff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#6929e2'
                    }}
                  >
                    <BankOutlined style={{ fontSize: 22 }} />
                  </Box>
                </Stack>

                {/* Character Photo Preview */}
                <Box
                  sx={{
                    width: '100%',
                    aspectRatio: '1.05 / 1',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    mb: 2.5,
                    bgcolor: '#f5f3ff',
                    border: '1px solid rgba(230, 232, 245, 0.8)'
                  }}
                >
                  <Box
                    component="img"
                    src={employerArt}
                    alt="For Companies"
                    sx={{ width: '100%', height: '100%', objectFit: 'contain', p: 1, display: 'block' }}
                  />
                </Box>

                <Typography variant="h4" sx={{ fontWeight: 800, fontSize: 20, color: '#111827', mb: 1 }}>
                  For Companies (HR)
                </Typography>
                <Typography sx={{ fontSize: 13.5, color: '#6b7280', mb: 3, lineHeight: 1.5 }}>
                  Post, evaluate and hire the best talent with powerful tools and AI assistance.
                </Typography>

                {/* Check list */}
                <Stack spacing={1.4} sx={{ mb: 3.5, flexGrow: 1 }}>
                  <Stack direction="row" alignItems="center" spacing={1.2}>
                    <CheckCircleFilled style={{ color: '#6929e2', fontSize: 15 }} />
                    <Typography sx={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>Create hiring requisitions</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1.2}>
                    <CheckCircleFilled style={{ color: '#6929e2', fontSize: 15 }} />
                    <Typography sx={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>Manage job vacancies</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1.2}>
                    <CheckCircleFilled style={{ color: '#6929e2', fontSize: 15 }} />
                    <Typography sx={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>Track applications</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1.2}>
                    <CheckCircleFilled style={{ color: '#6929e2', fontSize: 15 }} />
                    <Typography sx={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>Build talent pools</Typography>
                  </Stack>
                </Stack>

                {/* Redirect Button */}
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => navigate('/employer-login')}
                  endIcon={<ArrowRightOutlined />}
                  sx={{
                    py: 1.3,
                    borderRadius: '12px',
                    borderColor: '#6929e2',
                    color: '#6929e2',
                    fontWeight: 700,
                    fontSize: 14,
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: '#6929e2',
                      color: '#ffffff',
                      borderColor: '#6929e2'
                    }
                  }}
                >
                  Company Login
                </Button>
              </Card>
            </Grid>

            {/* Card 2: For Job Seekers */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  borderRadius: '24px',
                  bgcolor: '#ffffff',
                  border: '2px solid #6929e2',
                  p: { xs: 3, sm: 3.5 },
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transform: { md: 'scale(1.02)' },
                  boxShadow: '0 20px 45px rgba(105, 41, 226, 0.12)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  '&:hover': {
                    transform: { md: 'scale(1.04) translateY(-6px)', xs: 'translateY(-6px)' }
                  }
                }}
              >
                {/* Popular Badge */}
                <Chip
                  label="POPULAR"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 18,
                    right: 18,
                    bgcolor: '#6929e2',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: 10.5,
                    letterSpacing: 0.5
                  }}
                />

                {/* Header Icon */}
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2.5 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '14px',
                      bgcolor: '#eff6ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#2563eb'
                    }}
                  >
                    <UserOutlined style={{ fontSize: 22 }} />
                  </Box>
                </Stack>

                {/* Character Photo Preview */}
                <Box
                  sx={{
                    width: '100%',
                    aspectRatio: '1.05 / 1',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    mb: 2.5,
                    bgcolor: '#eff6ff',
                    border: '1px solid rgba(230, 232, 245, 0.8)'
                  }}
                >
                  <Box
                    component="img"
                    src={candidateArt}
                    alt="For Job Seekers"
                    sx={{ width: '100%', height: '100%', objectFit: 'contain', p: 1, display: 'block' }}
                  />
                </Box>

                <Typography variant="h4" sx={{ fontWeight: 800, fontSize: 20, color: '#111827', mb: 1 }}>
                  For Job Seekers
                </Typography>
                <Typography sx={{ fontSize: 13.5, color: '#6b7280', mb: 3, lineHeight: 1.5 }}>
                  Discover opportunities, showcase your skills and take the next step in your career.
                </Typography>

                {/* Check list */}
                <Stack spacing={1.4} sx={{ mb: 3.5, flexGrow: 1 }}>
                  <Stack direction="row" alignItems="center" spacing={1.2}>
                    <CheckCircleFilled style={{ color: '#2563eb', fontSize: 15 }} />
                    <Typography sx={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>Explore latest jobs</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1.2}>
                    <CheckCircleFilled style={{ color: '#2563eb', fontSize: 15 }} />
                    <Typography sx={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>Upload and manage resume</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1.2}>
                    <CheckCircleFilled style={{ color: '#2563eb', fontSize: 15 }} />
                    <Typography sx={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>Track application status</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1.2}>
                    <CheckCircleFilled style={{ color: '#2563eb', fontSize: 15 }} />
                    <Typography sx={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>Find internships</Typography>
                  </Stack>
                </Stack>

                {/* Redirect Button */}
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => navigate('/candidate-login')}
                  endIcon={<ArrowRightOutlined />}
                  sx={{
                    py: 1.3,
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #6929e2 0%, #5b1fd9 100%)',
                    boxShadow: '0 6px 18px rgba(105, 41, 226, 0.35)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: 14,
                    textTransform: 'none',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5b1fd9 0%, #4a15be 100%)',
                      boxShadow: '0 8px 22px rgba(105, 41, 226, 0.45)'
                    }
                  }}
                >
                  Candidate Login
                </Button>
              </Card>
            </Grid>

            {/* Card 3: For Administrators */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  borderRadius: '24px',
                  bgcolor: '#ffffff',
                  border: '1px solid #eef0f8',
                  p: { xs: 3, sm: 3.5 },
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 20px 40px rgba(105, 41, 226, 0.1)',
                    borderColor: '#ebd9ff'
                  }
                }}
              >
                {/* Header Icon */}
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2.5 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '14px',
                      bgcolor: '#fffbeb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#d97706'
                    }}
                  >
                    <CrownOutlined style={{ fontSize: 22 }} />
                  </Box>
                </Stack>

                {/* Character Photo Preview */}
                <Box
                  sx={{
                    width: '100%',
                    aspectRatio: '1.05 / 1',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    mb: 2.5,
                    bgcolor: '#fffbeb',
                    border: '1px solid rgba(230, 232, 245, 0.8)'
                  }}
                >
                  <Box
                    component="img"
                    src={adminArt}
                    alt="For Administrators"
                    sx={{ width: '100%', height: '100%', objectFit: 'contain', p: 1, display: 'block' }}
                  />
                </Box>

                <Typography variant="h4" sx={{ fontWeight: 800, fontSize: 20, color: '#111827', mb: 1 }}>
                  For Administrators
                </Typography>
                <Typography sx={{ fontSize: 13.5, color: '#6b7280', mb: 3, lineHeight: 1.5 }}>
                  Manage the entire platform, users, companies and recruitment activity.
                </Typography>

                {/* Check list */}
                <Stack spacing={1.4} sx={{ mb: 3.5, flexGrow: 1 }}>
                  <Stack direction="row" alignItems="center" spacing={1.2}>
                    <CheckCircleFilled style={{ color: '#d97706', fontSize: 15 }} />
                    <Typography sx={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>Manage companies & users</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1.2}>
                    <CheckCircleFilled style={{ color: '#d97706', fontSize: 15 }} />
                    <Typography sx={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>Monitor job activities</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1.2}>
                    <CheckCircleFilled style={{ color: '#d97706', fontSize: 15 }} />
                    <Typography sx={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>Platform configuration</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1.2}>
                    <CheckCircleFilled style={{ color: '#d97706', fontSize: 15 }} />
                    <Typography sx={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>Analytics & reports</Typography>
                  </Stack>
                </Stack>

                {/* Redirect Button */}
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => navigate('/admin-login')}
                  endIcon={<ArrowRightOutlined />}
                  sx={{
                    py: 1.3,
                    borderRadius: '12px',
                    borderColor: '#6929e2',
                    color: '#6929e2',
                    fontWeight: 700,
                    fontSize: 14,
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: '#6929e2',
                      color: '#ffffff',
                      borderColor: '#6929e2'
                    }
                  }}
                >
                  Admin Login
                </Button>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ========================================================================= */}
      {/* 5. EVERYTHING YOU NEED IN ONE PLATFORM (FEATURE WALKTHROUGH)              */}
      {/* ========================================================================= */}
      <Box id="features" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 6, lg: 8 }} alignItems="center">
            {/* Left Features list */}
            <Grid size={{ xs: 12, lg: 5 }}>
              <Box>
                <Box
                  sx={{
                    display: 'inline-block',
                    bgcolor: '#f3edff',
                    color: '#6929e2',
                    px: 2,
                    py: 0.6,
                    borderRadius: '30px',
                    fontWeight: 700,
                    fontSize: 11.5,
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase',
                    mb: 2,
                    border: '1px solid #ebd9ff'
                  }}
                >
                  POWERFUL FEATURES
                </Box>
                <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: 28, sm: 36, md: 40 }, color: '#111827', mb: 2, letterSpacing: '-0.5px' }}>
                  Everything You Need in One Platform
                </Typography>
                <Typography sx={{ fontSize: { xs: 14.5, sm: 16 }, color: '#6b7280', mb: 4, lineHeight: 1.6 }}>
                  From job posting to final hiring, TraceU Jobs provides end-to-end tools powered by AI to make recruitment smarter and faster.
                </Typography>

                {/* Feature List */}
                <Stack spacing={3} sx={{ mb: 4.5 }}>
                  <Stack direction="row" spacing={2.2}>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: '12px',
                        bgcolor: '#f3edff',
                        color: '#6929e2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <SolutionOutlined style={{ fontSize: 20 }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: 16, color: '#111827', mb: 0.4 }}>
                        Job Management
                      </Typography>
                      <Typography sx={{ fontSize: 13.5, color: '#6b7280', lineHeight: 1.5 }}>
                        Create requisitions and publish vacancies with ease.
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={2.2}>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: '12px',
                        bgcolor: '#eff6ff',
                        color: '#2563eb',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <TeamOutlined style={{ fontSize: 20 }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: 16, color: '#111827', mb: 0.4 }}>
                        Candidate Management
                      </Typography>
                      <Typography sx={{ fontSize: 13.5, color: '#6b7280', lineHeight: 1.5 }}>
                        Track, shortlist and collaborate with candidates.
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={2.2}>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: '12px',
                        bgcolor: '#ecfdf5',
                        color: '#059669',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <UserOutlined style={{ fontSize: 20 }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: 16, color: '#111827', mb: 0.4 }}>
                        Talent Pool
                      </Typography>
                      <Typography sx={{ fontSize: 13.5, color: '#6b7280', lineHeight: 1.5 }}>
                        Maintain a ready pool of qualified candidates.
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={2.2}>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: '12px',
                        bgcolor: '#fff7ed',
                        color: '#ea580c',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <ScheduleOutlined style={{ fontSize: 20 }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: 16, color: '#111827', mb: 0.4 }}>
                        Interview Management
                      </Typography>
                      <Typography sx={{ fontSize: 13.5, color: '#6b7280', lineHeight: 1.5 }}>
                        Schedule and manage interview rounds seamlessly.
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={2.2}>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: '12px',
                        bgcolor: '#fdf2f8',
                        color: '#db2777',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <LineChartOutlined style={{ fontSize: 20 }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: 16, color: '#111827', mb: 0.4 }}>
                        Analytics & Reports
                      </Typography>
                      <Typography sx={{ fontSize: 13.5, color: '#6b7280', lineHeight: 1.5 }}>
                        Gain insights into your hiring performance.
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>

                <Button
                  variant="contained"
                  onClick={() => navigate('/employer-login')}
                  endIcon={<ArrowRightOutlined />}
                  sx={{
                    background: 'linear-gradient(135deg, #6929e2 0%, #5b1fd9 100%)',
                    boxShadow: '0 6px 20px rgba(105, 41, 226, 0.35)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: 14.5,
                    textTransform: 'none',
                    borderRadius: '12px',
                    px: 3.5,
                    py: 1.3,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5b1fd9 0%, #4a15be 100%)'
                    }
                  }}
                >
                  Explore All Features
                </Button>
              </Box>
            </Grid>

            {/* Right: Modern Dashboard UI Mockup Preview */}
            <Grid size={{ xs: 12, lg: 7 }}>
              <Box sx={{ position: 'relative' }}>
                {/* Main Dashboard Window Mockup */}
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: '24px',
                    bgcolor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.08)',
                    overflow: 'hidden',
                    p: { xs: 2, sm: 3 }
                  }}
                >
                  {/* Window Bar */}
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2.5, pb: 1.5, borderBottom: '1px solid #f1f5f9' }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ef4444' }} />
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#f59e0b' }} />
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#10b981' }} />
                    <Typography sx={{ fontSize: 12, color: '#94a3b8', pl: 1, fontWeight: 500 }}>
                      https://jobs.traceu.com/portal/dashboard
                    </Typography>
                  </Stack>

                  {/* Top Stats Bar */}
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid size={3}>
                      <Box sx={{ bgcolor: '#ffffff', p: 1.5, borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <Typography sx={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>Active Jobs</Typography>
                        <Typography sx={{ fontSize: 20, fontWeight: 800, color: '#1e293b' }}>248</Typography>
                      </Box>
                    </Grid>
                    <Grid size={3}>
                      <Box sx={{ bgcolor: '#ffffff', p: 1.5, borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <Typography sx={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>Total Applicants</Typography>
                        <Typography sx={{ fontSize: 20, fontWeight: 800, color: '#6929e2' }}>1,429</Typography>
                      </Box>
                    </Grid>
                    <Grid size={3}>
                      <Box sx={{ bgcolor: '#ffffff', p: 1.5, borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <Typography sx={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>New Applied</Typography>
                        <Typography sx={{ fontSize: 20, fontWeight: 800, color: '#059669' }}>285</Typography>
                      </Box>
                    </Grid>
                    <Grid size={3}>
                      <Box sx={{ bgcolor: '#ffffff', p: 1.5, borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <Typography sx={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>Interviews</Typography>
                        <Typography sx={{ fontSize: 20, fontWeight: 800, color: '#d97706' }}>86</Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  {/* Mock Chart & Table */}
                  <Box sx={{ bgcolor: '#ffffff', borderRadius: '14px', p: 2, border: '1px solid #e2e8f0', mb: 2 }}>
                    <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#1e293b', mb: 1.5 }}>
                      Application Overview
                    </Typography>
                    {/* Simulated SVG Bar Chart */}
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', height: 110, gap: 1.5, px: 1, pb: 1 }}>
                      {[40, 65, 30, 85, 95, 60, 75, 50, 80, 70, 90, 85].map((val, idx) => (
                        <Box key={idx} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                          <Box
                            sx={{
                              width: '100%',
                              height: `${val}%`,
                              borderRadius: '6px 6px 0 0',
                              background: idx === 4 ? 'linear-gradient(180deg, #6929e2 0%, #a855f7 100%)' : '#e0e7ff'
                            }}
                          />
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  {/* Recent Applications Mock Table */}
                  <Box sx={{ bgcolor: '#ffffff', borderRadius: '14px', p: 2, border: '1px solid #e2e8f0' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                      <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>
                        Recent Applications
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: '#6929e2', fontWeight: 600, cursor: 'pointer' }}>
                        View All →
                      </Typography>
                    </Stack>
                    <Stack spacing={1}>
                      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 0.8, px: 1, bgcolor: '#f8fafc', borderRadius: '8px' }}>
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                          <Avatar src={avatar1} sx={{ width: 28, height: 28 }} />
                          <Box>
                            <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: '#1e293b' }}>Arun Kumar</Typography>
                            <Typography sx={{ fontSize: 10.5, color: '#64748b' }}>Frontend Developer</Typography>
                          </Box>
                        </Stack>
                        <Chip label="Shortlisted" size="small" sx={{ bgcolor: '#ecfdf5', color: '#059669', fontWeight: 600, fontSize: 10 }} />
                      </Stack>
                      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 0.8, px: 1, bgcolor: '#f8fafc', borderRadius: '8px' }}>
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                          <Avatar src={avatar2} sx={{ width: 28, height: 28 }} />
                          <Box>
                            <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: '#1e293b' }}>Sneha S.</Typography>
                            <Typography sx={{ fontSize: 10.5, color: '#64748b' }}>UI/UX Designer</Typography>
                          </Box>
                        </Stack>
                        <Chip label="Interview" size="small" sx={{ bgcolor: '#eff6ff', color: '#2563eb', fontWeight: 600, fontSize: 10 }} />
                      </Stack>
                    </Stack>
                  </Box>
                </Card>

                {/* Floating Mobile Screen Mockup */}
                <Card
                  elevation={0}
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    position: 'absolute',
                    top: '12%',
                    right: -25,
                    width: 230,
                    borderRadius: '22px',
                    bgcolor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 20px 45px rgba(0, 0, 0, 0.15)',
                    p: 1.8,
                    zIndex: 2
                  }}
                >
                  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.5 }}>
                    <Typography sx={{ fontWeight: 800, fontSize: 12, color: '#6929e2' }}>TraceU Jobs</Typography>
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#10b981' }} />
                  </Stack>
                  <Typography sx={{ fontSize: 13, fontWeight: 800, color: '#111827', mb: 1 }}>
                    Find Your Dream Job
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#f1f5f9', borderRadius: '8px', p: 0.8, mb: 1.5 }}>
                    <SearchOutlined style={{ fontSize: 13, color: '#64748b', marginRight: 6 }} />
                    <Typography sx={{ fontSize: 11, color: '#94a3b8' }}>Search 25,000+ jobs...</Typography>
                  </Box>
                  <Stack spacing={0.8}>
                    <Box sx={{ p: 1, bgcolor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#1e293b' }}>React Developer</Typography>
                      <Typography sx={{ fontSize: 9.5, color: '#64748b' }}>TCS • Bengaluru</Typography>
                    </Box>
                    <Box sx={{ p: 1, bgcolor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#1e293b' }}>UI/UX Designer</Typography>
                      <Typography sx={{ fontSize: 9.5, color: '#64748b' }}>Wipro • Remote</Typography>
                    </Box>
                  </Stack>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ========================================================================= */}
      {/* 6. SMARTER HIRING WITH AI (AI STUDIO)                                     */}
      {/* ========================================================================= */}
      <Box id="ai-studio" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#fafbff' }}>
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 6, lg: 7 }} alignItems="center">
            {/* Left AI Text & Bot Illustration */}
            <Grid size={{ xs: 12, lg: 5.5 }}>
              <Box>
                <Box
                  sx={{
                    display: 'inline-block',
                    bgcolor: '#f3edff',
                    color: '#6929e2',
                    px: 2,
                    py: 0.6,
                    borderRadius: '30px',
                    fontWeight: 700,
                    fontSize: 11.5,
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase',
                    mb: 2,
                    border: '1px solid #ebd9ff'
                  }}
                >
                  AI STUDIO
                </Box>
                <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: 28, sm: 38 }, color: '#111827', mb: 2, letterSpacing: '-0.5px' }}>
                  Smarter Hiring with AI
                </Typography>
                <Typography sx={{ fontSize: { xs: 14.5, sm: 16 }, color: '#6b7280', mb: 4, lineHeight: 1.6 }}>
                  Leverage AI to save time, improve accuracy and find the best match effortlessly.
                </Typography>

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={3}
                  alignItems={{ xs: 'flex-start', sm: 'center' }}
                  flexWrap="wrap"
                  useFlexGap
                  sx={{ mt: 1 }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/employer-login')}
                    endIcon={<ArrowRightOutlined />}
                    sx={{
                      borderColor: '#6929e2',
                      color: '#6929e2',
                      fontWeight: 700,
                      fontSize: 14.5,
                      textTransform: 'none',
                      borderRadius: '12px',
                      px: 3.5,
                      py: 1.4,
                      whiteSpace: 'nowrap',
                      '&:hover': {
                        bgcolor: '#f3edff',
                        borderColor: '#5b1fd9'
                      }
                    }}
                  >
                    Explore AI Features
                  </Button>

                  {/* AI Visual Avatar Circle */}
                  <Box
                    sx={{
                      p: 2,
                      px: 2.5,
                      bgcolor: '#ffffff',
                      borderRadius: '20px',
                      border: '1px solid #ebd9ff',
                      boxShadow: '0 12px 30px rgba(105, 41, 226, 0.08)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 2
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, #6929e2 0%, #8b5cf6 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        flexShrink: 0
                      }}
                    >
                      <RobotOutlined style={{ fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 800, fontSize: 14.5, color: '#111827', lineHeight: 1.3 }}>
                        TraceU AI Engine v2.4
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: '#6b7280', lineHeight: 1.3 }}>
                        Context-aware candidate evaluation
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Box>
            </Grid>

            {/* Right: 4 AI Feature Cards (2x2 Grid) */}
            <Grid size={{ xs: 12, lg: 6.5 }}>
              <Grid container spacing={3}>
                {/* AI Card 1: Resume Parsing */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Card
                    elevation={0}
                    sx={{
                      p: 3.2,
                      borderRadius: '20px',
                      bgcolor: '#ffffff',
                      border: '1px solid #f0edff',
                      height: '100%',
                      boxShadow: '0 10px 25px rgba(105, 41, 226, 0.04)',
                      transition: 'transform 0.25s ease',
                      '&:hover': { transform: 'translateY(-4px)', borderColor: '#d8b4fe' }
                    }}
                  >
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: '12px',
                        bgcolor: '#eff6ff',
                        color: '#2563eb',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2
                      }}
                    >
                      <FileTextOutlined style={{ fontSize: 20 }} />
                    </Box>
                    <Typography sx={{ fontWeight: 800, fontSize: 17, color: '#111827', mb: 1 }}>
                      Resume Parsing
                    </Typography>
                    <Typography sx={{ fontSize: 13.5, color: '#6b7280', lineHeight: 1.5 }}>
                      Automatically extract and organize candidate skills, experience and certifications in seconds.
                    </Typography>
                  </Card>
                </Grid>

                {/* AI Card 2: Candidate - Job Matching */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Card
                    elevation={0}
                    sx={{
                      p: 3.2,
                      borderRadius: '20px',
                      bgcolor: '#ffffff',
                      border: '1px solid #f0edff',
                      height: '100%',
                      boxShadow: '0 10px 25px rgba(105, 41, 226, 0.04)',
                      transition: 'transform 0.25s ease',
                      '&:hover': { transform: 'translateY(-4px)', borderColor: '#d8b4fe' }
                    }}
                  >
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: '12px',
                        bgcolor: '#ecfdf5',
                        color: '#059669',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2
                      }}
                    >
                      <CheckCircleFilled style={{ fontSize: 20 }} />
                    </Box>
                    <Typography sx={{ fontWeight: 800, fontSize: 17, color: '#111827', mb: 1 }}>
                      Candidate - Job Matching
                    </Typography>
                    <Typography sx={{ fontSize: 13.5, color: '#6b7280', lineHeight: 1.5 }}>
                      Find the best candidates for each job role with accurate AI-powered similarity scoring.
                    </Typography>
                  </Card>
                </Grid>

                {/* AI Card 3: Job Description Generator */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Card
                    elevation={0}
                    sx={{
                      p: 3.2,
                      borderRadius: '20px',
                      bgcolor: '#ffffff',
                      border: '1px solid #f0edff',
                      height: '100%',
                      boxShadow: '0 10px 25px rgba(105, 41, 226, 0.04)',
                      transition: 'transform 0.25s ease',
                      '&:hover': { transform: 'translateY(-4px)', borderColor: '#d8b4fe' }
                    }}
                  >
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: '12px',
                        bgcolor: '#fff7ed',
                        color: '#ea580c',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2
                      }}
                    >
                      <SolutionOutlined style={{ fontSize: 20 }} />
                    </Box>
                    <Typography sx={{ fontWeight: 800, fontSize: 17, color: '#111827', mb: 1 }}>
                      Job Description Generator
                    </Typography>
                    <Typography sx={{ fontSize: 13.5, color: '#6b7280', lineHeight: 1.5 }}>
                      Create engaging, compliant and keyword-optimized job descriptions with 1 click.
                    </Typography>
                  </Card>
                </Grid>

                {/* AI Card 4: Smart Recommendations */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Card
                    elevation={0}
                    sx={{
                      p: 3.2,
                      borderRadius: '20px',
                      bgcolor: '#ffffff',
                      border: '1px solid #f0edff',
                      height: '100%',
                      boxShadow: '0 10px 25px rgba(105, 41, 226, 0.04)',
                      transition: 'transform 0.25s ease',
                      '&:hover': { transform: 'translateY(-4px)', borderColor: '#d8b4fe' }
                    }}
                  >
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: '12px',
                        bgcolor: '#f5f3ff',
                        color: '#6929e2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2
                      }}
                    >
                      <ThunderboltOutlined style={{ fontSize: 20 }} />
                    </Box>
                    <Typography sx={{ fontWeight: 800, fontSize: 17, color: '#111827', mb: 1 }}>
                      Smart Recommendations
                    </Typography>
                    <Typography sx={{ fontSize: 13.5, color: '#6b7280', lineHeight: 1.5 }}>
                      Get data-driven salary benchmarks, hiring timeline forecasts and candidate suggestions.
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ========================================================================= */}
      {/* 7. FROM HIRING TO ONBOARDING (SEAMLESS INTEGRATION PIPELINE)              */}
      {/* ========================================================================= */}
      <Box id="integrations" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', maxWidth: 750, mx: 'auto', mb: { xs: 6, md: 8 } }}>
            <Box
              sx={{
                display: 'inline-block',
                bgcolor: '#f3edff',
                color: '#6929e2',
                px: 2,
                py: 0.6,
                borderRadius: '30px',
                fontWeight: 700,
                fontSize: 11.5,
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                mb: 1.8,
                border: '1px solid #ebd9ff'
              }}
            >
              SEAMLESS INTEGRATION
            </Box>
            <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: 28, sm: 38 }, color: '#111827', mb: 1.5, letterSpacing: '-0.5px' }}>
              From Hiring to Onboarding
            </Typography>
            <Typography sx={{ fontSize: { xs: 14.5, sm: 16 }, color: '#6b7280', lineHeight: 1.6, mb: 3 }}>
              TraceU Jobs integrates seamlessly with TraceU BGV for background verification and TraceU HRMS for employee onboarding, making the entire talent journey effortless.
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/employer-login')}
              endIcon={<ArrowRightOutlined />}
              sx={{
                background: 'linear-gradient(135deg, #6929e2 0%, #5b1fd9 100%)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: 14,
                textTransform: 'none',
                borderRadius: '10px',
                px: 3,
                py: 1
              }}
            >
              Learn More
            </Button>
          </Box>

          {/* Connected Flow Cards */}
          <Grid container spacing={3} alignItems="center" justifyContent="center">
            {/* Step 1: TraceU Jobs */}
            <Grid size={{ xs: 12, md: 3.5 }}>
              <Card
                elevation={0}
                sx={{
                  p: 3.5,
                  borderRadius: '22px',
                  bgcolor: '#ffffff',
                  border: '2px solid #6929e2',
                  boxShadow: '0 15px 35px rgba(105, 41, 226, 0.08)',
                  textAlign: 'center'
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '16px',
                    bgcolor: '#f3edff',
                    color: '#6929e2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  <BankOutlined style={{ fontSize: 26 }} />
                </Box>
                <Typography sx={{ fontWeight: 800, fontSize: 18, color: '#111827', mb: 0.5 }}>
                  TraceU Jobs
                </Typography>
                <Typography sx={{ fontSize: 13.5, color: '#6929e2', fontWeight: 600 }}>
                  Recruit & Hire
                </Typography>
              </Card>
            </Grid>

            {/* Arrow 1 */}
            <Grid size={{ xs: 12, md: 0.75 }} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              <ArrowRightOutlined style={{ fontSize: 24, color: '#9ca3af' }} />
            </Grid>

            {/* Step 2: TraceU BGV */}
            <Grid size={{ xs: 12, md: 3.5 }}>
              <Card
                elevation={0}
                sx={{
                  p: 3.5,
                  borderRadius: '22px',
                  bgcolor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
                  textAlign: 'center'
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '16px',
                    bgcolor: '#ecfdf5',
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  <SafetyCertificateOutlined style={{ fontSize: 26 }} />
                </Box>
                <Typography sx={{ fontWeight: 800, fontSize: 18, color: '#111827', mb: 0.5 }}>
                  TraceU BGV
                </Typography>
                <Typography sx={{ fontSize: 13.5, color: '#059669', fontWeight: 600 }}>
                  Background Verification
                </Typography>
              </Card>
            </Grid>

            {/* Arrow 2 */}
            <Grid size={{ xs: 12, md: 0.75 }} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              <ArrowRightOutlined style={{ fontSize: 24, color: '#9ca3af' }} />
            </Grid>

            {/* Step 3: TraceU HRMS */}
            <Grid size={{ xs: 12, md: 3.5 }}>
              <Card
                elevation={0}
                sx={{
                  p: 3.5,
                  borderRadius: '22px',
                  bgcolor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
                  textAlign: 'center'
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '16px',
                    bgcolor: '#eff6ff',
                    color: '#2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  <TeamOutlined style={{ fontSize: 26 }} />
                </Box>
                <Typography sx={{ fontWeight: 800, fontSize: 18, color: '#111827', mb: 0.5 }}>
                  TraceU HRMS
                </Typography>
                <Typography sx={{ fontSize: 13.5, color: '#2563eb', fontWeight: 600 }}>
                  Employee Onboarding
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ========================================================================= */}
      {/* 8. TRUSTED BY LEADING COMPANIES (LOGO CLOUD)                              */}
      {/* ========================================================================= */}
      <Box sx={{ py: 6, bgcolor: '#fafbff', borderTop: '1px solid #f0f0f5', borderBottom: '1px solid #f0f0f5' }}>
        <Container maxWidth="xl">
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: 12,
              fontWeight: 700,
              color: '#9ca3af',
              textTransform: 'uppercase',
              letterSpacing: '1.2px',
              mb: 3.5
            }}
          >
            TRUSTED BY LEADING COMPANIES
          </Typography>
          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
            spacing={{ xs: 3, sm: 5, md: 7 }}
            sx={{ opacity: 0.8 }}
          >
            {['TCS', 'Cognizant', 'Google', 'Microsoft', 'Amazon', 'Infosys', 'Wipro', 'HCL', 'Tech Mahindra'].map((company) => (
              <Typography
                key={company}
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: 16, sm: 19 },
                  color: '#4b5563',
                  letterSpacing: '0.2px',
                  userSelect: 'none',
                  '&:hover': { color: '#6929e2' },
                  transition: 'color 0.2s'
                }}
              >
                {company}
              </Typography>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* ========================================================================= */}
      {/* 9. BOTTOM CTA BANNER (LET'S BUILD GREAT TEAMS TOGETHER)                   */}
      {/* ========================================================================= */}
      <Box sx={{ p: { xs: 2, sm: 4, md: 6 } }}>
        <Container maxWidth="xl" disableGutters>
          <Box
            sx={{
              borderRadius: '30px',
              p: { xs: 5, sm: 8, md: 10 },
              background: 'linear-gradient(135deg, #1e1045 0%, #2e1065 50%, #431407 100%)',
              color: '#ffffff',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(30, 16, 69, 0.4)'
            }}
          >
            {/* Pill tag */}
            <Box
              sx={{
                display: 'inline-block',
                bgcolor: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(10px)',
                color: '#e9d5ff',
                px: 2,
                py: 0.6,
                borderRadius: '30px',
                fontWeight: 700,
                fontSize: 11.5,
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                mb: 2.5
              }}
            >
              READY TO TRANSFORM YOUR HIRING?
            </Box>

            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: 30, sm: 42, md: 50 },
                lineHeight: 1.2,
                mb: 2,
                letterSpacing: '-0.8px'
              }}
            >
              Let&apos;s Build Great Teams Together
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: 15, sm: 17 },
                color: '#e9d5ff',
                maxWidth: 600,
                mx: 'auto',
                mb: 4.5,
                lineHeight: 1.6
              }}
            >
              Join thousands of companies and job seekers who trust TraceU Jobs to connect opportunity with capability.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button
                variant="contained"
                onClick={() => navigate('/candidate-login')}
                endIcon={<ArrowRightOutlined />}
                sx={{
                  bgcolor: '#ffffff',
                  color: '#1e1045',
                  fontWeight: 800,
                  fontSize: 15,
                  textTransform: 'none',
                  borderRadius: '12px',
                  px: 4,
                  py: 1.5,
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    bgcolor: '#f5f3ff',
                    color: '#6929e2'
                  }
                }}
              >
                Get Started Free
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/employer-login')}
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.4)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: 15,
                  textTransform: 'none',
                  borderRadius: '12px',
                  px: 3.5,
                  py: 1.5,
                  backdropFilter: 'blur(8px)',
                  '&:hover': {
                    borderColor: '#ffffff',
                    bgcolor: 'rgba(255, 255, 255, 0.08)'
                  }
                }}
              >
                Contact Sales
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* ========================================================================= */}
      {/* 10. FOOTER                                                                */}
      {/* ========================================================================= */}
      <Box component="footer" sx={{ bgcolor: '#ffffff', pt: 8, pb: 4, borderTop: '1px solid #f0f0f5' }}>
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 5, md: 6 }} sx={{ mb: 6 }}>
            {/* Brand column */}
            <Grid size={{ xs: 12, md: 3.5 }}>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #6929e2 0%, #4f1db5 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: 15
                  }}
                >
                  TU
                </Box>
                <Typography sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>
                  TraceU Jobs
                </Typography>
              </Stack>
              <Typography sx={{ fontSize: 13.5, color: '#6b7280', lineHeight: 1.6, mb: 3, maxWidth: 300 }}>
                AI-powered recruitment and talent acquisition platform for a brighter future.
              </Typography>
              {/* Social Icons */}
              <Stack direction="row" spacing={1.5}>
                <IconButton component="a" href="https://linkedin.com" target="_blank" rel="noopener noreferrer" sx={{ color: '#6b7280', '&:hover': { color: '#6929e2' } }}>
                  <LinkedinFilled style={{ fontSize: 18 }} />
                </IconButton>
                <IconButton component="a" href="https://twitter.com" target="_blank" rel="noopener noreferrer" sx={{ color: '#6b7280', '&:hover': { color: '#6929e2' } }}>
                  <TwitterSquareFilled style={{ fontSize: 18 }} />
                </IconButton>
                <IconButton component="a" href="https://youtube.com" target="_blank" rel="noopener noreferrer" sx={{ color: '#6b7280', '&:hover': { color: '#6929e2' } }}>
                  <YoutubeFilled style={{ fontSize: 18 }} />
                </IconButton>
                <IconButton component="a" href="https://traceu.com" target="_blank" rel="noopener noreferrer" sx={{ color: '#6b7280', '&:hover': { color: '#6929e2' } }}>
                  <GlobalOutlined style={{ fontSize: 18 }} />
                </IconButton>
              </Stack>
            </Grid>

            {/* Column 1: Product */}
            <Grid size={{ xs: 6, sm: 3, md: 2 }}>
              <Typography sx={{ fontWeight: 700, fontSize: 14, color: '#111827', mb: 2.2 }}>
                Product
              </Typography>
              <Stack spacing={1.3}>
                <Typography onClick={() => handleScrollTo('features')} sx={{ fontSize: 13.5, color: '#6b7280', cursor: 'pointer', '&:hover': { color: '#6929e2' } }}>Features</Typography>
                <Typography onClick={() => handleScrollTo('ai-studio')} sx={{ fontSize: 13.5, color: '#6b7280', cursor: 'pointer', '&:hover': { color: '#6929e2' } }}>AI Studio</Typography>
                <Typography onClick={() => handleScrollTo('integrations')} sx={{ fontSize: 13.5, color: '#6b7280', cursor: 'pointer', '&:hover': { color: '#6929e2' } }}>Integrations</Typography>
                <Typography onClick={() => handleScrollTo('features')} sx={{ fontSize: 13.5, color: '#6b7280', cursor: 'pointer', '&:hover': { color: '#6929e2' } }}>Pricing</Typography>
                <Typography sx={{ fontSize: 13.5, color: '#6b7280', cursor: 'pointer', '&:hover': { color: '#6929e2' } }}>Changelog</Typography>
              </Stack>
            </Grid>

            {/* Column 2: Solutions */}
            <Grid size={{ xs: 6, sm: 3, md: 2.5 }}>
              <Typography sx={{ fontWeight: 700, fontSize: 14, color: '#111827', mb: 2.2 }}>
                Solutions
              </Typography>
              <Stack spacing={1.3}>
                <Typography onClick={() => navigate('/employer-login')} sx={{ fontSize: 13.5, color: '#6b7280', cursor: 'pointer', '&:hover': { color: '#6929e2' } }}>For Companies</Typography>
                <Typography onClick={() => navigate('/candidate-login')} sx={{ fontSize: 13.5, color: '#6b7280', cursor: 'pointer', '&:hover': { color: '#6929e2' } }}>For Job Seekers</Typography>
                <Typography onClick={() => navigate('/admin-login')} sx={{ fontSize: 13.5, color: '#6b7280', cursor: 'pointer', '&:hover': { color: '#6929e2' } }}>For Administrators</Typography>
                <Typography onClick={() => handleScrollTo('integrations')} sx={{ fontSize: 13.5, color: '#6b7280', cursor: 'pointer', '&:hover': { color: '#6929e2' } }}>Background Verification</Typography>
                <Typography onClick={() => handleScrollTo('integrations')} sx={{ fontSize: 13.5, color: '#6b7280', cursor: 'pointer', '&:hover': { color: '#6929e2' } }}>HRMS Integration</Typography>
              </Stack>
            </Grid>

            {/* Column 3: Resources */}
            <Grid size={{ xs: 6, sm: 3, md: 2 }}>
              <Typography sx={{ fontWeight: 700, fontSize: 14, color: '#111827', mb: 2.2 }}>
                Resources
              </Typography>
              <Stack spacing={1.3}>
                <Typography sx={{ fontSize: 13.5, color: '#6b7280', cursor: 'pointer', '&:hover': { color: '#6929e2' } }}>Blog</Typography>
                <Typography sx={{ fontSize: 13.5, color: '#6b7280', cursor: 'pointer', '&:hover': { color: '#6929e2' } }}>Help Center</Typography>
                <Typography sx={{ fontSize: 13.5, color: '#6b7280', cursor: 'pointer', '&:hover': { color: '#6929e2' } }}>Guides</Typography>
                <Typography sx={{ fontSize: 13.5, color: '#6b7280', cursor: 'pointer', '&:hover': { color: '#6929e2' } }}>API Documentation</Typography>
                <Typography sx={{ fontSize: 13.5, color: '#6b7280', cursor: 'pointer', '&:hover': { color: '#6929e2' } }}>Contact Us</Typography>
              </Stack>
            </Grid>

            {/* Column 4: Legal */}
            <Grid size={{ xs: 6, sm: 3, md: 2 }}>
              <Typography sx={{ fontWeight: 700, fontSize: 14, color: '#111827', mb: 2.2 }}>
                Legal
              </Typography>
              <Stack spacing={1.3}>
                <Typography sx={{ fontSize: 13.5, color: '#6b7280', cursor: 'pointer', '&:hover': { color: '#6929e2' } }}>Privacy Policy</Typography>
                <Typography sx={{ fontSize: 13.5, color: '#6b7280', cursor: 'pointer', '&:hover': { color: '#6929e2' } }}>Terms of Service</Typography>
                <Typography sx={{ fontSize: 13.5, color: '#6b7280', cursor: 'pointer', '&:hover': { color: '#6929e2' } }}>Cookie Policy</Typography>
                <Typography sx={{ fontSize: 13.5, color: '#6b7280', cursor: 'pointer', '&:hover': { color: '#6929e2' } }}>Sitemap</Typography>
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ borderColor: '#f1f5f9', mb: 3 }} />

          {/* Bottom Copyright */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <Typography sx={{ fontSize: 12.5, color: '#9ca3af' }}>
              © 2026 TraceU Jobs. All rights reserved.
            </Typography>
            <Typography sx={{ fontSize: 12.5, color: '#9ca3af' }}>
              Made with <span style={{ color: '#ef4444' }}>♥</span> for a Better Hiring Future.
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Watch Demo Modal */}
      <Dialog
        open={demoOpen}
        onClose={() => setDemoOpen(false)}
        maxWidth="md"
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: '20px', p: 1 } } }}
      >
        <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            TraceU Jobs Platform Overview
          </Typography>
          <IconButton onClick={() => setDemoOpen(false)}>
            <CloseOutlined />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3, textAlign: 'center' }}>
          <Box
            sx={{
              height: 340,
              bgcolor: '#111827',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}
          >
            <PlayCircleOutlined style={{ fontSize: 60, color: '#6929e2', marginBottom: 16 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              Interactive Walkthrough
            </Typography>
            <Typography sx={{ color: '#9ca3af', fontSize: 14 }}>
              Demonstrating AI job matching, resume parsing and candidate pipelines.
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

