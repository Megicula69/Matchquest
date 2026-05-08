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
import { useTheme } from '../../context/ThemeContext';
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
  const { config, setMode, setAccent, updateConfig, applyTheme, resetDefaults } = useTheme();
  const [activeTab, setActiveTab] = useState('general');
  const [showConfirm, setShowConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const handleSaveTheme = () => {
    applyTheme();
    setToast('Theme Applied Successfully');
    setTimeout(() => setToast(null), 3000);
  };

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
              <div className={styles.themeGridOuter}>
                {/* Customization Controls */}
                <div className={styles.themeControls}>
                  <h2 className={styles.sectionTitle} style={{ marginBottom: '16px' }}>Visual Branding & Experience</h2>
                  
                  <div className={styles.configCard}>
                    <h3 className={styles.cardHeader}><Monitor size={16} /> Theme Modes</h3>
                    <div className={styles.cardBody}>
                      <div className={styles.themeModeRow}>
                        <button 
                          className={`${styles.modeBtn} ${config.mode === 'dark' ? styles.active : ''}`}
                          onClick={() => setMode('dark')}
                        >
                          <CloudLightning size={20} />
                          <span>Cyber Dark</span>
                        </button>
                        <button 
                          className={`${styles.modeBtn} ${config.mode === 'light' ? styles.active : ''}`}
                          onClick={() => setMode('light')}
                        >
                          <Zap size={20} />
                          <span>University Light</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className={styles.configCard}>
                    <h3 className={styles.cardHeader}><Palette size={16} /> Accent Customization</h3>
                    <div className={styles.cardBody}>
                      <div className={styles.accentGrid}>
                        {[
                          { name: 'Neon Blue', color: '#00c9e0' },
                          { name: 'Cyber Purple', color: '#9b6dff' },
                          { name: 'Emerald Green', color: '#22c55e' },
                          { name: 'Crimson Red', color: '#e8334a' },
                          { name: 'Gold Elite', color: '#f0a500' },
                          { name: 'Sunset Orange', color: '#ff9900' },
                          { name: 'Plasma Pink', color: '#ff00ff' }
                        ].map(accent => (
                          <div 
                            key={accent.name}
                            className={`${styles.accentCircle} ${config.accentColor === accent.color ? styles.active : ''}`}
                            style={{ background: accent.color }}
                            title={accent.name}
                            onClick={() => setAccent(accent.color)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className={styles.configCard}>
                    <h3 className={styles.cardHeader}><Layout size={16} /> Custom Theme Creator</h3>
                    <div className={styles.cardBody}>
                      <div className={styles.dualInputs}>
                        <div className={styles.inputGroup}>
                          <label>Primary Background</label>
                          <input 
                            type="color" 
                            className={styles.colorInput} 
                            value={config.primaryBg} 
                            onChange={(e) => updateConfig({ primaryBg: e.target.value })} 
                          />
                        </div>
                        <div className={styles.inputGroup}>
                          <label>Secondary Background</label>
                          <input 
                            type="color" 
                            className={styles.colorInput} 
                            value={config.secondaryBg} 
                            onChange={(e) => updateConfig({ secondaryBg: e.target.value })} 
                          />
                        </div>
                      </div>
                      <div className={styles.dualInputs} style={{ marginTop: '12px' }}>
                        <div className={styles.inputGroup}>
                          <label>Card Color</label>
                          <input 
                            type="color" 
                            className={styles.colorInput} 
                            value={config.cardBg.split(',').slice(0,3).join(',').replace('rgba(', '').replace(')', '').trim().startsWith('#') ? config.cardBg : '#141826'} 
                            onChange={(e) => updateConfig({ cardBg: `rgba(${parseInt(e.target.value.slice(1,3),16)}, ${parseInt(e.target.value.slice(3,5),16)}, ${parseInt(e.target.value.slice(5,7),16)}, ${config.transparency})` })} 
                          />
                        </div>
                        <div className={styles.inputGroup}>
                          <label>Text Color</label>
                          <input 
                            type="color" 
                            className={styles.colorInput} 
                            value={config.textColor} 
                            onChange={(e) => updateConfig({ textColor: e.target.value })} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.configCard}>
                    <h3 className={styles.cardHeader}><Type size={16} /> UI Elements & Typography</h3>
                    <div className={styles.cardBody}>
                      <div className={styles.inputGroup}>
                        <label>Border Radius ({config.borderRadius})</label>
                        <input 
                          type="range" min="0" max="32" 
                          value={parseInt(config.borderRadius)} 
                          onChange={(e) => updateConfig({ borderRadius: `${e.target.value}px` })} 
                        />
                      </div>
                      <div className={styles.inputGroup} style={{ marginTop: '12px' }}>
                        <label>Transparency ({config.transparency})</label>
                        <input 
                          type="range" min="0.1" max="1" step="0.05" 
                          value={parseFloat(config.transparency)} 
                          onChange={(e) => updateConfig({ transparency: e.target.value.toString() })} 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                    <button className={styles.cancelBtn} style={{ flex: 1 }} onClick={resetDefaults}>Reset to Defaults</button>
                    <button className={styles.saveBtn} style={{ flex: 1 }} onClick={handleSaveTheme}>Apply Theme Globally</button>
                  </div>
                </div>

                {/* Live System Preview */}
                <div className={styles.livePreview}>
                  <h3 className={styles.previewTitle}><Eye size={16} /> Live System Preview</h3>
                  <div className={styles.previewDashboard}>
                    <div className={styles.previewSidebar}>
                      <div className={styles.previewLogo}>LA</div>
                      <div className={styles.previewNavItem} style={{ borderLeftColor: 'var(--cyan)', background: 'rgba(0,201,224,0.1)', color: 'var(--cyan)' }} />
                      <div className={styles.previewNavItem} />
                      <div className={styles.previewNavItem} />
                    </div>
                    <div className={styles.previewMain}>
                      <div className={styles.previewTopbar}>
                        <div className={styles.previewSearch} />
                        <div className={styles.previewAvatar} />
                      </div>
                      <div className={styles.previewContent}>
                        <div className={styles.previewGrid}>
                          <div className={styles.previewCard}>
                            <div className={styles.previewBar} style={{ width: '40%' }} />
                            <div className={styles.previewBar} style={{ width: '70%', height: '4px', marginTop: '8px' }} />
                          </div>
                          <div className={styles.previewCard}>
                            <div className={styles.previewBar} style={{ width: '60%' }} />
                            <div className={styles.previewBar} style={{ width: '30%', height: '4px', marginTop: '8px' }} />
                          </div>
                        </div>
                        <div className={styles.previewCard} style={{ flex: 1, marginTop: '12px' }}>
                          <div className={styles.previewTableHead} />
                          <div className={styles.previewTableRow} />
                          <div className={styles.previewTableRow} />
                        </div>
                        <div className={styles.previewButton}>Launch Tournament</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.previewNote}>
                    Preview reflects real-time CSS variable injections.
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
      {/* Success Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', background: 'rgba(34, 197, 94, 0.95)',
          color: '#fff', padding: '12px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center',
          gap: '10px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', zIndex: 10000, animation: 'slideIn 0.3s ease'
        }}>
          <CheckCircle2 size={18} /> {toast}
        </div>
      )}
    </div>
  );
}
