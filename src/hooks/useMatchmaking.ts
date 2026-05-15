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
    
    // Only show duo pairs where both players play the same game
    const filteredDuoPairs = hardcodedDuoPairs.filter(pair => 
        pair.player1.favoriteGame === pair.player2.favoriteGame
    );
    
    const currentDuoPair = filteredDuoPairs.length > 0 
        ? filteredDuoPairs[currentIndex % filteredDuoPairs.length]
        : hardcodedDuoPairs[currentIndex % hardcodedDuoPairs.length]; // Fallback to all if none match (safety)

    const handleMatch = (playerId: string) => {
        if (!likedPlayers.includes(playerId)) {
            setLikedPlayers([...likedPlayers, playerId]);
            setMatches([...matches, playerId]);
            return true;
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
            setMatches([...matches, duoId]);
            return true;
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
