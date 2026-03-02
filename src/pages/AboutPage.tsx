// src/pages/AboutPage.tsx
import { Box, Typography, Card, CardContent, Container } from '@mui/material';

export default function AboutPage() {
  return (
    <Container maxWidth="md" className="page-container" sx={{ mt: 6 }}>
      <Card sx={{ borderRadius: 4, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
        <CardContent sx={{ p: 5 }}>
          <Typography variant="h3" gutterBottom fontWeight="bold" color="primary">
            About Task Flow Manager
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            A high-performance React application designed to organize, prioritize, and track complex projects.
          </Typography>
          
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Core Features
            </Typography>
            <ul>
              <li><Typography variant="body1"><strong>Advanced State Management:</strong> Utilizes custom React hooks for immutable data flows.</Typography></li>
              <li><Typography variant="body1"><strong>Persistent Storage:</strong> Automatically saves your workflow directly to your local browser memory.</Typography></li>
              <li><Typography variant="body1"><strong>Dynamic Filtering:</strong> Instantly sort tasks by status, priority, or custom search queries.</Typography></li>
              <li><Typography variant="body1"><strong>Strict Typing:</strong> Built on a rock-solid TypeScript foundation to prevent runtime errors.</Typography></li>
            </ul>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}