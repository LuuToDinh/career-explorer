import * as React from 'react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Grid,
  Button,
  Container,
  Stack,
  Typography,
  TextField,
  FormControl,
  styled,
  FormLabel,
  Snackbar,
  Alert,
} from '@mui/material';

import palette from '../../theme/palette';
import { GetUserIdAction, ChangePasswordAction } from '../../redux/actions/UserAction';
import { decodeJwt } from '../../utils/deCode';
import { storage } from '../../services/storage';

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
const Label = styled(FormLabel)({
  fontSize: '16px',
  fontWeight: 'bold',
  color: 'grey',
});
const NavTi = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: `${palette.maincolor.primary_light}`,
});
const InputBox = styled(TextField)({
  width: '100%',
});

export default function ChangePass() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const token = storage.getCache('access_token');
  const { UserId } = decodeJwt(token);
  const { Roles } = decodeJwt(token);
  const role = Roles[0];

  const [validationErrors, setValidationErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch(GetUserIdAction(UserId));
  }, [UserId]);

  const [newData, setNewData] = useState({
    userId: parseInt(UserId, 10),
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const navigate = useNavigate();
  const handleCancelClick = () => {
    if (role === 'ADMIN' || role === 'RECRUITMENTER') navigate('/dashboard', { replace: true });
    else if (role === 'INTERVIEWER') navigate('/interviewer', { replace: true });
    else navigate('/candidate', { replace: true });
  };
  const handleSubmit = async () => {
    const errors = {};
    if (!newData.currentPassword) {
      errors.currentPassword = t('errorOldPass');
    }
    if (!newData.newPassword) {
      errors.newPassword = t('errorNewPass');
    }
    if (!newData.confirmNewPassword) {
      errors.confirmNewPassword = t('errorConfirmPass');
    }
    if (newData.currentPassword === newData.newPassword) {
      errors.newPassword = t('errorDupPass');
    }
    if (newData.confirmNewPassword !== newData.newPassword) {
      errors.confirmNewPassword = t('errorDupConfirmPass');
    }

    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    const response = await dispatch(ChangePasswordAction(newData));
    if (response?.data === undefined) 
    {
      setOpenError(true);
      setMessage(response?.response?.message)
    }
    else setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    if (role === 'ADMIN' || role === 'RECRUITMENTER') navigate('/dashboard', { replace: true });
    else if (role === 'INTERVIEWER') navigate('/interviewer', { replace: true });
    else navigate('/candidate', { replace: true });
  };

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevNewData) => ({
      ...prevNewData,
      [name]: value,
    }));
  };
  console.log(newData);

  return (
    <>
      <Helmet>
        <title> {t('changePass')} </title>
      </Helmet>
      <Container>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} variant="filled" severity="success" sx={{ width: '100%' }}>
            {t('passSuccess')}
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          open={openError}
          autoHideDuration={6000}
          onClose={handleCloseError}
        >
          <Alert onClose={handleCloseError} variant="filled" severity="error" sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <NavTi variant="h4" gutterBottom>
            <Link style={{ textDecoration: 'none', color: `${palette.maincolor.primary_light}` }}>
              {t('changePass')} &nbsp;
            </Link>
          </NavTi>
        </Stack>
        <FormControl required>
          <Grid container>
            <Grid item md={3} sm={2} />
            <Grid container rowSpacing={1} columnSpacing={{ xs: 3, sm: 3, md: 3 }} md={6} sm={8} xs={12}>
              <Grid item xs={12} style={{ marginTop: '10px' }}>
                <Label>{t('oldPass')}</Label>
                <InputBox
                  type="password"
                  name="currentPassword"
                  error={!!validationErrors.currentPassword}
                  helperText={validationErrors.currentPassword}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} style={{ marginTop: '10px' }}>
                <Label>{t('newPass')}</Label>
                <InputBox
                  type="password"
                  name="newPassword"
                  error={!!validationErrors.newPassword}
                  helperText={validationErrors.newPassword}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} style={{ marginTop: '10px' }}>
                <Label>{t('confirmPass')}</Label>
                <InputBox
                  type="password"
                  name="confirmNewPassword"
                  error={!!validationErrors.confirmNewPassword}
                  helperText={validationErrors.confirmNewPassword}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item md={3} sm={2} />
            </Grid>
            <GroupButton>
              <ButtonCancel onClick={handleCancelClick}>{t('cancel')}</ButtonCancel>
              <ButtonAdd onClick={handleSubmit}>{t('save')}</ButtonAdd>
            </GroupButton>
          </Grid>
        </FormControl>
      </Container>
    </>
  );
}
