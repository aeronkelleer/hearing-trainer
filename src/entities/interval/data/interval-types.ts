export const INTERVAL_TYPES = [
  { id: 'unison', name: 'Чистая прима', semitones: 0 },
  { id: 'minor-second', name: 'Малая секунда', semitones: 1 },
  { id: 'major-second', name: 'Большая секунда', semitones: 2 },
  { id: 'minor-third', name: 'Малая терция', semitones: 3 },
  { id: 'major-third', name: 'Большая терция', semitones: 4 },
  { id: 'perfect-fourth', name: 'Чистая кварта', semitones: 5 },
  { id: 'perfect-fifth', name: 'Чистая квинта', semitones: 7 },
  { id: 'minor-sixth', name: 'Малая секста', semitones: 8 },
  { id: 'major-sixth', name: 'Большая секста', semitones: 9 },
  { id: 'minor-seventh', name: 'Малая септима', semitones: 10 },
  { id: 'major-seventh', name: 'Большая септима', semitones: 11 },
  { id: 'octave', name: 'Чистая октава', semitones: 12 },
] as const;

export type IntervalType = (typeof INTERVAL_TYPES)[number];
