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
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

// icons
import DownOutlined from '@ant-design/icons/DownOutlined';
import BellOutlined from '@ant-design/icons/BellOutlined';
import BookOutlined from '@ant-design/icons/BookOutlined';
import ShopOutlined from '@ant-design/icons/ShopOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import HomeOutlined from '@ant-design/icons/HomeOutlined';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import ToolOutlined from '@ant-design/icons/ToolOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import CameraOutlined from '@ant-design/icons/CameraOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EnvironmentOutlined from '@ant-design/icons/EnvironmentOutlined';
import MailOutlined from '@ant-design/icons/MailOutlined';
import PhoneOutlined from '@ant-design/icons/PhoneOutlined';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CopyOutlined from '@ant-design/icons/CopyOutlined';
import MoreOutlined from '@ant-design/icons/MoreOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import UploadOutlined from '@ant-design/icons/UploadOutlined';
import CrownOutlined from '@ant-design/icons/CrownOutlined';
import GlobalOutlined from '@ant-design/icons/GlobalOutlined';
import GithubOutlined from '@ant-design/icons/GithubOutlined';
import LinkedinFilled from '@ant-design/icons/LinkedinFilled';
import TwitterOutlined from '@ant-design/icons/TwitterOutlined';

// assets
import avatarCandidate from 'assets/images/users/avatar-1.png';

export default function Candidate() {
  const navigate = useNavigate();

  // Active Tabs
  const [activeNavTab, setActiveNavTab] = useState('profile');
  const [activeProfileTab, setActiveProfileTab] = useState('personal');

  // Candidate Data State
  const [personalInfo, setPersonalInfo] = useState({
    name: 'Candidate',
    role: 'Software Engineer',
    location: 'Bengaluru, Karnataka',
    email: 'candidate@example.com',
    phone: '+91 98765 43210',
    dob: '05 Jul 1997',
    gender: 'Male',
    linkedin: 'https://www.linkedin.com/in/candidate',
    bio: 'Experienced software engineer with a passion for building scalable web applications. Skilled in React, Node.js and cloud technologies.'
  });

  const [aboutMe, setAboutMe] = useState(
    'Experienced software engineer with 4+ years of experience in developing web applications. Passionate about creating user-friendly products and solving real-world problems. Looking for new opportunities to grow and contribute to innovative teams.'
  );

  const [skillsList, setSkillsList] = useState([
    'React', 'Node.js', 'JavaScript', 'PHP', 'Python',
    'MySQL', 'AWS', 'Docker', 'Kubernetes', 'Git'
  ]);

  const [careerPref, setCareerPref] = useState({
    jobType: 'Full Time',
    locations: 'Bengaluru, Hyderabad, Remote',
    salary: '₹ 12 - 18 LPA',
    noticePeriod: '30 Days',
    workMode: 'Hybrid'
  });

  const [socialLinks, setSocialLinks] = useState({
    linkedin: 'https://www.linkedin.com/in/candidate',
    github: 'https://github.com/candidate',
    portfolio: 'https://candidate.dev',
    twitter: 'https://twitter.com/candidate'
  });

  const [visibility, setVisibility] = useState(true);
  const [allowContact, setAllowContact] = useState(true);

  // Dialogs & Menus
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [editPersonalOpen, setEditPersonalOpen] = useState(false);
  const [personalErrors, setPersonalErrors] = useState({});
  const [editAboutOpen, setEditAboutOpen] = useState(false);
  const [editSkillsOpen, setEditSkillsOpen] = useState(false);
  const [editPrefOpen, setEditPrefOpen] = useState(false);
  const [editSocialOpen, setEditSocialOpen] = useState(false);
  const [previewProfileOpen, setPreviewProfileOpen] = useState(false);
  const [uploadResumeOpen, setUploadResumeOpen] = useState(false);
  const [proModalOpen, setProModalOpen] = useState(false);
  const [newSkillInput, setNewSkillInput] = useState('');

  // Snackbar
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Copy Profile URL
  const handleCopyUrl = () => {
    navigator.clipboard?.writeText('https://jobs.traceu.in/in/candidate');
    setSnackbar({ open: true, message: 'Profile URL copied to clipboard!', severity: 'success' });
  };

  // Add skill
  const handleAddSkill = () => {
    if (newSkillInput.trim() && !skillsList.includes(newSkillInput.trim())) {
      setSkillsList([...skillsList, newSkillInput.trim()]);
      setNewSkillInput('');
    }
  };

  // Remove skill
  const handleRemoveSkill = (skill) => {
    setSkillsList(skillsList.filter((s) => s !== skill));
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
            onClick={() => setSnackbar({ open: true, message: 'Recruiters from Google and Microsoft viewed your profile!', severity: 'info' })}
            sx={{ color: '#4B5563', '&:hover': { color: '#530EF0', bgcolor: '#F3EDFF' } }}
          >
            <Badge badgeContent={3} color="error" sx={{ '& .MuiBadge-badge': { fontSize: 10, height: 16, minWidth: 16 } }}>
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
            <MenuItem onClick={() => { setProfileAnchor(null); setPreviewProfileOpen(true); }} sx={{ fontSize: 13, py: 1 }}>
              <UserOutlined style={{ marginRight: 10, color: '#530EF0' }} /> View Public Profile
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
      {/* 2. MAIN LAYOUT: LEFT SIDEBAR + MAIN PROFILE CONTENT                       */}
      {/* ========================================================================= */}
      <Box sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 2, sm: 3, md: 5 }, py: 3.5 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="flex-start">
          {/* ===================================================================== */}
          {/* LEFT SIDEBAR NAVIGATION DRAWER (230px)                                */}
          {/* ===================================================================== */}
          <Box sx={{ width: { xs: '100%', md: 230 }, flexShrink: 0 }}>
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
              {/* User Mini Profile Header */}
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2, pb: 2, borderBottom: '1px solid #F1F5F9' }}>
                <Avatar src={avatarCandidate} sx={{ width: 44, height: 44 }} />
                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={{ fontWeight: 800, fontSize: 14, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {personalInfo.name}
                  </Typography>
                  <Typography sx={{ fontSize: 11.5, color: '#6B7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {personalInfo.role}
                  </Typography>
                  <Typography
                    onClick={() => setPreviewProfileOpen(true)}
                    sx={{ fontSize: 11, fontWeight: 700, color: '#530EF0', cursor: 'pointer', mt: 0.25, '&:hover': { textDecoration: 'underline' } }}
                  >
                    View Public Profile →
                  </Typography>
                </Box>
              </Stack>

              {/* Navigation Items */}
              <Stack spacing={0.6}>
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: <HomeOutlined />, path: '/candidate/jobs' },
                  { id: 'profile', label: 'My Profile', icon: <UserOutlined />, active: true },
                  { id: 'applied', label: 'Applied Jobs', icon: <FileTextOutlined />, action: () => setSnackbar({ open: true, message: 'Showing 8 submitted applications', severity: 'info' }) },
                  { id: 'saved-jobs', label: 'Saved Jobs', icon: <BookOutlined />, path: '/candidate/saved' },
                  { id: 'saved-companies', label: 'Saved Companies', icon: <ShopOutlined />, path: '/candidate/companies' },
                  { id: 'job-alerts', label: 'Job Alerts', icon: <BellOutlined />, action: () => setSnackbar({ open: true, message: '4 active job alerts configured', severity: 'info' }) },
                  { id: 'interviews', label: 'Interview Schedule', icon: <CalendarOutlined />, action: () => setSnackbar({ open: true, message: 'Next interview: Google Technical Round on Nov 18', severity: 'info' }) },
                  { id: 'messages', label: 'Messages', icon: <MessageOutlined />, action: () => setSnackbar({ open: true, message: '2 unread recruiter messages', severity: 'info' }) },
                  { id: 'resume-builder', label: 'Resume Builder', icon: <FileTextOutlined />, path: '/candidate/career-tools' },
                  { id: 'career-tools', label: 'Career Tools', icon: <ToolOutlined />, path: '/candidate/career-tools' },
                  { id: 'settings', label: 'Settings', icon: <SettingOutlined />, action: () => setSnackbar({ open: true, message: 'Candidate account settings', severity: 'info' }) }
                ].map((item) => {
                  const isActive = item.active || activeNavTab === item.id;

                  return (
                    <Stack
                      key={item.id}
                      direction="row"
                      alignItems="center"
                      spacing={1.5}
                      onClick={() => {
                        setActiveNavTab(item.id);
                        if (item.path) navigate(item.path);
                        if (item.action) item.action();
                      }}
                      sx={{
                        px: 1.5,
                        py: 1,
                        borderRadius: '10px',
                        cursor: 'pointer',
                        bgcolor: isActive ? '#F3EDFF' : 'transparent',
                        color: isActive ? '#530EF0' : '#4B5563',
                        position: 'relative',
                        transition: 'all 0.15s ease',
                        '&:hover': {
                          bgcolor: '#F8F9FE',
                          color: '#530EF0'
                        }
                      }}
                    >
                      {isActive && (
                        <Box
                          sx={{
                            position: 'absolute',
                            left: 0,
                            top: '15%',
                            bottom: '15%',
                            width: 3.5,
                            bgcolor: '#530EF0',
                            borderRadius: '0 4px 4px 0'
                          }}
                        />
                      )}
                      {React.cloneElement(item.icon, { style: { fontSize: 15 } })}
                      <Typography sx={{ fontSize: 13, fontWeight: isActive ? 700 : 500 }}>
                        {item.label}
                      </Typography>
                    </Stack>
                  );
                })}

                <Divider sx={{ my: 1 }} />

                {/* Logout */}
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1.5}
                  onClick={() => navigate('/candidate/login')}
                  sx={{
                    px: 1.5,
                    py: 1,
                    borderRadius: '10px',
                    cursor: 'pointer',
                    color: '#EF4444',
                    '&:hover': { bgcolor: '#FEE2E2' }
                  }}
                >
                  <LogoutOutlined style={{ fontSize: 15 }} />
                  <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                    Logout
                  </Typography>
                </Stack>
              </Stack>
            </Card>
          </Box>

          {/* ===================================================================== */}
          {/* MAIN COLUMN: MY PROFILE SHOWCASE & TABBED CONTENT                     */}
          {/* ===================================================================== */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Header with 3D Card Graphic & Callout */}
            <Box
              sx={{
                bgcolor: '#FFFFFF',
                borderRadius: '18px',
                border: '1px solid #F1F5F9',
                p: { xs: 2.5, md: 3.5 },
                mb: 3,
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" spacing={3}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h1" sx={{ fontSize: { xs: 26, sm: 30 }, fontWeight: 800, color: '#111827', mb: 0.5 }}>
                    My Profile
                  </Typography>
                  <Typography sx={{ fontSize: 13.5, color: '#6B7280' }}>
                    Keep your profile updated to get better job recommendations
                  </Typography>
                </Box>

                {/* Right Callout Banner with 3D ID Badge */}
                <Stack direction="row" spacing={2} alignItems="center" sx={{ display: { xs: 'none', lg: 'flex' } }}>
                  {/* 3D ID Badge Graphic */}
                  <Box
                    sx={{
                      width: 140,
                      height: 80,
                      bgcolor: '#FFFFFF',
                      borderRadius: '10px',
                      border: '1.5px solid #E9D5FF',
                      boxShadow: '0 8px 24px rgba(83, 14, 240, 0.12)',
                      p: 1.25,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.25,
                      transform: 'rotate(-4deg)'
                    }}
                  >
                    <Box sx={{ width: 34, height: 34, borderRadius: '50%', bgcolor: '#EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#530EF0', fontSize: 16 }}>
                      👤
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ width: 45, height: 4, bgcolor: '#530EF0', mb: 0.5, borderRadius: '2px' }} />
                      <Box sx={{ width: '85%', height: 3, bgcolor: '#CBD5E1', mb: 0.5, borderRadius: '2px' }} />
                      <Box sx={{ width: '60%', height: 3, bgcolor: '#CBD5E1', borderRadius: '2px' }} />
                    </Box>
                  </Box>

                  {/* Handwritten Note */}
                  <Typography
                    sx={{
                      
                      fontSize: 15,
                      fontWeight: 700,
                      color: '#7C3AED',
                      lineHeight: 1.25,
                      transform: 'rotate(4deg)'
                    }}
                  >
                    ✨ A complete profile <br />
                    can get you 3x more <br />
                    opportunities! 💫
                  </Typography>
                </Stack>
              </Stack>
            </Box>

            {/* Candidate Identity Profile Hero Card */}
            <Card
              elevation={0}
              sx={{
                p: { xs: 2.5, md: 3.5 },
                borderRadius: '18px',
                border: '1px solid #F1F5F9',
                bgcolor: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                mb: 3
              }}
            >
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems={{ xs: 'flex-start', sm: 'center' }} justifyContent="space-between">
                <Stack direction="row" spacing={2.5} alignItems="center">
                  {/* Avatar with Camera Icon Overlay */}
                  <Box sx={{ position: 'relative' }}>
                    <Avatar src={avatarCandidate} sx={{ width: 84, height: 84, border: '3px solid #F3EDFF' }} />
                    <IconButton
                      size="small"
                      onClick={() => setSnackbar({ open: true, message: 'Upload new avatar photo', severity: 'info' })}
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        bgcolor: '#530EF0',
                        color: '#FFF',
                        width: 26,
                        height: 26,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                        '&:hover': { bgcolor: '#420bc2' }
                      }}
                    >
                      <CameraOutlined style={{ fontSize: 13 }} />
                    </IconButton>
                  </Box>

                  {/* Bio & Details */}
                  <Box>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography sx={{ fontWeight: 800, fontSize: 20, color: '#111827' }}>
                        {personalInfo.name}
                      </Typography>
                      <IconButton size="small" onClick={() => setEditPersonalOpen(true)} sx={{ color: '#530EF0' }}>
                        <EditOutlined style={{ fontSize: 13 }} />
                      </IconButton>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 0.25 }}>
                      <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#530EF0' }}>
                        {personalInfo.role}
                      </Typography>
                      <IconButton size="small" onClick={() => setEditPersonalOpen(true)} sx={{ color: '#530EF0' }}>
                        <EditOutlined style={{ fontSize: 12 }} />
                      </IconButton>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={2} flexWrap="wrap" useFlexGap sx={{ mt: 1, color: '#6B7280', fontSize: 12.5 }}>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <EnvironmentOutlined style={{ fontSize: 12 }} />
                        <Typography sx={{ fontSize: 'inherit' }}>{personalInfo.location}</Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <MailOutlined style={{ fontSize: 12 }} />
                        <Typography sx={{ fontSize: 'inherit' }}>{personalInfo.email}</Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <PhoneOutlined style={{ fontSize: 12 }} />
                        <Typography sx={{ fontSize: 'inherit' }}>{personalInfo.phone}</Typography>
                      </Stack>
                    </Stack>

                    <Typography sx={{ fontSize: 12.5, color: '#4B5563', mt: 1, maxWidth: 640 }}>
                      {personalInfo.bio}
                    </Typography>
                  </Box>
                </Stack>

                {/* Preview Profile Button */}
                <Button
                  variant="contained"
                  startIcon={<EyeOutlined />}
                  onClick={() => setPreviewProfileOpen(true)}
                  sx={{
                    bgcolor: '#530EF0',
                    color: '#FFF',
                    fontWeight: 700,
                    fontSize: 13,
                    px: 2.5,
                    py: 1,
                    borderRadius: '8px',
                    textTransform: 'none',
                    boxShadow: '0 4px 12px rgba(83, 14, 240, 0.25)',
                    whiteSpace: 'nowrap',
                    alignSelf: { xs: 'stretch', sm: 'flex-start' },
                    '&:hover': { bgcolor: '#420bc2' }
                  }}
                >
                  Preview Profile
                </Button>
              </Stack>
            </Card>

            {/* Profile Navigation Tabs */}
            <Box sx={{ borderBottom: '1px solid #E5E7EB', mb: 3 }}>
              <Stack direction="row" spacing={3} sx={{ overflowX: 'auto', pb: 0.5 }}>
                {[
                  { id: 'personal', label: 'Personal Information', icon: '👤' },
                  { id: 'education', label: 'Education', icon: '🎓' },
                  { id: 'experience', label: 'Work Experience', icon: '💼' },
                  { id: 'skills', label: 'Skills', icon: '⚙️' },
                  { id: 'preferences', label: 'Preferences', icon: '🎯' },
                  { id: 'documents', label: 'Documents', icon: '📄' }
                ].map((tab) => {
                  const isActive = activeProfileTab === tab.id;

                  return (
                    <Box
                      key={tab.id}
                      onClick={() => setActiveProfileTab(tab.id)}
                      sx={{
                        pb: 1.5,
                        cursor: 'pointer',
                        borderBottom: isActive ? '3px solid #530EF0' : '3px solid transparent',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <Typography sx={{ fontWeight: isActive ? 700 : 500, fontSize: 13.5, color: isActive ? '#530EF0' : '#4B5563', whiteSpace: 'nowrap' }}>
                        {tab.icon} {tab.label}
                      </Typography>
                    </Box>
                  );
                })}
              </Stack>
            </Box>

            {/* Content Area: 2 Columns below Tabs */}
            <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3} alignItems="flex-start">
              {/* Left Sub-Column: 6 Profile Cards Grid */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Stack spacing={2.5}>
                  {/* Row 1: Personal Information & About Me */}
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5}>
                    {/* Card 1: Personal Information */}
                    <Card
                      elevation={0}
                      sx={{
                        flex: 1,
                        p: 2.5,
                        borderRadius: '16px',
                        border: '1px solid #F1F5F9',
                        bgcolor: '#FFFFFF',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                      }}
                    >
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <UserOutlined style={{ color: '#530EF0', fontSize: 15 }} />
                          <Typography sx={{ fontWeight: 800, fontSize: 14.5, color: '#111827' }}>
                            Personal Information
                          </Typography>
                        </Stack>
                        <Button
                          size="small"
                          startIcon={<EditOutlined style={{ fontSize: 11 }} />}
                          onClick={() => setEditPersonalOpen(true)}
                          sx={{ textTransform: 'none', color: '#530EF0', fontWeight: 700, fontSize: 12 }}
                        >
                          Edit
                        </Button>
                      </Stack>

                      <Stack spacing={1.25}>
                        {[
                          { label: 'Full Name', val: personalInfo.name },
                          { label: 'Email Address', val: personalInfo.email },
                          { label: 'Phone Number', val: personalInfo.phone },
                          { label: 'Current Location', val: personalInfo.location },
                          { label: 'Date of Birth', val: personalInfo.dob },
                          { label: 'Gender', val: personalInfo.gender },
                          { label: 'LinkedIn Profile', val: personalInfo.linkedin, isLink: true }
                        ].map((row) => (
                          <Box key={row.label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{ fontSize: 12.5, color: '#6B7280', width: '40%' }}>{row.label}</Typography>
                            <Box sx={{ width: '60%', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 0.5 }}>
                              {row.isLink ? (
                                <Typography
                                  component="a"
                                  href={row.val}
                                  target="_blank"
                                  sx={{ fontSize: 12.5, color: '#530EF0', textDecoration: 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 170 }}
                                >
                                  {row.val}
                                </Typography>
                              ) : (
                                <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: '#111827' }}>{row.val}</Typography>
                              )}
                              <EditOutlined style={{ fontSize: 10, color: '#9CA3AF' }} />
                            </Box>
                          </Box>
                        ))}
                      </Stack>
                    </Card>

                    {/* Card 2: About Me */}
                    <Card
                      elevation={0}
                      sx={{
                        flex: 1,
                        p: 2.5,
                        borderRadius: '16px',
                        border: '1px solid #F1F5F9',
                        bgcolor: '#FFFFFF',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <FileTextOutlined style={{ color: '#530EF0', fontSize: 15 }} />
                          <Typography sx={{ fontWeight: 800, fontSize: 14.5, color: '#111827' }}>
                            About Me
                          </Typography>
                        </Stack>
                        <Button
                          size="small"
                          startIcon={<EditOutlined style={{ fontSize: 11 }} />}
                          onClick={() => setEditAboutOpen(true)}
                          sx={{ textTransform: 'none', color: '#530EF0', fontWeight: 700, fontSize: 12 }}
                        >
                          Edit
                        </Button>
                      </Stack>

                      <Typography sx={{ fontSize: 13, color: '#4B5563', lineHeight: 1.7, flex: 1 }}>
                        {aboutMe}
                      </Typography>
                    </Card>
                  </Stack>

                  {/* Row 2: Resume & Skills */}
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5}>
                    {/* Card 3: Resume */}
                    <Card
                      elevation={0}
                      sx={{
                        flex: 1,
                        p: 2.5,
                        borderRadius: '16px',
                        border: '1px solid #F1F5F9',
                        bgcolor: '#FFFFFF',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                      }}
                    >
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <FileTextOutlined style={{ color: '#530EF0', fontSize: 15 }} />
                          <Typography sx={{ fontWeight: 800, fontSize: 14.5, color: '#111827' }}>
                            Resume
                          </Typography>
                        </Stack>
                        <Button
                          size="small"
                          startIcon={<PlusOutlined style={{ fontSize: 11 }} />}
                          onClick={() => setUploadResumeOpen(true)}
                          sx={{ textTransform: 'none', color: '#530EF0', fontWeight: 700, fontSize: 12 }}
                        >
                          + Upload New
                        </Button>
                      </Stack>

                      <Box
                        sx={{
                          p: 2,
                          borderRadius: '12px',
                          border: '1px solid #E2E8F0',
                          bgcolor: '#F8F9FE',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Box sx={{ width: 34, height: 38, borderRadius: '4px', bgcolor: '#EF4444', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 10 }}>
                            PDF
                          </Box>
                          <Box>
                            <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#111827' }}>
                              Candidate_Resume.pdf
                            </Typography>
                            <Typography sx={{ fontSize: 11, color: '#6B7280' }}>
                              Uploaded on 10 Oct 2026 • 1.2 MB
                            </Typography>
                          </Box>
                        </Stack>
                        <IconButton size="small" onClick={() => setSnackbar({ open: true, message: 'Resume downloaded', severity: 'info' })}>
                          <MoreOutlined />
                        </IconButton>
                      </Box>
                    </Card>

                    {/* Card 4: Skills */}
                    <Card
                      elevation={0}
                      sx={{
                        flex: 1,
                        p: 2.5,
                        borderRadius: '16px',
                        border: '1px solid #F1F5F9',
                        bgcolor: '#FFFFFF',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                      }}
                    >
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <SettingOutlined style={{ color: '#530EF0', fontSize: 15 }} />
                          <Typography sx={{ fontWeight: 800, fontSize: 14.5, color: '#111827' }}>
                            Skills
                          </Typography>
                        </Stack>
                        <Button
                          size="small"
                          startIcon={<EditOutlined style={{ fontSize: 11 }} />}
                          onClick={() => setEditSkillsOpen(true)}
                          sx={{ textTransform: 'none', color: '#530EF0', fontWeight: 700, fontSize: 12 }}
                        >
                          Edit
                        </Button>
                      </Stack>

                      <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1}>
                        {skillsList.map((skill) => (
                          <Chip
                            key={skill}
                            label={skill}
                            size="small"
                            sx={{
                              bgcolor: '#F3EDFF',
                              color: '#530EF0',
                              fontSize: 12,
                              fontWeight: 600,
                              borderRadius: '6px'
                            }}
                          />
                        ))}
                      </Stack>
                    </Card>
                  </Stack>

                  {/* Row 3: Career Preferences & Social Links */}
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5}>
                    {/* Card 5: Career Preferences */}
                    <Card
                      elevation={0}
                      sx={{
                        flex: 1,
                        p: 2.5,
                        borderRadius: '16px',
                        border: '1px solid #F1F5F9',
                        bgcolor: '#FFFFFF',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                      }}
                    >
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <ShopOutlined style={{ color: '#530EF0', fontSize: 15 }} />
                          <Typography sx={{ fontWeight: 800, fontSize: 14.5, color: '#111827' }}>
                            Career Preferences
                          </Typography>
                        </Stack>
                        <Button
                          size="small"
                          startIcon={<EditOutlined style={{ fontSize: 11 }} />}
                          onClick={() => setEditPrefOpen(true)}
                          sx={{ textTransform: 'none', color: '#530EF0', fontWeight: 700, fontSize: 12 }}
                        >
                          Edit
                        </Button>
                      </Stack>

                      <Stack spacing={1.25}>
                        {[
                          { label: 'Preferred Job Type', val: careerPref.jobType },
                          { label: 'Preferred Locations', val: careerPref.locations },
                          { label: 'Expected Salary', val: careerPref.salary },
                          { label: 'Notice Period', val: careerPref.noticePeriod },
                          { label: 'Work Mode', val: careerPref.workMode }
                        ].map((row) => (
                          <Box key={row.label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{ fontSize: 12.5, color: '#6B7280' }}>{row.label}</Typography>
                            <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: '#111827' }}>{row.val}</Typography>
                          </Box>
                        ))}
                      </Stack>
                    </Card>

                    {/* Card 6: Social Links */}
                    <Card
                      elevation={0}
                      sx={{
                        flex: 1,
                        p: 2.5,
                        borderRadius: '16px',
                        border: '1px solid #F1F5F9',
                        bgcolor: '#FFFFFF',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                      }}
                    >
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <GlobalOutlined style={{ color: '#530EF0', fontSize: 15 }} />
                          <Typography sx={{ fontWeight: 800, fontSize: 14.5, color: '#111827' }}>
                            Social Links
                          </Typography>
                        </Stack>
                        <Button
                          size="small"
                          startIcon={<EditOutlined style={{ fontSize: 11 }} />}
                          onClick={() => setEditSocialOpen(true)}
                          sx={{ textTransform: 'none', color: '#530EF0', fontWeight: 700, fontSize: 12 }}
                        >
                          Edit
                        </Button>
                      </Stack>

                      <Stack spacing={1.25}>
                        {[
                          { icon: <LinkedinFilled style={{ color: '#0A66C2' }} />, label: 'LinkedIn', url: socialLinks.linkedin },
                          { icon: <GithubOutlined style={{ color: '#111827' }} />, label: 'GitHub', url: socialLinks.github },
                          { icon: <GlobalOutlined style={{ color: '#10B981' }} />, label: 'Portfolio', url: socialLinks.portfolio },
                          { icon: <TwitterOutlined style={{ color: '#1DA1F2' }} />, label: 'Twitter (X)', url: socialLinks.twitter }
                        ].map((item) => (
                          <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Stack direction="row" spacing={1} alignItems="center">
                              {item.icon}
                              <Typography sx={{ fontSize: 12.5, color: '#6B7280' }}>{item.label}</Typography>
                            </Stack>
                            <Typography
                              component="a"
                              href={item.url}
                              target="_blank"
                              sx={{ fontSize: 12.5, color: '#530EF0', textDecoration: 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 170 }}
                            >
                              {item.url}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>
                    </Card>
                  </Stack>
                </Stack>
              </Box>

              {/* Right Sub-Column: 4 Widgets (320px) */}
              <Box sx={{ width: { xs: '100%', lg: 320 }, flexShrink: 0 }}>
                <Stack spacing={2.5}>
                  {/* Widget 1: Profile Completion */}
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
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                      <Typography sx={{ fontWeight: 800, fontSize: 15, color: '#111827' }}>
                        Profile Completion
                      </Typography>
                      <Typography sx={{ fontWeight: 800, fontSize: 15, color: '#10B981' }}>
                        80%
                      </Typography>
                    </Stack>

                    <LinearProgress
                      variant="determinate"
                      value={80}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: '#E5E7EB',
                        mb: 2.5,
                        '& .MuiLinearProgress-bar': { bgcolor: '#10B981' }
                      }}
                    />

                    <Stack spacing={1.25}>
                      {[
                        { label: 'Personal Information', completed: true },
                        { label: 'Education Details', completed: true },
                        { label: 'Work Experience', completed: true },
                        { label: 'Skills', completed: true },
                        { label: 'Resume Upload', completed: true },
                        { label: 'Career Preferences', completed: false, action: 'Complete' },
                        { label: 'Add Profile Summary', completed: false }
                      ].map((item) => (
                        <Stack key={item.label} direction="row" justifyContent="space-between" alignItems="center">
                          <Stack direction="row" spacing={1} alignItems="center">
                            {item.completed ? (
                              <CheckCircleFilled style={{ color: '#10B981', fontSize: 14 }} />
                            ) : (
                              <Box sx={{ width: 14, height: 14, borderRadius: '50%', border: '1.5px solid #CBD5E1' }} />
                            )}
                            <Typography sx={{ fontSize: 12.5, color: item.completed ? '#374151' : '#6B7280' }}>
                              {item.label}
                            </Typography>
                          </Stack>
                          {item.action && (
                            <Typography
                              onClick={() => setEditPrefOpen(true)}
                              sx={{ fontSize: 11.5, fontWeight: 700, color: '#530EF0', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                            >
                              {item.action}
                            </Typography>
                          )}
                        </Stack>
                      ))}
                    </Stack>
                  </Card>

                  {/* Widget 2: Get More Opportunities */}
                  <Card
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, #F3EDFF 0%, #FAF5FF 100%)',
                      border: '1px solid #E9D5FF',
                      boxShadow: '0 4px 16px rgba(83, 14, 240, 0.05)',
                      position: 'relative'
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
                      <Box>
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                          <CrownOutlined style={{ fontSize: 16, color: '#7C3AED' }} />
                          <Typography sx={{ fontWeight: 800, fontSize: 15, color: '#111827' }}>
                            Get More Opportunities
                          </Typography>
                        </Stack>
                        <Typography sx={{ fontSize: 12, color: '#6B7280', lineHeight: 1.45 }}>
                          Upgrade to TraceU Pro for priority access, AI insights and premium job recommendations.
                        </Typography>
                      </Box>
                      <Box sx={{ fontSize: 24 }}>👑</Box>
                    </Stack>

                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => setProModalOpen(true)}
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
                      Upgrade to Pro
                    </Button>
                  </Card>

                  {/* Widget 3: Your Profile Visibility */}
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
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <EyeOutlined style={{ color: '#530EF0', fontSize: 15 }} />
                        <Typography sx={{ fontWeight: 800, fontSize: 14.5, color: '#111827' }}>
                          Your Profile Visibility
                        </Typography>
                      </Stack>
                      <Button
                        size="small"
                        onClick={() => setEditPersonalOpen(true)}
                        sx={{ textTransform: 'none', color: '#530EF0', fontWeight: 700, fontSize: 12 }}
                      >
                        Edit
                      </Button>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                      <Typography sx={{ fontSize: 12, color: '#6B7280' }}>
                        Your profile is currently visible to employers.
                      </Typography>
                      <Switch
                        checked={visibility}
                        onChange={(e) => {
                          setVisibility(e.target.checked);
                          setSnackbar({ open: true, message: e.target.checked ? 'Profile is now visible to recruiters' : 'Profile hidden from employers', severity: 'info' });
                        }}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': { color: '#530EF0' },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#530EF0' }
                        }}
                      />
                    </Stack>

                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={allowContact}
                          onChange={(e) => setAllowContact(e.target.checked)}
                          sx={{ color: '#CBD5E1', '&.Mui-checked': { color: '#530EF0' } }}
                        />
                      }
                      label={<Typography sx={{ fontSize: 12, color: '#374151', fontWeight: 500 }}>Allow recruiters to contact me</Typography>}
                    />
                  </Card>

                  {/* Widget 4: Profile URL */}
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
                    <Typography sx={{ fontWeight: 800, fontSize: 14.5, color: '#111827', mb: 1.5 }}>
                      🔗 Profile URL
                    </Typography>

                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                      <TextField
                        size="small"
                        value="https://jobs.traceu.in/in/candidate"
                        InputProps={{ readOnly: true }}
                        fullWidth
                        sx={{
                          '& input': { fontSize: 11.5, color: '#4B5563', bgcolor: '#F8F9FE', borderRadius: '6px' }
                        }}
                      />
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<CopyOutlined style={{ fontSize: 11 }} />}
                        onClick={handleCopyUrl}
                        sx={{
                          borderColor: '#E5E7EB',
                          color: '#374151',
                          fontWeight: 700,
                          fontSize: 12,
                          textTransform: 'none',
                          whiteSpace: 'nowrap',
                          '&:hover': { borderColor: '#530EF0', color: '#530EF0' }
                        }}
                      >
                        Copy
                      </Button>
                    </Stack>

                    <Typography sx={{ fontSize: 11.5, color: '#9CA3AF' }}>
                      Share this link with recruiters and on social media.
                    </Typography>
                  </Card>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Box>

      {/* ========================================================================= */}
      {/* 3. MODALS & SNACKBAR                                                      */}
      {/* ========================================================================= */}

      {/* Edit Personal Info Dialog */}
      <Dialog
        open={editPersonalOpen}
        onClose={() => {
          setEditPersonalOpen(false);
          setPersonalErrors({});
        }}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>
          ✏️ Edit Personal Information
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Stack spacing={2}>
            <TextField
              label="Full Name *"
              value={personalInfo.name}
              onChange={(e) => {
                setPersonalInfo({ ...personalInfo, name: e.target.value });
                if (personalErrors.name) setPersonalErrors({ ...personalErrors, name: '' });
              }}
              error={Boolean(personalErrors.name)}
              helperText={personalErrors.name}
              fullWidth
              size="small"
            />
            <TextField label="Role Title" value={personalInfo.role} onChange={(e) => setPersonalInfo({ ...personalInfo, role: e.target.value })} fullWidth size="small" />
            <TextField label="Location" value={personalInfo.location} onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })} fullWidth size="small" />
            <TextField
              label="Email *"
              type="email"
              value={personalInfo.email}
              onChange={(e) => {
                setPersonalInfo({ ...personalInfo, email: e.target.value });
                if (personalErrors.email) setPersonalErrors({ ...personalErrors, email: '' });
              }}
              error={Boolean(personalErrors.email)}
              helperText={personalErrors.email}
              fullWidth
              size="small"
            />
            <TextField label="Phone" value={personalInfo.phone} onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })} fullWidth size="small" />
            <TextField label="Date of Birth" value={personalInfo.dob} onChange={(e) => setPersonalInfo({ ...personalInfo, dob: e.target.value })} fullWidth size="small" />
            <TextField label="LinkedIn Profile URL" value={personalInfo.linkedin} onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })} fullWidth size="small" />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => {
              setEditPersonalOpen(false);
              setPersonalErrors({});
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
              if (!personalInfo.name.trim()) {
                errors.name = 'Full Name is required';
              } else if (personalInfo.name.trim().length < 5) {
                errors.name = 'Full Name must be at least 5 characters';
              }

              if (!personalInfo.email.trim()) {
                errors.email = 'Email is required';
              } else if (!emailRegex.test(personalInfo.email.trim())) {
                errors.email = 'Must be a valid email address';
              }

              if (Object.keys(errors).length > 0) {
                setPersonalErrors(errors);
                setSnackbar({ open: true, message: 'Please correct the validation errors', severity: 'error' });
                return;
              }

              setPersonalErrors({});
              setEditPersonalOpen(false);
              setSnackbar({ open: true, message: 'Personal information updated successfully!', severity: 'success' });
            }}
            sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 700, borderRadius: '8px' }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit About Me Dialog */}
      <Dialog open={editAboutOpen} onClose={() => setEditAboutOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}>
        <DialogTitle sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>
          📝 Edit About Me
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <TextField
            multiline
            rows={5}
            label="Professional Summary"
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            fullWidth
            size="small"
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setEditAboutOpen(false)} sx={{ textTransform: 'none' }}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              setEditAboutOpen(false);
              setSnackbar({ open: true, message: 'About Me summary updated!', severity: 'success' });
            }}
            sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 700, borderRadius: '8px' }}
          >
            Save Summary
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Skills Dialog */}
      <Dialog open={editSkillsOpen} onClose={() => setEditSkillsOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}>
        <DialogTitle sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>
          ⚙️ Manage Skills
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={1}>
              <TextField
                placeholder="Add a new skill (e.g. Next.js, Redux)"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                size="small"
                fullWidth
              />
              <Button variant="contained" onClick={handleAddSkill} sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 700 }}>
                Add
              </Button>
            </Stack>
            <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1}>
              {skillsList.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  onDelete={() => handleRemoveSkill(skill)}
                  sx={{ bgcolor: '#F3EDFF', color: '#530EF0', fontWeight: 600 }}
                />
              ))}
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setEditSkillsOpen(false)} sx={{ textTransform: 'none' }}>Done</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Career Preferences Dialog */}
      <Dialog open={editPrefOpen} onClose={() => setEditPrefOpen(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}>
        <DialogTitle sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>
          💼 Edit Career Preferences
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Stack spacing={2}>
            <TextField label="Preferred Job Type" value={careerPref.jobType} onChange={(e) => setCareerPref({ ...careerPref, jobType: e.target.value })} fullWidth size="small" />
            <TextField label="Preferred Locations" value={careerPref.locations} onChange={(e) => setCareerPref({ ...careerPref, locations: e.target.value })} fullWidth size="small" />
            <TextField label="Expected Salary" value={careerPref.salary} onChange={(e) => setCareerPref({ ...careerPref, salary: e.target.value })} fullWidth size="small" />
            <TextField label="Notice Period" value={careerPref.noticePeriod} onChange={(e) => setCareerPref({ ...careerPref, noticePeriod: e.target.value })} fullWidth size="small" />
            <TextField label="Work Mode" value={careerPref.workMode} onChange={(e) => setCareerPref({ ...careerPref, workMode: e.target.value })} fullWidth size="small" />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setEditPrefOpen(false)} sx={{ textTransform: 'none' }}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              setEditPrefOpen(false);
              setSnackbar({ open: true, message: 'Career preferences saved!', severity: 'success' });
            }}
            sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 700, borderRadius: '8px' }}
          >
            Save Preferences
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Social Links Dialog */}
      <Dialog open={editSocialOpen} onClose={() => setEditSocialOpen(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}>
        <DialogTitle sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>
          🔗 Edit Social Links
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Stack spacing={2}>
            <TextField label="LinkedIn" value={socialLinks.linkedin} onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })} fullWidth size="small" />
            <TextField label="GitHub" value={socialLinks.github} onChange={(e) => setSocialLinks({ ...socialLinks, github: e.target.value })} fullWidth size="small" />
            <TextField label="Portfolio" value={socialLinks.portfolio} onChange={(e) => setSocialLinks({ ...socialLinks, portfolio: e.target.value })} fullWidth size="small" />
            <TextField label="Twitter (X)" value={socialLinks.twitter} onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })} fullWidth size="small" />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setEditSocialOpen(false)} sx={{ textTransform: 'none' }}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              setEditSocialOpen(false);
              setSnackbar({ open: true, message: 'Social links updated!', severity: 'success' });
            }}
            sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 700, borderRadius: '8px' }}
          >
            Save Links
          </Button>
        </DialogActions>
      </Dialog>

      {/* Preview Profile Dialog */}
      <Dialog open={previewProfileOpen} onClose={() => setPreviewProfileOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '18px', p: 1 } }}>
        <DialogTitle sx={{ fontWeight: 800, fontSize: 19, color: '#111827' }}>
          🌐 Public Recruiter Profile Preview
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Stack spacing={2.5} alignItems="center" textAlign="center">
            <Avatar src={avatarCandidate} sx={{ width: 90, height: 90, border: '3px solid #530EF0' }} />
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: 20, color: '#111827' }}>
                {personalInfo.name}
              </Typography>
              <Typography sx={{ fontWeight: 600, fontSize: 14, color: '#530EF0' }}>
                {personalInfo.role} • {personalInfo.location}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: 13, color: '#4B5563', maxWidth: 460 }}>
              {aboutMe}
            </Typography>
            <Divider sx={{ width: '100%' }} />
            <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1} justifyContent="center">
              {skillsList.map((s) => (
                <Chip key={s} label={s} size="small" sx={{ bgcolor: '#F3EDFF', color: '#530EF0', fontWeight: 600 }} />
              ))}
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setPreviewProfileOpen(false)} sx={{ textTransform: 'none' }}>Close</Button>
          <Button
            variant="contained"
            onClick={() => {
              handleCopyUrl();
              setPreviewProfileOpen(false);
            }}
            sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 700, borderRadius: '8px' }}
          >
            Copy Public Link
          </Button>
        </DialogActions>
      </Dialog>

      {/* Upload Resume Dialog */}
      <Dialog open={uploadResumeOpen} onClose={() => setUploadResumeOpen(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}>
        <DialogTitle sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>
          📄 Upload New Resume
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Box sx={{ p: 3, border: '2px dashed #CBD5E1', borderRadius: '12px', textAlign: 'center', bgcolor: '#F8F9FE' }}>
            <UploadOutlined style={{ fontSize: 32, color: '#530EF0', marginBottom: 8 }} />
            <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#111827' }}>
              Drag & Drop or Browse
            </Typography>
            <Typography sx={{ fontSize: 11.5, color: '#9CA3AF', mt: 0.5 }}>
              PDF, DOC, DOCX up to 5MB
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setUploadResumeOpen(false)} sx={{ textTransform: 'none' }}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              setUploadResumeOpen(false);
              setSnackbar({ open: true, message: 'New resume uploaded and verified!', severity: 'success' });
            }}
            sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 700, borderRadius: '8px' }}
          >
            Upload Resume
          </Button>
        </DialogActions>
      </Dialog>

      {/* Pro Modal */}
      <Dialog open={proModalOpen} onClose={() => setProModalOpen(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}>
        <DialogTitle sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>
          👑 TraceU Pro Membership
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Typography sx={{ fontSize: 13, color: '#4B5563', mb: 2 }}>
            Get verified recruiter spotlight, auto-apply AI bot, and instant salary comparison reports.
          </Typography>
          <Box sx={{ p: 2, bgcolor: '#F3EDFF', borderRadius: '10px', textAlign: 'center' }}>
            <Typography sx={{ fontSize: 18, fontWeight: 900, color: '#530EF0' }}>
              ₹ 499 / month
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setProModalOpen(false)} sx={{ textTransform: 'none' }}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              setProModalOpen(false);
              setSnackbar({ open: true, message: 'Upgraded to TraceU Pro!', severity: 'success' });
            }}
            sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 700, borderRadius: '8px' }}
          >
            Start Free Trial
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

