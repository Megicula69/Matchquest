'use client';

import React, { useState } from 'react';
import { 
  Users, MessageSquare, Trash2, Edit3, Pin, 
  Flag, Heart, Share2, Plus, Search, 
  TrendingUp, GraduationCap, Calendar, Zap,
  CheckCircle2, AlertCircle, MoreVertical
} from 'lucide-react';
import styles from './CommunityManagement.module.css';
import CreateAnnouncementModal from './CreateAnnouncementModal';

interface CommunityGroup {
  id: string;
  name: string;
  members: number;
  activity: number;
  game: string;
  reputation: number;
  banner: string;
}

const mockGroups: CommunityGroup[] = [
  { id: '1', name: 'Valorant Elite PLP', members: 1240, activity: 92, game: 'Valorant', reputation: 98, banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400' },
  { id: '2', name: 'MLBB Strategists', members: 850, activity: 75, game: 'MLBB', reputation: 95, banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400' },
  { id: '3', name: 'Wild Rift Hub', members: 620, activity: 60, game: 'Wild Rift', reputation: 88, banner: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=400' }
];

export default function CommunityManagement() {
  const [activeTab, setActiveTab] = useState('communities');
  const [showAddModal, setShowAddModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handlePublishAnnouncement = (newAnnouncement: any) => {
    setToast('Announcement published successfully!');
    setTimeout(() => setToast(null), 3000);
    console.log('Activity Log Created: Admin broadcasted announcement', newAnnouncement.title);
    console.log('Push notification sent to target audience:', newAnnouncement.visibility);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Community Hub</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
            <input 
              type="text" 
              placeholder="Search groups or posts..." 
              style={{ background: 'var(--surface)', border: '1px solid var(--glass-border)', borderRadius: '10px', padding: '10px 16px 10px 40px', color: 'var(--text)', fontSize: '14px', outline: 'none' }} 
            />
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'linear-gradient(135deg, var(--cyan), var(--violet))', border: 'none', borderRadius: '10px', color: '#0a0c14', fontWeight: 600, cursor: 'pointer' }}
          >
            <Plus size={18} /> New Announcement
          </button>
        </div>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}><Users size={20} color="var(--cyan)" /> Community Groups</h2>
          <div className={styles.communityGrid}>
            {mockGroups.map((group) => (
              <div key={group.id} className={styles.communityCard}>
                <img src={group.banner} className={styles.cardBanner} alt={group.name} />
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <div className={styles.groupIcon}>
                      <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${group.name}&backgroundColor=00c9e4,9b6dff`} alt="" style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
                    </div>
                    <div className={styles.groupName}>{group.name}</div>
                  </div>
                  <div className={styles.cardStats}>
                    <div className={styles.statItem}><Users size={14} /> {group.members}</div>
                    <div className={styles.statItem}><Zap size={14} color="var(--cyan)" /> {group.activity}% Active</div>
                  </div>
                  <div className={styles.activityBar}>
                    <div className={styles.activityFill} style={{ width: `${group.activity}%` }} />
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Main Game: {group.game}</span>
                    <span style={{ color: '#22c55e' }}>Rep: {group.reputation}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className={styles.sectionTitle} style={{ marginTop: '12px' }}><MessageSquare size={20} color="var(--violet)" /> Moderation Feed</h2>
          <div className={styles.feed}>
            <div className={styles.postCard}>
              <div className={styles.postHeader}>
                <div className={styles.postUser}>
                  <div className={styles.userAvatar}>
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=CyberWarrior" alt="" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                  </div>
                  <div className={styles.userInfo}>
                    <span className={styles.username}>CyberWarrior_2026</span>
                    <span className={styles.postTime}>2 hours ago · Valorant Elite</span>
                  </div>
                </div>
                <div className={styles.postBadge}>5 Reports</div>
              </div>
              <div className={styles.postBody}>
                "Anyone looking for a Duo partner? Must be Diamond rank. Don't be toxic or I'll report you. Sick of these noobs ruining games."
              </div>
              <div className={styles.postActions}>
                <div className={styles.engagement}>
                  <span className={styles.statItem}><Heart size={14} /> 12</span>
                  <span className={styles.statItem}><MessageSquare size={14} /> 4</span>
                </div>
                <div className={styles.btnGroup}>
                  <button className={`${styles.actionBtn} ${styles.pinBtn}`}><Pin size={14} /></button>
                  <button className={`${styles.actionBtn} ${styles.editBtn}`}><Edit3 size={14} /> Edit</button>
                  <button className={`${styles.actionBtn} ${styles.removeBtn}`}><Trash2 size={14} /> Remove</button>
                </div>
              </div>
            </div>

            <div className={styles.postCard}>
              <div className={styles.postHeader}>
                <div className={styles.postUser}>
                  <div className={styles.userAvatar}>
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=ModOfficial`} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                  </div>
                  <div className={styles.userInfo}>
                    <span className={styles.username}>Mod_Official</span>
                    <span className={styles.postTime}>5 hours ago · Announcements</span>
                  </div>
                </div>
                <Pin size={16} color="var(--violet)" />
              </div>
              <div className={styles.postBody} style={{ fontWeight: 600, color: 'var(--cyan)' }}>
                "Official Tournament Registration is now OPEN for the Valorant Campus Masters! Prize pool: ₱50,000."
              </div>
              <div className={styles.postActions}>
                <div className={styles.engagement}>
                  <span className={styles.statItem}><Heart size={14} /> 482</span>
                  <span className={styles.statItem}><MessageSquare size={14} /> 124</span>
                </div>
                <div className={styles.btnGroup}>
                  <button className={`${styles.actionBtn} ${styles.editBtn}`}><Edit3 size={14} /> Edit</button>
                  <button className={`${styles.actionBtn} ${styles.removeBtn}`}><Trash2 size={14} /> Unpin</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className={styles.sidebarSection}>
            <h2 className={styles.sectionTitle}><TrendingUp size={18} color="var(--cyan)" /> Trending Now</h2>
            <div className={styles.sidebarItem}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--cyan)' }} />
              <div className={styles.sidebarInfo}>
                <div className={styles.itemName}>#ValorantMasters</div>
                <div className={styles.itemMeta}>2.4k posts this week</div>
              </div>
            </div>
            <div className={styles.sidebarItem}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--violet)' }} />
              <div className={styles.sidebarInfo}>
                <div className={styles.itemName}>#PLPGamingWeek</div>
                <div className={styles.itemMeta}>1.1k posts this week</div>
              </div>
            </div>
          </div>

          <div className={styles.sidebarSection}>
            <h2 className={styles.sectionTitle}><GraduationCap size={18} color="var(--gold)" /> Org Approvals</h2>
            <div className={styles.sidebarItem}>
              <div className={styles.userAvatar}>
                <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=LOL_Society`} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
              </div>
              <div className={styles.sidebarInfo}>
                <div className={styles.itemName}>League of Legends Society</div>
                <div className={styles.itemMeta}>Pending verification</div>
              </div>
              <CheckCircle2 size={16} color="#22c55e" />
            </div>
            <div className={styles.sidebarItem}>
              <div className={styles.userAvatar}>
                <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=MLBB_Club`} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
              </div>
              <div className={styles.sidebarInfo}>
                <div className={styles.itemName}>PLP Mobile Legends Club</div>
                <div className={styles.itemMeta}>Documentation missing</div>
              </div>
              <AlertCircle size={16} color="var(--gold)" />
            </div>
          </div>

          <div className={styles.sidebarSection}>
            <h2 className={styles.sectionTitle}><Calendar size={18} color="var(--violet)" /> Collaboration Hub</h2>
            <div style={{ fontSize: '12px', color: 'var(--muted)', fontStyle: 'italic', padding: '10px' }}>
              "Valorant Elite" requested collaboration with "MLBB Strategists" for the upcoming 'Multi-Game Weekend'.
            </div>
            <button className={`${styles.actionBtn} ${styles.editBtn}`} style={{ width: '100%' }}>Review Request</button>
          </div>
        </div>
      </div>

      {/* Create Announcement Modal */}
      <CreateAnnouncementModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
        onSuccess={handlePublishAnnouncement}
      />

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
