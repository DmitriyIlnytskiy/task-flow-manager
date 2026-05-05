// src/pages/HomePage.tsx
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Button, Box, Paper, Stack } from '@mui/material';

export default function HomePage() {
  return (
    <Container maxWidth="md" className="page-container" sx={{ mt: 10 }}>
      
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 4, md: 8 }, 
          borderRadius: 4
          // We removed the hardcoded white background so it natively adapts to dark mode!
        }}
      >
        <Box sx={{ mb: 6 }}>
          <Typography variant="h2" component="h1" fontWeight="900" color="primary" gutterBottom>
            Task Flow Manager
          </Typography>
          
          <Typography variant="h5" color="text.secondary" sx={{ mb: 3, fontWeight: 500 }}>
            Master your workflow and conquer your projects.
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, lineHeight: 1.7, fontSize: '1.1rem' }}>
            Welcome to your personal productivity engine. Built with React and Material-UI, 
            this dashboard provides a seamless, strictly-typed environment to track your 
            priorities, manage dependencies, and never miss a deadline.
          </Typography>
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
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
              textTransform: 'none', 
              fontWeight: 'bold'
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
              '&:hover': { borderWidth: 2 } 
            }}
          >
            Learn More
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}