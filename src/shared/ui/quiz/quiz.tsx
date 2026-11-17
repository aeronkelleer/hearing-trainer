import clsx from 'clsx';
import { type ReactNode } from 'react';
import Display from './display/display';
import type { QuizStatus } from './enums';
import s from './quiz.module.scss';

// $======================== Quiz ========================$ //

interface QuizProps<T> {
  value: string;
  answers: T[];
  status: QuizStatus;
  className?: string;
  getAnswerLabel: (answer: T) => ReactNode;
  onPlay: () => void;
  onGuess: (answer: T) => void;
  getAnswerKey: (answer: T) => React.Key;
  disabled?: boolean;
}

export default function Quiz<T>(props: QuizProps<T>) {
  const { answers, className, getAnswerLabel, onGuess, onPlay, status, value, disabled, getAnswerKey } = props;

  return (
    <div className={clsx(s.quiz, className ?? '')}>
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
