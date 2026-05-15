'use client';

import React from 'react';
import styles from './RegisteredTeams.module.css';
import { useTournament } from '../../hooks/useTournament';
import { Users } from 'lucide-react';
import { useCampusEvents } from '../../hooks/useCampusEvents';
import { useAuth } from '../../context/AuthContext';

import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function RegisteredTeams() {
  const { registrations } = useTournament();
  const [globalTeams] = useLocalStorage<any[]>('mq_registered_teams', []);
  const [campusEvents] = useCampusEvents();
  const { getUserName } = useAuth();

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

  // Group by Team Name to prevent redundancy
  const groupedRegistrations = allRegistrations.reduce((acc: any[], current) => {
    const existing = acc.find(item => item.teamName === current.teamName);
    if (existing) {
      if (!existing.eventIds.includes(current.eventId)) {
        existing.eventIds.push(current.eventId);
      }
    } else {
      acc.push({
        teamName: current.teamName,
        roster: current.roster,
        eventIds: [current.eventId]
      });
    }
    return acc;
  }, []);

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
            {groupedRegistrations.length === 0 ? (
              <tr>
                <td colSpan={3} className={styles.empty}>No teams registered yet.</td>
              </tr>
            ) : (
              groupedRegistrations.map((r, idx) => (
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
                      {(Array.isArray(r.roster) ? r.roster : [r.roster]).map((player: string, pIdx: number) => (
                        <span key={pIdx} style={{ fontSize: '11px', background: 'var(--glass-bg)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--glass-border)' }}>
                          {getUserName(player)}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {r.eventIds.map((eid: string, eIdx: number) => (
                        <span key={eIdx} style={{ 
                          color: 'var(--cyan)', 
                          fontWeight: 600, 
                          fontFamily: 'var(--font-rajdhani)',
                          background: 'rgba(0, 201, 224, 0.1)',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          border: '1px solid rgba(0, 201, 224, 0.2)'
                        }}>
                          {getTournamentTitle(eid)}
                        </span>
                      ))}
                    </div>
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
