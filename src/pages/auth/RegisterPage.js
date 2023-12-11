import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Container, Typography, styled } from '@mui/material';
import { RegisterFormCandidate} from '../../sections/auth/login';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    background: '#fff',
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  minxWidth: 480,
  margin: ' 3em auto',
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
  color: '#0d4275'
});

function RegisterCandidatePage() {
const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title> {t('Navbar.registerbtn')}</title>
      </Helmet>
      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent>
            <StyledColorTypography variant="h3" gutterBottom>
              {t('signIn.registerTo')}
            </StyledColorTypography>
            <RegisterFormCandidate />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}

export default RegisterCandidatePage;
