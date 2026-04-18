import { StoryScene } from '../types';

export const scenes: Record<string, StoryScene> = {
    'start': {
        id: 'start',
        location: 'Campus Entrance',
        npcName: 'Dr. Aris',
        dialogue: 'Welcome to MatchQuest University, kid. You have the potential to be a legend, but balance is key. Where will you head first?',
        choices: [
            { text: 'The Training Lab', nextSceneId: 'lab-1', effects: { elo: 10, stamina: -5 } },
            { text: 'The Library', nextSceneId: 'library-1', effects: { gpa: 10, morale: -5 } },
            { text: 'The Student Lounge', nextSceneId: 'lounge-1', effects: { morale: 10, elo: -5 } }
        ]
    },
    'lab-1': {
        id: 'lab-1',
        location: 'Training Lab',
        npcName: 'Coach Jax',
        dialogue: 'Focus on your mechanics. Accuracy is everything. Want to join the 1v1 drill?',
        choices: [
            { text: 'Go all out', nextSceneId: 'lab-2', effects: { elo: 15, stamina: -15 } },
            { text: 'Observe others', nextSceneId: 'lab-2', effects: { elo: 5, morale: 5 } }
        ]
    },
    'library-1': {
        id: 'library-1',
        location: 'The Library',
        npcName: 'Librarian Sarah',
        dialogue: 'Shh! Students are studying for the midterms. Care to join the study group?',
        choices: [
            { text: 'Focus on E-sports History', nextSceneId: 'library-2', effects: { gpa: 15, elo: 2 } },
            { text: 'Study Calculus', nextSceneId: 'library-2', effects: { gpa: 20, stamina: -10 } }
        ]
    },
    'lounge-1': {
        id: 'lounge-1',
        location: 'Student Lounge',
        npcName: 'Socialize Sam',
        dialogue: 'Hey! We are starting a casual Smash Bros tournament. In?',
        choices: [
            { text: 'Join the fun', nextSceneId: 'lounge-2', effects: { morale: 15, stamina: -5 } },
            { text: 'Just chat', nextSceneId: 'lounge-2', effects: { morale: 10, gpa: -2 } }
        ]
    },
    'lab-2': {
        id: 'lab-2',
        location: 'Training Lab',
        npcName: 'Coach Jax',
        dialogue: 'Good work. You are improving. But your grades are slipping. What now?',
        choices: [
            { text: 'One more round', nextSceneId: 'checkpoint-1', effects: { elo: 10, gpa: -5 } },
            { text: 'Head to class', nextSceneId: 'checkpoint-1', effects: { gpa: 10, elo: -2 } }
        ]
    },
    'library-2': {
        id: 'library-2',
        location: 'The Library',
        npcName: 'Librarian Sarah',
        dialogue: 'You are very diligent. Do not forget to eat and sleep though.',
        choices: [
            { text: 'Lunch break', nextSceneId: 'checkpoint-1', effects: { stamina: 15, morale: 5 } },
            { text: 'Keep grinding', nextSceneId: 'checkpoint-1', effects: { gpa: 15, stamina: -20 } }
        ]
    },
    'lounge-2': {
        id: 'lounge-2',
        location: 'Student Lounge',
        npcName: 'Socialize Sam',
        dialogue: 'That was awesome! You have a natural vibe. Big party tonight, coming?',
        choices: [
            { text: 'Party time', nextSceneId: 'checkpoint-1', effects: { morale: 20, gpa: -10 } },
            { text: 'Rest up', nextSceneId: 'checkpoint-1', effects: { stamina: 20, morale: -5 } }
        ]
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
        ]
    },
    'final-choice': {
        id: 'final-choice',
        location: 'Arena Stage',
        npcName: 'Announcer',
        dialogue: 'And the final match of the season begins! Everything has led to this moment.',
        choices: [
            { text: 'For the Glory', nextSceneId: 'ending', effects: { elo: 30, morale: 30 } },
            { text: 'For the Future', nextSceneId: 'ending', effects: { gpa: 30, stamina: 30 } }
        ]
    },
    'ending': {
        id: 'ending',
        location: 'Graduation Hall',
        npcName: 'Dr. Aris',
        dialogue: 'The journey ends here. Let us see how you fared in the Arena of Life.',
        choices: []
    }
};
