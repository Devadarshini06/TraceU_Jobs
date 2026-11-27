import React, { useState, useMemo, useEffect } from 'react';
import * as XLSX from 'xlsx';
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

// icons
import ContactsOutlined from '@ant-design/icons/ContactsOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import UploadOutlined from '@ant-design/icons/UploadOutlined';
import FilterOutlined from '@ant-design/icons/FilterOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import MoreOutlined from '@ant-design/icons/MoreOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import StarOutlined from '@ant-design/icons/StarOutlined';
import ShoppingOutlined from '@ant-design/icons/ShoppingOutlined';
import MailOutlined from '@ant-design/icons/MailOutlined';
import PhoneOutlined from '@ant-design/icons/PhoneOutlined';
import LinkedinFilled from '@ant-design/icons/LinkedinFilled';
import DownloadOutlined from '@ant-design/icons/DownloadOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EnvironmentOutlined from '@ant-design/icons/EnvironmentOutlined';
import FilePdfOutlined from '@ant-design/icons/FilePdfOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import ArrowUpOutlined from '@ant-design/icons/ArrowUpOutlined';
import ArrowDownOutlined from '@ant-design/icons/ArrowDownOutlined';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import DollarOutlined from '@ant-design/icons/DollarOutlined';
import ThunderboltOutlined from '@ant-design/icons/ThunderboltOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import {
  getTalentPool,
  addToTalentPool,
  importTalentPool,
  updateTalentPoolAvailability,
  getTalentPoolNotes,
  addTalentPoolNote,
  contactTalentPoolCandidate,
  removeFromTalentPool
} from 'api/adminTalentPool';
import { getJobs } from 'api/adminJobs';
import { createApplication } from 'api/adminApplications';
import { uploadCandidateResume } from 'api/adminCandidates';
import { validateEmail } from 'utils/emailValidation';
import FullScreenResumeDialog from 'components/FullScreenResumeDialog';

// avatar assets
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import avatar5 from 'assets/images/users/avatar-5.png';

// initial mock talent pool data
const initialTalentPool = [
  {
    id: 'POOL-001',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43210',
    avatar: avatar1,
    role: 'Software Engineer',
    exp: '2+ yrs',
    skills: ['React', 'Node.js'],
    allSkills: ['React', 'Node.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'REST APIs', 'Git', 'Docker'],
    extraSkillsCount: 2,
    location: 'Bengaluru',
    prefLocation: 'Bengaluru / Remote',
    source: 'LinkedIn',
    availability: 'Active',
    addedOn: 'Oct 21, 2025',
    about: 'Passionate Software Engineer with 2+ years of experience in building scalable web applications. Skilled in React, Node.js and TypeScript with a strong focus on clean code and great user experiences.',
    salary: '₹8 - 12 LPA',
    matchScore: 94,
    education: { degree: 'B.E. in Computer Science', school: 'Anna University, Chennai', period: '2019 - 2023' },
    experience: { title: 'Software Engineer', company: 'TechSolutions Pvt. Ltd.', period: 'Jun 2023 - Present • 2 yrs 4 mos' },
    resumeName: 'Priya_Sharma_Resume.pdf',
    resumeSize: '2.4 MB'
  },
  {
    id: 'POOL-002',
    name: 'Rahul Kumar',
    email: 'rahul.kumar@email.com',
    phone: '+91 98765 11223',
    avatar: avatar2,
    role: 'Frontend Developer',
    exp: '3+ yrs',
    skills: ['React', 'TypeScript'],
    allSkills: ['React', 'TypeScript', 'Next.js', 'Redux', 'Tailwind CSS', 'GraphQL'],
    extraSkillsCount: 1,
    location: 'Chennai',
    prefLocation: 'Chennai / Hybrid',
    source: 'Naukri',
    availability: 'Active',
    addedOn: 'Oct 20, 2025',
    about: 'Frontend specialist experienced in building responsive single-page web applications with modern React ecosystems.',
    salary: '₹10 - 14 LPA',
    matchScore: 91,
    education: { degree: 'B.Tech in Information Tech', school: 'SRM Institute, Chennai', period: '2018 - 2022' },
    experience: { title: 'Frontend Developer', company: 'WebCraft Studio', period: 'Jul 2022 - Present • 3 yrs' },
    resumeName: 'Rahul_Kumar_Resume.pdf',
    resumeSize: '1.8 MB'
  },
  {
    id: 'POOL-003',
    name: 'Sneha Iyer',
    email: 'sneha.iyer@email.com',
    phone: '+91 98765 99887',
    avatar: avatar3,
    role: 'Data Analyst',
    exp: '2+ yrs',
    skills: ['SQL', 'Python'],
    allSkills: ['SQL', 'Python', 'PowerBI', 'Tableau', 'Excel', 'Pandas'],
    extraSkillsCount: 2,
    location: 'Hyderabad',
    prefLocation: 'Hyderabad / Remote',
    source: 'Indeed',
    availability: 'Passive',
    addedOn: 'Oct 19, 2025',
    about: 'Detail-oriented Data Analyst adept at uncovering insights and generating automated executive dashboards from large data sets.',
    salary: '₹7 - 10 LPA',
    matchScore: 88,
    education: { degree: 'B.Sc in Statistics', school: 'Osmania University, Hyderabad', period: '2019 - 2022' },
    experience: { title: 'Data Analyst', company: 'DataMind Insights', period: 'Aug 2022 - Present • 2 yrs' },
    resumeName: 'Sneha_Iyer_Resume.pdf',
    resumeSize: '2.1 MB'
  },
  {
    id: 'POOL-004',
    name: 'Arjun Nair',
    email: 'arjun.nair@email.com',
    phone: '+91 98765 33445',
    avatar: avatar4,
    role: 'Backend Developer',
    exp: '4+ yrs',
    skills: ['Java', 'Spring Boot'],
    allSkills: ['Java', 'Spring Boot', 'Microservices', 'PostgreSQL', 'Docker', 'AWS'],
    extraSkillsCount: 1,
    location: 'Chennai',
    prefLocation: 'Chennai / Bengaluru',
    source: 'Referral',
    availability: 'Active',
    addedOn: 'Oct 18, 2025',
    about: 'Backend architect focused on robust microservice designs, low latency messaging queues and cloud distributed architectures.',
    salary: '₹14 - 18 LPA',
    matchScore: 92,
    education: { degree: 'B.Tech in Computer Science', school: 'Vellore Institute of Technology', period: '2017 - 2021' },
    experience: { title: 'Senior Backend Dev', company: 'CloudScale Corp', period: 'Aug 2021 - Present • 4 yrs' },
    resumeName: 'Arjun_Nair_Resume.pdf',
    resumeSize: '3.1 MB'
  },
  {
    id: 'POOL-005',
    name: 'Vikram Singh',
    email: 'vikram.singh@email.com',
    phone: '+91 98765 55667',
    avatar: avatar5,
    role: 'Full Stack Developer',
    exp: '3+ yrs',
    skills: ['React', 'Node.js'],
    allSkills: ['React', 'Node.js', 'Express', 'MongoDB', 'Redis', 'Docker'],
    extraSkillsCount: 2,
    location: 'Bengaluru',
    prefLocation: 'Bengaluru / Hybrid',
    source: 'Company Website',
    availability: 'Active',
    addedOn: 'Oct 17, 2025',
    about: 'Full stack engineer with end-to-end web deployment experience across React, Node and AWS infrastructure.',
    salary: '₹11 - 15 LPA',
    matchScore: 89,
    education: { degree: 'B.E. in IT', school: 'BMS College of Engineering', period: '2018 - 2022' },
    experience: { title: 'Full Stack Dev', company: 'InnoTech Labs', period: 'Jun 2022 - Present • 3 yrs' },
    resumeName: 'Vikram_Singh_Resume.pdf',
    resumeSize: '2.0 MB'
  },
  {
    id: 'POOL-006',
    name: 'Meera Joshi',
    email: 'meera.joshi@email.com',
    phone: '+91 98765 77889',
    avatar: avatar2,
    role: 'QA Engineer',
    exp: '2+ yrs',
    skills: ['Selenium', 'TestNG'],
    allSkills: ['Selenium', 'TestNG', 'Cypress', 'Java', 'API Testing', 'Postman'],
    extraSkillsCount: 1,
    location: 'Pune',
    prefLocation: 'Pune / Remote',
    source: 'Naukri',
    availability: 'Passive',
    addedOn: 'Oct 16, 2025',
    about: 'Quality assurance specialist focusing on automated test suites and end-to-end regressions for high traffic platforms.',
    salary: '₹6 - 9 LPA',
    matchScore: 82,
    education: { degree: 'BCA', school: 'Pune University', period: '2019 - 2022' },
    experience: { title: 'QA Automation Engineer', company: 'QualityFirst Tech', period: 'Sep 2022 - Present • 2 yrs' },
    resumeName: 'Meera_Joshi_Resume.pdf',
    resumeSize: '1.9 MB'
  },
  {
    id: 'POOL-007',
    name: 'Siddharth Verma',
    email: 'siddharth.verma@email.com',
    phone: '+91 98765 66778',
    avatar: avatar4,
    role: 'DevOps Engineer',
    exp: '4+ yrs',
    skills: ['AWS', 'Docker'],
    allSkills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Linux'],
    extraSkillsCount: 2,
    location: 'Hyderabad',
    prefLocation: 'Hyderabad / Remote',
    source: 'LinkedIn',
    availability: 'Active',
    addedOn: 'Oct 15, 2025',
    about: 'DevOps engineer passionate about automated infrastructure pipelines, zero-downtime deployments and cloud resilience.',
    salary: '₹15 - 20 LPA',
    matchScore: 93,
    education: { degree: 'B.Tech in ECE', school: 'JNTU Hyderabad', period: '2017 - 2021' },
    experience: { title: 'DevOps Engineer', company: 'CloudOps Systems', period: 'Jun 2021 - Present • 4 yrs' },
    resumeName: 'Siddharth_Verma_Resume.pdf',
    resumeSize: '2.5 MB'
  },
  {
    id: 'POOL-008',
    name: 'Ananya Rao',
    email: 'ananya.rao@email.com',
    phone: '+91 98765 22334',
    avatar: avatar1,
    role: 'Product Designer',
    exp: '3+ yrs',
    skills: ['Figma', 'UI/UX'],
    allSkills: ['Figma', 'UI/UX', 'Wireframing', 'User Research', 'Prototyping', 'Design Systems'],
    extraSkillsCount: 1,
    location: 'Mumbai',
    prefLocation: 'Mumbai / Remote',
    source: 'Job Board',
    availability: 'Not Contacted',
    addedOn: 'Oct 14, 2025',
    about: 'Product and UI/UX designer crafting intuitive digital products and scalable cross-platform design systems.',
    salary: '₹9 - 13 LPA',
    matchScore: 85,
    education: { degree: 'B.Des in Visual Comm', school: 'National Institute of Design', period: '2018 - 2022' },
    experience: { title: 'Product Designer', company: 'DesignCraft Studio', period: 'May 2022 - Present • 3 yrs' },
    resumeName: 'Ananya_Rao_Portfolio.pdf',
    resumeSize: '4.2 MB'
  },
  {
    id: 'POOL-009',
    name: 'Deepak Patel',
    email: 'deepak.patel@email.com',
    phone: '+91 98765 88990',
    avatar: avatar3,
    role: 'System Administrator',
    exp: '5+ yrs',
    skills: ['Linux', 'Windows'],
    allSkills: ['Linux', 'Windows Server', 'Networking', 'Active Directory', 'Bash', 'Security'],
    extraSkillsCount: 1,
    location: 'Chennai',
    prefLocation: 'Chennai',
    source: 'Referral',
    availability: 'Active',
    addedOn: 'Oct 13, 2025',
    about: 'Experienced System Administrator managing enterprise Linux clusters, server security and IT infrastructure.',
    salary: '₹8 - 11 LPA',
    matchScore: 80,
    education: { degree: 'B.Sc in IT', school: 'Madras University', period: '2016 - 2019' },
    experience: { title: 'Senior Sysadmin', company: 'InfraCorp Services', period: 'Jul 2019 - Present • 5 yrs' },
    resumeName: 'Deepak_Patel_Resume.pdf',
    resumeSize: '1.7 MB'
  },
  {
    id: 'POOL-010',
    name: 'Riya Menon',
    email: 'riya.menon@email.com',
    phone: '+91 98765 44556',
    avatar: avatar5,
    role: 'Data Scientist',
    exp: '3+ yrs',
    skills: ['Python', 'Pandas'],
    allSkills: ['Python', 'Pandas', 'TensorFlow', 'Scikit-Learn', 'NLP', 'SQL'],
    extraSkillsCount: 2,
    location: 'Bengaluru',
    prefLocation: 'Bengaluru / Remote',
    source: 'LinkedIn',
    availability: 'Passive',
    addedOn: 'Oct 12, 2025',
    about: 'Data Scientist specializing in machine learning algorithms, NLP pipelines and predictive statistical models.',
    salary: '₹13 - 17 LPA',
    matchScore: 90,
    education: { degree: 'M.Tech in AI', school: 'IISc Bengaluru', period: '2020 - 2022' },
    experience: { title: 'Data Scientist', company: 'Axiom Analytics', period: 'Aug 2022 - Present • 3 yrs' },
    resumeName: 'Riya_Menon_Resume.pdf',
    resumeSize: '2.8 MB'
  }
];

const avatarPool = [avatar1, avatar2, avatar3, avatar4, avatar5];

function mapBackendPoolCandidate(item) {
  const numericId = Number(item.id || item.ID || 0);
  const rawAvatar = item.photo_url || item.avatar || '';
  const avatar =
    rawAvatar && !String(rawAvatar).startsWith('avatar')
      ? rawAvatar
      : avatarPool[numericId % avatarPool.length];
  const allSkills = Array.isArray(item.skills)
    ? item.skills
    : typeof item.skills === 'string' && item.skills.trim()
      ? item.skills.split(',').map((s) => s.trim()).filter(Boolean)
      : [];
  const roleStr = item.current_role || item.role || 'Candidate';
  const expStr = item.experience || item.exp || '0-2 yrs';
  const rawCreatedAt = item.created_at || item.createdAt;
  const addedOn =
    item.addedOn ||
    (rawCreatedAt
      ? new Date(rawCreatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : 'Recently');
  const resumeUrl = item.resume_url || item.resumeUrl || '';
  const resumeName =
    item.resume_name ||
    item.resumeName ||
    (resumeUrl ? resumeUrl.split('/').pop() : `${(item.name || 'Candidate').replace(/\s+/g, '_')}_Resume.pdf`);

  return {
    id: item.id,
    name: item.name || 'Candidate',
    email: item.email || '',
    phone: item.phone || '',
    role: roleStr,
    exp: expStr,
    skills: allSkills.slice(0, 2),
    extraSkillsCount: Math.max(0, allSkills.length - 2),
    allSkills,
    location: item.location || 'Bengaluru',
    source: item.source || 'Talent Pool',
    availability: item.availability || 'Active',
    addedOn,
    createdAt: rawCreatedAt || new Date().toISOString(),
    avatar,
    linkedin: item.linkedin_url || item.linkedin || '',
    github: item.github_url || item.github || '',
    salary: item.salary || 'Competitive',
    about: item.about || `${roleStr} with ${expStr} experience.`,
    matchScore: item.matchScore ?? 85,
    education: item.education || { degree: 'B.Tech / B.E.', school: 'University', period: 'Graduated' },
    experience: {
      title: roleStr,
      company: item.source || 'Talent Pool',
      period: expStr
    },
    resumeName,
    resumeUrl,
    resumeSize: item.resume_size || item.resumeSize || '1.4 MB'
  };
}

export default function AdminTalentPool() {
  const navigate = useNavigate();

  // State
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [activeTab, setActiveTab] = useState(0); // 0: All, 1: Active, 2: Passive, 3: Not Contacted
  const [searchQuery, setSearchQuery] = useState('');
  const [skillFilter, setSkillFilter] = useState('All');
  const [experienceFilter, setExperienceFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [availabilityFilter, setAvailabilityFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Recently Added');
  const [sortMenuAnchor, setSortMenuAnchor] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [jobsList, setJobsList] = useState([]);
  const [parsedImportRows, setParsedImportRows] = useState([]);
  const [importFileName, setImportFileName] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeViewerOpen, setResumeViewerOpen] = useState(false);

  // Detail panel subtab
  const [detailTab, setDetailTab] = useState(0); // 0: Overview, 1: Resume, 2: Activity, 3: Notes
  const [candidateNotes, setCandidateNotes] = useState({});
  const [newNoteText, setNewNoteText] = useState('');

  // Dialogs
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openImportDialog, setOpenImportDialog] = useState(false);
  const [openContactDialog, setOpenContactDialog] = useState(false);
  const [openApplicationDialog, setOpenApplicationDialog] = useState(false);
  const [contactSubject, setContactSubject] = useState('');
  const [contactBody, setContactBody] = useState('');
  const [selectedJobForApp, setSelectedJobForApp] = useState('');

  // Menu
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [menuCandidate, setMenuCandidate] = useState(null);

  // Snackbar
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Add form state
  const [newCandidate, setNewCandidate] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    exp: '2+ yrs',
    skills: '',
    location: 'Bengaluru',
    source: 'LinkedIn',
    availability: 'Active',
    salary: '₹10 - 14 LPA',
    about: ''
  });
  const [addPoolErrors, setAddPoolErrors] = useState({});

  const loadTalentPool = async () => {
    try {
      setLoading(true);
      const res = await getTalentPool();
      const rawList = res?.data?.candidates || res?.candidates || (Array.isArray(res?.data) ? res.data : []);
      const mapped = rawList.map(mapBackendPoolCandidate);
      setCandidates(mapped);
      setSelectedCandidate((prev) => {
        if (!prev) return null;
        return mapped.find((c) => c.id === prev.id) || null;
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || 'Failed to load talent pool',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTalentPool();
    getJobs()
      .then((res) => {
        const list = res?.data?.jobs || res?.jobs || (Array.isArray(res?.data) ? res.data : []);
        setJobsList(list);
        if (list.length > 0) {
          setSelectedJobForApp(String(list[0].id));
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!selectedCandidate?.id) return;
    getTalentPoolNotes(selectedCandidate.id)
      .then((res) => {
        const rawNotes = res?.data || res?.notes || [];
        const notes = rawNotes.map((n) => n.description || n.note || n);
        setCandidateNotes((prev) => ({
          ...prev,
          [selectedCandidate.id]: notes
        }));
      })
      .catch(() => {});
  }, [selectedCandidate?.id]);

  // Filter logic
  const filteredCandidates = useMemo(() => {
    const filtered = candidates.filter((item) => {
      // Tab filter
      if (activeTab === 1 && item.availability !== 'Active') return false;
      if (activeTab === 2 && item.availability !== 'Passive') return false;
      if (activeTab === 3 && item.availability !== 'Not Contacted') return false;

      // Dropdown filters
      if (availabilityFilter !== 'All' && item.availability !== availabilityFilter) return false;
      if (locationFilter !== 'All' && item.location !== locationFilter) return false;
      if (experienceFilter !== 'All') {
        if (experienceFilter === '0-2 yrs' && !item.exp.includes('1') && !item.exp.includes('2') && !item.exp.includes('0')) return false;
        if (experienceFilter === '3-5 yrs' && !item.exp.includes('3') && !item.exp.includes('4') && !item.exp.includes('5')) return false;
      }
      if (skillFilter !== 'All') {
        const hasSkill = item.allSkills.some((s) => s.toLowerCase() === skillFilter.toLowerCase());
        if (!hasSkill) return false;
      }

      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchEmail = item.email.toLowerCase().includes(q);
        const matchPhone = (item.phone || '').toLowerCase().includes(q);
        const matchRole = item.role.toLowerCase().includes(q);
        const matchLoc = item.location.toLowerCase().includes(q);
        const matchSkill = item.allSkills.some((s) => s.toLowerCase().includes(q));
        if (!matchName && !matchEmail && !matchPhone && !matchRole && !matchLoc && !matchSkill) return false;
      }

      return true;
    });

    const sorted = [...filtered];
    if (sortBy === 'Highest Match') {
      sorted.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    } else if (sortBy === 'Name (A-Z)') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      sorted.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }
    return sorted;
  }, [candidates, activeTab, availabilityFilter, locationFilter, experienceFilter, skillFilter, searchQuery, sortBy]);

  // Counts
  const totalCount = candidates.length;
  const activeCount = candidates.filter((c) => c.availability === 'Active').length;
  const passiveCount = candidates.filter((c) => c.availability === 'Passive').length;
  const notContactedCount = candidates.filter((c) => c.availability === 'Not Contacted').length;
  const highMatchCount = candidates.filter((c) => (c.matchScore || 0) >= 85).length;
  const readyCount = activeCount;

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = filteredCandidates.map((c) => c.id);
      setSelectedIds(allIds);
      if (filteredCandidates.length > 0) setSelectedCandidate(filteredCandidates[0]);
    } else {
      setSelectedIds([]);
      setSelectedCandidate(null);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) => {
      const isAlready = prev.includes(id);
      if (isAlready) {
        const next = prev.filter((i) => i !== id);
        if (selectedCandidate?.id === id) {
          const remaining = filteredCandidates.find((c) => next.includes(c.id));
          setSelectedCandidate(remaining || null);
        }
        return next;
      } else {
        const found = candidates.find((c) => c.id === id);
        if (found) setSelectedCandidate(found);
        return [...prev, id];
      }
    });
  };

  const handleRowClick = (cand) => {
    const id = cand.id;
    if (selectedCandidate?.id === id && selectedIds.includes(id)) {
      setSelectedCandidate(null);
      setSelectedIds((prev) => prev.filter((i) => i !== id));
    } else {
      setSelectedCandidate(cand);
      setSelectedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    }
  };

  const handleOpenMenu = (e, cand) => {
    e.stopPropagation();
    setMenuAnchorEl(e.currentTarget);
    setMenuCandidate(cand);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
    setMenuCandidate(null);
  };

  const handleAddCandidate = async () => {
    const errors = {};
    if (!newCandidate.name.trim()) {
      errors.name = 'Full Name is required';
    } else if (newCandidate.name.trim().length < 3) {
      errors.name = 'Full Name must be at least 3 characters';
    }

    const emailErr = validateEmail(newCandidate.email);
    if (emailErr) {
      errors.email = emailErr;
    }

    if (!newCandidate.phone.trim()) {
      errors.phone = 'Phone Number is required';
    }

    if (!newCandidate.role.trim()) {
      errors.role = 'Current Role is required';
    }

    if (!newCandidate.exp.trim()) {
      errors.exp = 'Experience is required';
    }

    if (!newCandidate.skills.trim()) {
      errors.skills = 'Key Skills are required';
    }

    if (!newCandidate.location.trim()) {
      errors.location = 'Location is required';
    }

    if (!resumeFile) {
      errors.resume = 'Resume file (PDF/DOC/DOCX) is required';
    }

    if (Object.keys(errors).length > 0) {
      setAddPoolErrors(errors);
      setSnackbar({ open: true, message: 'Please fill in all required fields and upload a resume', severity: 'error' });
      return;
    }

    try {
      setSubmitting(true);
      const uploadRes = await uploadCandidateResume(null, resumeFile);
      const uploadedData = uploadRes?.data || uploadRes || {};
      const skillList = newCandidate.skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      const res = await addToTalentPool({
        name: newCandidate.name.trim(),
        email: newCandidate.email.trim(),
        phone: newCandidate.phone.trim(),
        current_role: newCandidate.role.trim(),
        experience: newCandidate.exp.trim(),
        skills: skillList.join(', '),
        location: newCandidate.location.trim(),
        source: newCandidate.source || 'LinkedIn',
        availability: newCandidate.availability || 'Active',
        salary: newCandidate.salary || '₹10 - 14 LPA',
        about: newCandidate.about.trim() || `Qualified professional with experience in ${skillList.join(', ')}.`,
        resume_url: uploadedData.resume_url || '',
        resume_name: uploadedData.resume_name || resumeFile.name,
        resume_size: uploadedData.resume_size || `${(resumeFile.size / (1024 * 1024)).toFixed(2)} MB`
      });
      const created = mapBackendPoolCandidate(res?.data || res?.candidate || {});
      setCandidates((prev) => [created, ...prev]);
      setSelectedCandidate(created);
      setOpenAddDialog(false);
      setAddPoolErrors({});
      setResumeFile(null);
      setSnackbar({ open: true, message: `${created.name} added to Talent Pool successfully!`, severity: 'success' });
      setNewCandidate({
        name: '',
        email: '',
        phone: '',
        role: '',
        exp: '2+ yrs',
        skills: '',
        location: 'Bengaluru',
        source: 'LinkedIn',
        availability: 'Active',
        salary: '₹10 - 14 LPA',
        about: ''
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || 'Failed to add candidate to Talent Pool',
        severity: 'error'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSendContact = async () => {
    const targetIds = selectedIds.length > 0 && !selectedCandidate ? selectedIds : selectedCandidate ? [selectedCandidate.id] : [];
    if (targetIds.length === 0) return;

    try {
      setSubmitting(true);
      await Promise.all(
        targetIds.map((id) =>
          contactTalentPoolCandidate(id, {
            subject: contactSubject.trim() || 'Exciting opportunity at TraceU',
            body: contactBody.trim() || 'Hi, we reviewed your profile in our talent pool and would love to connect.'
          })
        )
      );
      await loadTalentPool();
      setOpenContactDialog(false);
      setSnackbar({
        open: true,
        message:
          targetIds.length > 1
            ? `Message sent to ${targetIds.length} candidates!`
            : `Message sent to ${selectedCandidate?.name || 'candidate'} successfully!`,
        severity: 'success'
      });
      setContactSubject('');
      setContactBody('');
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.error || 'Failed to send message',
        severity: 'error'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddToApplication = async () => {
    const targetCandidates =
      selectedIds.length > 0 && !selectedCandidate
        ? candidates.filter((c) => selectedIds.includes(c.id))
        : selectedCandidate
          ? [selectedCandidate]
          : [];
    if (targetCandidates.length === 0) return;

    const chosenJob = jobsList.find((j) => String(j.id) === String(selectedJobForApp));
    if (!chosenJob) {
      setSnackbar({ open: true, message: 'Please select a valid job', severity: 'error' });
      return;
    }

    try {
      setSubmitting(true);
      await Promise.all(
        targetCandidates.map((cand) =>
          createApplication({
            candidateId: cand.id,
            jobId: chosenJob.id,
            jobTitle: chosenJob.title,
            stage: 'Applied'
          })
        )
      );
      setOpenApplicationDialog(false);
      setSnackbar({
        open: true,
        message:
          targetCandidates.length > 1
            ? `${targetCandidates.length} candidates mapped to ${chosenJob.title}!`
            : `${targetCandidates[0].name} mapped to ${chosenJob.title}!`,
        severity: 'success'
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.error || 'Failed to map candidate to job',
        severity: 'error'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddNote = async () => {
    if (!newNoteText.trim() || !selectedCandidate) return;
    const noteText = newNoteText.trim();
    try {
      await addTalentPoolNote(selectedCandidate.id, noteText);
      setCandidateNotes((prev) => ({
        ...prev,
        [selectedCandidate.id]: [noteText, ...(prev[selectedCandidate.id] || [])]
      }));
      setNewNoteText('');
      setSnackbar({ open: true, message: 'Note added to candidate profile!', severity: 'success' });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.error || 'Failed to add note',
        severity: 'error'
      });
    }
  };

  const handleChangeAvailability = async (cand, availability) => {
    try {
      await updateTalentPoolAvailability(cand.id, availability);
      setCandidates((prev) => prev.map((c) => (c.id === cand.id ? { ...c, availability } : c)));
      if (selectedCandidate?.id === cand.id) {
        setSelectedCandidate((prev) => (prev ? { ...prev, availability } : prev));
      }
      setSnackbar({ open: true, message: `${cand.name} marked as ${availability}`, severity: 'success' });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.error || 'Failed to update availability',
        severity: 'error'
      });
    }
  };

  const handleRemoveCandidate = async (cand) => {
    try {
      await removeFromTalentPool(cand.id);
      setCandidates((prev) => prev.filter((c) => c.id !== cand.id));
      if (selectedCandidate?.id === cand.id) {
        setSelectedCandidate(null);
      }
      setSelectedIds((prev) => prev.filter((id) => id !== cand.id));
      setSnackbar({ open: true, message: `${cand.name} removed from Talent Pool`, severity: 'info' });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.error || 'Failed to remove candidate from Talent Pool',
        severity: 'error'
      });
    }
  };

  const handleBulkRemove = async () => {
    if (selectedIds.length === 0) return;
    try {
      await Promise.all(selectedIds.map((id) => removeFromTalentPool(id)));
      setCandidates((prev) => prev.filter((c) => !selectedIds.includes(c.id)));
      if (selectedCandidate && selectedIds.includes(selectedCandidate.id)) {
        setSelectedCandidate(null);
      }
      setSnackbar({ open: true, message: `Removed ${selectedIds.length} candidates from talent pool.`, severity: 'info' });
      setSelectedIds([]);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.error || 'Failed to remove selected candidates',
        severity: 'error'
      });
    }
  };

  const handleImportFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const buffer = await file.arrayBuffer();
      const wb = XLSX.read(buffer, { type: 'array' });
      const sheetName = wb.SheetNames[0];
      const sheet = wb.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
      const mappedRows = rows
        .map((r) => {
          const norm = {};
          Object.keys(r).forEach((k) => {
            norm[k.trim().toLowerCase()] = String(r[k] ?? '').trim();
          });
          const skillsRaw = norm.skills || norm['key skills'] || '';
          return {
            name: norm.name || norm['full name'] || '',
            email: norm.email || norm['email address'] || '',
            phone: norm.phone || norm['phone number'] || '',
            current_role: norm.role || norm['current role'] || 'Candidate',
            experience: norm.experience || norm.exp || '2+ yrs',
            skills: skillsRaw,
            location: norm.location || 'Bengaluru',
            source: norm.source || 'Import',
            availability: norm.availability || 'Active'
          };
        })
        .filter((r) => r.name && r.email);

      setImportFileName(file.name);
      setParsedImportRows(mappedRows);
      setSnackbar({
        open: true,
        message: `Parsed ${mappedRows.length} valid candidates from ${file.name}`,
        severity: mappedRows.length > 0 ? 'info' : 'warning'
      });
    } catch {
      setSnackbar({ open: true, message: 'Could not parse spreadsheet file', severity: 'error' });
    }
  };

  const handleStartImport = async () => {
    if (parsedImportRows.length === 0) {
      setSnackbar({ open: true, message: 'Please choose a CSV or Excel file with valid candidates first', severity: 'error' });
      return;
    }
    try {
      setSubmitting(true);
      const res = await importTalentPool(parsedImportRows);
      await loadTalentPool();
      setOpenImportDialog(false);
      setImportFileName('');
      setParsedImportRows([]);
      setSnackbar({
        open: true,
        message: `Imported ${res.imported ?? parsedImportRows.length} candidates into Talent Pool!`,
        severity: 'success'
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.error || 'Failed to import candidates',
        severity: 'error'
      });
    } finally {
      setSubmitting(false);
    }
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
            <ContactsOutlined style={{ fontSize: 14 }} />
            Talent Pool
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
              Talent Pool Management
            </Typography>
            <Typography sx={{ color: '#6B7280', fontSize: 14, fontWeight: 400, lineHeight: 1.5, mt: 0.5 }}>
              Build and manage a reusable pool of qualified candidates for future opportunities.
            </Typography>
          </Box>

          <Stack direction="row" alignItems="center" spacing={1.5} flexShrink={0}>
            <Button
              variant="contained"
              startIcon={<PlusOutlined />}
              onClick={() => setOpenAddDialog(true)}
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
              Add to Talent Pool
            </Button>

            <Button
              variant="outlined"
              startIcon={<UploadOutlined />}
              onClick={() => setOpenImportDialog(true)}
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
              Import Candidates
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* 4 Top KPI Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          {
            title: 'Total Talent Pool',
            count: totalCount,
            change: '+12%',
            subtitle: 'Qualified candidates',
            icon: <ContactsOutlined style={{ fontSize: 18 }} />,
            color: '#530EF0',
            bg: 'rgba(83, 14, 240, 0.08)'
          },
          {
            title: 'High Match Candidates',
            count: highMatchCount,
            change: '+18%',
            subtitle: 'Strong skill match',
            icon: <StarOutlined style={{ fontSize: 18 }} />,
            color: '#F59E0B',
            bg: 'rgba(245, 158, 11, 0.1)'
          },
          {
            title: 'Ready for Opportunities',
            count: readyCount,
            change: '+24%',
            subtitle: 'Open to new roles',
            icon: <ShoppingOutlined style={{ fontSize: 18 }} />,
            color: '#10B981',
            bg: 'rgba(16, 185, 129, 0.1)'
          },
          {
            title: 'Not Contacted',
            count: notContactedCount,
            change: '-12%',
            subtitle: 'Need follow up',
            icon: <ClockCircleOutlined style={{ fontSize: 18 }} />,
            color: '#3B82F6',
            bg: 'rgba(59, 130, 246, 0.1)'
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
                  icon={kpi.change.startsWith('+') ? <ArrowUpOutlined style={{ fontSize: 10, color: '#10B981' }} /> : <ArrowDownOutlined style={{ fontSize: 10, color: '#EF4444' }} />}
                  label={kpi.change}
                  size="small"
                  sx={{
                    bgcolor: kpi.change.startsWith('+') ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
                    color: kpi.change.startsWith('+') ? '#10B981' : '#EF4444',
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

      {/* Main Content Layout: Table on left, Profile Card on right */}
      <Grid container spacing={2.5} alignItems="flex-start">
        {/* Left Column: Talent Pool Table */}
        <Grid size={{ xs: 12, lg: selectedCandidate ? 7.8 : 12 }}>
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
                onChange={(e, v) => {
                  setActiveTab(v);
                  setPage(1);
                }}
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
                <Tab label={`All Candidates (${totalCount})`} />
                <Tab label={`Active (${activeCount})`} />
                <Tab label={`Passive (${passiveCount})`} />
                <Tab label={`Not Contacted (${notContactedCount})`} />
              </Tabs>

              <Button
                size="small"
                onClick={(e) => setSortMenuAnchor(e.currentTarget)}
                sx={{ color: '#6B7280', fontWeight: 500, my: 1, textTransform: 'none', fontSize: 12.5 }}
              >
                Sort by: <strong style={{ marginLeft: 4, color: '#111827' }}>{sortBy} ⌵</strong>
              </Button>
              <Menu
                anchorEl={sortMenuAnchor}
                open={Boolean(sortMenuAnchor)}
                onClose={() => setSortMenuAnchor(null)}
              >
                {['Recently Added', 'Highest Match', 'Name (A-Z)'].map((opt) => (
                  <MenuItem
                    key={opt}
                    selected={sortBy === opt}
                    onClick={() => {
                      setSortBy(opt);
                      setSortMenuAnchor(null);
                    }}
                  >
                    {opt}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Filter Row */}
            <Box sx={{ p: 2, bgcolor: '#FAFAFB', borderBottom: '1px solid #F3F4F6' }}>
              <Grid container spacing={1.5} alignItems="center">
                <Grid size={{ xs: 12, sm: 4, md: 4 }}>
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
                    sx={{
                      bgcolor: '#FFF',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        '& fieldset': { borderColor: '#E5E7EB' }
                      }
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 6, sm: 2, md: 2 }}>
                  <Select
                    fullWidth
                    size="small"
                    value={skillFilter}
                    onChange={(e) => setSkillFilter(e.target.value)}
                    sx={{
                      bgcolor: '#FFF',
                      borderRadius: '8px',
                      fontSize: 13,
                      '& fieldset': { borderColor: '#E5E7EB' }
                    }}
                  >
                    <MenuItem value="All">All Skills</MenuItem>
                    <MenuItem value="React">React</MenuItem>
                    <MenuItem value="Node.js">Node.js</MenuItem>
                    <MenuItem value="TypeScript">TypeScript</MenuItem>
                    <MenuItem value="Python">Python</MenuItem>
                    <MenuItem value="Java">Java</MenuItem>
                    <MenuItem value="SQL">SQL</MenuItem>
                  </Select>
                </Grid>

                <Grid size={{ xs: 6, sm: 2, md: 2 }}>
                  <Select
                    fullWidth
                    size="small"
                    value={experienceFilter}
                    onChange={(e) => setExperienceFilter(e.target.value)}
                    sx={{
                      bgcolor: '#FFF',
                      borderRadius: '8px',
                      fontSize: 13,
                      '& fieldset': { borderColor: '#E5E7EB' }
                    }}
                  >
                    <MenuItem value="All">All Experience</MenuItem>
                    <MenuItem value="0-2 yrs">0-2 yrs</MenuItem>
                    <MenuItem value="3-5 yrs">3-5 yrs</MenuItem>
                  </Select>
                </Grid>

                <Grid size={{ xs: 6, sm: 2, md: 2 }}>
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
                    <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                    <MenuItem value="Pune">Pune</MenuItem>
                    <MenuItem value="Mumbai">Mumbai</MenuItem>
                  </Select>
                </Grid>

                <Grid size={{ xs: 6, sm: 2, md: 2 }}>
                  <Select
                    fullWidth
                    size="small"
                    value={availabilityFilter}
                    onChange={(e) => setAvailabilityFilter(e.target.value)}
                    sx={{
                      bgcolor: '#FFF',
                      borderRadius: '8px',
                      fontSize: 13,
                      '& fieldset': { borderColor: '#E5E7EB' }
                    }}
                  >
                    <MenuItem value="All">Availability</MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Passive">Passive</MenuItem>
                    <MenuItem value="Not Contacted">Not Contacted</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </Box>

            {/* Bulk Actions Toolbar */}
            {selectedIds.length > 0 && (
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
                    label={`${selectedIds.length} ${selectedIds.length === 1 ? 'Candidate' : 'Candidates'} Selected`}
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
                    onClick={() => setOpenApplicationDialog(true)}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30, color: '#530EF0', borderColor: '#C084FC' }}
                  >
                    Map to Job ({selectedIds.length})
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setOpenContactDialog(true)}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30, color: '#6B7280', borderColor: '#D1D5DB' }}
                  >
                    Send Bulk Message
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setSnackbar({ open: true, message: `Exporting ${selectedIds.length} talent profiles...`, severity: 'info' })}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30, color: '#6B7280', borderColor: '#D1D5DB' }}
                  >
                    Export Profiles
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={handleBulkRemove}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30 }}
                  >
                    Remove
                  </Button>
                  <Button
                    size="small"
                    onClick={() => setSelectedIds([])}
                    sx={{ textTransform: 'none', color: '#6B7280', fontSize: 12, ml: 1 }}
                  >
                    Deselect All
                  </Button>
                </Stack>
              </Box>
            )}

            {/* Candidates Table */}
            <TableContainer sx={{ overflowX: 'auto' }}>
              <Table size="medium">
                <TableHead sx={{ bgcolor: '#F9FAFB' }}>
                  <TableRow>
                    <TableCell padding="checkbox" sx={{ pl: 2 }}>
                      <Checkbox
                        size="small"
                        checked={selectedIds.length === filteredCandidates.length && filteredCandidates.length > 0}
                        indeterminate={selectedIds.length > 0 && selectedIds.length < filteredCandidates.length}
                        onChange={handleSelectAll}
                        sx={{ color: '#D1D5DB', '&.Mui-checked': { color: '#530EF0' } }}
                      />
                    </TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>
                      Candidate
                    </TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>
                      Current Role
                    </TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>
                      Experience
                    </TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>
                      Key Skills
                    </TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>
                      Location
                    </TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>
                      Source
                    </TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>
                      Availability
                    </TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>
                      Added On
                    </TableCell>
                    <TableCell align="right" sx={{ pr: 2, color: '#6B7280', fontWeight: 600, fontSize: 12 }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCandidates.map((cand) => {
                    const isSelected = selectedCandidate?.id === cand.id;
                    const isChecked = selectedIds.includes(cand.id);

                    return (
                      <TableRow
                        key={cand.id}
                        hover
                        onClick={() => handleRowClick(cand)}
                        sx={{
                          cursor: 'pointer',
                          bgcolor: isSelected ? 'rgba(83, 14, 240, 0.04)' : 'transparent',
                          '&:hover': { bgcolor: isSelected ? 'rgba(83, 14, 240, 0.07)' : '#F9FAFB' }
                        }}
                      >
                        <TableCell padding="checkbox" sx={{ pl: 2, verticalAlign: 'middle' }} onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            size="small"
                            checked={isChecked}
                            onChange={() => handleSelectRow(cand.id)}
                            sx={{ color: '#D1D5DB', '&.Mui-checked': { color: '#530EF0' } }}
                          />
                        </TableCell>

                        <TableCell sx={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          <Stack direction="row" spacing={1.5} alignItems="center">
                            <Avatar src={cand.avatar} alt={cand.name} sx={{ width: 36, height: 36 }} />
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: 13.5, lineHeight: 1.3 }}>
                                {cand.name}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 12, lineHeight: 1.2 }}>
                                {cand.email}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>

                        <TableCell sx={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          <Typography variant="body2" sx={{ color: '#374151', fontSize: 13, whiteSpace: 'nowrap' }}>
                            {cand.role}
                          </Typography>
                        </TableCell>

                        <TableCell sx={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          <Typography variant="body2" sx={{ color: '#4B5563', fontSize: 13, whiteSpace: 'nowrap' }}>
                            {cand.exp}
                          </Typography>
                        </TableCell>

                        <TableCell sx={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          <Stack direction="row" spacing={0.5} alignItems="center" flexWrap="nowrap">
                            {cand.skills.map((sk) => (
                              <Chip
                                key={sk}
                                label={sk}
                                size="small"
                                sx={{
                                  fontSize: 11,
                                  height: 22,
                                  bgcolor: '#F3F4F6',
                                  color: '#374151',
                                  borderRadius: '4px'
                                }}
                              />
                            ))}
                            {cand.extraSkillsCount > 0 && (
                              <Chip
                                label={`+${cand.extraSkillsCount}`}
                                size="small"
                                sx={{
                                  fontSize: 11,
                                  height: 22,
                                  bgcolor: '#E5E7EB',
                                  color: '#4B5563',
                                  borderRadius: '4px'
                                }}
                              />
                            )}
                          </Stack>
                        </TableCell>

                        <TableCell sx={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          <Typography variant="body2" sx={{ color: '#4B5563', fontSize: 13, whiteSpace: 'nowrap' }}>
                            {cand.location}
                          </Typography>
                        </TableCell>

                        <TableCell sx={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          <Stack direction="row" spacing={0.8} alignItems="center">
                            {cand.source === 'LinkedIn' && <LinkedinFilled style={{ color: '#0A66C2', fontSize: 14 }} />}
                            <Typography variant="body2" sx={{ color: '#4B5563', fontSize: 13, whiteSpace: 'nowrap' }}>
                              {cand.source}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell sx={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          <Chip
                            label={cand.availability}
                            size="small"
                            sx={{
                              fontSize: 11.5,
                              fontWeight: 600,
                              height: 24,
                              bgcolor:
                                cand.availability === 'Active'
                                  ? 'rgba(16, 185, 129, 0.1)'
                                  : cand.availability === 'Passive'
                                  ? 'rgba(59, 130, 246, 0.1)'
                                  : 'rgba(245, 158, 11, 0.1)',
                              color:
                                cand.availability === 'Active'
                                  ? '#10B981'
                                  : cand.availability === 'Passive'
                                  ? '#3B82F6'
                                  : '#F59E0B',
                              borderRadius: '6px'
                            }}
                          />
                        </TableCell>

                        <TableCell sx={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12.5, whiteSpace: 'nowrap' }}>
                            {cand.addedOn}
                          </Typography>
                        </TableCell>

                        <TableCell align="right" sx={{ pr: 2, verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          <IconButton size="small" onClick={(e) => handleOpenMenu(e, cand)}>
                            <MoreOutlined style={{ color: '#9CA3AF' }} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
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
                Showing {filteredCandidates.length === 0 ? 0 : (page - 1) * rowsPerPage + 1}-{Math.min(page * rowsPerPage, filteredCandidates.length)} of {filteredCandidates.length} candidates
              </Typography>
              <Pagination
                count={Math.max(1, Math.ceil(filteredCandidates.length / rowsPerPage))}
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

        {/* Right Column: Candidate Profile Card */}
        {selectedCandidate && (
          <Grid size={{ xs: 12, lg: 4.2 }}>
            <Card
              sx={{
                borderRadius: '16px',
                border: '1px solid #F3F4F6',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                bgcolor: '#FFF',
                overflow: 'hidden',
                position: 'sticky',
                top: 20
              }}
            >
              {/* Profile Card Header */}
              <Box sx={{ p: 2.5, pb: 2, position: 'relative' }}>
                <IconButton
                  size="small"
                  onClick={() => setSelectedCandidate(null)}
                  sx={{ position: 'absolute', top: 16, right: 16, color: '#9CA3AF' }}
                >
                  <CloseOutlined style={{ fontSize: 13 }} />
                </IconButton>

                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    src={selectedCandidate.avatar}
                    alt={selectedCandidate.name}
                    sx={{ width: 68, height: 68, border: '3px solid #FFF', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                  />
                  <Box sx={{ pr: 3 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827', fontSize: '1.15rem' }}>
                        {selectedCandidate.name}
                      </Typography>
                      <Chip
                        label={selectedCandidate.availability}
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: 11,
                          fontWeight: 600,
                          bgcolor: 'rgba(16, 185, 129, 0.1)',
                          color: '#10B981',
                          borderRadius: '4px'
                        }}
                      />
                    </Stack>
                    <Typography variant="body2" sx={{ color: '#4B5563', fontWeight: 500, fontSize: 13.5 }}>
                      {selectedCandidate.role}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.3 }}>
                      <EnvironmentOutlined style={{ fontSize: 11 }} /> {selectedCandidate.location}, Karnataka • {selectedCandidate.exp}
                    </Typography>
                  </Box>
                </Stack>

                {/* Contact Links */}
                <Stack spacing={0.6} sx={{ mt: 2, pt: 1.5, borderTop: '1px solid #F3F4F6' }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <MailOutlined style={{ color: '#9CA3AF', fontSize: 13 }} />
                    <Typography variant="caption" sx={{ color: '#530EF0', fontWeight: 500, fontSize: 12.5 }}>
                      {selectedCandidate.email}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <PhoneOutlined style={{ color: '#9CA3AF', fontSize: 13 }} />
                    <Typography variant="caption" sx={{ color: '#4B5563', fontSize: 12.5 }}>
                      {selectedCandidate.phone}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <LinkedinFilled style={{ color: '#0A66C2', fontSize: 13 }} />
                    <Typography variant="caption" sx={{ color: '#530EF0', fontWeight: 500, fontSize: 12.5 }}>
                      linkedin.com/in/{selectedCandidate.name.toLowerCase().replace(/\s+/g, '-')}
                    </Typography>
                  </Stack>
                </Stack>

                {/* 3 Action Buttons */}
                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => setOpenContactDialog(true)}
                    sx={{
                      bgcolor: '#530EF0',
                      color: '#FFF',
                      fontSize: 13,
                      fontWeight: 600,
                      borderRadius: '8px',
                      textTransform: 'none',
                      py: 0.8,
                      '&:hover': { bgcolor: '#430bc2' }
                    }}
                  >
                    Contact
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => {
                      setDetailTab(3);
                    }}
                    sx={{
                      borderColor: '#E5E7EB',
                      color: '#374151',
                      fontSize: 13,
                      fontWeight: 600,
                      borderRadius: '8px',
                      textTransform: 'none',
                      py: 0.8,
                      '&:hover': { borderColor: '#D1D5DB', bgcolor: '#F9FAFB' }
                    }}
                  >
                    Add Note
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => setOpenApplicationDialog(true)}
                    sx={{
                      borderColor: '#E5E7EB',
                      color: '#374151',
                      fontSize: 13,
                      fontWeight: 600,
                      borderRadius: '8px',
                      textTransform: 'none',
                      py: 0.8,
                      '&:hover': { borderColor: '#D1D5DB', bgcolor: '#F9FAFB' }
                    }}
                  >
                    Add to Application
                  </Button>
                </Stack>
              </Box>

              {/* Detail Tabs */}
              <Box sx={{ borderBottom: '1px solid #F3F4F6', px: 2 }}>
                <Tabs
                  value={detailTab}
                  onChange={(e, v) => setDetailTab(v)}
                  sx={{
                    minHeight: 40,
                    '& .MuiTabs-indicator': { bgcolor: '#530EF0', height: 2 },
                    '& .MuiTab-root': {
                      minHeight: 40,
                      fontSize: 12.5,
                      textTransform: 'none',
                      fontWeight: 600,
                      color: '#6B7280',
                      '&.Mui-selected': { color: '#530EF0' }
                    }
                  }}
                >
                  <Tab label="Overview" />
                  <Tab label="Resume" />
                  <Tab label="Activity" />
                  <Tab label="Notes" />
                </Tabs>
              </Box>

              {/* Detail Tab Contents */}
              <Box sx={{ p: 2.5, maxHeight: 540, overflowY: 'auto' }}>
                {detailTab === 0 && (
                  <Stack spacing={2.2}>
                    {/* About */}
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#111827', fontSize: 13, mb: 0.6 }}>
                        About
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#4B5563', fontSize: 12.5, lineHeight: 1.6 }}>
                        {selectedCandidate.about}
                      </Typography>
                    </Box>

                    {/* Quick Badges in light tinted boxes */}
                    <Grid container spacing={1}>
                      <Grid size={{ xs: 4 }}>
                        <Box sx={{ p: 1.2, bgcolor: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: '8px', textAlign: 'center' }}>
                          <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11, display: 'block' }}>
                            Availability
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: 12.5, mt: 0.2 }}>
                            Immediate
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid size={{ xs: 4 }}>
                        <Box sx={{ p: 1.2, bgcolor: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: '8px', textAlign: 'center' }}>
                          <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11, display: 'block' }}>
                            Expected Salary
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: 12.5, mt: 0.2 }}>
                            {selectedCandidate.salary}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid size={{ xs: 4 }}>
                        <Box sx={{ p: 1.2, bgcolor: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: '8px', textAlign: 'center' }}>
                          <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11, display: 'block' }}>
                            Location
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: 12, mt: 0.2 }} noWrap>
                            {selectedCandidate.location}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    {/* Skills */}
                    <Box>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#111827', fontSize: 13 }}>
                          Skills
                        </Typography>
                        <Button
                          size="small"
                          onClick={() => setSnackbar({ open: true, message: 'Candidate profile skills are locked for audit integrity', severity: 'info' })}
                          sx={{ textTransform: 'none', color: '#530EF0', fontWeight: 600, fontSize: 11.5, p: 0 }}
                        >
                          + Add
                        </Button>
                      </Stack>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.6 }}>
                        {selectedCandidate.allSkills.map((sk) => (
                          <Chip
                            key={sk}
                            label={sk}
                            size="small"
                            sx={{
                              bgcolor: 'rgba(83, 14, 240, 0.06)',
                              color: '#530EF0',
                              fontWeight: 500,
                              fontSize: 11.5,
                              height: 24,
                              borderRadius: '6px'
                            }}
                          />
                        ))}
                      </Box>
                    </Box>

                    {/* Education */}
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#111827', fontSize: 13, mb: 0.8 }}>
                        Education
                      </Typography>
                      <Box sx={{ p: 1.4, bgcolor: '#F9FAFB', borderRadius: '8px', border: '1px solid #F3F4F6' }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: 13 }}>
                          {selectedCandidate.education.degree}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#6B7280', display: 'block', fontSize: 12 }}>
                          {selectedCandidate.education.school}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11 }}>
                          {selectedCandidate.education.period}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Experience */}
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#111827', fontSize: 13, mb: 0.8 }}>
                        Experience
                      </Typography>
                      <Box sx={{ p: 1.4, bgcolor: '#F9FAFB', borderRadius: '8px', border: '1px solid #F3F4F6' }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: 13 }}>
                          {selectedCandidate.experience.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#6B7280', display: 'block', fontSize: 12 }}>
                          {selectedCandidate.experience.company}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11 }}>
                          {selectedCandidate.experience.period}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Resume Card */}
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#111827', fontSize: 13, mb: 0.8 }}>
                        Resume
                      </Typography>
                      <Box
                        sx={{
                          p: 1.4,
                          bgcolor: '#FFF',
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Stack direction="row" spacing={1.2} alignItems="center" sx={{ cursor: 'pointer' }} onClick={() => setResumeViewerOpen(true)}>
                          <FilePdfOutlined style={{ fontSize: 24, color: '#EF4444' }} />
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: 12.5, '&:hover': { color: '#530EF0', textDecoration: 'underline' } }}>
                              {selectedCandidate.resumeName}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11 }}>
                              {selectedCandidate.resumeSize} • Uploaded on {selectedCandidate.addedOn}
                            </Typography>
                          </Box>
                        </Stack>

                        <Stack direction="row" spacing={0.6}>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => setResumeViewerOpen(true)}
                            sx={{
                              fontSize: 11.5,
                              py: 0.3,
                              px: 1,
                              borderRadius: '6px',
                              borderColor: '#E5E7EB',
                              color: '#374151',
                              textTransform: 'none'
                            }}
                          >
                            View
                          </Button>
                          <IconButton
                            size="small"
                            component={selectedCandidate.resumeUrl ? 'a' : 'button'}
                            href={selectedCandidate.resumeUrl || undefined}
                            download={selectedCandidate.resumeUrl ? selectedCandidate.resumeName : undefined}
                            onClick={() => {
                              if (!selectedCandidate.resumeUrl) {
                                setResumeViewerOpen(true);
                              }
                            }}
                            sx={{ color: '#6B7280' }}
                          >
                            <DownloadOutlined style={{ fontSize: 14 }} />
                          </IconButton>
                        </Stack>
                      </Box>
                    </Box>
                  </Stack>
                )}

                {detailTab === 1 && (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <FilePdfOutlined style={{ fontSize: 48, color: '#EF4444', marginBottom: 12 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#111827' }}>
                      {selectedCandidate.resumeName}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#6B7280', display: 'block', mb: 2 }}>
                      {selectedCandidate.resumeSize} • Parsed & verified by AI Studio
                    </Typography>
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Button variant="contained" onClick={() => setResumeViewerOpen(true)} sx={{ bgcolor: '#530EF0', textTransform: 'none' }} startIcon={<EyeOutlined />}>
                        Open PDF Viewer
                      </Button>
                      <Button
                        variant="outlined"
                        component={selectedCandidate.resumeUrl ? 'a' : 'button'}
                        href={selectedCandidate.resumeUrl || undefined}
                        download={selectedCandidate.resumeUrl ? selectedCandidate.resumeName : undefined}
                        onClick={() => {
                          if (!selectedCandidate.resumeUrl) setResumeViewerOpen(true);
                        }}
                        sx={{ textTransform: 'none' }}
                        startIcon={<DownloadOutlined />}
                      >
                        Download
                      </Button>
                    </Stack>
                  </Box>
                )}

                {detailTab === 2 && (
                  <Stack spacing={2}>
                    <Box sx={{ p: 1.5, bgcolor: '#F9FAFB', borderRadius: '8px' }}>
                      <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11 }}>
                        Oct 21, 2025 • 10:30 AM
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: 13 }}>
                        Added to Talent Pool from LinkedIn
                      </Typography>
                    </Box>
                    <Box sx={{ p: 1.5, bgcolor: '#F9FAFB', borderRadius: '8px' }}>
                      <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11 }}>
                        Oct 21, 2025 • 11:00 AM
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: 13 }}>
                        AI Match Score computed: 94% match for Software Engineer
                      </Typography>
                    </Box>
                  </Stack>
                )}

                {detailTab === 3 && (
                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      placeholder="Add an internal evaluation note..."
                      size="small"
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      sx={{ bgcolor: '#FFF' }}
                    />
                    <Button
                      variant="contained"
                      onClick={handleAddNote}
                      sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 600, alignSelf: 'flex-end' }}
                    >
                      Post Note
                    </Button>
                    {(candidateNotes[selectedCandidate.id] || []).map((nt, idx) => (
                      <Box key={idx} sx={{ p: 1.5, bgcolor: '#F9FAFB', borderRadius: '8px', border: '1px solid #F3F4F6' }}>
                        <Typography variant="body2" sx={{ color: '#374151', fontSize: 13 }}>
                          {nt}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#9CA3AF', mt: 0.5, display: 'block' }}>
                          By Admin • Today
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                )}
              </Box>
            </Card>
          </Grid>
        )}
      </Grid>

      {/* Row Actions Menu */}
      <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleCloseMenu}>
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            setSelectedCandidate(menuCandidate);
            setOpenContactDialog(true);
          }}
        >
          Contact Candidate
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            setSelectedCandidate(menuCandidate);
            setOpenApplicationDialog(true);
          }}
        >
          Add to Application
        </MenuItem>
        <MenuItem
          onClick={() => {
            const target = menuCandidate;
            handleCloseMenu();
            if (target) handleChangeAvailability(target, target.availability === 'Active' ? 'Passive' : 'Active');
          }}
        >
          {menuCandidate?.availability === 'Active' ? 'Mark as Passive' : 'Mark as Active'}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            navigate('/admin/ai-studio');
          }}
        >
          Evaluate in AI Studio
        </MenuItem>
        <MenuItem
          onClick={() => {
            const target = menuCandidate;
            handleCloseMenu();
            if (target) handleRemoveCandidate(target);
          }}
          sx={{ color: '#EF4444' }}
        >
          Remove from Pool
        </MenuItem>
      </Menu>

      {/* Dialog: Add to Talent Pool */}
      <Dialog
        open={openAddDialog}
        onClose={() => {
          setOpenAddDialog(false);
          setAddPoolErrors({});
          setResumeFile(null);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700 }}>+ Add Candidate to Talent Pool</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Full Name"
              size="small"
              value={newCandidate.name}
              onChange={(e) => {
                setNewCandidate({ ...newCandidate, name: e.target.value });
                if (addPoolErrors.name) setAddPoolErrors({ ...addPoolErrors, name: '' });
              }}
              error={Boolean(addPoolErrors.name)}
              helperText={addPoolErrors.name}
              required
            />
            <TextField
              fullWidth
              type="email"
              label="Email Address"
              size="small"
              value={newCandidate.email}
              onChange={(e) => {
                setNewCandidate({ ...newCandidate, email: e.target.value });
                if (addPoolErrors.email) setAddPoolErrors({ ...addPoolErrors, email: '' });
              }}
              error={Boolean(addPoolErrors.email)}
              helperText={addPoolErrors.email}
              required
            />
            <TextField
              fullWidth
              label="Phone Number"
              size="small"
              value={newCandidate.phone}
              onChange={(e) => {
                setNewCandidate({ ...newCandidate, phone: e.target.value });
                if (addPoolErrors.phone) setAddPoolErrors({ ...addPoolErrors, phone: '' });
              }}
              error={Boolean(addPoolErrors.phone)}
              helperText={addPoolErrors.phone}
              required
            />
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  label="Current Role"
                  size="small"
                  value={newCandidate.role}
                  onChange={(e) => {
                    setNewCandidate({ ...newCandidate, role: e.target.value });
                    if (addPoolErrors.role) setAddPoolErrors({ ...addPoolErrors, role: '' });
                  }}
                  error={Boolean(addPoolErrors.role)}
                  helperText={addPoolErrors.role}
                  required
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  label="Experience (e.g. 3+ yrs)"
                  size="small"
                  value={newCandidate.exp}
                  onChange={(e) => {
                    setNewCandidate({ ...newCandidate, exp: e.target.value });
                    if (addPoolErrors.exp) setAddPoolErrors({ ...addPoolErrors, exp: '' });
                  }}
                  error={Boolean(addPoolErrors.exp)}
                  helperText={addPoolErrors.exp}
                  required
                />
              </Grid>
            </Grid>
            <TextField
              fullWidth
              label="Key Skills (comma separated)"
              size="small"
              placeholder="React, TypeScript, Node.js"
              value={newCandidate.skills}
              onChange={(e) => {
                setNewCandidate({ ...newCandidate, skills: e.target.value });
                if (addPoolErrors.skills) setAddPoolErrors({ ...addPoolErrors, skills: '' });
              }}
              error={Boolean(addPoolErrors.skills)}
              helperText={addPoolErrors.skills}
              required
            />
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  label="Location"
                  size="small"
                  value={newCandidate.location}
                  onChange={(e) => {
                    setNewCandidate({ ...newCandidate, location: e.target.value });
                    if (addPoolErrors.location) setAddPoolErrors({ ...addPoolErrors, location: '' });
                  }}
                  error={Boolean(addPoolErrors.location)}
                  helperText={addPoolErrors.location}
                  required
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Select
                  fullWidth
                  size="small"
                  value={newCandidate.availability}
                  onChange={(e) => setNewCandidate({ ...newCandidate, availability: e.target.value })}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Passive">Passive</MenuItem>
                  <MenuItem value="Not Contacted">Not Contacted</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Box
              sx={{
                p: 2,
                border: `1.5px dashed ${addPoolErrors.resume ? '#EF4444' : '#D1D5DB'}`,
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
                <Typography variant="caption" sx={{ color: addPoolErrors.resume ? '#EF4444' : '#6B7280' }}>
                  {resumeFile ? `${resumeFile.name} (${(resumeFile.size / 1024).toFixed(0)} KB)` : addPoolErrors.resume || 'Upload candidate resume'}
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
                      if (addPoolErrors.resume) setAddPoolErrors({ ...addPoolErrors, resume: '' });
                    }
                  }}
                />
              </Button>
            </Box>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Summary / About"
              size="small"
              value={newCandidate.about}
              onChange={(e) => setNewCandidate({ ...newCandidate, about: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={() => {
              setOpenAddDialog(false);
              setAddPoolErrors({});
              setResumeFile(null);
            }}
            sx={{ textTransform: 'none', color: '#6B7280' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={submitting}
            onClick={handleAddCandidate}
            sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 600, '&:hover': { bgcolor: '#430bc2' } }}
          >
            {submitting ? 'Saving...' : 'Add to Pool'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog: Import Candidates */}
      <Dialog
        open={openImportDialog}
        onClose={() => {
          setOpenImportDialog(false);
          setImportFileName('');
          setParsedImportRows([]);
        }}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Import Candidates</DialogTitle>
        <DialogContent dividers>
          <Box
            sx={{
              p: 3,
              border: '2px dashed #D1D5DB',
              borderRadius: '12px',
              textAlign: 'center',
              bgcolor: '#F9FAFB'
            }}
          >
            <UploadOutlined style={{ fontSize: 36, color: '#530EF0', marginBottom: 12 }} />
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827' }}>
              {importFileName ? `${importFileName} (${parsedImportRows.length} rows)` : 'Upload CSV or Excel spreadsheet'}
            </Typography>
            <Typography variant="caption" sx={{ color: '#9CA3AF', display: 'block', mt: 0.5 }}>
              Columns should include: Name, Email, Phone, Skills, Role, Experience
            </Typography>
            <Button
              component="label"
              variant="outlined"
              size="small"
              sx={{ mt: 2, textTransform: 'none', borderColor: '#E5E7EB', color: '#374151' }}
            >
              Choose File
              <input type="file" hidden accept=".csv,.xlsx,.xls" onChange={handleImportFileChange} />
            </Button>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={() => {
              setOpenImportDialog(false);
              setImportFileName('');
              setParsedImportRows([]);
            }}
            sx={{ textTransform: 'none', color: '#6B7280' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={submitting || parsedImportRows.length === 0}
            onClick={handleStartImport}
            sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 600 }}
          >
            {submitting ? 'Importing...' : 'Start Import'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog: Contact Candidate */}
      <Dialog open={openContactDialog} onClose={() => setOpenContactDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Contact {selectedCandidate?.name}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <Typography variant="body2" sx={{ color: '#6B7280', fontSize: 13.5 }}>
              Recipient: <strong>{selectedCandidate?.email}</strong>
            </Typography>
            <TextField
              fullWidth
              size="small"
              label="Subject"
              value={contactSubject}
              onChange={(e) => setContactSubject(e.target.value)}
              placeholder="Exciting opportunity at TraceU"
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Message"
              value={contactBody}
              onChange={(e) => setContactBody(e.target.value)}
              placeholder="Hi, we reviewed your profile in our talent pool and would love to connect..."
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setOpenContactDialog(false)} sx={{ textTransform: 'none', color: '#6B7280' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSendContact}
            sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 600 }}
          >
            Send Message
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog: Add to Application */}
      <Dialog open={openApplicationDialog} onClose={() => setOpenApplicationDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Map Candidate to Job</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <Typography variant="body2" sx={{ color: '#6B7280', fontSize: 13.5 }}>
              Assign <strong>{selectedCandidate?.name || `${selectedIds.length} selected candidate(s)`}</strong> to an active requisition or vacancy:
            </Typography>
            <Select
              fullWidth
              size="small"
              value={selectedJobForApp}
              onChange={(e) => setSelectedJobForApp(e.target.value)}
              displayEmpty
            >
              {jobsList.length === 0 ? (
                <MenuItem value="" disabled>
                  No jobs available
                </MenuItem>
              ) : (
                jobsList.map((job) => (
                  <MenuItem key={job.id} value={String(job.id)}>
                    {job.title} ({job.jobCode || `JOB-${String(job.id).padStart(4, '0')}`})
                  </MenuItem>
                ))
              )}
            </Select>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setOpenApplicationDialog(false)} sx={{ textTransform: 'none', color: '#6B7280' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddToApplication}
            sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 600 }}
          >
            Confirm Mapping
          </Button>
        </DialogActions>
      </Dialog>

      {/* Full Screen Resume Viewer */}
      <FullScreenResumeDialog
        open={resumeViewerOpen}
        onClose={() => setResumeViewerOpen(false)}
        candidate={selectedCandidate}
      />

      {/* Snackbar feedback */}
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

