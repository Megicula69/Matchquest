import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Calendar, User, BookOpen, LogOut, Trophy, Bell } from 'lucide-react';
import { UserTopBar } from './UserTopBar';
import { useAuth } from '../../context/AuthContext';
import styles from './Navigation.module.css';

export const Sidebar: React.FC = () => {
    const { user, hasRegisteredTeam, logout } = useAuth();
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
                <NavLink to="/story" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
                    <BookOpen size={20} />
                    <span>Story</span>
                </NavLink>
                {hasRegisteredTeam(user?.username || '') && (
                    <NavLink to="/team" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
                        <Trophy size={20} />
                        <span>Team</span>
                    </NavLink>
                )}
                <NavLink to="/me" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
                    <User size={20} />
                    <span>My Profile</span>
                </NavLink>
            </nav>
            <div className={styles.footer}>
                <div style={{ marginBottom: '16px' }}>
                    Arena Score: <span className={styles.score}>1,240</span>
                </div>
                <button 
                    onClick={logout}
                    style={{ 
                        width: '100%', padding: '12px', background: 'rgba(232, 51, 74, 0.1)',
                        border: '1px solid rgba(232, 51, 74, 0.2)', borderRadius: '10px',
                        color: '#e8334a', display: 'flex', alignItems: 'center', gap: '10px',
                        cursor: 'pointer', fontFamily: 'var(--font-rajdhani)', fontWeight: 700,
                        textTransform: 'uppercase', fontSize: '12px'
                    }}
                >
                    <LogOut size={16} /> Logout
                </button>
            </div>
        </aside>
    );
};

export const BottomBar: React.FC = () => {
    const { user, hasRegisteredTeam } = useAuth();
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
            <NavLink to="/story" className={({ isActive }) => `${styles.mobileNavItem} ${isActive ? styles.active : ''}`}>
                <BookOpen size={24} />
            </NavLink>
            {user && hasRegisteredTeam(user.username) && (
                <NavLink to="/team" className={({ isActive }) => `${styles.mobileNavItem} ${isActive ? styles.active : ''}`}>
                    <Trophy size={24} />
                </NavLink>
            )}
            <NavLink to="/me" className={({ isActive }) => `${styles.mobileNavItem} ${isActive ? styles.active : ''}`}>
                <User size={24} />
            </NavLink>
        </nav>
    );
};

export { UserTopBar };
