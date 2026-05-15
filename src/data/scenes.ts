import { StoryScene } from '../types';

export const scenes: Record<string, StoryScene> = {
    'start': {
        id: 'start',
        location: 'MatchQuest University',
        npcName: 'Dr. Aris',
        dialogue: "Welcome to MatchQuest University, Initiate. Here, the boundary between academics and arena glory is paper-thin. You have the spark, but the grind will test your soul. Where does your journey begin?",
        choices: [
            { text: 'Enter the Training Lab', nextSceneId: 'lab-1', effects: { elo: 10, stamina: -5 } },
            { text: 'Visit the Great Library', nextSceneId: 'library-1', effects: { gpa: 10, morale: -5 } },
            { text: 'Relax in the Student Lounge', nextSceneId: 'lounge-1', effects: { morale: 10, elo: -5 } }
        ],
        cgImage: '/assets/story/entrance.png'
    },
    'lab-1': {
        id: 'lab-1',
        location: 'Neon Training Lab',
        npcName: 'Coach Jax',
        dialogue: "Eyes on the HUD, rookie. In this lab, we don't just play—we optimize. Your reaction time is 15ms slow. Want to run the elite reflex drill?",
        choices: [
            { text: 'Hardcore Training', nextSceneId: 'lab-2', effects: { elo: 15, stamina: -15 } },
            { text: 'Tactical Observation', nextSceneId: 'lab-2', effects: { elo: 5, morale: 5 } }
        ],
        cgImage: '/assets/story/lab.png'
    },
    'library-1': {
        id: 'library-1',
        location: 'Digital Archives',
        npcName: 'Archivist Sarah',
        dialogue: "Knowledge is the ultimate macro-play. The history of the Arena is written in these holographic scrolls. Will you join our theory-crafting session?",
        choices: [
            { text: 'Analyze Pro VODs', nextSceneId: 'library-2', effects: { gpa: 15, elo: 5 } },
            { text: 'Study Core Subjects', nextSceneId: 'library-2', effects: { gpa: 20, stamina: -10 } }
        ],
        cgImage: '/assets/story/library.png'
    },
    'lounge-1': {
        id: 'lounge-1',
        location: 'The Oasis Lounge',
        npcName: 'Socialize Sam',
        dialogue: "Yo! You look stressed. We're hosting a casual 1v1 Smash tourney in the Oasis. High stakes, low pressure. You in or what?",
        choices: [
            { text: 'Join the Tournament', nextSceneId: 'lounge-2', effects: { morale: 15, stamina: -5 } },
            { text: 'Just Vibe', nextSceneId: 'lounge-2', effects: { morale: 10, gpa: -2 } }
        ],
        cgImage: '/assets/story/lounge.png'
    },
    'lab-2': {
        id: 'lab-2',
        location: 'Training Lab',
        npcName: 'Coach Jax',
        dialogue: 'Good work. You are improving. But your grades are slipping. What now?',
        choices: [
            { text: 'One more round', nextSceneId: 'checkpoint-1', effects: { elo: 10, gpa: -5 } },
            { text: 'Head to class', nextSceneId: 'checkpoint-1', effects: { gpa: 10, elo: -2 } }
        ],
        cgImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200'
    },
    'library-2': {
        id: 'library-2',
        location: 'The Library',
        npcName: 'Librarian Sarah',
        dialogue: 'You are very diligent. Do not forget to eat and sleep though.',
        choices: [
            { text: 'Lunch break', nextSceneId: 'checkpoint-1', effects: { stamina: 15, morale: 5 } },
            { text: 'Keep grinding', nextSceneId: 'checkpoint-1', effects: { gpa: 15, stamina: -20 } }
        ],
        cgImage: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1200'
    },
    'lounge-2': {
        id: 'lounge-2',
        location: 'Student Lounge',
        npcName: 'Socialize Sam',
        dialogue: 'That was awesome! You have a natural vibe. Big party tonight, coming?',
        choices: [
            { text: 'Party time', nextSceneId: 'checkpoint-1', effects: { morale: 20, gpa: -10 } },
            { text: 'Rest up', nextSceneId: 'checkpoint-1', effects: { stamina: 20, morale: -5 } }
        ],
        cgImage: 'https://images.unsplash.com/photo-1525184990505-bb34aba3f5c0?auto=format&fit=crop&q=80&w=1200'
    },
    'checkpoint-1': {
        id: 'checkpoint-1',
        location: 'Dorm Room',
        npcName: 'Internal Monologue',
        dialogue: 'The first week is over. I need to decide my path for the regional qualifiers.',
        choices: [
            { text: 'Hardcore Training', nextSceneId: 'final-choice', effects: { elo: 20, stamina: -20, gpa: -10 } },
            { text: 'Balanced Life', nextSceneId: 'final-choice', effects: { elo: 10, gpa: 10, morale: 10 } },
            { text: 'Social Networking', nextSceneId: 'final-choice', effects: { morale: 20, elo: 5, gpa: -5 } }
        ],
        cgImage: 'https://images.unsplash.com/photo-1555854817-5b2247a8175f?auto=format&fit=crop&q=80&w=1200'
    },
    'final-choice': {
        id: 'final-choice',
        location: 'Arena Stage',
        npcName: 'Announcer',
        dialogue: 'And the final match of the season begins! Everything has led to this moment.',
        choices: [
            { text: 'For the Glory', nextSceneId: 'ending', effects: { elo: 30, morale: 30 } },
            { text: 'For the Future', nextSceneId: 'ending', effects: { gpa: 30, stamina: 30 } }
        ],
        cgImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1200'
    },
    'ending': {
        id: 'ending',
        location: 'Graduation Hall',
        npcName: 'Dr. Aris',
        dialogue: 'The journey ends here. Let us see how you fared in the Arena of Life.',
        choices: [],
        cgImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200'
    }
};
