import { Box, Stack, Typography, Paper } from '@mui/material';

const stats = [
  { label: 'Tracked this month', value: '₹48,210' },
  { label: 'Budgets kept on target', value: '87%' },
  { label: 'Categories organized', value: '12' },
];

const AuthLayout = ({ children, eyebrow, title, subtitle }) => (
  <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      bgcolor: '#0B1120',
    }}
  >
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '46%',
        p: 6,
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(120% 120% at 0% 0%, #16213A 0%, #0B1120 60%)',
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1.25}>
        <Box
          sx={{
            width: 36,
            height: 36,
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
        <Typography variant="h6" sx={{ color: '#F8FAFC' }}>
          Ledgerly
        </Typography>
      </Stack>

      <Box>
        <Typography
          variant="h3"
          sx={{
            color: '#F8FAFC',
            fontSize: { md: 34, lg: 40 },
            lineHeight: 1.15,
            maxWidth: 440,
          }}
        >
          Every rupee, accounted for.
        </Typography>
        <Typography sx={{ color: 'rgba(233,237,245,0.6)', mt: 2, maxWidth: 420 }}>
          Track expenses and income, set monthly budgets, and see exactly where your
          money goes — in one calm, organized ledger.
        </Typography>

        <Stack direction="row" spacing={3} sx={{ mt: 5 }}>
          {stats.map((s) => (
            <Paper
              key={s.label}
              sx={{
                bgcolor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 3,
                px: 2,
                py: 1.5,
                minWidth: 120,
              }}
            >
              <Typography className="amount" sx={{ color: '#5EEAD4', fontWeight: 700, fontSize: 18 }}>
                {s.value}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(233,237,245,0.55)' }}>
                {s.label}
              </Typography>
            </Paper>
          ))}
        </Stack>
      </Box>

      <Typography variant="caption" sx={{ color: 'rgba(233,237,245,0.35)' }}>
        © {new Date().getFullYear()} Ledgerly. Built for people who like their numbers tidy.
      </Typography>
    </Box>

    <Box
      sx={{
        flex: 1,
        bgcolor: 'background.paper',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 3, sm: 6 },
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 380 }}>
        {eyebrow && (
          <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 1 }}>
            {eyebrow}
          </Typography>
        )}
        <Typography variant="h4" sx={{ mt: 0.5, fontSize: { xs: 26, sm: 30 } }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3.5 }}>
            {subtitle}
          </Typography>
        )}
        {!subtitle && <Box sx={{ mb: 3.5 }} />}
        {children}
      </Box>
    </Box>
  </Box>
);

export default AuthLayout;
