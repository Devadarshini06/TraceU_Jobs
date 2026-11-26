import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getGreeting from 'utils/getGreeting';

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
import LinearProgress from '@mui/material/LinearProgress';

// icons
import BankOutlined from '@ant-design/icons/BankOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import ThunderboltOutlined from '@ant-design/icons/ThunderboltOutlined';
import SafetyCertificateOutlined from '@ant-design/icons/SafetyCertificateOutlined';
import ApartmentOutlined from '@ant-design/icons/ApartmentOutlined';
import StarFilled from '@ant-design/icons/StarFilled';

// project imports
import MainCard from 'components/MainCard';

// ==============================|| EMPLOYER / HR DASHBOARD ||============================== //

export default function EmployerDashboard() {
  const navigate = useNavigate();

  const [activeJobs] = useState([
    { title: 'Senior Full Stack React Developer', dept: 'Engineering', type: 'Full-time', apps: 84, shortlisted: 18, status: 'Active' },
    { title: 'Lead Product Designer (UI/UX)', dept: 'Design', type: 'Full-time', apps: 62, shortlisted: 14, status: 'Active' },
    { title: 'DevOps & Cloud Infrastructure Engineer', dept: 'IT Ops', type: 'Remote', apps: 48, shortlisted: 11, status: 'Active' },
    { title: 'AI/ML Prompt Engineer (Internship)', dept: 'AI Labs', type: 'Internship', apps: 54, shortlisted: 22, status: 'Active' }
  ]);

  const [candidates] = useState([
    { name: 'Arun Kumar', role: 'Frontend Developer', match: 96, exp: '4 yrs', stage: 'Shortlisted', skills: 'React, TypeScript, MUI' },
    { name: 'Priya Sharma', role: 'UI/UX Designer', match: 94, exp: '3.5 yrs', stage: 'Interview Round 2', skills: 'Figma, Design Systems, Mobile' },
    { name: 'Rahul Verma', role: 'Full Stack Engineer', match: 91, exp: '5 yrs', stage: 'BGV Verification', skills: 'Node.js, React, Docker' },
    { name: 'Sneha Patel', role: 'Product Manager', match: 88, exp: '4 yrs', stage: 'HR Round', skills: 'Agile, Roadmap, Analytics' }
  ]);

  return (
    <Box sx={{ width: '100%', minHeight: '100%', pb: 5 }}>
      {/* Portal Header Banner */}
      <Box
        sx={{
          p: { xs: 2.5, md: 3.5 },
          borderRadius: '16px',
          bgcolor: '#2e1065',
          backgroundImage: 'radial-gradient(at 100% 0%, rgba(147, 51, 234, 0.45) 0px, transparent 60%)',
          color: '#ffffff',
          mb: 3.5,
          boxShadow: '0 10px 30px rgba(46, 16, 101, 0.15)'
        }}
      >
        <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'flex-start', md: 'center' }} justifyContent="space-between" spacing={2}>
          <Box>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '8px',
                  bgcolor: '#9333ea',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <BankOutlined style={{ fontSize: 16, color: '#fff' }} />
              </Box>
              <Chip
                label="TraceU Jobs — HR / Company Portal"
                size="small"
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.15)', color: '#ffffff', fontWeight: 700, fontSize: 11 }}
              />
            </Stack>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 700,
                color: '#ffffff',
                fontSize: { xs: 22, sm: 24 },
                letterSpacing: '-0.3px',
                mb: 0.5
              }}
            >
              {getGreeting()}, Recruiter 👋
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: 14, fontWeight: 400, lineHeight: 1.5 }}>
              Acme Technologies — Talent Acquisition Workspace. Manage requisitions, AI candidate matching, interview schedules, and transition hires to TraceU BGV and HRMS.
            </Typography>
          </Box>

          <Stack direction="row" spacing={1.5} alignItems="center">
            <Button
              variant="outlined"
              onClick={() => navigate('/employer-login')}
              sx={{
                borderColor: 'rgba(255, 255, 255, 0.3)',
                color: '#ffffff',
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: '8px',
                height: 40,
                minHeight: 40,
                px: 2,
                whiteSpace: 'nowrap',
                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.5)' }
              }}
            >
              Sign Out
            </Button>
            <Button
              variant="contained"
              startIcon={<PlusOutlined />}
              onClick={() => navigate('/hr/jobs')}
              sx={{
                bgcolor: '#530EF0',
                color: '#ffffff',
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: '8px',
                height: 40,
                minHeight: 40,
                px: 2,
                whiteSpace: 'nowrap',
                '&:hover': { bgcolor: '#430bc2' }
              }}
            >
              Post New Vacancy
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* Hiring Pipeline Tracker */}
      <MainCard sx={{ mb: 3.5, bgcolor: '#ffffff' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Live Hiring Pipeline
        </Typography>
        <Typography variant="body2" sx={{ color: '#6b7280', mb: 3 }}>
          Real-time progression of all candidate applications across active company vacancies
        </Typography>

        <Grid container spacing={2}>
          {[
            { label: 'Applications Received', count: 248, change: '+32% this month', color: '#6929e2', bg: '#f3edff' },
            { label: 'Shortlisted by AI', count: 86, change: '35% pass rate', color: '#0284c7', bg: '#f0f9ff' },
            { label: 'Interviews Scheduled', count: 24, change: '12 today', color: '#ea580c', bg: '#fff7ed' },
            { label: 'BGV Verification', count: 14, change: 'TraceU BGV synced', color: '#4f46e5', bg: '#eef2ff' },
            { label: 'Hired & Onboarded', count: 12, change: 'Sent to HRMS', color: '#16a34a', bg: '#f0fdf4' }
          ].map((stage, idx) => (
            <Grid key={stage.label} size={{ xs: 12, sm: 6, md: 2.4 }}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: '12px',
                  bgcolor: stage.bg,
                  border: '1px solid rgba(0,0,0,0.04)',
                  position: 'relative'
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 700, color: stage.color, display: 'block', mb: 0.5 }}>
                  STAGE 0{idx + 1}
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, color: '#111827', mb: 0.5 }}>
                  {stage.count}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151', fontSize: 13, mb: 0.5 }}>
                  {stage.label}
                </Typography>
                <Typography variant="caption" sx={{ color: '#6b7280' }}>
                  {stage.change}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </MainCard>

      {/* Two Columns: Active Job Postings & AI Matched Candidates */}
      <Grid container spacing={3.5}>
        {/* Left: Active Vacancies */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <MainCard
            title={
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Active Job Openings (12)
                </Typography>
                <Button
                  size="small"
                  startIcon={<ThunderboltOutlined />}
                  onClick={() => navigate('/hr/ai-studio')}
                  sx={{ color: '#9333ea', textTransform: 'none', fontWeight: 600 }}
                >
                  AI JD Generator
                </Button>
              </Stack>
            }
          >
            <Stack spacing={2}>
              {activeJobs.map((job) => (
                <Box
                  key={job.title}
                  sx={{
                    p: 2,
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    bgcolor: '#fafafa',
                    transition: 'all 0.2s',
                    '&:hover': { bgcolor: '#ffffff', borderColor: '#9333ea', boxShadow: '0 4px 12px rgba(147,51,234,0.08)' }
                  }}
                >
                  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#111827' }}>
                      {job.title}
                    </Typography>
                    <Chip label={job.status} size="small" color="success" />
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
                    <Chip label={job.dept} size="small" variant="outlined" />
                    <Chip label={job.type} size="small" variant="outlined" />
                    <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 600 }}>
                      {job.apps} Total Applicants
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#9333ea', fontWeight: 700 }}>
                      {job.shortlisted} Shortlisted
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <Button size="small" variant="outlined" onClick={() => navigate('/hr/applications')} sx={{ textTransform: 'none', borderRadius: '8px' }}>
                      Review Applicants
                    </Button>
                    <Button size="small" onClick={() => navigate('/hr/jobs')} sx={{ textTransform: 'none', color: '#9333ea' }}>
                      Manage JD
                    </Button>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </MainCard>
        </Grid>

        {/* Right: AI Candidate Shortlist */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <MainCard
            title={
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    AI Studio — Top Matched Candidates
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#6b7280' }}>
                    Ranked by AI matching score against active job requirements
                  </Typography>
                </Box>
                <Chip icon={<StarFilled style={{ color: '#eab308' }} />} label="AI Ranked" size="small" sx={{ bgcolor: '#fef9c3', color: '#854d0e', fontWeight: 700 }} />
              </Stack>
            }
          >
            <Stack spacing={2}>
              {candidates.map((cand) => (
                <Box
                  key={cand.name}
                  sx={{
                    p: 2,
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    bgcolor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ bgcolor: '#f3edff', color: '#6929e2', fontWeight: 700 }}>
                      {cand.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#111827' }}>
                        {cand.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6b7280', display: 'block' }}>
                        {cand.role} • {cand.exp} experience
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#4b5563', fontWeight: 500 }}>
                        {cand.skills}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                    <Chip
                      label={`${cand.match}% Match`}
                      size="small"
                      sx={{ bgcolor: '#ecfdf5', color: '#059669', fontWeight: 800, mb: 0.5 }}
                    />
                    <Typography variant="caption" sx={{ display: 'block', color: '#6929e2', fontWeight: 600 }}>
                      {cand.stage}
                    </Typography>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => navigate('/hr/applications')}
                      sx={{ mt: 0.5, borderRadius: '6px', fontSize: 11, textTransform: 'none' }}
                    >
                      Schedule
                    </Button>
                  </Box>
                </Box>
              ))}
            </Stack>
          </MainCard>
        </Grid>
      </Grid>
    </Box>
  );
}

