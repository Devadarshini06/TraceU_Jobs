import React, { useState, useMemo, useEffect } from 'react';
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
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import Pagination from '@mui/material/Pagination';
import Tooltip from '@mui/material/Tooltip';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';

// project imports
import {
  getRequisitions,
  createRequisition,
  updateRequisition,
  updateRequisitionStatus,
  deleteRequisition,
  getRequisitionStatusSummary,
  getRequisitionActivity,
  getCareersSync,
  updateCareersSync,
  triggerCareersSync
} from 'api/adminRequisitions';
import Snackbar from '@mui/material/Snackbar';

// icons
import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import ShopOutlined from '@ant-design/icons/ShopOutlined';
import LinkOutlined from '@ant-design/icons/LinkOutlined';
import GlobalOutlined from '@ant-design/icons/GlobalOutlined';
import SyncOutlined from '@ant-design/icons/SyncOutlined';
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import MoreOutlined from '@ant-design/icons/MoreOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import CopyOutlined from '@ant-design/icons/CopyOutlined';

// avatar assets
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import avatar5 from 'assets/images/users/avatar-5.png';

// initial mock requisitions dataset
const initialRequisitions = [
  {
    id: 'REQ-0018',
    badge: 'RD',
    badgeBg: '#7c3aed',
    title: 'Senior Software Engineer',
    type: 'Full-time • 3+ yrs',
    dept: 'Engineering',
    vacancies: 3,
    manager: 'Arjun Nair',
    managerRole: 'Engineering Head',
    managerAvatar: avatar1,
    source: 'Company Website',
    status: 'Approved',
    createdOn: 'Oct 21, 2025'
  },
  {
    id: 'REQ-0017',
    badge: 'PM',
    badgeBg: '#6d28d9',
    title: 'Product Manager',
    type: 'Full-time • 5+ yrs',
    dept: 'Product',
    vacancies: 2,
    manager: 'Sneha Iyer',
    managerRole: 'Product Head',
    managerAvatar: avatar2,
    source: 'TraceU',
    status: 'Pending Approval',
    createdOn: 'Oct 19, 2025'
  },
  {
    id: 'REQ-0016',
    badge: 'DS',
    badgeBg: '#2563eb',
    title: 'Data Analyst',
    type: 'Full-time • 1-3 yrs',
    dept: 'Data & Analytics',
    vacancies: 4,
    manager: 'Vikram Singh',
    managerRole: 'Analytics Lead',
    managerAvatar: avatar3,
    source: 'Company Website',
    status: 'Draft',
    createdOn: 'Oct 18, 2025'
  },
  {
    id: 'REQ-0015',
    badge: 'UI',
    badgeBg: '#4f46e5',
    title: 'UI/UX Designer',
    type: 'Full-time • 2-4 yrs',
    dept: 'Design',
    vacancies: 2,
    manager: 'Ananya Rao',
    managerRole: 'Design Head',
    managerAvatar: avatar4,
    source: 'TraceU',
    status: 'Approved',
    createdOn: 'Oct 16, 2025'
  },
  {
    id: 'REQ-0014',
    badge: 'ML',
    badgeBg: '#0284c7',
    title: 'Machine Learning Engineer',
    type: 'Full-time • 3+ yrs',
    dept: 'Data & Analytics',
    vacancies: 3,
    manager: 'Rohit Kumar',
    managerRole: 'CTO',
    managerAvatar: avatar5,
    source: 'Company Website',
    status: 'Converted to Job',
    createdOn: 'Oct 14, 2025'
  },
  {
    id: 'REQ-0013',
    badge: 'BE',
    badgeBg: '#3b82f6',
    title: 'Backend Developer',
    type: 'Full-time • 2-5 yrs',
    dept: 'Engineering',
    vacancies: 5,
    manager: 'Meera Joshi',
    managerRole: 'Engineering Head',
    managerAvatar: avatar2,
    source: 'TraceU',
    status: 'Rejected',
    createdOn: 'Oct 12, 2025'
  },
  {
    id: 'REQ-0012',
    badge: 'SA',
    badgeBg: '#0891b2',
    title: 'Sales Executive',
    type: 'Full-time • 1-3 yrs',
    dept: 'Sales',
    vacancies: 3,
    manager: 'Karan Patel',
    managerRole: 'Sales Head',
    managerAvatar: avatar1,
    source: 'Company Website',
    status: 'Approved',
    createdOn: 'Oct 10, 2025'
  },
  {
    id: 'REQ-0011',
    badge: 'HR',
    badgeBg: '#db2777',
    title: 'HR Coordinator',
    type: 'Full-time • 0-2 yrs',
    dept: 'Human Resources',
    vacancies: 1,
    manager: 'Neha Gupta',
    managerRole: 'HR Head',
    managerAvatar: avatar4,
    source: 'TraceU',
    status: 'Converted to Job',
    createdOn: 'Oct 08, 2025'
  }
];

const STATUS_LABELS = {
  open: 'Pending Approval',
  pending: 'Pending Approval',
  approved: 'Approved',
  converted: 'Converted to Job',
  converted_to_job: 'Converted to Job',
  rejected: 'Rejected'
};

const BADGE_COLORS = ['#7c3aed', '#6d28d9', '#2563eb', '#059669', '#d97706', '#6929e2'];

function mapBackendRequisition(item, overrides = {}) {
  const rawStatus = String(item?.status || 'open').toLowerCase();
  const status = STATUS_LABELS[rawStatus] || item?.status || 'Pending Approval';
  const title = item?.title || 'Untitled Requisition';
  const badge =
    title
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase() || 'RQ';
  const createdOn = item?.created_at
    ? new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Just now';

  return {
    dbId: item?.id,
    id: item?.code || `REQ-${String(item?.id || 1).padStart(4, '0')}`,
    badge,
    badgeBg: BADGE_COLORS[(Number(item?.id) || 0) % BADGE_COLORS.length],
    title,
    type: overrides.type || 'Full-time',
    dept: item?.department || 'Engineering',
    vacancies: item?.headcount || 1,
    manager: overrides.manager || 'Admin',
    managerRole: 'Hiring Manager',
    managerAvatar: avatar1,
    source: 'TraceU',
    status,
    createdOn
  };
}

function generateNextReqCode(existingRequisitions) {
  let maxNum = 0;
  for (const item of existingRequisitions) {
    const match = String(item?.id || '').match(/(\d+)$/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxNum) maxNum = num;
    }
  }
  const next = maxNum > 0 ? maxNum + 1 : 1001;
  return `REQ-${String(next).padStart(4, '0')}`;
}

function formatRelativeTime(dateStr) {
  if (!dateStr) return 'Just now';
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function AdminRequisitions() {
  const navigate = useNavigate();

  // state
  const [requisitions, setRequisitions] = useState([]);
  const [loadingRequisitions, setLoadingRequisitions] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editingReq, setEditingReq] = useState(null);
  const [deleteConfirmReq, setDeleteConfirmReq] = useState(null);
  const [viewDetailsReq, setViewDetailsReq] = useState(null);
  const [statusSummary, setStatusSummary] = useState({
    total: 0,
    draft: 0,
    pending: 0,
    approved: 0,
    converted: 0,
    rejected: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [careersSync, setCareersSync] = useState({
    website_url: 'https://careers.traceu.com',
    connected: true,
    auto_sync: true,
    jobs_updated: 0,
    jobs_imported: 0,
    last_synced_at: null
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [timeFilter, setTimeFilter] = useState('30');
  const [page, setPage] = useState(1);
  const [autoSync, setAutoSync] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  // notifications / toasts
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // actions menu
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedReq, setSelectedReq] = useState(null);

  // dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [workflowDialogOpen, setWorkflowDialogOpen] = useState(false);
  const [templatesDialogOpen, setTemplatesDialogOpen] = useState(false);
  const [syncDetailsDialogOpen, setSyncDetailsDialogOpen] = useState(false);

  // new requisition form
  const [newTitle, setNewTitle] = useState('');
  const [newDept, setNewDept] = useState('Engineering');
  const [newVacancies, setNewVacancies] = useState('2');
  const [newType, setNewType] = useState('Full-time • 2+ yrs');
  const [newManager, setNewManager] = useState('Admin');
  const [createErrors, setCreateErrors] = useState({});

  const refreshSidebarData = async () => {
    try {
      const [summaryRes, activityRes] = await Promise.all([
        getRequisitionStatusSummary(),
        getRequisitionActivity(6)
      ]);
      if (summaryRes?.data) {
        setStatusSummary(summaryRes.data);
      }
      if (Array.isArray(activityRes?.data)) {
        setRecentActivity(activityRes.data);
      }
    } catch {
      // keep existing sidebar state on transient errors
    }
  };

  useEffect(() => {
    let cancelled = false;
    setLoadingRequisitions(true);
    Promise.all([
      getRequisitions(),
      getRequisitionStatusSummary().catch(() => null),
      getRequisitionActivity(6).catch(() => null),
      getCareersSync().catch(() => null)
    ])
      .then(([reqRes, summaryRes, activityRes, syncRes]) => {
        if (cancelled) return;
        const list = Array.isArray(reqRes?.data) ? reqRes.data : [];
        setRequisitions(list.map((item) => mapBackendRequisition(item)));
        if (summaryRes?.data) setStatusSummary(summaryRes.data);
        if (Array.isArray(activityRes?.data)) setRecentActivity(activityRes.data);
        if (syncRes?.data) {
          setCareersSync(syncRes.data);
          setAutoSync(Boolean(syncRes.data.auto_sync));
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setSnackbar({
          open: true,
          message: err.message || 'Failed to load requisitions from server',
          severity: 'error'
        });
      })
      .finally(() => {
        if (!cancelled) setLoadingRequisitions(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // filter logic
  const filteredRequisitions = useMemo(() => {
    return requisitions.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.dept.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.manager.toLowerCase().includes(searchQuery.toLowerCase());
      const matchDept = departmentFilter === 'ALL' || item.dept === departmentFilter;
      const matchStatus = statusFilter === 'ALL' || item.status === statusFilter;
      return matchSearch && matchDept && matchStatus;
    });
  }, [requisitions, searchQuery, departmentFilter, statusFilter]);

  // trigger careers website sync
  const handleSyncNow = async () => {
    setIsSyncing(true);
    try {
      const res = await triggerCareersSync();
      if (res?.data) {
        setCareersSync(res.data);
      }
      await refreshSidebarData();
      setSnackbar({
        open: true,
        message: `Website sync completed! ${res?.data?.jobs_updated ?? 0} active jobs checked from ${res?.data?.website_url || careersSync.website_url}`,
        severity: 'success'
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || 'Failed to sync careers website',
        severity: 'error'
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleAutoSyncToggle = async (checked) => {
    const previous = autoSync;
    setAutoSync(checked);
    try {
      const res = await updateCareersSync({ autoSync: checked });
      if (res?.data) setCareersSync(res.data);
      await refreshSidebarData();
      setSnackbar({
        open: true,
        message: `Auto-sync ${checked ? 'enabled' : 'disabled'}`,
        severity: 'info'
      });
    } catch (err) {
      setAutoSync(previous);
      setSnackbar({
        open: true,
        message: err.message || 'Failed to update auto-sync setting',
        severity: 'error'
      });
    }
  };

  const handleOpenEdit = (req) => {
    setEditingReq(req);
    setNewTitle(req.title || '');
    setNewDept(req.dept || 'Engineering');
    setNewVacancies(String(req.vacancies || 1));
    setNewType(req.type || 'Full-time • 2+ yrs');
    setNewManager(req.manager || 'Admin');
    setCreateErrors({});
    setCreateDialogOpen(true);
  };

  const handleStatusUpdate = async (req, nextStatus, successMessage, severity = 'success') => {
    if (!req?.dbId) return;
    try {
      const res = await updateRequisitionStatus(req.dbId, nextStatus);
      const updated = mapBackendRequisition(res.data, {
        type: req.type,
        manager: req.manager
      });
      setRequisitions((prev) => prev.map((r) => (r.dbId === req.dbId ? updated : r)));
      await refreshSidebarData();
      setSnackbar({ open: true, message: successMessage, severity });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || 'Failed to update requisition status',
        severity: 'error'
      });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirmReq?.dbId) return;
    setDeleting(true);
    try {
      await deleteRequisition(deleteConfirmReq.dbId);
      setRequisitions((prev) => prev.filter((r) => r.dbId !== deleteConfirmReq.dbId));
      await refreshSidebarData();
      setSnackbar({
        open: true,
        message: `${deleteConfirmReq.id} deleted successfully.`,
        severity: 'info'
      });
      setDeleteConfirmReq(null);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || 'Failed to delete requisition',
        severity: 'error'
      });
    } finally {
      setDeleting(false);
    }
  };

  // handle create or edit requisition
  const handleCreateSubmit = async () => {
    const errors = {};
    if (!newTitle.trim()) {
      errors.title = 'Job Title is required';
    } else if (newTitle.trim().length < 5) {
      errors.title = 'Job Title must be at least 5 characters';
    }

    if (!newVacancies || Number(newVacancies) <= 0 || isNaN(Number(newVacancies))) {
      errors.vacancies = 'Vacancies must be at least 1';
    }

    if (Object.keys(errors).length > 0) {
      setCreateErrors(errors);
      setSnackbar({ open: true, message: 'Please correct the validation errors', severity: 'warning' });
      return;
    }

    setSubmitting(true);
    try {
      if (editingReq?.dbId) {
        const res = await updateRequisition(editingReq.dbId, {
          title: newTitle.trim(),
          department: newDept,
          headcount: Number(newVacancies) || 1
        });
        const updated = mapBackendRequisition(res.data, {
          type: newType,
          manager: newManager
        });
        setRequisitions((prev) => prev.map((r) => (r.dbId === editingReq.dbId ? updated : r)));
        setSnackbar({ open: true, message: `${updated.id} updated successfully!`, severity: 'success' });
      } else {
        const code = generateNextReqCode(requisitions);
        const res = await createRequisition({
          code,
          title: newTitle.trim(),
          department: newDept,
          headcount: Number(newVacancies) || 1
        });
        const created = mapBackendRequisition(res.data, {
          type: newType,
          manager: newManager
        });
        setRequisitions((prev) => [created, ...prev]);
        setSnackbar({ open: true, message: `${created.id} created and saved!`, severity: 'success' });
      }
      await refreshSidebarData();
      setCreateDialogOpen(false);
      setEditingReq(null);
      setNewTitle('');
      setCreateErrors({});
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || `Failed to ${editingReq ? 'update' : 'create'} requisition`,
        severity: 'error'
      });
    } finally {
      setSubmitting(false);
    }
  };

  // status chip styling helper
  const getStatusChip = (status) => {
    switch (status) {
      case 'Approved':
        return (
          <Chip
            label="Approved"
            size="small"
            sx={{
              bgcolor: '#ecfdf5',
              color: '#059669',
              fontWeight: 500, fontSize: 11,
              border: '1px solid #a7f3d0'
            }}
          />
        );
      case 'Pending Approval':
        return (
          <Chip
            label="Pending Approval"
            size="small"
            sx={{
              bgcolor: '#fffbeb',
              color: '#d97706',
              fontWeight: 500, fontSize: 11,
              border: '1px solid #fde68a'
            }}
          />
        );
      case 'Draft':
        return (
          <Chip
            label="Draft"
            size="small"
            sx={{
              bgcolor: '#f3f4f6',
              color: '#4b5563',
              fontWeight: 500, fontSize: 11,
              border: '1px solid #e5e7eb'
            }}
          />
        );
      case 'Converted to Job':
        return (
          <Chip
            label="Converted to Job"
            size="small"
            sx={{
              bgcolor: '#f5f3ff',
              color: '#7c3aed',
              fontWeight: 500, fontSize: 11,
              border: '1px solid #ddd6fe'
            }}
          />
        );
      case 'Rejected':
        return (
          <Chip
            label="Rejected"
            size="small"
            sx={{
              bgcolor: '#fef2f2',
              color: '#dc2626',
              fontWeight: 500, fontSize: 11,
              border: '1px solid #fecaca'
            }}
          />
        );
      default:
        return <Chip label={status} size="small" />;
    }
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100%', pb: 5 }}>
      {/* 1. Header Section */}
      <Box sx={{ mb: 2.5 }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.75 }}>
          <Box
            sx={{
              width: 22,
              height: 22,
              borderRadius: '6px',
              bgcolor: '#ede9fe',
              color: '#6929e2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12
            }}
          >
            <FileTextOutlined />
          </Box>
          <Typography sx={{ color: '#6929e2', fontWeight: 700, fontSize: 13 }}>
            Requisitions
          </Typography>
        </Stack>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'flex-end' }}
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
              Requisition Management
            </Typography>
            <Typography sx={{ color: '#6b7280', fontSize: 13, lineHeight: 1.45, maxWidth: 640 }}>
              Manage hiring requests, approvals and move requisitions to jobs. Jobs posted on your company careers website can also be automatically synchronized into TraceU Jobs.
            </Typography>
          </Box>

          <Stack direction="row" spacing={1.5} alignItems="center" flexShrink={0}>
            <Button
              variant="contained"
              startIcon={<PlusOutlined />}
              onClick={() => setCreateDialogOpen(true)}
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
        </Stack>
      </Box>

      {/* 2. Top 4 KPI Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* 1. Total Requisitions */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box
                sx={{ width: 38, height: 38, borderRadius: '10px', bgcolor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}
              >
                <FileTextOutlined />
              </Box>
              <Chip
                label="↑ 12%"
                size="small"
                sx={{ bgcolor: 'rgba(16, 185, 129, 0.08)', color: '#10B981', fontWeight: 500, fontSize: 11, height: 22, borderRadius: '6px' }}
              />
            </Stack>
            <Box sx={{ mt: 1.5 }}>
              <Typography sx={{ color: '#6B7280', fontSize: 13, fontWeight: 500, display: 'block', mb: 0.25 }}>
                Total Requisitions
              </Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 28, color: '#111827', lineHeight: 1 }}>
                {requisitions.length}
              </Typography>
              <Typography sx={{ color: '#9CA3AF', fontSize: 12, fontWeight: 400, mt: 0.5 }}>
                Across all departments
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* 2. Pending Approval */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box
                sx={{ width: 38, height: 38, borderRadius: '10px', bgcolor: '#fffbeb', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}
              >
                <ClockCircleOutlined />
              </Box>
            </Stack>
            <Box sx={{ mt: 1.5 }}>
              <Typography sx={{ color: '#6B7280', fontSize: 13, fontWeight: 500, display: 'block', mb: 0.25 }}>
                Pending Approval
              </Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 28, color: '#111827', lineHeight: 1 }}>
                {requisitions.filter((r) => r.status === 'Pending Approval').length}
              </Typography>
              <Typography sx={{ color: '#9CA3AF', fontSize: 12, fontWeight: 400, mt: 0.5 }}>
                Awaiting manager / HR approval
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* 3. Approved */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box
                sx={{ width: 38, height: 38, borderRadius: '10px', bgcolor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}
              >
                <CheckCircleOutlined />
              </Box>
              <Chip
                label="↑ 20%"
                size="small"
                sx={{ bgcolor: 'rgba(16, 185, 129, 0.08)', color: '#10B981', fontWeight: 500, fontSize: 11, height: 22, borderRadius: '6px' }}
              />
            </Stack>
            <Box sx={{ mt: 1.5 }}>
              <Typography sx={{ color: '#6B7280', fontSize: 13, fontWeight: 500, display: 'block', mb: 0.25 }}>
                Approved
              </Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 28, color: '#111827', lineHeight: 1 }}>
                {requisitions.filter((r) => r.status === 'Approved').length}
              </Typography>
              <Typography sx={{ color: '#9CA3AF', fontSize: 12, fontWeight: 400, mt: 0.5 }}>
                Ready for job creation
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* 4. Converted to Jobs */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box
                sx={{ width: 38, height: 38, borderRadius: '10px', bgcolor: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}
              >
                <ShopOutlined />
              </Box>
              <Chip
                label="↑ 33%"
                size="small"
                sx={{ bgcolor: 'rgba(16, 185, 129, 0.08)', color: '#10B981', fontWeight: 500, fontSize: 11, height: 22, borderRadius: '6px' }}
              />
            </Stack>
            <Box sx={{ mt: 1.5 }}>
              <Typography sx={{ color: '#6B7280', fontSize: 13, fontWeight: 500, display: 'block', mb: 0.25 }}>
                Converted to Jobs
              </Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 28, color: '#111827', lineHeight: 1 }}>
                {requisitions.filter((r) => r.status === 'Converted to Job').length}
              </Typography>
              <Typography sx={{ color: '#9CA3AF', fontSize: 12, fontWeight: 400, mt: 0.5 }}>
                Published and active
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* ========================================================================= */}
      {/* 2-COLUMN MASTER LAYOUT: REQUISITIONS TABLE + SIDEBAR CARDS                */}
      {/* ========================================================================= */}
      <Grid container spacing={3} alignItems="flex-start">
        {/* ======================================================================= */}
        {/* LEFT COLUMN: REQUISITIONS TABLE                                         */}
        {/* ======================================================================= */}
        <Grid size={{ xs: 12, lg: 7.7, xl: 8 }}>
          {/* 3. Requisitions Table Card */}
          <Card
            sx={{
              borderRadius: '16px',
              border: '1px solid #f1f5f9',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              overflow: 'hidden'
            }}
          >
            {/* Search & Filters Bar */}
            <Box sx={{ p: 2, px: 2.5, borderBottom: '1px solid #f1f5f9' }}>
              <Grid container spacing={1.5} alignItems="center">
                {/* Search Bar */}
                <Grid size={{ xs: 12, md: 5.5 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Search by job title, department, hiring manager..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchOutlined style={{ color: '#9ca3af', fontSize: 15 }} />
                        </InputAdornment>
                      )
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                        fontSize: 13,
                        bgcolor: '#ffffff'
                      }
                    }}
                  />
                </Grid>

                {/* All Departments dropdown */}
                <Grid size={{ xs: 6, sm: 4, md: 2.3 }}>
                  <Select
                    fullWidth
                    size="small"
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    sx={{
                      borderRadius: '10px',
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: '#374151',
                      bgcolor: '#ffffff'
                    }}
                  >
                    <MenuItem value="ALL">All Departments</MenuItem>
                    <MenuItem value="Engineering">Engineering</MenuItem>
                    <MenuItem value="Product">Product</MenuItem>
                    <MenuItem value="Data & Analytics">Data & Analytics</MenuItem>
                    <MenuItem value="Design">Design</MenuItem>
                    <MenuItem value="Sales">Sales</MenuItem>
                    <MenuItem value="Human Resources">Human Resources</MenuItem>
                  </Select>
                </Grid>

                {/* All Statuses dropdown */}
                <Grid size={{ xs: 6, sm: 4, md: 2.1 }}>
                  <Select
                    fullWidth
                    size="small"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    sx={{
                      borderRadius: '10px',
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: '#374151',
                      bgcolor: '#ffffff'
                    }}
                  >
                    <MenuItem value="ALL">All Statuses</MenuItem>
                    <MenuItem value="Approved">Approved</MenuItem>
                    <MenuItem value="Pending Approval">Pending Approval</MenuItem>
                    <MenuItem value="Draft">Draft</MenuItem>
                    <MenuItem value="Converted to Job">Converted to Job</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                  </Select>
                </Grid>

                {/* Last 30 days dropdown */}
                <Grid size={{ xs: 12, sm: 4, md: 2.1 }}>
                  <Select
                    fullWidth
                    size="small"
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value)}
                    sx={{
                      borderRadius: '10px',
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: '#374151',
                      bgcolor: '#ffffff'
                    }}
                  >
                    <MenuItem value="7">Last 7 days</MenuItem>
                    <MenuItem value="30">Last 30 days</MenuItem>
                    <MenuItem value="90">Last 90 days</MenuItem>
                    <MenuItem value="all">All time</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </Box>

            {/* Requisitions Table */}
            <TableContainer sx={{ minHeight: 480 }}>
              <Table size="medium">
                <TableHead sx={{ bgcolor: '#f8fafc' }}>
                  <TableRow>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Requisition ID
                    </TableCell>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Job Title
                    </TableCell>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Department
                    </TableCell>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Vacancies
                    </TableCell>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Hiring Manager
                    </TableCell>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Source
                    </TableCell>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Status
                    </TableCell>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Created On
                    </TableCell>
                    <TableCell align="right" sx={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRequisitions.map((req) => (
                    <TableRow
                      key={req.id}
                      hover
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        transition: 'background-color 0.15s ease'
                      }}
                    >
                      {/* Requisition ID */}
                      <TableCell>
                        <Stack direction="row" spacing={1.25} alignItems="center">
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: '8px',
                              bgcolor: req.badgeBg,
                              color: '#ffffff',
                              fontWeight: 800,
                              fontSize: 11.5,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}
                          >
                            {req.badge}
                          </Box>
                          <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#111827' }}>
                            {req.id}
                          </Typography>
                        </Stack>
                      </TableCell>

                      {/* Job Title */}
                      <TableCell>
                        <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: '#111827' }}>
                          {req.title}
                        </Typography>
                        <Typography sx={{ fontSize: 11.5, color: '#6b7280' }}>
                          {req.type}
                        </Typography>
                      </TableCell>

                      {/* Department */}
                      <TableCell>
                        <Typography sx={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>
                          {req.dept}
                        </Typography>
                      </TableCell>

                      {/* Vacancies */}
                      <TableCell>
                        <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>
                          {req.vacancies}
                        </Typography>
                      </TableCell>

                      {/* Hiring Manager */}
                      <TableCell>
                        <Stack direction="row" spacing={1.25} alignItems="center">
                          <Avatar src={req.managerAvatar} sx={{ width: 28, height: 28 }} />
                          <Box>
                            <Typography sx={{ fontWeight: 700, fontSize: 12.5, color: '#111827' }}>
                              {req.manager}
                            </Typography>
                            <Typography sx={{ fontSize: 11, color: '#9ca3af' }}>
                              {req.managerRole}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>

                      {/* Source */}
                      <TableCell>
                        {req.source === 'Company Website' ? (
                          <Chip
                            icon={<GlobalOutlined style={{ fontSize: 11, color: '#2563eb' }} />}
                            label="Company Website"
                            size="small"
                            sx={{
                              bgcolor: '#eff6ff',
                              color: '#1d4ed8',
                              fontWeight: 600,
                              fontSize: 11,
                              border: '1px solid #bfdbfe',
                              '& .MuiChip-icon': { ml: 0.75 }
                            }}
                          />
                        ) : (
                          <Chip
                            label="TraceU"
                            size="small"
                            sx={{
                              bgcolor: '#faf5ff',
                              color: '#7c3aed',
                              fontWeight: 600,
                              fontSize: 11,
                              border: '1px solid #e9d5ff'
                            }}
                          />
                        )}
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        {getStatusChip(req.status)}
                      </TableCell>

                      {/* Created On */}
                      <TableCell>
                        <Typography sx={{ fontSize: 12, color: '#64748b' }}>
                          {req.createdOn}
                        </Typography>
                      </TableCell>

                      {/* Actions */}
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            setMenuAnchor(e.currentTarget);
                            setSelectedReq(req);
                          }}
                        >
                          <MoreOutlined style={{ color: '#94a3b8' }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}

                  {filteredRequisitions.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={9} align="center" sx={{ py: 6 }}>
                        <Typography sx={{ color: '#6b7280', fontSize: 14 }}>
                          No requisitions found matching current filters.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination & Count Footer */}
            <Box
              sx={{
                p: 2,
                px: 2.5,
                borderTop: '1px solid #f1f5f9',
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 1.5
              }}
            >
              <Typography sx={{ fontSize: 12.5, color: '#64748b' }}>
                Showing 1-{filteredRequisitions.length} of {requisitions.length} requisitions
              </Typography>
              <Pagination
                count={3}
                page={page}
                onChange={(e, p) => setPage(p)}
                size="small"
                shape="rounded"
                sx={{
                  '& .Mui-selected': {
                    bgcolor: '#6929e2 !important',
                    color: '#ffffff',
                    fontWeight: 700
                  }
                }}
              />
            </Box>
          </Card>
        </Grid>

        {/* ======================================================================= */}
        {/* RIGHT COLUMN: CAREERS SYNC + STATUS DONUT + QUICK ACTIONS + ACTIVITY   */}
        {/* ======================================================================= */}
        <Grid size={{ xs: 12, lg: 4.3, xl: 4 }}>
          <Stack spacing={2.5}>
            {/* 1. Careers Website Sync Card */}
            <Card
              sx={{
                p: 2.25,
                borderRadius: '16px',
                border: '1px solid #ede9fe',
                background: 'linear-gradient(180deg, #ffffff 0%, #faf8ff 100%)',
                boxShadow: '0 2px 8px rgba(105, 41, 226, 0.05)'
              }}
            >
              {/* Header */}
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.25 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: '8px',
                      bgcolor: '#ede9fe',
                      color: '#6929e2',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 14
                    }}
                  >
                    <LinkOutlined />
                  </Box>
                  <Typography sx={{ fontWeight: 800, fontSize: 14.5, color: '#111827' }}>
                    Careers Website Sync
                  </Typography>
                </Stack>
                <Chip
                  label={careersSync.connected ? '● Connected' : '● Disconnected'}
                  size="small"
                  sx={{
                    bgcolor: careersSync.connected ? '#ecfdf5' : '#fef2f2',
                    color: careersSync.connected ? '#059669' : '#dc2626',
                    fontWeight: 500, fontSize: 11,
                    border: careersSync.connected ? '1px solid #a7f3d0' : '1px solid #fecaca'
                  }}
                />
              </Stack>

              <Typography sx={{ fontSize: 12, color: '#6b7280', mb: 1.75 }}>
                Your company careers website is connected to automatically sync job postings.
              </Typography>

              {/* Full-width URL box */}
              <Box
                sx={{
                  p: 1.2,
                  px: 1.5,
                  borderRadius: '10px',
                  bgcolor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 1,
                  mb: 1.25
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0, overflow: 'hidden' }}>
                  <GlobalOutlined style={{ color: '#2563eb', fontSize: 13, flexShrink: 0 }} />
                  <Typography
                    sx={{
                      fontSize: 12.5,
                      fontWeight: 700,
                      color: '#1e293b',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {careersSync.website_url || 'https://careers.traceu.com'}
                  </Typography>
                </Stack>
                <Tooltip title="Copy link">
                  <IconButton
                    size="small"
                    sx={{ p: 0.25, color: '#94a3b8', flexShrink: 0 }}
                    onClick={() => {
                      navigator.clipboard?.writeText(careersSync.website_url || 'https://careers.traceu.com');
                      setSnackbar({ open: true, message: 'URL copied to clipboard!', severity: 'info' });
                    }}
                  >
                    <CopyOutlined style={{ fontSize: 12 }} />
                  </IconButton>
                </Tooltip>
              </Box>

              {/* Timestamp & Sync Now row - NEVER clipped */}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 1.75 }}
              >
                <Typography sx={{ fontSize: 11, color: '#64748b' }}>
                  Last synced:{' '}
                  {careersSync.last_synced_at
                    ? new Date(careersSync.last_synced_at).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit'
                      })
                    : 'Not synced yet'}
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleSyncNow}
                  disabled={isSyncing}
                  startIcon={<SyncOutlined spin={isSyncing} />}
                  sx={{
                    bgcolor: '#6929e2',
                    fontWeight: 700,
                    fontSize: 12,
                    textTransform: 'none',
                    borderRadius: '8px',
                    px: 2,
                    py: 0.75,
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    '&:hover': { bgcolor: '#5b1fd9' }
                  }}
                >
                  {isSyncing ? 'Syncing...' : 'Sync Now'}
                </Button>
              </Stack>

              {/* Sync Status Alert Banner */}
              <Box
                sx={{
                  p: 1.2,
                  px: 1.5,
                  borderRadius: '10px',
                  bgcolor: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  mb: 1.75
                }}
              >
                <Stack direction="row" spacing={1} alignItems="flex-start">
                  <CheckCircleOutlined style={{ color: '#059669', fontSize: 14, marginTop: 2, flexShrink: 0 }} />
                  <Box>
                    <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: '#065f46' }}>
                      {careersSync.jobs_updated ?? 0} jobs updated • {careersSync.jobs_imported ?? 0} new jobs imported
                    </Typography>
                    <Typography sx={{ fontSize: 10.5, color: '#047857' }}>
                      Jobs posted on your website are automatically imported as requisitions.
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              {/* Toggle switch + review button */}
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ gap: 1 }}>
                <Stack direction="row" spacing={0.75} alignItems="center" sx={{ minWidth: 0 }}>
                  <Switch
                    checked={autoSync}
                    onChange={(e) => handleAutoSyncToggle(e.target.checked)}
                    size="small"
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#6929e2'
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#6929e2'
                      }
                    }}
                  />
                  <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: '#374151', whiteSpace: 'nowrap' }}>
                    Auto-sync (Every 6h)
                  </Typography>
                  <Tooltip title="TraceU automatically polls your careers site every 6 hours for newly published jobs.">
                    <InfoCircleOutlined style={{ fontSize: 11, color: '#9ca3af', cursor: 'pointer' }} />
                  </Tooltip>
                </Stack>

                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setSyncDetailsDialogOpen(true)}
                  sx={{
                    textTransform: 'none',
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#6929e2',
                    borderColor: '#ddd6fe',
                    borderRadius: '8px',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    py: 0.5,
                    px: 1.25,
                    '&:hover': { borderColor: '#6929e2', bgcolor: '#faf5ff' }
                  }}
                >
                  Review Imported Jobs
                </Button>
              </Stack>
            </Card>

            {/* 2. Requisition Status Donut Chart */}
            {(() => {
              const total = statusSummary.total || requisitions.length || 0;
              const draftCount = statusSummary.draft || 0;
              const pendingCount = statusSummary.pending || 0;
              const approvedCount = (statusSummary.approved || 0) + (statusSummary.converted || 0);
              const rejectedCount = statusSummary.rejected || 0;
              const pct = (count) => (total > 0 ? Math.round((count / total) * 100) : 0);
              const circumference = 2 * Math.PI * 44; // ~276.46
              const approvedLen = total > 0 ? (approvedCount / total) * circumference : 0;
              const pendingLen = total > 0 ? (pendingCount / total) * circumference : 0;
              const draftLen = total > 0 ? (draftCount / total) * circumference : 0;
              const rejectedLen = total > 0 ? (rejectedCount / total) * circumference : 0;

              return (
                <Card
                  sx={{
                    p: 2.25,
                    borderRadius: '16px',
                    border: '1px solid #f1f5f9',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
                  }}
                >
                  <Typography sx={{ fontWeight: 800, fontSize: 15, color: '#111827', mb: 1.5 }}>
                    Requisition Status
                  </Typography>

                  <Stack direction="row" spacing={2.5} alignItems="center" justifyContent="center">
                    {/* SVG Donut */}
                    <Box sx={{ position: 'relative', width: 120, height: 120, flexShrink: 0 }}>
                      <svg width="120" height="120" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="44" fill="none" stroke="#f1f5f9" strokeWidth="13" />
                        {approvedLen > 0 && (
                          <circle
                            cx="60"
                            cy="60"
                            r="44"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="13"
                            strokeDasharray={`${approvedLen} ${circumference}`}
                            strokeDashoffset="69"
                          />
                        )}
                        {pendingLen > 0 && (
                          <circle
                            cx="60"
                            cy="60"
                            r="44"
                            fill="none"
                            stroke="#f59e0b"
                            strokeWidth="13"
                            strokeDasharray={`${pendingLen} ${circumference}`}
                            strokeDashoffset={69 - approvedLen}
                          />
                        )}
                        {draftLen > 0 && (
                          <circle
                            cx="60"
                            cy="60"
                            r="44"
                            fill="none"
                            stroke="#8b5cf6"
                            strokeWidth="13"
                            strokeDasharray={`${draftLen} ${circumference}`}
                            strokeDashoffset={69 - approvedLen - pendingLen}
                          />
                        )}
                        {rejectedLen > 0 && (
                          <circle
                            cx="60"
                            cy="60"
                            r="44"
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="13"
                            strokeDasharray={`${rejectedLen} ${circumference}`}
                            strokeDashoffset={69 - approvedLen - pendingLen - draftLen}
                          />
                        )}
                      </svg>
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          textAlign: 'center'
                        }}
                      >
                        <Typography sx={{ fontWeight: 800, fontSize: 19, color: '#111827', lineHeight: 1 }}>
                          {total}
                        </Typography>
                        <Typography sx={{ fontSize: 10, color: '#64748b', fontWeight: 600 }}>
                          Total
                        </Typography>
                      </Box>
                    </Box>

                    {/* Legend list */}
                    <Stack spacing={0.9} sx={{ flex: 1 }}>
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Stack direction="row" spacing={0.75} alignItems="center">
                          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#8b5cf6' }} />
                          <Typography sx={{ fontSize: 12, color: '#374151', fontWeight: 600 }}>Draft</Typography>
                        </Stack>
                        <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#111827' }}>
                          {draftCount} ({pct(draftCount)}%)
                        </Typography>
                      </Stack>

                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Stack direction="row" spacing={0.75} alignItems="center">
                          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#f59e0b' }} />
                          <Typography sx={{ fontSize: 12, color: '#374151', fontWeight: 600 }}>Pending Approval</Typography>
                        </Stack>
                        <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#111827' }}>
                          {pendingCount} ({pct(pendingCount)}%)
                        </Typography>
                      </Stack>

                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Stack direction="row" spacing={0.75} alignItems="center">
                          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10b981' }} />
                          <Typography sx={{ fontSize: 12, color: '#374151', fontWeight: 600 }}>Approved</Typography>
                        </Stack>
                        <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#111827' }}>
                          {approvedCount} ({pct(approvedCount)}%)
                        </Typography>
                      </Stack>

                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Stack direction="row" spacing={0.75} alignItems="center">
                          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ef4444' }} />
                          <Typography sx={{ fontSize: 12, color: '#374151', fontWeight: 600 }}>Rejected</Typography>
                        </Stack>
                        <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#111827' }}>
                          {rejectedCount} ({pct(rejectedCount)}%)
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Card>
              );
            })()}

            {/* 3. Quick Actions */}
            <Card
              sx={{
                p: 2.25,
                borderRadius: '16px',
                border: '1px solid #f1f5f9',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.75 }}>
                <Typography sx={{ fontWeight: 800, fontSize: 15, color: '#111827' }}>
                  Quick Actions
                </Typography>
                <Button
                  size="small"
                  onClick={() => setCreateDialogOpen(true)}
                  sx={{ textTransform: 'none', color: '#6929e2', fontWeight: 700, fontSize: 12, p: 0 }}
                >
                  View all →
                </Button>
              </Stack>

              <Stack spacing={1.25}>
                {/* Create Requisition */}
                <Box
                  onClick={() => setCreateDialogOpen(true)}
                  sx={{
                    p: 1.25,
                    borderRadius: '12px',
                    border: '1px solid #f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    '&:hover': { bgcolor: '#faf5ff', borderColor: '#ddd6fe' }
                  }}
                >
                  <Stack direction="row" spacing={1.25} alignItems="center">
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        bgcolor: '#ede9fe',
                        color: '#6929e2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 13
                      }}
                    >
                      <PlusOutlined />
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#111827' }}>
                        Create Requisition
                      </Typography>
                      <Typography sx={{ fontSize: 11, color: '#6b7280' }}>
                        Start a new hiring request
                      </Typography>
                    </Box>
                  </Stack>
                  <RightOutlined style={{ fontSize: 11, color: '#9ca3af' }} />
                </Box>

                {/* View Approval Workflow */}
                <Box
                  onClick={() => setWorkflowDialogOpen(true)}
                  sx={{
                    p: 1.25,
                    borderRadius: '12px',
                    border: '1px solid #f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    '&:hover': { bgcolor: '#faf5ff', borderColor: '#ddd6fe' }
                  }}
                >
                  <Stack direction="row" spacing={1.25} alignItems="center">
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        bgcolor: '#ede9fe',
                        color: '#6929e2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 13
                      }}
                    >
                      <CheckOutlined />
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#111827' }}>
                        View Approval Workflow
                      </Typography>
                      <Typography sx={{ fontSize: 11, color: '#6b7280' }}>
                        Check pending approvals
                      </Typography>
                    </Box>
                  </Stack>
                  <RightOutlined style={{ fontSize: 11, color: '#9ca3af' }} />
                </Box>

                {/* View Templates */}
                <Box
                  onClick={() => setTemplatesDialogOpen(true)}
                  sx={{
                    p: 1.25,
                    borderRadius: '12px',
                    border: '1px solid #f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    '&:hover': { bgcolor: '#faf5ff', borderColor: '#ddd6fe' }
                  }}
                >
                  <Stack direction="row" spacing={1.25} alignItems="center">
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        bgcolor: '#ede9fe',
                        color: '#6929e2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 13
                      }}
                    >
                      <FileTextOutlined />
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#111827' }}>
                        View Templates
                      </Typography>
                      <Typography sx={{ fontSize: 11, color: '#6b7280' }}>
                        Use existing requisition templates
                      </Typography>
                    </Box>
                  </Stack>
                  <RightOutlined style={{ fontSize: 11, color: '#9ca3af' }} />
                </Box>

                {/* Import from Careers Website */}
                <Box
                  onClick={handleSyncNow}
                  sx={{
                    p: 1.25,
                    borderRadius: '12px',
                    border: '1px solid #f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    '&:hover': { bgcolor: '#faf5ff', borderColor: '#ddd6fe' }
                  }}
                >
                  <Stack direction="row" spacing={1.25} alignItems="center">
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        bgcolor: '#ede9fe',
                        color: '#6929e2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 13
                      }}
                    >
                      <LinkOutlined />
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#111827' }}>
                        Import from Careers Website
                      </Typography>
                      <Typography sx={{ fontSize: 11, color: '#6b7280' }}>
                        Review and manage imported jobs
                      </Typography>
                    </Box>
                  </Stack>
                  <RightOutlined style={{ fontSize: 11, color: '#9ca3af' }} />
                </Box>
              </Stack>
            </Card>

            {/* 4. Recent Activity */}
            <Card
              sx={{
                p: 2.25,
                borderRadius: '16px',
                border: '1px solid #f1f5f9',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.75 }}>
                <Typography sx={{ fontWeight: 800, fontSize: 15, color: '#111827' }}>
                  Recent Activity
                </Typography>
                <Button
                  size="small"
                  onClick={() => setWorkflowDialogOpen(true)}
                  sx={{ textTransform: 'none', color: '#6929e2', fontWeight: 700, fontSize: 12, p: 0 }}
                >
                  View all →
                </Button>
              </Stack>

              <Stack spacing={1.75}>
                {recentActivity.length === 0 ? (
                  <Typography sx={{ fontSize: 12, color: '#64748b' }}>
                    No recent requisition activity yet.
                  </Typography>
                ) : (
                  recentActivity.slice(0, 5).map((item) => {
                    const lowerTitle = String(item.title || '').toLowerCase();
                    let icon = <PlusOutlined />;
                    let bgcolor = '#eff6ff';
                    let color = '#2563eb';
                    if (lowerTitle.includes('rejected') || lowerTitle.includes('deleted')) {
                      icon = <CloseOutlined />;
                      bgcolor = '#fef2f2';
                      color = '#dc2626';
                    } else if (lowerTitle.includes('converted')) {
                      icon = <ShopOutlined />;
                      bgcolor = '#f0fdf4';
                      color = '#16a34a';
                    } else if (lowerTitle.includes('approved')) {
                      icon = <CheckCircleOutlined />;
                      bgcolor = '#ecfdf5';
                      color = '#059669';
                    } else if (lowerTitle.includes('pending') || lowerTitle.includes('sync')) {
                      icon = <ClockCircleOutlined />;
                      bgcolor = '#faf5ff';
                      color = '#7c3aed';
                    }

                    return (
                      <Stack key={item.id} direction="row" spacing={1.25} alignItems="flex-start">
                        <Box
                          sx={{
                            width: 26,
                            height: 26,
                            borderRadius: '50%',
                            bgcolor,
                            color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 12,
                            flexShrink: 0,
                            mt: 0.25
                          }}
                        >
                          {icon}
                        </Box>
                        <Box>
                          <Typography sx={{ fontWeight: 700, fontSize: 12.5, color: '#111827' }}>
                            {item.title}
                          </Typography>
                          <Typography sx={{ fontSize: 11, color: '#64748b' }}>
                            {item.description ? `${item.description} • ` : ''}
                            {formatRelativeTime(item.created_at)}
                          </Typography>
                        </Box>
                      </Stack>
                    );
                  })
                )}
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      {/* ========================================================================= */}
      {/* 4. ACTION MENU (•••)                                                      */}
      {/* ========================================================================= */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            minWidth: 180
          }
        }}
      >
        <MenuItem
          onClick={() => {
            setMenuAnchor(null);
            if (selectedReq) setViewDetailsReq(selectedReq);
          }}
          sx={{ fontSize: 13, fontWeight: 600 }}
        >
          View Details
        </MenuItem>
        <MenuItem
          onClick={() => {
            setMenuAnchor(null);
            if (selectedReq) handleOpenEdit(selectedReq);
          }}
          sx={{ fontSize: 13, fontWeight: 600, color: '#1d4ed8' }}
        >
          Edit Requisition
        </MenuItem>
        <MenuItem
          onClick={() => {
            setMenuAnchor(null);
            if (selectedReq) {
              handleStatusUpdate(selectedReq, 'approved', `${selectedReq.id} marked as Approved!`, 'success');
            }
          }}
          sx={{ fontSize: 13, fontWeight: 600, color: '#059669' }}
        >
          Approve Requisition
        </MenuItem>
        <MenuItem
          onClick={() => {
            setMenuAnchor(null);
            if (selectedReq) {
              handleStatusUpdate(selectedReq, 'converted', `${selectedReq.id} converted into an active Job posting!`, 'success');
            }
          }}
          sx={{ fontSize: 13, fontWeight: 600, color: '#6929e2' }}
        >
          Convert to Job
        </MenuItem>
        <MenuItem
          onClick={() => {
            setMenuAnchor(null);
            if (selectedReq) {
              handleStatusUpdate(selectedReq, 'rejected', `${selectedReq.id} marked as Rejected.`, 'error');
            }
          }}
          sx={{ fontSize: 13, fontWeight: 600, color: '#d97706' }}
        >
          Reject Requisition
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={() => {
            setMenuAnchor(null);
            if (selectedReq) setDeleteConfirmReq(selectedReq);
          }}
          sx={{ fontSize: 13, fontWeight: 600, color: '#dc2626' }}
        >
          Delete Requisition
        </MenuItem>
      </Menu>

      {/* ========================================================================= */}
      {/* 5. CREATE REQUISITION DIALOG                                              */}
      {/* ========================================================================= */}
      <Dialog
        open={createDialogOpen}
        onClose={() => {
          setCreateDialogOpen(false);
          setEditingReq(null);
          setCreateErrors({});
        }}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>
          {editingReq ? `Edit Requisition (${editingReq.id})` : 'Create New Requisition'}
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Stack spacing={2.5}>
            <TextField
              fullWidth
              label="Job Title *"
              placeholder="e.g. Lead Frontend Architect"
              value={newTitle}
              onChange={(e) => {
                setNewTitle(e.target.value);
                if (createErrors.title) setCreateErrors({ ...createErrors, title: '' });
              }}
              error={Boolean(createErrors.title)}
              helperText={createErrors.title}
              required
            />
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  select
                  label="Department"
                  value={newDept}
                  onChange={(e) => setNewDept(e.target.value)}
                >
                  <MenuItem value="Engineering">Engineering</MenuItem>
                  <MenuItem value="Product">Product</MenuItem>
                  <MenuItem value="Data & Analytics">Data & Analytics</MenuItem>
                  <MenuItem value="Design">Design</MenuItem>
                  <MenuItem value="Sales">Sales</MenuItem>
                  <MenuItem value="Human Resources">Human Resources</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  type="number"
                  label="Vacancies *"
                  value={newVacancies}
                  onChange={(e) => {
                    setNewVacancies(e.target.value);
                    if (createErrors.vacancies) setCreateErrors({ ...createErrors, vacancies: '' });
                  }}
                  error={Boolean(createErrors.vacancies)}
                  helperText={createErrors.vacancies}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Employment & Experience"
                  placeholder="Full-time • 3+ yrs"
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Hiring Manager"
                  placeholder="e.g. Admin or Dept Head"
                  value={newManager}
                  onChange={(e) => setNewManager(e.target.value)}
                />
              </Grid>
            </Grid>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Reason for Headcount / Role Scope"
              placeholder="Describe business justification, key skills and project assignments..."
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => {
              setCreateDialogOpen(false);
              setEditingReq(null);
              setCreateErrors({});
            }}
            disabled={submitting}
            sx={{ textTransform: 'none', color: '#6b7280' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleCreateSubmit}
            disabled={submitting}
            startIcon={submitting ? <CircularProgress size={16} color="inherit" /> : null}
            sx={{
              bgcolor: '#6929e2',
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: '8px',
              px: 3,
              '&:hover': { bgcolor: '#5b1fd9' }
            }}
          >
            {submitting ? 'Saving...' : editingReq ? 'Save Changes' : 'Submit Requisition'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ========================================================================= */}
      {/* 6. APPROVAL WORKFLOW MODAL                                                */}
      {/* ========================================================================= */}
      <Dialog
        open={workflowDialogOpen}
        onClose={() => setWorkflowDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>
          Pending Requisition Approvals
        </DialogTitle>
        <DialogContent dividers sx={{ p: 2.5 }}>
          <Stack spacing={2}>
            {requisitions
              .filter((r) => r.status === 'Pending Approval')
              .map((r) => (
                <Card
                  key={r.id}
                  sx={{
                    p: 2,
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: '8px',
                        bgcolor: r.badgeBg,
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: 12
                      }}
                    >
                      {r.badge}
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: '#111827' }}>
                        {r.title} ({r.id})
                      </Typography>
                      <Typography sx={{ fontSize: 11.5, color: '#64748b' }}>
                        {r.dept} • {r.vacancies} vacancies • Manager: {r.manager}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => handleStatusUpdate(r, 'approved', `${r.id} has been Approved!`, 'success')}
                      sx={{
                        bgcolor: '#059669',
                        textTransform: 'none',
                        fontWeight: 700,
                        fontSize: 12,
                        '&:hover': { bgcolor: '#047857' }
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => handleStatusUpdate(r, 'rejected', `${r.id} rejected.`, 'error')}
                      sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12 }}
                    >
                      Reject
                    </Button>
                  </Stack>
                </Card>
              ))}

            {requisitions.filter((r) => r.status === 'Pending Approval').length === 0 && (
              <Typography sx={{ color: '#64748b', fontSize: 13, textAlign: 'center', py: 3 }}>
                No pending approvals at this time. All requisitions are cleared!
              </Typography>
            )}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setWorkflowDialogOpen(false)} sx={{ textTransform: 'none' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* VIEW REQUISITION DETAILS MODAL */}
      <Dialog
        open={Boolean(viewDetailsReq)}
        onClose={() => setViewDetailsReq(null)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>
          {viewDetailsReq?.id} • Requisition Details
        </DialogTitle>
        <DialogContent dividers sx={{ p: 2.5 }}>
          {viewDetailsReq && (
            <Stack spacing={1.5}>
              <Box>
                <Typography sx={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>Job Title</Typography>
                <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>{viewDetailsReq.title}</Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>Department</Typography>
                <Typography sx={{ fontSize: 13.5, fontWeight: 600, color: '#374151' }}>{viewDetailsReq.dept}</Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>Vacancies (Headcount)</Typography>
                <Typography sx={{ fontSize: 13.5, fontWeight: 600, color: '#374151' }}>{viewDetailsReq.vacancies}</Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>Status</Typography>
                <Box sx={{ mt: 0.5 }}>{getStatusChip(viewDetailsReq.status)}</Box>
              </Box>
              <Box>
                <Typography sx={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>Created On</Typography>
                <Typography sx={{ fontSize: 13, color: '#4b5563' }}>{viewDetailsReq.createdOn}</Typography>
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => {
              const req = viewDetailsReq;
              setViewDetailsReq(null);
              if (req) handleOpenEdit(req);
            }}
            sx={{ textTransform: 'none', color: '#6929e2', fontWeight: 700 }}
          >
            Edit
          </Button>
          <Button onClick={() => setViewDetailsReq(null)} sx={{ textTransform: 'none' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* DELETE REQUISITION CONFIRMATION MODAL */}
      <Dialog
        open={Boolean(deleteConfirmReq)}
        onClose={() => !deleting && setDeleteConfirmReq(null)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: 17, color: '#111827' }}>
          Delete Requisition?
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <Typography sx={{ fontSize: 13.5, color: '#4b5563' }}>
            Are you sure you want to delete <strong>{deleteConfirmReq?.id}</strong> ({deleteConfirmReq?.title})? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteConfirmReq(null)} disabled={deleting} sx={{ textTransform: 'none', color: '#6b7280' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteConfirm}
            disabled={deleting}
            startIcon={deleting ? <CircularProgress size={16} color="inherit" /> : null}
            sx={{ textTransform: 'none', fontWeight: 700, borderRadius: '8px' }}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ========================================================================= */}
      {/* 7. REVIEW IMPORTED JOBS / TEMPLATES MODAL                                 */}
      {/* ========================================================================= */}
      <Dialog
        open={syncDetailsDialogOpen || templatesDialogOpen}
        onClose={() => {
          setSyncDetailsDialogOpen(false);
          setTemplatesDialogOpen(false);
        }}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>
          {syncDetailsDialogOpen ? 'Imported Jobs from Careers Site' : 'Requisition Templates'}
        </DialogTitle>
        <DialogContent dividers sx={{ p: 2.5 }}>
          <Stack spacing={1.5}>
            <Alert severity="success" sx={{ borderRadius: '10px', fontSize: 12.5 }}>
              Connected to <strong>https://careers.traceu.com</strong>. Auto-sync active every 6 hours.
            </Alert>
            <Typography sx={{ fontSize: 13, color: '#475569' }}>
              The following roles were mapped into TraceU Jobs requisitions:
            </Typography>
            <Box sx={{ p: 1.5, borderRadius: '10px', bgcolor: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <Typography sx={{ fontWeight: 700, fontSize: 13 }}>• Senior Software Engineer (REQ-0018)</Typography>
              <Typography sx={{ fontSize: 11.5, color: '#64748b' }}>Imported Oct 21, 2025 • Auto-approved</Typography>
            </Box>
            <Box sx={{ p: 1.5, borderRadius: '10px', bgcolor: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <Typography sx={{ fontWeight: 700, fontSize: 13 }}>• Data Analyst (REQ-0016)</Typography>
              <Typography sx={{ fontSize: 11.5, color: '#64748b' }}>Imported Oct 18, 2025 • Saved as Draft</Typography>
            </Box>
            <Box sx={{ p: 1.5, borderRadius: '10px', bgcolor: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <Typography sx={{ fontWeight: 700, fontSize: 13 }}>• Machine Learning Engineer (REQ-0014)</Typography>
              <Typography sx={{ fontSize: 11.5, color: '#64748b' }}>Imported Oct 14, 2025 • Converted to Job</Typography>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => {
              setSyncDetailsDialogOpen(false);
              setTemplatesDialogOpen(false);
            }}
            sx={{ textTransform: 'none' }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%', borderRadius: '10px', fontWeight: 600 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
