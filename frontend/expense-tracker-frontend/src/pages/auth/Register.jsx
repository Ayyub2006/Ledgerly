import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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

const Register = () => {
  const { register: registerUser, loading } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { name: '', email: '', password: '', confirmPassword: '' } });

  const password = watch('password');

  const onSubmit = async (values) => {
    setServerError('');
    try {
      await registerUser({ name: values.name, email: values.email, password: values.password });
      toast.success('Account created — please log in.');
      navigate('/login', { replace: true });
    } catch (err) {
      const msg = err?.response?.data?.message || 'Could not create account. Please try again.';
      setServerError(msg);
      toast.error(msg);
    }
  };

  return (
    <AuthLayout eyebrow="Get started" title="Create your account" subtitle="Set up your ledger in under a minute.">
      {serverError && (
        <Alert severity="error" sx={{ mb: 2.5 }}>
          {serverError}
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2.25}>
          <TextField
            label="Full name"
            fullWidth
            autoComplete="name"
            {...register('name', { required: 'Full name is required' })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
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
            autoComplete="new-password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Password must be at least 8 characters' },
            })}
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
          <TextField
            label="Confirm password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            autoComplete="new-password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) => value === password || 'Passwords do not match',
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          <Button type="submit" variant="contained" size="large" disabled={loading} sx={{ py: 1.25 }}>
            {loading ? 'Creating account…' : 'Create account'}
          </Button>
        </Stack>
      </form>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: 'center' }}>
        Already have an account?{' '}
        <Link component={RouterLink} to="/login" fontWeight={700} underline="hover">
          Log in
        </Link>
      </Typography>
    </AuthLayout>
  );
};

export default Register;
