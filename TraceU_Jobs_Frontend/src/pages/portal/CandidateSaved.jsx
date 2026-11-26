import React, { useState, useMemo } from 'react';
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
import Select from '@mui/material/Select';
import CandidateJobApplicationDialog from 'components/CandidateJobApplicationDialog';

// icons
import DownOutlined from '@ant-design/icons/DownOutlined';
import BellOutlined from '@ant-design/icons/BellOutlined';
import BookOutlined from '@ant-design/icons/BookOutlined';
import BookFilled from '@ant-design/icons/BookFilled';
import ShopOutlined from '@ant-design/icons/ShopOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import EnvironmentOutlined from '@ant-design/icons/EnvironmentOutlined';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import DollarOutlined from '@ant-design/icons/DollarOutlined';
import StarFilled from '@ant-design/icons/StarFilled';
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined';
import CrownOutlined from '@ant-design/icons/CrownOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';

// assets
import avatarCandidate from 'assets/images/users/avatar-1.png';
import candidateSavedHero from 'assets/images/auth/candidate-find-jobs-v5.jpg';

// Brand SVGs
function GoogleLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.13C3.26 21.36 7.33 24 12 24z" />
      <path fill="#FBBC05" d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.58H1.26C.46 8.18 0 10.03 0 12s.46 3.82 1.26 5.42l4.02-3.13z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.26 6.58l4.02 3.13c.95-2.83 3.6-4.93 6.72-4.93z" />
    </svg>
  );
}

function MicrosoftLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 23 23">
      <path fill="#f35325" d="M1 1h10v10H1z" />
      <path fill="#81bc06" d="M12 1h10v10H12z" />
      <path fill="#05a6f0" d="M1 12h10v10H1z" />
      <path fill="#ffba08" d="M12 12h10v10H12z" />
    </svg>
  );
}

function AmazonLogo() {
  return (
    <svg width="24" height="18" viewBox="0 0 24 16">
      <text x="0" y="11" fill="#111827" fontSize="13" fontWeight="900" fontFamily="sans-serif">a</text>
      <path d="M2 13 C 8 16, 16 16, 22 11" fill="none" stroke="#FF9900" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M20 10 L 22 11 L 20 13" fill="none" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function TcsLogo() {
  return (
    <Typography sx={{ fontWeight: 900, fontSize: 16, color: '#C4161C', letterSpacing: '-0.5px' }}>
      tcs
    </Typography>
  );
}

function InfosysLogo() {
  return (
    <Typography sx={{ fontWeight: 800, fontSize: 14, color: '#007CC3', letterSpacing: '-0.3px' }}>
      Infosys
    </Typography>
  );
}

function AccentureLogo() {
  return (
    <Typography sx={{ fontWeight: 900, fontSize: 18, color: '#A100FF',  lineHeight: 1 }}>
      &gt;
    </Typography>
  );
}

function DeloitteLogo() {
  return (
    <Typography sx={{ fontWeight: 900, fontSize: 13, color: '#86BC25' }}>
      D.
    </Typography>
  );
}

function HclLogo() {
  return (
    <Typography sx={{ fontWeight: 800, fontSize: 13, color: '#0054A6' }}>
      HCL
    </Typography>
  );
}

function ZohoLogo() {
  return (
    <Box sx={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
      <Box sx={{ width: 10, height: 10, borderRadius: '2px', bgcolor: '#EF4444', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 6.5, fontWeight: 900 }}>Z</Box>
      <Box sx={{ width: 10, height: 10, borderRadius: '2px', bgcolor: '#10B981', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 6.5, fontWeight: 900 }}>O</Box>
      <Box sx={{ width: 10, height: 10, borderRadius: '2px', bgcolor: '#3B82F6', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 6.5, fontWeight: 900 }}>H</Box>
      <Box sx={{ width: 10, height: 10, borderRadius: '2px', bgcolor: '#F59E0B', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 6.5, fontWeight: 900 }}>O</Box>
    </Box>
  );
}

// 5 Saved Jobs matching screenshot
const INITIAL_SAVED_JOBS = [
  {
    id: 'saved-1',
    title: 'Software Engineer',
    company: 'Google',
    logo: <GoogleLogo />,
    rating: 4.4,
    reviews: '12.8K reviews',
    location: 'Bengaluru, Karnataka',
    exp: '3 - 5 Years',
    salary: '₹ 25 - 40 LPA',
    workMode: 'Hybrid',
    jobType: 'Full Time',
    savedDate: 'Saved on Oct 20, 2026',
    tags: ['Python', 'System Design', 'Distributed Systems', '+3 more'],
    isSaved: true
  },
  {
    id: 'saved-2',
    title: 'Product Manager',
    company: 'Microsoft',
    logo: <MicrosoftLogo />,
    rating: 4.3,
    reviews: '10.2K reviews',
    location: 'Hyderabad, Telangana',
    exp: '5 - 8 Years',
    salary: '₹ 35 - 60 LPA',
    workMode: 'On-site',
    jobType: 'Full Time',
    savedDate: 'Saved on Oct 18, 2026',
    tags: ['Product Strategy', 'Analytics', 'Stakeholder Management', '+2 more'],
    isSaved: true
  },
  {
    id: 'saved-3',
    title: 'Data Analyst',
    company: 'Amazon',
    logo: <AmazonLogo />,
    rating: 4.2,
    reviews: '15.6K reviews',
    location: 'Bengaluru, Karnataka',
    exp: '1 - 3 Years',
    salary: '₹ 12 - 20 LPA',
    workMode: 'Hybrid',
    jobType: 'Full Time',
    savedDate: 'Saved on Oct 15, 2026',
    tags: ['SQL', 'Python', 'Data Visualization', '+2 more'],
    isSaved: true
  },
  {
    id: 'saved-4',
    title: 'UI/UX Designer',
    company: 'TCS',
    logo: <TcsLogo />,
    rating: 4.1,
    reviews: '18.4K reviews',
    location: 'Chennai, Tamil Nadu',
    exp: '3 - 5 Years',
    salary: '₹ 15 - 25 LPA',
    workMode: 'On-site',
    jobType: 'Full Time',
    savedDate: 'Saved on Oct 14, 2026',
    tags: ['Figma', 'UI Design', 'User Research', '+2 more'],
    isSaved: true
  },
  {
    id: 'saved-5',
    title: 'DevOps Engineer',
    company: 'Infosys',
    logo: <InfosysLogo />,
    rating: 4.0,
    reviews: '14.2K reviews',
    location: 'Pune, Maharashtra',
    exp: '2 - 5 Years',
    salary: '₹ 18 - 30 LPA',
    workMode: 'Hybrid',
    jobType: 'Full Time',
    savedDate: 'Saved on Oct 12, 2026',
    tags: ['AWS', 'Docker', 'Kubernetes', '+2 more'],
    isSaved: true
  }
];

// Recommended Jobs (Right Widget)
const RECOMMENDED_JOBS = [
  {
    id: 'rec-1',
    title: 'Full Stack Developer',
    company: 'Zoho',
    logo: <TcsLogo />,
    salary: '₹ 18 - 28 LPA',
    location: 'Chennai'
  },
  {
    id: 'rec-2',
    title: 'Marketing Specialist',
    company: 'Accenture',
    logo: <AccentureLogo />,
    salary: '₹ 10 - 18 LPA',
    location: 'Bengaluru'
  },
  {
    id: 'rec-3',
    title: 'Business Analyst',
    company: 'Deloitte',
    logo: <DeloitteLogo />,
    salary: '₹ 12 - 22 LPA',
    location: 'Hyderabad'
  },
  {
    id: 'rec-4',
    title: 'HR Executive',
    company: 'HCL',
    logo: <HclLogo />,
    salary: '₹ 8 - 15 LPA',
    location: 'Noida'
  }
];

export default function CandidateSaved() {
  const navigate = useNavigate();

  // Active view & filter
  const [activeSidebarTab, setActiveSidebarTab] = useState('saved-jobs');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Recently Saved');

  // Saved state
  const [savedJobsList, setSavedJobsList] = useState(INITIAL_SAVED_JOBS);
  const [recSaved, setRecSaved] = useState({});

  // Dialogs
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [detailsModalJob, setDetailsModalJob] = useState(null);
  const [applyModalJob, setApplyModalJob] = useState(null);
  const [quickApplyData, setQuickApplyData] = useState({ name: 'Candidate', email: 'candidate@gmail.com' });
  const [quickApplyErrors, setQuickApplyErrors] = useState({});
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertEmail, setAlertEmail] = useState('candidate@gmail.com');
  const [alertEmailError, setAlertEmailError] = useState('');
  const [proModalOpen, setProModalOpen] = useState(false);

  // Snackbar
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Toggle save
  const toggleSaveJob = (id, title) => {
    setSavedJobsList((prev) =>
      prev.map((j) => {
        if (j.id === id) {
          const nextSaved = !j.isSaved;
          setSnackbar({
            open: true,
            message: nextSaved ? `Saved "${title}"` : `Removed "${title}" from saved items`,
            severity: nextSaved ? 'success' : 'info'
          });
          return { ...j, isSaved: nextSaved };
        }
        return j;
      })
    );
  };

  // Toggle recommended bookmark
  const toggleRecSave = (id, title) => {
    setRecSaved((prev) => {
      const isBookmarked = !prev[id];
      setSnackbar({
        open: true,
        message: isBookmarked ? `Added "${title}" to saved jobs` : `Removed "${title}"`,
        severity: isBookmarked ? 'success' : 'info'
      });
      return { ...prev, [id]: isBookmarked };
    });
  };

  // Filtered jobs
  const visibleJobs = useMemo(() => {
    return savedJobsList.filter((j) => {
      if (!j.isSaved) return false;
      if (selectedFilter === 'All') return true;
      if (selectedFilter === 'Full Time') return j.jobType === 'Full Time';
      if (selectedFilter === 'Remote') return j.workMode === 'Remote' || j.workMode === 'Hybrid';
      return true;
    });
  }, [savedJobsList, selectedFilter]);

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

            <Typography
              onClick={() => navigate('/candidate/career-tools')}
              sx={{
                fontWeight: 500,
                fontSize: 14,
                color: '#4B5563',
                cursor: 'pointer',
                transition: 'color 0.15s ease',
                '&:hover': { color: '#530EF0' }
              }}
            >
              Career Tools
            </Typography>
          </Stack>
        </Stack>

        {/* Right: Actions */}
        <Stack direction="row" alignItems="center" spacing={2} sx={{ height: 70 }}>
          {/* Notifications */}
          <IconButton
            size="small"
            onClick={() => setSnackbar({ open: true, message: 'Google shortlisted your saved application!', severity: 'info' })}
            sx={{ color: '#4B5563', '&:hover': { color: '#530EF0', bgcolor: '#F3EDFF' } }}
          >
            <Badge badgeContent={3} color="error" sx={{ '& .MuiBadge-badge': { fontSize: 10, height: 16, minWidth: 16 } }}>
              <BellOutlined style={{ fontSize: 18 }} />
            </Badge>
          </IconButton>

          {/* Saved (Active Tab with purple indicator) */}
          <Box
            sx={{
              position: 'relative',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              px: 1
            }}
          >
            <Stack direction="row" alignItems="center" spacing={0.6}>
              <BookFilled style={{ fontSize: 15, color: '#530EF0' }} />
              <Typography sx={{ fontWeight: 700, fontSize: 14, color: '#530EF0' }}>
                Saved
              </Typography>
            </Stack>
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
              YOUR SAVED ITEMS
            </Typography>

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: 32, sm: 42, md: 48 },
                fontWeight: 800,
                lineHeight: 1.15,
                color: '#111827',
                letterSpacing: '-0.8px',
                mb: 1.5
              }}
            >
              Keep track of <Box component="span" sx={{ color: '#530EF0' }}>opportunities</Box>
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: 14.5, sm: 16 },
                color: '#6B7280',
                lineHeight: 1.6,
                maxWidth: 620
              }}
            >
              Save jobs, companies and searches to never miss the right opportunity.
            </Typography>
          </Box>

          {/* Right Hero Graphic: Saved Jobs & Bookmarks Scene */}
          <Box
            sx={{
              display: { xs: 'none', lg: 'block' },
              position: 'relative',
              width: 440,
              height: 330
            }}
          >
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
                src={candidateSavedHero}
                alt="Saved Jobs and Bookmarks"
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
      {/* 3. MAIN CONTENT: 3-COLUMN LAYOUT                                          */}
      {/* ========================================================================= */}
      <Box sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 2, sm: 3, md: 5 }, py: 4 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="flex-start">
          {/* ===================================================================== */}
          {/* LEFT COLUMN: NAVIGATION SIDEBAR (240px)                               */}
          {/* ===================================================================== */}
          <Box sx={{ width: { xs: '100%', md: 240 }, flexShrink: 0 }}>
            <Card
              elevation={0}
              sx={{
                p: 2,
                borderRadius: '16px',
                border: '1px solid #F1F5F9',
                bgcolor: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
              }}
            >
              {/* Top Group: Saved Items */}
              <Stack spacing={1} sx={{ mb: 2 }}>
                {/* Saved Jobs */}
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  onClick={() => setActiveSidebarTab('saved-jobs')}
                  sx={{
                    p: 1.25,
                    borderRadius: '10px',
                    cursor: 'pointer',
                    bgcolor: activeSidebarTab === 'saved-jobs' ? '#F3EDFF' : 'transparent',
                    color: activeSidebarTab === 'saved-jobs' ? '#530EF0' : '#4B5563',
                    transition: 'all 0.15s ease',
                    '&:hover': { bgcolor: '#F3EDFF', color: '#530EF0' }
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1.25}>
                    <BookFilled style={{ fontSize: 16 }} />
                    <Typography sx={{ fontWeight: 700, fontSize: 13.5 }}>
                      Saved Jobs
                    </Typography>
                  </Stack>
                  <Chip
                    label="12"
                    size="small"
                    sx={{
                      bgcolor: activeSidebarTab === 'saved-jobs' ? '#E9D5FF' : '#F3F4F6',
                      color: activeSidebarTab === 'saved-jobs' ? '#530EF0' : '#6B7280',
                      fontSize: 11,
                      fontWeight: 700,
                      height: 20
                    }}
                  />
                </Stack>

                {/* Saved Companies */}
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  onClick={() => {
                    setActiveSidebarTab('saved-companies');
                    navigate('/candidate/companies');
                  }}
                  sx={{
                    p: 1.25,
                    borderRadius: '10px',
                    cursor: 'pointer',
                    bgcolor: activeSidebarTab === 'saved-companies' ? '#F3EDFF' : 'transparent',
                    color: activeSidebarTab === 'saved-companies' ? '#530EF0' : '#4B5563',
                    transition: 'all 0.15s ease',
                    '&:hover': { bgcolor: '#F3EDFF', color: '#530EF0' }
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1.25}>
                    <ShopOutlined style={{ fontSize: 16 }} />
                    <Typography sx={{ fontWeight: 600, fontSize: 13.5 }}>
                      Saved Companies
                    </Typography>
                  </Stack>
                  <Chip
                    label="6"
                    size="small"
                    sx={{ bgcolor: '#F3F4F6', color: '#6B7280', fontSize: 11, fontWeight: 700, height: 20 }}
                  />
                </Stack>

                {/* Saved Searches */}
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  onClick={() => {
                    setActiveSidebarTab('saved-searches');
                    setSnackbar({ open: true, message: 'Showing 4 saved search queries', severity: 'info' });
                  }}
                  sx={{
                    p: 1.25,
                    borderRadius: '10px',
                    cursor: 'pointer',
                    bgcolor: activeSidebarTab === 'saved-searches' ? '#F3EDFF' : 'transparent',
                    color: activeSidebarTab === 'saved-searches' ? '#530EF0' : '#4B5563',
                    transition: 'all 0.15s ease',
                    '&:hover': { bgcolor: '#F3EDFF', color: '#530EF0' }
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1.25}>
                    <SearchOutlined style={{ fontSize: 16 }} />
                    <Typography sx={{ fontWeight: 600, fontSize: 13.5 }}>
                      Saved Searches
                    </Typography>
                  </Stack>
                  <Chip
                    label="4"
                    size="small"
                    sx={{ bgcolor: '#F3F4F6', color: '#6B7280', fontSize: 11, fontWeight: 700, height: 20 }}
                  />
                </Stack>
              </Stack>

              <Divider sx={{ my: 1.5 }} />

              {/* Bottom Quick Links */}
              <Stack spacing={0.5}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1.25}
                  onClick={() => setAlertModalOpen(true)}
                  sx={{
                    p: 1.25,
                    borderRadius: '10px',
                    cursor: 'pointer',
                    color: '#4B5563',
                    '&:hover': { bgcolor: '#F8F9FE', color: '#530EF0' }
                  }}
                >
                  <BellOutlined style={{ fontSize: 15 }} />
                  <Typography sx={{ fontSize: 13.5, fontWeight: 500 }}>Job Alerts</Typography>
                </Stack>

                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1.25}
                  onClick={() => setSnackbar({ open: true, message: 'You have applied to 8 jobs this month.', severity: 'info' })}
                  sx={{
                    p: 1.25,
                    borderRadius: '10px',
                    cursor: 'pointer',
                    color: '#4B5563',
                    '&:hover': { bgcolor: '#F8F9FE', color: '#530EF0' }
                  }}
                >
                  <FileTextOutlined style={{ fontSize: 15 }} />
                  <Typography sx={{ fontSize: 13.5, fontWeight: 500 }}>Applied Jobs</Typography>
                </Stack>

                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1.25}
                  onClick={() => navigate('/candidate')}
                  sx={{
                    p: 1.25,
                    borderRadius: '10px',
                    cursor: 'pointer',
                    color: '#4B5563',
                    '&:hover': { bgcolor: '#F8F9FE', color: '#530EF0' }
                  }}
                >
                  <UserOutlined style={{ fontSize: 15 }} />
                  <Typography sx={{ fontSize: 13.5, fontWeight: 500 }}>Profile</Typography>
                </Stack>

                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1.25}
                  onClick={() => setSnackbar({ open: true, message: 'Candidate account settings', severity: 'info' })}
                  sx={{
                    p: 1.25,
                    borderRadius: '10px',
                    cursor: 'pointer',
                    color: '#4B5563',
                    '&:hover': { bgcolor: '#F8F9FE', color: '#530EF0' }
                  }}
                >
                  <SettingOutlined style={{ fontSize: 15 }} />
                  <Typography sx={{ fontSize: 13.5, fontWeight: 500 }}>Settings</Typography>
                </Stack>
              </Stack>
            </Card>
          </Box>

          {/* ===================================================================== */}
          {/* MIDDLE COLUMN: SAVED JOBS LISTINGS                                    */}
          {/* ===================================================================== */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Header & Sort Bar */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              spacing={2}
              sx={{ mb: 2 }}
            >
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>
                  Saved Jobs (12)
                </Typography>
                <Typography sx={{ fontSize: 12.5, color: '#6B7280', mt: 0.25 }}>
                  Jobs you've saved for later. Don't miss out on these opportunities!
                </Typography>
              </Box>

              {/* Sort by dropdown */}
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography sx={{ fontSize: 13, color: '#6B7280', fontWeight: 500 }}>
                  Sort by:
                </Typography>
                <Select
                  size="small"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  sx={{
                    bgcolor: '#FFFFFF',
                    borderRadius: '8px',
                    fontSize: 13,
                    fontWeight: 600,
                    height: 36,
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E5E7EB' }
                  }}
                >
                  <MenuItem value="Recently Saved">Recently Saved</MenuItem>
                  <MenuItem value="Highest Salary">Highest Salary</MenuItem>
                  <MenuItem value="Expiring Soon">Expiring Soon</MenuItem>
                </Select>
              </Stack>
            </Stack>

            {/* Filter Pills Row */}
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2.5 }}>
              {[
                { label: 'All (12)', key: 'All' },
                { label: 'Full Time (8)', key: 'Full Time' },
                { label: 'Part Time (2)', key: 'Part Time' },
                { label: 'Internship (2)', key: 'Internship' },
                { label: 'Remote (3)', key: 'Remote' }
              ].map((pill) => {
                const isActive = selectedFilter === pill.key;
                return (
                  <Chip
                    key={pill.key}
                    label={pill.label}
                    size="small"
                    onClick={() => setSelectedFilter(pill.key)}
                    sx={{
                      bgcolor: isActive ? '#530EF0' : '#FFFFFF',
                      color: isActive ? '#FFF' : '#4B5563',
                      border: isActive ? 'none' : '1px solid #E5E7EB',
                      fontWeight: 700,
                      fontSize: 12.5,
                      py: 1.8,
                      px: 0.75,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: isActive ? '#420bc2' : '#F3EDFF',
                        color: isActive ? '#FFF' : '#530EF0'
                      }
                    }}
                  />
                );
              })}
            </Stack>

            {/* List of 5 Saved Job Cards */}
            <Stack spacing={2.5}>
              {visibleJobs.map((job) => (
                <Card
                  key={job.id}
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: '16px',
                    border: '1px solid #F1F5F9',
                    bgcolor: '#FFFFFF',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: '#C7D2FE',
                      boxShadow: '0 8px 24px rgba(83, 14, 240, 0.06)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <Stack direction="row" spacing={2.5} alignItems="flex-start">
                    {/* Logo Square */}
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '14px',
                        border: '1px solid #F1F5F9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: '#FAFAFA',
                        flexShrink: 0
                      }}
                    >
                      {job.logo}
                    </Box>

                    {/* Job Details */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      {/* Top line: Title & Bookmark Ribbon with Date */}
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Box>
                          <Typography
                            variant="h3"
                            sx={{
                              fontSize: 18,
                              fontWeight: 800,
                              color: '#111827',
                              cursor: 'pointer',
                              mb: 0.5,
                              '&:hover': { color: '#530EF0' }
                            }}
                            onClick={() => setDetailsModalJob(job)}
                          >
                            {job.title}
                          </Typography>

                          {/* Company & Rating */}
                          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                            <Typography sx={{ fontWeight: 700, fontSize: 14, color: '#374151' }}>
                              {job.company}
                            </Typography>
                            <Stack direction="row" alignItems="center" spacing={0.4}>
                              <StarFilled style={{ fontSize: 12, color: '#F59E0B' }} />
                              <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: '#111827' }}>
                                {job.rating}
                              </Typography>
                              <Typography sx={{ fontSize: 12, color: '#6B7280' }}>
                                ({job.reviews})
                              </Typography>
                            </Stack>
                          </Stack>
                        </Box>

                        {/* Saved Date & Active Bookmark Icon */}
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                          <Typography sx={{ fontSize: 12, color: '#6B7280', display: { xs: 'none', sm: 'block' } }}>
                            {job.savedDate}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => toggleSaveJob(job.id, job.title)}
                            sx={{
                              color: '#530EF0',
                              '&:hover': { bgcolor: '#F3EDFF' }
                            }}
                          >
                            <BookFilled style={{ fontSize: 19 }} />
                          </IconButton>
                        </Stack>
                      </Stack>

                      {/* Meta Tags: Location, Experience, Salary, Work Mode */}
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={{ xs: 1.5, sm: 2.5 }}
                        flexWrap="wrap"
                        useFlexGap
                        sx={{ mb: 2, color: '#4B5563', fontSize: 13 }}
                      >
                        <Stack direction="row" alignItems="center" spacing={0.6}>
                          <EnvironmentOutlined style={{ fontSize: 13, color: '#9CA3AF' }} />
                          <Typography sx={{ fontSize: 13, color: 'inherit' }}>{job.location}</Typography>
                        </Stack>

                        <Stack direction="row" alignItems="center" spacing={0.6}>
                          <CalendarOutlined style={{ fontSize: 13, color: '#9CA3AF' }} />
                          <Typography sx={{ fontSize: 13, color: 'inherit' }}>{job.exp}</Typography>
                        </Stack>

                        <Stack direction="row" alignItems="center" spacing={0.6}>
                          <DollarOutlined style={{ fontSize: 13, color: '#9CA3AF' }} />
                          <Typography sx={{ fontSize: 13, color: '#111827', fontWeight: 600 }}>{job.salary}</Typography>
                        </Stack>

                        <Stack direction="row" alignItems="center" spacing={0.6}>
                          <ShopOutlined style={{ fontSize: 13, color: '#9CA3AF' }} />
                          <Typography sx={{ fontSize: 13, color: 'inherit' }}>{job.workMode}</Typography>
                        </Stack>
                      </Stack>

                      {/* Bottom Row: Skill Tags + View Details & Apply Buttons */}
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        flexWrap="wrap"
                        useFlexGap
                        spacing={2}
                      >
                        {/* Skills Chips */}
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                          {job.tags.map((tag) => (
                            <Chip
                              key={tag}
                              label={tag}
                              size="small"
                              sx={{
                                bgcolor: '#F3F4F6',
                                color: '#4B5563',
                                fontSize: 11.5,
                                fontWeight: 500,
                                borderRadius: '6px'
                              }}
                            />
                          ))}
                        </Stack>

                        {/* Action Buttons */}
                        <Stack direction="row" spacing={1.5}>
                          <Button
                            variant="outlined"
                            onClick={() => setDetailsModalJob(job)}
                            sx={{
                              borderColor: '#E5E7EB',
                              color: '#374151',
                              fontWeight: 700,
                              fontSize: 13,
                              px: 2.5,
                              py: 0.75,
                              borderRadius: '8px',
                              textTransform: 'none',
                              '&:hover': {
                                bgcolor: '#F8F9FE',
                                borderColor: '#530EF0',
                                color: '#530EF0'
                              }
                            }}
                          >
                            View Details
                          </Button>

                          <Button
                            variant="contained"
                            onClick={() => setApplyModalJob(job)}
                            sx={{
                              bgcolor: '#530EF0',
                              color: '#FFF',
                              fontWeight: 700,
                              fontSize: 13,
                              px: 3,
                              py: 0.75,
                              borderRadius: '8px',
                              textTransform: 'none',
                              boxShadow: '0 4px 12px rgba(83, 14, 240, 0.25)',
                              '&:hover': { bgcolor: '#420bc2' }
                            }}
                          >
                            Apply Now
                          </Button>
                        </Stack>
                      </Stack>
                    </Box>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </Box>

          {/* ===================================================================== */}
          {/* RIGHT COLUMN: PROMO & RECOMMENDED JOBS (320px)                        */}
          {/* ===================================================================== */}
          <Box sx={{ width: { xs: '100%', md: 320 }, flexShrink: 0 }}>
            <Stack spacing={3}>
              {/* Card 1: Create Job Alert */}
              <Card
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: '16px',
                  border: '1px solid #F1F5F9',
                  bgcolor: '#FFFFFF',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1.5 }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      bgcolor: '#F3EDFF',
                      color: '#530EF0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 20
                    }}
                  >
                    🔔
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 800, fontSize: 15, color: '#111827' }}>
                      Create Job Alert
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: '#6B7280', lineHeight: 1.4 }}>
                      Get notified when new jobs match your saved preferences.
                    </Typography>
                  </Box>
                </Stack>

                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => setAlertModalOpen(true)}
                  endIcon={<ArrowRightOutlined />}
                  sx={{
                    mt: 1,
                    borderColor: '#530EF0',
                    color: '#530EF0', fontWeight: 600, fontSize: 12,
                    py: 1,
                    borderRadius: '8px',
                    textTransform: 'none',
                    '&:hover': { bgcolor: '#F3EDFF', borderColor: '#530EF0' }
                  }}
                >
                  Create Job Alert
                </Button>
              </Card>

              {/* Card 2: Recommended Jobs */}
              <Card
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: '16px',
                  border: '1px solid #F1F5F9',
                  bgcolor: '#FFFFFF',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                  <Typography sx={{ fontWeight: 800, fontSize: 14.5, color: '#111827' }}>
                    Recommended Jobs
                  </Typography>
                  <Typography
                    onClick={() => navigate('/candidate/jobs')}
                    sx={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#530EF0',
                      cursor: 'pointer',
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    View All →
                  </Typography>
                </Stack>

                <Stack spacing={2}>
                  {RECOMMENDED_JOBS.map((job) => {
                    const isBookmarked = Boolean(recSaved[job.id]);

                    return (
                      <Stack
                        key={job.id}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{
                          pb: 1.75,
                          borderBottom: '1px solid #F3F4F6',
                          '&:last-child': { pb: 0, borderBottom: 'none' }
                        }}
                      >
                        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 0, flex: 1 }}>
                          <Box sx={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            {job.logo}
                          </Box>
                          <Box sx={{ minWidth: 0 }}>
                            <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {job.title}
                            </Typography>
                            <Typography sx={{ fontSize: 11.5, color: '#6B7280' }}>
                              {job.company}
                            </Typography>
                            <Typography sx={{ fontSize: 11, color: '#9CA3AF' }}>
                              {job.salary} • {job.location}
                            </Typography>
                          </Box>
                        </Stack>

                        <IconButton
                          size="small"
                          onClick={() => toggleRecSave(job.id, job.title)}
                          sx={{
                            color: isBookmarked ? '#530EF0' : '#9CA3AF',
                            '&:hover': { color: '#530EF0' }
                          }}
                        >
                          {isBookmarked ? <BookFilled style={{ fontSize: 15 }} /> : <BookOutlined style={{ fontSize: 15 }} />}
                        </IconButton>
                      </Stack>
                    );
                  })}
                </Stack>
              </Card>

              {/* Card 3: Upgrade to TraceU Pro */}
              <Card
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #F3EDFF 0%, #FAF5FF 100%)',
                  border: '1px solid #E9D5FF',
                  boxShadow: '0 4px 16px rgba(83, 14, 240, 0.05)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
                  <Box>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                      <CrownOutlined style={{ fontSize: 16, color: '#7C3AED' }} />
                      <Typography sx={{ fontWeight: 800, fontSize: 15, color: '#111827' }}>
                        Upgrade to TraceU Pro
                      </Typography>
                    </Stack>
                    <Typography sx={{ fontSize: 12, color: '#6B7280', lineHeight: 1.45 }}>
                      Get early access to jobs, AI insights, and personalized recommendations.
                    </Typography>
                  </Box>

                  {/* Crown Icon */}
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      bgcolor: '#FFFFFF',
                      boxShadow: '0 4px 12px rgba(83, 14, 240, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 22,
                      flexShrink: 0
                    }}
                  >
                    👑
                  </Box>
                </Stack>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => setProModalOpen(true)}
                  endIcon={<ArrowRightOutlined />}
                  sx={{
                    mt: 1,
                    bgcolor: '#530EF0',
                    color: '#FFF',
                    fontWeight: 700,
                    fontSize: 13,
                    py: 1.1,
                    borderRadius: '8px',
                    textTransform: 'none',
                    boxShadow: '0 4px 12px rgba(83, 14, 240, 0.3)',
                    '&:hover': { bgcolor: '#420bc2' }
                  }}
                >
                  Upgrade Now
                </Button>
              </Card>
            </Stack>
          </Box>
        </Stack>
      </Box>

      {/* ========================================================================= */}
      {/* 4. MODALS & SNACKBAR                                                      */}
      {/* ========================================================================= */}

      {/* View Details Modal */}
      <Dialog
        open={Boolean(detailsModalJob)}
        onClose={() => setDetailsModalJob(null)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
      >
        {detailsModalJob && (
          <>
            <DialogTitle sx={{ fontWeight: 800, fontSize: 19, color: '#111827' }}>
              {detailsModalJob.title} - {detailsModalJob.company}
            </DialogTitle>
            <DialogContent dividers sx={{ p: 3 }}>
              <Stack spacing={2}>
                <Box sx={{ p: 2, bgcolor: '#F8F9FE', borderRadius: '10px' }}>
                  <Typography sx={{ fontSize: 13, color: '#530EF0', fontWeight: 700 }}>
                    📍 {detailsModalJob.location} • 💼 {detailsModalJob.workMode} • 💰 {detailsModalJob.salary}
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: '#6B7280', mt: 0.5 }}>
                    Experience: {detailsModalJob.exp} | Rating: ★ {detailsModalJob.rating} ({detailsModalJob.reviews})
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>
                  Role Overview
                </Typography>
                <Typography sx={{ fontSize: 12.5, color: '#4B5563', lineHeight: 1.6 }}>
                  You will work with high-performing cross-functional teams to build scalable systems, drive architectural decisions, and deliver world-class software solutions.
                </Typography>
                <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>
                  Required Skills:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {detailsModalJob.tags.map((t) => (
                    <Chip key={t} label={t} size="small" sx={{ bgcolor: '#F3EDFF', color: '#530EF0', fontWeight: 600 }} />
                  ))}
                </Stack>
              </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={() => setDetailsModalJob(null)} sx={{ textTransform: 'none', color: '#6B7280' }}>Close</Button>
              <Button
                variant="contained"
                onClick={() => {
                  const j = detailsModalJob;
                  setDetailsModalJob(null);
                  setApplyModalJob(j);
                }}
                sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 700, borderRadius: '8px' }}
              >
                Apply for this Role
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* 8-Step Comprehensive Application Modal */}
      <CandidateJobApplicationDialog
        open={Boolean(applyModalJob)}
        onClose={() => setApplyModalJob(null)}
        job={applyModalJob}
        onApplySuccess={(newAppId, appliedJob) => {
          setSnackbar({
            open: true,
            message: `🎉 Application ${newAppId} successfully submitted to ${appliedJob?.company || 'Company'} for ${appliedJob?.title || 'the role'}!`,
            severity: 'success'
          });
        }}
      />

      {/* Alert Modal */}
      <Dialog
        open={alertModalOpen}
        onClose={() => {
          setAlertModalOpen(false);
          setAlertEmailError('');
        }}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>
          🔔 Saved Preference Alerts
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Typography sx={{ fontSize: 12.5, color: '#6B7280' }}>
              Receive instant alerts when Google, Microsoft, or Amazon post new engineering and product roles matching your saved items.
            </Typography>
            <TextField
              label="Notification Email *"
              type="email"
              value={alertEmail}
              onChange={(e) => {
                setAlertEmail(e.target.value);
                if (alertEmailError) setAlertEmailError('');
              }}
              error={Boolean(alertEmailError)}
              helperText={alertEmailError}
              fullWidth
              size="small"
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => {
              setAlertModalOpen(false);
              setAlertEmailError('');
            }}
            sx={{ textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!alertEmail.trim()) {
                setAlertEmailError('Email is required');
                setSnackbar({ open: true, message: 'Please enter a valid email address', severity: 'error' });
                return;
              } else if (!emailRegex.test(alertEmail.trim())) {
                setAlertEmailError('Must be a valid email address');
                setSnackbar({ open: true, message: 'Must be a valid email address', severity: 'error' });
                return;
              }
              setAlertModalOpen(false);
              setAlertEmailError('');
              setSnackbar({ open: true, message: 'Saved preference job alert activated!', severity: 'success' });
            }}
            sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 700, borderRadius: '8px' }}
          >
            Activate Alert
          </Button>
        </DialogActions>
      </Dialog>

      {/* Pro Modal */}
      <Dialog
        open={proModalOpen}
        onClose={() => setProModalOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>
          👑 TraceU Pro Membership
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Stack spacing={1.5}>
            <Typography sx={{ fontSize: 13, color: '#4B5563' }}>
              Enjoy unlimited saved jobs, AI resume scanning, 24-hour early job applications, and recruiter profile spotlights.
            </Typography>
            <Box sx={{ p: 2, bgcolor: '#F3EDFF', borderRadius: '10px', textAlign: 'center' }}>
              <Typography sx={{ fontSize: 18, fontWeight: 900, color: '#530EF0' }}>
                ₹ 499 / month
              </Typography>
              <Typography sx={{ fontSize: 11.5, color: '#6B7280' }}>
                Cancel anytime. 7-day money back guarantee.
              </Typography>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setProModalOpen(false)} sx={{ textTransform: 'none' }}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              setProModalOpen(false);
              setSnackbar({ open: true, message: 'Welcome to TraceU Pro! Premium unlocked.', severity: 'success' });
            }}
            sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 700, borderRadius: '8px' }}
          >
            Start Pro Free Trial
          </Button>
        </DialogActions>
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
