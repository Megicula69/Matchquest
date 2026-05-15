'use client';

import React, { useState } from 'react';
import { Bell, User, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../hooks/useNotifications';
import { useTeam } from '../../hooks/useTeam';
import { useToast } from '../../context/ToastContext';
import styles from './UserTopBar.module.css';

export const UserTopBar: React.FC = () => {
    const { notifications, clearNotifications, removeNotification } = useNotifications();
    const { joinTeam } = useTeam();
    const toast = useToast();
    const [isOpen, setIsOpen] = useState(false);

    const handleAccept = (n: any) => {
        if (n.data?.teamName) {
            joinTeam(n.data.teamName);
            toast.success(`You joined team ${n.data.teamName}!`);
        }
        removeNotification(n.id);
    };

    return (
        <div className={styles.topBar}>
            <div style={{ position: 'relative' }}>
                <button 
                    className={styles.notifBtn} 
                    onClick={() => setIsOpen(!isOpen)}
                    title="Notifications"
                >
                    <Bell size={20} />
                    {notifications.length > 0 && (
                        <span className={styles.badge}>{notifications.length}</span>
                    )}
                </button>

                {isOpen && (
                    <div className={styles.dropdown}>
                        <div className={styles.dropdownHeader}>
                            <h3>Notifications</h3>
                            {notifications.length > 0 && (
                                <button className={styles.clearBtn} onClick={clearNotifications}>
                                    Clear All
                                </button>
                            )}
                        </div>

                        <div className={styles.notifList}>
                            {notifications.length === 0 ? (
                                <div className={styles.emptyState}>No notifications</div>
                            ) : (
                                notifications.map((n) => (
                                    <div key={n.id} className={styles.notifItem}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span className={styles.notifTitle}>{n.title}</span>
                                            <button 
                                                onClick={() => removeNotification(n.id)}
                                                style={{ background: 'transparent', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                        <p className={styles.notifMsg}>{n.message}</p>
                                        {n.type === 'INVITE' && (
                                            <div className={styles.actionBtns}>
                                                <button className={styles.acceptBtn} onClick={() => handleAccept(n)}>Accept</button>
                                                <button className={styles.declineBtn} onClick={() => removeNotification(n.id)}>Decline</button>
                                            </div>
                                        )}
                                        <span className={styles.notifTime}>{n.timestamp}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
