import { TournamentEvent } from '../types';

export const events: TournamentEvent[] = [
    {
        id: 'e1',
        title: 'Valorant Pasig Open',
        game: 'Valorant',
        date: '2026-05-15',
        time: '14:00',
        prizePool: '₱50,000',
        participants: 45,
        maxParticipants: 64,
        status: 'UPCOMING',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
        location: { x: 25, y: 30 },
        description: 'The biggest Valorant tournament in the metro. Register your team now!'
    },
    {
        id: 'e2',
        title: 'League of Legends City Cup',
        game: 'League of Legends',
        date: '2026-05-20',
        time: '10:00',
        prizePool: '₱35,000',
        participants: 32,
        maxParticipants: 32,
        status: 'ONGOING',
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2070&auto=format&fit=crop',
        location: { x: 60, y: 45 },
        description: 'Clash of the titans in the Rift. Watch live stream on our platform.'
    },
    {
        id: 'e3',
        title: 'CS:GO Veterans Brawl',
        game: 'CS:GO',
        date: '2026-05-28',
        time: '18:00',
        prizePool: '₱20,000',
        participants: 12,
        maxParticipants: 16,
        status: 'UPCOMING',
        image: 'https://images.unsplash.com/photo-1552824236-07764611de65?q=80&w=2070&auto=format&fit=crop',
        location: { x: 15, y: 70 },
        description: 'For the old school gamers. No flashy skins, just pure skill.'
    },
    {
        id: 'e4',
        title: 'Apex Legends Trio Trials',
        game: 'Apex Legends',
        date: '2026-06-05',
        time: '15:00',
        prizePool: '₱15,000',
        participants: 60,
        maxParticipants: 60,
        status: 'COMPLETED',
        image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=2078&auto=format&fit=crop',
        location: { x: 80, y: 20 },
        description: 'Fast-paced action in the Canyon. Congratulations to Team Wraith for the win!'
    },
    {
        id: 'e5',
        title: 'Dota 2 community Rumble',
        game: 'Dota 2',
        date: '2026-06-12',
        time: '12:00',
        prizePool: '₱25,000',
        participants: 20,
        maxParticipants: 40,
        status: 'UPCOMING',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
        location: { x: 45, y: 85 },
        description: 'Join the community for a weekend of Dota. Team registration open.'
    },
    {
        id: 'e6',
        title: 'Overwatch 2 Sky High',
        game: 'Overwatch 2',
        date: '2026-06-20',
        time: '16:00',
        prizePool: '₱30,000',
        participants: 10,
        maxParticipants: 24,
        status: 'UPCOMING',
        image: 'https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?q=80&w=2066&auto=format&fit=crop',
        location: { x: 70, y: 75 },
        description: 'Hero shooters unite. Prove your worth in the arena.'
    }
];
