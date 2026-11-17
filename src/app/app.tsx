import { AppRoute } from '@/constants/enums';
import HomePage from '@/pages/home/home-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RootLayout from './layouts/root-layout';
import './styles/index.scss';

// ^======================== App ========================^ //

export default function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path={AppRoute.HOME} element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
