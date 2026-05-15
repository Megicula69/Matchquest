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
    const wrapper = document.getElementById('admin-theme-wrapper');
    if (!wrapper) return;

    if (m === 'dark') {
      wrapper.style.setProperty('--background', '#0B0F1A');
      wrapper.style.setProperty('--surface', '#121826');
      wrapper.style.setProperty('--surface2', '#1A1F35');
      wrapper.style.setProperty('--text', '#FFFFFF');
      wrapper.style.setProperty('--muted', '#94a3b8');
      wrapper.style.setProperty('--cyan', '#00c9e0');
      wrapper.style.setProperty('--violet', '#9b6dff');
      wrapper.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.03)');
      wrapper.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.05)');
    } else {
      wrapper.style.setProperty('--background', '#F8FAFC');
      wrapper.style.setProperty('--surface', '#FFFFFF');
      wrapper.style.setProperty('--surface2', '#F1F5F9');
      wrapper.style.setProperty('--text', '#0F172A');
      wrapper.style.setProperty('--muted', '#64748b');
      wrapper.style.setProperty('--cyan', '#2563EB');
      wrapper.style.setProperty('--violet', '#7C3AED');
      wrapper.style.setProperty('--glass-bg', 'rgba(15, 23, 42, 0.03)');
      wrapper.style.setProperty('--glass-border', 'rgba(15, 23, 42, 0.08)');
    }
  };

  useEffect(() => {
    // Re-apply when wrapper is available or mode changes
    applyMode(mode);
  }, [mode]);

  const setMode = (m: ThemeMode) => {
    setModeState(m);
    applyMode(m);
    localStorage.setItem('mq_admin_mode', m);
  };

  return (
    <AdminThemeContext.Provider value={{ mode, setMode }}>
      <div 
        id="admin-theme-wrapper" 
        className={`admin-theme-${mode}`}
        style={{ 
          minHeight: '100vh', 
          width: '100%',
          backgroundColor: 'var(--background)',
          color: 'var(--text)',
          transition: 'all 0.3s ease'
        }}
      >
        {children}
      </div>
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
