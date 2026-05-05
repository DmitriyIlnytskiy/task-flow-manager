// src/pages/ProjectsPage.tsx
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTaskStore } from '../store/taskStore';
import { useSettingsStore } from '../store/settingsStore';
import type { Task } from '../store/taskStore';
import type { TaskStatus, TaskPriority } from '../types';
import '../App.css'; 
import { 
  Box, Typography, Card, CardContent, Select, MenuItem, 
  Button, Chip, Stack, Dialog, DialogTitle, DialogContent, 
  DialogActions, TextField, InputLabel, FormControl
} from '@mui/material';

export default function ProjectsPage() {
  
  // 1. GLOBAL STATE
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const updateStatus = useTaskStore((state) => state.updateStatus);
  const updateTask = useTaskStore((state) => state.updateTask); // NEW: imported for full edits
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const loading = useTaskStore((state) => state.loading);
  const loadTasks = useTaskStore((state) => state.loadTasks);
  const { compactMode } = useSettingsStore();

  // FETCH DATA ON LOAD
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // 2. LOCAL UI & FORM STATE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null); // NEW: Tracks if we are editing
  
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

  // Advanced Filtering
  const displayedTasks = tasks.filter(task => {
    if (!task || typeof task !== 'object') return false;

    const matchesStatus = activeStatusFilter === 'all' || task.status === activeStatusFilter;
    const matchesPriority = activePriorityFilter === 'all' || task.priority === activePriorityFilter;
    
    const safeTitle = String(task.title || '');
    const safeDesc = String(task.description || '');
    
    const matchesSearch = safeTitle.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          safeDesc.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesPriority && matchesSearch;
  });

  // Modal Handlers
  const handleOpenCreateModal = () => {
    setEditingTaskId(null);
    setNewTitle('');
    setNewDescription('');
    setNewPriority('medium');
    setNewDueDate('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task: Task) => {
    setEditingTaskId(task.id);
    setNewTitle(task.title);
    setNewDescription(task.description || '');
    setNewPriority(task.priority);
    setNewDueDate(task.dueDate || '');
    setIsModalOpen(true);
  };

  const handleSaveSubmit = () => {
    if (newTitle.trim() !== '') {
      if (editingTaskId) {
        // Edit existing task
        updateTask(editingTaskId, {
          title: newTitle,
          description: newDescription,
          priority: newPriority,
          dueDate: newDueDate
        });
      } else {
        // Create new task
        addTask(newTitle, newDescription, newPriority, newDueDate); 
      }
      setIsModalOpen(false);
    }
  };

  return (
    <Box className="dashboard-container" sx={{ p: 4, maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Task Dashboard
      </Typography>

      {loading && <Typography color="primary" sx={{ mb: 2 }}>Syncing with database...</Typography>}
      
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

        <Button variant="contained" color="primary" onClick={handleOpenCreateModal}>
          + Create Task
        </Button>
      </Stack>

      {/* Reusable Modal for Create AND Edit */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingTaskId ? 'Edit Task' : 'Create New Task'}</DialogTitle>
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
          <Button onClick={handleSaveSubmit} variant="contained" disabled={!newTitle.trim()}>
            {editingTaskId ? 'Save Changes' : 'Save Task'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Task List */}
      <Stack spacing={compactMode ? 1 : 2}>
        {displayedTasks.map(task => {
          const overdue = isOverdue(task.dueDate) && task.status !== 'done';
          return (
            <Card 
              key={task.id} 
              variant="outlined" 
              className="task-card" 
              sx={{ borderColor: overdue ? 'error.main' : 'divider', bgcolor: overdue ? 'error.light' : 'background.paper' }}
            >
              {/* 1. AGGRESSIVE PADDING REDUCTION */}
              <CardContent sx={{ 
                p: compactMode ? 1.5 : 3, 
                '&:last-child': { pb: compactMode ? 1.5 : 3 } 
              }}>
                
                {/* 2. SHRINK GAP BETWEEN LEFT TEXT AND RIGHT BUTTONS */}
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="flex-start" spacing={compactMode ? 1 : 2}>
                  
                  <Box sx={{ flexGrow: 1 }}>
                    {/* Shrink the title slightly in compact mode */}
                    <Typography variant={compactMode ? "subtitle1" : "h6"} color={overdue ? 'error' : 'text.primary'} fontWeight="bold">
                      {task.title}
                    </Typography>
                    
                    {/* Shrink margin below description */}
                    <Typography variant="body2" color="text.secondary" sx={{ mb: compactMode ? 0.5 : 1.5 }}>
                      {task.description || 'No description provided.'}
                    </Typography>
                    
                    {/* Shrink margin below chips */}
                    <Stack direction="row" alignItems="center" sx={{ mb: compactMode ? 0.5 : 1.5, flexWrap: 'wrap', gap: 1 }}>
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
                  </Box>

                  {/* Right Side Action Buttons */}
                  <Stack spacing={compactMode ? 0.5 : 1} direction={{ xs: 'row', sm: 'column' }} flexWrap="wrap" sx={{ minWidth: '120px' }}>
                    
                    {task.status === 'todo' && (
                      <Button size="small" variant="contained" color="info" onClick={() => updateStatus(task.id, 'in-progress')}>
                        Start
                      </Button>
                    )}

                    {task.status !== 'done' ? (
                      <Button size="small" variant="contained" color="success" onClick={() => updateStatus(task.id, 'done')}>
                        Mark Done
                      </Button>
                    ) : (
                      <Button size="small" variant="outlined" color="warning" onClick={() => updateStatus(task.id, 'todo')}>
                        Undo
                      </Button>
                    )}

                    <Button size="small" variant="outlined" color="primary" onClick={() => handleOpenEditModal(task)}>
                      Edit
                    </Button>

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