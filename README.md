# Task Flow Manager

## Overview
This is the frontend implementation of my Task Flow Manager. For **Project 4**, the application's architecture has evolved from local component state to a **global state management architecture**. The application now utilizes **Zustand** for lightweight, predictable global state, separating client-side UI state from simulated server state. It also introduces a dedicated API service layer and strict AI agent instructions.

## Core Entities & Types
All data contracts are strictly defined in `src/types.ts` and `src/store/taskStore.ts`:
* **Task**: The primary entity featuring union types for `TaskStatus` (todo, in-progress, done) and `TaskPriority` (low, medium, high, urgent). It also tracks `tags`, `description`, and `dueDate`.
* **TaskStore**: The global state interface that holds the `tasks` array, alongside required `loading` and `error` states to prepare for future async persistence.

## Project 4: State Management & Architecture

### 1. Global Store (`useTaskStore`)
Instead of prop-drilling or relying on complex local hooks, shared state is managed via Zustand.
* **addTask**: Immutably appends a new task to the global state.
* **updateStatus**: Immutably locates a specific task by ID and updates its status (supporting both "Mark Done" and "Undo" actions).
* **deleteTask**: Immutably removes a task from the global array.

### 2. Local vs. Global State Separation
Following the state colocation principle, pure UI state (like `searchQuery`, `activeStatusFilter`, and `isModalOpen`) remains securely locked inside the component via `useState`. Only the actual task data is elevated to the Zustand store.

### 3. API Service Layer
The application includes a strictly typed API contract in `src/services/api.ts`. This interface separates the data fetching logic from the UI and state store, currently utilizing Promises and `setTimeout` to return mock data, preparing the app for React Query and real database integration in Project 5.

### 4. Agent Instructions (`CLAUDE.md`)
To ensure predictable AI generation during the Agentic Development Loop, the project root contains a `CLAUDE.md` file detailing the architectural choices, state shape, API conventions, and a strict step-by-step feature addition template.

## Running the Application & Verifying Types
To run the local development server and verify the TypeScript contracts:
```bash
# Install dependencies (including Zustand and React Router)
npm install

# Verify strict TypeScript compilation (must return 0 errors)
npx tsc --noEmit

# Run the local development server
npm run dev