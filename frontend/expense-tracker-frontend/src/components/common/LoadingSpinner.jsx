import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingSpinner = ({ label = 'Loading…', minHeight = 240 }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 1.5,
      minHeight,
      width: '100%',
    }}
  >
    <CircularProgress size={30} thickness={4} />
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
  </Box>
);

export default LoadingSpinner;
