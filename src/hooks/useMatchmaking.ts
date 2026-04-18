import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Player, GameMode } from '../types';
import { players as hardcodedPlayers } from '../data/players';

export function useMatchmaking() {
    const [activeMode, setActiveMode] = useState<GameMode>('COMP');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [matches, setMatches] = useLocalStorage<string[]>('mq_matches', []);
    const [likedPlayers, setLikedPlayers] = useLocalStorage<string[]>('mq_liked', []);
    const [passedPlayers, setPassedPlayers] = useLocalStorage<string[]>('mq_passed', []);

    const currentPlayer = hardcodedPlayers[currentIndex % hardcodedPlayers.length];

    const handleMatch = (playerId: string) => {
        if (!likedPlayers.includes(playerId)) {
            setLikedPlayers([...likedPlayers, playerId]);
            // Simulate a "match" if it's social/comp
            if (Math.random() > 0.5) {
                setMatches([...matches, playerId]);
                return true; // Return true if it's a match
            }
        }
        setCurrentIndex(prev => prev + 1);
        return false;
    };

    const handlePass = (playerId: string) => {
        if (!passedPlayers.includes(playerId)) {
            setPassedPlayers([...passedPlayers, playerId]);
        }
        setCurrentIndex(prev => prev + 1);
    };

    return {
        activeMode,
        setActiveMode,
        currentPlayer,
        handleMatch,
        handlePass,
        matches,
        currentIndex
    };
}
