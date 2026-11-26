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
import ExportOutlined from '@ant-design/icons/ExportOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import FilterOutlined from '@ant-design/icons/FilterOutlined';
import MoreOutlined from '@ant-design/icons/MoreOutlined';
import ArrowUpOutlined from '@ant-design/icons/ArrowUpOutlined';
import ArrowDownOutlined from '@ant-design/icons/ArrowDownOutlined';
import ReadOutlined from '@ant-design/icons/ReadOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import CodeOutlined from '@ant-design/icons/CodeOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import ShareAltOutlined from '@ant-design/icons/ShareAltOutlined';
import PauseOutlined from '@ant-design/icons/PauseOutlined';
import StopOutlined from '@ant-design/icons/StopOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';

export default function HrInternships() {
  const navigate = useNavigate();

  // Active Tab
  const [activeTab, setActiveTab] = useState('All');

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [locFilter, setLocFilter] = useState('All Locations');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [sortBy, setSortBy] = useState('Newest first');

  // Selected Internship for Right Detail Panel
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectRow = (e, item) => {
    e.stopPropagation();
    const id = item.id;
    setSelectedRows((prev) => {
      const isAlready = prev.includes(id);
      if (isAlready) {
        const next = prev.filter((r) => r !== id);
        if (selectedInternship?.id === id) {
          const remaining = filteredInternships.find((i) => next.includes(i.id));
          setSelectedInternship(remaining || null);
        }
        return next;
      } else {
        setSelectedInternship(item);
        return [...prev, id];
      }
    });
  };

  const handleRowClick = (item) => {
    const id = item.id;
    if (selectedInternship?.id === id && selectedRows.includes(id)) {
      setSelectedInternship(null);
      setSelectedRows((prev) => prev.filter((r) => r !== id));
    } else {
      setSelectedInternship(item);
      setSelectedRows((prev) => (prev.includes(id) ? prev : [...prev, id]));
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = filteredInternships.map((i) => i.id);
      setSelectedRows(allIds);
      if (filteredInternships.length > 0) setSelectedInternship(filteredInternships[0]);
    } else {
      setSelectedRows([]);
      setSelectedInternship(null);
    }
  };

  // Drawer subtabs
  const [drawerTab, setDrawerTab] = useState(0);

  // Modal & Snackbar
  const [openNewDialog, setOpenNewDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [newIntern, setNewIntern] = useState({ title: '', dept: 'Engineering', duration: '3 months', stipend: '₹15,000 / month', desc: '' });
  const [internErrors, setInternErrors] = useState({});

  // 10 Internships list matching screenshot exactly
  const [internships, setInternships] = useState([
    { id: 'INT-0024', title: 'Frontend Developer Intern', dept: 'Engineering', location: 'Bengaluru', duration: '3 months', applications: 142, status: 'Published', postedOn: 'Oct 21, 2025' },
    { id: 'INT-0023', title: 'Data Analyst Intern', dept: 'Data & Analytics', location: 'Chennai', duration: '6 months', applications: 98, status: 'Published', postedOn: 'Oct 19, 2025' },
    { id: 'INT-0022', title: 'UI/UX Design Intern', dept: 'Design', location: 'Remote', duration: '3 months', applications: 76, status: 'Published', postedOn: 'Oct 18, 2025' },
    { id: 'INT-0021', title: 'Machine Learning Intern', dept: 'Engineering', location: 'Hyderabad', duration: '6 months', applications: 64, status: 'Draft', postedOn: 'Oct 16, 2025' },
    { id: 'INT-0020', title: 'Digital Marketing Intern', dept: 'Marketing', location: 'Bengaluru', duration: '3 months', applications: 58, status: 'Published', postedOn: 'Oct 14, 2025' },
    { id: 'INT-0019', title: 'HR Intern', dept: 'Human Resources', location: 'Chennai', duration: '3 months', applications: 42, status: 'Published', postedOn: 'Oct 12, 2025' },
    { id: 'INT-0018', title: 'Product Management Intern', dept: 'Product', location: 'Bengaluru', duration: '6 months', applications: 36, status: 'Paused', postedOn: 'Oct 10, 2025' },
    { id: 'INT-0017', title: 'AWS DevOps Intern', dept: 'Engineering', location: 'Remote', duration: '3 months', applications: 28, status: 'Published', postedOn: 'Oct 08, 2025' },
    { id: 'INT-0016', title: 'Content Writing Intern', dept: 'Marketing', location: 'Coimbatore', duration: '3 months', applications: 24, status: 'Closed', postedOn: 'Oct 05, 2025' },
    { id: 'INT-0015', title: 'Business Analyst Intern', dept: 'Strategy', location: 'Pune', duration: '6 months', applications: 18, status: 'Published', postedOn: 'Oct 03, 2025' }
  ]);

  // Top 6 KPI Stats matching screenshot
  const kpiStats = [
    { label: 'Total Internships', count: 24, change: '+ 26%', sub: 'Across all departments', icon: <ReadOutlined />, color: '#6929E2', bg: '#F3EDFF' },
    { label: 'Published', count: 18, change: '+ 20%', sub: 'Visible on careers portal', icon: <CheckCircleOutlined />, color: '#2563EB', bg: '#EFF6FF' },
    { label: 'Draft', count: 3, change: null, sub: 'Not yet published', icon: <ClockCircleOutlined />, color: '#F59E0B', bg: '#FFFBEB' },
    { label: 'Closed', count: 2, change: '- 33%', sub: 'No longer accepting', icon: <CloseCircleOutlined />, color: '#EF4444', bg: '#FEF2F2' },
    { label: 'Total Applications', count: 486, change: '+ 42%', sub: 'Student applications', icon: <TeamOutlined />, color: '#8B5CF6', bg: '#F5F3FF' },
    { label: 'Selected Interns', count: 24, change: '+ 33%', sub: 'Confirmed for onboarding', icon: <CheckCircleOutlined />, color: '#10B981', bg: '#ECFDF5' }
  ];

  // Filtering
  const filteredInternships = internships.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.id.toLowerCase().includes(searchTerm.toLowerCase()) || item.dept.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab =
      activeTab === 'All' ? true :
      activeTab === 'Published' ? item.status === 'Published' :
      activeTab === 'Draft' ? item.status === 'Draft' :
      activeTab === 'Closed' ? item.status === 'Closed' : true;
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
              <ReadOutlined />
            </Box>
            <Typography variant="caption" sx={{ color: '#530EF0', fontWeight: 600, fontSize: 12 }}>
              Internship Program
            </Typography>
          </Stack>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 700, fontSize: { xs: 22, sm: 24 }, color: '#111827', letterSpacing: '-0.3px',
              
              mb: 0.5
            }}
          >
            Internship Management
          </Typography>
          <Typography sx={{ color: '#6B7280', fontSize: 14, fontWeight: 400, lineHeight: 1.5, mt: 0.5 }}>
            Create, manage and track internship opportunities. Find and nurture the next generation of talent.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} alignItems="center" flexShrink={0}>
          <Button
            variant="outlined"
            startIcon={<ExportOutlined />}
            onClick={() => window.open('https://careers.traceu.com/internships', '_blank')}
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
            View on Careers Portal
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
            Create Internship
          </Button>
        </Stack>
      </Box>

      {/* ========================================================================= */}
      {/* 2. TOP KPI CARDS (6 CARDS)                                               */}
      {/* ========================================================================= */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {kpiStats.map((kpi, idx) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }} key={idx}>
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
            { id: 'All', label: 'All Internships (24)' },
            { id: 'Published', label: 'Published (18)' },
            { id: 'Draft', label: 'Draft (3)' },
            { id: 'Closed', label: 'Closed (2)' }
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

        <Select size="small" value={sortBy} onChange={(e) => setSortBy(e.target.value)} sx={{ borderRadius: '10px', fontSize: 13, bgcolor: '#FFF' }}>
          <MenuItem value="Newest first">Sort by: Newest first</MenuItem>
          <MenuItem value="Applications">Sort by: Most Applications</MenuItem>
        </Select>
      </Stack>

      {/* Filters Row */}
      <Card sx={{ p: 1.8, borderRadius: '14px', border: '1px solid #F3F4F6', bgcolor: '#FFF', mb: 2.5 }}>
        <Grid container spacing={1.5} alignItems="center">
          <Grid size={{ xs: 12, md: 5 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search by internship title, department, skills..."
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
              <MenuItem value="Data & Analytics">Data & Analytics</MenuItem>
              <MenuItem value="Design">Design</MenuItem>
              <MenuItem value="Marketing">Marketing</MenuItem>
            </Select>
          </Grid>

          <Grid size={{ xs: 6, sm: 3, md: 2.2 }}>
            <Select fullWidth size="small" value={locFilter} onChange={(e) => setLocFilter(e.target.value)} sx={{ borderRadius: '10px' }}>
              <MenuItem value="All Locations">All Locations</MenuItem>
              <MenuItem value="Bengaluru">Bengaluru</MenuItem>
              <MenuItem value="Chennai">Chennai</MenuItem>
              <MenuItem value="Remote">Remote</MenuItem>
            </Select>
          </Grid>

          <Grid size={{ xs: 6, sm: 3, md: 1.6 }}>
            <Select fullWidth size="small" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} sx={{ borderRadius: '10px' }}>
              <MenuItem value="All Statuses">All Statuses</MenuItem>
              <MenuItem value="Published">Published</MenuItem>
              <MenuItem value="Draft">Draft</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
            </Select>
          </Grid>

          <Grid size={{ xs: 6, sm: 3, md: 1 }}>
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
                    label={`${selectedRows.length} ${selectedRows.length === 1 ? 'Internship' : 'Internships'} Selected`}
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
                      setInternships(internships.map((i) => (selectedRows.includes(i.id) ? { ...i, status: 'Paused' } : i)));
                      setSnackbar({ open: true, message: `Paused ${selectedRows.length} internships!`, severity: 'info' });
                    }}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30, color: '#6B7280', borderColor: '#D1D5DB' }}
                  >
                    Pause ({selectedRows.length})
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      setInternships(internships.map((i) => (selectedRows.includes(i.id) ? { ...i, status: 'Closed' } : i)));
                      setSnackbar({ open: true, message: `Closed ${selectedRows.length} internships!`, severity: 'info' });
                    }}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30, color: '#6B7280', borderColor: '#D1D5DB' }}
                  >
                    Close
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setSnackbar({ open: true, message: `Exporting data for ${selectedRows.length} internships...`, severity: 'success' })}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30, color: '#6B7280', borderColor: '#D1D5DB' }}
                  >
                    Export
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={() => {
                      setInternships(internships.filter((i) => !selectedRows.includes(i.id)));
                      setSelectedRows([]);
                      setSelectedInternship(null);
                      setSnackbar({ open: true, message: `Deleted ${selectedRows.length} internships.`, severity: 'error' });
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
                        checked={selectedRows.length === filteredInternships.length && filteredInternships.length > 0}
                        indeterminate={selectedRows.length > 0 && selectedRows.length < filteredInternships.length}
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Internship Title</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Department</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Location</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Duration</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Applications</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Status</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Posted On</TableCell>
                    <TableCell align="right" sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredInternships.map((item) => {
                    const isSelected = selectedInternship?.id === item.id;
                    const isChecked = selectedRows.includes(item.id);
                    return (
                      <TableRow
                        key={item.id}
                        hover
                        onClick={() => handleRowClick(item)}
                        sx={{
                          cursor: 'pointer',
                          bgcolor: isSelected || isChecked ? 'rgba(83, 14, 240, 0.04)' : 'inherit'
                        }}
                      >
                        <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            size="small"
                            checked={isChecked}
                            onChange={(e) => handleSelectRow(e, item)}
                          />
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1.2} alignItems="center">
                            <Box sx={{ width: 28, height: 28, borderRadius: '8px', bgcolor: 'rgba(83, 14, 240, 0.08)', color: '#530EF0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>
                              <CodeOutlined />
                            </Box>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 700, color: '#111827', fontSize: 13.5 }}>
                                {item.title}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#530EF0', fontWeight: 600, fontSize: 11.5 }}>
                                {item.id}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>
                        <TableCell sx={{ fontSize: 13, color: '#4B5563' }}>{item.dept}</TableCell>
                        <TableCell sx={{ fontSize: 13, color: '#4B5563' }}>{item.location}</TableCell>
                        <TableCell sx={{ fontSize: 13, color: '#4B5563' }}>{item.duration}</TableCell>
                        <TableCell sx={{ fontSize: 13.5, fontWeight: 700, color: '#111827' }}>{item.applications}</TableCell>
                        <TableCell>
                          <Chip
                            label={item.status}
                            size="small"
                            sx={{
                              height: 22,
                              fontSize: 11,
                              fontWeight: 700,
                              bgcolor:
                                item.status === 'Published' ? 'rgba(16, 185, 129, 0.1)' :
                                item.status === 'Draft' ? 'rgba(245, 158, 11, 0.1)' :
                                item.status === 'Paused' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                              color:
                                item.status === 'Published' ? '#10B981' :
                                item.status === 'Draft' ? '#D97706' :
                                item.status === 'Paused' ? '#2563EB' : '#EF4444'
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ fontSize: 12.5, color: '#6B7280' }}>{item.postedOn}</TableCell>
                        <TableCell align="right">
                          <IconButton size="small" onClick={() => setSnackbar({ open: true, message: `Internship options for ${item.title} opened`, severity: 'info' })}><MoreOutlined style={{ color: '#9CA3AF' }} /></IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ p: 2, borderTop: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="caption" sx={{ color: '#6B7280' }}>Showing 1-10 of 24 internships</Typography>
              <Pagination count={3} size="small" sx={{ '& .Mui-selected': { bgcolor: '#530EF0 !important', color: '#FFF' } }} />
            </Box>
          </Card>
        </Box>

        {/* ======================================================================= */}
        {/* RIGHT DETAIL PANEL                                                     */}
        {/* ======================================================================= */}
        {selectedInternship && (
          <Box sx={{ width: { xs: '100%', lg: 380 }, flexShrink: 0 }}>
            <Card sx={{ p: 2.5, borderRadius: '16px', border: '1px solid #F3F4F6', bgcolor: '#FFF' }}>
              {/* Header */}
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box sx={{ width: 28, height: 28, borderRadius: '8px', bgcolor: 'rgba(83, 14, 240, 0.1)', color: '#530EF0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>
                    <CodeOutlined />
                  </Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#530EF0', fontSize: 13.5 }}>
                    {selectedInternship.id}
                  </Typography>
                  <Chip
                    label={selectedInternship.status}
                    size="small"
                    sx={{ height: 20, fontSize: 11, fontWeight: 700, bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#10B981' }}
                  />
                </Stack>
                <IconButton size="small" onClick={() => setSelectedInternship(null)}><CloseOutlined style={{ color: '#9CA3AF', fontSize: 12 }} /></IconButton>
              </Stack>

              <Typography variant="h6" sx={{ fontWeight: 800, color: '#111827', fontSize: '1.05rem', mb: 0.5 }}>
                {selectedInternship.title}
              </Typography>
              <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12, display: 'block', mb: 2 }}>
                🏢 {selectedInternship.dept} • 📍 {selectedInternship.location} • ⏱️ {selectedInternship.duration}
              </Typography>

              {/* Action buttons */}
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Button size="small" variant="contained" startIcon={<EditOutlined />} onClick={() => setSnackbar({ open: true, message: `Editing internship listing for ${selectedInternship.title}`, severity: 'info' })} sx={{ bgcolor: '#530EF0', color: '#FFF', fontWeight: 700, textTransform: 'none', borderRadius: '8px', fontSize: 12, flex: 1 }}>
                  Edit Internship
                </Button>
                <Button size="small" variant="outlined" onClick={() => navigate('/hr/applications')} sx={{ borderColor: '#530EF0', color: '#530EF0', textTransform: 'none', borderRadius: '8px', fontSize: 12, whiteSpace: 'nowrap' }}>
                  View Applications (142)
                </Button>
                <IconButton size="small" onClick={() => setSnackbar({ open: true, message: `Share link for ${selectedInternship.title} copied to clipboard!`, severity: 'success' })} sx={{ border: '1px solid #E5E7EB', borderRadius: '8px' }}><ShareAltOutlined style={{ color: '#6B7280' }} /></IconButton>
              </Stack>

              {/* Subtabs */}
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
                <Tab label="Application Form" />
              </Tabs>

              {drawerTab === 0 && (
                <Stack spacing={2}>
                  {/* Key Details */}
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', fontSize: 13.5, mb: 1, display: 'block' }}>
                      📋 Key Details
                    </Typography>
                    <Stack spacing={0.8}>
                      {[
                        { label: 'Department', value: selectedInternship.dept },
                        { label: 'Location', value: selectedInternship.location },
                        { label: 'Duration', value: selectedInternship.duration },
                        { label: 'Stipend', value: selectedInternship.stipend || '₹15,000 / month' },
                        { label: 'Application Deadline', value: selectedInternship.deadline || 'Nov 30, 2025' },
                        { label: 'Posted On', value: selectedInternship.postedOn },
                        { label: 'Status', value: selectedInternship.status }
                      ].map((item, i) => (
                        <Stack key={i} direction="row" justifyContent="space-between">
                          <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12 }}>{item.label}</Typography>
                          <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', fontSize: 12 }}>{item.value}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Box>

                  {/* Application Stats */}
                  <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', fontSize: 13.5 }}>
                        📊 Application Stats
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#530EF0', fontWeight: 500, fontSize: 11, cursor: 'pointer' }}>View All &rarr;</Typography>
                    </Stack>
                    <Stack spacing={1}>
                      {[
                        { stage: 'Applied', count: 142, pct: '100%', color: '#530EF0', w: '100%' },
                        { stage: 'Screening', count: 68, pct: '48%', color: '#3B82F6', w: '48%' },
                        { stage: 'Shortlisted', count: 32, pct: '23%', color: '#06B6D4', w: '23%' },
                        { stage: 'Interview', count: 18, pct: '13%', color: '#F59E0B', w: '13%' },
                        { stage: 'Selected', count: 12, pct: '8%', color: '#EC4899', w: '8%' }
                      ].map((s) => (
                        <Box key={s.stage}>
                          <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.3 }}>
                            <Typography variant="caption" sx={{ fontSize: 11.5, color: '#4B5563' }}>{s.stage}</Typography>
                            <Typography variant="caption" sx={{ fontSize: 11.5, fontWeight: 700, color: '#111827' }}>{s.count} <span style={{ color: '#9CA3AF' }}>({s.pct})</span></Typography>
                          </Stack>
                          <Box sx={{ width: '100%', height: 6, borderRadius: 3, bgcolor: '#F3F4F6' }}>
                            <Box sx={{ width: s.w, height: '100%', borderRadius: 3, bgcolor: s.color }} />
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  </Box>

                  {/* Bottom Actions */}
                  <Stack direction="row" spacing={1} sx={{ pt: 1 }}>
                    <Button
                      fullWidth
                      size="small"
                      variant="outlined"
                      startIcon={<PauseOutlined />}
                      onClick={() => {
                        setInternships(prev => prev.map(i => i.id === selectedInternship.id ? { ...i, status: 'Paused' } : i));
                        setSelectedInternship(prev => ({ ...prev, status: 'Paused' }));
                        setSnackbar({ open: true, message: `Paused ${selectedInternship.title}`, severity: 'info' });
                      }}
                      sx={{ borderColor: '#E5E7EB', color: '#374151', textTransform: 'none', borderRadius: '8px', fontSize: 12 }}
                    >
                      Pause Internship
                    </Button>
                    <Button
                      fullWidth
                      size="small"
                      variant="outlined"
                      startIcon={<StopOutlined />}
                      onClick={() => {
                        setInternships(prev => prev.map(i => i.id === selectedInternship.id ? { ...i, status: 'Closed' } : i));
                        setSelectedInternship(prev => ({ ...prev, status: 'Closed' }));
                        setSnackbar({ open: true, message: `Closed ${selectedInternship.title}`, severity: 'info' });
                      }}
                      sx={{ borderColor: '#FCA5A5', color: '#EF4444', textTransform: 'none', borderRadius: '8px', fontSize: 12 }}
                    >
                      Close Internship
                    </Button>
                  </Stack>
                </Stack>
              )}

              {drawerTab !== 0 && (
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="caption" sx={{ color: '#9CA3AF' }}>
                    Information for {drawerTab === 1 ? 'Detailed Description' : drawerTab === 2 ? 'Eligibility Requirements' : 'Custom Application Questions'}.
                  </Typography>
                </Box>
              )}
            </Card>
          </Box>
        )}
      </Box>

      {/* Modal: Create Internship */}
      <Dialog
        open={openNewDialog}
        onClose={() => {
          setOpenNewDialog(false);
          setInternErrors({});
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: '1.05rem', color: '#111827' }}>
          Create New Internship Opportunity
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              size="small"
              label="Internship Title *"
              placeholder="e.g. AI Research Intern"
              value={newIntern.title}
              onChange={(e) => {
                setNewIntern({ ...newIntern, title: e.target.value });
                if (internErrors.title) setInternErrors({ ...internErrors, title: '' });
              }}
              error={Boolean(internErrors.title)}
              helperText={internErrors.title}
            />
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <Select
                  fullWidth
                  size="small"
                  value={newIntern.dept}
                  onChange={(e) => setNewIntern({ ...newIntern, dept: e.target.value })}
                >
                  <MenuItem value="Engineering">Engineering</MenuItem>
                  <MenuItem value="Data & Analytics">Data & Analytics</MenuItem>
                  <MenuItem value="Design">Design</MenuItem>
                </Select>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Select
                  fullWidth
                  size="small"
                  value={newIntern.duration}
                  onChange={(e) => setNewIntern({ ...newIntern, duration: e.target.value })}
                >
                  <MenuItem value="3 months">3 months</MenuItem>
                  <MenuItem value="6 months">6 months</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <TextField
              fullWidth
              size="small"
              label="Monthly Stipend"
              value={newIntern.stipend}
              onChange={(e) => setNewIntern({ ...newIntern, stipend: e.target.value })}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              size="small"
              label="Role Responsibilities"
              value={newIntern.desc}
              onChange={(e) => setNewIntern({ ...newIntern, desc: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={() => {
              setOpenNewDialog(false);
              setInternErrors({});
            }}
            sx={{ textTransform: 'none', color: '#6B7280' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              const errors = {};
              if (!newIntern.title.trim()) {
                errors.title = 'Internship Title is required';
              } else if (newIntern.title.trim().length < 5) {
                errors.title = 'Internship Title must be at least 5 characters';
              }

              if (Object.keys(errors).length > 0) {
                setInternErrors(errors);
                setSnackbar({ open: true, message: 'Please correct the validation errors', severity: 'warning' });
                return;
              }

              const created = {
                id: `INT-00${internships.length + 25}`,
                title: newIntern.title.trim(),
                dept: newIntern.dept,
                location: 'Bengaluru',
                duration: newIntern.duration,
                applications: 0,
                status: 'Published',
                postedOn: 'Just now'
              };

              setInternships([created, ...internships]);
              setOpenNewDialog(false);
              setNewIntern({ title: '', dept: 'Engineering', duration: '3 months', stipend: '₹15,000 / month', desc: '' });
              setInternErrors({});
              setSnackbar({ open: true, message: `New Internship Opportunity "${created.title}" Created!`, severity: 'success' });
            }}
            sx={{ bgcolor: '#530EF0', color: '#FFF', textTransform: 'none', borderRadius: '8px' }}
          >
            Create Internship
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

