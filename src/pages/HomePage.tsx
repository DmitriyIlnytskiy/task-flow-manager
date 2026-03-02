// src/pages/HomePage.tsx
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Button, Box, Paper, Stack } from '@mui/material';

export default function HomePage() {
  return (
    // The page-container class applies our smooth fade-in animation!
    <Container maxWidth="md" className="page-container" sx={{ mt: 10, textAlign: 'center' }}>
      
      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: 4, md: 8 }, // Responsive padding: smaller on phones, bigger on desktops
          borderRadius: 4, 
          background: 'rgba(255, 255, 255, 0.85)', // Semi-transparent white
          backdropFilter: 'blur(12px)', // Gives it that modern "frosted glass" look
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)' // Soft, large shadow
        }}
      >
        <Box sx={{ mb: 6 }}>
          <Typography variant="h2" component="h1" fontWeight="900" color="primary" gutterBottom>
            Task Flow Manager
          </Typography>
          
          <Typography variant="h5" color="text.secondary" sx={{ mb: 3, fontWeight: 500 }}>
            Master your workflow and conquer your projects.
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.7, fontSize: '1.1rem' }}>
            Welcome to your personal productivity engine. Built with React and Material-UI, 
            this dashboard provides a seamless, strictly-typed environment to track your 
            priorities, manage dependencies, and never miss a deadline.
          </Typography>
        </Box>

        {/* Stack arranges our buttons in a row on desktop, and a column on mobile */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
          <Button
            component={RouterLink}
            to="/projects"
            variant="contained"
            size="large"
            sx={{ 
              px: 4, 
              py: 1.5, 
              fontSize: '1.1rem', 
              borderRadius: 3,
              textTransform: 'none', // Keeps the text from being ALL CAPS
              fontWeight: 'bold',
              boxShadow: '0 8px 16px rgba(25, 118, 210, 0.3)' // Glowing blue shadow
            }}
          >
            Open Dashboard
          </Button>
          
          <Button
            component={RouterLink}
            to="/about"
            variant="outlined"
            size="large"
            sx={{ 
              px: 4, 
              py: 1.5, 
              fontSize: '1.1rem', 
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: 'bold',
              borderWidth: 2,
              '&:hover': { borderWidth: 2 } // Keeps the border thick when hovering
            }}
          >
            Learn More
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}