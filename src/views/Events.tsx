import React, { useState } from 'react';
import styles from './Events.module.css';
import { events as hardcodedEvents } from '../data/events';
import { useTournament } from '../hooks/useTournament';
import { TournamentEvent, BracketMatch } from '../types';
import { MapPin, Calendar, Clock, Trophy, Users, X, ChevronRight, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const EventsPage: React.FC = () => {
    const { bracket, registerTeam, isRegistered, updateMatchScore } = useTournament();
    const [selectedEvent, setSelectedEvent] = useState<TournamentEvent | null>(null);
    const [regStep, setRegStep] = useState(1);
    const [teamInfo, setTeamInfo] = useState({ name: '', roster: ['', '', '', '', ''] });
    const [view, setView] = useState<'LIST' | 'MAP' | 'BRACKET'>('LIST');

    const handleRegister = () => {
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
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>TOURNEY ARENA</h1>
                <div className={styles.viewToggle}>
                    <button className={view === 'LIST' ? styles.active : ''} onClick={() => setView('LIST')}>LIST</button>
                    <button className={view === 'MAP' ? styles.active : ''} onClick={() => setView('MAP')}>MAP</button>
                    <button className={view === 'BRACKET' ? styles.active : ''} onClick={() => setView('BRACKET')}>BRACKET</button>
                </div>
            </header>

            {view === 'LIST' && (
                <div className={`${styles.eventList} fade-in`}>
                    {hardcodedEvents.map(event => (
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

            {view === 'MAP' && (
                <div className={`${styles.mapView} fade-in`}>
                    <div className={styles.mapContainer}>
                        <div className={styles.mapGrid}></div>
                        {hardcodedEvents.map(event => (
                            <div
                                key={event.id}
                                className={styles.mapPin}
                                style={{ left: `${event.location.x}%`, top: `${event.location.y}%` }}
                                onClick={() => setSelectedEvent(event)}
                            >
                                <div className={styles.pinPulse}></div>
                                <MapPin size={24} color={event.status === 'ONGOING' ? 'var(--red)' : 'var(--cyan)'} />
                                <div className={styles.pinLabel}>{event.title}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {view === 'BRACKET' && (
                <div className={`${styles.bracketView} fade-in`}>
                    <div className={styles.bracketContainer}>
                        {[1, 2, 3].map(round => (
                            <div key={round} className={styles.round}>
                                <h4 className={styles.roundTitle}>Round {round}</h4>
                                <div className={styles.matches}>
                                    {bracket.filter(m => m.round === round).map(match => (
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
                        ))}
                    </div>
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
                            {regStep === 1 && (
                                <div className="fade-in">
                                    <h2 className={styles.modalTitle}>{selectedEvent.title}</h2>
                                    <div className={styles.modalMeta}>
                                        <span><Calendar /> {selectedEvent.date} @ {selectedEvent.time}</span>
                                        <span><Users /> {selectedEvent.participants}/{selectedEvent.maxParticipants} Registered</span>
                                    </div>
                                    <p className={styles.modalDesc}>{selectedEvent.description}</p>

                                    {isRegistered(selectedEvent.id) ? (
                                        <div className={styles.registeredStatus}>
                                            <CheckCircle /> YOU ARE REGISTERED
                                        </div>
                                    ) : (
                                        <button className={styles.primaryBtn} onClick={() => setRegStep(2)}>REGISTER TEAM</button>
                                    )}
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
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
