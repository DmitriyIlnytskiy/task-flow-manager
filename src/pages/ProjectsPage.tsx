// src/pages/ProjectsPage.tsx
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTaskStore } from '../store/taskStore';
import type { TaskStatus, TaskPriority } from '../types';
import '../App.css'; 
import { 
  Box, Typography, Card, CardContent, Select, MenuItem, 
  Button, Chip, Stack, Dialog, DialogTitle, DialogContent, 
  DialogActions, TextField, InputLabel, FormControl 
} from '@mui/material';

export default function ProjectsPage() {
  // 1. GLOBAL STATE (Zustand Backpack)
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const updateStatus = useTaskStore((state) => state.updateStatus);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  // 2. LOCAL UI & FORM STATE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState<TaskPriority>('medium');
  const [newDueDate, setNewDueDate] = useState('');

  // 3. LOCAL FILTER STATE
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStatusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [activePriorityFilter, setPriorityFilter] = useState<TaskPriority | 'all'>('all');

  const isOverdue = (dateString?: string) => {
    if (!dateString) return false;
    return new Date(dateString) < new Date();
  };

  // Advanced Filtering (Now using our local state variables!)
  const displayedTasks = tasks.filter(task => {
    const matchesStatus = activeStatusFilter === 'all' || task.status === activeStatusFilter;
    const matchesPriority = activePriorityFilter === 'all' || task.priority === activePriorityFilter;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const handleCreateSubmit = () => {
    if (newTitle.trim() !== '') {
      // We pass ALL the local state variables into our global action now!
      addTask(newTitle, newDescription, newPriority, newDueDate); 
      
      setNewTitle('');
      setNewDescription('');
      setNewPriority('medium');
      setNewDueDate('');
      setIsModalOpen(false);
    }
  };

  return (
    <Box className="dashboard-container" sx={{ p: 4, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Task Dashboard
      </Typography>
      
      {/* Top Controls Bar */}
      <Stack direction="row" spacing={2} sx={{ mb: 4, flexWrap: 'wrap' }}>
        
        <TextField 
          size="small" 
          placeholder="Search tasks..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ flexGrow: 1 }} 
        />

        <Select size="small" value={activeStatusFilter} onChange={(e) => setStatusFilter(e.target.value as TaskStatus | 'all')}>
          <MenuItem value="all">All Statuses</MenuItem>
          <MenuItem value="todo">To Do</MenuItem>
          <MenuItem value="in-progress">In Progress</MenuItem>
          <MenuItem value="done">Done</MenuItem>
        </Select>

        <Select size="small" value={activePriorityFilter} onChange={(e) => setPriorityFilter(e.target.value as TaskPriority | 'all')}>
          <MenuItem value="all">All Priorities</MenuItem>
          <MenuItem value="urgent">Urgent</MenuItem>
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="low">Low</MenuItem>
        </Select>

        <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
          + Create Task
        </Button>
      </Stack>

      {/* Modal Popup */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Task</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField label="Task Title" fullWidth value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            <TextField label="Description" fullWidth multiline rows={3} value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select value={newPriority} label="Priority" onChange={(e) => setNewPriority(e.target.value as TaskPriority)}>
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="urgent">Urgent</MenuItem>
              </Select>
            </FormControl>
            <TextField 
              label="Due Date" type="date" fullWidth value={newDueDate} 
              onChange={(e) => setNewDueDate(e.target.value)}
              InputLabelProps={{ shrink: true }} 
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateSubmit} variant="contained" disabled={!newTitle.trim()}>
            Save Task
          </Button>
        </DialogActions>
      </Dialog>

      {/* Task List */}
      <Stack spacing={2}>
        {displayedTasks.map(task => {
          const overdue = isOverdue(task.dueDate) && task.status !== 'done';
          return (
            <Card 
              key={task.id} 
              variant="outlined" 
              className="task-card" 
              sx={{ borderColor: overdue ? 'error.main' : 'divider', bgcolor: overdue ? 'error.light' : 'background.paper' }}
            >
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Typography variant="h6" color={overdue ? 'error' : 'text.primary'} fontWeight="bold">
                      {task.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                      {task.description || 'No description provided.'}
                    </Typography>
                    
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                      <Chip label={task.status.toUpperCase()} size="small" color={task.status === 'done' ? 'success' : 'default'} />
                      <Chip label={task.priority.toUpperCase()} size="small" color={task.priority === 'urgent' ? 'error' : 'primary'} variant="outlined" />
                      
                      {task.dueDate && (
                        <Chip 
                          label={`📅 Due: ${task.dueDate}`} 
                          size="small" 
                          color={overdue ? 'error' : 'default'} 
                          sx={{ fontWeight: 'bold' }}
                        />
                      )}
                    </Stack>

                    <Stack direction="row" spacing={1}>
                      {task.tags?.map(tag => (
                        <Chip key={tag} label={`#${tag}`} size="small" variant="outlined" sx={{ border: 'none', bgcolor: '#f0f0f0' }} />
                      ))}
                    </Stack>
                  </Box>

                  <Stack spacing={1}>
                    {/* Done button */}
                    {task.status !== 'done' ? (
                      <Button size="small" variant="contained" color="success" onClick={() => updateStatus(task.id, 'done')}>
                        Mark Done
                      </Button>
                    ) : (
                      /* Undo button! */
                      <Button size="small" variant="outlined" color="warning" onClick={() => updateStatus(task.id, 'todo')}>
                        Undo
                      </Button>
                    )}
                    <Button size="small" variant="outlined" color="error" onClick={() => deleteTask(task.id)}>
                      Delete
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          );
        })}
        {displayedTasks.length === 0 && (
          <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mt: 4 }}>
            No tasks match your filters or search.
          </Typography>
        )}
      </Stack>
      
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Button component={RouterLink} to="/" variant="text">Back to Home</Button>
      </Box>
    </Box>
  );
}