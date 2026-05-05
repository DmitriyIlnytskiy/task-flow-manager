// src/services/api.ts
import type { Task } from '../store/taskStore';
import type { TaskStatus } from '../types';

const DB_KEY = 'task_flow_persistent_db';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 1. Foolproof ID generator (works on every browser/server)
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// 2. Self-healing DB reader
const readDB = (): Task[] => {
  try {
    const data = localStorage.getItem(DB_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) throw new Error("Not an array");
    return parsed;
  } catch (e) {
    console.error("Corrupted database detected. Resetting to empty.");
    localStorage.removeItem(DB_KEY); // Automatically fix the white screen issue!
    return [];
  }
};

export interface TaskApi {
  fetchTasks: () => Promise<Task[]>;
  createTask: (task: Omit<Task, 'id'>) => Promise<Task>;
  updateTaskStatus: (id: string, status: TaskStatus) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  updateTask: (id: string, updatedData: Partial<Task>) => Promise<Task>;
}

export const api: TaskApi = {
  fetchTasks: async () => {
    await delay(500);
    return readDB();
  },

  createTask: async (taskData) => {
    await delay(500);
    const newTask: Task = { ...taskData, id: generateId() };
    const tasks = readDB();
    tasks.push(newTask);
    localStorage.setItem(DB_KEY, JSON.stringify(tasks));
    return newTask;
  },

  updateTaskStatus: async (id, status) => {
    await delay(300);
    const tasks = readDB();
    const updatedTasks = tasks.map(t => t.id === id ? { ...t, status } : t);
    localStorage.setItem(DB_KEY, JSON.stringify(updatedTasks));
  },

  deleteTask: async (id) => {
    await delay(300);
    const tasks = readDB();
    const updatedTasks = tasks.filter(t => t.id !== id);
    localStorage.setItem(DB_KEY, JSON.stringify(updatedTasks));
  },

  updateTask: async (id, updatedData) => {
    await delay(300);
    const tasks = readDB();
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) throw new Error("Task not found");
    
    // Merge the old task data with whatever they edited
    const updatedTask = { ...tasks[taskIndex], ...updatedData };
    tasks[taskIndex] = updatedTask;
    
    localStorage.setItem(DB_KEY, JSON.stringify(tasks));
    return updatedTask;
  }
};