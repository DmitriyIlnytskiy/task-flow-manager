# Task Flow Manager

## Overview
This is the frontend implementation of my Task Flow Manager. For Project 3, the application has been completely upgraded from static HTML/CSS to a dynamic React application powered by a custom state management hook and styled with Material-UI (MUI). It actively tracks tasks with varying statuses, priorities, and deadlines, utilizing `localStorage` to persist data between sessions.

## Core Entities & Types
All data contracts are strictly defined in `src/types.ts`:
* **Task**: The primary entity featuring union types for `TaskStatus` (todo, in-progress, done, etc.) and `TaskPriority` (low, medium, high, urgent). It also tracks `tags`, `dueDate`, and `dependencies`.
* **AppState**: Represents the memory of the application, containing the collection of tasks, active UI filters, and search queries.

## Project 3: Custom Hook (`useTaskManager`)
The application state is managed centrally via the `useTaskManager` hook, which uses immutable update patterns to prevent side effects.

### Hook Operations
1. **addTask**: Accepts a title, description, priority, and due date, generates a UUID, and immutably appends the new task to the state array.
2. **updateStatus**: Uses `.map()` to immutably locate a specific task by ID and update its `TaskStatus`.
3. **deleteTask**: Uses `.filter()` to immutably remove a task from the array by its ID.
4. **setStatusFilter / setPriorityFilter**: Updates the active dashboard filters for UI rendering.
5. **setSearchQuery**: Updates the active search string to allow dynamic, real-time filtering of tasks by title or description.

*Note: The hook also utilizes `useEffect` to automatically sync the state with the browser's `localStorage` whenever the task array changes.*

## Running Tests
To verify the integrity of the custom hook operations, run the following commands:
```bash
npm install
npm run test