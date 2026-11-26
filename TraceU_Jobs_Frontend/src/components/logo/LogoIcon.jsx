import Box from '@mui/material/Box';
import { useBrand } from 'contexts/BrandContext';

// ==============================|| TRACEU LOGO ICON ||============================== //

export default function LogoIcon() {
  const { companyName, companyLogo, primaryColor } = useBrand();

  if (companyLogo) {
    return (
      <Box
        component="img"
        src={companyLogo}
        alt={companyName || 'Logo'}
        sx={{
          width: 32,
          height: 32,
          borderRadius: '8px',
          objectFit: 'contain',
          bgcolor: '#ffffff',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          flexShrink: 0
        }}
      />
    );
  }

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
  );
}
