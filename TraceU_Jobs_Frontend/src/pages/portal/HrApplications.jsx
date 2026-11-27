import React, { useState } from 'react';
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
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Pagination from '@mui/material/Pagination';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import FullScreenResumeDialog from 'components/FullScreenResumeDialog';

// icons
import ExportOutlined from '@ant-design/icons/ExportOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import FilterOutlined from '@ant-design/icons/FilterOutlined';
import MoreOutlined from '@ant-design/icons/MoreOutlined';
import ArrowUpOutlined from '@ant-design/icons/ArrowUpOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import DownOutlined from '@ant-design/icons/DownOutlined';
import DownloadOutlined from '@ant-design/icons/DownloadOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import ShareAltOutlined from '@ant-design/icons/ShareAltOutlined';
import StopOutlined from '@ant-design/icons/StopOutlined';
import SolutionOutlined from '@ant-design/icons/SolutionOutlined';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import FileDoneOutlined from '@ant-design/icons/FileDoneOutlined';
import ReadOutlined from '@ant-design/icons/ReadOutlined';
import FilePdfOutlined from '@ant-design/icons/FilePdfOutlined';
import LockOutlined from '@ant-design/icons/LockOutlined';

// avatar assets
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import avatar5 from 'assets/images/users/avatar-5.png';

export default function HrApplications() {
  const navigate = useNavigate();

  // Active filter tab
  const [activeTab, setActiveTab] = useState('All');

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [jobFilter, setJobFilter] = useState('All Jobs');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [stageFilter, setStageFilter] = useState('All Application Stages');
  const [sourceFilter, setSourceFilter] = useState('All Sources');
  const [dateFilter, setDateFilter] = useState('Last 30 days');

  // Selected Application for Right Side Detail Panel
  const [selectedApp, setSelectedApp] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectRow = (e, app) => {
    e.stopPropagation();
    const id = app.id;
    setSelectedRows((prev) => {
      const isAlready = prev.includes(id);
      if (isAlready) {
        const next = prev.filter((r) => r !== id);
        if (selectedApp?.id === id) {
          const remaining = filteredApps.find((a) => next.includes(a.id));
          setSelectedApp(remaining || null);
        }
        return next;
      } else {
        setSelectedApp(app);
        return [...prev, id];
      }
    });
  };

  const handleRowClick = (app) => {
    const id = app.id;
    if (selectedApp?.id === id && selectedRows.includes(id)) {
      setSelectedApp(null);
      setSelectedRows((prev) => prev.filter((r) => r !== id));
    } else {
      setSelectedApp(app);
      setSelectedRows((prev) => (prev.includes(id) ? prev : [...prev, id]));
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = filteredApps.map((a) => a.id);
      setSelectedRows(allIds);
      if (filteredApps.length > 0) setSelectedApp(filteredApps[0]);
    } else {
      setSelectedRows([]);
      setSelectedApp(null);
    }
  };

  // Drawer subtabs
  const [drawerTab, setDrawerTab] = useState(0);

  // Toast
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [resumeViewerCandidate, setResumeViewerCandidate] = useState(null);

  // 10 Applications list matching screenshot exactly
  const [applications, setApplications] = useState([
    { id: 'APP-001', name: 'Priya Sharma', email: 'priya.sharma@email.com', phone: '+91 98765 43210', role: 'Software Engineer', code: 'JOB-0012', source: 'LinkedIn', appliedOn: 'Oct 28, 2025', stage: 'Shortlisted', matchScore: 92, avatar: avatar3 },
    { id: 'APP-002', name: 'Rahul Kumar', email: 'rahul.kumar@email.com', phone: '+91 98765 43211', role: 'Product Designer', code: 'JOB-0011', source: 'Naukri', appliedOn: 'Oct 27, 2025', stage: 'Screening', matchScore: 87, avatar: avatar2 },
    { id: 'APP-003', name: 'Sneha Iyer', email: 'sneha.iyer@email.com', phone: '+91 98765 43212', role: 'Data Analyst', code: 'JOB-0010', source: 'Indeed', appliedOn: 'Oct 26, 2025', stage: 'Interview', matchScore: 78, avatar: avatar4 },
    { id: 'APP-004', name: 'Arjun Nair', email: 'arjun.nair@email.com', phone: '+91 98765 43213', role: 'Backend Developer', code: 'JOB-0009', source: 'Company Website', appliedOn: 'Oct 25, 2025', stage: 'Applied', matchScore: 65, avatar: avatar1 },
    { id: 'APP-005', name: 'Vikram Singh', email: 'vikram.singh@email.com', phone: '+91 98765 43214', role: 'Full Stack Developer', code: 'JOB-0008', source: 'Referral', appliedOn: 'Oct 24, 2025', stage: 'Offer', matchScore: 88, avatar: avatar5 },
    { id: 'APP-006', name: 'Meera Joshi', email: 'meera.joshi@email.com', phone: '+91 98765 43215', role: 'QA Engineer', code: 'JOB-0007', source: 'LinkedIn', appliedOn: 'Oct 23, 2025', stage: 'Screening', matchScore: 72, avatar: avatar3 },
    { id: 'APP-007', name: 'Siddharth Verma', email: 'siddharth.verma@email.com', phone: '+91 98765 43216', role: 'DevOps Engineer', code: 'JOB-0006', source: 'Naukri', appliedOn: 'Oct 22, 2025', stage: 'Shortlisted', matchScore: 80, avatar: avatar2 },
    { id: 'APP-008', name: 'Ananya Rao', email: 'ananya.rao@email.com', phone: '+91 98765 43217', role: 'UI/UX Designer', code: 'JOB-0005', source: 'Indeed', appliedOn: 'Oct 21, 2025', stage: 'Applied', matchScore: 68, avatar: avatar4 },
    { id: 'APP-009', name: 'Deepak Patel', email: 'deepak.patel@email.com', phone: '+91 98765 43218', role: 'Product Manager', code: 'JOB-0004', source: 'Company Website', appliedOn: 'Oct 20, 2025', stage: 'Rejected', matchScore: 45, avatar: avatar1 },
    { id: 'APP-010', name: 'Riya Menon', email: 'riya.menon@email.com', phone: '+91 98765 43219', role: 'Digital Marketing Specialist', code: 'JOB-0003', source: 'Referral', appliedOn: 'Oct 19, 2025', stage: 'Interview', matchScore: 79, avatar: avatar5 }
  ]);

  // Top 7 KPI Stats matching screenshot exactly
  const kpiStats = [
    { label: 'Total Applications', count: 486, change: '+ 18%', sub: 'Across all jobs', icon: <SolutionOutlined />, color: '#6929E2', bg: '#F3EDFF' },
    { label: 'New Applications', count: 100, change: '+ 22%', sub: 'This week', icon: <TeamOutlined />, color: '#2563EB', bg: '#EFF6FF' },
    { label: 'Under Screening', count: 72, change: '+ 16%', sub: 'In progress', icon: <UserOutlined />, color: '#F59E0B', bg: '#FFFBEB' },
    { label: 'Shortlisted', count: 45, change: '+ 25%', sub: 'Ready for interviews', icon: <ReadOutlined />, color: '#EC4899', bg: '#FDF2F8' },
    { label: 'Interview', count: 29, change: '+ 12%', sub: 'Scheduled', icon: <CalendarOutlined />, color: '#8B5CF6', bg: '#F5F3FF' },
    { label: 'Offers', count: 12, change: '+ 60%', sub: 'Offer sent', icon: <FileDoneOutlined />, color: '#10B981', bg: '#ECFDF5' },
    { label: 'Hired', count: 8, change: '+ 33%', sub: 'Successfully hired', icon: <CheckCircleOutlined />, color: '#059669', bg: '#D1FAE5' }
  ];

  // Filtered applications
  const filteredApps = applications.filter((app) => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) || app.email.toLowerCase().includes(searchTerm.toLowerCase()) || app.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab =
      activeTab === 'All' ? true :
      activeTab === 'Applied' ? app.stage === 'Applied' :
      activeTab === 'Screening' ? app.stage === 'Screening' :
      activeTab === 'Shortlisted' ? app.stage === 'Shortlisted' :
      activeTab === 'Interview' ? app.stage === 'Interview' :
      activeTab === 'Offered' ? app.stage === 'Offer' :
      activeTab === 'Hired' ? app.stage === 'Hired' :
      activeTab === 'Rejected' ? app.stage === 'Rejected' : true;
    return matchesSearch && matchesTab;
  });

  return (
    <Box sx={{ width: '100%', minHeight: '100%', pb: 5 }}>
      {/* ========================================================================= */}
      {/* 1. HEADER                                                                */}
      {/* ========================================================================= */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          mb: 3
        }}
      >
        <Box>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
            <Box sx={{ width: 22, height: 22, borderRadius: '6px', bgcolor: '#F3EDFF', color: '#530EF0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>
              <SolutionOutlined />
            </Box>
            <Typography variant="caption" sx={{ color: '#530EF0', fontWeight: 600, fontSize: 12 }}>
              Applications
            </Typography>
          </Stack>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 700, fontSize: { xs: 22, sm: 24 }, color: '#111827', letterSpacing: '-0.3px',
              
              mb: 0.5
            }}
          >
            Application Management
          </Typography>
          <Typography sx={{ color: '#6B7280', fontSize: 14, fontWeight: 400, lineHeight: 1.5, mt: 0.5 }}>
            Review, screen and manage all job applications across your open positions.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} alignItems="center" flexShrink={0}>
          <Button
            variant="outlined"
            startIcon={<ExportOutlined />}
            endIcon={<DownOutlined style={{ fontSize: 10 }} />}
            onClick={() => setSnackbar({ open: true, message: 'Exporting applications report...', severity: 'info' })}
            sx={{
              borderColor: '#E5E7EB',
              color: '#374151',
              fontWeight: 600, fontSize: 14, borderRadius: '10px',
              textTransform: 'none',
              px: 2,
              py: 0.85
            }}
          >
            Export
          </Button>
        </Stack>
      </Box>

      {/* ========================================================================= */}
      {/* 2. TOP KPI CARDS (7 CARDS)                                               */}
      {/* ========================================================================= */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {kpiStats.map((kpi, idx) => (
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 1.714 }} key={idx}>
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
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.2 }}>
                <Box
                  sx={{ width: 38, height: 38, borderRadius: '10px', bgcolor: kpi.bg, color: kpi.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}
                >
                  {kpi.icon}
                </Box>
                <Chip
                  icon={<ArrowUpOutlined style={{ fontSize: 9, color: '#10B981' }} />}
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
                {kpi.label}
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, color: '#111827', fontSize: 28, my: 0.25 }}>
                {kpi.count}
              </Typography>
              <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 12, fontWeight: 400 }}>
                {kpi.sub}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ========================================================================= */}
      {/* 3. TABS & FILTER BAR                                                     */}
      {/* ========================================================================= */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2, borderBottom: '1px solid #E5E7EB', pb: 1, flexWrap: 'wrap', gap: 1 }}>
        <Stack direction="row" spacing={2.5} sx={{ overflowX: 'auto', py: 0.5 }}>
          {[
            { id: 'All', label: 'All (486)' },
            { id: 'Applied', label: 'Applied (142)' },
            { id: 'Screening', label: 'Screening (100)' },
            { id: 'Shortlisted', label: 'Shortlisted (72)' },
            { id: 'Interview', label: 'Interview (45)' },
            { id: 'Offered', label: 'Offered (12)' },
            { id: 'Hired', label: 'Hired (8)' },
            { id: 'Rejected', label: 'Rejected (107)' }
          ].map((tab) => (
            <Typography
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              sx={{
                cursor: 'pointer',
                fontWeight: activeTab === tab.id ? 700 : 500,
                fontSize: 13.5,
                color: activeTab === tab.id ? '#530EF0' : '#6B7280',
                borderBottom: activeTab === tab.id ? '2px solid #530EF0' : 'none',
                pb: 1,
                mb: -1,
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </Typography>
          ))}
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <Select size="small" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} sx={{ borderRadius: '10px', fontSize: 13, bgcolor: '#FFF' }}>
            <MenuItem value="Last 30 days">Last 30 days</MenuItem>
            <MenuItem value="Last 90 days">Last 90 days</MenuItem>
            <MenuItem value="All Time">All Time</MenuItem>
          </Select>
          <Button
            variant="outlined"
            startIcon={<FilterOutlined />}
            onClick={() => setSnackbar({ open: true, message: 'Filter criteria updated', severity: 'info' })}
            sx={{ borderColor: '#E5E7EB', color: '#530EF0', borderRadius: '10px', textTransform: 'none', px: 1.5 }}
          >
            More Filters
          </Button>
        </Stack>
      </Stack>

      {/* Filters Row */}
      <Card sx={{ p: 1.8, borderRadius: '14px', border: '1px solid #F3F4F6', bgcolor: '#FFF', mb: 2.5 }}>
        <Grid container spacing={1.5} alignItems="center">
          <Grid size={{ xs: 12, md: 4.5 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search by candidate name, job title, email, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlined style={{ color: '#9CA3AF' }} />
                  </InputAdornment>
                )
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
            />
          </Grid>

          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Select fullWidth size="small" value={jobFilter} onChange={(e) => setJobFilter(e.target.value)} sx={{ borderRadius: '10px' }}>
              <MenuItem value="All Jobs">All Jobs</MenuItem>
              <MenuItem value="Software Engineer">Software Engineer</MenuItem>
              <MenuItem value="Product Designer">Product Designer</MenuItem>
              <MenuItem value="Data Analyst">Data Analyst</MenuItem>
            </Select>
          </Grid>

          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Select fullWidth size="small" value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} sx={{ borderRadius: '10px' }}>
              <MenuItem value="All Departments">All Departments</MenuItem>
              <MenuItem value="Engineering">Engineering</MenuItem>
              <MenuItem value="Product">Product</MenuItem>
              <MenuItem value="Design">Design</MenuItem>
            </Select>
          </Grid>

          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Select fullWidth size="small" value={stageFilter} onChange={(e) => setStageFilter(e.target.value)} sx={{ borderRadius: '10px' }}>
              <MenuItem value="All Application Stages">All Application Stages</MenuItem>
              <MenuItem value="Applied">Applied</MenuItem>
              <MenuItem value="Screening">Screening</MenuItem>
              <MenuItem value="Shortlisted">Shortlisted</MenuItem>
              <MenuItem value="Interview">Interview</MenuItem>
            </Select>
          </Grid>

          <Grid size={{ xs: 6, sm: 3, md: 1.5 }}>
            <Select fullWidth size="small" value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)} sx={{ borderRadius: '10px' }}>
              <MenuItem value="All Sources">All Sources</MenuItem>
              <MenuItem value="LinkedIn">LinkedIn</MenuItem>
              <MenuItem value="Naukri">Naukri</MenuItem>
              <MenuItem value="Indeed">Indeed</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Card>

      {/* ========================================================================= */}
      {/* 4. MAIN SPLIT: TABLE + DETAIL PANEL                                      */}
      {/* ========================================================================= */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 2.5, alignItems: 'flex-start', width: '100%' }}>
        {/* Table Container */}
        <Box sx={{ flex: 1, minWidth: 0, width: '100%' }}>
          <Card sx={{ borderRadius: '16px', border: '1px solid #F3F4F6', bgcolor: '#FFF', overflow: 'hidden' }}>
            {/* Bulk Actions Toolbar */}
            {selectedRows.length > 0 && (
              <Box
                sx={{
                  px: 2.5,
                  py: 1.25,
                  bgcolor: '#FAF5FF',
                  borderBottom: '1px solid #E9D5FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 1.5
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Chip
                    label={`${selectedRows.length} ${selectedRows.length === 1 ? 'Application' : 'Applications'} Selected`}
                    size="small"
                    sx={{ bgcolor: '#530EF0', color: '#FFF', fontWeight: 700, fontSize: 12, height: 24 }}
                  />
                  <Typography sx={{ fontSize: 12.5, color: '#6B7280' }}>
                    Bulk Actions:
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      setApplications(applications.map((a) => (selectedRows.includes(a.id) ? { ...a, stage: 'Shortlisted' } : a)));
                      setSnackbar({ open: true, message: `Shortlisted ${selectedRows.length} applications!`, severity: 'success' });
                    }}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30, color: '#6B7280', borderColor: '#D1D5DB' }}
                  >
                    Shortlist ({selectedRows.length})
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      setApplications(applications.map((a) => (selectedRows.includes(a.id) ? { ...a, stage: 'Interview' } : a)));
                      setSnackbar({ open: true, message: `Moved ${selectedRows.length} applications to Interview stage!`, severity: 'info' });
                    }}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30, color: '#6B7280', borderColor: '#D1D5DB' }}
                  >
                    Interview
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setSnackbar({ open: true, message: `Sending email to ${selectedRows.length} candidates...`, severity: 'info' })}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30, color: '#6B7280', borderColor: '#D1D5DB' }}
                  >
                    Send Email
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setSnackbar({ open: true, message: `Exporting ${selectedRows.length} resumes...`, severity: 'success' })}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30, color: '#6B7280', borderColor: '#D1D5DB' }}
                  >
                    Export Resumes
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={() => {
                      setApplications(applications.map((a) => (selectedRows.includes(a.id) ? { ...a, stage: 'Rejected' } : a)));
                      setSelectedRows([]);
                      setSnackbar({ open: true, message: `Rejected ${selectedRows.length} applications.`, severity: 'error' });
                    }}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30 }}
                  >
                    Reject
                  </Button>
                  <Button
                    size="small"
                    onClick={() => setSelectedRows([])}
                    sx={{ textTransform: 'none', color: '#6B7280', fontSize: 12, fontWeight: 600 }}
                  >
                    Deselect All
                  </Button>
                </Stack>
              </Box>
            )}

            <TableContainer>
              <Table size="medium">
                <TableHead sx={{ bgcolor: '#F9FAFB' }}>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        size="small"
                        checked={selectedRows.length === filteredApps.length && filteredApps.length > 0}
                        indeterminate={selectedRows.length > 0 && selectedRows.length < filteredApps.length}
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Candidate</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Job Title</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Source</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Applied On</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Stage</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Match Score</TableCell>
                    <TableCell align="right" sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredApps.map((app) => {
                    const isSelected = selectedApp?.name === app.name;
                    const isChecked = selectedRows.includes(app.id);
                    return (
                      <TableRow
                        key={app.id}
                        hover
                        onClick={() => handleRowClick(app)}
                        sx={{
                          cursor: 'pointer',
                          bgcolor: isSelected || isChecked ? 'rgba(83, 14, 240, 0.04)' : 'inherit'
                        }}
                      >
                        <TableCell padding="checkbox" sx={{ verticalAlign: 'middle' }} onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            size="small"
                            checked={isChecked}
                            onChange={(e) => handleSelectRow(e, app)}
                          />
                        </TableCell>
                        <TableCell sx={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          <Stack direction="row" spacing={1.2} alignItems="center">
                            <Avatar src={app.avatar} sx={{ width: 32, height: 32 }} />
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 700, color: '#111827', fontSize: 13.5, lineHeight: 1.3 }}>
                                {app.name}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 12, fontWeight: 400, lineHeight: 1.2 }}>
                                {app.email}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>
                        <TableCell sx={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: 13.5, lineHeight: 1.3 }}>
                            {app.role}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 12, fontWeight: 400, lineHeight: 1.2 }}>
                            {app.code}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          <Chip label={app.source} size="small" sx={{ height: 22, fontSize: 11, fontWeight: 600, bgcolor: '#F9FAFB', color: '#4B5563' }} />
                        </TableCell>
                        <TableCell sx={{ fontSize: 12.5, color: '#6B7280', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>{app.appliedOn}</TableCell>
                        <TableCell sx={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          <Chip
                            label={app.stage}
                            size="small"
                            sx={{
                              height: 22,
                              fontSize: 11,
                              fontWeight: 700,
                              bgcolor:
                                app.stage === 'Shortlisted' ? 'rgba(16, 185, 129, 0.1)' :
                                app.stage === 'Screening' ? 'rgba(59, 130, 246, 0.1)' :
                                app.stage === 'Interview' ? 'rgba(139, 92, 246, 0.1)' :
                                app.stage === 'Offer' ? 'rgba(16, 185, 129, 0.1)' :
                                app.stage === 'Rejected' ? 'rgba(239, 68, 68, 0.1)' : '#F3F4F6',
                              color:
                                app.stage === 'Shortlisted' ? '#10B981' :
                                app.stage === 'Screening' ? '#2563EB' :
                                app.stage === 'Interview' ? '#8B5CF6' :
                                app.stage === 'Offer' ? '#10B981' :
                                app.stage === 'Rejected' ? '#EF4444' : '#6B7280'
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: '50%',
                              border: `2.5px solid ${app.matchScore >= 80 ? '#10B981' : app.matchScore >= 70 ? '#F59E0B' : '#EF4444'}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 800,
                              fontSize: 11.5,
                              color: app.matchScore >= 80 ? '#10B981' : app.matchScore >= 70 ? '#D97706' : '#EF4444'
                            }}
                          >
                            {app.matchScore}%
                          </Box>
                        </TableCell>
                        <TableCell align="right" sx={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          <IconButton size="small" onClick={() => setSnackbar({ open: true, message: `Application options for ${app.name} opened`, severity: 'info' })}><MoreOutlined style={{ color: '#9CA3AF' }} /></IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ p: 2, borderTop: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="caption" sx={{ color: '#6B7280' }}>Showing 1-10 of 486 applications</Typography>
              <Pagination count={5} size="small" sx={{ '& .Mui-selected': { bgcolor: '#530EF0 !important', color: '#FFF' } }} />
            </Box>
          </Card>
        </Box>

        {/* ======================================================================= */}
        {/* RIGHT DETAIL PANEL (for selected application)                          */}
        {/* ======================================================================= */}
        {selectedApp && (
          <Box sx={{ width: { xs: '100%', lg: 380 }, flexShrink: 0 }}>
            <Card sx={{ p: 2.5, borderRadius: '16px', border: '1px solid #F3F4F6', bgcolor: '#FFF' }}>
              {/* Header */}
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Avatar src={selectedApp.avatar} sx={{ width: 44, height: 44 }} />
                  <Box>
                    <Stack direction="row" spacing={0.8} alignItems="center">
                      <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#111827', fontSize: 14 }}>
                        {selectedApp.name}
                      </Typography>
                      <Chip label={`${selectedApp.matchScore}% Match`} size="small" sx={{ height: 20, fontSize: 11, fontWeight: 700, bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#10B981' }} />
                    </Stack>
                    <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12, display: 'block' }}>
                      {selectedApp.role}
                    </Typography>
                  </Box>
                </Stack>
                <IconButton size="small" onClick={() => setSelectedApp(null)}><CloseOutlined style={{ color: '#9CA3AF', fontSize: 12 }} /></IconButton>
              </Stack>

              <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12, display: 'block', mb: 0.5 }}>
                📍 {selectedApp.location || 'Bengaluru, Karnataka'} • 💼 {selectedApp.exp || '2+ years'}
              </Typography>
              <Typography variant="caption" sx={{ color: '#530EF0', fontSize: 12, display: 'block', mb: 0.5 }}>
                ✉️ {selectedApp.email} • 📞 {selectedApp.phone}
              </Typography>
              <Typography variant="caption" sx={{ color: '#2563EB', fontSize: 12, display: 'block', mb: 2 }}>
                🔗 {selectedApp.linkedin || 'linkedin.com/in/candidate'}
              </Typography>

              {/* Action Buttons */}
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Button
                  size="small"
                  variant="contained"
                  endIcon={<DownOutlined style={{ fontSize: 9 }} />}
                  onClick={() => {
                    setApplications(prev => prev.map(a => a.id === selectedApp.id ? { ...a, stage: 'Interview' } : a));
                    setSelectedApp(prev => ({ ...prev, stage: 'Interview' }));
                    setSnackbar({ open: true, message: `Moved ${selectedApp.name} to Interview stage!`, severity: 'success' });
                  }}
                  sx={{ bgcolor: '#530EF0', color: '#FFF', fontWeight: 700, textTransform: 'none', borderRadius: '8px', fontSize: 12, flex: 1 }}
                >
                  Move Stage
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<CalendarOutlined />}
                  onClick={() => setSnackbar({ open: true, message: `Interview scheduler opened for ${selectedApp.name}`, severity: 'info' })}
                  sx={{ borderColor: '#530EF0', color: '#530EF0', textTransform: 'none', borderRadius: '8px', fontSize: 12, whiteSpace: 'nowrap' }}
                >
                  Schedule Interview
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setSnackbar({ open: true, message: `Candidate history and logs opened for ${selectedApp.name}`, severity: 'info' })}
                  sx={{ borderColor: '#E5E7EB', color: '#374151', textTransform: 'none', borderRadius: '8px', fontSize: 12 }}
                >
                  More
                </Button>
              </Stack>

              {/* Subtabs */}
              <Tabs
                value={drawerTab}
                onChange={(e, v) => setDrawerTab(v)}
                sx={{
                  borderBottom: '1px solid #F3F4F6',
                  mb: 2,
                  '& .MuiTabs-indicator': { bgcolor: '#530EF0' },
                  '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, fontSize: 12, minWidth: 50, p: 0.8, color: '#6B7280', '&.Mui-selected': { color: '#530EF0' } }
                }}
              >
                <Tab label="Overview" />
                <Tab label="Resume" />
                <Tab label="Application" />
                <Tab label="Notes" />
                <Tab label="Activity" />
              </Tabs>

              {/* Tab 0: Overview */}
              {drawerTab === 0 && (
                <Stack spacing={2}>
                  {/* Application Details with Match Score circular gauge */}
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', fontSize: 13.5, mb: 1, display: 'block' }}>
                      📋 Application Details
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Stack spacing={0.6} sx={{ flex: 1 }}>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11.5 }}>Applied On</Typography>
                          <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', fontSize: 11.5 }}>{selectedApp.appliedOn}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11.5 }}>Source</Typography>
                          <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', fontSize: 11.5 }}>{selectedApp.source}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11.5 }}>Application ID</Typography>
                          <Typography variant="caption" sx={{ fontWeight: 700, color: '#530EF0', fontSize: 11.5 }}>{selectedApp.id}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11.5 }}>Current Stage</Typography>
                          <Chip label={selectedApp.stage} size="small" sx={{ height: 18, fontSize: '0.64rem', fontWeight: 700, bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#10B981' }} />
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11.5 }}>Applied For</Typography>
                          <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', fontSize: 11.5 }}>{selectedApp.role}</Typography>
                        </Stack>
                      </Stack>

                      {/* Circular Gauge */}
                      <Box sx={{ width: 68, height: 68, borderRadius: '50%', border: '4px solid #10B981', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', ml: 2, flexShrink: 0 }}>
                        <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: '#10B981', lineHeight: 1 }}>
                          {selectedApp.matchScore}%
                        </Typography>
                        <Typography sx={{ fontSize: '0.58rem', color: '#6B7280' }}>Match</Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Skills */}
                  <Box>
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', fontSize: 13.5 }}>Skills</Typography>
                    </Box>
                    <Stack direction="row" spacing={0.6} flexWrap="wrap" useFlexGap>
                      {(selectedApp.skills || ['React', 'Node.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS']).map((sk) => (
                        <Chip key={sk} label={sk} size="small" sx={{ height: 22, fontSize: 11, bgcolor: '#F3F4F6' }} />
                      ))}
                    </Stack>
                  </Box>

                  {/* Experience */}
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', fontSize: 13.5, mb: 0.5, display: 'block' }}>Experience</Typography>
                    <Box sx={{ p: 1.2, borderRadius: '10px', bgcolor: '#FAFAFB', border: '1px solid #F3F4F6' }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', display: 'block' }}>
                        Software Engineer
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11.5, display: 'block' }}>
                        TechSolutions Pvt. Ltd.
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11 }}>
                        Jun 2023 - Present • 2 yrs 4 mos
                      </Typography>
                    </Box>
                  </Box>

                  {/* Education */}
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', fontSize: 13.5, mb: 0.5, display: 'block' }}>Education</Typography>
                    <Box sx={{ p: 1.2, borderRadius: '10px', bgcolor: '#FAFAFB', border: '1px solid #F3F4F6' }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', display: 'block' }}>
                        B.E. in Computer Science
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11.5, display: 'block' }}>
                        Anna University, Chennai
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11 }}>
                        2019 - 2023
                      </Typography>
                    </Box>
                  </Box>

                  {/* Bottom Action Toolbar */}
                  <Grid container spacing={1} sx={{ pt: 1 }}>
                    <Grid size={{ xs: 6 }}>
                      <Button
                        fullWidth
                        size="small"
                        variant="outlined"
                        startIcon={<DownloadOutlined />}
                        onClick={() => setSnackbar({ open: true, message: `Downloading ${selectedApp.name}'s resume...`, severity: 'success' })}
                        sx={{ borderColor: '#E5E7EB', color: '#374151', textTransform: 'none', borderRadius: '8px', fontSize: 11.5 }}
                      >
                        Download Resume
                      </Button>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Button
                        fullWidth
                        size="small"
                        variant="outlined"
                        startIcon={<EyeOutlined />}
                        onClick={() => setResumeViewerCandidate(selectedApp)}
                        sx={{ borderColor: '#530EF0', color: '#530EF0', textTransform: 'none', borderRadius: '8px', fontSize: 11.5 }}
                      >
                        View Resume
                      </Button>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Button
                        fullWidth
                        size="small"
                        variant="outlined"
                        startIcon={<ShareAltOutlined />}
                        onClick={() => setSnackbar({ open: true, message: `Application details for ${selectedApp.name} shared with hiring team!`, severity: 'info' })}
                        sx={{ borderColor: '#E5E7EB', color: '#374151', textTransform: 'none', borderRadius: '8px', fontSize: 11.5 }}
                      >
                        Share
                      </Button>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Button
                        fullWidth
                        size="small"
                        variant="outlined"
                        startIcon={<StopOutlined />}
                        onClick={() => {
                          setApplications(applications.map((a) => (a.id === selectedApp.id ? { ...a, stage: 'Rejected' } : a)));
                          setSelectedApp({ ...selectedApp, stage: 'Rejected' });
                          setSnackbar({ open: true, message: `Application ${selectedApp.id} moved to Rejected stage.`, severity: 'error' });
                        }}
                        sx={{ borderColor: '#FCA5A5', color: '#EF4444', textTransform: 'none', borderRadius: '8px', fontSize: 11.5 }}
                      >
                        Reject
                      </Button>
                    </Grid>
                  </Grid>
                </Stack>
              )}

              {/* Tab 1: Resume */}
              {drawerTab === 1 && (
                <Stack spacing={2}>
                  <Box sx={{ p: 2, borderRadius: '12px', bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                      <Box sx={{ width: 42, height: 42, borderRadius: '10px', bgcolor: '#FEE2E2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                        <FilePdfOutlined />
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#111827', fontSize: 13, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                          {`${selectedApp.name.replace(/\s+/g, '_')}_Resume.pdf`}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11.5, display: 'block' }}>
                          2.4 MB • Applied on {selectedApp.appliedOn}
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack direction="row" spacing={1}>
                      <Button
                        fullWidth
                        size="small"
                        variant="contained"
                        startIcon={<DownloadOutlined />}
                        onClick={() => setSnackbar({ open: true, message: `Downloading ${selectedApp.name}'s resume PDF...`, severity: 'success' })}
                        sx={{ bgcolor: '#530EF0', color: '#FFF', fontWeight: 700, fontSize: 12, textTransform: 'none', borderRadius: '8px', '&:hover': { bgcolor: '#430BC2' } }}
                      >
                        Download PDF
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<EyeOutlined />}
                        onClick={() => setSnackbar({ open: true, message: `Opening preview for ${selectedApp.name}'s resume...`, severity: 'info' })}
                        sx={{ borderColor: '#E5E7EB', color: '#374151', fontWeight: 600, fontSize: 12, textTransform: 'none', borderRadius: '8px' }}
                      >
                        Preview
                      </Button>
                    </Stack>
                  </Box>

                  <Alert severity="info" icon={<LockOutlined style={{ fontSize: 14 }} />} sx={{ fontSize: 11.5, py: 0.5, borderRadius: '8px' }}>
                    Applicant submission is locked and audit-verified. HR accounts cannot alter or tamper with candidate resumes.
                  </Alert>
                </Stack>
              )}

              {/* Tab 2: Full Application */}
              {drawerTab === 2 && (
                <Stack spacing={1.5}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', fontSize: 13 }}>
                    Application Details & Metadata
                  </Typography>
                  <Box sx={{ p: 1.5, borderRadius: '10px', bgcolor: '#F9FAFB', border: '1px solid #F3F4F6' }}>
                    <Stack spacing={0.75}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11.5 }}>Job Role</Typography>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', fontSize: 11.5 }}>{selectedApp.role}</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11.5 }}>Requisition Code</Typography>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#530EF0', fontSize: 11.5 }}>{selectedApp.code}</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11.5 }}>Candidate Email</Typography>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', fontSize: 11.5 }}>{selectedApp.email}</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11.5 }}>Contact Phone</Typography>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', fontSize: 11.5 }}>{selectedApp.phone}</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11.5 }}>Submission Source</Typography>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', fontSize: 11.5 }}>{selectedApp.source}</Typography>
                      </Stack>
                    </Stack>
                  </Box>
                </Stack>
              )}

              {/* Tab 3: Recruiter Notes */}
              {drawerTab === 3 && (
                <Stack spacing={1.5}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', fontSize: 13 }}>
                    Internal HR Evaluation Notes
                  </Typography>
                  <Box sx={{ p: 1.5, borderRadius: '10px', bgcolor: '#F9FAFB', border: '1px solid #F3F4F6' }}>
                    <Typography variant="caption" sx={{ color: '#4B5563', fontSize: 12, display: 'block', mb: 0.5 }}>
                      "Candidate resume screened against requirements. Strong cultural alignment and matches tech stack."
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11 }}>
                      Added by HR Recruiter • Oct 28, 2025
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    size="small"
                    multiline
                    rows={2}
                    placeholder="Add an internal evaluation note..."
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', fontSize: 12 } }}
                  />
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => setSnackbar({ open: true, message: 'Internal evaluation note saved!', severity: 'success' })}
                    sx={{ bgcolor: '#530EF0', color: '#FFF', fontWeight: 700, textTransform: 'none', borderRadius: '8px', alignSelf: 'flex-end', fontSize: 11.5 }}
                  >
                    Save Note
                  </Button>
                </Stack>
              )}

              {/* Tab 4: Activity */}
              {drawerTab === 4 && (
                <Stack spacing={1.5}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', fontSize: 13 }}>
                    Timeline & Hiring Activity
                  </Typography>
                  {[
                    { action: 'Application Submitted', date: selectedApp.appliedOn, by: 'Applicant' },
                    { action: 'Screening Completed', date: 'Just now', by: 'System AI' }
                  ].map((act, i) => (
                    <Box key={i} sx={{ p: 1.2, borderRadius: '8px', bgcolor: '#F9FAFB', border: '1px solid #F3F4F6' }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', display: 'block' }}>
                        {act.action}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11 }}>
                        {act.date} • {act.by}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              )}
            </Card>
          </Box>
        )}
      </Box>

      {/* Toast Notification */}
      <FullScreenResumeDialog
        open={Boolean(resumeViewerCandidate)}
        onClose={() => setResumeViewerCandidate(null)}
        candidate={resumeViewerCandidate}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

