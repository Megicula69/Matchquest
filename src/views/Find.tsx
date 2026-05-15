import React, { useState } from 'react';
import styles from './Find.module.css';
import { useMatchmaking } from '../hooks/useMatchmaking';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Player, Message } from '../types';
import { compPlayers, duoPlayers, players } from '../data/players';
import { duoPairs as hardcodedDuoPairs } from '../data/duoPairs';
import { X, Heart, Filter, MessageSquare, Mic, Globe, Star } from 'lucide-react';

export const FindPage: React.FC = () => {
    const { activeMode, setActiveMode, currentPlayer, currentDuoPair, handleMatch, handlePass, handleMatchDuo, handlePassDuo, matches } = useMatchmaking();
    const [showFilters, setShowFilters] = useState(false);
    const [showChat, setShowChat] = useState<string | null>(null);
    const [chatMessage, setChatMessage] = useState('');
    const [allMessages, setAllMessages] = useLocalStorage<Message[]>('mq_messages', []);
    const [viewingDetails, setViewingDetails] = useState<Player | null>(null);
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

    // Get matched COMP players
    const compMatches = compPlayers.filter(p => matches.includes(p.id));
    
    // Get matched DUO players (extract players from matched duo pairs)
    const duoMatches = hardcodedDuoPairs
        .filter(duo => matches.includes(duo.id))
        .flatMap(duo => [duo.player1, duo.player2]);
    
    // Combine all matched players
    const matchedPlayers = [...compMatches, ...duoMatches];

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
                                                {filteredCurrentDuoPair.player1.micRequired && <span className={styles.tag}><Mic size={12} /> Mic</span>}
                                                {filteredCurrentDuoPair.player1.localArea && <span className={styles.tag}><Globe size={12} /> Local</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.vsDivider}>VS</div>
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
                                                {filteredCurrentDuoPair.player2.micRequired && <span className={styles.tag}><Mic size={12} /> Mic</span>}
                                                {filteredCurrentDuoPair.player2.localArea && <span className={styles.tag}><Globe size={12} /> Local</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.cardActions}>
                                    <button className={styles.passBtn} onClick={() => handleFilteredPassDuo()}><X size={28} /></button>
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
                    {matchedPlayers.map(player => (
                        <div key={player.id} className={`${styles.matchItem} ${showChat === player.id ? styles.activeMatch : ''}`} onClick={() => setShowChat(player.id === showChat ? null : player.id)}>
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

            {/* Chat Drawer */}
            <div className={`${styles.chatDrawer} ${showChat ? styles.drawerOpen : ''}`}>
                {showChat ? (
                    <>
                        <div className={styles.chatHeader}>
                            <div className={styles.chatUser}>
                                <img src={players.find(p => p.id === showChat)?.avatar} alt="avatar" />
                                <span>{players.find(p => p.id === showChat)?.username}</span>
                            </div>
                            <X className={styles.closeChat} onClick={() => setShowChat(null)} />
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
                    </>
                ) : (
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
        </div>
    );
};
