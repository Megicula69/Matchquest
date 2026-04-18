import { BracketMatch } from '../types';

export const initialBracket: BracketMatch[] = [
    // Round 1
    { id: 'm1', team1: 'Alpha Squad', team2: 'Beta Wolves', score1: 13, score2: 10, winner: 'Alpha Squad', round: 1, nextMatchId: 'm5' },
    { id: 'm2', team1: 'Gamma Ray', team2: 'Delta Force', score1: 11, score2: 13, winner: 'Delta Force', round: 1, nextMatchId: 'm5' },
    { id: 'm3', team1: 'Epsilon Elite', team2: 'Zeta Zenith', score1: 15, score2: 12, winner: 'Epsilon Elite', round: 1, nextMatchId: 'm6' },
    { id: 'm4', team1: 'Eta Eagles', team2: 'Theta Titans', score1: 13, score2: 15, winner: 'Theta Titans', round: 1, nextMatchId: 'm6' },

    // Round 2 (Semi-Finals)
    { id: 'm5', team1: 'Alpha Squad', team2: 'Delta Force', round: 2, nextMatchId: 'm7' },
    { id: 'm6', team1: 'Epsilon Elite', team2: 'Theta Titans', round: 2, nextMatchId: 'm7' },

    // Round 3 (Finals)
    { id: 'm7', team1: 'TBD', team2: 'TBD', round: 3 }
];
