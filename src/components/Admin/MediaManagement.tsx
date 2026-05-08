'use client';

import React, { useState } from 'react';
import { 
  Upload, Image as ImageIcon, Video, FileText, 
  Search, Trash2, Eye, Download, Filter,
  MoreVertical, CheckCircle2, Folder, X,
  Grid, List as ListIcon
} from 'lucide-react';
import styles from './MediaManagement.module.css';

interface MediaFile {
  id: string;
  name: string;
  type: 'image' | 'video' | 'asset';
  size: string;
  date: string;
  url: string;
  category: string;
}

const mockMedia: MediaFile[] = [
  { id: '1', name: 'tournament_banner_v1.png', type: 'image', size: '2.4 MB', date: '2026-05-08', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400', category: 'Tournaments' },
  { id: '2', name: 'plp_campus_bg.jpg', type: 'image', size: '1.8 MB', date: '2026-05-07', url: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=400', category: 'Simulation' },
  { id: '3', name: 'promo_video_2026.mp4', type: 'video', size: '45.2 MB', date: '2026-05-05', url: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=400', category: 'Marketing' },
  { id: '4', name: 'student_guide.pdf', type: 'asset', size: '5.1 MB', date: '2026-05-01', url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400', category: 'Documents' },
  { id: '5', name: 'valorant_logo_dark.svg', type: 'image', size: '42 KB', date: '2026-04-28', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400', category: 'Assets' }
];

export default function MediaManagement() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Images', 'Videos', 'Story Assets', 'Banners', 'Documents'];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Media Library</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
            <input 
              type="text" 
              placeholder="Search files..." 
              style={{ background: 'var(--surface)', border: '1px solid rgba(0, 201, 224, 0.1)', borderRadius: '10px', padding: '10px 16px 10px 40px', color: 'var(--text)', fontSize: '14px', outline: 'none' }} 
            />
          </div>
          <button style={{ background: 'var(--surface)', border: '1px solid rgba(0, 201, 224, 0.1)', borderRadius: '10px', padding: '10px', color: 'var(--muted)' }}><Grid size={18} /></button>
        </div>
      </div>

      <div className={styles.uploadArea}>
        <div className={styles.uploadIcon}><Upload size={24} /></div>
        <div className={styles.uploadTitle}>Drag and drop files here</div>
        <div className={styles.uploadText}>Tournament banners, story backgrounds, or promotional videos (Max 100MB)</div>
        <button style={{ marginTop: '12px', padding: '8px 24px', borderRadius: '8px', background: 'var(--cyan)', border: 'none', color: '#0a0c14', fontWeight: 700, cursor: 'pointer' }}>Select Files</button>
      </div>

      <div className={styles.filters}>
        {filters.map(f => (
          <button 
            key={f} 
            className={`${styles.filterBtn} ${activeFilter === f ? styles.active : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {mockMedia.map((file) => (
          <div key={file.id} className={styles.mediaCard}>
            <div className={styles.thumbnailContainer}>
              <img src={file.url} className={styles.thumbnail} alt={file.name} />
              <div className={styles.typeBadge}>
                {file.type === 'image' && <ImageIcon size={10} />}
                {file.type === 'video' && <Video size={10} />}
                {file.type === 'asset' && <FileText size={10} />}
                <span style={{ marginLeft: '4px' }}>{file.type}</span>
              </div>
              <div className={styles.actions}>
                <button className={styles.actionBtn}><Eye size={16} /></button>
                <button className={styles.actionBtn}><Download size={16} /></button>
                <button className={`${styles.actionBtn} ${styles.deleteBtn}`}><Trash2 size={16} /></button>
              </div>
            </div>
            <div className={styles.cardFooter}>
              <div className={styles.fileName}>{file.name}</div>
              <div className={styles.fileMeta}>
                <span>{file.size}</span>
                <span>{file.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
