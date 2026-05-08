'use client';

import React, { useState } from 'react';
import { 
  Trophy, Search, Plus, Calendar, Filter, Users, Clock, 
  MapPin, ChevronLeft, Play, Info, CheckCircle2, 
  Gamepad2, Swords, MessageSquare, ListTodo, BarChart2
} from 'lucide-react';
import styles from './TournamentManagement.module.css';
import CreateTournamentModal from './CreateTournamentModal';

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
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [activeTab, setActiveTab] = useState('bracket');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [tournaments, setTournaments] = useState<Tournament[]>(mockTournaments);
  const [toast, setToast] = useState<string | null>(null);
  const handlePublishTournament = (newTournament: Tournament) => {
    setTournaments(prev => [newTournament, ...prev]);
    setToast('Tournament published successfully!');
    setTimeout(() => setToast(null), 3000);
    console.log('Activity Log Created: Admin published tournament', newTournament.name);
    console.log('Brackets auto-generated for', newTournament.name);
    console.log('Push notification broadcasted to all students.');
  };

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
              <div className={styles.metaItem}><Gamepad2 size={14} className={styles.metaIcon}/> {selectedTournament.game}</div>
              <div className={styles.metaItem}><Clock size={14} className={styles.metaIcon}/> {selectedTournament.startDate}</div>
              <div className={styles.metaItem}><Users size={14} className={styles.metaIcon}/> {selectedTournament.teams} Teams</div>
              <div className={styles.metaItem}><Trophy size={14} className={styles.metaIcon}/> {selectedTournament.prize} Prize</div>
            </div>
          </div>
          <div className={`${styles.status} ${styles[selectedTournament.status]}`}>
            {selectedTournament.status}
          </div>
        </div>

        <div className={styles.tabs}>
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
          <div className={`${styles.tab} ${activeTab === 'moderation' ? styles.active : ''}`} onClick={() => setActiveTab('moderation')}>
            <ListTodo size={16} /> Referees
          </div>
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'bracket' && (
            <div className={styles.bracketContainer}>
              <div className={styles.round}>
                <div className={styles.roundTitle}>Round of 16</div>
                <div className={styles.match}>
                  <div className={`${styles.team} ${styles.winner}`}>
                    <span>Team Phantom</span>
                    <span className={styles.score}>2</span>
                  </div>
                  <div className={`${styles.team} ${styles.loser}`}>
                    <span>Ghost Riders</span>
                    <span className={styles.score}>0</span>
                  </div>
                </div>
                <div className={styles.match}>
                  <div className={`${styles.team} ${styles.winner}`}>
                    <span>Neon Ninjas</span>
                    <span className={styles.score}>2</span>
                  </div>
                  <div className={`${styles.team} ${styles.loser}`}>
                    <span>Cyber Samurais</span>
                    <span className={styles.score}>1</span>
                  </div>
                </div>
              </div>

              <div className={styles.round}>
                <div className={styles.roundTitle}>Quarter Finals</div>
                <div className={styles.match}>
                  <div className={styles.team}>
                    <span>Team Phantom</span>
                    <span className={styles.score}>-</span>
                  </div>
                  <div className={styles.team}>
                    <span>Neon Ninjas</span>
                    <span className={styles.score}>-</span>
                  </div>
                </div>
              </div>

              <div className={styles.round}>
                <div className={styles.roundTitle}>Semi Finals</div>
                <div className={styles.match}>
                  <div className={styles.team}>
                    <span>TBD</span>
                  </div>
                  <div className={styles.team}>
                    <span>TBD</span>
                  </div>
                </div>
              </div>

              <div className={styles.round}>
                <div className={styles.roundTitle}>Grand Finals</div>
                <div className={styles.match} style={{ borderColor: 'var(--gold)', boxShadow: '0 0 20px rgba(240, 165, 0, 0.2)' }}>
                  <div className={styles.team}>
                    <span>TBD</span>
                  </div>
                  <div className={styles.team}>
                    <span>TBD</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'teams' && (
            <table className={styles.teamsTable}>
              <thead>
                <tr>
                  <th>Team Name</th>
                  <th>Status</th>
                  <th>Win Rate</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className={styles.teamCell}>
                      <div className={styles.teamLogo}></div>
                      <span>Team Phantom</span>
                    </div>
                  </td>
                  <td><span className={`${styles.status} ${styles.live}`}>Approved</span></td>
                  <td>85%</td>
                  <td className={styles.viewBtn}>View Roster</td>
                </tr>
                <tr>
                  <td>
                    <div className={styles.teamCell}>
                      <div className={styles.teamLogo}></div>
                      <span>Neon Ninjas</span>
                    </div>
                  </td>
                  <td><span className={`${styles.status} ${styles.live}`}>Approved</span></td>
                  <td>72%</td>
                  <td className={styles.viewBtn}>View Roster</td>
                </tr>
              </tbody>
            </table>
          )}

          {activeTab === 'schedule' && (
            <div className={styles.scheduleList}>
              <div className={styles.scheduleItem}>
                <div className={styles.matchTime}>
                  <span className={styles.time}>14:00</span>
                  <span className={styles.date}>May 12, 2026</span>
                </div>
                <div className={styles.matchTeams}>
                  <span>Team Phantom</span>
                  <span className={styles.vs}>VS</span>
                  <span>Neon Ninjas</span>
                </div>
                <div className={`${styles.status} ${styles.live}`}>LIVE</div>
              </div>
              <div className={styles.scheduleItem}>
                <div className={styles.matchTime}>
                  <span className={styles.time}>16:00</span>
                  <span className={styles.date}>May 12, 2026</span>
                </div>
                <div className={styles.matchTeams}>
                  <span>Ghost Riders</span>
                  <span className={styles.vs}>VS</span>
                  <span>Cyber Samurais</span>
                </div>
                <div className={`${styles.status} ${styles.upcoming}`}>UPCOMING</div>
              </div>
            </div>
          )}
        </div>
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
            <input type="text" placeholder="Search tournaments..." className={styles.searchInput} />
          </div>
          <select className={styles.filterSelect}>
            <option value="all">All Games</option>
            <option value="valorant">Valorant</option>
            <option value="mlbb">MLBB</option>
            <option value="wildrift">Wild Rift</option>
          </select>
          <select className={styles.filterSelect}>
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
        {tournaments.map((tournament) => (
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
        ))}
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
