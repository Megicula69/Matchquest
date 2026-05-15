'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  Sun,
  Moon,
  Plus,
  ChevronDown,
  Menu,
  User,
  Settings,
  Trophy,
  Megaphone,
} from 'lucide-react';
import { useAdminTheme } from '../../context/AdminThemeContext';
import { useAuth } from '../../context/AuthContext';
import styles from './AdminTopbar.module.css';

interface AdminTopbarProps {
  sidebarCollapsed: boolean;
  onMenuClick: () => void;
  onNewTournament?: () => void;
  onNewAnnouncement?: () => void;
}

export default function AdminTopbar({
  sidebarCollapsed,
  onMenuClick,
  onNewTournament,
  onNewAnnouncement,
}: AdminTopbarProps) {
  const { mode, setMode } = useAdminTheme();
  const { logout } = useAuth();
  const [showQuickCreate, setShowQuickCreate] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const quickCreateRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        quickCreateRef.current &&
        !quickCreateRef.current.contains(e.target as Node)
      ) {
        setShowQuickCreate(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setShowProfile(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`${styles.topbar} ${sidebarCollapsed ? styles.sidebarCollapsed : ''}`}
    >
      <div className={styles.topbarLeft}>
        <button className={styles.menuBtn} onClick={onMenuClick}>
          <Menu size={20} />
        </button>

        <div className={styles.searchBar}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search users, tournaments, events..."
          />
        </div>
      </div>

      <div className={styles.topbarRight}>
        {/* Quick Create */}
        <div className={styles.quickCreateWrapper} ref={quickCreateRef}>
          <button
            className={styles.quickCreateBtn}
            onClick={() => setShowQuickCreate(!showQuickCreate)}
          >
            <Plus size={16} />
            <span>Quick Create</span>
          </button>
          {showQuickCreate && (
            <div className={styles.quickCreateDropdown}>
              <div 
                className={styles.quickCreateItem}
                onClick={() => { onNewTournament?.(); setShowQuickCreate(false); }}
              >
                <Trophy size={16} />
                <span>New Tournament</span>
              </div>
              <div 
                className={styles.quickCreateItem}
                onClick={() => { onNewAnnouncement?.(); setShowQuickCreate(false); }}
              >
                <Megaphone size={16} />
                <span>New Announcement</span>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          className={styles.themeToggle}
          onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
          id="admin-theme-toggle"
        >
          {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          <div className={styles.ripple} />
        </button>

        <div className={styles.divider} />

        {/* Profile */}
        <div className={styles.profileWrapper} ref={profileRef}>
          <div
            className={styles.profileBtn}
            onClick={() => setShowProfile(!showProfile)}
          >
            <div className={styles.profileAvatar}>AD</div>
            <div className={styles.profileInfo}>
              <span className={styles.profileName}>Admin User</span>
              <span className={styles.profileRole}>Super Admin</span>
            </div>
            <ChevronDown size={14} className={styles.profileChevron} />
          </div>
          {showProfile && (
            <div className={styles.profileDropdown}>
              <Link href="/admin/profile" className={styles.profileDropdownItem}>
                <User size={16} /> My Profile
              </Link>
              <Link href="/admin/account-settings" className={styles.profileDropdownItem}>
                <Settings size={16} /> Account Settings
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
