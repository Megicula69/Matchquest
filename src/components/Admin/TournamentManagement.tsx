'use client';

import React, { useEffect, useState } from 'react';
import {
  Trophy, Search, Plus, Calendar, Filter, Users, Clock,
  MapPin, ChevronLeft, Play, Info, CheckCircle2,
  Gamepad2, Swords, MessageSquare, ListTodo, BarChart2, Shield, Trash2, X, Settings,
  Type, Image, Eye, Zap
} from 'lucide-react';
import styles from './TournamentManagement.module.css';
import CreateTournamentModal from './CreateTournamentModal';
import { useTournament } from '../../hooks/useTournament';
import { useCampusEvents } from '../../hooks/useCampusEvents';

interface Tournament {
  id: string;
  name: string;
  game: 'Valorant' | 'MLBB' | 'Wild Rift';
  type: string;
  teams: number;
  maxTeams: number;
  prize: string;
  startDate: string;
  status: 'live' | 'upcoming' | 'registering';
  banner: string;
  progress: number;
}

const mockTournaments: Tournament[] = [
  {
    id: '1',
    name: 'Valorant Campus Masters',
    game: 'Valorant',
    type: 'Single Elimination',
    teams: 16,
    maxTeams: 16,
    prize: '₱50,000',
    startDate: 'May 12, 2026',
    status: 'live',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400',
    progress: 75,
  },
  {
    id: '2',
    name: 'MLBB Student Championship',
    game: 'MLBB',
    type: 'Double Elimination',
    teams: 24,
    maxTeams: 32,
    prize: '₱30,000',
    startDate: 'May 15, 2026',
    status: 'registering',
    banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400',
    progress: 0,
  },
  {
    id: '3',
    name: 'Wild Rift Pro Invitational',
    game: 'Wild Rift',
    type: 'Round Robin',
    teams: 8,
    maxTeams: 8,
    prize: '₱20,000',
    startDate: 'May 20, 2026',
    status: 'upcoming',
    banner: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=400',
    progress: 0,
  }
];

export default function TournamentManagement() {
  const { registrations, bracket, updateMatchScore, updateMatchTeams, schedule, updateSchedule, deleteScheduleItem, updateRegistration } = useTournament();
  const [campusEvents, setCampusEvents] = useCampusEvents();
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [activeTab, setActiveTab] = useState('details');
  const [isEditingBracket, setIsEditingBracket] = useState(false);
  const [isEditingSchedule, setIsEditingSchedule] = useState(false);
  const [editingRoster, setEditingRoster] = useState<{ id: string, eventId: string, teamName: string, roster: string[] } | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGame, setFilterGame] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editingTournament, setEditingTournament] = useState<Tournament | null>(null);
  const [tournaments, setTournaments] = useState<Tournament[]>(() => {
    // derive initial tournaments from events and any stored registrations
    return mockTournaments.map(t => t); // will be replaced by effect below
  });
  const [toast, setToast] = useState<string | null>(null);


  const handlePublishTournament = (newTournament: Tournament) => {
    setTournaments(prev => [newTournament, ...prev]);
    setCampusEvents(prev => [
      {
        id: newTournament.id,
        title: newTournament.name,
        game: newTournament.game,
        date: newTournament.startDate,
        time: 'TBD',
        prizePool: newTournament.prize,
        participants: newTournament.teams,
        maxParticipants: newTournament.maxTeams,
        status: 'UPCOMING',
        image: newTournament.banner,
        location: { x: 50, y: 50 },
        description: `${newTournament.type} tournament for ${newTournament.game}`,
      },
      ...prev,
    ]);
    setToast('Tournament published successfully!');
    setTimeout(() => setToast(null), 3000);
    console.log('Activity Log Created: Admin published tournament', newTournament.name);
    console.log('Brackets auto-generated for', newTournament.name);
    console.log('Push notification broadcasted to all students.');
  };

  const handleSaveTournamentEdit = (updatedTournament: Tournament) => {
    setTournaments(prev => prev.map(t => t.id === updatedTournament.id ? updatedTournament : t));
    setCampusEvents(prev => prev.map(ev =>
      ev.id === updatedTournament.id
        ? {
          ...ev,
          title: updatedTournament.name,
          game: updatedTournament.game,
          date: updatedTournament.startDate,
          prizePool: updatedTournament.prize,
        }
        : ev
    ));
    setEditingTournament(null);
    setToast('Tournament updated successfully!');
    setTimeout(() => setToast(null), 3000);
    console.log('Activity Log Created: Admin updated tournament', updatedTournament.name);
  };

  // Keep tournaments in sync with player-registered events
  useEffect(() => {
    const mappedTournaments = campusEvents.map(ev => {
      const regCount = registrations.filter(r => r.eventId === ev.id).length;
      const statusMap: Record<string, Tournament['status']> = {
        UPCOMING: 'upcoming',
        ONGOING: 'live',
        COMPLETED: 'upcoming',
        REGISTERED: 'registering'
      };

      return {
        id: ev.id,
        name: ev.title,
        game: (ev.game as any) || 'Valorant',
        type: 'Open',
        teams: regCount,
        maxTeams: ev.maxParticipants,
        prize: ev.prizePool,
        startDate: ev.date,
        status: statusMap[ev.status] || 'upcoming',
        banner: ev.image,
        progress: Math.min(100, Math.round((regCount / Math.max(1, ev.maxParticipants)) * 100)),
      } as Tournament;
    });

    setTournaments(mappedTournaments.concat(mockTournaments.filter(t => !mappedTournaments.find(m => m.id === t.id))));
  }, [registrations, campusEvents]);

  // Filter tournaments based on search and filters
  const filteredTournaments = tournaments.filter(tournament => {
    const matchesSearch = tournament.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tournament.game.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGame = filterGame === 'all' || tournament.game.toLowerCase() === filterGame.toLowerCase();
    const matchesStatus = filterStatus === 'all' || tournament.status === filterStatus;

    return matchesSearch && matchesGame && matchesStatus;
  });

  if (selectedTournament) {
    return (
      <div className={styles.detailsContainer}>
        <div className={styles.backBtn} onClick={() => setSelectedTournament(null)}>
          <ChevronLeft size={18} /> Back to Tournaments
        </div>

        <div className={styles.detailsHeader}>
          <img src={selectedTournament.banner} alt={selectedTournament.name} className={styles.detailsBanner} />
          <div className={styles.detailsMainInfo}>
            <div className={styles.detailsTitle}>{selectedTournament.name}</div>
            <div className={styles.detailsMeta}>
              <div className={styles.metaItem}><Gamepad2 size={14} className={styles.metaIcon} /> {selectedTournament.game}</div>
              <div className={styles.metaItem}><Clock size={14} className={styles.metaIcon} /> {selectedTournament.startDate}</div>
              <div className={styles.metaItem}><Users size={14} className={styles.metaIcon} /> {selectedTournament.teams} Teams</div>
              <div className={styles.metaItem}><Trophy size={14} className={styles.metaIcon} /> {selectedTournament.prize} Prize</div>
            </div>
          </div>
          <div className={`${styles.status} ${styles[selectedTournament.status]}`}>
            {selectedTournament.status}
          </div>
        </div>

        <div className={styles.tabs}>
          <div className={`${styles.tab} ${activeTab === 'details' ? styles.active : ''}`} onClick={() => setActiveTab('details')}>
            <Settings size={16} /> Details
          </div>
          <div className={`${styles.tab} ${activeTab === 'bracket' ? styles.active : ''}`} onClick={() => setActiveTab('bracket')}>
            <Swords size={16} /> Bracket
          </div>
          <div className={`${styles.tab} ${activeTab === 'teams' ? styles.active : ''}`} onClick={() => setActiveTab('teams')}>
            <Users size={16} /> Teams
          </div>
          <div className={`${styles.tab} ${activeTab === 'schedule' ? styles.active : ''}`} onClick={() => setActiveTab('schedule')}>
            <Calendar size={16} /> Schedule
          </div>
          <div className={`${styles.tab} ${activeTab === 'stats' ? styles.active : ''}`} onClick={() => setActiveTab('stats')}>
            <BarChart2 size={16} /> Stats
          </div>
          <div className={`${styles.tab} ${activeTab === 'referees' ? styles.active : ''}`} onClick={() => setActiveTab('referees')}>
            <Shield size={16} /> Referees
          </div>
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'details' && (
            <div className={styles.detailsEditContainer}>
              <div className={styles.detailsMainEdit}>
                <div className={styles.detailsFormGrid}>
                  <div className={styles.editGroup}>
                    <label><Type size={14} /> Tournament Name</label>
                    <input
                      type="text"
                      value={editingTournament?.name || selectedTournament.name}
                      onChange={(e) => setEditingTournament({ ...(editingTournament || selectedTournament), name: e.target.value })}
                      className={styles.editInput}
                      placeholder="Enter tournament title"
                    />
                  </div>

                  <div className={styles.editGroup}>
                    <label><Gamepad2 size={14} /> Game Title</label>
                    <select
                      value={editingTournament?.game || selectedTournament.game}
                      onChange={(e) => setEditingTournament({ ...(editingTournament || selectedTournament), game: e.target.value as any })}
                      className={styles.editInput}
                    >
                      <option value="Valorant">Valorant</option>
                      <option value="MLBB">MLBB</option>
                      <option value="Wild Rift">Wild Rift</option>
                      <option value="League of Legends">League of Legends</option>
                      <option value="Apex Legends">Apex Legends</option>
                      <option value="Overwatch 2 Sky High">Overwatch 2 Sky High</option>
                      <option value="Dota 2">Dota 2</option>
                    </select>
                  </div>

                  <div className={styles.editGroup}>
                    <label><Calendar size={14} /> Start Date</label>
                    <input
                      type="text"
                      value={editingTournament?.startDate || selectedTournament.startDate}
                      onChange={(e) => setEditingTournament({ ...(editingTournament || selectedTournament), startDate: e.target.value })}
                      className={styles.editInput}
                      placeholder="e.g., May 12, 2026"
                    />
                  </div>

                  <div className={styles.editGroup}>
                    <label><Users size={14} /> Max Teams</label>
                    <input
                      type="number"
                      value={editingTournament?.maxTeams || selectedTournament.maxTeams}
                      onChange={(e) => setEditingTournament({ ...(editingTournament || selectedTournament), maxTeams: parseInt(e.target.value) })}
                      className={styles.editInput}
                    />
                  </div>

                  <div className={styles.editGroup}>
                    <label><Trophy size={14} /> Prize Pool</label>
                    <input
                      type="text"
                      value={editingTournament?.prize || selectedTournament.prize}
                      onChange={(e) => setEditingTournament({ ...(editingTournament || selectedTournament), prize: e.target.value })}
                      className={styles.editInput}
                      placeholder="e.g., ₱50,000"
                    />
                  </div>

                  <div className={styles.editGroup}>
                    <label><Image size={14} /> Banner URL</label>
                    <input
                      type="text"
                      value={editingTournament?.banner || selectedTournament.banner}
                      onChange={(e) => setEditingTournament({ ...(editingTournament || selectedTournament), banner: e.target.value })}
                      className={styles.editInput}
                      placeholder="https://image-url.com/banner.jpg"
                    />
                  </div>
                </div>

                <div className={styles.bannerPreviewSection}>
                  <label><Eye size={14} /> Banner Preview</label>
                  <div className={styles.bannerPreviewContainer}>
                    <img 
                      src={editingTournament?.banner || selectedTournament.banner} 
                      alt="Banner Preview" 
                      className={styles.bannerPreview}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2070';
                      }}
                    />
                    <div className={styles.previewBadge}>PREVIEW</div>
                  </div>
                </div>
              </div>

              <div className={styles.editActions}>
                <button className={styles.cancelBtn} onClick={() => setEditingTournament(null)}>Discard Changes</button>
                <button className={styles.saveBtn} onClick={() => {
                  if (editingTournament) {
                    handleSaveTournamentEdit(editingTournament);
                    setSelectedTournament(editingTournament);
                  }
                }}>Save Changes</button>
              </div>
            </div>
          )}
          {activeTab === 'bracket' && (
            <div className={styles.bracketContainer}>
              <div className={styles.tabActions}>
                <button
                  className={`${styles.actionBtn} ${isEditingBracket ? styles.saveBtn : styles.editBtn}`}
                  onClick={() => setIsEditingBracket(!isEditingBracket)}
                >
                  {isEditingBracket ? 'Save Changes' : 'Edit Bracket'}
                </button>
              </div>
              {selectedTournament ? (() => {
                const tournamentBracket = bracket.filter(m => m.eventId === selectedTournament.id);

                if (tournamentBracket.length === 0) {
                  return <div className={styles.emptyBracket}>No bracket data. Register teams to auto-generate.</div>;
                }

                return [1, 2, 3].map(round => (
                  <div key={round} className={styles.round}>
                    <div className={styles.roundTitle}>
                      {round === 1 ? 'Quarter-Finals' : round === 2 ? 'Semi-Finals' : 'Grand Finals'}
                    </div>
                    <div className={styles.matches}>
                      {tournamentBracket.filter(match => match.round === round).map((match, idx) => {
                        const isFinished = match.winner !== undefined;
                        const isLive = !isFinished && match.team1 !== 'TBD' && match.team2 !== 'TBD';

                        return (
                          <div key={match.id} className={styles.matchWrapper}>
                            <div className={styles.match}>
                              <div className={styles.matchHeader}>
                                <span className={styles.matchId}>M-{match.id}</span>
                                <span className={`${styles.matchStatus} ${isLive ? styles.statusLive : isFinished ? styles.statusFinished : styles.statusUpcoming}`}>
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
                                    {isEditingBracket ? (
                                      <input
                                        className={styles.editTeamInput}
                                        value={match.team1}
                                        onChange={(e) => updateMatchTeams(match.id, e.target.value, match.team2)}
                                      />
                                    ) : match.team1}
                                  </span>
                                </div>
                                <input
                                  type="number"
                                  className={styles.scoreInput}
                                  value={match.score1 ?? 0}
                                  onChange={(e) => updateMatchScore(match.id, parseInt(e.target.value) || 0, match.score2 || 0)}
                                />
                              </div>
                              <div className={`${styles.team} ${match.winner === match.team2 && match.team2 !== 'TBD' ? styles.winner : ''}`}>
                                <div className={styles.teamInfo}>
                                  <img
                                    src={`https://api.dicebear.com/7.x/identicon/svg?seed=${match.team2}`}
                                    className={styles.teamAvatar}
                                    alt=""
                                  />
                                  <span className={`${styles.teamName} ${match.team2 === 'TBD' ? styles.tbd : ''}`}>
                                    {isEditingBracket ? (
                                      <input
                                        className={styles.editTeamInput}
                                        value={match.team2}
                                        onChange={(e) => updateMatchTeams(match.id, match.team1, e.target.value)}
                                      />
                                    ) : match.team2}
                                  </span>
                                </div>
                                <input
                                  type="number"
                                  className={styles.scoreInput}
                                  value={match.score2 ?? 0}
                                  onChange={(e) => updateMatchScore(match.id, match.score1 || 0, parseInt(e.target.value) || 0)}
                                />
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
                ));
              })() : (
                <div style={{ color: 'var(--muted)' }}>Select a tournament to view its bracket.</div>
              )}
            </div>
          )}

          {activeTab === 'teams' && (
            <div className={styles.teamsList}>
              {selectedTournament && registrations.filter(r => r.eventId === selectedTournament.id).length > 0 ? (
                registrations.filter(r => r.eventId === selectedTournament.id).map((r, idx) => (
                  <div key={idx} className={styles.teamRow}>
                    <div className={styles.teamMain}>
                      <div className={styles.teamLogo}>
                        <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=${r.teamName}`} alt="" />
                      </div>
                      <div className={styles.teamInfo}>
                        <div className={styles.teamName}>{r.teamName}</div>
                        <div className={styles.teamMeta}>5 Members • Registered on {selectedTournament.startDate}</div>
                      </div>
                    </div>
                    <div className={styles.teamStats}>
                      <div className={styles.miniStat}>
                        <span className={styles.statLabel}>WIN RATE</span>
                        <span className={styles.statValue}>68%</span>
                      </div>
                    </div>
                    <div className={styles.teamActions}>
                      <span className={`${styles.status} ${styles.live}`}>APPROVED</span>
                      <button
                        className={styles.manageRosterBtn}
                        onClick={() => setEditingRoster({
                          id: r.id || `temp-${idx}`,
                          eventId: selectedTournament.id,
                          teamName: r.teamName,
                          roster: r.roster || ['', '', '', '', '']
                        })}
                      >
                        <Settings size={14} /> Manage Roster
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.emptyState}>No teams registered for this tournament yet.</div>
              )}
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className={styles.scheduleTimeline}>
              <div className={styles.tabActions}>
                <button
                  className={`${styles.actionBtn} ${isEditingSchedule ? styles.saveBtn : styles.editBtn}`}
                  onClick={() => setIsEditingSchedule(!isEditingSchedule)}
                >
                  {isEditingSchedule ? 'Done Editing' : 'Edit Schedule'}
                </button>
                {isEditingSchedule && (
                  <button
                    className={styles.addBtn}
                    onClick={() => updateSchedule({
                      id: Math.random().toString(36).substr(2, 9),
                      eventId: selectedTournament.id,
                      time: '12:00',
                      date: selectedTournament.startDate,
                      team1: 'TBD',
                      team2: 'TBD',
                      status: 'UPCOMING'
                    })}
                  >
                    <Plus size={14} /> Add Match
                  </button>
                )}
              </div>
              
              <div className={styles.timelineContainer}>
                {schedule.filter(s => s.eventId === selectedTournament.id).length > 0 ? (
                  <div className={styles.timelineList}>
                    {schedule.filter(s => s.eventId === selectedTournament.id).map((item) => (
                      <div key={item.id} className={styles.timelineItem}>
                        <div className={styles.timelinePoint}>
                          <div className={styles.pointDot}></div>
                          <div className={styles.pointLine}></div>
                        </div>
                        <div className={styles.timelineTime}>
                          {isEditingSchedule ? (
                            <div className={styles.editTimeGroup}>
                              <input type="time" value={item.time} onChange={(e) => updateSchedule({ ...item, time: e.target.value })} className={styles.editInputSmall} />
                              <input type="text" value={item.date} onChange={(e) => updateSchedule({ ...item, date: e.target.value })} className={styles.editInputSmall} />
                            </div>
                          ) : (
                            <>
                              <div className={styles.timeText}>{item.time}</div>
                              <div className={styles.dateText}>{item.date}</div>
                            </>
                          )}
                        </div>
                        <div className={styles.timelineCard}>
                          <div className={styles.matchVsCard}>
                            <div className={styles.matchTeam}>
                              {isEditingSchedule ? (
                                <select
                                  value={item.team1}
                                  onChange={(e) => updateSchedule({ ...item, team1: e.target.value })}
                                  className={styles.teamSelectTimeline}
                                >
                                  <option value="TBD">TBD</option>
                                  {registrations.filter(r => r.eventId === selectedTournament.id).map(r => (
                                    <option key={r.id} value={r.teamName}>{r.teamName}</option>
                                  ))}
                                </select>
                              ) : (
                                <>
                                  <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=${item.team1}`} alt="" className={styles.matchTeamLogo} />
                                  <span>{item.team1}</span>
                                </>
                              )}
                            </div>
                            <div className={styles.matchDivider}>VS</div>
                            <div className={styles.matchTeam}>
                              {isEditingSchedule ? (
                                <select
                                  value={item.team2}
                                  onChange={(e) => updateSchedule({ ...item, team2: e.target.value })}
                                  className={styles.teamSelectTimeline}
                                >
                                  <option value="TBD">TBD</option>
                                  {registrations.filter(r => r.eventId === selectedTournament.id).map(r => (
                                    <option key={r.id} value={r.teamName}>{r.teamName}</option>
                                  ))}
                                </select>
                              ) : (
                                <>
                                  <span>{item.team2}</span>
                                  <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=${item.team2}`} alt="" className={styles.matchTeamLogo} />
                                </>
                              )}
                            </div>
                          </div>
                          <div className={styles.matchMeta}>
                            <div className={`${styles.statusBadgeSmall} ${styles[item.status.toLowerCase()]}`}>
                              {isEditingSchedule ? (
                                <select value={item.status} onChange={(e) => updateSchedule({ ...item, status: e.target.value as any })} className={styles.statusSelectTimeline}>
                                  <option value="UPCOMING">UPCOMING</option>
                                  <option value="LIVE">LIVE</option>
                                  <option value="FINAL">FINAL</option>
                                </select>
                              ) : item.status}
                            </div>
                            {isEditingSchedule && (
                              <button className={styles.deleteMatchBtn} onClick={() => deleteScheduleItem(item.id)}><Trash2 size={14} /></button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.emptyTimeline}>No matches scheduled. Click "Edit Schedule" to start the timeline.</div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className={styles.statsDashboard}>
              <div className={styles.statCardPremium}>
                <div className={styles.statIcon} style={{ background: 'rgba(0, 201, 224, 0.1)', color: 'var(--cyan)' }}>
                  <Zap size={24} />
                </div>
                <div className={styles.statContent}>
                  <div className={styles.statLabel}>Highest ACS</div>
                  <div className={styles.statValue}>284.5</div>
                  <div className={styles.statActor}>Alpha Squad</div>
                </div>
              </div>
              <div className={styles.statCardPremium}>
                <div className={styles.statIcon} style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
                  <Trophy size={24} />
                </div>
                <div className={styles.statContent}>
                  <div className={styles.statLabel}>Win Rate</div>
                  <div className={styles.statValue}>85%</div>
                  <div className={styles.statActor}>Neon Ninjas</div>
                </div>
              </div>
              <div className={styles.statCardPremium}>
                <div className={styles.statIcon} style={{ background: 'rgba(155, 109, 255, 0.1)', color: '#9b6dff' }}>
                  <Clock size={24} />
                </div>
                <div className={styles.statContent}>
                  <div className={styles.statLabel}>Average Duration</div>
                  <div className={styles.statValue}>38m</div>
                  <div className={styles.statActor}>Tournament Avg</div>
                </div>
              </div>
              <div className={styles.statCardPremium}>
                <div className={styles.statIcon} style={{ background: 'rgba(255, 171, 0, 0.1)', color: '#ffab00' }}>
                  <Users size={24} />
                </div>
                <div className={styles.statContent}>
                  <div className={styles.statLabel}>Peak Viewers</div>
                  <div className={styles.statValue}>1,240</div>
                  <div className={styles.statActor}>Grand Finals</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'referees' && (
            <div className={styles.refereeGrid}>
              {[
                { name: 'Prof. Rodriguez', role: 'Lead Official', seed: 'Referee1', status: 'ACTIVE' },
                { name: 'Marcus Chen', role: 'Technical Mod', seed: 'Referee2', status: 'ACTIVE' },
                { name: 'Sarah Jenkins', role: 'Bracket Manager', seed: 'Referee3', status: 'AWAY' }
              ].map((ref, idx) => (
                <div key={idx} className={styles.refereeProfileCard}>
                  <div className={styles.refCardHeader}>
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${ref.seed}`} alt="Ref" className={styles.refAvatar} />
                    <div className={`${styles.statusDot} ${ref.status === 'ACTIVE' ? styles.dotActive : styles.dotAway}`}></div>
                  </div>
                  <div className={styles.refCardBody}>
                    <div className={styles.refName}>{ref.name}</div>
                    <div className={styles.refRole}>{ref.role}</div>
                  </div>
                  <div className={styles.refCardFooter}>
                    <div className={`${styles.statusBadge} ${ref.status === 'ACTIVE' ? styles.statusActive : styles.statusAway}`}>
                      {ref.status}
                    </div>
                    <button className={styles.msgRefBtn}><MessageSquare size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Roster Modal */}
        {editingRoster && (
          <div className={styles.modalOverlay} onClick={() => setEditingRoster(null)}>
            <div className={styles.rosterModal} onClick={e => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <div className={styles.modalHeaderInfo}>
                  <Users size={20} className={styles.modalIcon} />
                  <div>
                    <h2 className={styles.modalTitle}>{editingRoster.teamName} Roster</h2>
                    <p className={styles.modalSubtitle}>Manage team members for this tournament</p>
                  </div>
                </div>
                <button className={styles.closeBtn} onClick={() => setEditingRoster(null)}><X size={20} /></button>
              </div>

              <div className={styles.rosterBody}>
                <div className={styles.rosterSlot}>
                  <div className={styles.slotLabel}>TEAM NAME</div>
                  <div className={styles.slotInputWrapper}>
                    <input
                      className={styles.rosterInput}
                      value={editingRoster.teamName}
                      placeholder="Enter team name..."
                      onChange={(e) => setEditingRoster({ ...editingRoster, teamName: e.target.value })}
                      style={{ borderColor: 'var(--gold)', background: 'rgba(240, 165, 0, 0.05)' }}
                    />
                  </div>
                </div>

                <div className={styles.divider} />

                {editingRoster.roster.map((player, idx) => (
                  <div key={idx} className={styles.rosterSlot}>
                    <div className={styles.slotLabel}>Slot {idx + 1}</div>
                    <div className={styles.slotInputWrapper}>
                      <input
                        className={styles.rosterInput}
                        value={player}
                        placeholder="Enter player name..."
                        onChange={(e) => {
                          const newRoster = [...editingRoster.roster];
                          newRoster[idx] = e.target.value;
                          setEditingRoster({ ...editingRoster, roster: newRoster });
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.modalFooter}>
                <button className={styles.btnSecondary} onClick={() => setEditingRoster(null)}>Cancel</button>
                <button
                  className={styles.btnPrimary}
                  onClick={() => {
                    updateRegistration(editingRoster.id, editingRoster.teamName, editingRoster.roster);
                    setEditingRoster(null);
                    setToast('Team details updated successfully!');
                    setTimeout(() => setToast(null), 3000);
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Tournaments</h1>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.searchBar}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search tournaments..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className={styles.filterSelect}
            value={filterGame}
            onChange={(e) => setFilterGame(e.target.value)}
          >
            <option value="all">All Games</option>
            <option value="valorant">Valorant</option>
            <option value="mlbb">MLBB</option>
            <option value="wildrift">Wild Rift</option>
          </select>
          <select
            className={styles.filterSelect}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="live">Live</option>
            <option value="upcoming">Upcoming</option>
            <option value="registering">Registering</option>
          </select>
          <button className={styles.btnPrimary} onClick={() => setShowCreateModal(true)}>
            <Plus size={18} /> Create Tournament
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        {filteredTournaments.length > 0 ? (
          filteredTournaments.map((tournament) => (
            <div key={tournament.id} className={styles.card} onClick={() => setSelectedTournament(tournament)}>
              <img src={tournament.banner} alt={tournament.name} className={styles.banner} />
              <div className={styles.cardBody}>
                <div className={styles.cardHeader}>
                  <div className={styles.gameTitle}>{tournament.name}</div>
                  <div className={`${styles.status} ${styles[tournament.status]}`}>
                    {tournament.status}
                  </div>
                </div>

                <div className={styles.cardInfo}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Game</span>
                    <span className={styles.infoValue}>{tournament.game}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Type</span>
                    <span className={styles.infoValue}>{tournament.type}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Teams</span>
                    <span className={styles.infoValue}>{tournament.teams} / {tournament.maxTeams}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Prize Pool</span>
                    <span className={styles.infoValue} style={{ color: 'var(--gold)' }}>{tournament.prize}</span>
                  </div>
                </div>

                {tournament.status === 'live' && (
                  <div className={styles.progressContainer}>
                    <div className={styles.progressLabel}>
                      <span>Tournament Progress</span>
                      <span>{tournament.progress}%</span>
                    </div>
                    <div className={styles.progressBar}>
                      <div className={styles.progressFill} style={{ width: `${tournament.progress}%` }} />
                    </div>
                  </div>
                )}

                <div className={styles.cardFooter}>
                  {tournament.status === 'live' ? (
                    <div className={styles.liveIndicator}>
                      <div className={styles.pulse} /> LIVE NOW
                    </div>
                  ) : (
                    <div className={styles.metaItem} style={{ color: 'var(--muted)', fontSize: 12 }}>
                      <Calendar size={14} /> Starts {tournament.startDate}
                    </div>
                  )}
                  <div className={styles.viewBtn}>Manage Details</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 2rem', color: 'var(--muted)' }}>
            <Trophy size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p>No tournaments found matching your filters.</p>
          </div>
        )}
      </div>

      {/* Create Tournament Modal */}
      <CreateTournamentModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handlePublishTournament}
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

