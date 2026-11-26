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
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import CandidateJobApplicationDialog from 'components/CandidateJobApplicationDialog';

// icons
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import EnvironmentOutlined from '@ant-design/icons/EnvironmentOutlined';
import ShopOutlined from '@ant-design/icons/ShopOutlined';
import DownOutlined from '@ant-design/icons/DownOutlined';
import UpOutlined from '@ant-design/icons/UpOutlined';
import BellOutlined from '@ant-design/icons/BellOutlined';
import HeartOutlined from '@ant-design/icons/HeartOutlined';
import HeartFilled from '@ant-design/icons/HeartFilled';
import BookmarkOutlined from '@ant-design/icons/BookOutlined';
import BookOutlined from '@ant-design/icons/BookOutlined';
import StarFilled from '@ant-design/icons/StarFilled';
import UploadOutlined from '@ant-design/icons/UploadOutlined';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import DollarOutlined from '@ant-design/icons/DollarOutlined';
import CrownOutlined from '@ant-design/icons/CrownOutlined';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';

// assets
import candidateHeroImg from 'assets/images/auth/candidate-find-jobs-v5.jpg';
import avatarCandidate from 'assets/images/users/avatar-1.png';

// Brand logos (SVG helpers)
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
    <svg width="22" height="22" viewBox="0 0 22 22">
      <rect x="1" y="1" width="9" height="9" fill="#F25022" rx="1" />
      <rect x="12" y="1" width="9" height="9" fill="#7FBA00" rx="1" />
      <rect x="1" y="12" width="9" height="9" fill="#00A4EF" rx="1" />
      <rect x="12" y="12" width="9" height="9" fill="#FFB900" rx="1" />
    </svg>
  );
}

function ZohoLogo() {
  return (
    <Box sx={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
      <Box sx={{ width: 9, height: 16, bgcolor: '#E1251B', borderRadius: '2px' }} />
      <Box sx={{ width: 9, height: 16, bgcolor: '#008C3C', borderRadius: '2px' }} />
      <Box sx={{ width: 9, height: 16, bgcolor: '#0072BC', borderRadius: '2px' }} />
      <Box sx={{ width: 9, height: 16, bgcolor: '#F48020', borderRadius: '2px' }} />
    </Box>
  );
}

function TcsLogo() {
  return (
    <Typography sx={{ fontWeight: 900, fontSize: 15, color: '#C4161C', letterSpacing: '-0.5px' }}>
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

function AmazonLogo() {
  return (
    <Typography sx={{ fontWeight: 900, fontSize: 16, color: '#FF9900' }}>
      a
    </Typography>
  );
}

function AccentureLogo() {
  return (
    <Typography sx={{ fontWeight: 900, fontSize: 16, color: '#A100FF' }}>
      &gt;
    </Typography>
  );
}

function HclLogo() {
  return (
    <Typography sx={{ fontWeight: 900, fontSize: 13, color: '#0155A5', letterSpacing: '0.5px' }}>
      HCL
    </Typography>
  );
}

// Initial Job Data matching screenshot exactly
const INITIAL_JOBS = [
  {
    id: 'JOB-GGL-001',
    featured: true,
    title: 'Software Engineer',
    company: 'Google',
    logo: <GoogleLogo />,
    rating: 4.3,
    reviews: '12.5K reviews',
    location: 'Bengaluru, Karnataka',
    experience: '3 - 5 Years',
    salary: '₹ 12 - 20 LPA',
    workMode: 'On-site',
    tags: ['Python', 'Java', 'System Design', 'Cloud'],
    extraTagsCount: 2,
    postedAgo: 'Posted 2 days ago',
    jobType: 'Full Time',
    salaryRange: '10 - 15 LPA',
    expRange: '3 - 5 Years',
    description: 'Design and develop scalable distributed systems and cloud services. Collaborate with cross-functional global teams.'
  },
  {
    id: 'JOB-MSFT-002',
    featured: false,
    title: 'Frontend Developer',
    company: 'Microsoft',
    logo: <MicrosoftLogo />,
    rating: 4.2,
    reviews: '10.2K reviews',
    location: 'Chennai, Tamil Nadu',
    experience: '2 - 4 Years',
    salary: '₹ 8 - 15 LPA',
    workMode: 'Hybrid',
    tags: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    extraTagsCount: 2,
    postedAgo: 'Posted 3 days ago',
    jobType: 'Full Time',
    salaryRange: '6 - 10 LPA',
    expRange: '1 - 3 Years',
    description: 'Build user-facing web applications using modern React, TypeScript, and Microsoft design language.'
  },
  {
    id: 'JOB-ZOHO-003',
    featured: false,
    title: 'Product Analyst',
    company: 'Zoho',
    logo: <ZohoLogo />,
    rating: 4.1,
    reviews: '8.5K reviews',
    location: 'Remote',
    experience: '1 - 3 Years',
    salary: '₹ 6 - 12 LPA',
    workMode: 'Remote',
    tags: ['Analytics', 'SQL', 'Product Management', 'Data Visualization'],
    extraTagsCount: 2,
    postedAgo: 'Posted 1 day ago',
    jobType: 'Full Time',
    salaryRange: '6 - 10 LPA',
    expRange: '1 - 3 Years',
    description: 'Analyze product telemetry, derive user journey insights, and collaborate with product owners to drive roadmap decisions.'
  },
  {
    id: 'JOB-TCS-004',
    featured: false,
    title: 'HR Executive',
    company: 'TCS',
    logo: <TcsLogo />,
    rating: 4.0,
    reviews: '25K reviews',
    location: 'Hyderabad, Telangana',
    experience: '0 - 2 Years',
    salary: '₹ 3 - 6 LPA',
    workMode: 'On-site',
    tags: ['Recruitment', 'HR Operations', 'Employee Engagement'],
    extraTagsCount: 2,
    postedAgo: 'Posted 4 days ago',
    jobType: 'Full Time',
    salaryRange: '3 - 6 LPA',
    expRange: '0 - 1 Years',
    description: 'Manage end-to-end talent acquisition pipelines, conduct preliminary interviews, and facilitate onboarding operations.'
  },
  {
    id: 'JOB-INFY-005',
    featured: false,
    title: 'Data Analyst',
    company: 'Infosys',
    logo: <InfosysLogo />,
    rating: 4.0,
    reviews: '18K reviews',
    location: 'Bengaluru, Karnataka',
    experience: '1 - 3 Years',
    salary: '₹ 6 - 12 LPA',
    workMode: 'Hybrid',
    tags: ['SQL', 'Power BI', 'Excel', 'Data Analysis'],
    extraTagsCount: 2,
    postedAgo: 'Posted 5 days ago',
    jobType: 'Full Time',
    salaryRange: '6 - 10 LPA',
    expRange: '1 - 3 Years',
    description: 'Transform complex relational datasets into actionable Power BI dashboards and executive summary reports.'
  }
];

export default function CandidateDashboard() {
  const navigate = useNavigate();

  // Search state
  const [searchTitle, setSearchTitle] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchExperience, setSearchExperience] = useState('Any Experience');

  // Filter state
  const [workModes, setWorkModes] = useState({ all: true, onsite: false, remote: false, hybrid: false });
  const [expLevels, setExpLevels] = useState({ any: true, zeroOne: false, oneThree: false, threeFive: false, fiveTen: false, tenPlus: false });
  const [salaryBands, setSalaryBands] = useState({ any: true, zeroThree: false, threeSix: false, sixTen: false, tenFifteen: false, fifteenPlus: false });
  const [jobTypes, setJobTypes] = useState({ fullTime: true, partTime: false });

  // Accordion collapsible toggles for sidebar filters
  const [expandedFilters, setExpandedFilters] = useState({
    workMode: true,
    experience: true,
    salary: true,
    jobType: true
  });

  // Saved / Bookmarked Jobs
  const [savedJobs, setSavedJobs] = useState({});

  // Sort Option
  const [sortBy, setSortBy] = useState('Relevance');
  const [sortAnchor, setSortAnchor] = useState(null);

  // Profile Menu
  const [profileAnchor, setProfileAnchor] = useState(null);

  // Application dialog
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applyingJob, setApplyingJob] = useState(null);

  // Job Alert dialog
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertEmail, setAlertEmail] = useState('candidate@gmail.com');

  // Upload Resume dialog
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState('Candidate_Resume.pdf');

  // TraceU Pro modal
  const [proModalOpen, setProModalOpen] = useState(false);

  // Toast / Snackbar
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Toggle filter sections
  const toggleFilterSection = (key) => {
    setExpandedFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Toggle Bookmark
  const toggleBookmark = (id) => {
    setSavedJobs((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      const isSaved = next[id];
      setSnackbar({
        open: true,
        message: isSaved ? 'Job saved to your bookmarks!' : 'Job removed from bookmarks.',
        severity: isSaved ? 'success' : 'info'
      });
      return next;
    });
  };

  // Clear all filters
  const handleClearAll = () => {
    setSearchTitle('');
    setSearchLocation('');
    setSearchExperience('Any Experience');
    setWorkModes({ all: true, onsite: false, remote: false, hybrid: false });
    setExpLevels({ any: true, zeroOne: false, oneThree: false, threeFive: false, fiveTen: false, tenPlus: false });
    setSalaryBands({ any: true, zeroThree: false, threeSix: false, sixTen: false, tenFifteen: false, fifteenPlus: false });
    setJobTypes({ fullTime: true, partTime: false });
    setSnackbar({ open: true, message: 'All filters reset', severity: 'info' });
  };

  // Handle Apply Now
  const handleOpenApply = (job) => {
    setApplyingJob(job);
    setApplyModalOpen(true);
  };

  const handleConfirmApply = () => {
    setApplyModalOpen(false);
    setSnackbar({
      open: true,
      message: `🎉 Application successfully submitted to ${applyingJob?.company} for ${applyingJob?.title}!`,
      severity: 'success'
    });
  };

  // Filter logic
  const filteredJobs = useMemo(() => {
    return INITIAL_JOBS.filter((job) => {
      // Search matching
      if (searchTitle) {
        const query = searchTitle.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesCompany = job.company.toLowerCase().includes(query);
        const matchesTags = job.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesCompany && !matchesTags) return false;
      }
      if (searchLocation) {
        if (!job.location.toLowerCase().includes(searchLocation.toLowerCase())) return false;
      }

      // Work mode
      if (!workModes.all) {
        const matchesOnsite = workModes.onsite && job.workMode === 'On-site';
        const matchesRemote = workModes.remote && job.workMode === 'Remote';
        const matchesHybrid = workModes.hybrid && job.workMode === 'Hybrid';
        if (!matchesOnsite && !matchesRemote && !matchesHybrid) return false;
      }

      return true;
    });
  }, [searchTitle, searchLocation, workModes]);

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
        {/* Left: Brand Logo & Navigation Links */}
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
            {/* Find Jobs (Active Tab) */}
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
                Find Jobs
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

        {/* Right: Actions (Notifications, Heart, Profile Dropdown) */}
        <Stack direction="row" alignItems="center" spacing={2}>
          {/* Notifications */}
          <IconButton
            size="small"
            onClick={() => setSnackbar({ open: true, message: 'You have 3 new job matches today!', severity: 'info' })}
            sx={{ color: '#4B5563', '&:hover': { color: '#530EF0', bgcolor: '#F3EDFF' } }}
          >
            <Badge badgeContent={3} color="error" sx={{ '& .MuiBadge-badge': { fontSize: 10, height: 16, minWidth: 16 } }}>
              <BellOutlined style={{ fontSize: 19 }} />
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
            <BookOutlined style={{ fontSize: 15 }} />
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

          {/* Profile Dropdown Menu */}
          <Menu
            anchorEl={profileAnchor}
            open={Boolean(profileAnchor)}
            onClose={() => setProfileAnchor(null)}
            PaperProps={{ sx: { borderRadius: '12px', minWidth: 200, boxShadow: '0 8px 24px rgba(0,0,0,0.08)', mt: 1 } }}
          >
            <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #F1F5F9' }}>
              <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: '#111827' }}>Candidate</Typography>
              <Typography sx={{ fontSize: 11.5, color: '#6B7280' }}>candidate@gmail.com</Typography>
            </Box>
            <MenuItem onClick={() => { setProfileAnchor(null); navigate('/candidate'); }} sx={{ fontSize: 13, py: 1 }}>
              <UserOutlined style={{ marginRight: 10, color: '#530EF0' }} /> My Profile
            </MenuItem>
            <MenuItem onClick={() => { setProfileAnchor(null); setAlertModalOpen(true); }} sx={{ fontSize: 13, py: 1 }}>
              <BellOutlined style={{ marginRight: 10, color: '#530EF0' }} /> Job Alerts & Preferences
            </MenuItem>
            <MenuItem onClick={() => { setProfileAnchor(null); setProModalOpen(true); }} sx={{ fontSize: 13, py: 1 }}>
              <CrownOutlined style={{ marginRight: 10, color: '#F59E0B' }} /> Upgrade to TraceU Pro
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={() => { setProfileAnchor(null); navigate('/candidate-login'); }} sx={{ fontSize: 13, py: 1, color: '#EF4444' }}>
              <LogoutOutlined style={{ marginRight: 10 }} /> Sign Out
            </MenuItem>
          </Menu>
        </Stack>
      </Box>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION (BANNER + LARGE SEARCH BAR + TRENDING + CHARACTER)        */}
      {/* ========================================================================= */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #F8F9FE 0%, #EDEBFD 50%, #F5F3FF 100%)',
          pt: { xs: 4, md: 6 },
          pb: { xs: 4, md: 6 },
          px: { xs: 2, sm: 4, md: 6 }
        }}
      >
        <Box sx={{ maxWidth: 1400, mx: 'auto', position: 'relative' }}>
          <Stack direction={{ xs: 'column', lg: 'row' }} alignItems="center" justifyContent="space-between" spacing={4}>
            {/* Left/Center Text & Search */}
            <Box sx={{ flex: 1, maxWidth: { xs: '100%', lg: 820 } }}>
              {/* Main Heading */}
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: 30, sm: 40, md: 46 },
                  color: '#111827',
                  letterSpacing: '-0.025em',
                  lineHeight: 1.15,
                  mb: 1.5
                }}
              >
                Find Jobs That Match{' '}
                <Box
                  component="span"
                  sx={{
                    color: '#530EF0',
                    backgroundImage: 'linear-gradient(90deg, #530EF0 0%, #7C3AED 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline'
                  }}
                >
                  Your Skills
                </Box>
              </Typography>

              {/* Subtitle */}
              <Typography
                sx={{
                  fontSize: { xs: 14, sm: 15.5 },
                  color: '#4B5563',
                  mb: 3.5,
                  lineHeight: 1.5
                }}
              >
                Explore 25,000+ job opportunities from top companies and take the next step in your career.
              </Typography>

              {/* Big White Search Pill Box */}
              <Card
                elevation={0}
                sx={{
                  p: 1,
                  borderRadius: '18px',
                  bgcolor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 8px 30px rgba(83, 14, 240, 0.08)',
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  alignItems: 'center',
                  gap: 1,
                  mb: 2.5
                }}
              >
                {/* Search Input 1: Job Title / Skills / Company */}
                <Box sx={{ flex: 1.5, width: '100%', px: 1.5, py: 0.5 }}>
                  <Stack direction="row" alignItems="center" spacing={1.2}>
                    <SearchOutlined style={{ fontSize: 18, color: '#9CA3AF' }} />
                    <Box sx={{ width: '100%' }}>
                      <Typography sx={{ fontWeight: 700, fontSize: 12, color: '#374151', lineHeight: 1.2 }}>
                        Job title, skills or company
                      </Typography>
                      <TextField
                        variant="standard"
                        placeholder="e.g. Software Engineer, Marketing, TCS"
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                        fullWidth
                        InputProps={{ disableUnderline: true, sx: { fontSize: 13, color: '#111827', pt: 0.2 } }}
                      />
                    </Box>
                  </Stack>
                </Box>

                <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' }, height: 36, my: 'auto' }} />

                {/* Search Input 2: Location */}
                <Box sx={{ flex: 1.2, width: '100%', px: 1.5, py: 0.5 }}>
                  <Stack direction="row" alignItems="center" spacing={1.2}>
                    <EnvironmentOutlined style={{ fontSize: 18, color: '#9CA3AF' }} />
                    <Box sx={{ width: '100%' }}>
                      <Typography sx={{ fontWeight: 700, fontSize: 12, color: '#374151', lineHeight: 1.2 }}>
                        Location
                      </Typography>
                      <TextField
                        variant="standard"
                        placeholder="e.g. Chennai, Bangalore, Remote"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        fullWidth
                        InputProps={{ disableUnderline: true, sx: { fontSize: 13, color: '#111827', pt: 0.2 } }}
                      />
                    </Box>
                  </Stack>
                </Box>

                <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' }, height: 36, my: 'auto' }} />

                {/* Search Input 3: Experience Dropdown */}
                <Box sx={{ flex: 1, width: '100%', px: 1.5, py: 0.5 }}>
                  <Stack direction="row" alignItems="center" spacing={1.2}>
                    <ShopOutlined style={{ fontSize: 18, color: '#9CA3AF' }} />
                    <Box sx={{ width: '100%', cursor: 'pointer' }}>
                      <Typography sx={{ fontWeight: 700, fontSize: 12, color: '#374151', lineHeight: 1.2 }}>
                        Experience
                      </Typography>
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography sx={{ fontSize: 13, color: '#111827', pt: 0.2 }}>
                          {searchExperience}
                        </Typography>
                        <DownOutlined style={{ fontSize: 10, color: '#6B7280' }} />
                      </Stack>
                    </Box>
                  </Stack>
                </Box>

                {/* Search Jobs Button */}
                <Button
                  variant="contained"
                  onClick={() => setSnackbar({ open: true, message: `Found ${filteredJobs.length} matching jobs!`, severity: 'info' })}
                  sx={{
                    bgcolor: '#530EF0',
                    color: '#FFF',
                    fontWeight: 700,
                    fontSize: 14.5,
                    textTransform: 'none',
                    borderRadius: '12px',
                    px: 3.5,
                    py: 1.4,
                    width: { xs: '100%', md: 'auto' },
                    boxShadow: '0 4px 14px rgba(83, 14, 240, 0.35)',
                    whiteSpace: 'nowrap',
                    '&:hover': { bgcolor: '#430bc2' }
                  }}
                >
                  Search Jobs
                </Button>
              </Card>

              {/* Trending Searches Row */}
              <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
                <Typography sx={{ fontWeight: 600, fontSize: 12.5, color: '#6B7280', mr: 0.5 }}>
                  Trending Searches:
                </Typography>
                {[
                  'Software Engineer',
                  'Data Analyst',
                  'Product Manager',
                  'Frontend Developer',
                  'HR Executive',
                  'Digital Marketing',
                  'Remote',
                  'Internship'
                ].map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    size="small"
                    onClick={() => {
                      setSearchTitle(item);
                      setSnackbar({ open: true, message: `Filtering by "${item}"`, severity: 'info' });
                    }}
                    sx={{
                      bgcolor: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '20px',
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#4B5563',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      '&:hover': {
                        borderColor: '#530EF0',
                        color: '#530EF0',
                        bgcolor: '#F3EDFF'
                      }
                    }}
                  />
                ))}
              </Stack>
            </Box>

            {/* Right Banner: Full Scene Illustration + Floating Badges */}
            <Box
              sx={{
                display: { xs: 'none', lg: 'block' },
                position: 'relative',
                width: 440,
                height: 330
              }}
            >
              {/* Full Image Card */}
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
                  src={candidateHeroImg}
                  alt="Find Jobs That Match Your Skills"
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
      </Box>

      {/* ========================================================================= */}
      {/* 3. MAIN 3-COLUMN LAYOUT: FILTERS (LEFT) | JOBS (MID) | PROMOS (RIGHT)     */}
      {/* ========================================================================= */}
      <Box sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 2, sm: 3, md: 5 }, py: 4 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="flex-start">
          {/* ===================================================================== */}
          {/* LEFT COLUMN: FILTERS SIDEBAR (~250px)                                  */}
          {/* ===================================================================== */}
          <Box sx={{ width: { xs: '100%', md: 240, lg: 260 }, flexShrink: 0 }}>
            <Card
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: '16px',
                bgcolor: '#FFFFFF',
                border: '1px solid #F1F5F9',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
              }}
            >
              {/* Filters Header */}
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2, pb: 1.5, borderBottom: '1px solid #F3F4F6' }}>
                <Typography sx={{ fontWeight: 800, fontSize: 16, color: '#111827' }}>
                  Filters
                </Typography>
                <Typography
                  onClick={handleClearAll}
                  sx={{
                    fontSize: 12.5,
                    fontWeight: 700,
                    color: '#530EF0',
                    cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Clear All
                </Typography>
              </Stack>

              {/* 1. Work Mode */}
              <Box sx={{ mb: 2.5 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  onClick={() => toggleFilterSection('workMode')}
                  sx={{ cursor: 'pointer', mb: 1 }}
                >
                  <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: '#1F2937' }}>
                    Work Mode
                  </Typography>
                  {expandedFilters.workMode ? <UpOutlined style={{ fontSize: 11, color: '#9CA3AF' }} /> : <DownOutlined style={{ fontSize: 11, color: '#9CA3AF' }} />}
                </Stack>
                {expandedFilters.workMode && (
                  <FormGroup>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <FormControlLabel
                        control={<Checkbox size="small" checked={workModes.all} onChange={(e) => setWorkModes({ ...workModes, all: e.target.checked })} sx={{ p: 0.5, '&.Mui-checked': { color: '#530EF0' } }} />}
                        label={<Typography sx={{ fontSize: 13, color: '#4B5563' }}>All</Typography>}
                        sx={{ m: 0 }}
                      />
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <FormControlLabel
                        control={<Checkbox size="small" checked={workModes.onsite} onChange={(e) => setWorkModes({ ...workModes, all: false, onsite: e.target.checked })} sx={{ p: 0.5, '&.Mui-checked': { color: '#530EF0' } }} />}
                        label={<Typography sx={{ fontSize: 13, color: '#4B5563' }}>On-site</Typography>}
                        sx={{ m: 0 }}
                      />
                      <Typography sx={{ fontSize: 11.5, color: '#9CA3AF' }}>12,340</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <FormControlLabel
                        control={<Checkbox size="small" checked={workModes.remote} onChange={(e) => setWorkModes({ ...workModes, all: false, remote: e.target.checked })} sx={{ p: 0.5, '&.Mui-checked': { color: '#530EF0' } }} />}
                        label={<Typography sx={{ fontSize: 13, color: '#4B5563' }}>Remote</Typography>}
                        sx={{ m: 0 }}
                      />
                      <Typography sx={{ fontSize: 11.5, color: '#9CA3AF' }}>8,920</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <FormControlLabel
                        control={<Checkbox size="small" checked={workModes.hybrid} onChange={(e) => setWorkModes({ ...workModes, all: false, hybrid: e.target.checked })} sx={{ p: 0.5, '&.Mui-checked': { color: '#530EF0' } }} />}
                        label={<Typography sx={{ fontSize: 13, color: '#4B5563' }}>Hybrid</Typography>}
                        sx={{ m: 0 }}
                      />
                      <Typography sx={{ fontSize: 11.5, color: '#9CA3AF' }}>6,450</Typography>
                    </Stack>
                  </FormGroup>
                )}
              </Box>

              <Divider sx={{ my: 1.5 }} />

              {/* 2. Experience */}
              <Box sx={{ mb: 2.5 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  onClick={() => toggleFilterSection('experience')}
                  sx={{ cursor: 'pointer', mb: 1 }}
                >
                  <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: '#1F2937' }}>
                    Experience
                  </Typography>
                  {expandedFilters.experience ? <UpOutlined style={{ fontSize: 11, color: '#9CA3AF' }} /> : <DownOutlined style={{ fontSize: 11, color: '#9CA3AF' }} />}
                </Stack>
                {expandedFilters.experience && (
                  <FormGroup>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <FormControlLabel
                        control={<Checkbox size="small" checked={expLevels.any} onChange={(e) => setExpLevels({ ...expLevels, any: e.target.checked })} sx={{ p: 0.5, '&.Mui-checked': { color: '#530EF0' } }} />}
                        label={<Typography sx={{ fontSize: 13, color: '#4B5563' }}>Any Experience</Typography>}
                        sx={{ m: 0 }}
                      />
                    </Stack>
                    {[
                      { key: 'zeroOne', label: '0 - 1 Years', count: '4,120' },
                      { key: 'oneThree', label: '1 - 3 Years', count: '8,540' },
                      { key: 'threeFive', label: '3 - 5 Years', count: '6,920' },
                      { key: 'fiveTen', label: '5 - 10 Years', count: '4,230' },
                      { key: 'tenPlus', label: '10+ Years', count: '1,120' }
                    ].map((item) => (
                      <Stack key={item.key} direction="row" justifyContent="space-between" alignItems="center">
                        <FormControlLabel
                          control={<Checkbox size="small" checked={expLevels[item.key]} onChange={(e) => setExpLevels({ ...expLevels, any: false, [item.key]: e.target.checked })} sx={{ p: 0.5, '&.Mui-checked': { color: '#530EF0' } }} />}
                          label={<Typography sx={{ fontSize: 13, color: '#4B5563' }}>{item.label}</Typography>}
                          sx={{ m: 0 }}
                        />
                        <Typography sx={{ fontSize: 11.5, color: '#9CA3AF' }}>{item.count}</Typography>
                      </Stack>
                    ))}
                  </FormGroup>
                )}
              </Box>

              <Divider sx={{ my: 1.5 }} />

              {/* 3. Salary (Annual) */}
              <Box sx={{ mb: 2.5 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  onClick={() => toggleFilterSection('salary')}
                  sx={{ cursor: 'pointer', mb: 1 }}
                >
                  <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: '#1F2937' }}>
                    Salary (Annual)
                  </Typography>
                  {expandedFilters.salary ? <UpOutlined style={{ fontSize: 11, color: '#9CA3AF' }} /> : <DownOutlined style={{ fontSize: 11, color: '#9CA3AF' }} />}
                </Stack>
                {expandedFilters.salary && (
                  <FormGroup>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <FormControlLabel
                        control={<Checkbox size="small" checked={salaryBands.any} onChange={(e) => setSalaryBands({ ...salaryBands, any: e.target.checked })} sx={{ p: 0.5, '&.Mui-checked': { color: '#530EF0' } }} />}
                        label={<Typography sx={{ fontSize: 13, color: '#4B5563' }}>Any Salary</Typography>}
                        sx={{ m: 0 }}
                      />
                      <Typography sx={{ fontSize: 11.5, color: '#9CA3AF' }}>5,340</Typography>
                    </Stack>
                    {[
                      { key: 'zeroThree', label: '0 - 3 LPA', count: '8,920' },
                      { key: 'threeSix', label: '3 - 6 LPA', count: '6,450' },
                      { key: 'sixTen', label: '6 - 10 LPA', count: '3,120' },
                      { key: 'tenFifteen', label: '10 - 15 LPA', count: '1,340' },
                      { key: 'fifteenPlus', label: '15+ LPA', count: '980' }
                    ].map((item) => (
                      <Stack key={item.key} direction="row" justifyContent="space-between" alignItems="center">
                        <FormControlLabel
                          control={<Checkbox size="small" checked={salaryBands[item.key]} onChange={(e) => setSalaryBands({ ...salaryBands, any: false, [item.key]: e.target.checked })} sx={{ p: 0.5, '&.Mui-checked': { color: '#530EF0' } }} />}
                          label={<Typography sx={{ fontSize: 13, color: '#4B5563' }}>{item.label}</Typography>}
                          sx={{ m: 0 }}
                        />
                        <Typography sx={{ fontSize: 11.5, color: '#9CA3AF' }}>{item.count}</Typography>
                      </Stack>
                    ))}
                  </FormGroup>
                )}
              </Box>

              <Divider sx={{ my: 1.5 }} />

              {/* 4. Job Type */}
              <Box>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  onClick={() => toggleFilterSection('jobType')}
                  sx={{ cursor: 'pointer', mb: 1 }}
                >
                  <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: '#1F2937' }}>
                    Job Type
                  </Typography>
                  {expandedFilters.jobType ? <UpOutlined style={{ fontSize: 11, color: '#9CA3AF' }} /> : <DownOutlined style={{ fontSize: 11, color: '#9CA3AF' }} />}
                </Stack>
                {expandedFilters.jobType && (
                  <FormGroup>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <FormControlLabel
                        control={<Checkbox size="small" checked={jobTypes.fullTime} onChange={(e) => setJobTypes({ ...jobTypes, fullTime: e.target.checked })} sx={{ p: 0.5, '&.Mui-checked': { color: '#530EF0' } }} />}
                        label={<Typography sx={{ fontSize: 13, color: '#4B5563' }}>Full Time</Typography>}
                        sx={{ m: 0 }}
                      />
                      <Typography sx={{ fontSize: 11.5, color: '#9CA3AF' }}>20,120</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <FormControlLabel
                        control={<Checkbox size="small" checked={jobTypes.partTime} onChange={(e) => setJobTypes({ ...jobTypes, partTime: e.target.checked })} sx={{ p: 0.5, '&.Mui-checked': { color: '#530EF0' } }} />}
                        label={<Typography sx={{ fontSize: 13, color: '#4B5563' }}>Part Time</Typography>}
                        sx={{ m: 0 }}
                      />
                      <Typography sx={{ fontSize: 11.5, color: '#9CA3AF' }}>2,450</Typography>
                    </Stack>
                  </FormGroup>
                )}
              </Box>
            </Card>
          </Box>

          {/* ===================================================================== */}
          {/* MIDDLE COLUMN: JOB LISTINGS FEED                                      */}
          {/* ===================================================================== */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Header: Jobs count + Sort */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: 800, fontSize: 17, color: '#111827' }}>
                {filteredJobs.length === INITIAL_JOBS.length ? '25,648 Jobs Found' : `${filteredJobs.length} Jobs Found`}
              </Typography>

              {/* Sort Dropdown */}
              <Stack
                direction="row"
                alignItems="center"
                spacing={0.75}
                onClick={(e) => setSortAnchor(e.currentTarget)}
                sx={{
                  cursor: 'pointer',
                  px: 1.5,
                  py: 0.75,
                  borderRadius: '20px',
                  bgcolor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  transition: 'all 0.15s ease',
                  '&:hover': { borderColor: '#530EF0' }
                }}
              >
                <Typography sx={{ fontSize: 12.5, color: '#6B7280' }}>Sort by:</Typography>
                <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: '#111827' }}>{sortBy}</Typography>
                <DownOutlined style={{ fontSize: 9, color: '#6B7280' }} />
              </Stack>

              <Menu anchorEl={sortAnchor} open={Boolean(sortAnchor)} onClose={() => setSortAnchor(null)}>
                {['Relevance', 'Newest First', 'Highest Salary', 'Experience (Low to High)'].map((s) => (
                  <MenuItem key={s} onClick={() => { setSortBy(s); setSortAnchor(null); }} sx={{ fontSize: 13 }}>
                    {s}
                  </MenuItem>
                ))}
              </Menu>
            </Stack>

            {/* Job Cards List */}
            <Stack spacing={2.2}>
              {filteredJobs.map((job) => {
                const isBookmarked = Boolean(savedJobs[job.id]);
                return (
                  <Card
                    key={job.id}
                    elevation={0}
                    sx={{
                      p: { xs: 2, sm: 2.5 },
                      borderRadius: '16px',
                      bgcolor: '#FFFFFF',
                      border: '1px solid #F1F5F9',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 24px rgba(83, 14, 240, 0.08)',
                        borderColor: '#E9D5FF'
                      }
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                      {/* Company Logo in rounded box */}
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '12px',
                          bgcolor: '#FAFAFB',
                          border: '1px solid #F1F5F9',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        {job.logo}
                      </Box>

                      {/* Main Job Details */}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        {/* Top Meta row (Featured badge, Title, Posted ago, Bookmark) */}
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 0.5 }}>
                          <Box>
                            {job.featured && (
                              <Chip
                                label="Featured"
                                size="small"
                                sx={{
                                  bgcolor: 'rgba(83, 14, 240, 0.08)',
                                  color: '#530EF0',
                                  fontWeight: 700,
                                  fontSize: 10.5,
                                  height: 20,
                                  borderRadius: '6px',
                                  mb: 0.5
                                }}
                              />
                            )}
                            <Typography sx={{ fontWeight: 800, fontSize: { xs: 15, sm: 16.5 }, color: '#111827', lineHeight: 1.3 }}>
                              {job.title}
                            </Typography>
                          </Box>

                          {/* Right side: Posted ago + Bookmark */}
                          <Stack direction="row" alignItems="center" spacing={1.5}>
                            <Typography sx={{ color: '#059669', fontSize: 11.5, fontWeight: 600 }}>
                              {job.postedAgo}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => toggleBookmark(job.id)}
                              sx={{ color: isBookmarked ? '#530EF0' : '#9CA3AF', '&:hover': { color: '#530EF0' } }}
                            >
                              <BookmarkOutlined style={{ fontSize: 16 }} />
                            </IconButton>
                          </Stack>
                        </Stack>

                        {/* Company & Rating */}
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.25 }}>
                          <Typography sx={{ fontWeight: 600, fontSize: 13, color: '#374151' }}>
                            {job.company}
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing={0.4}>
                            <StarFilled style={{ fontSize: 11, color: '#F59E0B' }} />
                            <Typography sx={{ fontWeight: 700, fontSize: 12, color: '#111827' }}>
                              {job.rating}
                            </Typography>
                          </Stack>
                          <Typography sx={{ fontSize: 11.5, color: '#9CA3AF' }}>
                            ({job.reviews})
                          </Typography>
                        </Stack>

                        {/* Metadata row (Location, Experience, Salary, Mode) */}
                        <Stack direction="row" alignItems="center" spacing={{ xs: 1.5, sm: 2.5 }} flexWrap="wrap" useFlexGap sx={{ mb: 1.8 }}>
                          <Stack direction="row" alignItems="center" spacing={0.6}>
                            <EnvironmentOutlined style={{ fontSize: 13, color: '#6B7280' }} />
                            <Typography sx={{ fontSize: 12.5, color: '#4B5563' }}>{job.location}</Typography>
                          </Stack>
                          <Stack direction="row" alignItems="center" spacing={0.6}>
                            <ShopOutlined style={{ fontSize: 13, color: '#6B7280' }} />
                            <Typography sx={{ fontSize: 12.5, color: '#4B5563' }}>{job.experience}</Typography>
                          </Stack>
                          <Stack direction="row" alignItems="center" spacing={0.6}>
                            <DollarOutlined style={{ fontSize: 13, color: '#6B7280' }} />
                            <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: '#111827' }}>{job.salary}</Typography>
                          </Stack>
                          <Stack direction="row" alignItems="center" spacing={0.6}>
                            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#530EF0' }} />
                            <Typography sx={{ fontSize: 12.5, color: '#4B5563' }}>{job.workMode}</Typography>
                          </Stack>
                        </Stack>

                        {/* Bottom Row: Tags + Apply Now Button */}
                        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={1.5}>
                          {/* Tags */}
                          <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
                            {job.tags.map((tag) => (
                              <Chip
                                key={tag}
                                label={tag}
                                size="small"
                                sx={{
                                  bgcolor: '#F3F4F6',
                                  color: '#4B5563',
                                  fontWeight: 500,
                                  fontSize: 11.5,
                                  height: 24,
                                  borderRadius: '6px'
                                }}
                              />
                            ))}
                            {job.extraTagsCount > 0 && (
                              <Chip
                                label={`+${job.extraTagsCount} more`}
                                size="small"
                                sx={{
                                  bgcolor: '#F9FAFB',
                                  color: '#6B7280',
                                  fontSize: 11.5,
                                  height: 24,
                                  borderRadius: '6px'
                                }}
                              />
                            )}
                          </Stack>

                          {/* Apply Now Button */}
                          <Button
                            variant="outlined"
                            onClick={() => handleOpenApply(job)}
                            sx={{
                              borderColor: '#530EF0',
                              color: '#530EF0', fontWeight: 600, fontSize: 12,
                              textTransform: 'none',
                              borderRadius: '8px',
                              px: 2.8,
                              py: 0.6,
                              whiteSpace: 'nowrap',
                              alignSelf: { xs: 'flex-end', sm: 'auto' },
                              transition: 'all 0.15s ease',
                              '&:hover': {
                                bgcolor: '#530EF0',
                                color: '#FFFFFF',
                                borderColor: '#530EF0'
                              }
                            }}
                          >
                            Apply Now
                          </Button>
                        </Stack>
                      </Box>
                    </Stack>
                  </Card>
                );
              })}
            </Stack>
          </Box>

          {/* ===================================================================== */}
          {/* RIGHT COLUMN: PROMO / ACTION CARDS (~290px)                           */}
          {/* ===================================================================== */}
          <Box sx={{ width: { xs: '100%', md: 280, lg: 300 }, flexShrink: 0 }}>
            <Stack spacing={2.5}>
              {/* Card 1: Get Job Alerts */}
              <Card
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: '16px',
                  bgcolor: '#FFFFFF',
                  border: '1px solid #F1F5F9',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: '#FFFBEB',
                      color: '#F59E0B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 18,
                      flexShrink: 0
                    }}
                  >
                    🔔
                  </Box>
                  <Typography sx={{ fontWeight: 800, fontSize: 14.5, color: '#111827' }}>
                    Get Job Alerts
                  </Typography>
                </Stack>
                <Typography sx={{ fontSize: 12, color: '#6B7280', mb: 2, lineHeight: 1.45 }}>
                  Be the first to know about new job openings that match your profile.
                </Typography>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => setAlertModalOpen(true)}
                  sx={{
                    borderColor: '#530EF0',
                    color: '#530EF0',
                    fontWeight: 700,
                    fontSize: 12.5,
                    textTransform: 'none',
                    borderRadius: '8px',
                    py: 0.8,
                    '&:hover': { bgcolor: '#F3EDFF', borderColor: '#530EF0' }
                  }}
                >
                  Create Job Alert
                </Button>
              </Card>

              {/* Card 2: Upload Resume */}
              <Card
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: '16px',
                  bgcolor: '#FFFFFF',
                  border: '1px solid #F1F5F9',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: '#F3EDFF',
                      color: '#530EF0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 18,
                      flexShrink: 0
                    }}
                  >
                    📄
                  </Box>
                  <Typography sx={{ fontWeight: 800, fontSize: 14.5, color: '#111827' }}>
                    Upload Resume
                  </Typography>
                </Stack>
                <Typography sx={{ fontSize: 12, color: '#6B7280', mb: 2, lineHeight: 1.45 }}>
                  Increase your chances of getting hired with a complete profile.
                </Typography>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => setUploadModalOpen(true)}
                  sx={{
                    borderColor: '#530EF0',
                    color: '#530EF0',
                    fontWeight: 700,
                    fontSize: 12.5,
                    textTransform: 'none',
                    borderRadius: '8px',
                    py: 0.8,
                    '&:hover': { bgcolor: '#F3EDFF', borderColor: '#530EF0' }
                  }}
                >
                  Upload Resume
                </Button>
              </Card>

              {/* Card 3: TraceU Pro */}
              <Card
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: '16px',
                  bgcolor: '#FFFFFF',
                  border: '1px solid #F1F5F9',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: '#FFFBEB',
                        color: '#F59E0B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 18,
                        flexShrink: 0
                      }}
                    >
                      👑
                    </Box>
                    <Typography sx={{ fontWeight: 800, fontSize: 14.5, color: '#111827' }}>
                      TraceU Pro
                    </Typography>
                  </Stack>
                  <Chip
                    label="Popular"
                    size="small"
                    sx={{
                      bgcolor: '#F3EDFF',
                      color: '#530EF0',
                      fontWeight: 700,
                      fontSize: 10.5,
                      height: 20,
                      borderRadius: '6px'
                    }}
                  />
                </Stack>

                <Typography sx={{ fontSize: 12, color: '#6B7280', mb: 2, lineHeight: 1.45 }}>
                  Get noticed by top recruiters and access exclusive job opportunities.
                </Typography>

                {/* Feature Bullet Points */}
                <Stack spacing={1.2} sx={{ mb: 2.5 }}>
                  {[
                    'Profile Highlight',
                    'Access to Premium Jobs',
                    'Direct Application to Recruiters',
                    'AI Job Recommendations'
                  ].map((feat) => (
                    <Stack key={feat} direction="row" spacing={1} alignItems="center">
                      <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: '#530EF0', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>
                        ✓
                      </Box>
                      <Typography sx={{ fontSize: 12, color: '#374151', fontWeight: 500 }}>
                        {feat}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>

                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => setProModalOpen(true)}
                  sx={{
                    borderColor: '#530EF0',
                    color: '#530EF0',
                    fontWeight: 700,
                    fontSize: 12.5,
                    textTransform: 'none',
                    borderRadius: '8px',
                    py: 0.8,
                    '&:hover': { bgcolor: '#F3EDFF', borderColor: '#530EF0' }
                  }}
                >
                  Upgrade to Premium
                </Button>
              </Card>

              {/* Card 4: Top Companies Hiring */}
              <Card
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: '16px',
                  bgcolor: '#FFFFFF',
                  border: '1px solid #F1F5F9',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                  <Typography sx={{ fontWeight: 800, fontSize: 14.5, color: '#111827' }}>
                    Top Companies Hiring
                  </Typography>
                  <Typography
                    onClick={() => navigate('/candidate/companies')}
                    sx={{ fontSize: 12, fontWeight: 700, color: '#530EF0', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                  >
                    View All →
                  </Typography>
                </Stack>

                {/* 4x2 Grid of Companies */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 1.5
                  }}
                >
                  {[
                    { name: 'Google', jobs: '1,200+ jobs', logo: <GoogleLogo /> },
                    { name: 'Microsoft', jobs: '980+ jobs', logo: <MicrosoftLogo /> },
                    { name: 'Amazon', jobs: '850+ jobs', logo: <AmazonLogo /> },
                    { name: 'TCS', jobs: '730+ jobs', logo: <TcsLogo /> },
                    { name: 'Infosys', jobs: '640+ jobs', logo: <InfosysLogo /> },
                    { name: 'Zoho', jobs: '520+ jobs', logo: <ZohoLogo /> },
                    { name: 'Accenture', jobs: '480+ jobs', logo: <AccentureLogo /> },
                    { name: 'HCL', jobs: '420+ jobs', logo: <HclLogo /> }
                  ].map((comp) => (
                    <Box
                      key={comp.name}
                      onClick={() => {
                        setSearchTitle(comp.name);
                        setSnackbar({ open: true, message: `Showing jobs at ${comp.name}`, severity: 'info' });
                      }}
                      sx={{
                        p: 1.25,
                        borderRadius: '10px',
                        border: '1px solid #F1F5F9',
                        bgcolor: '#FAFAFB',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        '&:hover': {
                          borderColor: '#530EF0',
                          bgcolor: '#FFFFFF',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      <Box sx={{ height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 0.5 }}>
                        {comp.logo}
                      </Box>
                      <Typography sx={{ fontWeight: 700, fontSize: 12, color: '#111827' }}>
                        {comp.name}
                      </Typography>
                      <Typography sx={{ fontSize: 10.5, color: '#9CA3AF' }}>
                        {comp.jobs}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Card>
            </Stack>
          </Box>
        </Stack>
      </Box>

      {/* ========================================================================= */}
      {/* 4. DIALOGS & MODALS                                                       */}
      {/* ========================================================================= */}

      {/* 1. Job Application Modal (8 Comprehensive Steps) */}
      <CandidateJobApplicationDialog
        open={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        job={applyingJob}
        onApplySuccess={(newAppId, appliedJob) => {
          setSnackbar({
            open: true,
            message: `🎉 Application ${newAppId} successfully submitted to ${appliedJob?.company || 'Company'} for ${appliedJob?.title || 'the role'}!`,
            severity: 'success'
          });
        }}
      />

      {/* 2. Job Alert Dialog */}
      <Dialog open={alertModalOpen} onClose={() => setAlertModalOpen(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}>
        <DialogTitle sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>
          🔔 Create Job Alert
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Typography sx={{ fontSize: 12.5, color: '#6B7280' }}>
              We will send daily or weekly job digests tailored directly to your preferences.
            </Typography>
            <TextField label="Alert Keyword" defaultValue="Software Engineer, React" fullWidth size="small" />
            <TextField label="Email Address" value={alertEmail} onChange={(e) => setAlertEmail(e.target.value)} fullWidth size="small" />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setAlertModalOpen(false)} sx={{ textTransform: 'none' }}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              setAlertModalOpen(false);
              setSnackbar({ open: true, message: 'Job alert created! You will receive new matches via email.', severity: 'success' });
            }}
            sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 700, borderRadius: '8px' }}
          >
            Save Alert
          </Button>
        </DialogActions>
      </Dialog>

      {/* 3. Upload Resume Dialog */}
      <Dialog open={uploadModalOpen} onClose={() => setUploadModalOpen(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}>
        <DialogTitle sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>
          📄 Upload Candidate Resume
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Box
            sx={{
              border: '2px dashed #C084FC',
              bgcolor: '#FAF8FF',
              borderRadius: '12px',
              p: 3,
              textAlign: 'center',
              cursor: 'pointer'
            }}
          >
            <Box sx={{ fontSize: 32, mb: 1 }}>📤</Box>
            <Typography sx={{ fontWeight: 700, fontSize: 14, color: '#111827' }}>
              Drop your resume here or Browse
            </Typography>
            <Typography sx={{ fontSize: 11.5, color: '#9CA3AF', mt: 0.5 }}>
              Supports PDF, DOCX (Max 10 MB)
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setUploadModalOpen(false)} sx={{ textTransform: 'none' }}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              setUploadModalOpen(false);
              setSnackbar({ open: true, message: 'Resume uploaded and parsed successfully!', severity: 'success' });
            }}
            sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 700, borderRadius: '8px' }}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>

      {/* 4. TraceU Pro Dialog */}
      <Dialog open={proModalOpen} onClose={() => setProModalOpen(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}>
        <DialogTitle sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>
          👑 Upgrade to TraceU Pro
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Stack spacing={1.5}>
            <Typography sx={{ fontSize: 13, color: '#4B5563', mb: 1 }}>
              Get 3x more recruiter profile views and direct interview invitations.
            </Typography>
            <Box sx={{ p: 2, borderRadius: '12px', bgcolor: '#F3EDFF', textAlign: 'center' }}>
              <Typography sx={{ fontWeight: 900, fontSize: 26, color: '#530EF0' }}>
                ₹499 <span style={{ fontSize: 13, fontWeight: 500, color: '#6B7280' }}>/ month</span>
              </Typography>
              <Typography sx={{ fontSize: 11.5, color: '#7C3AED', mt: 0.25 }}>7 days risk-free trial</Typography>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setProModalOpen(false)} sx={{ textTransform: 'none' }}>Close</Button>
          <Button
            variant="contained"
            onClick={() => {
              setProModalOpen(false);
              setSnackbar({ open: true, message: 'Welcome to TraceU Pro!', severity: 'success' });
            }}
            sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 700, borderRadius: '8px' }}
          >
            Start Free Trial
          </Button>
        </DialogActions>
      </Dialog>

      {/* Feedback Toast */}
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
