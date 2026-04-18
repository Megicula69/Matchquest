import { useLocalStorage } from './useLocalStorage';
import { StoryState, StoryStats, Ending } from '../types';
import { scenes } from '../data/scenes';

const initialState: StoryState = {
    currentSceneId: 'start',
    stats: { gpa: 50, elo: 50, morale: 50, stamina: 100 },
    chapter: 1,
    activeQuests: [
        { id: 'q1', title: 'First Steps', description: 'Reach Chapter 2', targetChapter: 2, isCompleted: false },
        { id: 'q2', title: 'The Grind', description: 'Reach Chapter 5', targetChapter: 5, isCompleted: false },
        { id: 'q3', title: 'The Finale', description: 'Reach Chapter 10', targetChapter: 10, isCompleted: false },
    ],
    unlockedCGs: [],
    history: []
};

export function useStory() {
    const [storedState, setStoredState] = useLocalStorage<StoryState>('mq_story_state', initialState);

    // Fallback for existing users who don't have activeQuests in their local storage
    const state = {
        ...storedState,
        activeQuests: storedState.activeQuests || initialState.activeQuests
    };

    const setState = setStoredState;

    const currentScene = scenes[state.currentSceneId] || scenes['start'];

    const advanceStory = (nextSceneId: string, statEffects: Partial<StoryStats>) => {
        setState(prev => {
            const newStats = { ...prev.stats };
            Object.entries(statEffects).forEach(([key, value]) => {
                const k = key as keyof StoryStats;
                newStats[k] = Math.min(100, Math.max(0, (newStats[k] || 0) + (value || 0)));
            });

            const newUnlockedCGs = [...prev.unlockedCGs];
            const scene = scenes[nextSceneId];
            if (scene?.cgImage && !newUnlockedCGs.includes(scene.cgImage)) {
                newUnlockedCGs.push(scene.cgImage);
            }

            const newChapter = prev.chapter + 1;
            const currentQuests = prev.activeQuests || initialState.activeQuests || [];
            const updatedQuests = currentQuests.map(q => ({
                ...q,
                isCompleted: q.isCompleted || newChapter >= q.targetChapter
            }));

            return {
                ...prev,
                currentSceneId: nextSceneId,
                stats: newStats,
                chapter: newChapter,
                activeQuests: updatedQuests,
                unlockedCGs: newUnlockedCGs,
                history: [...prev.history, nextSceneId]
            };
        });
    };

    const getEnding = (): Ending => {
        const { gpa, elo, morale } = state.stats;
        if (gpa > 80 && elo > 80) return 'LEGEND';
        if (gpa > 80) return 'SCHOLAR';
        if (elo > 80) return 'PRO_Gamer';
        if (gpa < 30 || elo < 30 || morale < 30) return 'DROPOUT';
        return 'AVERAGE';
    };

    const resetStory = () => setState(initialState);

    return {
        state,
        currentScene,
        advanceStory,
        getEnding,
        resetStory
    };
}
