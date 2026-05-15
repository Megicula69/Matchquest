import React, { useState } from 'react';
import styles from './Events.module.css';
import { useCampusEvents } from '../hooks/useCampusEvents';
import { useTournament } from '../hooks/useTournament';
import { useAuth } from '../context/AuthContext';
import { TournamentEvent, BracketMatch } from '../types';
import { Calendar, Clock, Trophy, Users, X, ChevronRight, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const EventsPage: React.FC = () => {
    const [campusEvents] = useCampusEvents();
    const { bracket, registrations, registerTeam, updateMatchScore } = useTournament();
    const { user, hasRegisteredTeam, getUserRegisteredTeamName } = useAuth();
    const [selectedEvent, setSelectedEvent] = useState<TournamentEvent | null>(null);
    const [regStep, setRegStep] = useState(1);
    const [teamInfo, setTeamInfo] = useState({ name: '', roster: ['', '', '', '', ''] });
    const [modalView, setModalView] = useState<'DETAIL' | 'BRACKET'>('DETAIL');
    const [bracketModalOpen, setBracketModalOpen] = useState(false);
    const [registrationError, setRegistrationError] = useState<string | null>(null);
    const canRegisterForGames = Boolean(user && hasRegisteredTeam(user.username));
    const userRegisteredTeamName = user ? getUserRegisteredTeamName(user.username) : null;

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
                                        {(() => {
                                            const populated = bracket.map(m => ({ ...m }));
                                            const teamsForEvent = registrations.filter(r => r.eventId === selectedEvent.id).map(r => r.teamName);
                                            const round1Matches = populated.filter(m => m.round === 1);
                                            round1Matches.forEach((match, idx) => {
                                                match.team1 = teamsForEvent[idx * 2] ?? 'TBD';
                                                match.team2 = teamsForEvent[idx * 2 + 1] ?? 'TBD';
                                                match.score1 = undefined;
                                                match.score2 = undefined;
                                                match.winner = undefined;
                                            });

                                            // Clear later rounds (no teams have advanced yet)
                                            populated.filter(m => m.round > 1).forEach(m => {
                                                m.team1 = 'TBD';
                                                m.team2 = 'TBD';
                                                m.score1 = undefined;
                                                m.score2 = undefined;
                                                m.winner = undefined;
                                            });

                                            return [1, 2, 3].map(round => (
                                                <div key={round} className={styles.round}>
                                                    <h4 className={styles.roundTitle}>Round {round}</h4>
                                                    <div className={styles.matches}>
                                                        {populated.filter(m => m.round === round).map(match => (
                                                            <div key={match.id} className={styles.match}>
                                                                <div className={`${styles.team} ${match.winner === match.team1 ? styles.winner : ''}`}>
                                                                    <span className={styles.teamName}>{match.team1}</span>
                                                                    <input
                                                                        type="number"
                                                                        value={match.score1 || 0}
                                                                        onChange={(e) => updateMatchScore(match.id, parseInt(e.target.value), match.score2 || 0)}
                                                                    />
                                                                </div>
                                                                <div className={`${styles.team} ${match.winner === match.team2 ? styles.winner : ''}`}>
                                                                    <span className={styles.teamName}>{match.team2}</span>
                                                                    <input
                                                                        type="number"
                                                                        value={match.score2 || 0}
                                                                        onChange={(e) => updateMatchScore(match.id, match.score1 || 0, parseInt(e.target.value))}
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ));
                                        })()}
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
                                            {(() => {
                                                const populated = bracket.map(m => ({ ...m }));
                                                const teamsForEvent = registrations.filter(r => r.eventId === selectedEvent.id).map(r => r.teamName);
                                                const round1Matches = populated.filter(m => m.round === 1);
                                                round1Matches.forEach((match, idx) => {
                                                    match.team1 = teamsForEvent[idx * 2] ?? 'TBD';
                                                    match.team2 = teamsForEvent[idx * 2 + 1] ?? 'TBD';
                                                    match.score1 = undefined;
                                                    match.score2 = undefined;
                                                    match.winner = undefined;
                                                });

                                                // Hide teams in later rounds until advanced
                                                populated.filter(m => m.round > 1).forEach(m => {
                                                    m.team1 = 'TBD';
                                                    m.team2 = 'TBD';
                                                    m.score1 = undefined;
                                                    m.score2 = undefined;
                                                    m.winner = undefined;
                                                });

                                                return [1, 2, 3].map(round => (
                                                    <div key={round} className={styles.round}>
                                                        <h4 className={styles.roundTitle}>Round {round}</h4>
                                                        <div className={styles.matches}>
                                                        {populated.filter(m => m.round === round).map(match => (
                                                            <div key={match.id} className={styles.match}>
                                                                <div className={`${styles.team} ${match.winner === match.team1 ? styles.winner : ''}`}>
                                                                    <span className={styles.teamName}>{match.team1}</span>
                                                                    <span className={styles.score}>{match.score1 ?? '-'}</span>
                                                                </div>
                                                                <div className={`${styles.team} ${match.winner === match.team2 ? styles.winner : ''}`}>
                                                                    <span className={styles.teamName}>{match.team2}</span>
                                                                    <span className={styles.score}>{match.score2 ?? '-'}</span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        </div>
                                                    </div>
                                                ));
                                            })()}
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
