import { NOTES } from '@/entities/note/model/notes';
import { INTERVAL_TYPES } from '../data/interval-types';
import type { Interval } from '../model/types';

let previousPairId: string | null = null;

export const generateInterval = (): Interval => {
  const intervalType = INTERVAL_TYPES[Math.floor(Math.random() * INTERVAL_TYPES.length)];

  const direction = Math.random() < 0.5 ? 1 : -1;

  const possiblePairs = NOTES.flatMap((firstNote) => {
    const secondIndex = firstNote.index + intervalType.semitones * direction;

    const secondNote = NOTES.find((note) => note.index === secondIndex);

    if (!secondNote) return [];

    const pairId = [firstNote.id, secondNote.id].sort().join('-');

    if (pairId === previousPairId) return [];

    return [
      {
        firstNote,
        secondNote,
        pairId,
      },
    ];
  });

  if (possiblePairs.length === 0) {
    throw new Error(`Cannot generate interval: ${intervalType.name}`);
  }

  const selectedPair = possiblePairs[Math.floor(Math.random() * possiblePairs.length)];

  previousPairId = selectedPair.pairId;

  return {
    id: intervalType.id,
    name: intervalType.name,
    notes: [selectedPair.firstNote, selectedPair.secondNote],
  };
};
