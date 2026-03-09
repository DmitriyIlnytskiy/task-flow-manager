# 1. App Overview
This is a Task Manager application. Its core purpose is to track tasks, priorities, and statuses. The core entities are `Task` objects which flow through various states (todo, in-progress, done).

# 2. State Management Approach
We are using **Zustand** for global state management. It was chosen because it provides a simple, hooks-based API without the heavy boilerplate of Redux, perfectly fitting our declarative architecture. The store file lives in `src/store/taskStore.ts`. Form inputs (like typing a new task name) are kept as local component state using `useState`.

# 3. State Shape
```typescript
interface TaskStore {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  addTask: (title: string, priority: TaskPriority) => void;
  updateStatus: (id: string, newStatus: TaskStatus) => void;
}