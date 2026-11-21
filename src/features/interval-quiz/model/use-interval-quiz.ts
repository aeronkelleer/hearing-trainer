import type { IntervalType } from '@/entities/interval/data/interval-types';
import { generateInterval } from '@/entities/interval/lib/generate-interval';
import { playInterval } from '@/entities/interval/lib/play-interval';
import { TaskStatus } from '@/shared/model/enums';
import { useQuizSession } from '@/shared/model/use-quiz-session';
import { useQuizStats } from '@/shared/model/use-quiz-stats';

export function useIntervalQuiz() {
  const { stats, addCorrect, addWrong } = useQuizStats();

  const { currentValue, status, play, finish } = useQuizSession({
    getRandomValue: generateInterval,
    onPlay: playInterval,
    onCorrect: addCorrect,
    onWrong: addWrong,
  });

  const guessInterval = (interval: IntervalType) => {
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
