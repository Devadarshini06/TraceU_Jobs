import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getGreeting from 'utils/getGreeting';

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
import Tooltip from '@mui/material/Tooltip';
import LinearProgress from '@mui/material/LinearProgress';

// icons
import DashboardOutlined from '@ant-design/icons/DashboardOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import MoreOutlined from '@ant-design/icons/MoreOutlined';
import ArrowUpOutlined from '@ant-design/icons/ArrowUpOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import ShopOutlined from '@ant-design/icons/ShopOutlined';
import UploadOutlined from '@ant-design/icons/UploadOutlined';
import ReadOutlined from '@ant-design/icons/ReadOutlined';

// avatar assets
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import avatar5 from 'assets/images/users/avatar-5.png';

export default function HrDashboard() {
  const navigate = useNavigate();

  // Selected date dropdown
  const [selectedDate, setSelectedDate] = useState('Tue, 28 Oct 2025');

  // Bottom table active tab
  const [activeTab, setActiveTab] = useState('recent');

  // To-Do list state
  const [todos, setTodos] = useState([
    { id: 1, text: 'Review 12 new applications for Software Engineer', time: '2h ago', checked: false, color: '#8B5CF6' },
    { id: 2, text: 'Schedule interviews for shortlisted candidates', time: '5h ago', checked: false, color: '#8B5CF6' },
    { id: 3, text: 'Approve requisition REQ-0018', time: '1d ago', checked: false, color: '#10B981' },
    { id: 4, text: 'Review internship applications', time: '1d ago', checked: false, color: '#F59E0B' }
  ]);

  const toggleTodo = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t)));
  };

  // Top 6 KPI stats
  const kpiStats = [
    {
      title: 'Open Requisitions',
      count: '24',
      change: '+12%',
      subtitle: 'Across all departments',
      icon: <FileTextOutlined style={{ fontSize: 18 }} />,
      iconColor: '#6929e2',
      iconBg: '#f3edff'
    },
    {
      title: 'Total Applications',
      count: '486',
      change: '+18%',
      subtitle: 'Applications received',
      icon: <TeamOutlined style={{ fontSize: 18 }} />,
      iconColor: '#2563eb',
      iconBg: '#eff6ff'
    },
    {
      title: 'Shortlisted',
      count: '73',
      change: '+22%',
      subtitle: 'Candidates shortlisted',
      icon: <UserOutlined style={{ fontSize: 18 }} />,
      iconColor: '#f59e0b',
      iconBg: '#fffbeb'
    },
    {
      title: 'Interviews',
      count: '32',
      change: '+27%',
      subtitle: 'Scheduled or in progress',
      icon: <CalendarOutlined style={{ fontSize: 18 }} />,
      iconColor: '#7c3aed',
      iconBg: '#f5f3ff'
    },
    {
      title: 'Offers',
      count: '8',
      change: '+14%',
      subtitle: 'Offers sent',
      icon: <CheckCircleOutlined style={{ fontSize: 18 }} />,
      iconColor: '#10b981',
      iconBg: '#ecfdf5'
    },
    {
      title: 'Internships',
      count: '24',
      change: '+33%',
      subtitle: 'Active internships',
      icon: <ReadOutlined style={{ fontSize: 18 }} />,
      iconColor: '#ec4899',
      iconBg: '#fdf2f8'
    }
  ];

  // Hiring Funnel data
  const funnelData = [
    { stage: 'Applied', count: 486, pct: '100%', color: '#6929E2', width: '100%' },
    { stage: 'Screening', count: 340, pct: '70%', color: '#3B82F6', width: '70%' },
    { stage: 'Shortlisted', count: 187, pct: '38%', color: '#06B6D4', width: '38%' },
    { stage: 'Interview', count: 96, pct: '20%', color: '#F59E0B', width: '20%' },
    { stage: 'Selected', count: 42, pct: '9%', color: '#EC4899', width: '9%' },
    { stage: 'Offered', count: 18, pct: '4%', color: '#8B5CF6', width: '4%' },
    { stage: 'Hired', count: 5, pct: '1%', color: '#10B981', width: '2%' }
  ];

  // Applications by Source
  const sourceData = [
    { label: 'Company Website', pct: '32%', color: '#6929E2' },
    { label: 'LinkedIn', pct: '24%', color: '#3B82F6' },
    { label: 'Naukri', pct: '18%', color: '#F59E0B' },
    { label: 'Indeed', pct: '12%', color: '#06B6D4' },
    { label: 'Employee Referrals', pct: '8%', color: '#EC4899' },
    { label: 'Others', pct: '6%', color: '#10B981' }
  ];

  // Recent Applications
  const recentApplications = [
    { id: 1, name: 'Priya Sharma', email: 'priya.sharma@email.com', role: 'Software Engineer', code: 'JOB-0012', stage: 'Shortlisted', score: 92, date: 'Oct 28, 2025', avatar: avatar3 },
    { id: 2, name: 'Rahul Mehta', email: 'rahul.mehta@email.com', role: 'Product Designer', code: 'JOB-0011', stage: 'Screening', score: 87, date: 'Oct 27, 2025', avatar: avatar2 },
    { id: 3, name: 'Ananya Rao', email: 'ananya.rao@email.com', role: 'Data Analyst', code: 'JOB-0010', stage: 'Interview', score: 78, date: 'Oct 26, 2025', avatar: avatar4 },
    { id: 4, name: 'Vikram Singh', email: 'vikram.singh@email.com', role: 'Frontend Developer', code: 'JOB-0009', stage: 'Applied', score: 65, date: 'Oct 25, 2025', avatar: avatar1 },
    { id: 5, name: 'Sneha Iyer', email: 'sneha.iyer@email.com', role: 'UI/UX Designer', code: 'JOB-0008', stage: 'Shortlisted', score: 88, date: 'Oct 24, 2025', avatar: avatar5 }
  ];

  // Upcoming Interviews
  const upcomingInterviews = [
    { id: 1, name: 'Arjun Nair', role: 'Software Engineer', time: '10:00 AM - 10:30 AM', avatar: avatar1 },
    { id: 2, name: 'Sneha Iyer', role: 'Product Designer', time: '11:30 AM - 12:00 PM', avatar: avatar3 },
    { id: 3, name: 'Karan Patel', role: 'Frontend Developer', time: '2:00 PM - 2:30 PM', avatar: avatar2 },
    { id: 4, name: 'Meera Joshi', role: 'Data Analyst', time: '4:30 PM - 5:00 PM', avatar: avatar5 }
  ];

  return (
    <Box sx={{ width: '100%', minHeight: '100%', pb: 5 }}>
      {/* ========================================================================= */}
      {/* 1. TOP HEADER BANNER & ACTION                                            */}
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
            <Box sx={{ width: 22, height: 22, borderRadius: '6px', bgcolor: '#F3EDFF', color: '#530EF0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>
              <DashboardOutlined />
            </Box>
            <Typography variant="caption" sx={{ color: '#530EF0', fontWeight: 600, fontSize: 12 }}>
              Dashboard
            </Typography>
          </Stack>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 700, fontSize: { xs: 22, sm: 24 }, color: '#111827', letterSpacing: '-0.3px',
              mb: 0.5
            }}
          >
            {getGreeting()}, HR 👋
          </Typography>
          <Typography sx={{ color: '#6B7280', fontSize: 14, fontWeight: 400, lineHeight: 1.5, mt: 0.5 }}>
            Here's what's happening with your recruitment today.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} alignItems="center" flexShrink={0}>
          {/* Date Selector */}
          <Select
            size="small"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            startAdornment={<CalendarOutlined style={{ marginRight: 8, color: '#6B7280' }} />}
            sx={{
              bgcolor: '#FFF',
              borderRadius: '8px',
              height: 40,
              minHeight: 40,
              fontSize: 13.5,
              fontWeight: 600,
              color: '#374151',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E5E7EB' }
            }}
          >
            <MenuItem value="Tue, 28 Oct 2025">Tue, 28 Oct 2025</MenuItem>
            <MenuItem value="Mon, 27 Oct 2025">Mon, 27 Oct 2025</MenuItem>
            <MenuItem value="Sun, 26 Oct 2025">Sun, 26 Oct 2025</MenuItem>
          </Select>

          {/* Create Job Button */}
          <Button
            variant="contained"
            startIcon={<PlusOutlined />}
            onClick={() => navigate('/hr/jobs')}
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
      {/* 2. TOP 6 KPI METRICS ROW                                                  */}
      {/* ========================================================================= */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {kpiStats.map((kpi, idx) => (
          <Grid key={idx} size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
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
                    bgcolor: kpi.iconBg,
                    color: kpi.iconColor,
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

      {/* ========================================================================= */}
      {/* 3. MIDDLE ROW: TREND CHART + FUNNEL + SOURCE DONUT + TO-DO               */}
      {/* ========================================================================= */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* 1. Applications Trend */}
        <Grid size={{ xs: 12, md: 6, lg: 3.5 }}>
          <Card sx={{ p: 2.5, borderRadius: '16px', border: '1px solid #F3F4F6', bgcolor: '#FFF', height: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="h3" sx={{ fontWeight: 600, color: '#111827', fontSize: 16 }}>
                Applications Trend
              </Typography>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#530EF0' }} />
                  <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11, fontWeight: 600 }}>Applications</Typography>
                </Stack>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10B981' }} />
                  <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11, fontWeight: 600 }}>Hires</Typography>
                </Stack>
              </Stack>
            </Stack>

            {/* SVG Smooth Multi-Line Chart */}
            <Box sx={{ width: '100%', height: 180, mt: 1 }}>
              <svg viewBox="0 0 320 160" width="100%" height="100%" style={{ overflow: 'visible' }}>
                <defs>
                  <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#530EF0" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#530EF0" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Horizontal grid lines */}
                <line x1="25" y1="20" x2="310" y2="20" stroke="#F3F4F6" strokeDasharray="3 3" />
                <line x1="25" y1="60" x2="310" y2="60" stroke="#F3F4F6" strokeDasharray="3 3" />
                <line x1="25" y1="100" x2="310" y2="100" stroke="#F3F4F6" strokeDasharray="3 3" />
                <line x1="25" y1="140" x2="310" y2="140" stroke="#E5E7EB" />

                {/* Y-Axis Labels */}
                <text x="15" y="24" fill="#9CA3AF" fontSize="9" textAnchor="end">200</text>
                <text x="15" y="64" fill="#9CA3AF" fontSize="9" textAnchor="end">150</text>
                <text x="15" y="104" fill="#9CA3AF" fontSize="9" textAnchor="end">100</text>
                <text x="15" y="144" fill="#9CA3AF" fontSize="9" textAnchor="end">50</text>

                {/* Purple Area */}
                <path
                  d="M 30 130 C 70 120, 110 90, 150 100 C 190 110, 230 65, 270 50 C 290 40, 305 35, 310 30 L 310 140 L 30 140 Z"
                  fill="url(#purpleGradient)"
                />

                {/* Applications Line (Purple) */}
                <path
                  d="M 30 130 C 70 120, 110 90, 150 100 C 190 110, 230 65, 270 50 C 290 40, 305 35, 310 30"
                  fill="none"
                  stroke="#530EF0"
                  strokeWidth="2.5"
                />

                {/* Hires Line (Teal/Green) */}
                <path
                  d="M 30 138 C 70 135, 110 130, 150 132 C 190 125, 230 120, 270 110 C 290 105, 305 95, 310 90"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2.5"
                />

                {/* Dots on key data points */}
                <circle cx="310" cy="30" r="4" fill="#530EF0" stroke="#FFF" strokeWidth="2" />
                <circle cx="310" cy="90" r="4" fill="#10B981" stroke="#FFF" strokeWidth="2" />
              </svg>
            </Box>

            <Stack direction="row" justifyContent="space-between" sx={{ mt: 1, px: 2 }}>
              {['Oct 1', 'Oct 7', 'Oct 14', 'Oct 21', 'Oct 28'].map((d) => (
                <Typography key={d} variant="caption" sx={{ color: '#9CA3AF', fontSize: 12, fontWeight: 400 }}>
                  {d}
                </Typography>
              ))}
            </Stack>
          </Card>
        </Grid>

        {/* 2. Hiring Funnel */}
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Card sx={{ p: 2.5, borderRadius: '16px', border: '1px solid #F3F4F6', bgcolor: '#FFF', height: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h3" sx={{ fontWeight: 600, color: '#111827', fontSize: 16 }}>
                Hiring Funnel
              </Typography>
              <Chip label="Last 30 days" size="small" sx={{ fontSize: 11, height: 22, bgcolor: '#F9FAFB' }} />
            </Stack>

            <Stack spacing={1.3}>
              {funnelData.map((f) => (
                <Box key={f.stage}>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.4 }}>
                    <Typography variant="caption" sx={{ color: '#4B5563', fontSize: 12, fontWeight: 600 }}>
                      {f.stage}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#111827', fontSize: 12, fontWeight: 700 }}>
                      {f.count} <span style={{ color: '#9CA3AF', fontWeight: 500 }}>{f.pct}</span>
                    </Typography>
                  </Stack>
                  <Box sx={{ width: '100%', height: 7, borderRadius: 3, bgcolor: '#F3F4F6', overflow: 'hidden' }}>
                    <Box sx={{ width: f.width, height: '100%', bgcolor: f.color, borderRadius: 3 }} />
                  </Box>
                </Box>
              ))}
            </Stack>
          </Card>
        </Grid>

        {/* 3. Applications by Source */}
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Card sx={{ p: 2.5, borderRadius: '16px', border: '1px solid #F3F4F6', bgcolor: '#FFF', height: '100%' }}>
            <Typography variant="h3" sx={{ fontWeight: 600, color: '#111827', fontSize: 16, mb: 2 }}>
              Applications by Source
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Donut Chart representation */}
              <Box sx={{ position: 'relative', width: 110, height: 110, flexShrink: 0 }}>
                <svg viewBox="0 0 36 36" width="100%" height="100%">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E5E7EB" strokeWidth="3.5" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#530EF0" strokeWidth="4" strokeDasharray="32, 100" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#3B82F6" strokeWidth="4" strokeDasharray="24, 100" strokeDashoffset="-32" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#F59E0B" strokeWidth="4" strokeDasharray="18, 100" strokeDashoffset="-56" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#06B6D4" strokeWidth="4" strokeDasharray="12, 100" strokeDashoffset="-74" />
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
                  <Typography sx={{ fontWeight: 800, fontSize: 14, color: '#111827', lineHeight: 1 }}>
                    486
                  </Typography>
                  <Typography sx={{ fontSize: 11, color: '#6B7280' }}>Total</Typography>
                </Box>
              </Box>

              {/* Legend */}
              <Stack spacing={0.6} sx={{ flex: 1, minWidth: 0 }}>
                {sourceData.map((s) => (
                  <Stack key={s.label} direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={0.75} alignItems="center" sx={{ minWidth: 0 }}>
                      <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: s.color, flexShrink: 0 }} />
                      <Typography variant="caption" sx={{ color: '#4B5563', fontSize: 11.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {s.label}
                      </Typography>
                    </Stack>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', fontSize: 11.5 }}>
                      {s.pct}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Card>
        </Grid>

        {/* 4. My To-Do */}
        <Grid size={{ xs: 12, md: 6, lg: 2.5 }}>
          <Card sx={{ p: 2.5, borderRadius: '16px', border: '1px solid #F3F4F6', bgcolor: '#FFF', height: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
              <Typography variant="h3" sx={{ fontWeight: 600, color: '#111827', fontSize: 16 }}>
                My To-Do
              </Typography>
              <Typography variant="caption" sx={{ color: '#530EF0', fontWeight: 600, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                View all &rarr;
              </Typography>
            </Stack>

            <Stack spacing={1}>
              {todos.map((todo) => (
                <Box
                  key={todo.id}
                  onClick={() => toggleTodo(todo.id)}
                  sx={{
                    p: 1.2,
                    borderRadius: '10px',
                    bgcolor: todo.checked ? '#F9FAFB' : '#FFF',
                    border: '1px solid #F3F4F6',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1
                  }}
                >
                  <Checkbox
                    checked={todo.checked}
                    size="small"
                    sx={{ p: 0, mt: 0.25, color: '#D1D5DB', '&.Mui-checked': { color: '#530EF0' } }}
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        fontWeight: 600,
                        color: todo.checked ? '#9CA3AF' : '#1F2937',
                        textDecoration: todo.checked ? 'line-through' : 'none',
                        lineHeight: 1.3,
                        fontSize: 12
                      }}
                    >
                      {todo.text}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11 }}>
                      {todo.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Card>
        </Grid>
      </Grid>

      {/* ========================================================================= */}
      {/* 4. BOTTOM SECTION: RECENT APPS TABLE + RIGHT COLUMN (INTERVIEWS + ACTIONS) */}
      {/* ========================================================================= */}
      <Grid container spacing={2.5}>
        {/* Left Column (Table) */}
        <Grid size={{ xs: 12, lg: 8.5 }}>
          <Card sx={{ borderRadius: '16px', border: '1px solid #F3F4F6', bgcolor: '#FFF', overflow: 'hidden' }}>
            {/* Table Tabs Header */}
            <Box sx={{ p: 2, px: 2.5, borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
              <Stack direction="row" spacing={2.5}>
                {[
                  { id: 'recent', label: 'Recent Applications' },
                  { id: 'pending', label: 'Pending Requisitions' },
                  { id: 'jobs', label: 'Active Jobs' },
                  { id: 'internships', label: 'Internships' }
                ].map((t) => (
                  <Typography
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    sx={{
                      cursor: 'pointer',
                      fontSize: '0.86rem',
                      fontWeight: activeTab === t.id ? 700 : 500,
                      color: activeTab === t.id ? '#530EF0' : '#6B7280',
                      borderBottom: activeTab === t.id ? '2px solid #530EF0' : 'none',
                      pb: 0.5
                    }}
                  >
                    {t.label}
                  </Typography>
                ))}
              </Stack>

              <Typography
                variant="caption"
                onClick={() => navigate('/hr/applications')}
                sx={{ color: '#530EF0', fontWeight: 600, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
              >
                View all &rarr;
              </Typography>
            </Box>

            {/* Table */}
            <TableContainer>
              <Table size="medium">
                <TableHead sx={{ bgcolor: '#F9FAFB' }}>
                  <TableRow>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>Candidate</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>Job Title</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>Stage</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>Match Score</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>Applied On</TableCell>
                    <TableCell align="right" sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentApplications.map((app) => (
                    <TableRow key={app.id} hover sx={{ cursor: 'pointer' }} onClick={() => navigate('/hr/applications')}>
                      <TableCell>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Avatar src={app.avatar} sx={{ width: 34, height: 34 }} />
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 700, color: '#111827', fontSize: 13.5 }}>
                              {app.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 12 }}>
                              {app.email}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1F2937', fontSize: 13.5 }}>
                          {app.role}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 12, fontWeight: 400 }}>
                          {app.code}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={app.stage}
                          size="small"
                          sx={{
                            fontWeight: 600,
                            fontSize: 11.5,
                            height: 22,
                            bgcolor:
                              app.stage === 'Shortlisted' ? 'rgba(16, 185, 129, 0.1)' :
                              app.stage === 'Screening' ? 'rgba(59, 130, 246, 0.1)' :
                              app.stage === 'Interview' ? 'rgba(245, 158, 11, 0.1)' : '#F3F4F6',
                            color:
                              app.stage === 'Shortlisted' ? '#10B981' :
                              app.stage === 'Screening' ? '#2563EB' :
                              app.stage === 'Interview' ? '#D97706' : '#6B7280'
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        {/* Circular Match Score Badge */}
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            border: `2.5px solid ${app.score >= 80 ? '#10B981' : '#F59E0B'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: 11.5,
                            color: app.score >= 80 ? '#10B981' : '#D97706'
                          }}
                        >
                          {app.score}%
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: '#6B7280', fontSize: 13 }}>
                        {app.date}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small" onClick={() => navigate('/hr/applications')}><MoreOutlined style={{ color: '#9CA3AF' }} /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        {/* Right Column (Upcoming Interviews + Quick Actions) */}
        <Grid size={{ xs: 12, lg: 3.5 }}>
          <Stack spacing={2.5}>
            {/* Upcoming Interviews Card */}
            <Card sx={{ p: 2.5, borderRadius: '16px', border: '1px solid #F3F4F6', bgcolor: '#FFF' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h3" sx={{ fontWeight: 600, color: '#111827', fontSize: 16 }}>
                  Upcoming Interviews
                </Typography>
                <Typography variant="caption" onClick={() => navigate('/hr/applications')} sx={{ color: '#530EF0', fontWeight: 600, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                  View all &rarr;
                </Typography>
              </Stack>

              <Stack spacing={1.5}>
                {upcomingInterviews.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      p: 1.2,
                      px: 1.5,
                      borderRadius: '12px',
                      bgcolor: '#FAFAFB',
                      border: '1px solid #F3F4F6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Stack direction="row" spacing={1.2} alignItems="center">
                      <Avatar src={item.avatar} sx={{ width: 34, height: 34 }} />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#111827', fontSize: 13.5 }}>
                          {item.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11.5, display: 'block' }}>
                          {item.role}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#530EF0', fontSize: 11, fontWeight: 600 }}>
                          {item.time}
                        </Typography>
                      </Box>
                    </Stack>
                    <IconButton size="small" onClick={() => navigate('/hr/applications')}><MoreOutlined style={{ color: '#9CA3AF' }} /></IconButton>
                  </Box>
                ))}
              </Stack>
            </Card>

            {/* Quick Actions Card */}
            <Card sx={{ p: 2.5, borderRadius: '16px', border: '1px solid #F3F4F6', bgcolor: '#FFF' }}>
              <Typography variant="h3" sx={{ fontWeight: 600, color: '#111827', fontSize: 16, mb: 2 }}>
                Quick Actions
              </Typography>
              <Grid container spacing={1.5}>
                {[
                  { label: 'Create Job', icon: <PlusOutlined />, color: '#530EF0', bg: '#F3EDFF', to: '/hr/jobs' },
                  { label: 'Create Requisition', icon: <FileTextOutlined />, color: '#10B981', bg: '#ECFDF5', to: '/hr/requisitions' },
                  { label: 'Upload Resume', icon: <UploadOutlined />, color: '#2563EB', bg: '#EFF6FF', to: '/hr/candidates' },
                  { label: 'Create Internship', icon: <ReadOutlined />, color: '#EC4899', bg: '#FDF2F8', to: '/hr/internships' }
                ].map((act, i) => (
                  <Grid size={{ xs: 6 }} key={i}>
                    <Box
                      onClick={() => navigate(act.to)}
                      sx={{
                        p: 1.5,
                        borderRadius: '12px',
                        border: '1px solid #F3F4F6',
                        bgcolor: '#FAFAFB',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.15s ease',
                        '&:hover': { bgcolor: act.bg, transform: 'translateY(-2px)' }
                      }}
                    >
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: '10px',
                          bgcolor: act.bg,
                          color: act.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 1,
                          fontSize: 16
                        }}
                      >
                        {act.icon}
                      </Box>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#1F2937', fontSize: 12, display: 'block' }}>
                        {act.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

