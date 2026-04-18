import { useLocalStorage } from './useLocalStorage';
import { BracketMatch, TeamRegistration } from '../types';
import { initialBracket } from '../data/bracket';

export function useTournament() {
    const [bracket, setBracket] = useLocalStorage<BracketMatch[]>('mq_bracket', initialBracket);
    const [registrations, setRegistrations] = useLocalStorage<TeamRegistration[]>('mq_registrations', []);

    const registerTeam = (registration: TeamRegistration) => {
        setRegistrations([...registrations, registration]);
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

            // Propagate winner to next match if applicable
            const updatedMatch = newBracket.find(m => m.id === matchId);
            if (updatedMatch?.winner && updatedMatch.nextMatchId) {
                const nextMatch = newBracket.find(m => m.id === updatedMatch.nextMatchId);
                if (nextMatch) {
                    const isTeam1 = newBracket.filter(m => m.nextMatchId === updatedMatch.nextMatchId)[0].id === matchId;
                    const nextMatchIdx = newBracket.findIndex(m => m.id === updatedMatch.nextMatchId);
                    if (isTeam1) {
                        newBracket[nextMatchIdx].team1 = updatedMatch.winner;
                    } else {
                        newBracket[nextMatchIdx].team2 = updatedMatch.winner;
                    }
                }
            }

            return [...newBracket];
        });
    };

    const isRegistered = (eventId: string) => registrations.some(r => r.eventId === eventId);

    return {
        bracket,
        registrations,
        registerTeam,
        updateMatchScore,
        isRegistered
    };
}
