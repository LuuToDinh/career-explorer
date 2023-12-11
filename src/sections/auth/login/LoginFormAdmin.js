import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';

const LoginFormAdmin = ({ onhandleLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [forms, setForms] = useState({
    userName: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    userName: '',
    password: '',
  });

  const handleLoginAdmin = async () => {
    const { userName, password } = forms;
    let isValue = true;
    if (!userName || !password) {
      isValue = false;
      setErrors({
        userName:userName?"":'username is required',
        password:password?"":'password is required'
      })
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
          label="Username"
          helperText={errors.userName}
          error={Boolean(errors.userName)}
          onChange={handleChangeValue}
        />
        <TextField
          name="password"
          label="Password"
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

      <LoadingButton fullWidth size="large" type="submit" variant="contained" sx={{ my: 2 }} onClick={handleLoginAdmin}>
        Login
      </LoadingButton>
    </>
  );
};
LoginFormAdmin.propTypes = {
  onhandleLogin: PropTypes.func,
};
export default LoginFormAdmin;
