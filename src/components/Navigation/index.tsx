import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Calendar, User, BookOpen } from 'lucide-react';
import styles from './Navigation.module.css';

export const Sidebar: React.FC = () => {
    return (
        <aside className={`${styles.sidebar} desktop-only`}>
            <div className={styles.logo}>
                <span className={styles.match}>MATCH</span>
                <span className={styles.quest}>QUEST</span>
            </div>
            <nav className={styles.nav}>
                <NavLink to="/" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
                    <Home size={20} />
                    <span>Home</span>
                </NavLink>
                <NavLink to="/find" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
                    <Search size={20} />
                    <span>Find</span>
                </NavLink>
                <NavLink to="/events" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
                    <Calendar size={20} />
                    <span>Events</span>
                </NavLink>
                <NavLink to="/me" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
                    <User size={20} />
                    <span>Me</span>
                </NavLink>
                <NavLink to="/story" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
                    <BookOpen size={20} />
                    <span>Story</span>
                </NavLink>
            </nav>
            <div className={styles.footer}>
                Arena Score: <span className={styles.score}>1,240</span>
            </div>
        </aside>
    );
};

export const BottomBar: React.FC = () => {
    return (
        <nav className={`${styles.bottomBar} mobile-only`}>
            <NavLink to="/" className={({ isActive }) => `${styles.mobileNavItem} ${isActive ? styles.active : ''}`}>
                <Home size={24} />
            </NavLink>
            <NavLink to="/find" className={({ isActive }) => `${styles.mobileNavItem} ${isActive ? styles.active : ''}`}>
                <Search size={24} />
            </NavLink>
            <NavLink to="/events" className={({ isActive }) => `${styles.mobileNavItem} ${isActive ? styles.active : ''}`}>
                <Calendar size={24} />
            </NavLink>
            <NavLink to="/me" className={({ isActive }) => `${styles.mobileNavItem} ${isActive ? styles.active : ''}`}>
                <User size={24} />
            </NavLink>
            <NavLink to="/story" className={({ isActive }) => `${styles.mobileNavItem} ${isActive ? styles.active : ''}`}>
                <BookOpen size={24} />
            </NavLink>
        </nav>
    );
};
