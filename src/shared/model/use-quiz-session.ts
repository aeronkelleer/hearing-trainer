import { useState } from 'react';
import { TaskStatus } from './enums';

interface UseQuizSessionProps<T> {
  getRandomValue: () => T;
  onPlay?: (value: T) => void;
  onCorrect?: () => void;
  onWrong?: () => void;
}

export const useQuizSession = <T>({ getRandomValue, onPlay, onCorrect, onWrong }: UseQuizSessionProps<T>) => {
  const [currentValue, setCurrentValue] = useState<T | null>(null);
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.IDLE);

  const play = () => {
    let nextValue = currentValue;

    if (status !== TaskStatus.PLAYING || !currentValue) {
      nextValue = getRandomValue();

      setCurrentValue(nextValue);
      setStatus(TaskStatus.PLAYING);
    }

    if (nextValue !== null) {
      onPlay?.(nextValue);
    }
  };

  const finish = (isCorrect: boolean) => {
    if (status !== TaskStatus.PLAYING) return;

    setStatus(isCorrect ? TaskStatus.CORRECT : TaskStatus.WRONG);

    if (isCorrect) {
      onCorrect?.();
    } else {
      onWrong?.();
    }
  };

  return { currentValue, status, play, finish };
};
