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
import Popover from '@mui/material/Popover';
import FullScreenResumeDialog from 'components/FullScreenResumeDialog';

// project imports
import {
  getApplications,
  createApplication,
  updateApplicationStage,
  uploadApplicationResume,
  deleteApplication,
  scheduleInterview
} from 'api/adminApplications';
import { getJobs } from 'api/adminJobs';
import { updateCandidateStatus } from 'api/adminCandidates';
import { validateEmail } from 'utils/emailValidation';

// icons
import SolutionOutlined from '@ant-design/icons/SolutionOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import UploadOutlined from '@ant-design/icons/UploadOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import FilterOutlined from '@ant-design/icons/FilterOutlined';
import MoreOutlined from '@ant-design/icons/MoreOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import DownloadOutlined from '@ant-design/icons/DownloadOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import MailOutlined from '@ant-design/icons/MailOutlined';
import PhoneOutlined from '@ant-design/icons/PhoneOutlined';
import LinkedinFilled from '@ant-design/icons/LinkedinFilled';
import FilePdfOutlined from '@ant-design/icons/FilePdfOutlined';
import PlayCircleOutlined from '@ant-design/icons/PlayCircleOutlined';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import FullscreenOutlined from '@ant-design/icons/FullscreenOutlined';

// avatar assets
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import avatar5 from 'assets/images/users/avatar-5.png';

// initial mock applications
const initialApplications = [
  {
    id: 'APP-101',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43210',
    avatar: avatar1,
    role: 'Software Engineer',
    jobCode: 'JOB-0012',
    resumeName: 'Resume.pdf',
    resumeSize: '2.4 MB',
    matchScore: 92,
    stage: 'Shortlisted',
    appliedOn: 'Oct 21, 2025',
    location: 'Bengaluru, Karnataka',
    exp: '2+ years',
    matchedSkills: ['React.js', 'Node.js', 'TypeScript', 'JavaScript', 'REST APIs', 'Git', 'Problem Solving', 'Team Collaboration'],
    missingSkills: [{ name: 'AWS', type: 'Missing' }, { name: 'Docker', type: 'Partial' }]
  },
  {
    id: 'APP-102',
    name: 'Rahul Kumar',
    email: 'rahul.kumar@email.com',
    phone: '+91 98765 11223',
    avatar: avatar2,
    role: 'Frontend Developer',
    jobCode: 'JOB-0011',
    resumeName: 'Rahul_CV.pdf',
    resumeSize: '1.8 MB',
    matchScore: 87,
    stage: 'Screening',
    appliedOn: 'Oct 20, 2025',
    location: 'Chennai, Tamil Nadu',
    exp: '3+ years',
    matchedSkills: ['React.js', 'TypeScript', 'Tailwind', 'HTML5', 'CSS3', 'Git'],
    missingSkills: [{ name: 'GraphQL', type: 'Missing' }]
  },
  {
    id: 'APP-103',
    name: 'Sneha Iyer',
    email: 'sneha.iyer@email.com',
    phone: '+91 98765 33445',
    avatar: avatar3,
    role: 'Data Analyst',
    jobCode: 'JOB-0010',
    resumeName: 'Sneha_Resume.pdf',
    resumeSize: '2.1 MB',
    matchScore: 78,
    stage: 'Applied',
    appliedOn: 'Oct 20, 2025',
    location: 'Hyderabad, Telangana',
    exp: '2+ years',
    matchedSkills: ['SQL', 'Python', 'Power BI', 'Excel', 'Data Cleaning'],
    missingSkills: [{ name: 'Snowflake', type: 'Missing' }, { name: 'Airflow', type: 'Partial' }]
  },
  {
    id: 'APP-104',
    name: 'Arjun Nair',
    email: 'arjun.nair@email.com',
    phone: '+91 98765 55667',
    avatar: avatar1,
    role: 'Backend Developer',
    jobCode: 'JOB-0009',
    resumeName: 'Arjun_Resume.pdf',
    resumeSize: '3.0 MB',
    matchScore: 65,
    stage: 'Interview',
    appliedOn: 'Oct 19, 2025',
    location: 'Chennai, Tamil Nadu',
    exp: '4+ years',
    matchedSkills: ['Java', 'Spring Boot', 'PostgreSQL', 'Microservices'],
    missingSkills: [{ name: 'Kafka', type: 'Missing' }, { name: 'Redis', type: 'Partial' }]
  },
  {
    id: 'APP-105',
    name: 'Vikram Singh',
    email: 'vikram.singh@email.com',
    phone: '+91 98765 77889',
    avatar: avatar5,
    role: 'Full Stack Developer',
    jobCode: 'JOB-0009',
    resumeName: 'Vikram_CV.pdf',
    resumeSize: '1.9 MB',
    matchScore: 88,
    stage: 'Shortlisted',
    appliedOn: 'Oct 18, 2025',
    location: 'Bengaluru, Karnataka',
    exp: '3+ years',
    matchedSkills: ['React.js', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
    missingSkills: [{ name: 'CI/CD', type: 'Partial' }]
  },
  {
    id: 'APP-106',
    name: 'Meera Joshi',
    email: 'meera.joshi@email.com',
    phone: '+91 98765 99001',
    avatar: avatar4,
    role: 'QA Engineer',
    jobCode: 'JOB-0008',
    resumeName: 'Meera_Resume.pdf',
    resumeSize: '2.2 MB',
    matchScore: 72,
    stage: 'Screening',
    appliedOn: 'Oct 18, 2025',
    location: 'Pune, Maharashtra',
    exp: '2+ years',
    matchedSkills: ['Selenium', 'TestNG', 'Java', 'Regression Testing'],
    missingSkills: [{ name: 'Playwright', type: 'Missing' }]
  },
  {
    id: 'APP-107',
    name: 'Siddharth Verma',
    email: 'siddharth.verma@email.com',
    phone: '+91 98765 22334',
    avatar: avatar1,
    role: 'DevOps Engineer',
    jobCode: 'JOB-0007',
    resumeName: 'Siddharth.pdf',
    resumeSize: '2.5 MB',
    matchScore: 60,
    stage: 'Applied',
    appliedOn: 'Oct 17, 2025',
    location: 'Hyderabad, Telangana',
    exp: '4+ years',
    matchedSkills: ['AWS', 'Docker', 'Linux', 'Terraform'],
    missingSkills: [{ name: 'Kubernetes', type: 'Partial' }, { name: 'Ansible', type: 'Missing' }]
  },
  {
    id: 'APP-108',
    name: 'Ananya Rao',
    email: 'ananya.rao@email.com',
    phone: '+91 98765 44556',
    avatar: avatar2,
    role: 'Product Designer',
    jobCode: 'JOB-0006',
    resumeName: 'Ananya_Resume.pdf',
    resumeSize: '4.2 MB',
    matchScore: 81,
    stage: 'Interview',
    appliedOn: 'Oct 16, 2025',
    location: 'Mumbai, Maharashtra',
    exp: '3+ years',
    matchedSkills: ['Figma', 'UI/UX', 'Design Systems', 'User Research'],
    missingSkills: [{ name: 'Motion Design', type: 'Partial' }]
  },
  {
    id: 'APP-109',
    name: 'Deepak Patel',
    email: 'deepak.patel@email.com',
    phone: '+91 98765 66778',
    avatar: avatar5,
    role: 'System Administrator',
    jobCode: 'JOB-0005',
    resumeName: 'Deepak_CV.pdf',
    resumeSize: '1.7 MB',
    matchScore: 58,
    stage: 'Applied',
    appliedOn: 'Oct 15, 2025',
    location: 'Chennai, Tamil Nadu',
    exp: '5+ years',
    matchedSkills: ['Linux', 'Windows Server', 'Active Directory'],
    missingSkills: [{ name: 'Cloud Security', type: 'Missing' }]
  },
  {
    id: 'APP-110',
    name: 'Riya Menon',
    email: 'riya.menon@email.com',
    phone: '+91 98765 88990',
    avatar: avatar3,
    role: 'Data Scientist',
    jobCode: 'JOB-0004',
    resumeName: 'Riya_Resume.pdf',
    resumeSize: '2.8 MB',
    matchScore: 76,
    stage: 'Screening',
    appliedOn: 'Oct 15, 2025',
    location: 'Bengaluru, Karnataka',
    exp: '3+ years',
    matchedSkills: ['Python', 'Pandas', 'Scikit-Learn', 'Statistical Modeling'],
    missingSkills: [{ name: 'PyTorch', type: 'Partial' }]
  }
];

const APP_STAGE_LABELS = {
  applied: 'Applied',
  screening: 'Screening',
  shortlisted: 'Shortlisted',
  interview: 'Interview',
  selected: 'Offer',
  offered: 'Offer',
  hired: 'Offer',
  rejected: 'Rejected'
};

const APP_AVATARS = [avatar1, avatar2, avatar3, avatar4, avatar5];

function mapBackendApplication(item) {
  const cand = item?.candidate || {};
  const job = item?.job || {};
  const rawStage = String(item?.stage || 'applied').toLowerCase();
  const skillsList = String(cand?.skills || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const appliedOn = item?.applied_at
    ? new Date(item.applied_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Just now';

  return {
    dbId: item?.id,
    id: `APP-${String(item?.id || 1).padStart(3, '0')}`,
    candidateId: item?.candidate_id || cand?.id,
    name: cand?.name || 'Applicant',
    email: cand?.email || '',
    phone: cand?.phone || '—',
    avatar: cand?.photo_url || APP_AVATARS[(Number(item?.id) || 0) % APP_AVATARS.length],
    role: job?.title || cand?.current_role || 'Software Engineer',
    dept: job?.department || cand?.department || 'Engineering',
    jobCode: `JOB-${String(job?.id || item?.job_id || 1).padStart(4, '0')}`,
    resumeName: cand?.resume_name || '',
    resumeSize: cand?.resume_size || '',
    resumeUrl: cand?.resume_url || '',
    matchScore: cand?.resume_name ? Number(item?.match_score || 0) : 0,
    stage: APP_STAGE_LABELS[rawStage] || 'Applied',
    appliedAt: item?.applied_at,
    appliedOn,
    location: cand?.location || job?.location || 'Bengaluru',
    exp: cand?.experience || '2+ years',
    matchedSkills: skillsList.length ? skillsList : ['Communication', 'Problem Solving'],
    missingSkills: []
  };
}

export default function AdminApplications() {
  const navigate = useNavigate();

  // state
  const [applications, setApplications] = useState([]);
  const [availableJobs, setAvailableJobs] = useState([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // upload resume modal
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadTargetAppId, setUploadTargetAppId] = useState('');
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadingResume, setUploadingResume] = useState(false);

  // schedule interview modal
  const [interviewDialogOpen, setInterviewDialogOpen] = useState(false);
  const [interviewTargetApp, setInterviewTargetApp] = useState(null);
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewerName, setInterviewerName] = useState('Admin');
  const [interviewNotes, setInterviewNotes] = useState('');
  const [schedulingInterview, setSchedulingInterview] = useState(false);

  // delete confirmation
  const [deleteConfirmApp, setDeleteConfirmApp] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // full-screen view application
  const [fullScreenApp, setFullScreenApp] = useState(null);

  // sort & more filters
  const [sortBy, setSortBy] = useState('recent');
  const [sortAnchor, setSortAnchor] = useState(null);
  const [minScoreFilter, setMinScoreFilter] = useState(0);
  const [moreFiltersAnchor, setMoreFiltersAnchor] = useState(null);

  const [selectedApp, setSelectedApp] = useState(null);
  const [stageTab, setStageTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [jobFilter, setJobFilter] = useState('ALL');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(1);
  const [previewTab, setPreviewTab] = useState(0);

  // dialog & notification
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [menuTarget, setMenuTarget] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [resumeViewerCandidate, setResumeViewerCandidate] = useState(null);

  // form state
  const [newCandidateName, setNewCandidateName] = useState('');
  const [newJobTitle, setNewJobTitle] = useState('Software Engineer');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newLocation, setNewLocation] = useState('Bengaluru');
  const [newExperience, setNewExperience] = useState('2+ yrs');
  const [newSkills, setNewSkills] = useState('');
  const [newResumeFile, setNewResumeFile] = useState(null);
  const [appErrors, setAppErrors] = useState({});

  useEffect(() => {
    let cancelled = false;
    setLoadingApps(true);
    Promise.all([getApplications(), getJobs().catch(() => null)])
      .then(([appsRes, jobsRes]) => {
        if (cancelled) return;
        const appList = Array.isArray(appsRes?.data) ? appsRes.data : [];
        setApplications(appList.map(mapBackendApplication));
        if (Array.isArray(jobsRes?.data)) {
          setAvailableJobs(jobsRes.data);
          if (jobsRes.data.length > 0) {
            setNewJobTitle(jobsRes.data[0].title);
          }
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setSnackbar({
          open: true,
          message: err.message || 'Failed to load applications from server',
          severity: 'error'
        });
      })
      .finally(() => {
        if (!cancelled) setLoadingApps(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // counts
  const totalCount = applications.length;
  const appliedCount = applications.filter((a) => a.stage === 'Applied').length;
  const screeningCount = applications.filter((a) => a.stage === 'Screening').length;
  const shortlistedCount = applications.filter((a) => a.stage === 'Shortlisted').length;
  const interviewCount = applications.filter((a) => a.stage === 'Interview').length;
  const offerCount = applications.filter((a) => a.stage === 'Offer').length;

  // filter & sort
  const filteredApps = useMemo(() => {
    const filtered = applications.filter((app) => {
      const matchTab = stageTab === 'ALL' || app.stage.toLowerCase() === stageTab.toLowerCase();
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        app.name.toLowerCase().includes(q) ||
        app.role.toLowerCase().includes(q) ||
        app.jobCode.toLowerCase().includes(q) ||
        app.email.toLowerCase().includes(q);
      const matchJob = jobFilter === 'ALL' || app.role === jobFilter;
      const matchDept = deptFilter === 'ALL' || (app.dept || '').toLowerCase().includes(deptFilter.toLowerCase());
      const matchStatus = statusFilter === 'ALL' || app.stage === statusFilter;
      const matchScore = app.matchScore >= minScoreFilter;
      return matchTab && matchSearch && matchJob && matchDept && matchStatus && matchScore;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'score') return b.matchScore - a.matchScore;
      if (sortBy === 'oldest') return new Date(a.appliedAt || 0) - new Date(b.appliedAt || 0);
      return new Date(b.appliedAt || 0) - new Date(a.appliedAt || 0);
    });
  }, [applications, stageTab, searchQuery, jobFilter, deptFilter, statusFilter, minScoreFilter, sortBy]);

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

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      const next = selectedRows.filter((r) => r !== id);
      setSelectedRows(next);
      if (selectedApp?.id === id) {
        const remaining = filteredApps.find((a) => next.includes(a.id));
        setSelectedApp(remaining || null);
      }
    } else {
      setSelectedRows([...selectedRows, id]);
      const foundApp = applications.find((a) => a.id === id);
      if (foundApp) setSelectedApp(foundApp);
    }
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

  const handleAddSubmit = async () => {
    const errors = {};
    if (!newCandidateName.trim()) {
      errors.name = 'Candidate Name is required';
    } else if (newCandidateName.trim().length < 2) {
      errors.name = 'Candidate Name must be at least 2 characters';
    }

    const emailErr = validateEmail(newEmail);
    if (emailErr) {
      errors.email = emailErr;
    }

    if (!newPhone.trim() || newPhone.replace(/\D/g, '').length < 7) {
      errors.phone = 'Valid Phone Number is required';
    }

    const skillsArr = newSkills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (skillsArr.length < 2) {
      errors.skills = 'Enter at least 2 comma-separated skills for ATS matching';
    }

    if (!newResumeFile) {
      errors.resume = 'Resume file (PDF/DOC/DOCX) is required for ATS scoring';
    }

    if (Object.keys(errors).length > 0) {
      setAppErrors(errors);
      setSnackbar({ open: true, message: 'Please fill all required candidate details and attach a resume', severity: 'warning' });
      return;
    }

    setSubmitting(true);
    try {
      const res = await createApplication({
        candidateName: newCandidateName.trim(),
        candidateEmail: newEmail.trim(),
        phone: newPhone.trim(),
        location: newLocation,
        experience: newExperience.trim() || '2+ yrs',
        skills: skillsArr.join(', '),
        jobTitle: newJobTitle
      });
      const uploadRes = await uploadApplicationResume(res.data.id, newResumeFile);
      const created = mapBackendApplication(uploadRes.data);
      setApplications((prev) => [created, ...prev]);
      setSelectedApp(created);
      setAddDialogOpen(false);
      setNewCandidateName('');
      setNewEmail('');
      setNewPhone('');
      setNewSkills('');
      setNewResumeFile(null);
      setAppErrors({});
      setSnackbar({ open: true, message: `Application created for ${created.name} (ATS Score: ${created.matchScore}%)!`, severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: err.message || 'Failed to create application', severity: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleStageUpdate = async (app, nextStage, successMessage, severity = 'success') => {
    if (!app?.dbId) return;
    try {
      const res = await updateApplicationStage(app.dbId, nextStage);
      const updated = mapBackendApplication(res.data);
      setApplications((prev) => prev.map((a) => (a.dbId === app.dbId ? updated : a)));
      if (selectedApp?.dbId === app.dbId) setSelectedApp(updated);
      setSnackbar({ open: true, message: successMessage, severity });
    } catch (err) {
      setSnackbar({ open: true, message: err.message || 'Failed to update application stage', severity: 'error' });
    }
  };

  const handleUploadResumeSubmit = async () => {
    if (!uploadTargetAppId || !uploadFile) {
      setSnackbar({ open: true, message: 'Please select an application and attach a resume file.', severity: 'warning' });
      return;
    }
    setUploadingResume(true);
    try {
      const res = await uploadApplicationResume(uploadTargetAppId, uploadFile);
      const updated = mapBackendApplication(res.data);
      setApplications((prev) => prev.map((a) => (a.dbId === updated.dbId ? updated : a)));
      if (selectedApp?.dbId === updated.dbId) setSelectedApp(updated);
      setUploadDialogOpen(false);
      setUploadFile(null);
      setSnackbar({ open: true, message: `Resume uploaded for ${updated.name}!`, severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: err.message || 'Failed to upload resume', severity: 'error' });
    } finally {
      setUploadingResume(false);
    }
  };

  const handleScheduleInterviewSubmit = async () => {
    if (!interviewTargetApp?.dbId || !interviewDate) {
      setSnackbar({ open: true, message: 'Please select an interview date and time.', severity: 'warning' });
      return;
    }
    setSchedulingInterview(true);
    try {
      await scheduleInterview({
        applicationId: interviewTargetApp.dbId,
        scheduledAt: new Date(interviewDate).toISOString(),
        interviewer: interviewerName.trim() || 'Admin',
        notes: interviewNotes.trim()
      });
      await handleStageUpdate(
        interviewTargetApp,
        'interview',
        `Interview scheduled for ${interviewTargetApp.name}!`,
        'success'
      );
      setInterviewDialogOpen(false);
      setInterviewNotes('');
    } catch (err) {
      setSnackbar({ open: true, message: err.message || 'Failed to schedule interview', severity: 'error' });
    } finally {
      setSchedulingInterview(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirmApp?.dbId) return;
    setDeleting(true);
    try {
      await deleteApplication(deleteConfirmApp.dbId);
      setApplications((prev) => prev.filter((a) => a.dbId !== deleteConfirmApp.dbId));
      if (selectedApp?.dbId === deleteConfirmApp.dbId) setSelectedApp(null);
      setSnackbar({ open: true, message: `Application ${deleteConfirmApp.id} deleted.`, severity: 'info' });
      setDeleteConfirmApp(null);
    } catch (err) {
      setSnackbar({ open: true, message: err.message || 'Failed to delete application', severity: 'error' });
    } finally {
      setDeleting(false);
    }
  };

  const getStageChip = (stage) => {
    switch (stage) {
      case 'Shortlisted':
        return <Chip label="Shortlisted" size="small" sx={{ bgcolor: '#ecfdf5', color: '#059669', fontWeight: 700, fontSize: 11, border: '1px solid #a7f3d0' }} />;
      case 'Screening':
        return <Chip label="Screening" size="small" sx={{ bgcolor: '#eff6ff', color: '#2563eb', fontWeight: 700, fontSize: 11, border: '1px solid #bfdbfe' }} />;
      case 'Applied':
        return <Chip label="Applied" size="small" sx={{ bgcolor: '#eff6ff', color: '#1d4ed8', fontWeight: 700, fontSize: 11, border: '1px solid #dbeafe' }} />;
      case 'Interview':
        return <Chip label="Interview" size="small" sx={{ bgcolor: '#fffbeb', color: '#d97706', fontWeight: 700, fontSize: 11, border: '1px solid #fde68a' }} />;
      default:
        return <Chip label={stage} size="small" />;
    }
  };

  const getMatchScoreBadge = (score) => {
    let color = '#10b981';
    let bg = '#ecfdf5';
    if (score < 70) {
      color = '#f59e0b';
      bg = '#fffbeb';
    }
    if (score < 60) {
      color = '#ef4444';
      bg = '#fef2f2';
    }
    return (
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 38,
          height: 38,
          borderRadius: '50%',
          border: `2.5px solid ${color}`,
          bgcolor: bg,
          color: color,
          fontWeight: 800,
          fontSize: 12
        }}
      >
        {score}%
      </Box>
    );
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100%', pb: 5 }}>
      {/* ========================================================================= */}
      {/* 1. HEADER ROW & DRAG-AND-DROP BANNER                                      */}
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
            <SolutionOutlined />
          </Box>
          <Typography sx={{ color: '#6929e2', fontWeight: 700, fontSize: 13 }}>
            Applications
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
              Applicant Tracking System (ATS)
            </Typography>
            <Typography sx={{ color: '#6b7280', fontSize: 13, lineHeight: 1.45 }}>
              Manage applications, upload resumes, track candidates and find the best match with AI.
            </Typography>
          </Box>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            alignItems="center"
            sx={{ flexShrink: 0 }}
          >
            <Button
              variant="contained"
              startIcon={<PlusOutlined />}
              onClick={() => setAddDialogOpen(true)}
              sx={{
                bgcolor: '#530EF0',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: 14,
                textTransform: 'none',
                borderRadius: '8px',
                height: 40,
                minHeight: 40,
                px: 2,
                whiteSpace: 'nowrap',
                flexShrink: 0,
                '&:hover': { bgcolor: '#430BC2' }
              }}
            >
              Add Application
            </Button>
            <Button
              variant="outlined"
              startIcon={<UploadOutlined />}
              onClick={() => {
                setUploadTargetAppId(selectedApp?.dbId || applications[0]?.dbId || '');
                setUploadFile(null);
                setUploadDialogOpen(true);
              }}
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
                px: 2,
                whiteSpace: 'nowrap',
                flexShrink: 0,
                '&:hover': { borderColor: '#CBD5E1', bgcolor: '#F8FAFC' }
              }}
            >
              Upload Resume
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* ========================================================================= */}
      {/* 2. TOP 6 KPI CARDS                                                        */}
      {/* ========================================================================= */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* Total Applications */}
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
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
                <SolutionOutlined />
              </Box>
              <Chip label="↑ 18%" size="small" sx={{ bgcolor: 'rgba(16, 185, 129, 0.08)', color: '#10B981', fontWeight: 500, fontSize: 11, height: 22, borderRadius: '6px' }} />
            </Stack>
            <Box sx={{ mt: 1.5 }}>
              <Typography sx={{ color: '#6B7280', fontSize: 13, fontWeight: 500, display: 'block', mb: 0.25 }}>Total Applications</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 28, color: '#111827', lineHeight: 1 }}>{totalCount}</Typography>
              <Typography sx={{ color: '#9CA3AF', fontSize: 12, fontWeight: 400, mt: 0.5 }}>Across all jobs</Typography>
            </Box>
          </Card>
        </Grid>

        {/* Applied */}
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
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
                <UserOutlined />
              </Box>
              <Chip label="↑ 22%" size="small" sx={{ bgcolor: 'rgba(16, 185, 129, 0.08)', color: '#10B981', fontWeight: 500, fontSize: 11, height: 22, borderRadius: '6px' }} />
            </Stack>
            <Box sx={{ mt: 1.5 }}>
              <Typography sx={{ color: '#6B7280', fontSize: 13, fontWeight: 500, display: 'block', mb: 0.25 }}>Applied</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 28, color: '#111827', lineHeight: 1 }}>{appliedCount}</Typography>
              <Typography sx={{ color: '#9CA3AF', fontSize: 12, fontWeight: 400, mt: 0.5 }}>New applications</Typography>
            </Box>
          </Card>
        </Grid>

        {/* Screening */}
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
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
              <Box sx={{ width: 38, height: 38, borderRadius: '10px', bgcolor: '#f0f9ff', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                <PlayCircleOutlined />
              </Box>
              <Chip label="↑ 16%" size="small" sx={{ bgcolor: 'rgba(16, 185, 129, 0.08)', color: '#10B981', fontWeight: 500, fontSize: 11, height: 22, borderRadius: '6px' }} />
            </Stack>
            <Box sx={{ mt: 1.5 }}>
              <Typography sx={{ color: '#6B7280', fontSize: 13, fontWeight: 500, display: 'block', mb: 0.25 }}>Screening</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 28, color: '#111827', lineHeight: 1 }}>{screeningCount}</Typography>
              <Typography sx={{ color: '#9CA3AF', fontSize: 12, fontWeight: 400, mt: 0.5 }}>Under review</Typography>
            </Box>
          </Card>
        </Grid>

        {/* Shortlisted */}
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
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
              <Box sx={{ width: 38, height: 38, borderRadius: '10px', bgcolor: '#fdf2f8', color: '#db2777', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                <TeamOutlined />
              </Box>
              <Chip label="↑ 25%" size="small" sx={{ bgcolor: 'rgba(16, 185, 129, 0.08)', color: '#10B981', fontWeight: 500, fontSize: 11, height: 22, borderRadius: '6px' }} />
            </Stack>
            <Box sx={{ mt: 1.5 }}>
              <Typography sx={{ color: '#6B7280', fontSize: 13, fontWeight: 500, display: 'block', mb: 0.25 }}>Shortlisted</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 28, color: '#111827', lineHeight: 1 }}>{shortlistedCount}</Typography>
              <Typography sx={{ color: '#9CA3AF', fontSize: 12, fontWeight: 400, mt: 0.5 }}>Moving forward</Typography>
            </Box>
          </Card>
        </Grid>

        {/* Interview */}
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
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
                <CalendarOutlined />
              </Box>
              <Chip label="↑ 12%" size="small" sx={{ bgcolor: 'rgba(16, 185, 129, 0.08)', color: '#10B981', fontWeight: 500, fontSize: 11, height: 22, borderRadius: '6px' }} />
            </Stack>
            <Box sx={{ mt: 1.5 }}>
              <Typography sx={{ color: '#6B7280', fontSize: 13, fontWeight: 500, display: 'block', mb: 0.25 }}>Interview</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 28, color: '#111827', lineHeight: 1 }}>{interviewCount}</Typography>
              <Typography sx={{ color: '#9CA3AF', fontSize: 12, fontWeight: 400, mt: 0.5 }}>Interview scheduled</Typography>
            </Box>
          </Card>
        </Grid>

        {/* Offer */}
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
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
                <FileTextOutlined />
              </Box>
              <Chip label="↑ 60%" size="small" sx={{ bgcolor: 'rgba(16, 185, 129, 0.08)', color: '#10B981', fontWeight: 500, fontSize: 11, height: 22, borderRadius: '6px' }} />
            </Stack>
            <Box sx={{ mt: 1.5 }}>
              <Typography sx={{ color: '#6B7280', fontSize: 13, fontWeight: 500, display: 'block', mb: 0.25 }}>Offer</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 28, color: '#111827', lineHeight: 1 }}>{offerCount}</Typography>
              <Typography sx={{ color: '#9CA3AF', fontSize: 12, fontWeight: 400, mt: 0.5 }}>Offers sent</Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* ========================================================================= */}
      {/* 3. MASTER LAYOUT: APPLICATIONS TABLE (FULL WIDTH OR SPLIT WHEN INSPECTING) */}
      {/* ========================================================================= */}
      <Grid container spacing={3} alignItems="flex-start">
        {/* LEFT COLUMN: TABLE */}
        <Grid size={{ xs: 12, lg: selectedApp ? 7.8 : 12 }}>
          <Card sx={{ borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
            {/* Stage Tabs Bar */}
            <Box sx={{ px: 2.5, pt: 1.5, borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
              <Tabs
                value={stageTab}
                onChange={(e, val) => setStageTab(val)}
                sx={{
                  minHeight: 42,
                  '& .MuiTab-root': { minHeight: 42, textTransform: 'none', fontWeight: 700, fontSize: 12.5, color: '#6b7280', px: 1.5 },
                  '& .Mui-selected': { color: '#6929e2 !important' },
                  '& .MuiTabs-indicator': { backgroundColor: '#6929e2', height: 3, borderRadius: '3px 3px 0 0' }
                }}
              >
                <Tab value="ALL" label={`All (${totalCount})`} />
                <Tab value="Applied" label={`Applied (${appliedCount})`} />
                <Tab value="Screening" label={`Screening (${screeningCount})`} />
                <Tab value="Shortlisted" label={`Shortlisted (${shortlistedCount})`} />
                <Tab value="Interview" label={`Interview (${interviewCount})`} />
                <Tab value="Offer" label={`Offer (${offerCount})`} />
              </Tabs>

              <Typography
                onClick={(e) => setSortAnchor(e.currentTarget)}
                sx={{ fontSize: 12, color: '#6b7280', fontWeight: 600, cursor: 'pointer', userSelect: 'none' }}
              >
                Sort by: <strong style={{ color: '#111827' }}>{sortBy === 'score' ? 'Match Score' : sortBy === 'oldest' ? 'Oldest' : 'Recent'} ⌵</strong>
              </Typography>
            </Box>

            {/* Search & Filters Bar */}
            <Box sx={{ p: 2, px: 2.5, borderBottom: '1px solid #f1f5f9' }}>
              <Grid container spacing={1.5} alignItems="center">
                <Grid size={{ xs: 12, md: 4.5 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Search by name, email, or keywords..."
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
                <Grid size={{ xs: 6, sm: 3, md: 2 }}>
                  <Select fullWidth size="small" value={jobFilter} onChange={(e) => setJobFilter(e.target.value)} sx={{ borderRadius: '10px', fontSize: 12, fontWeight: 600 }}>
                    <MenuItem value="ALL">All Jobs</MenuItem>
                    <MenuItem value="Software Engineer">Software Engineer</MenuItem>
                    <MenuItem value="Frontend Developer">Frontend Developer</MenuItem>
                    <MenuItem value="Data Analyst">Data Analyst</MenuItem>
                  </Select>
                </Grid>
                <Grid size={{ xs: 6, sm: 3, md: 2 }}>
                  <Select fullWidth size="small" value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} sx={{ borderRadius: '10px', fontSize: 12, fontWeight: 600 }}>
                    <MenuItem value="ALL">All Departments</MenuItem>
                    <MenuItem value="Engineering">Engineering</MenuItem>
                    <MenuItem value="Data">Data & Analytics</MenuItem>
                    <MenuItem value="Design">Design</MenuItem>
                  </Select>
                </Grid>
                <Grid size={{ xs: 6, sm: 3, md: 1.8 }}>
                  <Select fullWidth size="small" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} sx={{ borderRadius: '10px', fontSize: 12, fontWeight: 600 }}>
                    <MenuItem value="ALL">All Statuses</MenuItem>
                    <MenuItem value="Shortlisted">Shortlisted</MenuItem>
                    <MenuItem value="Screening">Screening</MenuItem>
                    <MenuItem value="Applied">Applied</MenuItem>
                    <MenuItem value="Interview">Interview</MenuItem>
                  </Select>
                </Grid>
                <Grid size={{ xs: 6, sm: 3, md: 1.7 }}>
                  <Button
                    fullWidth
                    size="small"
                    variant="outlined"
                    startIcon={<FilterOutlined />}
                    onClick={(e) => setMoreFiltersAnchor(e.currentTarget)}
                    sx={{
                      borderRadius: '10px',
                      textTransform: 'none',
                      fontWeight: 700,
                      fontSize: 12,
                      color: '#6929e2',
                      borderColor: '#ddd6fe',
                      py: 0.85,
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
                    onClick={async () => {
                      const targets = applications.filter((a) => selectedRows.includes(a.id));
                      try {
                        const results = await Promise.all(
                          targets.map((a) => updateApplicationStage(a.dbId, 'shortlisted').then((r) => mapBackendApplication(r.data)))
                        );
                        const byId = new Map(results.map((r) => [r.dbId, r]));
                        setApplications((prev) => prev.map((a) => byId.get(a.dbId) || a));
                        setSnackbar({ open: true, message: `Shortlisted ${targets.length} applications!`, severity: 'success' });
                      } catch (err) {
                        setSnackbar({ open: true, message: err.message || 'Failed to shortlist applications', severity: 'error' });
                      }
                    }}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30, color: '#059669', borderColor: '#A7F3D0' }}
                  >
                    Shortlist ({selectedRows.length})
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={async () => {
                      const targets = applications.filter((a) => selectedRows.includes(a.id));
                      try {
                        const results = await Promise.all(
                          targets.map((a) => updateApplicationStage(a.dbId, 'interview').then((r) => mapBackendApplication(r.data)))
                        );
                        const byId = new Map(results.map((r) => [r.dbId, r]));
                        setApplications((prev) => prev.map((a) => byId.get(a.dbId) || a));
                        setSnackbar({ open: true, message: `Moved ${targets.length} candidates to Interview stage!`, severity: 'info' });
                      } catch (err) {
                        setSnackbar({ open: true, message: err.message || 'Failed to update stage', severity: 'error' });
                      }
                    }}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30, color: '#530EF0', borderColor: '#C084FC' }}
                  >
                    Interview
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setSnackbar({ open: true, message: `Email composer opened for ${selectedRows.length} applicants.`, severity: 'info' })}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30, color: '#6B7280', borderColor: '#D1D5DB' }}
                  >
                    Send Email
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setSnackbar({ open: true, message: `Exporting resume bundle for ${selectedRows.length} applicants...`, severity: 'info' })}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30, color: '#6B7280', borderColor: '#D1D5DB' }}
                  >
                    Export Resumes
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={async () => {
                      const targets = applications.filter((a) => selectedRows.includes(a.id));
                      try {
                        const results = await Promise.all(
                          targets.map((a) => updateApplicationStage(a.dbId, 'rejected').then((r) => mapBackendApplication(r.data)))
                        );
                        const byId = new Map(results.map((r) => [r.dbId, r]));
                        setApplications((prev) => prev.map((a) => byId.get(a.dbId) || a));
                        setSnackbar({ open: true, message: `Rejected ${targets.length} applications.`, severity: 'error' });
                      } catch (err) {
                        setSnackbar({ open: true, message: err.message || 'Failed to reject applications', severity: 'error' });
                      }
                    }}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30 }}
                  >
                    Reject
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

            {/* Applications Table */}
            <TableContainer sx={{ minHeight: 460 }}>
              <Table size="small">
                <TableHead sx={{ bgcolor: '#f8fafc' }}>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        size="small"
                        checked={selectedRows.length > 0 && selectedRows.length === filteredApps.length}
                        indeterminate={selectedRows.length > 0 && selectedRows.length < filteredApps.length}
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Candidate</TableCell>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Job Title</TableCell>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Resume</TableCell>
                    <TableCell align="center" sx={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Match Score</TableCell>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Current Stage</TableCell>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Applied On</TableCell>
                    <TableCell align="right" sx={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredApps.map((app) => {
                    const isSelected = selectedApp?.id === app.id;
                    return (
                      <TableRow
                        key={app.id}
                        hover
                        onClick={() => handleRowClick(app)}
                        sx={{
                          cursor: 'pointer',
                          bgcolor: isSelected ? '#faf5ff' : 'inherit',
                          '&:hover': { bgcolor: isSelected ? '#f5eeff' : '#f8fafc' },
                          transition: 'background-color 0.15s ease'
                        }}
                      >
                        <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()} sx={{ verticalAlign: 'middle' }}>
                          <Checkbox
                            size="small"
                            checked={selectedRows.includes(app.id)}
                            onChange={() => handleSelectRow(app.id)}
                          />
                        </TableCell>
                        <TableCell sx={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          <Stack direction="row" spacing={1.25} alignItems="center">
                            <Avatar src={app.avatar} sx={{ width: 30, height: 30 }} />
                            <Box>
                              <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#111827', lineHeight: 1.3 }}>
                                {app.name}
                              </Typography>
                              <Typography sx={{ fontSize: 11, color: '#6b7280', lineHeight: 1.2 }}>
                                {app.email}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>
                        <TableCell sx={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          <Typography sx={{ fontWeight: 700, fontSize: 12.5, color: '#111827', lineHeight: 1.3 }}>
                            {app.role}
                          </Typography>
                          <Typography sx={{ fontSize: 11, color: '#6b7280', lineHeight: 1.2 }}>
                            {app.jobCode}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          <Stack
                            direction="row"
                            spacing={0.5}
                            alignItems="center"
                            onClick={(e) => {
                              e.stopPropagation();
                              setResumeViewerCandidate(app);
                            }}
                            sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                          >
                            <FilePdfOutlined style={{ color: '#dc2626', fontSize: 13 }} />
                            <Typography sx={{ fontSize: 11.5, color: '#2563eb', fontWeight: 600 }}>
                              {app.resumeName}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="center" sx={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          {app.matchScore > 0 ? getMatchScoreBadge(app.matchScore) : <Chip label="No Resume" size="small" sx={{ fontSize: 10.5, bgcolor: '#f1f5f9', color: '#64748b' }} />}
                        </TableCell>
                        <TableCell sx={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>{getStageChip(app.stage)}</TableCell>
                        <TableCell sx={{ fontSize: 12, color: '#64748b', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>{app.appliedOn}</TableCell>
                        <TableCell align="right" onClick={(e) => e.stopPropagation()} sx={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              setMenuAnchor(e.currentTarget);
                              setMenuTarget(app);
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
                Showing 1-{filteredApps.length} of {totalCount} applications
              </Typography>
              <Pagination
                count={5}
                page={page}
                onChange={(e, p) => setPage(p)}
                size="small"
                shape="rounded"
                sx={{ '& .Mui-selected': { bgcolor: '#6929e2 !important', color: '#fff', fontWeight: 700 } }}
              />
            </Box>
          </Card>
        </Grid>

        {/* RIGHT COLUMN: ATS MATCH ANALYSIS PREVIEW CARD (APPEARS ON CLICK) */}
        {selectedApp && (
          <Grid size={{ xs: 12, lg: 4.2 }}>
            <Card sx={{ borderRadius: '16px', border: '1px solid #ede9fe', boxShadow: '0 2px 10px rgba(105, 41, 226, 0.06)', overflow: 'hidden' }}>
              {/* Profile Card Header */}
              <Box sx={{ p: 2.5, background: 'linear-gradient(180deg, #fbf9ff 0%, #ffffff 100%)', borderBottom: '1px solid #f1f5f9' }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1.5 }}>
                  <Avatar src={selectedApp.avatar} sx={{ width: 56, height: 56, border: '2px solid #ede9fe' }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.25 }}>
                      <Typography sx={{ fontWeight: 800, fontSize: 17, color: '#111827' }}>
                        {selectedApp.name}
                      </Typography>
                      <Chip
                        label={selectedApp.matchScore > 0 ? `${selectedApp.matchScore}% Match` : 'Pending Resume'}
                        size="small"
                        sx={{ bgcolor: selectedApp.matchScore > 0 ? '#ecfdf5' : '#f1f5f9', color: selectedApp.matchScore > 0 ? '#059669' : '#64748b', fontWeight: 700, fontSize: 10.5, height: 20 }}
                      />
                    </Stack>
                    <Typography sx={{ fontSize: 13, color: '#4b5563', fontWeight: 600 }}>
                      {selectedApp.role}
                    </Typography>
                    <Typography sx={{ fontSize: 11.5, color: '#9ca3af', mt: 0.25 }}>
                      {selectedApp.location} • {selectedApp.exp}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <Tooltip title="View Full Screen">
                      <IconButton size="small" onClick={() => setFullScreenApp(selectedApp)} sx={{ color: '#6929e2' }}>
                        <FullscreenOutlined style={{ fontSize: 14 }} />
                      </IconButton>
                    </Tooltip>
                    <IconButton size="small" onClick={(e) => { setMenuAnchor(e.currentTarget); setMenuTarget(selectedApp); }}>
                      <MoreOutlined style={{ color: '#9ca3af' }} />
                    </IconButton>
                    <IconButton size="small" onClick={() => setSelectedApp(null)} sx={{ color: '#6b7280', '&:hover': { color: '#111827' } }}>
                      <CloseOutlined style={{ fontSize: 12 }} />
                    </IconButton>
                  </Stack>
                </Stack>

                {/* Contact links */}
                <Stack spacing={0.75} sx={{ pt: 1, borderTop: '1px dashed #e2e8f0' }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <MailOutlined style={{ fontSize: 12, color: '#6929e2' }} />
                    <Typography sx={{ fontSize: 12, color: '#2563eb', fontWeight: 600 }}>{selectedApp.email}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <PhoneOutlined style={{ fontSize: 12, color: '#6929e2' }} />
                    <Typography sx={{ fontSize: 12, color: '#374151' }}>{selectedApp.phone}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <LinkedinFilled style={{ fontSize: 12, color: '#0077b5' }} />
                    <Typography sx={{ fontSize: 12, color: '#0077b5', fontWeight: 600 }}>linkedin.com/in/{selectedApp.name.toLowerCase().replace(' ', '-')}</Typography>
                  </Stack>
                </Stack>

                {/* 3 Action Buttons */}
                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      const stageOrder = {
                        Applied: { next: 'screening', label: 'Screening' },
                        Screening: { next: 'shortlisted', label: 'Shortlisted' },
                        Shortlisted: { next: 'interview', label: 'Interview' },
                        Interview: { next: 'offered', label: 'Offer' }
                      };
                      const step = stageOrder[selectedApp.stage] || { next: 'interview', label: 'Interview' };
                      handleStageUpdate(selectedApp, step.next, `${selectedApp.name} moved to ${step.label} stage!`, 'success');
                    }}
                    sx={{ bgcolor: '#6929e2', textTransform: 'none', fontWeight: 500, fontSize: 11, borderRadius: '8px', px: 1.5, '&:hover': { bgcolor: '#5b1fd9' } }}
                  >
                    Move to Next Stage
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<CalendarOutlined />}
                    onClick={() => {
                      setInterviewTargetApp(selectedApp);
                      setInterviewDate('');
                      setInterviewNotes('');
                      setInterviewDialogOpen(true);
                    }}
                    sx={{ color: '#4b5563', borderColor: '#d1d5db', textTransform: 'none', fontWeight: 500, fontSize: 11, borderRadius: '8px', '&:hover': { borderColor: '#6929e2', color: '#6929e2' } }}
                  >
                    Schedule Interview
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={async () => {
                      if (!selectedApp?.candidateId) return;
                      try {
                        await updateCandidateStatus(selectedApp.candidateId, { inTalentPool: true });
                        setSnackbar({ open: true, message: `${selectedApp.name} saved to Talent Pool!`, severity: 'success' });
                      } catch (err) {
                        setSnackbar({ open: true, message: err.message || 'Failed to add to Talent Pool', severity: 'error' });
                      }
                    }}
                    sx={{ color: '#6929e2', borderColor: '#ddd6fe', textTransform: 'none', fontWeight: 500, fontSize: 11, borderRadius: '8px', '&:hover': { bgcolor: '#faf5ff', borderColor: '#6929e2' } }}
                  >
                    Add to Pool
                  </Button>
                </Stack>
              </Box>

              {/* Tabs */}
              <Box sx={{ borderBottom: '1px solid #f1f5f9' }}>
                <Tabs
                  value={previewTab}
                  onChange={(e, val) => setPreviewTab(val)}
                  sx={{ minHeight: 40, '& .MuiTab-root': { minHeight: 40, textTransform: 'none', fontSize: 11.5, fontWeight: 700, px: 1.5 } }}
                >
                  <Tab label="Overview" />
                  <Tab label="Resume" />
                  <Tab label="Match Analysis" />
                  <Tab label="Applications" />
                  <Tab label="Activity" />
                </Tabs>
              </Box>

              {/* Tab Content: ATS Match Score & Breakdown */}
              <Box sx={{ p: 2.5 }}>
                <Typography sx={{ fontWeight: 800, fontSize: 13.5, color: '#111827', mb: 1.5 }}>
                  ATS Match Score
                </Typography>

                <Stack direction="row" spacing={2.5} alignItems="center" sx={{ mb: 2.5 }}>
                  {/* Gauge */}
                  <Box
                    sx={{
                      width: 76,
                      height: 76,
                      borderRadius: '50%',
                      border: '6px solid #10b981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: 18,
                      color: '#065f46',
                      bgcolor: '#ecfdf5',
                      flexShrink: 0
                    }}
                  >
                    {selectedApp.matchScore}%
                  </Box>

                  <Box>
                    <Stack direction="row" spacing={0.75} alignItems="center" sx={{ mb: 0.5 }}>
                      <CheckCircleOutlined style={{ color: '#059669', fontSize: 14 }} />
                      <Typography sx={{ fontWeight: 800, fontSize: 13.5, color: '#059669' }}>
                        Excellent Match
                      </Typography>
                    </Stack>
                    <Typography sx={{ fontSize: 11.5, color: '#64748b', lineHeight: 1.4 }}>
                      Strong match for this role based on skills, experience and job requirements.
                    </Typography>
                  </Box>
                </Stack>

                {/* Matched Skills */}
                <Typography sx={{ fontWeight: 800, fontSize: 13, color: '#111827', mb: 1 }}>
                  Matched Skills ({selectedApp.matchedSkills.length}/10)
                </Typography>
                <Grid container spacing={1} sx={{ mb: 2 }}>
                  {selectedApp.matchedSkills.map((s) => (
                    <Grid key={s} size={{ xs: 6 }}>
                      <Stack direction="row" spacing={0.75} alignItems="center">
                        <CheckOutlined style={{ color: '#059669', fontSize: 12 }} />
                        <Typography sx={{ fontSize: 12, color: '#374151', fontWeight: 600 }}>{s}</Typography>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>

                {/* Missing / Partial Skills */}
                <Typography sx={{ fontWeight: 800, fontSize: 13, color: '#111827', mb: 1 }}>
                  Missing / Partial Skills ({selectedApp.missingSkills.length})
                </Typography>
                <Stack spacing={0.75} sx={{ mb: 2.5 }}>
                  {selectedApp.missingSkills.map((m) => (
                    <Stack key={m.name} direction="row" justifyContent="space-between" alignItems="center">
                      <Typography sx={{ fontSize: 12, color: '#4b5563', fontWeight: 600 }}>{m.name}</Typography>
                      <Chip
                        label={m.type}
                        size="small"
                        sx={{
                          fontSize: 10,
                          fontWeight: 700,
                          bgcolor: m.type === 'Missing' ? '#fef2f2' : '#fffbeb',
                          color: m.type === 'Missing' ? '#dc2626' : '#d97706',
                          height: 20
                        }}
                      />
                    </Stack>
                  ))}
                </Stack>

                {/* Resume Download Card */}
                <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Stack direction="row" spacing={1.25} alignItems="center" sx={{ cursor: 'pointer' }} onClick={() => setResumeViewerCandidate(selectedApp)}>
                    <FilePdfOutlined style={{ fontSize: 24, color: '#dc2626' }} />
                    <Box>
                      <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: '#111827', '&:hover': { color: '#6929e2', textDecoration: 'underline' } }}>{selectedApp.resumeName}</Typography>
                      <Typography sx={{ fontSize: 11, color: '#64748b' }}>{selectedApp.resumeSize} • Uploaded {selectedApp.appliedOn}</Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={0.5}>
                    <Button size="small" onClick={() => setResumeViewerCandidate(selectedApp)} sx={{ textTransform: 'none', fontWeight: 700, color: '#6929e2' }}>View</Button>
                    <IconButton
                      size="small"
                      component={selectedApp.resumeUrl ? 'a' : 'button'}
                      href={selectedApp.resumeUrl || undefined}
                      download={selectedApp.resumeUrl ? selectedApp.resumeName : undefined}
                      onClick={() => {
                        if (!selectedApp.resumeUrl) setResumeViewerCandidate(selectedApp);
                      }}
                      sx={{ color: '#6929e2' }}
                    >
                      <DownloadOutlined style={{ fontSize: 14 }} />
                    </IconButton>
                  </Stack>
                </Box>
              </Box>
            </Card>
          </Grid>
        )}
      </Grid>

      {/* Row Menu (•••) */}
      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
        <MenuItem
          onClick={() => {
            const t = menuTarget;
            setMenuAnchor(null);
            if (t) {
              setSelectedApp(t);
              setFullScreenApp(t);
            }
          }}
        >
          View Application
        </MenuItem>
        <MenuItem
          onClick={() => {
            const t = menuTarget;
            setMenuAnchor(null);
            if (t) handleStageUpdate(t, 'shortlisted', `${t.name} moved to Shortlisted!`, 'success');
          }}
          sx={{ color: '#059669' }}
        >
          Move to Shortlisted
        </MenuItem>
        <MenuItem
          onClick={() => {
            const t = menuTarget;
            setMenuAnchor(null);
            if (t) {
              setInterviewTargetApp(t);
              setInterviewDate('');
              setInterviewNotes('');
              setInterviewDialogOpen(true);
            }
          }}
          sx={{ color: '#6929e2' }}
        >
          Schedule Interview
        </MenuItem>
        <MenuItem
          onClick={() => {
            const t = menuTarget;
            setMenuAnchor(null);
            if (t) handleStageUpdate(t, 'offered', `Offer sent to ${t.name}!`, 'success');
          }}
        >
          Send Offer
        </MenuItem>
        <MenuItem
          onClick={() => {
            const t = menuTarget;
            setMenuAnchor(null);
            if (t) {
              setUploadTargetAppId(t.dbId);
              setUploadFile(null);
              setUploadDialogOpen(true);
            }
          }}
        >
          Upload Resume
        </MenuItem>
        <MenuItem
          onClick={() => {
            const t = menuTarget;
            setMenuAnchor(null);
            if (t) handleStageUpdate(t, 'rejected', `Application for ${t.name} rejected.`, 'error');
          }}
          sx={{ color: '#d97706' }}
        >
          Reject
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={() => {
            const t = menuTarget;
            setMenuAnchor(null);
            if (t) setDeleteConfirmApp(t);
          }}
          sx={{ color: '#dc2626', fontWeight: 600 }}
        >
          Delete Application
        </MenuItem>
      </Menu>

      {/* Sort Menu */}
      <Menu anchorEl={sortAnchor} open={Boolean(sortAnchor)} onClose={() => setSortAnchor(null)}>
        <MenuItem selected={sortBy === 'recent'} onClick={() => { setSortBy('recent'); setSortAnchor(null); }}>Recent</MenuItem>
        <MenuItem selected={sortBy === 'oldest'} onClick={() => { setSortBy('oldest'); setSortAnchor(null); }}>Oldest</MenuItem>
        <MenuItem selected={sortBy === 'score'} onClick={() => { setSortBy('score'); setSortAnchor(null); }}>Match Score</MenuItem>
      </Menu>

      {/* More Filters Popover */}
      <Popover
        open={Boolean(moreFiltersAnchor)}
        anchorEl={moreFiltersAnchor}
        onClose={() => setMoreFiltersAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ p: 2.5, width: 260 }}>
          <Typography sx={{ fontWeight: 800, fontSize: 14, color: '#111827', mb: 1.5 }}>
            More Filters
          </Typography>
          <Stack spacing={2}>
            <TextField
              fullWidth
              size="small"
              select
              label="Minimum Match Score"
              value={minScoreFilter}
              onChange={(e) => setMinScoreFilter(Number(e.target.value))}
            >
              <MenuItem value={0}>Any Score</MenuItem>
              <MenuItem value={60}>60%+</MenuItem>
              <MenuItem value={75}>75%+</MenuItem>
              <MenuItem value={85}>85%+</MenuItem>
            </TextField>
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button
                size="small"
                onClick={() => {
                  setJobFilter('ALL');
                  setDeptFilter('ALL');
                  setStatusFilter('ALL');
                  setMinScoreFilter(0);
                  setSearchQuery('');
                  setMoreFiltersAnchor(null);
                }}
                sx={{ textTransform: 'none', color: '#6b7280' }}
              >
                Reset All
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={() => setMoreFiltersAnchor(null)}
                sx={{ bgcolor: '#6929e2', textTransform: 'none', fontWeight: 700 }}
              >
                Apply
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Popover>

      {/* Add Application Dialog */}
      <Dialog
        open={addDialogOpen}
        onClose={() => {
          setAddDialogOpen(false);
          setAppErrors({});
        }}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>Add Application</DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  label="Candidate Name *"
                  placeholder="e.g. Vikram Sharma"
                  value={newCandidateName}
                  onChange={(e) => {
                    setNewCandidateName(e.target.value);
                    if (appErrors.name) setAppErrors({ ...appErrors, name: '' });
                  }}
                  error={Boolean(appErrors.name)}
                  helperText={appErrors.name}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  type="email"
                  label="Candidate Email *"
                  placeholder="candidate@example.com"
                  value={newEmail}
                  onChange={(e) => {
                    setNewEmail(e.target.value);
                    if (appErrors.email) setAppErrors({ ...appErrors, email: '' });
                  }}
                  error={Boolean(appErrors.email)}
                  helperText={appErrors.email}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  label="Phone Number *"
                  placeholder="+91 98765 43210"
                  value={newPhone}
                  onChange={(e) => {
                    setNewPhone(e.target.value);
                    if (appErrors.phone) setAppErrors({ ...appErrors, phone: '' });
                  }}
                  error={Boolean(appErrors.phone)}
                  helperText={appErrors.phone}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth select label="Applied Job Title *" value={newJobTitle} onChange={(e) => setNewJobTitle(e.target.value)}>
                  {(availableJobs.length > 0
                    ? availableJobs.map((j) => j.title)
                    : ['Software Engineer', 'Frontend Developer', 'Data Analyst', 'Backend Developer', 'DevOps Engineer']
                  ).map((title) => (
                    <MenuItem key={title} value={title}>
                      {title}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth select label="Location *" value={newLocation} onChange={(e) => setNewLocation(e.target.value)}>
                  <MenuItem value="Bengaluru">Bengaluru</MenuItem>
                  <MenuItem value="Chennai">Chennai</MenuItem>
                  <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                  <MenuItem value="Pune">Pune</MenuItem>
                  <MenuItem value="Mumbai">Mumbai</MenuItem>
                  <MenuItem value="Remote">Remote</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  label="Experience *"
                  placeholder="e.g. 2+ yrs"
                  value={newExperience}
                  onChange={(e) => setNewExperience(e.target.value)}
                />
              </Grid>
            </Grid>
            <TextField
              fullWidth
              required
              label="Skills (minimum 2, comma-separated) *"
              placeholder="e.g. React, Node.js, TypeScript, SQL"
              value={newSkills}
              onChange={(e) => {
                setNewSkills(e.target.value);
                if (appErrors.skills) setAppErrors({ ...appErrors, skills: '' });
              }}
              error={Boolean(appErrors.skills)}
              helperText={appErrors.skills}
            />
            <Box>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<UploadOutlined />}
                color={appErrors.resume ? 'error' : 'primary'}
                sx={{ textTransform: 'none', borderRadius: '8px', py: 1.25, fontWeight: 600 }}
              >
                {newResumeFile ? `Resume: ${newResumeFile.name}` : 'Attach Resume (PDF / DOC / DOCX) *'}
                <input
                  type="file"
                  hidden
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    setNewResumeFile(e.target.files?.[0] || null);
                    if (appErrors.resume) setAppErrors({ ...appErrors, resume: '' });
                  }}
                />
              </Button>
              {appErrors.resume && (
                <Typography sx={{ fontSize: 11.5, color: '#d32f2f', mt: 0.5, ml: 1.5 }}>{appErrors.resume}</Typography>
              )}
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => {
              setAddDialogOpen(false);
              setAppErrors({});
            }}
            disabled={submitting}
            sx={{ textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddSubmit}
            disabled={submitting}
            startIcon={submitting ? <CircularProgress size={16} color="inherit" /> : null}
            sx={{ bgcolor: '#6929e2', textTransform: 'none', fontWeight: 700, borderRadius: '8px', px: 3, '&:hover': { bgcolor: '#5b1fd9' } }}
          >
            {submitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Upload Resume Dialog */}
      <Dialog
        open={uploadDialogOpen}
        onClose={() => !uploadingResume && setUploadDialogOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>Upload Application Resume</DialogTitle>
        <DialogContent dividers sx={{ p: 2.5 }}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              select
              label="Select Application"
              value={uploadTargetAppId}
              onChange={(e) => setUploadTargetAppId(e.target.value)}
            >
              {applications.map((a) => (
                <MenuItem key={a.dbId} value={a.dbId}>
                  {a.name} — {a.role}
                </MenuItem>
              ))}
            </TextField>
            <Button variant="outlined" component="label" startIcon={<UploadOutlined />} sx={{ textTransform: 'none', borderRadius: '8px', py: 1.25 }}>
              {uploadFile ? uploadFile.name : 'Choose PDF / DOCX File'}
              <input
                type="file"
                hidden
                accept=".pdf,.doc,.docx"
                onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
              />
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setUploadDialogOpen(false)} disabled={uploadingResume} sx={{ textTransform: 'none' }}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleUploadResumeSubmit}
            disabled={uploadingResume || !uploadTargetAppId || !uploadFile}
            startIcon={uploadingResume ? <CircularProgress size={16} color="inherit" /> : null}
            sx={{ bgcolor: '#6929e2', textTransform: 'none', fontWeight: 700, borderRadius: '8px' }}
          >
            {uploadingResume ? 'Uploading...' : 'Upload'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Schedule Interview Dialog */}
      <Dialog
        open={interviewDialogOpen}
        onClose={() => !schedulingInterview && setInterviewDialogOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>
          Schedule Interview — {interviewTargetApp?.name}
        </DialogTitle>
        <DialogContent dividers sx={{ p: 2.5 }}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              type="datetime-local"
              label="Interview Date & Time *"
              InputLabelProps={{ shrink: true }}
              value={interviewDate}
              onChange={(e) => setInterviewDate(e.target.value)}
            />
            <TextField
              fullWidth
              label="Interviewer"
              value={interviewerName}
              onChange={(e) => setInterviewerName(e.target.value)}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Notes"
              placeholder="Meeting link, round focus, etc."
              value={interviewNotes}
              onChange={(e) => setInterviewNotes(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setInterviewDialogOpen(false)} disabled={schedulingInterview} sx={{ textTransform: 'none' }}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleScheduleInterviewSubmit}
            disabled={schedulingInterview || !interviewDate}
            startIcon={schedulingInterview ? <CircularProgress size={16} color="inherit" /> : null}
            sx={{ bgcolor: '#6929e2', textTransform: 'none', fontWeight: 700, borderRadius: '8px' }}
          >
            {schedulingInterview ? 'Scheduling...' : 'Schedule'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Application Confirmation Dialog */}
      <Dialog
        open={Boolean(deleteConfirmApp)}
        onClose={() => !deleting && setDeleteConfirmApp(null)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: 17, color: '#111827' }}>Delete Application?</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <Typography sx={{ fontSize: 13.5, color: '#4b5563' }}>
            Are you sure you want to delete <strong>{deleteConfirmApp?.id}</strong> ({deleteConfirmApp?.name})?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteConfirmApp(null)} disabled={deleting} sx={{ textTransform: 'none', color: '#6b7280' }}>Cancel</Button>
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

      {/* Full-Screen Application View Dialog */}
      <Dialog
        fullScreen
        open={Boolean(fullScreenApp)}
        onClose={() => setFullScreenApp(null)}
        PaperProps={{ sx: { bgcolor: '#f8fafc' } }}
      >
        {fullScreenApp && (
          <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Top Bar */}
            <Box
              sx={{
                px: { xs: 2, sm: 4 },
                py: 2,
                bgcolor: '#ffffff',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 2
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src={fullScreenApp.avatar} sx={{ width: 56, height: 56, border: '2px solid #ede9fe' }} />
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                    <Typography sx={{ fontWeight: 800, fontSize: 20, color: '#111827' }}>{fullScreenApp.name}</Typography>
                    {getStageChip(fullScreenApp.stage)}
                    <Chip
                      label={fullScreenApp.matchScore > 0 ? `${fullScreenApp.matchScore}% ATS Match` : 'Pending Resume'}
                      size="small"
                      sx={{
                        bgcolor: fullScreenApp.matchScore > 0 ? '#ecfdf5' : '#f1f5f9',
                        color: fullScreenApp.matchScore > 0 ? '#059669' : '#64748b',
                        fontWeight: 700,
                        fontSize: 11
                      }}
                    />
                  </Stack>
                  <Typography sx={{ fontSize: 13.5, color: '#4b5563', fontWeight: 600 }}>
                    Applied for {fullScreenApp.role} ({fullScreenApp.jobCode}) • {fullScreenApp.dept} • {fullScreenApp.exp}
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                <Button
                  variant="contained"
                  size="small"
                  onClick={async () => {
                    await handleStageUpdate(fullScreenApp, 'shortlisted', `${fullScreenApp.name} moved to Shortlisted!`, 'success');
                    setFullScreenApp((prev) => (prev ? { ...prev, stage: 'Shortlisted' } : null));
                  }}
                  sx={{ bgcolor: '#059669', textTransform: 'none', fontWeight: 700, borderRadius: '8px', '&:hover': { bgcolor: '#047857' } }}
                >
                  Move to Shortlisted
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<CalendarOutlined />}
                  onClick={() => {
                    setInterviewTargetApp(fullScreenApp);
                    setInterviewDate('');
                    setInterviewNotes('');
                    setInterviewDialogOpen(true);
                  }}
                  sx={{ textTransform: 'none', fontWeight: 700, borderRadius: '8px', borderColor: '#ddd6fe', color: '#6929e2' }}
                >
                  Schedule Interview
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={async () => {
                    await handleStageUpdate(fullScreenApp, 'offered', `Offer sent to ${fullScreenApp.name}!`, 'success');
                    setFullScreenApp((prev) => (prev ? { ...prev, stage: 'Offer' } : null));
                  }}
                  sx={{ textTransform: 'none', fontWeight: 700, borderRadius: '8px' }}
                >
                  Send Offer
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  onClick={async () => {
                    await handleStageUpdate(fullScreenApp, 'rejected', `Application for ${fullScreenApp.name} rejected.`, 'error');
                    setFullScreenApp((prev) => (prev ? { ...prev, stage: 'Rejected' } : null));
                  }}
                  sx={{ textTransform: 'none', fontWeight: 700, borderRadius: '8px' }}
                >
                  Reject
                </Button>
                <IconButton onClick={() => setFullScreenApp(null)} sx={{ ml: 1, bgcolor: '#f1f5f9' }}>
                  <CloseOutlined style={{ fontSize: 16 }} />
                </IconButton>
              </Stack>
            </Box>

            {/* Full-Screen Body */}
            <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: 1200, width: '100%', mx: 'auto' }}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card sx={{ p: 3, borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <Typography sx={{ fontWeight: 800, fontSize: 15, color: '#111827', mb: 2 }}>Applicant Details</Typography>
                    <Stack spacing={1.5}>
                      <Box>
                        <Typography sx={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>Email Address</Typography>
                        <Typography sx={{ fontSize: 13.5, fontWeight: 600, color: '#2563eb' }}>{fullScreenApp.email}</Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>Phone Number</Typography>
                        <Typography sx={{ fontSize: 13.5, fontWeight: 600, color: '#111827' }}>{fullScreenApp.phone}</Typography>
                      </Box>
                      <Divider />
                      <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontSize: 12, color: '#64748b' }}>Location</Typography>
                        <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: '#111827' }}>{fullScreenApp.location}</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontSize: 12, color: '#64748b' }}>Experience</Typography>
                        <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: '#111827' }}>{fullScreenApp.exp}</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontSize: 12, color: '#64748b' }}>Applied On</Typography>
                        <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: '#111827' }}>{fullScreenApp.appliedOn}</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontSize: 12, color: '#64748b' }}>Application ID</Typography>
                        <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: '#111827' }}>{fullScreenApp.id}</Typography>
                      </Stack>
                    </Stack>
                  </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>
                  <Stack spacing={3}>
                    <Card sx={{ p: 3, borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                      <Typography sx={{ fontWeight: 800, fontSize: 15, color: '#111827', mb: 2 }}>ATS Match Analysis</Typography>
                      <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: 2.5 }}>
                        <Box
                          sx={{
                            width: 84,
                            height: 84,
                            borderRadius: '50%',
                            border: `6px solid ${fullScreenApp.matchScore >= 75 ? '#10b981' : fullScreenApp.matchScore > 0 ? '#f59e0b' : '#cbd5e1'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: 20,
                            color: '#111827',
                            bgcolor: '#f8fafc',
                            flexShrink: 0
                          }}
                        >
                          {fullScreenApp.matchScore > 0 ? `${fullScreenApp.matchScore}%` : 'N/A'}
                        </Box>
                        <Box>
                          <Typography sx={{ fontWeight: 800, fontSize: 15, color: '#111827' }}>
                            {fullScreenApp.matchScore >= 80
                              ? 'Excellent Match'
                              : fullScreenApp.matchScore >= 60
                              ? 'Good Match'
                              : fullScreenApp.matchScore > 0
                              ? 'Needs Review'
                              : 'Resume Required for ATS Score'}
                          </Typography>
                          <Typography sx={{ fontSize: 13, color: '#64748b', mt: 0.5 }}>
                            Calculated from candidate skills, experience, and job requirements.
                          </Typography>
                        </Box>
                      </Stack>

                      <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#111827', mb: 1 }}>Skills</Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {fullScreenApp.matchedSkills.map((skill) => (
                          <Chip key={skill} label={skill} sx={{ bgcolor: '#f3edff', color: '#530EF0', fontWeight: 700, fontSize: 12 }} />
                        ))}
                      </Stack>
                    </Card>

                    <Card sx={{ p: 3, borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
                        <Box>
                          <Typography sx={{ fontWeight: 800, fontSize: 15, color: '#111827' }}>Resume</Typography>
                          <Typography sx={{ fontSize: 13, color: '#64748b', mt: 0.5 }}>
                            {fullScreenApp.resumeName ? `${fullScreenApp.resumeName} (${fullScreenApp.resumeSize})` : 'No resume uploaded yet'}
                          </Typography>
                        </Box>
                        <Stack direction="row" spacing={1}>
                          {fullScreenApp.resumeName && (
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => setResumeViewerCandidate(fullScreenApp)}
                              sx={{ textTransform: 'none', fontWeight: 700, borderRadius: '8px' }}
                            >
                              View Resume
                            </Button>
                          )}
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<UploadOutlined />}
                            onClick={() => {
                              setUploadTargetAppId(fullScreenApp.dbId);
                              setUploadFile(null);
                              setUploadDialogOpen(true);
                            }}
                            sx={{ textTransform: 'none', fontWeight: 700, borderRadius: '8px', borderColor: '#ddd6fe', color: '#6929e2' }}
                          >
                            {fullScreenApp.resumeName ? 'Replace Resume' : 'Upload Resume'}
                          </Button>
                        </Stack>
                      </Stack>
                    </Card>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}
      </Dialog>

      {/* Snackbar */}
      <FullScreenResumeDialog
        open={Boolean(resumeViewerCandidate)}
        onClose={() => setResumeViewerCandidate(null)}
        candidate={resumeViewerCandidate}
      />

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ borderRadius: '10px', fontWeight: 600 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

