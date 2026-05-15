import { useLocalStorage } from './useLocalStorage';
import { BracketMatch, TeamRegistration, ScheduleItem } from '../types';
import { initialBracket } from '../data/bracket';

export function useTournament() {
    const [bracket, setBracket] = useLocalStorage<BracketMatch[]>('mq_bracket', []);
    const [registrations, setRegistrations] = useLocalStorage<TeamRegistration[]>('mq_registrations', []);
    const [schedule, setSchedule] = useLocalStorage<ScheduleItem[]>('mq_schedule', []);

    const registerTeam = (registration: TeamRegistration) => {
        const newReg = { ...registration, id: registration.id || Math.random().toString(36).substr(2, 9) };
        setRegistrations(prev => [...prev, newReg]);
        
        // Auto-fill bracket
        setBracket(prev => {
            const tournamentBracket = prev.filter(m => m.eventId === registration.eventId);
            if (tournamentBracket.length === 0) {
                // Initialize bracket for this tournament
                const newBracket = initialBracket.map(m => ({
                    ...m,
                    eventId: registration.eventId,
                    team1: m.id === 'm1' ? registration.teamName : 'TBD',
                    team2: 'TBD',
                    score1: 0,
                    score2: 0,
                    winner: undefined
                }));
                return [...prev, ...newBracket];
            } else {
                // Find first available slot
                const updated = [...prev];
                const matchIdx = updated.findIndex(m => 
                    m.eventId === registration.eventId && 
                    m.round === 1 && 
                    (m.team1 === 'TBD' || m.team2 === 'TBD')
                );
                
                if (matchIdx !== -1) {
                    if (updated[matchIdx].team1 === 'TBD') updated[matchIdx].team1 = registration.teamName;
                    else updated[matchIdx].team2 = registration.teamName;
                }
                return updated;
            }
        });
    };

    const updateMatchScore = (matchId: string, score1: number, score2: number) => {
        setBracket(prev => {
            const newBracket = prev.map(match => {
                if (match.id === matchId) {
                    const winner = score1 > score2 ? match.team1 : score2 > score1 ? match.team2 : undefined;
                    return { ...match, score1, score2, winner };
                }
                return match;
            });

            const updatedMatch = newBracket.find(m => m.id === matchId);
            if (updatedMatch?.winner && updatedMatch.nextMatchId) {
                const nextMatchIdx = newBracket.findIndex(m => m.id === updatedMatch.nextMatchId && m.eventId === updatedMatch.eventId);
                if (nextMatchIdx !== -1) {
                    // Check if it's the first or second team in the next match
                    const sourceMatches = newBracket.filter(m => m.nextMatchId === updatedMatch.nextMatchId && m.eventId === updatedMatch.eventId);
                    const isFirstSource = sourceMatches[0]?.id === matchId;
                    
                    if (isFirstSource) newBracket[nextMatchIdx].team1 = updatedMatch.winner;
                    else newBracket[nextMatchIdx].team2 = updatedMatch.winner;
                }
            }
            return [...newBracket];
        });
    };

    const updateMatchTeams = (matchId: string, team1: string, team2: string) => {
        setBracket(prev => prev.map(m => m.id === matchId ? { ...m, team1, team2 } : m));
    };

    const updateSchedule = (item: ScheduleItem) => {
        setSchedule(prev => {
            const exists = prev.find(i => i.id === item.id);
            if (exists) return prev.map(i => i.id === item.id ? item : i);
            return [...prev, item];
        });
    };

    const deleteScheduleItem = (id: string) => {
        setSchedule(prev => prev.filter(i => i.id !== id));
    };

    const updateRegistration = (id: string, teamName: string, roster: string[]) => {
        setRegistrations(prev => prev.map(r => 
            r.id === id ? { ...r, teamName, roster } : r
        ));
    };

    return {
        bracket,
        registrations,
        schedule,
        registerTeam,
        updateMatchScore,
        updateMatchTeams,
        updateSchedule,
        deleteScheduleItem,
        updateRegistration,
        isRegistered: (eventId: string) => registrations.some(r => r.eventId === eventId)
    };
}
