'use client';

import React, { useState } from 'react';
import AdminSidebar from '../../src/components/Admin/AdminSidebar';
import AdminTopbar from '../../src/components/Admin/AdminTopbar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <AdminSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <AdminTopbar
        sidebarCollapsed={sidebarCollapsed}
        onMenuClick={() => setMobileOpen(!mobileOpen)}
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

      <style>{`
        @media (max-width: 768px) {
          main {
            margin-left: 0 !important;
            padding: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
