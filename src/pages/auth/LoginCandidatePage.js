import { Helmet } from 'react-helmet-async';
import { useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, styled, Alert, Snackbar } from '@mui/material';
import LoadingPage from '../../components/Loading/Loading';

import { LoginFormCandidate } from '../../sections/auth/login';
import { candidateActionLogin } from '../../redux/actions/UserAction';
import { storage } from '../../services/storage';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    background: '#fff',
  },
}));

const StyledContent = styled('div')(() => ({
  minxWidth: 480,
  margin: ' 1em auto',
  display: 'flex',
  justifyContent: 'center',
  height: 'fit-content',
  flexDirection: 'column',
  padding: '1rem',

  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;',
}));

const StyledTypography = styled(Typography)({
  marginBottom: '40px',
  textAlign: 'center',
});

const StyledColorTypography = styled(StyledTypography)({
  marginBottom: '40px',
  textAlign: 'center',
  color: '#0d4275',
});

function LoginCandidatePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [Announce, setAnnounce] = useState({
    announce: '',
  });
  const token = useSelector((state) => state.session.token || storage.getCache('access_token'));
  useEffect(() => {
    if (token) {
      navigate('/candidate', { replace: true });
    }
  }, [token, navigate]);

  const handleLogin = async (username, password) => {
    setLoading(true);
    try {
      const response = await dispatch(candidateActionLogin(username, password));
      if (response) setLoading(false);

    } catch (announce) {
      setLoading(false);
      setAnnounce({ announce: t('thongbao')  });
  
    }
  };
  const handleClose =()=>{
    setAnnounce({announce: ''})
  }
  return (
    <>
      <Helmet>
        <title>{t('signUp.login')}</title>
      </Helmet>
      {loading ? (
          <LoadingPage />
        ) : (
      <StyledRoot>
        <Snackbar open={Boolean(Announce.announce)} onClose={handleClose} autoHideDuration={2000}>
              <Alert elevation={6} variant="filled" severity={'error'}>
                {Announce.announce}
              </Alert>
        </Snackbar>
        <Container maxWidth="sm">
          <StyledContent>
            <StyledColorTypography variant="h3" gutterBottom>
              {t('signUp.logInTo')}
            </StyledColorTypography>

            <LoginFormCandidate onhandleLogin={handleLogin} />
            <StyledTypography variant="body2">
              {t('khongco')} {''}
              <Link to="/candidate/register" variant="subtitle2">
                {t('batdau')} {''}
              </Link>
            </StyledTypography>
          </StyledContent>
        </Container>
      </StyledRoot>
        )}
    </>
  );
}

export default LoginCandidatePage;
