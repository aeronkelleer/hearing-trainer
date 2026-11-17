import clsx from 'clsx';
import s from './stats.module.scss';

// ^======================== Stats ========================^ //

interface StatsProps {
  correct: number;
  wrong: number;
}

export default function Stats(props: StatsProps) {
  const { correct, wrong } = props;
  return (
    <div className={s.stats}>
      <div className={clsx(s.item, s._correct)}>
        <div className={s['item-key']}>Правильных ответов: </div>
        <div className={s['item-value']}>{correct}</div>
      </div>
      <div className={clsx(s.item, s._wrong)}>
        <div className={s['item-key']}>Неправильных ответов: </div>
        <div className={s['item-value']}>{wrong}</div>
      </div>
    </div>
  );
}
