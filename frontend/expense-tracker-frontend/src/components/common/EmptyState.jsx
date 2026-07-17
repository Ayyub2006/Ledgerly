import { Box, Typography, Button } from '@mui/material';
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';

const EmptyState = ({
  icon: Icon = InboxRoundedIcon,
  title = 'Nothing here yet',
  description = 'Add your first entry to see it show up here.',
  actionLabel,
  onAction,
}) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      py: 6,
      px: 3,
      color: 'text.secondary',
    }}
  >
    <Box
      sx={{
        width: 56,
        height: 56,
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'action.hover',
        mb: 2,
      }}
    >
      <Icon fontSize="medium" color="disabled" />
    </Box>
    <Typography variant="subtitle1" fontWeight={700} color="text.primary">
      {title}
    </Typography>
    <Typography variant="body2" sx={{ maxWidth: 320, mt: 0.5 }}>
      {description}
    </Typography>
    {actionLabel && onAction && (
      <Button onClick={onAction} variant="contained" size="small" sx={{ mt: 2.5 }}>
        {actionLabel}
      </Button>
    )}
  </Box>
);

export default EmptyState;
