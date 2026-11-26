import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import Pagination from '@mui/material/Pagination';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// icons
import ReadOutlined from '@ant-design/icons/ReadOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import ExportOutlined from '@ant-design/icons/ExportOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import FilterOutlined from '@ant-design/icons/FilterOutlined';
import MoreOutlined from '@ant-design/icons/MoreOutlined';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import BankOutlined from '@ant-design/icons/BankOutlined';
import ShoppingOutlined from '@ant-design/icons/ShoppingOutlined';
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined';
import ArrowUpOutlined from '@ant-design/icons/ArrowUpOutlined';
import ArrowDownOutlined from '@ant-design/icons/ArrowDownOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import FileDoneOutlined from '@ant-design/icons/FileDoneOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import UserAddOutlined from '@ant-design/icons/UserAddOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';

// initial mock internships
const initialInternships = [
  {
    id: 'INT-001',
    title: 'Frontend Developer Intern',
    skills: ['React', 'JavaScript'],
    extraSkillsCount: 2,
    company: 'TechSolutions',
    companyShort: 'TS',
    companyColor: '#7C3AED',
    location: 'Bengaluru',
    mode: 'Hybrid',
    duration: '3 months',
    stipend: '₹15,000',
    applications: 42,
    status: 'Published',
    postedOn: 'Oct 21, 2025'
  },
  {
    id: 'INT-002',
    title: 'Data Analyst Intern',
    skills: ['SQL', 'Python'],
    extraSkillsCount: 1,
    company: 'DataMind',
    companyShort: 'DM',
    companyColor: '#2563EB',
    location: 'Chennai',
    mode: 'On-site',
    duration: '6 months',
    stipend: '₹20,000',
    applications: 38,
    status: 'Published',
    postedOn: 'Oct 20, 2025'
  },
  {
    id: 'INT-003',
    title: 'UI/UX Design Intern',
    skills: ['Figma', 'UI/UX'],
    extraSkillsCount: 1,
    company: 'CreativeHub',
    companyShort: 'CH',
    companyColor: '#EC4899',
    location: 'Remote',
    mode: 'Remote',
    duration: '3 months',
    stipend: '₹12,000',
    applications: 26,
    status: 'Published',
    postedOn: 'Oct 19, 2025'
  },
  {
    id: 'INT-004',
    title: 'Machine Learning Intern',
    skills: ['Python', 'ML'],
    extraSkillsCount: 2,
    company: 'AI Labs',
    companyShort: 'AI',
    companyColor: '#059669',
    location: 'Hyderabad',
    mode: 'Hybrid',
    duration: '6 months',
    stipend: '₹25,000',
    applications: 56,
    status: 'Published',
    postedOn: 'Oct 18, 2025'
  },
  {
    id: 'INT-005',
    title: 'Marketing Intern',
    skills: ['Digital Marketing', 'SEO'],
    extraSkillsCount: 0,
    company: 'GrowthX',
    companyShort: 'GX',
    companyColor: '#F97316',
    location: 'Coimbatore',
    mode: 'On-site',
    duration: '3 months',
    stipend: '₹10,000',
    applications: 28,
    status: 'Draft',
    postedOn: 'Oct 17, 2025'
  },
  {
    id: 'INT-006',
    title: 'HR Intern',
    skills: ['HR', 'Recruitment'],
    extraSkillsCount: 0,
    company: 'TraceU',
    companyShort: 'TU',
    companyColor: '#530EF0',
    location: 'Bengaluru',
    mode: 'On-site',
    duration: '6 months',
    stipend: '₹12,000',
    applications: 31,
    status: 'Published',
    postedOn: 'Oct 16, 2025'
  },
  {
    id: 'INT-007',
    title: 'DevOps Intern',
    skills: ['AWS', 'Docker'],
    extraSkillsCount: 1,
    company: 'CloudTech',
    companyShort: 'CT',
    companyColor: '#0284C7',
    location: 'Pune',
    mode: 'Remote',
    duration: '6 months',
    stipend: '₹18,000',
    applications: 24,
    status: 'Paused',
    postedOn: 'Oct 15, 2025'
  },
  {
    id: 'INT-008',
    title: 'Product Management Intern',
    skills: ['Strategy', 'Analytics'],
    extraSkillsCount: 0,
    company: 'InnoTech',
    companyShort: 'IT',
    companyColor: '#DC2626',
    location: 'Chennai',
    mode: 'Hybrid',
    duration: '3 months',
    stipend: '₹15,000',
    applications: 19,
    status: 'Closed',
    postedOn: 'Oct 12, 2025'
  }
];

export default function AdminInternships() {
  const navigate = useNavigate();

  // State
  const [internships, setInternships] = useState(initialInternships);
  const [activeTab, setActiveTab] = useState(0); // 0: All (24), 1: Published (18), 2: Draft (4), 3: Paused (2), 4: Closed (0)
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');
  const [workModeFilter, setWorkModeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);

  // Dialogs
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openCompanyDialog, setOpenCompanyDialog] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [menuItem, setMenuItem] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Create Form State
  const [newInternship, setNewInternship] = useState({
    title: '',
    company: 'TraceU',
    location: 'Bengaluru',
    mode: 'Hybrid',
    duration: '3 months',
    stipend: '₹15,000',
    skills: 'React, JavaScript',
    status: 'Published'
  });
  const [createInternErrors, setCreateInternErrors] = useState({});
  const [inviteCompany, setInviteCompany] = useState({ company: '', email: '', program: 'Summer Internship 2026' });
  const [inviteCompanyErrors, setInviteCompanyErrors] = useState({});

  // Filtered internships
  const filteredInternships = useMemo(() => {
    return internships.filter((item) => {
      // Tab filter
      if (activeTab === 1 && item.status !== 'Published') return false;
      if (activeTab === 2 && item.status !== 'Draft') return false;
      if (activeTab === 3 && item.status !== 'Paused') return false;
      if (activeTab === 4 && item.status !== 'Closed') return false;

      // Dropdown filters
      if (statusFilter !== 'All' && item.status !== statusFilter) return false;
      if (locationFilter !== 'All' && item.location !== locationFilter) return false;
      if (workModeFilter !== 'All' && item.mode !== workModeFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchComp = item.company.toLowerCase().includes(q);
        const matchLoc = item.location.toLowerCase().includes(q);
        const matchSkill = item.skills.some((s) => s.toLowerCase().includes(q));
        if (!matchTitle && !matchComp && !matchLoc && !matchSkill) return false;
      }

      return true;
    });
  }, [internships, activeTab, statusFilter, locationFilter, workModeFilter, searchQuery]);

  const handleOpenMenu = (e, item) => {
    e.stopPropagation();
    setMenuAnchorEl(e.currentTarget);
    setMenuItem(item);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
    setMenuItem(null);
  };

  const handleCreateInternship = () => {
    const errors = {};
    if (!newInternship.title.trim()) {
      errors.title = 'Internship title is required';
    } else if (newInternship.title.trim().length < 5) {
      errors.title = 'Internship title must be at least 5 characters';
    }

    if (Object.keys(errors).length > 0) {
      setCreateInternErrors(errors);
      setSnackbar({ open: true, message: 'Please correct the validation errors', severity: 'error' });
      return;
    }

    const skillList = newInternship.skills ? newInternship.skills.split(',').map((s) => s.trim()) : ['General'];
    const created = {
      id: `INT-00${internships.length + 1}`,
      title: newInternship.title.trim(),
      skills: skillList.slice(0, 2),
      extraSkillsCount: Math.max(0, skillList.length - 2),
      company: newInternship.company,
      companyShort: newInternship.company.slice(0, 2).toUpperCase(),
      companyColor: '#530EF0',
      location: newInternship.location,
      mode: newInternship.mode,
      duration: newInternship.duration,
      stipend: newInternship.stipend,
      applications: 0,
      status: newInternship.status,
      postedOn: 'Today'
    };
    setInternships([created, ...internships]);
    setOpenCreateDialog(false);
    setCreateInternErrors({});
    setSnackbar({ open: true, message: `Internship "${created.title}" published!`, severity: 'success' });
    setNewInternship({
      title: '',
      company: 'TraceU',
      location: 'Bengaluru',
      mode: 'Hybrid',
      duration: '3 months',
      stipend: '₹15,000',
      skills: 'React, JavaScript',
      status: 'Published'
    });
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
            <ReadOutlined style={{ fontSize: 14 }} />
            Internship Program
          </Box>
        </Stack>

        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          alignItems={{ xs: 'flex-start', lg: 'center' }}
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
              Internship Program
            </Typography>
            <Typography sx={{ color: '#6B7280', fontSize: 14, fontWeight: 400, lineHeight: 1.5, mt: 0.5 }}>
              Manage internship opportunities, student applications and company partnerships.
            </Typography>
          </Box>

          <Stack direction="row" alignItems="center" spacing={1.5} flexShrink={0}>
            <Button
              variant="contained"
              startIcon={<PlusOutlined />}
              onClick={() => setOpenCreateDialog(true)}
              sx={{
                bgcolor: '#530EF0',
                color: '#FFF',
                fontWeight: 600,
                borderRadius: '8px',
                height: 40,
                minHeight: 40,
                px: 2,
                whiteSpace: 'nowrap',
                textTransform: 'none',
                boxShadow: '0 4px 12px rgba(83, 14, 240, 0.25)',
                '&:hover': { bgcolor: '#430bc2' }
              }}
            >
              Create Internship
            </Button>

            <Button
              variant="outlined"
              startIcon={<ExportOutlined />}
              onClick={() => navigate('/candidate/internships')}
              sx={{
                borderColor: '#E2E8F0',
                color: '#334155',
                fontWeight: 600,
                borderRadius: '8px',
                height: 40,
                minHeight: 40,
                px: 2,
                whiteSpace: 'nowrap',
                textTransform: 'none',
                bgcolor: '#FFF',
                '&:hover': { borderColor: '#CBD5E1', bgcolor: '#F8FAFC' }
              }}
            >
              View on Career Portal
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* 4 Top KPI Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          {
            title: 'Active Internships',
            count: 24,
            change: '+20%',
            subtitle: 'Currently open positions',
            icon: <ShoppingOutlined style={{ fontSize: 18 }} />,
            color: '#530EF0',
            bg: 'rgba(83, 14, 240, 0.08)'
          },
          {
            title: 'Total Applications',
            count: 486,
            change: '+32%',
            subtitle: 'From students',
            icon: <TeamOutlined style={{ fontSize: 18 }} />,
            color: '#3B82F6',
            bg: 'rgba(59, 130, 246, 0.1)'
          },
          {
            title: 'Shortlisted Students',
            count: 72,
            change: '+18%',
            subtitle: 'In selection process',
            icon: <ReadOutlined style={{ fontSize: 18 }} />,
            color: '#EF4444',
            bg: 'rgba(239, 68, 68, 0.1)'
          },
          {
            title: 'Participating Companies',
            count: 18,
            change: '+12%',
            subtitle: 'Active company partners',
            icon: <BankOutlined style={{ fontSize: 18 }} />,
            color: '#7C3AED',
            bg: 'rgba(124, 58, 237, 0.1)'
          }
        ].map((kpi, idx) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
            <Card
              sx={{
                p: 2.2,
                borderRadius: '16px',
                border: '1px solid #F3F4F6',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                bgcolor: '#FFF',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 24px rgba(105, 41, 226, 0.08)',
                  borderColor: '#ebd9ff'
                }
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: '10px',
                    bgcolor: kpi.bg,
                    color: kpi.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18
                  }}
                >
                  {kpi.icon}
                </Box>
                <Chip
                  icon={<ArrowUpOutlined style={{ fontSize: 10, color: '#10B981' }} />}
                  label={kpi.change}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(16, 185, 129, 0.08)',
                    color: '#10B981',
                    fontWeight: 500,
                    fontSize: 11,
                    height: 22,
                    borderRadius: '6px'
                  }}
                />
              </Stack>
              <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 13, fontWeight: 500, display: 'block' }}>
                {kpi.title}
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, color: '#111827', fontSize: 28, my: 0.25 }}>
                {kpi.count}
              </Typography>
              <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 12, fontWeight: 400 }}>
                {kpi.subtitle}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Main Content Layout: Table on left, Widgets on right */}
      <Grid container spacing={2.5} alignItems="flex-start">
        {/* Left Column: Internships Table */}
        <Grid size={{ xs: 12, lg: 7.8 }}>
          <Card
            sx={{
              borderRadius: '16px',
              border: '1px solid #F3F4F6',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              bgcolor: '#FFF',
              overflow: 'hidden'
            }}
          >
            {/* Tabs Header */}
            <Box
              sx={{
                px: 2.5,
                pt: 1.5,
                borderBottom: '1px solid #F3F4F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap'
              }}
            >
              <Tabs
                value={activeTab}
                onChange={(e, v) => setActiveTab(v)}
                sx={{
                  '& .MuiTabs-indicator': { bgcolor: '#530EF0', height: 3, borderRadius: '3px 3px 0 0' },
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: 13.5,
                    color: '#6B7280',
                    minHeight: 48,
                    '&.Mui-selected': { color: '#530EF0' }
                  }
                }}
              >
                <Tab label="All Internships (24)" />
                <Tab label="Published (18)" />
                <Tab label="Draft (4)" />
                <Tab label="Paused (2)" />
                <Tab label="Closed (0)" />
              </Tabs>

              <Typography variant="caption" sx={{ color: '#6B7280', fontWeight: 500, my: 1 }}>
                Sort by: <strong>Newest first ⌵</strong>
              </Typography>
            </Box>

            {/* Filter Bar */}
            <Box sx={{ p: 2, bgcolor: '#FAFAFB', borderBottom: '1px solid #F3F4F6' }}>
              <Grid container spacing={1.5} alignItems="center">
                <Grid size={{ xs: 12, sm: 4, md: 4.5 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Search internships by title, company, skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchOutlined style={{ color: '#9CA3AF' }} />
                        </InputAdornment>
                      )
                    }}
                    sx={{
                      bgcolor: '#FFF',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        '& fieldset': { borderColor: '#E5E7EB' }
                      }
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 6, sm: 2.5, md: 2.5 }}>
                  <Select
                    fullWidth
                    size="small"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    sx={{
                      bgcolor: '#FFF',
                      borderRadius: '8px',
                      fontSize: 13,
                      '& fieldset': { borderColor: '#E5E7EB' }
                    }}
                  >
                    <MenuItem value="All">All Locations</MenuItem>
                    <MenuItem value="Bengaluru">Bengaluru</MenuItem>
                    <MenuItem value="Chennai">Chennai</MenuItem>
                    <MenuItem value="Remote">Remote</MenuItem>
                    <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                    <MenuItem value="Coimbatore">Coimbatore</MenuItem>
                    <MenuItem value="Pune">Pune</MenuItem>
                  </Select>
                </Grid>

                <Grid size={{ xs: 6, sm: 2.5, md: 2.5 }}>
                  <Select
                    fullWidth
                    size="small"
                    value={workModeFilter}
                    onChange={(e) => setWorkModeFilter(e.target.value)}
                    sx={{
                      bgcolor: '#FFF',
                      borderRadius: '8px',
                      fontSize: 13,
                      '& fieldset': { borderColor: '#E5E7EB' }
                    }}
                  >
                    <MenuItem value="All">All Work Modes</MenuItem>
                    <MenuItem value="Hybrid">Hybrid</MenuItem>
                    <MenuItem value="On-site">On-site</MenuItem>
                    <MenuItem value="Remote">Remote</MenuItem>
                  </Select>
                </Grid>

                <Grid size={{ xs: 12, sm: 2.5, md: 2.5 }}>
                  <Select
                    fullWidth
                    size="small"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    sx={{
                      bgcolor: '#FFF',
                      borderRadius: '8px',
                      fontSize: 13,
                      '& fieldset': { borderColor: '#E5E7EB' }
                    }}
                  >
                    <MenuItem value="All">All Statuses</MenuItem>
                    <MenuItem value="Published">Published</MenuItem>
                    <MenuItem value="Draft">Draft</MenuItem>
                    <MenuItem value="Paused">Paused</MenuItem>
                    <MenuItem value="Closed">Closed</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </Box>

            {/* Internships Table */}
            <TableContainer sx={{ overflowX: 'auto' }}>
              <Table size="medium">
                <TableHead sx={{ bgcolor: '#F9FAFB' }}>
                  <TableRow>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', pl: 2.5 }}>
                      Internship Title
                    </TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>
                      Company
                    </TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>
                      Location
                    </TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>
                      Duration
                    </TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>
                      Stipend
                    </TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>
                      Applications
                    </TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>
                      Status
                    </TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>
                      Posted On
                    </TableCell>
                    <TableCell align="right" sx={{ pr: 2.5, color: '#6B7280', fontWeight: 600, fontSize: 12 }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredInternships.map((intern) => (
                    <TableRow key={intern.id} hover sx={{ '&:hover': { bgcolor: '#F9FAFB' } }}>
                      <TableCell sx={{ pl: 2.5 }}>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: 13.5 }}>
                            {intern.title}
                          </Typography>
                          <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 0.5 }}>
                            {intern.skills.map((sk) => (
                              <Chip
                                key={sk}
                                label={sk}
                                size="small"
                                sx={{
                                  fontSize: 11,
                                  height: 20,
                                  bgcolor: '#F3F4F6',
                                  color: '#4B5563',
                                  borderRadius: '4px'
                                }}
                              />
                            ))}
                            {intern.extraSkillsCount > 0 && (
                              <Chip
                                label={`+${intern.extraSkillsCount}`}
                                size="small"
                                sx={{
                                  fontSize: 11,
                                  height: 20,
                                  bgcolor: '#E5E7EB',
                                  color: '#4B5563',
                                  borderRadius: '4px'
                                }}
                              />
                            )}
                          </Stack>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Avatar
                            sx={{
                              width: 28,
                              height: 28,
                              bgcolor: intern.companyColor,
                              color: '#FFF',
                              fontSize: 11.5,
                              fontWeight: 700
                            }}
                          >
                            {intern.companyShort}
                          </Avatar>
                          <Typography variant="body2" sx={{ color: '#374151', fontSize: 13, fontWeight: 500 }}>
                            {intern.company}
                          </Typography>
                        </Stack>
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2" sx={{ color: '#4B5563', fontSize: 13 }}>
                          {intern.location}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2" sx={{ color: '#4B5563', fontSize: 13 }}>
                          {intern.duration}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2" sx={{ color: '#111827', fontWeight: 600, fontSize: 13 }}>
                          {intern.stipend}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2" sx={{ color: '#111827', fontWeight: 600, fontSize: 13 }}>
                          {intern.applications}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={intern.status}
                          size="small"
                          sx={{
                            fontSize: 11.5,
                            fontWeight: 600,
                            height: 24,
                            bgcolor:
                              intern.status === 'Published'
                                ? 'rgba(16, 185, 129, 0.1)'
                                : intern.status === 'Draft'
                                ? 'rgba(245, 158, 11, 0.1)'
                                : intern.status === 'Paused'
                                ? 'rgba(234, 88, 12, 0.1)'
                                : 'rgba(239, 68, 68, 0.1)',
                            color:
                              intern.status === 'Published'
                                ? '#10B981'
                                : intern.status === 'Draft'
                                ? '#F59E0B'
                                : intern.status === 'Paused'
                                ? '#EA580C'
                                : '#EF4444',
                            borderRadius: '6px'
                          }}
                        />
                      </TableCell>

                      <TableCell>
                        <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12.5 }}>
                          {intern.postedOn}
                        </Typography>
                      </TableCell>

                      <TableCell align="right" sx={{ pr: 2.5 }}>
                        <IconButton size="small" onClick={(e) => handleOpenMenu(e, intern)}>
                          <MoreOutlined style={{ color: '#9CA3AF' }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination Footer */}
            <Box
              sx={{
                p: 2,
                borderTop: '1px solid #F3F4F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap'
              }}
            >
              <Typography variant="caption" sx={{ color: '#6B7280' }}>
                Showing 1-8 of 24 internships
              </Typography>
              <Pagination
                count={3}
                page={page}
                onChange={(e, val) => setPage(val)}
                size="small"
                sx={{
                  '& .Mui-selected': { bgcolor: '#530EF0 !important', color: '#FFF' },
                  '& .MuiPaginationItem-root': { borderRadius: '6px' }
                }}
              />
            </Box>
          </Card>
        </Grid>

        {/* Right Column: Promo Card + Applications Overview Donut + Quick Actions + Recent Activity */}
        <Grid size={{ xs: 12, lg: 4.2 }}>
          <Stack spacing={2.5}>
            {/* Promo Card: Reach Top Talent */}
            <Card
              sx={{
                p: 3,
                borderRadius: '16px',
                border: '1px solid #F3F4F6',
                boxShadow: '0 4px 16px rgba(83, 14, 240, 0.06)',
                background: 'linear-gradient(135deg, #FDFBFF 0%, #F5F0FF 100%)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Box sx={{ maxWidth: '65%' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827', fontSize: '1.1rem', mb: 0.8 }}>
                  Reach Top Talent Through Internships
                </Typography>
                <Typography variant="body2" sx={{ color: '#6B7280', fontSize: 13, lineHeight: 1.5, mb: 2 }}>
                  Connect with motivated students and build your future workforce.
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => setOpenCreateDialog(true)}
                  endIcon={<ArrowRightOutlined />}
                  sx={{
                    bgcolor: '#530EF0',
                    color: '#FFF',
                    fontWeight: 600,
                    fontSize: 13,
                    textTransform: 'none',
                    borderRadius: '8px',
                    px: 2,
                    py: 0.8,
                    '&:hover': { bgcolor: '#430bc2' }
                  }}
                >
                  Create Internship
                </Button>
              </Box>

              {/* Student Visual Accent */}
              <Box
                sx={{
                  position: 'absolute',
                  right: 12,
                  bottom: 0,
                  width: 110,
                  height: 125,
                  borderRadius: '16px 16px 0 0',
                  background: 'linear-gradient(180deg, #E9D5FF 0%, #C084FC 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 -4px 12px rgba(168, 85, 247, 0.2)'
                }}
              >
                <Typography sx={{ fontSize: 48 }}>🎓</Typography>
              </Box>
            </Card>

            {/* Applications Overview Donut Card */}
            <Card
              sx={{
                p: 2.5,
                borderRadius: '16px',
                border: '1px solid #F3F4F6',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                bgcolor: '#FFF'
              }}
            >
              <Typography variant="h3" sx={{ fontWeight: 600, color: '#111827', fontSize: 16, mb: 2 }}>
                Applications Overview
              </Typography>

              <Grid container spacing={2} alignItems="center">
                {/* Donut SVG */}
                <Grid size={{ xs: 5 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box sx={{ position: 'relative', width: 120, height: 120 }}>
                    <svg viewBox="0 0 100 100" width="120" height="120">
                      {/* Applied 53% -> 166.5 */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="#530EF0"
                        strokeWidth="14"
                        strokeDasharray="126.5 238.7"
                        strokeDashoffset="0"
                        transform="rotate(-90 50 50)"
                      />
                      {/* Shortlisted 15% -> 35.8 */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="#3B82F6"
                        strokeWidth="14"
                        strokeDasharray="35.8 238.7"
                        strokeDashoffset="-126.5"
                        transform="rotate(-90 50 50)"
                      />
                      {/* Interview 6% -> 14.3 */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="#F59E0B"
                        strokeWidth="14"
                        strokeDasharray="14.3 238.7"
                        strokeDashoffset="-162.3"
                        transform="rotate(-90 50 50)"
                      />
                      {/* Selected 4% -> 9.5 */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="#10B981"
                        strokeWidth="14"
                        strokeDasharray="9.5 238.7"
                        strokeDashoffset="-176.6"
                        transform="rotate(-90 50 50)"
                      />
                      {/* Rejected 22% -> 52.5 */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="#EF4444"
                        strokeWidth="14"
                        strokeDasharray="52.5 238.7"
                        strokeDashoffset="-186.1"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 800, color: '#111827', fontSize: '1rem', lineHeight: 1 }}>
                        486
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11 }}>
                        Total
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                {/* Donut Legend */}
                <Grid size={{ xs: 7 }}>
                  <Stack spacing={1}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#530EF0' }} />
                        <Typography variant="body2" sx={{ color: '#4B5563', fontSize: 12.5 }}>
                          Applied
                        </Typography>
                      </Stack>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: 12.5 }}>
                        256 (53%)
                      </Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#3B82F6' }} />
                        <Typography variant="body2" sx={{ color: '#4B5563', fontSize: 12.5 }}>
                          Shortlisted
                        </Typography>
                      </Stack>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: 12.5 }}>
                        72 (15%)
                      </Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#F59E0B' }} />
                        <Typography variant="body2" sx={{ color: '#4B5563', fontSize: 12.5 }}>
                          Interview
                        </Typography>
                      </Stack>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: 12.5 }}>
                        28 (6%)
                      </Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10B981' }} />
                        <Typography variant="body2" sx={{ color: '#4B5563', fontSize: 12.5 }}>
                          Selected
                        </Typography>
                      </Stack>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: 12.5 }}>
                        18 (4%)
                      </Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#EF4444' }} />
                        <Typography variant="body2" sx={{ color: '#4B5563', fontSize: 12.5 }}>
                          Rejected
                        </Typography>
                      </Stack>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: 12.5 }}>
                        112 (22%)
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Card>

            {/* Quick Actions Card */}
            <Card
              sx={{
                p: 2.5,
                borderRadius: '16px',
                border: '1px solid #F3F4F6',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                bgcolor: '#FFF'
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                <Typography variant="h3" sx={{ fontWeight: 600, color: '#111827', fontSize: 16 }}>
                  Quick Actions
                </Typography>
                <Typography variant="caption" sx={{ color: '#530EF0', fontWeight: 600, cursor: 'pointer' }}>
                  View all →
                </Typography>
              </Stack>

              <Stack spacing={1}>
                <Box
                  onClick={() => setOpenCreateDialog(true)}
                  sx={{
                    p: 1.2,
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: '#F9FAFB' }
                  }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: '8px',
                        bgcolor: 'rgba(83, 14, 240, 0.08)',
                        color: '#530EF0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <PlusOutlined style={{ fontSize: 16 }} />
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: 13 }}>
                        Create Internship
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11.5 }}>
                        Post a new internship opportunity
                      </Typography>
                    </Box>
                  </Stack>
                  <RightOutlined style={{ fontSize: 12, color: '#9CA3AF' }} />
                </Box>

                <Box
                  onClick={() => navigate('/admin/applications')}
                  sx={{
                    p: 1.2,
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: '#F9FAFB' }
                  }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: '8px',
                        bgcolor: 'rgba(59, 130, 246, 0.08)',
                        color: '#3B82F6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <FileDoneOutlined style={{ fontSize: 16 }} />
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: 13 }}>
                        Manage Applications
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11.5 }}>
                        Review and shortlist students
                      </Typography>
                    </Box>
                  </Stack>
                  <RightOutlined style={{ fontSize: 12, color: '#9CA3AF' }} />
                </Box>

                <Box
                  onClick={() => setOpenCompanyDialog(true)}
                  sx={{
                    p: 1.2,
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: '#F9FAFB' }
                  }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: '8px',
                        bgcolor: 'rgba(124, 58, 237, 0.08)',
                        color: '#7C3AED',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <BankOutlined style={{ fontSize: 16 }} />
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: 13 }}>
                        Invite Company
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11.5 }}>
                        Add a new company partner
                      </Typography>
                    </Box>
                  </Stack>
                  <RightOutlined style={{ fontSize: 12, color: '#9CA3AF' }} />
                </Box>

                <Box
                  onClick={() => navigate('/admin/settings')}
                  sx={{
                    p: 1.2,
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: '#F9FAFB' }
                  }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: '8px',
                        bgcolor: 'rgba(239, 68, 68, 0.08)',
                        color: '#EF4444',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <SettingOutlined style={{ fontSize: 16 }} />
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: 13 }}>
                        Internship Settings
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11.5 }}>
                        Configure forms and eligibility rules
                      </Typography>
                    </Box>
                  </Stack>
                  <RightOutlined style={{ fontSize: 12, color: '#9CA3AF' }} />
                </Box>
              </Stack>
            </Card>

            {/* Recent Activity Card */}
            <Card
              sx={{
                p: 2.5,
                borderRadius: '16px',
                border: '1px solid #F3F4F6',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                bgcolor: '#FFF'
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                <Typography variant="h3" sx={{ fontWeight: 600, color: '#111827', fontSize: 16 }}>
                  Recent Activity
                </Typography>
                <Typography variant="caption" sx={{ color: '#530EF0', fontWeight: 600, cursor: 'pointer' }}>
                  View all →
                </Typography>
              </Stack>

              <Stack spacing={1.8}>
                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      bgcolor: 'rgba(59, 130, 246, 0.1)',
                      color: '#3B82F6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      mt: 0.2
                    }}
                  >
                    <TeamOutlined />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: 13 }}>
                      New application received
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11.5 }}>
                      by Arjun Kumar for Frontend Developer Intern • 2h ago
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      bgcolor: 'rgba(16, 185, 129, 0.1)',
                      color: '#10B981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      mt: 0.2
                    }}
                  >
                    <CheckCircleOutlined />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: 13 }}>
                      Student shortlisted
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11.5 }}>
                      by Sneha Iyer for Data Analyst Intern • 5h ago
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      bgcolor: 'rgba(83, 14, 240, 0.1)',
                      color: '#530EF0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      mt: 0.2
                    }}
                  >
                    <ReadOutlined />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: 13 }}>
                      Internship published
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11.5 }}>
                      UI/UX Design Intern by CreativeHub • 1d ago
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      bgcolor: 'rgba(124, 58, 237, 0.1)',
                      color: '#7C3AED',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      mt: 0.2
                    }}
                  >
                    <BankOutlined />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: 13 }}>
                      Company registered
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11.5 }}>
                      TechSolutions Pvt. Ltd. • 1d ago
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      {/* Row Actions Menu */}
      <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleCloseMenu}>
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            setSnackbar({ open: true, message: `Editing ${menuItem?.title}`, severity: 'info' });
          }}
        >
          Edit Internship
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            navigate('/admin/applications');
          }}
        >
          View Applications ({menuItem?.applications})
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            setInternships(internships.map((i) => (i.id === menuItem?.id ? { ...i, status: 'Closed' } : i)));
            setSnackbar({ open: true, message: 'Internship status updated to Closed', severity: 'warning' });
          }}
        >
          Close Internship
        </MenuItem>
      </Menu>

      {/* Dialog: Create Internship */}
      <Dialog
        open={openCreateDialog}
        onClose={() => {
          setOpenCreateDialog(false);
          setCreateInternErrors({});
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700 }}>+ Create New Internship</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Internship Title *"
              size="small"
              value={newInternship.title}
              onChange={(e) => {
                setNewInternship({ ...newInternship, title: e.target.value });
                if (createInternErrors.title) setCreateInternErrors({ ...createInternErrors, title: '' });
              }}
              error={Boolean(createInternErrors.title)}
              helperText={createInternErrors.title}
              placeholder="e.g. Frontend Developer Intern"
              required
            />
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  label="Company Name"
                  size="small"
                  value={newInternship.company}
                  onChange={(e) => setNewInternship({ ...newInternship, company: e.target.value })}
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  label="Location"
                  size="small"
                  value={newInternship.location}
                  onChange={(e) => setNewInternship({ ...newInternship, location: e.target.value })}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <Select
                  fullWidth
                  size="small"
                  value={newInternship.mode}
                  onChange={(e) => setNewInternship({ ...newInternship, mode: e.target.value })}
                >
                  <MenuItem value="Hybrid">Hybrid</MenuItem>
                  <MenuItem value="On-site">On-site</MenuItem>
                  <MenuItem value="Remote">Remote</MenuItem>
                </Select>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Select
                  fullWidth
                  size="small"
                  value={newInternship.duration}
                  onChange={(e) => setNewInternship({ ...newInternship, duration: e.target.value })}
                >
                  <MenuItem value="3 months">3 months</MenuItem>
                  <MenuItem value="6 months">6 months</MenuItem>
                  <MenuItem value="12 months">12 months</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  label="Monthly Stipend"
                  size="small"
                  value={newInternship.stipend}
                  onChange={(e) => setNewInternship({ ...newInternship, stipend: e.target.value })}
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Select
                  fullWidth
                  size="small"
                  value={newInternship.status}
                  onChange={(e) => setNewInternship({ ...newInternship, status: e.target.value })}
                >
                  <MenuItem value="Published">Published</MenuItem>
                  <MenuItem value="Draft">Draft</MenuItem>
                  <MenuItem value="Paused">Paused</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <TextField
              fullWidth
              label="Skills Required (comma separated)"
              size="small"
              value={newInternship.skills}
              onChange={(e) => setNewInternship({ ...newInternship, skills: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setOpenCreateDialog(false)} sx={{ textTransform: 'none', color: '#6B7280' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleCreateInternship}
            sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 600, '&:hover': { bgcolor: '#430bc2' } }}
          >
            Create Internship
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog: Invite Company */}
      <Dialog
        open={openCompanyDialog}
        onClose={() => {
          setOpenCompanyDialog(false);
          setInviteCompanyErrors({});
        }}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Invite Company Partner</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              fullWidth
              size="small"
              label="Company Name *"
              placeholder="e.g. Acme Corp"
              value={inviteCompany.company}
              onChange={(e) => {
                setInviteCompany({ ...inviteCompany, company: e.target.value });
                if (inviteCompanyErrors.company) setInviteCompanyErrors({ ...inviteCompanyErrors, company: '' });
              }}
              error={Boolean(inviteCompanyErrors.company)}
              helperText={inviteCompanyErrors.company}
            />
            <TextField
              fullWidth
              size="small"
              type="email"
              label="HR Representative Email *"
              placeholder="hr@acme.com"
              value={inviteCompany.email}
              onChange={(e) => {
                setInviteCompany({ ...inviteCompany, email: e.target.value });
                if (inviteCompanyErrors.email) setInviteCompanyErrors({ ...inviteCompanyErrors, email: '' });
              }}
              error={Boolean(inviteCompanyErrors.email)}
              helperText={inviteCompanyErrors.email}
            />
            <TextField
              fullWidth
              size="small"
              label="Partnership Program"
              value={inviteCompany.program}
              onChange={(e) => setInviteCompany({ ...inviteCompany, program: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={() => {
              setOpenCompanyDialog(false);
              setInviteCompanyErrors({});
            }}
            sx={{ textTransform: 'none', color: '#6B7280' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              const errors = {};
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!inviteCompany.company.trim()) {
                errors.company = 'Company Name is required';
              } else if (inviteCompany.company.trim().length < 5) {
                errors.company = 'Company Name must be at least 5 characters';
              }

              if (!inviteCompany.email.trim()) {
                errors.email = 'HR Email is required';
              } else if (!emailRegex.test(inviteCompany.email.trim())) {
                errors.email = 'Must be a valid email address';
              }

              if (Object.keys(errors).length > 0) {
                setInviteCompanyErrors(errors);
                setSnackbar({ open: true, message: 'Please correct the validation errors', severity: 'error' });
                return;
              }

              setOpenCompanyDialog(false);
              setInviteCompany({ company: '', email: '', program: 'Summer Internship 2026' });
              setInviteCompanyErrors({});
              setSnackbar({ open: true, message: 'Invitation email dispatched to partner!', severity: 'success' });
            }}
            sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 600 }}
          >
            Send Invitation
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
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

