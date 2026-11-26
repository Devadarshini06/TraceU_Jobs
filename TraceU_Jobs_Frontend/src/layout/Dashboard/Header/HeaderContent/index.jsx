import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import ShopOutlined from '@ant-design/icons/ShopOutlined';
import DownOutlined from '@ant-design/icons/DownOutlined';

// project imports
import Search from './Search';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';
import { useBrand } from 'contexts/BrandContext';

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const location = useLocation();
  const navigate = useNavigate();
  const isHr = location.pathname.includes('/hr') || location.pathname.includes('/employer');
  const { companyName, companyLogo, primaryColor } = useBrand();

  return (
    <>
      {!downLG && <Search />}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}

      {/* Right Header Action Items: Notification, Company Selector, Profile */}
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ ml: 'auto', flexShrink: 0 }}>
        <Notification />

        {/* Company Selector for HR Portal matching design */}
        {isHr && !downLG && (
          <Box
            onClick={() => navigate('/hr/settings')}
            title="Configure Organization & Branding"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              height: 38,
              px: 1.6,
              borderRadius: '10px',
              bgcolor: '#FAFAFB',
              border: '1px solid #E5E7EB',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              userSelect: 'none',
              transition: 'all 0.15s ease',
              '&:hover': {
                bgcolor: '#F3F4F6',
                borderColor: primaryColor || '#530EF0'
              }
            }}
          >
            {companyLogo ? (
              <Box
                component="img"
                src={companyLogo}
                alt="Logo"
                sx={{ width: 20, height: 20, borderRadius: '4px', objectFit: 'contain' }}
              />
            ) : (
              <ShopOutlined style={{ color: primaryColor || '#530EF0', fontSize: 15, flexShrink: 0 }} />
            )}
            <Typography
              sx={{
                fontWeight: 700,
                color: '#111827',
                fontSize: 13,
                whiteSpace: 'nowrap',
                lineHeight: 1
              }}
            >
              {companyName || 'TraceU Technologies'}
            </Typography>
            <DownOutlined style={{ fontSize: 10, color: '#6B7280', flexShrink: 0 }} />
          </Box>
        )}

        {!downLG && <Profile />}
        {downLG && <MobileSection />}
      </Stack>
    </>
  );
}
