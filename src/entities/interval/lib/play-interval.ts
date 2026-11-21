import type { Note } from '@/entities/note/model/types';
import type { Interval } from '../model/types';

const DURATION = 3;
const FADE_DURATION = 0.5;
const STOP_FADE_DURATION = 0.03;

let audioContext: AudioContext | null = null;
let playbackId = 0;

const audioBuffers = new Map<string, Promise<AudioBuffer>>();

let activePlayback: {
  sources: AudioBufferSourceNode[];
  gain: GainNode;
} | null = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new AudioContext();
  }

  return audioContext;
};

const getAudioBuffer = (note: Note): Promise<AudioBuffer> => {
  const cached = audioBuffers.get(note.audio);

  if (cached) return cached;

  const context = getAudioContext();

  const bufferPromise = fetch(note.audio)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load audio: ${note.audio}`);
      }

      return response.arrayBuffer();
    })
    .then((buffer) => context.decodeAudioData(buffer));

  audioBuffers.set(note.audio, bufferPromise);

  return bufferPromise;
};

const stopPreviousPlayback = () => {
  if (!activePlayback || !audioContext) return;

  const { sources, gain } = activePlayback;
  const now = audioContext.currentTime;

  gain.gain.cancelScheduledValues(now);
  gain.gain.setValueAtTime(gain.gain.value, now);
  gain.gain.linearRampToValueAtTime(0, now + STOP_FADE_DURATION);

  sources.forEach((source) => {
    try {
      source.stop(now + STOP_FADE_DURATION);
    } catch {
      // Source may already be stopped.
    }
  });

  activePlayback = null;
};

export const playInterval = async (interval: Interval): Promise<void> => {
  const currentPlaybackId = ++playbackId;

  stopPreviousPlayback();

  try {
    const context = getAudioContext();

    await context.resume();

    const buffers = await Promise.all(interval.notes.map(getAudioBuffer));

    // Ignore outdated requests if another interval was started.
    if (currentPlaybackId !== playbackId) return;

    const gain = context.createGain();
    gain.connect(context.destination);

    const sources = buffers.map((buffer) => {
      const source = context.createBufferSource();

      source.buffer = buffer;
      source.connect(gain);

      return source;
    });

    const startTime = context.currentTime;

    gain.gain.setValueAtTime(1, startTime);
    gain.gain.setValueAtTime(1, startTime + DURATION - FADE_DURATION);
    gain.gain.linearRampToValueAtTime(0, startTime + DURATION);

    activePlayback = { sources, gain };

    sources.forEach((source) => {
      source.start(startTime);
      source.stop(startTime + DURATION);
    });

    sources[sources.length - 1].onended = () => {
      if (currentPlaybackId === playbackId) {
        activePlayback = null;
      }
    };
  } catch (error) {
    if (currentPlaybackId === playbackId) {
      console.error('Failed to play interval:', error);
    }
  }
};
