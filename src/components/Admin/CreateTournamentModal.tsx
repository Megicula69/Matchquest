'use client';

import React, { useState } from 'react';
import { 
  X, Trophy, Image, FileText, Gamepad2, 
  Target, Users, Shield, Zap, Calendar, 
  Globe, Layout, Share2, Eye, Plus,
  CheckCircle2, Clock, Swords, Info
} from 'lucide-react';
import styles from './CreateTournamentModal.module.css';

interface CreateTournamentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newTournament: any) => void;
}

export default function CreateTournamentModal({ isOpen, onClose, onSuccess }: CreateTournamentModalProps) {
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newTournament = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.get('name'),
      game: formData.get('game'),
      type: formData.get('type'),
      teams: 0,
      maxTeams: Number(formData.get('maxTeams')),
      prize: formData.get('prize'),
      startDate: formData.get('startDate'),
      status: 'upcoming',
      banner: bannerPreview || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400',
      progress: 0,
    };

    onSuccess(newTournament);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Establish New Tournament</h2>
          <button className={styles.closeBtn} onClick={onClose}><X size={20} /></button>
        </div>

        <form id="create-tournament-form" onSubmit={handleSubmit} className={styles.modalBody}>
          {/* TOURNAMENT INFORMATION */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}><Info size={18} /> Tournament Information</h3>
            <div className={styles.grid}>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Tournament Name</label>
                <input name="name" className={styles.input} placeholder="e.g. Valorant Campus Masters S1" required />
              </div>
              
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Tournament Banner</label>
                <div className={styles.bannerUpload}>
                  {bannerPreview ? (
                    <img src={bannerPreview} className={styles.bannerPreview} alt="Preview" />
                  ) : (
                    <>
                      <Image size={24} className={styles.uploadIcon} />
                      <span className={styles.uploadText}>Upload banner (16:9 recommended)</span>
                    </>
                  )}
                </div>
              </div>

              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Tournament Description</label>
                <textarea name="description" className={styles.input} placeholder="Provide details about the event..." style={{ height: '100px' }} required />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Game Selection</label>
                <select name="game" className={styles.input} required>
                  <option value="Valorant">Valorant</option>
                  <option value="MLBB">MLBB</option>
                  <option value="Wild Rift">Wild Rift</option>
                  <option value="CS2">CS2</option>
                  <option value="Dota 2">Dota 2</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Prize Pool</label>
                <input name="prize" className={styles.input} placeholder="e.g. ₱50,000" required />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Maximum Teams</label>
                <input name="maxTeams" type="number" className={styles.input} defaultValue="16" required />
              </div>

              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Tournament Rules</label>
                <textarea name="rules" className={styles.input} placeholder="Enter tournament rules and regulations..." style={{ height: '100px' }} />
              </div>
            </div>
          </section>

          {/* SCHEDULE SETTINGS */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}><Calendar size={18} /> Schedule Settings</h3>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Registration Start</label>
                <input name="regStart" type="datetime-local" className={styles.input} required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Registration End</label>
                <input name="regEnd" type="datetime-local" className={styles.input} required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Match Start Date</label>
                <input name="startDate" type="datetime-local" className={styles.input} required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Tournament End</label>
                <input name="endDate" type="datetime-local" className={styles.input} required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Timezone</label>
                <select name="timezone" className={styles.input}>
                  <option value="Asia/Manila">Asia/Manila (UTC+8)</option>
                </select>
              </div>
            </div>
          </section>

          {/* BRACKET & TEAM CONFIGURATION */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}><Layout size={18} /> Bracket & Team Config</h3>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Bracket Type</label>
                <select name="type" className={styles.input}>
                  <option value="Single Elimination">Single Elimination</option>
                  <option value="Double Elimination">Double Elimination</option>
                  <option value="Round Robin">Round Robin</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Team Size</label>
                <input name="teamSize" type="number" className={styles.input} defaultValue="5" required />
              </div>
              <div className={styles.inputGroup}>
                <div className={styles.settingGroup}>
                  <div className={styles.settingInfo}>
                    <div className={styles.settingLabel}>Verify Teams</div>
                    <div className={styles.settingDesc}>ID check required</div>
                  </div>
                  <label className={styles.switch}>
                    <input type="checkbox" name="verifyTeams" defaultChecked />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* LIVE MATCH FEATURES */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}><Zap size={18} /> Live Match Features</h3>
            <div className={styles.grid}>
              <div className={styles.settingGroup}>
                <div className={styles.settingInfo}>
                  <div className={styles.settingLabel}>Live Score Tracking</div>
                  <div className={styles.settingDesc}>Sync match data automatically</div>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" name="liveScore" defaultChecked />
                  <span className={styles.slider}></span>
                </label>
              </div>
              <div className={styles.settingGroup}>
                <div className={styles.settingInfo}>
                  <div className={styles.settingLabel}>Stream Integration</div>
                  <div className={styles.settingDesc}>Enable Twitch/Discord stream</div>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" name="streaming" />
                  <span className={styles.slider}></span>
                </label>
              </div>
              <div className={styles.settingGroup}>
                <div className={styles.settingInfo}>
                  <div className={styles.settingLabel}>Spectator Mode</div>
                  <div className={styles.settingDesc}>Allow students to watch</div>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" name="spectator" defaultChecked />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>
          </section>
        </form>

        <div className={styles.modalFooter}>
          <button type="button" className={`${styles.btn} ${styles.btnOutline}`} style={{ marginRight: 'auto' }}>Save as Draft</button>
          <button type="button" className={`${styles.btn} ${styles.btnOutline}`} onClick={onClose}>Cancel</button>
          <button type="button" className={`${styles.btn} ${styles.btnOutline}`}><Eye size={16} /> Preview</button>
          <button type="submit" form="create-tournament-form" className={`${styles.btn} ${styles.btnPrimary}`}>
            <Trophy size={18} /> Publish Tournament
          </button>
        </div>
      </div>
    </div>
  );
}
