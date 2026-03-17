import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function SettingsPage() {
  return (
    <Box sx={{ p: 4, maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>Settings</Typography>
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            User preferences and database configurations will live here in future updates. 
            Currently, the app uses a Custom Async Persistence Layer.
          </Typography>
        </CardContent>
      </Card>
      <Button component={RouterLink} to="/" variant="contained">Back to Home</Button>
    </Box>
  );
}