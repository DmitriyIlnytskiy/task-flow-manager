import { create } from 'zustand';
import type { TaskStatus, TaskPriority } from '../types'; 

// 1. Define the shape of our global backpack
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
  
  addTask: (title: string, description: string, priority: TaskPriority, dueDate: string) => void;
  updateStatus: (id: string, newStatus: TaskStatus) => void;
  deleteTask: (id: string) => void;
}

// 2. Create the actual store
export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  loading: false,
  error: null,

  // Operation 1: Add a task
  addTask: (title, description, priority, dueDate) => 
    set((state) => ({
      tasks: [...state.tasks, { 
        id: crypto.randomUUID(), 
        title, 
        description,  
        status: 'todo', 
        priority,
        dueDate,       
        tags: []      
      }]
    })),

  // Operation 2: Update a task's status
  updateStatus: (id, newStatus) =>
    set((state) => ({
      tasks: state.tasks.map((task) => 
        task.id === id ? { ...task, status: newStatus } : task
      )
    })),

    // Delete
    deleteTask: (id) =>
  set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== id)
  }))
}));