import React, { useState } from 'react';
import styles from './Find.module.css';
import { useMatchmaking } from '../hooks/useMatchmaking';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Player, Message, DuoPair } from '../types';
import { compPlayers, players } from '../data/players';
import { duoPairs as hardcodedDuoPairs } from '../data/duoPairs';
import { X, Heart, Filter, MessageSquare, Mic, Globe, Star, History } from 'lucide-react';

export const FindPage: React.FC = () => {
    const { activeMode, setActiveMode, currentPlayer, currentDuoPair, handleMatch, handlePass, handleMatchDuo, handlePassDuo, matches } = useMatchmaking();
    const [showFilters, setShowFilters] = useState(false);
    const [showChat, setShowChat] = useState<string | null>(null);
    const [chatMessage, setChatMessage] = useState('');
    const [allMessages, setAllMessages] = useLocalStorage<Message[]>('mq_messages', []);
    const [viewingDetails, setViewingDetails] = useState<Player | null>(null);
    const [viewingDuoSynergy, setViewingDuoSynergy] = useState<DuoPair | null>(null);
    const [filteredIndex, setFilteredIndex] = useState(0);

    // Filter states
    const [micRequired, setMicRequired] = useState(false);
    const [localOnly, setLocalOnly] = useState(false);
    const [minRep, setMinRep] = useState(0);
    const [ageRange, setAgeRange] = useState({ min: 15, max: 25 });

    // Filter function for COMP mode
    const getFilteredCompPlayer = (player: Player): boolean => {
        if (micRequired && !player.micRequired) return false;
        if (localOnly && !player.localArea) return false;
        if (player.reputation < minRep) return false;
        if (player.age && (player.age < ageRange.min || player.age > ageRange.max)) return false;
        return true;
    };

    // Filter function for DUO mode
    const getFilteredDuoPair = (pair: any): boolean => {
        return getFilteredCompPlayer(pair.player1) && getFilteredCompPlayer(pair.player2);
    };

    // Get filtered players
    const filteredCompPlayers = compPlayers.filter(getFilteredCompPlayer);
    const filteredDuoPairs = hardcodedDuoPairs.filter(getFilteredDuoPair);

    // Get current filtered player/duo based on index
    const filteredCurrentPlayer = filteredCompPlayers.length > 0 ? filteredCompPlayers[filteredIndex % filteredCompPlayers.length] : null;
    const filteredCurrentDuoPair = filteredDuoPairs.length > 0 ? filteredDuoPairs[filteredIndex % filteredDuoPairs.length] : null;

    // Get matched individuals (from the full players list)
    const matchedIndividuals = players.filter(p => matches.includes(p.id));
    
    // Get matched DUO pairs as entities
    const matchedDuoPairs = hardcodedDuoPairs.filter(duo => matches.includes(duo.id));
    
    // Create unified entities list for the sidebar
    const matchedEntities = [
        ...matchedIndividuals.map(p => ({ type: 'PLAYER' as const, data: p, id: p.id })),
        ...matchedDuoPairs.map(d => ({ type: 'DUO' as const, data: d, id: d.id }))
    ];

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

    // Handler for pass/match actions on filtered players
    const handleFilteredPass = () => {
        setFilteredIndex(prev => prev + 1);
    };

    const handleFilteredMatch = (playerId: string) => {
        handleMatch(playerId);
        setFilteredIndex(prev => prev + 1);
    };

    const handleFilteredPassDuo = () => {
        setFilteredIndex(prev => prev + 1);
    };

    const handleFilteredMatchDuo = (pairId: string) => {
        handleMatchDuo(pairId);
        setFilteredIndex(prev => prev + 1);
    };

    return (
        <div className={styles.container}>
            <div className={styles.mainArea}>
                <div className={styles.modeToggle}>
                    {(['COMP', 'DUO'] as const).map(mode => (
                        <button
                            key={mode}
                            className={`${styles.modeBtn} ${activeMode === mode ? styles.activeMode : ''}`}
                            onClick={() => setActiveMode(mode)}
                        >
                            {mode}
                        </button>
                    ))}
                </div>

                <div className={`${styles.cardContainer} ${activeMode === 'DUO' ? styles.duoMode : ''}`}>
                    {activeMode === 'DUO' ? (
                        filteredCurrentDuoPair ? (
                            <div className={`${styles.duoPairContainer} fade-in`} key={filteredCurrentDuoPair.id}>
                                <div className={styles.duoCards}>
                                    <div className={styles.playerCard}>
                                        <div className={styles.cardImage}>
                                            <img src={filteredCurrentDuoPair.player1.avatar} alt={filteredCurrentDuoPair.player1.username} />
                                            <div className={styles.rankBadge}>{filteredCurrentDuoPair.player1.rank}</div>
                                        </div>
                                        <div className={styles.cardContent}>
                                            <div className={styles.cardHeader}>
                                                <h3>{filteredCurrentDuoPair.player1.username}</h3>
                                                <div className={styles.repBadge}><Star size={14} /> {filteredCurrentDuoPair.player1.reputation}%</div>
                                            </div>
                                            <p className={styles.bio}>{filteredCurrentDuoPair.player1.bio}</p>
                                            <div className={styles.tags}>
                                                <span className={styles.tag}>{filteredCurrentDuoPair.player1.favoriteGame}</span>
                                            </div>
                                            <button className={styles.duoViewProfileBtn} onClick={() => setViewingDetails(filteredCurrentDuoPair.player1)}>VIEW PROFILE</button>
                                        </div>
                                    </div>
                                    <div className={styles.vsDivider} onClick={() => setViewingDuoSynergy(filteredCurrentDuoPair)} style={{ cursor: 'pointer' }}>
                                        <span>AND</span>
                                    </div>
                                    <div className={styles.playerCard}>
                                        <div className={styles.cardImage}>
                                            <img src={filteredCurrentDuoPair.player2.avatar} alt={filteredCurrentDuoPair.player2.username} />
                                            <div className={styles.rankBadge}>{filteredCurrentDuoPair.player2.rank}</div>
                                        </div>
                                        <div className={styles.cardContent}>
                                            <div className={styles.cardHeader}>
                                                <h3>{filteredCurrentDuoPair.player2.username}</h3>
                                                <div className={styles.repBadge}><Star size={14} /> {filteredCurrentDuoPair.player2.reputation}%</div>
                                            </div>
                                            <p className={styles.bio}>{filteredCurrentDuoPair.player2.bio}</p>
                                            <div className={styles.tags}>
                                                <span className={styles.tag}>{filteredCurrentDuoPair.player2.favoriteGame}</span>
                                            </div>
                                            <button className={styles.duoViewProfileBtn} onClick={() => setViewingDetails(filteredCurrentDuoPair.player2)}>VIEW PROFILE</button>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.cardActions}>
                                    <button className={styles.passBtn} onClick={() => handleFilteredPassDuo()}><X size={28} /></button>
                                    <button className={styles.viewHistoryBtn} onClick={() => setViewingDuoSynergy(filteredCurrentDuoPair)}>
                                        <History size={18} /> VIEW HISTORY
                                    </button>
                                    <button className={styles.matchBtn} onClick={() => handleFilteredMatchDuo(filteredCurrentDuoPair.id)}><Heart size={28} /></button>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.noPlayers}>No duo pairs match your filters. Try adjusting your criteria.</div>
                        )
                    ) : (
                        filteredCurrentPlayer ? (
                            <div className={`${styles.playerCard} fade-in`} key={filteredCurrentPlayer.id}>
                                <div className={styles.cardImage}>
                                    <img src={filteredCurrentPlayer.avatar} alt={filteredCurrentPlayer.username} />
                                    <div className={styles.rankBadge}>{filteredCurrentPlayer.rank}</div>
                                </div>
                                <div className={styles.cardContent}>
                                    <div className={styles.cardHeader}>
                                        <h3>{filteredCurrentPlayer.username}</h3>
                                        <div className={styles.repBadge}><Star size={14} /> {filteredCurrentPlayer.reputation}%</div>
                                    </div>
                                    <p className={styles.bio}>{filteredCurrentPlayer.bio}</p>
                                    <div className={styles.tags}>
                                        <span className={styles.tag}>{filteredCurrentPlayer.favoriteGame}</span>
                                        {filteredCurrentPlayer.micRequired && <span className={styles.tag}><Mic size={12} /> Mic</span>}
                                        {filteredCurrentPlayer.localArea && <span className={styles.tag}><Globe size={12} /> Local</span>}
                                    </div>
                                </div>
                                <div className={styles.cardActions}>
                                    <button className={styles.passBtn} onClick={() => handleFilteredPass()}><X size={28} /></button>
                                    <button className={styles.viewDetailsBtn} onClick={() => setViewingDetails(filteredCurrentPlayer)}>VIEW DETAILS</button>
                                    <button className={styles.matchBtn} onClick={() => handleFilteredMatch(filteredCurrentPlayer.id)}><Heart size={28} /></button>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.noPlayers}>No players match your filters. Try adjusting your criteria.</div>
                        )
                    )}
                </div>

                <button className={styles.filterToggle} onClick={() => setShowFilters(true)}>
                    <Filter size={20} /> FILTERS
                </button>
            </div>

            <aside className={`${styles.matchesList} ${showChat ? styles.matchesHidden : ''} desktop-only`}>
                <h2 className={styles.sectionTitle}>Matches</h2>
                <div className={styles.matchesScroll}>
                    {matchedEntities.map(entity => (
                        <div 
                            key={entity.id} 
                            className={`${styles.matchItem} ${showChat === entity.id ? styles.activeMatch : ''}`} 
                            onClick={() => setShowChat(entity.id === showChat ? null : entity.id)}
                        >
                            {entity.type === 'PLAYER' ? (
                                <>
                                    <img src={entity.data.avatar} alt={entity.data.username} className={styles.matchAvatar} />
                                    <div className={styles.matchInfo}>
                                        <div className={styles.matchName}>{entity.data.username}</div>
                                        <div className={styles.matchSub}>Click to message</div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className={styles.duoAvatarContainer}>
                                        <img src={entity.data.player1.avatar} className={styles.matchAvatarDuo1} alt="p1" />
                                        <img src={entity.data.player2.avatar} className={styles.matchAvatarDuo2} alt="p2" />
                                    </div>
                                    <div className={styles.matchInfo}>
                                        <div className={styles.matchName}>{entity.data.player1.username} & {entity.data.player2.username}</div>
                                        <div className={styles.matchSub}>Group Chat</div>
                                    </div>
                                </>
                            )}
                            <MessageSquare size={18} className={styles.msgIcon} />
                        </div>
                    ))}
                </div>
            </aside>

            {/* Chat Drawer */}
            <div className={`${styles.chatDrawer} ${showChat ? styles.drawerOpen : ''}`}>
                {showChat ? (() => {
                    const duoMatch = hardcodedDuoPairs.find(d => d.id === showChat);
                    const playerMatch = players.find(p => p.id === showChat);
                    
                    return (
                        <>
                            <div className={styles.chatHeader}>
                                {duoMatch ? (
                                    <div className={styles.chatUser}>
                                        <div className={styles.headerAvatars}>
                                            <img src={duoMatch.player1.avatar} alt="p1" />
                                            <img src={duoMatch.player2.avatar} alt="p2" />
                                        </div>
                                        <div className={styles.headerInfo}>
                                            <span>{duoMatch.player1.username} & {duoMatch.player2.username}</span>
                                            <div className={styles.groupBadge}>GROUP CHAT</div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={styles.chatUser}>
                                        <img src={playerMatch?.avatar} alt="avatar" />
                                        <span>{playerMatch?.username}</span>
                                    </div>
                                )}
                                <X className={styles.closeChat} onClick={() => setShowChat(null)} />
                            </div>
                            <div className={styles.chatBody}>
                                {allMessages.filter(m => m.receiverId === showChat || m.senderId === showChat).map(msg => {
                                    const isMe = msg.senderId === 'me';
                                    let senderAvatar = '';
                                    if (isMe) {
                                        senderAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'; // Mock user avatar
                                    } else if (duoMatch) {
                                        // Randomly assign p1 or p2 for mock messages in group chat
                                        senderAvatar = parseInt(msg.id) % 2 === 0 ? duoMatch.player1.avatar : duoMatch.player2.avatar;
                                    } else {
                                        senderAvatar = playerMatch?.avatar || '';
                                    }

                                    return (
                                        <div key={msg.id} className={`${styles.msgWrapper} ${isMe ? styles.msgWrapperMe : styles.msgWrapperThem}`}>
                                            {!isMe && <img src={senderAvatar} alt="avatar" className={styles.msgAvatar} />}
                                            <div className={`${styles.msgBubble} ${isMe ? styles.msgMe : styles.msgThem}`}>
                                                {msg.text}
                                                <div className={styles.msgTime}>{msg.timestamp}</div>
                                            </div>
                                            {isMe && <img src={senderAvatar} alt="avatar" className={styles.msgAvatar} />}
                                        </div>
                                    );
                                })}
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
                        </>
                    );
                })() : (
                    <div className={styles.drawerPlaceholder}>
                        <MessageSquare size={40} opacity={0.2} />
                        <p>Select a match to start chatting</p>
                    </div>
                )}
            </div>


            {/* Filter Drawer/Panel */}
            {showFilters && (
                <div className={styles.filterOverlay} onClick={() => setShowFilters(false)}>
                    <div className={styles.filterPanel} onClick={e => e.stopPropagation()}>
                        <div className={styles.filterHeader}>
                            <h2>FILTERS</h2>
                            <X onClick={() => setShowFilters(false)} style={{ cursor: 'pointer' }} />
                        </div>
                        <div className={styles.filterBody}>
                            <div className={styles.filterGroup}>
                                <label>Age Range: {ageRange.min} - {ageRange.max}</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input 
                                        type="range" 
                                        min="15" 
                                        max="30" 
                                        value={ageRange.min} 
                                        onChange={e => setAgeRange({ ...ageRange, min: parseInt(e.target.value) })} 
                                    />
                                    <input 
                                        type="range" 
                                        min="15" 
                                        max="30" 
                                        value={ageRange.max} 
                                        onChange={e => setAgeRange({ ...ageRange, max: parseInt(e.target.value) })} 
                                    />
                                </div>
                            </div>
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
            {/* Player Details Modal */}
            {viewingDetails && (
                <div className={styles.detailsOverlay} onClick={() => setViewingDetails(null)}>
                    <div className={styles.detailsModal} onClick={e => e.stopPropagation()}>
                        <div className={styles.detailsHeader}>
                            <img src={viewingDetails.avatar} alt={viewingDetails.username} className={styles.detailsAvatar} />
                            <div className={styles.detailsHeaderInfo}>
                                <h2>{viewingDetails.username}</h2>
                                <span className={styles.detailsRank}>{viewingDetails.rank}</span>
                            </div>
                            <X className={styles.closeDetails} onClick={() => setViewingDetails(null)} />
                        </div>
                        <div className={styles.detailsBody}>
                            <div className={styles.detailsSection}>
                                <h3>ABOUT</h3>
                                <p>{viewingDetails.bio}</p>
                            </div>
                            <div className={styles.detailsSection}>
                                <h3>GAMING PROFILE</h3>
                                <div className={styles.detailsGrid}>
                                    <div className={styles.detailItem}>
                                        <span className={styles.detailLabel}>Favorite Game</span>
                                        <span className={styles.detailValue}>{viewingDetails.favoriteGame}</span>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <span className={styles.detailLabel}>Reputation</span>
                                        <span className={styles.detailValue}>{viewingDetails.reputation}%</span>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <span className={styles.detailLabel}>Region</span>
                                        <span className={styles.detailValue}>{viewingDetails.localArea ? 'Local Campus' : 'Global'}</span>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <span className={styles.detailLabel}>Age</span>
                                        <span className={styles.detailValue}>{viewingDetails.age || 'N/A'}</span>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <span className={styles.detailLabel}>Communication</span>
                                        <span className={styles.detailValue}>{viewingDetails.micRequired ? 'Mic Required' : 'Text Only'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.detailsSection}>
                                <h3>PLAYSTYLE TAGS</h3>
                                <div className={styles.tags}>
                                    <span className={styles.tag}>Competitive</span>
                                    <span className={styles.tag}>Daily Player</span>
                                    <span className={styles.tag}>No Toxic</span>
                                    <span className={styles.tag}>Team Player</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Duo Synergy Modal */}
            {viewingDuoSynergy && (
                <div className={styles.detailsOverlay} onClick={() => setViewingDuoSynergy(null)}>
                    <div className={`${styles.detailsModal} ${styles.synergyModal}`} onClick={e => e.stopPropagation()}>
                        <div className={styles.synergyHeader}>
                            <div className={styles.synergyAvatars}>
                                <img src={viewingDuoSynergy.player1.avatar} alt="p1" className={styles.synergyAvatar} />
                                <div className={styles.synergyLink}>
                                    <Heart size={24} color="var(--cyan)" fill="var(--cyan)" />
                                </div>
                                <img src={viewingDuoSynergy.player2.avatar} alt="p2" className={styles.synergyAvatar} />
                            </div>
                            <h2>{viewingDuoSynergy.player1.username} & {viewingDuoSynergy.player2.username}</h2>
                            <div className={styles.synergyScore}>
                                <Star size={16} /> SYNERGY SCORE: {viewingDuoSynergy.synergyScore}%
                            </div>
                            <X className={styles.closeDetails} onClick={() => setViewingDuoSynergy(null)} />
                        </div>
                        <div className={styles.detailsBody}>
                            <div className={styles.synergyGrid}>
                                <div className={styles.synergyStatCard}>
                                    <span className={styles.statLabel}>WIN RATE</span>
                                    <span className={styles.statValue}>{viewingDuoSynergy.winRate}</span>
                                </div>
                                <div className={styles.synergyStatCard}>
                                    <span className={styles.statLabel}>MATCHES TOGETHER</span>
                                    <span className={styles.statValue}>{viewingDuoSynergy.matchesTogether}</span>
                                </div>
                                <div className={styles.synergyStatCard}>
                                    <span className={styles.statLabel}>STREAK</span>
                                    <span className={styles.statValue}>12 WINS</span>
                                </div>
                                <div className={styles.synergyStatCard}>
                                    <span className={styles.statLabel}>LEVEL</span>
                                    <span className={styles.statValue}>GODLIKE</span>
                                </div>
                            </div>

                            <div className={styles.detailsSection}>
                                <h3>DUO PLAYSTYLE</h3>
                                <div className={styles.tags}>
                                    <span className={styles.tag}>In-Sync Ults</span>
                                    <span className={styles.tag}>Perfect Comms</span>
                                    <span className={styles.tag}>Aggressive Early</span>
                                    <span className={styles.tag}>Map Control</span>
                                </div>
                            </div>

                            <div className={styles.detailsSection}>
                                <h3>RECENT MATCHES</h3>
                                <div className={styles.recentMatches}>
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className={styles.recentMatchItem}>
                                            <div className={styles.matchResult}>VICTORY</div>
                                            <div className={styles.matchMode}>Competitive Rank</div>
                                            <div className={styles.matchScore}>13 - 4</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
