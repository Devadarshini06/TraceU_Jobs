import React, { useState } from 'react';
import PropTypes from 'prop-types';

// material-ui
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import LinearProgress from '@mui/material/LinearProgress';

// icons
import UserOutlined from '@ant-design/icons/UserOutlined';
import BookOutlined from '@ant-design/icons/BookOutlined';
import BankOutlined from '@ant-design/icons/BankOutlined';
import ThunderboltOutlined from '@ant-design/icons/ThunderboltOutlined';
import FilePdfOutlined from '@ant-design/icons/FilePdfOutlined';
import CompassOutlined from '@ant-design/icons/CompassOutlined';
import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined';
import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import UploadOutlined from '@ant-design/icons/UploadOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import SafetyCertificateOutlined from '@ant-design/icons/SafetyCertificateOutlined';
import MailOutlined from '@ant-design/icons/MailOutlined';
import PhoneOutlined from '@ant-design/icons/PhoneOutlined';
import GlobalOutlined from '@ant-design/icons/GlobalOutlined';
import LinkedinFilled from '@ant-design/icons/LinkedinFilled';
import { validateName, validateEmail, validateMobile, validateRequired } from 'utils/formValidation';

const STEPS = [
  'Personal Info',
  'Education',
  'Experience',
  'Skills',
  'Resume & Docs',
  'Preferences',
  'Questions',
  'Review & Submit'
];

export default function CandidateJobApplicationDialog({ open, onClose, job, onApplySuccess }) {
  const [activeStep, setActiveStep] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');

  // 1. Personal Information - blank defaults with clear placeholders
  const [personal, setPersonal] = useState({
    fullName: '',
    email: '',
    mobile: '',
    location: '',
    linkedin: '',
    portfolio: ''
  });

  // 2. Education - blank defaults with clear placeholders
  const [education, setEducation] = useState({
    qualification: '',
    degree: '',
    specialization: '',
    college: '',
    gradYear: '',
    cgpa: ''
  });

  // 3. Work Experience - blank defaults with clear placeholders
  const [expType, setExpType] = useState('Experienced'); // 'Experienced' | 'Fresher'
  const [experience, setExperience] = useState({
    company: '',
    jobTitle: '',
    years: '',
    months: '',
    startDate: '',
    endDate: '',
    currentCtc: '',
    expectedCtc: '',
    noticePeriod: ''
  });
  const [fresherInfo, setFresherInfo] = useState({
    academicProjects: '',
    expectedCtc: '',
    joiningAvailability: ''
  });

  // 4. Skills - clean empty lists for candidate to populate
  const [skills, setSkills] = useState({
    technical: [],
    soft: [],
    tools: [],
    certifications: [],
    primaryExpYears: ''
  });
  const [newSkillInput, setNewSkillInput] = useState('');
  const [skillCategory, setSkillCategory] = useState('technical');

  // 5. Resume & Documents - starts null with placeholder upload zone
  const [resumeFile, setResumeFile] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [portfolioDoc, setPortfolioDoc] = useState('');
  const [certificates, setCertificates] = useState([]);

  // 6. Job Preferences - blank defaults with clear dropdown selections
  const [preferences, setPreferences] = useState({
    preferredLocation: '',
    workMode: '',
    employmentType: '',
    relocation: '',
    availability: ''
  });

  // 7. Additional Questions (HR-Configurable) - blank defaults
  const [questions, setQuestions] = useState({
    q1Reason: '',
    q2Architecture: '',
    q3OnCall: '',
    q4Authorization: ''
  });

  // 8. Review & Consent - candidate must actively review and check
  const [declarationChecked, setDeclarationChecked] = useState(false);
  const [privacyConsentChecked, setPrivacyConsentChecked] = useState(false);

  // Add a skill chip
  const handleAddSkill = () => {
    if (!newSkillInput.trim()) return;
    const val = newSkillInput.trim();
    if (skillCategory === 'technical') {
      if (!skills.technical.includes(val)) setSkills({ ...skills, technical: [...skills.technical, val] });
    } else if (skillCategory === 'soft') {
      if (!skills.soft.includes(val)) setSkills({ ...skills, soft: [...skills.soft, val] });
    } else if (skillCategory === 'tools') {
      if (!skills.tools.includes(val)) setSkills({ ...skills, tools: [...skills.tools, val] });
    } else if (skillCategory === 'certifications') {
      if (!skills.certifications.includes(val)) setSkills({ ...skills, certifications: [...skills.certifications, val] });
    }
    setNewSkillInput('');
  };

  const handleRemoveSkill = (category, item) => {
    setSkills({
      ...skills,
      [category]: skills[category].filter((x) => x !== item)
    });
  };

  // File upload handler
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadedAt: 'Just now'
      });
      setValidationErrors((prev) => ({ ...prev, resume: '' }));
    }
  };

  // Validate current step
  const validateStep = (step) => {
    const errs = {};
    if (step === 0) {
      const nameErr = validateName(personal.fullName, 'Full Name', 5);
      const emailErr = validateEmail(personal.email, 'Email address');
      const mobileErr = validateMobile(personal.mobile, 'Mobile number');
      const locErr = validateRequired(personal.location, 'Current Location', 2);

      if (nameErr) errs.fullName = nameErr;
      if (emailErr) errs.email = emailErr;
      if (mobileErr) errs.mobile = mobileErr;
      if (locErr) errs.location = locErr;
    } else if (step === 1) {
      if (!education.qualification) errs.qualification = 'Qualification is missing. Please select one.';
      if (!education.degree.trim()) errs.degree = 'Degree is missing. Please enter your degree.';
      if (!education.college.trim()) errs.college = 'College/University name is missing.';
      if (!education.gradYear.trim()) errs.gradYear = 'Graduation Year is missing.';
      if (!education.cgpa.trim()) errs.cgpa = 'CGPA / Percentage is missing.';
    } else if (step === 2) {
      if (expType === 'Experienced') {
        if (!experience.company.trim()) errs.company = 'Company Name is missing.';
        if (!experience.jobTitle.trim()) errs.jobTitle = 'Job Title is missing.';
        if (!experience.years.trim()) errs.years = 'Total experience duration is missing.';
        if (!experience.expectedCtc.trim()) errs.expectedCtc = 'Expected CTC is missing.';
      } else {
        if (!fresherInfo.academicProjects.trim()) errs.academicProjects = 'Academic projects details are missing.';
        if (!fresherInfo.expectedCtc.trim()) errs.expectedCtc = 'Expected CTC is missing.';
      }
    } else if (step === 3) {
      if (!skills.technical || skills.technical.length === 0) {
        errs.skills = 'Please add at least one technical skill to showcase your core competencies.';
      }
    } else if (step === 4) {
      if (!resumeFile) errs.resume = 'Resume is missing. Mandatory PDF or DOCX file upload is required.';
    } else if (step === 5) {
      if (!preferences.preferredLocation.trim()) errs.preferredLocation = 'Preferred location is missing.';
      if (!preferences.workMode) errs.workMode = 'Work mode selection is missing.';
      if (!preferences.employmentType) errs.employmentType = 'Employment type selection is missing.';
      if (!preferences.availability) errs.availability = 'Notice period / availability is missing.';
    } else if (step === 7) {
      if (!declarationChecked) errs.declaration = 'Information accuracy declaration is missing. Please confirm the declaration.';
      if (!privacyConsentChecked) errs.privacy = 'Privacy consent is missing. Please accept the privacy consent to submit.';
    }

    setValidationErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const handleBack = () => {
    setValidationErrors({});
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmitApplication = () => {
    if (!validateStep(7)) return;

    const newAppId = `APP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setApplicationId(newAppId);

    // Save into localStorage
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = window.localStorage.getItem('traceu_applied_jobs');
        const appliedList = stored ? JSON.parse(stored) : [];
        if (job?.id && !appliedList.includes(job.id)) {
          appliedList.push(job.id);
          window.localStorage.setItem('traceu_applied_jobs', JSON.stringify(appliedList));
        }
      }
    } catch (e) {
      console.warn('Could not save application to storage:', e);
    }

    setIsSubmitted(true);
    if (onApplySuccess) {
      onApplySuccess(newAppId, job);
    }
  };

  const handleModalClose = () => {
    setIsSubmitted(false);
    setActiveStep(0);
    setValidationErrors({});
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleModalClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '20px',
          bgcolor: '#FFFFFF',
          boxShadow: '0 25px 60px rgba(83, 14, 240, 0.16)',
          overflow: 'hidden'
        }
      }}
    >
      {/* Dialog Header */}
      <DialogTitle
        sx={{
          p: { xs: 2.5, sm: 3 },
          pb: 2,
          bgcolor: '#FAF5FF',
          borderBottom: '1px solid #EDE9FE',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
            <Chip
              label="Job Application Form"
              size="small"
              sx={{ bgcolor: '#530EF0', color: '#FFF', fontWeight: 700, fontSize: 11, height: 22 }}
            />
            {job?.id && (
              <Typography variant="caption" sx={{ color: '#6B7280', fontWeight: 600 }}>
                Job ID: {job.id}
              </Typography>
            )}
          </Stack>
          <Typography variant="h4" sx={{ fontWeight: 800, fontSize: { xs: 18, sm: 20 }, color: '#111827' }}>
            Apply for {job?.title || 'Open Position'}
          </Typography>
          <Typography sx={{ fontSize: 12.5, color: '#6B7280' }}>
            🏢 {job?.company || 'Hiring Organization'} • 📍 {job?.location || 'India / Remote'} • 💼{' '}
            {job?.experience || 'Experience as required'}
          </Typography>
        </Box>

        <IconButton onClick={handleModalClose} size="small" sx={{ color: '#6B7280', bgcolor: '#FFF' }}>
          <CloseOutlined style={{ fontSize: 13 }} />
        </IconButton>
      </DialogTitle>

      {/* Progress Bar & Stepper Indicator */}
      {!isSubmitted && (
        <Box sx={{ bgcolor: '#FFF', px: { xs: 2, sm: 3 }, pt: 2, pb: 1, borderBottom: '1px solid #F1F5F9' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
            <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#530EF0' }}>
              Step {activeStep + 1} of {STEPS.length}: {STEPS[activeStep]}
            </Typography>
            <Typography sx={{ fontWeight: 600, fontSize: 12, color: '#64748B' }}>
              {Math.round(((activeStep + 1) / STEPS.length) * 100)}% Completed
            </Typography>
          </Stack>

          <LinearProgress
            variant="determinate"
            value={((activeStep + 1) / STEPS.length) * 100}
            sx={{
              height: 6,
              borderRadius: 3,
              bgcolor: '#F3EDFF',
              '& .MuiLinearProgress-bar': {
                bgcolor: '#530EF0',
                borderRadius: 3
              }
            }}
          />

          {/* Stepper Indicator for Large Screens */}
          <Box sx={{ display: { xs: 'none', md: 'block' }, mt: 2 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {STEPS.map((label, idx) => (
                <Step key={label} completed={idx < activeStep}>
                  <StepLabel
                    sx={{
                      '& .MuiStepLabel-label': {
                        fontSize: 11,
                        fontWeight: idx === activeStep ? 700 : 500,
                        color: idx === activeStep ? '#530EF0' : '#64748B'
                      },
                      '& .Mui-completed': {
                        color: '#10B981 !important'
                      },
                      '& .Mui-active': {
                        color: '#530EF0 !important'
                      }
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Box>
      )}

      {/* Main Content Body */}
      <DialogContent sx={{ p: { xs: 2.5, sm: 3.5 }, minHeight: 380 }}>
        {/* Validation Alert when required fields are missing */}
        {!isSubmitted && Object.keys(validationErrors).length > 0 && (
          <Alert severity="error" sx={{ mb: 2.5, borderRadius: '10px', fontSize: 13, fontWeight: 600 }}>
            Required detail is missing: {Object.values(validationErrors)[0]}
          </Alert>
        )}
        {/* ========================================================================= */}
        {/* SUCCESS SUBMITTED SCREEN                                                  */}
        {/* ========================================================================= */}
        {isSubmitted ? (
          <Box sx={{ textAlign: 'center', py: 4, px: 2 }}>
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                bgcolor: '#ECFDF5',
                color: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 36,
                mx: 'auto',
                mb: 2.5,
                boxShadow: '0 8px 24px rgba(16, 185, 129, 0.2)'
              }}
            >
              <CheckCircleFilled />
            </Box>

            <Typography variant="h3" sx={{ fontWeight: 800, color: '#111827', mb: 1 }}>
              Application Submitted Successfully!
            </Typography>

            <Typography sx={{ color: '#4B5563', fontSize: 14, maxWidth: 520, mx: 'auto', mb: 3 }}>
              Your profile, resume, and screening answers have been submitted to{' '}
              <strong>{job?.company || 'the hiring team'}</strong>.
            </Typography>

            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: '12px',
                bgcolor: '#FAF5FF',
                border: '1px solid #EDE9FE',
                maxWidth: 440,
                mx: 'auto',
                mb: 4,
                textAlign: 'left'
              }}
            >
              <Stack spacing={1.2}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12 }}>
                    Application ID:
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: '#530EF0', fontSize: 12.5 }}>
                    {applicationId}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12 }}>
                    Position:
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#111827', fontSize: 12 }}>
                    {job?.title || 'Open Position'}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12 }}>
                    Status:
                  </Typography>
                  <Chip
                    label="Under Review"
                    size="small"
                    sx={{ bgcolor: '#FEF3C7', color: '#B45309', fontWeight: 700, fontSize: 10.5, height: 20 }}
                  />
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12 }}>
                    Expected Review Time:
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: '#059669', fontSize: 12 }}>
                    2 - 4 Business Days
                  </Typography>
                </Stack>
              </Stack>
            </Paper>

            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="contained"
                onClick={handleModalClose}
                sx={{
                  bgcolor: '#530EF0',
                  color: '#FFF',
                  fontWeight: 700,
                  px: 4,
                  py: 1.25,
                  borderRadius: '10px',
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#430bc2' }
                }}
              >
                Close &amp; Return to Dashboard
              </Button>
            </Stack>
          </Box>
        ) : (
          <>
            {/* ========================================================================= */}
            {/* STEP 0: PERSONAL INFORMATION                                              */}
            {/* ========================================================================= */}
            {activeStep === 0 && (
              <Stack spacing={2.5}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#111827', mb: 0.5 }}>
                    1. Personal Information
                  </Typography>
                  <Typography sx={{ fontSize: 12.5, color: '#6B7280' }}>
                    Enter your contact details so the employer and recruiting coordinator can reach you directly.
                  </Typography>
                </Box>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Full Name *"
                      placeholder="Enter your full name"
                      value={personal.fullName}
                      onChange={(e) => setPersonal({ ...personal, fullName: e.target.value })}
                      error={Boolean(validationErrors.fullName)}
                      helperText={validationErrors.fullName}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Email Address *"
                      placeholder="Enter your email address"
                      value={personal.email}
                      onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
                      error={Boolean(validationErrors.email)}
                      helperText={validationErrors.email}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MailOutlined style={{ color: '#9CA3AF', fontSize: 13 }} />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Mobile Number *"
                      placeholder="Enter 10-digit mobile number (e.g. +91 98765 43210)"
                      value={personal.mobile}
                      onChange={(e) => setPersonal({ ...personal, mobile: e.target.value })}
                      error={Boolean(validationErrors.mobile)}
                      helperText={validationErrors.mobile}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneOutlined style={{ color: '#9CA3AF', fontSize: 13 }} />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Current Location *"
                      placeholder="Enter current city, state (e.g. Bengaluru, Karnataka)"
                      value={personal.location}
                      onChange={(e) => setPersonal({ ...personal, location: e.target.value })}
                      error={Boolean(validationErrors.location)}
                      helperText={validationErrors.location}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="LinkedIn Profile URL"
                      placeholder="https://linkedin.com/in/your-profile"
                      value={personal.linkedin}
                      onChange={(e) => setPersonal({ ...personal, linkedin: e.target.value })}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LinkedinFilled style={{ color: '#0077B5', fontSize: 14 }} />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Portfolio / GitHub Website"
                      placeholder="https://yourportfolio.dev or GitHub link"
                      value={personal.portfolio}
                      onChange={(e) => setPersonal({ ...personal, portfolio: e.target.value })}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <GlobalOutlined style={{ color: '#9CA3AF', fontSize: 13 }} />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                </Grid>
              </Stack>
            )}

            {/* ========================================================================= */}
            {/* STEP 1: EDUCATION                                                         */}
            {/* ========================================================================= */}
            {activeStep === 1 && (
              <Stack spacing={2.5}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#111827', mb: 0.5 }}>
                    2. Education Background
                  </Typography>
                  <Typography sx={{ fontSize: 12.5, color: '#6B7280' }}>
                    Provide details on your highest academic qualification, degree, college, and grade score.
                  </Typography>
                </Box>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth size="small">
                      <FormLabel sx={{ fontSize: 12, fontWeight: 700, color: '#374151', mb: 0.5 }}>
                        Highest Qualification *
                      </FormLabel>
                      <Select
                        displayEmpty
                        value={education.qualification}
                        onChange={(e) => setEducation({ ...education, qualification: e.target.value })}
                        sx={{ borderRadius: '8px' }}
                      >
                        <MenuItem value="" disabled>
                          <Typography sx={{ color: '#9CA3AF', fontSize: 13 }}>Select qualification level</Typography>
                        </MenuItem>
                        <MenuItem value="Undergraduate">Undergraduate (B.E. / B.Tech / B.Sc / BCA)</MenuItem>
                        <MenuItem value="Postgraduate">Postgraduate (M.E. / M.Tech / MBA / MCA / M.Sc)</MenuItem>
                        <MenuItem value="Doctorate">Doctorate (Ph.D.)</MenuItem>
                        <MenuItem value="Diploma">Diploma / Polytechnic</MenuItem>
                        <MenuItem value="Higher Secondary">Higher Secondary (12th)</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Degree / Course *"
                      placeholder="Enter degree name (e.g. B.E. in Computer Science)"
                      value={education.degree}
                      onChange={(e) => setEducation({ ...education, degree: e.target.value })}
                      error={Boolean(validationErrors.degree)}
                      helperText={validationErrors.degree}
                      sx={{ mt: { xs: 0, sm: 2.8 } }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Specialization / Major"
                      placeholder="Enter specialization (e.g. Software Systems, Cloud Architecture)"
                      value={education.specialization}
                      onChange={(e) => setEducation({ ...education, specialization: e.target.value })}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="College / University Name *"
                      placeholder="Enter college or university name"
                      value={education.college}
                      onChange={(e) => setEducation({ ...education, college: e.target.value })}
                      error={Boolean(validationErrors.college)}
                      helperText={validationErrors.college}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Graduation Year *"
                      placeholder="Enter graduation year (e.g. 2025)"
                      value={education.gradYear}
                      onChange={(e) => setEducation({ ...education, gradYear: e.target.value })}
                      error={Boolean(validationErrors.gradYear)}
                      helperText={validationErrors.gradYear}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="CGPA / Percentage Score *"
                      placeholder="Enter score (e.g. 8.5 CGPA or 82%)"
                      value={education.cgpa}
                      onChange={(e) => setEducation({ ...education, cgpa: e.target.value })}
                    />
                  </Grid>
                </Grid>
              </Stack>
            )}

            {/* ========================================================================= */}
            {/* STEP 2: WORK EXPERIENCE                                                   */}
            {/* ========================================================================= */}
            {activeStep === 2 && (
              <Stack spacing={2.5}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#111827', mb: 0.5 }}>
                    3. Work Experience
                  </Typography>
                  <Typography sx={{ fontSize: 12.5, color: '#6B7280' }}>
                    Select your experience level and fill in your current compensation and notice period.
                  </Typography>
                </Box>

                {/* Fresher vs Experienced Selection */}
                <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <FormLabel sx={{ fontSize: 12, fontWeight: 700, color: '#1E293B', display: 'block', mb: 0.5 }}>
                    Experience Category *
                  </FormLabel>
                  <RadioGroup row value={expType} onChange={(e) => setExpType(e.target.value)}>
                    <FormControlLabel
                      value="Experienced"
                      control={<Radio size="small" sx={{ color: '#530EF0', '&.Mui-checked': { color: '#530EF0' } }} />}
                      label={<Typography sx={{ fontSize: 13, fontWeight: 600 }}>Experienced Professional</Typography>}
                    />
                    <FormControlLabel
                      value="Fresher"
                      control={<Radio size="small" sx={{ color: '#530EF0', '&.Mui-checked': { color: '#530EF0' } }} />}
                      label={<Typography sx={{ fontSize: 13, fontWeight: 600 }}>Fresher / Recent Graduate</Typography>}
                    />
                  </RadioGroup>
                </Box>

                {expType === 'Experienced' ? (
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Current / Most Recent Company *"
                        placeholder="Enter current or recent employer name"
                        value={experience.company}
                        onChange={(e) => setExperience({ ...experience, company: e.target.value })}
                        error={Boolean(validationErrors.company)}
                        helperText={validationErrors.company}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Job Title / Designation *"
                        placeholder="Enter job designation (e.g. Software Engineer)"
                        value={experience.jobTitle}
                        onChange={(e) => setExperience({ ...experience, jobTitle: e.target.value })}
                        error={Boolean(validationErrors.jobTitle)}
                        helperText={validationErrors.jobTitle}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Total Relevant Experience"
                        placeholder="e.g. 2 Years 6 Months"
                        value={experience.years}
                        onChange={(e) => setExperience({ ...experience, years: e.target.value })}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Employment Dates (From - To)"
                        placeholder="e.g. July 2023 - Present"
                        value={experience.startDate}
                        onChange={(e) => setExperience({ ...experience, startDate: e.target.value })}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Current CTC *"
                        placeholder="e.g. ₹ 8.5 LPA"
                        value={experience.currentCtc}
                        onChange={(e) => setExperience({ ...experience, currentCtc: e.target.value })}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Expected CTC *"
                        placeholder="e.g. ₹ 12.0 LPA"
                        value={experience.expectedCtc}
                        onChange={(e) => setExperience({ ...experience, expectedCtc: e.target.value })}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                      <FormControl fullWidth size="small">
                        <Select
                          displayEmpty
                          value={experience.noticePeriod}
                          onChange={(e) => setExperience({ ...experience, noticePeriod: e.target.value })}
                          sx={{ borderRadius: '8px' }}
                        >
                          <MenuItem value="" disabled>
                            <Typography sx={{ color: '#9CA3AF', fontSize: 13 }}>Select notice period</Typography>
                          </MenuItem>
                          <MenuItem value="Immediate">Immediate Joiner</MenuItem>
                          <MenuItem value="15 Days">15 Days</MenuItem>
                          <MenuItem value="30 Days">30 Days</MenuItem>
                          <MenuItem value="60 Days">60 Days</MenuItem>
                          <MenuItem value="90 Days">90 Days</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        size="small"
                        label="Academic Projects & Internship Experience"
                        placeholder="Briefly describe key academic projects, capstone, or internships..."
                        value={fresherInfo.academicProjects}
                        onChange={(e) => setFresherInfo({ ...fresherInfo, academicProjects: e.target.value })}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Expected Starting CTC"
                        placeholder="e.g. ₹ 6.0 LPA"
                        value={fresherInfo.expectedCtc}
                        onChange={(e) => setFresherInfo({ ...fresherInfo, expectedCtc: e.target.value })}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                      <FormControl fullWidth size="small">
                        <Select
                          displayEmpty
                          value={fresherInfo.joiningAvailability}
                          onChange={(e) => setFresherInfo({ ...fresherInfo, joiningAvailability: e.target.value })}
                          sx={{ borderRadius: '8px' }}
                        >
                          <MenuItem value="" disabled>
                            <Typography sx={{ color: '#9CA3AF', fontSize: 13 }}>Select availability</Typography>
                          </MenuItem>
                          <MenuItem value="Immediate">Available Immediately</MenuItem>
                          <MenuItem value="Within 15 Days">Within 15 Days</MenuItem>
                          <MenuItem value="Next Month">Next Month</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                )}
              </Stack>
            )}

            {/* ========================================================================= */}
            {/* STEP 3: SKILLS & CERTIFICATIONS                                           */}
            {/* ========================================================================= */}
            {activeStep === 3 && (
              <Stack spacing={2.5}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#111827', mb: 0.5 }}>
                    4. Skills, Tools &amp; Certifications
                  </Typography>
                  <Typography sx={{ fontSize: 12.5, color: '#6B7280' }}>
                    Highlight your technical strengths, design tools, soft skills, and industry certifications.
                  </Typography>
                </Box>

                {/* Add Skill Bar */}
                <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <Grid container spacing={1.5} alignItems="center">
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Select
                        fullWidth
                        size="small"
                        value={skillCategory}
                        onChange={(e) => setSkillCategory(e.target.value)}
                        sx={{ borderRadius: '8px', bgcolor: '#FFF' }}
                      >
                        <MenuItem value="technical">Technical Skill</MenuItem>
                        <MenuItem value="soft">Soft Skill</MenuItem>
                        <MenuItem value="tools">Tool / Software</MenuItem>
                        <MenuItem value="certifications">Certification</MenuItem>
                      </Select>
                    </Grid>
                    <Grid size={{ xs: 8, sm: 6 }}>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Type skill or certification and click Add (e.g. React.js, Python)..."
                        value={newSkillInput}
                        onChange={(e) => setNewSkillInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddSkill();
                          }
                        }}
                        sx={{ bgcolor: '#FFF' }}
                      />
                    </Grid>
                    <Grid size={{ xs: 4, sm: 2 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        size="small"
                        startIcon={<PlusOutlined />}
                        onClick={handleAddSkill}
                        sx={{ bgcolor: '#530EF0', height: 40, borderRadius: '8px', textTransform: 'none' }}
                      >
                        Add
                      </Button>
                    </Grid>
                  </Grid>
                </Box>

                {/* Technical Skills List */}
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#1E293B', mb: 1 }}>
                    ⚡ Technical Skills:
                  </Typography>
                  {skills.technical.length > 0 ? (
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {skills.technical.map((sk) => (
                        <Chip
                          key={sk}
                          label={sk}
                          size="small"
                          onDelete={() => handleRemoveSkill('technical', sk)}
                          sx={{ bgcolor: '#F3EDFF', color: '#530EF0', fontWeight: 600, fontSize: 12, borderRadius: '6px' }}
                        />
                      ))}
                    </Stack>
                  ) : (
                    <Typography sx={{ fontSize: 12, color: '#9CA3AF', fontStyle: 'italic' }}>
                      No technical skills added yet. Use the input above to add your primary skills.
                    </Typography>
                  )}
                </Box>

                {/* Tools & Frameworks */}
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#1E293B', mb: 1 }}>
                    🛠️ Tools &amp; Technologies:
                  </Typography>
                  {skills.tools.length > 0 ? (
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {skills.tools.map((tl) => (
                        <Chip
                          key={tl}
                          label={tl}
                          size="small"
                          onDelete={() => handleRemoveSkill('tools', tl)}
                          sx={{ bgcolor: '#EFF6FF', color: '#2563EB', fontWeight: 600, fontSize: 12, borderRadius: '6px' }}
                        />
                      ))}
                    </Stack>
                  ) : (
                    <Typography sx={{ fontSize: 12, color: '#9CA3AF', fontStyle: 'italic' }}>
                      No tools added yet. (e.g. Git, VS Code, Figma, Postman)
                    </Typography>
                  )}
                </Box>

                {/* Soft Skills */}
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#1E293B', mb: 1 }}>
                    🤝 Soft Skills:
                  </Typography>
                  {skills.soft.length > 0 ? (
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {skills.soft.map((sf) => (
                        <Chip
                          key={sf}
                          label={sf}
                          size="small"
                          onDelete={() => handleRemoveSkill('soft', sf)}
                          sx={{ bgcolor: '#ECFDF5', color: '#059669', fontWeight: 600, fontSize: 12, borderRadius: '6px' }}
                        />
                      ))}
                    </Stack>
                  ) : (
                    <Typography sx={{ fontSize: 12, color: '#9CA3AF', fontStyle: 'italic' }}>
                      No soft skills added yet. (e.g. Problem Solving, Team Collaboration)
                    </Typography>
                  )}
                </Box>

                {/* Certifications */}
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#1E293B', mb: 1 }}>
                    🏆 Certifications:
                  </Typography>
                  {skills.certifications.length > 0 ? (
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {skills.certifications.map((ct) => (
                        <Chip
                          key={ct}
                          label={ct}
                          size="small"
                          onDelete={() => handleRemoveSkill('certifications', ct)}
                          sx={{ bgcolor: '#FEF3C7', color: '#B45309', fontWeight: 600, fontSize: 12, borderRadius: '6px' }}
                        />
                      ))}
                    </Stack>
                  ) : (
                    <Typography sx={{ fontSize: 12, color: '#9CA3AF', fontStyle: 'italic' }}>
                      No certifications added yet. (e.g. AWS Certified, Meta Frontend)
                    </Typography>
                  )}
                </Box>
              </Stack>
            )}

            {/* ========================================================================= */}
            {/* STEP 4: RESUME & DOCUMENTS                                                */}
            {/* ========================================================================= */}
            {activeStep === 4 && (
              <Stack spacing={2.5}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#111827', mb: 0.5 }}>
                    5. Resume &amp; Supporting Documents
                  </Typography>
                  <Typography sx={{ fontSize: 12.5, color: '#6B7280' }}>
                    Upload your mandatory resume in PDF/DOCX format, along with an optional cover note or certificates.
                  </Typography>
                </Box>

                {/* Mandatory Resume Dropzone */}
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#1E293B', mb: 1 }}>
                    Mandatory Resume Upload (PDF / DOCX) *
                  </Typography>

                  {resumeFile ? (
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: '12px',
                        bgcolor: '#FAF5FF',
                        border: '1.5px solid #D8B4FE',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Box
                          sx={{
                            width: 42,
                            height: 42,
                            borderRadius: '10px',
                            bgcolor: '#FEE2E2',
                            color: '#DC2626',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 20
                          }}
                        >
                          <FilePdfOutlined />
                        </Box>
                        <Box>
                          <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: '#111827' }}>
                            {resumeFile.name}
                          </Typography>
                          <Typography sx={{ fontSize: 11.5, color: '#6B7280' }}>
                            {resumeFile.size} • Uploaded {resumeFile.uploadedAt}
                          </Typography>
                        </Box>
                      </Stack>

                      <Stack direction="row" spacing={1} alignItems="center">
                        <Chip
                          label="Ready"
                          size="small"
                          sx={{ bgcolor: '#ECFDF5', color: '#10B981', fontWeight: 700, fontSize: 10.5 }}
                        />
                        <IconButton
                          size="small"
                          onClick={() => setResumeFile(null)}
                          sx={{ color: '#EF4444', '&:hover': { bgcolor: '#FEE2E2' } }}
                        >
                          <DeleteOutlined />
                        </IconButton>
                      </Stack>
                    </Box>
                  ) : (
                    <Box
                      component="label"
                      sx={{
                        p: 3,
                        borderRadius: '12px',
                        border: '2px dashed #CBD5E1',
                        bgcolor: '#F8FAFC',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          borderColor: '#530EF0',
                          bgcolor: '#FAF5FF'
                        }
                      }}
                    >
                      <input type="file" accept=".pdf,.doc,.docx" hidden onChange={handleFileUpload} />
                      <UploadOutlined style={{ fontSize: 28, color: '#530EF0', marginBottom: 8 }} />
                      <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#111827' }}>
                        Click to upload or drag &amp; drop resume
                      </Typography>
                      <Typography sx={{ fontSize: 11.5, color: '#6B7280', mt: 0.5 }}>
                        Supported formats: PDF, DOCX (Max 10MB)
                      </Typography>
                    </Box>
                  )}
                  {validationErrors.resume && (
                    <Typography sx={{ color: '#EF4444', fontSize: 12, mt: 0.5 }}>
                      {validationErrors.resume}
                    </Typography>
                  )}
                </Box>

                {/* Optional Cover Letter */}
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#1E293B', mb: 1 }}>
                    Cover Letter (Optional)
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    size="small"
                    placeholder="Briefly state why your skills and experience make you a great fit for this position..."
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                  />
                </Box>

                {/* Portfolio and Additional Certificates */}
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Portfolio / Project Links (Optional)"
                      placeholder="Paste portfolio or project link"
                      value={portfolioDoc}
                      onChange={(e) => setPortfolioDoc(e.target.value)}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Certificates Link / Document"
                      placeholder="Enter certification credential URL"
                      value={certificates.join(', ')}
                      onChange={(e) =>
                        setCertificates(
                          e.target.value
                            .split(',')
                            .map((s) => s.trim())
                            .filter(Boolean)
                        )
                      }
                    />
                  </Grid>
                </Grid>
              </Stack>
            )}

            {/* ========================================================================= */}
            {/* STEP 5: JOB PREFERENCES                                                   */}
            {/* ========================================================================= */}
            {activeStep === 5 && (
              <Stack spacing={2.5}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#111827', mb: 0.5 }}>
                    6. Job Preferences &amp; Availability
                  </Typography>
                  <Typography sx={{ fontSize: 12.5, color: '#6B7280' }}>
                    Specify your preferred working style, location flexibility, and joining timeline.
                  </Typography>
                </Box>

                <Grid container spacing={2.5}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth size="small">
                      <FormLabel sx={{ fontSize: 12, fontWeight: 700, color: '#374151', mb: 0.5 }}>
                        Preferred Work Location *
                      </FormLabel>
                      <Select
                        displayEmpty
                        value={preferences.preferredLocation}
                        onChange={(e) => setPreferences({ ...preferences, preferredLocation: e.target.value })}
                        sx={{ borderRadius: '8px' }}
                      >
                        <MenuItem value="" disabled>
                          <Typography sx={{ color: '#9CA3AF', fontSize: 13 }}>Select preferred location</Typography>
                        </MenuItem>
                        <MenuItem value="Bengaluru">Bengaluru</MenuItem>
                        <MenuItem value="Chennai">Chennai</MenuItem>
                        <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                        <MenuItem value="Pune">Pune</MenuItem>
                        <MenuItem value="Mumbai">Mumbai</MenuItem>
                        <MenuItem value="Remote">100% Remote</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth size="small">
                      <FormLabel sx={{ fontSize: 12, fontWeight: 700, color: '#374151', mb: 0.5 }}>
                        Preferred Work Mode *
                      </FormLabel>
                      <Select
                        displayEmpty
                        value={preferences.workMode}
                        onChange={(e) => setPreferences({ ...preferences, workMode: e.target.value })}
                        sx={{ borderRadius: '8px' }}
                      >
                        <MenuItem value="" disabled>
                          <Typography sx={{ color: '#9CA3AF', fontSize: 13 }}>Select work mode</Typography>
                        </MenuItem>
                        <MenuItem value="Hybrid">Hybrid (2-3 days office)</MenuItem>
                        <MenuItem value="Remote">Remote (Full-time from home)</MenuItem>
                        <MenuItem value="On-site">On-site (Regular office)</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth size="small">
                      <FormLabel sx={{ fontSize: 12, fontWeight: 700, color: '#374151', mb: 0.5 }}>
                        Employment Type *
                      </FormLabel>
                      <Select
                        displayEmpty
                        value={preferences.employmentType}
                        onChange={(e) => setPreferences({ ...preferences, employmentType: e.target.value })}
                        sx={{ borderRadius: '8px' }}
                      >
                        <MenuItem value="" disabled>
                          <Typography sx={{ color: '#9CA3AF', fontSize: 13 }}>Select employment type</Typography>
                        </MenuItem>
                        <MenuItem value="Full-time">Full-time Permanent</MenuItem>
                        <MenuItem value="Contract">Contract / C2H</MenuItem>
                        <MenuItem value="Internship">Internship to Full-time</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth size="small">
                      <FormLabel sx={{ fontSize: 12, fontWeight: 700, color: '#374151', mb: 0.5 }}>
                        Relocation Preference *
                      </FormLabel>
                      <Select
                        displayEmpty
                        value={preferences.relocation}
                        onChange={(e) => setPreferences({ ...preferences, relocation: e.target.value })}
                        sx={{ borderRadius: '8px' }}
                      >
                        <MenuItem value="" disabled>
                          <Typography sx={{ color: '#9CA3AF', fontSize: 13 }}>Select relocation preference</Typography>
                        </MenuItem>
                        <MenuItem value="Yes, open to relocate">Yes, open to relocate</MenuItem>
                        <MenuItem value="No, looking only locally">No, looking only locally</MenuItem>
                        <MenuItem value="Remote only">Remote only</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <FormControl fullWidth size="small">
                      <FormLabel sx={{ fontSize: 12, fontWeight: 700, color: '#374151', mb: 0.5 }}>
                        Earliest Availability to Join *
                      </FormLabel>
                      <Select
                        displayEmpty
                        value={preferences.availability}
                        onChange={(e) => setPreferences({ ...preferences, availability: e.target.value })}
                        sx={{ borderRadius: '8px' }}
                      >
                        <MenuItem value="" disabled>
                          <Typography sx={{ color: '#9CA3AF', fontSize: 13 }}>Select availability timeline</Typography>
                        </MenuItem>
                        <MenuItem value="Immediate">Immediate (Serving notice or available)</MenuItem>
                        <MenuItem value="Within 15 Days">Within 15 Days</MenuItem>
                        <MenuItem value="Within 30 Days">Within 30 Days</MenuItem>
                        <MenuItem value="60 Days+">60 Days or more</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Stack>
            )}

            {/* ========================================================================= */}
            {/* STEP 6: ADDITIONAL QUESTIONS (HR-CONFIGURABLE)                             */}
            {/* ========================================================================= */}
            {activeStep === 6 && (
              <Stack spacing={2.5}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#111827', mb: 0.5 }}>
                    7. Additional Role-Specific Questions
                  </Typography>
                  <Typography sx={{ fontSize: 12.5, color: '#6B7280' }}>
                    These custom screening questions are configured specifically by the hiring team for this job.
                  </Typography>
                </Box>

                {/* Q1: Text answer */}
                <Box sx={{ p: 2, borderRadius: '12px', bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#111827', mb: 1 }}>
                    1. Why are you interested in joining our engineering team for this specific role? *
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={2.5}
                    size="small"
                    placeholder="Enter your response explaining your interest and motivation for this position..."
                    value={questions.q1Reason}
                    onChange={(e) => setQuestions({ ...questions, q1Reason: e.target.value })}
                    sx={{ bgcolor: '#FFF' }}
                  />
                </Box>

                {/* Q2: Dropdown answer */}
                <Box sx={{ p: 2, borderRadius: '12px', bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#111827', mb: 1 }}>
                    2. Which primary application architecture style do you have the most production experience with? *
                  </Typography>
                  <Select
                    fullWidth
                    displayEmpty
                    size="small"
                    value={questions.q2Architecture}
                    onChange={(e) => setQuestions({ ...questions, q2Architecture: e.target.value })}
                    sx={{ bgcolor: '#FFF', borderRadius: '8px' }}
                  >
                    <MenuItem value="" disabled>
                      <Typography sx={{ color: '#9CA3AF', fontSize: 13 }}>Select architecture experience</Typography>
                    </MenuItem>
                    <MenuItem value="Microservices">Microservices &amp; Distributed Systems</MenuItem>
                    <MenuItem value="Monolithic">Modular Monolithic Architecture</MenuItem>
                    <MenuItem value="Serverless">Serverless / Event-Driven Architectures</MenuItem>
                    <MenuItem value="Cloud Native">Cloud Native / Kubernetes Orchestration</MenuItem>
                  </Select>
                </Box>

                {/* Q3: Yes/No Question */}
                <Box sx={{ p: 2, borderRadius: '12px', bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#111827', mb: 0.5 }}>
                    3. Are you willing to support scheduled on-call rotations or high-priority production releases if required? *
                  </Typography>
                  <RadioGroup row value={questions.q3OnCall} onChange={(e) => setQuestions({ ...questions, q3OnCall: e.target.value })}>
                    <FormControlLabel
                      value="Yes"
                      control={<Radio size="small" sx={{ color: '#530EF0', '&.Mui-checked': { color: '#530EF0' } }} />}
                      label={<Typography sx={{ fontSize: 13, fontWeight: 600 }}>Yes</Typography>}
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio size="small" sx={{ color: '#530EF0', '&.Mui-checked': { color: '#530EF0' } }} />}
                      label={<Typography sx={{ fontSize: 13, fontWeight: 600 }}>No</Typography>}
                    />
                  </RadioGroup>
                </Box>

                {/* Q4: Yes/No Question */}
                <Box sx={{ p: 2, borderRadius: '12px', bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#111827', mb: 0.5 }}>
                    4. Do you possess valid work authorization for India without requiring employer sponsorship? *
                  </Typography>
                  <RadioGroup row value={questions.q4Authorization} onChange={(e) => setQuestions({ ...questions, q4Authorization: e.target.value })}>
                    <FormControlLabel
                      value="Yes"
                      control={<Radio size="small" sx={{ color: '#530EF0', '&.Mui-checked': { color: '#530EF0' } }} />}
                      label={<Typography sx={{ fontSize: 13, fontWeight: 600 }}>Yes, authorized</Typography>}
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio size="small" sx={{ color: '#530EF0', '&.Mui-checked': { color: '#530EF0' } }} />}
                      label={<Typography sx={{ fontSize: 13, fontWeight: 600 }}>No, need sponsorship</Typography>}
                    />
                  </RadioGroup>
                </Box>
              </Stack>
            )}

            {/* ========================================================================= */}
            {/* STEP 7: REVIEW & SUBMIT                                                   */}
            {/* ========================================================================= */}
            {activeStep === 7 && (
              <Stack spacing={2.5}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#111827', mb: 0.5 }}>
                    8. Review Application &amp; Final Consent
                  </Typography>
                  <Typography sx={{ fontSize: 12.5, color: '#6B7280' }}>
                    Review your application summary below, declare accuracy, and confirm submission.
                  </Typography>
                </Box>

                {/* Structured Summary Cards */}
                <Paper elevation={0} sx={{ p: 2.5, borderRadius: '12px', bgcolor: '#FAF5FF', border: '1px solid #EDE9FE' }}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11.5, display: 'block' }}>
                        Candidate Name:
                      </Typography>
                      <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: personal.fullName ? '#111827' : '#9CA3AF' }}>
                        {personal.fullName || 'Not entered yet'}
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: '#4B5563' }}>
                        {personal.email || 'Email not provided'} • {personal.mobile || 'Phone not provided'}
                      </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11.5, display: 'block' }}>
                        Applying For:
                      </Typography>
                      <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: '#530EF0' }}>
                        {job?.title || 'Job Title'} at {job?.company || 'Company'}
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: '#4B5563' }}>
                        Preferred: {preferences.preferredLocation || 'Location open'} ({preferences.workMode || 'Any mode'})
                      </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11.5, display: 'block' }}>
                        Education &amp; Score:
                      </Typography>
                      <Typography sx={{ fontWeight: 600, fontSize: 12.5, color: education.degree ? '#111827' : '#9CA3AF' }}>
                        {education.degree || 'Degree not specified'} {education.gradYear ? `(${education.gradYear})` : ''}
                      </Typography>
                      <Typography sx={{ fontSize: 11.5, color: '#6B7280' }}>
                        {education.college || 'College not entered'} • {education.cgpa || 'Score not entered'}
                      </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11.5, display: 'block' }}>
                        Experience &amp; Notice:
                      </Typography>
                      <Typography sx={{ fontWeight: 600, fontSize: 12.5, color: '#111827' }}>
                        {expType === 'Experienced'
                          ? experience.company
                            ? `${experience.jobTitle || 'Role'} at ${experience.company} (${experience.years || 'Exp'})`
                            : 'Experienced Professional'
                          : 'Fresher / College Graduate'}
                      </Typography>
                      <Typography sx={{ fontSize: 11.5, color: '#6B7280' }}>
                        {expType === 'Experienced'
                          ? `Expected: ${experience.expectedCtc || 'Negotiable'} • Notice: ${experience.noticePeriod || 'Standard'}`
                          : `Expected: ${fresherInfo.expectedCtc || 'Standard'} • Joining: ${fresherInfo.joiningAvailability || 'Immediate'}`}
                      </Typography>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11.5, display: 'block' }}>
                        Verified Resume:
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                        <FilePdfOutlined style={{ color: resumeFile ? '#DC2626' : '#9CA3AF' }} />
                        <Typography sx={{ fontWeight: 700, fontSize: 12.5, color: resumeFile ? '#111827' : '#EF4444' }}>
                          {resumeFile?.name || 'Resume pending upload (Step 5)'}
                        </Typography>
                        {resumeFile && (
                          <Chip
                            label="Ready for HR"
                            size="small"
                            sx={{ bgcolor: '#ECFDF5', color: '#10B981', fontWeight: 700, fontSize: 10, height: 20 }}
                          />
                        )}
                      </Stack>
                    </Grid>
                  </Grid>
                </Paper>

                {/* Declarations & Consents */}
                <Box sx={{ p: 2, borderRadius: '12px', bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <Stack spacing={1.5}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={declarationChecked}
                          onChange={(e) => setDeclarationChecked(e.target.checked)}
                          size="small"
                          sx={{ color: '#530EF0', '&.Mui-checked': { color: '#530EF0' } }}
                        />
                      }
                      label={
                        <Typography sx={{ fontSize: 12.5, color: '#1E293B', fontWeight: 600 }}>
                          Information Accuracy Declaration: I hereby declare that all details provided in this job
                          application are true, complete, and accurate.
                        </Typography>
                      }
                    />
                    {validationErrors.declaration && (
                      <Typography sx={{ color: '#EF4444', fontSize: 11.5, pl: 4 }}>
                        {validationErrors.declaration}
                      </Typography>
                    )}

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={privacyConsentChecked}
                          onChange={(e) => setPrivacyConsentChecked(e.target.checked)}
                          size="small"
                          sx={{ color: '#530EF0', '&.Mui-checked': { color: '#530EF0' } }}
                        />
                      }
                      label={
                        <Typography sx={{ fontSize: 12.5, color: '#1E293B', fontWeight: 600 }}>
                          Privacy &amp; Data Consent: I authorize TraceU Jobs and the hiring team at {job?.company || 'the hiring organization'} to process my application and contact me regarding this role.
                        </Typography>
                      }
                    />
                    {validationErrors.privacy && (
                      <Typography sx={{ color: '#EF4444', fontSize: 11.5, pl: 4 }}>
                        {validationErrors.privacy}
                      </Typography>
                    )}
                  </Stack>
                </Box>
              </Stack>
            )}
          </>
        )}
      </DialogContent>

      {/* Dialog Footer Actions */}
      {!isSubmitted && (
        <DialogActions
          sx={{
            p: { xs: 2, sm: 3 },
            pt: 2,
            bgcolor: '#FAF5FF',
            borderTop: '1px solid #EDE9FE',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            startIcon={<ArrowLeftOutlined />}
            sx={{ textTransform: 'none', fontWeight: 600, color: '#4B5563' }}
          >
            Back
          </Button>

          <Stack direction="row" spacing={1.5}>
            <Button onClick={handleModalClose} sx={{ textTransform: 'none', color: '#6B7280', fontWeight: 600 }}>
              Cancel
            </Button>

            {activeStep < STEPS.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleNext}
                endIcon={<ArrowRightOutlined />}
                sx={{
                  bgcolor: '#530EF0',
                  color: '#FFF',
                  fontWeight: 700,
                  fontSize: 13,
                  px: 3,
                  borderRadius: '9px',
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#430bc2' }
                }}
              >
                Next Step
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleSubmitApplication}
                startIcon={<CheckCircleOutlined />}
                sx={{
                  bgcolor: '#10B981',
                  color: '#FFF',
                  fontWeight: 800,
                  fontSize: 13,
                  px: 3.5,
                  borderRadius: '9px',
                  textTransform: 'none',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
                  '&:hover': { bgcolor: '#059669' }
                }}
              >
                Confirm &amp; Submit Application
              </Button>
            )}
          </Stack>
        </DialogActions>
      )}
    </Dialog>
  );
}

CandidateJobApplicationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  job: PropTypes.object,
  onApplySuccess: PropTypes.func
};
