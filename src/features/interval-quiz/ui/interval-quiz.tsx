import { INTERVALS } from '@/entities/interval/data/intervals';
import { TaskStatus } from '@/shared/model/enums';
import Quiz from '@/shared/ui/quiz/quiz';
import { useIntervalQuiz } from '../model/use-interval-quiz';
import s from './interval-quiz.module.scss';

export default function IntervalQuiz() {
  const { currentValue, status, play, guessInterval, stats } = useIntervalQuiz();

  return (
    <Quiz
      className={s['interval-quiz']}
      modifier='intervals'
      value={currentValue?.name ?? ''}
      answers={INTERVALS}
      status={status}
      getAnswerKey={(interval) => interval.id}
      getAnswerLabel={(interval) => interval.name}
      onPlay={play}
      onGuess={guessInterval}
      disabled={!currentValue || status !== TaskStatus.PLAYING}
      stats={stats}
    />
  );
}
