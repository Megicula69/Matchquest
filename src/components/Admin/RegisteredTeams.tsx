'use client';

import React from 'react';
import styles from './RegisteredTeams.module.css';
import { useTournament } from '../../hooks/useTournament';
import { Users } from 'lucide-react';
import { useCampusEvents } from '../../hooks/useCampusEvents';

export default function RegisteredTeams() {
  const { registrations } = useTournament();
  const [campusEvents] = useCampusEvents();

  const getTournamentTitle = (eventId: string) => {
    return campusEvents.find(event => event.id === eventId)?.title ?? eventId;
  };

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
            {registrations.length === 0 ? (
              <tr>
                <td colSpan={3} className={styles.empty}>No teams registered yet.</td>
              </tr>
            ) : (
              registrations.map((r, idx) => (
                <tr key={idx}>
                  <td>{r.teamName}</td>
                  <td>{Array.isArray(r.roster) ? r.roster.join(', ') : r.roster}</td>
                  <td>{getTournamentTitle(r.eventId)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
