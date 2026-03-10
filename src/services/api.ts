import type { Task } from '../store/taskStore';

// We define the contract for what the backend MUST provide
export interface TaskApi {
  fetchTasks: () => Promise<Task[]>;
  createTask: (title: string, priority: string) => Promise<Task>;
}

// Placeholder implementations that return mock data so the app compiles
export const api: TaskApi = {
  fetchTasks: async () => {
    // Simulating a network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: '1', title: 'task 1', status: 'todo', priority: 'high' },
          { id: '2', title: 'task 2', status: 'in-progress', priority: 'high' }
        ]);
      }, 1000);
    });
  },

  createTask: async (title, priority) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: crypto.randomUUID(),
          title,
          status: 'todo',
          priority: priority as any
        });
      }, 500);
    });
  }
};