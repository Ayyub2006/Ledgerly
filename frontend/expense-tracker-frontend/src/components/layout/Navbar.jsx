import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Badge,
  Tooltip,
  Divider,
  ListItemIcon,
} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import useAuth from '../../hooks/useAuth';
import { useColorMode } from '../../context/ColorModeContext';
import { initialsFromName } from '../../utils/formatters';
import { DRAWER_WIDTH } from './Sidebar';

const Navbar = ({ onMenuClick, title, notificationCount = 0 }) => {
  const { user, logout } = useAuth();
  const { mode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    setAnchorEl(null);
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      color="inherit"
      sx={{
        width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        ml: { md: `${DRAWER_WIDTH}px` },
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
        backdropFilter: 'blur(8px)',
      }}
    >
      <Toolbar sx={{ gap: 1 }}>
        <IconButton
          edge="start"
          onClick={onMenuClick}
          sx={{ display: { xs: 'inline-flex', md: 'none' } }}
        >
          <MenuRoundedIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, fontSize: 18 }}>
          {title}
        </Typography>

        <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
          <IconButton onClick={toggleColorMode}>
            {mode === 'dark' ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
          </IconButton>
        </Tooltip>

        <Tooltip title="Notifications">
          <IconButton>
            <Badge badgeContent={notificationCount} color="error">
              <NotificationsNoneRoundedIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        <Tooltip title="Account">
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ ml: 0.5 }}>
            <Avatar sx={{ width: 34, height: 34, bgcolor: 'primary.main', fontSize: 14, fontWeight: 700 }}>
              {initialsFromName(user?.name)}
            </Avatar>
          </IconButton>
        </Tooltip>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle2">{user?.name || 'User'}</Typography>
            <Typography variant="caption" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
          <Divider />
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              navigate('/profile');
            }}
          >
            <ListItemIcon>
              <PersonRoundedIcon fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutRoundedIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
