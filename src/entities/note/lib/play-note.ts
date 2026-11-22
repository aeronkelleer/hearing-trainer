import { playNotes } from '@/shared/lib/audio/play-notes';
import type { Note } from '../model/types';

export const playNote = (note: Note): Promise<void> => {
  return playNotes([note.audio]);
};
