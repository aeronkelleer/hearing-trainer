import type { Note } from '../model/types';

export const playNote = (note: Note) => {
  const audio = new Audio(note.audio);

  audio.play().catch((error) => {
    console.error('Failed to play note:', error);
  });
};
