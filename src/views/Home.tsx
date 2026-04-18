import React from 'react';
import styles from './Home.module.css';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { UserProfile, StoryState } from '../types';
import { Activity, Trophy, Zap, Shield, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
    const [profile] = useLocalStorage<UserProfile | null>('mq_profile', null);
    const [story] = useLocalStorage<StoryState | null>('mq_story_state', null);

    if (!profile) return null;

    const activityFeed = [
        { id: 1, type: 'MATCH', text: 'You matched with ShadowSlayer', time: '2m ago' },
        { id: 2, type: 'TOURNEY', text: 'Valorant Pasig Open starts in 2 days', time: '1h ago' },
        { id: 3, type: 'RANK', text: 'Reached Platinum III', time: '5h ago' },
        { id: 4, type: 'SOCIAL', text: 'Luna_Tic sent you a message', time: '1d ago' },
    ];

    return (
        <div className="fade-in">
            <header className={styles.header}>
                <div className={styles.scoreTitle}>Arena Score</div>
                <div className={styles.scoreValue}>{profile.arenaScore.toLocaleString()}</div>
            </header>

            <section className={styles.statGrid}>
                <div className={styles.statCard}>
                    <Activity className={styles.iconCyan} />
                    <div className={styles.statLabel}>KDA Ratio</div>
                    <div className={styles.statValue}>{profile.stats.kda}</div>
                </div>
                <div className={styles.statCard}>
                    <Zap className={styles.iconGold} />
                    <div className={styles.statLabel}>Win Rate</div>
                    <div className={styles.statValue}>{profile.stats.winRate}</div>
                </div>
                <div className={styles.statCard}>
                    <Trophy className={styles.iconViolet} />
                    <div className={styles.statLabel}>Tournaments</div>
                    <div className={styles.statValue}>{profile.stats.tournaments}</div>
                </div>
                <div className={styles.statCard}>
                    <Shield className={styles.iconRed} />
                    <div className={styles.statLabel}>Reputation</div>
                    <div className={styles.statValue}>{profile.stats.reputation}%</div>
                </div>
            </section>

            <div className={styles.contentGrid}>
                <section className={styles.feedSection}>
                    <h2 className={styles.sectionTitle}>Recent Activity</h2>
                    <div className={styles.feed}>
                        {activityFeed.map(item => (
                            <div key={item.id} className={styles.feedItem}>
                                <span className={`${styles.pill} ${styles[item.type]}`}>{item.type}</span>
                                <span className={styles.feedText}>{item.text}</span>
                                <span className={styles.feedTime}>{item.time}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className={styles.storySection}>
                    <Link to="/story" className={styles.storyCard}>
                        <div className={styles.storyHeader}>
                            <h2 className={styles.sectionTitle}>Story Mode</h2>
                            <ChevronRight />
                        </div>
                        <p className={styles.storyDesc}>Chapter {story?.chapter || 1}: {story?.currentSceneId || 'Genesis'}</p>
                        <div className={styles.hudStats}>
                            <div className={styles.hudItem}>
                                <span>GPA</span>
                                <div className={styles.progressBar}><div style={{ width: `${story?.stats.gpa || 50}%`, background: 'var(--cyan)' }}></div></div>
                            </div>
                            <div className={styles.hudItem}>
                                <span>ELO</span>
                                <div className={styles.progressBar}><div style={{ width: `${story?.stats.elo || 50}%`, background: 'var(--violet)' }}></div></div>
                            </div>
                            <div className={styles.hudItem}>
                                <span>MORALE</span>
                                <div className={styles.progressBar}><div style={{ width: `${story?.stats.morale || 50}%`, background: 'var(--gold)' }}></div></div>
                            </div>
                            <div className={styles.hudItem}>
                                <span>STAMINA</span>
                                <div className={styles.progressBar}><div style={{ width: `${story?.stats.stamina || 100}%`, background: 'var(--red)' }}></div></div>
                            </div>
                        </div>
                    </Link>
                </section>
            </div>
        </div>
    );
};
