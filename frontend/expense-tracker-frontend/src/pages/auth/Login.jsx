import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Stack,
  InputAdornment,
  IconButton,
  Typography,
  Link,
  Alert,
} from '@mui/material';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import { toast } from 'react-toastify';
import AuthLayout from '../../components/layout/AuthLayout';
import useAuth from '../../hooks/useAuth';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: '', password: '' } });

  const onSubmit = async (values) => {
    setServerError('');
    try {
      await login(values);
      toast.success('Welcome back!');
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (err) {
      const msg =
        err?.response?.status === 401 || err?.response?.status === 403
          ? 'Invalid email or password.'
          : err?.response?.data?.message || 'Something went wrong. Please try again.';
      setServerError(msg);
      toast.error(msg);
    }
  };

  return (
    <AuthLayout eyebrow="Welcome back" title="Log in to Ledgerly" subtitle="Enter your details to access your dashboard.">
      {serverError && (
        <Alert severity="error" sx={{ mb: 2.5 }}>
          {serverError}
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2.25}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            autoComplete="email"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: emailPattern, message: 'Enter a valid email address' },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            autoComplete="current-password"
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((s) => !s)} edge="end" size="small">
                    {showPassword ? <VisibilityOffRoundedIcon fontSize="small" /> : <VisibilityRoundedIcon fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained" size="large" disabled={loading} sx={{ py: 1.25 }}>
            {loading ? 'Logging in…' : 'Log in'}
          </Button>
        </Stack>
      </form>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: 'center' }}>
        Don't have an account?{' '}
        <Link component={RouterLink} to="/register" fontWeight={700} underline="hover">
          Create one
        </Link>
      </Typography>
    </AuthLayout>
  );
};

export default Login;
