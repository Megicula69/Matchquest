'use client';

import React from 'react';
import { 
  Award, Trophy, Star, Zap, Target, 
  Crown, TrendingUp, ShieldCheck, Flame,
  Search, Plus, Filter, Medal, Gift,
  CheckCircle2, Clock
} from 'lucide-react';
import styles from './RewardsManagement.module.css';

interface Achievement {
  id: string;
  title: string;
  description: string;
  xp: number;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  category: string;
  icon: React.ReactNode;
}

const mockAchievements: Achievement[] = [
  { id: '1', title: 'First Blood', description: 'Win your first ever tournament match in Lungsod Arena.', xp: 500, rarity: 'Common', category: 'Tournament', icon: <Swords size={28} /> },
  { id: '2', title: 'Campus Legend', description: 'Maintain a top 10 rank on the PLP leaderboard for a full month.', xp: 5000, rarity: 'Legendary', category: 'Competitive', icon: <Crown size={28} /> },
  { id: '3', title: 'Community Pillar', description: 'Write 50 helpful posts in the student community hub.', xp: 1200, rarity: 'Epic', category: 'Social', icon: <Star size={28} /> },
  { id: '4', title: 'Unstoppable', description: 'Achieve a 10-match win streak in competitive matchmaking.', xp: 2500, rarity: 'Epic', category: 'Competitive', icon: <Flame size={28} /> },
  { id: '5', title: 'Fair Play', description: 'Complete a full semester with a 100/100 reputation score.', xp: 2000, rarity: 'Rare', category: 'Integrity', icon: <ShieldCheck size={28} /> },
  { id: '6', title: 'Team Player', description: 'Assist teammates in 500 kills across all game modes.', xp: 1500, rarity: 'Rare', category: 'Social', icon: <Medal size={28} /> }
];

// Helper icons since I can't import Swords here again without re-defining
import { Swords } from 'lucide-react';

export default function RewardsManagement() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Gamification & Rewards</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
            <input 
              type="text" 
              placeholder="Search achievements..." 
              style={{ background: 'var(--surface)', border: '1px solid rgba(0, 201, 224, 0.1)', borderRadius: '10px', padding: '10px 16px 10px 40px', color: 'var(--text)', fontSize: '14px', outline: 'none' }} 
            />
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'linear-gradient(135deg, var(--cyan), var(--violet))', border: 'none', borderRadius: '10px', color: '#0a0c14', fontWeight: 600, cursor: 'pointer' }}>
            <Plus size={18} /> Create New
          </button>
        </div>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}><Medal size={20} color="var(--cyan)" /> Master Achievement List</h2>
          <div className={styles.achievementGrid}>
            {mockAchievements.map((ach) => (
              <div key={ach.id} className={styles.achievementCard}>
                <div className={styles.badgeIcon}>{ach.icon}</div>
                <div className={styles.cardContent}>
                  <div className={styles.badgeTitle}>{ach.title}</div>
                  <div className={styles.badgeDesc}>{ach.description}</div>
                  <div className={styles.cardMeta}>
                    <span className={styles.xpBadge}>+{ach.xp} XP</span>
                    <span className={`${styles.rarity} ${styles[ach.rarity.toLowerCase()]}`}>{ach.rarity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className={styles.sectionTitle} style={{ marginTop: '12px' }}><Gift size={20} color="var(--violet)" /> Seasonal Rewards (S1: Origin)</h2>
          <div className={styles.achievementGrid}>
            <div className={styles.achievementCard} style={{ borderStyle: 'dashed' }}>
              <div className={styles.badgeIcon} style={{ color: 'var(--violet)' }}><Trophy size={28} /></div>
              <div className={styles.cardContent}>
                <div className={styles.badgeTitle}>S1 Champion Skin</div>
                <div className={styles.badgeDesc}>Exclusive Valorant weapon skin for reaching Radiant rank in Season 1.</div>
                <div className={styles.cardMeta}>
                  <span className={styles.xpBadge}>Tier 100</span>
                  <span className={`${styles.rarity} ${styles.legendary}`}>Seasonal</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className={styles.sidebarSection}>
            <h2 className={styles.sectionTitle}><Target size={18} color="var(--cyan)" /> Daily Missions</h2>
            <div className={styles.missionItem}>
              <div className={styles.missionHeader}><span>Win 3 Matches</span><span>1/3</span></div>
              <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: '33%' }} /></div>
            </div>
            <div className={styles.missionItem}>
              <div className={styles.missionHeader}><span>Post in Hub</span><span>0/1</span></div>
              <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: '0%' }} /></div>
            </div>
            <div className={styles.missionItem}>
              <div className={styles.missionHeader}><span>Verify 5 Users</span><span>5/5</span></div>
              <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: '100%', background: '#22c55e' }} /></div>
            </div>
          </div>

          <div className={styles.sidebarSection}>
            <h2 className={styles.sectionTitle}><TrendingUp size={18} color="var(--gold)" /> Global Leaderboard</h2>
            <div className={styles.leaderboard}>
              <div className={styles.playerRow}>
                <span className={styles.rank}>01</span>
                <div className={styles.avatar}></div>
                <span className={styles.playerName}>ShadowSlayer_X</span>
                <span className={styles.playerXP}>142,500 XP</span>
              </div>
              <div className={styles.playerRow}>
                <span className={styles.rank}>02</span>
                <div className={styles.avatar}></div>
                <span className={styles.playerName}>CyberQueen</span>
                <span className={styles.playerXP}>138,200 XP</span>
              </div>
              <div className={styles.playerRow}>
                <span className={styles.rank}>03</span>
                <div className={styles.avatar}></div>
                <span className={styles.playerName}>GhostInTheLab</span>
                <span className={styles.playerXP}>125,000 XP</span>
              </div>
            </div>
            <button style={{ padding: '10px', background: 'var(--surface2)', border: '1px solid rgba(0, 201, 224, 0.1)', borderRadius: '10px', color: 'var(--cyan)', fontSize: '12px', cursor: 'pointer' }}>View Full Rankings</button>
          </div>

          <div className={styles.sidebarSection} style={{ background: 'rgba(240, 165, 0, 0.05)', borderColor: 'rgba(240, 165, 0, 0.2)' }}>
            <h2 className={styles.sectionTitle} style={{ color: 'var(--gold)' }}><Flame size={18} /> Active Events</h2>
            <div style={{ fontSize: '12px', color: 'var(--muted)', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Clock size={14} /> Double XP Weekend (Live)
            </div>
            <div style={{ fontSize: '12px', color: 'var(--muted)', display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
              <Zap size={14} /> Tournament Bonus: +50% XP
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
