import { useMemo } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useSettingsStore } from './store/settingsStore';

import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import SettingsPage from './pages/SettingsPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  // Pull the active settings from Zustand
  const { darkMode, fontSize } = useSettingsStore();

  // Re-calculate the theme only when darkMode or fontSize changes
  const theme = useMemo(() => {
    const sizeMap = {
      small: 12,
      medium: 14,
      large: 18 // Exaggerated slightly so the change is visually obvious
    };

    return createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
        primary: {
          main: darkMode ? '#90caf9' : '#1976d2', // Lighter blue for dark mode
        },
        background: {
          default: darkMode ? '#121212' : '#f0f4f8', // Soft gray for light mode, deep black for dark
          paper: darkMode ? '#1e1e1e' : '#ffffff',
        }
      },
      typography: {
        fontSize: sizeMap[fontSize],
      },
    });
  }, [darkMode, fontSize]);

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kicks in the background color and default text colors globally */}
      <CssBaseline /> 
      
      {/* The App Shell Navigation Bar */}
      <AppBar position="static" color="primary" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Task Flow
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/projects">Dashboard</Button>
          <Button color="inherit" component={Link} to="/settings">Settings</Button>
          <Button color="inherit" component={Link} to="/about">About</Button>
        </Toolbar>
      </AppBar>

      {/* The Page Content */}
      <Box sx={{ pb: 5 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}