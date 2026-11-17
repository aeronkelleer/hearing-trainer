import IntervalQuiz from '@/features/interval-quiz/ui/interval-quiz';
import s from './home-page.module.scss';

export default function HomePage() {
  return (
    <main className={s['home-page']}>
      <IntervalQuiz />
    </main>
  );
}
