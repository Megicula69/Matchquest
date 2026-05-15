import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Player, GameMode, DuoPair } from '../types';
import { compPlayers, duoPlayers } from '../data/players';
import { duoPairs as hardcodedDuoPairs } from '../data/duoPairs';

export function useMatchmaking() {
    const [activeMode, setActiveMode] = useState<GameMode>('COMP');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [matches, setMatches] = useLocalStorage<string[]>('mq_matches', []);
    const [likedPlayers, setLikedPlayers] = useLocalStorage<string[]>('mq_liked', []);
    const [passedPlayers, setPassedPlayers] = useLocalStorage<string[]>('mq_passed', []);
    const [likedDuos, setLikedDuos] = useLocalStorage<string[]>('mq_liked_duos', []);
    const [passedDuos, setPassedDuos] = useLocalStorage<string[]>('mq_passed_duos', []);

    const currentPlayer = compPlayers[currentIndex % compPlayers.length];
    const currentDuoPair = hardcodedDuoPairs[currentIndex % hardcodedDuoPairs.length];

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

    const handleMatchDuo = (duoId: string) => {
        if (!likedDuos.includes(duoId)) {
            setLikedDuos([...likedDuos, duoId]);
            // Simulate a "match" for duo
            if (Math.random() > 0.5) {
                setMatches([...matches, duoId]);
                return true;
            }
        }
        setCurrentIndex(prev => prev + 1);
        return false;
    };

    const handlePassDuo = (duoId: string) => {
        if (!passedDuos.includes(duoId)) {
            setPassedDuos([...passedDuos, duoId]);
        }
        setCurrentIndex(prev => prev + 1);
    };

    return {
        activeMode,
        setActiveMode,
        currentPlayer,
        currentDuoPair,
        handleMatch,
        handlePass,
        handleMatchDuo,
        handlePassDuo,
        matches,
        currentIndex
    };
}
