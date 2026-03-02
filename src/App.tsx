// src/App.tsx
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage'; // Import the new page!
import './App.css'; // Import our cool styles!

export default function App() {
  return (
    <div>
      {/* Updated Navbar using our new CSS classes */}
      <nav className="main-nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/projects" className="nav-link">Dashboard</Link>
        <Link to="/about" className="nav-link">About</Link>
      </nav>
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
    </div>
  );
}