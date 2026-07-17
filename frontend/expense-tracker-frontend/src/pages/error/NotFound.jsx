import { Box, Typography, Button, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const NotFound = () => (
  <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'background.default',
      textAlign: 'center',
      px: 3,
    }}
  >
    <Typography className="mono-figure" sx={{ fontSize: 96, fontWeight: 700, color: 'primary.main', lineHeight: 1 }}>
      404
    </Typography>
    <Typography variant="h5" fontWeight={800} sx={{ mt: 2 }}>
      This page doesn't add up
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 360 }}>
      The page you're looking for doesn't exist or may have moved.
    </Typography>
    <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
      <Button component={RouterLink} to="/dashboard" variant="contained">
        Go to dashboard
      </Button>
    </Stack>
  </Box>
);

export default NotFound;
