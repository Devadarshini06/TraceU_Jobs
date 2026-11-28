import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getGreeting from 'utils/getGreeting';
import { getAdminDashboard } from 'api/adminDashboard';

// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
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
import LinearProgress from '@mui/material/LinearProgress';

// icons
import DashboardOutlined from '@ant-design/icons/DashboardOutlined';
import ArrowUpOutlined from '@ant-design/icons/ArrowUpOutlined';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import DownOutlined from '@ant-design/icons/DownOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import ReadOutlined from '@ant-design/icons/ReadOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined';
import UploadOutlined from '@ant-design/icons/UploadOutlined';
import ThunderboltFilled from '@ant-design/icons/ThunderboltFilled';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import SafetyCertificateOutlined from '@ant-design/icons/SafetyCertificateOutlined';
import LinkedinFilled from '@ant-design/icons/LinkedinFilled';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import RocketOutlined from '@ant-design/icons/RocketOutlined';

// avatars
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import avatar5 from 'assets/images/users/avatar-5.png';

// ==============================|| TRACEU JOBS - ADMIN DASHBOARD ||============================== //

export default function AdminDashboard() {
  const navigate = useNavigate();

  // Period filter state
  const [periodAnchor, setPeriodAnchor] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('Last 30 days');
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const periodToDays = (period) => {
    switch (period) {
      case 'Last 7 days':
        return 7;
      case 'Last 90 days':
        return 90;
      case 'All time':
        return 365;
      default:
        return 30;
    }
  };

  useEffect(() => {
    let active = true;
    setLoading(true);
    getAdminDashboard(periodToDays(selectedPeriod))
      .then((data) => {
        if (active) setDashboardData(data);
      })
      .catch(() => {
        if (active) setDashboardData(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [selectedPeriod]);

  const summary = dashboardData?.summary || {};
  const insights = dashboardData?.insights || {};
  const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5];

  const formatRelTime = (isoStr) => {
    if (!isoStr) return '—';
    const d = new Date(isoStr);
    if (Number.isNaN(d.getTime())) return '—';
    const diffMs = Date.now() - d.getTime();
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  };

  const formatScheduleTime = (isoStr) => {
    if (!isoStr) return '—';
    const d = new Date(isoStr);
    if (Number.isNaN(d.getTime())) return '—';
    return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  };

  const stageStyleMap = {
    applied: { label: 'Applied', color: '#6929e2', bg: '#f3edff' },
    screening: { label: 'Screening', color: '#38bdf8', bg: '#f0f9ff' },
    shortlisted: { label: 'Shortlisted', color: '#0d9488', bg: '#f0fdfa' },
    interview: { label: 'Interview', color: '#d97706', bg: '#fffbeb' },
    selected: { label: 'Selected', color: '#ec4899', bg: '#fdf2f8' },
    offered: { label: 'Offered', color: '#8b5cf6', bg: '#f5f3ff' },
    hired: { label: 'Hired', color: '#10b981', bg: '#ecfdf5' }
  };

  // Top 6 KPI stats (from backend summary)
  const kpiStats = [
    {
      title: 'Open Requisitions',
      count: String(summary.open_requisitions ?? 0),
      subtitle: 'Across all departments',
      icon: <FileTextOutlined style={{ fontSize: 18 }} />,
      iconColor: '#6929e2',
      iconBg: '#f3edff'
    },
    {
      title: 'Total Applications',
      count: String(summary.total_applications ?? 0),
      subtitle: 'Applications received',
      icon: <TeamOutlined style={{ fontSize: 18 }} />,
      iconColor: '#2563eb',
      iconBg: '#eff6ff'
    },
    {
      title: 'Shortlisted',
      count: String(summary.shortlisted ?? 0),
      subtitle: 'Candidates shortlisted',
      icon: <UserOutlined style={{ fontSize: 18 }} />,
      iconColor: '#ea580c',
      iconBg: '#fff7ed'
    },
    {
      title: 'Interviews',
      count: String(summary.interviews ?? 0),
      subtitle: 'Scheduled or in progress',
      icon: <CalendarOutlined style={{ fontSize: 18 }} />,
      iconColor: '#7c3aed',
      iconBg: '#f5f3ff'
    },
    {
      title: 'Offers',
      count: String(summary.offers ?? 0),
      subtitle: 'Offers sent',
      icon: <CheckCircleOutlined style={{ fontSize: 18 }} />,
      iconColor: '#059669',
      iconBg: '#ecfdf5'
    },
    {
      title: 'Internships',
      count: String(summary.internships ?? 0),
      subtitle: 'Active internships',
      icon: <ReadOutlined style={{ fontSize: 18 }} />,
      iconColor: '#db2777',
      iconBg: '#fdf2f8'
    }
  ];

  // Pipeline stages (from backend)
  const pipelineStages = (dashboardData?.pipeline_stages || []).map((s) => {
    const key = String(s.stage || '').toLowerCase();
    const meta = stageStyleMap[key] || { label: s.stage, color: '#6929e2', bg: '#f3edff' };
    return {
      label: meta.label,
      count: s.count ?? 0,
      pct: `${Math.min(100, Math.max(0, Number(s.percentage) || 0))}%`,
      color: meta.color
    };
  });

  // Recent applications (from backend)
  const recentApplications = (dashboardData?.recent_applications || []).map((a, idx) => {
    const key = String(a.stage || '').toLowerCase();
    const meta = stageStyleMap[key] || { label: a.stage || 'Applied', color: '#6929e2', bg: '#f3edff' };
    return {
      id: a.id || idx,
      name: a.candidate_name || 'Unknown Candidate',
      avatar: avatars[idx % avatars.length],
      role: a.role || '—',
      stage: meta.label,
      stageColor: meta.color,
      stageBg: meta.bg,
      time: formatRelTime(a.applied_at)
    };
  });

  // Upcoming interviews (from backend)
  const upcomingInterviews = (dashboardData?.upcoming_interviews || []).map((iv, idx) => ({
    id: iv.id || idx,
    name: iv.candidate_name || 'Unknown Candidate',
    avatar: avatars[idx % avatars.length],
    role: iv.role || '—',
    time: formatScheduleTime(iv.scheduled_at)
  }));

  // Top jobs (from backend)
  const topJobs = (dashboardData?.top_jobs || []).map((j) => ({
    id: j.id,
    title: j.title,
    apps: String(j.applications ?? 0),
    views: String(j.views ?? 0)
  }));

  // Activity list (from backend)
  const recentActivities = (dashboardData?.recent_activity || []).map((act, idx) => {
    const palette = [
      { color: '#2563eb', bg: '#eff6ff' },
      { color: '#0d9488', bg: '#f0fdfa' },
      { color: '#f59e0b', bg: '#fffbeb' },
      { color: '#10b981', bg: '#ecfdf5' },
      { color: '#7c3aed', bg: '#f5f3ff' }
    ];
    const p = palette[idx % palette.length];
    return {
      title: act.title || 'Activity',
      desc: act.description || '',
      time: formatRelTime(act.created_at),
      color: p.color,
      bg: p.bg
    };
  });

  // Dynamic SVG points for pipeline trend
  const trendPoints = dashboardData?.pipeline_trend || [];
  const maxTrendVal = Math.max(1, ...trendPoints.map((pt) => Math.max(pt.applications || 0, pt.hires || 0)));
  const buildPolyline = (key) => {
    if (trendPoints.length === 0) return '';
    if (trendPoints.length === 1) {
      const y = 180 - ((trendPoints[0][key] || 0) / maxTrendVal) * 140;
      return `20,${y} 490,${y}`;
    }
    return trendPoints
      .map((pt, idx) => {
        const x = 20 + (idx / (trendPoints.length - 1)) * 470;
        const y = 180 - ((pt[key] || 0) / maxTrendVal) * 140;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  };
  const appsPolyline = buildPolyline('applications');
  const hiresPolyline = buildPolyline('hires');

  return (
    <Box sx={{ width: '100%', minHeight: '100%', pb: 5 }}>
      {/* ========================================================================= */}
      {/* 1. GREETING & HEADER ROW                                                  */}
      {/* ========================================================================= */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-start', md: 'center' }}
        justifyContent="space-between"
        spacing={2.5}
        sx={{ mb: 3 }}
      >
        <Box>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
            <Box sx={{ width: 22, height: 22, borderRadius: '6px', bgcolor: '#F3EDFF', color: '#530EF0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>
              <DashboardOutlined />
            </Box>
            <Typography variant="caption" sx={{ color: '#530EF0', fontWeight: 600, fontSize: 12 }}>
              Admin Dashboard
            </Typography>
          </Stack>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 700, fontSize: { xs: 22, sm: 24 }, color: '#111827', letterSpacing: '-0.3px',
              mb: 0.5
            }}
          >
            {getGreeting()}, Admin 👋
          </Typography>
          <Typography sx={{ color: '#6B7280', fontSize: 14, fontWeight: 400, lineHeight: 1.5, mt: 0.5 }}>
            Here's what's happening with your recruitment today.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} alignItems="center" flexShrink={0}>
          {/* Date Selector Pill */}
          <Button
            variant="outlined"
            onClick={(e) => setPeriodAnchor(e.currentTarget)}
            startIcon={<CalendarOutlined style={{ color: '#530EF0' }} />}
            endIcon={<DownOutlined style={{ fontSize: 10, color: '#9ca3af' }} />}
            sx={{
              borderColor: '#e5e7eb',
              bgcolor: '#ffffff',
              color: '#374151',
              fontWeight: 600,
              fontSize: 13.5,
              textTransform: 'none',
              borderRadius: '8px',
              height: 40,
              minHeight: 40,
              px: 2,
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
              '&:hover': { bgcolor: '#f9fafb', borderColor: '#d1d5db' }
            }}
          >
            {selectedPeriod}
          </Button>

          {/* Create Job Button */}
          <Button
            variant="contained"
            startIcon={<PlusOutlined />}
            onClick={() => navigate('/admin/jobs')}
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
      </Stack>

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
      {/* 3. MIDDLE SECTION: HIRING PIPELINE & RIGHT ACTIONS                         */}
      {/* ========================================================================= */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* Left Column: Hiring Pipeline Funnel & Chart */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: '20px',
              bgcolor: '#ffffff',
              border: '1px solid #f0f2f5',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
              height: '100%'
            }}
          >
            {/* Pipeline Header */}
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
              <Box>
                <Typography sx={{ fontSize: 17, fontWeight: 800, color: '#111827' }}>
                  Hiring Pipeline
                </Typography>
                <Typography sx={{ fontSize: 12.5, color: '#9ca3af' }}>
                  Total applications across all active jobs
                </Typography>
              </Box>

              <Button
                size="small"
                variant="outlined"
                endIcon={<DownOutlined style={{ fontSize: 10 }} />}
                onClick={(e) => setPeriodAnchor(e.currentTarget)}
                sx={{
                  borderColor: '#e5e7eb',
                  color: '#4b5563',
                  textTransform: 'none',
                  fontSize: 12,
                  fontWeight: 600,
                  borderRadius: '20px',
                  px: 1.8,
                  py: 0.6
                }}
              >
                {selectedPeriod}
              </Button>
              <Menu
                anchorEl={periodAnchor}
                open={Boolean(periodAnchor)}
                onClose={() => setPeriodAnchor(null)}
              >
                {['Last 7 days', 'Last 30 days', 'Last 90 days', 'All time'].map((p) => (
                  <MenuItem
                    key={p}
                    onClick={() => {
                      setSelectedPeriod(p);
                      setPeriodAnchor(null);
                    }}
                  >
                    {p}
                  </MenuItem>
                ))}
              </Menu>
            </Stack>

            <Grid container spacing={3.5} alignItems="center">
              {/* Left Funnel Stages */}
              <Grid size={{ xs: 12, md: 5 }}>
                <Stack spacing={1.5}>
                  {pipelineStages.map((stage) => (
                    <Box key={stage.label}>
                      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 0.5 }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              bgcolor: stage.color
                            }}
                          />
                          <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>
                            {stage.label}
                          </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                          <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>
                            {stage.count}
                          </Typography>
                          <Typography sx={{ fontSize: 12, color: '#9ca3af', width: 34, textAlign: 'right' }}>
                            {stage.pct}
                          </Typography>
                        </Stack>
                      </Stack>
                      <Box sx={{ width: '100%', bgcolor: '#f3f4f6', height: 8, borderRadius: 4, overflow: 'hidden' }}>
                        <Box
                          sx={{
                            width: stage.pct,
                            height: '100%',
                            bgcolor: stage.color,
                            borderRadius: 4,
                            transition: 'width 0.6s ease'
                          }}
                        />
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Grid>

              {/* Right Dual-Line SVG Graph */}
              <Grid size={{ xs: 12, md: 7 }}>
                <Box sx={{ p: 2, bgcolor: '#fafbff', borderRadius: '16px', border: '1px solid #f0f2f8' }}>
                  {/* Legend */}
                  <Stack direction="row" spacing={3} sx={{ mb: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#6929e2' }} />
                      <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: '#374151' }}>
                        Applications
                      </Typography>
                      <Typography sx={{ fontSize: 14, fontWeight: 800, color: '#111827' }}>
                        486
                      </Typography>
                      <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: '#059669' }}>
                        ↑ 18%
                      </Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#10b981' }} />
                      <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: '#374151' }}>
                        Hires
                      </Typography>
                      <Typography sx={{ fontSize: 14, fontWeight: 800, color: '#111827' }}>
                        5
                      </Typography>
                      <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: '#059669' }}>
                        ↑ 60%
                      </Typography>
                    </Stack>
                  </Stack>

                  {/* SVG Chart */}
                  <Box sx={{ width: '100%', height: 180, position: 'relative' }}>
                    <svg viewBox="0 0 500 200" width="100%" height="100%" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6929e2" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#6929e2" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Horizontal Grid lines */}
                      <line x1="0" y1="30" x2="500" y2="30" stroke="#e5e7eb" strokeDasharray="3 3" />
                      <line x1="0" y1="75" x2="500" y2="75" stroke="#e5e7eb" strokeDasharray="3 3" />
                      <line x1="0" y1="120" x2="500" y2="120" stroke="#e5e7eb" strokeDasharray="3 3" />
                      <line x1="0" y1="165" x2="500" y2="165" stroke="#e5e7eb" strokeDasharray="3 3" />

                      {/* Purple Applications Curve */}
                      {appsPolyline && (
                        <polyline points={appsPolyline} fill="none" stroke="#6929e2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      )}

                      {/* Green Hires Curve */}
                      {hiresPolyline && (
                        <polyline points={hiresPolyline} fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      )}

                      {trendPoints.length === 0 && (
                        <text x="260" y="105" textAnchor="middle" fill="#9ca3af" fontSize="13">
                          {loading ? 'Loading trend data...' : 'No application trend data for this period'}
                        </text>
                      )}
                    </svg>

                    {/* X-axis labels */}
                    <Stack direction="row" justifyContent="space-between" sx={{ mt: 1, px: 1 }}>
                      {trendPoints.slice(0, 6).map((pt) => (
                        <Typography key={pt.date} sx={{ fontSize: 11, color: '#9ca3af' }}>
                          {pt.date}
                        </Typography>
                      ))}
                    </Stack>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        {/* Right Column: AI Studio Promo, Quick Actions & Activity */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={2.5}>
            {/* AI Studio Card */}
            <Card
              elevation={0}
              sx={{
                p: 2.8,
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #1c1335 0%, #291a52 100%)',
                color: '#ffffff',
                boxShadow: '0 10px 30px rgba(28, 19, 53, 0.25)'
              }}
            >
              <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 2 }}>
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '12px',
                    bgcolor: 'rgba(105, 41, 226, 0.4)',
                    color: '#c4b5fd',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <ThunderboltFilled style={{ fontSize: 22 }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 800, fontSize: 16, color: '#ffffff', mb: 0.5 }}>
                    Let AI help you hire better
                  </Typography>
                  <Typography sx={{ fontSize: 12.5, color: '#cbd5e1', lineHeight: 1.45 }}>
                    Get job descriptions, candidate matches, resume insights and more with AI Studio.
                  </Typography>
                </Box>
              </Stack>
              <Button
                variant="contained"
                onClick={() => navigate('/admin/ai-studio')}
                endIcon={<ArrowRightOutlined />}
                sx={{
                  bgcolor: '#6929e2',
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: 13,
                  borderRadius: '10px',
                  py: 1,
                  px: 2.5,
                  '&:hover': { bgcolor: '#5b1fd9' }
                }}
              >
                Open AI Studio
              </Button>
            </Card>

            {/* Quick Actions Card */}
            <Card
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: '18px',
                bgcolor: '#ffffff',
                border: '1px solid #f0f2f5',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)'
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                <Typography sx={{ fontSize: 15, fontWeight: 800, color: '#111827' }}>
                  Quick Actions
                </Typography>
                <Typography
                  onClick={() => navigate('/admin/analytics')}
                  sx={{ fontSize: 12, fontWeight: 700, color: '#6929e2', cursor: 'pointer' }}
                >
                  Analytics →
                </Typography>
              </Stack>

              <Stack spacing={1.2}>
                {[
                  {
                    title: 'Create Job',
                    desc: 'Post a new job vacancy',
                    color: '#6929e2',
                    bg: '#f3edff',
                    icon: <PlusOutlined />,
                    path: '/admin/jobs'
                  },
                  {
                    title: 'Create Requisition',
                    desc: 'Request a new headcount',
                    color: '#2563eb',
                    bg: '#eff6ff',
                    icon: <FileTextOutlined />,
                    path: '/admin/requisitions'
                  },
                  {
                    title: 'Upload Resume',
                    desc: 'Add & parse candidate resumes',
                    color: '#7c3aed',
                    bg: '#f5f3ff',
                    icon: <UploadOutlined />,
                    path: '/admin/ai-studio'
                  },
                  {
                    title: 'Create Internship',
                    desc: 'Post a new internship opportunity',
                    color: '#db2777',
                    bg: '#fdf2f8',
                    icon: <ReadOutlined />,
                    path: '/admin/internships'
                  }
                ].map((act) => (
                  <Stack
                    key={act.title}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    onClick={() => navigate(act.path)}
                    sx={{
                      p: 1.2,
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'background-color 0.15s ease',
                      '&:hover': { bgcolor: '#f9fafb' }
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <Box
                        sx={{
                          width: 34,
                          height: 34,
                          borderRadius: '8px',
                          bgcolor: act.bg,
                          color: act.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 15
                        }}
                      >
                        {act.icon}
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>
                          {act.title}
                        </Typography>
                        <Typography sx={{ fontSize: 11.5, color: '#6b7280' }}>
                          {act.desc}
                        </Typography>
                      </Box>
                    </Stack>
                    <RightOutlined style={{ fontSize: 11, color: '#9ca3af' }} />
                  </Stack>
                ))}
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      {/* ========================================================================= */}
      {/* 4. LOWER SECTION: APPLICATIONS, INTERVIEWS, TOP JOBS & RECENT ACTIVITY     */}
      {/* ========================================================================= */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* Recent Applications Table */}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card
            elevation={0}
            sx={{
              p: 2.25,
              borderRadius: '18px',
              bgcolor: '#ffffff',
              border: '1px solid #f0f2f5',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)',
              height: '100%'
            }}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
              <Typography sx={{ fontSize: 14.5, fontWeight: 800, color: '#111827' }}>
                Recent Applications
              </Typography>
              <Typography onClick={() => navigate('/admin/applications')} sx={{ fontSize: 11.5, fontWeight: 700, color: '#6929e2', cursor: 'pointer' }}>
                View all →
              </Typography>
            </Stack>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', px: 0.5 }}>Candidate</TableCell>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', px: 0.5 }}>Role</TableCell>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', px: 0.5 }}>Stage</TableCell>
                    <TableCell align="right" sx={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', px: 0.5 }}>Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentApplications.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 3, fontSize: 12, color: '#9ca3af' }}>
                        {loading ? 'Loading...' : 'No recent applications yet'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    recentApplications.map((cand) => (
                      <TableRow key={cand.id} hover sx={{ cursor: 'pointer' }} onClick={() => navigate('/admin/applications')}>
                      <TableCell sx={{ px: 0.5, py: 1.1 }}>
                        <Stack direction="row" alignItems="center" spacing={0.75}>
                          <Avatar src={cand.avatar} sx={{ width: 24, height: 24 }} />
                          <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#111827', whiteSpace: 'nowrap' }}>
                            {cand.name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ px: 0.5, py: 1.1, fontSize: 11.5, color: '#6b7280', whiteSpace: 'nowrap' }}>
                        {cand.role}
                      </TableCell>
                      <TableCell sx={{ px: 0.5, py: 1.1 }}>
                        <Chip
                          label={cand.stage}
                          size="small"
                          sx={{
                            fontSize: 10,
                            fontWeight: 700,
                            bgcolor: cand.stageBg,
                            color: cand.stageColor,
                            height: 20
                          }}
                        />
                      </TableCell>
                      <TableCell align="right" sx={{ px: 0.5, py: 1.1, fontSize: 10.5, color: '#9ca3af' }}>
                        {cand.time}
                      </TableCell>
                    </TableRow>
                  )))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        {/* Upcoming Interviews */}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card
            elevation={0}
            sx={{
              p: 2.25,
              borderRadius: '18px',
              bgcolor: '#ffffff',
              border: '1px solid #f0f2f5',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)',
              height: '100%'
            }}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
              <Typography sx={{ fontSize: 14.5, fontWeight: 800, color: '#111827' }}>
                Upcoming Interviews
              </Typography>
              <Typography onClick={() => navigate('/admin/applications')} sx={{ fontSize: 11.5, fontWeight: 700, color: '#6929e2', cursor: 'pointer' }}>
                View all →
              </Typography>
            </Stack>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', px: 0.5 }}>Candidate</TableCell>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', px: 0.5 }}>Role</TableCell>
                    <TableCell align="right" sx={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', px: 0.5 }}>Schedule</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {upcomingInterviews.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} align="center" sx={{ py: 3, fontSize: 12, color: '#9ca3af' }}>
                        {loading ? 'Loading...' : 'No upcoming interviews scheduled'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    upcomingInterviews.map((item) => (
                      <TableRow key={item.id} hover sx={{ cursor: 'pointer' }} onClick={() => navigate('/admin/applications')}>
                      <TableCell sx={{ px: 0.5, py: 1.1 }}>
                        <Stack direction="row" alignItems="center" spacing={0.75}>
                          <Avatar src={item.avatar} sx={{ width: 24, height: 24 }} />
                          <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#111827', whiteSpace: 'nowrap' }}>
                            {item.name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ px: 0.5, py: 1.1, fontSize: 11.5, color: '#6b7280', whiteSpace: 'nowrap' }}>
                        {item.role}
                      </TableCell>
                      <TableCell align="right" sx={{ px: 0.5, py: 1.1, fontSize: 11, fontWeight: 600, color: '#4b5563', whiteSpace: 'nowrap' }}>
                        {item.time}
                      </TableCell>
                    </TableRow>
                  )))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        {/* Top Jobs by Applications */}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card
            elevation={0}
            sx={{
              p: 2.25,
              borderRadius: '18px',
              bgcolor: '#ffffff',
              border: '1px solid #f0f2f5',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)',
              height: '100%'
            }}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
              <Typography sx={{ fontSize: 14.5, fontWeight: 800, color: '#111827' }}>
                Top Jobs by Applications
              </Typography>
              <Typography onClick={() => navigate('/admin/jobs')} sx={{ fontSize: 11.5, fontWeight: 700, color: '#6929e2', cursor: 'pointer' }}>
                View all →
              </Typography>
            </Stack>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', px: 0.5 }}>Job Title</TableCell>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', px: 0.5 }}>Apps</TableCell>
                    <TableCell align="right" sx={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', px: 0.5 }}>Views</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topJobs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} align="center" sx={{ py: 3, fontSize: 12, color: '#9ca3af' }}>
                        {loading ? 'Loading...' : 'No jobs posted yet'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    topJobs.map((job) => (
                      <TableRow key={job.id || job.title} hover sx={{ cursor: 'pointer' }} onClick={() => navigate('/admin/jobs')}>
                        <TableCell sx={{ px: 0.5, py: 1.1 }}>
                          <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#111827', whiteSpace: 'nowrap' }}>
                            • {job.title}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ px: 0.5, py: 1.1, fontSize: 11.5, fontWeight: 600, color: '#4b5563' }}>
                          {job.apps}
                        </TableCell>
                        <TableCell align="right" sx={{ px: 0.5, py: 1.1, fontSize: 11.5, color: '#6b7280' }}>
                          {job.views}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        {/* 4. Recent Activity Card */}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card
            elevation={0}
            sx={{
              p: 2.25,
              borderRadius: '18px',
              bgcolor: '#ffffff',
              border: '1px solid #f0f2f5',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)',
              height: '100%'
            }}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
              <Typography sx={{ fontSize: 14.5, fontWeight: 800, color: '#111827' }}>
                Recent Activity
              </Typography>
              <Typography onClick={() => navigate('/admin/settings?tab=audit')} sx={{ fontSize: 11.5, fontWeight: 700, color: '#6929e2', cursor: 'pointer' }}>
                View all →
              </Typography>
            </Stack>

            <Stack spacing={1.6}>
              {recentActivities.length === 0 ? (
                <Typography sx={{ fontSize: 12, color: '#9ca3af', py: 2, textAlign: 'center' }}>
                  {loading ? 'Loading...' : 'No recent activity yet'}
                </Typography>
              ) : (
                recentActivities.map((act, i) => (
                  <Stack key={i} direction="row" alignItems="flex-start" spacing={1.25}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: act.color,
                      mt: 0.7,
                      flexShrink: 0
                    }}
                  />
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#111827', lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {act.title}
                    </Typography>
                    <Typography sx={{ fontSize: 11, color: '#6b7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {act.desc}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: 10.5, color: '#9ca3af', flexShrink: 0 }}>
                    {act.time}
                  </Typography>
                </Stack>
              )))}
            </Stack>
          </Card>
        </Grid>
      </Grid>

      {/* ========================================================================= */}
      {/* 5. RECRUITMENT INSIGHTS & SOURCES                                         */}
      {/* ========================================================================= */}
      <Card
        elevation={0}
        sx={{
          p: 3,
          borderRadius: '20px',
          bgcolor: '#ffffff',
          border: '1px solid #f0f2f5',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)'
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              bgcolor: '#f3edff',
              color: '#6929e2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ClockCircleOutlined />
          </Box>
          <Typography sx={{ fontSize: 16, fontWeight: 800, color: '#111827' }}>
            Recruitment Insights
          </Typography>
        </Stack>

        <Grid container spacing={3} alignItems="center">
          {/* 4 Stats */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Typography sx={{ fontSize: 11.5, color: '#6b7280', mb: 0.5 }}>Time to Hire</Typography>
                <Typography sx={{ fontSize: 22, fontWeight: 800, color: '#111827' }}>{insights.time_to_hire_days ?? 0} days</Typography>
                <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: '#6b7280' }}>Avg from applied to hired</Typography>
              </Grid>

              <Grid size={{ xs: 6, sm: 3 }}>
                <Typography sx={{ fontSize: 11.5, color: '#6b7280', mb: 0.5 }}>Time to Fill</Typography>
                <Typography sx={{ fontSize: 22, fontWeight: 800, color: '#111827' }}>{insights.time_to_fill_days ?? 0} days</Typography>
                <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: '#6b7280' }}>Avg requisition fill time</Typography>
              </Grid>

              <Grid size={{ xs: 6, sm: 3 }}>
                <Typography sx={{ fontSize: 11.5, color: '#6b7280', mb: 0.5 }}>Offer Acceptance Rate</Typography>
                <Typography sx={{ fontSize: 22, fontWeight: 800, color: '#111827' }}>{insights.offer_acceptance_rate ?? 0}%</Typography>
                <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: '#6b7280' }}>Hired vs offered</Typography>
              </Grid>

              <Grid size={{ xs: 6, sm: 3 }}>
                <Typography sx={{ fontSize: 11.5, color: '#6b7280', mb: 0.5 }}>Top Source</Typography>
                <Typography sx={{ fontSize: 20, fontWeight: 800, color: '#0077b5' }}>{insights.top_source || 'N/A'}</Typography>
                <Typography sx={{ fontSize: 11.5, color: '#6b7280' }}>Primary candidate source</Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Applications by Source Bars */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ pl: { md: 3 }, borderLeft: { md: '1px solid #f0f2f5' } }}>
              <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: '#374151', mb: 1.5 }}>
                Applications by Source
              </Typography>
              <Stack spacing={1}>
                {(insights.applications_by_source || []).length === 0 ? (
                  <Typography sx={{ fontSize: 12, color: '#9ca3af' }}>
                    {loading ? 'Loading...' : 'No application source data yet'}
                  </Typography>
                ) : (
                  (insights.applications_by_source || []).map((src) => (
                    <Stack key={src.source} direction="row" alignItems="center" spacing={2}>
                      <Typography sx={{ fontSize: 11.5, color: '#6b7280', width: 120 }}>
                        {src.source}
                      </Typography>
                      <Box sx={{ flexGrow: 1, bgcolor: '#f3f4f6', height: 7, borderRadius: 4, overflow: 'hidden' }}>
                        <Box sx={{ width: `${Math.min(100, Number(src.percentage) || 0)}%`, height: '100%', bgcolor: '#6929e2', borderRadius: 4 }} />
                      </Box>
                      <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: '#111827', width: 38, textAlign: 'right' }}>
                        {src.percentage}%
                      </Typography>
                    </Stack>
                  ))
                )}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
