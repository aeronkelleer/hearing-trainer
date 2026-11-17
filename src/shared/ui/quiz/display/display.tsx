import type { TaskStatus } from '@/shared/model/enums';
import clsx from 'clsx';
import PlayButton from '../play-button/play-button';
import s from './display.module.scss';

// $======================== Display ========================$ //

interface DisplayProps {
  status: TaskStatus;
  value: string;
  onPlay: () => void;
}

export default function Display(props: DisplayProps) {
  const { status, value, onPlay } = props;

  return (
    <div className={s.display}>
      <div className={clsx(s.value, s[`_${status.toLowerCase()}`])}>{value}</div>
      <PlayButton onClick={onPlay} />
    </div>
  );
}
