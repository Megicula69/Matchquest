'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeMode = 'dark' | 'light' | 'custom';

interface ThemeConfig {
  mode: ThemeMode;
  accentColor: string;
  primaryBg: string;
  secondaryBg: string;
  cardBg: string;
  textColor: string;
  borderRadius: string;
  transparency: string;
  glowIntensity: string;
}

interface ThemeContextType {
  config: ThemeConfig;
  setMode: (mode: ThemeMode) => void;
  setAccent: (color: string) => void;
  updateConfig: (updates: Partial<ThemeConfig>) => void;
  resetDefaults: () => void;
  applyTheme: () => void;
}

const defaultThemes = {
  dark: {
    mode: 'dark' as ThemeMode,
    accentColor: '#00c9e0', // Neon Blue
    primaryBg: '#0B0F1A',
    secondaryBg: '#121826',
    cardBg: 'rgba(20, 24, 38, 0.75)',
    textColor: '#FFFFFF',
    borderRadius: '16px',
    transparency: '0.75',
    glowIntensity: '1',
  },
  light: {
    mode: 'light' as ThemeMode,
    accentColor: '#9b6dff', // Cyber Purple
    primaryBg: '#F5F7FA',
    secondaryBg: '#FFFFFF',
    cardBg: 'rgba(255, 255, 255, 0.8)',
    textColor: '#1A1A1A',
    borderRadius: '12px',
    transparency: '0.8',
    glowIntensity: '0.3',
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<ThemeConfig>(defaultThemes.dark);

  // Load from localStorage on init
  useEffect(() => {
    const saved = localStorage.getItem('la_admin_theme');
    if (saved) {
      const parsed = JSON.parse(saved);
      setConfig(parsed);
      applyToDOM(parsed);
    } else {
      applyToDOM(defaultThemes.dark);
    }
  }, []);

  const applyToDOM = (conf: ThemeConfig) => {
    const root = document.documentElement;
    
    // Core Colors
    root.style.setProperty('--background', conf.primaryBg);
    root.style.setProperty('--surface', conf.secondaryBg);
    root.style.setProperty('--surface2', conf.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)');
    root.style.setProperty('--card-bg', conf.cardBg);
    root.style.setProperty('--text', conf.textColor);
    root.style.setProperty('--muted', conf.mode === 'dark' ? '#94a3b8' : '#64748b');
    
    // Accent
    root.style.setProperty('--cyan', conf.accentColor);
    root.style.setProperty('--accent-glow', `${conf.accentColor}${Math.round(Number(conf.glowIntensity) * 255).toString(16).padStart(2, '0')}`);
    
    // UI Constants
    root.style.setProperty('--radius', conf.borderRadius);
    root.style.setProperty('--transition', 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)');
    
    // Transparency / Blurs
    root.style.setProperty('--glass-opacity', conf.transparency);
    root.style.setProperty('--blur', '20px');

    // Chart compatibility (custom property for charts)
    root.style.setProperty('--chart-grid', conf.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)');
  };

  const setMode = (mode: ThemeMode) => {
    const newConfig = mode === 'dark' ? defaultThemes.dark : mode === 'light' ? defaultThemes.light : config;
    setConfig(newConfig);
    applyToDOM(newConfig);
  };

  const setAccent = (color: string) => {
    const newConfig = { ...config, accentColor: color };
    setConfig(newConfig);
    applyToDOM(newConfig);
  };

  const updateConfig = (updates: Partial<ThemeConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    applyToDOM(newConfig);
  };

  const resetDefaults = () => {
    setMode('dark');
  };

  const applyTheme = () => {
    localStorage.setItem('la_admin_theme', JSON.stringify(config));
    console.log('Theme saved to persistent storage');
  };

  return (
    <ThemeContext.Provider value={{ config, setMode, setAccent, updateConfig, resetDefaults, applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
