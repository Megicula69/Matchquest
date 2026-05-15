'use client';

import React, { useState } from 'react';
import AdminSidebar from '../../src/components/Admin/AdminSidebar';
import AdminTopbar from '../../src/components/Admin/AdminTopbar';
import CreateTournamentModal from '../../src/components/Admin/CreateTournamentModal';
import CreateAnnouncementModal from '../../src/components/Admin/CreateAnnouncementModal';
import { AdminThemeProvider } from '../../src/context/AdminThemeContext';
import { CheckCircle2 } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.Node;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState<'tournament' | 'announcement' | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const handleSuccess = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <AdminThemeProvider>
      <div style={{ minHeight: '100vh', background: 'var(--background)', color: 'var(--text)', transition: 'background 0.3s ease, color 0.3s ease' }}>
      <AdminSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <AdminTopbar
        sidebarCollapsed={sidebarCollapsed}
        onMenuClick={() => setMobileOpen(!mobileOpen)}
        onNewTournament={() => setModalOpen('tournament')}
        onNewAnnouncement={() => setModalOpen('announcement')}
      />

      <main
        style={{
          marginLeft: sidebarCollapsed ? 72 : 260,
          marginTop: 72,
          padding: 24,
          transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          minHeight: 'calc(100vh - 72px)',
        }}
      >
        {children}
      </main>

      {/* Global Creation Modals */}
      <CreateTournamentModal 
        isOpen={modalOpen === 'tournament'} 
        onClose={() => setModalOpen(null)} 
        onSuccess={() => handleSuccess('Tournament created successfully!')} 
      />
      <CreateAnnouncementModal 
        isOpen={modalOpen === 'announcement'} 
        onClose={() => setModalOpen(null)} 
        onSuccess={() => handleSuccess('Announcement broadcasted!')} 
      />
      {/* Global Success Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', background: 'rgba(34, 197, 94, 0.95)',
          color: '#fff', padding: '12px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center',
          gap: '10px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', zIndex: 10000, animation: 'slideIn 0.3s ease'
        }}>
          <CheckCircle2 size={18} /> {toast}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          main {
            margin-left: 0 !important;
            padding: 16px !important;
          }
        }
      `}</style>
    </div>
    </AdminThemeProvider>
  );
}
