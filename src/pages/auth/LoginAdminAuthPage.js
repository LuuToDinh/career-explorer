  /*eslint-disable*/
  import { Helmet } from 'react-helmet-async';
  import { styled } from '@mui/material/styles';
  import { Container, Typography, Alert, Snackbar } from '@mui/material';
  import { useDispatch, useSelector } from 'react-redux';
  import { useNavigate } from 'react-router-dom';
  import { useEffect, useState } from 'react';
  import useResponsive from '../../hooks/useResponsive';
  import { useTranslation } from 'react-i18next';
  import LoadingPage from '../../components/Loading/Loading';
  import { LoginFormAdmin } from '../../sections/auth/login';
  import { UserActionLogin } from '../../redux/actions/UserAction';
  import { storage } from '../../services/storage';
  import { decodeJwt } from '../../utils/deCode';
  // ----------------------------------------------------------------------

  const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      background: '#fff',
    },
  }));

  const StyledSection = styled('div')(({ theme }) => ({
    width: '100%',
    maxWidth: 480,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: theme.customShadows.card,
    backgroundColor: theme.palette.background.default,
  }));

  const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
  }));

  const Image = styled(StyledSection)({
    backgroundColor: '#fff',
    margin: '10px 0px auto',
    height: '200px',
    objectFit: 'cover',
  });
  function LoginPageAdmin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [Announce, setAnnounce] = useState({
      announce: '',
    });
    const token = useSelector((state) => state.session.token || storage.getCache('access_token'));
    useEffect(() => {
      if (token) {
        const { Roles } = decodeJwt(token);
        if (Roles[0] === 'ADMIN' || Roles[0] === 'RECRUITMENTER') {
          navigate('/dashboard', { replace: true });
        } else if (Roles[0] === 'INTERVIEWER') {
          navigate('/interviewer', { replace: true });
        }
      }
    }, [token, navigate]);

    const handleLogin = async (username, password) => {
      setLoading(true);
      try {
        const response = await dispatch(UserActionLogin(username, password));
        if (response) setLoading(false);
      } catch (announce) {
        setLoading(false);
        setAnnounce({ announce: t('thongbao') });
      }
    };
    const handleClose = ()=>{
      setAnnounce({ announce: '' });

    }
    const mdUp = useResponsive('up', 'md');
    return (
      <div>
        <Helmet>
          <title> {t('signUp.login')} </title>
        </Helmet>
        {loading ? (
          <LoadingPage />
        ) : (
          <StyledRoot>
            <Snackbar open={Boolean(Announce.announce)} autoHideDuration={4000} onClose={handleClose}>
              <Alert elevation={6} variant="filled" severity={'error'}>
                {Announce.announce}
              </Alert>
            </Snackbar>
            <Container maxWidth="sm">
              <StyledContent>
                {mdUp && (
                  <Image>
                    <img src="/assets/logo.jpg" alt="login" />
                  </Image>
                )}
                <Typography variant="h4" gutterBottom>
                  {t('signInAd')}
                </Typography>
                <LoginFormAdmin onhandleLogin={handleLogin} />
              </StyledContent>
            </Container>
          </StyledRoot>
        )}
      </div>
    );
  }
  export default LoginPageAdmin;
