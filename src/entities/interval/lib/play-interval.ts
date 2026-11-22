import { playNotes } from '@/shared/lib/audio/play-notes';
import type { Interval } from '../model/types';

export const playInterval = (interval: Interval): Promise<void> => {
  return playNotes(interval.notes.map((note) => note.audio));
};
