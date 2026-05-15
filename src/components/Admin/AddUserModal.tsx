'use client';

import React, { useState } from 'react';
import {
  X, User, Shield, UserPlus, Upload,
  RotateCcw, Gamepad2, UserCircle,
  Ban, ShieldOff, ShieldCheck, Save,
} from 'lucide-react';
import styles from './AddUserModal.module.css';
import { useToast } from '../../context/ToastContext';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
  userToEdit?: any;
}

export default function AddUserModal({ isOpen, onClose, onSuccess, userToEdit }: AddUserModalProps) {
  const { success } = useToast();
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const isEditing = !!userToEdit;

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as any;
    const user = {
      id: userToEdit?.id ?? Math.floor(Math.random() * 10000),
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      username: form.username.value,
      email: form.email.value,
      studentId: form.studentId.value,
      games: [form.preferredGame.value],
      reputation: userToEdit?.reputation ?? 100,
      role: form.role.value,
      status: userToEdit?.status ?? 'active',
      verified: userToEdit?.verified ?? true,
      lastActive: userToEdit?.lastActive ?? 'Just now',
      color: userToEdit?.color ?? '#00c9e0',
    };
    onSuccess(user);
    success(isEditing ? 'Profile updated successfully!' : 'User created successfully!');
    onClose();
  };

  const handleAction = (action: 'verify' | 'unverify' | 'suspend' | 'ban' | 'restore' | 'unsuspend' | 'unban') => {
    if (!userToEdit) return;

    const updates: Record<string, any> = {
      verify:     { verified: true,              status: userToEdit.status },
      unverify:   { verified: false,             status: userToEdit.status },
      suspend:    { verified: userToEdit.verified, status: 'suspended' },
      ban:        { verified: userToEdit.verified, status: 'banned' },
      unsuspend:  { verified: userToEdit.verified, status: 'active' },
      unban:      { verified: userToEdit.verified, status: 'active' },
    };

    const labels: Record<string, string> = {
      verify:     'User verified successfully.',
      unverify:   'User verification removed.',
      suspend:    'Account suspended.',
      ban:        'Account banned.',
      unsuspend:  'Account unsuspended.',
      unban:      'Account unbanned.',
    };

    // Push the updated user back through onSuccess so the list updates
    onSuccess({ ...userToEdit, ...updates[action] });
    success(labels[action]);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <form onSubmit={handleSubmit} className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {isEditing ? 'Edit Student Account' : 'Add New Student Account'}
          </h2>
          <button className={styles.closeBtn} onClick={onClose}><X size={20} /></button>
        </div>

        <div className={styles.modalBody}>

          {/* ── ADMINISTRATIVE CONTROLS (edit only, shown at top) ── */}
          {isEditing && (
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}><Shield size={18} /> Administrative Controls</h3>
              <div className={styles.adminActions}>
                {/* Verify / Unverify toggle */}
                {userToEdit.verified ? (
                  <button
                    type="button"
                    className={`${styles.adminBtn} ${styles.adminCyan}`}
                    onClick={() => handleAction('unverify')}
                  >
                    <ShieldCheck size={15} /> Unverify User
                  </button>
                ) : (
                  <button
                    type="button"
                    className={`${styles.adminBtn} ${styles.adminSuccess}`}
                    onClick={() => handleAction('verify')}
                  >
                    <ShieldCheck size={15} /> Verify User
                  </button>
                )}

                {/* Suspend toggle */}
                <button
                  type="button"
                  className={`${styles.adminBtn} ${styles.adminWarn}`}
                  onClick={() => handleAction(userToEdit.status === 'suspended' ? 'unsuspend' : 'suspend')}
                >
                  <ShieldOff size={15} />
                  {userToEdit.status === 'suspended' ? 'Unsuspend Account' : 'Suspend Account'}
                </button>

                {/* Ban toggle */}
                <button
                  type="button"
                  className={`${styles.adminBtn} ${styles.adminDanger}`}
                  onClick={() => handleAction(userToEdit.status === 'banned' ? 'unban' : 'ban')}
                >
                  <Ban size={15} />
                  {userToEdit.status === 'banned' ? 'Unban User' : 'Ban User'}
                </button>
              </div>
            </section>
          )}

          {/* ── PERSONAL INFORMATION ── */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}><User size={18} /> Personal Information</h3>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>First Name</label>
                <input name="firstName" className={styles.input} placeholder="e.g. Juan" defaultValue={userToEdit?.firstName} required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Middle Name</label>
                <input name="middleName" className={styles.input} placeholder="Optional" />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Last Name</label>
                <input name="lastName" className={styles.input} placeholder="e.g. Cruz" defaultValue={userToEdit?.lastName} required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Username</label>
                <input name="username" className={styles.input} placeholder="e.g. phantom_j" defaultValue={userToEdit?.username} required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Email Address</label>
                <input name="email" type="email" className={styles.input} placeholder="e.g. juan@plp.edu.ph" defaultValue={userToEdit?.email} required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Contact Number</label>
                <input name="contact" className={styles.input} placeholder="e.g. 09123456789" />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Date of Birth</label>
                <input name="dob" type="date" className={styles.input} />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Gender</label>
                <select name="gender" className={styles.input}>
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Student ID</label>
                <input name="studentId" className={styles.input} placeholder="e.g. 2024-XXXX" defaultValue={userToEdit?.studentId} required />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Permanent Address</label>
              <textarea name="address" className={styles.input} placeholder="Enter full address..." style={{ height: '80px' }} />
            </div>
          </section>

          {/* ── ACCOUNT CONFIGURATION ── */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}><Shield size={18} /> Account Configuration</h3>
            <div className={styles.grid}>
              {!isEditing && (
                <>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Password</label>
                    <input name="password" type="password" className={styles.input} placeholder="********" required />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Confirm Password</label>
                    <input name="confirmPassword" type="password" className={styles.input} placeholder="********" required />
                  </div>
                </>
              )}
              <div className={styles.inputGroup}>
                <label className={styles.label}>User Role</label>
                <select name="role" className={styles.input} defaultValue={userToEdit?.role ?? 'user'}>
                  <option value="user">Student User</option>
                  <option value="moderator">Moderator</option>
                  <option value="organizer">Event Organizer</option>
                  <option value="admin">System Admin</option>
                </select>
              </div>
            </div>
          </section>

          {/* ── GAMING PROFILE ── */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}><Gamepad2 size={18} /> Gaming Information</h3>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Preferred Game</label>
                <select name="preferredGame" className={styles.input} defaultValue={userToEdit?.games?.[0]}>
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
                <span className={styles.uploadText}>Drag &amp; drop or click to upload profile picture</span>
                <span style={{ fontSize: '10px', color: 'var(--muted)' }}>JPG, PNG (Max 5MB)</span>
              </div>
            </div>
          </section>
        </div>

        <div className={styles.modalFooter}>
          <button type="button" className={`${styles.btn} ${styles.btnGhost}`} style={{ marginRight: 'auto' }}>
            <RotateCcw size={16} /> Reset Form
          </button>
          <button type="button" className={`${styles.btn} ${styles.btnOutline}`} onClick={onClose}>Cancel</button>
          <button
            type="submit"
            className={`${styles.btn} ${styles.btnPrimary}`}
          >
            {isEditing ? <><Save size={16} /> Update User</> : <><UserPlus size={18} /> Create User</>}
          </button>
        </div>
      </form>
    </div>
  );
}
