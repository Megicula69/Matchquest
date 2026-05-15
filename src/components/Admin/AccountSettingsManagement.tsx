'use client';

import React, { useState } from 'react';
import { 
  Shield, Lock, Eye, EyeOff, Smartphone, 
  Mail, Bell, Palette, Globe, Save, 
  RefreshCcw, Laptop, History, CheckCircle2,
  AlertCircle, ChevronRight, Zap, Monitor,
  Volume2, ShieldCheck, Key
} from 'lucide-react';
import { useAdminTheme } from '../../context/AdminThemeContext';
import styles from './AccountSettingsManagement.module.css';

export default function AccountSettingsManagement() {
  const { mode, setMode } = useAdminTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(85);
  const [activeTab, setActiveTab] = useState('security');

  const tabs = [
    { id: 'security', label: 'Security & Auth', icon: <Shield size={18} /> },
    { id: 'sessions', label: 'Session Management', icon: <Laptop size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette size={18} /> },
    { id: 'privacy', label: 'Privacy', icon: <Globe size={18} /> }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Account Settings</h1>
        <p className={styles.subtitle}>Manage your security, sessions, and personal preferences.</p>
      </div>

      <div className={styles.mainGrid}>
        {/* Navigation Sidebar */}
        <div className={styles.sidebar}>
          {tabs.map(tab => (
            <button 
              key={tab.id}
              className={`${styles.tabBtn} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className={styles.tabIcon}>{tab.icon}</span>
              <span className={styles.tabLabel}>{tab.label}</span>
              <ChevronRight size={14} className={styles.tabChevron} />
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className={styles.content}>
          {activeTab === 'security' && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}><Lock size={20} color="var(--cyan)" /> Security Settings</h2>
              
              <div className={styles.formGroup}>
                <h3 className={styles.subTitle}>Change Password</h3>
                <div className={styles.inputStack}>
                  <div className={styles.inputWrapper}>
                    <label className={styles.label}>Current Password</label>
                    <div className={styles.relative}>
                      <input type="password" className={styles.input} placeholder="••••••••" />
                    </div>
                  </div>
                  <div className={styles.inputWrapper}>
                    <label className={styles.label}>New Password</label>
                    <div className={styles.relative}>
                      <input 
                        type={showPassword ? 'text' : 'password'} 
                        className={styles.input} 
                        placeholder="••••••••" 
                      />
                      <button 
                        className={styles.passwordToggle}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {/* Password Strength */}
                    <div className={styles.strengthMeter}>
                      <div className={styles.strengthBar} style={{ width: `${passwordStrength}%`, background: passwordStrength > 80 ? '#22c55e' : 'var(--gold)' }} />
                    </div>
                    <span className={styles.helperText}>Strong password. High security.</span>
                  </div>
                  <div className={styles.inputWrapper}>
                    <label className={styles.label}>Confirm New Password</label>
                    <input type="password" className={styles.input} placeholder="••••••••" />
                  </div>
                </div>
              </div>

              <div className={styles.divider} />

              <div className={styles.formGroup}>
                <h3 className={styles.subTitle}>Two-Factor Authentication (2FA)</h3>
                <div className={styles.toggleCard}>
                  <div className={styles.toggleInfo}>
                    <div className={styles.toggleLabel}>App-based 2FA</div>
                    <div className={styles.toggleDesc}>Use Google Authenticator or Authy for maximum security.</div>
                  </div>
                  <label className={styles.switch}>
                    <input type="checkbox" defaultChecked />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>

              <div className={styles.divider} />

              <div className={styles.formGroup}>
                <h3 className={styles.subTitle}>Recovery Options</h3>
                <div className={styles.inputStack}>
                  <div className={styles.inputWrapper}>
                    <label className={styles.label}>Recovery Email</label>
                    <input type="email" className={styles.input} defaultValue="recovery@plp.edu.ph" />
                  </div>
                  <div className={styles.inputWrapper}>
                    <label className={styles.label}>Security Question</label>
                    <select className={styles.input}>
                      <option>What was your first gaming console?</option>
                      <option>What was your high school mascot?</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sessions' && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}><Laptop size={20} color="var(--violet)" /> Session Management</h2>
              <div className={styles.sessionList}>
                <div className={styles.sessionItem}>
                  <div className={styles.sessionIcon}><Monitor size={20} /></div>
                  <div className={styles.sessionInfo}>
                    <div className={styles.sessionTitle}>Windows PC - Chrome Browser</div>
                    <div className={styles.sessionMeta}>Pasig City, PH • IP: 192.168.1.15 • Current Session</div>
                  </div>
                  <div className={styles.sessionStatus}>Active</div>
                </div>
                <div className={styles.sessionItem}>
                  <div className={styles.sessionIcon}><Smartphone size={20} /></div>
                  <div className={styles.sessionInfo}>
                    <div className={styles.sessionTitle}>iPhone 15 Pro - Safari</div>
                    <div className={styles.sessionMeta}>Quezon City, PH • IP: 102.45.2.1 • 3 hours ago</div>
                  </div>
                  <button className={styles.btnSmall}>Logout</button>
                </div>
              </div>
              <button className={styles.btnDangerOutline} style={{ marginTop: '24px' }}>Log out from all other devices</button>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}><Bell size={20} color="var(--gold)" /> Notification Preferences</h2>
              <div className={styles.toggleList}>
                <div className={styles.toggleCard}>
                  <div className={styles.toggleInfo}>
                    <div className={styles.toggleLabel}>Critical Alerts</div>
                    <div className={styles.toggleDesc}>Security breaches and system failures.</div>
                  </div>
                  <label className={styles.switch}>
                    <input type="checkbox" defaultChecked disabled />
                    <span className={styles.slider}></span>
                  </label>
                </div>
                <div className={styles.toggleCard}>
                  <div className={styles.toggleInfo}>
                    <div className={styles.toggleLabel}>Email Reports</div>
                    <div className={styles.toggleDesc}>Weekly admin performance analytics.</div>
                  </div>
                  <label className={styles.switch}>
                    <input type="checkbox" defaultChecked />
                    <span className={styles.slider}></span>
                  </label>
                </div>
                <div className={styles.toggleCard}>
                  <div className={styles.toggleInfo}>
                    <div className={styles.toggleLabel}>Push Notifications</div>
                    <div className={styles.toggleDesc}>Real-time student report alerts.</div>
                  </div>
                  <label className={styles.switch}>
                    <input type="checkbox" />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}><Palette size={20} color="var(--cyan)" /> Appearance Settings</h2>
              <div className={styles.grid}>
                <div 
                  className={`${styles.themeOption} ${mode === 'dark' ? styles.active : ''}`}
                  onClick={() => setMode('dark')}
                >
                  <div className={styles.themePreview} style={{ background: '#0a0c14', border: '1px solid rgba(255,255,255,0.1)' }}></div>
                  <div className={styles.themeLabel}>Cyber Dark</div>
                </div>
                <div 
                  className={`${styles.themeOption} ${mode === 'light' ? styles.active : ''}`}
                  onClick={() => setMode('light')}
                >
                  <div className={styles.themePreview} style={{ background: '#f8fafc', border: '1px solid rgba(0,0,0,0.1)' }}></div>
                  <div className={styles.themeLabel}>Neon Light</div>
                </div>
              </div>
              <div className={styles.divider} />
              <div className={styles.toggleCard}>
                <div className={styles.toggleInfo}>
                  <div className={styles.toggleLabel}>Animations</div>
                  <div className={styles.toggleDesc}>Enable smooth dashboard transitions.</div>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" defaultChecked />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.footer}>
        <button className={styles.btnOutline}><RefreshCcw size={16} /> Reset to Defaults</button>
        <button className={styles.btnPrimary}><Save size={16} /> Save Changes</button>
      </div>
    </div>
  );
}
