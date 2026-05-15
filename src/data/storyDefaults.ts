import { StoryState } from '../types';

export const initialStoryState: StoryState = {
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