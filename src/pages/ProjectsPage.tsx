// src/pages/ProjectsPage.tsx
import { Link } from 'react-router-dom';
import type { Task } from '../types';

export default function ProjectsPage() {
  const sampleTasks: Task[] = [
    {
      id: '1',
      title: 'Assemble LiFePO4 power system',
      description: 'Connect cells, test voltages, and wire the BMS',
      status: 'in-progress',
      priority: 'high',
      tags: ['electronics', 'power'],
      dependencies: []
    },
    {
      id: '2',
      title: 'Understand React.js',
      description: 'learn new language',
      status: 'todo',
      priority: 'urgent',
      tags: ['React.js', 'coding'],
      dependencies: ['3']
    }
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Task Dashboard</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {sampleTasks.map(task => (
          <div key={task.id} style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>{task.title}</h3>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#555' }}>
              {task.description}
            </p>
            <div style={{ fontSize: '0.9rem' }}>
              <strong>Status:</strong> {task.status} | <strong>Priority:</strong> {task.priority}
            </div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#0066cc' }}>
              Tags: {task.tags.join(', ')}
            </div>
          </div>
        ))}
      </div>
      <br />
      <Link to="/" style={{ marginTop: '1rem', display: 'inline-block' }}>Back to Home</Link>
    </div>
  );
}