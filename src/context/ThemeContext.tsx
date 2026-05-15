'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface ThemeConfig {
  accentColor: string;
  secondaryAccent: string;
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
  setAccent: (color: string) => void;
  setTheme: (pageColor: string, accentColor: string) => void;
  updateConfig: (updates: Partial<ThemeConfig>) => void;
  resetDefaults: () => void;
}

const defaultTheme: ThemeConfig = {
  accentColor: '#00c9e0',
  secondaryAccent: '#9b6dff',
  primaryBg: '#0B0F1A',
  secondaryBg: '#121826',
  cardBg: 'rgba(20, 24, 38, 0.75)',
  textColor: '#FFFFFF',
  borderRadius: '16px',
  transparency: '0.75',
  glowIntensity: '1',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<ThemeConfig>(defaultTheme);
  const scopeRef = useRef<HTMLDivElement>(null);

  // Apply theme to the scoped element whenever config changes
  useEffect(() => {
    const saved = localStorage.getItem('mq_user_theme');
    if (saved) {
      const parsed = JSON.parse(saved);
      setConfig(parsed);
      applyToElement(parsed);
    } else {
      applyToElement(defaultTheme);
    }
  }, []);

  const applyToElement = (conf: ThemeConfig) => {
    const element = scopeRef.current;
    if (!element) return;
    
    // Core Colors
    element.style.setProperty('--background', conf.primaryBg);
    element.style.setProperty('--surface', conf.secondaryBg);
    element.style.setProperty('--surface2', 'rgba(255,255,255,0.05)');
    element.style.setProperty('--card-bg', conf.cardBg);
    element.style.setProperty('--text', conf.textColor);
    element.style.setProperty('--muted', '#94a3b8');
    
    // Accent
    element.style.setProperty('--cyan', conf.accentColor);
    element.style.setProperty('--violet', conf.secondaryAccent);
    element.style.setProperty('--accent-glow', `${conf.accentColor}33`);
    
    // UI Constants
    element.style.setProperty('--radius', conf.borderRadius);
    element.style.setProperty('--transition', 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)');
    
    // Transparency / Blurs
    element.style.setProperty('--glass-opacity', conf.transparency);
    element.style.setProperty('--blur', '20px');
  };

  // Re-apply whenever config changes or ref mounts
  useEffect(() => {
    applyToElement(config);
  }, [config]);

  const setAccent = (color: string) => {
    const newConfig = { ...config, accentColor: color };
    setConfig(newConfig);
    localStorage.setItem('mq_user_theme', JSON.stringify(newConfig));
  };

  const setTheme = (pageColor: string, accentColor: string) => {
    const newConfig = { 
      ...config, 
      primaryBg: pageColor, 
      secondaryBg: `${pageColor}ee`,
      accentColor: accentColor,
      secondaryAccent: accentColor,
      cardBg: `${pageColor}cc`
    };
    setConfig(newConfig);
    localStorage.setItem('mq_user_theme', JSON.stringify(newConfig));
  };

  const updateConfig = (updates: Partial<ThemeConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    localStorage.setItem('mq_user_theme', JSON.stringify(newConfig));
  };

  const resetDefaults = () => {
    setConfig(defaultTheme);
    localStorage.removeItem('mq_user_theme');
  };

  return (
    <ThemeContext.Provider value={{ config, setAccent, setTheme, updateConfig, resetDefaults }}>
      <div ref={scopeRef} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {children}
      </div>
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
