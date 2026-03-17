# Task Flow Manager

## Overview
This is the frontend implementation of my Task Flow Manager. The application's architecture has evolved from local component state to a **global state management architecture** (Project 4) and is now fully wired up with **End-to-End Persistence** (Project 5) following the "Assemble First" principle. The application utilizes **Zustand** for lightweight global state, separating client-side UI state from server state, and a strictly typed API service module for asynchronous database operations.

## Core Entities & Types
All data contracts are strictly defined in `src/types.ts` and `src/store/taskStore.ts`:
* **Task**: The primary entity featuring union types for `TaskStatus` (todo, in-progress, done) and `TaskPriority` (low, medium, high, urgent). It also tracks `tags`, `description`, and `dueDate`.
* **TaskStore**: The global state interface that holds the `tasks` array, alongside required `loading` and `error` states to handle asynchronous database operations.

---

## Project 5: End-to-End Assembly & Persistence
This milestone implements the "Assemble First" principle, ensuring all components are wired together and data survives page reloads.

* **Backend Choice:** Custom Async Persistence Layer (built over browser storage). 
  * *Rationale:* This provides zero-configuration, secure, cross-reload persistence that perfectly simulates network latency (via Promises), allowing me to prove my end-to-end data flow and loading UI without the overhead of external cloud API configurations.
* **Authentication Approach:** Skipped.
  * *Rationale:* Not applicable to the current data model, as the theme is a localized, single-user task manager.
* **Service Encapsulation:** React components and the Zustand store NEVER interact with the database directly. All persistence logic is strictly encapsulated within the `src/services/api.ts` module.

### Feature Verification
- [x] Create Task (Persists across reload)
- [x] Update Status: Mark Done / Undo (Persists across reload)
- [x] Delete Task (Persists across reload)
- [x] Advanced Filtering & Search (UI State - localized)
- [x] Loading states explicitly handled and displayed in the UI
- [x] Graceful error handling and database "self-healing" implemented

---

## Project 4: State Management & Architecture

### 1. Global Store (`useTaskStore`)
Instead of prop-drilling or relying on complex local hooks, shared state is managed via Zustand. The store acts as a "thin hook," managing the array and loading flags while offloading business logic to the service layer.

### 2. Local vs. Global State Separation
Following the state colocation principle, pure UI state (like `searchQuery`, `activeStatusFilter`, and `isModalOpen`) remains securely locked inside the component via `useState`. Only the actual persistent task data is elevated to the global store.

### 3. Agent Instructions (`CLAUDE.md`)
To ensure predictable AI generation during the Agentic Development Loop, the project root contains a `CLAUDE.md` file detailing the architectural choices, state shape, API conventions, and a strict step-by-step feature addition template.

---

## Running the Application & Verifying Types
To run the local development server and verify the TypeScript contracts:

```bash
# Install dependencies
npm install

# Verify strict TypeScript compilation (must return 0 errors)
npx tsc --noEmit

# Run the local development server (No external DB configuration required)
npm run dev