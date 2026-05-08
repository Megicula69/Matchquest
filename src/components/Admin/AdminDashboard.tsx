'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  UserCheck,
  Trophy,
  Swords,
  ShieldAlert,
  Gamepad2,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  CalendarDays,
  Clock,
  Megaphone,
  Info,
  AlertTriangle,
  Server,
  Database,
  Wifi,
  Cpu,
  HardDrive,
  Shield,
} from 'lucide-react';
import styles from './AdminDashboard.module.css';

/* ========== STATS CARDS ========== */
const statsData = [
  {
    label: 'Total Registered Users',
    value: '12,847',
    trend: '+12.5%',
    trendDir: 'up' as const,
    icon: <Users size={20} />,
    accentStart: '#00c9e0',
    accentEnd: '#0ea5e9',
  },
  {
    label: 'Active Users Today',
    value: '3,214',
    trend: '+8.2%',
    trendDir: 'up' as const,
    icon: <UserCheck size={20} />,
    accentStart: '#22c55e',
    accentEnd: '#16a34a',
  },
  {
    label: 'Ongoing Tournaments',
    value: '18',
    trend: '+3',
    trendDir: 'up' as const,
    icon: <Trophy size={20} />,
    accentStart: '#f0a500',
    accentEnd: '#f59e0b',
  },
  {
    label: 'Active Matchmaking',
    value: '247',
    trend: '-2.1%',
    trendDir: 'down' as const,
    icon: <Swords size={20} />,
    accentStart: '#9b6dff',
    accentEnd: '#7c3aed',
  },
  {
    label: 'Reported Users',
    value: '34',
    trend: '-15%',
    trendDir: 'down' as const,
    icon: <ShieldAlert size={20} />,
    accentStart: '#e8334a',
    accentEnd: '#dc2626',
  },
  {
    label: 'Most Played Game',
    value: 'Valorant',
    trend: '4.2K',
    trendDir: 'up' as const,
    icon: <Gamepad2 size={20} />,
    accentStart: '#f43f5e',
    accentEnd: '#e11d48',
  },
  {
    label: 'Daily Engagement Rate',
    value: '78.4%',
    trend: '+5.3%',
    trendDir: 'up' as const,
    icon: <TrendingUp size={20} />,
    accentStart: '#00c9e0',
    accentEnd: '#9b6dff',
  },
  {
    label: 'Community Activity',
    value: '9,421',
    trend: '+22%',
    trendDir: 'up' as const,
    icon: <Activity size={20} />,
    accentStart: '#8b5cf6',
    accentEnd: '#a855f7',
  },
];

/* ========== ENGAGEMENT DATA ========== */
const engagementData = [
  { day: 'Mon', value: 65 },
  { day: 'Tue', value: 78 },
  { day: 'Wed', value: 85 },
  { day: 'Thu', value: 72 },
  { day: 'Fri', value: 92 },
  { day: 'Sat', value: 98 },
  { day: 'Sun', value: 88 },
];

/* ========== GAME DISTRIBUTION ========== */
const gameDistribution = [
  { game: 'Valorant', pct: 85, color: '#e8334a' },
  { game: 'League of Legends', pct: 72, color: '#00c9e0' },
  { game: 'CS2', pct: 58, color: '#f0a500' },
  { game: 'Dota 2', pct: 45, color: '#9b6dff' },
  { game: 'Apex Legends', pct: 38, color: '#22c55e' },
];

/* ========== ACTIVITY FEED ========== */
const activityFeed = [
  { text: '<strong>Juan Cruz</strong> registered for Valorant Masters', time: '2 min ago', color: 'cyan' },
  { text: '<strong>Team Phantom</strong> won the LoL Campus Cup finals', time: '8 min ago', color: 'green' },
  { text: 'New report filed against <strong>GhostPlayer99</strong>', time: '15 min ago', color: 'red' },
  { text: '<strong>Maria Santos</strong> achieved Diamond rank', time: '22 min ago', color: 'violet' },
  { text: 'Matchmaking queue spike detected — <strong>147 players</strong>', time: '30 min ago', color: 'gold' },
  { text: '<strong>Admin</strong> approved 12 new tournament registrations', time: '45 min ago', color: 'cyan' },
  { text: '<strong>CS2 Deathmatch</strong> event registration opened', time: '1 hr ago', color: 'green' },
  { text: '<strong>System</strong> auto-archived 3 inactive accounts', time: '2 hr ago', color: 'violet' },
];

/* ========== TOURNAMENTS ========== */
const tournaments = [
  { name: 'Valorant Campus Masters', status: 'live', players: '64/64', date: 'May 8, 2026' },
  { name: 'LoL 5v5 Championship', status: 'upcoming', players: '48/80', date: 'May 12, 2026' },
  { name: 'CS2 Deathmatch Series', status: 'registering', players: '22/32', date: 'May 15, 2026' },
  { name: 'Apex Legends Showdown', status: 'upcoming', players: '0/60', date: 'May 20, 2026' },
];

/* ========== SYSTEM STATUS ========== */
const systemStatus = [
  { name: 'API Server', status: 'online' as const, value: '99.9% uptime' },
  { name: 'Database', status: 'online' as const, value: '23ms latency' },
  { name: 'Matchmaking Engine', status: 'online' as const, value: '147 active' },
  { name: 'WebSocket Server', status: 'online' as const, value: '3.2K connections' },
  { name: 'CDN / Media', status: 'warning' as const, value: '87% capacity' },
  { name: 'Backup Service', status: 'online' as const, value: 'Last: 2h ago' },
];

const statusIcons: Record<string, React.ReactNode> = {
  'API Server': <Server size={16} />,
  'Database': <Database size={16} />,
  'Matchmaking Engine': <Swords size={16} />,
  'WebSocket Server': <Wifi size={16} />,
  'CDN / Media': <HardDrive size={16} />,
  'Backup Service': <Shield size={16} />,
};

/* ========== ANNOUNCEMENTS ========== */
const announcements = [
  {
    type: 'update',
    title: 'System Update v2.4.0 Deployed',
    desc: 'New matchmaking algorithm, improved rank calibration, and bug fixes for tournament brackets.',
    time: '2 hours ago',
  },
  {
    type: 'event',
    title: 'Campus Gaming Week Starts May 12',
    desc: 'All gaming labs will be open 24/7 during the event week. Special tournaments with prizes.',
    time: '5 hours ago',
  },
  {
    type: 'alert',
    title: 'DDoS Protection Activated',
    desc: 'Cloudflare detected unusual traffic patterns. Enhanced protection mode is now active.',
    time: '1 day ago',
  },
];

/* ========== LINE CHART COMPONENT ========== */
function EngagementChart() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const maxVal = Math.max(...engagementData.map((d) => d.value));
  const w = 100;
  const h = 100;
  const padX = 8;
  const padY = 10;
  const innerW = w - padX * 2;
  const innerH = h - padY * 2;

  const points = engagementData.map((d, i) => ({
    x: padX + (i / (engagementData.length - 1)) * innerW,
    y: padY + innerH - (d.value / maxVal) * innerH,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaPath = `${linePath} L${points[points.length - 1].x},${padY + innerH} L${points[0].x},${padY + innerH} Z`;

  return (
    <div className={styles.chartArea}>
      <svg viewBox={`0 0 ${w} ${h}`} className={styles.chartSvg} preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00c9e0" />
            <stop offset="100%" stopColor="#9b6dff" />
          </linearGradient>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0,201,224,0.25)" />
            <stop offset="100%" stopColor="rgba(0,201,224,0)" />
          </linearGradient>
        </defs>
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((pct) => {
          const y = padY + innerH - (pct / 100) * innerH;
          return (
            <line key={pct} x1={padX} y1={y} x2={w - padX} y2={y} stroke="rgba(122,128,153,0.1)" strokeWidth="0.3" />
          );
        })}
        {/* Area */}
        <path
          d={areaPath}
          fill="url(#areaGrad)"
          opacity={animated ? 1 : 0}
          style={{ transition: 'opacity 0.8s ease' }}
        />
        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={animated ? 1 : 0}
          style={{ transition: 'opacity 0.8s ease' }}
        />
        {/* Dots */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="1.5"
            fill="#00c9e0"
            opacity={animated ? 1 : 0}
            style={{ transition: `opacity 0.5s ease ${i * 0.1}s` }}
          />
        ))}
      </svg>
      {/* Day labels */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: 4,
          paddingInline: 4,
        }}
      >
        {engagementData.map((d) => (
          <span
            key={d.day}
            style={{
              fontSize: 10,
              color: 'var(--muted)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {d.day}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ========== MAIN DASHBOARD ========== */
export default function AdminDashboard() {
  const [chartTab, setChartTab] = useState('week');

  return (
    <div className={styles.dashboardGrid}>
      {/* Welcome Banner */}
      <div className={styles.welcomeBanner}>
        <div className={styles.welcomeLeft}>
          <h1>Welcome Back, Admin</h1>
          <p>
            Platform is running smoothly. <strong>3,214 players</strong> are online right now.
            <br />
            You have <strong>7 pending reports</strong> and <strong>3 tournaments</strong> needing attention.
          </p>
        </div>
        <div className={styles.welcomeRight}>
          <div className={styles.welcomeStat}>
            <div className={styles.welcomeStatValue}>99.9%</div>
            <div className={styles.welcomeStatLabel}>Uptime</div>
          </div>
          <div className={styles.welcomeStat}>
            <div className={styles.welcomeStatValue}>23ms</div>
            <div className={styles.welcomeStatLabel}>Latency</div>
          </div>
          <div className={styles.welcomeStat}>
            <div className={styles.welcomeStatValue}>4.8</div>
            <div className={styles.welcomeStatLabel}>Rating</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Platform Overview</h2>
          <span className={styles.sectionAction}>View All Metrics →</span>
        </div>
        <div className={styles.statsGrid}>
          {statsData.map((stat) => (
            <div
              key={stat.label}
              className={styles.statCard}
              style={
                {
                  '--accent-start': stat.accentStart,
                  '--accent-end': stat.accentEnd,
                } as React.CSSProperties
              }
            >
              <div className={styles.statCardHeader}>
                <div className={styles.statIcon}>{stat.icon}</div>
                <div className={`${styles.statTrend} ${styles[stat.trendDir]}`}>
                  {stat.trendDir === 'up' ? (
                    <ArrowUpRight size={14} />
                  ) : (
                    <ArrowDownRight size={14} />
                  )}
                  {stat.trend}
                </div>
              </div>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className={styles.chartsRow}>
        {/* Engagement Chart */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Player Engagement</h3>
            <div className={styles.chartTabs}>
              {['day', 'week', 'month'].map((tab) => (
                <button
                  key={tab}
                  className={`${styles.chartTab} ${chartTab === tab ? styles.active : ''}`}
                  onClick={() => setChartTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <EngagementChart />
        </div>

        {/* Game Distribution */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Game Distribution</h3>
          </div>
          <div className={styles.barChartArea}>
            {gameDistribution.map((game) => (
              <div key={game.game} className={styles.gameBar}>
                <span className={styles.gameLabel}>{game.game}</span>
                <div className={styles.gameBarTrack}>
                  <div
                    className={styles.gameBarFill}
                    style={{
                      width: `${game.pct}%`,
                      background: `linear-gradient(90deg, ${game.color}, ${game.color}88)`,
                    }}
                  >
                    <span className={styles.gameBarValue}>{game.pct}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid: Activity + Tournaments + System Status */}
      <div className={styles.bottomGrid}>
        {/* Activity Feed */}
        <div className={styles.feedCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Real-Time Activity</h3>
            <span className={styles.sectionAction}>View All →</span>
          </div>
          <div className={styles.feedList}>
            {activityFeed.map((item, i) => (
              <div key={i} className={styles.feedItem}>
                <div className={`${styles.feedDot} ${styles[item.color]}`} />
                <div className={styles.feedContent}>
                  <div
                    className={styles.feedText}
                    dangerouslySetInnerHTML={{ __html: item.text }}
                  />
                  <div className={styles.feedTime}>{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tournaments */}
        <div className={styles.tournamentsCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Tournaments</h3>
            <span className={styles.sectionAction}>Manage →</span>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {tournaments.map((t) => (
              <div key={t.name} className={styles.tournamentItem}>
                <div className={styles.tournamentTop}>
                  <span className={styles.tournamentName}>{t.name}</span>
                  <span className={`${styles.tournamentStatus} ${styles[t.status]}`}>
                    {t.status}
                  </span>
                </div>
                <div className={styles.tournamentMeta}>
                  <span>
                    <Users size={12} /> {t.players}
                  </span>
                  <span>
                    <CalendarDays size={12} /> {t.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className={styles.statusCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>System Status</h3>
            <span className={styles.sectionAction}>Details →</span>
          </div>
          <div className={styles.statusList}>
            {systemStatus.map((s) => (
              <div key={s.name} className={styles.statusItem}>
                <div className={styles.statusLeft}>
                  <div className={`${styles.statusIndicator} ${styles[s.status]}`} />
                  <span className={styles.statusName}>{s.name}</span>
                </div>
                <span className={styles.statusValue}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Announcements Row */}
      <div className={styles.bottomRow}>
        <div className={styles.announcementsCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Recent Announcements</h3>
            <span className={styles.sectionAction}>View All →</span>
          </div>
          {announcements.map((a, i) => (
            <div key={i} className={styles.announcementItem}>
              <div className={`${styles.announcementIcon} ${styles[a.type]}`}>
                {a.type === 'update' && <Info size={18} />}
                {a.type === 'alert' && <AlertTriangle size={18} />}
                {a.type === 'event' && <Megaphone size={18} />}
              </div>
              <div className={styles.announcementContent}>
                <div className={styles.announcementTitle}>{a.title}</div>
                <div className={styles.announcementDesc}>{a.desc}</div>
              </div>
              <div className={styles.announcementTime}>{a.time}</div>
            </div>
          ))}
        </div>

        {/* Quick Stats Recap */}
        <div className={styles.statusCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Server Resources</h3>
          </div>
          <div className={styles.statusList}>
            <div className={styles.statusItem}>
              <div className={styles.statusLeft}>
                <Cpu size={16} style={{ color: 'var(--cyan)' }} />
                <span className={styles.statusName}>CPU Usage</span>
              </div>
              <span className={styles.statusValue}>34%</span>
            </div>
            <div className={styles.statusItem}>
              <div className={styles.statusLeft}>
                <Activity size={16} style={{ color: 'var(--violet)' }} />
                <span className={styles.statusName}>Memory</span>
              </div>
              <span className={styles.statusValue}>6.2 / 16 GB</span>
            </div>
            <div className={styles.statusItem}>
              <div className={styles.statusLeft}>
                <HardDrive size={16} style={{ color: 'var(--gold)' }} />
                <span className={styles.statusName}>Disk I/O</span>
              </div>
              <span className={styles.statusValue}>120 MB/s</span>
            </div>
            <div className={styles.statusItem}>
              <div className={styles.statusLeft}>
                <Wifi size={16} style={{ color: 'var(--cyan)' }} />
                <span className={styles.statusName}>Network</span>
              </div>
              <span className={styles.statusValue}>2.4 Gbps</span>
            </div>
            <div className={styles.statusItem}>
              <div className={styles.statusLeft}>
                <Database size={16} style={{ color: '#22c55e' }} />
                <span className={styles.statusName}>DB Connections</span>
              </div>
              <span className={styles.statusValue}>84 / 200</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
