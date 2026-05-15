'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeMode = 'dark' | 'light';

interface AdminThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

const AdminThemeContext = createContext<AdminThemeContextType | undefined>(undefined);

export function AdminThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('mq_admin_mode');
    if (saved === 'light' || saved === 'dark') {
      setModeState(saved);
      applyMode(saved);
    } else {
      applyMode('dark');
    }
  }, []);

  const applyMode = (m: ThemeMode) => {
    const root = document.documentElement;
    if (m === 'dark') {
      root.style.setProperty('--background', '#0B0F1A');
      root.style.setProperty('--surface', '#121826');
      root.style.setProperty('--text', '#FFFFFF');
      root.style.setProperty('--muted', '#94a3b8');
      root.style.setProperty('--cyan', '#00c9e0');
      root.style.setProperty('--violet', '#9b6dff');
    } else {
      root.style.setProperty('--background', '#F5F7FA');
      root.style.setProperty('--surface', '#FFFFFF');
      root.style.setProperty('--text', '#1A1A1A');
      root.style.setProperty('--muted', '#64748b');
      root.style.setProperty('--cyan', '#6c5ce7');
      root.style.setProperty('--violet', '#00b894');
    }
  };

  const setMode = (m: ThemeMode) => {
    setModeState(m);
    applyMode(m);
    localStorage.setItem('mq_admin_mode', m);
  };

  return (
    <AdminThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </AdminThemeContext.Provider>
  );
}

export function useAdminTheme() {
  const context = useContext(AdminThemeContext);
  if (context === undefined) {
    throw new Error('useAdminTheme must be used within an AdminThemeProvider');
  }
  return context;
}
