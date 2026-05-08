'use client';

import React, { useState } from 'react';
import { 
  ShieldAlert, ShieldX, ShieldCheck, AlertOctagon, 
  Search, Filter, Eye, MessageSquare, History, 
  Ban, Flag, Ghost, MousePointer2, AlertTriangle, X,
  ExternalLink, Trash2, UserX, UserMinus, ShieldQuestion,
  Clock,
  Check
} from 'lucide-react';
import styles from './ModerationManagement.module.css';

interface Report {
  id: string;
  user: string;
  reporter: string;
  category: string;
  severity: 'high' | 'medium' | 'low';
  date: string;
  status: 'pending' | 'reviewed' | 'actioned';
  aiScore: number;
}

const mockReports: Report[] = [
  { id: 'REP-042', user: 'ToxicTeammate99', reporter: 'SilentCarry', category: 'Toxic Chat', severity: 'high', date: '2026-05-08 14:22', status: 'pending', aiScore: 94 },
  { id: 'REP-043', user: 'GhostWalker_v2', reporter: 'System (Anti-Cheat)', category: 'Cheating', severity: 'high', date: '2026-05-08 15:05', status: 'pending', aiScore: 88 },
  { id: 'REP-044', user: 'FakeStreamer_X', reporter: 'Mod_Slayer', category: 'Fake Accounts', severity: 'medium', date: '2026-05-08 15:30', status: 'pending', aiScore: 42 },
  { id: 'REP-045', user: 'SpamBot_3000', reporter: 'RegularUser', category: 'Spam', severity: 'low', date: '2026-05-08 16:10', status: 'pending', aiScore: 99 },
  { id: 'REP-046', user: 'AngryGamer', reporter: 'PeaceKeeper', category: 'Harassment', severity: 'medium', date: '2026-05-08 16:45', status: 'pending', aiScore: 75 }
];

export default function ModerationManagement() {
  const [activeCategory, setActiveCategory] = useState('All Reports');
  const [showEvidence, setShowEvidence] = useState<Report | null>(null);

  const categories = [
    { name: 'All Reports', count: 24 },
    { name: 'Toxic Chat', count: 12 },
    { name: 'Fake Accounts', count: 4 },
    { name: 'Harassment', count: 3 },
    { name: 'Cheating', count: 2 },
    { name: 'Spam', count: 2 },
    { name: 'Inappropriate Posts', count: 1 },
    { name: 'Matchmaking Abuse', count: 0 }
  ];

  return (
    <div className={styles.container}>
      <aside className={styles.categories}>
        <div className={styles.sectionTitle} style={{ padding: '0 12px 12px' }}>Categories</div>
        {categories.map((cat) => (
          <div 
            key={cat.name} 
            className={`${styles.categoryItem} ${activeCategory === cat.name ? styles.active : ''}`}
            onClick={() => setActiveCategory(cat.name)}
          >
            {cat.name}
            <span className={styles.badge}>{cat.count}</span>
          </div>
        ))}
      </aside>

      <main className={styles.main}>
        <div className={styles.alertsRow}>
          <div className={`${styles.alertCard} ${styles.urgent}`}>
            <span className={styles.alertTitle}>High Severity Pending</span>
            <span className={styles.alertValue}>7</span>
          </div>
          <div className={styles.alertCard}>
            <span className={styles.alertTitle}>Reports Today</span>
            <span className={styles.alertValue}>142</span>
          </div>
          <div className={styles.alertCard}>
            <span className={styles.alertTitle}>Auto-Flagged (AI)</span>
            <span className={styles.alertValue}>28</span>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Report ID</th>
                <th>Target User</th>
                <th>Reporter</th>
                <th>Category</th>
                <th>Severity</th>
                <th>AI Score</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockReports.map((report) => (
                <tr key={report.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--cyan)' }}>{report.id}</td>
                  <td style={{ fontWeight: 600 }}>{report.user}</td>
                  <td style={{ color: 'var(--muted)' }}>{report.reporter}</td>
                  <td>{report.category}</td>
                  <td>
                    <span className={`${styles.severity} ${styles[report.severity]}`}>
                      {report.severity}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ flex: 1, height: '4px', background: 'var(--surface2)', borderRadius: '2px', width: '60px' }}>
                        <div style={{ width: `${report.aiScore}%`, height: '100%', background: report.aiScore > 80 ? 'var(--red)' : 'var(--cyan)', borderRadius: '2px' }} />
                      </div>
                      <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)' }}>{report.aiScore}%</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className={styles.actionBtn} style={{ padding: '4px', height: 'auto', width: 'auto' }} onClick={() => setShowEvidence(report)}>
                        <Eye size={16} />
                      </button>
                      <button className={styles.actionBtn} style={{ padding: '4px', height: 'auto', width: 'auto', color: 'var(--gold)' }}>
                        <ShieldAlert size={16} />
                      </button>
                      <button className={styles.actionBtn} style={{ padding: '4px', height: 'auto', width: 'auto', color: 'var(--red)' }}>
                        <ShieldX size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {showEvidence && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <ShieldAlert size={20} color="var(--red)" />
                <span className={styles.modalTitle}>Evidence Review: {showEvidence.id}</span>
              </div>
              <button className={styles.categoryItem} style={{ padding: '8px' }} onClick={() => setShowEvidence(null)}>
                <X size={20} />
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.evidenceSection}>
                <h3 className={styles.sectionTitle}>Chat Logs (Toxic Chat Detected)</h3>
                <div className={styles.chatLog}>
                  <div className={styles.chatMsg}>
                    <span className={styles.chatUser}>SilentCarry [14:20:12]:</span>
                    <span className={styles.chatText}>Can we please group up? We are losing the objective.</span>
                  </div>
                  <div className={styles.chatMsg}>
                    <span className={styles.chatUser} style={{ color: 'var(--red)' }}>{showEvidence.user} [14:20:15]:</span>
                    <span className={styles.chatText}>Shut up you trash player, uninstall the game and go away.</span>
                    <span className={styles.aiIndicator}>AI: Verbal Abuse Detected (94.2%)</span>
                  </div>
                  <div className={styles.chatMsg}>
                    <span className={styles.chatUser} style={{ color: 'var(--red)' }}>{showEvidence.user} [14:20:20]:</span>
                    <span className={styles.chatText}>I'm going to feed the enemies now because of you.</span>
                    <span className={styles.aiIndicator}>AI: Intentional Throwing Threat (88.7%)</span>
                  </div>
                </div>

                <h3 className={styles.sectionTitle}>Contextual Screenshots</h3>
                <div className={styles.screenshots}>
                  <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400" className={styles.screenshot} />
                  <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400" className={styles.screenshot} />
                </div>
              </div>

              <div className={styles.actionPanel}>
                <h3 className={styles.sectionTitle}>Moderation Actions</h3>
                <button className={`${styles.actionBtn} ${styles.warning}`}>
                  <AlertTriangle size={18} /> Send Official Warning
                </button>
                <button className={`${styles.actionBtn} ${styles.tempBan}`}>
                  <Clock size={18} /> 3-Day Temporary Ban
                </button>
                <button className={`${styles.actionBtn} ${styles.tempBan}`} style={{ background: 'rgba(232, 51, 74, 0.15)' }}>
                  <History size={18} /> 7-Day Temporary Ban
                </button>
                <button className={`${styles.actionBtn} ${styles.permBan}`}>
                  <Ban size={18} /> Permanent Account Ban
                </button>
                <div style={{ height: '1px', background: 'rgba(0, 201, 224, 0.1)', margin: '8px 0' }} />
                <button className={`${styles.actionBtn} ${styles.dismiss}`}>
                  <Check size={18} /> Dismiss Report (Innocent)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
