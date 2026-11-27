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
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import UploadOutlined from '@ant-design/icons/UploadOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import FilterOutlined from '@ant-design/icons/FilterOutlined';
import MoreOutlined from '@ant-design/icons/MoreOutlined';
import ArrowUpOutlined from '@ant-design/icons/ArrowUpOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import MailOutlined from '@ant-design/icons/MailOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import LinkedinFilled from '@ant-design/icons/LinkedinFilled';
import LinkOutlined from '@ant-design/icons/LinkOutlined';
import FilePdfOutlined from '@ant-design/icons/FilePdfOutlined';
import DownloadOutlined from '@ant-design/icons/DownloadOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import LockOutlined from '@ant-design/icons/LockOutlined';

// avatar assets
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import avatar5 from 'assets/images/users/avatar-5.png';

export default function HrCandidates() {
  const navigate = useNavigate();

  // Active filter tab
  const [activeTab, setActiveTab] = useState('All');

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [locFilter, setLocFilter] = useState('All Locations');
  const [expFilter, setExpFilter] = useState('All Experience');
  const [sortBy, setSortBy] = useState('Recently Added');

  // Selected candidate for Right Side Detail Panel
  const [selectedCand, setSelectedCand] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectRow = (e, cand) => {
    e.stopPropagation();
    const id = cand.id;
    setSelectedRows((prev) => {
      const isAlready = prev.includes(id);
      if (isAlready) {
        const next = prev.filter((r) => r !== id);
        if (selectedCand?.id === id) {
          const remaining = filteredCandidates.find((c) => next.includes(c.id));
          setSelectedCand(remaining || null);
        }
        return next;
      } else {
        setSelectedCand(cand);
        return [...prev, id];
      }
    });
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

  // Drawer subtabs
  const [drawerTab, setDrawerTab] = useState(0);

  // Modals
  const [openNewDialog, setOpenNewDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [resumeViewerCandidate, setResumeViewerCandidate] = useState(null);
  const [newCand, setNewCand] = useState({ name: '', email: '', role: '', exp: '', skills: '' });
  const [newCandErrors, setNewCandErrors] = useState({});

  // 10 Candidates list matching screenshot exactly
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      role: 'Software Engineer',
      exp: '2+ yrs',
      skills: ['React', 'Node.js'],
      moreSkills: 2,
      location: 'Bengaluru',
      source: 'LinkedIn',
      status: 'Active',
      addedOn: 'Oct 21, 2025',
      avatar: avatar3,
      about: 'Passionate Software Engineer with 2+ years of hands-on experience in building performant web applications using React, Node.js, and TypeScript.',
      availability: 'Immediate',
      salary: '₹8 - 12 LPA',
      prefLocation: 'Bengaluru / Hybrid',
      resumeName: 'Priya_Sharma_Resume.pdf',
      resumeSize: '2.4 MB',
      education: { degree: 'B.E. in Computer Science', school: 'Anna University, Chennai', period: '2019 - 2023' },
      experience: { title: 'Software Engineer', company: 'TechSolutions Pvt. Ltd.', period: 'Jun 2023 - Present • 2 yrs 4 mos' }
    },
    {
      id: 2,
      name: 'Rahul Kumar',
      email: 'rahul.kumar@email.com',
      role: 'Frontend Developer',
      exp: '3+ yrs',
      skills: ['React', 'TypeScript'],
      moreSkills: 1,
      location: 'Chennai',
      source: 'Naukri',
      status: 'In Process',
      addedOn: 'Oct 20, 2025',
      avatar: avatar2,
      about: 'Frontend Developer specialized in React, Next.js, and responsive design systems. Experienced in optimizing web vitals and cross-browser performance.',
      availability: '15 Days',
      salary: '₹10 - 15 LPA',
      prefLocation: 'Chennai / Hybrid',
      resumeName: 'Rahul_Kumar_CV.pdf',
      resumeSize: '1.9 MB',
      education: { degree: 'B.Tech in Information Technology', school: 'SRM Institute of Science', period: '2018 - 2022' },
      experience: { title: 'Frontend Developer', company: 'Infosys Ltd.', period: 'Jul 2022 - Present • 3 yrs 3 mos' }
    },
    {
      id: 3,
      name: 'Sneha Iyer',
      email: 'sneha.iyer@email.com',
      role: 'Data Analyst',
      exp: '2+ yrs',
      skills: ['SQL', 'Python'],
      moreSkills: 2,
      location: 'Hyderabad',
      source: 'Indeed',
      status: 'Shortlisted',
      addedOn: 'Oct 20, 2025',
      avatar: avatar4,
      about: 'Data Analyst skilled in SQL query optimization, Python data pipelines, Power BI, and Tableau dashboards delivering predictive business insights.',
      availability: 'Immediate',
      salary: '₹7 - 10 LPA',
      prefLocation: 'Hyderabad / Remote',
      resumeName: 'Sneha_Iyer_Resume.pdf',
      resumeSize: '2.1 MB',
      education: { degree: 'B.Sc. in Statistics & Data Science', school: 'Osmania University', period: '2020 - 2023' },
      experience: { title: 'Junior Data Analyst', company: 'Mu Sigma Inc.', period: 'Aug 2023 - Present • 2 yrs 2 mos' }
    },
    {
      id: 4,
      name: 'Arjun Nair',
      email: 'arjun.nair@email.com',
      role: 'Backend Developer',
      exp: '4+ yrs',
      skills: ['Java', 'Spring Boot'],
      moreSkills: 1,
      location: 'Chennai',
      source: 'Referral',
      status: 'Interview',
      addedOn: 'Oct 19, 2025',
      avatar: avatar1,
      about: 'Backend specialist proficient in Java, Spring Boot microservices, Kafka, Redis, and high-throughput distributed database architecture.',
      availability: '1 Month',
      salary: '₹14 - 18 LPA',
      prefLocation: 'Chennai / Bengaluru',
      resumeName: 'Arjun_Nair_Resume.pdf',
      resumeSize: '2.6 MB',
      education: { degree: 'B.Tech in Computer Science', school: 'NIT Trichy', period: '2017 - 2021' },
      experience: { title: 'Backend Engineer', company: 'Zoho Corporation', period: 'Aug 2021 - Present • 4 yrs 2 mos' }
    },
    {
      id: 5,
      name: 'Vikram Singh',
      email: 'vikram.singh@email.com',
      role: 'Full Stack Developer',
      exp: '3+ yrs',
      skills: ['React', 'Node.js'],
      moreSkills: 2,
      location: 'Bengaluru',
      source: 'Company Website',
      status: 'Active',
      addedOn: 'Oct 18, 2025',
      avatar: avatar5,
      about: 'Full Stack Engineer with end-to-end expertise in MERN stack, GraphQL, Docker, and AWS cloud deployment.',
      availability: 'Immediate',
      salary: '₹12 - 16 LPA',
      prefLocation: 'Bengaluru',
      resumeName: 'Vikram_Singh_CV.pdf',
      resumeSize: '2.0 MB',
      education: { degree: 'B.E. in Information Science', school: 'BMS College of Engineering', period: '2018 - 2022' },
      experience: { title: 'Full Stack Developer', company: 'Wipro Digital', period: 'Jan 2022 - Present • 3 yrs 9 mos' }
    },
    {
      id: 6,
      name: 'Meera Joshi',
      email: 'meera.joshi@email.com',
      role: 'QA Engineer',
      exp: '2+ yrs',
      skills: ['Selenium', 'TestNG'],
      moreSkills: 1,
      location: 'Pune',
      source: 'Naukri',
      status: 'In Process',
      addedOn: 'Oct 18, 2025',
      avatar: avatar3,
      about: 'QA Automation Engineer with extensive experience in Selenium WebDriver, TestNG, Cypress, CI/CD automated pipeline integration, and Postman API testing.',
      availability: '30 Days',
      salary: '₹6 - 9 LPA',
      prefLocation: 'Pune / Hybrid',
      resumeName: 'Meera_Joshi_Resume.pdf',
      resumeSize: '1.7 MB',
      education: { degree: 'B.Tech in Electronics', school: 'COEP Pune', period: '2019 - 2023' },
      experience: { title: 'Quality Assurance Analyst', company: 'Persistent Systems', period: 'Jul 2023 - Present • 2 yrs 3 mos' }
    },
    {
      id: 7,
      name: 'Siddharth Verma',
      email: 'siddharth.verma@email.com',
      role: 'Product Designer',
      exp: '4+ yrs',
      skills: ['AWS', 'Docker'],
      moreSkills: 2,
      location: 'Hyderabad',
      source: 'LinkedIn',
      status: 'Passive',
      addedOn: 'Oct 17, 2025',
      avatar: avatar2,
      about: 'Cloud and DevOps Engineer specializing in AWS architecture, Kubernetes orchestration, Terraform Infrastructure as Code, and CI/CD security.',
      availability: '2 Months',
      salary: '₹15 - 22 LPA',
      prefLocation: 'Hyderabad / Remote',
      resumeName: 'Siddharth_Verma_Resume.pdf',
      resumeSize: '2.3 MB',
      education: { degree: 'B.Tech in Computer Science', school: 'IIIT Hyderabad', period: '2017 - 2021' },
      experience: { title: 'Senior DevOps Engineer', company: 'Cognizant', period: 'Jun 2021 - Present • 4 yrs 4 mos' }
    },
    {
      id: 8,
      name: 'Ananya Rao',
      email: 'ananya.patel@email.com',
      role: 'System Administrator',
      exp: '5+ yrs',
      skills: ['Linux', 'Windows'],
      moreSkills: 1,
      location: 'Chennai',
      source: 'Job Board',
      status: 'Shortlisted',
      addedOn: 'Oct 16, 2025',
      avatar: avatar4,
      about: 'System Administrator experienced in enterprise Linux/Windows Server administration, Active Directory, network security, and VMware virtualization.',
      availability: 'Immediate',
      salary: '₹10 - 14 LPA',
      prefLocation: 'Chennai',
      resumeName: 'Ananya_Rao_Resume.pdf',
      resumeSize: '1.8 MB',
      education: { degree: 'B.Sc. in Computer Science', school: 'Loyola College, Chennai', period: '2016 - 2019' },
      experience: { title: 'Lead System Administrator', company: 'TCS', period: 'Jul 2019 - Present • 6 yrs 3 mos' }
    },
    {
      id: 9,
      name: 'Riya Menon',
      email: 'riya.menon@email.com',
      role: 'Data Scientist',
      exp: '3+ yrs',
      skills: ['Python', 'Pandas'],
      moreSkills: 2,
      location: 'Bengaluru',
      source: 'LinkedIn',
      status: 'Rejected',
      addedOn: 'Oct 15, 2025',
      avatar: avatar5,
      about: 'Data Scientist specializing in Natural Language Processing, computer vision models, LLM fine-tuning, and PyTorch production deployment.',
      availability: '15 Days',
      salary: '₹14 - 18 LPA',
      prefLocation: 'Bengaluru',
      resumeName: 'Riya_Menon_Resume.pdf',
      resumeSize: '2.5 MB',
      education: { degree: 'M.Tech in Data Science', school: 'IISc Bengaluru', period: '2020 - 2022' },
      experience: { title: 'Data Scientist', company: 'Fractal Analytics', period: 'Aug 2022 - Present • 3 yrs 2 mos' }
    }
  ]);

  // Top KPI Stats
  const kpiStats = [
    { label: 'Total Candidates', count: 248, change: '+ 12%', sub: 'Across all sources', icon: <TeamOutlined />, color: '#6929E2', bg: '#F3EDFF' },
    { label: 'New This Week', count: 42, change: '+ 28%', sub: 'Recently added', icon: <ClockCircleOutlined />, color: '#2563EB', bg: '#EFF6FF' },
    { label: 'Active Candidates', count: 96, change: '+ 18%', sub: 'Open to opportunities', icon: <CheckCircleOutlined />, color: '#10B981', bg: '#ECFDF5' },
    { label: 'In Process', count: 87, change: '+ 9%', sub: 'In hiring stages', icon: <UserOutlined />, color: '#F59E0B', bg: '#FFFBEB' }
  ];

  // Filtering
  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase()) || c.role.toLowerCase().includes(searchTerm.toLowerCase()) || c.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab =
      activeTab === 'All' ? true :
      activeTab === 'Active' ? c.status === 'Active' :
      activeTab === 'In Process' ? c.status === 'In Process' :
      activeTab === 'Passive' ? c.status === 'Passive' : true;
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
              <TeamOutlined />
            </Box>
            <Typography variant="caption" sx={{ color: '#530EF0', fontWeight: 600, fontSize: 12 }}>
              Candidates
            </Typography>
          </Stack>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 700, fontSize: { xs: 22, sm: 24 }, color: '#111827', letterSpacing: '-0.3px',
              
              mb: 0.5
            }}
          >
            Candidate Management
          </Typography>
          <Typography sx={{ color: '#6B7280', fontSize: 14, fontWeight: 400, lineHeight: 1.5, mt: 0.5 }}>
            Manage candidate profiles, resumes, skills, qualifications and application history.
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
            Add Candidate
          </Button>
          <Button
            variant="outlined"
            startIcon={<UploadOutlined />}
            onClick={() => setSnackbar({ open: true, message: 'Opening candidate import wizard...', severity: 'info' })}
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
            Import Candidates
          </Button>
        </Stack>
      </Box>

      {/* ========================================================================= */}
      {/* 2. TOP KPI CARDS (4 CARDS)                                               */}
      {/* ========================================================================= */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {kpiStats.map((kpi, idx) => (
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
            { id: 'All', label: 'All Candidates (248)' },
            { id: 'Active', label: 'Active (96)' },
            { id: 'In Process', label: 'In Process (87)' },
            { id: 'Hired', label: 'Hired (32)' },
            { id: 'Passive', label: 'Passive (45)' }
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
          <MenuItem value="Recently Added">Sort by: Recently Added</MenuItem>
          <MenuItem value="Name">Sort by: Name</MenuItem>
          <MenuItem value="Experience">Sort by: Experience</MenuItem>
        </Select>
      </Stack>

      {/* Filter Row */}
      <Card sx={{ p: 1.8, borderRadius: '14px', border: '1px solid #F3F4F6', bgcolor: '#FFF', mb: 2.5 }}>
        <Grid container spacing={1.5} alignItems="center">
          <Grid size={{ xs: 12, md: 4.5 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search by name, email, phone, skills, or keywords..."
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
              <MenuItem value="Data & Analytics">Data & Analytics</MenuItem>
            </Select>
          </Grid>

          <Grid size={{ xs: 6, sm: 3, md: 2.2 }}>
            <Select fullWidth size="small" value={locFilter} onChange={(e) => setLocFilter(e.target.value)} sx={{ borderRadius: '10px' }}>
              <MenuItem value="All Locations">All Locations</MenuItem>
              <MenuItem value="Bengaluru">Bengaluru</MenuItem>
              <MenuItem value="Chennai">Chennai</MenuItem>
              <MenuItem value="Hyderabad">Hyderabad</MenuItem>
              <MenuItem value="Pune">Pune</MenuItem>
            </Select>
          </Grid>

          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Select fullWidth size="small" value={expFilter} onChange={(e) => setExpFilter(e.target.value)} sx={{ borderRadius: '10px' }}>
              <MenuItem value="All Experience">All Experience</MenuItem>
              <MenuItem value="0-2 yrs">0-2 yrs</MenuItem>
              <MenuItem value="3-5 yrs">3-5 yrs</MenuItem>
              <MenuItem value="5+ yrs">5+ yrs</MenuItem>
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
                    onClick={() => {
                      setCandidates(candidates.map((c) => (selectedRows.includes(c.id) ? { ...c, status: 'Shortlisted' } : c)));
                      setSnackbar({ open: true, message: `Shortlisted ${selectedRows.length} candidates!`, severity: 'success' });
                    }}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30, color: '#6B7280', borderColor: '#D1D5DB' }}
                  >
                    Shortlist ({selectedRows.length})
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      setCandidates(candidates.map((c) => (selectedRows.includes(c.id) ? { ...c, status: 'Interview' } : c)));
                      setSnackbar({ open: true, message: `Moved ${selectedRows.length} candidates to Interview!`, severity: 'info' });
                    }}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30, color: '#6B7280', borderColor: '#D1D5DB' }}
                  >
                    Move to Interview
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setSnackbar({ open: true, message: `Sending bulk message to ${selectedRows.length} candidates...`, severity: 'info' })}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30, color: '#6B7280', borderColor: '#D1D5DB' }}
                  >
                    Email
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setSnackbar({ open: true, message: `Exporting profiles for ${selectedRows.length} candidates...`, severity: 'success' })}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30, color: '#6B7280', borderColor: '#D1D5DB' }}
                  >
                    Export
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={() => {
                      setCandidates(candidates.filter((c) => !selectedRows.includes(c.id)));
                      setSelectedRows([]);
                      setSelectedCand(null);
                      setSnackbar({ open: true, message: `Archived ${selectedRows.length} candidates.`, severity: 'error' });
                    }}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30 }}
                  >
                    Archive
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
                        checked={selectedRows.length === filteredCandidates.length && filteredCandidates.length > 0}
                        indeterminate={selectedRows.length > 0 && selectedRows.length < filteredCandidates.length}
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Candidate</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Current Role</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Experience</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Key Skills</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Location</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Source</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Status</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Added On</TableCell>
                    <TableCell align="right" sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCandidates.map((cand) => {
                    const isSelected = selectedCand?.id === cand.id;
                    const isChecked = selectedRows.includes(cand.id);
                    return (
                      <TableRow
                        key={cand.id}
                        hover
                        onClick={() => handleRowClick(cand)}
                        sx={{
                          cursor: 'pointer',
                          bgcolor: isSelected || isChecked ? 'rgba(83, 14, 240, 0.04)' : 'inherit'
                        }}
                      >
                        <TableCell padding="checkbox" sx={{ verticalAlign: 'middle' }} onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            size="small"
                            checked={isChecked}
                            onChange={(e) => handleSelectRow(e, cand)}
                          />
                        </TableCell>
                        <TableCell sx={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          <Stack direction="row" spacing={1.2} alignItems="center">
                            <Avatar src={cand.avatar} sx={{ width: 32, height: 32 }} />
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 700, color: '#111827', fontSize: 13.5, lineHeight: 1.3 }}>
                                {cand.name}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 12, fontWeight: 400, lineHeight: 1.2 }}>
                                {cand.email}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>
                        <TableCell sx={{ fontSize: 13, color: '#1F2937', fontWeight: 600, verticalAlign: 'middle', whiteSpace: 'nowrap' }}>{cand.role}</TableCell>
                        <TableCell sx={{ fontSize: 13, color: '#6B7280', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>{cand.exp}</TableCell>
                        <TableCell sx={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            {cand.skills.map((sk) => (
                              <Chip key={sk} label={sk} size="small" sx={{ height: 20, fontSize: 11, bgcolor: '#F3F4F6', color: '#374151' }} />
                            ))}
                            {cand.moreSkills && (
                              <Chip label={`+${cand.moreSkills}`} size="small" sx={{ height: 20, fontSize: 11, bgcolor: '#F3F4F6', color: '#6B7280' }} />
                            )}
                          </Stack>
                        </TableCell>
                        <TableCell sx={{ fontSize: 13, color: '#4B5563', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>{cand.location}</TableCell>
                        <TableCell sx={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          <Chip label={cand.source} size="small" sx={{ height: 22, fontSize: 11, fontWeight: 600, bgcolor: '#F9FAFB', color: '#4B5563' }} />
                        </TableCell>
                        <TableCell sx={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          <Chip
                            label={cand.status}
                            size="small"
                            sx={{
                              height: 22,
                              fontSize: 11,
                              fontWeight: 700,
                              bgcolor:
                                cand.status === 'Active' ? 'rgba(16, 185, 129, 0.1)' :
                                cand.status === 'In Process' ? 'rgba(59, 130, 246, 0.1)' :
                                cand.status === 'Shortlisted' ? 'rgba(245, 158, 11, 0.1)' :
                                cand.status === 'Interview' ? 'rgba(139, 92, 246, 0.1)' : '#F3F4F6',
                              color:
                                cand.status === 'Active' ? '#10B981' :
                                cand.status === 'In Process' ? '#2563EB' :
                                cand.status === 'Shortlisted' ? '#D97706' :
                                cand.status === 'Interview' ? '#8B5CF6' : '#6B7280'
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ fontSize: 12.5, color: '#6B7280', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>{cand.addedOn}</TableCell>
                        <TableCell align="right" sx={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          <IconButton size="small" onClick={() => setSnackbar({ open: true, message: `Candidate options for ${cand.name} opened`, severity: 'info' })}><MoreOutlined style={{ color: '#9CA3AF' }} /></IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ p: 2, borderTop: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="caption" sx={{ color: '#6B7280' }}>Showing 1-10 of 248 candidates</Typography>
              <Pagination count={5} size="small" sx={{ '& .Mui-selected': { bgcolor: '#530EF0 !important', color: '#FFF' } }} />
            </Box>
          </Card>
        </Box>

        {/* ======================================================================= */}
        {/* RIGHT DETAIL PANEL (for selected candidate)                            */}
        {/* ======================================================================= */}
        {selectedCand && (
          <Box sx={{ width: { xs: '100%', lg: 380 }, flexShrink: 0 }}>
            <Card sx={{ p: 2.5, borderRadius: '16px', border: '1px solid #F3F4F6', bgcolor: '#FFF' }}>
              {/* Header */}
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Avatar src={selectedCand.avatar} sx={{ width: 44, height: 44 }} />
                  <Box>
                    <Stack direction="row" spacing={0.8} alignItems="center">
                      <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#111827', fontSize: 14 }}>
                        {selectedCand.name}
                      </Typography>
                      <Chip label={selectedCand.status} size="small" sx={{ height: 20, fontSize: 11, fontWeight: 700, bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#10B981' }} />
                    </Stack>
                    <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12, display: 'block' }}>
                      {selectedCand.role}
                    </Typography>
                  </Box>
                </Stack>
                <IconButton size="small" onClick={() => setSelectedCand(null)}><CloseOutlined style={{ color: '#9CA3AF', fontSize: 12 }} /></IconButton>
              </Stack>

              <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12, display: 'block', mb: 0.5 }}>
                📍 {selectedCand.location} • 💼 {selectedCand.exp}
              </Typography>
              <Typography variant="caption" sx={{ color: '#530EF0', fontSize: 12, display: 'block', mb: 0.5 }}>
                ✉️ {selectedCand.email}
              </Typography>
              <Typography variant="caption" sx={{ color: '#2563EB', fontSize: 12, display: 'block', mb: 2 }}>
                🔗 {selectedCand.linkedin || 'linkedin.com/in/candidate'}
              </Typography>

              {/* Action Buttons */}
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<EyeOutlined />}
                  onClick={() => setResumeViewerCandidate(selectedCand)}
                  sx={{ bgcolor: '#530EF0', color: '#FFF', fontWeight: 700, textTransform: 'none', borderRadius: '8px', fontSize: 12, flex: 1, '&:hover': { bgcolor: '#430BC2' } }}
                >
                  View Resume
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setSnackbar({ open: true, message: `Contact email initiated to ${selectedCand.email}`, severity: 'info' })}
                  sx={{ borderColor: '#E5E7EB', color: '#374151', textTransform: 'none', borderRadius: '8px', fontSize: 12 }}
                >
                  Contact
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setSnackbar({ open: true, message: `${selectedCand.name} added to active job pipeline!`, severity: 'success' })}
                  sx={{ borderColor: '#E5E7EB', color: '#374151', textTransform: 'none', borderRadius: '8px', fontSize: 12, whiteSpace: 'nowrap' }}
                >
                  Add to Application
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
                  '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, fontSize: 12, minWidth: 60, p: 0.8, color: '#6B7280', '&.Mui-selected': { color: '#530EF0' } }
                }}
              >
                <Tab label="Overview" />
                <Tab label="Resume" />
                <Tab label="Applications (2)" />
                <Tab label="Notes" />
              </Tabs>

              {/* Tab 0: Overview */}
              {drawerTab === 0 && (
                <Stack spacing={2}>
                  {/* About */}
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', fontSize: 13.5, mb: 0.5, display: 'block' }}>
                      About
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#4B5563', fontSize: 12, lineHeight: 1.4, display: 'block' }}>
                      {selectedCand.about || 'Passionate professional with strong domain experience and proven technical results.'}
                    </Typography>
                  </Box>

                  {/* 3 stat cards */}
                  <Grid container spacing={1}>
                    <Grid size={{ xs: 4 }}>
                      <Box sx={{ p: 1, borderRadius: '10px', bgcolor: '#FAFAFB', border: '1px solid #F3F4F6' }}>
                        <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: '0.66rem', display: 'block' }}>Availability</Typography>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', fontSize: 11.5 }}>{selectedCand.availability || 'Immediate'}</Typography>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                      <Box sx={{ p: 1, borderRadius: '10px', bgcolor: '#FAFAFB', border: '1px solid #F3F4F6' }}>
                        <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: '0.66rem', display: 'block' }}>Expected Salary</Typography>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', fontSize: 11.5 }}>{selectedCand.salary || '₹8 - 14 LPA'}</Typography>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                      <Box sx={{ p: 1, borderRadius: '10px', bgcolor: '#FAFAFB', border: '1px solid #F3F4F6' }}>
                        <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: '0.66rem', display: 'block' }}>Preferred Location</Typography>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', fontSize: 11 }}>{selectedCand.prefLocation || selectedCand.location}</Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  {/* Key Skills */}
                  <Box>
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', fontSize: 13.5 }}>Key Skills</Typography>
                    </Box>
                    <Stack direction="row" spacing={0.6} flexWrap="wrap" useFlexGap>
                      {(selectedCand.skills || ['React', 'Node.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS']).map((sk) => (
                        <Chip key={sk} label={sk} size="small" sx={{ height: 22, fontSize: 11, bgcolor: '#F3F4F6' }} />
                      ))}
                    </Stack>
                  </Box>

                  {/* Experience */}
                  <Box>
                    <Box sx={{ mb: 0.5 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', fontSize: 13.5 }}>Experience</Typography>
                    </Box>
                    <Box sx={{ p: 1.2, borderRadius: '10px', bgcolor: '#FAFAFB', border: '1px solid #F3F4F6' }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', display: 'block' }}>
                        {selectedCand.experience?.title || selectedCand.role}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11.5, display: 'block' }}>
                        {selectedCand.experience?.company || 'TechSolutions Pvt. Ltd.'}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11 }}>
                        {selectedCand.experience?.period || `${selectedCand.exp} experience`}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Education */}
                  <Box>
                    <Box sx={{ mb: 0.5 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', fontSize: 13.5 }}>Education</Typography>
                    </Box>
                    <Box sx={{ p: 1.2, borderRadius: '10px', bgcolor: '#FAFAFB', border: '1px solid #F3F4F6' }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', display: 'block' }}>
                        {selectedCand.education?.degree || 'Bachelor of Engineering / B.Tech'}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11.5, display: 'block' }}>
                        {selectedCand.education?.school || 'Anna University, Chennai'}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11 }}>
                        {selectedCand.education?.period || '2019 - 2023'}
                      </Typography>
                    </Box>
                  </Box>
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
                          {selectedCand.resumeName || `${selectedCand.name.replace(/\s+/g, '_')}_Resume.pdf`}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11.5, display: 'block' }}>
                          {selectedCand.resumeSize || '2.2 MB'} • Uploaded {selectedCand.addedOn}
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack direction="row" spacing={1}>
                      <Button
                        fullWidth
                        size="small"
                        variant="contained"
                        startIcon={<DownloadOutlined />}
                        onClick={() => setSnackbar({ open: true, message: `Downloading ${selectedCand.name}'s resume PDF...`, severity: 'success' })}
                        sx={{ bgcolor: '#530EF0', color: '#FFF', fontWeight: 700, fontSize: 12, textTransform: 'none', borderRadius: '8px', '&:hover': { bgcolor: '#430BC2' } }}
                      >
                        Download PDF
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<EyeOutlined />}
                        onClick={() => setResumeViewerCandidate(selectedCand)}
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

              {/* Tab 2: Applications */}
              {drawerTab === 2 && (
                <Stack spacing={1.5}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', fontSize: 13 }}>
                    Active Applications ({selectedCand.name})
                  </Typography>
                  {[
                    { title: selectedCand.role, code: 'JOB-0012', stage: selectedCand.status, date: selectedCand.addedOn },
                    { title: 'Full Stack Engineer', code: 'JOB-0008', stage: 'Screening', date: 'Oct 14, 2025' }
                  ].map((app, idx) => (
                    <Box key={idx} sx={{ p: 1.5, borderRadius: '10px', bgcolor: '#F9FAFB', border: '1px solid #F3F4F6' }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" sx={{ fontWeight: 700, fontSize: 12.5, color: '#111827' }}>
                          {app.title}
                        </Typography>
                        <Chip label={app.stage} size="small" sx={{ height: 20, fontSize: 10.5, fontWeight: 700 }} />
                      </Stack>
                      <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11 }}>
                        {app.code} • Applied {app.date}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              )}

              {/* Tab 3: Notes */}
              {drawerTab === 3 && (
                <Stack spacing={1.5}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', fontSize: 13 }}>
                    Internal HR Evaluation Notes
                  </Typography>
                  <Box sx={{ p: 1.5, borderRadius: '10px', bgcolor: '#F9FAFB', border: '1px solid #F3F4F6' }}>
                    <Typography variant="caption" sx={{ color: '#4B5563', fontSize: 12, display: 'block', mb: 0.5 }}>
                      "Candidate showed strong problem-solving skills in initial screening. Recommended for technical round with Hiring Manager."
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11 }}>
                      Added by HR Recruiter • Oct 22, 2025
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
            </Card>
          </Box>
        )}
      </Box>

      {/* Modal: Add Candidate */}
      <Dialog
        open={openNewDialog}
        onClose={() => {
          setOpenNewDialog(false);
          setNewCandErrors({});
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: '1.05rem', color: '#111827' }}>
          Add New Candidate
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              size="small"
              label="Full Name *"
              placeholder="e.g. Aditi Rao"
              value={newCand.name}
              onChange={(e) => {
                setNewCand({ ...newCand, name: e.target.value });
                if (newCandErrors.name) setNewCandErrors({ ...newCandErrors, name: '' });
              }}
              error={Boolean(newCandErrors.name)}
              helperText={newCandErrors.name}
            />
            <TextField
              fullWidth
              size="small"
              type="email"
              label="Email Address *"
              placeholder="aditi.rao@email.com"
              value={newCand.email}
              onChange={(e) => {
                setNewCand({ ...newCand, email: e.target.value });
                if (newCandErrors.email) setNewCandErrors({ ...newCandErrors, email: '' });
              }}
              error={Boolean(newCandErrors.email)}
              helperText={newCandErrors.email}
            />
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Current Role"
                  placeholder="e.g. QA Automation Engineer"
                  value={newCand.role}
                  onChange={(e) => setNewCand({ ...newCand, role: e.target.value })}
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Experience"
                  placeholder="e.g. 3+ yrs"
                  value={newCand.exp}
                  onChange={(e) => setNewCand({ ...newCand, exp: e.target.value })}
                />
              </Grid>
            </Grid>
            <TextField
              fullWidth
              size="small"
              label="Key Skills (comma separated)"
              placeholder="React, Node.js, AWS"
              value={newCand.skills}
              onChange={(e) => setNewCand({ ...newCand, skills: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={() => {
              setOpenNewDialog(false);
              setNewCandErrors({});
            }}
            sx={{ textTransform: 'none', color: '#6B7280' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              const errors = {};
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!newCand.name.trim()) {
                errors.name = 'Full Name is required';
              } else if (newCand.name.trim().length < 5) {
                errors.name = 'Full Name must be at least 5 characters';
              }

              if (!newCand.email.trim()) {
                errors.email = 'Email Address is required';
              } else if (!emailRegex.test(newCand.email.trim())) {
                errors.email = 'Must be a valid email address';
              }

              if (Object.keys(errors).length > 0) {
                setNewCandErrors(errors);
                setSnackbar({ open: true, message: 'Please correct the validation errors', severity: 'warning' });
                return;
              }

              const addedCandidate = {
                id: Date.now(),
                name: newCand.name.trim(),
                email: newCand.email.trim(),
                role: newCand.role.trim() || 'Software Engineer',
                exp: newCand.exp.trim() || '2+ yrs',
                skills: newCand.skills ? newCand.skills.split(',').map(s => s.trim()).filter(Boolean).slice(0, 2) : ['React', 'Node.js'],
                moreSkills: 1,
                location: 'Bengaluru',
                source: 'Direct Add',
                status: 'Active',
                addedOn: 'Today',
                avatar: avatar1
              };
              setCandidates([addedCandidate, ...candidates]);
              setNewCand({ name: '', email: '', role: '', exp: '', skills: '' });
              setNewCandErrors({});
              setOpenNewDialog(false);
              setSnackbar({ open: true, message: `New candidate ${addedCandidate.name} added!`, severity: 'success' });
            }}
            sx={{ bgcolor: '#530EF0', color: '#FFF', textTransform: 'none', borderRadius: '8px' }}
          >
            Add Profile
          </Button>
        </DialogActions>
      </Dialog>

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

