import { Box, Typography, Button, Stack } from '@mui/material';

const ServerError = ({ onRetry }) => (
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
    <Typography className="mono-figure" sx={{ fontSize: 96, fontWeight: 700, color: 'error.main', lineHeight: 1 }}>
      500
    </Typography>
    <Typography variant="h5" fontWeight={800} sx={{ mt: 2 }}>
      Something went wrong on our end
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 360 }}>
      Please try again in a moment. If this keeps happening, check that the backend server is running.
    </Typography>
    <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
      <Button variant="contained" onClick={onRetry || (() => window.location.reload())}>
        Try again
      </Button>
    </Stack>
  </Box>
);

export default ServerError;
