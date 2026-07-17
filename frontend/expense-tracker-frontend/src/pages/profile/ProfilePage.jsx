import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Stack, TextField, Button, Avatar, Alert, Divider } from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import { initialsFromName } from '../../utils/formatters';

const ProfilePage = () => {
  const { user, logout, updateStoredUser } = useAuth();
  const navigate = useNavigate();

  const profileForm = useForm({ defaultValues: { name: user?.name || '', email: user?.email || '' } });
  const passwordForm = useForm({ defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' } });

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const onProfileSubmit = (values) => {
    // The current backend doesn't expose a "update profile" endpoint yet
    // (only /api/auth/register and /api/auth/login exist). We keep the name
    // locally so the UI stays consistent, and surface that server-side
    // persistence is pending a backend endpoint.
    updateStoredUser({ name: values.name });
    toast.info("Saved locally — ask your backend team to add a profile-update endpoint to persist this.");
  };

  const onPasswordSubmit = () => {
    toast.info('Changing your password needs a backend endpoint that isn\'t available yet.');
    passwordForm.reset();
  };

  return (
    <Box sx={{ maxWidth: 720 }}>
      <Typography variant="h5" fontWeight={800} sx={{ mb: 2.5 }}>
        Profile
      </Typography>

      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, mb: 2.5 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main', fontSize: 20, fontWeight: 700 }}>
            {initialsFromName(user?.name)}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" fontWeight={700}>
              {user?.name || 'User'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
          <Button color="error" variant="outlined" startIcon={<LogoutRoundedIcon />} onClick={handleLogout}>
            Logout
          </Button>
        </Stack>
      </Paper>

      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, mb: 2.5 }}>
        <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
          Edit profile
        </Typography>
        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} noValidate>
          <Stack spacing={2}>
            <TextField label="Full name" fullWidth {...profileForm.register('name', { required: true })} />
            <TextField label="Email" fullWidth disabled value={user?.email || ''} helperText="Email changes aren't supported by the backend yet." />
            <Box>
              <Button type="submit" variant="contained">
                Save changes
              </Button>
            </Box>
          </Stack>
        </form>
      </Paper>

      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
          Change password
        </Typography>
        <Alert severity="info" sx={{ mb: 2 }}>
          This form is ready, but the backend doesn't expose a change-password endpoint yet — hook it up once one exists.
        </Alert>
        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} noValidate>
          <Stack spacing={2}>
            <TextField label="Current password" type="password" fullWidth {...passwordForm.register('currentPassword', { required: true })} />
            <Divider />
            <TextField
              label="New password"
              type="password"
              fullWidth
              {...passwordForm.register('newPassword', { required: true, minLength: 8 })}
            />
            <TextField
              label="Confirm new password"
              type="password"
              fullWidth
              {...passwordForm.register('confirmPassword', { required: true })}
            />
            <Box>
              <Button type="submit" variant="contained" color="secondary">
                Update password
              </Button>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default ProfilePage;
