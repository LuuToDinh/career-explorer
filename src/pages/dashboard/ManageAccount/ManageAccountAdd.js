import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import {
  Grid,
  Button,
  Container,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  FormLabel,
  styled,
  Snackbar,
  Alert,
} from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';
import palette from '../../../theme/palette';

import Iconify from '../../../components/iconify';
import { PostAccountAction, GetAccountAction } from '../../../redux/actions/AccountAction';

const InputBox = styled(TextField)({
  width: '100%',
});
const SelectBox = styled(Select)({
  width: '100%',
});
const ButtonAdd = styled(Button)({
  margin: '10px',
  textAlign: 'center',
  width: '150px',
  height: '50px',
  backgroundColor: `${palette.maincolor.primary}`,
  color: 'white',
});
const ButtonCancel = styled(Button)({
  margin: '10px',
  textAlign: 'center',
  width: '150px',
  height: '50px',
  backgroundColor: `${palette.maincolor.dark}`,
  color: 'white',
});
const GroupButton = styled(Container)({
  textAlign: 'center',
  marginTop: '10px',
});
const NavTi = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: `${palette.maincolor.primary_light}`,
});
const Label = styled(FormLabel)({
  fontSize: '16px',
  fontWeight: 'bold',
  color: 'grey',
});
const GridBox = styled(Grid)({
  marginTop: '10px',
});
const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: `${palette.maincolor.primary_light}`,
});

export default function ManageAccountAdd() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openBug, setOpenBug] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: '',
    username: '',
    email: '',
    pass: '',
    roles: ['ADMIN'],
  });
  const [errors, setErrors] = useState({
    name: '',
    username: '',
    email: '',
    pass: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleChangeValuePass = ({ target: { value } }) => {
    setConfirmPassword(value);
    const confirmPasswordError = value === '' ? t('signIn.error') : value !== data.pass ? t('signIn.passError') : '';
    setErrors({
      ...errors,
      confirmPassword: confirmPasswordError,
    });
  };
  const handleChangeValueEmail = useCallback(
    (e) => {
      const { value, name } = e.target;
      setData({
        ...data,
        [name]: value,
      });
      setErrors({
        ...errors,
        [name]: (value ? '' : t('signIn.error')) || (emailRegex.test(value) ? false : t('signIn.emailError')),
      });
    },
    [data, errors]
  );
  const handleChangeValue = useCallback(
    (e) => {
      const { value, name } = e.target;
      setData({
        ...data,
        [name]: value,
      });
      setErrors({
        ...errors,
        [name]: value ? '' : t('signIn.error'),
      });
    },
    [data, errors]
  );
  const handleChangeValueRole = useCallback(
    (e) => {
      const { value, name } = e.target;
      setData({
        ...data,
        [name]: [value],
      });
    },
    [data]
  );
  const handleClose = () => {
    setOpen(false);
    navigate('/dashboard/accounts');
  };
  const handleErrorClose = () => {
    setOpenError(false);
  };
  const handleBugClose = () => {
    setOpenBug(false);
  };
  const handleCancelClick = () => {
    navigate('/dashboard/accounts', { replace: true });
  };
  const handleSubmit = async () => {
    const response = await dispatch(PostAccountAction(data));
    if (response?.response?.status === 'CONFLICT') {
      setOpenError(true);
    } 
    else if (response?.response?.status) {
      setOpenBug(true);
    }
    else
    {
      await dispatch(GetAccountAction(1,100));
      setOpen(true);
    }
  };
  return (
    <>
      <Helmet>
        <title> {t('dashboadNavbar.account')} </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <NavTi variant="h4" gutterBottom>
            <StyledLink to="/dashboard/accounts">{t('dashboadNavbar.account')} &nbsp;</StyledLink>/ {t('create')}
          </NavTi>
        </Stack>
        <FormControl>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            rowSpacing={1}
            columnSpacing={{ xs: 10, sm: 10, md: 10 }}
          >
            <GridBox item xs={5}>
              <Label>Username</Label>
              <div>
                <InputBox
                  name="username"
                  type="text"
                  value={data.username}
                  onChange={handleChangeValue}
                  helperText={errors.username}
                  error={Boolean(errors.username)}
                />
              </div>
            </GridBox>
            <GridBox item xs={5}>
              <Label>{t('name')}</Label>
              <div>
                <InputBox
                  name="name"
                  type="text"
                  value={data.name}
                  onChange={handleChangeValue}
                  helperText={errors.name}
                  error={Boolean(errors.name)}
                />
              </div>
            </GridBox>
            <GridBox item xs={5}>
              <Label>Email</Label>
              <div>
                <InputBox
                  name="email"
                  type="text"
                  value={data.email}
                  onChange={handleChangeValueEmail}
                  helperText={errors.email}
                  error={Boolean(errors.email)}
                />
              </div>
            </GridBox>
            <GridBox item xs={5}>
              <Label>{t('role')}</Label>
              <div>
                <SelectBox
                  className="manage"
                  name="roles"
                  type="text"
                  value={data.roles}
                  onChange={handleChangeValueRole}
                >
                  <MenuItem value={`ADMIN`}>Admin</MenuItem>
                  <MenuItem value={`RECRUITMENTER`}>RECcer</MenuItem>
                  <MenuItem value={`INTERVIEWER`}>{t('interviewer')}</MenuItem>
                </SelectBox>
              </div>
            </GridBox>
            <GridBox item xs={5}>
              <Label>{t('signIn.pass')}</Label>
              <div>
                <InputBox
                  className="manage"
                  name="pass"
                  value={data.pass}
                  type={showPassword ? 'text' : 'password'}
                  onChange={handleChangeValue}
                  helperText={errors.pass}
                  error={Boolean(errors.pass)}
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
              </div>
            </GridBox>
            <GridBox item xs={5}>
              <Label>{t('signIn.confirmPassword')}</Label>
              <div>
                <InputBox
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={handleChangeValuePass}
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
              </div>
            </GridBox>
          </Grid>
        </FormControl>
        <GroupButton>
          <ButtonCancel onClick={handleCancelClick}>{t('cancel')}</ButtonCancel>
          <ButtonAdd onClick={handleSubmit}>{t('create')}</ButtonAdd>
        </GroupButton>
        <Snackbar
          open={open}
          onClose={handleClose}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <Alert elevation={6} severity="success" variant="filled">
            {t('createAcc.success')}
          </Alert>
        </Snackbar>
        <Snackbar
          open={openError}
          onClose={handleErrorClose}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <Alert elevation={6} severity={'error'} variant="filled">
            {t('createAcc.failed')}
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
      </Container>
    </>
  );
}
