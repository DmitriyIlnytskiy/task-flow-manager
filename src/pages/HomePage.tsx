// src/pages/HomePage.tsx
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div>
      <h1>Task Flow Manager</h1>
      <p>Welcome to your personal project dashboard.</p>
      <Link to="/projects">View Active Projects</Link>
    </div>
  );
}