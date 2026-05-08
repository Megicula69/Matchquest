'use client';

import React, { useState } from 'react';
import { 
  X, Megaphone, Image, Paperclip, Target, 
  Zap, Calendar, Globe, Eye, Plus,
  CheckCircle2, Users, Swords, Layout,
  MessageSquare, ShieldAlert, Send, FileText
} from 'lucide-react';
import styles from './CreateAnnouncementModal.module.css';

interface CreateAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newAnnouncement: any) => void;
}

export default function CreateAnnouncementModal({ isOpen, onClose, onSuccess }: CreateAnnouncementModalProps) {
  const [visibility, setVisibility] = useState('students');
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const newAnnouncement = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.get('title'),
      category: formData.get('category'),
      description: formData.get('description'),
      priority: formData.get('priority'),
      publishDate: formData.get('publishDate'),
      visibility,
      time: 'Just now',
      username: 'System Admin',
      engagement: { likes: 0, comments: 0 }
    };

    onSuccess(newAnnouncement);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Broadcast Announcement</h2>
          <button className={styles.closeBtn} onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalBody}>
          {/* ANNOUNCEMENT DETAILS */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}><Megaphone size={18} /> Announcement Details</h3>
            <div className={styles.grid}>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Announcement Title</label>
                <input name="title" className={styles.input} placeholder="e.g. Server Maintenance Notice" required />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Category</label>
                <select name="category" className={styles.input} required>
                  <option value="Event">Tournament Event</option>
                  <option value="Maintenance">System Maintenance</option>
                  <option value="Update">Platform Update</option>
                  <option value="Community">Community Spotlight</option>
                  <option value="Security">Security Alert</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Priority Level</label>
                <select name="priority" className={styles.input} required>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High (Pinned)</option>
                  <option value="Urgent">Urgent (Flash Alert)</option>
                </select>
              </div>

              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Description / Content</label>
                <textarea name="description" className={styles.input} placeholder="Enter the full message for the students..." style={{ height: '120px' }} required />
              </div>

              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Target Audience Keywords</label>
                <input name="target" className={styles.input} placeholder="e.g. Competitive, Valorant, Freshmen" />
              </div>
            </div>
          </section>

          {/* MEDIA ASSETS */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}><Image size={18} /> Media & Attachments</h3>
            <div className={styles.uploadContainer}>
              <div className={styles.uploadBox}>
                <Image size={24} className={styles.uploadIcon} />
                <div className={styles.uploadText}>
                  <strong>Upload Banner</strong>
                  <span>Drag & drop 1200x400 image</span>
                </div>
              </div>
              <div className={styles.uploadBox}>
                <Paperclip size={24} className={styles.uploadIcon} />
                <div className={styles.uploadText}>
                  <strong>Attachments</strong>
                  <span>Upload PDF, JPG, or PNG</span>
                </div>
              </div>
            </div>
          </section>

          {/* SCHEDULING & VISIBILITY */}
          <div className={styles.grid}>
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}><Calendar size={18} /> Scheduling</h3>
              <div className={styles.grid} style={{ gridTemplateColumns: '1fr' }}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Publish Date & Time</label>
                  <input name="publishDate" type="datetime-local" className={styles.input} required />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Expiration Date (Optional)</label>
                  <input name="expireDate" type="datetime-local" className={styles.input} />
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}><Target size={18} /> Visibility Settings</h3>
              <div className={styles.visibilityGrid}>
                <div className={`${styles.visibilityOption} ${visibility === 'public' ? styles.active : ''}`} onClick={() => setVisibility('public')}>
                  <div className={styles.radioCircle}><Globe size={14} /></div>
                  <span className={styles.label} style={{ textTransform: 'none' }}>Public</span>
                </div>
                <div className={`${styles.visibilityOption} ${visibility === 'students' ? styles.active : ''}`} onClick={() => setVisibility('students')}>
                  <div className={styles.radioCircle}><Users size={14} /></div>
                  <span className={styles.label} style={{ textTransform: 'none' }}>Students Only</span>
                </div>
                <div className={`${styles.visibilityOption} ${visibility === 'participants' ? styles.active : ''}`} onClick={() => setVisibility('participants')}>
                  <div className={styles.radioCircle}><Swords size={14} /></div>
                  <span className={styles.label} style={{ textTransform: 'none' }}>Tournament Teams</span>
                </div>
                <div className={`${styles.visibilityOption} ${visibility === 'communities' ? styles.active : ''}`} onClick={() => setVisibility('communities')}>
                  <div className={styles.radioCircle}><Layout size={14} /></div>
                  <span className={styles.label} style={{ textTransform: 'none' }}>Specific Orgs</span>
                </div>
              </div>
            </section>
          </div>
        </form>

        <div className={styles.modalFooter}>
          <button type="button" className={styles.btnOutline} style={{ marginRight: 'auto' }}>Save Draft</button>
          <button type="button" className={styles.btnOutline} onClick={onClose}>Cancel</button>
          <button type="button" className={styles.btnOutline}><Eye size={16} /> Preview</button>
          <button type="submit" onClick={(e) => handleSubmit(e as any)} className={styles.btnPrimary}>
            <Send size={18} /> Publish Announcement
          </button>
        </div>
      </div>
    </div>
  );
}
