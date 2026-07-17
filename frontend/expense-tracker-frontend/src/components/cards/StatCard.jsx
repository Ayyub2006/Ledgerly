import { Card, CardContent, Box, Typography, Stack } from '@mui/material';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';

/**
 * Reusable dashboard stat card.
 * Props: title, value (pre-formatted string), icon (component), color (palette key), trend (optional number, +/-)
 */
const StatCard = ({ title, value, icon: Icon, color = 'primary', trend }) => {
  const isPositive = typeof trend === 'number' ? trend >= 0 : null;

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2.75 }}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
          <Box>
            <Typography variant="body2" color="text.secondary" fontWeight={600}>
              {title}
            </Typography>
            <Typography
              className="amount"
              variant="h5"
              sx={{ mt: 0.75, fontWeight: 700, fontSize: { xs: 20, sm: 24 } }}
            >
              {value}
            </Typography>
          </Box>
          {Icon && (
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: (t) => `${t.palette[color]?.main || t.palette.primary.main}1F`,
                color: (t) => t.palette[color]?.main || t.palette.primary.main,
                flexShrink: 0,
              }}
            >
              <Icon fontSize="small" />
            </Box>
          )}
        </Stack>
        {typeof trend === 'number' && (
          <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 1.5 }}>
            {isPositive ? (
              <TrendingUpRoundedIcon fontSize="small" sx={{ color: 'success.main' }} />
            ) : (
              <TrendingDownRoundedIcon fontSize="small" sx={{ color: 'error.main' }} />
            )}
            <Typography
              variant="caption"
              fontWeight={700}
              sx={{ color: isPositive ? 'success.main' : 'error.main' }}
            >
              {Math.abs(trend).toFixed(1)}%
            </Typography>
            <Typography variant="caption" color="text.secondary">
              vs last month
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
