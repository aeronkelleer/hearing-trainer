const audioFiles = import.meta.glob<string>('../audio/*.mp3', {
  eager: true,
  query: '?url',
  import: 'default',
});

export const NOTES = Object.entries(audioFiles)
  .map(([path, audio]) => {
    const filename = path.split('/').pop()!;
    const match = filename.match(/^(\d+)\.(\d+)\.([A-G]s?)\.mp3$/);

    if (!match) {
      throw new Error(`Invalid note filename: ${filename}`);
    }

    const [, octave, semitone, name] = match;

    return {
      id: `${octave}.${semitone}`,
      octave: Number(octave),
      semitone: Number(semitone),
      index: (Number(octave) - 1) * 12 + Number(semitone),
      name,
      audio,
    };
  })
  .filter(({ octave }) => octave >= 2 && octave <= 6);
