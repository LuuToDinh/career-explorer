import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Typography, styled, Stack, TextField, Button, Snackbar, Alert } from '@mui/material';
import { SendCodeAction } from '../../redux/actions/ForgotPassAction';

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

function SecurityCandidatePage() {
  const emailRedux = useSelector((state) => state.forgotPassword.forgotPass);
  const [open, setOpen] = useState(false);
  const [validate, setValidate] = useState('');
  const [openError, setOpenError] = useState(false);
  const email = emailRedux.data.email;

  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [code, setCode] = useState(undefined);

  const handleOnchange = (event, setter) => {
    const numericValue = parseInt(event.target.value, 10);
    setter(numericValue);
  };

  const data = {
    email,
    otp: code,
  };
  const handleClose = () => {
    setOpen(false);
    navigate('/candidate/login');
  };
  const handleErrorClose = () => {
    setOpenError(false);
  };

  const handleSubmit = async () => {
    if (!code) {
      setValidate(t('secu.notfound'));
      return;
    }
    const response = await dispatch(SendCodeAction(data));
    if (response?.data?.message === 'Your username, email or OTP is not correct.') {
      setCode('');
      setOpenError(true);
    } else {
      setOpen(true);
    }
  };
  return (
    <>
      <Helmet>
        <title>{t('forgot.securityCode')}</title>
      </Helmet>
      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent>
            <StyledColorTypography variant="h3" gutterBottom>
              {t('forgot.securityCode')}
            </StyledColorTypography>
            <Stack spacing={3}>
              <TextField
                type="number"
                value={code}
                name="code"
                helperText={validate}
                error={Boolean(validate)}
                label={t('forgot.enter')}
                onChange={(event) => handleOnchange(event, setCode)}
              />
              <Button fullWidth size="large" type="submit" variant="contained" onClick={handleSubmit}>
                {t('forgot.send')}
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
            {t('secu.success')}
          </Alert>
        </Snackbar>
        <Snackbar
          open={openError}
          onClose={handleErrorClose}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <Alert elevation={6} severity={'error'} variant="filled">
            {t('secu.fail')}
          </Alert>
        </Snackbar>
      </StyledRoot>
    </>
  );
}

export default SecurityCandidatePage;
