import React, { useEffect, useMemo, useState } from 'react';
import * as XLSX from 'xlsx';

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
import CircularProgress from '@mui/material/CircularProgress';

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
import ThunderboltOutlined from '@ant-design/icons/ThunderboltOutlined';

import { getAnalytics } from 'api/adminAnalytics';

const RANGE_LABELS = {
  '7d': 'Last 7 Days',
  '30d': 'Last 30 Days',
  '90d': 'Last 90 Days',
  '365d': 'Last 12 Months',
  all: 'All Time'
};

export default function AdminAnalytics() {
  const [dateRange, setDateRange] = useState('30d');
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getAnalytics(dateRange)
      .then((res) => {
        if (!cancelled) {
          setAnalytics(res?.data || null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setSnackbar({ open: true, message: err.message || 'Failed to load analytics', severity: 'error' });
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [dateRange]);

  const kpis = analytics?.kpis || {
    total_applications: 0,
    qualified_candidates: 0,
    hires_completed: 0,
    avg_time_to_hire_days: 0,
    offer_acceptance_rate: 0,
    active_internships: 0
  };
  const trend = analytics?.trend || [];
  const funnel = analytics?.funnel || [];
  const sources = analytics?.sources || [];
  const departments = analytics?.departments || [];
  const topJobs = analytics?.top_jobs || [];
  const insights = analytics?.insights || {};
  const conversionRate = analytics?.conversion_rate ?? 0;

  // Compute SVG polyline coordinates for Applications & Hires trend
  const trendGeometry = useMemo(() => {
    if (trend.length === 0) {
      return { appPoints: [], hirePoints: [], appLine: '', appArea: '', hireLine: '' };
    }
    const maxVal = Math.max(1, ...trend.map((t) => Math.max(t.applications || 0, t.hires || 0)));
    const xStart = 10;
    const xEnd = 390;
    const yBottom = 165;
    const yTop = 25;
    const step = trend.length > 1 ? (xEnd - xStart) / (trend.length - 1) : 0;

    const appPoints = trend.map((t, idx) => {
      const x = xStart + idx * step;
      const y = yBottom - ((t.applications || 0) / maxVal) * (yBottom - yTop);
      return { x, y, label: t.label, value: t.applications || 0 };
    });
    const hirePoints = trend.map((t, idx) => {
      const x = xStart + idx * step;
      const y = yBottom - ((t.hires || 0) / maxVal) * (yBottom - yTop);
      return { x, y, value: t.hires || 0 };
    });

    const appLine = appPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const appArea = `${appLine} L ${appPoints[appPoints.length - 1].x} ${yBottom} L ${appPoints[0].x} ${yBottom} Z`;
    const hireLine = hirePoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

    return { appPoints, hirePoints, appLine, appArea, hireLine };
  }, [trend]);

  // Compute SVG Donut segments for Sources
  const sourceDonut = useMemo(() => {
    const circumference = 2 * Math.PI * 38; // ~238.76
    let offset = 0;
    return sources.map((s) => {
      const len = ((s.pct || 0) / 100) * circumference;
      const seg = { ...s, dashArray: `${len.toFixed(1)} ${circumference.toFixed(1)}`, dashOffset: -offset };
      offset += len;
      return seg;
    });
  }, [sources]);

  const maxDeptHires = Math.max(1, ...departments.map((d) => d.hires || 0));

  const handleExport = () => {
    const wb = XLSX.utils.book_new();
    const kpiSheet = XLSX.utils.json_to_sheet([
      { Metric: 'Date Range', Value: RANGE_LABELS[dateRange] || dateRange },
      { Metric: 'Total Applications', Value: kpis.total_applications },
      { Metric: 'Qualified Candidates', Value: kpis.qualified_candidates },
      { Metric: 'Hires Completed', Value: kpis.hires_completed },
      { Metric: 'Average Time to Hire (days)', Value: kpis.avg_time_to_hire_days },
      { Metric: 'Offer Acceptance Rate (%)', Value: kpis.offer_acceptance_rate },
      { Metric: 'Active Internships', Value: kpis.active_internships }
    ]);
    XLSX.utils.book_append_sheet(wb, kpiSheet, 'KPIs');
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(funnel), 'Hiring Funnel');
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(sources), 'Sources');
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(departments), 'Departments');
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(topJobs), 'Top Jobs');
    XLSX.writeFile(wb, `TraceU_Analytics_${dateRange}.xlsx`);
    setSnackbar({ open: true, message: 'Analytics report exported successfully!', severity: 'success' });
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
                fontWeight: 700,
                fontSize: { xs: 22, sm: 24 },
                color: '#111827',
                letterSpacing: '-0.3px',
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
              <MenuItem value="7d">Last 7 Days</MenuItem>
              <MenuItem value="30d">Last 30 Days</MenuItem>
              <MenuItem value="90d">Last 90 Days</MenuItem>
              <MenuItem value="365d">Last 12 Months</MenuItem>
              <MenuItem value="all">All Time</MenuItem>
            </Select>

            <Button
              variant="outlined"
              startIcon={<DownloadOutlined />}
              onClick={handleExport}
              disabled={loading}
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

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <CircularProgress size={24} sx={{ color: '#530EF0' }} />
        </Box>
      )}

      {/* 6 Top KPI Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Total Applications', value: kpis.total_applications, badge: RANGE_LABELS[dateRange], icon: <TeamOutlined />, color: '#530EF0', bg: 'rgba(83, 14, 240, 0.08)' },
          { label: 'Qualified Candidates', value: kpis.qualified_candidates, badge: 'Shortlisted+', icon: <CheckCircleOutlined />, color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.08)' },
          { label: 'Hires Completed', value: kpis.hires_completed, badge: `${conversionRate}% conv`, icon: <TrophyOutlined />, color: '#10B981', bg: 'rgba(16, 185, 129, 0.08)' },
          { label: 'Time to Hire', value: `${kpis.avg_time_to_hire_days} days`, badge: 'Avg', icon: <ClockCircleOutlined />, color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.08)' },
          { label: 'Offer Acceptance Rate', value: `${kpis.offer_acceptance_rate}%`, badge: 'Hired/Offered', icon: <LikeOutlined />, color: '#0D9488', bg: 'rgba(13, 148, 136, 0.08)' },
          { label: 'Active Internships', value: kpis.active_internships, badge: 'Open', icon: <ReadOutlined />, color: '#7C3AED', bg: 'rgba(124, 58, 237, 0.08)' }
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
                  label={kpi.badge}
                  size="small"
                  sx={{
                    fontSize: 10.5,
                    fontWeight: 600,
                    height: 22,
                    bgcolor: 'rgba(83, 14, 240, 0.06)',
                    color: '#530EF0',
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
        {/* Card 1: Applications Trend */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <Card sx={{ p: 2.5, borderRadius: '16px', border: '1px solid #F3F4F6', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', bgcolor: '#FFF', height: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 600, color: '#111827', fontSize: 16 }}>
                  Applications & Hiring Trend
                </Typography>
                <Typography variant="caption" sx={{ color: '#6B7280' }}>
                  Volume over {RANGE_LABELS[dateRange]}
                </Typography>
              </Box>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Stack direction="row" spacing={0.6} alignItems="center">
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#530EF0' }} />
                  <Typography variant="caption" sx={{ color: '#4B5563', fontSize: 11.5 }}>
                    Applications ({kpis.total_applications})
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={0.6} alignItems="center">
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10B981' }} />
                  <Typography variant="caption" sx={{ color: '#4B5563', fontSize: 11.5 }}>
                    Hires ({kpis.hires_completed})
                  </Typography>
                </Stack>
              </Stack>
            </Stack>

            <Box sx={{ width: '100%', height: 210, position: 'relative' }}>
              <svg viewBox="0 0 400 180" width="100%" height="100%" preserveAspectRatio="none">
                <line x1="0" y1="30" x2="400" y2="30" stroke="#F3F4F6" strokeWidth="1" />
                <line x1="0" y1="75" x2="400" y2="75" stroke="#F3F4F6" strokeWidth="1" />
                <line x1="0" y1="120" x2="400" y2="120" stroke="#F3F4F6" strokeWidth="1" />
                <line x1="0" y1="165" x2="400" y2="165" stroke="#F3F4F6" strokeWidth="1" />

                <defs>
                  <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#530EF0" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#530EF0" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {trendGeometry.appArea && <path d={trendGeometry.appArea} fill="url(#purpleGrad)" />}
                {trendGeometry.appLine && (
                  <path d={trendGeometry.appLine} fill="none" stroke="#530EF0" strokeWidth="2.5" strokeLinecap="round" />
                )}
                {trendGeometry.hireLine && (
                  <path d={trendGeometry.hireLine} fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
                )}
                {trendGeometry.appPoints.map((pt, i) => (
                  <circle key={i} cx={pt.x} cy={pt.y} r="4" fill="#530EF0" stroke="#FFF" strokeWidth="2" />
                ))}
              </svg>

              <Stack direction="row" justifyContent="space-between" sx={{ mt: 0.5, px: 1 }}>
                {trend.map((t, i) => (
                  <Typography key={i} variant="caption" sx={{ color: '#9CA3AF', fontSize: 11 }}>
                    {t.label}
                  </Typography>
                ))}
              </Stack>
            </Box>
          </Card>
        </Grid>

        {/* Card 2: Hiring Funnel */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ p: 2.5, borderRadius: '16px', border: '1px solid #F3F4F6', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', bgcolor: '#FFF', height: '100%' }}>
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
                label={`Conversion: ${conversionRate}%`}
                size="small"
                sx={{ fontSize: 11, fontWeight: 600, bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#10B981' }}
              />
            </Stack>

            <Stack spacing={1.2}>
              {funnel.map((item, idx) => (
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

        {/* Card 3: Applications by Source Donut */}
        <Grid size={{ xs: 12, lg: 3 }}>
          <Card sx={{ p: 2.5, borderRadius: '16px', border: '1px solid #F3F4F6', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', bgcolor: '#FFF', height: '100%' }}>
            <Typography variant="h3" sx={{ fontWeight: 600, color: '#111827', fontSize: 16, mb: 2 }}>
              Applications by Source
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Box sx={{ position: 'relative', width: 110, height: 110 }}>
                <svg viewBox="0 0 100 100" width="110" height="110">
                  <circle cx="50" cy="50" r="38" fill="transparent" stroke="#F3F4F6" strokeWidth="14" />
                  {sourceDonut.map((seg, idx) => (
                    <circle
                      key={idx}
                      cx="50"
                      cy="50"
                      r="38"
                      fill="transparent"
                      stroke={seg.color}
                      strokeWidth="14"
                      strokeDasharray={seg.dashArray}
                      strokeDashoffset={seg.dashOffset}
                      transform="rotate(-90 50 50)"
                    />
                  ))}
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
                    {kpis.total_applications}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#6B7280', fontSize: '0.62rem' }}>
                    Total
                  </Typography>
                </Box>
              </Box>
            </Box>

            {sources.length === 0 ? (
              <Typography variant="caption" sx={{ color: '#9CA3AF', display: 'block', textAlign: 'center' }}>
                No application sources in this range.
              </Typography>
            ) : (
              <Stack spacing={0.8}>
                {sources.map((s, idx) => (
                  <Stack key={idx} direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={0.8} alignItems="center">
                      <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: s.color }} />
                      <Typography variant="caption" sx={{ color: '#4B5563', fontSize: 12 }}>
                        {s.name}
                      </Typography>
                    </Stack>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#111827', fontSize: 12 }}>
                      {s.count} ({s.pct}%)
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            )}
          </Card>
        </Grid>
      </Grid>

      {/* Lower Row: Hires by Dept + Top Performing Jobs + Recruitment Insights */}
      <Grid container spacing={2.5}>
        {/* Hires by Department */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ p: 2.5, borderRadius: '16px', border: '1px solid #F3F4F6', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', bgcolor: '#FFF', height: '100%' }}>
            <Typography variant="h3" sx={{ fontWeight: 600, color: '#111827', fontSize: 16, mb: 2 }}>
              Hires by Department
            </Typography>

            {departments.length === 0 ? (
              <Typography variant="caption" sx={{ color: '#9CA3AF' }}>
                No department hiring data in this range.
              </Typography>
            ) : (
              <Stack spacing={1.5}>
                {departments.map((row, idx) => (
                  <Box key={idx}>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.4 }}>
                      <Typography variant="caption" sx={{ fontWeight: 600, color: '#374151', fontSize: 12 }}>
                        {row.dept}
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', fontSize: 12 }}>
                        {row.hires} hires ({row.applications} apps)
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min(100, ((row.hires || 0) / maxDeptHires) * 100)}
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
            )}
          </Card>
        </Grid>

        {/* Top Performing Jobs Table */}
        <Grid size={{ xs: 12, lg: 4.8 }}>
          <Card sx={{ p: 2.5, borderRadius: '16px', border: '1px solid #F3F4F6', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', bgcolor: '#FFF', height: '100%' }}>
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
                  {topJobs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 3, color: '#9CA3AF', fontSize: 12 }}>
                        No applications recorded in this range.
                      </TableCell>
                    </TableRow>
                  ) : (
                    topJobs.map((job, idx) => (
                      <TableRow key={idx} hover>
                        <TableCell sx={{ fontWeight: 600, color: '#111827', fontSize: 12.5 }}>{job.title}</TableCell>
                        <TableCell sx={{ color: '#6B7280', fontSize: 12 }}>{job.dept}</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#111827', fontSize: 12 }}>{job.applications}</TableCell>
                        <TableCell sx={{ color: '#10B981', fontWeight: 700, fontSize: 12 }}>{job.hired}</TableCell>
                        <TableCell sx={{ color: '#6B7280', fontSize: 12 }}>{job.avg_time}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        {/* Recruitment Insights Card */}
        <Grid size={{ xs: 12, lg: 3.2 }}>
          <Card sx={{ p: 2.5, borderRadius: '16px', border: '1px solid #F3F4F6', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', bgcolor: '#FFF', height: '100%' }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
              <ThunderboltOutlined style={{ color: '#530EF0', fontSize: 16 }} />
              <Typography variant="h3" sx={{ fontWeight: 600, color: '#111827', fontSize: 16 }}>
                Recruitment Insights
              </Typography>
            </Stack>

            <Stack spacing={1.5}>
              <Box sx={{ p: 1.5, bgcolor: '#FAF5FF', borderRadius: '10px', border: '1px solid #F3E8FF' }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#530EF0', display: 'block', mb: 0.3 }}>
                  Hiring Velocity
                </Typography>
                <Typography variant="caption" sx={{ color: '#4B5563', fontSize: 12, lineHeight: 1.4 }}>
                  Average time to hire is <strong>{insights.avg_time_to_hire_days ?? 0} days</strong> across {kpis.hires_completed} completed hire(s).
                </Typography>
              </Box>

              <Box sx={{ p: 1.5, bgcolor: '#ECFDF5', borderRadius: '10px', border: '1px solid #D1FAE5' }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#059669', display: 'block', mb: 0.3 }}>
                  Top Hiring Department
                </Typography>
                <Typography variant="caption" sx={{ color: '#4B5563', fontSize: 12, lineHeight: 1.4 }}>
                  <strong>{insights.top_dept || 'N/A'}</strong> leads with <strong>{insights.top_dept_hires ?? 0}</strong> hire(s) and {insights.offer_acceptance_rate ?? 0}% offer acceptance.
                </Typography>
              </Box>

              <Box sx={{ p: 1.5, bgcolor: '#EFF6FF', borderRadius: '10px', border: '1px solid #DBEAFE' }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#2563EB', display: 'block', mb: 0.3 }}>
                  Top Application Source
                </Typography>
                <Typography variant="caption" sx={{ color: '#4B5563', fontSize: 12, lineHeight: 1.4 }}>
                  <strong>{insights.top_source || 'N/A'}</strong> is your highest-volume channel ({insights.top_source_conversion ?? 0}% hire conversion).
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>

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
