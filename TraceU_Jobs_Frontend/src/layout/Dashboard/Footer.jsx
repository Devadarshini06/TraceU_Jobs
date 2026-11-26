// material-ui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Footer() {
  return (
    <Box component="footer" sx={{ mt: 'auto', pt: 3, pb: 1, borderTop: '1px solid #F1F5F9' }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 1,
          gap: 1
        }}
      >
        <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 12 }}>
          © {new Date().getFullYear()} TraceU Jobs — AI-Powered Recruitment & Talent Acquisition Platform.
        </Typography>
        <Stack direction="row" spacing={2.5}>
          <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12, cursor: 'pointer', '&:hover': { color: '#530EF0' } }}>
            Careers Portal
          </Typography>
          <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12, cursor: 'pointer', '&:hover': { color: '#530EF0' } }}>
            Privacy Policy
          </Typography>
          <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12, cursor: 'pointer', '&:hover': { color: '#530EF0' } }}>
            Terms of Service
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
