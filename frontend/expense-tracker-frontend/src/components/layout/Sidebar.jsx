import { NavLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Stack,
} from '@mui/material';
import SpaceDashboardRoundedIcon from '@mui/icons-material/SpaceDashboardRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import SavingsRoundedIcon from '@mui/icons-material/SavingsRounded';
import PieChartRoundedIcon from '@mui/icons-material/PieChartRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import useAuth from '../../hooks/useAuth';

export const DRAWER_WIDTH = 264;

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: SpaceDashboardRoundedIcon },
  { label: 'Expenses', to: '/expenses', icon: ReceiptLongRoundedIcon },
  { label: 'Income', to: '/income', icon: SavingsRoundedIcon },
  { label: 'Categories', to: '/categories', icon: CategoryRoundedIcon },
  { label: 'Budget', to: '/budget', icon: PieChartRoundedIcon },
  { label: 'Profile', to: '/profile', icon: PersonRoundedIcon },
];

const Sidebar = ({ mobileOpen, onClose, variant = 'permanent' }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const content = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar sx={{ px: 3, py: 2.5 }}>
        <Stack direction="row" alignItems="center" spacing={1.25}>
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #0D9488, #5EEAD4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: '"JetBrains Mono", monospace',
              fontWeight: 700,
              color: '#0B1120',
            }}
          >
            ₹
          </Box>
          <Typography variant="h6" sx={{ color: '#F8FAFC', letterSpacing: 0.2 }}>
            Ledgerly
          </Typography>
        </Stack>
      </Toolbar>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />
      <List sx={{ flex: 1, px: 2, py: 2 }}>
        {navItems.map(({ label, to, icon: Icon }) => (
          <ListItemButton
            key={to}
            component={NavLink}
            to={to}
            onClick={onClose}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              color: 'rgba(233,237,245,0.75)',
              '&.active': {
                backgroundColor: 'rgba(13,148,136,0.16)',
                color: '#5EEAD4',
                '& .MuiListItemIcon-root': { color: '#5EEAD4' },
              },
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.06)' },
            }}
          >
            <ListItemIcon sx={{ minWidth: 38, color: 'inherit' }}>
              <Icon fontSize="small" />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontSize: 14, fontWeight: 600 }} primary={label} />
          </ListItemButton>
        ))}
      </List>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />
      <List sx={{ px: 2, py: 1.5 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            color: 'rgba(233,237,245,0.75)',
            '&:hover': { backgroundColor: 'rgba(225,29,72,0.12)', color: '#FB7185' },
          }}
        >
          <ListItemIcon sx={{ minWidth: 38, color: 'inherit' }}>
            <LogoutRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: 14, fontWeight: 600 }} primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  );

  if (variant === 'temporary') {
    return (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH },
        }}
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' },
      }}
      open
    >
      {content}
    </Drawer>
  );
};

export default Sidebar;
