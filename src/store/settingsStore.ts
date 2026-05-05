import { create } from 'zustand';

interface SettingsState {
  darkMode: boolean;
  fontSize: 'small' | 'medium' | 'large';
  compactMode: boolean;
  toggleDarkMode: () => void;
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  toggleCompactMode: () => void;
}

// Load saved settings from localStorage, or use defaults
const getSavedSettings = () => {
  try {
    const saved = localStorage.getItem('task_flow_settings');
    return saved ? JSON.parse(saved) : { darkMode: false, fontSize: 'medium', compactMode: false };
  } catch {
    return { darkMode: false, fontSize: 'medium', compactMode: false };
  }
};

export const useSettingsStore = create<SettingsState>((set) => ({
  ...getSavedSettings(),
  
  toggleDarkMode: () => set((state) => {
    const newState = { darkMode: !state.darkMode };
    localStorage.setItem('task_flow_settings', JSON.stringify({ ...state, ...newState }));
    return newState;
  }),
  
  setFontSize: (fontSize) => set((state) => {
    localStorage.setItem('task_flow_settings', JSON.stringify({ ...state, fontSize }));
    return { fontSize };
  }),

  toggleCompactMode: () => set((state) => {
    const newState = { compactMode: !state.compactMode };
    localStorage.setItem('task_flow_settings', JSON.stringify({ ...state, ...newState }));
    return newState;
  })
}));