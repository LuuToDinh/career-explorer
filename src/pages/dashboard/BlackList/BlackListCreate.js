/*eslint-disable*/
import { Helmet } from 'react-helmet-async';
import { useNavigate, useLocation, Outlet, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Stack, Container, Typography, Box, styled, Button, Grid, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';
import { CreateBlacklistAction } from '@/redux/actions/BlackListAction';
import palette from '@/theme/palette';

const BoxHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '3rem',
});
const NavTi = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: `${palette.maincolor.primary_light}`,
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

export default function BlackListCreate() {
  const { t } = useTranslation();
  const [newData, setNewData] = useState(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [validationErrors, setValidationErrors] = useState({
    fullname: '',
    phone: '',
    email: '',
    identifier: '',
    note: '',
  });
  const validateInputs = () => {
    const errors = {};
    if (!newData.fullname.trim()) {
      errors.fullname = t('Blacklisted.fullname');
    }

    if (!newData.phone.trim()) {
      errors.phone = t('Blacklisted.phone_1');
    } else {
      const phoneRegex = /^0\d{9,10}$/;
      if (!phoneRegex.test(newData.phone)) {
        errors.phone = t('Blacklisted.phone_2');
      }
    }
    if (!newData.email.trim()) {
      errors.email = t('Blacklisted.email_1');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newData.email)) {
        errors.email = t('Blacklisted.email_2');
      }
    }
    if (!newData.identifier.trim()) {
      errors.identifier = t('Blacklisted.identifier');
    }
    if (!newData.note.trim()) {
      errors.note = t('Blacklisted.reason');
    }
    return errors;
  };
  useEffect(() => {
    setNewData({
      fullname: '',
      email: '',
      phone: '',
      identifier: '',
      note: '',
    });
  }, []);
  const handleCreate = async () => {
    const errors = validateInputs();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setOpen(true);
    const response = await dispatch(CreateBlacklistAction(newData));
    if (response) {
      navigate(`/dashboard/blacklists`);
    }
  };
  const handleDenied = () => {
    navigate(`/dashboard/blacklists`);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevJob) => ({
      ...prevJob,
      [name]: value,
    }));
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  return (
    <>
      {location.pathname !== '/dashboard/blacklists/create' ? (
        <Outlet />
      ) : (
        <>
          <Helmet>
            <title>
              {t('blackList')} | {t('create')}
            </title>
          </Helmet>
          <Snackbar
            open={open}
            autoHideDuration={2000}
            sx={{ position: 'relative', top: '0', left: '0', width: 'fit-content' }}
          >
            <MuiAlert severity="success" sx={{ width: '100%' }}>
              {t('Blacklisted.messagecreate')}{' '}
            </MuiAlert>
          </Snackbar>
          <Container maxWidth="xlx">
            <BoxHeader>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <NavTi variant="h4" gutterBottom>
                  <Link
                    to="/dashboard/blacklists"
                    style={{ textDecoration: 'none', color: `${palette.maincolor.primary_light}` }}
                  >
                    {t('blackList')} &nbsp;
                  </Link>
                  / {t('create')}
                </NavTi>
              </Stack>
            </BoxHeader>
            <Box marginLeft={12} marginRight={4}>
              <Grid container item spacing={2} justifyContent="flex-start" wrap="wrap" alignItems="center">
                <Grid item xs sm={4} md={5}>
                  {t('fullName')}
                  <TextField
                    onChange={handleChange}
                    name="fullname"
                    id="outlined-multiline-flexible"
                    fullWidth
                    required
                    error={!!validationErrors.fullname}
                    helperText={validationErrors.fullname || ' '}
                  />
                </Grid>
                <Grid item xs sm={4} md={5}>
                  {t('phoneNum')}
                  <TextField
                    name="phone"
                    id="outlined-number"
                    type="number"
                    fullWidth
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={handleChange}
                    error={!!validationErrors.phone}
                    helperText={validationErrors.phone || ' '}
                  />
                </Grid>
                <Grid item xs sm={4} md={5}>
                  {t('email')}
                  <TextField
                    onChange={handleChange}
                    name="email"
                    id="outlined-multiline-flexible"
                    fullWidth
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={!!validationErrors.email}
                    helperText={validationErrors.email || ' '}
                  />
                </Grid>
                <Grid item xs sm={4} md={5}>
                  {t('cccd')}
                  <TextField
                    onChange={handleChange}
                    name="identifier"
                    id="outlined-multiline-flexible"
                    type="number"
                    fullWidth
                    required
                    error={!!validationErrors.identifier}
                    helperText={validationErrors.identifier || ' '}
                  />
                </Grid>
                <Grid item xs sm={8} md={10}>
                  {t('reason')}
                  <TextField
                    name="note"
                    id="outlined-textarea"
                    multiline
                    minRows={4}
                    maxRows={5}
                    onChange={handleChange}
                    fullWidth
                    error={!!validationErrors.note}
                    helperText={validationErrors.note || ' '}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box m={1} display="flex" justifyContent="center" alignItems="center">
              <GroupButton>
                <ButtonCancel onClick={handleDenied}>{t('cancel')}</ButtonCancel>
                <ButtonAdd onClick={handleCreate}>{t('Blacklisted.create')}</ButtonAdd>
              </GroupButton>
            </Box>
          </Container>
        </>
      )}
    </>
  );
}
