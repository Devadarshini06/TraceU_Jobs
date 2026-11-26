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
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import FilterOutlined from '@ant-design/icons/FilterOutlined';
import MoreOutlined from '@ant-design/icons/MoreOutlined';
import ArrowUpOutlined from '@ant-design/icons/ArrowUpOutlined';
import ArrowDownOutlined from '@ant-design/icons/ArrowDownOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import CopyOutlined from '@ant-design/icons/CopyOutlined';
import ExportOutlined from '@ant-design/icons/ExportOutlined';
import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import ShopOutlined from '@ant-design/icons/ShopOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';

// avatar assets
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import avatar5 from 'assets/images/users/avatar-5.png';

export default function HrRequisitions() {
  const navigate = useNavigate();

  // Active filter tab
  const [activeTab, setActiveTab] = useState('All');

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [priorityFilter, setPriorityFilter] = useState('All Priorities');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [dateFilter, setDateFilter] = useState('Last 30 days');

  // Selected Requisition for Right Side Detail Panel
  const [selectedReq, setSelectedReq] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectRow = (e, req) => {
    e.stopPropagation();
    const id = req.id;
    setSelectedRows((prev) => {
      const isAlready = prev.includes(id);
      if (isAlready) {
        const next = prev.filter((r) => r !== id);
        if (selectedReq?.id === id) {
          const remaining = filteredRequisitions.find((r) => next.includes(r.id));
          setSelectedReq(remaining || null);
        }
        return next;
      } else {
        setSelectedReq(req);
        return [...prev, id];
      }
    });
  };

  const handleRowClick = (req) => {
    const id = req.id;
    if (selectedReq?.id === id && selectedRows.includes(id)) {
      setSelectedReq(null);
      setSelectedRows((prev) => prev.filter((r) => r !== id));
    } else {
      setSelectedReq(req);
      setSelectedRows((prev) => (prev.includes(id) ? prev : [...prev, id]));
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = filteredRequisitions.map((r) => r.id);
      setSelectedRows(allIds);
      if (filteredRequisitions.length > 0) setSelectedReq(filteredRequisitions[0]);
    } else {
      setSelectedRows([]);
      setSelectedReq(null);
    }
  };

  // Drawer subtabs
  const [drawerTab, setDrawerTab] = useState(0);

  // New Requisition Modal Dialog
  const [openNewDialog, setOpenNewDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [newReq, setNewReq] = useState({ title: '', dept: 'Engineering', headcount: 1, priority: 'High', targetDate: '2025-12-15', summary: '' });
  const [reqErrors, setReqErrors] = useState({});

  // 10 Requisitions list matching screenshot exactly
  const [requisitions, setRequisitions] = useState([
    { id: 'REQ-0018', title: 'Senior Software Engineer', dept: 'Engineering', exp: '3+ yrs', type: 'Full-time', headcount: 3, priority: 'High', manager: 'Arjun Nair', managerRole: 'Engineering Head', managerAvatar: avatar1, status: 'Approved', createdOn: 'Oct 21, 2025', targetDate: 'Dec 15, 2025', location: 'Bengaluru (Hybrid)', budget: '₹ 12 - 18 LPA' },
    { id: 'REQ-0017', title: 'Product Manager', dept: 'Product', exp: '5+ yrs', type: 'Full-time', headcount: 2, priority: 'High', manager: 'Sneha Iyer', managerRole: 'Product Head', managerAvatar: avatar3, status: 'Pending Approval', createdOn: 'Oct 19, 2025', targetDate: 'Dec 10, 2025', location: 'Chennai', budget: '₹ 18 - 25 LPA' },
    { id: 'REQ-0016', title: 'Data Analyst', dept: 'Data & Analytics', exp: '1-3 yrs', type: 'Full-time', headcount: 4, priority: 'Medium', manager: 'Vikram Singh', managerRole: 'Analytics Lead', managerAvatar: avatar2, status: 'Draft', createdOn: 'Oct 18, 2025', targetDate: 'Nov 30, 2025', location: 'Hyderabad', budget: '₹ 8 - 12 LPA' },
    { id: 'REQ-0015', title: 'UI/UX Designer', dept: 'Design', exp: '2-4 yrs', type: 'Full-time', headcount: 2, priority: 'Medium', manager: 'Ananya Rao', managerRole: 'Design Head', managerAvatar: avatar4, status: 'Approved', createdOn: 'Oct 16, 2025', targetDate: 'Dec 05, 2025', location: 'Bengaluru', budget: '₹ 10 - 15 LPA' },
    { id: 'REQ-0014', title: 'Machine Learning Engineer', dept: 'Data & Analytics', exp: '3+ yrs', type: 'Full-time', headcount: 3, priority: 'High', manager: 'Rohit Kumar', managerRole: 'CTO', managerAvatar: avatar5, status: 'Pending Approval', createdOn: 'Oct 14, 2025', targetDate: 'Dec 20, 2025', location: 'Pune', budget: '₹ 16 - 22 LPA' },
    { id: 'REQ-0013', title: 'Backend Developer', dept: 'Engineering', exp: '2-5 yrs', type: 'Full-time', headcount: 5, priority: 'Medium', manager: 'Meera Joshi', managerRole: 'Engineering Head', managerAvatar: avatar3, status: 'Approved', createdOn: 'Oct 12, 2025', targetDate: 'Nov 28, 2025', location: 'Chennai', budget: '₹ 12 - 16 LPA' },
    { id: 'REQ-0012', title: 'Sales Executive', dept: 'Sales', exp: '1-3 yrs', type: 'Full-time', headcount: 3, priority: 'Low', manager: 'Kiran Patel', managerRole: 'Sales Head', managerAvatar: avatar2, status: 'Rejected', createdOn: 'Oct 10, 2025', targetDate: 'Nov 15, 2025', location: 'Coimbatore', budget: '₹ 6 - 9 LPA' },
    { id: 'REQ-0011', title: 'HR Coordinator', dept: 'Human Resources', exp: '0-2 yrs', type: 'Full-time', headcount: 1, priority: 'Medium', manager: 'Neha Gupta', managerRole: 'HR Head', managerAvatar: avatar4, status: 'Approved', createdOn: 'Oct 08, 2025', targetDate: 'Nov 30, 2025', location: 'Bengaluru', budget: '₹ 5 - 8 LPA' },
    { id: 'REQ-0010', title: 'DevOps Engineer', dept: 'Engineering', exp: '3+ yrs', type: 'Full-time', headcount: 2, priority: 'High', manager: 'Siddharth Verma', managerRole: 'Infrastructure Lead', managerAvatar: avatar1, status: 'Approved', createdOn: 'Oct 06, 2025', targetDate: 'Dec 01, 2025', location: 'Remote', budget: '₹ 14 - 20 LPA' },
    { id: 'REQ-0009', title: 'Digital Marketing Specialist', dept: 'Marketing', exp: '1-3 yrs', type: 'Full-time', headcount: 2, priority: 'Low', manager: 'Riya Menon', managerRole: 'Marketing Head', managerAvatar: avatar5, status: 'Draft', createdOn: 'Oct 04, 2025', targetDate: 'Nov 20, 2025', location: 'Chennai', budget: '₹ 7 - 10 LPA' }
  ]);

  // Top KPI Stats
  const kpiStats = [
    { label: 'Total Requisitions', count: 18, change: '+ 12%', sub: 'Across all departments', icon: <FileTextOutlined />, color: '#6929E2', bg: '#F3EDFF' },
    { label: 'Pending Approval', count: 5, change: '+ 25%', sub: 'Awaiting manager / HR approval', icon: <ClockCircleOutlined />, color: '#F59E0B', bg: '#FFFBEB' },
    { label: 'Approved', count: 10, change: '+ 20%', sub: 'Ready for job creation', icon: <CheckCircleOutlined />, color: '#10B981', bg: '#ECFDF5' },
    { label: 'Converted to Jobs', count: 12, change: '+ 33%', sub: 'Published and active', icon: <ShopOutlined />, color: '#2563EB', bg: '#EFF6FF' },
    { label: 'Rejected', count: 1, change: null, sub: 'Needs to be revised', icon: <CloseCircleOutlined />, color: '#EF4444', bg: '#FEF2F2' }
  ];

  // Filtering
  const filteredRequisitions = requisitions.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) || r.id.toLowerCase().includes(searchTerm.toLowerCase()) || r.dept.toLowerCase().includes(searchTerm.toLowerCase()) || r.manager.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab =
      activeTab === 'All' ? true :
      activeTab === 'Pending Approval' ? r.status === 'Pending Approval' :
      activeTab === 'Approved' ? r.status === 'Approved' :
      activeTab === 'Rejected' ? r.status === 'Rejected' : true;
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
              <FileTextOutlined />
            </Box>
            <Typography variant="caption" sx={{ color: '#530EF0', fontWeight: 600, fontSize: 12 }}>
              Requisitions
            </Typography>
          </Stack>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 700, fontSize: { xs: 22, sm: 24 }, color: '#111827', letterSpacing: '-0.3px',
              
              mb: 0.5
            }}
          >
            Requisition Management
          </Typography>
          <Typography sx={{ color: '#6B7280', fontSize: 14, fontWeight: 400, lineHeight: 1.5, mt: 0.5 }}>
            Create, track and manage hiring requests from different departments.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} alignItems="center" flexShrink={0}>
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
            Create Requisition
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
                    icon={<ArrowUpOutlined style={{ fontSize: 10, color: '#10B981' }} />}
                    label={kpi.change}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(16, 185, 129, 0.08)',
                      color: '#10B981',
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
      {/* 3. FILTER TABS & TOOLBAR                                                 */}
      {/* ========================================================================= */}
      <Stack direction="row" spacing={3} sx={{ mb: 2, borderBottom: '1px solid #E5E7EB', pb: 1 }}>
        {[
          { id: 'All', label: 'All Requisitions (18)' },
          { id: 'Pending Approval', label: 'Pending Approval (5)' },
          { id: 'Approved', label: 'Approved (10)' },
          { id: 'Rejected', label: 'Rejected (1)' }
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

      {/* Filters Row */}
      <Card sx={{ p: 1.8, borderRadius: '14px', border: '1px solid #F3F4F6', bgcolor: '#FFF', mb: 2.5 }}>
        <Grid container spacing={1.5} alignItems="center">
          <Grid size={{ xs: 12, md: 3.8 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search by requisition ID, job title, department, hiring manager..."
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
            <Select fullWidth size="small" value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)} sx={{ borderRadius: '10px' }}>
              <MenuItem value="All Departments">All Departments</MenuItem>
              <MenuItem value="Engineering">Engineering</MenuItem>
              <MenuItem value="Product">Product</MenuItem>
              <MenuItem value="Design">Design</MenuItem>
              <MenuItem value="Sales">Sales</MenuItem>
            </Select>
          </Grid>

          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Select fullWidth size="small" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} sx={{ borderRadius: '10px' }}>
              <MenuItem value="All Priorities">All Priorities</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </Grid>

          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Select fullWidth size="small" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} sx={{ borderRadius: '10px' }}>
              <MenuItem value="All Statuses">All Statuses</MenuItem>
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Pending Approval">Pending Approval</MenuItem>
              <MenuItem value="Draft">Draft</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>
          </Grid>

          <Grid size={{ xs: 6, sm: 3, md: 2.2 }}>
            <Stack direction="row" spacing={1}>
              <Select fullWidth size="small" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} sx={{ borderRadius: '10px' }}>
                <MenuItem value="Last 30 days">Last 30 days</MenuItem>
                <MenuItem value="Last 90 days">Last 90 days</MenuItem>
                <MenuItem value="This Year">This Year</MenuItem>
              </Select>
              <Button
                variant="outlined"
                startIcon={<FilterOutlined />}
                onClick={() => setSnackbar({ open: true, message: 'Filter criteria updated', severity: 'info' })}
                sx={{ borderColor: '#E5E7EB', color: '#530EF0', borderRadius: '10px', textTransform: 'none', px: 1.5, whiteSpace: 'nowrap' }}
              >
                More
              </Button>
            </Stack>
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
                    label={`${selectedRows.length} ${selectedRows.length === 1 ? 'Requisition' : 'Requisitions'} Selected`}
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
                      setRequisitions(requisitions.map((r) => (selectedRows.includes(r.id) ? { ...r, status: 'Approved' } : r)));
                      setSnackbar({ open: true, message: `Approved ${selectedRows.length} requisitions!`, severity: 'success' });
                    }}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30, color: '#6B7280', borderColor: '#D1D5DB' }}
                  >
                    Approve ({selectedRows.length})
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setSnackbar({ open: true, message: `Exporting data for ${selectedRows.length} requisitions...`, severity: 'success' })}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30, color: '#6B7280', borderColor: '#D1D5DB' }}
                  >
                    Export
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={() => {
                      setRequisitions(requisitions.filter((r) => !selectedRows.includes(r.id)));
                      setSelectedRows([]);
                      setSelectedReq(null);
                      setSnackbar({ open: true, message: `Deleted ${selectedRows.length} requisitions.`, severity: 'error' });
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
                        checked={selectedRows.length === filteredRequisitions.length && filteredRequisitions.length > 0}
                        indeterminate={selectedRows.length > 0 && selectedRows.length < filteredRequisitions.length}
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Requisition ID</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Job Title</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Department</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Headcount</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Priority</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Hiring Manager</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Status</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Created On</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Target Date</TableCell>
                    <TableCell align="right" sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRequisitions.map((req) => {
                    const isSelected = selectedReq?.id === req.id;
                    const isChecked = selectedRows.includes(req.id);
                    return (
                      <TableRow
                        key={req.id}
                        hover
                        onClick={() => handleRowClick(req)}
                        sx={{
                          cursor: 'pointer',
                          bgcolor: isSelected || isChecked ? 'rgba(83, 14, 240, 0.04)' : 'inherit'
                        }}
                      >
                        <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            size="small"
                            checked={isChecked}
                            onChange={(e) => handleSelectRow(e, req)}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: '#530EF0', fontSize: 13 }}>
                            {req.id}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: '#111827', fontSize: 13.5 }}>
                            {req.title}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 12, fontWeight: 400 }}>
                            {req.type} • {req.exp}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ fontSize: 13, color: '#4B5563' }}>{req.dept}</TableCell>
                        <TableCell sx={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{req.headcount}</TableCell>
                        <TableCell>
                          <Chip
                            label={req.priority}
                            size="small"
                            sx={{
                              height: 22,
                              fontSize: 11,
                              fontWeight: 700,
                              bgcolor:
                                req.priority === 'High' ? 'rgba(239, 68, 68, 0.1)' :
                                req.priority === 'Medium' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                              color:
                                req.priority === 'High' ? '#EF4444' :
                                req.priority === 'Medium' ? '#8B5CF6' : '#10B981'
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Avatar src={req.managerAvatar} sx={{ width: 26, height: 26 }} />
                            <Box>
                              <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', display: 'block', lineHeight: 1.1 }}>
                                {req.manager}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11 }}>
                                {req.managerRole}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={req.status}
                            size="small"
                            sx={{
                              height: 22,
                              fontSize: 11,
                              fontWeight: 700,
                              bgcolor:
                                req.status === 'Approved' ? 'rgba(16, 185, 129, 0.1)' :
                                req.status === 'Pending Approval' ? 'rgba(245, 158, 11, 0.1)' :
                                req.status === 'Rejected' ? 'rgba(239, 68, 68, 0.1)' : '#F3F4F6',
                              color:
                                req.status === 'Approved' ? '#10B981' :
                                req.status === 'Pending Approval' ? '#D97706' :
                                req.status === 'Rejected' ? '#EF4444' : '#6B7280'
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ fontSize: 12.5, color: '#6B7280' }}>{req.createdOn}</TableCell>
                        <TableCell sx={{ fontSize: 12.5, color: '#6B7280' }}>{req.targetDate}</TableCell>
                        <TableCell align="right">
                          <IconButton size="small" onClick={() => setSnackbar({ open: true, message: `Requisition options for ${req.title} opened`, severity: 'info' })}><MoreOutlined style={{ color: '#9CA3AF' }} /></IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination footer */}
            <Box sx={{ p: 2, borderTop: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="caption" sx={{ color: '#6B7280' }}>Showing 1-10 of 18 requisitions</Typography>
              <Pagination count={2} size="small" sx={{ '& .Mui-selected': { bgcolor: '#530EF0 !important', color: '#FFF' } }} />
            </Box>
          </Card>
        </Box>

        {/* ======================================================================= */}
        {/* RIGHT DETAIL PANEL (for selected requisition)                          */}
        {/* ======================================================================= */}
        {selectedReq && (
          <Box sx={{ width: { xs: '100%', lg: 380 }, flexShrink: 0 }}>
            <Card sx={{ p: 2.5, borderRadius: '16px', border: '1px solid #F3F4F6', bgcolor: '#FFF' }}>
              {/* Header */}
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#530EF0', fontSize: 13.5 }}>
                      {selectedReq.id}
                    </Typography>
                    <Chip
                      label={selectedReq.status}
                      size="small"
                      sx={{ height: 20, fontSize: 11, fontWeight: 700, bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#10B981' }}
                    />
                  </Stack>
                  <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 12, fontWeight: 400 }}>
                    Created on {selectedReq.createdOn}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={0.5}>
                  <Button size="small" variant="contained" startIcon={<EditOutlined />} onClick={() => setSnackbar({ open: true, message: `Editing requisition for ${selectedReq.title}`, severity: 'info' })} sx={{ bgcolor: '#530EF0', color: '#FFF', textTransform: 'none', borderRadius: '8px', fontSize: 12, px: 1.2 }}>
                    Edit
                  </Button>
                  <IconButton size="small" onClick={() => setSnackbar({ open: true, message: `Requisition options for ${selectedReq.title} opened`, severity: 'info' })}><MoreOutlined style={{ color: '#9CA3AF' }} /></IconButton>
                  <IconButton size="small" onClick={() => setSelectedReq(null)}><CloseOutlined style={{ color: '#9CA3AF', fontSize: 12 }} /></IconButton>
                </Stack>
              </Stack>

              {/* Title & tags */}
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#111827', fontSize: '1.05rem', mb: 0.5 }}>
                {selectedReq.title}
              </Typography>
              <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12, display: 'block', mb: 2 }}>
                🏢 {selectedReq.dept} • 📍 {selectedReq.location} • 💼 {selectedReq.type}
              </Typography>

              {/* 3 mini stat badges */}
              <Grid container spacing={1} sx={{ mb: 2 }}>
                <Grid size={{ xs: 4 }}>
                  <Box sx={{ p: 1, borderRadius: '10px', bgcolor: '#FAFAFB', border: '1px solid #F3F4F6', textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11, display: 'block' }}>Headcount</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#111827' }}>{selectedReq.headcount}</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 4 }}>
                  <Box sx={{ p: 1, borderRadius: '10px', bgcolor: '#FAFAFB', border: '1px solid #F3F4F6', textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11, display: 'block' }}>Experience</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#111827' }}>{selectedReq.exp}</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 4 }}>
                  <Box sx={{ p: 1, borderRadius: '10px', bgcolor: '#FAFAFB', border: '1px solid #F3F4F6', textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11, display: 'block' }}>Target Date</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#111827', fontSize: 12 }}>{selectedReq.targetDate}</Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* Drawer Tabs */}
              <Tabs
                value={drawerTab}
                onChange={(e, v) => setDrawerTab(v)}
                sx={{
                  borderBottom: '1px solid #F3F4F6',
                  mb: 2,
                  '& .MuiTabs-indicator': { bgcolor: '#530EF0' },
                  '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, fontSize: 12.5, minWidth: 60, p: 0.8, color: '#6B7280', '&.Mui-selected': { color: '#530EF0' } }
                }}
              >
                <Tab label="Details" />
                <Tab label="Approval Flow" />
                <Tab label="Activity" />
                <Tab label="Linked Job" />
              </Tabs>

              {/* Tab 0: Job Details */}
              {drawerTab === 0 && (
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', fontSize: 13.5, mb: 1, display: 'block' }}>
                      📋 Job Details
                    </Typography>
                    <Stack spacing={0.8}>
                      {[
                        { label: 'Job Title', value: selectedReq.title },
                        { label: 'Department', value: selectedReq.dept },
                        { label: 'Employment Type', value: selectedReq.type },
                        { label: 'Experience', value: selectedReq.exp },
                        { label: 'Location', value: selectedReq.location },
                        { label: 'Budget (Annual)', value: selectedReq.budget },
                        { label: 'Positions', value: selectedReq.headcount },
                        { label: 'Target Join Date', value: selectedReq.targetDate }
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
                      {selectedReq.desc}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#530EF0', fontWeight: 700, fontSize: 12, cursor: 'pointer', mt: 0.5, display: 'inline-block' }}>
                      View Full Description &rarr;
                    </Typography>
                  </Box>

                  {/* Actions */}
                  <Stack spacing={1} sx={{ pt: 1 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => {
                        navigate('/hr/jobs');
                        setSnackbar({ open: true, message: `Converted ${selectedReq.id} to Job`, severity: 'success' });
                      }}
                      sx={{ bgcolor: '#530EF0', color: '#FFF', fontWeight: 700, textTransform: 'none', borderRadius: '10px', py: 1 }}
                    >
                      Convert to Job
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => setSnackbar({ open: true, message: 'Requisition cloned successfully', severity: 'info' })}
                      sx={{ borderColor: '#E5E7EB', color: '#374151', fontWeight: 600, textTransform: 'none', borderRadius: '10px', py: 1 }}
                    >
                      Clone Requisition
                    </Button>
                  </Stack>
                </Stack>
              )}

              {drawerTab !== 0 && (
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="caption" sx={{ color: '#9CA3AF' }}>
                    Information for {drawerTab === 1 ? 'Approval Flow' : drawerTab === 2 ? 'Activity Logs' : 'Linked Job Postings'}.
                  </Typography>
                </Box>
              )}
            </Card>
          </Box>
        )}
      </Box>

      {/* Modal: Create Requisition */}
      <Dialog
        open={openNewDialog}
        onClose={() => {
          setOpenNewDialog(false);
          setReqErrors({});
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: '1.05rem', color: '#111827' }}>
          Create New Requisition
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              size="small"
              label="Job Title *"
              placeholder="e.g. Lead Frontend Architect"
              value={newReq.title}
              onChange={(e) => {
                setNewReq({ ...newReq, title: e.target.value });
                if (reqErrors.title) setReqErrors({ ...reqErrors, title: '' });
              }}
              error={Boolean(reqErrors.title)}
              helperText={reqErrors.title}
            />
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <Select
                  fullWidth
                  size="small"
                  value={newReq.dept}
                  onChange={(e) => setNewReq({ ...newReq, dept: e.target.value })}
                >
                  <MenuItem value="Engineering">Engineering</MenuItem>
                  <MenuItem value="Product">Product</MenuItem>
                  <MenuItem value="Design">Design</MenuItem>
                  <MenuItem value="Sales">Sales</MenuItem>
                </Select>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  label="Headcount *"
                  value={newReq.headcount}
                  onChange={(e) => {
                    setNewReq({ ...newReq, headcount: e.target.value });
                    if (reqErrors.headcount) setReqErrors({ ...reqErrors, headcount: '' });
                  }}
                  error={Boolean(reqErrors.headcount)}
                  helperText={reqErrors.headcount}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <Select
                  fullWidth
                  size="small"
                  value={newReq.priority}
                  onChange={(e) => setNewReq({ ...newReq, priority: e.target.value })}
                >
                  <MenuItem value="High">High Priority</MenuItem>
                  <MenuItem value="Medium">Medium Priority</MenuItem>
                  <MenuItem value="Low">Low Priority</MenuItem>
                </Select>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Target Date"
                  value={newReq.targetDate}
                  onChange={(e) => setNewReq({ ...newReq, targetDate: e.target.value })}
                />
              </Grid>
            </Grid>
            <TextField
              fullWidth
              multiline
              rows={3}
              size="small"
              label="Job Description Summary"
              value={newReq.summary}
              onChange={(e) => setNewReq({ ...newReq, summary: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={() => {
              setOpenNewDialog(false);
              setReqErrors({});
            }}
            sx={{ textTransform: 'none', color: '#6B7280' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              const errors = {};
              if (!newReq.title.trim()) {
                errors.title = 'Job Title is required';
              } else if (newReq.title.trim().length < 5) {
                errors.title = 'Job Title must be at least 5 characters';
              }

              if (!newReq.headcount || Number(newReq.headcount) <= 0 || isNaN(Number(newReq.headcount))) {
                errors.headcount = 'Headcount must be at least 1';
              }

              if (Object.keys(errors).length > 0) {
                setReqErrors(errors);
                setSnackbar({ open: true, message: 'Please correct the validation errors', severity: 'warning' });
                return;
              }

              const created = {
                id: `REQ-00${requisitions.length + 19}`,
                title: newReq.title.trim(),
                dept: newReq.dept,
                exp: '2+ yrs',
                type: 'Full-time',
                headcount: Number(newReq.headcount),
                priority: newReq.priority,
                manager: 'Arjun Nair',
                managerRole: 'Hiring Manager',
                managerAvatar: avatar1,
                status: 'Pending Approval',
                createdOn: 'Just now',
                targetDate: newReq.targetDate || '2025-12-15',
                location: 'Bengaluru (Hybrid)',
                budget: '₹ 10 - 18 LPA'
              };

              setRequisitions([created, ...requisitions]);
              setOpenNewDialog(false);
              setNewReq({ title: '', dept: 'Engineering', headcount: 1, priority: 'High', targetDate: '2025-12-15', summary: '' });
              setReqErrors({});
              setSnackbar({ open: true, message: `New Requisition ${created.id} Created!`, severity: 'success' });
            }}
            sx={{ bgcolor: '#530EF0', color: '#FFF', textTransform: 'none', borderRadius: '8px' }}
          >
            Create
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

