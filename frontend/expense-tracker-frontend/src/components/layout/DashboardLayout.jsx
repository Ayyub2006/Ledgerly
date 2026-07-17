import { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar, { DRAWER_WIDTH } from './Sidebar';
import Navbar from './Navbar';

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/expenses': 'Expenses',
  '/income': 'Income',
  '/categories': 'Categories',
  '/budget': 'Budget',
  '/profile': 'Profile',
};

const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Ledgerly';

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar onMenuClick={() => setMobileOpen(true)} title={title} />
      <Sidebar variant="permanent" />
      <Sidebar variant="temporary" mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          px: { xs: 2, sm: 3, md: 4 },
          pb: 6,
        }}
      >
        <Toolbar />
        <Box sx={{ pt: 2 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
