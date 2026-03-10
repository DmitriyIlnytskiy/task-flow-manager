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
# 4. API Conventions
API calls are completely separated from UI components and the Zustand store. They live in src/services/api.ts. We are currently using a plain fetch abstraction with Promises to return mock data (simulating server delays). In the future, this layer will be consumed by TanStack Query for server-state caching.

# 5. File Structure
/src/pages/: Top-level route components (e.g., HomePage, ProjectsPage).

/src/components/: Reusable UI elements.

/src/store/: Zustand global state definitions (taskStore.ts).

/src/services/: API interfaces and async fetching logic (api.ts).

/src/hooks/: Local custom hooks.

/src/types.ts: Global TypeScript interfaces and type unions.

# 6. Adding New Features
When adding a new feature, follow this exact sequence to maintain the unidirectional data flow:

Types: Add or update any necessary entity types in src/types.ts.

API: Add the API signature to src/services/api.ts and write a mock implementation.

State: Add the required state variables and actions to src/store/taskStore.ts.

UI Wire-up: Create or update the React component to consume the Zustand hook and trigger the action.