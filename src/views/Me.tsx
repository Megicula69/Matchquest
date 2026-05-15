import React, { useEffect, useState } from 'react';
import styles from './Me.module.css';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { UserProfile } from '../types';
import { Settings, LogOut, Shield, Trophy, Activity, Zap, ChevronRight, Bell, Lock, Flame, Palette, User, X, CheckCircle, Ban, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { createDefaultProfile } from '../data/profileDefaults';
import { useTheme } from '../context/ThemeContext';

export const MePage: React.FC = () => {
    const { user } = useAuth();
    const { config, setTheme } = useTheme();
    const [profiles, setProfiles] = useLocalStorage<Record<string, UserProfile>>('mq_profiles', {});
    const [historyTab, setHistoryTab] = useState<'COMP' | 'SOCIAL' | 'TOURNAMENT'>('COMP');
    const [showSettings, setShowSettings] = useState(false);
    const [settingsTab, setSettingsTab] = useState<'GENERAL' | 'APPEARANCE'>('GENERAL');

    useEffect(() => {
        if (!user) {
            return;
        }

        setProfiles(currentProfiles => {
            if (currentProfiles[user.username]) {
                return currentProfiles;
            }

            return {
                ...currentProfiles,
                [user.username]: createDefaultProfile(user),
            };
        });
    }, [user, setProfiles]);

    const profile = user ? profiles[user.username] ?? createDefaultProfile(user) : null;

    if (!profile) return null;

    const resetAll = () => {
        if (window.confirm('Are you sure? This will wipe ALL your progress.')) {
            window.localStorage.clear();
            window.location.reload();
        }
    };

    const scorePercentage = (profile.arenaScore % 2000) / 20;

    const elementStyle = {
        Fire: { borderColor: 'rgba(232, 51, 74, 0.4)', color: 'var(--red)' },
        Water: { borderColor: 'rgba(0, 201, 224, 0.4)', color: 'var(--cyan)' },
        Earth: { borderColor: 'rgba(120, 184, 84, 0.4)', color: '#78b854' },
        Wind: { borderColor: 'rgba(163, 164, 255, 0.4)', color: 'var(--violet)' },
        Lightning: { borderColor: 'rgba(240, 165, 0, 0.4)', color: 'var(--gold)' },
        Ice: { borderColor: 'rgba(125, 216, 255, 0.4)', color: '#7dd8ff' },
        Shadow: { borderColor: 'rgba(108, 92, 231, 0.4)', color: '#8d7bff' },
        Light: { borderColor: 'rgba(255, 232, 153, 0.4)', color: '#ffe899' },
    } as const;

    const matchHistory = {
        COMP: [
            { id: 1, result: 'WIN', game: 'Valorant', score: '13-8', kda: '24/10/5', date: 'Yesterday' },
            { id: 2, result: 'LOSS', game: 'Valorant', score: '10-13', kda: '18/15/2', date: '2 days ago' },
        ],
        SOCIAL: [
            { id: 3, result: 'MATCH', game: 'LoL', partner: 'Luna_Tic', date: '3 days ago' },
            { id: 4, result: 'MATCH', game: 'Apex', partner: 'PixelPioneer', date: '5 days ago' },
        ],
        TOURNAMENT: [
            { id: 5, result: 'FINALIST', game: 'Dota 2', event: 'Community Rumble', date: '1 week ago' },
        ]
    };

    return (
        <>
            <div className="fade-in">
                <div className={styles.profileHeader}>
                    <div className={styles.scoreRing}>
                        <svg viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" className={styles.ringTrack} />
                            <circle
                                cx="50" cy="50" r="45"
                                className={styles.ringProgress}
                                style={{ strokeDashoffset: 283 - (283 * scorePercentage) / 100 }}
                            />
                        </svg>
                        <div className={styles.scoreText}>
                            <span className={styles.rank}>{profile.rank}</span>
                            <span className={styles.score}>{profile.arenaScore}</span>
                        </div>
                    </div>

                    <div className={styles.profileInfo}>
                        <h1>{profile.username}</h1>
                        <p>{profile.favoriteGame} Specialist</p>
                        <div className={styles.profileBadges}>
                            <span className={styles.rankBadge}>{profile.rank}</span>
                            <span className={styles.elementBadge} style={elementStyle[profile.element as keyof typeof elementStyle]}>
                                <Flame size={14} /> {profile.element}
                            </span>
                        </div>
                        <div className={styles.headerActions}>
                            <button className={styles.settingsBtn} onClick={() => setShowSettings(true)}><Settings size={20} /> SETTINGS</button>
                        </div>
                    </div>
                </div>

                <section className={styles.stats}>
                    <div className={styles.statItem}>
                        <Activity size={20} />
                        <div className={styles.statLine}>
                            <span>KDA Ratio</span>
                            <strong>{profile.stats.kda}</strong>
                        </div>
                    </div>
                    <div className={styles.statItem}>
                        <Zap size={20} />
                        <div className={styles.statLine}>
                            <span>Win Rate</span>
                            <strong>{profile.stats.winRate}</strong>
                        </div>
                    </div>
                    <div className={styles.statItem}>
                        <Trophy size={20} />
                        <div className={styles.statLine}>
                            <span>Trophies</span>
                            <strong>{profile.stats.tournaments}</strong>
                        </div>
                    </div>
                    <div className={styles.statItem}>
                        <Shield size={20} />
                        <div className={styles.statLine}>
                            <span>Reputation</span>
                            <strong>{profile.stats.reputation}%</strong>
                        </div>
                    </div>
                </section>

                <section className={styles.historySection}>
                    <div className={styles.historyHeader}>
                        <h2>MATCH HISTORY</h2>
                        <div className={styles.tabs}>
                            <button className={historyTab === 'COMP' ? styles.activeTab : ''} onClick={() => setHistoryTab('COMP')}>COMP</button>
                            <button className={historyTab === 'SOCIAL' ? styles.activeTab : ''} onClick={() => setHistoryTab('SOCIAL')}>SOCIAL</button>
                            <button className={historyTab === 'TOURNAMENT' ? styles.activeTab : ''} onClick={() => setHistoryTab('TOURNAMENT')}>TOURNAMENT</button>
                        </div>
                    </div>

                    <div className={styles.historyList}>
                        {matchHistory[historyTab].map((item: any) => (
                            <div key={item.id} className={styles.historyItem}>
                                <div className={`${styles.result} ${item.result === 'WIN' || item.result === 'MATCH' ? styles.win : styles.loss}`}>
                                    {item.result}
                                </div>
                                <div className={styles.itemMain}>
                                    <div className={styles.itemTitle}>{item.game} {item.partner ? `with ${item.partner}` : `- ${item.score || item.event}`}</div>
                                    <div className={styles.itemSub}>{item.date} • {item.kda || 'Social Session'}</div>
                                </div>
                                <ChevronRight size={18} color="var(--muted)" />
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {showSettings && (
                <div className={styles.overlay} onClick={() => setShowSettings(false)}>
                    <div className={styles.settingsPanel} onClick={e => e.stopPropagation()}>
                        <div className={styles.panelHeader}>
                            <div className={styles.panelTitle}>
                                <Settings size={20} />
                                <h2>PROFILE SETTINGS</h2>
                            </div>
                            <button onClick={() => setShowSettings(false)} className={styles.closeBtn}><X size={20} /></button>
                        </div>

                        <div className={styles.panelTabs}>
                            <button className={settingsTab === 'GENERAL' ? styles.activePanelTab : ''} onClick={() => setSettingsTab('GENERAL')}>General</button>
                            <button className={settingsTab === 'APPEARANCE' ? styles.activePanelTab : ''} onClick={() => setSettingsTab('APPEARANCE')}>Appearance</button>
                        </div>

                        <div className={styles.panelBody}>
                            {settingsTab === 'GENERAL' ? (
                                <div className={styles.settingGroup}>
                                    <h3>Personal Preferences</h3>
                                    <div className={styles.settingItem}>
                                        <div className={styles.settingDesc}>
                                            <Bell size={18} />
                                            <span>Push Notifications</span>
                                        </div>
                                        <input type="checkbox" defaultChecked />
                                    </div>
                                    <div className={styles.settingItem}>
                                        <div className={styles.settingDesc}>
                                            <Lock size={18} />
                                            <span>Private Profile</span>
                                        </div>
                                        <input type="checkbox" />
                                    </div>
                                    <button className={styles.resetBtn} onClick={resetAll} style={{ marginTop: '24px' }}>
                                        <LogOut size={18} /> RESET ALL PROGRESS
                                    </button>
                                </div>
                            ) : (
                                <div className={styles.appearanceGroup}>
                                    <h3>Choose Theme</h3>
                                    <div className={styles.themeGrid}>
                                        {[
                                            { name: 'Cyber', page: '#0a0c14', accent: '#00c9e0' },
                                            { name: 'Inferno', page: '#1a0a0c', accent: '#e8334a' },
                                            { name: 'Nature', page: '#0a1a0c', accent: '#78b854' },
                                            { name: 'Void', page: '#0f0a1a', accent: '#9b6dff' },
                                            { name: 'Gold', page: '#1a181a', accent: '#f0a500' },
                                            { name: 'Ocean', page: '#0a141a', accent: '#7dd8ff' },
                                        ].map(t => (
                                            <div 
                                                key={t.name} 
                                                className={`${styles.themeOption} ${config.accentColor === t.accent && config.primaryBg === t.page ? styles.activeTheme : ''}`}
                                                onClick={() => setTheme(t.page, t.accent)}
                                            >
                                                <div className={styles.palette}>
                                                    <div style={{ background: t.page }} title="Page Color" />
                                                    <div style={{ background: t.accent }} title="Accent Color" />
                                                </div>
                                                <span>{t.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
