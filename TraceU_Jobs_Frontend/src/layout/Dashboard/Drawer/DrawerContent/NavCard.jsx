import { useNavigate, useLocation } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import MainCard from 'components/MainCard';

// icons
import CrownOutlined from '@ant-design/icons/CrownOutlined';
import BankOutlined from '@ant-design/icons/BankOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import SwapOutlined from '@ant-design/icons/SwapOutlined';

// ==============================|| DRAWER CONTENT - ACTIVE PORTAL CARD ||============================== //

export default function NavCard() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const isBuiltInAdminPage =
    path.startsWith('/typography') ||
    path.startsWith('/color') ||
    path.startsWith('/shadow') ||
    path.startsWith('/sample-page') ||
    path.startsWith('/dashboard/default') ||
    path.startsWith('/dashboard') ||
    path.startsWith('/admin');

  let portal = 'candidate';
  if (path.includes('/admin') || isBuiltInAdminPage) {
    portal = 'admin';
  } else if (path.includes('/hr') || path.includes('/employer')) {
    portal = 'employer';
  } else if (path.includes('/candidate')) {
    portal = 'candidate';
  } else {
    portal = localStorage.getItem('traceu_current_portal') || 'candidate';
  }

  const portalConfig = {
    admin: {
      name: 'Admin Portal',
      role: 'Platform Administrator',
      icon: <CrownOutlined style={{ fontSize: 20, color: '#6929e2' }} />,
      bg: '#f3edff'
    },
    employer: {
      name: 'Company Portal',
      role: 'HR & Recruiter Account',
      icon: <BankOutlined style={{ fontSize: 20, color: '#6929e2' }} />,
      bg: '#f3edff'
    },
    candidate: {
      name: 'Candidate Portal',
      role: 'Job Seeker Account',
      icon: <UserOutlined style={{ fontSize: 20, color: '#2563eb' }} />,
      bg: '#eff6ff'
    }
  }[portal] || {
    name: 'Candidate Portal',
    role: 'Job Seeker Account',
    icon: <UserOutlined style={{ fontSize: 20, color: '#2563eb' }} />,
    bg: '#eff6ff'
  };

  if (portal === 'employer' || portal === 'admin') {
    return null;
  }

  return (
    <MainCard sx={{ bgcolor: '#fafbff', m: 2, borderRadius: '16px', border: '1px solid #ebd9ff' }}>
      <Stack spacing={1.5} alignItems="center" textAlign="center">
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: '12px',
            bgcolor: portalConfig.bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {portalConfig.icon}
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#111827' }}>
            {portalConfig.name}
          </Typography>
          <Typography variant="caption" sx={{ color: '#6b7280', display: 'block' }}>
            {portalConfig.role}
          </Typography>
        </Box>
        <Button
          fullWidth
          size="small"
          variant="outlined"
          startIcon={<SwapOutlined />}
          onClick={() => navigate('/')}
          sx={{
            fontSize: 12,
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: '8px',
            borderColor: '#d1d5db',
            color: '#4b5563',
            '&:hover': {
              borderColor: '#6929e2',
              color: '#6929e2',
              bgcolor: '#ffffff'
            }
          }}
        >
          Switch Portal
        </Button>
      </Stack>
    </MainCard>
  );
}
