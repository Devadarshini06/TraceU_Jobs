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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

// icons
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import UploadOutlined from '@ant-design/icons/UploadOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import FilterOutlined from '@ant-design/icons/FilterOutlined';
import MoreOutlined from '@ant-design/icons/MoreOutlined';
import ArrowUpOutlined from '@ant-design/icons/ArrowUpOutlined';
import ArrowDownOutlined from '@ant-design/icons/ArrowDownOutlined';
import ContactsOutlined from '@ant-design/icons/ContactsOutlined';
import StarOutlined from '@ant-design/icons/StarOutlined';
import RocketOutlined from '@ant-design/icons/RocketOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';

// avatar assets
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import avatar5 from 'assets/images/users/avatar-5.png';

export default function HrTalentPool() {
  const navigate = useNavigate();

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [skillsFilter, setSkillsFilter] = useState('All Skills');
  const [expFilter, setExpFilter] = useState('All Experience');
  const [locFilter, setLocFilter] = useState('All Locations');
  const [availFilter, setAvailFilter] = useState('All Availability');

  // Sidebar filters
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedAvail, setSelectedAvail] = useState('');

  // Modal & Snackbar
  const [openNewDialog, setOpenNewDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [newPoolCand, setNewPoolCand] = useState({ name: '', email: '', role: '', exp: '', skills: '' });
  const [poolErrors, setPoolErrors] = useState({});

  // Selection
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectRow = (e, cand) => {
    e.stopPropagation();
    const id = cand.id;
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const handleRowClick = (cand) => {
    const id = cand.id;
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(filteredCandidates.map((c) => c.id));
    } else {
      setSelectedRows([]);
    }
  };

  // 10 Candidates list matching screenshot exactly
  const [candidates, setCandidates] = useState([
    { id: 1, name: 'Priya Sharma', email: 'priya.sharma@email.com', role: 'Software Engineer', exp: '2+ yrs', skills: ['React'], moreSkills: 3, location: 'Bengaluru', avail: 'Immediate', source: 'LinkedIn', addedOn: 'Oct 21, 2025', avatar: avatar3 },
    { id: 2, name: 'Rahul Kumar', email: 'rahul.kumar@email.com', role: 'Frontend Developer', exp: '3+ yrs', skills: ['React'], moreSkills: 2, location: 'Chennai', avail: 'Open to Offers', source: 'Naukri', addedOn: 'Oct 20, 2025', avatar: avatar2 },
    { id: 3, name: 'Sneha Iyer', email: 'sneha.iyer@email.com', role: 'Data Analyst', exp: '2+ yrs', skills: ['SQL'], moreSkills: 3, location: 'Hyderabad', avail: 'Immediate', source: 'Indeed', addedOn: 'Oct 20, 2025', avatar: avatar4 },
    { id: 4, name: 'Arjun Nair', email: 'arjun.nair@email.com', role: 'Backend Developer', exp: '4+ yrs', skills: ['Java'], moreSkills: 3, location: 'Bengaluru', avail: '1 Month', source: 'Referral', addedOn: 'Oct 19, 2025', avatar: avatar1 },
    { id: 5, name: 'Vikram Singh', email: 'vikram.singh@email.com', role: 'Full Stack Developer', exp: '3+ yrs', skills: ['Node.js'], moreSkills: 3, location: 'Pune', avail: 'Open to Offers', source: 'Company Website', addedOn: 'Oct 18, 2025', avatar: avatar5 },
    { id: 6, name: 'Meera Joshi', email: 'meera.joshi@email.com', role: 'QA Engineer', exp: '2+ yrs', skills: ['Selenium'], moreSkills: 2, location: 'Chennai', avail: 'Immediate', source: 'LinkedIn', addedOn: 'Oct 18, 2025', avatar: avatar3 },
    { id: 7, name: 'Siddharth Verma', email: 'siddharth.verma@email.com', role: 'DevOps Engineer', exp: '4+ yrs', skills: ['AWS'], moreSkills: 3, location: 'Bengaluru', avail: '1 Month', source: 'Naukri', addedOn: 'Oct 17, 2025', avatar: avatar2 },
    { id: 8, name: 'Ananya Rao', email: 'ananya.rao@email.com', role: 'Product Designer', exp: '3+ yrs', skills: ['Figma'], moreSkills: 3, location: 'Mumbai', avail: 'Immediate', source: 'Job Board', addedOn: 'Oct 16, 2025', avatar: avatar4 },
    { id: 9, name: 'Deepak Patel', email: 'deepak.patel@email.com', role: 'System Administrator', exp: '5+ yrs', skills: ['Linux'], moreSkills: 3, location: 'Chennai', avail: '3 Months', source: 'Referral', addedOn: 'Oct 15, 2025', avatar: avatar1 },
    { id: 10, name: 'Riya Menon', email: 'riya.menon@email.com', role: 'Data Scientist', exp: '3+ yrs', skills: ['Python'], moreSkills: 3, location: 'Bengaluru', avail: 'Open to Offers', source: 'LinkedIn', addedOn: 'Oct 15, 2025', avatar: avatar5 }
  ]);

  // Top KPI Stats
  const kpiStats = [
    { label: 'Total Talent Pool', count: 482, change: '+ 12%', sub: 'Saved candidates', icon: <ContactsOutlined />, color: '#6929E2', bg: '#F3EDFF' },
    { label: 'High Match Candidates', count: 128, change: '+ 18%', sub: 'Strong skill match', icon: <StarOutlined />, color: '#F59E0B', bg: '#FFFBEB' },
    { label: 'Ready for Opportunities', count: 206, change: '+ 24%', sub: 'Open to new roles', icon: <RocketOutlined />, color: '#10B981', bg: '#ECFDF5' },
    { label: 'Not Contacted', count: 64, change: '- 12%', sub: 'Need follow up', icon: <ClockCircleOutlined />, color: '#2563EB', bg: '#EFF6FF' }
  ];

  const filteredCandidates = candidates.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <ContactsOutlined />
            </Box>
            <Typography variant="caption" sx={{ color: '#530EF0', fontWeight: 600, fontSize: 12 }}>
              Talent Pool
            </Typography>
          </Stack>
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
            Save and organize potential candidates for future vacancies. Build a strong talent pipeline.
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
            Add to Talent Pool
          </Button>
          <Button
            variant="outlined"
            startIcon={<UploadOutlined />}
            onClick={() => setSnackbar({ open: true, message: 'Opening candidate import...', severity: 'info' })}
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
                  icon={kpi.change.startsWith('+') ? <ArrowUpOutlined style={{ fontSize: 10, color: '#10B981' }} /> : <ArrowDownOutlined style={{ fontSize: 10, color: '#EF4444' }} />}
                  label={kpi.change}
                  size="small"
                  sx={{
                    bgcolor: kpi.change.startsWith('+') ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
                    color: kpi.change.startsWith('+') ? '#10B981' : '#EF4444',
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
      {/* 3. TOOLBAR                                                               */}
      {/* ========================================================================= */}
      <Card sx={{ p: 1.8, borderRadius: '14px', border: '1px solid #F3F4F6', bgcolor: '#FFF', mb: 2.5 }}>
        <Grid container spacing={1.5} alignItems="center">
          <Grid size={{ xs: 12, md: 4.5 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search by name, skills, experience, location, or keywords..."
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

          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Select fullWidth size="small" value={skillsFilter} onChange={(e) => setSkillsFilter(e.target.value)} sx={{ borderRadius: '10px' }}>
              <MenuItem value="All Skills">All Skills</MenuItem>
              <MenuItem value="React">React</MenuItem>
              <MenuItem value="Node.js">Node.js</MenuItem>
              <MenuItem value="Python">Python</MenuItem>
            </Select>
          </Grid>

          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Select fullWidth size="small" value={expFilter} onChange={(e) => setExpFilter(e.target.value)} sx={{ borderRadius: '10px' }}>
              <MenuItem value="All Experience">All Experience</MenuItem>
              <MenuItem value="1-3 yrs">1-3 yrs</MenuItem>
              <MenuItem value="3-5 yrs">3-5 yrs</MenuItem>
              <MenuItem value="5+ yrs">5+ yrs</MenuItem>
            </Select>
          </Grid>

          <Grid size={{ xs: 6, sm: 3, md: 1.8 }}>
            <Select fullWidth size="small" value={locFilter} onChange={(e) => setLocFilter(e.target.value)} sx={{ borderRadius: '10px' }}>
              <MenuItem value="All Locations">All Locations</MenuItem>
              <MenuItem value="Bengaluru">Bengaluru</MenuItem>
              <MenuItem value="Chennai">Chennai</MenuItem>
              <MenuItem value="Hyderabad">Hyderabad</MenuItem>
            </Select>
          </Grid>

          <Grid size={{ xs: 6, sm: 3, md: 1.7 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FilterOutlined />}
              onClick={() => setSnackbar({ open: true, message: 'Filter criteria updated', severity: 'info' })}
              sx={{ borderColor: '#E5E7EB', color: '#530EF0', borderRadius: '10px', textTransform: 'none', px: 1 }}
            >
              More Filters
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* ========================================================================= */}
      {/* 4. MAIN SPLIT: CANDIDATES TABLE + RIGHT FILTER SIDEBAR                    */}
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
                    onClick={() => setSnackbar({ open: true, message: `Mapped ${selectedRows.length} candidates to open requisition!`, severity: 'success' })}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30, color: '#6B7280', borderColor: '#D1D5DB' }}
                  >
                    Map to Job ({selectedRows.length})
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setSnackbar({ open: true, message: `Sending bulk message to ${selectedRows.length} candidates...`, severity: 'info' })}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30, color: '#6B7280', borderColor: '#D1D5DB' }}
                  >
                    Send Message
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setSnackbar({ open: true, message: `Exporting profiles for ${selectedRows.length} candidates...`, severity: 'success' })}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30, color: '#6B7280', borderColor: '#D1D5DB' }}
                  >
                    Export Profiles
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={() => {
                      setCandidates(candidates.filter((c) => !selectedRows.includes(c.id)));
                      setSelectedRows([]);
                      setSnackbar({ open: true, message: `Removed ${selectedRows.length} candidates from talent pool.`, severity: 'error' });
                    }}
                    sx={{ textTransform: 'none', fontWeight: 700, fontSize: 12, borderRadius: '6px', height: 30 }}
                  >
                    Remove
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
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Availability</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Source</TableCell>
                    <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Added On</TableCell>
                    <TableCell align="right" sx={{ color: '#6B7280', fontWeight: 600, fontSize: 11.5, textTransform: 'uppercase' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCandidates.map((cand) => {
                    const isChecked = selectedRows.includes(cand.id);
                    return (
                      <TableRow
                        key={cand.id}
                        hover
                        sx={{
                          cursor: 'pointer',
                          bgcolor: isChecked ? 'rgba(83, 14, 240, 0.04)' : 'inherit'
                        }}
                        onClick={() => handleRowClick(cand)}
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
                        <Chip
                          label={cand.avail}
                          size="small"
                          sx={{
                            height: 22,
                            fontSize: 11,
                            fontWeight: 700,
                            bgcolor:
                              cand.avail === 'Immediate' ? 'rgba(16, 185, 129, 0.1)' :
                              cand.avail === 'Open to Offers' ? 'rgba(59, 130, 246, 0.1)' :
                              cand.avail === '1 Month' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(139, 92, 246, 0.1)',
                            color:
                              cand.avail === 'Immediate' ? '#10B981' :
                              cand.avail === 'Open to Offers' ? '#2563EB' :
                              cand.avail === '1 Month' ? '#D97706' : '#8B5CF6'
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                        <Chip label={cand.source} size="small" sx={{ height: 22, fontSize: 11, fontWeight: 600, bgcolor: '#F9FAFB', color: '#4B5563' }} />
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
              <Typography variant="caption" sx={{ color: '#6B7280' }}>Showing 1-10 of 482 candidates</Typography>
              <Pagination count={5} size="small" sx={{ '& .Mui-selected': { bgcolor: '#530EF0 !important', color: '#FFF' } }} />
            </Box>
          </Card>
        </Box>

        {/* ======================================================================= */}
        {/* RIGHT FILTER SIDEBAR (Matching Screenshot 1 exactly)                   */}
        {/* ======================================================================= */}
        <Box sx={{ width: { xs: '100%', lg: 320 }, flexShrink: 0 }}>
          <Stack spacing={2.5}>
            {/* Filter Controls Card */}
            <Card sx={{ p: 2.5, borderRadius: '16px', border: '1px solid #F3F4F6', bgcolor: '#FFF' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#111827', fontSize: 14 }}>
                  Filters
                </Typography>
                <Typography variant="caption" sx={{ color: '#530EF0', fontWeight: 700, cursor: 'pointer' }}>
                  Clear All
                </Typography>
              </Stack>

              <Stack spacing={2.2}>
                {/* Skills */}
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#374151', display: 'block', mb: 0.8 }}>
                    Skills
                  </Typography>
                  <TextField fullWidth size="small" placeholder="Search skills..." sx={{ mb: 1, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
                  <Stack direction="row" spacing={0.6} flexWrap="wrap" useFlexGap>
                    {['React', 'Node.js', 'Python', 'JavaScript'].map((sk) => (
                      <Chip key={sk} label={sk} size="small" sx={{ bgcolor: '#530EF0', color: '#FFF', fontWeight: 600, fontSize: 11.5, height: 22 }} />
                    ))}
                    <Chip label="+5" size="small" sx={{ bgcolor: '#F3F4F6', fontSize: 11.5, height: 22 }} />
                  </Stack>
                </Box>

                {/* Experience Level */}
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#374151', display: 'block', mb: 0.5 }}>
                    Experience Level
                  </Typography>
                  <FormGroup>
                    {[
                      { label: 'Fresher (0-1 years)', count: 64, checked: false },
                      { label: 'Junior (1-3 years)', count: 186, checked: false },
                      { label: 'Mid (3-5 years)', count: 142, checked: false },
                      { label: 'Senior (5+ years)', count: 90, checked: false }
                    ].map((exp, i) => (
                      <Stack key={i} direction="row" justifyContent="space-between" alignItems="center">
                        <FormControlLabel
                          control={<Checkbox size="small" defaultChecked={exp.checked} sx={{ p: 0.5, '&.Mui-checked': { color: '#530EF0' } }} />}
                          label={<Typography sx={{ fontSize: 12.5, color: '#4B5563' }}>{exp.label}</Typography>}
                          sx={{ m: 0 }}
                        />
                        <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 12, fontWeight: 400 }}>{exp.count}</Typography>
                      </Stack>
                    ))}
                  </FormGroup>
                </Box>

                {/* Location */}
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#374151', display: 'block', mb: 0.8 }}>
                    Location
                  </Typography>
                  <TextField fullWidth size="small" placeholder="Search location..." sx={{ mb: 1, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
                  <Stack direction="row" spacing={0.6} flexWrap="wrap" useFlexGap>
                    {['Bengaluru', 'Chennai', 'Hyderabad', 'Pune'].map((loc) => (
                      <Chip key={loc} label={loc} size="small" sx={{ bgcolor: '#F3F4F6', color: '#374151', fontSize: 11.5, height: 22 }} />
                    ))}
                    <Chip label="+3" size="small" sx={{ bgcolor: '#F3F4F6', fontSize: 11.5, height: 22 }} />
                  </Stack>
                </Box>

                {/* Availability */}
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#374151', display: 'block', mb: 0.8 }}>
                    Availability
                  </Typography>
                  <Stack direction="row" spacing={0.6} flexWrap="wrap" useFlexGap>
                    {['Immediate', '1 Month', '3 Months', 'Open to Offers'].map((av) => (
                      <Chip
                        key={av}
                        label={av}
                        size="small"
                        onClick={() => setSelectedAvail(av)}
                        sx={{
                          cursor: 'pointer',
                          bgcolor: selectedAvail === av ? 'rgba(83, 14, 240, 0.1)' : '#F3F4F6',
                          color: selectedAvail === av ? '#530EF0' : '#4B5563',
                          fontWeight: selectedAvail === av ? 700 : 500,
                          fontSize: 11.5,
                          height: 22
                        }}
                      />
                    ))}
                  </Stack>
                </Box>

                {/* Apply Button */}
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => setSnackbar({ open: true, message: 'Filters applied!', severity: 'success' })}
                  sx={{ bgcolor: '#530EF0', color: '#FFF', fontWeight: 700, textTransform: 'none', borderRadius: '10px', py: 1 }}
                >
                  Apply Filters
                </Button>
              </Stack>
            </Card>

            {/* Saved Searches Card */}
            <Card sx={{ p: 2.2, borderRadius: '16px', border: '1px solid #F3F4F6', bgcolor: '#FFF' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#111827' }}>
                  Saved Searches
                </Typography>
                <Typography variant="caption" sx={{ color: '#530EF0', fontWeight: 600, cursor: 'pointer' }}>
                  View all &rarr;
                </Typography>
              </Stack>

              <Stack spacing={1}>
                {[
                  { title: 'React Developers - Bengaluru', count: '124 candidates' },
                  { title: 'Data Analysts - Open to Offers', count: '86 candidates' }
                ].map((s, i) => (
                  <Box key={i} sx={{ p: 1.2, borderRadius: '10px', bgcolor: '#FAFAFB', border: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#111827', fontSize: 12.5 }}>
                        {s.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11 }}>
                        {s.count}
                      </Typography>
                    </Box>
                    <IconButton size="small" onClick={() => setSnackbar({ open: true, message: `Pool segment options for "${s.title}" opened`, severity: 'info' })}><MoreOutlined style={{ color: '#9CA3AF' }} /></IconButton>
                  </Box>
                ))}
              </Stack>
            </Card>
          </Stack>
        </Box>
      </Box>

      {/* Modal: Add to Talent Pool */}
      <Dialog
        open={openNewDialog}
        onClose={() => {
          setOpenNewDialog(false);
          setPoolErrors({});
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: '1.05rem', color: '#111827' }}>
          Add Candidate to Talent Pool
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              size="small"
              label="Full Name *"
              placeholder="e.g. Varun Kashyap"
              value={newPoolCand.name}
              onChange={(e) => {
                setNewPoolCand({ ...newPoolCand, name: e.target.value });
                if (poolErrors.name) setPoolErrors({ ...poolErrors, name: '' });
              }}
              error={Boolean(poolErrors.name)}
              helperText={poolErrors.name}
            />
            <TextField
              fullWidth
              size="small"
              type="email"
              label="Email Address *"
              placeholder="varun.kashyap@email.com"
              value={newPoolCand.email}
              onChange={(e) => {
                setNewPoolCand({ ...newPoolCand, email: e.target.value });
                if (poolErrors.email) setPoolErrors({ ...poolErrors, email: '' });
              }}
              error={Boolean(poolErrors.email)}
              helperText={poolErrors.email}
            />
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Current Role"
                  placeholder="e.g. Mobile Developer"
                  value={newPoolCand.role}
                  onChange={(e) => setNewPoolCand({ ...newPoolCand, role: e.target.value })}
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Experience"
                  placeholder="e.g. 3+ yrs"
                  value={newPoolCand.exp}
                  onChange={(e) => setNewPoolCand({ ...newPoolCand, exp: e.target.value })}
                />
              </Grid>
            </Grid>
            <TextField
              fullWidth
              size="small"
              label="Skills (comma separated)"
              placeholder="Flutter, Dart, iOS"
              value={newPoolCand.skills}
              onChange={(e) => setNewPoolCand({ ...newPoolCand, skills: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={() => {
              setOpenNewDialog(false);
              setPoolErrors({});
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
              if (!newPoolCand.name.trim()) {
                errors.name = 'Full Name is required';
              } else if (newPoolCand.name.trim().length < 5) {
                errors.name = 'Full Name must be at least 5 characters';
              }

              if (!newPoolCand.email.trim()) {
                errors.email = 'Email Address is required';
              } else if (!emailRegex.test(newPoolCand.email.trim())) {
                errors.email = 'Must be a valid email address';
              }

              if (Object.keys(errors).length > 0) {
                setPoolErrors(errors);
                setSnackbar({ open: true, message: 'Please correct the validation errors', severity: 'warning' });
                return;
              }

              const created = {
                id: Date.now(),
                name: newPoolCand.name.trim(),
                email: newPoolCand.email.trim(),
                role: newPoolCand.role.trim() || 'Software Engineer',
                exp: newPoolCand.exp.trim() || '2+ yrs',
                skills: newPoolCand.skills ? newPoolCand.skills.split(',').map(s => s.trim()).filter(Boolean).slice(0, 1) : ['React'],
                moreSkills: 2,
                location: 'Bengaluru',
                avail: 'Immediate',
                source: 'Direct Add',
                addedOn: 'Today',
                avatar: avatar1
              };

              setCandidates([created, ...candidates]);
              setOpenNewDialog(false);
              setNewPoolCand({ name: '', email: '', role: '', exp: '', skills: '' });
              setPoolErrors({});
              setSnackbar({ open: true, message: `Candidate ${created.name} added to talent pool!`, severity: 'success' });
            }}
            sx={{ bgcolor: '#530EF0', color: '#FFF', textTransform: 'none', borderRadius: '8px' }}
          >
            Add Candidate
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Notification */}
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

