import React, { useState } from 'react';
import styles from './Find.module.css';
import { useMatchmaking } from '../hooks/useMatchmaking';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Player, Message } from '../types';
import { players as hardcodedPlayers } from '../data/players';
import { X, Heart, Filter, MessageSquare, Mic, Globe, Star } from 'lucide-react';

export const FindPage: React.FC = () => {
    const { activeMode, setActiveMode, currentPlayer, handleMatch, handlePass, matches } = useMatchmaking();
    const [showFilters, setShowFilters] = useState(false);
    const [showChat, setShowChat] = useState<string | null>(null);
    const [chatMessage, setChatMessage] = useState('');
    const [allMessages, setAllMessages] = useLocalStorage<Message[]>('mq_messages', []);

    // Filter states
    const [micRequired, setMicRequired] = useState(false);
    const [localOnly, setLocalOnly] = useState(false);
    const [minRep, setMinRep] = useState(0);

    const matchedPlayers = hardcodedPlayers.filter(p => matches.includes(p.id));

    const sendMessage = () => {
        if (!chatMessage || !showChat) return;
        const newMessage: Message = {
            id: Date.now().toString(),
            senderId: 'me',
            receiverId: showChat,
            text: chatMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setAllMessages([...allMessages, newMessage]);
        setChatMessage('');
    };

    return (
        <div className={styles.container}>
            <div className={styles.mainArea}>
                <div className={styles.modeToggle}>
                    {(['COMP', 'SOCIAL', 'DUO'] as const).map(mode => (
                        <button
                            key={mode}
                            className={`${styles.modeBtn} ${activeMode === mode ? styles.activeMode : ''}`}
                            onClick={() => setActiveMode(mode)}
                        >
                            {mode}
                        </button>
                    ))}
                </div>

                <div className={styles.cardContainer}>
                    {currentPlayer ? (
                        <div className={`${styles.playerCard} fade-in`} key={currentPlayer.id}>
                            <div className={styles.cardImage}>
                                <img src={currentPlayer.avatar} alt={currentPlayer.username} />
                                <div className={styles.rankBadge}>{currentPlayer.rank}</div>
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.cardHeader}>
                                    <h3>{currentPlayer.username}</h3>
                                    <div className={styles.repBadge}><Star size={14} /> {currentPlayer.reputation}%</div>
                                </div>
                                <p className={styles.bio}>{currentPlayer.bio}</p>
                                <div className={styles.tags}>
                                    <span className={styles.tag}>{currentPlayer.favoriteGame}</span>
                                    {currentPlayer.micRequired && <span className={styles.tag}><Mic size={12} /> Mic</span>}
                                    {currentPlayer.localArea && <span className={styles.tag}><Globe size={12} /> Local</span>}
                                </div>
                            </div>
                            <div className={styles.cardActions}>
                                <button className={styles.passBtn} onClick={() => handlePass(currentPlayer.id)}><X size={28} /></button>
                                <button className={styles.matchBtn} onClick={() => handleMatch(currentPlayer.id)}><Heart size={28} /></button>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.noPlayers}>No more players in your area.</div>
                    )}
                </div>

                <button className={styles.filterToggle} onClick={() => setShowFilters(true)}>
                    <Filter size={20} /> FILTERS
                </button>
            </div>

            <aside className={`${styles.matchesList} desktop-only`}>
                <h2 className={styles.sectionTitle}>Matches</h2>
                <div className={styles.matchesScroll}>
                    {matchedPlayers.map(player => (
                        <div key={player.id} className={styles.matchItem} onClick={() => setShowChat(player.id)}>
                            <img src={player.avatar} alt={player.username} className={styles.matchAvatar} />
                            <div className={styles.matchInfo}>
                                <div className={styles.matchName}>{player.username}</div>
                                <div className={styles.matchSub}>Click to message</div>
                            </div>
                            <MessageSquare size={18} className={styles.msgIcon} />
                        </div>
                    ))}
                </div>
            </aside>

            {/* Filter Drawer/Panel */}
            {showFilters && (
                <div className={styles.filterOverlay} onClick={() => setShowFilters(false)}>
                    <div className={styles.filterPanel} onClick={e => e.stopPropagation()}>
                        <div className={styles.filterHeader}>
                            <h2>FILTERS</h2>
                            <X onClick={() => setShowFilters(false)} />
                        </div>
                        <div className={styles.filterBody}>
                            <div className={styles.filterGroup}>
                                <label>Min Reputation: {minRep}%</label>
                                <input type="range" min="0" max="100" value={minRep} onChange={e => setMinRep(parseInt(e.target.value))} />
                            </div>
                            <div className={styles.filterToggleGroup}>
                                <label className={styles.toggleRow}>
                                    <span>Mic Required</span>
                                    <input type="checkbox" checked={micRequired} onChange={e => setMicRequired(e.target.checked)} />
                                </label>
                                <label className={styles.toggleRow}>
                                    <span>Local Area Only</span>
                                    <input type="checkbox" checked={localOnly} onChange={e => setLocalOnly(e.target.checked)} />
                                </label>
                            </div>
                        </div>
                        <button className={styles.applyBtn} onClick={() => setShowFilters(false)}>APPLY FILTERS</button>
                    </div>
                </div>
            )}

            {/* Chat Modal */}
            {showChat && (
                <div className={styles.chatOverlay} onClick={() => setShowChat(null)}>
                    <div className={styles.chatModal} onClick={e => e.stopPropagation()}>
                        <div className={styles.chatHeader}>
                            <div className={styles.chatUser}>
                                <img src={hardcodedPlayers.find(p => p.id === showChat)?.avatar} alt="avatar" />
                                <span>{hardcodedPlayers.find(p => p.id === showChat)?.username}</span>
                            </div>
                            <X onClick={() => setShowChat(null)} />
                        </div>
                        <div className={styles.chatBody}>
                            {allMessages.filter(m => m.receiverId === showChat || m.senderId === showChat).map(msg => (
                                <div key={msg.id} className={`${styles.msgBubble} ${msg.senderId === 'me' ? styles.msgMe : styles.msgThem}`}>
                                    {msg.text}
                                    <div className={styles.msgTime}>{msg.timestamp}</div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.chatFooter}>
                            <input
                                placeholder="Type a message..."
                                value={chatMessage}
                                onChange={e => setChatMessage(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                            />
                            <button onClick={sendMessage}><MessageSquare size={20} /></button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
