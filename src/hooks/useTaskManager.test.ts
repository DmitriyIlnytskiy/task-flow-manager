// src/hooks/useTaskManager.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTaskManager } from './useTaskManager';

// Clear localStorage before every test so data doesn't leak between tests
beforeEach(() => {
  localStorage.clear();
});

describe('useTaskManager Custom Hook', () => {
  
  it('1. should initialize with default data and filters', () => {
    const { result } = renderHook(() => useTaskManager());
    
    expect(result.current.state.tasks.length).toBeGreaterThan(0);
    expect(result.current.state.activeStatusFilter).toBe('all');
    expect(result.current.state.activePriorityFilter).toBe('all');
    expect(result.current.state.searchQuery).toBe(''); // Tests our new search state!
  });

  it('2. should add a new task immutably with default status', () => {
    const { result } = renderHook(() => useTaskManager());
    const initialLength = result.current.state.tasks.length;

    act(() => {
      result.current.addTask('Test Task', 'Test Description', 'low');
    });

    expect(result.current.state.tasks).toHaveLength(initialLength + 1);
    const newTask = result.current.state.tasks[result.current.state.tasks.length - 1];
    expect(newTask.title).toBe('Test Task');
    expect(newTask.status).toBe('todo'); 
  });

  it('3. should update a task status immutably', () => {
    const { result } = renderHook(() => useTaskManager());

    act(() => { result.current.addTask('Task to Update'); });
    const taskId = result.current.state.tasks[result.current.state.tasks.length - 1].id;

    act(() => { result.current.updateStatus(taskId, 'done'); });

    const updatedTask = result.current.state.tasks.find(t => t.id === taskId);
    expect(updatedTask?.status).toBe('done');
  });

  it('4. should delete a task immutably', () => {
    const { result } = renderHook(() => useTaskManager());

    act(() => { result.current.addTask('Task to Delete'); });
    const initialLength = result.current.state.tasks.length;
    const taskId = result.current.state.tasks[initialLength - 1].id;

    act(() => { result.current.deleteTask(taskId); });

    expect(result.current.state.tasks).toHaveLength(initialLength - 1);
    expect(result.current.state.tasks.find(t => t.id === taskId)).toBeUndefined();
  });

  it('5. EDGE CASE: deleting a non-existent task should not mutate state', () => {
    const { result } = renderHook(() => useTaskManager());
    const initialLength = result.current.state.tasks.length;

    act(() => { result.current.deleteTask('fake-ghost-id-123'); });

    expect(result.current.state.tasks).toHaveLength(initialLength);
  });

  it('6. should update the search query', () => {
    const { result } = renderHook(() => useTaskManager());

    act(() => {
      result.current.setSearchQuery('Lanos'); // Testing our new operation
    });

    expect(result.current.state.searchQuery).toBe('Lanos');
  });
});