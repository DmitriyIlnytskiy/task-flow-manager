// src/store/taskStore.ts
import { create } from 'zustand';
import { api } from '../services/api';
import type { TaskStatus, TaskPriority } from '../types';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  tags?: string[];
}

interface TaskStore {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  
  // Async actions
  loadTasks: () => Promise<void>;
  addTask: (title: string, description: string, priority: TaskPriority, dueDate: string) => Promise<void>;
  updateStatus: (id: string, newStatus: TaskStatus) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  loadTasks: async () => {
    set({ loading: true, error: null });
    try {
      const tasks = await api.fetchTasks();
      set({ tasks, loading: false });
    } catch (err) {
      set({ error: 'Failed to load tasks', loading: false });
    }
  },

  addTask: async (title, description, priority, dueDate) => {
    set({ loading: true, error: null });
    try {
      const newTask = await api.createTask({ 
        title, description, priority, dueDate, status: 'todo', tags: [] 
      });
      set((state) => ({ tasks: [...state.tasks, newTask], loading: false }));
    } catch (err) {
      set({ error: 'Failed to create task', loading: false });
    }
  },

  updateStatus: async (id, newStatus) => {
    set({ loading: true, error: null });
    try {
      await api.updateTaskStatus(id, newStatus);
      set((state) => ({
        tasks: state.tasks.map(t => t.id === id ? { ...t, status: newStatus } : t),
        loading: false
      }));
    } catch (err) {
      set({ error: 'Failed to update status', loading: false });
    }
  },

  deleteTask: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter(t => t.id !== id),
        loading: false
      }));
    } catch (err) {
      set({ error: 'Failed to delete task', loading: false });
    }
  }
}));