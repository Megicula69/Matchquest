'use client';

import React, { useState } from 'react';
import { 
  Settings, Swords, Trophy, Bell, Shield, 
  Palette, Globe, Database, Save, RotateCcw,
  Monitor, Lock, Eye, CloudLightning, HardDrive,
  UserPlus, MapPin, Zap, MessageSquare, Smartphone,
  Activity, Key, Terminal, Code, Layout, Type,
  AlertTriangle, CheckCircle2, History, Trash2,
  RefreshCw, MousePointer2, LogOut, ChevronRight,
  Clock, ShieldCheck
} from 'lucide-react';
import styles from './SettingsManagement.module.css';

const categories = [
  { id: 'general', label: 'General Settings', icon: <Settings size={18} /> },
  { id: 'matchmaking', label: 'Matchmaking', icon: <Swords size={18} /> },
  { id: 'tournaments', label: 'Tournaments', icon: <Trophy size={18} /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
  { id: 'security', label: 'Security & Auth', icon: <Shield size={18} /> },
  { id: 'theme', label: 'Theme & Styling', icon: <Palette size={18} /> },
  { id: 'api', label: 'API & Integrations', icon: <Globe size={18} /> }
];

export default function SettingsManagement() {
  const [activeTab, setActiveTab] = useState('general');
  const [showConfirm, setShowConfirm] = useState<string | null>(null);

  // Helper Component: Toggle Switch
  const Toggle = ({ checked = false }) => (
    <label className={styles.switch}>
      <input type="checkbox" defaultChecked={checked} />
      <span className={styles.slider}></span>
    </label>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>System Intelligence Center</h1>
        <div className={styles.controls}>
          <button className={`${styles.btn} ${styles.cancelBtn}`}>
            <RotateCcw size={16} /> Reset Default
          </button>
          <button className={`${styles.btn} ${styles.saveBtn}`} onClick={() => setShowConfirm('save')}>
            <Save size={16} /> Save Changes
          </button>
        </div>
      </div>

      <div className={styles.mainGrid}>
        <aside className={styles.sidebar}>
          {categories.map((cat) => (
            <button 
              key={cat.id} 
              className={`${styles.navItem} ${activeTab === cat.id ? styles.active : ''}`}
              onClick={() => setActiveTab(cat.id)}
            >
              {cat.icon}
              {cat.label}
              <ChevronRight size={14} style={{ marginLeft: 'auto', opacity: activeTab === cat.id ? 1 : 0 }} />
            </button>
          ))}
        </aside>

        <main className={styles.content}>
          {/* GENERAL SETTINGS */}
          {activeTab === 'general' && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Platform Identity & Operations</h2>
              
              <div className={styles.configCard}>
                <h3 className={styles.cardHeader}><Monitor size={16} /> Platform Information</h3>
                <div className={styles.cardBody}>
                  <div className={styles.inputGroup}>
                    <label>Platform Name</label>
                    <input type="text" className={styles.input} defaultValue="Lungsod Arena" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Tagline</label>
                    <input type="text" className={styles.input} defaultValue="The Ultimate Campus Esports Hub" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Description</label>
                    <textarea className={styles.input} defaultValue="Official gaming and student-life platform for Pamantasan ng Lungsod ng Pasig." />
                  </div>
                  <div className={styles.mediaUploads}>
                    <div className={styles.uploadBox}>Logo (PNG)</div>
                    <div className={styles.uploadBox}>Favicon (ICO)</div>
                  </div>
                </div>
              </div>

              <div className={styles.configCard} style={{ borderColor: 'var(--red)' }}>
                <h3 className={styles.cardHeader} style={{ color: 'var(--red)' }}><AlertTriangle size={16} /> Platform Status</h3>
                <div className={styles.cardBody}>
                  <div className={styles.settingGroup}>
                    <div className={styles.settingInfo}>
                      <div className={styles.settingLabel}>Maintenance Mode</div>
                      <div className={styles.settingDesc}>Restrict student access during system upgrades.</div>
                    </div>
                    <Toggle />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Maintenance Message</label>
                    <input type="text" className={styles.input} defaultValue="We are currently upgrading Lungsod Arena. Back shortly!" />
                  </div>
                </div>
              </div>

              <div className={styles.configCard}>
                <h3 className={styles.cardHeader}><Globe size={16} /> Localization & Registration</h3>
                <div className={styles.cardBody}>
                  <div className={styles.settingGroup}>
                    <div className={styles.settingInfo}>
                      <div className={styles.settingLabel}>Student Verification Required</div>
                      <div className={styles.settingDesc}>Enforce PLP student ID verification for all new accounts.</div>
                    </div>
                    <Toggle checked />
                  </div>
                  <div className={styles.dualInputs}>
                    <div className={styles.inputGroup}>
                      <label>Default Currency</label>
                      <select className={styles.input}><option>PHP (₱)</option><option>USD ($)</option></select>
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Default Timezone</label>
                      <select className={styles.input}><option>UTC+8 (Manila)</option></select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MATCHMAKING SETTINGS */}
          {activeTab === 'matchmaking' && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Matchmaking Algorithms & Filters</h2>
              
              <div className={styles.configCard}>
                <h3 className={styles.cardHeader}><Zap size={16} /> Algorithm Controls</h3>
                <div className={styles.cardBody}>
                  <div className={styles.settingGroup}>
                    <div className={styles.settingInfo}>
                      <div className={styles.settingLabel}>Skill-Based Matchmaking (SBMM)</div>
                      <div className={styles.settingDesc}>Prioritize fair skill distribution over queue time.</div>
                    </div>
                    <Toggle checked />
                  </div>
                  <div className={styles.settingGroup}>
                    <div className={styles.settingInfo}>
                      <div className={styles.settingLabel}>AI-Assisted Matching</div>
                      <div className={styles.settingDesc}>Use neural networks to predict match compatibility.</div>
                    </div>
                    <Toggle />
                  </div>
                  <div className={styles.sliderGroup}>
                    <label>Compatibility Threshold (85%)</label>
                    <input type="range" min="50" max="100" defaultValue="85" style={{ accentColor: 'var(--cyan)' }} />
                  </div>
                </div>
              </div>

              <div className={styles.configCard}>
                <h3 className={styles.cardHeader}><Clock size={16} /> Queue Management</h3>
                <div className={styles.cardBody}>
                  <div className={styles.dualInputs}>
                    <div className={styles.inputGroup}>
                      <label>Max Queue Time (Sec)</label>
                      <input type="number" className={styles.input} defaultValue="120" />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Auto-Match Timer (Sec)</label>
                      <input type="number" className={styles.input} defaultValue="30" />
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.configCard}>
                <h3 className={styles.cardHeader}><ShieldCheck size={16} /> Reputation & Swipe Controls</h3>
                <div className={styles.cardBody}>
                  <div className={styles.settingGroup}>
                    <div className={styles.settingInfo}>
                      <div className={styles.settingLabel}>Reputation Filtering</div>
                      <div className={styles.settingDesc}>Block toxic players from matching with high-reputation users.</div>
                    </div>
                    <Toggle checked />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Daily Swipe Limit (Duo Mode)</label>
                    <input type="number" className={styles.input} defaultValue="50" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TOURNAMENT SETTINGS */}
          {activeTab === 'tournaments' && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Tournament Orchestration</h2>
              <div className={styles.configCard}>
                <h3 className={styles.cardHeader}><Layout size={16} /> Bracket & Team Config</h3>
                <div className={styles.cardBody}>
                  <div className={styles.settingGroup}>
                    <div className={styles.settingInfo}>
                      <div className={styles.settingLabel}>Auto-Bracket Generation</div>
                      <div className={styles.settingDesc}>Automatically generate brackets when registration closes.</div>
                    </div>
                    <Toggle checked />
                  </div>
                  <div className={styles.dualInputs}>
                    <div className={styles.inputGroup}>
                      <label>Max Teams Per Event</label>
                      <input type="number" className={styles.input} defaultValue="64" />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Members Per Team</label>
                      <input type="number" className={styles.input} defaultValue="5" />
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.configCard}>
                <h3 className={styles.cardHeader}><Activity size={16} /> Live Match Features</h3>
                <div className={styles.cardBody}>
                  <div className={styles.settingGroup}>
                    <div className={styles.settingInfo}>
                      <div className={styles.settingLabel}>Live Score Tracking</div>
                      <div className={styles.settingDesc}>Sync live data from game APIs for public bracket updates.</div>
                    </div>
                    <Toggle checked />
                  </div>
                  <div className={styles.settingGroup}>
                    <div className={styles.settingInfo}>
                      <div className={styles.settingLabel}>Spectator Mode Enabled</div>
                      <div className={styles.settingDesc}>Allow students to watch live matches via the community hub.</div>
                    </div>
                    <Toggle />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATION SETTINGS */}
          {activeTab === 'notifications' && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Communication & Alerts</h2>
              
              <div className={styles.configCard}>
                <h3 className={styles.cardHeader}><Smartphone size={16} /> Push & SMS Notifications</h3>
                <div className={styles.cardBody}>
                  <div className={styles.settingGroup}>
                    <div className={styles.settingInfo}>
                      <div className={styles.settingLabel}>Global Push Notifications</div>
                      <div className={styles.settingDesc}>Enable real-time alerts for matchmaking and tournaments.</div>
                    </div>
                    <Toggle checked />
                  </div>
                  <div className={styles.settingGroup}>
                    <div className={styles.settingInfo}>
                      <div className={styles.settingLabel}>SMS Emergency Alerts</div>
                      <div className={styles.settingDesc}>Send high-priority OTP and security codes via SMS.</div>
                    </div>
                    <Toggle />
                  </div>
                  <div className={styles.dualInputs}>
                    <div className={styles.inputGroup}>
                      <label>Quiet Hours (Start)</label>
                      <input type="time" className={styles.input} defaultValue="23:00" />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Quiet Hours (End)</label>
                      <input type="time" className={styles.input} defaultValue="07:00" />
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.configCard}>
                <h3 className={styles.cardHeader}><MessageSquare size={16} /> Email Alerts & Templates</h3>
                <div className={styles.cardBody}>
                  <div className={styles.settingGroup}>
                    <div className={styles.settingInfo}>
                      <div className={styles.settingLabel}>Tournament Reminder Emails</div>
                      <div className={styles.settingDesc}>Notify teams 1 hour before their scheduled matches.</div>
                    </div>
                    <Toggle checked />
                  </div>
                  <button className={styles.cancelBtn} style={{ width: '100%', justifyContent: 'center', display: 'flex', gap: '8px' }}>
                    <Layout size={16} /> Configure Email Templates
                  </button>
                </div>
              </div>

              <div className={styles.configCard}>
                <h3 className={styles.cardHeader}><Zap size={16} /> Announcement Personalization</h3>
                <div className={styles.cardBody}>
                  <div className={styles.settingGroup}>
                    <div className={styles.settingInfo}>
                      <div className={styles.settingLabel}>Notification Grouping</div>
                      <div className={styles.settingDesc}>Collapse multiple alerts into a single stack in the UI.</div>
                    </div>
                    <Toggle checked />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Default Alert Sound</label>
                    <select className={styles.input}>
                      <option>Cyber Pulse (Standard)</option>
                      <option>Arena Horn (Tournament)</option>
                      <option>System Ping (Alert)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'security' && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Authentication & Protection</h2>
              <div className={styles.configCard}>
                <h3 className={styles.cardHeader}><Lock size={16} /> Access Control</h3>
                <div className={styles.cardBody}>
                  <div className={styles.settingGroup}>
                    <div className={styles.settingInfo}>
                      <div className={styles.settingLabel}>Two-Factor Authentication (MANDATORY)</div>
                      <div className={styles.settingDesc}>Require all admins to use 2FA for dashboard access.</div>
                    </div>
                    <Toggle checked />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Session Duration (Hours)</label>
                    <input type="number" className={styles.input} defaultValue="12" />
                  </div>
                </div>
              </div>

              <div className={styles.configCard} style={{ background: 'rgba(0, 201, 224, 0.05)' }}>
                <h3 className={styles.cardHeader} style={{ color: 'var(--cyan)' }}><Database size={16} /> Backup & Recovery</h3>
                <div className={styles.cardBody}>
                  <div className={styles.settingGroup}>
                    <div className={styles.settingInfo}>
                      <div className={styles.settingLabel}>Auto-Backups (Daily)</div>
                      <div className={styles.settingDesc}>Encrypted cloud backups are stored every midnight.</div>
                    </div>
                    <Toggle checked />
                  </div>
                  <div className={styles.btnGroup} style={{ marginTop: '12px' }}>
                    <button className={styles.saveBtn} style={{ background: 'var(--cyan)', padding: '10px 20px', fontSize: '12px' }} onClick={() => setShowConfirm('backup')}>Trigger Manual Backup</button>
                    <button className={styles.cancelBtn} style={{ padding: '10px 20px', fontSize: '12px' }}>Restore From Cloud</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* THEME CUSTOMIZATION */}
          {activeTab === 'theme' && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Visual Branding & Experience</h2>
              <div className={styles.configCard}>
                <h3 className={styles.cardHeader}><Palette size={16} /> Theme Controls</h3>
                <div className={styles.cardBody}>
                  <div className={styles.themeGrid}>
                    <div className={`${styles.themeCard} ${styles.active}`}>
                      <div className={styles.colorPreview} style={{ background: 'linear-gradient(135deg, #00c9e0, #9b6dff)' }} />
                      <span>Neon Cyber</span>
                    </div>
                    <div className={styles.themeCard}>
                      <div className={styles.colorPreview} style={{ background: 'linear-gradient(135deg, #e8334a, #ff9900)' }} />
                      <span>Crimson War</span>
                    </div>
                    <div className={styles.themeCard}>
                      <div className={styles.colorPreview} style={{ background: 'linear-gradient(135deg, #22c55e, #00c9e0)' }} />
                      <span>Emerald Pulse</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.configCard}>
                <h3 className={styles.cardHeader}><Type size={16} /> Typography & Animations</h3>
                <div className={styles.cardBody}>
                  <div className={styles.settingGroup}>
                    <div className={styles.settingInfo}>
                      <div className={styles.settingLabel}>Smooth Transitions</div>
                      <div className={styles.settingDesc}>Enable motion-blur and spring animations globally.</div>
                    </div>
                    <Toggle checked />
                  </div>
                  <div className={styles.dualInputs}>
                    <div className={styles.inputGroup}>
                      <label>Base Font Size</label>
                      <select className={styles.input}><option>14px (Standard)</option><option>16px (Large)</option></select>
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Animation Speed</label>
                      <select className={styles.input}><option>0.3s (Fast)</option><option>0.5s (Balanced)</option></select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* API CONFIGURATION */}
          {activeTab === 'api' && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Integrations & Developer Control</h2>
              <div className={styles.configCard}>
                <h3 className={styles.cardHeader}><CloudLightning size={16} /> External APIs</h3>
                <div className={styles.cardBody}>
                  <div className={styles.settingGroup}>
                    <div className={styles.settingInfo}>
                      <div className={styles.settingLabel}>Discord Webhook Integration</div>
                      <div className={styles.settingDesc}>Post automated match results to the official PLP Discord.</div>
                    </div>
                    <Toggle checked />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Riot Games API Key</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input type="password" className={styles.input} defaultValue="RGAPI-4242-8888-9999-XXXX" style={{ flex: 1 }} />
                      <button className={styles.cancelBtn} style={{ padding: '0 16px' }}><Eye size={16} /></button>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.configCard}>
                <h3 className={styles.cardHeader}><Terminal size={16} /> Developer Mode</h3>
                <div className={styles.cardBody}>
                  <div className={styles.settingGroup}>
                    <div className={styles.settingInfo}>
                      <div className={styles.settingLabel}>Sandbox Environment</div>
                      <div className={styles.settingDesc}>Enable testing mode for third-party developer access.</div>
                    </div>
                    <Toggle />
                  </div>
                  <div className={styles.settingGroup}>
                    <div className={styles.settingInfo}>
                      <div className={styles.settingLabel}>API Rate Limiting</div>
                      <div className={styles.settingDesc}>Set maximum requests per minute per IP.</div>
                    </div>
                    <input type="number" className={styles.input} defaultValue="60" style={{ width: '80px' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className={styles.footer}>
            <button className={styles.cancelBtn}>Discard All Changes</button>
            <button className={styles.saveBtn} onClick={() => setShowConfirm('save')}>Apply Configuration</button>
          </div>
        </main>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className={styles.modalOverlay} onClick={() => setShowConfirm(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalIcon}>
              {showConfirm === 'save' ? <Save size={32} /> : <Database size={32} />}
            </div>
            <h2 className={styles.modalTitle}>Confirm System Change?</h2>
            <p className={styles.modalDesc}>
              {showConfirm === 'save' 
                ? 'Applying these settings will update the platform algorithms and visual branding for all active users.' 
                : 'Triggering a manual backup will temporarily increase database load. Proceed?'}
            </p>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} style={{ flex: 1 }} onClick={() => setShowConfirm(null)}>Cancel</button>
              <button className={styles.saveBtn} style={{ flex: 1 }} onClick={() => setShowConfirm(null)}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
