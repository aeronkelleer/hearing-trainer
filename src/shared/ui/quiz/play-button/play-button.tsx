import s from './play-button.module.scss';

// ^======================== PlayButton ========================^ //

interface PlayButtonProps {
  onClick: () => void;
}

export default function PlayButton(props: PlayButtonProps) {
  const { onClick } = props;
  return (
    <button type='button' className={s['play-button']} onClick={onClick}>
      ▶
    </button>
  );
}
