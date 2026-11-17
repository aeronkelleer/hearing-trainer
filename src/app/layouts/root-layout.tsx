import Wrapper from '@/shared/ui/wrapper/wrapper';
import { Outlet } from 'react-router-dom';

// $======================== RootLayout ========================$ //

export default function RootLayout(): React.JSX.Element {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
}
