import { UserProfile } from '../types';
import { User } from './users';

const RANKS = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster'];
const ELEMENTS = ['Fire', 'Water', 'Earth', 'Wind', 'Lightning', 'Ice', 'Shadow', 'Light'];
const FAVORITE_GAMES = ['Valorant', 'League of Legends', 'Dota 2', 'Apex Legends', 'Mobile Legends', 'Overwatch 2'];

function hashString(value: string) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash;
}

export function createDefaultProfile(user: Pick<User, 'username' | 'fullName'>): UserProfile {
  const hash = hashString(user.username.toLowerCase());
  const rankTier = RANKS[hash % RANKS.length];
  const element = ELEMENTS[(hash >> 3) % ELEMENTS.length];
  const favoriteGame = FAVORITE_GAMES[(hash >> 5) % FAVORITE_GAMES.length];
  const arenaScore = 1200 + (hash % 900);
  const kda = `${((hash % 4) + 1).toFixed(1)}:${((hash >> 2) % 10) + 1}:${((hash >> 4) % 8) + 1}`;
  const winRate = `${55 + (hash % 35)}%`;
  const tournaments = 4 + (hash % 12);
  const reputation = 60 + (hash % 40);

  return {
    username: user.username,
    favoriteGame,
    arenaScore,
    rank: `${rankTier} ${((hash >> 1) % 4) + 1}`,
    element,
    stats: {
      kda,
      winRate,
      tournaments,
      reputation,
    },
    onboarded: true,
  };
}
