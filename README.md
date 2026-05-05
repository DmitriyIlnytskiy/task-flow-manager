# 🌊 Task Flow Manager

**Live Demo:** [https://task-flow-manager-sigma.vercel.app/]

## Overview
Task Flow Manager is a high-performance React application designed to organize, prioritize, and track complex projects. Built with a focus on seamless user experience, it features a completely strictly-typed architecture, responsive Material-UI design, and a custom asynchronous persistence layer to ensure data survives browser reloads.

## ✨ Core Features
* **End-to-End Persistence:** Tasks are saved automatically using a simulated asynchronous database layer, meaning your data survives page reloads with realistic loading states.
* **Advanced Filtering & Search:** Instantly sort tasks by status, priority, or custom search queries using performant local state.
* **Full CRUD Capabilities:** Create, read, update, and delete tasks with comprehensive edit modals and quick-action buttons.
* **Customizable Workspace:** Includes a dedicated Settings page with Dark Mode toggles, UI scaling (font sizes), and a Compact View for dense data visualization.
* **Data Safety:** Features a "Danger Zone" with a modal confirmation to safely wipe database configurations.

## 🛠 Tech Stack
* **Frontend Framework:** React 18 (Vite)
* **Language:** TypeScript (Strict Mode Enabled)
* **Styling & Components:** Material-UI (MUI)
* **Global State Management:** Zustand
* **Routing:** React Router v6

## 📐 Architecture & Patterns
* **Global vs. Local State:** Pure UI state (search queries, modal visibility) is securely locked inside components via `useState`, while persistent task data and API loading flags are elevated to the global Zustand store (`useTaskStore`).
* **Service Encapsulation:** Components and global stores NEVER interact with the database directly. All persistence logic is encapsulated within the `src/services/api.ts` module, adhering to the "Assemble First" principle.
* **Strict Contracts:** All data flows utilize TypeScript interfaces (e.g., `TaskStatus`, `TaskPriority`) to prevent runtime errors and ensure predictable UI rendering.

## 🚀 Running Locally

To run the local development server and verify the TypeScript contracts:

```bash
# Install dependencies
npm install

# Verify strict TypeScript compilation (must return 0 errors)
npx tsc --noEmit

# Run the local development server
npm run dev