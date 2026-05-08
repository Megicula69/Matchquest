'use client';

import React from 'react';
import { 
  ShieldAlert, ShieldCheck, Lock, Unlock, 
  MapPin, Clock, Globe, Fingerprint, 
  AlertTriangle, History, ShieldX, UserCheck,
  Search, Filter, Download, MoreVertical,
  Terminal, Activity, Eye
} from 'lucide-react';
import styles from './SecurityManagement.module.css';

interface SecurityLog {
  id: string;
  user: string;
  action: string;
  ip: string;
  location: string;
  status: 'success' | 'failed' | 'warning';
  timestamp: string;
}

const mockLogs: SecurityLog[] = [
  { id: '1', user: 'Admin_Master', action: 'Admin Login', ip: '192.168.1.42', location: 'Pasig City, PH', status: 'success', timestamp: '2026-05-08 19:10:22' },
  { id: '2', user: 'Unknown', action: 'Failed Login Attempt', ip: '45.12.99.12', location: 'Moscow, RU', status: 'failed', timestamp: '2026-05-08 18:45:10' },
  { id: '3', user: 'Mod_Slayer', action: 'Permanent Ban Issued', ip: '192.168.1.15', location: 'Pasig City, PH', status: 'warning', timestamp: '2026-05-08 18:22:05' },
  { id: '4', user: 'System', action: '2FA Verification Enabled', ip: 'Internal', location: 'Server Hub', status: 'success', timestamp: '2026-05-08 17:50:00' },
  { id: '5', user: 'ShadowUser', action: 'Password Change', ip: '110.54.21.8', location: 'Manila, PH', status: 'success', timestamp: '2026-05-08 17:15:30' }
];

export default function SecurityManagement() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Security Operations Center</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'var(--surface)', border: '1px solid rgba(232, 51, 74, 0.2)', borderRadius: '10px', color: 'var(--red)', fontWeight: 600, cursor: 'pointer' }}>
            <ShieldAlert size={18} /> Active Threats: 2
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'rgba(232, 51, 74, 0.1)', border: '1px solid var(--red)', borderRadius: '10px', color: 'var(--red)', fontWeight: 600, cursor: 'pointer' }}>
            <Lock size={18} /> Emergency Lockdown
          </button>
        </div>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.section}>
          <div className={styles.panel}>
            <h2 className={styles.panelTitle}><Terminal size={20} /> Real-Time Access Logs</h2>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>User / Identity</th>
                    <th>Action</th>
                    <th>IP / Location</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {mockLogs.map((log) => (
                    <tr key={log.id}>
                      <td style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>{log.timestamp}</td>
                      <td style={{ fontWeight: 600 }}>{log.user}</td>
                      <td>{log.action}</td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: '12px' }}>{log.ip}</span>
                          <span style={{ fontSize: '10px', color: 'var(--muted)' }}>{log.location}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`${styles.status} ${styles[log.status]}`}>{log.status}</span>
                      </td>
                      <td><button style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}><Eye size={16} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className={styles.panel}>
            <h2 className={styles.panelTitle} style={{ color: 'var(--cyan)' }}><Activity size={20} /> Security Timeline</h2>
            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <div className={styles.timeIcon} style={{ color: 'var(--red)' }}><AlertTriangle size={18} /></div>
                <div className={styles.timeContent}>
                  <div className={styles.timeHeader}>
                    <span className={styles.timeTitle}>Brute Force Detected</span>
                    <span className={styles.timestamp}>18:45</span>
                  </div>
                  <div className={styles.timeText}>15 failed attempts from 45.12.99.12 (Russia)</div>
                </div>
              </div>
              <div className={styles.timelineItem}>
                <div className={styles.timeIcon} style={{ color: '#22c55e' }}><UserCheck size={18} /></div>
                <div className={styles.timeContent}>
                  <div className={styles.timeHeader}>
                    <span className={styles.timeTitle}>Admin Elevated</span>
                    <span className={styles.timestamp}>19:10</span>
                  </div>
                  <div className={styles.timeText}>Admin_Master session extended (2FA Verified)</div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.panel}>
            <h2 className={styles.panelTitle} style={{ color: 'var(--gold)' }}><MapPin size={20} /> Threat Origin Map</h2>
            <div className={styles.mapArea}>
              <div className={styles.mapPulse} style={{ top: '30%', left: '70%' }} />
              <div className={styles.mapPulse} style={{ top: '60%', left: '40%', animationDelay: '0.5s' }} />
              <div className={styles.mapPulse} style={{ top: '45%', left: '15%', animationDelay: '1s', background: 'var(--gold)', boxShadow: '0 0 15px var(--gold)' }} />
            </div>
            <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                <span style={{ color: 'var(--muted)' }}>Global Traffic</span>
                <span style={{ color: 'var(--red)' }}>High Risk</span>
              </div>
              <div style={{ width: '100%', height: '4px', background: 'var(--surface2)', borderRadius: '2px' }}>
                <div style={{ width: '75%', height: '100%', background: 'var(--red)', borderRadius: '2px' }} />
              </div>
            </div>
          </div>

          <div className={styles.panel} style={{ background: 'rgba(0, 201, 224, 0.05)', borderColor: 'rgba(0, 201, 224, 0.1)' }}>
            <h2 className={styles.panelTitle} style={{ color: 'var(--cyan)' }}><Fingerprint size={20} /> Active Sessions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span>Administrators</span>
                <span style={{ color: 'var(--cyan)' }}>3 Active</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span>Moderators</span>
                <span style={{ color: 'var(--cyan)' }}>8 Active</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span>Students</span>
                <span style={{ color: 'var(--cyan)' }}>1,420 Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
