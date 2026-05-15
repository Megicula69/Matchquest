'use client';

import React from 'react';
import styles from './RegisteredTeams.module.css';
import { useTournament } from '../../hooks/useTournament';
import { Users } from 'lucide-react';
import { useCampusEvents } from '../../hooks/useCampusEvents';

import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function RegisteredTeams() {
  const { registrations } = useTournament();
  const [globalTeams] = useLocalStorage<any[]>('mq_registered_teams', []);
  const [campusEvents] = useCampusEvents();

  const getTournamentTitle = (eventId: string) => {
    if (eventId === 'GLOBAL_SIGNUP') return 'Platform Registration';
    return campusEvents.find(event => event.id === eventId)?.title ?? eventId;
  };

  const allRegistrations = [
    ...registrations,
    ...globalTeams.map(gt => ({
      teamName: gt.teamName,
      roster: gt.roster || [gt.captainUsername],
      eventId: 'GLOBAL_SIGNUP'
    }))
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}><Users /> Registered Teams</h1>
        <p className={styles.subtitle}>All teams registered via the Events page</p>
      </header>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Team Name</th>
              <th>Captain / Roster</th>
              <th>Tournament</th>
            </tr>
          </thead>
          <tbody>
            {allRegistrations.length === 0 ? (
              <tr>
                <td colSpan={3} className={styles.empty}>No teams registered yet.</td>
              </tr>
            ) : (
              allRegistrations.map((r, idx) => (
                <tr key={idx}>
                  <td>
                    <div className={styles.teamCell}>
                      <div className={styles.teamLogo}>
                        {r.teamName.charAt(0)}
                      </div>
                      <span style={{ fontWeight: 600 }}>{r.teamName}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {(Array.isArray(r.roster) ? r.roster : [r.roster]).map((player, pIdx) => (
                        <span key={pIdx} style={{ fontSize: '11px', background: 'var(--glass-bg)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--glass-border)' }}>
                          {player}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td style={{ color: 'var(--cyan)', fontWeight: 600, fontFamily: 'var(--font-rajdhani)' }}>
                    {getTournamentTitle(r.eventId)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
