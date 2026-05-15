'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Swords,
  Trophy,
  MessageCircle,
  GraduationCap,
  CalendarDays,
  ShieldAlert,
  Bell,
  BarChart3,
  Award,
  Image,
  Settings,
  Lock,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import LogoutModal from './LogoutModal';
import { useAuth } from '../../context/AuthContext';
import styles from './AdminSidebar.module.css';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  href: string;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/admin' },
    ],
  },
  {
    label: 'Management',
    items: [
      { id: 'users', label: 'User Management', icon: <Users size={20} />, href: '/admin/users' },
      { id: 'matchmaking', label: 'Matchmaking', icon: <Swords size={20} />, badge: 12, href: '/admin/matchmaking' },
      { id: 'tournaments', label: 'Tournaments', icon: <Trophy size={20} />, badge: 3, href: '/admin/tournaments' },
      { id: 'community', label: 'Community Hub', icon: <MessageCircle size={20} />, href: '/admin/community' },
      { id: 'simulation', label: 'Student Simulation', icon: <GraduationCap size={20} />, href: '/admin/simulation' },
      { id: 'events', label: 'Events', icon: <CalendarDays size={20} />, href: '/admin/events' },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { id: 'reports', label: 'Reports & Moderation', icon: <ShieldAlert size={20} />, badge: 7, href: '/admin/reports' },
      { id: 'notifications', label: 'Notifications', icon: <Bell size={20} />, badge: 24, href: '/admin/notifications' },
      { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} />, href: '/admin/analytics' },
    ],
  },
  {
    label: 'System',
    items: [
      { id: 'rewards', label: 'Rewards & Achievements', icon: <Award size={20} />, href: '/admin/rewards' },
      { id: 'media', label: 'Media Library', icon: <Image size={20} />, href: '/admin/media' },
      { id: 'settings', label: 'System Settings', icon: <Settings size={20} />, href: '/admin/settings' },
      { id: 'security', label: 'Security Logs', icon: <Lock size={20} />, href: '/admin/security' },
    ],
  },
];

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function AdminSidebar({
  collapsed,
  onToggle,
  mobileOpen,
  onMobileClose,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const isActive = (item: NavItem) => {
    if (item.href === '/admin') return pathname === '/admin' && item.id === 'dashboard';
    return pathname.startsWith(item.href);
  };

  const sidebarClasses = [
    styles.sidebar,
    collapsed ? styles.collapsed : '',
    mobileOpen ? styles.mobileOpen : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      {mobileOpen && (
        <div className={styles.mobileOverlay} onClick={onMobileClose} />
      )}
      <aside className={sidebarClasses}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logoIcon}>LA</div>
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>Lungsod Arena</span>
            <span className={styles.logoSubtitle}>Admin Panel</span>
          </div>
        </div>

        <button className={styles.collapseBtn} onClick={onToggle}>
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        <nav className={styles.navSection}>
          {navGroups.map((group) => (
            <div key={group.label} className={styles.navGroup}>
              <div className={styles.navGroupLabel}>{group.label}</div>
              {group.items.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`${styles.navItem} ${isActive(item) ? styles.active : ''}`}
                  onClick={onMobileClose}
                  data-tooltip={item.label}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span className={styles.navLabel}>{item.label}</span>
                  {item.badge && (
                    <span className={styles.navBadge}>{item.badge}</span>
                  )}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.logoutBtn} data-tooltip="Logout" onClick={() => setShowLogoutModal(true)}>
            <span className={styles.navIcon}><LogOut size={20} /></span>
            <span className={styles.navLabel}>Logout</span>
          </div>
        </div>
      </aside>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => {
          logout();
          setShowLogoutModal(false);
        }}
      />
    </>
  );
}
