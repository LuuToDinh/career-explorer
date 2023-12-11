import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';

export default function LoginFormCandidate({ onhandleLogin }) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [forms, setForms] = useState({
    userName: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    userName: '',
    password: '',
  });

  const handleLogin = async () => {
    const { userName, password } = forms;
    let isValue = true;
    if (!userName || !password) {
      isValue = false;
      setErrors({
        userName: userName ? '' : 'username is required',
        password: password ? '' : 'password is required',
      });
    }
    if (isValue) {
      onhandleLogin(userName, password);
    }
  };
  const handleChangeValue = useCallback(
    (e) => {
      const { value, name } = e.target;
      setForms({
        ...forms,
        [name]: value,
      });
      setErrors({
        ...errors,
        [name]: value ? '' : `${e.target.name} is required`,
      });
    },
    [forms, errors]
  );
  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="userName"
          value={forms.userName}
          label={t('signUp.unameOrMail')} 
          helperText={errors.userName}
          error={Boolean(errors.userName)}
          onChange={handleChangeValue}
        />
        <TextField
          name="password"
          label={t('signUp.password')} 
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
      </Stack>
      <Stack direction="row-reverse" alignItems="flex-end" justifyContent="space-between" sx={{ my: 2 }}>
        <Link to="/candidate/forgotpass" variant="subtitle2" underline="hover">
        {t('forgot.forgot')}?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" sx={{ my: 2 }} onClick={handleLogin}>
        {t('signUp.login')}
      </LoadingButton>
    </>
  );
}
LoginFormCandidate.propTypes = {
  onhandleLogin: PropTypes.func,
  onhandleForget: PropTypes.func,
};
