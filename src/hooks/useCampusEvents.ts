import { useLocalStorage } from './useLocalStorage';
import { TournamentEvent } from '../types';
import { initialEvents } from '../data/events';

export function useCampusEvents() {
  return useLocalStorage<TournamentEvent[]>('mq_events', initialEvents);
}
