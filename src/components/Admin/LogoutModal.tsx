'use client';

import React from 'react';
import { LogOut, X, AlertTriangle, Clock } from 'lucide-react';
import styles from './LogoutModal.module.css';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.iconArea}>
          <LogOut size={32} />
        </div>
        
        <div className={styles.content}>
          <h2 className={styles.title}>Terminate Session?</h2>
          <p className={styles.desc}>
            You are about to log out of the Lungsod Arena Administrative Dashboard. 
            All unsaved configuration changes will be lost.
          </p>
          
          <div className={styles.warning}>
            <Clock size={16} />
            <span>Session expires in: 14:52</span>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={onClose}>
            Cancel
          </button>
          <button className={`${styles.btn} ${styles.logoutBtn}`} onClick={onConfirm}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
