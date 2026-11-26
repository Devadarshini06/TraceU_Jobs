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
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Collapse from '@mui/material/Collapse';
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
import StarFilled from '@ant-design/icons/StarFilled';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import CrownOutlined from '@ant-design/icons/CrownOutlined';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import DollarOutlined from '@ant-design/icons/DollarOutlined';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import RobotOutlined from '@ant-design/icons/RobotOutlined';
import SparklesOutlined from '@ant-design/icons/FireOutlined';
import BookOutlined from '@ant-design/icons/BookOutlined';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import AimOutlined from '@ant-design/icons/AimOutlined';

// assets
import avatarCandidate from 'assets/images/users/avatar-1.png';
import candidateHeroCharacter from 'assets/images/auth/candidate-internships-v5.jpg';

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

function WiproLogo() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#FF5722' }} />
      <Typography sx={{ fontWeight: 800, fontSize: 12, color: '#1B365D' }}>
        wipro
      </Typography>
    </Box>
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

// 5 Main Internships matching screenshot
const INITIAL_INTERNSHIPS = [
  {
    id: 'intern-1',
    title: 'Software Engineering Intern',
    company: 'Google',
    logo: <GoogleLogo />,
    featured: true,
    rating: 4.4,
    reviews: '12.8K reviews',
    location: 'Bengaluru, Karnataka',
    duration: '3 - 6 Months',
    stipend: '₹ 50,000 / month',
    stipendVal: 50000,
    workMode: 'Hybrid',
    posted: 'Posted 2 days ago',
    category: 'IT & Software',
    tags: ['Python', 'Data Structures', 'System Design', '+2 more']
  },
  {
    id: 'intern-2',
    title: 'Product Management Intern',
    company: 'Microsoft',
    logo: <MicrosoftLogo />,
    featured: false,
    rating: 4.3,
    reviews: '10.2K reviews',
    location: 'Hyderabad, Telangana',
    duration: '3 - 6 Months',
    stipend: '₹ 40,000 / month',
    stipendVal: 40000,
    workMode: 'On-site',
    posted: 'Posted 3 days ago',
    category: 'IT & Software',
    tags: ['Product Strategy', 'Analytics', 'Market Research', '+2 more']
  },
  {
    id: 'intern-3',
    title: 'UI/UX Design Intern',
    company: 'Zoho',
    logo: <ZohoLogo />,
    featured: false,
    rating: 4.1,
    reviews: '8.5K reviews',
    location: 'Chennai, Tamil Nadu',
    duration: '2 - 3 Months',
    stipend: '₹ 15,000 / month',
    stipendVal: 15000,
    workMode: 'Hybrid',
    posted: 'Posted 1 day ago',
    category: 'Design',
    tags: ['Figma', 'UI Design', 'UX Research', '+2 more']
  },
  {
    id: 'intern-4',
    title: 'Marketing Intern',
    company: 'Amazon',
    logo: <AmazonLogo />,
    featured: false,
    rating: 4.2,
    reviews: '15.6K reviews',
    location: 'Bengaluru, Karnataka',
    duration: '3 - 6 Months',
    stipend: '₹ 35,000 / month',
    stipendVal: 35000,
    workMode: 'On-site',
    posted: 'Posted 4 days ago',
    category: 'Marketing',
    tags: ['Digital Marketing', 'Content Creation', 'Analytics', '+2 more']
  },
  {
    id: 'intern-5',
    title: 'Data Science Intern',
    company: 'TCS',
    logo: <TcsLogo />,
    featured: false,
    rating: 4.1,
    reviews: '18.4K reviews',
    location: 'Pune, Maharashtra',
    duration: '6 Months',
    stipend: '₹ 30,000 / month',
    stipendVal: 30000,
    workMode: 'Hybrid',
    posted: 'Posted 5 days ago',
    category: 'IT & Software',
    tags: ['Python', 'Machine Learning', 'Data Analysis', '+2 more']
  }
];

// Popular Locations matching screenshot
const POPULAR_LOCATIONS = [
  {
    city: 'Bengaluru',
    count: '1,480+ internships',
    img: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=300&auto=format&fit=crop&q=60'
  },
  {
    city: 'Hyderabad',
    count: '920+ internships',
    img: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=300&auto=format&fit=crop&q=60'
  },
  {
    city: 'Chennai',
    count: '860+ internships',
    img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=300&auto=format&fit=crop&q=60'
  },
  {
    city: 'Pune',
    count: '720+ internships',
    img: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=300&auto=format&fit=crop&q=60'
  },
  {
    city: 'Mumbai',
    count: '680+ internships',
    img: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=300&auto=format&fit=crop&q=60'
  },
  {
    city: 'Remote',
    count: '2,120+ internships',
    img: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=300&auto=format&fit=crop&q=60'
  }
];

export default function CandidateInternships() {
  const navigate = useNavigate();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [internshipTypeFilter, setInternshipTypeFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Relevance');

  // Filter sections collapse toggles
  const [openSections, setOpenSections] = useState({
    type: true,
    duration: true,
    stipend: true,
    location: true,
    category: true
  });

  // Checkbox Filters
  const [selectedWorkModes, setSelectedWorkModes] = useState({ All: true });
  const [selectedDurations, setSelectedDurations] = useState({});
  const [selectedStipends, setSelectedStipends] = useState({ Any: true });
  const [locationSearchFilter, setLocationSearchFilter] = useState('');
  const [selectedLocations, setSelectedLocations] = useState({});
  const [selectedCategories, setSelectedCategories] = useState({});

  // Bookmarks / Saved
  const [savedInternships, setSavedInternships] = useState({});

  // Dialogs & Menus
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applyData, setApplyData] = useState({ name: 'Candidate', email: 'candidate@gmail.com', phone: '+91 98765 43210' });
  const [applyErrors, setApplyErrors] = useState({});
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Toggle bookmark
  const toggleSave = (id, title) => {
    setSavedInternships((prev) => {
      const isSaved = !prev[id];
      setSnackbar({
        open: true,
        message: isSaved ? `Saved "${title}" to your bookmarks!` : `Removed "${title}" from bookmarks`,
        severity: isSaved ? 'success' : 'info'
      });
      return { ...prev, [id]: isSaved };
    });
  };

  // Open apply dialog
  const handleOpenApply = (internship) => {
    setSelectedInternship(internship);
    setApplyModalOpen(true);
  };

  // Clear all filters
  const handleClearAll = () => {
    setSearchQuery('');
    setLocationQuery('');
    setInternshipTypeFilter('All');
    setSelectedWorkModes({ All: true });
    setSelectedDurations({});
    setSelectedStipends({ Any: true });
    setSelectedLocations({});
    setSelectedCategories({});
    setLocationSearchFilter('');
    setSnackbar({ open: true, message: 'All filters reset', severity: 'info' });
  };

  // Filtered internships
  const filteredInternships = useMemo(() => {
    return INITIAL_INTERNSHIPS.filter((item) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesCompany = item.company.toLowerCase().includes(q);
        const matchesTags = item.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCompany && !matchesTags) return false;
      }
      if (locationQuery) {
        const loc = locationQuery.toLowerCase();
        if (!item.location.toLowerCase().includes(loc)) return false;
      }
      if (internshipTypeFilter !== 'All' && item.workMode !== internshipTypeFilter) {
        return false;
      }
      return true;
    });
  }, [searchQuery, locationQuery, internshipTypeFilter]);

  // AI analyze action
  const handleRunAiMatch = () => {
    setAiAnalyzing(true);
    setTimeout(() => {
      setAiAnalyzing(false);
      setSnackbar({ open: true, message: 'AI Job Match complete! 5 top internships matched 94%+ with your profile.', severity: 'success' });
    }, 1200);
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

            {/* Internships (Active Tab) */}
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
                Internships
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

        {/* Right: Actions (Saved, Notifications, Profile) */}
        <Stack direction="row" alignItems="center" spacing={2}>
          {/* Notifications */}
          <IconButton
            size="small"
            onClick={() => setSnackbar({ open: true, message: 'You have 4 new internship opportunities this week!', severity: 'info' })}
            sx={{ color: '#4B5563', '&:hover': { color: '#530EF0', bgcolor: '#F3EDFF' } }}
          >
            <Badge badgeContent={4} color="error" sx={{ '& .MuiBadge-badge': { fontSize: 10, height: 16, minWidth: 16 } }}>
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

          {/* Profile Dropdown */}
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
      {/* 2. HERO SECTION WITH SEARCH BAR & BADGES                                  */}
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
          {/* Left Text & Search */}
          <Box sx={{ flex: 1, maxWidth: { xs: '100%', lg: 760 } }}>
            {/* Eyebrow Label */}
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
              KICKSTART YOUR CAREER
            </Typography>

            {/* Headline */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: 30, sm: 38, md: 44 },
                fontWeight: 800,
                lineHeight: 1.15,
                color: '#111827',
                letterSpacing: '-0.8px',
                mb: 1.5
              }}
            >
              Find the Right Internship <br />
              for <Box component="span" sx={{ color: '#530EF0' }}>Your Future</Box>
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: 14, sm: 15 },
                color: '#6B7280',
                mb: 3.5,
                lineHeight: 1.5,
                maxWidth: 620
              }}
            >
              Explore internships from top companies, gain real-world experience and build skills for a brighter career.
            </Typography>

            {/* Search Bar Container Pill */}
            <Card
              elevation={0}
              sx={{
                p: { xs: 1.5, md: 1 },
                pl: { md: 2 },
                borderRadius: { xs: '16px', md: '50px' },
                border: '1px solid #E5E7EB',
                boxShadow: '0 8px 30px rgba(83, 14, 240, 0.06)',
                bgcolor: '#FFFFFF',
                mb: 2.5
              }}
            >
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                alignItems="center"
                spacing={{ xs: 1.5, md: 1.5 }}
              >
                {/* 1. Job Title, Skills or Company */}
                <Stack direction="row" alignItems="center" spacing={1.25} sx={{ flex: 1.2, width: '100%', px: 1 }}>
                  <SearchOutlined style={{ fontSize: 18, color: '#9CA3AF' }} />
                  <Box sx={{ width: '100%' }}>
                    <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Internship Title or Skills
                    </Typography>
                    <TextField
                      variant="standard"
                      placeholder="e.g. Marketing, Web Development, Data Science"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      InputProps={{ disableUnderline: true }}
                      fullWidth
                      sx={{ '& input': { fontSize: 13.5, fontWeight: 500, p: 0, color: '#111827' } }}
                    />
                  </Box>
                </Stack>

                <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' }, height: 36, alignSelf: 'center' }} />

                {/* 2. Location */}
                <Stack direction="row" alignItems="center" spacing={1.25} sx={{ flex: 1, width: '100%', px: 1 }}>
                  <EnvironmentOutlined style={{ fontSize: 18, color: '#9CA3AF' }} />
                  <Box sx={{ width: '100%' }}>
                    <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Location
                    </Typography>
                    <TextField
                      variant="standard"
                      placeholder="e.g. Bengaluru, Chennai, Remote"
                      value={locationQuery}
                      onChange={(e) => setLocationQuery(e.target.value)}
                      InputProps={{ disableUnderline: true }}
                      fullWidth
                      sx={{ '& input': { fontSize: 13.5, fontWeight: 500, p: 0, color: '#111827' } }}
                    />
                  </Box>
                </Stack>

                <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' }, height: 36, alignSelf: 'center' }} />

                {/* 3. Internship Type */}
                <Stack direction="row" alignItems="center" spacing={1.25} sx={{ flex: 0.9, width: '100%', px: 1 }}>
                  <ShopOutlined style={{ fontSize: 18, color: '#9CA3AF' }} />
                  <Box sx={{ width: '100%' }}>
                    <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Internship Type
                    </Typography>
                    <Select
                      variant="standard"
                      disableUnderline
                      value={internshipTypeFilter}
                      onChange={(e) => setInternshipTypeFilter(e.target.value)}
                      sx={{
                        fontSize: 13.5,
                        fontWeight: 600,
                        color: '#111827',
                        '& .MuiSelect-select': { p: 0, pr: '20px !important' }
                      }}
                    >
                      <MenuItem value="All">All Types</MenuItem>
                      <MenuItem value="Work From Home">Work From Home</MenuItem>
                      <MenuItem value="On-site">On-site</MenuItem>
                      <MenuItem value="Hybrid">Hybrid</MenuItem>
                    </Select>
                  </Box>
                </Stack>

                {/* Search Button */}
                <Button
                  variant="contained"
                  onClick={() => {
                    setSnackbar({ open: true, message: `Searching internships for "${searchQuery || 'All'}"...`, severity: 'info' });
                  }}
                  sx={{
                    bgcolor: '#530EF0',
                    color: '#FFF',
                    fontWeight: 700,
                    fontSize: 14,
                    px: 3.5,
                    py: 1.4,
                    borderRadius: '30px',
                    textTransform: 'none',
                    boxShadow: '0 4px 14px rgba(83, 14, 240, 0.35)',
                    whiteSpace: 'nowrap',
                    width: { xs: '100%', md: 'auto' },
                    '&:hover': { bgcolor: '#420bc2' }
                  }}
                >
                  Search Internships
                </Button>
              </Stack>
            </Card>

            {/* Trending Searches */}
            <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
              <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: '#6B7280' }}>
                Trending Searches:
              </Typography>
              {[
                'Software Development',
                'Data Science',
                'Marketing',
                'UI/UX Design',
                'Human Resources',
                'Finance',
                'Remote Internships',
                'Summer Internships'
              ].map((term) => (
                <Chip
                  key={term}
                  label={term}
                  size="small"
                  onClick={() => setSearchQuery(term)}
                  sx={{
                    bgcolor: '#F3F4F6',
                    color: '#4B5563',
                    fontSize: 12,
                    fontWeight: 500,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: '#F3EDFF', color: '#530EF0' }
                  }}
                />
              ))}
            </Stack>
          </Box>

          {/* Right Hero Graphic with Real Internships Scene */}
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
                alt="Internships Overview"
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
          {/* LEFT COLUMN: FILTERS SIDEBAR (260px)                                  */}
          {/* ===================================================================== */}
          <Box sx={{ width: { xs: '100%', md: 260 }, flexShrink: 0 }}>
            <Card
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: '16px',
                border: '1px solid #F1F5F9',
                bgcolor: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
              }}
            >
              {/* Header */}
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
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

              <Divider sx={{ mb: 2 }} />

              {/* 1. Internship Type */}
              <Box sx={{ mb: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  onClick={() => setOpenSections((p) => ({ ...p, type: !p.type }))}
                  sx={{ cursor: 'pointer', py: 0.5 }}
                >
                  <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: '#111827' }}>
                    Internship Type
                  </Typography>
                  {openSections.type ? <UpOutlined style={{ fontSize: 11, color: '#9CA3AF' }} /> : <DownOutlined style={{ fontSize: 11, color: '#9CA3AF' }} />}
                </Stack>
                <Collapse in={openSections.type}>
                  <FormGroup sx={{ mt: 1 }}>
                    {[
                      { key: 'All', label: 'All', count: '2,340' },
                      { key: 'Work From Home', label: 'Work From Home', count: '1,820' },
                      { key: 'On-site', label: 'On-site', count: '1,120' },
                      { key: 'Hybrid', label: 'Hybrid', count: '1,120' }
                    ].map((item) => (
                      <FormControlLabel
                        key={item.key}
                        control={
                          <Checkbox
                            size="small"
                            checked={Boolean(selectedWorkModes[item.key])}
                            onChange={(e) => {
                              setSelectedWorkModes({ ...selectedWorkModes, [item.key]: e.target.checked });
                              if (item.key !== 'All') setInternshipTypeFilter(item.key);
                              else setInternshipTypeFilter('All');
                            }}
                            sx={{ color: '#D1D5DB', '&.Mui-checked': { color: '#530EF0' } }}
                          />
                        }
                        label={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                            <Typography sx={{ fontSize: 13, color: '#374151' }}>{item.label}</Typography>
                            <Typography sx={{ fontSize: 12, color: '#9CA3AF', ml: 1 }}>{item.count}</Typography>
                          </Box>
                        }
                        sx={{ ml: 0, mr: 0, width: '100%', justifyContent: 'space-between' }}
                      />
                    ))}
                  </FormGroup>
                </Collapse>
              </Box>

              <Divider sx={{ my: 1.5 }} />

              {/* 2. Duration */}
              <Box sx={{ mb: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  onClick={() => setOpenSections((p) => ({ ...p, duration: !p.duration }))}
                  sx={{ cursor: 'pointer', py: 0.5 }}
                >
                  <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: '#111827' }}>
                    Duration
                  </Typography>
                  {openSections.duration ? <UpOutlined style={{ fontSize: 11, color: '#9CA3AF' }} /> : <DownOutlined style={{ fontSize: 11, color: '#9CA3AF' }} />}
                </Stack>
                <Collapse in={openSections.duration}>
                  <FormGroup sx={{ mt: 1 }}>
                    {[
                      { key: '1m', label: '1 Month', count: '820' },
                      { key: '2-3m', label: '2 - 3 Months', count: '1,640' },
                      { key: '3-6m', label: '3 - 6 Months', count: '2,120' },
                      { key: '6m+', label: '6+ Months', count: '540' }
                    ].map((item) => (
                      <FormControlLabel
                        key={item.key}
                        control={
                          <Checkbox
                            size="small"
                            checked={Boolean(selectedDurations[item.key])}
                            onChange={(e) => setSelectedDurations({ ...selectedDurations, [item.key]: e.target.checked })}
                            sx={{ color: '#D1D5DB', '&.Mui-checked': { color: '#530EF0' } }}
                          />
                        }
                        label={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                            <Typography sx={{ fontSize: 13, color: '#374151' }}>{item.label}</Typography>
                            <Typography sx={{ fontSize: 12, color: '#9CA3AF', ml: 1 }}>{item.count}</Typography>
                          </Box>
                        }
                        sx={{ ml: 0, mr: 0, width: '100%', justifyContent: 'space-between' }}
                      />
                    ))}
                  </FormGroup>
                </Collapse>
              </Box>

              <Divider sx={{ my: 1.5 }} />

              {/* 3. Stipend (Monthly) */}
              <Box sx={{ mb: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  onClick={() => setOpenSections((p) => ({ ...p, stipend: !p.stipend }))}
                  sx={{ cursor: 'pointer', py: 0.5 }}
                >
                  <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: '#111827' }}>
                    Stipend (Monthly)
                  </Typography>
                  {openSections.stipend ? <UpOutlined style={{ fontSize: 11, color: '#9CA3AF' }} /> : <DownOutlined style={{ fontSize: 11, color: '#9CA3AF' }} />}
                </Stack>
                <Collapse in={openSections.stipend}>
                  <FormGroup sx={{ mt: 1 }}>
                    {[
                      { key: 'Any', label: 'Any Stipend', count: '1,120' },
                      { key: '0-5k', label: '₹0 - ₹5,000', count: '1,540' },
                      { key: '5k-10k', label: '₹5,001 - ₹10,000', count: '980' },
                      { key: '10k-20k', label: '₹10,001 - ₹20,000', count: '420' },
                      { key: '20k+', label: '₹20,000+', count: '1,890' }
                    ].map((item) => (
                      <FormControlLabel
                        key={item.key}
                        control={
                          <Checkbox
                            size="small"
                            checked={Boolean(selectedStipends[item.key])}
                            onChange={(e) => setSelectedStipends({ ...selectedStipends, [item.key]: e.target.checked })}
                            sx={{ color: '#D1D5DB', '&.Mui-checked': { color: '#530EF0' } }}
                          />
                        }
                        label={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                            <Typography sx={{ fontSize: 13, color: '#374151' }}>{item.label}</Typography>
                            <Typography sx={{ fontSize: 12, color: '#9CA3AF', ml: 1 }}>{item.count}</Typography>
                          </Box>
                        }
                        sx={{ ml: 0, mr: 0, width: '100%', justifyContent: 'space-between' }}
                      />
                    ))}
                  </FormGroup>
                </Collapse>
              </Box>

              <Divider sx={{ my: 1.5 }} />

              {/* 4. Location Filter */}
              <Box sx={{ mb: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  onClick={() => setOpenSections((p) => ({ ...p, location: !p.location }))}
                  sx={{ cursor: 'pointer', py: 0.5 }}
                >
                  <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: '#111827' }}>
                    Location
                  </Typography>
                  {openSections.location ? <UpOutlined style={{ fontSize: 11, color: '#9CA3AF' }} /> : <DownOutlined style={{ fontSize: 11, color: '#9CA3AF' }} />}
                </Stack>
                <Collapse in={openSections.location}>
                  <Box sx={{ mt: 1 }}>
                    <TextField
                      size="small"
                      placeholder="Search location"
                      value={locationSearchFilter}
                      onChange={(e) => setLocationSearchFilter(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchOutlined style={{ fontSize: 13, color: '#9CA3AF' }} />
                          </InputAdornment>
                        )
                      }}
                      fullWidth
                      sx={{
                        mb: 1,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          fontSize: 12.5,
                          bgcolor: '#F9FAFB'
                        }
                      }}
                    />
                    <FormGroup>
                      {[
                        { key: 'Bengaluru', label: 'Bengaluru', count: '1,480' },
                        { key: 'Chennai', label: 'Chennai', count: '920' },
                        { key: 'Hyderabad', label: 'Hyderabad', count: '860' },
                        { key: 'Pune', label: 'Pune', count: '720' },
                        { key: 'Remote', label: 'Remote', count: '2,120' }
                      ]
                        .filter((loc) => loc.label.toLowerCase().includes(locationSearchFilter.toLowerCase()))
                        .map((item) => (
                          <FormControlLabel
                            key={item.key}
                            control={
                              <Checkbox
                                size="small"
                                checked={Boolean(selectedLocations[item.key])}
                                onChange={(e) => {
                                  setSelectedLocations({ ...selectedLocations, [item.key]: e.target.checked });
                                  if (e.target.checked) setLocationQuery(item.key);
                                  else setLocationQuery('');
                                }}
                                sx={{ color: '#D1D5DB', '&.Mui-checked': { color: '#530EF0' } }}
                              />
                            }
                            label={
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                <Typography sx={{ fontSize: 13, color: '#374151' }}>{item.label}</Typography>
                                <Typography sx={{ fontSize: 12, color: '#9CA3AF', ml: 1 }}>{item.count}</Typography>
                              </Box>
                            }
                            sx={{ ml: 0, mr: 0, width: '100%', justifyContent: 'space-between' }}
                          />
                        ))}
                    </FormGroup>
                  </Box>
                </Collapse>
              </Box>

              <Divider sx={{ my: 1.5 }} />

              {/* 5. Category */}
              <Box>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  onClick={() => setOpenSections((p) => ({ ...p, category: !p.category }))}
                  sx={{ cursor: 'pointer', py: 0.5 }}
                >
                  <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: '#111827' }}>
                    Category
                  </Typography>
                  {openSections.category ? <UpOutlined style={{ fontSize: 11, color: '#9CA3AF' }} /> : <DownOutlined style={{ fontSize: 11, color: '#9CA3AF' }} />}
                </Stack>
                <Collapse in={openSections.category}>
                  <FormGroup sx={{ mt: 1 }}>
                    {[
                      { key: 'IT & Software', label: 'IT & Software', count: '2,340' },
                      { key: 'Marketing', label: 'Marketing', count: '980' },
                      { key: 'Design', label: 'Design', count: '720' },
                      { key: 'Human Resources', label: 'Human Resources', count: '320' }
                    ].map((item) => (
                      <FormControlLabel
                        key={item.key}
                        control={
                          <Checkbox
                            size="small"
                            checked={Boolean(selectedCategories[item.key])}
                            onChange={(e) => setSelectedCategories({ ...selectedCategories, [item.key]: e.target.checked })}
                            sx={{ color: '#D1D5DB', '&.Mui-checked': { color: '#530EF0' } }}
                          />
                        }
                        label={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                            <Typography sx={{ fontSize: 13, color: '#374151' }}>{item.label}</Typography>
                            <Typography sx={{ fontSize: 12, color: '#9CA3AF', ml: 1 }}>{item.count}</Typography>
                          </Box>
                        }
                        sx={{ ml: 0, mr: 0, width: '100%', justifyContent: 'space-between' }}
                      />
                    ))}
                  </FormGroup>
                </Collapse>
              </Box>
            </Card>
          </Box>

          {/* ===================================================================== */}
          {/* MIDDLE COLUMN: INTERNSHIP LISTINGS                                    */}
          {/* ===================================================================== */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Results count bar */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 2.5 }}
            >
              <Typography sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>
                2,340 Internships Found
              </Typography>

              {/* Sort by */}
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
                  <MenuItem value="Relevance">Relevance</MenuItem>
                  <MenuItem value="Latest">Latest</MenuItem>
                  <MenuItem value="Highest Stipend">Highest Stipend</MenuItem>
                  <MenuItem value="Duration">Shortest Duration</MenuItem>
                </Select>
              </Stack>
            </Stack>

            {/* List of 5 Internship Cards */}
            <Stack spacing={2.5}>
              {filteredInternships.map((intern) => {
                const isSaved = Boolean(savedInternships[intern.id]);

                return (
                  <Card
                    key={intern.id}
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
                      {/* Company Logo Square */}
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
                          flexShrink: 0,
                          boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                        }}
                      >
                        {intern.logo}
                      </Box>

                      {/* Internship Details Body */}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        {/* Top line: Featured badge + Posted date + Bookmark */}
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
                          <Box>
                            {intern.featured && (
                              <Chip
                                label="Featured"
                                size="small"
                                sx={{
                                  bgcolor: '#F3EDFF',
                                  color: '#530EF0',
                                  fontSize: 11,
                                  fontWeight: 700,
                                  height: 22,
                                  borderRadius: '6px'
                                }}
                              />
                            )}
                          </Box>

                          <Stack direction="row" alignItems="center" spacing={1.5}>
                            <Typography sx={{ fontSize: 12, color: '#10B981', fontWeight: 600 }}>
                              {intern.posted}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => toggleSave(intern.id, intern.title)}
                              sx={{
                                color: isSaved ? '#530EF0' : '#9CA3AF',
                                '&:hover': { color: '#530EF0', bgcolor: '#F3EDFF' }
                              }}
                            >
                              {isSaved ? <HeartFilled style={{ fontSize: 17, color: '#530EF0' }} /> : <HeartOutlined style={{ fontSize: 17 }} />}
                            </IconButton>
                          </Stack>
                        </Stack>

                        {/* Title */}
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
                          onClick={() => handleOpenApply(intern)}
                        >
                          {intern.title}
                        </Typography>

                        {/* Company & Rating */}
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                          <Typography sx={{ fontWeight: 700, fontSize: 14, color: '#374151' }}>
                            {intern.company}
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing={0.4}>
                            <StarFilled style={{ fontSize: 12, color: '#F59E0B' }} />
                            <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: '#111827' }}>
                              {intern.rating}
                            </Typography>
                            <Typography sx={{ fontSize: 12, color: '#6B7280' }}>
                              ({intern.reviews})
                            </Typography>
                          </Stack>
                        </Stack>

                        {/* Meta Tags Row: Location, Duration, Stipend, Work Mode */}
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
                            <Typography sx={{ fontSize: 13, color: 'inherit' }}>{intern.location}</Typography>
                          </Stack>

                          <Stack direction="row" alignItems="center" spacing={0.6}>
                            <CalendarOutlined style={{ fontSize: 13, color: '#9CA3AF' }} />
                            <Typography sx={{ fontSize: 13, color: 'inherit' }}>{intern.duration}</Typography>
                          </Stack>

                          <Stack direction="row" alignItems="center" spacing={0.6}>
                            <DollarOutlined style={{ fontSize: 13, color: '#9CA3AF' }} />
                            <Typography sx={{ fontSize: 13, color: '#111827', fontWeight: 600 }}>{intern.stipend}</Typography>
                          </Stack>

                          <Stack direction="row" alignItems="center" spacing={0.6}>
                            <ShopOutlined style={{ fontSize: 13, color: '#9CA3AF' }} />
                            <Typography sx={{ fontSize: 13, color: 'inherit' }}>{intern.workMode}</Typography>
                          </Stack>
                        </Stack>

                        {/* Bottom Row: Skills Chips + Apply Now Button */}
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          flexWrap="wrap"
                          useFlexGap
                          spacing={2}
                        >
                          {/* Skill Tags */}
                          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            {intern.tags.map((tag) => (
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

                          {/* Apply Now Button */}
                          <Button
                            variant="outlined"
                            onClick={() => handleOpenApply(intern)}
                            sx={{
                              borderColor: '#530EF0',
                              color: '#530EF0', fontWeight: 600, fontSize: 12,
                              px: 3,
                              py: 0.75,
                              borderRadius: '8px',
                              textTransform: 'none',
                              '&:hover': {
                                bgcolor: '#530EF0',
                                color: '#FFF',
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
          {/* RIGHT COLUMN: PROMO & DISCOVERY WIDGETS (320px)                       */}
          {/* ===================================================================== */}
          <Box sx={{ width: { xs: '100%', md: 320 }, flexShrink: 0 }}>
            <Stack spacing={3}>
              {/* Card 1: Get Internship Alerts */}
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
                      bgcolor: '#FEF3C7',
                      color: '#D97706',
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
                      Get Internship Alerts
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: '#6B7280', lineHeight: 1.4 }}>
                      Be the first to know about new internships that match your profile.
                    </Typography>
                  </Box>
                </Stack>

                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => setAlertModalOpen(true)}
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
                  Create Alert
                </Button>
              </Card>

              {/* Card 2: Top Companies Offering Internships */}
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
                    Top Companies Offering Internships
                  </Typography>
                  <Typography
                    onClick={() => navigate('/candidate/companies')}
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

                {/* 5x2 Grid of Companies */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: 1.5,
                    textAlign: 'center'
                  }}
                >
                  {[
                    { name: 'Google', count: '2.5K+', logo: <GoogleLogo /> },
                    { name: 'Microsoft', count: '1.8K+', logo: <MicrosoftLogo /> },
                    { name: 'Amazon', count: '1.6K+', logo: <AmazonLogo /> },
                    { name: 'TCS', count: '1.4K+', logo: <TcsLogo /> },
                    { name: 'Zoho', count: '1.2K+', logo: <ZohoLogo /> },
                    { name: 'Infosys', count: '1.1K+', logo: <InfosysLogo /> },
                    { name: 'Accenture', count: '980+', logo: <AccentureLogo /> },
                    { name: 'Deloitte', count: '820+', logo: <DeloitteLogo /> },
                    { name: 'HCL', count: '690+', logo: <HclLogo /> },
                    { name: 'Wipro', count: '590+', logo: <WiproLogo /> }
                  ].map((comp) => (
                    <Box
                      key={comp.name}
                      onClick={() => {
                        setSearchQuery(comp.name);
                        setSnackbar({ open: true, message: `Showing internships at ${comp.name}`, severity: 'info' });
                      }}
                      sx={{
                        p: 1,
                        borderRadius: '10px',
                        border: '1px solid #F3F4F6',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover': { borderColor: '#530EF0', bgcolor: '#F8F9FE', transform: 'scale(1.05)' }
                      }}
                    >
                      <Box sx={{ height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 0.5 }}>
                        {comp.logo}
                      </Box>
                      <Typography sx={{ fontSize: 10, fontWeight: 700, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
                        {comp.name}
                      </Typography>
                      <Typography sx={{ fontSize: 9.5, color: '#6B7280' }}>
                        {comp.count}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Card>

              {/* Card 3: Boost Your Chances with AI */}
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
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1.5 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontWeight: 800, fontSize: 15, color: '#111827', mb: 0.5 }}>
                      Boost Your Chances with AI
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: '#6B7280', lineHeight: 1.4 }}>
                      Get AI-powered resume suggestions and personalized internship recommendations.
                    </Typography>
                  </Box>

                  {/* Robot character avatar */}
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: '50%',
                      bgcolor: '#FFFFFF',
                      boxShadow: '0 4px 12px rgba(83, 14, 240, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 26,
                      flexShrink: 0
                    }}
                  >
                    🤖
                  </Box>
                </Stack>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => setAiModalOpen(true)}
                  sx={{
                    bgcolor: '#530EF0',
                    color: '#FFF',
                    fontWeight: 700,
                    fontSize: 13,
                    py: 1,
                    borderRadius: '8px',
                    textTransform: 'none',
                    boxShadow: '0 4px 12px rgba(83, 14, 240, 0.3)',
                    '&:hover': { bgcolor: '#420bc2' }
                  }}
                >
                  Try AI Job Match
                </Button>
              </Card>

              {/* Card 4: Popular Internship Locations */}
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
                    Popular Internship Locations
                  </Typography>
                  <Typography
                    onClick={() => {
                      setSelectedLocations({});
                      setLocationQuery('');
                      setSnackbar({ open: true, message: 'Viewing all nationwide locations', severity: 'info' });
                    }}
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

                {/* 2x3 Location Cards */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 1.25
                  }}
                >
                  {POPULAR_LOCATIONS.map((item) => (
                    <Box
                      key={item.city}
                      onClick={() => {
                        setLocationQuery(item.city);
                        setSnackbar({ open: true, message: `Filtered internships in ${item.city}`, severity: 'info' });
                      }}
                      sx={{
                        borderRadius: '10px',
                        overflow: 'hidden',
                        border: '1px solid #F1F5F9',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        '&:hover': { borderColor: '#530EF0', transform: 'translateY(-2px)' }
                      }}
                    >
                      <Box
                        sx={{
                          height: 52,
                          width: '100%',
                          backgroundImage: `url(${item.img})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          bgcolor: '#E5E7EB'
                        }}
                      />
                      <Box sx={{ p: 0.75, bgcolor: '#FFFFFF', textAlign: 'center' }}>
                        <Typography sx={{ fontWeight: 700, fontSize: 11, color: '#111827' }}>
                          {item.city}
                        </Typography>
                        <Typography sx={{ fontSize: 9.5, color: '#6B7280' }}>
                          {item.count}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Card>
            </Stack>
          </Box>
        </Stack>
      </Box>

      {/* ========================================================================= */}
      {/* 4. MODALS & SNACKBAR                                                      */}
      {/* ========================================================================= */}

      {/* 8-Step Comprehensive Application Modal */}
      <CandidateJobApplicationDialog
        open={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        job={selectedInternship}
        onApplySuccess={(newAppId, appliedJob) => {
          setSnackbar({
            open: true,
            message: `🎉 Internship Application ${newAppId} successfully submitted to ${appliedJob?.company || 'Company'} for ${appliedJob?.title || 'the internship'}!`,
            severity: 'success'
          });
        }}
      />

      {/* Internship Alerts Dialog */}
      <Dialog open={alertModalOpen} onClose={() => setAlertModalOpen(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}>
        <DialogTitle sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>
          🔔 Create Internship Alert
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Typography sx={{ fontSize: 12.5, color: '#6B7280' }}>
              We'll notify you whenever new internships matching your preferences are posted.
            </Typography>
            <TextField label="Internship Role / Keyword" placeholder="e.g. Software, UI/UX, Data Science" fullWidth size="small" />
            <TextField label="Target City / Remote" placeholder="e.g. Bengaluru or Remote" fullWidth size="small" />
            <TextField label="Email Address" defaultValue="candidate@gmail.com" fullWidth size="small" />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setAlertModalOpen(false)} sx={{ textTransform: 'none' }}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              setAlertModalOpen(false);
              setSnackbar({ open: true, message: 'Internship alert created! Daily digests active.', severity: 'success' });
            }}
            sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 700, borderRadius: '8px' }}
          >
            Activate Alert
          </Button>
        </DialogActions>
      </Dialog>

      {/* AI Job Match Dialog */}
      <Dialog open={aiModalOpen} onClose={() => setAiModalOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}>
        <DialogTitle sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>
          🤖 AI Internship & Resume Matcher
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Stack spacing={2.5}>
            <Box sx={{ p: 2.5, bgcolor: '#F3EDFF', borderRadius: '12px', border: '1px solid #E9D5FF' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Typography sx={{ fontWeight: 800, fontSize: 15, color: '#530EF0' }}>
                  Overall Profile Match
                </Typography>
                <Chip label="94% Excellent" size="small" sx={{ bgcolor: '#10B981', color: '#FFF', fontWeight: 700 }} />
              </Stack>
              <Typography sx={{ fontSize: 12.5, color: '#4B5563', lineHeight: 1.4 }}>
                Based on your uploaded resume and skills in <strong>Python, React, and Data Structures</strong>, you are in the top 6% of applicants for Software Engineering Internships.
              </Typography>
            </Box>

            <Typography sx={{ fontWeight: 700, fontSize: 14, color: '#111827' }}>
              AI Recommendations to Boost Selection:
            </Typography>
            <Stack spacing={1}>
              <Typography sx={{ fontSize: 12.5, color: '#374151' }}>
                ✓ Add 1 deployed full-stack or machine learning project link to your GitHub.
              </Typography>
              <Typography sx={{ fontSize: 12.5, color: '#374151' }}>
                ✓ Highlight experience with Docker or cloud fundamentals (AWS/GCP).
              </Typography>
              <Typography sx={{ fontSize: 12.5, color: '#374151' }}>
                ✓ Apply to Google and Microsoft within the first 48 hours for 2.4x higher interview callback rates.
              </Typography>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setAiModalOpen(false)} sx={{ textTransform: 'none' }}>Close</Button>
          <Button
            variant="contained"
            onClick={() => {
              setAiModalOpen(false);
              handleRunAiMatch();
            }}
            sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 700, borderRadius: '8px' }}
          >
            Apply AI Suggestions
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

