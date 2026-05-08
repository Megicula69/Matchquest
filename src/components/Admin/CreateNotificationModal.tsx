'use client';

import React, { useState } from 'react';
import { 
  X, Bell, Send, Clock, ShieldAlert, 
  CheckCircle2, Info, Megaphone, Target,
  Mail, MessageSquare, Smartphone, Zap,
  Eye, Save, Calendar, Filter
} from 'lucide-react';
import styles from './CreateNotificationModal.module.css';

interface CreateNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newNotif: any) => void;
}

export default function CreateNotificationModal({ isOpen, onClose, onSuccess }: CreateNotificationModalProps) {
  const [methods, setMethods] = useState<string[]>(['in-app']);
  const [priority, setPriority] = useState('Medium');

  if (!isOpen) return null;

  const toggleMethod = (method: string) => {
    setMethods(prev => 
      prev.includes(method) ? prev.filter(m => m !== method) : [...prev, method]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const newNotif = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.get('title'),
      message: formData.get('message'),
      type: formData.get('type'),
      category: formData.get('type').toString().charAt(0).toUpperCase() + formData.get('type').toString().slice(1),
      timestamp: 'Just now',
      reach: Math.floor(Math.random() * 5000),
      methods: methods,
      priority: priority,
      sender: 'Admin Dashboard',
      status: 'Sent'
    };

    onSuccess(newNotif);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Dispatch Notification</h2>
          <button className={styles.closeBtn} onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalBody}>
          {/* NOTIFICATION DETAILS */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}><Info size={18} /> Notification Details</h3>
            <div className={styles.grid}>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Notification Title</label>
                <input name="title" className={styles.input} placeholder="e.g. Tournament Brackets are Live!" required />
              </div>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Notification Message</label>
                <textarea name="message" className={styles.input} placeholder="Enter the full alert message..." style={{ height: '80px' }} required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Notification Type</label>
                <select name="type" className={styles.input} required>
                  <option value="info">Information</option>
                  <option value="success">Success / Achievement</option>
                  <option value="warning">Maintenance / Warning</option>
                  <option value="alert">Critical Security Alert</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Target Audience</label>
                <select name="audience" className={styles.input}>
                  <option>All Registered Students</option>
                  <option>Tournament Participants Only</option>
                  <option>Freshmen Batch 2026</option>
                  <option>Esports Club Members</option>
                  <option>Faculty & Staff</option>
                </select>
              </div>
            </div>
          </section>

          {/* DELIVERY METHODS */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}><Zap size={18} /> Delivery Methods</h3>
            <div className={styles.deliveryGrid}>
              <div className={`${styles.deliveryCard} ${methods.includes('push') ? styles.active : ''}`} onClick={() => toggleMethod('push')}>
                <div className={styles.methodIcon}><Bell size={20} /></div>
                <span className={styles.label} style={{ fontSize: '11px' }}>Push</span>
              </div>
              <div className={`${styles.deliveryCard} ${methods.includes('in-app') ? styles.active : ''}`} onClick={() => toggleMethod('in-app')}>
                <div className={styles.methodIcon}><MessageSquare size={20} /></div>
                <span className={styles.label} style={{ fontSize: '11px' }}>In-App</span>
              </div>
              <div className={`${styles.deliveryCard} ${methods.includes('email') ? styles.active : ''}`} onClick={() => toggleMethod('email')}>
                <div className={styles.methodIcon}><Mail size={20} /></div>
                <span className={styles.label} style={{ fontSize: '11px' }}>Email</span>
              </div>
              <div className={`${styles.deliveryCard} ${methods.includes('sms') ? styles.active : ''}`} onClick={() => toggleMethod('sms')}>
                <div className={styles.methodIcon}><Smartphone size={20} /></div>
                <span className={styles.label} style={{ fontSize: '11px' }}>SMS</span>
              </div>
            </div>
          </section>

          {/* SCHEDULING & PRIORITY */}
          <div className={styles.grid}>
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}><Clock size={18} /> Scheduling</h3>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Send Time</label>
                <select name="scheduleType" className={styles.input}>
                  <option value="now">Send Immediately</option>
                  <option value="scheduled">Schedule for Later</option>
                </select>
              </div>
              <div className={styles.grid} style={{ gridTemplateColumns: '1fr' }}>
                <input name="scheduleDate" type="datetime-local" className={styles.input} />
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}><Target size={18} /> Priority Level</h3>
              <div className={styles.grid} style={{ gridTemplateColumns: '1fr' }}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Dispatch Priority</label>
                  <div className={styles.deliveryGrid} style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                    {['Low', 'Medium', 'High'].map(p => (
                      <div key={p} className={`${styles.deliveryCard} ${priority === p ? styles.active : ''}`} onClick={() => setPriority(p)} style={{ padding: '8px' }}>
                        <span className={styles.label} style={{ fontSize: '10px' }}>{p}</span>
                      </div>
                    ))}
                  </div>
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
            <Send size={18} /> Dispatch Notification
          </button>
        </div>
      </div>
    </div>
  );
}
