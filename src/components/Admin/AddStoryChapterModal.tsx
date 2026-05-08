'use client';

import React, { useState } from 'react';
import { 
  X, BookOpen, GitBranch, UserSquare2, MapPin, 
  Play, Save, Plus, Trash2, Edit3, Type, 
  MessageSquare, UserPlus, Heart, Zap, Target,
  Image as ImageIcon, Music, History, CheckCircle2,
  ChevronRight, BrainCircuit
} from 'lucide-react';
import styles from './AddStoryChapterModal.module.css';

interface AddStoryChapterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newChapter: any) => void;
}

export default function AddStoryChapterModal({ isOpen, onClose, onSuccess }: AddStoryChapterModalProps) {
  const [activeTab, setActiveTab] = useState('info');
  const [showPreview, setShowPreview] = useState(false);
  const [choices, setChoices] = useState([{ id: 1, text: '', outcome: '' }]);

  if (!isOpen) return null;

  const handleAddChoice = () => {
    setChoices([...choices, { id: Date.now(), text: '', outcome: '' }]);
  };

  const handleRemoveChoice = (id: number) => {
    setChoices(choices.filter(c => c.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newChapter = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.get('title'),
      description: formData.get('description'),
      choices: choices.length,
      endings: 1,
      difficulty: formData.get('difficulty'),
      completion: 0
    };
    onSuccess(newChapter);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Architect Story Chapter</h2>
          <button className={styles.closeBtn} onClick={onClose}><X size={20} /></button>
        </div>

        <div className={styles.modalBody}>
          {/* SIDE NAVIGATION */}
          <div className={styles.sidebar}>
            <div className={`${styles.navItem} ${activeTab === 'info' ? styles.active : ''}`} onClick={() => setActiveTab('info')}>
              <BookOpen size={18} /> Chapter Info
            </div>
            <div className={`${styles.navItem} ${activeTab === 'editor' ? styles.active : ''}`} onClick={() => setActiveTab('editor')}>
              <Edit3 size={18} /> Content Editor
            </div>
            <div className={`${styles.navItem} ${activeTab === 'choices' ? styles.active : ''}`} onClick={() => setActiveTab('choices')}>
              <GitBranch size={18} /> Branching Logic
            </div>
            <div className={`${styles.navItem} ${activeTab === 'characters' ? styles.active : ''}`} onClick={() => setActiveTab('characters')}>
              <UserSquare2 size={18} /> Character Engine
            </div>
            <div className={`${styles.navItem} ${activeTab === 'location' ? styles.active : ''}`} onClick={() => setActiveTab('location')}>
              <MapPin size={18} /> Campus Mapping
            </div>
          </div>

          {/* CONTENT AREA */}
          <form id="chapterForm" onSubmit={handleSubmit} className={styles.contentArea}>
            {activeTab === 'info' && (
              <section className={styles.section}>
                <h3 className={styles.sectionTitle}><Target size={18} /> Basic Configuration</h3>
                <div className={styles.grid}>
                  <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                    <label className={styles.label}>Chapter Title</label>
                    <input name="title" className={styles.input} placeholder="e.g. The Midterm Mystery" required />
                  </div>
                  <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                    <label className={styles.label}>Description / Logline</label>
                    <textarea name="description" className={styles.input} placeholder="A brief summary of the chapter events..." style={{ height: '80px' }} required />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Story Category</label>
                    <select name="category" className={styles.input}>
                      <option>Main Quest</option><option>Side Quest</option><option>Social Event</option><option>Gaming Practice</option>
                    </select>
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Difficulty</label>
                    <select name="difficulty" className={styles.input}>
                      <option>Easy</option><option>Medium</option><option>Hard</option>
                    </select>
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Est. Time (Mins)</label>
                    <input name="time" type="number" className={styles.input} defaultValue="15" />
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'editor' && (
              <section className={styles.section}>
                <h3 className={styles.sectionTitle}><Type size={18} /> Narrative Construction</h3>
                <div className={styles.editorBox}>
                  <div className={styles.editorToolbar}>
                    <Type size={16} className={styles.toolBtn} />
                    <MessageSquare size={16} className={styles.toolBtn} />
                    <ImageIcon size={16} className={styles.toolBtn} />
                    <Music size={16} className={styles.toolBtn} />
                    <History size={16} className={styles.toolBtn} />
                  </div>
                  <textarea name="content" className={styles.editorArea} placeholder="Start writing the scene description or initial dialogue..." />
                </div>
              </section>
            )}

            {activeTab === 'choices' && (
              <section className={styles.section}>
                <h3 className={styles.sectionTitle}><GitBranch size={18} /> Choice Architecture</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {choices.map((choice, index) => (
                    <div key={choice.id} className={styles.choiceItem}>
                      <div className={styles.grid}>
                        <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                          <label className={styles.label}>Choice {index + 1} Text</label>
                          <input className={styles.input} placeholder="What can the player say or do?" />
                        </div>
                        <div className={styles.inputGroup}>
                          <label className={styles.label}>Outcome / Node Link</label>
                          <select className={styles.input}>
                            <option>Chapter 2 (Success)</option><option>Chapter 3 (Alternate)</option><option>Game Over</option>
                          </select>
                        </div>
                        <div className={styles.inputGroup}>
                          <label className={styles.label}>Condition</label>
                          <select className={styles.input}>
                            <option>None</option><option>Reputation &gt; 50</option><option>Has Student ID</option>
                          </select>
                        </div>
                      </div>
                      <Trash2 size={16} className={styles.removeBtn} onClick={() => handleRemoveChoice(choice.id)} />
                    </div>
                  ))}
                  <button type="button" onClick={handleAddChoice} className={styles.btnOutline} style={{ width: 'fit-content' }}>
                    <Plus size={16} /> Add Choice Branch
                  </button>
                </div>
              </section>
            )}

            {activeTab === 'characters' && (
              <section className={styles.section}>
                <h3 className={styles.sectionTitle}><UserSquare2 size={18} /> Character Interactions</h3>
                <div className={styles.grid}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Character Presence</label>
                    <select className={styles.input}>
                      <option>Marcus (Mentor)</option><option>Professor Santos</option><option>Rival Gamer</option>
                    </select>
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Initial Emotion</label>
                    <select className={styles.input}>
                      <option>Neutral</option><option>Happy</option><option>Suspicious</option><option>Angry</option>
                    </select>
                  </div>
                  <div className={styles.inputGroup}>
                    <button type="button" className={styles.btnOutline} style={{ marginTop: 'auto' }}><UserPlus size={16} /> Add Character</button>
                  </div>
                </div>
                <div className={styles.charGrid}>
                  <div className={styles.charStat}><span className={styles.label}>Relationship Impact</span><span style={{ color: 'var(--cyan)' }}>+15 Harmony</span></div>
                  <div className={styles.charStat}><span className={styles.label}>Campus Reputation</span><span style={{ color: 'var(--violet)' }}>+5 Fame</span></div>
                </div>
              </section>
            )}

            {activeTab === 'location' && (
              <section className={styles.section}>
                <h3 className={styles.sectionTitle}><MapPin size={18} /> Location Selector</h3>
                <div className={styles.grid}>
                  {['Classroom', 'Cafeteria', 'Library', 'Computer Lab', 'Pasig Landmarks', 'Gaming Café'].map(loc => (
                    <div key={loc} className={styles.charStat} style={{ cursor: 'pointer' }}>
                      <span className={styles.label} style={{ color: 'var(--text)' }}>{loc}</span>
                      <ChevronRight size={14} />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </form>
        </div>

        <div className={styles.modalFooter}>
          <button type="button" className={styles.btnOutline} style={{ marginRight: 'auto' }}>Save as Draft</button>
          <button type="button" className={styles.btnOutline} onClick={onClose}>Cancel</button>
          <button type="button" onClick={() => setShowPreview(true)} className={styles.btnTest}>
            <Play size={16} /> Test Scenario
          </button>
          <button type="submit" form="chapterForm" className={styles.btnPrimary}>
            <Save size={16} /> Publish Chapter
          </button>
        </div>

        {/* TEST SCENARIO PREVIEW MODE */}
        {showPreview && (
          <div className={styles.previewOverlay}>
            <div className={styles.previewHeader}>
              <div className={styles.modalTitle} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <BrainCircuit size={20} color="var(--cyan)" /> Simulation Preview Mode
              </div>
              <button className={styles.btnOutline} onClick={() => setShowPreview(false)}>
                <X size={18} /> End Preview
              </button>
            </div>
            
            <div className={styles.previewScene}>
              <img src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1200" className={styles.sceneBg} alt="Background" />
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className={styles.characterImg} alt="Character" />
              
              <div className={styles.dialoguePanel}>
                <div className={styles.npcName}>Marcus (Mentor)</div>
                <div className={styles.dialogueText}>
                  "So you think you have what it takes to join the Lungsod Arena? 
                  Before we move forward, I need to see your student credentials. 
                  Don't tell me you forgot them on your first day..."
                </div>
                
                <div className={styles.previewChoices}>
                  <div className={styles.previewChoice}>"Of course! Here is my Student ID." (Requires ID)</div>
                  <div className={styles.previewChoice}>"I... uh, I left it in the library."</div>
                  <div className={styles.previewChoice}>"Is there another way to prove my identity?"</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
