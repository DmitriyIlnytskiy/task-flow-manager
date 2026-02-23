# Task Flow Manager - Project 2

## Overview
This is the foundational setup for my Task Flow Manager app. I chose this theme because tracking tasks with varying statuses, priorities, and deadlines presents some really interesting state management challenges—which will be perfect to tackle when we dive deeper into React Hooks next week. To make the UI a bit more interesting to build and test, I populated the initial dummy data with some of my actual real-life projects, like building a LiFePO4 power system and repairing my car.

## Core Entities & Types
Following the "types first" workflow, all data contracts are strictly defined in `src/types.ts` before any implementation:
* **Task**: The primary entity. It includes standard text fields (id, title, description), plus specific union types for `TaskStatus` (backlog, todo, in-progress, review, done) and `TaskPriority` (low, medium, high, urgent). It also tracks `tags`, `dueDate`, and `dependencies`.
* **AppState**: Represents the memory of the application, containing the collection of tasks and the currently active UI filters.

## App Structure
* `src/types.ts`: The single source of truth for all TypeScript domain interfaces and union types.
* `src/main.tsx`: The application entry point that wraps the app in the React Router `<BrowserRouter>`.
* `src/App.tsx`: Defines the core navigation shell and the `<Routes>` mapping.
* `src/pages/`: Contains the isolated page components (`HomePage.tsx` and `ProjectsPage.tsx`) to keep the routing clean.

## AI Usage Statement
I used Gemini as a coding assistant for this foundation. Specifically, it helped me troubleshoot a Windows PowerShell execution policy error that was blocking my initial Vite scaffolding. It also helped me debug a tricky Vite crash related to importing TypeScript types (teaching me the `import type` syntax), and scaffolded the initial boilerplate for the React Router layout and the dashboard UI.

## How to Run Locally
1. Open the terminal in the root project directory.
2. Install the necessary dependencies:
   ```bash
   npm install

Start the Vite development server:

    npm run dev

To verify the strict TypeScript compilation (zero errors), run:

    npx tsc --noEmit