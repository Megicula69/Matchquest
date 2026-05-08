'use client';

import React from 'react';
import { 
  User, Mail, Phone, Calendar, MapPin, 
  Shield, Building, Activity, ShieldCheck, 
  LogOut, Edit3, Lock, Laptop, Smartphone,
  Trophy, Megaphone, FileText, CheckCircle2,
  AlertTriangle, Clock
} from 'lucide-react';
import styles from './AdminProfileManagement.module.css';

export default function AdminProfileManagement() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.profileHero}>
          <div className={styles.avatarWrapper}>
            <div className={styles.avatar}>AD</div>
            <button className={styles.editAvatar}><Edit3 size={14} /></button>
          </div>
          <div className={styles.heroInfo}>
            <h1 className={styles.adminName}>Admin User</h1>
            <p className={styles.adminUsername}>@admin_lungsod_arena</p>
            <div className={styles.badgeRow}>
              <span className={styles.roleBadge}>Super Admin</span>
              <span className={styles.statusBadge}>Online</span>
            </div>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.btnPrimary}><Edit3 size={16} /> Edit Profile</button>
            <button className={styles.btnOutline}><Lock size={16} /> Change Password</button>
          </div>
        </div>
      </div>

      <div className={styles.mainGrid}>
        {/* Left Column: Information */}
        <div className={styles.infoColumn}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}><User size={18} color="var(--cyan)" /> Personal Information</h2>
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <label className={styles.label}>Full Name</label>
                <div className={styles.value}>Admin User</div>
              </div>
              <div className={styles.infoItem}>
                <label className={styles.label}>Email Address</label>
                <div className={styles.value}>admin@lungsodarena.plp.edu.ph</div>
              </div>
              <div className={styles.infoItem}>
                <label className={styles.label}>Contact Number</label>
                <div className={styles.value}>+63 912 345 6789</div>
              </div>
              <div className={styles.infoItem}>
                <label className={styles.label}>Date of Birth</label>
                <div className={styles.value}>October 15, 1995</div>
              </div>
              <div className={styles.infoItem}>
                <label className={styles.label}>Gender</label>
                <div className={styles.value}>Male</div>
              </div>
              <div className={styles.infoItem}>
                <label className={styles.label}>Address</label>
                <div className={styles.value}>PLP Campus, Pasig City, Philippines</div>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}><Shield size={18} color="var(--violet)" /> Professional Information</h2>
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <label className={styles.label}>Admin Role</label>
                <div className={styles.value}>Super Administrator</div>
              </div>
              <div className={styles.infoItem}>
                <label className={styles.label}>Department</label>
                <div className={styles.value}>IT Services & Campus Gaming</div>
              </div>
              <div className={styles.infoItem}>
                <label className={styles.label}>Account Status</label>
                <div className={styles.value} style={{ color: '#22c55e' }}>Verified & Active</div>
              </div>
              <div className={styles.infoItem}>
                <label className={styles.label}>Last Login</label>
                <div className={styles.value}>2 hours ago (from Pasig, PH)</div>
              </div>
              <div className={styles.infoItem}>
                <label className={styles.label}>Permissions</label>
                <div className={styles.tags}>
                  <span className={styles.tag}>Full Access</span>
                  <span className={styles.tag}>User Mod</span>
                  <span className={styles.tag}>Billing</span>
                  <span className={styles.tag}>System Config</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Activity & Security */}
        <div className={styles.activityColumn}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}><Activity size={18} color="var(--gold)" /> Activity Overview</h2>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <Trophy size={20} color="var(--cyan)" />
                <div className={styles.statValue}>12</div>
                <div className={styles.statLabel}>Managed Tournaments</div>
              </div>
              <div className={styles.statCard}>
                <ShieldCheck size={20} color="var(--violet)" />
                <div className={styles.statValue}>482</div>
                <div className={styles.statLabel}>Reports Handled</div>
              </div>
              <div className={styles.statCard}>
                <Megaphone size={20} color="var(--gold)" />
                <div className={styles.statValue}>85</div>
                <div className={styles.statLabel}>Announcements</div>
              </div>
            </div>
            
            <div className={styles.recentActions}>
              <h3 className={styles.subTitle}>Recent Actions</h3>
              <div className={styles.actionItem}>
                <div className={styles.actionIcon}><CheckCircle2 size={14} /></div>
                <div className={styles.actionInfo}>
                  <div className={styles.actionText}>Published tournament <strong>Valorant Masters S1</strong></div>
                  <div className={styles.actionTime}>2 hours ago</div>
                </div>
              </div>
              <div className={styles.actionItem}>
                <div className={styles.actionIcon}><AlertTriangle size={14} color="var(--gold)" /></div>
                <div className={styles.actionInfo}>
                  <div className={styles.actionText}>Banned user <strong>ToxicGamer_99</strong> for 7 days</div>
                  <div className={styles.actionTime}>5 hours ago</div>
                </div>
              </div>
              <div className={styles.actionItem}>
                <div className={styles.actionIcon}><Edit3 size={14} /></div>
                <div className={styles.actionInfo}>
                  <div className={styles.actionText}>Updated system maintenance schedule</div>
                  <div className={styles.actionTime}>Yesterday</div>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}><Laptop size={18} color="var(--cyan)" /> Security & Sessions</h2>
            <div className={styles.deviceList}>
              <div className={styles.deviceItem}>
                <Laptop size={20} />
                <div className={styles.deviceInfo}>
                  <div className={styles.deviceName}>MacBook Pro - Pasig, PH</div>
                  <div className={styles.deviceStatus}>Current Session</div>
                </div>
                <button className={styles.btnSmall}>Manage</button>
              </div>
              <div className={styles.deviceItem}>
                <Smartphone size={20} />
                <div className={styles.deviceInfo}>
                  <div className={styles.deviceName}>iPhone 15 Pro - Quezon City, PH</div>
                  <div className={styles.deviceStatus}>Active 3 hours ago</div>
                </div>
                <button className={styles.btnSmall}>Logout</button>
              </div>
            </div>
            <button className={styles.btnOutline} style={{ width: '100%', marginTop: '16px' }}>Manage All Active Sessions</button>
          </section>
        </div>
      </div>
    </div>
  );
}
