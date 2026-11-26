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
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';

// project imports
import { getJobs, createJob, updateJob, updateJobStatus, deleteJob, publishToJobBoards } from 'api/adminJobs';

// icons
import ShopOutlined from '@ant-design/icons/ShopOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import ShareAltOutlined from '@ant-design/icons/ShareAltOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import MoreOutlined from '@ant-design/icons/MoreOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import FilterOutlined from '@ant-design/icons/FilterOutlined';
import GlobalOutlined from '@ant-design/icons/GlobalOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import PauseCircleOutlined from '@ant-design/icons/PauseCircleOutlined';
import SendOutlined from '@ant-design/icons/SendOutlined';
import EnvironmentOutlined from '@ant-design/icons/EnvironmentOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';

// initial mock jobs
const initialJobs = [
  {
    id: 'JOB-0012',
    title: 'Senior Software Engineer',
    dept: 'Engineering',
    location: 'Bengaluru',
    type: 'Full-time',
    apps: 142,
    views: '1,245',
    status: 'Published',
    postedOn: 'Oct 21, 2025',
    source: 'Company Website',
    badgeBg: '#4338ca',
    desc: 'We are looking for a passionate Senior Software Engineer to join our growing engineering team. You will work on scalable web applications and contribute to innovative products that make an impact.',
    requirements: [
      '3+ years of relevant experience',
      'Strong proficiency in React, TypeScript and Tailwind CSS',
      'Experience with REST APIs and Git',
      'Good communication and problem-solving skills'
    ]
  },
  {
    id: 'JOB-0011',
    title: 'Product Manager',
    dept: 'Product',
    location: 'Chennai',
    type: 'Full-time',
    apps: 98,
    views: '890',
    status: 'Published',
    postedOn: 'Oct 19, 2025',
    source: 'TraceU',
    badgeBg: '#db2777',
    desc: 'Lead end-to-end product lifecycles, user journey optimizations, and feature rollouts in close collaboration with design and engineering teams.',
    requirements: [
      '4+ years product management experience in SaaS',
      'Proven track record of driving KPI metrics and feature adoption',
      'Strong data-driven mindset with SQL and analytics expertise'
    ]
  },
  {
    id: 'JOB-0010',
    title: 'Data Analyst',
    dept: 'Data & Analytics',
    location: 'Hyderabad',
    type: 'Full-time',
    apps: 76,
    views: '654',
    status: 'Published',
    postedOn: 'Oct 18, 2025',
    source: 'Company Website',
    badgeBg: '#0284c7',
    desc: 'Analyze recruitment and talent pipeline datasets, build actionable executive dashboards, and derive predictive insights.',
    requirements: [
      '2+ years in analytics with Python, SQL, and Power BI / Tableau',
      'Experience in data visualization and statistical reporting',
      'Strong analytical and cross-functional communication skills'
    ]
  },
  {
    id: 'JOB-0009',
    title: 'UI/UX Designer',
    dept: 'Design',
    location: 'Bengaluru',
    type: 'Full-time',
    apps: 54,
    views: '512',
    status: 'Published',
    postedOn: 'Oct 16, 2025',
    source: 'TraceU',
    badgeBg: '#7c3aed',
    desc: 'Craft intuitive interfaces, design tokens, and user interactions for next-generation talent acquisition products.',
    requirements: [
      'Portfolio showcasing modern web application and design system work',
      'Deep expertise in Figma, interactive prototyping, and user research',
      'Strong understanding of accessibility and front-end feasibility'
    ]
  },
  {
    id: 'JOB-0008',
    title: 'Machine Learning Engineer',
    dept: 'Data & Analytics',
    location: 'Pune',
    type: 'Full-time',
    apps: 64,
    views: '720',
    status: 'Draft',
    postedOn: 'Oct 14, 2025',
    source: 'TraceU',
    badgeBg: '#ea580c',
    desc: 'Build intelligent recommendation algorithms for resume-job matching and contextual candidate profile ranking.',
    requirements: [
      '3+ years building and deploying NLP / LLM architectures',
      'Hands-on experience with PyTorch, TensorFlow, and vector databases',
      'Strong foundation in computer science and algorithms'
    ]
  },
  {
    id: 'JOB-0007',
    title: 'Backend Developer',
    dept: 'Engineering',
    location: 'Chennai',
    type: 'Full-time',
    apps: 81,
    views: '920',
    status: 'Published',
    postedOn: 'Oct 12, 2025',
    source: 'Company Website',
    badgeBg: '#3b82f6',
    desc: 'Design scalable microservices, manage database architecture, and optimize API throughput for high-concurrency workloads.',
    requirements: [
      '3+ years in Node.js / Go / Java building REST & gRPC services',
      'Strong experience with PostgreSQL, Redis, and message queues',
      'Proficiency with Docker, Kubernetes, and AWS deployment'
    ]
  },
  {
    id: 'JOB-0006',
    title: 'Sales Executive',
    dept: 'Sales',
    location: 'Coimbatore',
    type: 'Full-time',
    apps: 68,
    views: '430',
    status: 'Published',
    postedOn: 'Oct 10, 2025',
    source: 'Job Board',
    badgeBg: '#059669',
    desc: 'Drive business expansion across mid-market and enterprise enterprise clients by presenting TraceU platform offerings.',
    requirements: [
      '2+ years in B2B SaaS sales or enterprise technology outreach',
      'Proven ability to manage full sales cycles and exceed quotas',
      'Excellent presentation and relationship-building capabilities'
    ]
  },
  {
    id: 'JOB-0005',
    title: 'HR Coordinator',
    dept: 'Human Resources',
    location: 'Bengaluru',
    type: 'Full-time',
    apps: 32,
    views: '310',
    status: 'Closed',
    postedOn: 'Oct 08, 2025',
    source: 'TraceU',
    badgeBg: '#dc2626',
    desc: 'Coordinate interview schedules, candidate onboarding, and HR operations with recruitment leads.',
    requirements: [
      '1+ years HR operations or recruitment coordination experience',
      'Familiarity with ATS tools and onboarding workflows',
      'Detail-oriented and empathetic communicator'
    ]
  },
  {
    id: 'JOB-0004',
    title: 'DevOps Engineer',
    dept: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    apps: 45,
    views: '480',
    status: 'Paused',
    postedOn: 'Oct 06, 2025',
    source: 'Company Website',
    badgeBg: '#6366f1',
    desc: 'Maintain CI/CD infrastructure, cloud security posture, and high availability systems across AWS environments.',
    requirements: [
      '3+ years managing Kubernetes, Terraform, and GitHub Actions',
      'Strong Linux administration and shell scripting skills',
      'Monitoring expertise with Prometheus, Grafana, and Datadog'
    ]
  },
  {
    id: 'JOB-0003',
    title: 'Digital Marketing Specialist',
    dept: 'Marketing',
    location: 'Chennai',
    type: 'Full-time',
    apps: 39,
    views: '390',
    status: 'Published',
    postedOn: 'Oct 04, 2025',
    source: 'TraceU',
    badgeBg: '#d97706',
    desc: 'Design and execute multi-channel recruitment marketing campaigns, search ads, and branding initiatives.',
    requirements: [
      '2+ years digital marketing, SEO/SEM, and social campaign execution',
      'Proficiency with Google Ads, Meta Ads Manager, and Google Analytics 4',
      'Creative copywriting and performance optimization mindset'
    ]
  }
];

const JOB_STATUS_LABELS = {
  published: 'Published',
  open: 'Published',
  active: 'Published',
  draft: 'Draft',
  paused: 'Paused',
  closed: 'Closed'
};

const JOB_TYPE_LABELS = {
  full_time: 'Full-time',
  contract: 'Contract',
  part_time: 'Part-time',
  internship: 'Internship'
};

const JOB_BADGE_COLORS = ['#4338ca', '#db2777', '#0284c7', '#7c3aed', '#ea580c', '#059669'];

function mapBackendJob(item) {
  const rawStatus = String(item?.status || 'published').toLowerCase();
  const rawType = String(item?.job_type || 'full_time').toLowerCase();
  const postedOn = item?.created_at
    ? new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Just now';

  const rawReqs = String(item?.requirements || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  return {
    dbId: item?.id,
    id: `JOB-${String(item?.id || 1).padStart(4, '0')}`,
    title: item?.title || 'Untitled Job',
    dept: item?.department || 'Engineering',
    location: item?.location || 'Bengaluru',
    type: JOB_TYPE_LABELS[rawType] || 'Full-time',
    apps: Number(item?.applications_count || 0),
    views: Number(item?.views || 0).toLocaleString(),
    status: JOB_STATUS_LABELS[rawStatus] || 'Published',
    postedOn,
    source: item?.source || 'TraceU',
    badgeBg: JOB_BADGE_COLORS[(Number(item?.id) || 0) % JOB_BADGE_COLORS.length],
    desc: item?.description || 'Newly created role in TraceU talent pipeline.',
    requirementsText: item?.requirements || '',
    requirements: rawReqs
  };
}

export default function AdminJobs() {
  const navigate = useNavigate();

  // state
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [savingEdit, setSavingEdit] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [syncingBoards, setSyncingBoards] = useState(false);
  const [deleteConfirmJob, setDeleteConfirmJob] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [statusTab, setStatusTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [locationFilter, setLocationFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(1);
  const [previewTab, setPreviewTab] = useState(0);

  // dialog & menu
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editJobForm, setEditJobForm] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [menuTargetJob, setMenuTargetJob] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // form state for creating a job
  const [newTitle, setNewTitle] = useState('');
  const [newDept, setNewDept] = useState('Engineering');
  const [newLocation, setNewLocation] = useState('Bengaluru');
  const [newType, setNewType] = useState('Full-time');
  const [newDesc, setNewDesc] = useState('');
  const [newRequirements, setNewRequirements] = useState('');
  const [createJobErrors, setCreateJobErrors] = useState({});

  useEffect(() => {
    let cancelled = false;
    setLoadingJobs(true);
    getJobs()
      .then((res) => {
        if (cancelled) return;
        const list = Array.isArray(res?.data) ? res.data : [];
        setJobs(list.map(mapBackendJob));
      })
      .catch((err) => {
        if (cancelled) return;
        setSnackbar({
          open: true,
          message: err.message || 'Failed to load jobs from server',
          severity: 'error'
        });
      })
      .finally(() => {
        if (!cancelled) setLoadingJobs(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // counts
  const totalCount = jobs.length;
  const publishedCount = jobs.filter((j) => j.status === 'Published').length;
  const draftCount = jobs.filter((j) => j.status === 'Draft').length;
  const pausedCount = jobs.filter((j) => j.status === 'Paused').length;
  const closedCount = jobs.filter((j) => j.status === 'Closed').length;

  // filter logic
  const filteredJobs = useMemo(() => {
    return jobs.filter((j) => {
      const matchTab = statusTab === 'ALL' || j.status === statusTab;
      const matchSearch =
        j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.dept.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchDept = departmentFilter === 'ALL' || j.dept === departmentFilter;
      const matchLoc = locationFilter === 'ALL' || j.location === locationFilter;
      const matchStatus = statusFilter === 'ALL' || j.status === statusFilter;
      return matchTab && matchSearch && matchDept && matchLoc && matchStatus;
    });
  }, [jobs, statusTab, searchQuery, departmentFilter, locationFilter, statusFilter]);

  // handle row selection
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

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      const next = selectedRows.filter((r) => r !== id);
      setSelectedRows(next);
      if (selectedJob?.id === id) {
        const remaining = filteredJobs.find((j) => next.includes(j.id));
        setSelectedJob(remaining || null);
      }
    } else {
      setSelectedRows([...selectedRows, id]);
      const foundJob = jobs.find((j) => j.id === id);
      if (foundJob) setSelectedJob(foundJob);
    }
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

  const handleOpenEdit = (job) => {
    const target = job || selectedJob;
    if (!target) return;
    setEditJobForm({ ...target });
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editJobForm || !editJobForm.title.trim()) {
      setSnackbar({ open: true, message: 'Job title is required', severity: 'warning' });
      return;
    }
    setSavingEdit(true);
    try {
      const res = await updateJob(editJobForm.dbId, {
        title: editJobForm.title.trim(),
        department: editJobForm.dept,
        location: editJobForm.location,
        jobType: editJobForm.type,
        status: editJobForm.status,
        description: editJobForm.desc,
        requirements: editJobForm.requirementsText ?? (editJobForm.requirements || []).join('\n'),
        source: editJobForm.source
      });
      const updated = mapBackendJob(res.data);
      setJobs((prev) => prev.map((j) => (j.dbId === editJobForm.dbId ? updated : j)));
      if (selectedJob?.dbId === editJobForm.dbId) {
        setSelectedJob(updated);
      }
      setEditDialogOpen(false);
      setSnackbar({ open: true, message: `Job ${updated.id} updated successfully!`, severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: err.message || 'Failed to update job', severity: 'error' });
    } finally {
      setSavingEdit(false);
    }
  };

  const handleJobStatusUpdate = async (job, nextStatus, successMessage, severity = 'success') => {
    if (!job?.dbId) return;
    try {
      const res = await updateJobStatus(job.dbId, nextStatus);
      const updated = mapBackendJob(res.data);
      setJobs((prev) => prev.map((j) => (j.dbId === job.dbId ? updated : j)));
      if (selectedJob?.dbId === job.dbId) {
        setSelectedJob(updated);
      }
      setSnackbar({ open: true, message: successMessage, severity });
    } catch (err) {
      setSnackbar({ open: true, message: err.message || 'Failed to update job status', severity: 'error' });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirmJob?.dbId) return;
    setDeleting(true);
    try {
      await deleteJob(deleteConfirmJob.dbId);
      setJobs((prev) => prev.filter((j) => j.dbId !== deleteConfirmJob.dbId));
      if (selectedJob?.dbId === deleteConfirmJob.dbId) {
        setSelectedJob(null);
      }
      setSnackbar({ open: true, message: `Job ${deleteConfirmJob.id} deleted.`, severity: 'info' });
      setDeleteConfirmJob(null);
    } catch (err) {
      setSnackbar({ open: true, message: err.message || 'Failed to delete job', severity: 'error' });
    } finally {
      setDeleting(false);
    }
  };

  const handlePublishToJobBoards = async () => {
    setSyncingBoards(true);
    try {
      const res = await publishToJobBoards();
      setSnackbar({
        open: true,
        message: res?.message || 'Jobs synchronized across job boards!',
        severity: 'info'
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || 'Failed to publish jobs to job boards',
        severity: 'error'
      });
    } finally {
      setSyncingBoards(false);
    }
  };

  const handleShareJob = (job) => {
    const target = job || selectedJob;
    if (!target) return;
    const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/candidate/jobs?id=${target.id}`;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
    }
    setSnackbar({ open: true, message: `Share link for ${target.title} (${target.id}) copied to clipboard!`, severity: 'success' });
  };

  // create job submit
  const handleCreateSubmit = async () => {
    const errors = {};
    if (!newTitle.trim()) {
      errors.title = 'Job title is required';
    } else if (newTitle.trim().length < 5) {
      errors.title = 'Job title must be at least 5 characters';
    }

    if (Object.keys(errors).length > 0) {
      setCreateJobErrors(errors);
      setSnackbar({ open: true, message: 'Please correct the validation errors', severity: 'warning' });
      return;
    }

    setSubmitting(true);
    try {
      const res = await createJob({
        title: newTitle.trim(),
        department: newDept,
        location: newLocation,
        jobType: newType,
        status: 'published',
        description: newDesc.trim(),
        requirements: newRequirements.trim(),
        source: 'TraceU'
      });
      const created = mapBackendJob(res.data);
      setJobs((prev) => [created, ...prev]);
      setSelectedJob(created);
      setCreateDialogOpen(false);
      setNewTitle('');
      setNewDesc('');
      setNewRequirements('');
      setCreateJobErrors({});
      setSnackbar({ open: true, message: `Job ${created.id} created and published!`, severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: err.message || 'Failed to create job', severity: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  // status chip renderer
  const getStatusChip = (status) => {
    switch (status) {
      case 'Published':
        return (
          <Chip
            label="Published"
            size="small"
            sx={{
              bgcolor: '#ecfdf5',
              color: '#059669',
              fontWeight: 500, fontSize: 11,
              border: '1px solid #a7f3d0'
            }}
          />
        );
      case 'Draft':
        return (
          <Chip
            label="Draft"
            size="small"
            sx={{
              bgcolor: '#fffbeb',
              color: '#d97706',
              fontWeight: 500, fontSize: 11,
              border: '1px solid #fde68a'
            }}
          />
        );
      case 'Paused':
        return (
          <Chip
            label="Paused"
            size="small"
            sx={{
              bgcolor: '#eff6ff',
              color: '#2563eb',
              fontWeight: 500, fontSize: 11,
              border: '1px solid #bfdbfe'
            }}
          />
        );
      case 'Closed':
        return (
          <Chip
            label="Closed"
            size="small"
            sx={{
              bgcolor: '#f3f4f6',
              color: '#6b7280',
              fontWeight: 500, fontSize: 11,
              border: '1px solid #e5e7eb'
            }}
          />
        );
      default:
        return <Chip label={status} size="small" />;
    }
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100%', pb: 5 }}>
      {/* ========================================================================= */}
      {/* 1. HEADER ROW                                                             */}
      {/* ========================================================================= */}
      <Box sx={{ mb: 3 }}>
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
            <ShopOutlined />
          </Box>
          <Typography sx={{ color: '#6929e2', fontWeight: 700, fontSize: 13 }}>
            Jobs
          </Typography>
        </Stack>

        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', lg: 'center' }}
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
              Job Management
            </Typography>
            <Typography sx={{ color: '#6b7280', fontSize: 13, lineHeight: 1.45 }}>
              Create, edit, preview and publish job vacancies on the careers portal and job boards.
            </Typography>
          </Box>

          <Stack direction="row" spacing={1.5} alignItems="center" flexShrink={0}>
            <Button
              variant="contained"
              startIcon={<PlusOutlined />}
              onClick={() => setCreateDialogOpen(true)}
              sx={{
                bgcolor: '#530EF0',
                fontWeight: 600,
                fontSize: 14,
                textTransform: 'none',
                borderRadius: '8px',
                height: 40,
                minHeight: 40,
                whiteSpace: 'nowrap',
                px: 2,
                '&:hover': { bgcolor: '#430BC2' }
              }}
            >
              Create Job
            </Button>
            <Button
              variant="outlined"
              startIcon={syncingBoards ? <CircularProgress size={15} color="inherit" /> : <ShareAltOutlined />}
              disabled={syncingBoards}
              onClick={handlePublishToJobBoards}
              sx={{
                color: '#334155',
                borderColor: '#E2E8F0',
                bgcolor: '#FFFFFF',
                fontWeight: 600,
                fontSize: 14,
                textTransform: 'none',
                borderRadius: '8px',
                height: 40,
                minHeight: 40,
                whiteSpace: 'nowrap',
                px: 2,
                '&:hover': { borderColor: '#CBD5E1', bgcolor: '#F8FAFC' }
              }}
            >
              Publish to Job Boards
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* ========================================================================= */}
      {/* 2. TOP 5 KPI CARDS                                                        */}
      {/* ========================================================================= */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* Total Jobs */}
        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <Card sx={{
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
              }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box sx={{ width: 38, height: 38, borderRadius: '10px', bgcolor: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                <ShopOutlined />
              </Box>
              <Chip label="↑ 12%" size="small" sx={{ bgcolor: 'rgba(16, 185, 129, 0.08)', color: '#10B981', fontWeight: 500, fontSize: 11, height: 22, borderRadius: '6px' }} />
            </Stack>
            <Box sx={{ mt: 1.5 }}>
              <Typography sx={{ color: '#6B7280', fontSize: 13, fontWeight: 500, display: 'block', mb: 0.25 }}>Total Jobs</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 28, color: '#111827', lineHeight: 1 }}>{totalCount}</Typography>
              <Typography sx={{ color: '#9CA3AF', fontSize: 12, fontWeight: 400, mt: 0.5 }}>Across all departments</Typography>
            </Box>
          </Card>
        </Grid>

        {/* Published */}
        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <Card sx={{
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
              }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box sx={{ width: 38, height: 38, borderRadius: '10px', bgcolor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                <SendOutlined />
              </Box>
              <Chip label="↑ 20%" size="small" sx={{ bgcolor: 'rgba(16, 185, 129, 0.08)', color: '#10B981', fontWeight: 500, fontSize: 11, height: 22, borderRadius: '6px' }} />
            </Stack>
            <Box sx={{ mt: 1.5 }}>
              <Typography sx={{ color: '#6B7280', fontSize: 13, fontWeight: 500, display: 'block', mb: 0.25 }}>Published</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 28, color: '#111827', lineHeight: 1 }}>{publishedCount}</Typography>
              <Typography sx={{ color: '#9CA3AF', fontSize: 12, fontWeight: 400, mt: 0.5 }}>Visible on careers portal</Typography>
            </Box>
          </Card>
        </Grid>

        {/* Draft */}
        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <Card sx={{
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
              }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box sx={{ width: 38, height: 38, borderRadius: '10px', bgcolor: '#fffbeb', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                <ClockCircleOutlined />
              </Box>
              <Chip label="↓ 25%" size="small" sx={{ bgcolor: 'rgba(239, 68, 68, 0.08)', color: '#EF4444', fontWeight: 500, fontSize: 11, height: 22, borderRadius: '6px' }} />
            </Stack>
            <Box sx={{ mt: 1.5 }}>
              <Typography sx={{ color: '#6B7280', fontSize: 13, fontWeight: 500, display: 'block', mb: 0.25 }}>Draft</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 28, color: '#111827', lineHeight: 1 }}>{draftCount}</Typography>
              <Typography sx={{ color: '#9CA3AF', fontSize: 12, fontWeight: 400, mt: 0.5 }}>Not yet published</Typography>
            </Box>
          </Card>
        </Grid>

        {/* Paused */}
        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <Card sx={{
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
              }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box sx={{ width: 38, height: 38, borderRadius: '10px', bgcolor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                <PauseCircleOutlined />
              </Box>
              <Typography sx={{ color: '#9ca3af', fontSize: 13, fontWeight: 700 }}>—</Typography>
            </Stack>
            <Box sx={{ mt: 1.5 }}>
              <Typography sx={{ color: '#6B7280', fontSize: 13, fontWeight: 500, display: 'block', mb: 0.25 }}>Paused</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 28, color: '#111827', lineHeight: 1 }}>{pausedCount}</Typography>
              <Typography sx={{ color: '#9CA3AF', fontSize: 12, fontWeight: 400, mt: 0.5 }}>Temporarily on hold</Typography>
            </Box>
          </Card>
        </Grid>

        {/* Closed */}
        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <Card sx={{
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
              }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box sx={{ width: 38, height: 38, borderRadius: '10px', bgcolor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                <CheckCircleOutlined />
              </Box>
              <Typography sx={{ color: '#9ca3af', fontSize: 13, fontWeight: 700 }}>—</Typography>
            </Stack>
            <Box sx={{ mt: 1.5 }}>
              <Typography sx={{ color: '#6B7280', fontSize: 13, fontWeight: 500, display: 'block', mb: 0.25 }}>Closed</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 28, color: '#111827', lineHeight: 1 }}>{closedCount}</Typography>
              <Typography sx={{ color: '#9CA3AF', fontSize: 12, fontWeight: 400, mt: 0.5 }}>No active closures</Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* ========================================================================= */}
      {/* 3. MASTER LAYOUT: JOBS TABLE (FULL WIDTH OR SPLIT WHEN INSPECTING)         */}
      {/* ========================================================================= */}
      <Grid container spacing={3} alignItems="flex-start">
        {/* LEFT COLUMN: TABLE CARD */}
        <Grid size={{ xs: 12, lg: selectedJob ? 7.8 : 12 }}>
          <Card sx={{ borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
            {/* Status Tabs Bar */}
            <Box sx={{ px: 2.5, pt: 1.5, borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
              <Tabs
                value={statusTab}
                onChange={(e, val) => setStatusTab(val)}
                sx={{
                  minHeight: 42,
                  '& .MuiTab-root': {
                    minHeight: 42,
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: 13,
                    color: '#6b7280',
                    px: 1.75
                  },
                  '& .Mui-selected': {
                    color: '#6929e2 !important'
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#6929e2',
                    height: 3,
                    borderRadius: '3px 3px 0 0'
                  }
                }}
              >
                <Tab value="ALL" label={`All Jobs (${totalCount})`} />
                <Tab value="Published" label={`Published (${publishedCount})`} />
                <Tab value="Draft" label={`Draft (${draftCount})`} />
                <Tab value="Paused" label={`Paused (${pausedCount})`} />
                <Tab value="Closed" label={`Closed (${closedCount})`} />
              </Tabs>

              <Typography sx={{ fontSize: 12, color: '#6b7280', fontWeight: 600 }}>
                Sort by: <strong style={{ color: '#111827' }}>Newest first ⌵</strong>
              </Typography>
            </Box>

            {/* Search & Multi Filters */}
            <Box sx={{ p: 2, px: 2.5, borderBottom: '1px solid #f1f5f9' }}>
              <Grid container spacing={1.5} alignItems="center">
                <Grid size={{ xs: 12, md: 5 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Search by job title, department, location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchOutlined style={{ color: '#9ca3af', fontSize: 15 }} />
                        </InputAdornment>
                      )
                    }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px', fontSize: 13 } }}
                  />
                </Grid>
                <Grid size={{ xs: 6, sm: 3, md: 2.3 }}>
                  <Select fullWidth size="small" value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)} sx={{ borderRadius: '10px', fontSize: 12.5, fontWeight: 600 }}>
                    <MenuItem value="ALL">All Departments</MenuItem>
                    <MenuItem value="Engineering">Engineering</MenuItem>
                    <MenuItem value="Product">Product</MenuItem>
                    <MenuItem value="Data & Analytics">Data & Analytics</MenuItem>
                    <MenuItem value="Design">Design</MenuItem>
                    <MenuItem value="Sales">Sales</MenuItem>
                    <MenuItem value="Human Resources">Human Resources</MenuItem>
                    <MenuItem value="Marketing">Marketing</MenuItem>
                  </Select>
                </Grid>
                <Grid size={{ xs: 6, sm: 3, md: 2.3 }}>
                  <Select fullWidth size="small" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} sx={{ borderRadius: '10px', fontSize: 12.5, fontWeight: 600 }}>
                    <MenuItem value="ALL">All Locations</MenuItem>
                    <MenuItem value="Bengaluru">Bengaluru</MenuItem>
                    <MenuItem value="Chennai">Chennai</MenuItem>
                    <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                    <MenuItem value="Pune">Pune</MenuItem>
                    <MenuItem value="Coimbatore">Coimbatore</MenuItem>
                    <MenuItem value="Remote">Remote</MenuItem>
                  </Select>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
                  <Button
                    fullWidth
                    size="small"
                    variant="outlined"
                    startIcon={<FilterOutlined />}
                    onClick={() => setSnackbar({ open: true, message: 'Filter criteria updated', severity: 'info' })}
                    sx={{
                      borderRadius: '10px',
                      textTransform: 'none',
                      fontWeight: 700,
                      fontSize: 12.5,
                      color: '#6929e2',
                      borderColor: '#ddd6fe',
                      py: 0.9,
                      '&:hover': { bgcolor: '#faf5ff', borderColor: '#6929e2' }
                    }}
                  >
                    More Filters
                  </Button>
                </Grid>
              </Grid>
            </Box>

            {/* Bulk Actions Toolbar */}
            {selectedRows.length > 0 && (
              <Box
                sx={{
                  px: 2.5,
                  py: 1.25,
                  bgcolor: '#FAF5FF',
                  borderTop: '1px solid #E9D5FF',
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
                    onClick={async () => {
                      const targets = jobs.filter((j) => selectedRows.includes(j.id));
                      try {
                        const results = await Promise.all(
                          targets.map((j) => updateJobStatus(j.dbId, 'paused').then((r) => mapBackendJob(r.data)))
                        );
                        const byId = new Map(results.map((r) => [r.dbId, r]));
                        setJobs((prev) => prev.map((j) => byId.get(j.dbId) || j));
                        setSnackbar({ open: true, message: `Paused ${targets.length} jobs!`, severity: 'info' });
                      } catch (err) {
                        setSnackbar({ open: true, message: err.message || 'Failed to pause selected jobs', severity: 'error' });
                      }
                    }}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30, color: '#6B7280', borderColor: '#D1D5DB' }}
                  >
                    Pause ({selectedRows.length})
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={async () => {
                      const targets = jobs.filter((j) => selectedRows.includes(j.id));
                      try {
                        const results = await Promise.all(
                          targets.map((j) => updateJobStatus(j.dbId, 'closed').then((r) => mapBackendJob(r.data)))
                        );
                        const byId = new Map(results.map((r) => [r.dbId, r]));
                        setJobs((prev) => prev.map((j) => byId.get(j.dbId) || j));
                        setSnackbar({ open: true, message: `Closed ${targets.length} jobs!`, severity: 'info' });
                      } catch (err) {
                        setSnackbar({ open: true, message: err.message || 'Failed to close selected jobs', severity: 'error' });
                      }
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
                    onClick={async () => {
                      const targets = jobs.filter((j) => selectedRows.includes(j.id));
                      try {
                        await Promise.all(targets.map((j) => deleteJob(j.dbId)));
                        const deletedIds = new Set(targets.map((j) => j.dbId));
                        setJobs((prev) => prev.filter((j) => !deletedIds.has(j.dbId)));
                        setSelectedRows([]);
                        setSelectedJob(null);
                        setSnackbar({ open: true, message: `Deleted ${targets.length} jobs.`, severity: 'error' });
                      } catch (err) {
                        setSnackbar({ open: true, message: err.message || 'Failed to delete selected jobs', severity: 'error' });
                      }
                    }}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30 }}
                  >
                    Delete
                  </Button>
                  <Button
                    size="small"
                    onClick={() => setSelectedRows([])}
                    sx={{ textTransform: 'none', color: '#6B7280', fontSize: 12, ml: 1 }}
                  >
                    Deselect All
                  </Button>
                </Stack>
              </Box>
            )}

            {/* Table */}
            <TableContainer sx={{ minHeight: 460 }}>
              <Table size="small">
                <TableHead sx={{ bgcolor: '#f8fafc' }}>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        size="small"
                        checked={selectedRows.length > 0 && selectedRows.length === filteredJobs.length}
                        indeterminate={selectedRows.length > 0 && selectedRows.length < filteredJobs.length}
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Job Title</TableCell>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Department</TableCell>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Location</TableCell>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Type</TableCell>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Applications</TableCell>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Status</TableCell>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Posted On</TableCell>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Source</TableCell>
                    <TableCell align="right" sx={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredJobs.map((job) => {
                    const isSelected = selectedJob?.id === job.id;
                    return (
                      <TableRow
                        key={job.id}
                        hover
                        onClick={() => handleRowClick(job)}
                        sx={{
                          cursor: 'pointer',
                          bgcolor: isSelected ? '#faf5ff' : 'inherit',
                          '&:hover': { bgcolor: isSelected ? '#f5eeff' : '#f8fafc' },
                          transition: 'background-color 0.15s ease'
                        }}
                      >
                        <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            size="small"
                            checked={selectedRows.includes(job.id)}
                            onChange={() => handleSelectRow(job.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1.25} alignItems="center">
                            <Box
                              sx={{
                                width: 28,
                                height: 28,
                                borderRadius: '7px',
                                bgcolor: job.badgeBg,
                                color: '#ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 12,
                                fontWeight: 800
                              }}
                            >
                              {'</>'}
                            </Box>
                            <Box>
                              <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#111827' }}>
                                {job.title}
                              </Typography>
                              <Typography sx={{ fontSize: 11, color: '#6b7280' }}>
                                {job.id}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>
                        <TableCell sx={{ fontSize: 12.5, color: '#374151' }}>{job.dept}</TableCell>
                        <TableCell sx={{ fontSize: 12, color: '#6b7280' }}>
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <EnvironmentOutlined style={{ fontSize: 11 }} />
                            <span>{job.location}</span>
                          </Stack>
                        </TableCell>
                        <TableCell sx={{ fontSize: 12, color: '#6b7280' }}>{job.type}</TableCell>
                        <TableCell sx={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>{job.apps}</TableCell>
                        <TableCell>{getStatusChip(job.status)}</TableCell>
                        <TableCell sx={{ fontSize: 12, color: '#64748b' }}>{job.postedOn}</TableCell>
                        <TableCell>
                          <Chip
                            label={job.source}
                            size="small"
                            sx={{
                              bgcolor: job.source === 'TraceU' ? '#faf5ff' : '#eff6ff',
                              color: job.source === 'TraceU' ? '#7c3aed' : '#1d4ed8',
                              fontWeight: 600,
                              fontSize: 10.5,
                              border: job.source === 'TraceU' ? '1px solid #e9d5ff' : '1px solid #bfdbfe'
                            }}
                          />
                        </TableCell>
                        <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              setMenuAnchor(e.currentTarget);
                              setMenuTargetJob(job);
                            }}
                          >
                            <MoreOutlined style={{ color: '#94a3b8' }} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination footer */}
            <Box sx={{ p: 2, px: 2.5, borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ fontSize: 12.5, color: '#64748b' }}>
                Showing 1-{filteredJobs.length} of {jobs.length} jobs
              </Typography>
              <Pagination
                count={3}
                page={page}
                onChange={(e, p) => setPage(p)}
                size="small"
                shape="rounded"
                sx={{ '& .Mui-selected': { bgcolor: '#6929e2 !important', color: '#fff', fontWeight: 700 } }}
              />
            </Box>
          </Card>
        </Grid>

        {/* RIGHT COLUMN: INTERACTIVE JOB PREVIEW CARD (APPEARS ON CLICK) */}
        {selectedJob && (
          <Grid size={{ xs: 12, lg: 4.2 }}>
            <Card sx={{ borderRadius: '16px', border: '1px solid #ede9fe', boxShadow: '0 2px 10px rgba(105, 41, 226, 0.06)', overflow: 'hidden' }}>
              {/* Top Banner with decorative gradient */}
              <Box
                sx={{
                  p: 2.5,
                  background: 'linear-gradient(135deg, #f5f0ff 0%, #ede5ff 100%)',
                  borderBottom: '1px solid #e9d5ff',
                  position: 'relative'
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                  <Typography sx={{ fontWeight: 800, fontSize: 18, color: '#111827', lineHeight: 1.25 }}>
                    {selectedJob.title}
                  </Typography>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <Chip
                      label={selectedJob.status}
                      size="small"
                      sx={{ bgcolor: '#ecfdf5', color: '#059669', fontWeight: 700, fontSize: 11, border: '1px solid #a7f3d0' }}
                    />
                    <IconButton size="small" onClick={() => setSelectedJob(null)} sx={{ color: '#6b7280', '&:hover': { color: '#111827', bgcolor: 'rgba(0,0,0,0.04)' } }}>
                      <CloseOutlined style={{ fontSize: 12 }} />
                    </IconButton>
                  </Stack>
                </Stack>
                <Typography sx={{ fontSize: 12, color: '#6b7280', mb: 1 }}>
                  {selectedJob.id}
                </Typography>
                <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <TeamOutlined style={{ fontSize: 12, color: '#7c3aed' }} />
                    <Typography sx={{ fontSize: 12, color: '#4b5563', fontWeight: 600 }}>{selectedJob.dept}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <EnvironmentOutlined style={{ fontSize: 12, color: '#7c3aed' }} />
                    <Typography sx={{ fontSize: 12, color: '#4b5563', fontWeight: 600 }}>{selectedJob.location}</Typography>
                  </Stack>
                  <Typography sx={{ fontSize: 12, color: '#6b7280' }}>• {selectedJob.type}</Typography>
                </Stack>

                {/* 3 Metrics */}
                <Grid container spacing={1.5} sx={{ mt: 2, pt: 1.5, borderTop: '1px dashed #d8b4fe' }}>
                  <Grid size={{ xs: 4 }}>
                    <Typography sx={{ fontSize: 11, color: '#6b7280' }}>Applications</Typography>
                    <Typography sx={{ fontSize: 16, fontWeight: 800, color: '#111827' }}>{selectedJob.apps}</Typography>
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <Typography sx={{ fontSize: 11, color: '#6b7280' }}>Posted</Typography>
                    <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#111827' }}>{selectedJob.postedOn}</Typography>
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <Typography sx={{ fontSize: 11, color: '#6b7280' }}>Views</Typography>
                    <Typography sx={{ fontSize: 16, fontWeight: 800, color: '#111827' }}>{selectedJob.views}</Typography>
                  </Grid>
                </Grid>
              </Box>

              {/* Tabs */}
              <Box sx={{ borderBottom: '1px solid #f1f5f9' }}>
                <Tabs
                  value={previewTab}
                  onChange={(e, val) => setPreviewTab(val)}
                  sx={{
                    minHeight: 40,
                    '& .MuiTab-root': { minHeight: 40, textTransform: 'none', fontSize: 12, fontWeight: 700, px: 2 }
                  }}
                >
                  <Tab label="Overview" />
                  <Tab label="Description" />
                  <Tab label="Requirements" />
                  <Tab label="Applications" />
                </Tabs>
              </Box>

              {/* Content body */}
              <Box sx={{ p: 2.5 }}>
                {/* Description */}
                <Typography sx={{ fontWeight: 800, fontSize: 14, color: '#111827', mb: 1 }}>
                  Job Description
                </Typography>
                <Typography sx={{ fontSize: 12.5, color: '#4b5563', lineHeight: 1.6, mb: 1 }}>
                  {selectedJob.desc}
                </Typography>
                <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#6929e2', cursor: 'pointer', mb: 2.5 }}>
                  View full description →
                </Typography>

                {/* Requirements */}
                <Typography sx={{ fontWeight: 800, fontSize: 14, color: '#111827', mb: 1.5 }}>
                  Key Requirements
                </Typography>
                <Stack spacing={1} sx={{ mb: 3 }}>
                  {selectedJob.requirements.length === 0 ? (
                    <Typography sx={{ fontSize: 12, color: '#9ca3af' }}>
                      No requirements added yet. Click Edit Job to add requirements.
                    </Typography>
                  ) : (
                    selectedJob.requirements.map((req, i) => (
                      <Stack key={i} direction="row" spacing={1} alignItems="flex-start">
                        <CheckOutlined style={{ color: '#059669', fontSize: 13, marginTop: 3, flexShrink: 0 }} />
                        <Typography sx={{ fontSize: 12, color: '#374151' }}>
                          {req}
                        </Typography>
                      </Stack>
                    ))
                  )}
                </Stack>

                {/* Actions bottom */}
                <Stack direction="row" spacing={1.5}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<EditOutlined />}
                    onClick={() => handleOpenEdit(selectedJob)}
                    sx={{
                      bgcolor: '#6929e2',
                      fontWeight: 700,
                      fontSize: 12.5,
                      textTransform: 'none',
                      borderRadius: '8px',
                      '&:hover': { bgcolor: '#5b1fd9' }
                    }}
                  >
                    Edit Job
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<ShareAltOutlined />}
                    onClick={() => handleShareJob(selectedJob)}
                    sx={{
                      color: '#4b5563',
                      borderColor: '#d1d5db',
                      fontWeight: 700,
                      fontSize: 12.5,
                      textTransform: 'none',
                      borderRadius: '8px',
                      '&:hover': { borderColor: '#6929e2', color: '#6929e2' }
                    }}
                  >
                    Share Job
                  </Button>
                </Stack>
              </Box>
            </Card>
          </Grid>
        )}
      </Grid>

      {/* Row Menu (•••) */}
      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
        <MenuItem
          onClick={() => {
            const target = menuTargetJob;
            setMenuAnchor(null);
            if (target) {
              setSelectedJob(target);
              handleOpenEdit(target);
            }
          }}
          sx={{ fontSize: 13 }}
        >
          View & Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            const target = menuTargetJob;
            setMenuAnchor(null);
            if (target) {
              handleJobStatusUpdate(target, 'published', `${target.id} published!`, 'success');
            }
          }}
          sx={{ fontSize: 13, color: '#059669' }}
        >
          Publish
        </MenuItem>
        <MenuItem
          onClick={() => {
            const target = menuTargetJob;
            setMenuAnchor(null);
            if (target) {
              handleJobStatusUpdate(target, 'paused', `${target.id} paused.`, 'info');
            }
          }}
          sx={{ fontSize: 13, color: '#2563eb' }}
        >
          Pause
        </MenuItem>
        <MenuItem
          onClick={() => {
            const target = menuTargetJob;
            setMenuAnchor(null);
            if (target) {
              handleJobStatusUpdate(target, 'closed', `${target.id} closed.`, 'error');
            }
          }}
          sx={{ fontSize: 13, color: '#d97706' }}
        >
          Close Job
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={() => {
            const target = menuTargetJob;
            setMenuAnchor(null);
            if (target) setDeleteConfirmJob(target);
          }}
          sx={{ fontSize: 13, color: '#dc2626', fontWeight: 600 }}
        >
          Delete Job
        </MenuItem>
      </Menu>

      {/* Create Job Dialog */}
      <Dialog
        open={createDialogOpen}
        onClose={() => {
          setCreateDialogOpen(false);
          setCreateJobErrors({});
        }}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>Create New Job</DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Stack spacing={2.5}>
            <TextField
              fullWidth
              label="Job Title *"
              placeholder="e.g. Lead Frontend Architect"
              value={newTitle}
              onChange={(e) => {
                setNewTitle(e.target.value);
                if (createJobErrors.title) setCreateJobErrors({ ...createJobErrors, title: '' });
              }}
              error={Boolean(createJobErrors.title)}
              helperText={createJobErrors.title}
              required
            />
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth select label="Department" value={newDept} onChange={(e) => setNewDept(e.target.value)}>
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
                <TextField fullWidth select label="Location" value={newLocation} onChange={(e) => setNewLocation(e.target.value)}>
                  <MenuItem value="Bengaluru">Bengaluru</MenuItem>
                  <MenuItem value="Chennai">Chennai</MenuItem>
                  <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                  <MenuItem value="Pune">Pune</MenuItem>
                  <MenuItem value="Coimbatore">Coimbatore</MenuItem>
                  <MenuItem value="Remote">Remote</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <TextField fullWidth multiline rows={3} label="Job Description" placeholder="Enter key responsibilities and expectations..." value={newDesc} onChange={(e) => setNewDesc(e.target.value)} />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Key Requirements (one per line)"
              placeholder={'e.g.\n3+ years of React experience\nStrong proficiency in REST APIs\nGood communication skills'}
              value={newRequirements}
              onChange={(e) => setNewRequirements(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setCreateDialogOpen(false)} disabled={submitting} sx={{ textTransform: 'none' }}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCreateSubmit}
            disabled={submitting}
            startIcon={submitting ? <CircularProgress size={16} color="inherit" /> : null}
            sx={{ bgcolor: '#6929e2', textTransform: 'none', fontWeight: 700, borderRadius: '8px', px: 3, '&:hover': { bgcolor: '#5b1fd9' } }}
          >
            {submitting ? 'Publishing...' : 'Publish Job'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Job Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>
          Edit Job Requisition — {editJobForm?.id}
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          {editJobForm && (
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                label="Job Title *"
                value={editJobForm.title || ''}
                onChange={(e) => setEditJobForm({ ...editJobForm, title: e.target.value })}
                required
              />
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    select
                    label="Department"
                    value={editJobForm.dept || 'Engineering'}
                    onChange={(e) => setEditJobForm({ ...editJobForm, dept: e.target.value })}
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
                    label="Location"
                    value={editJobForm.location || 'Bengaluru'}
                    onChange={(e) => setEditJobForm({ ...editJobForm, location: e.target.value })}
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
                    label="Employment Type"
                    value={editJobForm.type || 'Full-time'}
                    onChange={(e) => setEditJobForm({ ...editJobForm, type: e.target.value })}
                  >
                    <MenuItem value="Full-time">Full-time</MenuItem>
                    <MenuItem value="Contract">Contract</MenuItem>
                    <MenuItem value="Part-time">Part-time</MenuItem>
                    <MenuItem value="Internship">Internship</MenuItem>
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    select
                    label="Status"
                    value={editJobForm.status || 'Published'}
                    onChange={(e) => setEditJobForm({ ...editJobForm, status: e.target.value })}
                  >
                    <MenuItem value="Published">Published</MenuItem>
                    <MenuItem value="Draft">Draft</MenuItem>
                    <MenuItem value="Paused">Paused</MenuItem>
                    <MenuItem value="Closed">Closed</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Job Description"
                value={editJobForm.desc || ''}
                onChange={(e) => setEditJobForm({ ...editJobForm, desc: e.target.value })}
              />
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Key Requirements (one per line)"
                placeholder="Enter each requirement on a new line..."
                value={editJobForm.requirementsText ?? (editJobForm.requirements || []).join('\n')}
                onChange={(e) => setEditJobForm({ ...editJobForm, requirementsText: e.target.value })}
              />
            </Stack>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setEditDialogOpen(false)} disabled={savingEdit} sx={{ textTransform: 'none', color: '#6b7280' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveEdit}
            disabled={savingEdit}
            startIcon={savingEdit ? <CircularProgress size={16} color="inherit" /> : null}
            sx={{ bgcolor: '#6929e2', textTransform: 'none', fontWeight: 700, borderRadius: '8px', px: 3, '&:hover': { bgcolor: '#5b1fd9' } }}
          >
            {savingEdit ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Job Confirmation Dialog */}
      <Dialog
        open={Boolean(deleteConfirmJob)}
        onClose={() => !deleting && setDeleteConfirmJob(null)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: 17, color: '#111827' }}>
          Delete Job Posting?
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <Typography sx={{ fontSize: 13.5, color: '#4b5563' }}>
            Are you sure you want to delete <strong>{deleteConfirmJob?.id}</strong> ({deleteConfirmJob?.title})? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteConfirmJob(null)} disabled={deleting} sx={{ textTransform: 'none', color: '#6b7280' }}>
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

      {/* Snackbar feedback */}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ borderRadius: '10px', fontWeight: 600 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

