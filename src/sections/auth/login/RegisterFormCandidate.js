import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button, Stack, IconButton, InputAdornment, TextField, Snackbar, styled, Alert } from '@mui/material';
import Iconify from '../../../components/iconify';
import { CandidateRegister } from '../../../redux/actions/UserAction';

const ButtonRegis = styled(Button)({
  marginTop: '20px',
});
export default function RegisterFormCandidate() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openBug, setOpenBug] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [forms, setForms] = useState({
    username: '',
    password: '',
    email: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    email: '',
    confirmPassword: '',
  });
  const handleChangeValuePass = ({ target: { value } }) => {
    setConfirmPassword(value);
    const confirmPasswordError =
      value === '' ? t('signIn.error') : value !== forms.password ? t('signIn.passError') : '';
    setErrors({
      ...errors,
      confirmPassword: confirmPasswordError,
    });
  };
  const handleChangeValueEmail = useCallback(
    (e) => {
      const { value, name } = e.target;
      setForms({
        ...forms,
        [name]: value,
      });
      setErrors({
        ...errors,
        [name]: (value ? '' : t('signIn.error')) || (emailRegex.test(value) ? false : t('signIn.emailError')),
      });
    },
    [forms, errors]
  );
  const handleChangeValue = useCallback(
    (e) => {
      const { value, name } = e.target;
      setForms({
        ...forms,
        [name]: value,
      });
      setErrors({
        ...errors,
        [name]: value ? '' : t('signIn.error'),
      });
    },
    [forms, errors]
  );
  const handleClose = () => {
    setOpen(false);
    navigate('/candidate/login');
  };
  const handleErrorClose = () => {
    setOpenError(false);
  };
  const handleBugClose = () => {
    setOpenBug(false);
  };
  const handleRegister = async () => {
    const response = await dispatch(CandidateRegister(forms));
    if (response?.response?.status === 'CONFLICT') {
      setOpenError(true);
    } else if (response?.response?.status) {
      setOpenBug(true);
    } else {
      setOpen(true);
    }
  };
  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="username"
          value={forms.username}
          label="Username"
          helperText={errors.username}
          error={Boolean(errors.username)}
          onChange={handleChangeValue}
        />
        <TextField
          name="email"
          value={forms.email}
          label="Email"
          helperText={errors.email}
          error={Boolean(errors.email)}
          onChange={handleChangeValueEmail}
        />
        <TextField
          name="password"
          label={t('signIn.pass')}
          onChange={handleChangeValue}
          value={forms.password}
          type={showPassword ? 'text' : 'password'}
          helperText={errors.password}
          error={Boolean(errors.password)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="ConfirmPassword"
          label={t('signIn.confirmPassword')}
          onChange={handleChangeValuePass}
          value={confirmPassword}
          type={showPassword ? 'text' : 'password'}
          helperText={errors.confirmPassword}
          error={Boolean(errors.confirmPassword)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <ButtonRegis fullWidth size="large" type="submit" variant="contained" onClick={handleRegister}>
        {t('signIn.registerButton')}
      </ButtonRegis>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Alert elevation={6} severity="success" variant="filled">
          {t('signIn.alertSuccess')}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openError}
        onClose={handleErrorClose}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Alert elevation={6} severity={'error'} variant="filled">
          {t('signIn.alertError')}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openBug}
        onClose={handleBugClose}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Alert elevation={6} severity={'error'} variant="filled">
          {t('createAcc.error')}
        </Alert>
      </Snackbar>
    </>
  );
}
