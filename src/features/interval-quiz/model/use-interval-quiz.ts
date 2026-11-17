import { INTERVALS } from '@/entities/interval/data/intervals';
import type { Interval } from '@/entities/interval/model/types';
import { TaskStatus } from '@/shared/model/enums';
import { useQuizSession } from '@/shared/model/use-quiz-session';
import { useQuizStats } from '@/shared/model/use-quiz-stats';

export function useIntervalQuiz() {
  const { stats, addCorrect, addWrong } = useQuizStats();

  const { currentValue, status, play, finish } = useQuizSession({
    getRandomValue: () => {
      const randomIndex = Math.floor(Math.random() * INTERVALS.length);
      return INTERVALS[randomIndex];
    },
    onCorrect: addCorrect,
    onWrong: addWrong,
  });

  const guessInterval = (interval: Interval) => {
    if (!currentValue || status !== TaskStatus.PLAYING) return;

    finish(interval.id === currentValue.id);
  };

  return {
    currentValue,
    status,
    stats,
    play,
    guessInterval,
  };
}
