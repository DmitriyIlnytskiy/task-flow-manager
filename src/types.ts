// src/types.ts

export type TaskStatus = 'backlog' | 'todo' | 'in-progress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  status: TaskStatus;
  priority: TaskPriority;
  tags: string[];
  dependencies: string[];
}

export interface AppState {
  tasks: Task[];
  activeStatusFilter: TaskStatus | 'all';
  activePriorityFilter: TaskPriority | 'all';
}