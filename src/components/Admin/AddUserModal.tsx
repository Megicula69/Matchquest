'use client';

import React, { useState } from 'react';
import { 
  X, User, Mail, Phone, Calendar, UserCircle, 
  MapPin, Lock, Shield, UserPlus, Upload, 
  Trash2, RotateCcw, Save, CheckCircle2,
  Trophy, Gamepad2, Star, Zap
} from 'lucide-react';
import styles from './AddUserModal.module.css';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newUser: any) => void;
}

export default function AddUserModal({ isOpen, onClose, onSuccess }: AddUserModalProps) {
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate user creation
    const newUser = {
      id: Math.floor(Math.random() * 10000),
      firstName: (e.target as any).firstName.value,
      lastName: (e.target as any).lastName.value,
      username: (e.target as any).username.value,
      email: (e.target as any).email.value,
      studentId: (e.target as any).studentId.value,
      games: [(e.target as any).preferredGame.value],
      reputation: 100,
      role: (e.target as any).role.value,
      status: 'active',
      verified: true,
      lastActive: 'Just now',
      color: '#00c9e0'
    };
    onSuccess(newUser);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Add New Student Account</h2>
          <button className={styles.closeBtn} onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalBody}>
          {/* PERSONAL INFORMATION */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}><User size={18} /> Personal Information</h3>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>First Name</label>
                <input name="firstName" className={styles.input} placeholder="e.g. Juan" required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Middle Name</label>
                <input name="middleName" className={styles.input} placeholder="Optional" />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Last Name</label>
                <input name="lastName" className={styles.input} placeholder="e.g. Cruz" required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Username</label>
                <input name="username" className={styles.input} placeholder="e.g. phantom_j" required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Email Address</label>
                <input name="email" type="email" className={styles.input} placeholder="e.g. juan@plp.edu.ph" required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Contact Number</label>
                <input name="contact" className={styles.input} placeholder="e.g. 09123456789" />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Date of Birth</label>
                <input name="dob" type="date" className={styles.input} required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Gender</label>
                <select name="gender" className={styles.input}>
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Student ID</label>
                <input name="studentId" className={styles.input} placeholder="e.g. 2024-XXXX" required />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Permanent Address</label>
              <textarea name="address" className={styles.input} placeholder="Enter full address..." style={{ height: '80px' }} />
            </div>
          </section>

          {/* ACCOUNT CONFIGURATION */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}><Shield size={18} /> Account Configuration</h3>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Password</label>
                <input name="password" type="password" className={styles.input} placeholder="********" required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Confirm Password</label>
                <input name="confirmPassword" type="password" className={styles.input} placeholder="********" required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>User Role</label>
                <select name="role" className={styles.input}>
                  <option value="user">Student User</option>
                  <option value="moderator">Moderator</option>
                  <option value="organizer">Event Organizer</option>
                  <option value="admin">System Admin</option>
                </select>
              </div>
            </div>
          </section>

          {/* GAMING PROFILE */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}><Gamepad2 size={18} /> Gaming Information</h3>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Preferred Game</label>
                <select name="preferredGame" className={styles.input}>
                  <option>Valorant</option><option>League of Legends</option><option>CS2</option><option>Dota 2</option><option>Apex Legends</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Main Role</label>
                <input name="gameRole" className={styles.input} placeholder="e.g. Duelist, Jungle" />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Current Rank</label>
                <input name="rank" className={styles.input} placeholder="e.g. Diamond III" />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Gaming Nickname</label>
                <input name="nickname" className={styles.input} placeholder="e.g. Ghost" />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Favorite Genre</label>
                <input name="genre" className={styles.input} placeholder="e.g. FPS, MOBA" />
              </div>
            </div>

            <div className={styles.uploadContainer}>
              <div className={styles.previewArea}>
                {profilePreview ? (
                  <img src={profilePreview} className={styles.previewImg} alt="Preview" />
                ) : (
                  <UserCircle size={48} color="var(--muted)" />
                )}
              </div>
              <div className={styles.uploadArea}>
                <Upload size={24} className={styles.uploadIcon} />
                <span className={styles.uploadText}>Drag & drop or click to upload profile picture</span>
                <span style={{ fontSize: '10px', color: 'var(--muted)' }}>JPG, PNG (Max 5MB)</span>
              </div>
            </div>
          </section>
        </form>

        <div className={styles.modalFooter}>
          <button type="button" className={styles.btnGhost} style={{ marginRight: 'auto' }}><RotateCcw size={16} /> Reset Form</button>
          <button type="button" className={styles.btnOutline} onClick={onClose}>Cancel</button>
          <button type="button" className={styles.btnOutline}>Save as Draft</button>
          <button type="submit" onClick={(e) => handleSubmit(e as any)} className={styles.btnPrimary}><UserPlus size={18} /> Create User</button>
        </div>
      </div>
    </div>
  );
}
