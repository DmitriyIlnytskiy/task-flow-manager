// src/App.tsx
import { Routes, Route } from 'react-router-dom'; // <-- Removed BrowserRouter from here
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import './App.css'; 

export default function App() {
  return (
    // Look, no <Router> tags! Just the Routes.
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}