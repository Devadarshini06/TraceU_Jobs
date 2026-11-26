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

// icons
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import EnvironmentOutlined from '@ant-design/icons/EnvironmentOutlined';
import ShopOutlined from '@ant-design/icons/ShopOutlined';
import DownOutlined from '@ant-design/icons/DownOutlined';
import BellOutlined from '@ant-design/icons/BellOutlined';
import HeartOutlined from '@ant-design/icons/HeartOutlined';
import HeartFilled from '@ant-design/icons/HeartFilled';
import StarFilled from '@ant-design/icons/StarFilled';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import CrownOutlined from '@ant-design/icons/CrownOutlined';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import BookOutlined from '@ant-design/icons/BookOutlined';
import BankOutlined from '@ant-design/icons/BankOutlined';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';

// assets
import avatarCandidate from 'assets/images/users/avatar-1.png';
import candidateCompaniesHero from 'assets/images/auth/candidate-companies-v5.jpg';

// Brand logos (SVG helpers)
function GoogleLogo() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.13C3.26 21.36 7.33 24 12 24z" />
      <path fill="#FBBC05" d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.58H1.26C.46 8.18 0 10.03 0 12s.46 3.82 1.26 5.42l4.02-3.13z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.26 6.58l4.02 3.13c.95-2.83 3.6-4.93 6.72-4.93z" />
    </svg>
  );
}

function MicrosoftLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 22 22">
      <rect x="1" y="1" width="9" height="9" fill="#F25022" rx="1" />
      <rect x="12" y="1" width="9" height="9" fill="#7FBA00" rx="1" />
      <rect x="1" y="12" width="9" height="9" fill="#00A4EF" rx="1" />
      <rect x="12" y="12" width="9" height="9" fill="#FFB900" rx="1" />
    </svg>
  );
}

function AmazonLogo() {
  return (
    <svg width="28" height="24" viewBox="0 0 40 24">
      <text x="4" y="18" fill="#111827" fontSize="20" fontWeight="900" fontFamily="sans-serif">amazon</text>
      <path d="M 6 22 Q 22 28 36 21" stroke="#FF9900" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function TcsLogo() {
  return (
    <Typography sx={{ fontWeight: 900, fontSize: 18, color: '#C4161C', letterSpacing: '-0.5px' }}>
      tcs
    </Typography>
  );
}

function InfosysLogo() {
  return (
    <Typography sx={{ fontWeight: 800, fontSize: 16, color: '#007CC3', letterSpacing: '-0.3px' }}>
      Infosys
    </Typography>
  );
}

function AccentureLogo() {
  return (
    <Typography sx={{ fontWeight: 900, fontSize: 22, color: '#A100FF',  lineHeight: 1 }}>
      &gt;
    </Typography>
  );
}

function ZohoLogo() {
  return (
    <Box sx={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
      <Box sx={{ width: 10, height: 18, bgcolor: '#E1251B', borderRadius: '2px' }} />
      <Box sx={{ width: 10, height: 18, bgcolor: '#008C3C', borderRadius: '2px' }} />
      <Box sx={{ width: 10, height: 18, bgcolor: '#0072BC', borderRadius: '2px' }} />
      <Box sx={{ width: 10, height: 18, bgcolor: '#F48020', borderRadius: '2px' }} />
    </Box>
  );
}

function HclLogo() {
  return (
    <Typography sx={{ fontWeight: 900, fontSize: 15, color: '#0155A5', letterSpacing: '0.5px' }}>
      HCL
    </Typography>
  );
}

function WiproLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32">
      <circle cx="16" cy="7" r="3" fill="#D946EF" />
      <circle cx="23" cy="11" r="3" fill="#EC4899" />
      <circle cx="25" cy="18" r="3" fill="#F43F5E" />
      <circle cx="21" cy="24" r="3" fill="#F97316" />
      <circle cx="16" cy="26" r="3" fill="#EAB308" />
      <circle cx="11" cy="24" r="3" fill="#84CC16" />
      <circle cx="7" cy="18" r="3" fill="#06B6D4" />
      <circle cx="9" cy="11" r="3" fill="#3B82F6" />
      <circle cx="16" cy="16" r="3.5" fill="#6366F1" />
    </svg>
  );
}

// 9 Companies data matching the screenshot exactly
const INITIAL_COMPANIES = [
  {
    id: 'google',
    name: 'Google',
    logo: <GoogleLogo />,
    rating: 4.4,
    reviews: '12.8K reviews',
    category: 'IT Services • Technology',
    location: 'Bengaluru, Karnataka',
    employees: '10,000+ employees',
    jobsCount: '250+ Jobs',
    industry: 'Product Based',
    companyType: 'MNC',
    bannerGradient: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 50%, #60A5FA 100%)',
    bannerBg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    logo: <MicrosoftLogo />,
    rating: 4.3,
    reviews: '10.2K reviews',
    category: 'IT Services • Software',
    location: 'Hyderabad, Telangana',
    employees: '10,000+ employees',
    jobsCount: '180+ Jobs',
    industry: 'Product Based',
    companyType: 'MNC',
    bannerGradient: 'linear-gradient(135deg, #0F172A 0%, #0369A1 50%, #38BDF8 100%)',
    bannerBg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'amazon',
    name: 'Amazon',
    logo: <AmazonLogo />,
    rating: 4.2,
    reviews: '15.6K reviews',
    category: 'E-commerce • Technology',
    location: 'Bengaluru, Karnataka',
    employees: '10,000+ employees',
    jobsCount: '320+ Jobs',
    industry: 'Product Based',
    companyType: 'MNC',
    bannerGradient: 'linear-gradient(135deg, #1F2937 0%, #374151 50%, #4B5563 100%)',
    bannerBg: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tcs',
    name: 'TCS',
    logo: <TcsLogo />,
    rating: 4.1,
    reviews: '18.4K reviews',
    category: 'IT Services • Consulting',
    location: 'Chennai, Tamil Nadu',
    employees: '10,000+ employees',
    jobsCount: '420+ Jobs',
    industry: 'IT Services',
    companyType: 'MNC',
    bannerGradient: 'linear-gradient(135deg, #1E293B 0%, #334155 50%, #64748B 100%)',
    bannerBg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'infosys',
    name: 'Infosys',
    logo: <InfosysLogo />,
    rating: 4.0,
    reviews: '14.2K reviews',
    category: 'IT Services • Consulting',
    location: 'Bengaluru, Karnataka',
    employees: '10,000+ employees',
    jobsCount: '380+ Jobs',
    industry: 'IT Services',
    companyType: 'MNC',
    bannerGradient: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #60A5FA 100%)',
    bannerBg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'accenture',
    name: 'Accenture',
    logo: <AccentureLogo />,
    rating: 4.1,
    reviews: '9.8K reviews',
    category: 'IT Services • Consulting',
    location: 'Bengaluru, Karnataka',
    employees: '10,000+ employees',
    jobsCount: '290+ Jobs',
    industry: 'IT Services',
    companyType: 'MNC',
    bannerGradient: 'linear-gradient(135deg, #312E81 0%, #4338CA 50%, #818CF8 100%)',
    bannerBg: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'zoho',
    name: 'Zoho',
    logo: <ZohoLogo />,
    rating: 4.3,
    reviews: '8.5K reviews',
    category: 'Product Based • SaaS',
    location: 'Chennai, Tamil Nadu',
    employees: '5,001 - 10,000 employees',
    jobsCount: '150+ Jobs',
    industry: 'Product Based',
    companyType: 'MNC',
    bannerGradient: 'linear-gradient(135deg, #064E3B 0%, #047857 50%, #34D399 100%)',
    bannerBg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'hcl',
    name: 'HCL Technologies',
    logo: <HclLogo />,
    rating: 4.0,
    reviews: '8.9K reviews',
    category: 'IT Services • Technology',
    location: 'Noida, Uttar Pradesh',
    employees: '10,000+ employees',
    jobsCount: '260+ Jobs',
    industry: 'IT Services',
    companyType: 'MNC',
    bannerGradient: 'linear-gradient(135deg, #111827 0%, #1F2937 50%, #4B5563 100%)',
    bannerBg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'wipro',
    name: 'Wipro',
    logo: <WiproLogo />,
    rating: 4.0,
    reviews: '9.1K reviews',
    category: 'IT Services • Consulting',
    location: 'Bengaluru, Karnataka',
    employees: '10,000+ employees',
    jobsCount: '310+ Jobs',
    industry: 'IT Services',
    companyType: 'MNC',
    bannerGradient: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #6366F1 100%)',
    bannerBg: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80'
  }
];

export default function CandidateCompanies() {
  const navigate = useNavigate();

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [industrySearch, setIndustrySearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');

  // Selected filters
  const [selectedIndustries, setSelectedIndustries] = useState({});
  const [selectedLocations, setSelectedLocations] = useState({});
  const [selectedTypes, setSelectedTypes] = useState({});

  // Followed companies
  const [followed, setFollowed] = useState({});

  // Sort option
  const [sortBy, setSortBy] = useState('Most Relevant');
  const [sortAnchor, setSortAnchor] = useState(null);

  // Profile menu
  const [profileAnchor, setProfileAnchor] = useState(null);

  // Job alert dialog
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertCompany, setAlertCompany] = useState('');
  const [alertEmail, setAlertEmail] = useState('candidate@gmail.com');
  const [alertErrors, setAlertErrors] = useState({});

  // Toast
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Toggle follow
  const toggleFollow = (company) => {
    setFollowed((prev) => {
      const next = { ...prev, [company.id]: !prev[company.id] };
      const isNowFollowed = next[company.id];
      setSnackbar({
        open: true,
        message: isNowFollowed ? `You are now following ${company.name}!` : `Unfollowed ${company.name}`,
        severity: isNowFollowed ? 'success' : 'info'
      });
      return next;
    });
  };

  // Clear filters
  const handleClearAll = () => {
    setSearchQuery('');
    setIndustrySearch('');
    setLocationSearch('');
    setSelectedIndustries({});
    setSelectedLocations({});
    setSelectedTypes({});
    setSnackbar({ open: true, message: 'All filters cleared', severity: 'info' });
  };

  // Filtered companies
  const filteredCompanies = useMemo(() => {
    return INITIAL_COMPANIES.filter((comp) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = comp.name.toLowerCase().includes(q);
        const matchesCat = comp.category.toLowerCase().includes(q);
        const matchesLoc = comp.location.toLowerCase().includes(q);
        if (!matchesName && !matchesCat && !matchesLoc) return false;
      }
      return true;
    });
  }, [searchQuery]);

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

            {/* Companies (Active Tab) */}
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
                Companies
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
        <Stack direction="row" alignItems="center" spacing={2}>
          {/* Notifications */}
          <IconButton
            size="small"
            onClick={() => setSnackbar({ open: true, message: 'Google and Microsoft posted new jobs!', severity: 'info' })}
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

          {/* Profile Menu */}
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
            <MenuItem onClick={() => { setProfileAnchor(null); navigate('/candidate/jobs'); }} sx={{ fontSize: 13, py: 1 }}>
              <ShopOutlined style={{ marginRight: 10, color: '#530EF0' }} /> Find Jobs
            </MenuItem>
            <MenuItem onClick={() => { setProfileAnchor(null); setAlertModalOpen(true); }} sx={{ fontSize: 13, py: 1 }}>
              <BellOutlined style={{ marginRight: 10, color: '#530EF0' }} /> Company Alerts
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={() => { setProfileAnchor(null); navigate('/candidate-login'); }} sx={{ fontSize: 13, py: 1, color: '#EF4444' }}>
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
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #F8F9FE 0%, #EDEBFD 50%, #F5F3FF 100%)',
          pt: { xs: 4, md: 5 },
          pb: { xs: 4, md: 5 },
          px: { xs: 2, sm: 4, md: 6 }
        }}
      >
        <Box sx={{ maxWidth: 1400, mx: 'auto', position: 'relative' }}>
          <Stack direction={{ xs: 'column', lg: 'row' }} alignItems="center" justifyContent="space-between" spacing={4}>
            {/* Left Content */}
            <Box sx={{ flex: 1, maxWidth: { xs: '100%', lg: 780 } }}>
              {/* Category Eyebrow */}
              <Typography sx={{ fontWeight: 800, fontSize: 12, color: '#530EF0', letterSpacing: '1px', textTransform: 'uppercase', mb: 1 }}>
                EXPLORE TOP COMPANIES
              </Typography>

              {/* Main Heading */}
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: 32, sm: 42, md: 48 },
                  color: '#111827',
                  letterSpacing: '-0.025em',
                  lineHeight: 1.15,
                  mb: 1.5
                }}
              >
                Top Companies Hiring{' '}
                <Box
                  component="span"
                  sx={{
                    color: '#530EF0',
                    backgroundImage: 'linear-gradient(90deg, #530EF0 0%, #7C3AED 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'block'
                  }}
                >
                  on TraceU Jobs
                </Box>
              </Typography>

              {/* Subtitle */}
              <Typography sx={{ fontSize: 15, color: '#4B5563', mb: 3.5, lineHeight: 1.5 }}>
                Discover the best companies, explore their culture, insights, and find the right opportunities for your career.
              </Typography>

              {/* Search Pill */}
              <Card
                elevation={0}
                sx={{
                  p: 1,
                  borderRadius: '16px',
                  bgcolor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 8px 30px rgba(83, 14, 240, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  mb: 2.5
                }}
              >
                <SearchOutlined style={{ fontSize: 18, color: '#9CA3AF', marginLeft: 12 }} />
                <TextField
                  variant="standard"
                  placeholder="Search companies by name, industry or location"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  fullWidth
                  InputProps={{ disableUnderline: true, sx: { fontSize: 13.5, color: '#111827' } }}
                />
                <Button
                  variant="contained"
                  onClick={() => setSnackbar({ open: true, message: `Found ${filteredCompanies.length} companies matching "${searchQuery || 'all'}"`, severity: 'info' })}
                  sx={{
                    bgcolor: '#530EF0',
                    color: '#FFF',
                    fontWeight: 700,
                    fontSize: 14,
                    textTransform: 'none',
                    borderRadius: '12px',
                    px: 3.5,
                    py: 1.25,
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 14px rgba(83, 14, 240, 0.35)',
                    '&:hover': { bgcolor: '#430bc2' }
                  }}
                >
                  Search Companies
                </Button>
              </Card>

              {/* Popular Searches */}
              <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap" useFlexGap>
                <Typography sx={{ fontWeight: 600, fontSize: 12.5, color: '#6B7280', mr: 0.5 }}>
                  Popular Searches:
                </Typography>
                {[
                  'IT Services',
                  'Product Based',
                  'Startups',
                  'MNC',
                  'Banking',
                  'Healthcare',
                  'EdTech',
                  'FinTech',
                  'Remote Friendly'
                ].map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    size="small"
                    onClick={() => {
                      setSearchQuery(item);
                      setSnackbar({ open: true, message: `Filtering companies by "${item}"`, severity: 'info' });
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

            {/* Right Hero Graphic: Top Companies Architecture & Enterprise Scene */}
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
                  src={candidateCompaniesHero}
                  alt="Top Companies Hiring on TraceU"
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
      {/* 3. MAIN CONTENT: FILTERS (LEFT) | 3x3 GRID (MID) | STATS (RIGHT)           */}
      {/* ========================================================================= */}
      <Box sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 2, sm: 3, md: 5 }, py: 4 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="flex-start">
          {/* ===================================================================== */}
          {/* LEFT COLUMN: FILTERS (~240px)                                         */}
          {/* ===================================================================== */}
          <Box sx={{ width: { xs: '100%', md: 230, lg: 250 }, flexShrink: 0 }}>
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
              {/* Header */}
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2, pb: 1.5, borderBottom: '1px solid #F3F4F6' }}>
                <Typography sx={{ fontWeight: 800, fontSize: 16, color: '#111827' }}>
                  Filters
                </Typography>
                <Typography
                  onClick={handleClearAll}
                  sx={{ fontSize: 12.5, fontWeight: 700, color: '#530EF0', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                >
                  Clear All
                </Typography>
              </Stack>

              {/* 1. Industry */}
              <Box sx={{ mb: 2.5 }}>
                <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: '#1F2937', mb: 1 }}>
                  Industry
                </Typography>
                <TextField
                  placeholder="Search industry"
                  size="small"
                  fullWidth
                  value={industrySearch}
                  onChange={(e) => setIndustrySearch(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchOutlined style={{ fontSize: 13, color: '#9CA3AF' }} />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: '8px', fontSize: 12.5, bgcolor: '#FAFAFB', mb: 1 }
                  }}
                />
                <FormGroup>
                  {[
                    { label: 'IT Services', count: '1,240' },
                    { label: 'Product Based', count: '980' },
                    { label: 'Banking & Finance', count: '620' },
                    { label: 'Healthcare', count: '540' },
                    { label: 'EdTech', count: '420' },
                    { label: 'Manufacturing', count: '380' },
                    { label: 'Retail', count: '310' }
                  ].map((ind) => (
                    <Stack key={ind.label} direction="row" justifyContent="space-between" alignItems="center">
                      <FormControlLabel
                        control={<Checkbox size="small" checked={Boolean(selectedIndustries[ind.label])} onChange={(e) => setSelectedIndustries({ ...selectedIndustries, [ind.label]: e.target.checked })} sx={{ p: 0.5, '&.Mui-checked': { color: '#530EF0' } }} />}
                        label={<Typography sx={{ fontSize: 12.5, color: '#4B5563' }}>{ind.label}</Typography>}
                        sx={{ m: 0 }}
                      />
                      <Typography sx={{ fontSize: 11.5, color: '#9CA3AF' }}>{ind.count}</Typography>
                    </Stack>
                  ))}
                </FormGroup>
                <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#530EF0', mt: 0.8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  View More
                </Typography>
              </Box>

              <Divider sx={{ my: 1.5 }} />

              {/* 2. Location */}
              <Box sx={{ mb: 2.5 }}>
                <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: '#1F2937', mb: 1 }}>
                  Location
                </Typography>
                <TextField
                  placeholder="Search location"
                  size="small"
                  fullWidth
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchOutlined style={{ fontSize: 13, color: '#9CA3AF' }} />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: '8px', fontSize: 12.5, bgcolor: '#FAFAFB', mb: 1 }
                  }}
                />
                <FormGroup>
                  {[
                    { label: 'Bengaluru', count: '1,820' },
                    { label: 'Chennai', count: '980' },
                    { label: 'Hyderabad', count: '860' },
                    { label: 'Pune', count: '720' },
                    { label: 'Mumbai', count: '690' },
                    { label: 'Delhi NCR', count: '600' },
                    { label: 'Remote', count: '1,240' }
                  ].map((loc) => (
                    <Stack key={loc.label} direction="row" justifyContent="space-between" alignItems="center">
                      <FormControlLabel
                        control={<Checkbox size="small" checked={Boolean(selectedLocations[loc.label])} onChange={(e) => setSelectedLocations({ ...selectedLocations, [loc.label]: e.target.checked })} sx={{ p: 0.5, '&.Mui-checked': { color: '#530EF0' } }} />}
                        label={<Typography sx={{ fontSize: 12.5, color: '#4B5563' }}>{loc.label}</Typography>}
                        sx={{ m: 0 }}
                      />
                      <Typography sx={{ fontSize: 11.5, color: '#9CA3AF' }}>{loc.count}</Typography>
                    </Stack>
                  ))}
                </FormGroup>
              </Box>

              <Divider sx={{ my: 1.5 }} />

              {/* 3. Company Type */}
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: '#1F2937', mb: 1 }}>
                  Company Type
                </Typography>
                <FormGroup>
                  {[
                    { label: 'MNC', count: '1,150' },
                    { label: 'Indian Startup', count: '680' },
                    { label: 'Public Sector', count: '320' },
                    { label: 'Private', count: '2,340' }
                  ].map((type) => (
                    <Stack key={type.label} direction="row" justifyContent="space-between" alignItems="center">
                      <FormControlLabel
                        control={<Checkbox size="small" checked={Boolean(selectedTypes[type.label])} onChange={(e) => setSelectedTypes({ ...selectedTypes, [type.label]: e.target.checked })} sx={{ p: 0.5, '&.Mui-checked': { color: '#530EF0' } }} />}
                        label={<Typography sx={{ fontSize: 12.5, color: '#4B5563' }}>{type.label}</Typography>}
                        sx={{ m: 0 }}
                      />
                      <Typography sx={{ fontSize: 11.5, color: '#9CA3AF' }}>{type.count}</Typography>
                    </Stack>
                  ))}
                </FormGroup>
              </Box>
            </Card>
          </Box>

          {/* ===================================================================== */}
          {/* MIDDLE COLUMN: 3x3 COMPANIES GRID                                      */}
          {/* ===================================================================== */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Header: Count + Sort */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>
                  {filteredCompanies.length === INITIAL_COMPANIES.length ? '5,000+ Companies' : `${filteredCompanies.length} Companies`}
                </Typography>
                <Typography sx={{ fontSize: 12.5, color: '#6B7280' }}>
                  Explore company profiles, reviews, jobs and more.
                </Typography>
              </Box>

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
                {['Most Relevant', 'Top Rated', 'Most Jobs', 'Company Name (A-Z)'].map((s) => (
                  <MenuItem key={s} onClick={() => { setSortBy(s); setSortAnchor(null); }} sx={{ fontSize: 13 }}>
                    {s}
                  </MenuItem>
                ))}
              </Menu>
            </Stack>

            {/* 3x3 Company Cards Grid */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
                gap: 2.5
              }}
            >
              {filteredCompanies.map((comp) => {
                const isFollowed = Boolean(followed[comp.id]);
                return (
                  <Card
                    key={comp.id}
                    elevation={0}
                    sx={{
                      borderRadius: '16px',
                      bgcolor: '#FFFFFF',
                      border: '1px solid #F1F5F9',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 8px 24px rgba(83, 14, 240, 0.08)',
                        borderColor: '#E9D5FF'
                      }
                    }}
                  >
                    {/* Top Architectural Banner Image */}
                    <Box
                      sx={{
                        position: 'relative',
                        height: 90,
                        background: comp.bannerGradient,
                        backgroundImage: `url(${comp.bannerBg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      {/* Dark overlay for contrast */}
                      <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.25)' }} />

                      {/* Floating Company Logo (offset half-way into card body) */}
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: -24,
                          left: 18,
                          width: 48,
                          height: 48,
                          borderRadius: '12px',
                          bgcolor: '#FFFFFF',
                          border: '1px solid #E5E7EB',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 2
                        }}
                      >
                        {comp.logo}
                      </Box>
                    </Box>

                    {/* Card Body */}
                    <Box sx={{ p: 2, pt: 3.8, flex: 1, display: 'flex', flexDirection: 'column' }}>
                      {/* Company Name & Rating */}
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
                        <Typography sx={{ fontWeight: 800, fontSize: 16, color: '#111827' }}>
                          {comp.name}
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <StarFilled style={{ fontSize: 12, color: '#F59E0B' }} />
                          <Typography sx={{ fontWeight: 800, fontSize: 12.5, color: '#111827' }}>
                            {comp.rating}
                          </Typography>
                          <Typography sx={{ fontSize: 11, color: '#9CA3AF' }}>
                            ({comp.reviews})
                          </Typography>
                        </Stack>
                      </Stack>

                      {/* Category */}
                      <Typography sx={{ fontSize: 12, color: '#6B7280', mb: 1.5 }}>
                        {comp.category}
                      </Typography>

                      {/* Details (Location & Size) */}
                      <Stack spacing={0.6} sx={{ mb: 2 }}>
                        <Stack direction="row" spacing={0.8} alignItems="center">
                          <EnvironmentOutlined style={{ fontSize: 12.5, color: '#9CA3AF' }} />
                          <Typography sx={{ fontSize: 12, color: '#4B5563' }}>
                            {comp.location}
                          </Typography>
                        </Stack>
                        <Stack direction="row" spacing={0.8} alignItems="center">
                          <ShopOutlined style={{ fontSize: 12.5, color: '#9CA3AF' }} />
                          <Typography sx={{ fontSize: 12, color: '#4B5563' }}>
                            {comp.employees}
                          </Typography>
                        </Stack>
                      </Stack>

                      {/* Card Footer: Jobs count + Follow button */}
                      <Box sx={{ mt: 'auto', pt: 1.5, borderTop: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography
                          onClick={() => {
                            navigate('/candidate/jobs');
                            setSnackbar({ open: true, message: `Viewing all jobs at ${comp.name}`, severity: 'info' });
                          }}
                          sx={{
                            fontSize: 12.5,
                            fontWeight: 700,
                            color: '#530EF0',
                            cursor: 'pointer',
                            '&:hover': { textDecoration: 'underline' }
                          }}
                        >
                          {comp.jobsCount}
                        </Typography>

                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => toggleFollow(comp)}
                          startIcon={isFollowed ? <HeartFilled style={{ color: '#EF4444' }} /> : <HeartOutlined />}
                          sx={{
                            borderColor: isFollowed ? '#EF4444' : '#E5E7EB',
                            color: isFollowed ? '#EF4444' : '#4B5563',
                            bgcolor: isFollowed ? '#FEF2F2' : 'transparent',
                            textTransform: 'none',
                            fontSize: 12,
                            fontWeight: 600,
                            borderRadius: '8px',
                            px: 1.5,
                            py: 0.4,
                            '&:hover': {
                              borderColor: '#530EF0',
                              color: '#530EF0',
                              bgcolor: '#F3EDFF'
                            }
                          }}
                        >
                          {isFollowed ? 'Following' : 'Follow'}
                        </Button>
                      </Box>
                    </Box>
                  </Card>
                );
              })}
            </Box>
          </Box>

          {/* ===================================================================== */}
          {/* RIGHT COLUMN: SIDEBAR WIDGETS (~280px)                                */}
          {/* ===================================================================== */}
          <Box sx={{ width: { xs: '100%', md: 260, lg: 280 }, flexShrink: 0 }}>
            <Stack spacing={2.5}>
              {/* Widget 1: Top Rated Companies */}
              <Card
                elevation={0}
                sx={{
                  p: 2.2,
                  borderRadius: '16px',
                  bgcolor: '#FFFFFF',
                  border: '1px solid #F1F5F9',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                  <Typography sx={{ fontWeight: 800, fontSize: 14.5, color: '#111827' }}>
                    Top Rated Companies
                  </Typography>
                  <Typography
                    onClick={() => setSnackbar({ open: true, message: 'Showing top rated companies...', severity: 'info' })}
                    sx={{ fontSize: 12, fontWeight: 700, color: '#530EF0', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                  >
                    View All →
                  </Typography>
                </Stack>

                <Stack spacing={1.5}>
                  {[
                    { name: 'Google', rating: '4.4', reviews: '12.8K', logo: <GoogleLogo /> },
                    { name: 'Microsoft', rating: '4.3', reviews: '10.2K', logo: <MicrosoftLogo /> },
                    { name: 'Amazon', rating: '4.2', reviews: '15.6K', logo: <AmazonLogo /> },
                    { name: 'Zoho', rating: '4.3', reviews: '8.5K', logo: <ZohoLogo /> },
                    { name: 'TCS', rating: '4.1', reviews: '18.4K', logo: <TcsLogo /> }
                  ].map((c) => (
                    <Stack
                      key={c.name}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      onClick={() => setSearchQuery(c.name)}
                      sx={{
                        p: 0.8,
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'bgcolor 0.15s ease',
                        '&:hover': { bgcolor: '#F9FAFB' }
                      }}
                    >
                      <Stack direction="row" spacing={1.2} alignItems="center">
                        <Box sx={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {c.logo}
                        </Box>
                        <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#111827' }}>
                          {c.name}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={0.4} alignItems="center">
                        <StarFilled style={{ fontSize: 11, color: '#F59E0B' }} />
                        <Typography sx={{ fontWeight: 700, fontSize: 12, color: '#111827' }}>
                          {c.rating}
                        </Typography>
                        <Typography sx={{ fontSize: 11, color: '#9CA3AF' }}>
                          ({c.reviews})
                        </Typography>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </Card>

              {/* Widget 2: Explore by Company Type */}
              <Card
                elevation={0}
                sx={{
                  p: 2.2,
                  borderRadius: '16px',
                  bgcolor: '#FFFFFF',
                  border: '1px solid #F1F5F9',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                }}
              >
                <Typography sx={{ fontWeight: 800, fontSize: 14.5, color: '#111827', mb: 2 }}>
                  Explore by Company Type
                </Typography>

                <Stack spacing={1.2}>
                  {[
                    { label: 'MNC', count: '1,150', icon: '🏢' },
                    { label: 'Indian Startups', count: '680', icon: '👥' },
                    { label: 'Government / PSU', count: '320', icon: '🏛️' },
                    { label: 'Product Based', count: '980', icon: '📱' },
                    { label: 'IT Services', count: '2,340', icon: '💻' }
                  ].map((item) => (
                    <Stack
                      key={item.label}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      onClick={() => setSearchQuery(item.label)}
                      sx={{
                        p: 1,
                        borderRadius: '10px',
                        cursor: 'pointer',
                        bgcolor: '#FAFAFB',
                        transition: 'all 0.15s ease',
                        '&:hover': { bgcolor: '#F3EDFF', color: '#530EF0' }
                      }}
                    >
                      <Stack direction="row" spacing={1.2} alignItems="center">
                        <Box sx={{ fontSize: 15 }}>{item.icon}</Box>
                        <Typography sx={{ fontWeight: 600, fontSize: 13, color: '#374151' }}>
                          {item.label}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography sx={{ fontSize: 12, color: '#6B7280' }}>
                          {item.count}
                        </Typography>
                        <RightOutlined style={{ fontSize: 9, color: '#9CA3AF' }} />
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </Card>

              {/* Widget 3: Get Notified When Your Dream Company is Hiring */}
              <Card
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: '16px',
                  bgcolor: '#F8F6FF',
                  border: '1px solid #EDE9FE',
                  boxShadow: '0 4px 16px rgba(83, 14, 240, 0.06)'
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ mb: 1.5 }}>
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: '50%',
                      bgcolor: '#EDE9FE',
                      color: '#530EF0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 18,
                      flexShrink: 0
                    }}
                  >
                    🔔
                  </Box>
                  <Typography sx={{ fontWeight: 800, fontSize: 14.5, color: '#111827', lineHeight: 1.3 }}>
                    Get Notified When Your Dream Company is Hiring
                  </Typography>
                </Stack>

                <Typography sx={{ fontSize: 12, color: '#6B7280', mb: 2.2, lineHeight: 1.45 }}>
                  Create job alerts and never miss an opportunity from your favorite companies.
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => setAlertModalOpen(true)}
                  endIcon={<ArrowRightOutlined />}
                  sx={{
                    bgcolor: '#530EF0',
                    color: '#FFF',
                    fontWeight: 700,
                    fontSize: 13,
                    textTransform: 'none',
                    borderRadius: '10px',
                    py: 1,
                    boxShadow: '0 4px 12px rgba(83, 14, 240, 0.25)',
                    '&:hover': { bgcolor: '#430bc2' }
                  }}
                >
                  Create Job Alert
                </Button>
              </Card>
            </Stack>
          </Box>
        </Stack>
      </Box>

      {/* ========================================================================= */}
      {/* 4. MODALS & SNACKBAR                                                      */}
      {/* ========================================================================= */}
      <Dialog
        open={alertModalOpen}
        onClose={() => {
          setAlertModalOpen(false);
          setAlertErrors({});
        }}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>
          🔔 Company Job Alert
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Typography sx={{ fontSize: 12.5, color: '#6B7280' }}>
              Select target companies and receive instant email digests whenever they publish openings.
            </Typography>
            <TextField
              label="Target Company *"
              placeholder="e.g. Google, Microsoft, Zoho"
              value={alertCompany}
              onChange={(e) => {
                setAlertCompany(e.target.value);
                if (alertErrors.company) setAlertErrors({ ...alertErrors, company: '' });
              }}
              error={Boolean(alertErrors.company)}
              helperText={alertErrors.company}
              fullWidth
              size="small"
            />
            <TextField
              label="Email Address *"
              type="email"
              value={alertEmail}
              onChange={(e) => {
                setAlertEmail(e.target.value);
                if (alertErrors.email) setAlertErrors({ ...alertErrors, email: '' });
              }}
              error={Boolean(alertErrors.email)}
              helperText={alertErrors.email}
              fullWidth
              size="small"
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => {
              setAlertModalOpen(false);
              setAlertErrors({});
            }}
            sx={{ textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              const errors = {};
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!alertCompany.trim()) {
                errors.company = 'Company is required';
              } else if (alertCompany.trim().length < 3) {
                errors.company = 'Company must be at least 3 characters';
              }

              if (!alertEmail.trim()) {
                errors.email = 'Email Address is required';
              } else if (!emailRegex.test(alertEmail.trim())) {
                errors.email = 'Must be a valid email address';
              }

              if (Object.keys(errors).length > 0) {
                setAlertErrors(errors);
                setSnackbar({ open: true, message: 'Please correct the validation errors', severity: 'error' });
                return;
              }

              setAlertModalOpen(false);
              setAlertErrors({});
              setSnackbar({ open: true, message: `Company alert active for ${alertCompany.trim()}! You will be notified of new openings.`, severity: 'success' });
            }}
            sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 700, borderRadius: '8px' }}
          >
            Activate Alert
          </Button>
        </DialogActions>
      </Dialog>

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

