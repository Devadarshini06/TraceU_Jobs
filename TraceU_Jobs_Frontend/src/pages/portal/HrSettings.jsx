import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBrand } from 'contexts/BrandContext';
import { PRESET_LOGOS } from 'utils/presetLogos';

// material-ui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';

// icons
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import BankOutlined from '@ant-design/icons/BankOutlined';
import GlobalOutlined from '@ant-design/icons/GlobalOutlined';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import SafetyCertificateOutlined from '@ant-design/icons/SafetyCertificateOutlined';
import BellOutlined from '@ant-design/icons/BellOutlined';
import ApiOutlined from '@ant-design/icons/ApiOutlined';
import ControlOutlined from '@ant-design/icons/ControlOutlined';
import UploadOutlined from '@ant-design/icons/UploadOutlined';
import CopyOutlined from '@ant-design/icons/CopyOutlined';
import ExportOutlined from '@ant-design/icons/ExportOutlined';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import LinkedinFilled from '@ant-design/icons/LinkedinFilled';
import TwitterOutlined from '@ant-design/icons/TwitterOutlined';
import GithubOutlined from '@ant-design/icons/GithubOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import MailOutlined from '@ant-design/icons/MailOutlined';
import PhoneOutlined from '@ant-design/icons/PhoneOutlined';

// avatar assets
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import avatar5 from 'assets/images/users/avatar-5.png';

export default function HrSettings() {
  const navigate = useNavigate();
  const {
    companyName: brandName,
    companyLogo: brandLogo,
    primaryColor: brandPrimary,
    updateBrand
  } = useBrand();

  const hrLogoInputRef = useRef(null);

  // Active top tab
  const [activeTab, setActiveTab] = useState(0);

  // Snackbar notifications
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Company Profile Form State (persisted)
  const [profile, setProfile] = useState(() => {
    try {
      const stored = localStorage.getItem('traceu_hr_profile');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return {
      name: brandName || 'TraceU Technologies',
      industry: 'Information Technology & Services',
      size: '51 - 200 employees',
      website: 'https://jobs.traceu.com',
      email: 'hr@traceu.com',
      phone: '+91 98765 43210',
      address: '#42, 4th Floor, Tech Park Road, Whitefield, Bengaluru, Karnataka 560100',
      about:
        'An enterprise innovation leader delivering next-generation digital cloud platforms and AI-driven talent acquisition solutions worldwide.',
      linkedin: 'https://linkedin.com/company/traceu',
      twitter: 'https://x.com/traceu',
      github: 'https://github.com/traceu'
    };
  });

  const [companyLogoState, setCompanyLogoState] = useState(brandLogo || null);
  const [brandColor, setBrandColor] = useState(brandPrimary || '#530EF0');

  useEffect(() => {
    if (brandName && !localStorage.getItem('traceu_hr_profile')) {
      setProfile((p) => ({ ...p, name: brandName }));
    }
    setCompanyLogoState(brandLogo);
    if (brandPrimary) setBrandColor(brandPrimary);
  }, [brandName, brandLogo, brandPrimary]);

  // Team Members State (persisted)
  const [teamMembers, setTeamMembers] = useState(() => {
    try {
      const stored = localStorage.getItem('traceu_hr_team');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return [
      { id: 1, name: 'HR Manager', email: 'hr@traceu.com', role: 'HR Admin', status: 'Active', avatar: avatar1 },
      { id: 2, name: 'Priya Sharma', email: 'priya.sharma@traceu.com', role: 'Recruiter', status: 'Active', avatar: avatar3 },
      { id: 3, name: 'Rahul Kumar', email: 'rahul.k@traceu.com', role: 'Interviewer', status: 'Active', avatar: avatar2 },
      { id: 4, name: 'Sneha Iyer', email: 'sneha.iyer@traceu.com', role: 'Hiring Manager', status: 'Active', avatar: avatar4 },
      { id: 5, name: 'Arjun Nair', email: 'arjun.nair@traceu.com', role: 'Interviewer', status: 'Active', avatar: avatar5 }
    ];
  });

  // Invite member dialog
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', email: '', role: 'Recruiter' });
  const [inviteErrors, setInviteErrors] = useState({});

  // Notification toggles (persisted)
  const [notifications, setNotifications] = useState(() => {
    try {
      const stored = localStorage.getItem('traceu_hr_notifications');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return {
      newApplication: true,
      interviewReminder: true,
      offerAccepted: true,
      weeklyReport: false,
      requisitionStatus: true,
      candidateScoreAlert: true
    };
  });

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(profile.website || 'https://jobs.traceu.com');
    setSnackbar({ open: true, message: 'Careers page URL copied to clipboard!', severity: 'success' });
  };

  const handleSaveProfile = () => {
    try {
      localStorage.setItem('traceu_hr_profile', JSON.stringify(profile));
      localStorage.setItem('traceu_hr_notifications', JSON.stringify(notifications));
      updateBrand({
        companyName: profile.name,
        companyLogo: companyLogoState,
        primaryColor: brandColor
      });
    } catch (e) {
      console.warn(e);
    }
    setSnackbar({ open: true, message: 'Company settings & branding saved successfully!', severity: 'success' });
  };

  const handleDiscardChanges = () => {
    try {
      const stored = localStorage.getItem('traceu_hr_profile');
      if (stored) {
        const parsed = JSON.parse(stored);
        setProfile(parsed);
      }
    } catch (e) {}
    setCompanyLogoState(brandLogo);
    setBrandColor(brandPrimary || '#530EF0');
    setSnackbar({ open: true, message: 'Changes discarded', severity: 'info' });
  };

  const handleHrLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setSnackbar({ open: true, message: 'Logo file size exceeds 2 MB limit', severity: 'error' });
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      setCompanyLogoState(dataUrl);
      updateBrand({ companyLogo: dataUrl });
      setSnackbar({ open: true, message: 'Company logo uploaded and updated successfully!', severity: 'success' });
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPresetLogo = (preset) => {
    setCompanyLogoState(preset.dataUri);
    setBrandColor(preset.primaryColor);
    updateBrand({ companyLogo: preset.dataUri, primaryColor: preset.primaryColor });
    setSnackbar({ open: true, message: `Applied ${preset.name} brand logo!`, severity: 'success' });
  };

  const handleRemoveLogo = () => {
    setCompanyLogoState(null);
    updateBrand({ companyLogo: null });
    if (hrLogoInputRef.current) hrLogoInputRef.current.value = '';
    setSnackbar({ open: true, message: 'Company logo removed, reverted to default', severity: 'info' });
  };

  const handleInviteMember = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newMember.name.trim()) {
      errors.name = 'Full Name is required';
    } else if (newMember.name.trim().length < 5) {
      errors.name = 'Full Name must be at least 5 characters';
    }

    if (!newMember.email.trim()) {
      errors.email = 'Email Address is required';
    } else if (!emailRegex.test(newMember.email.trim())) {
      errors.email = 'Must be a valid email address';
    }

    if (Object.keys(errors).length > 0) {
      setInviteErrors(errors);
      setSnackbar({ open: true, message: 'Please correct the validation errors', severity: 'error' });
      return;
    }

    const updated = [
      ...teamMembers,
      {
        id: Date.now(),
        name: newMember.name.trim(),
        email: newMember.email.trim(),
        role: newMember.role,
        status: 'Active',
        avatar: avatar2
      }
    ];
    setTeamMembers(updated);
    try {
      localStorage.setItem('traceu_hr_team', JSON.stringify(updated));
    } catch (e) {}

    const sentEmail = newMember.email.trim();
    setOpenInviteModal(false);
    setNewMember({ name: '', email: '', role: 'Recruiter' });
    setInviteErrors({});
    setSnackbar({ open: true, message: `Invitation sent to ${sentEmail}!`, severity: 'success' });
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100%', pb: 5 }}>
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.8,
              bgcolor: 'rgba(83, 14, 240, 0.08)',
              color: '#530EF0',
              px: 1.2,
              py: 0.4,
              borderRadius: '8px',
              fontSize: 13,
              fontWeight: 600
            }}
          >
            <SettingOutlined style={{ fontSize: 14 }} />
            Settings
          </Box>
        </Stack>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
          justifyContent="space-between"
          spacing={2}
        >
          <Box>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 700, fontSize: { xs: 22, sm: 24 }, color: '#111827', letterSpacing: '-0.3px',
                
                mb: 0.5
              }}
            >
              Company Settings
            </Typography>
            <Typography sx={{ color: '#6B7280', fontSize: 14, fontWeight: 400, lineHeight: 1.5, mt: 0.5 }}>
              Manage your company profile, branding, team permissions, and recruitment preferences.
            </Typography>
          </Box>

          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Button
              variant="outlined"
              onClick={handleDiscardChanges}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                color: '#334155',
                borderColor: '#E2E8F0',
                bgcolor: '#FFFFFF',
                borderRadius: '8px',
                height: 40,
                minHeight: 40,
                px: 2,
                whiteSpace: 'nowrap',
                '&:hover': { borderColor: '#CBD5E1', bgcolor: '#F8FAFC' }
              }}
            >
              Discard Changes
            </Button>
            <Button
              variant="contained"
              onClick={handleSaveProfile}
              sx={{
                bgcolor: brandColor || '#530EF0',
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: '8px',
                height: 40,
                minHeight: 40,
                px: 2.5,
                whiteSpace: 'nowrap',
                boxShadow: `0 4px 14px ${(brandColor || '#530EF0')}40`,
                '&:hover': { bgcolor: brandColor || '#420bc2' }
              }}
            >
              Save Changes
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* Navigation Subtabs */}
      <Box sx={{ borderBottom: '1px solid #E5E7EB', mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            minHeight: 44,
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: 13.5,
              minHeight: 44,
              px: 2,
              color: '#6B7280',
              '&.Mui-selected': { color: '#530EF0' }
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#530EF0',
              height: 2.5,
              borderRadius: '2px'
            }
          }}
        >
          <Tab icon={<BankOutlined style={{ fontSize: 15 }} />} iconPosition="start" label="Company Profile" />
          <Tab icon={<GlobalOutlined style={{ fontSize: 15 }} />} iconPosition="start" label="Careers Page" />
          <Tab icon={<TeamOutlined style={{ fontSize: 15 }} />} iconPosition="start" label="Team Members" />
          <Tab icon={<SafetyCertificateOutlined style={{ fontSize: 15 }} />} iconPosition="start" label="Roles & Permissions" />
          <Tab icon={<BellOutlined style={{ fontSize: 15 }} />} iconPosition="start" label="Notifications" />
          <Tab icon={<ApiOutlined style={{ fontSize: 15 }} />} iconPosition="start" label="Integrations" />
          <Tab icon={<ControlOutlined style={{ fontSize: 15 }} />} iconPosition="start" label="Preferences" />
        </Tabs>
      </Box>

      {/* TAB 0: Company Profile */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          {/* Left Column: Form (65%) */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Stack spacing={3}>
              {/* Section 1: Company Information */}
              <Card
                sx={{
                  p: 3,
                  borderRadius: '16px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  border: '1px solid #F3F4F6'
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827', mb: 0.5 }}>
                  Company Information
                </Typography>
                <Typography variant="body2" sx={{ color: '#6B7280', mb: 2.5 }}>
                  Update your organization details and contact info displayed to candidates.
                </Typography>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151', mb: 0.8 }}>
                      Company Name *
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151', mb: 0.8 }}>
                      Industry
                    </Typography>
                    <Select
                      fullWidth
                      size="small"
                      value={profile.industry}
                      onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
                      sx={{ borderRadius: '8px' }}
                    >
                      <MenuItem value="Information Technology & Services">Information Technology & Services</MenuItem>
                      <MenuItem value="Software & Internet">Software & Internet</MenuItem>
                      <MenuItem value="Financial Services & Fintech">Financial Services & Fintech</MenuItem>
                      <MenuItem value="Healthcare & Life Sciences">Healthcare & Life Sciences</MenuItem>
                      <MenuItem value="E-Commerce & Retail">E-Commerce & Retail</MenuItem>
                    </Select>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151', mb: 0.8 }}>
                      Company Size
                    </Typography>
                    <Select
                      fullWidth
                      size="small"
                      value={profile.size}
                      onChange={(e) => setProfile({ ...profile, size: e.target.value })}
                      sx={{ borderRadius: '8px' }}
                    >
                      <MenuItem value="1 - 10 employees">1 - 10 employees</MenuItem>
                      <MenuItem value="11 - 50 employees">11 - 50 employees</MenuItem>
                      <MenuItem value="51 - 200 employees">51 - 200 employees</MenuItem>
                      <MenuItem value="201 - 500 employees">201 - 500 employees</MenuItem>
                      <MenuItem value="500+ employees">500+ employees</MenuItem>
                    </Select>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151', mb: 0.8 }}>
                      Company Website
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      value={profile.website}
                      onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151', mb: 0.8 }}>
                      Contact Email *
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MailOutlined style={{ color: '#9CA3AF' }} />
                          </InputAdornment>
                        )
                      }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151', mb: 0.8 }}>
                      Contact Phone
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneOutlined style={{ color: '#9CA3AF' }} />
                          </InputAdornment>
                        )
                      }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151', mb: 0.8 }}>
                      Headquarters Address
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      value={profile.address}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151', mb: 0.8 }}>
                      About Company
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      value={profile.about}
                      onChange={(e) => setProfile({ ...profile, about: e.target.value })}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                    />
                  </Grid>
                </Grid>
              </Card>

              {/* Section 2: Brand Assets & Colors */}
              <Card
                sx={{
                  p: 3,
                  borderRadius: '16px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  border: '1px solid #F3F4F6'
                }}
              >
                <input
                  ref={hrLogoInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml,image/webp"
                  style={{ display: 'none' }}
                  onChange={handleHrLogoUpload}
                />

                <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827', mb: 0.5 }}>
                  Brand Identity & Assets
                </Typography>
                <Typography variant="body2" sx={{ color: '#6B7280', mb: 2.5 }}>
                  Customize the logo and branding shown across candidate job portals, headers, and email invites.
                </Typography>

                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151', mb: 1.5 }}>
                      Company Logo
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: '12px',
                          bgcolor: companyLogoState ? '#FFF' : (brandColor || '#530EF0'),
                          color: '#fff',
                          border: '1px solid #E5E7EB',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: 20,
                          letterSpacing: 0.5,
                          overflow: 'hidden',
                          flexShrink: 0
                        }}
                      >
                        {companyLogoState ? (
                          <Box component="img" src={companyLogoState} alt="Logo" sx={{ width: '100%', height: '100%', objectFit: 'contain', p: 0.5 }} />
                        ) : (
                          profile.name ? profile.name.substring(0, 2).toUpperCase() : 'TU'
                        )}
                      </Box>
                      <Stack spacing={1}>
                        <Stack direction="row" spacing={1}>
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<UploadOutlined />}
                            onClick={() => hrLogoInputRef.current?.click()}
                            sx={{
                              textTransform: 'none',
                              fontWeight: 600,
                              borderRadius: '8px',
                              bgcolor: brandColor || '#530EF0',
                              color: '#FFF',
                              '&:hover': { bgcolor: brandColor || '#420bc2' }
                            }}
                          >
                            Upload Logo
                          </Button>
                          {companyLogoState && (
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={handleRemoveLogo}
                              sx={{
                                textTransform: 'none',
                                fontWeight: 600,
                                borderRadius: '8px',
                                color: '#EF4444',
                                borderColor: '#FCA5A5'
                              }}
                            >
                              Remove
                            </Button>
                          )}
                        </Stack>
                        <Typography variant="caption" sx={{ color: '#9CA3AF' }}>
                          PNG, JPG, SVG or WebP (max 2MB)
                        </Typography>
                      </Stack>
                    </Stack>

                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#4B5563', display: 'block', mb: 0.8 }}>
                      Or Pick an Enterprise Preset Logo:
                    </Typography>
                    <Stack direction="row" spacing={0.8} flexWrap="wrap" useFlexGap>
                      {PRESET_LOGOS.map((preset) => (
                        <Chip
                          key={preset.id}
                          clickable
                          onClick={() => handleSelectPresetLogo(preset)}
                          avatar={<Avatar src={preset.dataUri} sx={{ width: 20, height: 20 }} />}
                          label={preset.name}
                          size="small"
                          variant="outlined"
                          sx={{
                            fontSize: 11.5,
                            borderColor: companyLogoState === preset.dataUri ? (brandColor || '#530EF0') : '#E5E7EB',
                            bgcolor: companyLogoState === preset.dataUri ? `${(brandColor || '#530EF0')}15` : '#FFF',
                            fontWeight: companyLogoState === preset.dataUri ? 700 : 500
                          }}
                        />
                      ))}
                    </Stack>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151', mb: 1.5 }}>
                      Brand Primary Color
                    </Typography>
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                      {['#530EF0', '#2563EB', '#059669', '#E11D48', '#0F172A', '#D97706'].map((color) => (
                        <Box
                          key={color}
                          title={color}
                          onClick={() => {
                            setBrandColor(color);
                            updateBrand({ primaryColor: color });
                            setSnackbar({ open: true, message: `Brand color updated to ${color}`, severity: 'success' });
                          }}
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            bgcolor: color,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: brandColor === color ? '3px solid #111827' : '1px solid rgba(0,0,0,0.1)',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            transition: 'transform 0.15s ease',
                            '&:hover': { transform: 'scale(1.15)' }
                          }}
                        >
                          {brandColor === color && <CheckCircleFilled style={{ color: '#fff', fontSize: 16 }} />}
                        </Box>
                      ))}
                    </Stack>

                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#4B5563', display: 'block', mb: 0.8 }}>
                      Custom Color Picker:
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <input
                        type="color"
                        value={brandColor}
                        onChange={(e) => {
                          setBrandColor(e.target.value);
                          updateBrand({ primaryColor: e.target.value });
                        }}
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 8,
                          border: '1px solid #E5E7EB',
                          cursor: 'pointer',
                          padding: 2,
                          backgroundColor: '#FFF'
                        }}
                      />
                      <TextField
                        size="small"
                        value={brandColor}
                        onChange={(e) => {
                          setBrandColor(e.target.value);
                          updateBrand({ primaryColor: e.target.value });
                        }}
                        sx={{ width: 130 }}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Card>

              {/* Section 3: Social Media Links */}
              <Card
                sx={{
                  p: 3,
                  borderRadius: '16px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  border: '1px solid #F3F4F6'
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827', mb: 0.5 }}>
                  Social Media Links
                </Typography>
                <Typography variant="body2" sx={{ color: '#6B7280', mb: 2.5 }}>
                  Displayed on public career openings and job posts.
                </Typography>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151', mb: 0.8 }}>
                      LinkedIn
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      value={profile.linkedin}
                      onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LinkedinFilled style={{ color: '#0A66C2' }} />
                          </InputAdornment>
                        )
                      }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151', mb: 0.8 }}>
                      Twitter / X
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      value={profile.twitter}
                      onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <TwitterOutlined style={{ color: '#1DA1F2' }} />
                          </InputAdornment>
                        )
                      }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151', mb: 0.8 }}>
                      GitHub
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      value={profile.github}
                      onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <GithubOutlined style={{ color: '#24292E' }} />
                          </InputAdornment>
                        )
                      }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                    />
                  </Grid>
                </Grid>
              </Card>
            </Stack>
          </Grid>

          {/* Right Column: Live Careers Preview & Quick Actions (35%) */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Stack spacing={3}>
              {/* Careers Page Live Preview Card */}
              <Card
                sx={{
                  p: 2.5,
                  borderRadius: '16px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  border: '1px solid #F3F4F6',
                  bgcolor: '#ffffff'
                }}
              >
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.5 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#111827' }}>
                    Careers Page Preview
                  </Typography>
                  <Chip
                    label="● Live"
                    size="small"
                    sx={{
                      bgcolor: 'rgba(16, 185, 129, 0.1)',
                      color: '#059669',
                      fontWeight: 700,
                      fontSize: 12
                    }}
                  />
                </Stack>

                <Typography variant="body2" sx={{ color: '#6B7280', fontSize: 13, mb: 2 }}>
                  Candidates visit this link to apply for your active jobs and internships.
                </Typography>

                {/* Browser Mockup Box */}
                <Box
                  sx={{
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    bgcolor: '#F9FAFB',
                    mb: 2
                  }}
                >
                  {/* Browser window header */}
                  <Box
                    sx={{
                      bgcolor: '#F3F4F6',
                      px: 1.5,
                      py: 1,
                      borderBottom: '1px solid #E5E7EB',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.8
                    }}
                  >
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#EF4444' }} />
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#F59E0B' }} />
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10B981' }} />
                    <Box
                      sx={{
                        ml: 1,
                        flex: 1,
                        bgcolor: '#ffffff',
                        px: 1.2,
                        py: 0.3,
                        borderRadius: '6px',
                        fontSize: 12,
                        color: '#6B7280',
                        border: '1px solid #E5E7EB',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      jobs.acmetech.com
                    </Box>
                  </Box>

                  {/* Careers hero banner */}
                  <Box
                    sx={{
                      p: 2.5,
                      background: `linear-gradient(135deg, ${brandColor || '#530EF0'} 0%, #311075 100%)`,
                      color: '#ffffff',
                      textAlign: 'center'
                    }}
                  >
                    {companyLogoState && (
                      <Box
                        component="img"
                        src={companyLogoState}
                        alt="Logo"
                        sx={{ width: 36, height: 36, borderRadius: '8px', objectFit: 'contain', bgcolor: '#FFF', mx: 'auto', mb: 1, p: 0.3 }}
                      />
                    )}
                    <Typography variant="subtitle2" sx={{ opacity: 0.9, fontSize: 12 }}>
                      Careers at {profile.name}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800, mt: 0.5, fontSize: '1rem' }}>
                      Build the Future With Us
                    </Typography>
                    <Chip
                      label="18 Open Roles"
                      size="small"
                      sx={{
                        mt: 1.2,
                        bgcolor: 'rgba(255,255,255,0.2)',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: 11
                      }}
                    />
                  </Box>

                  {/* Sample job card preview */}
                  <Box sx={{ p: 1.5 }}>
                    <Box
                      sx={{
                        p: 1.2,
                        bgcolor: '#ffffff',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB',
                        mb: 1
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 700, fontSize: 13, color: '#111827' }}>
                        Senior Software Engineer
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6B7280' }}>
                        Bengaluru • Full-time • ₹12 - 18 LPA
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        p: 1.2,
                        bgcolor: '#ffffff',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB'
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 700, fontSize: 13, color: '#111827' }}>
                        Product Designer (UI/UX)
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6B7280' }}>
                        Remote • Full-time • ₹10 - 15 LPA
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Stack spacing={1.2}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<CopyOutlined />}
                    onClick={handleCopyLink}
                    sx={{
                      textTransform: 'none',
                      fontWeight: 600,
                      borderRadius: '8px',
                      color: '#530EF0',
                      borderColor: '#E0E7FF'
                    }}
                  >
                    Copy Careers Link
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<ExportOutlined />}
                    onClick={() => window.open('https://jobs.acmetech.com', '_blank')}
                    sx={{
                      bgcolor: '#530EF0',
                      textTransform: 'none',
                      fontWeight: 600,
                      borderRadius: '8px',
                      '&:hover': { bgcolor: '#420bc2' }
                    }}
                  >
                    View Live Careers Page
                  </Button>
                </Stack>
              </Card>

              {/* Quick Actions List */}
              <Card
                sx={{
                  p: 2.5,
                  borderRadius: '16px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  border: '1px solid #F3F4F6'
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#111827', mb: 2 }}>
                  Quick Actions
                </Typography>

                <Stack spacing={1}>
                  {[
                    { label: 'Manage Team Members', tab: 2, icon: <TeamOutlined style={{ color: '#530EF0' }} /> },
                    { label: 'Customize Careers Page', tab: 1, icon: <GlobalOutlined style={{ color: '#059669' }} /> },
                    { label: 'Notification Settings', tab: 4, icon: <BellOutlined style={{ color: '#D97706' }} /> },
                    { label: 'Connected Integrations', tab: 5, icon: <ApiOutlined style={{ color: '#2563EB' }} /> }
                  ].map((item) => (
                    <Box
                      key={item.label}
                      onClick={() => setActiveTab(item.tab)}
                      sx={{
                        p: 1.5,
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        bgcolor: '#F9FAFB',
                        transition: 'all 0.15s ease',
                        '&:hover': { bgcolor: '#F3F4F6', transform: 'translateX(3px)' }
                      }}
                    >
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        {item.icon}
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151' }}>
                          {item.label}
                        </Typography>
                      </Stack>
                      <RightOutlined style={{ fontSize: 12, color: '#9CA3AF' }} />
                    </Box>
                  ))}
                </Stack>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      )}

      {/* TAB 1: Careers Page Settings */}
      {activeTab === 1 && (
        <Card sx={{ p: 3, borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #F3F4F6' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827', mb: 0.5 }}>
            Careers Page Configuration
          </Typography>
          <Typography variant="body2" sx={{ color: '#6B7280', mb: 3 }}>
            Customize your public talent portal hero banner, culture highlight section, and application privacy policy.
          </Typography>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151', mb: 0.8 }}>
                Custom Subdomain URL
              </Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="jobs.acmetech.com"
                InputProps={{
                  startAdornment: <InputAdornment position="start">https://</InputAdornment>
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151', mb: 0.8 }}>
                Careers Page Title
              </Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="Work at Acme Technologies"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151', mb: 0.8 }}>
                Careers Headline & Introduction
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                defaultValue="We are building the next generation of AI and enterprise cloud tools. Discover high-impact career opportunities with a diverse global team."
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={() => setSnackbar({ open: true, message: 'Careers page settings saved!', severity: 'success' })}
              sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 600, borderRadius: '8px', px: 3 }}
            >
              Save Careers Settings
            </Button>
          </Stack>
        </Card>
      )}

      {/* TAB 2: Team Members */}
      {activeTab === 2 && (
        <Card sx={{ p: 3, borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #F3F4F6' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2.5 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827' }}>
                Team Members & Collaborators
              </Typography>
              <Typography variant="body2" sx={{ color: '#6B7280' }}>
                Manage recruiters, hiring managers, and interviewers in your workspace.
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<PlusOutlined />}
              onClick={() => setOpenInviteModal(true)}
              sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 600, borderRadius: '8px', px: 2 }}
            >
              Invite Member
            </Button>
          </Stack>

          <TableContainer sx={{ border: '1px solid #E5E7EB', borderRadius: '12px' }}>
            <Table>
              <TableHead sx={{ bgcolor: '#F9FAFB' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, color: '#4B5563', py: 1.5 }}>Member</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#4B5563', py: 1.5 }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#4B5563', py: 1.5 }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#4B5563', py: 1.5 }}>Status</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: '#4B5563', py: 1.5 }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teamMembers.map((member) => (
                  <TableRow key={member.id} hover>
                    <TableCell sx={{ py: 1.5 }}>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar src={member.avatar} sx={{ width: 32, height: 32 }} />
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827' }}>
                          {member.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell sx={{ py: 1.5, color: '#6B7280', fontSize: 13.5 }}>{member.email}</TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      <Chip
                        label={member.role}
                        size="small"
                        sx={{
                          bgcolor: member.role === 'HR Admin' ? '#F3EBFF' : '#EFF6FF',
                          color: member.role === 'HR Admin' ? '#530EF0' : '#1D4ED8',
                          fontWeight: 600,
                          fontSize: 12
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      <Chip
                        label={member.status}
                        size="small"
                        sx={{ bgcolor: '#ECFDF5', color: '#059669', fontWeight: 600, fontSize: 12 }}
                      />
                    </TableCell>
                    <TableCell align="right" sx={{ py: 1.5 }}>
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <IconButton size="small" onClick={() => setSnackbar({ open: true, message: `Editing permissions for ${member.name}`, severity: 'info' })} sx={{ color: '#6B7280' }}>
                          <EditOutlined style={{ fontSize: 14 }} />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{ color: '#EF4444' }}
                          onClick={() => {
                            const updated = teamMembers.filter((m) => m.id !== member.id);
                            setTeamMembers(updated);
                            try {
                              localStorage.setItem('traceu_hr_team', JSON.stringify(updated));
                            } catch (e) {}
                            setSnackbar({ open: true, message: 'Member removed from team', severity: 'info' });
                          }}
                        >
                          <DeleteOutlined style={{ fontSize: 14 }} />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {/* TAB 3: Roles & Permissions */}
      {activeTab === 3 && (
        <Card sx={{ p: 3, borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #F3F4F6' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827', mb: 0.5 }}>
            Roles & Access Permissions
          </Typography>
          <Typography variant="body2" sx={{ color: '#6B7280', mb: 3 }}>
            Configure default access capabilities across roles for jobs, requisitions, and candidate PII.
          </Typography>

          <Grid container spacing={2.5}>
            {[
              {
                role: 'HR Admin',
                desc: 'Full access to post jobs, manage requisitions, invite members, view analytics, and export candidate data.',
                users: '1 member',
                badge: 'Full Access'
              },
              {
                role: 'Recruiter',
                desc: 'Can create jobs, screen candidates, move stages, schedule interviews, and add candidates to Talent Pool.',
                users: '2 members',
                badge: 'Standard'
              },
              {
                role: 'Hiring Manager',
                desc: 'Can create and approve departmental requisitions, review shortlisted resumes, and submit interview feedback.',
                users: '1 member',
                badge: 'Reviewer'
              },
              {
                role: 'Interviewer',
                desc: 'Can view assigned candidate portfolios, join video interviews, and record scorecards & notes.',
                users: '2 members',
                badge: 'Evaluator'
              }
            ].map((r) => (
              <Grid key={r.role} size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    p: 2.5,
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    bgcolor: '#FFFFFF',
                    '&:hover': { borderColor: '#530EF0' }
                  }}
                >
                  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#111827' }}>
                      {r.role}
                    </Typography>
                    <Chip label={r.badge} size="small" sx={{ bgcolor: '#F3EBFF', color: '#530EF0', fontWeight: 600, fontSize: 12 }} />
                  </Stack>
                  <Typography variant="body2" sx={{ color: '#6B7280', mb: 1.5, minHeight: 40 }}>
                    {r.desc}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#9CA3AF', fontWeight: 600 }}>
                    Assigned to: {r.users}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Card>
      )}

      {/* TAB 4: Notifications */}
      {activeTab === 4 && (
        <Card sx={{ p: 3, borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #F3F4F6' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827', mb: 0.5 }}>
            Email & In-App Notification Alerts
          </Typography>
          <Typography variant="body2" sx={{ color: '#6B7280', mb: 3 }}>
            Choose what recruitment events trigger instant notifications.
          </Typography>

          <Stack spacing={2.5}>
            {[
              { key: 'newApplication', title: 'New Candidate Application', desc: 'Notify immediately when a candidate submits an application for any open job.' },
              { key: 'interviewReminder', title: 'Upcoming Interview Reminders', desc: 'Send reminders 1 hour before scheduled candidate interviews.' },
              { key: 'offerAccepted', title: 'Offer Letter Accepted', desc: 'Alert HR team when an offer letter is signed and accepted by a candidate.' },
              { key: 'requisitionStatus', title: 'Requisition Approvals & Updates', desc: 'Notify when department managers submit or approve headcount requisitions.' },
              { key: 'candidateScoreAlert', title: 'High AI Match Alert (90%+)', desc: 'Notify when an uploaded resume matches an open vacancy by 90% or higher.' },
              { key: 'weeklyReport', title: 'Weekly Recruitment Digest', desc: 'Send weekly hiring velocity, applicant volume, and pipeline analytics report.' }
            ].map((n) => (
              <Box
                key={n.key}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 2,
                  bgcolor: '#F9FAFB',
                  borderRadius: '12px',
                  border: '1px solid #F3F4F6'
                }}
              >
                <Box sx={{ pr: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#111827' }}>
                    {n.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6B7280', fontSize: 13 }}>
                    {n.desc}
                  </Typography>
                </Box>
                <Switch
                  checked={notifications[n.key]}
                  onChange={(e) => setNotifications({ ...notifications, [n.key]: e.target.checked })}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': { color: '#530EF0' },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#530EF0' }
                  }}
                />
              </Box>
            ))}
          </Stack>
        </Card>
      )}

      {/* TAB 5: Integrations */}
      {activeTab === 5 && (
        <Card sx={{ p: 3, borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #F3F4F6' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827', mb: 0.5 }}>
            Integrations & Job Board Connectors
          </Typography>
          <Typography variant="body2" sx={{ color: '#6B7280', mb: 3 }}>
            Connect job portals, calendars, and communications tools to sync applications and interviews.
          </Typography>

          <Grid container spacing={2.5}>
            {[
              { name: 'LinkedIn Jobs', desc: 'Sync applications and auto-post jobs directly to LinkedIn company page.', status: 'Connected', icon: <LinkedinFilled style={{ fontSize: 24, color: '#0A66C2' }} /> },
              { name: 'Google Workspace / Meet', desc: 'Sync interview schedules with Google Calendar and generate Meet links.', status: 'Connected', icon: <GlobalOutlined style={{ fontSize: 24, color: '#EA4335' }} /> },
              { name: 'Naukri.com', desc: 'Publish open vacancies to Naukri recruiter platform automatically.', status: 'Disconnected', icon: <GlobalOutlined style={{ fontSize: 24, color: '#2563EB' }} /> },
              { name: 'Slack Alerts', desc: 'Post instant application notifications and daily digests into #hiring-feed.', status: 'Connected', icon: <GlobalOutlined style={{ fontSize: 24, color: '#4A154B' }} /> }
            ].map((integ) => (
              <Grid key={integ.name} size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    p: 2.5,
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: 140
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Box sx={{ p: 1, bgcolor: '#F3F4F6', borderRadius: '8px' }}>{integ.icon}</Box>
                    <Box>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#111827' }}>
                          {integ.name}
                        </Typography>
                        <Chip
                          label={integ.status}
                          size="small"
                          sx={{
                            bgcolor: integ.status === 'Connected' ? '#ECFDF5' : '#F3F4F6',
                            color: integ.status === 'Connected' ? '#059669' : '#6B7280',
                            fontWeight: 600,
                            fontSize: 11
                          }}
                        />
                      </Stack>
                      <Typography variant="body2" sx={{ color: '#6B7280', fontSize: 13, mt: 0.5 }}>
                        {integ.desc}
                      </Typography>
                    </Box>
                  </Stack>

                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant={integ.status === 'Connected' ? 'outlined' : 'contained'}
                      size="small"
                      onClick={() => {
                        setSnackbar({
                          open: true,
                          message: integ.status === 'Connected' ? `Configuring ${integ.name} integration...` : `Connected ${integ.name} integration successfully!`,
                          severity: 'success'
                        });
                      }}
                      sx={{
                        textTransform: 'none',
                        fontWeight: 600,
                        borderRadius: '6px',
                        color: integ.status === 'Connected' ? '#4B5563' : '#fff',
                        bgcolor: integ.status === 'Connected' ? 'transparent' : '#530EF0',
                        borderColor: '#E5E7EB',
                        '&:hover': {
                          bgcolor: integ.status === 'Connected' ? '#F9FAFB' : '#420bc2'
                        }
                      }}
                    >
                      {integ.status === 'Connected' ? 'Configure' : 'Connect'}
                    </Button>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Card>
      )}

      {/* TAB 6: Preferences */}
      {activeTab === 6 && (
        <Card sx={{ p: 3, borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #F3F4F6' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827', mb: 0.5 }}>
            Recruitment Preferences & Defaults
          </Typography>
          <Typography variant="body2" sx={{ color: '#6B7280', mb: 3 }}>
            Configure default currency, time zones, date formats, and auto-archive timelines.
          </Typography>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151', mb: 0.8 }}>
                Default Currency
              </Typography>
              <Select fullWidth size="small" defaultValue="INR" sx={{ borderRadius: '8px' }}>
                <MenuItem value="INR">INR (₹) - Indian Rupee</MenuItem>
                <MenuItem value="USD">USD ($) - US Dollar</MenuItem>
                <MenuItem value="EUR">EUR (€) - Euro</MenuItem>
                <MenuItem value="GBP">GBP (£) - British Pound</MenuItem>
              </Select>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151', mb: 0.8 }}>
                Timezone
              </Typography>
              <Select fullWidth size="small" defaultValue="Asia/Kolkata" sx={{ borderRadius: '8px' }}>
                <MenuItem value="Asia/Kolkata">(GMT+05:30) Asia/Kolkata - India Standard Time</MenuItem>
                <MenuItem value="America/New_York">(GMT-05:00) Eastern Time (US & Canada)</MenuItem>
                <MenuItem value="Europe/London">(GMT+00:00) London</MenuItem>
                <MenuItem value="Asia/Singapore">(GMT+08:00) Singapore</MenuItem>
              </Select>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151', mb: 0.8 }}>
                Auto-Archive Inactive Candidates
              </Typography>
              <Select fullWidth size="small" defaultValue="90" sx={{ borderRadius: '8px' }}>
                <MenuItem value="30">After 30 days of inactivity</MenuItem>
                <MenuItem value="60">After 60 days of inactivity</MenuItem>
                <MenuItem value="90">After 90 days of inactivity</MenuItem>
                <MenuItem value="180">After 180 days of inactivity</MenuItem>
              </Select>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151', mb: 0.8 }}>
                Default Interview Duration
              </Typography>
              <Select fullWidth size="small" defaultValue="45" sx={{ borderRadius: '8px' }}>
                <MenuItem value="30">30 minutes</MenuItem>
                <MenuItem value="45">45 minutes</MenuItem>
                <MenuItem value="60">60 minutes</MenuItem>
              </Select>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={() => setSnackbar({ open: true, message: 'Preferences updated successfully!', severity: 'success' })}
              sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 600, borderRadius: '8px', px: 3 }}
            >
              Save Preferences
            </Button>
          </Stack>
        </Card>
      )}

      {/* Invite Member Dialog */}
      <Dialog
        open={openInviteModal}
        onClose={() => {
          setOpenInviteModal(false);
          setInviteErrors({});
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Invite Team Member</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.8 }}>
                Full Name *
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="e.g. Rahul Sharma"
                value={newMember.name}
                onChange={(e) => {
                  setNewMember({ ...newMember, name: e.target.value });
                  if (inviteErrors.name) setInviteErrors({ ...inviteErrors, name: '' });
                }}
                error={Boolean(inviteErrors.name)}
                helperText={inviteErrors.name}
              />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.8 }}>
                Email Address *
              </Typography>
              <TextField
                fullWidth
                size="small"
                type="email"
                placeholder="e.g. rahul@acmetech.com"
                value={newMember.email}
                onChange={(e) => {
                  setNewMember({ ...newMember, email: e.target.value });
                  if (inviteErrors.email) setInviteErrors({ ...inviteErrors, email: '' });
                }}
                error={Boolean(inviteErrors.email)}
                helperText={inviteErrors.email}
              />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.8 }}>
                Role
              </Typography>
              <Select
                fullWidth
                size="small"
                value={newMember.role}
                onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
              >
                <MenuItem value="HR Admin">HR Admin</MenuItem>
                <MenuItem value="Recruiter">Recruiter</MenuItem>
                <MenuItem value="Hiring Manager">Hiring Manager</MenuItem>
                <MenuItem value="Interviewer">Interviewer</MenuItem>
              </Select>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenInviteModal(false)} sx={{ textTransform: 'none', color: '#6B7280' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleInviteMember}
            sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 600 }}
          >
            Send Invite
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Alert */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

