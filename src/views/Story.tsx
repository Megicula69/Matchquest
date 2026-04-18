import React, { useState, useEffect } from 'react';
import styles from './Story.module.css';
import { useStory } from '../hooks/useStory';
import { Book, Map as MapIcon, Image as ImageIcon, ChevronRight, RefreshCcw, ScrollText, CheckCircle2 } from 'lucide-react';

export const StoryPage: React.FC = () => {
    const { state, currentScene, advanceStory, getEnding, resetStory } = useStory();
    const [view, setView] = useState<'SCENE' | 'MAP' | 'GALLERY' | 'ENDING' | 'QUESTS'>('SCENE');
    const [effectAnim, setEffectAnim] = useState<string | null>(null);

    useEffect(() => {
        if (state.chapter >= 10 && view !== 'ENDING') {
            setView('ENDING');
        }
    }, [state.chapter, view]);

    const handleChoice = (sceneId: string, effects: any) => {
        const effectStr = Object.entries(effects)
            .map(([k, v]) => `${(v as number) > 0 ? '+' : ''}${v} ${k.toUpperCase()}`)
            .join(', ');
        setEffectAnim(effectStr);

        setTimeout(() => {
            advanceStory(sceneId, effects);
            setEffectAnim(null);
        }, 1500);
    };

    const mapNodes = [
        { id: 'lab-1', name: 'Training Lab', top: '20%', left: '30%' },
        { id: 'library-1', name: 'Library', top: '40%', left: '70%' },
        { id: 'lounge-1', name: 'Student Lounge', top: '70%', left: '40%' },
    ];

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.hud}>
                    <div className={styles.hudStat}>
                        <span>GPA</span>
                        <div className={styles.bar}><div style={{ width: `${state.stats.gpa}%`, background: 'var(--cyan)' }} /></div>
                    </div>
                    <div className={styles.hudStat}>
                        <span>ELO</span>
                        <div className={styles.bar}><div style={{ width: `${state.stats.elo}%`, background: 'var(--violet)' }} /></div>
                    </div>
                    <div className={styles.hudStat}>
                        <span>MORALE</span>
                        <div className={styles.bar}><div style={{ width: `${state.stats.morale}%`, background: 'var(--gold)' }} /></div>
                    </div>
                    <div className={styles.hudStat}>
                        <span>STAMINA</span>
                        <div className={styles.bar}><div style={{ width: `${state.stats.stamina}%`, background: 'var(--red)' }} /></div>
                    </div>
                </div>

                <div className={styles.nav}>
                    <button className={view === 'SCENE' ? styles.active : ''} onClick={() => setView('SCENE')}><Book size={20} /></button>
                    <button className={view === 'QUESTS' ? styles.active : ''} onClick={() => setView('QUESTS')}><ScrollText size={20} /></button>
                    <button className={view === 'MAP' ? styles.active : ''} onClick={() => setView('MAP')}><MapIcon size={20} /></button>
                    <button className={view === 'GALLERY' ? styles.active : ''} onClick={() => setView('GALLERY')}><ImageIcon size={20} /></button>
                </div>
            </header>

            <main className={styles.main}>
                {view === 'SCENE' && currentScene && (
                    <div className={`${styles.sceneView} fade-in`}>
                        <div className={styles.locationTag}>{currentScene.location}</div>

                        <div className={styles.visualArea}>
                            {currentScene.cgImage ? (
                                <img src={currentScene.cgImage} alt="CG" className={styles.cgImage} />
                            ) : (
                                <div className={styles.placeholderVisual}>[ {currentScene.location} ]</div>
                            )}
                            {effectAnim && <div className={styles.effectPopup}>{effectAnim}</div>}
                        </div>

                        <div className={styles.dialogueBox}>
                            <div className={styles.npcName}>{currentScene.npcName}</div>
                            <p className={styles.dialogueText}>{currentScene.dialogue}</p>

                            <div className={styles.choices}>
                                {currentScene.choices.map((choice, i) => (
                                    <button
                                        key={i}
                                        className={styles.choiceBtn}
                                        onClick={() => handleChoice(choice.nextSceneId, choice.effects)}
                                        disabled={!!effectAnim}
                                    >
                                        {choice.text}
                                        <ChevronRight size={16} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {view === 'SCENE' && !currentScene && (
                    <div className={styles.errorView}>
                        <p>No scene data found.</p>
                        <button className={styles.resetBtn} onClick={resetStory}>
                            <RefreshCcw size={20} /> RESET STORY
                        </button>
                    </div>
                )}

                {view === 'MAP' && (
                    <div className={`${styles.mapView} fade-in`}>
                        <h2 className={styles.title}>CAMPUS MAP</h2>
                        <div className={styles.campusGrid}>
                            {mapNodes.map(node => (
                                <button
                                    key={node.id}
                                    className={styles.mapNode}
                                    style={{ top: node.top, left: node.left }}
                                    onClick={() => advanceStory(node.id, { stamina: -5 })}
                                >
                                    <MapIcon size={24} />
                                    <span>{node.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {view === 'GALLERY' && (
                    <div className={`${styles.galleryView} fade-in`}>
                        <h2 className={styles.title}>CG GALLERY</h2>
                        <div className={styles.galleryGrid}>
                            {Array.from({ length: 12 }).map((_, i) => (
                                <div key={i} className={styles.galleryCard}>
                                    {state.unlockedCGs[i] ? (
                                        <img src={state.unlockedCGs[i]} alt={`CG ${i}`} />
                                    ) : (
                                        <div className={styles.lockedCG}>LOCKED</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {view === 'QUESTS' && (
                    <div className={`${styles.questsView} fade-in`}>
                        <h2 className={styles.title}>STORY QUESTS</h2>
                        <div className={styles.questGrid}>
                            {(state.activeQuests || []).map(quest => (
                                <div key={quest.id} className={`${styles.questCard} ${quest.isCompleted ? styles.completed : ''}`}>
                                    <div className={styles.questInfo}>
                                        <div className={styles.questHeader}>
                                            <h3 className={styles.questTitle}>{quest.title}</h3>
                                            {quest.isCompleted && <CheckCircle2 size={18} className={styles.checkIcon} />}
                                        </div>
                                        <p className={styles.questDesc}>{quest.description}</p>
                                    </div>
                                    <div className={styles.questStatus}>
                                        {quest.isCompleted ? 'COMPLETED' : `PROGRESS: CH ${state.chapter}/${quest.targetChapter}`}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {view === 'ENDING' && (
                    <div className={`${styles.endingView} fade-in`}>
                        <div className={styles.endingCard}>
                            <h1 className={styles.endingType}>{getEnding().replace('_', ' ')} ENDING</h1>
                            <p>You have completed your journey at MatchQuest Arena.</p>
                            <div className={styles.endingStats}>
                                <div><span>GPA</span> {state.stats.gpa}</div>
                                <div><span>ELO</span> {state.stats.elo}</div>
                            </div>
                            <button className={styles.resetBtn} onClick={resetStory}>
                                <RefreshCcw size={20} /> RESTART JOURNEY
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};
