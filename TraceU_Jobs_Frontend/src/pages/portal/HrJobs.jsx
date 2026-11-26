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

// icons
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import SendOutlined from '@ant-design/icons/SendOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import FilterOutlined from '@ant-design/icons/FilterOutlined';
import MoreOutlined from '@ant-design/icons/MoreOutlined';
import ArrowUpOutlined from '@ant-design/icons/ArrowUpOutlined';
import ArrowDownOutlined from '@ant-design/icons/ArrowDownOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import ShopOutlined from '@ant-design/icons/ShopOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import PauseCircleOutlined from '@ant-design/icons/PauseCircleOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import GlobalOutlined from '@ant-design/icons/GlobalOutlined';
import LinkedinFilled from '@ant-design/icons/LinkedinFilled';
import CodeOutlined from '@ant-design/icons/CodeOutlined';

export default function HrJobs() {
  const navigate = useNavigate();

  // Active Tab
  const [activeTab, setActiveTab] = useState('All');

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [typeFilter, setTypeFilter] = useState('All Job Types');
  const [dateFilter, setDateFilter] = useState('Last 30 days');

  // Selected Job for Right Side Detail Panel
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectRow = (e, job) => {
    e.stopPropagation();
    const id = job.id;
    setSelectedRows((prev) => {
      const isAlready = prev.includes(id);
      if (isAlready) {
        const next = prev.filter((r) => r !== id);
        if (selectedJob?.id === id) {
          const remaining = filteredJobs.find((j) => next.includes(j.id));
          setSelectedJob(remaining || null);
        }
        return next;
      } else {
        setSelectedJob(job);
        return [...prev, id];
      }
    });
  };

  const handleRowClick = (job) => {
    const id = job.id;
    if (selectedJob?.id === id && selectedRows.includes(id)) {
      setSelectedJob(null);
      setSelectedRows((prev) => prev.filter((r) => r !== id));
    } else {
      setSelectedJob(job);
      setSelectedRows((prev) => (prev.includes(id) ? prev : [...prev, id]));
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = filteredJobs.map((j) => j.id);
      setSelectedRows(allIds);
      if (filteredJobs.length > 0) setSelectedJob(filteredJobs[0]);
    } else {
      setSelectedRows([]);
      setSelectedJob(null);
    }
  };

  // Drawer subtabs
  const [drawerTab, setDrawerTab] = useState(0);

  // New Job Modal Dialog
  const [openNewDialog, setOpenNewDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [newJob, setNewJob] = useState({ title: '', dept: 'Engineering', location: 'Bengaluru', desc: '' });
  const [jobErrors, setJobErrors] = useState({});

  const handleOpenEdit = (job) => {
    const target = job || selectedJob;
    if (!target) return;
    setEditingJob({ ...target });
    setOpenEditDialog(true);
  };

  const handleSaveEdit = () => {
    if (!editingJob || !editingJob.title.trim()) {
      setSnackbar({ open: true, message: 'Job title is required', severity: 'warning' });
      return;
    }
    setJobs((prev) => prev.map((j) => (j.id === editingJob.id ? { ...j, ...editingJob } : j)));
    if (selectedJob?.id === editingJob.id) {
      setSelectedJob((prev) => ({ ...prev, ...editingJob }));
    }
    setOpenEditDialog(false);
    setSnackbar({ open: true, message: `Job ${editingJob.id} updated successfully!`, severity: 'success' });
  };

  // 10 Jobs list matching screenshot exactly
  const [jobs, setJobs] = useState([
    { id: 'JOB-0012', title: 'Senior Software Engineer', dept: 'Engineering', location: 'Bengaluru', type: 'Full-time', applications: 142, status: 'Published', postedOn: 'Oct 21, 2025', exp: '3+ years', iconColor: '#530EF0', iconBg: 'rgba(83, 14, 240, 0.08)' },
    { id: 'JOB-0011', title: 'Product Manager', dept: 'Product', location: 'Chennai', type: 'Full-time', applications: 98, status: 'Published', postedOn: 'Oct 19, 2025', exp: '5+ years', iconColor: '#EC4899', iconBg: 'rgba(236, 72, 153, 0.08)' },
    { id: 'JOB-0010', title: 'Data Analyst', dept: 'Data & Analytics', location: 'Hyderabad', type: 'Full-time', applications: 76, status: 'Draft', postedOn: 'Oct 18, 2025', exp: '2+ years', iconColor: '#06B6D4', iconBg: 'rgba(6, 182, 212, 0.08)' },
    { id: 'JOB-0009', title: 'UI/UX Designer', dept: 'Design', location: 'Bengaluru', type: 'Full-time', applications: 54, status: 'Published', postedOn: 'Oct 16, 2025', exp: '3+ years', iconColor: '#8B5CF6', iconBg: 'rgba(139, 92, 246, 0.08)' },
    { id: 'JOB-0008', title: 'Machine Learning Engineer', dept: 'Data & Analytics', location: 'Pune', type: 'Full-time', applications: 64, status: 'Paused', postedOn: 'Oct 14, 2025', exp: '4+ years', iconColor: '#F59E0B', iconBg: 'rgba(245, 158, 11, 0.08)' },
    { id: 'JOB-0007', title: 'Backend Developer', dept: 'Engineering', location: 'Chennai', type: 'Full-time', applications: 81, status: 'Published', postedOn: 'Oct 12, 2025', exp: '3+ years', iconColor: '#3B82F6', iconBg: 'rgba(59, 130, 246, 0.08)' },
    { id: 'JOB-0006', title: 'Sales Executive', dept: 'Sales', location: 'Coimbatore', type: 'Full-time', applications: 68, status: 'Published', postedOn: 'Oct 10, 2025', exp: '1+ years', iconColor: '#10B981', iconBg: 'rgba(16, 185, 129, 0.08)' },
    { id: 'JOB-0005', title: 'HR Coordinator', dept: 'Human Resources', location: 'Bengaluru', type: 'Full-time', applications: 32, status: 'Closed', postedOn: 'Oct 08, 2025', exp: '2+ years', iconColor: '#EF4444', iconBg: 'rgba(239, 68, 68, 0.08)' },
    { id: 'JOB-0004', title: 'DevOps Engineer', dept: 'Engineering', location: 'Remote', type: 'Full-time', applications: 45, status: 'Published', postedOn: 'Oct 06, 2025', exp: '4+ years', iconColor: '#2563EB', iconBg: 'rgba(37, 99, 235, 0.08)' },
    { id: 'JOB-0003', title: 'Digital Marketing Specialist', dept: 'Marketing', location: 'Chennai', type: 'Full-time', applications: 39, status: 'Draft', postedOn: 'Oct 04, 2025', exp: '2+ years', iconColor: '#F97316', iconBg: 'rgba(249, 115, 22, 0.08)' }
  ]);

  // Top KPI Stats
  const kpiStats = [
    { label: 'Total Jobs', count: 24, change: '+ 12%', sub: 'Across all departments', icon: <ShopOutlined />, color: '#6929E2', bg: '#F3EDFF' },
    { label: 'Published', count: 18, change: '+ 20%', sub: 'Visible on careers portal', icon: <CheckCircleOutlined />, color: '#10B981', bg: '#ECFDF5' },
    { label: 'Draft', count: 4, change: '- 25%', sub: 'Not yet published', icon: <ClockCircleOutlined />, color: '#F59E0B', bg: '#FFFBEB' },
    { label: 'Paused', count: 2, change: null, sub: 'Temporarily on hold', icon: <PauseCircleOutlined />, color: '#3B82F6', bg: '#EFF6FF' },
    { label: 'Closed', count: 0, change: null, sub: 'No active closures', icon: <CloseCircleOutlined />, color: '#EF4444', bg: '#FEF2F2' }
  ];

  // Filtered jobs
  const filteredJobs = jobs.filter((j) => {
    const matchesSearch = j.title.toLowerCase().includes(searchTerm.toLowerCase()) || j.id.toLowerCase().includes(searchTerm.toLowerCase()) || j.dept.toLowerCase().includes(searchTerm.toLowerCase()) || j.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab =
      activeTab === 'All' ? true :
      activeTab === 'Published' ? j.status === 'Published' :
      activeTab === 'Draft' ? j.status === 'Draft' :
      activeTab === 'Paused' ? j.status === 'Paused' :
      activeTab === 'Closed' ? j.status === 'Closed' : true;
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
              <ShopOutlined />
            </Box>
            <Typography variant="caption" sx={{ color: '#530EF0', fontWeight: 600, fontSize: 12 }}>
              Jobs
            </Typography>
          </Stack>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 700, fontSize: { xs: 22, sm: 24 }, color: '#111827', letterSpacing: '-0.3px',
              
              mb: 0.5
            }}
          >
            Job Management
          </Typography>
          <Typography sx={{ color: '#6B7280', fontSize: 14, fontWeight: 400, lineHeight: 1.5, mt: 0.5 }}>
            Create, edit, publish and manage job vacancies on your careers portal and job boards.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} alignItems="center" flexShrink={0}>
          <Button
            variant="outlined"
            startIcon={<SendOutlined />}
            onClick={() => setSnackbar({ open: true, message: 'Jobs published to LinkedIn and Naukri!', severity: 'info' })}
            sx={{
              borderColor: '#E2E8F0',
              color: '#334155',
              bgcolor: '#FFFFFF',
              fontWeight: 600,
              fontSize: 14,
              borderRadius: '8px',
              height: 40,
              minHeight: 40,
              textTransform: 'none',
              px: 2,
              whiteSpace: 'nowrap',
              '&:hover': { borderColor: '#CBD5E1', bgcolor: '#F8FAFC' }
            }}
          >
            Publish to Job Boards
          </Button>
          <Button
            variant="contained"
            startIcon={<PlusOutlined />}
            onClick={() => setOpenNewDialog(true)}
            sx={{
              bgcolor: '#530EF0',
              color: '#FFF',
              fontWeight: 600,
              fontSize: 14,
              borderRadius: '8px',
              height: 40,
              minHeight: 40,
              textTransform: 'none',
              px: 2,
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 14px rgba(83, 14, 240, 0.25)',
              '&:hover': { bgcolor: '#430bc2' }
            }}
          >
            Create Job
          </Button>
        </Stack>
      </Box>

      {/* ========================================================================= */}
      {/* 2. TOP KPI CARDS (5 CARDS)                                               */}
      {/* ========================================================================= */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {kpiStats.map((kpi, idx) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }} key={idx}>
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
                justifyContent: 'space-between'
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
                {kpi.change && (
                  <Chip
                    icon={kpi.change.startsWith('+') ? <ArrowUpOutlined style={{ fontSize: 10, color: '#10B981' }} /> : <ArrowDownOutlined style={{ fontSize: 10, color: '#EF4444' }} />}
                    label={kpi.change}
                    size="small"
                    sx={{
                      bgcolor: kpi.change.startsWith('+') ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
                      color: kpi.change.startsWith('+') ? '#10B981' : '#EF4444',
                      fontWeight: 500, fontSize: 11, height: 22, borderRadius: '6px'
                    }}
                  />
                )}
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
        <Stack direction="row" spacing={3}>
          {[
            { id: 'All', label: 'All Jobs (24)' },
            { id: 'Published', label: 'Published (18)' },
            { id: 'Draft', label: 'Draft (4)' },
            { id: 'Paused', label: 'Paused (2)' },
            { id: 'Closed', label: 'Closed (0)' }
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
                mb: -1
              }}
            >
              {tab.label}
            </Typography>
          ))}
        </Stack>

        <Select size="small" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} sx={{ borderRadius: '10px', fontSize: 13, bgcolor: '#FFF' }}>
          <MenuItem value="Last 30 days">Last 30 days</MenuItem>
          <MenuItem value="Last 90 days">Last 90 days</MenuItem>
          <MenuItem value="All Time">All Time</MenuItem>
        </Select>
      </Stack>

      {/* Filters Row */}
      <Card sx={{ p: 1.8, borderRadius: '14px', border: '1px solid #F3F4F6', bgcolor: '#FFF', mb: 2.5 }}>
        <Grid container spacing={1.5} alignItems="center">
          <Grid size={{ xs: 12, md: 4.5 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search by job title, department, location, or keyword..."
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

          <Grid size={{ xs: 6, sm: 3, md: 2.2 }}>
            <Select fullWidth size="small" value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} sx={{ borderRadius: '10px' }}>
              <MenuItem value="All Departments">All Departments</MenuItem>
              <MenuItem value="Engineering">Engineering</MenuItem>
              <MenuItem value="Product">Product</MenuItem>
              <MenuItem value="Design">Design</MenuItem>
              <MenuItem value="Sales">Sales</MenuItem>
            </Select>
          </Grid>

          <Grid size={{ xs: 6, sm: 3, md: 2.2 }}>
            <Select fullWidth size="small" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} sx={{ borderRadius: '10px' }}>
              <MenuItem value="All Locations">All Locations</MenuItem>
              <MenuItem value="Bengaluru">Bengaluru</MenuItem>
              <MenuItem value="Chennai">Chennai</MenuItem>
              <MenuItem value="Hyderabad">Hyderabad</MenuItem>
              <MenuItem value="Remote">Remote</MenuItem>
            </Select>
          </Grid>

          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Select fullWidth size="small" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} sx={{ borderRadius: '10px' }}>
              <MenuItem value="All Job Types">All Job Types</MenuItem>
              <MenuItem value="Full-time">Full-time</MenuItem>
              <MenuItem value="Part-time">Part-time</MenuItem>
              <MenuItem value="Contract">Contract</MenuItem>
            </Select>
          </Grid>

          <Grid size={{ xs: 6, sm: 3, md: 1.1 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FilterOutlined />}
              onClick={() => setSnackbar({ open: true, message: 'Filter criteria updated', severity: 'info' })}
              sx={{ borderColor: '#E5E7EB', color: '#530EF0', borderRadius: '10px', textTransform: 'none', px: 1 }}
            >
              More
            </Button>
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
                    label={`${selectedRows.length} ${selectedRows.length === 1 ? 'Job' : 'Jobs'} Selected`}
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
                      setJobs(jobs.map((j) => (selectedRows.includes(j.id) ? { ...j, status: 'Paused' } : j)));
                      setSnackbar({ open: true, message: `Paused ${selectedRows.length} jobs!`, severity: 'info' });
                    }}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30, color: '#6B7280', borderColor: '#D1D5DB' }}
                  >
                    Pause ({selectedRows.length})
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      setJobs(jobs.map((j) => (selectedRows.includes(j.id) ? { ...j, status: 'Closed' } : j)));
                      setSnackbar({ open: true, message: `Closed ${selectedRows.length} jobs!`, severity: 'info' });
                    }}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30, color: '#6B7280', borderColor: '#D1D5DB' }}
                  >
                    Close
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setSnackbar({ open: true, message: `Exporting data for ${selectedRows.length} jobs...`, severity: 'success' })}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30, color: '#6B7280', borderColor: '#D1D5DB' }}
                  >
                    Export
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={() => {
                      setJobs(jobs.filter((j) => !selectedRows.includes(j.id)));
                      setSelectedRows([]);
                      setSelectedJob(null);
                      setSnackbar({ open: true, message: `Deleted ${selectedRows.length} jobs.`, severity: 'error' });
                    }}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30 }}
                  >
                    Delete
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
                        checked={selectedRows.length === filteredJobs.length && filteredJobs.length > 0}
                        indeterminate={selectedRows.length > 0 && selectedRows.length < filteredJobs.length}
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Job Title</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Department</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Location</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Job Type</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Applications</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Status</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Posted On</TableCell>
                    <TableCell align="right" sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredJobs.map((job) => {
                    const isSelected = selectedJob?.id === job.id;
                    const isChecked = selectedRows.includes(job.id);
                    return (
                      <TableRow
                        key={job.id}
                        hover
                        onClick={() => handleRowClick(job)}
                        sx={{
                          cursor: 'pointer',
                          bgcolor: isSelected || isChecked ? 'rgba(83, 14, 240, 0.04)' : 'inherit'
                        }}
                      >
                        <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            size="small"
                            checked={isChecked}
                            onChange={(e) => handleSelectRow(e, job)}
                          />
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1.2} alignItems="center">
                            <Box sx={{ width: 28, height: 28, borderRadius: '8px', bgcolor: job.iconBg, color: job.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>
                              <CodeOutlined />
                            </Box>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 700, color: '#111827', fontSize: 13.5 }}>
                                {job.title}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#530EF0', fontWeight: 600, fontSize: 11.5 }}>
                                {job.id}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>
                        <TableCell sx={{ fontSize: 13, color: '#4B5563' }}>{job.dept}</TableCell>
                        <TableCell sx={{ fontSize: 13, color: '#4B5563' }}>{job.location}</TableCell>
                        <TableCell sx={{ fontSize: 13, color: '#4B5563' }}>{job.type}</TableCell>
                        <TableCell sx={{ fontSize: 13.5, fontWeight: 700, color: '#111827' }}>{job.applications}</TableCell>
                        <TableCell>
                          <Chip
                            label={job.status}
                            size="small"
                            sx={{
                              height: 22,
                              fontSize: 11,
                              fontWeight: 700,
                              bgcolor:
                                job.status === 'Published' ? 'rgba(16, 185, 129, 0.1)' :
                                job.status === 'Draft' ? 'rgba(245, 158, 11, 0.1)' :
                                job.status === 'Paused' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                              color:
                                job.status === 'Published' ? '#10B981' :
                                job.status === 'Draft' ? '#D97706' :
                                job.status === 'Paused' ? '#2563EB' : '#EF4444'
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ fontSize: 12.5, color: '#6B7280' }}>{job.postedOn}</TableCell>
                        <TableCell align="right">
                          <IconButton size="small" onClick={() => setSnackbar({ open: true, message: `Job options for ${job.title} opened`, severity: 'info' })}><MoreOutlined style={{ color: '#9CA3AF' }} /></IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ p: 2, borderTop: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="caption" sx={{ color: '#6B7280' }}>Showing 1-10 of 24 jobs</Typography>
              <Pagination count={3} size="small" sx={{ '& .Mui-selected': { bgcolor: '#530EF0 !important', color: '#FFF' } }} />
            </Box>
          </Card>
        </Box>

        {/* ======================================================================= */}
        {/* RIGHT DETAIL PANEL (for selected job)                                  */}
        {/* ======================================================================= */}
        {selectedJob && (
          <Box sx={{ width: { xs: '100%', lg: 380 }, flexShrink: 0 }}>
            <Card sx={{ p: 2.5, borderRadius: '16px', border: '1px solid #F3F4F6', bgcolor: '#FFF' }}>
              {/* Header */}
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box sx={{ width: 28, height: 28, borderRadius: '8px', bgcolor: 'rgba(83, 14, 240, 0.1)', color: '#530EF0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>
                    <CodeOutlined />
                  </Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#530EF0', fontSize: 13.5 }}>
                    {selectedJob.id}
                  </Typography>
                  <Chip
                    label={selectedJob.status}
                    size="small"
                    sx={{ height: 20, fontSize: 11, fontWeight: 700, bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#10B981' }}
                  />
                </Stack>
                <Stack direction="row" spacing={0.5}>
                  <IconButton size="small" onClick={() => setSnackbar({ open: true, message: `Job options for ${selectedJob.title} opened`, severity: 'info' })}><MoreOutlined style={{ color: '#9CA3AF' }} /></IconButton>
                  <IconButton size="small" onClick={() => setSelectedJob(null)}><CloseOutlined style={{ color: '#9CA3AF', fontSize: 12 }} /></IconButton>
                </Stack>
              </Stack>

              {/* Title & subtitle */}
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#111827', fontSize: '1.05rem', mb: 0.5 }}>
                {selectedJob.title}
              </Typography>
              <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12, display: 'block', mb: 2 }}>
                🏢 {selectedJob.dept} • 📍 {selectedJob.location} • 💼 {selectedJob.type} • 💼 {selectedJob.exp}
              </Typography>

              {/* Action Buttons */}
              <Stack direction="row" spacing={1.5} sx={{ mb: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<EditOutlined />}
                  onClick={() => handleOpenEdit(selectedJob)}
                  sx={{ bgcolor: '#530EF0', color: '#FFF', fontWeight: 700, fontSize: 12.5, textTransform: 'none', borderRadius: '10px' }}
                >
                  Edit Job
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => navigate('/hr/applications')}
                  sx={{ borderColor: '#530EF0', color: '#530EF0', fontWeight: 700, fontSize: 12.5, textTransform: 'none', borderRadius: '10px', whiteSpace: 'nowrap' }}
                >
                  View Applications ({selectedJob.applications})
                </Button>
              </Stack>

              {/* Tabs */}
              <Tabs
                value={drawerTab}
                onChange={(e, v) => setDrawerTab(v)}
                sx={{
                  borderBottom: '1px solid #F3F4F6',
                  mb: 2,
                  '& .MuiTabs-indicator': { bgcolor: '#530EF0' },
                  '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, fontSize: 12, minWidth: 60, p: 0.8, color: '#6B7280', '&.Mui-selected': { color: '#530EF0' } }
                }}
              >
                <Tab label="Overview" />
                <Tab label="Description" />
                <Tab label="Requirements" />
                <Tab label="Application Questions" />
              </Tabs>

              {/* Tab 0: Overview */}
              {drawerTab === 0 && (
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', fontSize: 13.5, mb: 1, display: 'block' }}>
                      📋 Job Overview
                    </Typography>
                    <Stack spacing={0.8}>
                      {[
                        { label: 'Job Title', value: selectedJob.title },
                        { label: 'Department', value: selectedJob.dept },
                        { label: 'Employment Type', value: selectedJob.type },
                        { label: 'Experience', value: selectedJob.exp },
                        { label: 'Location', value: `${selectedJob.location} (${selectedJob.workMode || 'Hybrid'})` },
                        { label: 'Positions', value: selectedJob.positions || 3 },
                        { label: 'Posted On', value: selectedJob.postedOn },
                        { label: 'Application Deadline', value: selectedJob.deadline || 'Dec 15, 2025' }
                      ].map((item, i) => (
                        <Stack key={i} direction="row" justifyContent="space-between">
                          <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12 }}>{item.label}</Typography>
                          <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', fontSize: 12 }}>{item.value}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Box>

                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', fontSize: 13.5, mb: 0.5, display: 'block' }}>
                      📄 Job Description
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#4B5563', fontSize: 12, lineHeight: 1.4, display: 'block' }}>
                      {selectedJob.desc}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#530EF0', fontWeight: 700, fontSize: 12, cursor: 'pointer', mt: 0.5, display: 'inline-block' }}>
                      View Full Description &rarr;
                    </Typography>
                  </Box>

                  {/* Published On channels */}
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', fontSize: 13.5, mb: 1, display: 'block' }}>
                      Published On
                    </Typography>
                    <Grid container spacing={1}>
                      {[
                        { name: 'Company Website', icon: <GlobalOutlined />, status: 'Published' },
                        { name: 'LinkedIn', icon: <LinkedinFilled style={{ color: '#0A66C2' }} />, status: 'Published' },
                        { name: 'Naukri', icon: <ShopOutlined style={{ color: '#0054A6' }} />, status: 'Published' }
                      ].map((ch, i) => (
                        <Grid size={{ xs: 4 }} key={i}>
                          <Box sx={{ p: 1, borderRadius: '10px', bgcolor: '#FAFAFB', border: '1px solid #F3F4F6', textAlign: 'center' }}>
                            <Box sx={{ fontSize: 16, mb: 0.25 }}>{ch.icon}</Box>
                            <Typography variant="caption" sx={{ fontSize: 11, fontWeight: 600, display: 'block', color: '#111827' }}>
                              {ch.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#10B981', fontSize: '0.62rem', fontWeight: 700 }}>
                              ● {ch.status}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Stack>
              )}

              {drawerTab !== 0 && (
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="caption" sx={{ color: '#9CA3AF' }}>
                    Content for {drawerTab === 1 ? 'Detailed Description' : drawerTab === 2 ? 'Job Requirements' : 'Screening Questions'}.
                  </Typography>
                </Box>
              )}
            </Card>
          </Box>
        )}
      </Box>

      {/* Modal: Create Job */}
      {/* Modal: Create Job */}
      <Dialog
        open={openNewDialog}
        onClose={() => {
          setOpenNewDialog(false);
          setJobErrors({});
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: '1.05rem', color: '#111827' }}>
          Create New Job Vacancy
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              size="small"
              label="Job Title *"
              placeholder="e.g. Lead React Developer"
              value={newJob.title}
              onChange={(e) => {
                setNewJob({ ...newJob, title: e.target.value });
                if (jobErrors.title) setJobErrors({ ...jobErrors, title: '' });
              }}
              error={Boolean(jobErrors.title)}
              helperText={jobErrors.title}
            />
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <Select
                  fullWidth
                  size="small"
                  value={newJob.dept}
                  onChange={(e) => setNewJob({ ...newJob, dept: e.target.value })}
                >
                  <MenuItem value="Engineering">Engineering</MenuItem>
                  <MenuItem value="Product">Product</MenuItem>
                  <MenuItem value="Design">Design</MenuItem>
                </Select>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Select
                  fullWidth
                  size="small"
                  value={newJob.location}
                  onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                >
                  <MenuItem value="Bengaluru">Bengaluru</MenuItem>
                  <MenuItem value="Chennai">Chennai</MenuItem>
                  <MenuItem value="Remote">Remote</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <TextField
              fullWidth
              multiline
              rows={3}
              size="small"
              label="Short Description"
              value={newJob.desc}
              onChange={(e) => setNewJob({ ...newJob, desc: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={() => {
              setOpenNewDialog(false);
              setJobErrors({});
            }}
            sx={{ textTransform: 'none', color: '#6B7280' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              const errors = {};
              if (!newJob.title.trim()) {
                errors.title = 'Job Title is required';
              } else if (newJob.title.trim().length < 5) {
                errors.title = 'Job Title must be at least 5 characters';
              }

              if (Object.keys(errors).length > 0) {
                setJobErrors(errors);
                setSnackbar({ open: true, message: 'Please correct the validation errors', severity: 'warning' });
                return;
              }

              const created = {
                id: `JOB-00${jobs.length + 13}`,
                title: newJob.title.trim(),
                dept: newJob.dept,
                location: newJob.location,
                type: 'Full-time',
                applications: 0,
                status: 'Published',
                postedOn: 'Just now',
                exp: '2+ years',
                iconColor: '#530EF0',
                iconBg: 'rgba(83, 14, 240, 0.08)'
              };

              setJobs([created, ...jobs]);
              setOpenNewDialog(false);
              setNewJob({ title: '', dept: 'Engineering', location: 'Bengaluru', desc: '' });
              setJobErrors({});
              setSnackbar({ open: true, message: `New Job ${created.id} created and published!`, severity: 'success' });
            }}
            sx={{ bgcolor: '#530EF0', color: '#FFF', textTransform: 'none', borderRadius: '8px' }}
          >
            Publish Job
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal: Edit Job */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: '1.05rem', color: '#111827' }}>
          Edit Job — {editingJob?.id}
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          {editingJob && (
            <Stack spacing={2}>
              <TextField
                fullWidth
                size="small"
                label="Job Title *"
                value={editingJob.title || ''}
                onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
                required
              />
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    select
                    size="small"
                    label="Department"
                    value={editingJob.dept || 'Engineering'}
                    onChange={(e) => setEditingJob({ ...editingJob, dept: e.target.value })}
                  >
                    <MenuItem value="Engineering">Engineering</MenuItem>
                    <MenuItem value="Product">Product</MenuItem>
                    <MenuItem value="Data & Analytics">Data & Analytics</MenuItem>
                    <MenuItem value="Design">Design</MenuItem>
                    <MenuItem value="Sales">Sales</MenuItem>
                    <MenuItem value="Human Resources">Human Resources</MenuItem>
                    <MenuItem value="Marketing">Marketing</MenuItem>
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    select
                    size="small"
                    label="Location"
                    value={editingJob.location || 'Bengaluru'}
                    onChange={(e) => setEditingJob({ ...editingJob, location: e.target.value })}
                  >
                    <MenuItem value="Bengaluru">Bengaluru</MenuItem>
                    <MenuItem value="Chennai">Chennai</MenuItem>
                    <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                    <MenuItem value="Pune">Pune</MenuItem>
                    <MenuItem value="Coimbatore">Coimbatore</MenuItem>
                    <MenuItem value="Remote">Remote</MenuItem>
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    select
                    size="small"
                    label="Status"
                    value={editingJob.status || 'Published'}
                    onChange={(e) => setEditingJob({ ...editingJob, status: e.target.value })}
                  >
                    <MenuItem value="Published">Published</MenuItem>
                    <MenuItem value="Draft">Draft</MenuItem>
                    <MenuItem value="Paused">Paused</MenuItem>
                    <MenuItem value="Closed">Closed</MenuItem>
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    select
                    size="small"
                    label="Experience Level"
                    value={editingJob.exp || '2+ years'}
                    onChange={(e) => setEditingJob({ ...editingJob, exp: e.target.value })}
                  >
                    <MenuItem value="1+ years">1+ years</MenuItem>
                    <MenuItem value="2+ years">2+ years</MenuItem>
                    <MenuItem value="3+ years">3+ years</MenuItem>
                    <MenuItem value="4+ years">4+ years</MenuItem>
                    <MenuItem value="5+ years">5+ years</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
              <TextField
                fullWidth
                multiline
                rows={3}
                size="small"
                label="Short Description"
                value={editingJob.desc || ''}
                onChange={(e) => setEditingJob({ ...editingJob, desc: e.target.value })}
              />
            </Stack>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenEditDialog(false)} sx={{ textTransform: 'none', color: '#6B7280' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveEdit}
            sx={{ bgcolor: '#530EF0', color: '#FFF', textTransform: 'none', borderRadius: '8px' }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Notification */}
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

