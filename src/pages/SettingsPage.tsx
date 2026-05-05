import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Container, Typography, Box, Paper, Stack, Switch, 
  Select, MenuItem, FormControl, InputLabel, Button, Divider,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@mui/material';
import { useSettingsStore } from '../store/settingsStore';

export default function SettingsPage() {
  const { 
    darkMode, toggleDarkMode, 
    fontSize, setFontSize,
    compactMode, toggleCompactMode 
  } = useSettingsStore();

  // State to control our new warning pop-up
  const [openWarning, setOpenWarning] = useState(false);

  const handleWipeData = () => {
    localStorage.removeItem('task_flow_persistent_db');
    window.location.reload(); 
  };

  return (
    <Container maxWidth="sm" className="page-container" sx={{ mt: 8 }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom textAlign="center">
        Settings
      </Typography>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
        <Stack spacing={4}>
          
          {/* Appearance Section */}
          <Box>
            <Typography variant="h6" color="primary" gutterBottom>Appearance</Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="body1">Dark Mode</Typography>
              <Switch checked={darkMode} onChange={toggleDarkMode} color="primary" />
            </Stack>

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body1">Compact Task View</Typography>
              <Switch checked={compactMode} onChange={toggleCompactMode} color="primary" />
            </Stack>
          </Box>

          {/* Typography Section */}
          <Box>
            <Typography variant="h6" color="primary" gutterBottom>Typography</Typography>
            <Divider sx={{ mb: 2 }} />
            
            <FormControl fullWidth size="small">
              <InputLabel>Interface Font Size</InputLabel>
              <Select 
                value={fontSize} 
                label="Interface Font Size"
                onChange={(e) => setFontSize(e.target.value as 'small' | 'medium' | 'large')}
              >
                <MenuItem value="small">Small</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="large">Large</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Danger Zone Section */}
          <Box>
            <Typography variant="h6" color="error" gutterBottom>Danger Zone</Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Permanently delete all tasks and reset the database. This action cannot be undone.
            </Typography>
            
            {/* Opens the custom Dialog instead of the browser alert */}
            <Button variant="outlined" color="error" fullWidth onClick={() => setOpenWarning(true)}>
              Wipe All Data
            </Button>
          </Box>

        </Stack>
      </Paper>

      <Box textAlign="center">
        <Button component={RouterLink} to="/" variant="text">
          Back to Home
        </Button>
      </Box>

      {/* The Custom Warning Modal */}
      <Dialog open={openWarning} onClose={() => setOpenWarning(false)}>
        <DialogTitle color="error" fontWeight="bold">Wipe Database?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you absolutely sure? This will permanently delete all of your tasks and reset your local database. <strong>This action cannot be undone.</strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenWarning(false)} variant="outlined">Cancel</Button>
          <Button onClick={handleWipeData} color="error" variant="contained">
            Yes, Delete Everything
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
}