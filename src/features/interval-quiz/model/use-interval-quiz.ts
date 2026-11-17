import { INTERVALS } from '@/entities/interval/data/intervals';
import type { Interval } from '@/entities/interval/model/types';
import { QuizStatus } from '@/shared/ui/quiz/enums';
import { useState } from 'react';

export function useIntervalQuiz() {
  const [currentValue, setCurrentValue] = useState<Interval | null>(null);

  const [status, setStatus] = useState<QuizStatus>(QuizStatus.UNKNOWN);

  const startQuiz = () => {
    const randomIndex = Math.floor(Math.random() * INTERVALS.length);
    const nextValue = INTERVALS[randomIndex];

    if (!nextValue) return;

    setCurrentValue(nextValue);
    setStatus(QuizStatus.UNKNOWN);
  };

  const guessInterval = (interval: Interval) => {
    if (!currentValue || status === QuizStatus.CORRECT) return;

    setStatus(interval.id === currentValue.id ? QuizStatus.CORRECT : QuizStatus.WRONG);
  };

  return {
    currentValue,
    status,
    startQuiz,
    guessInterval,
  };
}
