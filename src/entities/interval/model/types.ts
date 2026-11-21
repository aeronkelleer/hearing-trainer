import type { Note } from '@/entities/note/model/types';

export interface Interval {
  id: string;
  name: string;
  notes: [Note, Note];
}
