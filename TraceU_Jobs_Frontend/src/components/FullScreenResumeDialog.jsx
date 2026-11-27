import React from 'react';
import { Box, Button, Chip, Dialog, Divider, IconButton, Stack, Typography } from '@mui/material';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import DownloadOutlined from '@ant-design/icons/DownloadOutlined';
import FilePdfOutlined from '@ant-design/icons/FilePdfOutlined';

export default function FullScreenResumeDialog({ open, onClose, candidate }) {
  if (!candidate) return null;

  const name = candidate.name || 'Candidate';
  const resumeName = candidate.resumeName || candidate.resume_name || `${name.replace(/\s+/g, '_')}_Resume.pdf`;
  const resumeUrl = candidate.resumeUrl || candidate.resume_url || '';
  const resumeSize = candidate.resumeSize || candidate.resume_size || '';
  const lowerUrl = String(resumeUrl).toLowerCase();
  const lowerName = String(resumeName).toLowerCase();
  const isImage = /\.(png|jpe?g|webp|gif)(\?|$)/.test(lowerUrl) || /\.(png|jpe?g|webp|gif)$/.test(lowerName);
  const isWordDoc = /\.(docx?|rtf)(\?|$)/.test(lowerUrl) || /\.(docx?|rtf)$/.test(lowerName);
  const skills = Array.isArray(candidate.allSkills)
    ? candidate.allSkills
    : Array.isArray(candidate.skills)
      ? candidate.skills
      : typeof candidate.skills === 'string' && candidate.skills.trim()
        ? candidate.skills.split(',').map((s) => s.trim()).filter(Boolean)
        : [];

  return (
    <Dialog open={open} onClose={onClose} fullScreen>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#0F172A' }}>
        {/* Header Bar */}
        <Box
          sx={{
            px: 3,
            py: 1.5,
            bgcolor: '#1E293B',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 0 }}>
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: '10px',
                bgcolor: 'rgba(239, 68, 68, 0.15)',
                color: '#F87171',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                flexShrink: 0
              }}
            >
              <FilePdfOutlined />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ color: '#F8FAFC', fontWeight: 700, fontSize: 15, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {name} — {resumeName}
              </Typography>
              <Typography sx={{ color: '#94A3B8', fontSize: 12 }}>
                {candidate.role || candidate.jobTitle || 'Candidate'}
                {resumeSize ? ` • ${resumeSize}` : ''}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center" sx={{ flexShrink: 0 }}>
            {resumeUrl && (
              <Button
                variant="contained"
                size="small"
                component="a"
                href={resumeUrl}
                download={resumeName}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<DownloadOutlined />}
                sx={{
                  bgcolor: '#530EF0',
                  color: '#FFF',
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: '8px',
                  '&:hover': { bgcolor: '#430BC2' }
                }}
              >
                Download
              </Button>
            )}
            <IconButton onClick={onClose} sx={{ color: '#CBD5E1', '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' } }}>
              <CloseOutlined />
            </IconButton>
          </Stack>
        </Box>

        {/* Full-screen Viewer Body */}
        <Box sx={{ flex: 1, overflow: 'auto', display: 'flex', justifyContent: 'center', alignItems: resumeUrl && !isWordDoc ? 'stretch' : 'flex-start', p: resumeUrl && !isWordDoc ? 0 : 4 }}>
          {resumeUrl && isImage ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', p: 3 }}>
              <img
                src={resumeUrl}
                alt={resumeName}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: 8, background: '#FFF' }}
              />
            </Box>
          ) : resumeUrl && !isWordDoc ? (
            <iframe
              src={resumeUrl}
              title={resumeName}
              style={{ width: '100%', height: '100%', border: 'none', backgroundColor: '#FFFFFF' }}
            />
          ) : (
            <Box
              sx={{
                width: '100%',
                maxWidth: 820,
                bgcolor: '#FFFFFF',
                borderRadius: '12px',
                p: 5,
                boxShadow: '0 20px 50px rgba(0,0,0,0.35)'
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" gap={2} sx={{ mb: 3 }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A' }}>
                    {name}
                  </Typography>
                  <Typography sx={{ fontSize: 15, color: '#530EF0', fontWeight: 600, mt: 0.5 }}>
                    {candidate.role || candidate.jobTitle || 'Candidate'}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                  {candidate.email && <Typography sx={{ fontSize: 13, color: '#475569' }}>{candidate.email}</Typography>}
                  {candidate.phone && <Typography sx={{ fontSize: 13, color: '#475569' }}>{candidate.phone}</Typography>}
                  {candidate.location && <Typography sx={{ fontSize: 13, color: '#475569' }}>{candidate.location}</Typography>}
                </Box>
              </Stack>

              <Divider sx={{ my: 2.5 }} />

              {candidate.about && (
                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#64748B', textTransform: 'uppercase', mb: 1 }}>
                    Professional Summary
                  </Typography>
                  <Typography sx={{ fontSize: 14, color: '#334155', lineHeight: 1.7 }}>{candidate.about}</Typography>
                </Box>
              )}

              <Box sx={{ mb: 3 }}>
                <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#64748B', textTransform: 'uppercase', mb: 1 }}>
                  Experience & Background
                </Typography>
                <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>
                  {candidate.experience?.title || candidate.role || 'Professional'} — {candidate.exp || candidate.experience?.period || candidate.experience || 'Experienced'}
                </Typography>
                {candidate.experience?.company && (
                  <Typography sx={{ fontSize: 13, color: '#475569', mt: 0.25 }}>{candidate.experience.company}</Typography>
                )}
              </Box>

              {skills.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#64748B', textTransform: 'uppercase', mb: 1 }}>
                    Key Skills
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {skills.map((sk) => (
                      <Chip key={sk} label={sk} size="small" sx={{ bgcolor: '#F1F5F9', color: '#1E293B', fontWeight: 600 }} />
                    ))}
                  </Stack>
                </Box>
              )}

              <Divider sx={{ my: 2.5 }} />

              <Typography sx={{ fontSize: 12.5, color: '#64748B' }}>
                {resumeUrl
                  ? 'Word document preview is not supported directly in the browser. Click Download above to view the original file.'
                  : 'No uploaded PDF file is attached to this profile yet — displaying structured resume summary.'}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Dialog>
  );
}

