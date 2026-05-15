'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const ICONS: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 size={18} />,
  error: <XCircle size={18} />,
  warning: <AlertTriangle size={18} />,
  info: <Info size={18} />,
};

const COLORS: Record<ToastType, { bg: string; border: string; icon: string }> = {
  success: { bg: 'rgba(34, 197, 94, 0.12)',  border: 'rgba(34, 197, 94, 0.35)',  icon: '#22c55e' },
  error:   { bg: 'rgba(232, 51, 74, 0.12)',  border: 'rgba(232, 51, 74, 0.35)',  icon: '#e8334a' },
  warning: { bg: 'rgba(240, 165, 0, 0.12)',  border: 'rgba(240, 165, 0, 0.35)',  icon: '#f0a500' },
  info:    { bg: 'rgba(0, 201, 224, 0.12)',  border: 'rgba(0, 201, 224, 0.35)', icon: '#00c9e0' },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);

  const dismiss = (id: string) => setToasts(prev => prev.filter(t => t.id !== id));

  const ctx: ToastContextType = {
    success: (m) => addToast(m, 'success'),
    error:   (m) => addToast(m, 'error'),
    warning: (m) => addToast(m, 'warning'),
    info:    (m) => addToast(m, 'info'),
  };

  return (
    <ToastContext.Provider value={ctx}>
      {children}
      {/* Toast Container */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        zIndex: 99999,
        pointerEvents: 'none',
      }}>
        {toasts.map(toast => {
          const c = COLORS[toast.type];
          return (
            <div
              key={toast.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 18px',
                background: c.bg,
                border: `1px solid ${c.border}`,
                borderRadius: '14px',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                minWidth: '280px',
                maxWidth: '380px',
                pointerEvents: 'all',
                animation: 'toastIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                fontFamily: 'var(--font-barlow, sans-serif)',
              }}
            >
              <span style={{ color: c.icon, flexShrink: 0 }}>{ICONS[toast.type]}</span>
              <span style={{ flex: 1, fontSize: '13px', color: 'var(--text, #fff)', fontWeight: 500 }}>
                {toast.message}
              </span>
              <button
                onClick={() => dismiss(toast.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--muted, #aaa)',
                  cursor: 'pointer',
                  padding: '0',
                  display: 'flex',
                  alignItems: 'center',
                  flexShrink: 0,
                }}
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(40px) scale(0.95); }
          to   { opacity: 1; transform: translateX(0)   scale(1);    }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextType {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
}
