'use client';

import React, { useState } from 'react';
import { 
  BookOpen, GitBranch, MapPin, UserSquare2, 
  ScrollText, Play, Plus, Search, Layers,
  ChevronRight, Save, Image, Music, Target
} from 'lucide-react';
import styles from './SimulationManagement.module.css';

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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Simulation Management</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'var(--surface)', border: '1px solid rgba(0, 201, 224, 0.2)', borderRadius: '10px', color: 'var(--cyan)', fontWeight: 600, cursor: 'pointer' }}>
            <Save size={18} /> Save Changes
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'linear-gradient(135deg, var(--cyan), var(--violet))', border: 'none', borderRadius: '10px', color: '#0a0c14', fontWeight: 600, cursor: 'pointer' }}>
            <Play size={18} /> Test Scenario
          </button>
        </div>
      </div>

      <div className={styles.mainGrid}>
        {/* Left Panel: Chapters */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>Story Chapters</span>
            <Plus size={16} style={{ cursor: 'pointer' }} />
          </div>
          <div className={styles.scrollArea}>
            <div style={{ position: 'relative', marginBottom: '8px' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
              <input 
                type="text" 
                placeholder="Search chapters..." 
                style={{ width: '100%', background: 'var(--background)', border: '1px solid rgba(0, 201, 224, 0.1)', borderRadius: '8px', padding: '8px 12px 8px 32px', color: 'var(--text)', fontSize: '12px', outline: 'none' }} 
              />
            </div>
            {mockChapters.map((chapter) => (
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
            {/* Start Node */}
            <div className={styles.node} style={{ top: '40px', left: '50%', transform: 'translateX(-50%)', borderColor: '#22c55e' }}>
              <div className={styles.nodeTitle}>START: Block Orientation</div>
              <div className={styles.nodeChoices}>
                <div className={styles.choiceLine}>A: Introduce yourself</div>
                <div className={styles.choiceLine}>B: Stay quiet and observe</div>
              </div>
            </div>

            {/* Choice A Branch */}
            <div className={styles.node} style={{ top: '180px', left: '10%' }}>
              <div className={styles.nodeTitle}>NPC: Marcus approached</div>
              <div className={styles.nodeChoices}>
                <div className={styles.choiceLine}>Join Esports Club</div>
                <div className={styles.choiceLine}>Ask about Library</div>
              </div>
            </div>

            {/* Choice B Branch */}
            <div className={styles.node} style={{ top: '180px', right: '10%' }}>
              <div className={styles.nodeTitle}>Lonely Lunch Break</div>
              <div className={styles.nodeChoices}>
                <div className={styles.choiceLine}>Go to PC Lab</div>
                <div className={styles.choiceLine}>Visit Cafeteria</div>
              </div>
            </div>

            {/* Mock Connectors */}
            <div className={styles.connector} style={{ top: '140px', left: '50%', width: '150px', transform: 'rotate(-45deg)', transformOrigin: 'left' }} />
            <div className={styles.connector} style={{ top: '140px', left: '50%', width: '150px', transform: 'rotate(45deg)', transformOrigin: 'left' }} />
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
    </div>
  );
}
