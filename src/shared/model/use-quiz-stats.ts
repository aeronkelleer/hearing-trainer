import { useState } from 'react';

interface QuizStats {
  correct: number;
  wrong: number;
}

const INITIAL_STATS: QuizStats = {
  correct: 0,
  wrong: 0,
};

export function useQuizStats() {
  const [stats, setStats] = useState<QuizStats>(INITIAL_STATS);

  const addCorrect = () => {
    setStats((prev) => ({
      ...prev,
      correct: prev.correct + 1,
    }));
  };

  const addWrong = () => {
    setStats((prev) => ({
      ...prev,
      wrong: prev.wrong + 1,
    }));
  };

  const resetStats = () => {
    setStats(INITIAL_STATS);
  };

  return {
    stats,
    addCorrect,
    addWrong,
    resetStats,
  };
}
