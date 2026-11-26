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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// icons
import ThunderboltOutlined from '@ant-design/icons/ThunderboltOutlined';
import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import AimOutlined from '@ant-design/icons/AimOutlined';
import CopyOutlined from '@ant-design/icons/CopyOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import CloudUploadOutlined from '@ant-design/icons/CloudUploadOutlined';
import FilePdfOutlined from '@ant-design/icons/FilePdfOutlined';
import FileWordOutlined from '@ant-design/icons/FileWordOutlined';
import FileImageOutlined from '@ant-design/icons/FileImageOutlined';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import InfoCircleFilled from '@ant-design/icons/InfoCircleFilled';
import WarningFilled from '@ant-design/icons/WarningFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import DownloadOutlined from '@ant-design/icons/DownloadOutlined';
import ZoomInOutlined from '@ant-design/icons/ZoomInOutlined';
import ZoomOutOutlined from '@ant-design/icons/ZoomOutOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';

// avatar assets
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import avatar5 from 'assets/images/users/avatar-5.png';

export default function HrAiStudio() {
  const navigate = useNavigate();

  // Active top tab
  const [activeTab, setActiveTab] = useState(0); // 0: Resume OCR, 1: AI Suggestions, 2: Candidate Matching, 3: Job Description, 4: Smart Search
  const [zoomLevel, setZoomLevel] = useState(100);
  const [selectedUpload, setSelectedUpload] = useState('Priya_Sharma_Resume.pdf');
  const [isProcessing, setIsProcessing] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Extracted info editable fields
  const [extractedInfo, setExtractedInfo] = useState({
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43210',
    location: 'Bengaluru, Karnataka',
    role: 'Software Engineer',
    exp: '2+ years'
  });

  const uploads = [
    {
      id: 1,
      name: 'Priya_Sharma_Resume.pdf',
      size: '2.4 MB',
      status: 'Parsed',
      time: 'Oct 21, 2025, 10:30 AM',
      type: 'pdf'
    },
    {
      id: 2,
      name: 'Rahul_Kumar_Resume.docx',
      size: '1.8 MB',
      status: 'Parsed',
      time: 'Oct 21, 2025, 09:15 AM',
      type: 'doc'
    },
    {
      id: 3,
      name: 'Sneha_Iyer_Resume.pdf',
      size: '2.1 MB',
      status: 'Processing',
      time: 'Oct 21, 2025, 08:45 AM',
      type: 'pdf'
    },
    {
      id: 4,
      name: 'Arjun_Nair_Resume.jpg',
      size: '3.2 MB',
      status: 'Failed',
      time: 'Oct 20, 2025, 06:20 PM',
      type: 'img'
    }
  ];

  const handleUploadClick = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSnackbar({ open: true, message: 'Document uploaded and parsed with OCR successfully!', severity: 'success' });
    }, 1200);
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
            <ThunderboltOutlined style={{ fontSize: 14 }} />
            AI Studio
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
              AI Recruitment Studio
            </Typography>
            <Typography sx={{ color: '#6B7280', fontSize: 14, fontWeight: 400, lineHeight: 1.5, mt: 0.5 }}>
              Your AI assistant for faster, smarter and more accurate hiring.
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* 5 Top Feature Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          {
            title: 'Resume & Document OCR',
            desc: 'Extract information from resumes, certificates and more.',
            icon: <FileTextOutlined style={{ fontSize: 20 }} />,
            color: '#530EF0',
            bg: 'rgba(83, 14, 240, 0.08)'
          },
          {
            title: 'Job Description Generator',
            desc: 'Create compelling, role-specific job descriptions with AI.',
            icon: <EditOutlined style={{ fontSize: 20 }} />,
            color: '#7C3AED',
            bg: 'rgba(124, 58, 237, 0.08)'
          },
          {
            title: 'Candidate Matching',
            desc: 'Find the best candidates for your job requirements.',
            icon: <TeamOutlined style={{ fontSize: 20 }} />,
            color: '#2563EB',
            bg: 'rgba(37, 99, 235, 0.08)'
          },
          {
            title: 'Skill Gap Analysis',
            desc: 'Identify missing skills and suggest training or alternative candidates.',
            icon: <AimOutlined style={{ fontSize: 20 }} />,
            color: '#059669',
            bg: 'rgba(5, 150, 105, 0.08)'
          },
          {
            title: 'Duplicate Detection',
            desc: 'Find and merge duplicate candidate profiles.',
            icon: <CopyOutlined style={{ fontSize: 20 }} />,
            color: '#DC2626',
            bg: 'rgba(220, 38, 38, 0.08)'
          }
        ].map((feat, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 2.4 }} key={index}>
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
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 24px rgba(105, 41, 226, 0.08)',
                  borderColor: '#ebd9ff'
                }
              }}
            >
              <Box>
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: '10px',
                    bgcolor: feat.bg,
                    color: feat.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1.5
                  }}
                >
                  {feat.icon}
                </Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#111827', fontSize: 13.5, mb: 0.5 }}>
                  {feat.title}
                </Typography>
                <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11.5, lineHeight: 1.4, display: 'block' }}>
                  {feat.desc}
                </Typography>
              </Box>
              <Box sx={{ mt: 1.5, display: 'flex', justifyContent: 'flex-end' }}>
                <RightOutlined style={{ fontSize: 12, color: feat.color }} />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Middle Workspace Tabs */}
      <Card
        sx={{
          borderRadius: '16px',
          border: '1px solid #F3F4F6',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          bgcolor: '#FFF',
          mb: 3
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(e, v) => setActiveTab(v)}
          sx={{
            px: 2,
            borderBottom: '1px solid #F3F4F6',
            '& .MuiTabs-indicator': { bgcolor: '#530EF0', height: 3 },
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
          <Tab label="Resume OCR" />
          <Tab label="AI Suggestions" />
          <Tab label="Candidate Matching" />
          <Tab label="Job Description" />
          <Tab label="Smart Search" />
        </Tabs>
      </Card>

      {/* 3-Panel Main Workspace */}
      <Grid container spacing={2.5} alignItems="flex-start">
        {/* Left Panel: Upload Zone & Recent Uploads (width: 3.2/12) */}
        <Grid size={{ xs: 12, lg: 3.2 }}>
          <Stack spacing={2.5}>
            {/* Drag & Drop Upload Zone */}
            <Card
              sx={{
                p: 3,
                borderRadius: '16px',
                border: '2px dashed #D8B4FE',
                bgcolor: '#FAF5FF',
                textAlign: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
              }}
            >
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  bgcolor: '#FFF',
                  color: '#530EF0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                  boxShadow: '0 2px 8px rgba(83, 14, 240, 0.15)'
                }}
              >
                <CloudUploadOutlined style={{ fontSize: 26 }} />
              </Box>

              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#111827', fontSize: 13.5, mb: 0.5 }}>
                Drag & drop resumes or documents here
              </Typography>
              <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12, display: 'block', mb: 1 }}>
                or click to upload
              </Typography>
              <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11, display: 'block', mb: 2 }}>
                Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10 MB)
              </Typography>

              <Button
                variant="contained"
                onClick={handleUploadClick}
                disabled={isProcessing}
                startIcon={isProcessing ? <CircularProgress size={16} sx={{ color: '#FFF' }} /> : null}
                sx={{
                  bgcolor: '#530EF0',
                  color: '#FFF',
                  fontWeight: 600,
                  fontSize: 13,
                  textTransform: 'none',
                  borderRadius: '8px',
                  px: 2.5,
                  py: 0.8,
                  boxShadow: '0 4px 12px rgba(83, 14, 240, 0.25)',
                  '&:hover': { bgcolor: '#430bc2' }
                }}
              >
                {isProcessing ? 'Processing OCR...' : 'Upload Files'}
              </Button>
            </Card>

            {/* Recent Uploads List */}
            <Card
              sx={{
                p: 2.5,
                borderRadius: '16px',
                border: '1px solid #F3F4F6',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                bgcolor: '#FFF'
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                <Typography variant="h3" sx={{ fontWeight: 600, color: '#111827', fontSize: 16 }}>
                  Recent Uploads
                </Typography>
                <Typography variant="caption" sx={{ color: '#530EF0', fontWeight: 600, cursor: 'pointer' }}>
                  View all →
                </Typography>
              </Stack>

              <Stack spacing={1.5}>
                {uploads.map((up) => {
                  const isSelected = selectedUpload === up.name;
                  return (
                    <Box
                      key={up.id}
                      onClick={() => setSelectedUpload(up.name)}
                      sx={{
                        p: 1.2,
                        borderRadius: '10px',
                        border: isSelected ? '1px solid #C084FC' : '1px solid #F3F4F6',
                        bgcolor: isSelected ? 'rgba(83, 14, 240, 0.04)' : '#FFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        '&:hover': { bgcolor: 'rgba(83, 14, 240, 0.06)' }
                      }}
                    >
                      <Stack direction="row" spacing={1.2} alignItems="center" sx={{ maxWidth: '82%' }}>
                        {up.type === 'pdf' && <FilePdfOutlined style={{ fontSize: 24, color: '#EF4444' }} />}
                        {up.type === 'doc' && <FileWordOutlined style={{ fontSize: 24, color: '#2563EB' }} />}
                        {up.type === 'img' && <FileImageOutlined style={{ fontSize: 24, color: '#F59E0B' }} />}
                        <Box sx={{ overflow: 'hidden' }}>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 600, color: '#111827', fontSize: 12.5 }}
                            noWrap
                          >
                            {up.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11, display: 'block' }}>
                            {up.size} • {up.status} • {up.time}
                          </Typography>
                        </Box>
                      </Stack>

                      {up.status === 'Parsed' && <CheckCircleFilled style={{ color: '#10B981', fontSize: 16 }} />}
                      {up.status === 'Processing' && <CircularProgress size={16} sx={{ color: '#3B82F6' }} />}
                      {up.status === 'Failed' && <CloseCircleFilled style={{ color: '#EF4444', fontSize: 16 }} />}
                    </Box>
                  );
                })}
              </Stack>
            </Card>
          </Stack>
        </Grid>

        {/* Center Panel: Parsed Document Viewer + Extracted Info (width: 5.6/12) */}
        <Grid size={{ xs: 12, lg: 5.6 }}>
          <Card
            sx={{
              borderRadius: '16px',
              border: '1px solid #F3F4F6',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              bgcolor: '#FFF',
              overflow: 'hidden'
            }}
          >
            {/* Viewer Control Bar */}
            <Box
              sx={{
                p: 1.5,
                px: 2,
                bgcolor: '#1E293B',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 13 }}>
                {selectedUpload}
              </Typography>

              <Stack direction="row" spacing={1.5} alignItems="center">
                <Typography variant="caption" sx={{ color: '#94A3B8', fontSize: 12 }}>
                  1 / 2
                </Typography>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <IconButton
                    size="small"
                    sx={{ color: '#FFF' }}
                    onClick={() => setZoomLevel((z) => Math.max(70, z - 10))}
                  >
                    <ZoomOutOutlined style={{ fontSize: 13 }} />
                  </IconButton>
                  <Typography variant="caption" sx={{ color: '#CBD5E1', fontSize: 12 }}>
                    {zoomLevel}%
                  </Typography>
                  <IconButton
                    size="small"
                    sx={{ color: '#FFF' }}
                    onClick={() => setZoomLevel((z) => Math.min(150, z + 10))}
                  >
                    <ZoomInOutlined style={{ fontSize: 13 }} />
                  </IconButton>
                </Stack>
                <IconButton
                  size="small"
                  sx={{ color: '#FFF' }}
                  onClick={() => setSnackbar({ open: true, message: `Downloading parsed AI resume analysis report for ${selectedUpload}...`, severity: 'success' })}
                >
                  <DownloadOutlined style={{ fontSize: 14 }} />
                </IconButton>
              </Stack>
            </Box>

            {/* Split View: Rendered Resume on Left, Extracted Fields on Right */}
            <Grid container>
              {/* Document Sheet */}
              <Grid size={{ xs: 12, md: 6.5 }}
                sx={{
                  p: 2.5,
                  bgcolor: '#FAFAFB',
                  borderRight: { md: '1px solid #F3F4F6' },
                  maxHeight: 620,
                  overflowY: 'auto'
                }}
              >
                <Box
                  sx={{
                    bgcolor: '#FFF',
                    p: 2.5,
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    border: '1px solid #E5E7EB'
                  }}
                >
                  {/* Candidate Header */}
                  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                    <Avatar src={avatar1} sx={{ width: 44, height: 44 }} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827', fontSize: 14 }}>
                        Priya Sharma
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6B7280', fontWeight: 500, fontSize: 12 }}>
                        Software Engineer
                      </Typography>
                    </Box>
                  </Stack>

                  <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11, display: 'block', mb: 1.5 }}>
                    priya.sharma@email.com • +91 98765 43210
                    <br />
                    linkedin.com/in/priya-sharma
                  </Typography>

                  {/* Summary */}
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Summary
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#4B5563', fontSize: 11.5, lineHeight: 1.5, my: 0.8 }}>
                    Results-driven Software Engineer with 2+ years of experience in building scalable web applications using React, Node.js and cloud technologies. Passionate about clean code and great user experiences.
                  </Typography>

                  {/* Experience */}
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', mt: 1.5 }}>
                    Experience
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: 12, mt: 0.5 }}>
                    Software Engineer • TechSolutions Pvt. Ltd.
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11, display: 'block', mb: 0.5 }}>
                    Jun 2023 - Present
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#4B5563', fontSize: 11, lineHeight: 1.5 }}>
                    • Developed and maintained web applications using React and Node.js
                    <br />
                    • Worked with REST APIs and microservices
                    <br />• Collaborated with cross-functional teams
                  </Typography>

                  {/* Education */}
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', mt: 1.5 }}>
                    Education
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: 12, mt: 0.5 }}>
                    B.E. Computer Science • Anna University, Chennai
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11, display: 'block', mb: 0.5 }}>
                    2019 - 2023
                  </Typography>

                  {/* Skills */}
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', mt: 1.5 }}>
                    Skills
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                    {['React', 'Node.js', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'REST APIs', 'Git', 'Docker', 'AWS', 'MongoDB'].map((s) => (
                      <Chip
                        key={s}
                        label={s}
                        size="small"
                        sx={{ fontSize: 11, height: 20, bgcolor: '#F3F4F6', color: '#374151' }}
                      />
                    ))}
                  </Box>
                </Box>
              </Grid>

              {/* Extracted Information Panel */}
              <Grid size={{ xs: 12, md: 5.5 }} sx={{ p: 2.5, maxHeight: 620, overflowY: 'auto' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#111827', fontSize: 13.5 }}>
                    Extracted Information
                  </Typography>
                  <Button
                    size="small"
                    onClick={() => setOpenEditDialog(true)}
                    sx={{ color: '#530EF0', fontWeight: 600, fontSize: 11.5, textTransform: 'none', p: 0 }}
                  >
                    Edit
                  </Button>
                </Stack>

                <Stack spacing={1.2}>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11 }}>
                      Full Name
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: 12.5 }}>
                      {extractedInfo.name}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11 }}>
                      Email
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#530EF0', fontSize: 12.5 }}>
                      {extractedInfo.email}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11 }}>
                      Phone
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#374151', fontSize: 12.5 }}>
                      {extractedInfo.phone}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11 }}>
                      Location
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#374151', fontSize: 12.5 }}>
                      {extractedInfo.location}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11 }}>
                      Current Role
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: 12.5 }}>
                      {extractedInfo.role}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11 }}>
                      Total Experience
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#374151', fontSize: 12.5 }}>
                      {extractedInfo.exp}
                    </Typography>
                  </Box>

                  {/* Education */}
                  <Box sx={{ pt: 1, borderTop: '1px solid #F3F4F6' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#374151' }}>
                        Education
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#530EF0', fontWeight: 600, cursor: 'pointer' }}>
                        + Add
                      </Typography>
                    </Stack>
                    <Box sx={{ mt: 0.5, p: 1, bgcolor: '#F9FAFB', borderRadius: '6px' }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: 12 }}>
                        B.E. Computer Science
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11, display: 'block' }}>
                        Anna University, Chennai (2019 - 2023)
                      </Typography>
                    </Box>
                  </Box>

                  {/* Key Skills */}
                  <Box sx={{ pt: 1, borderTop: '1px solid #F3F4F6' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#374151' }}>
                        Key Skills (8 found)
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#530EF0', fontWeight: 600, cursor: 'pointer' }}>
                        + Add
                      </Typography>
                    </Stack>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.8 }}>
                      {['React', 'Node.js', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'REST APIs', 'Git'].map((sk) => (
                        <Chip
                          key={sk}
                          label={sk}
                          size="small"
                          sx={{
                            bgcolor: 'rgba(83, 14, 240, 0.06)',
                            color: '#530EF0',
                            fontWeight: 600,
                            fontSize: 11,
                            height: 22,
                            borderRadius: '4px'
                          }}
                        />
                      ))}
                    </Box>
                  </Box>

                  {/* Certifications */}
                  <Box sx={{ pt: 1, borderTop: '1px solid #F3F4F6' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#374151' }}>
                        Certifications (1 found)
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#530EF0', fontWeight: 600, cursor: 'pointer' }}>
                        + Add
                      </Typography>
                    </Stack>
                    <Box sx={{ mt: 0.5, p: 1, bgcolor: '#F9FAFB', borderRadius: '6px' }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: 12 }}>
                        AWS Certified Developer
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11, display: 'block' }}>
                        Amazon Web Services
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        {/* Right Panel: AI Insights & Job Match Analysis (width: 3.2/12) */}
        <Grid size={{ xs: 12, lg: 3.2 }}>
          <Stack spacing={2.5}>
            {/* AI Insights & Suggestions */}
            <Card
              sx={{
                p: 2.5,
                borderRadius: '16px',
                border: '1px solid #F3F4F6',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                bgcolor: '#FFF'
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                <ThunderboltOutlined style={{ color: '#530EF0', fontSize: 16 }} />
                <Typography variant="h3" sx={{ fontWeight: 600, color: '#111827', fontSize: 16 }}>
                  AI Insights & Suggestions
                </Typography>
              </Stack>

              <Stack spacing={1.2}>
                <Stack direction="row" spacing={1} alignItems="flex-start">
                  <CheckCircleFilled style={{ color: '#10B981', fontSize: 14, marginTop: 3 }} />
                  <Typography variant="caption" sx={{ color: '#374151', fontSize: 12, lineHeight: 1.4 }}>
                    Good match for Software Engineer roles
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="flex-start">
                  <InfoCircleFilled style={{ color: '#3B82F6', fontSize: 14, marginTop: 3 }} />
                  <Typography variant="caption" sx={{ color: '#374151', fontSize: 12, lineHeight: 1.4 }}>
                    2 relevant projects found in resume
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="flex-start">
                  <InfoCircleFilled style={{ color: '#3B82F6', fontSize: 14, marginTop: 3 }} />
                  <Typography variant="caption" sx={{ color: '#374151', fontSize: 12, lineHeight: 1.4 }}>
                    Consider adding more details about cloud experience (AWS, Azure)
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="flex-start">
                  <WarningFilled style={{ color: '#F59E0B', fontSize: 14, marginTop: 3 }} />
                  <Typography variant="caption" sx={{ color: '#374151', fontSize: 12, lineHeight: 1.4 }}>
                    Missing salary expectation
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="flex-start">
                  <InfoCircleFilled style={{ color: '#3B82F6', fontSize: 14, marginTop: 3 }} />
                  <Typography variant="caption" sx={{ color: '#374151', fontSize: 12, lineHeight: 1.4 }}>
                    Resume is well structured and clear
                  </Typography>
                </Stack>
              </Stack>
            </Card>

            {/* Job Match Analysis */}
            <Card
              sx={{
                p: 2.5,
                borderRadius: '16px',
                border: '1px solid #F3F4F6',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                bgcolor: '#FFF'
              }}
            >
              <Typography variant="h3" sx={{ fontWeight: 600, color: '#111827', fontSize: 16, mb: 1.5 }}>
                Job Match Analysis
              </Typography>

              {/* Match Gauge */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <Box sx={{ position: 'relative', width: 90, height: 90 }}>
                  <svg viewBox="0 0 100 100" width="90" height="90">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F3F4F6" strokeWidth="10" />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#10B981"
                      strokeWidth="10"
                      strokeDasharray="251.2"
                      strokeDashoffset="20"
                      strokeLinecap="round"
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
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#111827', fontSize: 14 }}>
                      92%
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#6B7280', fontSize: '0.62rem' }}>
                      Match
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Progress Bars */}
              <Stack spacing={1.2}>
                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.3 }}>
                    <Typography variant="caption" sx={{ color: '#4B5563', fontSize: 11.5 }}>
                      Skills Match
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#111827', fontSize: 11.5 }}>
                      95%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={95}
                    sx={{ height: 6, borderRadius: 3, bgcolor: '#F3F4F6', '& .MuiLinearProgress-bar': { bgcolor: '#10B981' } }}
                  />
                </Box>

                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.3 }}>
                    <Typography variant="caption" sx={{ color: '#4B5563', fontSize: 11.5 }}>
                      Experience
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#111827', fontSize: 11.5 }}>
                      88%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={88}
                    sx={{ height: 6, borderRadius: 3, bgcolor: '#F3F4F6', '& .MuiLinearProgress-bar': { bgcolor: '#0D9488' } }}
                  />
                </Box>

                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.3 }}>
                    <Typography variant="caption" sx={{ color: '#4B5563', fontSize: 11.5 }}>
                      Education
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#111827', fontSize: 11.5 }}>
                      90%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={90}
                    sx={{ height: 6, borderRadius: 3, bgcolor: '#F3F4F6', '& .MuiLinearProgress-bar': { bgcolor: '#3B82F6' } }}
                  />
                </Box>

                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.3 }}>
                    <Typography variant="caption" sx={{ color: '#4B5563', fontSize: 11.5 }}>
                      Other Factors
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#111827', fontSize: 11.5 }}>
                      85%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={85}
                    sx={{ height: 6, borderRadius: 3, bgcolor: '#F3F4F6', '& .MuiLinearProgress-bar': { bgcolor: '#F97316' } }}
                  />
                </Box>
              </Stack>

              {/* Matched Skills */}
              <Box sx={{ mt: 2, pt: 1.5, borderTop: '1px solid #F3F4F6' }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#374151', fontSize: 11.5, display: 'block', mb: 0.8 }}>
                  Matched Skills (8/10)
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {['React', 'Node.js', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'REST APIs', 'Git'].map((s) => (
                    <Chip
                      key={s}
                      label={s}
                      size="small"
                      icon={<CheckCircleFilled style={{ color: '#10B981', fontSize: 11 }} />}
                      sx={{ fontSize: 11, height: 20, bgcolor: 'rgba(16, 185, 129, 0.08)', color: '#065F46' }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Missing / Partial Skills */}
              <Box sx={{ mt: 1.5 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#374151', fontSize: 11.5, display: 'block', mb: 0.8 }}>
                  Missing / Partial Skills (2)
                </Typography>
                <Stack direction="row" spacing={0.8}>
                  <Chip
                    label="AWS (Missing)"
                    size="small"
                    sx={{ fontSize: 11, height: 20, bgcolor: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', fontWeight: 600 }}
                  />
                  <Chip
                    label="Docker (Partial)"
                    size="small"
                    sx={{ fontSize: 11, height: 20, bgcolor: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B', fontWeight: 600 }}
                  />
                </Stack>
              </Box>
            </Card>

            {/* Similar Candidates List */}
            <Card
              sx={{
                p: 2.5,
                borderRadius: '16px',
                border: '1px solid #F3F4F6',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                bgcolor: '#FFF'
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                <Typography variant="h3" sx={{ fontWeight: 600, color: '#111827', fontSize: 16 }}>
                  Similar Candidates
                </Typography>
                <Typography variant="caption" sx={{ color: '#530EF0', fontWeight: 600, cursor: 'pointer' }}>
                  View all →
                </Typography>
              </Stack>

              <Stack spacing={1.5}>
                {[
                  { name: 'Sneha Iyer', match: '88%', exp: '2+ yrs', loc: 'Bengaluru', avatar: avatar3 },
                  { name: 'Vikram Singh', match: '86%', exp: '3+ yrs', loc: 'Chennai', avatar: avatar5 },
                  { name: 'Arjun Nair', match: '82%', exp: '4+ yrs', loc: 'Bengaluru', avatar: avatar4 }
                ].map((cand, idx) => (
                  <Stack key={idx} direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Avatar src={cand.avatar} sx={{ width: 32, height: 32 }} />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: 12.5 }}>
                          {cand.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11 }}>
                          {cand.match} match • {cand.exp} • {cand.loc}
                        </Typography>
                      </Box>
                    </Stack>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => navigate('/hr/candidates')}
                      sx={{
                        fontSize: 11,
                        py: 0.2,
                        px: 1,
                        borderRadius: '6px',
                        borderColor: '#E5E7EB',
                        color: '#374151',
                        textTransform: 'none'
                      }}
                    >
                      View
                    </Button>
                  </Stack>
                ))}
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      {/* Edit Extracted Info Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Edit Extracted Information</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              fullWidth
              size="small"
              label="Full Name"
              value={extractedInfo.name}
              onChange={(e) => setExtractedInfo({ ...extractedInfo, name: e.target.value })}
            />
            <TextField
              fullWidth
              size="small"
              label="Email"
              value={extractedInfo.email}
              onChange={(e) => setExtractedInfo({ ...extractedInfo, email: e.target.value })}
            />
            <TextField
              fullWidth
              size="small"
              label="Phone"
              value={extractedInfo.phone}
              onChange={(e) => setExtractedInfo({ ...extractedInfo, phone: e.target.value })}
            />
            <TextField
              fullWidth
              size="small"
              label="Location"
              value={extractedInfo.location}
              onChange={(e) => setExtractedInfo({ ...extractedInfo, location: e.target.value })}
            />
            <TextField
              fullWidth
              size="small"
              label="Current Role"
              value={extractedInfo.role}
              onChange={(e) => setExtractedInfo({ ...extractedInfo, role: e.target.value })}
            />
            <TextField
              fullWidth
              size="small"
              label="Total Experience"
              value={extractedInfo.exp}
              onChange={(e) => setExtractedInfo({ ...extractedInfo, exp: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setOpenEditDialog(false)} sx={{ textTransform: 'none', color: '#6B7280' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setOpenEditDialog(false);
              setSnackbar({ open: true, message: 'Extracted information updated!', severity: 'success' });
            }}
            sx={{ bgcolor: '#530EF0', textTransform: 'none', fontWeight: 600 }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
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

