import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import ArrowUpOutlined from '@ant-design/icons/ArrowUpOutlined';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import EnvironmentOutlined from '@ant-design/icons/EnvironmentOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import FilePdfOutlined from '@ant-design/icons/FilePdfOutlined';
import FilterOutlined from '@ant-design/icons/FilterOutlined';
import LinkedinFilled from '@ant-design/icons/LinkedinFilled';
import MailOutlined from '@ant-design/icons/MailOutlined';
import MoreOutlined from '@ant-design/icons/MoreOutlined';
import PhoneOutlined from '@ant-design/icons/PhoneOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import ReadOutlined from '@ant-design/icons/ReadOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import TrophyOutlined from '@ant-design/icons/TrophyOutlined';
import UploadOutlined from '@ant-design/icons/UploadOutlined';
import UserAddOutlined from '@ant-design/icons/UserAddOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';

import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import avatar5 from 'assets/images/users/avatar-5.png';
import { getInternshipApplications } from 'api/adminInternships';
import { createApplication, scheduleInterview, updateApplicationStage, uploadApplicationResume } from 'api/adminApplications';
import { validateEmail } from 'utils/emailValidation';
import FullScreenResumeDialog from 'components/FullScreenResumeDialog';

const AVATARS = [avatar1, avatar2, avatar3, avatar4, avatar5];

const STAGE_LABELS = {
  applied: 'Applied',
  screening: 'Screening',
  shortlisted: 'Shortlisted',
  interview: 'Interview',
  selected: 'Selected',
  offered: 'Selected',
  hired: 'Selected',
  rejected: 'Rejected'
};

function mapBackendInternshipApp(app) {
  const cand = app?.candidate || {};
  const skillsList = typeof cand.skills === 'string' && cand.skills.trim()
    ? cand.skills.split(',').map((s) => s.trim()).filter(Boolean)
    : [];
  const rawStage = String(app?.stage || 'applied').toLowerCase();
  const stage = STAGE_LABELS[rawStage] || 'Applied';
  const appliedDate = app?.applied_at || app?.created_at;
  const appliedOn = appliedDate
    ? new Date(appliedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Recently';

  return {
    dbId: app?.id,
    candidateId: cand?.id,
    name: cand?.name || 'Candidate',
    email: cand?.email || '',
    phone: cand?.phone || '—',
    avatar: cand?.photo_url || AVATARS[(Number(cand?.id || app?.id) || 0) % AVATARS.length],
    role: cand?.current_role || app?.job?.title || 'Intern Applicant',
    exp: cand?.experience || 'Fresher',
    skills: skillsList.slice(0, 2),
    allSkills: skillsList,
    extraSkillsCount: Math.max(0, skillsList.length - 2),
    location: cand?.location || '—',
    source: cand?.source || 'Direct Application',
    stage,
    rawStage,
    matchScore: Number(app?.match_score || 0),
    appliedOn,
    createdAt: appliedDate || new Date().toISOString(),
    about: cand?.about || '—',
    availability: cand?.notice_period || cand?.availability || 'Immediate',
    salary: cand?.salary || '—',
    linkedinUrl: cand?.linkedin_url || '',
    education: {
      degree: cand?.education_degree || '—',
      school: cand?.education_school || '—',
      period: cand?.education_period || ''
    },
    experience: {
      title: cand?.current_role || 'Intern Applicant',
      company: cand?.company || '—',
      period: cand?.experience || 'Fresher'
    },
    resumeName: cand?.resume_name || '',
    resumeSize: cand?.resume_size || '',
    resumeUrl: cand?.resume_url || ''
  };
}

function getStageChip(stage) {
  const palette = {
    Applied: { bg: '#EFF6FF', color: '#2563EB' },
    Screening: { bg: '#F5F3FF', color: '#7C3AED' },
    Shortlisted: { bg: '#ECFDF5', color: '#059669' },
    Interview: { bg: '#FFFBEB', color: '#D97706' },
    Selected: { bg: '#ECFDF5', color: '#10B981' },
    Rejected: { bg: '#FEF2F2', color: '#DC2626' }
  }[stage] || { bg: '#F1F5F9', color: '#475569' };

  return (
    <Chip
      label={stage}
      size="small"
      sx={{
        bgcolor: palette.bg,
        color: palette.color,
        fontWeight: 700,
        fontSize: 11.5,
        height: 24,
        borderRadius: '6px'
      }}
    />
  );
}

export default function AdminInternshipApplications() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [internship, setInternship] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('ALL');
  const [stageFilter, setStageFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('recent');
  const [sortAnchor, setSortAnchor] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedCand, setSelectedCand] = useState(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [menuTarget, setMenuTarget] = useState(null);
  const [resumeViewerCandidate, setResumeViewerCandidate] = useState(null);
  const [interviewOpen, setInterviewOpen] = useState(false);
  const [interviewTarget, setInterviewTarget] = useState(null);
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewNotes, setInterviewNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newApplicant, setNewApplicant] = useState({
    name: '',
    email: '',
    phone: '',
    location: 'Bengaluru',
    experience: 'Fresher',
    skills: '',
    linkedin: '',
    about: ''
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [addErrors, setAddErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await getInternshipApplications(id);
      const data = res?.data || {};
      setInternship(data.internship || null);
      const mapped = (data.applications || []).map(mapBackendInternshipApp);
      setApplicants(mapped);
      setSelectedCand((prev) => (prev ? mapped.find((m) => m.dbId === prev.dbId) || null : null));
    } catch (err) {
      setSnackbar({ open: true, message: err.message || 'Failed to load internship applicants', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) loadData();
  }, [id]);

  const totalCount = applicants.length;
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const newThisWeekCount = applicants.filter((a) => !a.createdAt || new Date(a.createdAt).getTime() >= sevenDaysAgo).length;
  const appliedCount = applicants.filter((a) => a.stage === 'Applied' || a.stage === 'Screening').length;
  const shortlistedCount = applicants.filter((a) => a.stage === 'Shortlisted').length;
  const interviewCount = applicants.filter((a) => a.stage === 'Interview').length;
  const selectedCount = applicants.filter((a) => a.stage === 'Selected').length;
  const rejectedCount = applicants.filter((a) => a.stage === 'Rejected').length;

  const filteredApplicants = useMemo(() => {
    const filtered = applicants.filter((a) => {
      if (activeTab === 'Applied' && a.stage !== 'Applied' && a.stage !== 'Screening') return false;
      if (activeTab === 'Shortlisted' && a.stage !== 'Shortlisted') return false;
      if (activeTab === 'Interview' && a.stage !== 'Interview') return false;
      if (activeTab === 'Selected' && a.stage !== 'Selected') return false;

      if (locationFilter !== 'ALL' && a.location !== locationFilter) return false;
      if (stageFilter !== 'ALL' && a.stage !== stageFilter) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          a.name.toLowerCase().includes(q) ||
          a.email.toLowerCase().includes(q) ||
          (a.phone || '').toLowerCase().includes(q) ||
          a.role.toLowerCase().includes(q) ||
          a.location.toLowerCase().includes(q) ||
          a.allSkills.some((s) => s.toLowerCase().includes(q));
        if (!match) return false;
      }
      return true;
    });

    const sorted = [...filtered];
    if (sortBy === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'score') {
      sorted.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    } else {
      sorted.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }
    return sorted;
  }, [applicants, activeTab, locationFilter, stageFilter, searchQuery, sortBy]);

  const paginatedApplicants = filteredApplicants.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleStageUpdate = async (app, backendStage, label) => {
    try {
      await updateApplicationStage(app.dbId, backendStage);
      await loadData();
      setSnackbar({ open: true, message: `${app.name} moved to ${label}!`, severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: err.message || 'Failed to update stage', severity: 'error' });
    }
  };

  const handleScheduleInterview = async () => {
    if (!interviewTarget || !interviewDate) {
      setSnackbar({ open: true, message: 'Please select interview date & time', severity: 'warning' });
      return;
    }
    try {
      setSubmitting(true);
      await scheduleInterview({
        applicationId: interviewTarget.dbId,
        scheduledAt: new Date(interviewDate).toISOString(),
        interviewer: 'Admin',
        notes: interviewNotes.trim()
      });
      await loadData();
      setInterviewOpen(false);
      setInterviewDate('');
      setInterviewNotes('');
      setSnackbar({ open: true, message: `Interview scheduled for ${interviewTarget.name}!`, severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: err.message || 'Failed to schedule interview', severity: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const resetAddApplicantForm = () => {
    setNewApplicant({
      name: '',
      email: '',
      phone: '',
      location: 'Bengaluru',
      experience: 'Fresher',
      skills: '',
      linkedin: '',
      about: ''
    });
    setResumeFile(null);
    setAddErrors({});
  };

  const handleAddApplicant = async () => {
    const errors = {};
    if (!newApplicant.name.trim()) {
      errors.name = 'Full Name is required';
    } else if (newApplicant.name.trim().length < 2) {
      errors.name = 'Full Name must be at least 2 characters';
    }
    const emailErr = validateEmail(newApplicant.email);
    if (emailErr) errors.email = emailErr;
    if (!newApplicant.phone.trim()) errors.phone = 'Phone Number is required';
    if (!newApplicant.location.trim()) errors.location = 'Location is required';
    if (!newApplicant.experience.trim()) errors.experience = 'Experience is required';
    if (!newApplicant.skills.trim()) errors.skills = 'Skills are required';
    if (!resumeFile) errors.resume = 'Resume file (PDF/DOC/DOCX) is required';

    if (Object.keys(errors).length > 0) {
      setAddErrors(errors);
      setSnackbar({ open: true, message: 'Please fill all required fields and upload a resume', severity: 'error' });
      return;
    }

    try {
      setSubmitting(true);
      const res = await createApplication({
        candidateName: newApplicant.name.trim(),
        candidateEmail: newApplicant.email.trim(),
        phone: newApplicant.phone.trim(),
        location: newApplicant.location.trim(),
        experience: newApplicant.experience.trim(),
        skills: newApplicant.skills.trim(),
        jobId: Number(id),
        jobTitle: internship?.title || 'Internship',
        stage: 'applied'
      });
      const createdId = res?.data?.id || res?.id;
      if (createdId && resumeFile) {
        await uploadApplicationResume(createdId, resumeFile);
      }
      await loadData();
      setAddDialogOpen(false);
      resetAddApplicantForm();
      setSnackbar({ open: true, message: `${newApplicant.name.trim()} added as applicant!`, severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: err.message || 'Failed to add applicant', severity: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100%', pb: 5 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowLeftOutlined />}
          onClick={() => navigate('/admin/internships')}
          sx={{ textTransform: 'none', color: '#530EF0', fontWeight: 600, mb: 1, pl: 0 }}
        >
          Back to Internship Program
        </Button>

        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2}>
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
              <Typography variant="h1" sx={{ fontWeight: 700, fontSize: { xs: 22, sm: 24 }, color: '#111827' }}>
                {internship?.title || 'Internship Applicants'}
              </Typography>
              {internship?.status && (
                <Chip label={internship.status} size="small" sx={{ bgcolor: 'rgba(83,14,240,0.08)', color: '#530EF0', fontWeight: 700 }} />
              )}
            </Stack>
            {internship && (
              <Typography sx={{ color: '#6B7280', fontSize: 13.5, mt: 0.5 }}>
                {internship.company} • {internship.location} ({internship.work_mode}) • {internship.duration} • {internship.stipend}
              </Typography>
            )}
          </Box>
          <Button
            variant="contained"
            startIcon={<PlusOutlined />}
            onClick={() => setAddDialogOpen(true)}
            sx={{
              bgcolor: '#530EF0',
              color: '#FFF',
              fontWeight: 600,
              borderRadius: '8px',
              height: 40,
              px: 2.2,
              textTransform: 'none',
              whiteSpace: 'nowrap',
              '&:hover': { bgcolor: '#430bc2' }
            }}
          >
            Add Applicant
          </Button>
        </Stack>
      </Box>

      {/* 6 Top KPI Cards (matching Candidates layout) */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { title: 'Total Candidates', count: totalCount, change: '+12%', subtitle: 'Applied to this internship', icon: <TeamOutlined />, color: '#530EF0', bg: 'rgba(83, 14, 240, 0.08)' },
          { title: 'New This Week', count: newThisWeekCount, change: '+28%', subtitle: 'Recently applied', icon: <UserAddOutlined />, color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)' },
          { title: 'Shortlisted', count: shortlistedCount, change: '+18%', subtitle: 'Moved forward', icon: <CheckCircleOutlined />, color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
          { title: 'In Interview', count: interviewCount, change: '+9%', subtitle: 'Interview stage', icon: <ClockCircleOutlined />, color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
          { title: 'Selected', count: selectedCount, change: '+25%', subtitle: 'Offers & selected', icon: <TrophyOutlined />, color: '#7C3AED', bg: 'rgba(124, 58, 237, 0.1)' },
          { title: 'Rejected', count: rejectedCount, change: '—', subtitle: 'Not moving forward', icon: <UserOutlined />, color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' }
        ].map((kpi, idx) => (
          <Grid size={{ xs: 6, sm: 4, md: 2 }} key={idx}>
            <Card sx={{ p: 2, borderRadius: '16px', border: '1px solid #F3F4F6', boxShadow: '0 1px 3px rgba(0,0,0,0.03)', bgcolor: '#FFF', height: '100%' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
                <Box sx={{ width: 36, height: 36, borderRadius: '10px', bgcolor: kpi.bg, color: kpi.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                  {kpi.icon}
                </Box>
                <Chip
                  icon={kpi.change.startsWith('+') ? <ArrowUpOutlined style={{ fontSize: 10, color: '#10B981' }} /> : undefined}
                  label={kpi.change}
                  size="small"
                  sx={{ bgcolor: kpi.change.startsWith('+') ? 'rgba(16, 185, 129, 0.08)' : '#F3F4F6', color: kpi.change.startsWith('+') ? '#10B981' : '#6B7280', fontWeight: 600, fontSize: 11, height: 22, borderRadius: '6px' }}
                />
              </Stack>
              <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12.5, fontWeight: 500, display: 'block' }}>
                {kpi.title}
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, color: '#111827', fontSize: 26, my: 0.25 }}>
                {kpi.count}
              </Typography>
              <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11.5 }}>
                {kpi.subtitle}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Main Content: Table + Optional Side Profile */}
      <Grid container spacing={2.5} alignItems="flex-start">
        <Grid size={{ xs: 12, lg: selectedCand ? 7.8 : 12 }}>
          <Card sx={{ borderRadius: '16px', border: '1px solid #F3F4F6', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', bgcolor: '#FFF', overflow: 'hidden' }}>
            {/* Tabs + Sort */}
            <Box sx={{ px: 2.5, pt: 1.5, borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <Tabs
                value={activeTab}
                onChange={(e, v) => {
                  setActiveTab(v);
                  setPage(1);
                }}
                sx={{
                  '& .MuiTabs-indicator': { bgcolor: '#530EF0', height: 3, borderRadius: '3px 3px 0 0' },
                  '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, fontSize: 13.5, color: '#6B7280', minHeight: 48, '&.Mui-selected': { color: '#530EF0' } }
                }}
              >
                <Tab value="ALL" label={`All Candidates (${totalCount})`} />
                <Tab value="Applied" label={`Applied (${appliedCount})`} />
                <Tab value="Shortlisted" label={`Shortlisted (${shortlistedCount})`} />
                <Tab value="Interview" label={`Interview (${interviewCount})`} />
                <Tab value="Selected" label={`Selected (${selectedCount})`} />
              </Tabs>

              <Button size="small" onClick={(e) => setSortAnchor(e.currentTarget)} sx={{ color: '#6B7280', fontWeight: 500, my: 1, textTransform: 'none', fontSize: 12.5 }}>
                Sort by: <strong style={{ marginLeft: 4, color: '#111827' }}>{sortBy === 'name' ? 'Name (A-Z)' : sortBy === 'score' ? 'Match Score' : 'Recently Added'} ⌵</strong>
              </Button>
              <Menu anchorEl={sortAnchor} open={Boolean(sortAnchor)} onClose={() => setSortAnchor(null)}>
                <MenuItem selected={sortBy === 'recent'} onClick={() => { setSortBy('recent'); setSortAnchor(null); }}>Recently Added</MenuItem>
                <MenuItem selected={sortBy === 'score'} onClick={() => { setSortBy('score'); setSortAnchor(null); }}>Match Score</MenuItem>
                <MenuItem selected={sortBy === 'name'} onClick={() => { setSortBy('name'); setSortAnchor(null); }}>Name (A-Z)</MenuItem>
              </Menu>
            </Box>

            {/* Filter Row */}
            <Box sx={{ p: 2, bgcolor: '#FAFAFB', borderBottom: '1px solid #F3F4F6' }}>
              <Grid container spacing={1.5} alignItems="center">
                <Grid size={{ xs: 12, sm: 5 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Search by name, email, phone, skills or keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchOutlined style={{ color: '#9CA3AF' }} />
                        </InputAdornment>
                      )
                    }}
                    sx={{ bgcolor: '#FFF', '& .MuiOutlinedInput-root': { borderRadius: '8px', '& fieldset': { borderColor: '#E5E7EB' } } }}
                  />
                </Grid>
                <Grid size={{ xs: 6, sm: 2.5 }}>
                  <Select fullWidth size="small" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} sx={{ bgcolor: '#FFF', borderRadius: '8px', fontSize: 13 }}>
                    <MenuItem value="ALL">All Locations</MenuItem>
                    {Array.from(new Set(applicants.map((a) => a.location).filter((l) => l && l !== '—'))).map((loc) => (
                      <MenuItem key={loc} value={loc}>{loc}</MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid size={{ xs: 6, sm: 2.5 }}>
                  <Select fullWidth size="small" value={stageFilter} onChange={(e) => setStageFilter(e.target.value)} sx={{ bgcolor: '#FFF', borderRadius: '8px', fontSize: 13 }}>
                    <MenuItem value="ALL">All Statuses</MenuItem>
                    <MenuItem value="Applied">Applied</MenuItem>
                    <MenuItem value="Shortlisted">Shortlisted</MenuItem>
                    <MenuItem value="Interview">Interview</MenuItem>
                    <MenuItem value="Selected">Selected</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                  </Select>
                </Grid>
                <Grid size={{ xs: 12, sm: 2 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<FilterOutlined />}
                    onClick={() => {
                      setSearchQuery('');
                      setLocationFilter('ALL');
                      setStageFilter('ALL');
                      setActiveTab('ALL');
                    }}
                    sx={{ textTransform: 'none', borderColor: '#E5E7EB', color: '#530EF0', fontWeight: 600, borderRadius: '8px', height: 40, bgcolor: '#FFF' }}
                  >
                    Reset Filters
                  </Button>
                </Grid>
              </Grid>
            </Box>

            {/* Table */}
            <TableContainer sx={{ overflowX: 'auto' }}>
              <Table size="medium">
                <TableHead sx={{ bgcolor: '#F9FAFB' }}>
                  <TableRow>
                    <TableCell padding="checkbox" sx={{ pl: 2 }}>
                      <Checkbox
                        size="small"
                        checked={selectedIds.length === filteredApplicants.length && filteredApplicants.length > 0}
                        indeterminate={selectedIds.length > 0 && selectedIds.length < filteredApplicants.length}
                        onChange={(e) => setSelectedIds(e.target.checked ? filteredApplicants.map((a) => a.dbId) : [])}
                      />
                    </TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>Candidate</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>Current Role</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>Experience</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>Skills</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>Location</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>Source</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>Status</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>Applied On</TableCell>
                    <TableCell align="right" sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', pr: 2 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={10} align="center" sx={{ py: 5 }}>
                        <CircularProgress size={28} sx={{ color: '#530EF0' }} />
                      </TableCell>
                    </TableRow>
                  ) : paginatedApplicants.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10} align="center" sx={{ py: 6, color: '#6B7280' }}>
                        No candidates have applied to this internship yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedApplicants.map((cand) => {
                      const isSelected = selectedCand?.dbId === cand.dbId;
                      return (
                        <TableRow
                          key={cand.dbId}
                          hover
                          onClick={() => setSelectedCand(cand)}
                          sx={{ cursor: 'pointer', bgcolor: isSelected ? 'rgba(83, 14, 240, 0.04)' : 'inherit' }}
                        >
                          <TableCell padding="checkbox" sx={{ pl: 2 }} onClick={(e) => e.stopPropagation()}>
                            <Checkbox
                              size="small"
                              checked={selectedIds.includes(cand.dbId)}
                              onChange={() =>
                                setSelectedIds((prev) =>
                                  prev.includes(cand.dbId) ? prev.filter((x) => x !== cand.dbId) : [...prev, cand.dbId]
                                )
                              }
                            />
                          </TableCell>
                          <TableCell sx={{ whiteSpace: 'nowrap' }}>
                            <Stack direction="row" spacing={1.5} alignItems="center">
                              <Avatar src={cand.avatar} alt={cand.name} sx={{ width: 36, height: 36 }} />
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: 13.5 }}>{cand.name}</Typography>
                                <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 12 }}>{cand.email}</Typography>
                              </Box>
                            </Stack>
                          </TableCell>
                          <TableCell sx={{ whiteSpace: 'nowrap', fontSize: 13, color: '#374151' }}>{cand.role}</TableCell>
                          <TableCell sx={{ whiteSpace: 'nowrap', fontSize: 13, color: '#4B5563' }}>{cand.exp}</TableCell>
                          <TableCell sx={{ whiteSpace: 'nowrap' }}>
                            <Stack direction="row" spacing={0.5} alignItems="center">
                              {cand.skills.map((sk) => (
                                <Chip key={sk} label={sk} size="small" sx={{ fontSize: 11, height: 22, bgcolor: '#F3F4F6', color: '#374151', borderRadius: '4px' }} />
                              ))}
                              {cand.extraSkillsCount > 0 && (
                                <Chip label={`+${cand.extraSkillsCount}`} size="small" sx={{ fontSize: 11, height: 22, bgcolor: '#E5E7EB', color: '#4B5563', borderRadius: '4px' }} />
                              )}
                            </Stack>
                          </TableCell>
                          <TableCell sx={{ whiteSpace: 'nowrap', fontSize: 13, color: '#4B5563' }}>{cand.location}</TableCell>
                          <TableCell sx={{ whiteSpace: 'nowrap', fontSize: 13, color: '#4B5563' }}>{cand.source}</TableCell>
                          <TableCell sx={{ whiteSpace: 'nowrap' }}>{getStageChip(cand.stage)}</TableCell>
                          <TableCell sx={{ whiteSpace: 'nowrap', fontSize: 12.5, color: '#6B7280' }}>{cand.appliedOn}</TableCell>
                          <TableCell align="right" sx={{ pr: 2 }} onClick={(e) => e.stopPropagation()}>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                setMenuAnchor(e.currentTarget);
                                setMenuTarget(cand);
                              }}
                            >
                              <MoreOutlined style={{ color: '#9CA3AF' }} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <Box sx={{ p: 2, borderTop: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <Typography variant="caption" sx={{ color: '#6B7280' }}>
                Showing {filteredApplicants.length === 0 ? 0 : (page - 1) * rowsPerPage + 1}-{Math.min(page * rowsPerPage, filteredApplicants.length)} of {filteredApplicants.length} candidates
              </Typography>
              <Pagination
                count={Math.max(1, Math.ceil(filteredApplicants.length / rowsPerPage))}
                page={page}
                onChange={(e, val) => setPage(val)}
                size="small"
                sx={{ '& .Mui-selected': { bgcolor: '#530EF0 !important', color: '#FFF' } }}
              />
            </Box>
          </Card>
        </Grid>

        {/* Side Profile Panel */}
        {selectedCand && (
          <Grid size={{ xs: 12, lg: 4.2 }}>
            <Card sx={{ borderRadius: '16px', border: '1px solid #F3F4F6', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', bgcolor: '#FFF', p: 2.5, position: 'sticky', top: 20 }}>
              <IconButton size="small" onClick={() => setSelectedCand(null)} sx={{ position: 'absolute', top: 16, right: 16, color: '#9CA3AF' }}>
                <CloseOutlined style={{ fontSize: 13 }} />
              </IconButton>

              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src={selectedCand.avatar} alt={selectedCand.name} sx={{ width: 64, height: 64 }} />
                <Box sx={{ pr: 3 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827', fontSize: '1.1rem' }}>
                      {selectedCand.name}
                    </Typography>
                    {getStageChip(selectedCand.stage)}
                  </Stack>
                  <Typography variant="body2" sx={{ color: '#4B5563', fontWeight: 500 }}>
                    {selectedCand.role}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <EnvironmentOutlined style={{ fontSize: 11 }} /> {selectedCand.location} • {selectedCand.exp}
                  </Typography>
                </Box>
              </Stack>

              <Stack spacing={0.6} sx={{ mt: 2, pt: 1.5, borderTop: '1px solid #F3F4F6' }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <MailOutlined style={{ color: '#9CA3AF', fontSize: 13 }} />
                  <Typography variant="caption" sx={{ color: '#530EF0', fontWeight: 500 }}>{selectedCand.email}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <PhoneOutlined style={{ color: '#9CA3AF', fontSize: 13 }} />
                  <Typography variant="caption" sx={{ color: '#4B5563' }}>{selectedCand.phone}</Typography>
                </Stack>
                {selectedCand.linkedinUrl && (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <LinkedinFilled style={{ color: '#0A66C2', fontSize: 13 }} />
                    <Typography variant="caption" sx={{ color: '#530EF0', fontWeight: 500 }}>{selectedCand.linkedinUrl}</Typography>
                  </Stack>
                )}
              </Stack>

              <Stack direction="row" spacing={1} sx={{ mt: 2, mb: 2.5 }}>
                <Button fullWidth variant="contained" size="small" onClick={() => handleStageUpdate(selectedCand, 'shortlisted', 'Shortlisted')} sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 600, borderRadius: '8px' }}>
                  Shortlist
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  startIcon={<CalendarOutlined />}
                  onClick={() => {
                    setInterviewTarget(selectedCand);
                    setInterviewOpen(true);
                  }}
                  sx={{ textTransform: 'none', fontWeight: 600, borderRadius: '8px', borderColor: '#E5E7EB', color: '#374151' }}
                >
                  Interview
                </Button>
              </Stack>

              <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: 13, mb: 0.5 }}>About</Typography>
              <Typography variant="body2" sx={{ color: '#4B5563', fontSize: 12.5, mb: 2 }}>{selectedCand.about}</Typography>

              <Grid container spacing={1} sx={{ mb: 2 }}>
                <Grid size={{ xs: 4 }}>
                  <Box sx={{ p: 1, bgcolor: '#F9FAFB', borderRadius: '8px', textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11, display: 'block' }}>Availability</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 12 }}>{selectedCand.availability}</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 4 }}>
                  <Box sx={{ p: 1, bgcolor: '#F9FAFB', borderRadius: '8px', textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11, display: 'block' }}>Expected</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 12 }}>{selectedCand.salary}</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 4 }}>
                  <Box sx={{ p: 1, bgcolor: '#F9FAFB', borderRadius: '8px', textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11, display: 'block' }}>Match Score</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 12 }}>{selectedCand.matchScore > 0 ? `${selectedCand.matchScore}%` : '—'}</Typography>
                  </Box>
                </Grid>
              </Grid>

              {selectedCand.allSkills.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: 13, mb: 0.8 }}>Skills</Typography>
                  <Stack direction="row" spacing={0.6} flexWrap="wrap" useFlexGap>
                    {selectedCand.allSkills.map((sk) => (
                      <Chip key={sk} label={sk} size="small" sx={{ bgcolor: 'rgba(83,14,240,0.06)', color: '#530EF0', fontWeight: 500, fontSize: 11.5 }} />
                    ))}
                  </Stack>
                </Box>
              )}

              <Box sx={{ p: 1.5, borderRadius: '10px', bgcolor: '#F9FAFB', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ cursor: 'pointer' }} onClick={() => setResumeViewerCandidate(selectedCand)}>
                  <FilePdfOutlined style={{ fontSize: 22, color: '#EF4444' }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 12.5 }}>
                      {selectedCand.resumeName || 'Candidate Resume'}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11 }}>
                      {selectedCand.resumeSize || 'Click to view'}
                    </Typography>
                  </Box>
                </Stack>
                <Button size="small" startIcon={<EyeOutlined />} onClick={() => setResumeViewerCandidate(selectedCand)} sx={{ textTransform: 'none', color: '#530EF0', fontWeight: 600 }}>
                  View
                </Button>
              </Box>
            </Card>
          </Grid>
        )}
      </Grid>

      {/* Row Actions Menu */}
      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
        <MenuItem onClick={() => { setSelectedCand(menuTarget); setMenuAnchor(null); }}>View Profile</MenuItem>
        <MenuItem onClick={() => { setResumeViewerCandidate(menuTarget); setMenuAnchor(null); }}>View Resume</MenuItem>
        <MenuItem onClick={() => { if (menuTarget) handleStageUpdate(menuTarget, 'shortlisted', 'Shortlisted'); setMenuAnchor(null); }}>Shortlist Candidate</MenuItem>
        <MenuItem onClick={() => { setInterviewTarget(menuTarget); setInterviewOpen(true); setMenuAnchor(null); }}>Schedule Interview</MenuItem>
        <MenuItem onClick={() => { if (menuTarget) handleStageUpdate(menuTarget, 'selected', 'Selected'); setMenuAnchor(null); }}>Mark Selected</MenuItem>
        <MenuItem onClick={() => { if (menuTarget) handleStageUpdate(menuTarget, 'rejected', 'Rejected'); setMenuAnchor(null); }} sx={{ color: '#EF4444' }}>Reject Candidate</MenuItem>
      </Menu>

      {/* Schedule Interview Dialog */}
      <Dialog open={interviewOpen} onClose={() => setInterviewOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Schedule Interview — {interviewTarget?.name}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              fullWidth
              type="datetime-local"
              label="Interview Date & Time"
              InputLabelProps={{ shrink: true }}
              value={interviewDate}
              onChange={(e) => setInterviewDate(e.target.value)}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Notes"
              value={interviewNotes}
              onChange={(e) => setInterviewNotes(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInterviewOpen(false)} sx={{ textTransform: 'none' }}>Cancel</Button>
          <Button variant="contained" disabled={submitting} onClick={handleScheduleInterview} sx={{ bgcolor: '#530EF0', textTransform: 'none' }}>
            {submitting ? 'Scheduling...' : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Applicant Dialog */}
      <Dialog
        open={addDialogOpen}
        onClose={() => {
          setAddDialogOpen(false);
          resetAddApplicantForm();
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700 }}>+ Add Applicant to {internship?.title || 'Internship'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              fullWidth
              size="small"
              label="Full Name"
              required
              value={newApplicant.name}
              onChange={(e) => {
                setNewApplicant({ ...newApplicant, name: e.target.value });
                if (addErrors.name) setAddErrors({ ...addErrors, name: '' });
              }}
              error={Boolean(addErrors.name)}
              helperText={addErrors.name}
            />
            <TextField
              fullWidth
              size="small"
              type="email"
              label="Email Address"
              required
              value={newApplicant.email}
              onChange={(e) => {
                setNewApplicant({ ...newApplicant, email: e.target.value });
                if (addErrors.email) setAddErrors({ ...addErrors, email: '' });
              }}
              error={Boolean(addErrors.email)}
              helperText={addErrors.email}
            />
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Phone Number"
                  required
                  value={newApplicant.phone}
                  onChange={(e) => {
                    setNewApplicant({ ...newApplicant, phone: e.target.value });
                    if (addErrors.phone) setAddErrors({ ...addErrors, phone: '' });
                  }}
                  error={Boolean(addErrors.phone)}
                  helperText={addErrors.phone}
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Location"
                  required
                  value={newApplicant.location}
                  onChange={(e) => {
                    setNewApplicant({ ...newApplicant, location: e.target.value });
                    if (addErrors.location) setAddErrors({ ...addErrors, location: '' });
                  }}
                  error={Boolean(addErrors.location)}
                  helperText={addErrors.location}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Experience"
                  required
                  value={newApplicant.experience}
                  onChange={(e) => {
                    setNewApplicant({ ...newApplicant, experience: e.target.value });
                    if (addErrors.experience) setAddErrors({ ...addErrors, experience: '' });
                  }}
                  error={Boolean(addErrors.experience)}
                  helperText={addErrors.experience}
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Skills (comma separated)"
                  required
                  placeholder="React, JavaScript, HTML"
                  value={newApplicant.skills}
                  onChange={(e) => {
                    setNewApplicant({ ...newApplicant, skills: e.target.value });
                    if (addErrors.skills) setAddErrors({ ...addErrors, skills: '' });
                  }}
                  error={Boolean(addErrors.skills)}
                  helperText={addErrors.skills}
                />
              </Grid>
            </Grid>
            <Box
              sx={{
                p: 2,
                border: `1.5px dashed ${addErrors.resume ? '#EF4444' : '#D1D5DB'}`,
                borderRadius: '10px',
                bgcolor: '#F9FAFB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2
              }}
            >
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827' }}>
                  Resume (PDF / DOC / DOCX) *
                </Typography>
                <Typography variant="caption" sx={{ color: addErrors.resume ? '#EF4444' : '#6B7280' }}>
                  {resumeFile ? `${resumeFile.name} (${(resumeFile.size / 1024).toFixed(0)} KB)` : addErrors.resume || 'Upload applicant resume'}
                </Typography>
              </Box>
              <Button component="label" variant="outlined" size="small" startIcon={<UploadOutlined />} sx={{ textTransform: 'none', flexShrink: 0 }}>
                {resumeFile ? 'Change File' : 'Upload Resume'}
                <input
                  type="file"
                  hidden
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setResumeFile(file);
                      if (addErrors.resume) setAddErrors({ ...addErrors, resume: '' });
                    }
                  }}
                />
              </Button>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={() => {
              setAddDialogOpen(false);
              resetAddApplicantForm();
            }}
            sx={{ textTransform: 'none', color: '#6B7280' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={submitting}
            onClick={handleAddApplicant}
            sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 600, '&:hover': { bgcolor: '#430bc2' } }}
          >
            {submitting ? 'Adding...' : 'Add Applicant'}
          </Button>
        </DialogActions>
      </Dialog>

      <FullScreenResumeDialog
        open={Boolean(resumeViewerCandidate)}
        onClose={() => setResumeViewerCandidate(null)}
        candidate={resumeViewerCandidate}
      />

      <Snackbar open={snackbar.open} autoHideDuration={3500} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
