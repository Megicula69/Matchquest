'use client';

import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import styles from './ConfirmModal.module.css';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  type?: 'danger' | 'warning' | 'info';
  confirmLabel?: string;
  cancelLabel?: string;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  type = 'danger',
  confirmLabel,
  cancelLabel = 'Cancel',
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const defaultConfirmLabel = type === 'danger' ? 'Delete' : type === 'warning' ? 'Confirm' : 'OK';

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={`${styles.modal} ${styles[type]}`} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={16} />
        </button>

        <div className={styles.iconWrap}>
          <AlertTriangle size={28} />
        </div>

        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>
            {cancelLabel}
          </button>
          <button className={`${styles.confirmBtn} ${styles[`confirm_${type}`]}`} onClick={() => { onConfirm(); onClose(); }}>
            {confirmLabel ?? defaultConfirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
