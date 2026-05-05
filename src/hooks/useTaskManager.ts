// src/hooks/useTaskManager.ts
import { useState, useCallback, useEffect } from 'react';
import type { TaskStatus, TaskPriority, AppState } from '../types';
import taskData from '../data/tasks1.json';

const STORAGE_KEY = 'task-flow-data';

export function useTaskManager() {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const initialTasks = saved ? JSON.parse(saved) : taskData;
    return {
      tasks: initialTasks,
      activeStatusFilter: 'all',
      activePriorityFilter: 'all',
      searchQuery: '' 
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
  }, [state.tasks]);

  const addTask = useCallback((
    title: string, 
    description: string = '', 
    priority: TaskPriority = 'medium',
    dueDate?: string
  ) => {
    setState(prev => ({
      ...prev,
      tasks: [...prev.tasks, {
        id: crypto.randomUUID(),
        title,
        description,
        status: 'todo',
        priority,
        tags: [],
        dependencies: [],
        dueDate
      }]
    }));
  }, []);

  const updateStatus = useCallback((taskId: string, newStatus: TaskStatus) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    }));
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.filter(task => task.id !== taskId)
    }));
  }, []);

  const setStatusFilter = useCallback((status: TaskStatus | 'all') => {
    setState(prev => ({ ...prev, activeStatusFilter: status }));
  }, []);

  const setPriorityFilter = useCallback((priority: TaskPriority | 'all') => {
    setState(prev => ({ ...prev, activePriorityFilter: priority }));
  }, []);

  // NEW: Operation to update the search query
  const setSearchQuery = useCallback((query: string) => {
    setState(prev => ({ ...prev, searchQuery: query }));
  }, []);

  return {
    state,
    addTask,
    updateStatus,
    deleteTask,
    setStatusFilter,
    setPriorityFilter,
    setSearchQuery 
  };
}