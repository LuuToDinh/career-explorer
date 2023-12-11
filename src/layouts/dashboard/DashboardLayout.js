import { useEffect, useState, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// @mui
import { styled } from '@mui/material/styles';
//
import LoadingPage from '../../components/Loading/Loading';
import { UserActionLogout } from '../../redux/actions/UserAction';

import Header from './header';
import Nav from './nav';
import navConfig from './nav/config';
import { decodeJwt } from '../../utils/deCode';
import { storage } from '../../services/storage';
import SvgColor from '../../components/svg-color';

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [navigation, setNavigation] = useState(navConfig);
  const [openLoading, setOpenLoading] = useState(false);
  const timeOutId = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    return () => {
      if (timeOutId.current) {
        clearTimeout(timeOutId.current);
      }
    };
  }, []);
  useEffect(() => {
    const token = storage.getCache('access_token');
    let role = '';
    if (token) {
      const { Roles } = decodeJwt(token);
      role = Roles[0];
    }
    const navTemp = [
      ...navConfig,
      ...(role !== 'RECRUITMENTER' ? [{
        title: t('dashboadNavbar.account'),
        path: '/dashboard/accounts',
        icon: icon('ic_disabled'),
      }] : [])
    ];
    setNavigation(navTemp);
  }, []);
  const handleLogOut = async () => {
    setOpenLoading(true);
    await dispatch(UserActionLogout());
    timeOutId.current = setTimeout(() => {
      setOpenLoading(false);
      navigate('/dashboard');
    }, 1000);
  };
  if (openLoading) {
    return <LoadingPage />;
  }
  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} onhandleLogout={handleLogOut} />

      <Nav openNav={open} test={navigation} onCloseNav={() => setOpen(false)} />

      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  );
}
