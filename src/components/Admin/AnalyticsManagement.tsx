'use client';

import React, { useState } from 'react';
import { 
  BarChart3, Users, Swords, Trophy, Activity, 
  Cpu, HardDrive, Globe, Zap, ArrowUpRight, 
  ArrowDownRight, Calendar, Filter, Download,
  Clock, ShieldAlert, Database, Signal
} from 'lucide-react';
import styles from './AnalyticsManagement.module.css';

export default function AnalyticsManagement() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>System Intelligence</h1>
        <div className={styles.controls}>
          <select className={styles.select} value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <button className={styles.select} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Download size={14} /> Export Report
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.cardTitle}><Users size={16} color="var(--cyan)" /> Total Active Users</div>
          <div className={styles.cardValue}>12,482</div>
          <div className={`${styles.trend} ${styles.up}`}>
            <ArrowUpRight size={14} /> +12.4% vs last week
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}><Swords size={16} color="var(--violet)" /> Match Success Rate</div>
          <div className={styles.cardValue}>94.2%</div>
          <div className={`${styles.trend} ${styles.up}`}>
            <ArrowUpRight size={14} /> +2.1% improvement
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}><Trophy size={16} color="var(--gold)" /> Tournament Teams</div>
          <div className={styles.cardValue}>156</div>
          <div className={`${styles.trend} ${styles.up}`}>
            <ArrowUpRight size={14} /> +8 new teams
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}><Activity size={16} color="var(--red)" /> Avg. Session Time</div>
          <div className={styles.cardValue}>42m</div>
          <div className={`${styles.trend} ${styles.down}`}>
            <ArrowDownRight size={14} /> -3.5% vs last week
          </div>
        </div>
      </div>

      <div className={styles.mainLayout}>
        <div className={styles.section}>
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <h2 className={styles.cardTitle}>User Growth & Engagement</h2>
              <div style={{ display: 'flex', gap: '16px', fontSize: '10px', fontFamily: 'var(--font-mono)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '8px', height: '8px', background: 'var(--cyan)' }} /> New Users</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '8px', height: '8px', background: 'var(--violet)' }} /> Active Sessions</span>
              </div>
            </div>
            <div className={styles.chartContainer}>
              <svg width="100%" height="100%" viewBox="0 0 800 300" preserveAspectRatio="none">
                {/* Grid Lines */}
                <line x1="0" y1="50" x2="800" y2="50" stroke="rgba(255,255,255,0.05)" />
                <line x1="0" y1="150" x2="800" y2="150" stroke="rgba(255,255,255,0.05)" />
                <line x1="0" y1="250" x2="800" y2="250" stroke="rgba(255,255,255,0.05)" />
                
                {/* Area Gradient */}
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Engagement Line */}
                <path 
                  d="M0,250 L50,230 L100,240 L150,180 L200,190 L250,140 L300,150 L350,100 L400,120 L450,70 L500,80 L550,40 L600,60 L650,20 L700,30 L800,10" 
                  fill="none" 
                  stroke="var(--cyan)" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                <path 
                  d="M0,250 L50,230 L100,240 L150,180 L200,190 L250,140 L300,150 L350,100 L400,120 L450,70 L500,80 L550,40 L600,60 L650,20 L700,30 L800,10 L800,300 L0,300 Z" 
                  fill="url(#areaGrad)" 
                />
              </svg>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', fontSize: '10px', fontFamily: 'var(--font-mono)', marginTop: '12px' }}>
              <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
            </div>
          </div>

          <div className={styles.chartCard} style={{ marginTop: '24px' }}>
            <h2 className={styles.cardTitle}><Clock size={16} /> Peak Activity Heatmap (24h)</h2>
            <div className={styles.heatmapGrid}>
              {Array.from({ length: 48 }).map((_, i) => {
                const intensity = Math.sin(i / 5) * 0.5 + 0.5;
                return (
                  <div 
                    key={i} 
                    className={styles.heatmapCell} 
                    style={{ background: `rgba(0, 201, 224, ${intensity})`, boxShadow: intensity > 0.8 ? '0 0 10px rgba(0, 201, 224, 0.3)' : 'none' }} 
                  />
                );
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', fontSize: '10px', fontFamily: 'var(--font-mono)', marginTop: '8px' }}>
              <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:59</span>
            </div>
          </div>
        </div>

        <div className={styles.systemMonitor}>
          <div className={styles.chartCard}>
            <h2 className={styles.cardTitle} style={{ marginBottom: '20px' }}><Globe size={16} /> Server Resources</h2>
            <div className={styles.monitorCard}>
              <div className={styles.monitorHeader}><span>CPU Usage</span><span>42%</span></div>
              <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: '42%' }} /></div>
              <div className={styles.monitorStats}><span>8 Cores</span><span>2.4 GHz</span></div>
            </div>
            <div className={styles.monitorCard} style={{ marginTop: '12px' }}>
              <div className={styles.monitorHeader}><span>Memory (RAM)</span><span>68%</span></div>
              <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: '68%', background: 'var(--violet)', boxShadow: '0 0 10px var(--violet)' }} /></div>
              <div className={styles.monitorStats}><span>10.8 GB</span><span>16 GB Total</span></div>
            </div>
            <div className={styles.monitorCard} style={{ marginTop: '12px' }}>
              <div className={styles.monitorHeader}><span>Disk I/O</span><span>12%</span></div>
              <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: '12%', background: '#22c55e', boxShadow: '0 0 10px #22c55e' }} /></div>
              <div className={styles.monitorStats}><span>142 MB/s</span><span>SSD NVMe</span></div>
            </div>
          </div>

          <div className={styles.chartCard}>
            <h2 className={styles.cardTitle} style={{ marginBottom: '16px' }}><Zap size={16} /> Match Popularity</h2>
            <div className={styles.pieContainer}>
              <div className={styles.pieMock} />
            </div>
            <div className={styles.legend}>
              <div className={styles.legendItem}><div className={styles.legendDot} style={{ background: 'var(--cyan)' }} /> Valorant (50%)</div>
              <div className={styles.legendItem}><div className={styles.legendDot} style={{ background: 'var(--violet)' }} /> MLBB (25%)</div>
              <div className={styles.legendItem}><div className={styles.legendDot} style={{ background: 'var(--gold)' }} /> Wild Rift (25%)</div>
            </div>
          </div>

          <div className={styles.chartCard} style={{ background: 'rgba(232, 51, 74, 0.05)', borderColor: 'rgba(232, 51, 74, 0.2)' }}>
            <h2 className={styles.cardTitle} style={{ color: 'var(--red)' }}><ShieldAlert size={16} /> Infrastructure Alerts</h2>
            <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '12px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Signal size={14} color="var(--red)" /> High API Latency (Region: Pasig)
              </div>
              <div style={{ fontSize: '12px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Database size={14} color="var(--gold)" /> DB Replication Lag: 2.4s
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
