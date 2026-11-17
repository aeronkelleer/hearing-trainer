import type { TaskStatus } from '@/shared/model/enums';
import clsx from 'clsx';
import { type ReactNode } from 'react';
import Stats from '../stats/stats';
import Display from './display/display';
import s from './quiz.module.scss';

// $======================== Quiz ========================$ //

interface QuizStats {
  correct: number;
  wrong: number;
}

interface QuizProps<T> {
  value: string;
  answers: T[];
  status: TaskStatus;
  className: string;
  modifier?: string;
  getAnswerLabel: (answer: T) => ReactNode;
  onPlay: () => void;
  onGuess: (answer: T) => void;
  getAnswerKey: (answer: T) => React.Key;
  disabled?: boolean;
  stats: QuizStats;
}

export default function Quiz<T>(props: QuizProps<T>) {
  const {
    answers,
    className,
    modifier,
    getAnswerLabel,
    onGuess,
    onPlay,
    status,
    value,
    disabled,
    getAnswerKey,
    stats,
  } = props;

  return (
    <div className={clsx(s.quiz, className ?? '', s[`_${modifier}`])}>
      <Stats {...stats} />
      <Display status={status} value={value} onPlay={onPlay} />
      <ul className={s.answers}>
        {answers.map((answer) => (
          <li key={getAnswerKey(answer)} className={s.answer}>
            <button className={s['answer-button']} onClick={() => onGuess(answer)} disabled={disabled}>
              {getAnswerLabel(answer)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
