import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

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

// project imports
import {
  getCandidates,
  createCandidate,
  updateCandidate,
  updateCandidateStatus,
  deleteCandidate,
  uploadCandidateResume,
  importCandidates
} from 'api/adminCandidates';

// icons
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import UploadOutlined from '@ant-design/icons/UploadOutlined';
import ImportOutlined from '@ant-design/icons/ImportOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import FilterOutlined from '@ant-design/icons/FilterOutlined';
import MoreOutlined from '@ant-design/icons/MoreOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import UserAddOutlined from '@ant-design/icons/UserAddOutlined';
import TrophyOutlined from '@ant-design/icons/TrophyOutlined';
import MailOutlined from '@ant-design/icons/MailOutlined';
import PhoneOutlined from '@ant-design/icons/PhoneOutlined';
import LinkedinFilled from '@ant-design/icons/LinkedinFilled';
import GithubOutlined from '@ant-design/icons/GithubOutlined';
import FullscreenOutlined from '@ant-design/icons/FullscreenOutlined';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import DownloadOutlined from '@ant-design/icons/DownloadOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EnvironmentOutlined from '@ant-design/icons/EnvironmentOutlined';
import FilePdfOutlined from '@ant-design/icons/FilePdfOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';

// avatar assets
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import avatar5 from 'assets/images/users/avatar-5.png';

// initial mock candidates
const initialCandidates = [
  {
    id: 'CAND-001',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43210',
    avatar: avatar1,
    role: 'Software Engineer',
    exp: '2+ yrs',
    skills: ['React', 'Node.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
    extraSkillsCount: 2,
    location: 'Bengaluru',
    source: 'LinkedIn',
    status: 'Active',
    addedOn: 'Oct 21, 2025',
    about: 'Passionate Software Engineer with 2+ years of experience in building scalable web applications. Skilled in React, Node.js and TypeScript with a strong focus on clean code and great user experiences.',
    availability: 'Immediate',
    salary: 'Open to discussion',
    prefLocation: 'Bengaluru / Remote',
    education: { degree: 'B.E. in Computer Science', school: 'Anna University, Chennai', period: '2019 - 2023' },
    experience: { title: 'Software Engineer', company: 'TechSolutions Pvt. Ltd.', period: 'Jun 2023 - Present • 2 yrs 4 mos' },
    resumeName: 'Priya_Sharma_Resume.pdf',
    resumeSize: '2.4 MB'
  },
  {
    id: 'CAND-002',
    name: 'Rahul Kumar',
    email: 'rahul.kumar@email.com',
    phone: '+91 98765 11223',
    avatar: avatar2,
    role: 'Frontend Developer',
    exp: '3+ yrs',
    skills: ['React', 'TypeScript', 'Redux', 'Tailwind'],
    extraSkillsCount: 1,
    location: 'Chennai',
    source: 'Naukri',
    status: 'Active',
    addedOn: 'Oct 20, 2025',
    about: 'Frontend specialist focused on responsive UI, design system development, and web performance optimization.',
    availability: '15 Days',
    salary: '₹14 - 18 LPA',
    prefLocation: 'Chennai / Hybrid',
    education: { degree: 'B.Tech in IT', school: 'SRM Institute of Science', period: '2018 - 2022' },
    experience: { title: 'Frontend Developer', company: 'Digital Waves Ltd', period: 'Jul 2022 - Present' },
    resumeName: 'Rahul_Kumar_CV.pdf',
    resumeSize: '1.8 MB'
  },
  {
    id: 'CAND-003',
    name: 'Sneha Iyer',
    email: 'sneha.iyer@email.com',
    phone: '+91 98765 33445',
    avatar: avatar3,
    role: 'Data Analyst',
    exp: '2+ yrs',
    skills: ['SQL', 'Python', 'Power BI', 'Excel'],
    extraSkillsCount: 2,
    location: 'Hyderabad',
    source: 'Indeed',
    status: 'In Process',
    addedOn: 'Oct 20, 2025',
    about: 'Data analyst passionate about business intelligence dashboards, statistical metrics, and predictive insights.',
    availability: '30 Days',
    salary: '₹12 - 15 LPA',
    prefLocation: 'Hyderabad',
    education: { degree: 'B.Sc Statistics', school: 'Osmania University', period: '2019 - 2022' },
    experience: { title: 'Data Analyst', company: 'Metrics Co', period: 'Aug 2022 - Present' },
    resumeName: 'Sneha_Resume.pdf',
    resumeSize: '2.1 MB'
  },
  {
    id: 'CAND-004',
    name: 'Arjun Nair',
    email: 'arjun.nair@email.com',
    phone: '+91 98765 55667',
    avatar: avatar1,
    role: 'Backend Developer',
    exp: '4+ yrs',
    skills: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
    extraSkillsCount: 1,
    location: 'Chennai',
    source: 'Referral',
    status: 'Shortlisted',
    addedOn: 'Oct 19, 2025',
    about: 'Senior Backend Engineer experienced in distributed microservices, low-latency APIs, and cloud deployments.',
    availability: 'Immediate',
    salary: '₹22 - 26 LPA',
    prefLocation: 'Chennai / Bengaluru',
    education: { degree: 'M.Tech CSE', school: 'IIT Madras', period: '2017 - 2021' },
    experience: { title: 'Backend Lead', company: 'CloudScale Corp', period: 'Jan 2021 - Present' },
    resumeName: 'Arjun_Nair_Resume.pdf',
    resumeSize: '3.0 MB'
  },
  {
    id: 'CAND-005',
    name: 'Vikram Singh',
    email: 'vikram.singh@email.com',
    phone: '+91 98765 77889',
    avatar: avatar5,
    role: 'Full Stack Developer',
    exp: '3+ yrs',
    skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
    extraSkillsCount: 2,
    location: 'Bengaluru',
    source: 'Company Website',
    status: 'Active',
    addedOn: 'Oct 18, 2025',
    about: 'Full-stack software engineer with end-to-end web architecture and cloud deployment expertise.',
    availability: '30 Days',
    salary: '₹18 - 22 LPA',
    prefLocation: 'Bengaluru',
    education: { degree: 'B.E. Information Science', school: 'BMS College of Engineering', period: '2018 - 2022' },
    experience: { title: 'Software Engineer', company: 'AppWorks Studio', period: 'Aug 2022 - Present' },
    resumeName: 'Vikram_CV.pdf',
    resumeSize: '1.9 MB'
  },
  {
    id: 'CAND-006',
    name: 'Meera Joshi',
    email: 'meera.joshi@email.com',
    phone: '+91 98765 99001',
    avatar: avatar4,
    role: 'QA Engineer',
    exp: '2+ yrs',
    skills: ['Selenium', 'TestNG', 'Cypress', 'Jira'],
    extraSkillsCount: 1,
    location: 'Pune',
    source: 'Naukri',
    status: 'Interview',
    addedOn: 'Oct 18, 2025',
    about: 'Quality assurance engineer experienced in building scalable automated regression suites and load tests.',
    availability: 'Immediate',
    salary: '₹10 - 13 LPA',
    prefLocation: 'Pune / Remote',
    education: { degree: 'B.E. Computer Science', school: 'Pune University', period: '2019 - 2023' },
    experience: { title: 'QA Analyst', company: 'TestFirst Tech', period: 'Jul 2023 - Present' },
    resumeName: 'Meera_Joshi_Resume.pdf',
    resumeSize: '2.2 MB'
  },
  {
    id: 'CAND-007',
    name: 'Siddharth Verma',
    email: 'siddharth.verma@email.com',
    phone: '+91 98765 22334',
    avatar: avatar1,
    role: 'DevOps Engineer',
    exp: '4+ yrs',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
    extraSkillsCount: 2,
    location: 'Hyderabad',
    source: 'LinkedIn',
    status: 'Active',
    addedOn: 'Oct 17, 2025',
    about: 'Infrastructure engineer automating CI/CD pipelines, container orchestration, and multi-region AWS environments.',
    availability: '1 Month',
    salary: '₹20 - 24 LPA',
    prefLocation: 'Hyderabad',
    education: { degree: 'B.Tech IT', school: 'JNTU Hyderabad', period: '2017 - 2021' },
    experience: { title: 'DevOps Engineer', company: 'InfraSphere', period: 'May 2021 - Present' },
    resumeName: 'Siddharth_DevOps.pdf',
    resumeSize: '2.5 MB'
  },
  {
    id: 'CAND-008',
    name: 'Ananya Rao',
    email: 'ananya.rao@email.com',
    phone: '+91 98765 44556',
    avatar: avatar2,
    role: 'Product Designer',
    exp: '3+ yrs',
    skills: ['Figma', 'UI/UX', 'Design Systems', 'Prototyping'],
    extraSkillsCount: 1,
    location: 'Mumbai',
    source: 'Job Board',
    status: 'Inactive',
    addedOn: 'Oct 16, 2025',
    about: 'Product designer shaping human-centered enterprise web tools, user workflows, and cohesive design libraries.',
    availability: '60 Days',
    salary: '₹16 - 20 LPA',
    prefLocation: 'Mumbai / Remote',
    education: { degree: 'B.Des', school: 'NID Ahmedabad', period: '2018 - 2022' },
    experience: { title: 'UI/UX Designer', company: 'PixelCraft', period: 'Sep 2022 - Present' },
    resumeName: 'Ananya_Design_Portfolio.pdf',
    resumeSize: '4.2 MB'
  },
  {
    id: 'CAND-009',
    name: 'Deepak Patel',
    email: 'deepak.patel@email.com',
    phone: '+91 98765 66778',
    avatar: avatar5,
    role: 'System Administrator',
    exp: '5+ yrs',
    skills: ['Linux', 'Windows', 'Networking', 'Security'],
    extraSkillsCount: 1,
    location: 'Chennai',
    source: 'Referral',
    status: 'Active',
    addedOn: 'Oct 15, 2025',
    about: 'Systems architect specialized in network infrastructure, enterprise firewalls, and server uptime.',
    availability: 'Immediate',
    salary: '₹15 - 19 LPA',
    prefLocation: 'Chennai',
    education: { degree: 'B.Sc Computer Science', school: 'Madras University', period: '2016 - 2019' },
    experience: { title: 'Senior SysAdmin', company: 'NetCore Ltd', period: 'Aug 2019 - Present' },
    resumeName: 'Deepak_Patel_CV.pdf',
    resumeSize: '1.7 MB'
  },
  {
    id: 'CAND-010',
    name: 'Riya Menon',
    email: 'riya.menon@email.com',
    phone: '+91 98765 88990',
    avatar: avatar3,
    role: 'Data Scientist',
    exp: '3+ yrs',
    skills: ['Python', 'Pandas', 'Scikit-Learn', 'NLP'],
    extraSkillsCount: 2,
    location: 'Bengaluru',
    source: 'LinkedIn',
    status: 'Active',
    addedOn: 'Oct 15, 2025',
    about: 'Machine learning scientist specializing in text categorization, NLP recommendation systems, and data pipelines.',
    availability: '15 Days',
    salary: '₹20 - 25 LPA',
    prefLocation: 'Bengaluru / Remote',
    education: { degree: 'M.Sc Data Science', school: 'Christ University', period: '2019 - 2021' },
    experience: { title: 'Data Scientist', company: 'InnoAI Labs', period: 'Oct 2021 - Present' },
    resumeName: 'Riya_Menon_Resume.pdf',
    resumeSize: '2.8 MB'
  }
];

const CAND_STATUS_LABELS = {
  active: 'Active',
  in_process: 'In Process',
  shortlisted: 'Shortlisted',
  interview: 'Interview',
  hired: 'Hired',
  inactive: 'Inactive'
};

const CAND_AVATARS = [avatar1, avatar2, avatar3, avatar4, avatar5];

function mapBackendCandidate(item) {
  const rawStatus = String(item?.status || 'active').toLowerCase();
  const skillsList = String(item?.skills || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const addedOn = item?.created_at
    ? new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Just now';

  return {
    dbId: item?.id,
    id: `CAND-${String(item?.id || 1).padStart(3, '0')}`,
    name: item?.name || 'Candidate',
    email: item?.email || '',
    phone: item?.phone || '—',
    avatar: item?.photo_url || CAND_AVATARS[(Number(item?.id) || 0) % CAND_AVATARS.length],
    photoUrl: item?.photo_url || '',
    role: item?.current_role || 'Software Engineer',
    dept: item?.department || 'Engineering',
    exp: item?.experience || '2+ yrs',
    skills: skillsList.slice(0, 2),
    allSkills: skillsList,
    extraSkillsCount: Math.max(0, skillsList.length - 2),
    location: item?.location || 'Bengaluru',
    source: item?.source || 'TraceU',
    status: CAND_STATUS_LABELS[rawStatus] || 'Active',
    inTalentPool: Boolean(item?.in_talent_pool),
    addedOn,
    createdAt: item?.created_at,
    about: `${item?.current_role || 'Candidate'} with ${item?.experience || '2+ yrs'} of experience based in ${item?.location || 'Bengaluru'}.`,
    availability: 'Immediate',
    salary: 'Negotiable',
    prefLocation: item?.location || 'Bengaluru',
    education: { degree: 'B.Tech / B.E.', school: 'University', period: 'Completed' },
    experience: { title: item?.current_role || 'Software Engineer', company: 'Current / Previous', period: item?.experience || '2+ yrs' },
    resumeName: item?.resume_name || '',
    resumeSize: item?.resume_size || '',
    resumeUrl: item?.resume_url || '',
    githubUrl: item?.github_url || '',
    linkedinUrl: item?.linkedin_url || ''
  };
}

export default function AdminCandidates() {
  const navigate = useNavigate();

  // state
  const [candidates, setCandidates] = useState([]);
  const [loadingCandidates, setLoadingCandidates] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingCand, setEditingCand] = useState(null);
  const [fullProfileCand, setFullProfileCand] = useState(null);
  const [deleteConfirmCand, setDeleteConfirmCand] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // upload resume modal state
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadTargetId, setUploadTargetId] = useState('');
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadingResume, setUploadingResume] = useState(false);

  // import candidates modal state
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [importText, setImportText] = useState('');
  const [importFileName, setImportFileName] = useState('');
  const [importRowsFromFile, setImportRowsFromFile] = useState(null);
  const [importing, setImporting] = useState(false);

  // sort & more filters
  const [sortBy, setSortBy] = useState('newest');
  const [sortAnchor, setSortAnchor] = useState(null);
  const [sourceFilter, setSourceFilter] = useState('ALL');
  const [moreFiltersAnchor, setMoreFiltersAnchor] = useState(null);

  const [selectedCand, setSelectedCand] = useState(null);
  const [candTab, setCandTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [locFilter, setLocFilter] = useState('ALL');
  const [expFilter, setExpFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(1);
  const [previewTab, setPreviewTab] = useState(0);

  // dialog & notifications
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [menuTarget, setMenuTarget] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // form state (all columns from 1st image)
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newRole, setNewRole] = useState('Software Engineer');
  const [newDept, setNewDept] = useState('Engineering');
  const [newExp, setNewExp] = useState('2+ yrs');
  const [newSkills, setNewSkills] = useState('');
  const [newLoc, setNewLoc] = useState('Bengaluru');
  const [newSource, setNewSource] = useState('LinkedIn');
  const [newStatus, setNewStatus] = useState('Active');
  const [newGithub, setNewGithub] = useState('');
  const [newLinkedin, setNewLinkedin] = useState('');
  const [newPhoto, setNewPhoto] = useState('');
  const [addErrors, setAddErrors] = useState({});

  useEffect(() => {
    let cancelled = false;
    setLoadingCandidates(true);
    getCandidates()
      .then((res) => {
        if (cancelled) return;
        const list = Array.isArray(res?.data) ? res.data : [];
        setCandidates(list.map(mapBackendCandidate));
      })
      .catch((err) => {
        if (cancelled) return;
        setSnackbar({
          open: true,
          message: err.message || 'Failed to load candidates from server',
          severity: 'error'
        });
      })
      .finally(() => {
        if (!cancelled) setLoadingCandidates(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // counts
  const totalCount = candidates.length;
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const newThisWeekCount = candidates.filter((c) => !c.createdAt || new Date(c.createdAt).getTime() >= sevenDaysAgo).length;
  const activeCount = candidates.filter((c) => c.status === 'Active').length;
  const inProcessCount = candidates.filter((c) => c.status === 'In Process' || c.status === 'Shortlisted').length;
  const hiredCount = candidates.filter((c) => c.status === 'Hired').length;
  const notContactedCount = candidates.filter((c) => c.status === 'Interview').length;

  // filter & sort candidates
  const filteredCandidates = useMemo(() => {
    const filtered = candidates.filter((c) => {
      const matchTab =
        candTab === 'ALL' ||
        (candTab === 'Active' && c.status === 'Active') ||
        (candTab === 'Passive' && (c.status === 'In Process' || c.status === 'Shortlisted')) ||
        (candTab === 'NotContacted' && c.status === 'Interview');
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        (c.phone || '').toLowerCase().includes(q) ||
        c.role.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        (c.allSkills || c.skills).some((s) => s.toLowerCase().includes(q));
      const matchDept = deptFilter === 'ALL' || (c.dept || '').toLowerCase().includes(deptFilter.toLowerCase());
      const matchLoc = locFilter === 'ALL' || c.location === locFilter;
      const matchStatus = statusFilter === 'ALL' || c.status === statusFilter;
      const matchSource = sourceFilter === 'ALL' || c.source === sourceFilter;
      const matchExp = expFilter === 'ALL' || (c.exp || '').toLowerCase().includes(expFilter.toLowerCase());
      return matchTab && matchSearch && matchDept && matchLoc && matchStatus && matchSource && matchExp;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'oldest') return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });
  }, [candidates, candTab, searchQuery, deptFilter, locFilter, statusFilter, sourceFilter, expFilter, sortBy]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = filteredCandidates.map((c) => c.id);
      setSelectedRows(allIds);
      if (filteredCandidates.length > 0) setSelectedCand(filteredCandidates[0]);
    } else {
      setSelectedRows([]);
      setSelectedCand(null);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      const next = selectedRows.filter((r) => r !== id);
      setSelectedRows(next);
      if (selectedCand?.id === id) {
        const remaining = filteredCandidates.find((c) => next.includes(c.id));
        setSelectedCand(remaining || null);
      }
    } else {
      setSelectedRows([...selectedRows, id]);
      const foundCand = candidates.find((c) => c.id === id);
      if (foundCand) setSelectedCand(foundCand);
    }
  };

  const handleRowClick = (cand) => {
    const id = cand.id;
    if (selectedCand?.id === id && selectedRows.includes(id)) {
      setSelectedCand(null);
      setSelectedRows((prev) => prev.filter((r) => r !== id));
    } else {
      setSelectedCand(cand);
      setSelectedRows((prev) => (prev.includes(id) ? prev : [...prev, id]));
    }
  };

  const resetCandidateForm = () => {
    setEditingCand(null);
    setNewName('');
    setNewEmail('');
    setNewPhone('');
    setNewRole('Software Engineer');
    setNewDept('Engineering');
    setNewExp('2+ yrs');
    setNewSkills('');
    setNewLoc('Bengaluru');
    setNewSource('LinkedIn');
    setNewStatus('Active');
    setNewGithub('');
    setNewLinkedin('');
    setNewPhoto('');
    setAddErrors({});
  };

  const handleOpenEdit = (cand) => {
    setEditingCand(cand);
    setNewName(cand.name || '');
    setNewEmail(cand.email || '');
    setNewPhone(cand.phone === '—' ? '' : cand.phone || '');
    setNewRole(cand.role || 'Software Engineer');
    setNewDept(cand.dept || 'Engineering');
    setNewExp(cand.exp || '2+ yrs');
    setNewSkills((cand.allSkills || cand.skills || []).join(', '));
    setNewLoc(cand.location || 'Bengaluru');
    setNewSource(cand.source || 'LinkedIn');
    setNewStatus(cand.status || 'Active');
    setNewGithub(cand.githubUrl || '');
    setNewLinkedin(cand.linkedinUrl || '');
    setNewPhoto(cand.photoUrl || '');
    setAddErrors({});
    setAddDialogOpen(true);
  };

  const handleAddSubmit = async () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const urlRegex = /^https?:\/\/.+/i;

    if (!newName.trim()) {
      errors.name = 'Full Name is required';
    } else if (newName.trim().length < 2) {
      errors.name = 'Full Name must be at least 2 characters';
    }

    if (!newEmail.trim()) {
      errors.email = 'Email Address is required';
    } else if (!emailRegex.test(newEmail.trim())) {
      errors.email = 'Must be a valid email address';
    }

    const phoneDigits = newPhone.replace(/\D/g, '');
    if (!newPhone.trim()) {
      errors.phone = 'Phone Number is required';
    } else if (phoneDigits.length < 7) {
      errors.phone = 'Enter a valid phone number';
    }

    const skillsArr = newSkills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (skillsArr.length < 4) {
      errors.skills = `At least 4 comma-separated skills are required (currently ${skillsArr.length})`;
    }

    if (!newGithub.trim()) {
      errors.github = 'GitHub link is required';
    } else if (!urlRegex.test(newGithub.trim())) {
      errors.github = 'Must be a valid URL starting with http:// or https://';
    }

    if (!newLinkedin.trim()) {
      errors.linkedin = 'LinkedIn link is required';
    } else if (!urlRegex.test(newLinkedin.trim())) {
      errors.linkedin = 'Must be a valid URL starting with http:// or https://';
    }

    if (Object.keys(errors).length > 0) {
      setAddErrors(errors);
      setSnackbar({ open: true, message: 'Please fill all required fields correctly', severity: 'warning' });
      return;
    }

    const payload = {
      name: newName.trim(),
      email: newEmail.trim(),
      phone: newPhone.trim(),
      current_role: newRole.trim() || 'Software Engineer',
      department: newDept,
      experience: newExp.trim() || '2+ yrs',
      skills: skillsArr.join(', '),
      location: newLoc,
      source: newSource,
      status: newStatus,
      github_url: newGithub.trim(),
      linkedin_url: newLinkedin.trim(),
      photo_url: newPhoto.trim()
    };

    setSubmitting(true);
    try {
      if (editingCand?.dbId) {
        const res = await updateCandidate(editingCand.dbId, payload);
        const updated = mapBackendCandidate(res.data);
        setCandidates((prev) => prev.map((c) => (c.dbId === editingCand.dbId ? updated : c)));
        if (selectedCand?.dbId === editingCand.dbId) setSelectedCand(updated);
        setSnackbar({ open: true, message: `Candidate ${updated.name} updated!`, severity: 'success' });
      } else {
        const res = await createCandidate(payload);
        const created = mapBackendCandidate(res.data);
        setCandidates((prev) => [created, ...prev]);
        setSelectedCand(created);
        setSnackbar({ open: true, message: `Candidate ${created.name} added!`, severity: 'success' });
      }
      setAddDialogOpen(false);
      resetCandidateForm();
    } catch (err) {
      setSnackbar({ open: true, message: err.message || 'Failed to save candidate', severity: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCandidateStatusUpdate = async (cand, { status, inTalentPool }, successMessage, severity = 'success') => {
    if (!cand?.dbId) return;
    try {
      const res = await updateCandidateStatus(cand.dbId, { status, inTalentPool });
      const updated = mapBackendCandidate(res.data);
      setCandidates((prev) => prev.map((c) => (c.dbId === cand.dbId ? updated : c)));
      if (selectedCand?.dbId === cand.dbId) setSelectedCand(updated);
      setSnackbar({ open: true, message: successMessage, severity });
    } catch (err) {
      setSnackbar({ open: true, message: err.message || 'Failed to update candidate', severity: 'error' });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirmCand?.dbId) return;
    setDeleting(true);
    try {
      await deleteCandidate(deleteConfirmCand.dbId);
      setCandidates((prev) => prev.filter((c) => c.dbId !== deleteConfirmCand.dbId));
      if (selectedCand?.dbId === deleteConfirmCand.dbId) setSelectedCand(null);
      setSnackbar({ open: true, message: `Candidate ${deleteConfirmCand.name} deleted.`, severity: 'info' });
      setDeleteConfirmCand(null);
    } catch (err) {
      setSnackbar({ open: true, message: err.message || 'Failed to delete candidate', severity: 'error' });
    } finally {
      setDeleting(false);
    }
  };

  const handleUploadResumeSubmit = async () => {
    if (!uploadFile) {
      setSnackbar({ open: true, message: 'Please attach a resume file.', severity: 'warning' });
      return;
    }
    setUploadingResume(true);
    try {
      const res = await uploadCandidateResume(uploadTargetId || null, uploadFile);
      const updated = mapBackendCandidate(res.data);
      setCandidates((prev) => {
        const exists = prev.some((c) => c.dbId === updated.dbId);
        return exists ? prev.map((c) => (c.dbId === updated.dbId ? updated : c)) : [updated, ...prev];
      });
      setSelectedCand(updated);
      setUploadDialogOpen(false);
      setUploadTargetId('');
      setUploadFile(null);
      setSnackbar({ open: true, message: `Resume uploaded for ${updated.name}!`, severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: err.message || 'Failed to upload resume', severity: 'error' });
    } finally {
      setUploadingResume(false);
    }
  };

  const mapImportedRow = (row) => {
    const normalized = {};
    Object.entries(row || {}).forEach(([k, v]) => {
      normalized[String(k).trim().toLowerCase()] = String(v ?? '').trim();
    });
    return {
      name: normalized.name || normalized['full name'] || normalized.candidate || '',
      email: normalized.email || normalized['email address'] || '',
      phone: normalized.phone || normalized['phone number'] || normalized.mobile || '',
      current_role: normalized.role || normalized['current role'] || normalized.current_role || 'Software Engineer',
      department: normalized.department || normalized.dept || 'Engineering',
      experience: normalized.experience || normalized.exp || '2+ yrs',
      skills: (normalized.skills || '').replace(/\|/g, ', '),
      location: normalized.location || 'Bengaluru',
      source: normalized.source || 'Import',
      status: normalized.status || 'Active'
    };
  };

  const handleImportFileChange = async (file) => {
    if (!file) return;
    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: 'array' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonRows = XLSX.utils.sheet_to_json(firstSheet, { defval: '' });
      const mapped = jsonRows.map(mapImportedRow).filter((r) => r.name && r.email);
      setImportFileName(file.name);
      setImportRowsFromFile(mapped);
      const csvPreview = XLSX.utils.sheet_to_csv(firstSheet);
      setImportText(csvPreview);
      setSnackbar({
        open: true,
        message: `Parsed ${mapped.length} candidate(s) from ${file.name}`,
        severity: 'info'
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || 'Failed to read Excel/CSV file',
        severity: 'error'
      });
    }
  };

  const handleImportSubmit = async () => {
    let parsed = importRowsFromFile;
    if (!parsed || parsed.length === 0) {
      const trimmed = importText.trim();
      if (!trimmed) {
        setSnackbar({ open: true, message: 'Please choose an Excel/CSV file or paste CSV rows.', severity: 'warning' });
        return;
      }
      const workbook = XLSX.read(trimmed, { type: 'string' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonRows = XLSX.utils.sheet_to_json(firstSheet, { defval: '' });
      parsed = jsonRows.map(mapImportedRow).filter((r) => r.name && r.email);
    }

    if (parsed.length === 0) {
      setSnackbar({ open: true, message: 'No valid candidate rows found (Name and Email are required).', severity: 'warning' });
      return;
    }

    setImporting(true);
    try {
      const res = await importCandidates(parsed);
      const imported = Array.isArray(res?.data?.candidates) ? res.data.candidates.map(mapBackendCandidate) : [];
      if (imported.length > 0) {
        setCandidates((prev) => [...imported, ...prev]);
      }
      setImportDialogOpen(false);
      setImportText('');
      setImportFileName('');
      setImportRowsFromFile(null);
      setSnackbar({
        open: true,
        message: res?.message || `Imported ${imported.length} candidates!`,
        severity: 'success'
      });
    } catch (err) {
      setSnackbar({ open: true, message: err.message || 'Failed to import candidates', severity: 'error' });
    } finally {
      setImporting(false);
    }
  };

  const getStatusChip = (status) => {
    switch (status) {
      case 'Active':
        return (
          <Chip
            label="Active"
            size="small"
            sx={{ bgcolor: '#ecfdf5', color: '#059669', fontWeight: 700, fontSize: 11, border: '1px solid #a7f3d0' }}
          />
        );
      case 'In Process':
        return (
          <Chip
            label="In Process"
            size="small"
            sx={{ bgcolor: '#eff6ff', color: '#2563eb', fontWeight: 700, fontSize: 11, border: '1px solid #bfdbfe' }}
          />
        );
      case 'Shortlisted':
        return (
          <Chip
            label="Shortlisted"
            size="small"
            sx={{ bgcolor: '#f0fdf4', color: '#16a34a', fontWeight: 700, fontSize: 11, border: '1px solid #bbf7d0' }}
          />
        );
      case 'Interview':
        return (
          <Chip
            label="Interview"
            size="small"
            sx={{ bgcolor: '#fffbeb', color: '#d97706', fontWeight: 700, fontSize: 11, border: '1px solid #fde68a' }}
          />
        );
      case 'Hired':
        return (
          <Chip
            label="Hired"
            size="small"
            sx={{ bgcolor: '#f5f3ff', color: '#6929e2', fontWeight: 700, fontSize: 11, border: '1px solid #ddd6fe' }}
          />
        );
      case 'Inactive':
        return (
          <Chip
            label="Inactive"
            size="small"
            sx={{ bgcolor: '#fef2f2', color: '#dc2626', fontWeight: 700, fontSize: 11, border: '1px solid #fecaca' }}
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
            <TeamOutlined />
          </Box>
          <Typography sx={{ color: '#6929e2', fontWeight: 700, fontSize: 13 }}>
            Candidates
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
              Candidate Management
            </Typography>
            <Typography sx={{ color: '#6b7280', fontSize: 13, lineHeight: 1.45 }}>
              Manage candidate profiles, resumes, skills, qualifications and application history.
            </Typography>
          </Box>

          <Stack direction="row" spacing={1.5} alignItems="center" flexShrink={0}>
            <Button
              variant="contained"
              startIcon={<PlusOutlined />}
              onClick={() => {
                resetCandidateForm();
                setAddDialogOpen(true);
              }}
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
              Add Candidate
            </Button>
            <Button
              variant="outlined"
              startIcon={<UploadOutlined />}
              onClick={() => {
                setUploadTargetId(selectedCand?.dbId || '');
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
                whiteSpace: 'nowrap',
                px: 2,
                '&:hover': { borderColor: '#CBD5E1', bgcolor: '#F8FAFC' }
              }}
            >
              Upload Resume
            </Button>
            <Button
              variant="outlined"
              startIcon={<ImportOutlined />}
              onClick={() => setImportDialogOpen(true)}
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
              Import Candidates
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* ========================================================================= */}
      {/* 2. TOP 6 KPI CARDS                                                        */}
      {/* ========================================================================= */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* Total Candidates */}
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
                <TeamOutlined />
              </Box>
              <Chip label="↑ 12%" size="small" sx={{ bgcolor: 'rgba(16, 185, 129, 0.08)', color: '#10B981', fontWeight: 500, fontSize: 11, height: 22, borderRadius: '6px' }} />
            </Stack>
            <Box sx={{ mt: 1.5 }}>
              <Typography sx={{ color: '#6B7280', fontSize: 13, fontWeight: 500, display: 'block', mb: 0.25 }}>Total Candidates</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 28, color: '#111827', lineHeight: 1 }}>{totalCount}</Typography>
              <Typography sx={{ color: '#9CA3AF', fontSize: 12, fontWeight: 400, mt: 0.5 }}>Across all sources</Typography>
            </Box>
          </Card>
        </Grid>

        {/* New This Week */}
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
                <UserAddOutlined />
              </Box>
              <Chip label="↑ 28%" size="small" sx={{ bgcolor: 'rgba(16, 185, 129, 0.08)', color: '#10B981', fontWeight: 500, fontSize: 11, height: 22, borderRadius: '6px' }} />
            </Stack>
            <Box sx={{ mt: 1.5 }}>
              <Typography sx={{ color: '#6B7280', fontSize: 13, fontWeight: 500, display: 'block', mb: 0.25 }}>New This Week</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 28, color: '#111827', lineHeight: 1 }}>{newThisWeekCount}</Typography>
              <Typography sx={{ color: '#9CA3AF', fontSize: 12, fontWeight: 400, mt: 0.5 }}>Recently added</Typography>
            </Box>
          </Card>
        </Grid>

        {/* Active Candidates */}
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
                <CheckCircleOutlined />
              </Box>
              <Chip label="↑ 18%" size="small" sx={{ bgcolor: 'rgba(16, 185, 129, 0.08)', color: '#10B981', fontWeight: 500, fontSize: 11, height: 22, borderRadius: '6px' }} />
            </Stack>
            <Box sx={{ mt: 1.5 }}>
              <Typography sx={{ color: '#6B7280', fontSize: 13, fontWeight: 500, display: 'block', mb: 0.25 }}>Active Candidates</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 28, color: '#111827', lineHeight: 1 }}>{activeCount}</Typography>
              <Typography sx={{ color: '#9CA3AF', fontSize: 12, fontWeight: 400, mt: 0.5 }}>Open to opportunities</Typography>
            </Box>
          </Card>
        </Grid>

        {/* In Process */}
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
                <ClockCircleOutlined />
              </Box>
              <Chip label="↑ 9%" size="small" sx={{ bgcolor: 'rgba(16, 185, 129, 0.08)', color: '#10B981', fontWeight: 500, fontSize: 11, height: 22, borderRadius: '6px' }} />
            </Stack>
            <Box sx={{ mt: 1.5 }}>
              <Typography sx={{ color: '#6B7280', fontSize: 13, fontWeight: 500, display: 'block', mb: 0.25 }}>In Process</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 28, color: '#111827', lineHeight: 1 }}>{inProcessCount}</Typography>
              <Typography sx={{ color: '#9CA3AF', fontSize: 12, fontWeight: 400, mt: 0.5 }}>In hiring stages</Typography>
            </Box>
          </Card>
        </Grid>

        {/* Hired */}
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
              <Box sx={{ width: 38, height: 38, borderRadius: '10px', bgcolor: '#faf5ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                <TrophyOutlined />
              </Box>
              <Chip label="↑ 25%" size="small" sx={{ bgcolor: 'rgba(16, 185, 129, 0.08)', color: '#10B981', fontWeight: 500, fontSize: 11, height: 22, borderRadius: '6px' }} />
            </Stack>
            <Box sx={{ mt: 1.5 }}>
              <Typography sx={{ color: '#6B7280', fontSize: 13, fontWeight: 500, display: 'block', mb: 0.25 }}>Hired</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 28, color: '#111827', lineHeight: 1 }}>{hiredCount}</Typography>
              <Typography sx={{ color: '#9CA3AF', fontSize: 12, fontWeight: 400, mt: 0.5 }}>This month</Typography>
            </Box>
          </Card>
        </Grid>

        {/* Archived */}
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
              <Typography sx={{ color: '#9ca3af', fontSize: 13, fontWeight: 700 }}>—</Typography>
            </Stack>
            <Box sx={{ mt: 1.5 }}>
              <Typography sx={{ color: '#6B7280', fontSize: 13, fontWeight: 500, display: 'block', mb: 0.25 }}>Active</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 28, color: '#111827', lineHeight: 1 }}>0</Typography>
              <Typography sx={{ color: '#9CA3AF', fontSize: 12, fontWeight: 400, mt: 0.5 }}>No active actions</Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* ========================================================================= */}
      {/* 3. MASTER LAYOUT: TABLE (FULL WIDTH OR SPLIT WHEN INSPECTING)              */}
      {/* ========================================================================= */}
      <Grid container spacing={3} alignItems="flex-start">
        {/* LEFT COLUMN: CANDIDATES TABLE */}
        <Grid size={{ xs: 12, lg: selectedCand ? 7.8 : 12 }}>
          <Card sx={{ borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
            {/* Status Tabs Bar */}
            <Box sx={{ px: 2.5, pt: 1.5, borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
              <Tabs
                value={candTab}
                onChange={(e, val) => setCandTab(val)}
                sx={{
                  minHeight: 42,
                  '& .MuiTab-root': { minHeight: 42, textTransform: 'none', fontWeight: 700, fontSize: 13, color: '#6b7280', px: 1.75 },
                  '& .Mui-selected': { color: '#6929e2 !important' },
                  '& .MuiTabs-indicator': { backgroundColor: '#6929e2', height: 3, borderRadius: '3px 3px 0 0' }
                }}
              >
                <Tab value="ALL" label={`All Candidates (${totalCount})`} />
                <Tab value="Active" label={`Active (${activeCount})`} />
                <Tab value="Passive" label={`Passive (${inProcessCount})`} />
                <Tab value="NotContacted" label={`Not Contacted (${notContactedCount})`} />
              </Tabs>

              <Typography
                onClick={(e) => setSortAnchor(e.currentTarget)}
                sx={{ fontSize: 12, color: '#6b7280', fontWeight: 600, cursor: 'pointer', userSelect: 'none' }}
              >
                Sort by: <strong style={{ color: '#111827' }}>{sortBy === 'oldest' ? 'Oldest First' : sortBy === 'name' ? 'Name (A-Z)' : 'Recently Added'} ⌵</strong>
              </Typography>
            </Box>

            {/* Search & Multi Filters */}
            <Box sx={{ p: 2, px: 2.5, borderBottom: '1px solid #f1f5f9' }}>
              <Grid container spacing={1.5} alignItems="center">
                <Grid size={{ xs: 12, md: 4.5 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Search by name, email, phone, skills or keywords..."
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
                  <Select fullWidth size="small" value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} sx={{ borderRadius: '10px', fontSize: 12, fontWeight: 600 }}>
                    <MenuItem value="ALL">All Departments</MenuItem>
                    <MenuItem value="Engineering">Engineering</MenuItem>
                    <MenuItem value="Data">Data & Analytics</MenuItem>
                    <MenuItem value="Design">Design</MenuItem>
                    <MenuItem value="Sales">Sales</MenuItem>
                  </Select>
                </Grid>
                <Grid size={{ xs: 6, sm: 3, md: 2 }}>
                  <Select fullWidth size="small" value={locFilter} onChange={(e) => setLocFilter(e.target.value)} sx={{ borderRadius: '10px', fontSize: 12, fontWeight: 600 }}>
                    <MenuItem value="ALL">All Locations</MenuItem>
                    <MenuItem value="Bengaluru">Bengaluru</MenuItem>
                    <MenuItem value="Chennai">Chennai</MenuItem>
                    <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                    <MenuItem value="Pune">Pune</MenuItem>
                    <MenuItem value="Mumbai">Mumbai</MenuItem>
                  </Select>
                </Grid>
                <Grid size={{ xs: 6, sm: 3, md: 1.8 }}>
                  <Select fullWidth size="small" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} sx={{ borderRadius: '10px', fontSize: 12, fontWeight: 600 }}>
                    <MenuItem value="ALL">All Statuses</MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="In Process">In Process</MenuItem>
                    <MenuItem value="Shortlisted">Shortlisted</MenuItem>
                    <MenuItem value="Interview">Interview</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
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
                    label={`${selectedRows.length} ${selectedRows.length === 1 ? 'Candidate' : 'Candidates'} Selected`}
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
                      const targets = candidates.filter((c) => selectedRows.includes(c.id));
                      try {
                        const results = await Promise.all(
                          targets.map((c) => updateCandidateStatus(c.dbId, { status: 'hired' }).then((r) => mapBackendCandidate(r.data)))
                        );
                        const byId = new Map(results.map((r) => [r.dbId, r]));
                        setCandidates((prev) => prev.map((c) => byId.get(c.dbId) || c));
                        setSnackbar({ open: true, message: `Marked ${targets.length} candidates as Hired!`, severity: 'success' });
                      } catch (err) {
                        setSnackbar({ open: true, message: err.message || 'Failed to mark candidates as hired', severity: 'error' });
                      }
                    }}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30, color: '#059669', borderColor: '#a7f3d0' }}
                  >
                    Mark Hired
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={async () => {
                      const targets = candidates.filter((c) => selectedRows.includes(c.id));
                      try {
                        const results = await Promise.all(
                          targets.map((c) => updateCandidateStatus(c.dbId, { status: 'interview' }).then((r) => mapBackendCandidate(r.data)))
                        );
                        const byId = new Map(results.map((r) => [r.dbId, r]));
                        setCandidates((prev) => prev.map((c) => byId.get(c.dbId) || c));
                        setSnackbar({ open: true, message: `Moved ${targets.length} candidates to Interview stage!`, severity: 'success' });
                      } catch (err) {
                        setSnackbar({ open: true, message: err.message || 'Failed to update selected candidates', severity: 'error' });
                      }
                    }}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30, color: '#530EF0', borderColor: '#C084FC' }}
                  >
                    Move to Interview ({selectedRows.length})
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={async () => {
                      const targets = candidates.filter((c) => selectedRows.includes(c.id));
                      try {
                        const results = await Promise.all(
                          targets.map((c) => updateCandidateStatus(c.dbId, { status: 'hired' }).then((r) => mapBackendCandidate(r.data)))
                        );
                        const byId = new Map(results.map((r) => [r.dbId, r]));
                        setCandidates((prev) => prev.map((c) => byId.get(c.dbId) || c));
                        setSnackbar({ open: true, message: `Marked ${targets.length} candidates as Hired!`, severity: 'success' });
                      } catch (err) {
                        setSnackbar({ open: true, message: err.message || 'Failed to mark candidates as hired', severity: 'error' });
                      }
                    }}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30, color: '#059669', borderColor: '#a7f3d0' }}
                  >
                    Mark Hired
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={async () => {
                      const targets = candidates.filter((c) => selectedRows.includes(c.id));
                      try {
                        const results = await Promise.all(
                          targets.map((c) => updateCandidateStatus(c.dbId, { inTalentPool: true }).then((r) => mapBackendCandidate(r.data)))
                        );
                        const byId = new Map(results.map((r) => [r.dbId, r]));
                        setCandidates((prev) => prev.map((c) => byId.get(c.dbId) || c));
                        setSnackbar({ open: true, message: `Added ${targets.length} candidates to Talent Pool!`, severity: 'success' });
                      } catch (err) {
                        setSnackbar({ open: true, message: err.message || 'Failed to add to Talent Pool', severity: 'error' });
                      }
                    }}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30, color: '#6B7280', borderColor: '#D1D5DB' }}
                  >
                    + Talent Pool
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setSnackbar({ open: true, message: `Email composer opened for ${selectedRows.length} candidates.`, severity: 'info' })}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30, color: '#6B7280', borderColor: '#D1D5DB' }}
                  >
                    Email
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setSnackbar({ open: true, message: `Exporting data for ${selectedRows.length} candidates...`, severity: 'info' })}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30, color: '#6B7280', borderColor: '#D1D5DB' }}
                  >
                    Export
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={async () => {
                      const targets = candidates.filter((c) => selectedRows.includes(c.id));
                      try {
                        const results = await Promise.all(
                          targets.map((c) => updateCandidateStatus(c.dbId, { status: 'inactive' }).then((r) => mapBackendCandidate(r.data)))
                        );
                        const byId = new Map(results.map((r) => [r.dbId, r]));
                        setCandidates((prev) => prev.map((c) => byId.get(c.dbId) || c));
                        setSelectedRows([]);
                        setSelectedCand(null);
                        setSnackbar({ open: true, message: `Archived ${targets.length} candidates.`, severity: 'info' });
                      } catch (err) {
                        setSnackbar({ open: true, message: err.message || 'Failed to archive candidates', severity: 'error' });
                      }
                    }}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30 }}
                  >
                    Archive
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

            {/* Candidates Table */}
            <TableContainer sx={{ minHeight: 460 }}>
              <Table size="small">
                <TableHead sx={{ bgcolor: '#f8fafc' }}>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        size="small"
                        checked={selectedRows.length > 0 && selectedRows.length === filteredCandidates.length}
                        indeterminate={selectedRows.length > 0 && selectedRows.length < filteredCandidates.length}
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Candidate</TableCell>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Current Role</TableCell>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Experience</TableCell>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Skills</TableCell>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Location</TableCell>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Source</TableCell>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Status</TableCell>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Added On</TableCell>
                    <TableCell align="right" sx={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCandidates.map((cand) => {
                    const isSelected = selectedCand?.id === cand.id;
                    return (
                      <TableRow
                        key={cand.id}
                        hover
                        onClick={() => handleRowClick(cand)}
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
                            checked={selectedRows.includes(cand.id)}
                            onChange={() => handleSelectRow(cand.id)}
                          />
                        </TableCell>
                        <TableCell sx={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          <Stack direction="row" spacing={1.25} alignItems="center">
                            <Avatar src={cand.avatar} sx={{ width: 30, height: 30 }} />
                            <Box>
                              <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#111827', lineHeight: 1.3 }}>
                                {cand.name}
                              </Typography>
                              <Typography sx={{ fontSize: 11, color: '#6b7280', lineHeight: 1.2 }}>
                                {cand.email}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>
                        <TableCell sx={{ fontSize: 12.5, color: '#374151', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>{cand.role}</TableCell>
                        <TableCell sx={{ fontSize: 12, color: '#6b7280', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>{cand.exp}</TableCell>
                        <TableCell sx={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            {cand.skills.slice(0, 2).map((s) => (
                              <Chip key={s} label={s} size="small" sx={{ fontSize: 10.5, height: 20, bgcolor: '#f1f5f9', color: '#334155' }} />
                            ))}
                            {cand.extraSkillsCount > 0 && (
                              <Typography sx={{ fontSize: 10.5, color: '#64748b', fontWeight: 600 }}>
                                +{cand.extraSkillsCount}
                              </Typography>
                            )}
                          </Stack>
                        </TableCell>
                        <TableCell sx={{ fontSize: 12, color: '#6b7280', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>{cand.location}</TableCell>
                        <TableCell sx={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            {cand.source === 'LinkedIn' && <LinkedinFilled style={{ color: '#0077b5', fontSize: 12 }} />}
                            <Typography sx={{ fontSize: 11.5, color: '#4b5563', fontWeight: 600 }}>{cand.source}</Typography>
                          </Stack>
                        </TableCell>
                        <TableCell sx={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>{getStatusChip(cand.status)}</TableCell>
                        <TableCell sx={{ fontSize: 12, color: '#64748b', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>{cand.addedOn}</TableCell>
                        <TableCell align="right" onClick={(e) => e.stopPropagation()} sx={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              setMenuAnchor(e.currentTarget);
                              setMenuTarget(cand);
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
                Showing 1-{filteredCandidates.length} of {totalCount} candidates
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

        {/* RIGHT COLUMN: CANDIDATE PROFILE PREVIEW CARD (APPEARS ON CLICK) */}
        {selectedCand && (
          <Grid size={{ xs: 12, lg: 4.2 }}>
            <Card sx={{ borderRadius: '16px', border: '1px solid #ede9fe', boxShadow: '0 2px 10px rgba(105, 41, 226, 0.06)', overflow: 'hidden' }}>
              {/* Profile Card Header */}
              <Box sx={{ p: 2.5, background: 'linear-gradient(180deg, #fbf9ff 0%, #ffffff 100%)', borderBottom: '1px solid #f1f5f9' }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1.5 }}>
                  <Avatar src={selectedCand.avatar} sx={{ width: 56, height: 56, border: '2px solid #ede9fe' }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.25 }}>
                      <Typography sx={{ fontWeight: 800, fontSize: 17, color: '#111827' }}>
                        {selectedCand.name}
                      </Typography>
                      <Chip label={selectedCand.status} size="small" sx={{ bgcolor: '#ecfdf5', color: '#059669', fontWeight: 700, fontSize: 10.5, height: 20 }} />
                    </Stack>
                    <Typography sx={{ fontSize: 13, color: '#4b5563', fontWeight: 600 }}>
                      {selectedCand.role}
                    </Typography>
                    <Typography sx={{ fontSize: 11.5, color: '#9ca3af', mt: 0.25 }}>
                      {selectedCand.location}, India • {selectedCand.exp}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <Tooltip title="View Full Profile">
                      <IconButton size="small" onClick={() => setFullProfileCand(selectedCand)} sx={{ color: '#6929e2' }}>
                        <FullscreenOutlined style={{ fontSize: 14 }} />
                      </IconButton>
                    </Tooltip>
                    <IconButton size="small" onClick={(e) => { setMenuAnchor(e.currentTarget); setMenuTarget(selectedCand); }}>
                      <MoreOutlined style={{ color: '#9ca3af' }} />
                    </IconButton>
                    <IconButton size="small" onClick={() => setSelectedCand(null)} sx={{ color: '#6b7280', '&:hover': { color: '#111827' } }}>
                      <CloseOutlined style={{ fontSize: 12 }} />
                    </IconButton>
                  </Stack>
                </Stack>

                {/* Contact links */}
                <Stack spacing={0.75} sx={{ pt: 1, borderTop: '1px dashed #e2e8f0' }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <MailOutlined style={{ fontSize: 12, color: '#6929e2' }} />
                    <Typography sx={{ fontSize: 12, color: '#2563eb', fontWeight: 600 }}>{selectedCand.email}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <PhoneOutlined style={{ fontSize: 12, color: '#6929e2' }} />
                    <Typography sx={{ fontSize: 12, color: '#374151' }}>{selectedCand.phone}</Typography>
                  </Stack>
                  {selectedCand.linkedinUrl && (
                    <Stack direction="row" spacing={1} alignItems="center">
                      <LinkedinFilled style={{ fontSize: 12, color: '#0077b5' }} />
                      <Typography
                        component="a"
                        href={selectedCand.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ fontSize: 12, color: '#0077b5', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                      >
                        {selectedCand.linkedinUrl}
                      </Typography>
                    </Stack>
                  )}
                  {selectedCand.githubUrl && (
                    <Stack direction="row" spacing={1} alignItems="center">
                      <GithubOutlined style={{ fontSize: 12, color: '#111827' }} />
                      <Typography
                        component="a"
                        href={selectedCand.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ fontSize: 12, color: '#111827', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                      >
                        {selectedCand.githubUrl}
                      </Typography>
                    </Stack>
                  )}
                </Stack>

                {/* 3 Buttons */}
                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => setSnackbar({ open: true, message: `Contact email initiated for ${selectedCand.name}!`, severity: 'info' })}
                    sx={{ bgcolor: '#6929e2', textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '8px', px: 2, '&:hover': { bgcolor: '#5b1fd9' } }}
                  >
                    Contact
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<CalendarOutlined />}
                    onClick={() => setSnackbar({ open: true, message: `Interview scheduled with ${selectedCand.name}!`, severity: 'success' })}
                    sx={{ color: '#4b5563', borderColor: '#d1d5db', textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '8px', '&:hover': { borderColor: '#6929e2', color: '#6929e2' } }}
                  >
                    Schedule Interview
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setSnackbar({ open: true, message: `${selectedCand.name} saved to Talent Pool!`, severity: 'success' })}
                    sx={{ color: '#6929e2', borderColor: '#ddd6fe', textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '8px', '&:hover': { bgcolor: '#faf5ff', borderColor: '#6929e2' } }}
                  >
                    Add to Pool
                  </Button>
                </Stack>
              </Box>

              {/* Detail Tabs */}
              <Box sx={{ borderBottom: '1px solid #f1f5f9' }}>
                <Tabs
                  value={previewTab}
                  onChange={(e, val) => setPreviewTab(val)}
                  sx={{ minHeight: 40, '& .MuiTab-root': { minHeight: 40, textTransform: 'none', fontSize: 11.5, fontWeight: 700, px: 1.5 } }}
                >
                  <Tab label="Overview" />
                  <Tab label="Resume" />
                  <Tab label="Applications" />
                  <Tab label="Activity" />
                  <Tab label="Notes" />
                </Tabs>
              </Box>

              {/* Tab Content */}
              <Box sx={{ p: 2.5 }}>
                {/* About */}
                <Typography sx={{ fontWeight: 800, fontSize: 13.5, color: '#111827', mb: 0.75 }}>About</Typography>
                <Typography sx={{ fontSize: 12.5, color: '#4b5563', lineHeight: 1.6, mb: 2 }}>{selectedCand.about}</Typography>

                {/* Key metadata cards */}
                <Grid container spacing={1.5} sx={{ mb: 2.5 }}>
                  <Grid size={{ xs: 4 }}>
                    <Box sx={{ p: 1, bgcolor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                      <Typography sx={{ fontSize: 10.5, color: '#64748b' }}>Availability</Typography>
                      <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#111827' }}>{selectedCand.availability}</Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <Box sx={{ p: 1, bgcolor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                      <Typography sx={{ fontSize: 10.5, color: '#64748b' }}>Expected</Typography>
                      <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#111827' }}>{selectedCand.salary}</Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <Box sx={{ p: 1, bgcolor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                      <Typography sx={{ fontSize: 10.5, color: '#64748b' }}>Location</Typography>
                      <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#111827' }}>{selectedCand.prefLocation}</Typography>
                    </Box>
                  </Grid>
                </Grid>

                {/* Skills */}
                <Typography sx={{ fontWeight: 800, fontSize: 13.5, color: '#111827', mb: 1 }}>Skills</Typography>
                <Stack direction="row" spacing={0.75} flexWrap="wrap" gap={0.75} sx={{ mb: 2.5 }}>
                  {selectedCand.skills.map((s) => (
                    <Chip key={s} label={s} size="small" sx={{ bgcolor: '#f3edff', color: '#6929e2', fontWeight: 600, fontSize: 11 }} />
                  ))}
                </Stack>

                {/* Education & Experience */}
                <Typography sx={{ fontWeight: 800, fontSize: 13.5, color: '#111827', mb: 0.5 }}>Education</Typography>
                <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: '#111827' }}>{selectedCand.education.degree}</Typography>
                <Typography sx={{ fontSize: 11.5, color: '#64748b', mb: 2 }}>{selectedCand.education.school} • {selectedCand.education.period}</Typography>

                <Typography sx={{ fontWeight: 800, fontSize: 13.5, color: '#111827', mb: 0.5 }}>Experience</Typography>
                <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: '#111827' }}>{selectedCand.experience.title}</Typography>
                <Typography sx={{ fontSize: 11.5, color: '#64748b', mb: 2.5 }}>{selectedCand.experience.company} • {selectedCand.experience.period}</Typography>

                {/* Resume Download Card */}
                <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Stack direction="row" spacing={1.25} alignItems="center">
                    <FilePdfOutlined style={{ fontSize: 24, color: '#dc2626' }} />
                    <Box>
                      <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: '#111827' }}>{selectedCand.resumeName}</Typography>
                      <Typography sx={{ fontSize: 11, color: '#64748b' }}>{selectedCand.resumeSize} • Uploaded {selectedCand.addedOn}</Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={0.5}>
                    <Button size="small" onClick={() => setSnackbar({ open: true, message: `Viewing verified resume for ${selectedCand.name}`, severity: 'info' })} sx={{ textTransform: 'none', fontWeight: 700, color: '#6929e2' }}>View</Button>
                    <IconButton size="small" onClick={() => setSnackbar({ open: true, message: `Downloading ${selectedCand.resumeName}...`, severity: 'success' })} sx={{ color: '#6929e2' }}><DownloadOutlined style={{ fontSize: 14 }} /></IconButton>
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
              setSelectedCand(t);
              setFullProfileCand(t);
            }
          }}
        >
          View Profile
        </MenuItem>
        <MenuItem onClick={() => { const t = menuTarget; setMenuAnchor(null); if (t) handleOpenEdit(t); }} sx={{ color: '#1d4ed8' }}>Edit Candidate</MenuItem>
        <MenuItem
          onClick={() => {
            const t = menuTarget;
            setMenuAnchor(null);
            if (t) {
              setUploadTargetId(t.dbId);
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
            if (t) handleCandidateStatusUpdate(t, { status: 'interview' }, `${t.name} moved to Interview stage!`, 'info');
          }}
        >
          Move to Interview
        </MenuItem>
        <MenuItem
          onClick={() => {
            const t = menuTarget;
            setMenuAnchor(null);
            if (t) handleCandidateStatusUpdate(t, { status: 'hired' }, `${t.name} marked as Hired!`, 'success');
          }}
          sx={{ color: '#059669', fontWeight: 700 }}
        >
          Mark as Hired
        </MenuItem>
        <MenuItem
          onClick={() => {
            const t = menuTarget;
            setMenuAnchor(null);
            if (t) handleCandidateStatusUpdate(t, { inTalentPool: true }, `${t.name} added to Talent Pool!`, 'success');
          }}
        >
          Add to Talent Pool
        </MenuItem>
        <MenuItem
          onClick={() => {
            const t = menuTarget;
            setMenuAnchor(null);
            if (t) handleCandidateStatusUpdate(t, { status: 'inactive' }, `${t.name} archived.`, 'warning');
          }}
          sx={{ color: '#d97706' }}
        >
          Archive
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={() => {
            const t = menuTarget;
            setMenuAnchor(null);
            if (t) setDeleteConfirmCand(t);
          }}
          sx={{ color: '#dc2626', fontWeight: 600 }}
        >
          Delete Candidate
        </MenuItem>
      </Menu>

      {/* Full-Screen Candidate Profile Dialog */}
      <Dialog
        fullScreen
        open={Boolean(fullProfileCand)}
        onClose={() => setFullProfileCand(null)}
        PaperProps={{ sx: { bgcolor: '#f8fafc' } }}
      >
        {fullProfileCand && (
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
                <Avatar src={fullProfileCand.avatar} sx={{ width: 56, height: 56, border: '2px solid #ede9fe' }} />
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography sx={{ fontWeight: 800, fontSize: 20, color: '#111827' }}>{fullProfileCand.name}</Typography>
                    {getStatusChip(fullProfileCand.status)}
                  </Stack>
                  <Typography sx={{ fontSize: 13.5, color: '#4b5563', fontWeight: 600 }}>
                    {fullProfileCand.role} • {fullProfileCand.dept} • {fullProfileCand.exp}
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                <Button
                  variant="contained"
                  size="small"
                  onClick={async () => {
                    await handleCandidateStatusUpdate(fullProfileCand, { status: 'hired' }, `${fullProfileCand.name} marked as Hired!`, 'success');
                    setFullProfileCand((prev) => (prev ? { ...prev, status: 'Hired' } : null));
                  }}
                  sx={{ bgcolor: '#059669', textTransform: 'none', fontWeight: 700, borderRadius: '8px', '&:hover': { bgcolor: '#047857' } }}
                >
                  Mark as Hired
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={async () => {
                    await handleCandidateStatusUpdate(fullProfileCand, { status: 'interview' }, `${fullProfileCand.name} moved to Interview!`, 'info');
                    setFullProfileCand((prev) => (prev ? { ...prev, status: 'Interview' } : null));
                  }}
                  sx={{ textTransform: 'none', fontWeight: 700, borderRadius: '8px', borderColor: '#ddd6fe', color: '#6929e2' }}
                >
                  Move to Interview
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    const target = fullProfileCand;
                    setFullProfileCand(null);
                    handleOpenEdit(target);
                  }}
                  sx={{ textTransform: 'none', fontWeight: 700, borderRadius: '8px' }}
                >
                  Edit Candidate
                </Button>
                <IconButton onClick={() => setFullProfileCand(null)} sx={{ ml: 1, bgcolor: '#f1f5f9' }}>
                  <CloseOutlined style={{ fontSize: 16 }} />
                </IconButton>
              </Stack>
            </Box>

            {/* Full Screen Content */}
            <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: 1200, width: '100%', mx: 'auto' }}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card sx={{ p: 3, borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <Typography sx={{ fontWeight: 800, fontSize: 15, color: '#111827', mb: 2 }}>Contact & Profiles</Typography>
                    <Stack spacing={1.5}>
                      <Box>
                        <Typography sx={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>Email Address</Typography>
                        <Typography sx={{ fontSize: 13.5, fontWeight: 600, color: '#2563eb' }}>{fullProfileCand.email}</Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>Phone Number</Typography>
                        <Typography sx={{ fontSize: 13.5, fontWeight: 600, color: '#111827' }}>{fullProfileCand.phone}</Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>GitHub</Typography>
                        {fullProfileCand.githubUrl ? (
                          <Typography component="a" href={fullProfileCand.githubUrl} target="_blank" rel="noopener noreferrer" sx={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>
                            {fullProfileCand.githubUrl}
                          </Typography>
                        ) : (
                          <Typography sx={{ fontSize: 13, color: '#94a3b8' }}>Not provided</Typography>
                        )}
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>LinkedIn</Typography>
                        {fullProfileCand.linkedinUrl ? (
                          <Typography component="a" href={fullProfileCand.linkedinUrl} target="_blank" rel="noopener noreferrer" sx={{ fontSize: 13, fontWeight: 600, color: '#0077b5' }}>
                            {fullProfileCand.linkedinUrl}
                          </Typography>
                        ) : (
                          <Typography sx={{ fontSize: 13, color: '#94a3b8' }}>Not provided</Typography>
                        )}
                      </Box>
                      <Divider />
                      <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontSize: 12, color: '#64748b' }}>Location</Typography>
                        <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: '#111827' }}>{fullProfileCand.location}</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontSize: 12, color: '#64748b' }}>Source</Typography>
                        <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: '#111827' }}>{fullProfileCand.source}</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontSize: 12, color: '#64748b' }}>Added On</Typography>
                        <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: '#111827' }}>{fullProfileCand.addedOn}</Typography>
                      </Stack>
                    </Stack>
                  </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>
                  <Stack spacing={3}>
                    <Card sx={{ p: 3, borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                      <Typography sx={{ fontWeight: 800, fontSize: 15, color: '#111827', mb: 1.5 }}>Skills</Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {(fullProfileCand.allSkills?.length ? fullProfileCand.allSkills : fullProfileCand.skills).map((skill) => (
                          <Chip key={skill} label={skill} sx={{ bgcolor: '#f3edff', color: '#530EF0', fontWeight: 700, fontSize: 12 }} />
                        ))}
                      </Stack>
                    </Card>

                    <Card sx={{ p: 3, borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                      <Typography sx={{ fontWeight: 800, fontSize: 15, color: '#111827', mb: 1 }}>Summary & Availability</Typography>
                      <Typography sx={{ fontSize: 13.5, color: '#4b5563', lineHeight: 1.6, mb: 2 }}>{fullProfileCand.about}</Typography>
                      <Grid container spacing={2}>
                        <Grid size={{ xs: 4 }}>
                          <Box sx={{ p: 1.5, borderRadius: '10px', bgcolor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                            <Typography sx={{ fontSize: 11, color: '#64748b' }}>Availability</Typography>
                            <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>{fullProfileCand.availability}</Typography>
                          </Box>
                        </Grid>
                        <Grid size={{ xs: 4 }}>
                          <Box sx={{ p: 1.5, borderRadius: '10px', bgcolor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                            <Typography sx={{ fontSize: 11, color: '#64748b' }}>Expected Salary</Typography>
                            <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>{fullProfileCand.salary}</Typography>
                          </Box>
                        </Grid>
                        <Grid size={{ xs: 4 }}>
                          <Box sx={{ p: 1.5, borderRadius: '10px', bgcolor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                            <Typography sx={{ fontSize: 11, color: '#64748b' }}>Preferred Location</Typography>
                            <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>{fullProfileCand.prefLocation}</Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Card>

                    <Card sx={{ p: 3, borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography sx={{ fontWeight: 800, fontSize: 15, color: '#111827' }}>Resume</Typography>
                          <Typography sx={{ fontSize: 13, color: '#64748b', mt: 0.5 }}>
                            {fullProfileCand.resumeName ? `${fullProfileCand.resumeName} (${fullProfileCand.resumeSize})` : 'No resume uploaded yet'}
                          </Typography>
                        </Box>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<UploadOutlined />}
                          onClick={() => {
                            setUploadTargetId(fullProfileCand.dbId);
                            setUploadFile(null);
                            setUploadDialogOpen(true);
                          }}
                          sx={{ textTransform: 'none', fontWeight: 700, borderRadius: '8px' }}
                        >
                          {fullProfileCand.resumeName ? 'Replace Resume' : 'Upload Resume'}
                        </Button>
                      </Stack>
                    </Card>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}
      </Dialog>

      {/* Sort Menu */}
      <Menu anchorEl={sortAnchor} open={Boolean(sortAnchor)} onClose={() => setSortAnchor(null)}>
        <MenuItem selected={sortBy === 'newest'} onClick={() => { setSortBy('newest'); setSortAnchor(null); }}>Recently Added</MenuItem>
        <MenuItem selected={sortBy === 'oldest'} onClick={() => { setSortBy('oldest'); setSortAnchor(null); }}>Oldest First</MenuItem>
        <MenuItem selected={sortBy === 'name'} onClick={() => { setSortBy('name'); setSortAnchor(null); }}>Name (A-Z)</MenuItem>
      </Menu>

      {/* More Filters Popover */}
      <Popover
        open={Boolean(moreFiltersAnchor)}
        anchorEl={moreFiltersAnchor}
        onClose={() => setMoreFiltersAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ p: 2.5, width: 280 }}>
          <Typography sx={{ fontWeight: 800, fontSize: 14, color: '#111827', mb: 1.5 }}>
            More Filters
          </Typography>
          <Stack spacing={2}>
            <TextField fullWidth size="small" select label="Source" value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)}>
              <MenuItem value="ALL">All Sources</MenuItem>
              <MenuItem value="LinkedIn">LinkedIn</MenuItem>
              <MenuItem value="Naukri">Naukri</MenuItem>
              <MenuItem value="Indeed">Indeed</MenuItem>
              <MenuItem value="Referral">Referral</MenuItem>
              <MenuItem value="Company Website">Company Website</MenuItem>
              <MenuItem value="Job Board">Job Board</MenuItem>
              <MenuItem value="TraceU">TraceU</MenuItem>
              <MenuItem value="Import">Import</MenuItem>
            </TextField>
            <TextField fullWidth size="small" select label="Experience" value={expFilter} onChange={(e) => setExpFilter(e.target.value)}>
              <MenuItem value="ALL">All Experience</MenuItem>
              <MenuItem value="0-1">0-1 yrs</MenuItem>
              <MenuItem value="2+">2+ yrs</MenuItem>
              <MenuItem value="3+">3+ yrs</MenuItem>
              <MenuItem value="4+">4+ yrs</MenuItem>
              <MenuItem value="5+">5+ yrs</MenuItem>
            </TextField>
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button
                size="small"
                onClick={() => {
                  setDeptFilter('ALL');
                  setLocFilter('ALL');
                  setStatusFilter('ALL');
                  setSourceFilter('ALL');
                  setExpFilter('ALL');
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

      {/* Add / Edit Candidate Dialog (All columns from 1st image) */}
      <Dialog
        open={addDialogOpen}
        onClose={() => {
          setAddDialogOpen(false);
          resetCandidateForm();
        }}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>
          {editingCand ? `Edit Candidate (${editingCand.id})` : 'Add New Candidate'}
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Stack spacing={2}>
            {/* Candidate Photo Upload / URL */}
            <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 1.5, borderRadius: '12px', bgcolor: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <Avatar src={newPhoto || undefined} sx={{ width: 56, height: 56, bgcolor: '#ede9fe', color: '#6929e2', fontWeight: 700 }}>
                {newName ? newName.charAt(0).toUpperCase() : 'C'}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <Button variant="outlined" component="label" size="small" startIcon={<UploadOutlined />} sx={{ textTransform: 'none', borderRadius: '8px', fontWeight: 600 }}>
                    {newPhoto ? 'Change Photo' : 'Upload Photo'}
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = () => {
                          if (typeof reader.result === 'string') setNewPhoto(reader.result);
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                  </Button>
                  {newPhoto && (
                    <Button size="small" color="error" onClick={() => setNewPhoto('')} sx={{ textTransform: 'none' }}>
                      Remove
                    </Button>
                  )}
                </Stack>
                <TextField
                  fullWidth
                  size="small"
                  label="Or paste Photo URL"
                  placeholder="https://example.com/photo.jpg"
                  value={newPhoto.startsWith('data:') ? '' : newPhoto}
                  onChange={(e) => setNewPhoto(e.target.value)}
                />
              </Box>
            </Stack>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Full Name *"
                  placeholder="e.g. Aditi Rao"
                  value={newName}
                  onChange={(e) => {
                    setNewName(e.target.value);
                    if (addErrors.name) setAddErrors({ ...addErrors, name: '' });
                  }}
                  error={Boolean(addErrors.name)}
                  helperText={addErrors.name}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  type="email"
                  label="Email Address *"
                  placeholder="candidate@email.com"
                  value={newEmail}
                  onChange={(e) => {
                    setNewEmail(e.target.value);
                    if (addErrors.email) setAddErrors({ ...addErrors, email: '' });
                  }}
                  error={Boolean(addErrors.email)}
                  helperText={addErrors.email}
                  required
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
                    if (addErrors.phone) setAddErrors({ ...addErrors, phone: '' });
                  }}
                  error={Boolean(addErrors.phone)}
                  helperText={addErrors.phone}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Current Role" placeholder="e.g. Software Engineer" value={newRole} onChange={(e) => setNewRole(e.target.value)} />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth select label="Department" value={newDept} onChange={(e) => setNewDept(e.target.value)}>
                  <MenuItem value="Engineering">Engineering</MenuItem>
                  <MenuItem value="Product">Product</MenuItem>
                  <MenuItem value="Data & Analytics">Data & Analytics</MenuItem>
                  <MenuItem value="Design">Design</MenuItem>
                  <MenuItem value="Sales">Sales</MenuItem>
                  <MenuItem value="Human Resources">Human Resources</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Experience" placeholder="e.g. 2+ yrs" value={newExp} onChange={(e) => setNewExp(e.target.value)} />
              </Grid>
            </Grid>
            <TextField
              fullWidth
              required
              label="Skills (minimum 4, comma-separated) *"
              placeholder="e.g. React, Node.js, TypeScript, SQL"
              value={newSkills}
              onChange={(e) => {
                setNewSkills(e.target.value);
                if (addErrors.skills) setAddErrors({ ...addErrors, skills: '' });
              }}
              error={Boolean(addErrors.skills)}
              helperText={addErrors.skills}
            />
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  label="GitHub Link *"
                  placeholder="https://github.com/username"
                  value={newGithub}
                  onChange={(e) => {
                    setNewGithub(e.target.value);
                    if (addErrors.github) setAddErrors({ ...addErrors, github: '' });
                  }}
                  error={Boolean(addErrors.github)}
                  helperText={addErrors.github}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  label="LinkedIn Link *"
                  placeholder="https://linkedin.com/in/username"
                  value={newLinkedin}
                  onChange={(e) => {
                    setNewLinkedin(e.target.value);
                    if (addErrors.linkedin) setAddErrors({ ...addErrors, linkedin: '' });
                  }}
                  error={Boolean(addErrors.linkedin)}
                  helperText={addErrors.linkedin}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField fullWidth select label="Location" value={newLoc} onChange={(e) => setNewLoc(e.target.value)}>
                  <MenuItem value="Bengaluru">Bengaluru</MenuItem>
                  <MenuItem value="Chennai">Chennai</MenuItem>
                  <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                  <MenuItem value="Pune">Pune</MenuItem>
                  <MenuItem value="Mumbai">Mumbai</MenuItem>
                  <MenuItem value="Remote">Remote</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField fullWidth select label="Source" value={newSource} onChange={(e) => setNewSource(e.target.value)}>
                  <MenuItem value="LinkedIn">LinkedIn</MenuItem>
                  <MenuItem value="Naukri">Naukri</MenuItem>
                  <MenuItem value="Indeed">Indeed</MenuItem>
                  <MenuItem value="Referral">Referral</MenuItem>
                  <MenuItem value="Company Website">Company Website</MenuItem>
                  <MenuItem value="Job Board">Job Board</MenuItem>
                  <MenuItem value="TraceU">TraceU</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField fullWidth select label="Status" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="In Process">In Process</MenuItem>
                  <MenuItem value="Shortlisted">Shortlisted</MenuItem>
                  <MenuItem value="Interview">Interview</MenuItem>
                  <MenuItem value="Hired">Hired</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => {
              setAddDialogOpen(false);
              resetCandidateForm();
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
            {submitting ? 'Saving...' : editingCand ? 'Save Changes' : 'Save Candidate'}
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
        <DialogTitle sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>Upload Candidate Resume</DialogTitle>
        <DialogContent dividers sx={{ p: 2.5 }}>
          <Stack spacing={2}>
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
            disabled={uploadingResume || !uploadFile}
            startIcon={uploadingResume ? <CircularProgress size={16} color="inherit" /> : null}
            sx={{ bgcolor: '#6929e2', textTransform: 'none', fontWeight: 700, borderRadius: '8px' }}
          >
            {uploadingResume ? 'Uploading...' : 'Upload'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Import Candidates Dialog (Excel & CSV) */}
      <Dialog
        open={importDialogOpen}
        onClose={() => {
          if (!importing) {
            setImportDialogOpen(false);
            setImportFileName('');
            setImportRowsFromFile(null);
          }
        }}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>Import Candidates (Excel / CSV)</DialogTitle>
        <DialogContent dividers sx={{ p: 2.5 }}>
          <Stack spacing={2}>
            <Typography sx={{ fontSize: 12.5, color: '#4b5563' }}>
              Upload an <strong>Excel (.xlsx / .xls)</strong> or <strong>CSV (.csv)</strong> file, or paste CSV rows with columns:{' '}
              <strong>Name, Email, Phone, Role, Department, Experience, Skills, Location, Source, Status</strong>
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
              <Button variant="outlined" component="label" size="small" startIcon={<UploadOutlined />} sx={{ textTransform: 'none', borderRadius: '8px' }}>
                {importFileName || 'Choose Excel / CSV File'}
                <input
                  type="file"
                  hidden
                  accept=".xlsx,.xls,.csv,.txt"
                  onChange={(e) => handleImportFileChange(e.target.files?.[0])}
                />
              </Button>
              <Button
                size="small"
                onClick={() => {
                  setImportFileName('');
                  setImportRowsFromFile(null);
                  setImportText(
                    'Name,Email,Phone,Role,Department,Experience,Skills,Location,Source,Status\nPriya Sharma,priya.sharma@email.com,+91 98765 43210,Software Engineer,Engineering,2+ yrs,React|Node.js|TypeScript,Bengaluru,LinkedIn,Active'
                  );
                }}
                sx={{ textTransform: 'none', color: '#6929e2', fontWeight: 600 }}
              >
                Load Sample CSV
              </Button>
            </Stack>
            <TextField
              fullWidth
              multiline
              rows={5}
              placeholder="Paste CSV lines here or upload an Excel/CSV file above..."
              value={importText}
              onChange={(e) => {
                setImportText(e.target.value);
                setImportRowsFromFile(null);
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setImportDialogOpen(false)} disabled={importing} sx={{ textTransform: 'none' }}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleImportSubmit}
            disabled={importing}
            startIcon={importing ? <CircularProgress size={16} color="inherit" /> : null}
            sx={{ bgcolor: '#6929e2', textTransform: 'none', fontWeight: 700, borderRadius: '8px' }}
          >
            {importing ? 'Importing...' : 'Import Candidates'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Candidate Confirmation Dialog */}
      <Dialog
        open={Boolean(deleteConfirmCand)}
        onClose={() => !deleting && setDeleteConfirmCand(null)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: 17, color: '#111827' }}>Delete Candidate?</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <Typography sx={{ fontSize: 13.5, color: '#4b5563' }}>
            Are you sure you want to delete <strong>{deleteConfirmCand?.name}</strong> ({deleteConfirmCand?.email})? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteConfirmCand(null)} disabled={deleting} sx={{ textTransform: 'none', color: '#6b7280' }}>Cancel</Button>
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

      {/* Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ borderRadius: '10px', fontWeight: 600 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

