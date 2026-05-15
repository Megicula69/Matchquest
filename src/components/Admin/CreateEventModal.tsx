'use client';

import React, { useState } from 'react';
import { 
  X, Calendar, MapPin, Users, Clock, 
  Image as ImageIcon, FileText, Info, 
  CheckCircle2, Bell, MessageSquare, 
  QrCode, UserPlus, Save, Eye, Send,
  Target, GraduationCap, Zap
} from 'lucide-react';
import styles from './CreateEventModal.module.css';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newEvent: any) => void;
}

export default function CreateEventModal({ isOpen, onClose, onSuccess }: CreateEventModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newEvent = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.get('title'),
      date: formData.get('date'),
      time: formData.get('startTime'),
      venue: formData.get('venue'),
      participants: 0,
      maxParticipants: Number(formData.get('maxParticipants')),
      organizer: formData.get('organizer'),
      status: 'Open',
      category: formData.get('category'),
      banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400'
    };

    onSuccess(newEvent);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Launch New Campus Event</h2>
          <button className={styles.closeBtn} onClick={onClose}><X size={20} /></button>
        </div>

        <form id="create-event-form" onSubmit={handleSubmit} className={styles.modalBody}>
          {/* EVENT INFORMATION */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}><Info size={18} /> Event Information</h3>
            <div className={styles.grid}>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Event Title</label>
                <input name="title" className={styles.input} placeholder="e.g. Valorant Finals Night S1" required />
              </div>
              
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Event Banner</label>
                <div className={styles.bannerUpload}>
                  <ImageIcon size={24} color="var(--muted)" />
                  <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Drag & drop or click to upload banner</span>
                </div>
              </div>

              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Event Description</label>
                <textarea name="description" className={styles.input} placeholder="Provide details about the event activities..." style={{ height: '100px' }} required />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Event Category</label>
                <select name="category" className={styles.input} required>
                  <option value="Tournament">Tournament</option>
                  <option value="Meetup">Community Meetup</option>
                  <option value="Workshop">Technical Workshop</option>
                  <option value="Social">Social Gathering</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Organizer Name</label>
                <input name="organizer" className={styles.input} placeholder="e.g. PLP Esports Society" required />
              </div>
            </div>
          </section>

          {/* SCHEDULE & VENUE */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}><Calendar size={18} /> Schedule & Venue</h3>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Event Date</label>
                <input name="date" type="date" className={styles.input} required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Start Time</label>
                <input name="startTime" type="time" className={styles.input} required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>End Time</label>
                <input name="endTime" type="time" className={styles.input} required />
              </div>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Venue / Location</label>
                <input name="venue" className={styles.input} placeholder="e.g. PLP Auditorium or Discord Server" required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Capacity Limit</label>
                <input name="maxParticipants" type="number" className={styles.input} defaultValue="100" required />
              </div>
            </div>
          </section>

          {/* REGISTRATION SETTINGS */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}><UserPlus size={18} /> Registration & Attendance</h3>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Registration Deadline</label>
                <input name="deadline" type="datetime-local" className={styles.input} required />
              </div>
              <div className={styles.inputGroup}>
                <div className={styles.featureCard} style={{ background: 'rgba(0, 201, 224, 0.05)', borderColor: 'rgba(0, 201, 224, 0.2)' }}>
                  <div className={styles.featureInfo}>
                    <div className={styles.featureLabel}>QR Attendance</div>
                    <div className={styles.featureDesc}>Enable scan-to-enter</div>
                  </div>
                  <label className={styles.switch}>
                    <input type="checkbox" name="qrEnabled" defaultChecked />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* EVENT FEATURES */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}><Zap size={18} /> Event Features</h3>
            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <div className={styles.featureInfo}>
                  <div className={styles.featureLabel}>Live Chat</div>
                  <div className={styles.featureDesc}>Real-time student interaction</div>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" name="liveChat" defaultChecked />
                  <span className={styles.slider}></span>
                </label>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureInfo}>
                  <div className={styles.featureLabel}>Notifications</div>
                  <div className={styles.featureDesc}>Automated RSVP reminders</div>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" name="notifications" defaultChecked />
                  <span className={styles.slider}></span>
                </label>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureInfo}>
                  <div className={styles.featureLabel}>RSVP System</div>
                  <div className={styles.featureDesc}>Track attendance intention</div>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" name="rsvpSystem" defaultChecked />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>
          </section>
        </form>

        <div className={styles.modalFooter}>
          <button type="button" className={`${styles.btn} ${styles.btnOutline}`} style={{ marginRight: 'auto' }}>Save Draft</button>
          <button type="button" className={`${styles.btn} ${styles.btnOutline}`} onClick={onClose}>Cancel</button>
          <button type="button" className={`${styles.btn} ${styles.btnOutline}`}><Eye size={16} /> Preview</button>
          <button type="submit" form="create-event-form" className={`${styles.btn} ${styles.btnPrimary}`}>
            <Send size={18} /> Publish Event
          </button>
        </div>
      </div>
    </div>
  );
}
