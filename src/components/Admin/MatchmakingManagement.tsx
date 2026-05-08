'use client';

import React, { useState, useEffect } from 'react';
import { 
  Swords, Users, Clock, Target, ShieldCheck, 
  UserCircle2, Activity, Zap, X, Check, 
  Filter, BarChart3, Map, TrendingUp
} from 'lucide-react';
import styles from './MatchmakingManagement.module.css';

interface Player {
  id: string;
  name: string;
  rank: string;
  role: string;
  games: string[];
  compatibility: number;
  reputation: number;
  status: 'online' | 'in-queue';
}

const mockPlayers: Player[] = [
  {
    id: '1',
    name: 'PhantomViper',
    rank: 'Diamond III',
    role: 'Duelist / Entry',
    games: ['Valorant', 'CS2'],
    compatibility: 94,
    reputation: 98,
    status: 'in-queue'
  },
  {
    id: '2',
    name: 'CyberKitten',
    rank: 'Platinum II',
    role: 'Support / Healer',
    games: ['MLBB', 'Wild Rift'],
    compatibility: 88,
    reputation: 95,
    status: 'in-queue'
  },
  {
    id: '3',
    name: 'NeonShadow',
    rank: 'Ascendant I',
    role: 'Controller / Smokes',
    games: ['Valorant'],
    compatibility: 91,
    reputation: 85,
    status: 'in-queue'
  }
];

export default function MatchmakingManagement() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [queueTime, setQueueTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQueueTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNextCard = () => {
    setCurrentCardIndex(prev => (prev + 1) % mockPlayers.length);
  };

  const currentPlayer = mockPlayers[currentCardIndex];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Matchmaking Hub</h1>
        <div className={styles.compatibilityScore}>
          <Activity size={16} /> Live Feed: 142 Sessions Active
        </div>
      </div>

      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Active Queues</span>
          <span className={styles.statValue}>842</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Avg. Wait Time</span>
          <span className={styles.statValue}>0:42s</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Match Success Rate</span>
          <span className={styles.statValue}>94.2%</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Reports (Today)</span>
          <span className={styles.statValue} style={{ color: 'var(--red)' }}>12</span>
        </div>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.queueSection}>
          <h2 className={styles.sectionTitle}>
            <TrendingUp size={20} color="var(--cyan)" /> Real-Time Queue Monitoring
          </h2>
          <div className={styles.chartContainer}>
            {/* Simple CSS-based visualization of queue spikes */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '100%', paddingBottom: '20px' }}>
              {[40, 65, 45, 90, 75, 55, 85, 95, 60, 40, 70, 80, 50, 90].map((h, i) => (
                <div 
                  key={i} 
                  style={{ 
                    flex: 1, 
                    height: `${h}%`, 
                    background: i === 7 ? 'var(--cyan)' : 'var(--surface2)', 
                    borderRadius: '4px',
                    transition: 'height 0.5s ease',
                    position: 'relative'
                  }} 
                >
                  {i === 7 && <div style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)', fontSize: '10px', color: 'var(--cyan)', fontFamily: 'var(--font-mono)' }}>PEAK</div>}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', fontSize: '10px', fontFamily: 'var(--font-mono)' }}>
              <span>18:00</span>
              <span>18:30</span>
              <span>19:00</span>
              <span>19:30</span>
              <span>20:00</span>
            </div>
          </div>

          <h2 className={styles.sectionTitle}>
            <Map size={20} color="var(--violet)" /> Regional Activity Heatmap
          </h2>
          <div className={styles.heatmapContainer}>
            {Array.from({ length: 96 }).map((_, i) => {
              const opacity = Math.random() * 0.8 + 0.1;
              return (
                <div 
                  key={i} 
                  className={styles.heatmapCell} 
                  style={{ 
                    background: i % 7 === 0 ? `rgba(155, 109, 255, ${opacity})` : `rgba(0, 201, 224, ${opacity})`,
                    boxShadow: opacity > 0.7 ? `0 0 10px rgba(0, 201, 224, 0.2)` : 'none'
                  }} 
                />
              );
            })}
          </div>
        </div>

        <div className={styles.swipeSection}>
          <h2 className={styles.sectionTitle}>
            <Target size={20} color="var(--gold)" /> Smart Match Suggestions
          </h2>
          <div className={styles.cardStack}>
            <div className={styles.playerCard}>
              <div className={styles.cardTop}>
                <div className={styles.avatar} style={{ background: `linear-gradient(135deg, ${currentPlayer.compatibility > 90 ? 'var(--cyan)' : 'var(--violet)'}, #0a0c14)` }} />
                <div className={styles.playerInfo}>
                  <div className={styles.playerName}>{currentPlayer.name}</div>
                  <div className={styles.playerRank}>{currentPlayer.rank}</div>
                </div>
                <div className={styles.compatibilityScore}>
                  {currentPlayer.compatibility}%
                </div>
              </div>

              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <div className={styles.detailLabel}>Preferred Role</div>
                  <div className={styles.detailValue}>{currentPlayer.role}</div>
                </div>
                <div className={styles.detailItem}>
                  <div className={styles.detailLabel}>Reputation Score</div>
                  <div className={styles.detailValue} style={{ color: '#22c55e' }}>{currentPlayer.reputation} / 100</div>
                </div>
                <div className={styles.detailItem}>
                  <div className={styles.detailLabel}>Main Titles</div>
                  <div className={styles.detailValue}>{currentPlayer.games.join(', ')}</div>
                </div>
                <div className={styles.detailItem}>
                  <div className={styles.detailLabel}>Matchmaking Mode</div>
                  <div className={styles.detailValue}>Competitive</div>
                </div>
              </div>

              <div style={{ background: 'rgba(0, 201, 224, 0.05)', padding: '12px', borderRadius: '12px', fontSize: '12px', border: '1px dashed rgba(0, 201, 224, 0.2)' }}>
                <div style={{ color: 'var(--cyan)', fontWeight: 700, marginBottom: '4px' }}>MATCH LOGIC:</div>
                Skill gap: &lt; 200 ELO. High communication score. Previously played together (Won).
              </div>

              <div className={styles.actions}>
                <div className={`${styles.actionBtn} ${styles.rejectBtn}`} onClick={handleNextCard}>
                  <X size={24} />
                </div>
                <div className={`${styles.actionBtn} ${styles.acceptBtn}`} onClick={handleNextCard}>
                  <Check size={24} />
                </div>
              </div>
            </div>
          </div>

          <h2 className={styles.sectionTitle} style={{ marginTop: '20px' }}>
            <Clock size={20} color="var(--muted)" /> Active Queue List
          </h2>
          <div className={styles.queueList}>
            <div className={styles.queueItem}>
              <div>
                <div style={{ fontWeight: 600 }}>ToxicitySlayer</div>
                <div className={styles.queueMode}>Competitive · Valorant</div>
              </div>
              <div className={styles.queueWait}>0:45s</div>
            </div>
            <div className={styles.queueItem} style={{ borderLeftColor: 'var(--violet)' }}>
              <div>
                <div style={{ fontWeight: 600 }}>GlitchMaster</div>
                <div className={styles.queueMode}>Social · MLBB</div>
              </div>
              <div className={styles.queueWait}>1:12s</div>
            </div>
            <div className={styles.queueItem} style={{ borderLeftColor: 'var(--gold)' }}>
              <div>
                <div style={{ fontWeight: 600 }}>ShadowRealm</div>
                <div className={styles.queueMode}>Duo · Wild Rift</div>
              </div>
              <div className={styles.queueWait}>0:08s</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
