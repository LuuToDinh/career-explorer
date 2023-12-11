import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Typography, styled, Stack, TextField, Button, Snackbar, Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { ForgotPassWordAction } from '../../redux/actions/ForgotPassAction';

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
  color: '#0d4275',
});

function ForgotCandidatePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [validate, setValidate] = useState('');
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);

  const handleClose = () => {
    setOpen(false);
    navigate('/candidate/security');
  };

  const handleErrorClose = () => {
    setOpenError(false);
  };

  const handleChange = (event, setter) => {
    const value = event.target.value;
    setter(event.target.value);
    setValidate((value ? '' : t('signIn.error')) || (emailRegex.test(value) ? false : t('signIn.emailError')));
  };

  const data = {
    email,
  };

  const handleSubmit = async () => {
    if (!email) {
      setValidate(t('signIn.error'));
      return;
    }

    const response = await dispatch(ForgotPassWordAction(data));
    if (response?.response?.status === 'NOT_FOUND') {
      setEmail('');
      setOpenError(true);
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('forgot.forgot')}</title>
      </Helmet>
      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent>
            <StyledColorTypography variant="h3" gutterBottom>
              {t('forgot.forgot')}
            </StyledColorTypography>
            <Stack spacing={3}>
              <TextField
                name="email"
                value={email}
                label="Email"
                helperText={validate}
                error={Boolean(validate)}
                onChange={(event) => handleChange(event, setEmail)}
              />
              <Button fullWidth size="large" type="submit" variant="contained" onClick={handleSubmit}>
                {t('forgot.sendCode')}
              </Button>
            </Stack>
          </StyledContent>
        </Container>
        <Snackbar
          open={open}
          onClose={handleClose}
          autoHideDuration={500}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <Alert elevation={6} severity="success" variant="filled">
            {t('forgot.success')}
          </Alert>
        </Snackbar>
        <Snackbar
          open={openError}
          onClose={handleErrorClose}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <Alert elevation={6} severity={'error'} variant="filled">
            {t('forgot.email')}
          </Alert>
        </Snackbar>
      </StyledRoot>
    </>
  );
}

export default ForgotCandidatePage;
