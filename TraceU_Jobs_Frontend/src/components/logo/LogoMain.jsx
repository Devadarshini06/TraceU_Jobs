import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useBrand } from 'contexts/BrandContext';

// ==============================|| TRACEU LOGO MAIN ||============================== //

export default function LogoMain() {
  const { companyName, companyLogo, primaryColor } = useBrand();

  const initials = companyName
    ? companyName
        .split(' ')
        .filter(Boolean)
        .map((w) => w[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : 'TU';

  return (
    <Stack direction="row" alignItems="center" spacing={1.2}>
      {companyLogo ? (
        <Box
          component="img"
          src={companyLogo}
          alt={companyName || 'Logo'}
          sx={{
            width: 34,
            height: 34,
            borderRadius: '8px',
            objectFit: 'contain',
            bgcolor: '#ffffff',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            flexShrink: 0
          }}
        />
      ) : (
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '8px',
            background: `linear-gradient(135deg, ${primaryColor || '#530EF0'} 0%, #311075 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: 800,
            fontSize: 13.5,
            boxShadow: `0 3px 10px ${primaryColor || '#530EF0'}40`,
            flexShrink: 0
          }}
        >
          {initials}
        </Box>
      )}
      <Box sx={{ textAlign: 'left' }}>
        <Typography sx={{ fontWeight: 800, fontSize: 16, color: '#111827', letterSpacing: '-0.3px', whiteSpace: 'nowrap', lineHeight: 1.2 }}>
          {companyName || 'TraceU Jobs'}
        </Typography>
        <Typography sx={{ fontSize: 10, color: '#6b7280', fontWeight: 500, letterSpacing: '0px', whiteSpace: 'nowrap' }}>
          Recruitment & Talent Acquisition
        </Typography>
      </Box>
    </Stack>
  );
}
