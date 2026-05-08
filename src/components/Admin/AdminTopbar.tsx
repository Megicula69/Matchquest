'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Plus,
  ChevronDown,
  Menu,
  User,
  Settings,
  LogOut,
  Trophy,
  Megaphone,
  CalendarDays,
} from 'lucide-react';
import styles from './AdminTopbar.module.css';

interface AdminTopbarProps {
  sidebarCollapsed: boolean;
  onMenuClick: () => void;
}

export default function AdminTopbar({
  sidebarCollapsed,
  onMenuClick,
}: AdminTopbarProps) {
  const [darkMode, setDarkMode] = useState(true);
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
              <div className={styles.quickCreateItem}>
                <Trophy size={16} />
                New Tournament
              </div>
              <div className={styles.quickCreateItem}>
                <Megaphone size={16} />
                New Announcement
              </div>
              <div className={styles.quickCreateItem}>
                <CalendarDays size={16} />
                New Event
              </div>
            </div>
          )}
        </div>

        {/* Notifications */}
        <button className={styles.iconBtn} id="admin-notifications-btn">
          <Bell size={20} />
          <span className={styles.notifBadge}>5</span>
        </button>

        {/* Theme Toggle */}
        <button
          className={styles.themeToggle}
          onClick={() => setDarkMode(!darkMode)}
          id="admin-theme-toggle"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
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
              <div className={styles.profileDropdownItem}>
                <User size={16} /> My Profile
              </div>
              <div className={styles.profileDropdownItem}>
                <Settings size={16} /> Account Settings
              </div>
              <div className={styles.profileDropdownDivider} />
              <div
                className={`${styles.profileDropdownItem} ${styles.danger}`}
              >
                <LogOut size={16} /> Sign Out
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
