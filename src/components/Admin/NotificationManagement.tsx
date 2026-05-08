'use client';

import React, { useState } from 'react';
import { 
  Bell, Send, Clock, ShieldAlert, CheckCircle2, 
  AlertTriangle, Info, Megaphone, Trophy, 
  Swords, MessageSquare, Settings, Trash2,
  Calendar, Zap, Radio, History
} from 'lucide-react';
import styles from './NotificationManagement.module.css';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'alert' | 'info';
  category: string;
  timestamp: string;
  reach: number;
}

const mockNotifications: Notification[] = [
  { id: '1', title: 'Tournament Registration Open', message: 'Registration for the Valorant Campus Masters is now live. Sign up your team before slots fill up!', type: 'success', category: 'Tournament', timestamp: '10 min ago', reach: 1240 },
  { id: '2', title: 'Scheduled Maintenance', message: 'Lungsod Arena servers will be down for scheduled maintenance tonight from 02:00 to 04:00 AM.', type: 'warning', category: 'System', timestamp: '1 hour ago', reach: 5200 },
  { id: '3', title: 'Suspicious Login Detected', message: 'Multiple login attempts from an unrecognized IP address have been detected in your region.', type: 'alert', category: 'Security', timestamp: '2 hours ago', reach: 42 },
  { id: '4', title: 'Community Guidelines Update', message: 'We have updated our community hub guidelines to improve student safety and engagement.', type: 'info', category: 'Community', timestamp: '5 hours ago', reach: 8500 }
];

export default function NotificationManagement() {
  const [activeType, setActiveType] = useState<'success' | 'warning' | 'alert' | 'info'>('info');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Notification Center</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ background: 'var(--surface)', border: '1px solid rgba(0, 201, 224, 0.1)', borderRadius: '10px', padding: '10px', color: 'var(--muted)' }}><Settings size={18} /></button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'linear-gradient(135deg, var(--cyan), var(--violet))', border: 'none', borderRadius: '10px', color: '#0a0c14', fontWeight: 600, cursor: 'pointer' }}>
            <Radio size={18} /> Live Broadcast
          </button>
        </div>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.section}>
          <div className={styles.panel}>
            <h2 className={styles.sectionTitle}><Megaphone size={20} color="var(--cyan)" /> Create Broadcast Message</h2>
            <form className={styles.form}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Notification Title</label>
                <input type="text" className={styles.input} placeholder="Enter a catchy title..." />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Message Content</label>
                <textarea className={`${styles.input} ${styles.textarea}`} placeholder="What's the announcement about?"></textarea>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Notification Type</label>
                <div className={styles.typeGrid}>
                  <div className={`${styles.typeBtn} ${activeType === 'success' ? styles.active : ''}`} onClick={() => setActiveType('success')}>
                    <div className={styles.typeIcon} style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}><CheckCircle2 size={18} /></div>
                    <span style={{ fontSize: '11px', fontWeight: 600 }}>Success</span>
                  </div>
                  <div className={`${styles.typeBtn} ${activeType === 'info' ? styles.active : ''}`} onClick={() => setActiveType('info')}>
                    <div className={styles.typeIcon} style={{ background: 'rgba(0, 201, 224, 0.1)', color: 'var(--cyan)' }}><Info size={18} /></div>
                    <span style={{ fontSize: '11px', fontWeight: 600 }}>Info</span>
                  </div>
                  <div className={`${styles.typeBtn} ${activeType === 'warning' ? styles.active : ''}`} onClick={() => setActiveType('warning')}>
                    <div className={styles.typeIcon} style={{ background: 'rgba(240, 165, 0, 0.1)', color: 'var(--gold)' }}><AlertTriangle size={18} /></div>
                    <span style={{ fontSize: '11px', fontWeight: 600 }}>Warning</span>
                  </div>
                  <div className={`${styles.typeBtn} ${activeType === 'alert' ? styles.active : ''}`} onClick={() => setActiveType('alert')}>
                    <div className={styles.typeIcon} style={{ background: 'rgba(232, 51, 74, 0.1)', color: 'var(--red)' }}><ShieldAlert size={18} /></div>
                    <span style={{ fontSize: '11px', fontWeight: 600 }}>Alert</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button type="submit" style={{ flex: 1, padding: '14px', borderRadius: '10px', background: 'var(--cyan)', border: 'none', color: '#0a0c14', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Send size={18} /> Send Broadcast Now
                </button>
                <button type="button" style={{ padding: '14px', borderRadius: '10px', background: 'var(--surface2)', border: '1px solid rgba(0, 201, 224, 0.1)', color: 'var(--text)', fontWeight: 600, cursor: 'pointer' }}>
                  Schedule for Later
                </button>
              </div>
            </form>
          </div>

          <h2 className={styles.sectionTitle} style={{ marginTop: '12px' }}><History size={20} color="var(--violet)" /> Notification History</h2>
          <div className={styles.notificationList}>
            {mockNotifications.map((notif) => (
              <div key={notif.id} className={`${styles.notificationItem} ${styles[notif.type]}`}>
                <div className={styles.itemIcon} style={{ 
                  background: notif.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 
                              notif.type === 'warning' ? 'rgba(240, 165, 0, 0.1)' : 
                              notif.type === 'alert' ? 'rgba(232, 51, 74, 0.1)' : 'rgba(0, 201, 224, 0.1)',
                  color: notif.type === 'success' ? '#22c55e' : 
                         notif.type === 'warning' ? 'var(--gold)' : 
                         notif.type === 'alert' ? 'var(--red)' : 'var(--cyan)'
                }}>
                  {notif.type === 'success' && <CheckCircle2 size={20} />}
                  {notif.type === 'warning' && <AlertTriangle size={20} />}
                  {notif.type === 'alert' && <ShieldAlert size={20} />}
                  {notif.type === 'info' && <Info size={20} />}
                </div>
                <div className={styles.itemContent}>
                  <div className={styles.itemHeader}>
                    <span className={styles.itemTitle}>{notif.title}</span>
                    <span className={styles.itemTime}>{notif.timestamp}</span>
                  </div>
                  <div className={styles.itemText}>{notif.message}</div>
                  <div className={styles.itemFooter}>
                    <span>Category: {notif.category}</span>
                    <span>•</span>
                    <span>Reach: {notif.reach} Users</span>
                    <span style={{ marginLeft: 'auto', cursor: 'pointer' }}><Trash2 size={14} /></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.scheduledSection}>
          <h2 className={styles.sectionTitle}><Calendar size={20} color="var(--gold)" /> Scheduled Alerts</h2>
          <div className={styles.scheduledItem}>
            <div className={styles.itemIcon} style={{ background: 'rgba(0, 201, 224, 0.1)', color: 'var(--cyan)' }}><Trophy size={16} /></div>
            <div className={styles.scheduledInfo}>
              <div className={styles.scheduledTitle}>Tournament Finals Call</div>
              <div className={styles.scheduledTime}>May 12, 17:30</div>
            </div>
            <Zap size={14} color="var(--cyan)" />
          </div>
          <div className={styles.scheduledItem}>
            <div className={styles.itemIcon} style={{ background: 'rgba(155, 109, 255, 0.1)', color: 'var(--violet)' }}><Swords size={16} /></div>
            <div className={styles.scheduledInfo}>
              <div className={styles.scheduledTitle}>Duo Matchmaking Boost</div>
              <div className={styles.scheduledTime}>May 13, 20:00</div>
            </div>
            <Zap size={14} color="var(--violet)" />
          </div>
          <div className={styles.scheduledItem}>
            <div className={styles.itemIcon} style={{ background: 'rgba(240, 165, 0, 0.1)', color: 'var(--gold)' }}><MessageSquare size={16} /></div>
            <div className={styles.scheduledInfo}>
              <div className={styles.scheduledTitle}>Community Hub Cleanup</div>
              <div className={styles.scheduledTime}>May 14, 04:00</div>
            </div>
            <Zap size={14} color="var(--gold)" />
          </div>

          <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(0, 201, 224, 0.05)', borderRadius: '12px', border: '1px dashed rgba(0, 201, 224, 0.2)' }}>
            <div style={{ fontSize: '11px', color: 'var(--cyan)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>Broadcast Analytics</div>
            <div style={{ fontSize: '13px', color: 'var(--text)' }}>
              Avg. Open Rate: 82%
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text)', marginTop: '4px' }}>
              Click-through Rate: 45%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
