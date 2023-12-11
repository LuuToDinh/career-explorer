import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { storage } from './services/storage';
import { decodeJwt } from './utils/deCode';
import { UserActionLogout, UserActionRefreshToken } from './redux/actions/UserAction';

// ----------------------------------------------------------------------

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!storage.getCache('access_token')) return;

    const { exp } = decodeJwt(storage.getCache('access_token'));
    const refreshToken = storage.getCache('refresh_token');

    const currTimestamp = Math.floor(Date.now() / 1000);

    if (Math.abs(currTimestamp * 1000 - exp * 1000) / (24 * 60 * 60 * 1000) > 30) {
      dispatch(UserActionLogout());
      return;
    }

    if (exp < currTimestamp) {
      dispatch(UserActionRefreshToken(refreshToken));
    }
  }, []);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
