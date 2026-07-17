import { createTheme } from '@mui/material/styles';

// Design tokens — "Ledgerly"
// A finance dashboard should feel precise, calm, and legible — like a well-kept
// ledger, not a generic admin template. Numbers get a monospace treatment
// (JetBrains Mono) everywhere they appear so amounts always read as data,
// distinct from the Plus Jakarta Sans display type used for headings and the
// Inter body face used for everything else.

export const tokens = {
  ink: '#0B1120', // near-black navy, dark surfaces
  surfaceDark: '#111A2E',
  surfaceDarkAlt: '#16213A',
  teal: '#0D9488', // primary — growth / balance
  tealLight: '#5EEAD4',
  amber: '#F59E0B', // budget / attention
  rose: '#E11D48', // expense / negative
  emerald: '#10B981', // income / positive
  slate: '#64748B',
  bg: '#F6F7FB',
  surface: '#FFFFFF',
  border: '#E5E8F0',
  textPrimary: '#0F172A',
  textSecondary: '#5B657A',
};

export const getTheme = (mode = 'light') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: tokens.teal,
        light: tokens.tealLight,
        dark: '#0B7A70',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: tokens.amber,
        contrastText: '#0F172A',
      },
      error: { main: tokens.rose },
      success: { main: tokens.emerald },
      warning: { main: tokens.amber },
      background:
        mode === 'dark'
          ? { default: tokens.ink, paper: tokens.surfaceDark }
          : { default: tokens.bg, paper: tokens.surface },
      text:
        mode === 'dark'
          ? { primary: '#E9EDF5', secondary: '#96A2B8' }
          : { primary: tokens.textPrimary, secondary: tokens.textSecondary },
      divider: mode === 'dark' ? 'rgba(233,237,245,0.08)' : tokens.border,
    },
    shape: { borderRadius: 14 },
    typography: {
      fontFamily: '"Inter", "Plus Jakarta Sans", "Helvetica Neue", Arial, sans-serif',
      h1: { fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800 },
      h2: { fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800 },
      h3: { fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700 },
      h4: { fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700 },
      h5: { fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700 },
      h6: { fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600 },
      button: { fontWeight: 600, textTransform: 'none' },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor: `${tokens.slate} transparent`,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none' },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: 'none',
          }),
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 10, paddingInline: 16 },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 600 },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: ({ theme }) => ({
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: 0.4,
            textTransform: 'uppercase',
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.mode === 'dark' ? tokens.surfaceDarkAlt : '#FAFBFD',
          }),
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: tokens.ink,
            color: '#E9EDF5',
            borderRight: 'none',
          },
        },
      },
    },
  });

export default getTheme;
