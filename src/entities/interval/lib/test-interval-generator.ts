import { generateInterval } from './generate-interval';

export const testIntervalGenerator = () => {
  const TOTAL = 10_000;

  const intervalCounts = new Map<string, number>();
  const noteCounts = new Map<string, number>();

  let previousPair = '';
  let repeatedPairs = 0;

  for (let i = 0; i < TOTAL; i++) {
    const interval = generateInterval();

    // Статистика типов интервалов
    intervalCounts.set(
      interval.name,
      (intervalCounts.get(interval.name) ?? 0) + 1,
    );

    // Статистика отдельных нот
    interval.notes.forEach((note) => {
      noteCounts.set(
        note.id,
        (noteCounts.get(note.id) ?? 0) + 1,
      );
    });

    // Проверка повторяющихся пар
    const pairId = interval.notes
      .map((note) => note.id)
      .sort()
      .join('-');

    if (pairId === previousPair) {
      repeatedPairs++;
    }

    previousPair = pairId;
  }

  console.log('=== INTERVAL DISTRIBUTION ===');

  console.table(
    [...intervalCounts].map(([name, count]) => ({
      name,
      count,
      percent: `${((count / TOTAL) * 100).toFixed(2)}%`,
    })),
  );

  console.log('=== NOTE DISTRIBUTION ===');

  console.table(
    [...noteCounts].map(([note, count]) => ({
      note,
      count,
    })),
  );

  console.log('Repeated consecutive pairs:', repeatedPairs);
};