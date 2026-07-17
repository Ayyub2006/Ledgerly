import { useMemo, useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getTheme } from './theme/theme';
import ColorModeContext from './context/ColorModeContext';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import AppRoutes from './routes/AppRoutes';

function App() {
  const [mode, setMode] = useState(() => localStorage.getItem('colorMode') || 'light');

  useEffect(() => {
    localStorage.setItem('colorMode', mode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
    }),
    [mode]
  );

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ErrorBoundary>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <AppRoutes />
            <ToastContainer position="top-right" autoClose={3500} theme={mode} newestOnTop />
          </AuthProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
