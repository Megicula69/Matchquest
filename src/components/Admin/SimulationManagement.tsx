'use client';

import React, { useState } from 'react';
import {
  BookOpen, GitBranch, MapPin, UserSquare2,
  ScrollText, Plus, Search, Layers,
  ChevronRight, Save, Image, Music, Target,
  CheckCircle2
} from 'lucide-react';
import styles from './SimulationManagement.module.css';
import AddStoryChapterModal from './AddStoryChapterModal';

interface Chapter {
  id: string;
  title: string;
  description: string;
  choices: number;
  endings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  completion: number;
}

const mockChapters: Chapter[] = [
  { id: '1', title: 'First Day at PLP', description: 'Navigate the campus and meet your first blockmates.', choices: 8, endings: 3, difficulty: 'Easy', completion: 100 },
  { id: '2', title: 'The Midterm Crisis', description: 'Balance gaming practice with exam preparation.', choices: 12, endings: 4, difficulty: 'Medium', completion: 85 },
  { id: '3', title: 'Lungsod Arena Qualifiers', description: 'Register your team and win your first local match.', choices: 15, endings: 5, difficulty: 'Hard', completion: 40 }
];

export default function SimulationManagement() {
  const [selectedChapter, setSelectedChapter] = useState(mockChapters[0]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [chapters, setChapters] = useState(mockChapters);
  const [toast, setToast] = useState<string | null>(null);

  const handleAddChapter = (newChapter: any) => {
    setChapters(prev => [...prev, newChapter]);
    setToast('Story chapter published successfully!');
    setTimeout(() => setToast(null), 3000);
    console.log('Simulation Engine: New story node indexed', newChapter.title);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Simulation Management</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'var(--surface)', border: '1px solid rgba(0, 201, 224, 0.2)', borderRadius: '10px', color: 'var(--cyan)', fontWeight: 600, cursor: 'pointer' }}>
            <Save size={18} /> Save Changes
          </button>
        </div>
      </div>

      <div className={styles.mainGrid}>
        {/* Left Panel: Chapters */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>Story Chapters</span>
            <Plus size={16} style={{ cursor: 'pointer' }} onClick={() => setShowAddModal(true)} />
          </div>
          <div className={styles.scrollArea}>
            <div style={{ position: 'relative', marginBottom: '8px' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
              <input
                type="text"
                placeholder="Search chapters..."
                style={{ width: '100%', background: 'var(--surface2)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '8px 12px 8px 32px', color: 'var(--text)', fontSize: '12px', outline: 'none' }}
              />
            </div>
            {chapters.map((chapter) => (
              <div
                key={chapter.id}
                className={`${styles.chapterCard} ${selectedChapter.id === chapter.id ? styles.active : ''}`}
                onClick={() => setSelectedChapter(chapter)}
              >
                <div className={styles.chapterTitle}>{chapter.title}</div>
                <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '8px', lineBreak: 'anywhere' }}>{chapter.description}</div>
                <div className={styles.chapterMeta}>
                  <span className={styles.metaTag}>{chapter.choices} Choices</span>
                  <span className={styles.metaTag} style={{ background: 'rgba(155, 109, 255, 0.1)', color: 'var(--violet)' }}>{chapter.endings} Endings</span>
                  <span style={{ marginLeft: 'auto' }}>{chapter.completion}% Done</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center Panel: Map Editor */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <span className={styles.panelTitle} style={{ borderBottom: '2px solid var(--cyan)', paddingBottom: '4px' }}>Story Map</span>
              <span className={styles.panelTitle} style={{ color: 'var(--muted)' }}>Asset Library</span>
            </div>
            <Layers size={16} color="var(--muted)" />
          </div>
          <div className={styles.editor}>
            {/* SVG Layer for Connectors */}
            <svg
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}
            >
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="url(#gradientArrow)" />
                </marker>
                <linearGradient id="gradientArrow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'var(--cyan)', stopOpacity: 0.8 }} />
                  <stop offset="100%" style={{ stopColor: 'var(--violet)', stopOpacity: 0.8 }} />
                </linearGradient>
              </defs>

              {/* START to CHOICE A */}
              <path
                d="M 50% 90 Q 32% 145 15% 200"
                stroke="url(#gradientArrow)"
                strokeWidth="3"
                fill="none"
                markerEnd="url(#arrowhead)"
                opacity="0.7"
                strokeLinecap="round"
              />

              {/* START to CHOICE B */}
              <path
                d="M 50% 90 Q 68% 145 85% 200"
                stroke="url(#gradientArrow)"
                strokeWidth="3"
                fill="none"
                markerEnd="url(#arrowhead)"
                opacity="0.7"
                strokeLinecap="round"
              />

              {/* CHOICE A to END 1 (Esports) */}
              <path
                d="M 15% 290 Q 10% 330 5% 370"
                stroke="url(#gradientArrow)"
                strokeWidth="2.5"
                fill="none"
                markerEnd="url(#arrowhead)"
                opacity="0.6"
                strokeLinecap="round"
              />

              {/* CHOICE A to END 2 (Scholar) */}
              <path
                d="M 15% 290 Q 20% 330 25% 370"
                stroke="url(#gradientArrow)"
                strokeWidth="2.5"
                fill="none"
                markerEnd="url(#arrowhead)"
                opacity="0.6"
                strokeLinecap="round"
              />

              {/* CHOICE B to END 3 (Tech Lab) */}
              <path
                d="M 85% 290 Q 80% 330 75% 370"
                stroke="url(#gradientArrow)"
                strokeWidth="2.5"
                fill="none"
                markerEnd="url(#arrowhead)"
                opacity="0.6"
                strokeLinecap="round"
              />

              {/* CHOICE B to END 4 (Social) */}
              <path
                d="M 85% 290 Q 90% 330 95% 370"
                stroke="url(#gradientArrow)"
                strokeWidth="2.5"
                fill="none"
                markerEnd="url(#arrowhead)"
                opacity="0.6"
                strokeLinecap="round"
              />
            </svg>

            {/* Start Node */}
            <div className={`${styles.node} ${styles.nodeStart}`} style={{ top: '40px', left: '50%', transform: 'translateX(-50%)' }}>
              <div className={styles.nodeTitle}>▶ START: Block Orientation</div>
              <div className={styles.nodeChoices}>
                <div className={styles.choiceLine}>A: Introduce yourself</div>
                <div className={styles.choiceLine}>B: Stay quiet and observe</div>
              </div>
            </div>

            {/* Choice A Branch */}
            <div className={`${styles.node} ${styles.nodeChoice}`} style={{ top: '200px', left: '15%', transform: 'translateX(-50%)' }}>
              <div className={styles.nodeTitle}>● CHOICE: Marcus approached</div>
              <div className={styles.nodeChoices}>
                <div className={styles.choiceLine}>Join Esports Club</div>
                <div className={styles.choiceLine}>Ask about Library</div>
              </div>
            </div>

            {/* Choice B Branch */}
            <div className={`${styles.node} ${styles.nodeChoice}`} style={{ top: '200px', left: '85%', transform: 'translateX(-50%)' }}>
              <div className={styles.nodeTitle}>● CHOICE: Lonely Lunch Break</div>
              <div className={styles.nodeChoices}>
                <div className={styles.choiceLine}>Go to PC Lab</div>
                <div className={styles.choiceLine}>Visit Cafeteria</div>
              </div>
            </div>

            {/* End Nodes */}
            <div className={`${styles.node} ${styles.nodeEnd}`} style={{ top: '370px', left: '5%', transform: 'translateX(-50%)' }}>
              <div className={styles.nodeTitle}>✓ ENDING: Esports Path</div>
              <div className={styles.nodeChoices}>
                <div className={styles.choiceLine}>Joined the team</div>
              </div>
            </div>

            <div className={`${styles.node} ${styles.nodeEnd}`} style={{ top: '370px', left: '25%', transform: 'translateX(-50%)' }}>
              <div className={styles.nodeTitle}>✓ ENDING: Scholar Path</div>
              <div className={styles.nodeChoices}>
                <div className={styles.choiceLine}>Discovered library</div>
              </div>
            </div>

            <div className={`${styles.node} ${styles.nodeEnd}`} style={{ top: '370px', left: '75%', transform: 'translateX(-50%)' }}>
              <div className={styles.nodeTitle}>✓ ENDING: Tech Lab Path</div>
              <div className={styles.nodeChoices}>
                <div className={styles.choiceLine}>PC Lab expert</div>
              </div>
            </div>

            <div className={`${styles.node} ${styles.nodeEnd}`} style={{ top: '370px', left: '95%', transform: 'translateX(-50%)' }}>
              <div className={styles.nodeTitle}>✓ ENDING: Social Path</div>
              <div className={styles.nodeChoices}>
                <div className={styles.choiceLine}>Made new friends</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Preview & Stats */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>Scene Preview</span>
            <Target size={16} color="var(--cyan)" />
          </div>
          <div className={styles.scrollArea}>
            <div className={styles.previewArea}>
              <div className={styles.scenePreview}>
                <img src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=400" className={styles.sceneImage} alt="Campus" />
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className={styles.npcOverlay} alt="NPC" />
                <div className={styles.dialogueBox}>
                  <div className={styles.npcName}>Marcus (Senior Moderator)</div>
                  <div className={styles.dialogueText}>"Hey there, newcomer! Welcome to the PLP Computer Lab. Ready to test your skills in the Lungsod Arena qualifiers?"</div>
                </div>
              </div>

              <div className={styles.sidebarSection}>
                <h3 className={styles.panelTitle} style={{ fontSize: '11px', marginBottom: '4px' }}>Campus Locations</h3>
                <div className={styles.listItem}>
                  <div className={styles.itemIcon}><MapPin size={14} /></div>
                  <div style={{ flex: 1 }}>Computer Lab B</div>
                  <ChevronRight size={14} color="var(--muted)" />
                </div>
                <div className={styles.listItem}>
                  <div className={styles.itemIcon} style={{ color: 'var(--violet)' }}><MapPin size={14} /></div>
                  <div style={{ flex: 1 }}>PLP Main Library</div>
                  <ChevronRight size={14} color="var(--muted)" />
                </div>
              </div>

              <div className={styles.sidebarSection}>
                <h3 className={styles.panelTitle} style={{ fontSize: '11px', marginBottom: '4px' }}>NPC Characters</h3>
                <div className={styles.listItem}>
                  <div className={styles.itemIcon}><UserSquare2 size={14} /></div>
                  <div style={{ flex: 1 }}>Marcus (Mentor)</div>
                  <div className={styles.metaTag}>Main</div>
                </div>
                <div className={styles.listItem}>
                  <div className={styles.itemIcon}><UserSquare2 size={14} /></div>
                  <div style={{ flex: 1 }}>Professor Santos</div>
                  <div className={styles.metaTag}>Quest</div>
                </div>
              </div>

              <div className={styles.sidebarSection}>
                <h3 className={styles.panelTitle} style={{ fontSize: '11px', marginBottom: '4px' }}>Active Quests</h3>
                <div className={styles.listItem} style={{ background: 'rgba(34, 197, 94, 0.05)', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                  <div className={styles.itemIcon} style={{ color: '#22c55e' }}><ScrollText size={14} /></div>
                  <div style={{ flex: 1 }}>The First Connection</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add Story Chapter Modal */}
      <AddStoryChapterModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleAddChapter}
      />

      {/* Success Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', background: 'rgba(34, 197, 94, 0.95)',
          color: '#fff', padding: '12px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center',
          gap: '10px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', zIndex: 10000, animation: 'slideIn 0.3s ease'
        }}>
          <CheckCircle2 size={18} /> {toast}
        </div>
      )}
    </div>
  );
}
