# 1. App Overview
This is a Task Manager application. Its core purpose is to track tasks, priorities, and statuses. The core entities are `Task` objects which flow through various states (todo, in-progress, done).

# 2. State Management Approach
We are using **Zustand** for global state management. It acts as a "thin hook" to hold our simulated server state (the tasks array, loading, and error states). The store file lives in `src/store/taskStore.ts`. Purely visual UI state (like search queries and modal visibility) remains localized in components using `useState` following the State Colocation principle.

# 3. State Shape
```typescript
interface TaskStore {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  loadTasks: () => Promise<void>;
  addTask: (title: string, description: string, priority: TaskPriority, dueDate: string) => Promise<void>;
  updateStatus: (id: string, newStatus: TaskStatus) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

# 4. API Conventions & Backend (Project 5)
Backend Choice: Custom Async Persistence Layer using browser storage.

Architecture: We follow the "Assemble First" principle. React components NEVER import persistence logic directly. All database interactions go through the strictly typed TaskApi interface in src/services/api.ts.

Async Behavior: The service module artificially simulates network latency using Promises. This ensures the UI properly handles loading states and is 100% ready to swap to a remote backend (like Supabase) without touching React component code.

Auth Approach: Authentication is skipped as it is not applicable to a single-user local task manager theme.

# 5. File Structure
/src/pages/: Top-level route components (e.g., HomePage, ProjectsPage).

/src/components/: Reusable UI elements.

/src/store/: Zustand global state definitions (taskStore.ts).

/src/services/: API interfaces, async fetching logic, and backend encapsulation (api.ts).

/src/hooks/: Local custom hooks.

/src/types.ts: Global TypeScript interfaces and type unions.

# 6. Adding New Features
When adding a new feature, follow this exact sequence to maintain unidirectional data flow:

Types: Add or update any necessary entity types in src/types.ts.

API: Add the async API signature to src/services/api.ts and write the persistence implementation.

State: Add the required state variables and async actions to src/store/taskStore.ts, ensuring loading and error states are handled.

UI Wire-up: Create or update the React component to consume the Zustand hook, trigger the action, and display the loading state if necessary.