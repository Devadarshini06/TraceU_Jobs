import { useLocation } from 'react-router-dom';

// material-ui
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import NavGroup from './NavGroup';
import { getMenuItemsForPortal } from 'menu-items';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

export default function Navigation() {
  const location = useLocation();
  const path = location.pathname;

  // Determine active portal based on current route or saved preference
  const isBuiltInAdminPage =
    path.startsWith('/typography') ||
    path.startsWith('/color') ||
    path.startsWith('/shadow') ||
    path.startsWith('/sample-page') ||
    path.startsWith('/dashboard/default') ||
    path.startsWith('/dashboard') ||
    path.startsWith('/admin');

  let currentPortal = 'candidate';
  if (path.includes('/admin') || isBuiltInAdminPage) {
    currentPortal = 'admin';
  } else if (path.includes('/hr') || path.includes('/employer')) {
    currentPortal = 'employer';
  } else if (path.includes('/candidate')) {
    currentPortal = 'candidate';
  } else {
    currentPortal = localStorage.getItem('traceu_current_portal') || 'candidate';
  }

  // Get strictly the respective portal's menu items
  const portalItems = getMenuItemsForPortal(currentPortal);

  const navGroups = portalItems.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
}
