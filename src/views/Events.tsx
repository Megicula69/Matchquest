import React, { useState } from 'react';
import styles from './Events.module.css';
import { useCampusEvents } from '../hooks/useCampusEvents';
import { useTournament } from '../hooks/useTournament';
import { useAuth } from '../context/AuthContext';
import { useTeam } from '../hooks/useTeam';
import { TournamentEvent, BracketMatch } from '../types';
import { Calendar, Clock, Trophy, Users, X, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const EventsPage: React.FC = () => {
    const [campusEvents] = useCampusEvents();
    const { bracket, registrations, registerTeam, updateMatchScore } = useTournament();
    const { user, hasRegisteredTeam, getUserRegisteredTeamName } = useAuth();
    const { team: existingTeam } = useTeam();
    const [selectedEvent, setSelectedEvent] = useState<TournamentEvent | null>(null);
    const [regStep, setRegStep] = useState(1);
    const [teamInfo, setTeamInfo] = useState({ name: '', roster: ['', '', '', '', ''] });
    const [modalView, setModalView] = useState<'DETAIL' | 'BRACKET'>('DETAIL');
    const [bracketModalOpen, setBracketModalOpen] = useState(false);
    const [registrationError, setRegistrationError] = useState<string | null>(null);
    const canRegisterForGames = Boolean(user && hasRegisteredTeam(user.username));
    const userRegisteredTeamName = user ? getUserRegisteredTeamName(user.username) : null;

    // Auto-fill team name and roster if user already has one registered
    React.useEffect(() => {
        if (existingTeam && !teamInfo.name) {
            const roster = [...(existingTeam.roster || [])];
            // Pad roster to 5 if needed
            while (roster.length < 5) roster.push('');
            
            setTeamInfo({
                name: existingTeam.teamName,
                roster: roster.slice(0, 5)
            });
        }
    }, [existingTeam, teamInfo.name]);

    const handleRegister = () => {
        if (!selectedEvent) {
            return;
        }

        if (!canRegisterForGames) {
            setRegistrationError('You must register a team before joining any games.');
            return;
        }

        if (selectedEvent) {
            registerTeam({ teamName: teamInfo.name, roster: teamInfo.roster, eventId: selectedEvent.id });
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#00c9e0', '#9b6dff', '#f0a500']
            });
            setRegStep(4); // Success step
        }
    };

    const closeModals = () => {
        setSelectedEvent(null);
        setRegStep(1);
        setTeamInfo({ name: '', roster: ['', '', '', '', ''] });
        setModalView('DETAIL');
        setBracketModalOpen(false);
        setRegistrationError(null);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>TOURNEY ARENA</h1>
            </header>

            {(
                <div className={`${styles.eventList} fade-in`}>
                    {campusEvents.map(event => (
                        <div key={event.id} className={styles.eventCard} onClick={() => setSelectedEvent(event)}>
                            <div className={styles.eventImg}>
                                <img src={event.image} alt={event.title} />
                                <div className={`${styles.statusBadge} ${styles[event.status]}`}>{event.status}</div>
                            </div>
                            <div className={styles.eventContent}>
                                <div className={styles.eventGame}>{event.game}</div>
                                <h3 className={styles.eventTitle}>{event.title}</h3>
                                <div className={styles.eventMeta}>
                                    <span><Calendar size={14} /> {event.date}</span>
                                    <span><Trophy size={14} /> {event.prizePool}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Detail & Registration Modal */}
            {selectedEvent && (
                <div className={styles.overlay} onClick={closeModals}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <img src={selectedEvent.image} alt="header" className={styles.headerImage} />
                            <button className={styles.closeBtn} onClick={closeModals}><X /></button>
                        </div>

                        <div className={styles.modalBody}>
                            {modalView === 'DETAIL' && (
                                <>
                                    {regStep === 1 && (
                                        <div className="fade-in">
                                            <h2 className={styles.modalTitle}>{selectedEvent.title}</h2>
                                            <div className={styles.modalMeta}>
                                                <span><Calendar /> {selectedEvent.date} @ {selectedEvent.time}</span>
                                                <span><Users /> {selectedEvent.participants}/{selectedEvent.maxParticipants} Registered</span>
                                            </div>
                                            <p className={styles.modalDesc}>{selectedEvent.description}</p>

                                            {!canRegisterForGames && (
                                                <div className={styles.registerNotice}>
                                                    <Users size={16} />
                                                    <span>Create and register your team first before you can join games.</span>
                                                </div>
                                            )}

                                            {registrationError && (
                                                <div className={styles.errorAlert}>
                                                    <AlertCircle size={16} />
                                                    <span>{registrationError}</span>
                                                </div>
                                            )}

                                            <div className={styles.modalActions}>
                                                {userRegisteredTeamName && registrations.some(registration => registration.eventId === selectedEvent.id && registration.teamName.toLowerCase() === userRegisteredTeamName.toLowerCase()) ? (
                                                    <div className={styles.registeredStatus}>
                                                        <CheckCircle /> YOU ARE REGISTERED
                                                    </div>
                                                ) : (
                                                    <button
                                                        className={styles.primaryBtn}
                                                        onClick={() => setRegStep(2)}
                                                        disabled={!canRegisterForGames}
                                                    >
                                                        REGISTER TEAM
                                                    </button>
                                                )}

                                                <button className={styles.secondaryBtn} onClick={() => setBracketModalOpen(true)}>VIEW BRACKET</button>
                                            </div>
                                        </div>
                                    )}

                                    {regStep === 2 && (
                                        <div className="fade-in">
                                            <h3 className={styles.stepTitle}>Step 1: Team Identity</h3>
                                            <div className={styles.inputGroup}>
                                                <label>TEAM NAME</label>
                                                <input
                                                    placeholder="Enter team name..."
                                                    value={teamInfo.name}
                                                    onChange={(e) => setTeamInfo({ ...teamInfo, name: e.target.value })}
                                                />
                                            </div>
                                            <button className={styles.primaryBtn} disabled={!teamInfo.name} onClick={() => setRegStep(3)}>CONTINUE</button>
                                        </div>
                                    )}

                                    {regStep === 3 && (
                                        <div className="fade-in">
                                            <h3 className={styles.stepTitle}>Step 2: Roster Selection</h3>
                                            <div className={styles.rosterGrid}>
                                                {teamInfo.roster.map((p, i) => (
                                                    <div key={i} className={styles.inputGroup}>
                                                        <label>PLAYER {i + 1}</label>
                                                        <input
                                                            placeholder="Summoner Name"
                                                            value={p}
                                                            onChange={(e) => {
                                                                const newRoster = [...teamInfo.roster];
                                                                newRoster[i] = e.target.value;
                                                                setTeamInfo({ ...teamInfo, roster: newRoster });
                                                            }}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                            <button className={styles.primaryBtn} onClick={handleRegister}>CONFIRM REGISTRATION</button>
                                        </div>
                                    )}

                                    {regStep === 4 && (
                                        <div className={`${styles.successStep} fade-in`}>
                                            <CheckCircle size={64} color="var(--cyan)" />
                                            <h2>REGISTRATION COMPLETE</h2>
                                            <p>Good luck in the arena, {teamInfo.name}!</p>
                                            <button className={styles.primaryBtn} onClick={closeModals}>BACK TO EVENTS</button>
                                        </div>
                                    )}
                                </>
                            )}

                            {modalView === 'BRACKET' && selectedEvent && (
                                <div className={`${styles.bracketView} fade-in`}>
                                    <div className={styles.bracketHeader}>
                                        <h3>{selectedEvent.title} — Bracket</h3>
                                        <div>
                                            <button className={styles.secondaryBtn} onClick={() => setModalView('DETAIL')}>BACK</button>
                                        </div>
                                    </div>

                                    <div className={styles.bracketContainer}>
                                        {[1, 2, 3].map(round => (
                                            <div key={round} className={styles.round}>
                                                <h4 className={styles.roundTitle}>{round === 1 ? 'Quarter-Finals' : round === 2 ? 'Semi-Finals' : 'Grand Finals'}</h4>
                                                <div className={styles.matches}>
                                                    {bracket.filter(m => m.round === round && m.eventId === selectedEvent.id).map((match, idx) => {
                                                        const isFinished = match.winner !== undefined;
                                                        const isLive = !isFinished && match.team1 !== 'TBD' && match.team2 !== 'TBD';
                                                        
                                                        return (
                                                            <div key={match.id} className={styles.matchWrapper}>
                                                                <div className={styles.match}>
                                                                    <div className={styles.matchHeader}>
                                                                        <span className={styles.matchId}>M-{match.id}</span>
                                                                        <span className={`${styles.matchStatusBadge} ${isLive ? styles.statusLive : isFinished ? styles.statusFinished : styles.statusUpcoming}`}>
                                                                            {isLive ? 'LIVE' : isFinished ? 'FINAL' : 'UPCOMING'}
                                                                        </span>
                                                                    </div>
                                                                    <div className={`${styles.team} ${match.winner === match.team1 && match.team1 !== 'TBD' ? styles.winner : ''}`}>
                                                                        <div className={styles.teamInfo}>
                                                                            <img 
                                                                                src={`https://api.dicebear.com/7.x/identicon/svg?seed=${match.team1}`} 
                                                                                className={styles.teamAvatar} 
                                                                                alt="" 
                                                                            />
                                                                            <span className={`${styles.teamName} ${match.team1 === 'TBD' ? styles.tbd : ''}`}>
                                                                                {match.team1}
                                                                            </span>
                                                                        </div>
                                                                        <span className={styles.score}>{match.score1 ?? '-'}</span>
                                                                    </div>
                                                                    <div className={`${styles.team} ${match.winner === match.team2 && match.team2 !== 'TBD' ? styles.winner : ''}`}>
                                                                        <div className={styles.teamInfo}>
                                                                            <img 
                                                                                src={`https://api.dicebear.com/7.x/identicon/svg?seed=${match.team2}`} 
                                                                                className={styles.teamAvatar} 
                                                                                alt="" 
                                                                            />
                                                                            <span className={`${styles.teamName} ${match.team2 === 'TBD' ? styles.tbd : ''}`}>
                                                                                {match.team2}
                                                                            </span>
                                                                        </div>
                                                                        <span className={styles.score}>{match.score2 ?? '-'}</span>
                                                                    </div>
                                                                </div>
                                                                {round < 3 && (
                                                                    <div className={`${styles.connector} ${idx % 2 === 0 ? styles.top : styles.bottom} ${match.winner ? styles.active : ''}`}>
                                                                        <div className={styles.line} />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {bracketModalOpen && selectedEvent && (
                                <div className={styles.overlay} onClick={() => setBracketModalOpen(false)}>
                                    <div className={`${styles.bracketModal}`} onClick={e => e.stopPropagation()}>
                                        <button className={styles.closeBtn} onClick={() => { setBracketModalOpen(false); setModalView('DETAIL'); }}>BACK</button>
                                        <div className={styles.bracketHeader}>
                                                <h3>{selectedEvent.title} — Full Bracket</h3>
                                        </div>

                                        <div className={styles.bracketContainer}>
                                            {[1, 2, 3].map(round => (
                                                <div key={round} className={styles.round}>
                                                    <h4 className={styles.roundTitle}>{round === 1 ? 'Quarter-Finals' : round === 2 ? 'Semi-Finals' : 'Grand Finals'}</h4>
                                                    <div className={styles.matches}>
                                                    {bracket.filter(m => m.round === round && m.eventId === selectedEvent.id).map((match, idx) => {
                                                        const isFinished = match.winner !== undefined;
                                                        const isLive = !isFinished && match.team1 !== 'TBD' && match.team2 !== 'TBD';
                                                        
                                                        return (
                                                            <div key={match.id} className={styles.matchWrapper}>
                                                                <div className={styles.match}>
                                                                    <div className={styles.matchHeader}>
                                                                        <span className={styles.matchId}>M-{match.id}</span>
                                                                        <span className={`${styles.matchStatusBadge} ${isLive ? styles.statusLive : isFinished ? styles.statusFinished : styles.statusUpcoming}`}>
                                                                            {isLive ? 'LIVE' : isFinished ? 'FINAL' : 'UPCOMING'}
                                                                        </span>
                                                                    </div>
                                                                    <div className={`${styles.team} ${match.winner === match.team1 && match.team1 !== 'TBD' ? styles.winner : ''}`}>
                                                                        <div className={styles.teamInfo}>
                                                                            <img 
                                                                                src={`https://api.dicebear.com/7.x/identicon/svg?seed=${match.team1}`} 
                                                                                className={styles.teamAvatar} 
                                                                                alt="" 
                                                                            />
                                                                            <span className={`${styles.teamName} ${match.team1 === 'TBD' ? styles.tbd : ''}`}>
                                                                                {match.team1}
                                                                            </span>
                                                                        </div>
                                                                        <span className={styles.score}>{match.score1 ?? '-'}</span>
                                                                    </div>
                                                                    <div className={`${styles.team} ${match.winner === match.team2 && match.team2 !== 'TBD' ? styles.winner : ''}`}>
                                                                        <div className={styles.teamInfo}>
                                                                            <img 
                                                                                src={`https://api.dicebear.com/7.x/identicon/svg?seed=${match.team2}`} 
                                                                                className={styles.teamAvatar} 
                                                                                alt="" 
                                                                            />
                                                                            <span className={`${styles.teamName} ${match.team2 === 'TBD' ? styles.tbd : ''}`}>
                                                                                {match.team2}
                                                                            </span>
                                                                        </div>
                                                                        <span className={styles.score}>{match.score2 ?? '-'}</span>
                                                                    </div>
                                                                </div>
                                                                {round < 3 && (
                                                                    <div className={`${styles.connector} ${idx % 2 === 0 ? styles.top : styles.bottom} ${match.winner ? styles.active : ''}`}>
                                                                        <div className={styles.line} />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
