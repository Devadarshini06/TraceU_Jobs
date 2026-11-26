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
import LinearProgress from '@mui/material/LinearProgress';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// icons
import BarChartOutlined from '@ant-design/icons/BarChartOutlined';
import DownloadOutlined from '@ant-design/icons/DownloadOutlined';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import TrophyOutlined from '@ant-design/icons/TrophyOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import LikeOutlined from '@ant-design/icons/LikeOutlined';
import ReadOutlined from '@ant-design/icons/ReadOutlined';
import ArrowUpOutlined from '@ant-design/icons/ArrowUpOutlined';
import ArrowDownOutlined from '@ant-design/icons/ArrowDownOutlined';
import ThunderboltOutlined from '@ant-design/icons/ThunderboltOutlined';
import LinkedinFilled from '@ant-design/icons/LinkedinFilled';

export default function HrAnalytics() {
  const navigate = useNavigate();

  // Filter state
  const [dateRange, setDateRange] = useState('Oct 1, 2025 - Oct 31, 2025');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleExport = () => {
    setSnackbar({ open: true, message: 'Analytics Report exported successfully as PDF!', severity: 'success' });
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
            <BarChartOutlined style={{ fontSize: 14 }} />
            Analytics
          </Box>
        </Stack>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
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
              Recruitment Analytics
            </Typography>
            <Typography sx={{ color: '#6B7280', fontSize: 14, fontWeight: 400, lineHeight: 1.5, mt: 0.5 }}>
              Comprehensive insights into hiring velocity, source effectiveness and talent acquisition performance.
            </Typography>
          </Box>

          <Stack direction="row" alignItems="center" spacing={1.5} flexWrap="wrap">
            <Select
              size="small"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              startAdornment={<CalendarOutlined style={{ marginRight: 8, color: '#530EF0' }} />}
              sx={{
                bgcolor: '#FFF',
                borderRadius: '8px',
                height: 40,
                minHeight: 40,
                fontSize: 13,
                fontWeight: 500,
                '& fieldset': { borderColor: '#E5E7EB' }
              }}
            >
              <MenuItem value="Oct 1, 2025 - Oct 31, 2025">Oct 1, 2025 - Oct 31, 2025</MenuItem>
              <MenuItem value="Sep 1, 2025 - Sep 30, 2025">Sep 1, 2025 - Sep 30, 2025</MenuItem>
              <MenuItem value="Last 90 Days">Last 90 Days</MenuItem>
              <MenuItem value="Year to Date">Year to Date (2025)</MenuItem>
            </Select>

            <Button
              variant="outlined"
              startIcon={<DownloadOutlined />}
              onClick={handleExport}
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
              Export Report
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* 6 Top KPI Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Total Applications', value: '4,892', change: '+18%', isPositive: true, icon: <TeamOutlined />, color: '#530EF0', bg: 'rgba(83, 14, 240, 0.08)' },
          { label: 'Qualified Candidates', value: '1,248', change: '+22%', isPositive: true, icon: <CheckCircleOutlined />, color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.08)' },
          { label: 'Hires Completed', value: '312', change: '+28%', isPositive: true, icon: <TrophyOutlined />, color: '#10B981', bg: 'rgba(16, 185, 129, 0.08)' },
          { label: 'Time to Hire', value: '18 days', change: '-32%', isPositive: true, icon: <ClockCircleOutlined />, color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.08)' },
          { label: 'Offer Acceptance Rate', value: '86%', change: '+12%', isPositive: true, icon: <LikeOutlined />, color: '#0D9488', bg: 'rgba(13, 148, 136, 0.08)' },
          { label: 'Active Internships', value: '24', change: '+33%', isPositive: true, icon: <ReadOutlined />, color: '#7C3AED', bg: 'rgba(124, 58, 237, 0.08)' }
        ].map((kpi, idx) => (
          <Grid size={{ xs: 12, sm: 6, md: 2 }} key={idx}>
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
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                <Box
                  sx={{ width: 38, height: 38, borderRadius: '10px', bgcolor: kpi.bg, color: kpi.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}
                >
                  {kpi.icon}
                </Box>
                <Chip
                  label={kpi.change}
                  size="small"
                  sx={{
                    fontSize: 11,
                    fontWeight: 500,
                    height: 22,
                    bgcolor: 'rgba(16, 185, 129, 0.08)',
                    color: '#10B981',
                    borderRadius: '6px'
                  }}
                />
              </Stack>
              <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 13, fontWeight: 500, display: 'block' }}>
                {kpi.label}
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, color: '#111827', fontSize: 28, my: 0.25 }}>
                {kpi.value}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Middle Grid: Applications Trend Line Chart + Hiring Funnel + Source Donut */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* Card 1: Applications Trend (width 5/12) */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <Card
            sx={{
              p: 2.5,
              borderRadius: '16px',
              border: '1px solid #F3F4F6',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              bgcolor: '#FFF',
              height: '100%'
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 600, color: '#111827', fontSize: 16 }}>
                  Applications & Hiring Trend
                </Typography>
                <Typography variant="caption" sx={{ color: '#6B7280' }}>
                  Daily volume over the past 30 days
                </Typography>
              </Box>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Stack direction="row" spacing={0.6} alignItems="center">
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#530EF0' }} />
                  <Typography variant="caption" sx={{ color: '#4B5563', fontSize: 11.5 }}>
                    Applications (486)
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={0.6} alignItems="center">
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10B981' }} />
                  <Typography variant="caption" sx={{ color: '#4B5563', fontSize: 11.5 }}>
                    Hires (5)
                  </Typography>
                </Stack>
              </Stack>
            </Stack>

            {/* SVG Dual-Line Chart */}
            <Box sx={{ width: '100%', height: 210, position: 'relative' }}>
              <svg viewBox="0 0 400 180" width="100%" height="100%" preserveAspectRatio="none">
                {/* Horizontal grid lines */}
                <line x1="0" y1="30" x2="400" y2="30" stroke="#F3F4F6" strokeWidth="1" />
                <line x1="0" y1="75" x2="400" y2="75" stroke="#F3F4F6" strokeWidth="1" />
                <line x1="0" y1="120" x2="400" y2="120" stroke="#F3F4F6" strokeWidth="1" />
                <line x1="0" y1="165" x2="400" y2="165" stroke="#F3F4F6" strokeWidth="1" />

                {/* Applications Area Gradient */}
                <defs>
                  <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#530EF0" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#530EF0" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Line 1: Applications (Purple) */}
                <path
                  d="M 10 135 L 70 120 L 130 110 L 190 95 L 250 102 L 310 70 L 390 62 L 390 165 L 10 165 Z"
                  fill="url(#purpleGrad)"
                />
                <path
                  d="M 10 135 L 70 120 L 130 110 L 190 95 L 250 102 L 310 70 L 390 62"
                  fill="none"
                  stroke="#530EF0"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Line 2: Hires (Green) */}
                <path
                  d="M 10 155 L 70 152 L 130 150 L 190 148 L 250 142 L 310 138 L 390 132"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Data Points on Purple Line */}
                {[
                  { cx: 10, cy: 135 },
                  { cx: 70, cy: 120 },
                  { cx: 130, cy: 110 },
                  { cx: 190, cy: 95 },
                  { cx: 250, cy: 102 },
                  { cx: 310, cy: 70 },
                  { cx: 390, cy: 62 }
                ].map((pt, i) => (
                  <circle key={i} cx={pt.cx} cy={pt.cy} r="4" fill="#530EF0" stroke="#FFF" strokeWidth="2" />
                ))}
              </svg>

              {/* X Axis Labels */}
              <Stack direction="row" justifyContent="space-between" sx={{ mt: 0.5, px: 1 }}>
                <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11 }}>
                  Oct 1
                </Typography>
                <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11 }}>
                  Oct 7
                </Typography>
                <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11 }}>
                  Oct 14
                </Typography>
                <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11 }}>
                  Oct 21
                </Typography>
                <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11 }}>
                  Oct 28
                </Typography>
              </Stack>
            </Box>
          </Card>
        </Grid>

        {/* Card 2: Hiring Funnel (width 4/12) */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card
            sx={{
              p: 2.5,
              borderRadius: '16px',
              border: '1px solid #F3F4F6',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              bgcolor: '#FFF',
              height: '100%'
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 600, color: '#111827', fontSize: 16 }}>
                  Hiring Funnel
                </Typography>
                <Typography variant="caption" sx={{ color: '#6B7280' }}>
                  Stage conversion progression
                </Typography>
              </Box>
              <Chip
                label="Conversion: 6.4%"
                size="small"
                sx={{ fontSize: 11, fontWeight: 600, bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#10B981' }}
              />
            </Stack>

            <Stack spacing={1.2}>
              {[
                { stage: 'Applied', count: '4,892', pct: 100, color: '#530EF0' },
                { stage: 'Screening', count: '2,986', pct: 61, color: '#3B82F6' },
                { stage: 'Shortlisted', count: '1,842', pct: 38, color: '#06B6D4' },
                { stage: 'Interview', count: '1,024', pct: 21, color: '#F59E0B' },
                { stage: 'Selected', count: '568', pct: 12, color: '#EC4899' },
                { stage: 'Offered', count: '402', pct: 8, color: '#7C3AED' },
                { stage: 'Hired', count: '312', pct: 6, color: '#10B981' }
              ].map((item, idx) => (
                <Box key={idx}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.3 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#374151', fontSize: 12 }}>
                      {item.stage}
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', fontSize: 12 }}>
                      {item.count}{' '}
                      <span style={{ color: '#9CA3AF', fontWeight: 400 }}>({item.pct}%)</span>
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={item.pct}
                    sx={{
                      height: 7,
                      borderRadius: 3,
                      bgcolor: '#F3F4F6',
                      '& .MuiLinearProgress-bar': { bgcolor: item.color, borderRadius: 3 }
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Card>
        </Grid>

        {/* Card 3: Applications by Source Donut (width 3/12) */}
        <Grid size={{ xs: 12, lg: 3 }}>
          <Card
            sx={{
              p: 2.5,
              borderRadius: '16px',
              border: '1px solid #F3F4F6',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              bgcolor: '#FFF',
              height: '100%'
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 600, color: '#111827', fontSize: 16, mb: 2 }}>
              Applications by Source
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Box sx={{ position: 'relative', width: 110, height: 110 }}>
                <svg viewBox="0 0 100 100" width="110" height="110">
                  {/* LinkedIn 32% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#530EF0"
                    strokeWidth="14"
                    strokeDasharray="76.4 238.7"
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                  {/* Naukri 24% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#3B82F6"
                    strokeWidth="14"
                    strokeDasharray="57.3 238.7"
                    strokeDashoffset="-76.4"
                    transform="rotate(-90 50 50)"
                  />
                  {/* Indeed 18% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#06B6D4"
                    strokeWidth="14"
                    strokeDasharray="43.0 238.7"
                    strokeDashoffset="-133.7"
                    transform="rotate(-90 50 50)"
                  />
                  {/* Careers 12% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#10B981"
                    strokeWidth="14"
                    strokeDasharray="28.6 238.7"
                    strokeDashoffset="-176.7"
                    transform="rotate(-90 50 50)"
                  />
                  {/* Referral 8% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#F59E0B"
                    strokeWidth="14"
                    strokeDasharray="19.1 238.7"
                    strokeDashoffset="-205.3"
                    transform="rotate(-90 50 50)"
                  />
                  {/* Others 6% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#9CA3AF"
                    strokeWidth="14"
                    strokeDasharray="14.3 238.7"
                    strokeDashoffset="-224.4"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#111827', fontSize: 14, lineHeight: 1 }}>
                    4,892
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#6B7280', fontSize: '0.62rem' }}>
                    Total
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Stack spacing={0.8}>
              {[
                { name: 'LinkedIn', pct: '32%', color: '#530EF0' },
                { name: 'Naukri', pct: '24%', color: '#3B82F6' },
                { name: 'Indeed', pct: '18%', color: '#06B6D4' },
                { name: 'Company Careers', pct: '12%', color: '#10B981' },
                { name: 'Referrals', pct: '8%', color: '#F59E0B' },
                { name: 'Others', pct: '6%', color: '#9CA3AF' }
              ].map((s, idx) => (
                <Stack key={idx} direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" spacing={0.8} alignItems="center">
                    <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: s.color }} />
                    <Typography variant="caption" sx={{ color: '#4B5563', fontSize: 12 }}>
                      {s.name}
                    </Typography>
                  </Stack>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: '#111827', fontSize: 12 }}>
                    {s.pct}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Card>
        </Grid>
      </Grid>

      {/* Lower Row: Hires by Dept + Top Performing Jobs + Recruitment Insights */}
      <Grid container spacing={2.5}>
        {/* Hires by Department Bar Chart (width 4/12) */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card
            sx={{
              p: 2.5,
              borderRadius: '16px',
              border: '1px solid #F3F4F6',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              bgcolor: '#FFF',
              height: '100%'
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 600, color: '#111827', fontSize: 16, mb: 2 }}>
              Hires by Department
            </Typography>

            <Stack spacing={1.5}>
              {[
                { dept: 'Engineering', hires: 124, max: 150, color: '#530EF0' },
                { dept: 'Sales & Business', hires: 68, max: 150, color: '#3B82F6' },
                { dept: 'UI/UX Design', hires: 42, max: 150, color: '#EC4899' },
                { dept: 'Product Management', hires: 36, max: 150, color: '#F59E0B' },
                { dept: 'Human Resources', hires: 24, max: 150, color: '#10B981' },
                { dept: 'Marketing', hires: 18, max: 150, color: '#06B6D4' }
              ].map((row, idx) => (
                <Box key={idx}>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.4 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#374151', fontSize: 12 }}>
                      {row.dept}
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', fontSize: 12 }}>
                      {row.hires} hires
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={(row.hires / row.max) * 100}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: '#F3F4F6',
                      '& .MuiLinearProgress-bar': { bgcolor: row.color, borderRadius: 4 }
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Card>
        </Grid>

        {/* Top Performing Jobs Table (width 4.8/12) */}
        <Grid size={{ xs: 12, lg: 4.8 }}>
          <Card
            sx={{
              p: 2.5,
              borderRadius: '16px',
              border: '1px solid #F3F4F6',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              bgcolor: '#FFF',
              height: '100%'
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 600, color: '#111827', fontSize: 16, mb: 2 }}>
              Top Performing Jobs
            </Typography>

            <TableContainer>
              <Table size="small">
                <TableHead sx={{ bgcolor: '#F9FAFB' }}>
                  <TableRow>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5 }}>Job Title</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5 }}>Dept</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5 }}>Apps</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5 }}>Hired</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5 }}>Avg Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { title: 'Senior Software Engineer', dept: 'Eng', apps: 1245, hired: 8, time: '16d' },
                    { title: 'Product Manager', dept: 'Prod', apps: 892, hired: 3, time: '22d' },
                    { title: 'Data Analyst', dept: 'Data', apps: 756, hired: 4, time: '14d' },
                    { title: 'UI/UX Designer', dept: 'Design', apps: 623, hired: 2, time: '18d' },
                    { title: 'Machine Learning Engineer', dept: 'Data', apps: 512, hired: 3, time: '20d' }
                  ].map((job, idx) => (
                    <TableRow key={idx} hover>
                      <TableCell sx={{ fontWeight: 600, color: '#111827', fontSize: 12.5 }}>{job.title}</TableCell>
                      <TableCell sx={{ color: '#6B7280', fontSize: 12 }}>{job.dept}</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#111827', fontSize: 12 }}>{job.apps}</TableCell>
                      <TableCell sx={{ color: '#10B981', fontWeight: 700, fontSize: 12 }}>{job.hired}</TableCell>
                      <TableCell sx={{ color: '#6B7280', fontSize: 12 }}>{job.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        {/* Recruitment Insights Card (width 3.2/12) */}
        <Grid size={{ xs: 12, lg: 3.2 }}>
          <Card
            sx={{
              p: 2.5,
              borderRadius: '16px',
              border: '1px solid #F3F4F6',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              bgcolor: '#FFF',
              height: '100%'
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
              <ThunderboltOutlined style={{ color: '#530EF0', fontSize: 16 }} />
              <Typography variant="h3" sx={{ fontWeight: 600, color: '#111827', fontSize: 16 }}>
                Recruitment Insights
              </Typography>
            </Stack>

            <Stack spacing={1.5}>
              <Box sx={{ p: 1.5, bgcolor: '#FAF5FF', borderRadius: '10px', border: '1px solid #F3E8FF' }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#530EF0', display: 'block', mb: 0.3 }}>
                  Velocity Surge
                </Typography>
                <Typography variant="caption" sx={{ color: '#4B5563', fontSize: 12, lineHeight: 1.4 }}>
                  Average time to hire decreased by <strong>32%</strong> this month, primarily driven by automated resume OCR.
                </Typography>
              </Box>

              <Box sx={{ p: 1.5, bgcolor: '#ECFDF5', borderRadius: '10px', border: '1px solid #D1FAE5' }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#059669', display: 'block', mb: 0.3 }}>
                  High Offer Acceptance
                </Typography>
                <Typography variant="caption" sx={{ color: '#4B5563', fontSize: 12, lineHeight: 1.4 }}>
                  Engineering candidates accepted offers at <strong>91%</strong> rate, leading all organizational divisions.
                </Typography>
              </Box>

              <Box sx={{ p: 1.5, bgcolor: '#EFF6FF', borderRadius: '10px', border: '1px solid #DBEAFE' }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#2563EB', display: 'block', mb: 0.3 }}>
                  Best Conversion Source
                </Typography>
                <Typography variant="caption" sx={{ color: '#4B5563', fontSize: 12, lineHeight: 1.4 }}>
                  Employee Referrals convert at <strong>42%</strong>, 3.5x higher than general public job boards.
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>

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

