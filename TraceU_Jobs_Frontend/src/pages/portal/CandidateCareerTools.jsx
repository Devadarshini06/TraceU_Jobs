import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getGreeting from 'utils/getGreeting';

// material-ui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';

// icons
import DownOutlined from '@ant-design/icons/DownOutlined';
import BellOutlined from '@ant-design/icons/BellOutlined';
import BookOutlined from '@ant-design/icons/BookOutlined';
import ShopOutlined from '@ant-design/icons/ShopOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined';
import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import BarChartOutlined from '@ant-design/icons/BarChartOutlined';
import CompassOutlined from '@ant-design/icons/CompassOutlined';
import UploadOutlined from '@ant-design/icons/UploadOutlined';
import CrownOutlined from '@ant-design/icons/CrownOutlined';
import ThunderboltOutlined from '@ant-design/icons/ThunderboltOutlined';
import DownloadOutlined from '@ant-design/icons/DownloadOutlined';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import RiseOutlined from '@ant-design/icons/RiseOutlined';

// assets
import avatarCandidate from 'assets/images/users/avatar-1.png';
import candidateHeroCharacter from 'assets/images/auth/candidate-career-tools-v5.jpg';

// 6 Tools
const TOOLS_SELECTOR = [
  {
    id: 'resume-builder',
    title: 'Resume Builder',
    sub: 'Create a professional resume in minutes',
    icon: <FileTextOutlined style={{ fontSize: 18 }} />,
    color: '#530EF0',
    bg: '#F3EDFF',
    active: true
  },
  {
    id: 'cover-letter',
    title: 'Cover Letter Builder',
    sub: 'Generate personalized cover letters',
    icon: <EditOutlined style={{ fontSize: 18 }} />,
    color: '#EA580C',
    bg: '#FFEDD5',
    active: false
  },
  {
    id: 'interview-prep',
    title: 'Interview Preparation',
    sub: 'Practice with real interview questions',
    icon: <TeamOutlined style={{ fontSize: 18 }} />,
    color: '#0284C7',
    bg: '#E0F2FE',
    active: false
  },
  {
    id: 'skill-assessment',
    title: 'Skill Assessment',
    sub: 'Identify and improve your skills',
    icon: <RiseOutlined style={{ fontSize: 18 }} />,
    color: '#10B981',
    bg: '#D1FAE5',
    active: false
  },
  {
    id: 'salary-insights',
    title: 'Salary Insights',
    sub: 'Know your market value',
    icon: <BarChartOutlined style={{ fontSize: 18 }} />,
    color: '#7C3AED',
    bg: '#F3EDFF',
    active: false
  },
  {
    id: 'career-guidance',
    title: 'Career Guidance',
    sub: 'Plan your career path',
    icon: <CompassOutlined style={{ fontSize: 18 }} />,
    color: '#2563EB',
    bg: '#EFF6FF',
    active: false
  }
];

// Resume Templates
const RESUME_TEMPLATES = [
  {
    id: 'modern',
    name: 'Modern',
    tag: 'Popular',
    headerColor: '#1E40AF',
    layout: 'Header Banner + Two Columns',
    previewSvg: (
      <Box sx={{ width: '100%', height: 110, bgcolor: '#FFFFFF', p: 1, borderRadius: '4px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ height: 18, bgcolor: '#DBEAFE', borderRadius: '2px', mb: 0.75, display: 'flex', alignItems: 'center', px: 0.5, gap: 0.5 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#3B82F6' }} />
          <Box sx={{ width: 30, height: 4, bgcolor: '#1D4ED8', borderRadius: '1px' }} />
        </Box>
        <Stack direction="row" spacing={0.75} sx={{ flex: 1 }}>
          <Box sx={{ flex: 1.2 }}>
            <Box sx={{ width: '80%', height: 4, bgcolor: '#94A3B8', mb: 0.5, borderRadius: '1px' }} />
            <Box sx={{ width: '100%', height: 3, bgcolor: '#CBD5E1', mb: 0.5, borderRadius: '1px' }} />
            <Box sx={{ width: '90%', height: 3, bgcolor: '#CBD5E1', mb: 0.5, borderRadius: '1px' }} />
            <Box sx={{ width: '70%', height: 3, bgcolor: '#CBD5E1', mb: 1, borderRadius: '1px' }} />
            <Box sx={{ width: '75%', height: 4, bgcolor: '#94A3B8', mb: 0.5, borderRadius: '1px' }} />
            <Box sx={{ width: '95%', height: 3, bgcolor: '#CBD5E1', borderRadius: '1px' }} />
          </Box>
          <Box sx={{ width: 32, bgcolor: '#F8FAFC', p: 0.4, borderRadius: '2px' }}>
            <Box sx={{ width: '100%', height: 3, bgcolor: '#94A3B8', mb: 0.5, borderRadius: '1px' }} />
            <Box sx={{ width: '80%', height: 2, bgcolor: '#CBD5E1', mb: 0.5, borderRadius: '1px' }} />
            <Box sx={{ width: '90%', height: 2, bgcolor: '#CBD5E1', mb: 0.5, borderRadius: '1px' }} />
            <Box sx={{ width: '70%', height: 2, bgcolor: '#CBD5E1', borderRadius: '1px' }} />
          </Box>
        </Stack>
      </Box>
    )
  },
  {
    id: 'professional',
    name: 'Professional',
    tag: 'Recommended',
    headerColor: '#0F172A',
    layout: 'Left Blue Sidebar + Right Content',
    previewSvg: (
      <Box sx={{ width: '100%', height: 110, bgcolor: '#FFFFFF', p: 1, borderRadius: '4px', border: '1px solid #E2E8F0', display: 'flex' }}>
        <Box sx={{ width: 32, bgcolor: '#0284C7', p: 0.5, borderRadius: '2px 0 0 2px', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#E0F2FE', mb: 1, alignSelf: 'center' }} />
          <Box sx={{ width: '100%', height: 3, bgcolor: '#BAE6FD', mb: 0.5, borderRadius: '1px' }} />
          <Box sx={{ width: '80%', height: 2, bgcolor: '#7DD3FC', mb: 0.5, borderRadius: '1px' }} />
          <Box sx={{ width: '70%', height: 2, bgcolor: '#7DD3FC', borderRadius: '1px' }} />
        </Box>
        <Box sx={{ flex: 1, pl: 1, pt: 0.5 }}>
          <Box sx={{ width: 45, height: 5, bgcolor: '#0F172A', mb: 0.75, borderRadius: '1px' }} />
          <Box sx={{ width: 30, height: 3, bgcolor: '#0284C7', mb: 1, borderRadius: '1px' }} />
          <Box sx={{ width: '100%', height: 2.5, bgcolor: '#CBD5E1', mb: 0.5, borderRadius: '1px' }} />
          <Box sx={{ width: '95%', height: 2.5, bgcolor: '#CBD5E1', mb: 0.5, borderRadius: '1px' }} />
          <Box sx={{ width: '75%', height: 2.5, bgcolor: '#CBD5E1', mb: 1, borderRadius: '1px' }} />
          <Box sx={{ width: '80%', height: 3, bgcolor: '#64748B', mb: 0.5, borderRadius: '1px' }} />
          <Box sx={{ width: '90%', height: 2.5, bgcolor: '#CBD5E1', borderRadius: '1px' }} />
        </Box>
      </Box>
    )
  },
  {
    id: 'creative',
    name: 'Creative',
    tag: 'Designer',
    headerColor: '#EC4899',
    layout: 'Salmon Pink Header + Clean Columns',
    previewSvg: (
      <Box sx={{ width: '100%', height: 110, bgcolor: '#FFFFFF', p: 1, borderRadius: '4px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column' }}>
        <Stack direction="row" spacing={0.75} alignItems="center" sx={{ mb: 1, pb: 0.5, borderBottom: '1px solid #FCE7F3' }}>
          <Box sx={{ width: 14, height: 14, borderRadius: '50%', bgcolor: '#F472B6' }} />
          <Box>
            <Box sx={{ width: 35, height: 4, bgcolor: '#DB2777', mb: 0.4, borderRadius: '1px' }} />
            <Box sx={{ width: 25, height: 2.5, bgcolor: '#9CA3AF', borderRadius: '1px' }} />
          </Box>
        </Stack>
        <Stack direction="row" spacing={0.75} sx={{ flex: 1 }}>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ width: 30, height: 3.5, bgcolor: '#F472B6', mb: 0.5, borderRadius: '1px' }} />
            <Box sx={{ width: '100%', height: 2.5, bgcolor: '#CBD5E1', mb: 0.4, borderRadius: '1px' }} />
            <Box sx={{ width: '85%', height: 2.5, bgcolor: '#CBD5E1', mb: 0.4, borderRadius: '1px' }} />
            <Box sx={{ width: '95%', height: 2.5, bgcolor: '#CBD5E1', borderRadius: '1px' }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ width: 30, height: 3.5, bgcolor: '#F472B6', mb: 0.5, borderRadius: '1px' }} />
            <Box sx={{ width: '90%', height: 2.5, bgcolor: '#CBD5E1', mb: 0.4, borderRadius: '1px' }} />
            <Box sx={{ width: '80%', height: 2.5, bgcolor: '#CBD5E1', borderRadius: '1px' }} />
          </Box>
        </Stack>
      </Box>
    )
  },
  {
    id: 'minimal',
    name: 'Minimal',
    tag: 'ATS Optimized',
    headerColor: '#111827',
    layout: 'Monochrome Clean Typography',
    previewSvg: (
      <Box sx={{ width: '100%', height: 110, bgcolor: '#FFFFFF', p: 1, borderRadius: '4px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ textAlign: 'center', mb: 1 }}>
          <Box sx={{ width: 50, height: 5, bgcolor: '#111827', mx: 'auto', mb: 0.4, borderRadius: '1px' }} />
          <Box sx={{ width: 35, height: 2.5, bgcolor: '#6B7280', mx: 'auto', borderRadius: '1px' }} />
        </Box>
        <Box sx={{ width: '100%', height: 0.5, bgcolor: '#E5E7EB', mb: 1 }} />
        <Box sx={{ width: 35, height: 3.5, bgcolor: '#111827', mb: 0.5, borderRadius: '1px' }} />
        <Box sx={{ width: '100%', height: 2.5, bgcolor: '#CBD5E1', mb: 0.4, borderRadius: '1px' }} />
        <Box sx={{ width: '90%', height: 2.5, bgcolor: '#CBD5E1', mb: 0.8, borderRadius: '1px' }} />
        <Box sx={{ width: 35, height: 3.5, bgcolor: '#111827', mb: 0.5, borderRadius: '1px' }} />
        <Box sx={{ width: '95%', height: 2.5, bgcolor: '#CBD5E1', borderRadius: '1px' }} />
      </Box>
    )
  },
  {
    id: 'executive',
    name: 'Executive',
    tag: 'Leadership',
    headerColor: '#0F172A',
    layout: 'Dark Executive Header & Grid',
    previewSvg: (
      <Box sx={{ width: '100%', height: 110, bgcolor: '#FFFFFF', p: 1, borderRadius: '4px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ height: 22, bgcolor: '#0F172A', borderRadius: '2px', mb: 0.75, display: 'flex', alignItems: 'center', px: 0.6, gap: 0.5 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '2px', bgcolor: '#E2E8F0' }} />
          <Box>
            <Box sx={{ width: 35, height: 3.5, bgcolor: '#FFFFFF', mb: 0.2, borderRadius: '1px' }} />
            <Box sx={{ width: 25, height: 2, bgcolor: '#94A3B8', borderRadius: '1px' }} />
          </Box>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ width: 30, height: 3.5, bgcolor: '#0F172A', mb: 0.5, borderRadius: '1px' }} />
          <Box sx={{ width: '100%', height: 2.5, bgcolor: '#CBD5E1', mb: 0.4, borderRadius: '1px' }} />
          <Box sx={{ width: '85%', height: 2.5, bgcolor: '#CBD5E1', mb: 0.6, borderRadius: '1px' }} />
          <Box sx={{ width: 30, height: 3.5, bgcolor: '#0F172A', mb: 0.5, borderRadius: '1px' }} />
          <Box sx={{ width: '90%', height: 2.5, bgcolor: '#CBD5E1', borderRadius: '1px' }} />
        </Box>
      </Box>
    )
  }
];

export default function CandidateCareerTools() {
  const navigate = useNavigate();

  // State
  const [selectedTool, setSelectedTool] = useState('resume-builder');
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [profileAnchor, setProfileAnchor] = useState(null);

  // Modals
  const [builderModalOpen, setBuilderModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [toolDetailModal, setToolDetailModal] = useState(null);

  // Snackbar
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Resume builder form state
  const [resumeData, setResumeData] = useState({
    name: 'Candidate',
    title: 'Full Stack Software Engineer',
    email: 'candidate@gmail.com',
    phone: '+91 98765 43210',
    location: 'Bengaluru, India',
    summary: 'Results-driven software engineer with expertise in React, Node.js, and cloud architectures. Passionate about building high-performance, user-centric web applications.',
    skills: 'React, Node.js, TypeScript, PostgreSQL, Docker, AWS, Redux Toolkit, Next.js'
  });

  // Handle upload resume scan
  const handleUploadScan = () => {
    setScanning(true);
    setScanProgress(15);
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanning(false);
          setSnackbar({ open: true, message: 'Resume analysis complete! ATS Score: 91/100 (Excellent).', severity: 'success' });
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#F8F9FE', color: '#111827' }}>
      {/* ========================================================================= */}
      {/* 1. TOP NAVBAR HEADER                                                      */}
      {/* ========================================================================= */}
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          bgcolor: '#FFFFFF',
          borderBottom: '1px solid #F1F5F9',
          px: { xs: 2, md: 5 },
          height: 70,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
        }}
      >
        {/* Left: Brand Logo & Navigation */}
        <Stack direction="row" alignItems="center" spacing={{ xs: 2, lg: 4 }}>
          {/* Brand Logo */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.25}
            onClick={() => navigate('/candidate')}
            sx={{ cursor: 'pointer', userSelect: 'none' }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '10px',
                bgcolor: '#530EF0',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: 16,
                boxShadow: '0 4px 10px rgba(83, 14, 240, 0.3)'
              }}
            >
              TU
            </Box>
            <Typography sx={{ fontWeight: 800, fontSize: 19, color: '#111827', letterSpacing: '-0.3px' }}>
              TraceU Jobs
            </Typography>
          </Stack>

          {/* Navigation Links */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 1.5, md: 3 }}
            sx={{ display: { xs: 'none', md: 'flex' }, height: 70 }}
          >
            <Typography
              onClick={() => navigate('/candidate/jobs')}
              sx={{
                fontWeight: 500,
                fontSize: 14,
                color: '#4B5563',
                cursor: 'pointer',
                transition: 'color 0.15s ease',
                '&:hover': { color: '#530EF0' }
              }}
            >
              Find Jobs
            </Typography>

            <Typography
              onClick={() => navigate('/candidate/companies')}
              sx={{
                fontWeight: 500,
                fontSize: 14,
                color: '#4B5563',
                cursor: 'pointer',
                transition: 'color 0.15s ease',
                '&:hover': { color: '#530EF0' }
              }}
            >
              Companies
            </Typography>

            <Typography
              onClick={() => navigate('/candidate/internships')}
              sx={{
                fontWeight: 500,
                fontSize: 14,
                color: '#4B5563',
                cursor: 'pointer',
                transition: 'color 0.15s ease',
                '&:hover': { color: '#530EF0' }
              }}
            >
              Internships
            </Typography>

            <Typography
              onClick={() => navigate('/candidate/resources')}
              sx={{
                fontWeight: 500,
                fontSize: 14,
                color: '#4B5563',
                cursor: 'pointer',
                transition: 'color 0.15s ease',
                '&:hover': { color: '#530EF0' }
              }}
            >
              Resources
            </Typography>

            {/* Career Tools (Active Tab) */}
            <Box
              sx={{
                position: 'relative',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <Typography sx={{ fontWeight: 700, fontSize: 14, color: '#530EF0' }}>
                Career Tools
              </Typography>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  bgcolor: '#530EF0',
                  borderRadius: '3px 3px 0 0'
                }}
              />
            </Box>
          </Stack>
        </Stack>

        {/* Right: Actions */}
        <Stack direction="row" alignItems="center" spacing={2}>
          {/* Notifications */}
          <IconButton
            size="small"
            onClick={() => setSnackbar({ open: true, message: 'Your resume ATS score has improved by 14%!', severity: 'info' })}
            sx={{ color: '#4B5563', '&:hover': { color: '#530EF0', bgcolor: '#F3EDFF' } }}
          >
            <Badge badgeContent={2} color="error" sx={{ '& .MuiBadge-badge': { fontSize: 10, height: 16, minWidth: 16 } }}>
              <BellOutlined style={{ fontSize: 18 }} />
            </Badge>
          </IconButton>

          {/* Saved */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.6}
            onClick={() => navigate('/candidate/saved')}
            sx={{
              cursor: 'pointer',
              color: '#4B5563',
              px: 1,
              py: 0.6,
              borderRadius: '8px',
              '&:hover': { color: '#530EF0', bgcolor: '#F3EDFF' }
            }}
          >
            <BookOutlined style={{ fontSize: 14 }} />
            <Typography sx={{ fontWeight: 600, fontSize: 13.5 }}>
              Saved
            </Typography>
          </Stack>

          {/* User Profile Pill */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            onClick={(e) => setProfileAnchor(e.currentTarget)}
            sx={{
              cursor: 'pointer',
              p: 0.5,
              pr: 1.25,
              borderRadius: '24px',
              border: '1px solid #E5E7EB',
              transition: 'all 0.15s ease',
              '&:hover': { borderColor: '#530EF0', bgcolor: '#F9FAFB' }
            }}
          >
            <Avatar src={avatarCandidate} sx={{ width: 32, height: 32 }} />
            <Typography sx={{ fontWeight: 600, fontSize: 13.5, color: '#111827', display: { xs: 'none', sm: 'block' } }}>
              {getGreeting()}, Candidate
            </Typography>
            <DownOutlined style={{ fontSize: 10, color: '#6B7280' }} />
          </Stack>

          {/* Profile Menu */}
          <Menu
            anchorEl={profileAnchor}
            open={Boolean(profileAnchor)}
            onClose={() => setProfileAnchor(null)}
            PaperProps={{
              sx: {
                borderRadius: '12px',
                minWidth: 200,
                boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                p: 0.5
              }
            }}
          >
            <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #F1F5F9' }}>
              <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: '#111827' }}>Candidate</Typography>
              <Typography sx={{ fontSize: 11.5, color: '#6B7280' }}>candidate@gmail.com</Typography>
            </Box>
            <MenuItem onClick={() => { setProfileAnchor(null); navigate('/candidate'); }} sx={{ fontSize: 13, py: 1 }}>
              <UserOutlined style={{ marginRight: 10, color: '#530EF0' }} /> My Profile
            </MenuItem>
            <MenuItem onClick={() => { setProfileAnchor(null); navigate('/candidate/jobs'); }} sx={{ fontSize: 13, py: 1 }}>
              <ShopOutlined style={{ marginRight: 10, color: '#530EF0' }} /> Find Jobs
            </MenuItem>
            <MenuItem onClick={() => { setProfileAnchor(null); navigate('/candidate/companies'); }} sx={{ fontSize: 13, py: 1 }}>
              <ShopOutlined style={{ marginRight: 10, color: '#530EF0' }} /> Companies
            </MenuItem>
            <MenuItem onClick={() => { setProfileAnchor(null); navigate('/candidate/saved'); }} sx={{ fontSize: 13, py: 1 }}>
              <BookOutlined style={{ marginRight: 10, color: '#530EF0' }} /> Saved Items
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={() => { setProfileAnchor(null); navigate('/candidate/login'); }} sx={{ fontSize: 13, py: 1, color: '#EF4444' }}>
              <LogoutOutlined style={{ marginRight: 10 }} /> Sign Out
            </MenuItem>
          </Menu>
        </Stack>
      </Box>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION                                                           */}
      {/* ========================================================================= */}
      <Box
        sx={{
          bgcolor: '#FFFFFF',
          borderBottom: '1px solid #F1F5F9',
          px: { xs: 2, sm: 4, md: 5 },
          pt: { xs: 4, md: 5 },
          pb: 4,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          spacing={4}
          sx={{ maxWidth: 1400, mx: 'auto' }}
        >
          {/* Left Text */}
          <Box sx={{ flex: 1, maxWidth: { xs: '100%', lg: 760 } }}>
            <Typography
              sx={{
                fontSize: 12.5,
                fontWeight: 800,
                color: '#530EF0',
                letterSpacing: '1.2px',
                textTransform: 'uppercase',
                mb: 1.25
              }}
            >
              CAREER TOOLS
            </Typography>

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: 32, sm: 42, md: 50 },
                fontWeight: 800,
                lineHeight: 1.15,
                color: '#111827',
                letterSpacing: '-0.8px',
                mb: 2
              }}
            >
              Tools to Build a <Box component="span" sx={{ color: '#530EF0' }}>Brighter Career</Box>
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: 14.5, sm: 16 },
                color: '#6B7280',
                lineHeight: 1.6,
                maxWidth: 620
              }}
            >
              From resume building to interview preparation, explore our powerful tools designed to help you get hired faster.
            </Typography>
          </Box>

          {/* Right Hero Graphic: Career Tools Scene */}
          <Box
            sx={{
              display: { xs: 'none', lg: 'block' },
              position: 'relative',
              width: 440,
              height: 330
            }}
          >
            {/* Full Scene Card */}
            <Box
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: '20px',
                overflow: 'hidden',
                bgcolor: '#ffffff',
                boxShadow: '0 16px 36px rgba(83, 14, 240, 0.12)',
                border: '1px solid #EDE9FE',
                p: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 2
              }}
            >
              <Box
                component="img"
                src={candidateHeroCharacter}
                alt="Career Tools"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  borderRadius: '14px',
                  display: 'block'
                }}
              />
            </Box>
          </Box>
        </Stack>
      </Box>

      {/* ========================================================================= */}
      {/* 3. HORIZONTAL TOOLS SELECTOR BAR (6 CARDS)                                */}
      {/* ========================================================================= */}
      <Box sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 2, sm: 3, md: 5 }, pt: 3.5 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' },
            gap: 2
          }}
        >
          {TOOLS_SELECTOR.map((tool) => {
            const isSelected = selectedTool === tool.id;

            return (
              <Card
                key={tool.id}
                elevation={0}
                onClick={() => {
                  setSelectedTool(tool.id);
                  setSnackbar({ open: true, message: `Switched to ${tool.title}`, severity: 'info' });
                }}
                sx={{
                  p: 2,
                  borderRadius: '14px',
                  border: isSelected ? '1.5px solid #530EF0' : '1px solid #F1F5F9',
                  bgcolor: isSelected ? '#FAF7FF' : '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                  boxShadow: isSelected ? '0 4px 14px rgba(83, 14, 240, 0.1)' : '0 1px 3px rgba(0,0,0,0.02)',
                  '&:hover': {
                    borderColor: '#530EF0',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 18px rgba(83, 14, 240, 0.08)'
                  }
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="space-between">
                  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 0, flex: 1 }}>
                    <Box
                      sx={{
                        width: 38,
                        height: 38,
                        borderRadius: '10px',
                        bgcolor: tool.bg,
                        color: tool.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      {tool.icon}
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography sx={{ fontWeight: 800, fontSize: 13, color: isSelected ? '#530EF0' : '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {tool.title}
                      </Typography>
                      <Typography sx={{ fontSize: 11, color: '#6B7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {tool.sub}
                      </Typography>
                    </Box>
                  </Stack>
                  {isSelected ? (
                    <ArrowRightOutlined style={{ fontSize: 12, color: '#530EF0' }} />
                  ) : (
                    <RightOutlined style={{ fontSize: 10, color: '#9CA3AF' }} />
                  )}
                </Stack>
              </Card>
            );
          })}
        </Box>
      </Box>

      {/* ========================================================================= */}
      {/* 4. MAIN SHOWCASE: RESUME BUILDER + UPLOAD & AI WIDGETS                     */}
      {/* ========================================================================= */}
      <Box sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 2, sm: 3, md: 5 }, py: 4 }}>
        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3.5} alignItems="flex-start">
          {/* ===================================================================== */}
          {/* LEFT SECTION: MAIN RESUME BUILDER HERO CARD + TEMPLATES               */}
          {/* ===================================================================== */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Main Featured Showcase Card */}
            <Card
              elevation={0}
              sx={{
                p: { xs: 3, md: 4.5 },
                borderRadius: '20px',
                border: '1px solid #F1F5F9',
                bgcolor: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                mb: 4,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center">
                {/* Left Text & CTA */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 800,
                      color: '#530EF0',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      mb: 1
                    }}
                  >
                    RESUME BUILDER
                  </Typography>

                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { xs: 26, sm: 32, md: 36 },
                      fontWeight: 800,
                      color: '#111827',
                      lineHeight: 1.2,
                      mb: 1.75
                    }}
                  >
                    Create a Professional <br />
                    <Box component="span" sx={{ color: '#530EF0' }}>Resume with AI</Box>
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 14,
                      color: '#6B7280',
                      lineHeight: 1.55,
                      mb: 3,
                      maxWidth: 480
                    }}
                  >
                    Build a modern, ATS-friendly resume in minutes with our AI-powered builder. Choose from professional templates and get expert suggestions.
                  </Typography>

                  {/* Create Resume CTA Button */}
                  <Button
                    variant="contained"
                    onClick={() => setBuilderModalOpen(true)}
                    endIcon={<ArrowRightOutlined />}
                    sx={{
                      bgcolor: '#530EF0',
                      color: '#FFF',
                      fontWeight: 700,
                      fontSize: 14,
                      px: 3.5,
                      py: 1.4,
                      borderRadius: '10px',
                      textTransform: 'none',
                      boxShadow: '0 4px 16px rgba(83, 14, 240, 0.35)',
                      mb: 3.5,
                      '&:hover': { bgcolor: '#420bc2' }
                    }}
                  >
                    Create Your Resume
                  </Button>

                  {/* 4 Feature Badges */}
                  <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
                    {[
                      { icon: <CheckCircleOutlined />, label: 'ATS Friendly' },
                      { icon: <ThunderboltOutlined />, label: 'AI Suggestions' },
                      { icon: <FileTextOutlined />, label: 'Multiple Templates' },
                      { icon: <DownloadOutlined />, label: 'Download PDF' }
                    ].map((badge) => (
                      <Chip
                        key={badge.label}
                        icon={React.cloneElement(badge.icon, { style: { fontSize: 13, color: '#530EF0' } })}
                        label={badge.label}
                        size="small"
                        sx={{
                          bgcolor: '#F8F9FE',
                          border: '1px solid #E9D5FF',
                          color: '#4B5563',
                          fontSize: 12,
                          fontWeight: 600,
                          borderRadius: '8px',
                          px: 0.5
                        }}
                      />
                    ))}
                  </Stack>
                </Box>

                {/* Right Overlapping Resume Mockup Graphics */}
                <Box
                  sx={{
                    position: 'relative',
                    width: { xs: 260, sm: 300 },
                    height: 280,
                    flexShrink: 0
                  }}
                >
                  {/* Floating purple badge: Professional Templates */}
                  <Chip
                    icon={<CrownOutlined style={{ color: '#F59E0B' }} />}
                    label="Professional Templates"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 10,
                      right: 0,
                      zIndex: 4,
                      bgcolor: '#530EF0',
                      color: '#FFF',
                      fontWeight: 700,
                      fontSize: 11,
                      boxShadow: '0 4px 12px rgba(83, 14, 240, 0.3)'
                    }}
                  />

                  {/* Back Minimal Resume Card */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 35,
                      right: 15,
                      width: 200,
                      height: 240,
                      bgcolor: '#FFFFFF',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
                      transform: 'rotate(7deg)',
                      zIndex: 1,
                      p: 1.5,
                      opacity: 0.7
                    }}
                  >
                    <Box sx={{ width: 40, height: 4, bgcolor: '#94A3B8', mb: 0.5 }} />
                    <Box sx={{ width: 60, height: 2, bgcolor: '#CBD5E1', mb: 1 }} />
                    <Box sx={{ width: '100%', height: 2, bgcolor: '#E2E8F0', mb: 0.5 }} />
                    <Box sx={{ width: '90%', height: 2, bgcolor: '#E2E8F0', mb: 0.5 }} />
                    <Box sx={{ width: '80%', height: 2, bgcolor: '#E2E8F0' }} />
                  </Box>

                  {/* Mid Dark Resume Card */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 25,
                      right: 40,
                      width: 210,
                      height: 250,
                      bgcolor: '#0F172A',
                      borderRadius: '8px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                      transform: 'rotate(-4deg)',
                      zIndex: 2,
                      p: 1.5
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
                      <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: '#38BDF8' }} />
                      <Box sx={{ width: 50, height: 4, bgcolor: '#FFFFFF', borderRadius: '1px' }} />
                    </Box>
                    <Box sx={{ width: '100%', height: 2, bgcolor: '#334155', mb: 0.5 }} />
                    <Box sx={{ width: '85%', height: 2, bgcolor: '#334155', mb: 0.5 }} />
                    <Box sx={{ width: '90%', height: 2, bgcolor: '#334155' }} />
                  </Box>

                  {/* Top White Front Resume Card */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 15,
                      left: 0,
                      width: 220,
                      height: 260,
                      bgcolor: '#FFFFFF',
                      borderRadius: '10px',
                      border: '1.5px solid #E2E8F0',
                      boxShadow: '0 12px 30px rgba(83, 14, 240, 0.12)',
                      zIndex: 3,
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 1.5, pb: 1, borderBottom: '1px solid #F1F5F9' }}>
                      <Avatar src={avatarCandidate} sx={{ width: 34, height: 34 }} />
                      <Box>
                        <Typography sx={{ fontWeight: 800, fontSize: 13, color: '#111827' }}>
                          Arjun Kumar
                        </Typography>
                        <Typography sx={{ fontSize: 10, color: '#530EF0', fontWeight: 600 }}>
                          Software Engineer
                        </Typography>
                        <Typography sx={{ fontSize: 8.5, color: '#9CA3AF' }}>
                          📍 Bengaluru, India
                        </Typography>
                      </Box>
                    </Stack>

                    <Typography sx={{ fontSize: 9.5, fontWeight: 700, color: '#374151', mb: 0.5 }}>
                      Summary
                    </Typography>
                    <Box sx={{ width: '100%', height: 3, bgcolor: '#CBD5E1', mb: 0.5, borderRadius: '1px' }} />
                    <Box sx={{ width: '90%', height: 3, bgcolor: '#CBD5E1', mb: 1.5, borderRadius: '1px' }} />

                    <Typography sx={{ fontSize: 9.5, fontWeight: 700, color: '#374151', mb: 0.5 }}>
                      Experience
                    </Typography>
                    <Box sx={{ width: '100%', height: 3, bgcolor: '#CBD5E1', mb: 0.5, borderRadius: '1px' }} />
                    <Box sx={{ width: '95%', height: 3, bgcolor: '#CBD5E1', mb: 0.5, borderRadius: '1px' }} />
                    <Box sx={{ width: '70%', height: 3, bgcolor: '#CBD5E1', borderRadius: '1px' }} />
                  </Box>
                </Box>
              </Stack>
            </Card>

            {/* Popular Resume Templates */}
            <Box>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography sx={{ fontWeight: 800, fontSize: 17, color: '#111827' }}>
                  Popular Resume Templates
                </Typography>
                <Typography
                  onClick={() => setBuilderModalOpen(true)}
                  sx={{
                    fontSize: 12.5,
                    fontWeight: 700,
                    color: '#530EF0',
                    cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  View All Templates →
                </Typography>
              </Stack>

              {/* 5 Templates Grid */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(5, 1fr)' },
                  gap: 2
                }}
              >
                {RESUME_TEMPLATES.map((tpl) => {
                  const isSelected = selectedTemplate === tpl.id;

                  return (
                    <Box
                      key={tpl.id}
                      onClick={() => {
                        setSelectedTemplate(tpl.id);
                        setSnackbar({ open: true, message: `Selected "${tpl.name}" template!`, severity: 'info' });
                      }}
                      sx={{
                        p: 1.25,
                        borderRadius: '12px',
                        border: isSelected ? '2px solid #530EF0' : '1px solid #E5E7EB',
                        bgcolor: '#FFFFFF',
                        cursor: 'pointer',
                        transition: 'all 0.18s ease',
                        boxShadow: isSelected ? '0 6px 18px rgba(83, 14, 240, 0.12)' : '0 1px 3px rgba(0,0,0,0.02)',
                        textAlign: 'center',
                        '&:hover': {
                          borderColor: '#530EF0',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      {tpl.previewSvg}
                      <Typography sx={{ fontWeight: 700, fontSize: 13, color: isSelected ? '#530EF0' : '#111827', mt: 1 }}>
                        {tpl.name}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>

          {/* ===================================================================== */}
          {/* RIGHT SECTION: UPLOAD RESUME & AI CAREER RECOMMENDATIONS              */}
          {/* ===================================================================== */}
          <Box sx={{ width: { xs: '100%', lg: 350 }, flexShrink: 0 }}>
            <Stack spacing={3}>
              {/* Card 1: Already have a resume? */}
              <Card
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: '18px',
                  border: '1px solid #F1F5F9',
                  bgcolor: '#FFFFFF',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                }}
              >
                <Stack direction="row" spacing={1.75} alignItems="flex-start" sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '12px',
                      bgcolor: '#F3EDFF',
                      color: '#530EF0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <UploadOutlined style={{ fontSize: 20 }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 800, fontSize: 16, color: '#111827' }}>
                      Already have a resume?
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: '#6B7280', lineHeight: 1.4 }}>
                      Get AI-powered feedback and improve your resume instantly.
                    </Typography>
                  </Box>
                </Stack>

                {/* Drag and Drop Box */}
                <Box
                  onClick={() => setUploadModalOpen(true)}
                  sx={{
                    p: 3,
                    border: '1.5px dashed #CBD5E1',
                    borderRadius: '12px',
                    bgcolor: '#F8F9FE',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    mb: 2,
                    '&:hover': {
                      borderColor: '#530EF0',
                      bgcolor: '#FAF7FF'
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      bgcolor: '#EDE9FE',
                      color: '#530EF0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 1
                    }}
                  >
                    <UploadOutlined style={{ fontSize: 18 }} />
                  </Box>
                  <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#111827', mb: 0.5 }}>
                    Drag and drop your resume here
                  </Typography>
                  <Typography sx={{ fontSize: 11.5, color: '#9CA3AF' }}>
                    PDF, DOC or DOCX (Max 5MB)
                  </Typography>
                </Box>

                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => setUploadModalOpen(true)}
                  sx={{
                    borderColor: '#530EF0',
                    color: '#530EF0', fontWeight: 600, fontSize: 12,
                    py: 1.1,
                    borderRadius: '8px',
                    textTransform: 'none',
                    '&:hover': { bgcolor: '#F3EDFF', borderColor: '#530EF0' }
                  }}
                >
                  Upload Resume
                </Button>
              </Card>

              {/* Card 2: Get AI Career Recommendations */}
              <Card
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: '18px',
                  background: 'linear-gradient(135deg, #F3EDFF 0%, #FAF5FF 100%)',
                  border: '1px solid #E9D5FF',
                  boxShadow: '0 4px 16px rgba(83, 14, 240, 0.05)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontWeight: 800, fontSize: 16, color: '#111827', mb: 1.5 }}>
                      Get AI Career Recommendations
                    </Typography>

                    <Stack spacing={1}>
                      {[
                        'Personalized job recommendations',
                        'Skill gap analysis',
                        'Career growth roadmap',
                        'Industry insights'
                      ].map((item) => (
                        <Stack key={item} direction="row" alignItems="center" spacing={1}>
                          <CheckOutlined style={{ fontSize: 12, color: '#530EF0', fontWeight: 800 }} />
                          <Typography sx={{ fontSize: 12, color: '#374151', fontWeight: 500 }}>
                            {item}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Box>

                  {/* AI Robot illustration avatar */}
                  <Box
                    sx={{
                      width: 58,
                      height: 58,
                      borderRadius: '50%',
                      bgcolor: '#FFFFFF',
                      boxShadow: '0 4px 14px rgba(83, 14, 240, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 30,
                      flexShrink: 0
                    }}
                  >
                    🤖
                  </Box>
                </Stack>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => setAiAssistantOpen(true)}
                  endIcon={<ArrowRightOutlined />}
                  sx={{
                    bgcolor: '#530EF0',
                    color: '#FFF',
                    fontWeight: 700,
                    fontSize: 13,
                    py: 1.15,
                    borderRadius: '8px',
                    textTransform: 'none',
                    boxShadow: '0 4px 12px rgba(83, 14, 240, 0.3)',
                    '&:hover': { bgcolor: '#420bc2' }
                  }}
                >
                  Try AI Career Assistant
                </Button>
              </Card>
            </Stack>
          </Box>
        </Stack>

        {/* ===================================================================== */}
        {/* 5. BOTTOM 4 SPECIALIZED TOOL FEATURE CARDS                             */}
        {/* ===================================================================== */}
        <Box sx={{ mt: 5 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: 2.5
            }}
          >
            {/* Card 1: Interview Preparation */}
            <Card
              elevation={0}
              sx={{
                p: 3,
                borderRadius: '16px',
                border: '1px solid #F1F5F9',
                bgcolor: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: '#530EF0',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(83, 14, 240, 0.08)'
                }
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '12px',
                  bgcolor: '#EFF6FF',
                  color: '#2563EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2
                }}
              >
                <TeamOutlined style={{ fontSize: 20 }} />
              </Box>
              <Typography sx={{ fontSize: 11, fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.6px', mb: 0.5 }}>
                INTERVIEW PREPARATION
              </Typography>
              <Typography sx={{ fontWeight: 800, fontSize: 16, color: '#111827', mb: 1 }}>
                Practice for Your Next Interview
              </Typography>
              <Typography sx={{ fontSize: 12.5, color: '#6B7280', lineHeight: 1.45, mb: 2.5, flex: 1 }}>
                Access 1,000+ interview questions with expert answers and tips.
              </Typography>
              <Typography
                onClick={() => setToolDetailModal({ title: 'Interview Preparation', desc: 'Practice top technical and behavioral interview questions tailored to your field.' })}
                sx={{ fontSize: 13, fontWeight: 700, color: '#530EF0', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
              >
                Start Practicing →
              </Typography>
            </Card>

            {/* Card 2: Skill Assessment */}
            <Card
              elevation={0}
              sx={{
                p: 3,
                borderRadius: '16px',
                border: '1px solid #F1F5F9',
                bgcolor: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: '#530EF0',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(83, 14, 240, 0.08)'
                }
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '12px',
                  bgcolor: '#D1FAE5',
                  color: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2
                }}
              >
                <RiseOutlined style={{ fontSize: 20 }} />
              </Box>
              <Typography sx={{ fontSize: 11, fontWeight: 800, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.6px', mb: 0.5 }}>
                SKILL ASSESSMENT
              </Typography>
              <Typography sx={{ fontWeight: 800, fontSize: 16, color: '#111827', mb: 1 }}>
                Test & Improve Your Skills
              </Typography>
              <Typography sx={{ fontSize: 12.5, color: '#6B7280', lineHeight: 1.45, mb: 2.5, flex: 1 }}>
                Take skill tests and get certified to stand out to employers.
              </Typography>
              <Typography
                onClick={() => setToolDetailModal({ title: 'Skill Assessment & Certification', desc: 'Take a 15-minute diagnostic test in React, Python, or System Design to earn a verified skill badge.' })}
                sx={{ fontSize: 13, fontWeight: 700, color: '#530EF0', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
              >
                Take a Skill Test →
              </Typography>
            </Card>

            {/* Card 3: Salary Insights */}
            <Card
              elevation={0}
              sx={{
                p: 3,
                borderRadius: '16px',
                border: '1px solid #F1F5F9',
                bgcolor: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: '#530EF0',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(83, 14, 240, 0.08)'
                }
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '12px',
                  bgcolor: '#F3EDFF',
                  color: '#7C3AED',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2
                }}
              >
                <BarChartOutlined style={{ fontSize: 20 }} />
              </Box>
              <Typography sx={{ fontSize: 11, fontWeight: 800, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.6px', mb: 0.5 }}>
                SALARY INSIGHTS
              </Typography>
              <Typography sx={{ fontWeight: 800, fontSize: 16, color: '#111827', mb: 1 }}>
                Know Your Market Value
              </Typography>
              <Typography sx={{ fontSize: 12.5, color: '#6B7280', lineHeight: 1.45, mb: 2.5, flex: 1 }}>
                Explore salary trends for different roles and locations.
              </Typography>
              <Typography
                onClick={() => setToolDetailModal({ title: 'Salary Insights Calculator', desc: 'Benchmark compensation packages across top tech firms in Bengaluru, Hyderabad, and remote positions.' })}
                sx={{ fontSize: 13, fontWeight: 700, color: '#530EF0', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
              >
                View Salary Insights →
              </Typography>
            </Card>

            {/* Card 4: Career Guidance */}
            <Card
              elevation={0}
              sx={{
                p: 3,
                borderRadius: '16px',
                border: '1px solid #F1F5F9',
                bgcolor: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: '#530EF0',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(83, 14, 240, 0.08)'
                }
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '12px',
                  bgcolor: '#EFF6FF',
                  color: '#2563EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2
                }}
              >
                <CompassOutlined style={{ fontSize: 20 }} />
              </Box>
              <Typography sx={{ fontSize: 11, fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.6px', mb: 0.5 }}>
                CAREER GUIDANCE
              </Typography>
              <Typography sx={{ fontWeight: 800, fontSize: 16, color: '#111827', mb: 1 }}>
                Plan Your Career Path
              </Typography>
              <Typography sx={{ fontSize: 12.5, color: '#6B7280', lineHeight: 1.45, mb: 2.5, flex: 1 }}>
                Get personalized career advice and explore growth opportunities.
              </Typography>
              <Typography
                onClick={() => setToolDetailModal({ title: 'Career Guidance Roadmap', desc: 'Explore career progression milestones from Junior Developer to Senior Engineering Manager.' })}
                sx={{ fontSize: 13, fontWeight: 700, color: '#530EF0', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
              >
                Explore Career Paths →
              </Typography>
            </Card>
          </Box>
        </Box>
      </Box>

      {/* ========================================================================= */}
      {/* 6. MODALS & SNACKBAR                                                      */}
      {/* ========================================================================= */}

      {/* Resume Builder Modal */}
      <Dialog
        open={builderModalOpen}
        onClose={() => setBuilderModalOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: '18px', p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: 20, color: '#111827' }}>
          📄 AI Resume Builder ({selectedTemplate.toUpperCase()} Template)
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Stack spacing={2.5}>
            <Typography sx={{ fontSize: 13, color: '#6B7280' }}>
              Fill in your details or use our AI auto-generation based on your TraceU candidate profile.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Full Name"
                value={resumeData.name}
                onChange={(e) => setResumeData({ ...resumeData, name: e.target.value })}
                fullWidth
                size="small"
              />
              <TextField
                label="Target Job Title"
                value={resumeData.title}
                onChange={(e) => setResumeData({ ...resumeData, title: e.target.value })}
                fullWidth
                size="small"
              />
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Email Address"
                value={resumeData.email}
                onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })}
                fullWidth
                size="small"
              />
              <TextField
                label="Phone"
                value={resumeData.phone}
                onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })}
                fullWidth
                size="small"
              />
            </Stack>

            <TextField
              label="Professional Summary"
              multiline
              rows={3}
              value={resumeData.summary}
              onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
              fullWidth
              size="small"
            />

            <TextField
              label="Key Skills (comma separated)"
              value={resumeData.skills}
              onChange={(e) => setResumeData({ ...resumeData, skills: e.target.value })}
              fullWidth
              size="small"
            />

            <Box sx={{ p: 2, bgcolor: '#F8F9FE', borderRadius: '10px', border: '1px solid #E9D5FF' }}>
              <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: '#530EF0', mb: 0.5 }}>
                ✓ Live ATS Optimization Active
              </Typography>
              <Typography sx={{ fontSize: 12, color: '#4B5563' }}>
                Your resume currently meets 94% of applicant tracking criteria for Indian and Global tech employers.
              </Typography>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setBuilderModalOpen(false)} sx={{ textTransform: 'none', color: '#6B7280' }}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              setBuilderModalOpen(false);
              setSnackbar({ open: true, message: `Resume "${resumeData.name}.pdf" generated and ready for download!`, severity: 'success' });
            }}
            sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 700, borderRadius: '8px', px: 3 }}
          >
            Generate & Download PDF
          </Button>
        </DialogActions>
      </Dialog>

      {/* Upload & Scan Modal */}
      <Dialog
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>
          📤 AI Resume Scanner & Reviewer
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Stack spacing={2} textAlign="center">
            <Box sx={{ width: 50, height: 50, borderRadius: '50%', bgcolor: '#F3EDFF', color: '#530EF0', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', fontSize: 24 }}>
              📄
            </Box>
            <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
              Upload your existing resume to get an instant ATS score.
            </Typography>
            <Typography sx={{ fontSize: 12, color: '#6B7280' }}>
              We analyze keyword density, formatting compliance, and impact metrics.
            </Typography>

            {scanning && (
              <Box sx={{ width: '100%', mt: 2 }}>
                <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#530EF0', mb: 0.5 }}>
                  Analyzing Resume... {scanProgress}%
                </Typography>
                <LinearProgress variant="determinate" value={scanProgress} sx={{ height: 8, borderRadius: 4, bgcolor: '#EDE9FE', '& .MuiLinearProgress-bar': { bgcolor: '#530EF0' } }} />
              </Box>
            )}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setUploadModalOpen(false)} sx={{ textTransform: 'none' }}>Close</Button>
          <Button
            variant="contained"
            disabled={scanning}
            onClick={handleUploadScan}
            sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 700, borderRadius: '8px' }}
          >
            {scanning ? 'Scanning...' : 'Select File & Scan'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* AI Career Assistant Modal */}
      <Dialog
        open={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>
          🤖 AI Career Assistant
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Box sx={{ p: 2, bgcolor: '#F3EDFF', borderRadius: '12px' }}>
              <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#530EF0', mb: 0.5 }}>
                Personalized Career Growth Roadmap for Candidate
              </Typography>
              <Typography sx={{ fontSize: 12.5, color: '#374151', lineHeight: 1.5 }}>
                1. <strong>Target Role:</strong> Senior Full Stack Developer (Bengaluru / Hybrid)<br />
                2. <strong>Recommended Salary Range:</strong> ₹18 - 25 LPA based on 3+ years experience.<br />
                3. <strong>Skill Booster:</strong> Complete GraphQL and System Design certification to increase interview shortlists by 38%.
              </Typography>
            </Box>
            <TextField label="Ask AI anything about your career..." fullWidth size="small" placeholder="e.g. How do I transition to Engineering Manager?" />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setAiAssistantOpen(false)} sx={{ textTransform: 'none' }}>Close</Button>
          <Button
            variant="contained"
            onClick={() => {
              setAiAssistantOpen(false);
              setSnackbar({ open: true, message: 'Career roadmap saved to your profile!', severity: 'success' });
            }}
            sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 700, borderRadius: '8px' }}
          >
            Save Roadmap
          </Button>
        </DialogActions>
      </Dialog>

      {/* Tool Detail Dialog */}
      <Dialog
        open={Boolean(toolDetailModal)}
        onClose={() => setToolDetailModal(null)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
      >
        {toolDetailModal && (
          <>
            <DialogTitle sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>
              🚀 {toolDetailModal.title}
            </DialogTitle>
            <DialogContent dividers sx={{ p: 3 }}>
              <Typography sx={{ fontSize: 13.5, color: '#4B5563', lineHeight: 1.5 }}>
                {toolDetailModal.desc}
              </Typography>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={() => setToolDetailModal(null)} sx={{ textTransform: 'none' }}>Close</Button>
              <Button
                variant="contained"
                onClick={() => {
                  setToolDetailModal(null);
                  setSnackbar({ open: true, message: `Launching ${toolDetailModal.title}...`, severity: 'success' });
                }}
                sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 700, borderRadius: '8px' }}
              >
                Launch Now
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Global Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ borderRadius: '10px', fontWeight: 600 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

