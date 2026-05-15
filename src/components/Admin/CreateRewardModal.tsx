'use client';

import React, { useState } from 'react';
import { 
  X, Trophy, Star, Zap, Shield, Target, 
  CheckCircle2, Swords, Users, BadgeCheck, 
  Frame, Key, Eye, Save, Send, Sparkles,
  Award, Medal
} from 'lucide-react';
import styles from './CreateRewardModal.module.css';

interface CreateRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newReward: any) => void;
}

export default function CreateRewardModal({ isOpen, onClose, onSuccess }: CreateRewardModalProps) {
  const [rarity, setRarity] = useState('Epic');
  const [rewardTypes, setRewardTypes] = useState<string[]>(['XP']);
  const [name, setName] = useState('Gladiator of PLP');

  if (!isOpen) return null;

  const toggleReward = (type: string) => {
    setRewardTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const newReward = {
      id: Math.random().toString(36).substr(2, 9),
      name: name,
      description: formData.get('description'),
      xp: Number(formData.get('xp')),
      rarity: rarity,
      type: rewardTypes[0] || 'Badge',
      icon: <Trophy size={20} />,
      progress: 0
    };

    onSuccess(newReward);
    onClose();
  };

  const getRarityColor = (r: string) => {
    switch(r) {
      case 'Common': return '#94a3b8';
      case 'Rare': return '#00c9e0';
      case 'Epic': return '#9b6dff';
      case 'Legendary': return '#f0a500';
      default: return 'var(--cyan)';
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Forge New Achievement</h2>
          <button className={styles.closeBtn} onClick={onClose}><X size={20} /></button>
        </div>

        <div className={styles.modalBody}>
          {/* FORM PANEL */}
          <form id="rewardForm" onSubmit={handleSubmit} className={styles.formSection}>
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}><Award size={18} /> Achievement Information</h3>
              <div className={styles.grid}>
                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label className={styles.label}>Achievement Name</label>
                  <input name="title" className={styles.input} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Campus Legend" required />
                </div>
                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label className={styles.label}>Description</label>
                  <textarea name="description" className={styles.input} placeholder="How can students earn this?" style={{ height: '80px' }} required />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>XP Reward</label>
                  <input name="xp" type="number" className={styles.input} defaultValue="500" />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Rarity Level</label>
                  <select className={styles.input} value={rarity} onChange={(e) => setRarity(e.target.value)}>
                    <option>Common</option><option>Rare</option><option>Epic</option><option>Legendary</option>
                  </select>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}><Target size={18} /> Unlock Conditions</h3>
              <div className={styles.grid}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Tournament Wins</label>
                  <input name="wins" type="number" className={styles.input} defaultValue="5" />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Reputation Threshold</label>
                  <input name="rep" type="number" className={styles.input} defaultValue="1000" />
                </div>
                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label className={styles.label}>Participation Requirement</label>
                  <select name="participation" className={styles.input}>
                    <option>Attend 3 Campus Events</option>
                    <option>Complete First Simulation Chapter</option>
                    <option>Join an Official Esports Org</option>
                  </select>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}><Star size={18} /> Reward Types</h3>
              <div className={styles.rewardGrid}>
                {[
                  { id: 'Badge', icon: <BadgeCheck size={18} /> },
                  { id: 'XP', icon: <Zap size={18} /> },
                  { id: 'Title', icon: <Sparkles size={18} /> },
                  { id: 'Frame', icon: <Frame size={18} /> },
                  { id: 'Access', icon: <Key size={18} /> }
                ].map(type => (
                  <div 
                    key={type.id} 
                    className={`${styles.rewardCard} ${rewardTypes.includes(type.id) ? styles.active : ''}`}
                    onClick={() => toggleReward(type.id)}
                  >
                    {type.icon}
                    <span className={styles.label} style={{ fontSize: '10px' }}>{type.id}</span>
                  </div>
                ))}
              </div>
            </section>
          </form>

          {/* PREVIEW PANEL */}
          <div className={styles.previewPanel}>
            <h3 className={styles.sectionTitle} style={{ border: 'none' }}><Eye size={18} /> Live Preview</h3>
            
            <div className={styles.achievementPreview}>
              <div className={styles.iconPreview} style={{ borderColor: getRarityColor(rarity), boxShadow: `0 0 20px ${getRarityColor(rarity)}66` }}>
                <Trophy size={32} />
              </div>
              <div>
                <div className={styles.rarityBadge} style={{ background: `${getRarityColor(rarity)}22`, color: getRarityColor(rarity), border: `1px solid ${getRarityColor(rarity)}44` }}>
                  {rarity}
                </div>
                <h4 style={{ margin: '8px 0 4px', fontSize: '18px', fontWeight: 700 }}>{name}</h4>
                <p style={{ fontSize: '12px', color: 'var(--muted)' }}>Master of the PLP Campus Arena</p>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                {rewardTypes.map(rt => (
                  <div key={rt} style={{ fontSize: '10px', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '4px' }}>
                    +{rt}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding: '16px', background: 'rgba(240, 165, 0, 0.05)', borderRadius: '12px', border: '1px solid rgba(240, 165, 0, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold)', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                <Medal size={14} /> UNLOCK ANIMATION
              </div>
              <div style={{ fontSize: '11px', color: 'var(--muted)', fontStyle: 'italic' }}>
                "Achievement popup will slide in from top-right with a {rarity.toLowerCase()} glow effect."
              </div>
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button type="button" className={`${styles.btn} ${styles.btnOutline}`} style={{ marginRight: 'auto' }}>Save Draft</button>
          <button type="button" className={`${styles.btn} ${styles.btnOutline}`} onClick={onClose}>Cancel</button>
          <button type="button" className={`${styles.btn} ${styles.btnOutline}`}><Sparkles size={16} /> Preview FX</button>
          <button type="submit" form="rewardForm" className={`${styles.btn} ${styles.btnPrimary}`}>
            <Send size={18} /> Publish Reward
          </button>
        </div>
      </div>
    </div>
  );
}
