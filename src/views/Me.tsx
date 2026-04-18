import React, { useState } from 'react';
import styles from './Me.module.css';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { UserProfile } from '../types';
import { Settings, LogOut, Shield, Trophy, Activity, Zap, ChevronRight, Bell, Moon, Lock } from 'lucide-react';

export const MePage: React.FC = () => {
    const [profile, setProfile] = useLocalStorage<UserProfile | null>('mq_profile', null);
    const [historyTab, setHistoryTab] = useState<'COMP' | 'SOCIAL' | 'TOURNAMENT'>('COMP');
    const [showSettings, setShowSettings] = useState(false);

    if (!profile) return null;

    const resetAll = () => {
        if (window.confirm('Are you sure? This will wipe ALL your progress.')) {
            window.localStorage.clear();
            window.location.reload();
        }
    };

    const scorePercentage = (profile.arenaScore % 2000) / 20; // Simplified for visual

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

            {showSettings && (
                <div className={styles.overlay} onClick={() => setShowSettings(false)}>
                    <div className={styles.settingsPanel} onClick={e => e.stopPropagation()}>
                        <div className={styles.panelHeader}>
                            <h2>SETTINGS</h2>
                            <button onClick={() => setShowSettings(false)}><ChevronRight /></button>
                        </div>
                        <div className={styles.panelBody}>
                            <div className={styles.settingGroup}>
                                <div className={styles.settingItem}>
                                    <div className={styles.settingDesc}>
                                        <Bell size={18} />
                                        <span>Push Notifications</span>
                                    </div>
                                    <input type="checkbox" defaultChecked />
                                </div>
                                <div className={styles.settingItem}>
                                    <div className={styles.settingDesc}>
                                        <Moon size={18} />
                                        <span>Dark Mode (Always On)</span>
                                    </div>
                                    <input type="checkbox" checked readOnly />
                                </div>
                                <div className={styles.settingItem}>
                                    <div className={styles.settingDesc}>
                                        <Lock size={18} />
                                        <span>Private Profile</span>
                                    </div>
                                    <input type="checkbox" />
                                </div>
                            </div>

                            <button className={styles.resetBtn} onClick={resetAll}>
                                <LogOut size={18} /> RESET ALL PROGRESS
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
