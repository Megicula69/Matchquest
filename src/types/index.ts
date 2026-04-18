export type GameMode = 'COMP' | 'SOCIAL' | 'DUO';
export type EventStatus = 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'REGISTERED';
export type StoryMode = 'GPA' | 'ELO' | 'MORALE' | 'STAMINA';
export type Ending = 'SCHOLAR' | 'PRO_Gamer' | 'LEGEND' | 'DROPOUT' | 'AVERAGE';

export interface Player {
    id: string;
    username: string;
    avatar: string;
    rank: string;
    favoriteGame: string;
    reputation: number;
    micRequired: boolean;
    localArea: boolean;
    arenaScore: number;
    stats: {
        kda: string;
        winRate: string;
        tournaments: number;
    };
    bio: string;
}

export interface TournamentEvent {
    id: string;
    title: string;
    game: string;
    date: string;
    time: string;
    prizePool: string;
    participants: number;
    maxParticipants: number;
    status: EventStatus;
    image: string;
    location: { x: number; y: number }; // Percentage for map pin
    description: string;
}

export interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    text: string;
    timestamp: string;
}

export interface StoryStats {
    gpa: number;
    elo: number;
    morale: number;
    stamina: number;
}

export interface StoryChoice {
    text: string;
    nextSceneId: string;
    effects: Partial<StoryStats>;
}

export interface StoryScene {
    id: string;
    location: string;
    npcName: string;
    dialogue: string;
    choices: StoryChoice[];
    cgImage?: string;
}

export interface StoryQuest {
    id: string;
    title: string;
    description: string;
    targetChapter: number;
    isCompleted: boolean;
}

export interface StoryState {
    currentSceneId: string;
    stats: StoryStats;
    chapter: number;
    activeQuests: StoryQuest[];
    unlockedCGs: string[];
    history: string[];
}

export interface UserProfile {
    username: string;
    favoriteGame: string;
    arenaScore: number;
    rank: string;
    stats: ArenaStats;
    onboarded: boolean;
}

export interface ArenaStats {
    kda: string;
    winRate: string;
    tournaments: number;
    reputation: number;
}

export interface TeamRegistration {
    teamName: string;
    roster: string[];
    eventId: string;
}

export interface BracketMatch {
    id: string;
    team1: string;
    team2: string;
    score1?: number;
    score2?: number;
    winner?: string;
    round: number;
    nextMatchId?: string;
}
