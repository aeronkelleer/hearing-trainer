import { INTERVALS } from '@/entities/interval/data/intervals';
import { QuizStatus } from '@/shared/ui/quiz/enums';
import Quiz from '@/shared/ui/quiz/quiz';
import { useIntervalQuiz } from '../model/use-interval-quiz';
import s from './interval-quiz.module.scss';

export default function IntervalQuiz() {
  const { currentValue, status, startQuiz, guessInterval } = useIntervalQuiz();

  return (
    <Quiz
      className={s['interval-quiz']}
      value={currentValue?.name ?? ''}
      answers={INTERVALS}
      status={status}
      getAnswerKey={(interval) => interval.id}
      getAnswerLabel={(interval) => interval.name}
      onPlay={startQuiz}
      onGuess={guessInterval}
      disabled={!currentValue || status === QuizStatus.CORRECT}
    />
  );
}
