import * as React from 'react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
  Avatar,
  Snackbar,
  Alert,
} from '@mui/material';

import palette from '../../theme/palette';
import {
  GetUserIdAction,
  GetUserAvatarIdAction,
  UpdateUserIdAction,
  uploadImageAvatar,
} from '../../redux/actions/UserAction';
import { decodeJwt } from '../../utils/deCode';
import { storage } from '../../services/storage';
// ----------------------------------------------------------------------

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
const AvatarDetail = styled(Avatar)({
  width: '15.625rem',
  height: '15.625rem',
  position: 'relative',
});

const StyledButton = styled(Button)({
  position: 'absolute',
  left: 0,
});

export default function ProfileEdit() {
  const { t } = useTranslation();
  const [fileImage, setFileImage] = useState(null);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.session.user);
  const avatarUrl = useSelector((state) => state.session.userAvatar);
  const token = storage.getCache('access_token');
  const { UserId } = decodeJwt(token);
  const { Roles } = decodeJwt(token);
  const role = Roles[0];

  const [validationErrors, setValidationErrors] = useState({});

  console.log(profile);

  useEffect(() => {
    dispatch(GetUserIdAction(UserId));
    dispatch(GetUserAvatarIdAction(UserId));
  }, [UserId]);

  const { fullName, phoneNumber, roles, email, level, sex, birthDate, street, district, city, nation, url } = profile;
  const { urlImage } = avatarUrl;

  const [newData, setNewData] = useState();
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState('');
  const [avatar, setAvatar] = useState(urlImage);

  useEffect(() => {
    if (profile) {
      setNewData({
        userId: UserId,
        name: fullName,
        email,
        phone_num: phoneNumber,
        level,
        sex,
        birth_date: birthDate,
        street,
        district,
        city,
        nation,
      });
    }
  }, [profile]);

  const navigate = useNavigate();
  const handleCancelClick = () => {
    if (role === 'ADMIN' || role === 'RECRUITMENTER') navigate('/dashboard/profile', { replace: true });
    else navigate('/interviewer/profile', { replace: true });
  };
  const handleSubmit = async () => {
    const errors = {};
    if (!newData.name) {
      errors.name = 'Vui lòng nhập họ và tên';
    }
    if (!newData.email) {
      errors.email = 'Vui lòng nhập email';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const check = emailRegex.test(newData.email);
      if (!check) errors.email = 'Vui lòng nhập đúng định dạng nhập email';
    }
    if (!newData.phone_num) {
      errors.phone_num = 'Vui lòng nhập số điện thoại';
    } else {
      const phoneNumRegex = /^(0|\+84)(\d{9})$/;
      const check = phoneNumRegex.test(newData.phone_num);
      if (!check) errors.phone_num = 'Vui lòng nhập đúng định dạng số điện thoại';
    }
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    const response1 = await dispatch(UpdateUserIdAction(newData));
    if (fileImage && response1) {
      const response2 = await dispatch(uploadImageAvatar(fileImage, UserId));
      if (response2) setOpen(true);
    }
    if (response1?.response?.status === 'BAD_REQUEST') {
      setOpenError(true);
      setMessage(response1?.response?.message);
    } else setOpen(true);
  };

  const handlePreview = (e) => {
    const files = e.target.files;

    if (!files || !files.length) {
      return;
    }

    const previewFile = files[0];
    previewFile.preview = URL.createObjectURL(previewFile);

    const formData = new FormData();
    formData.append('file', previewFile, previewFile.name);

    setAvatar(previewFile);
    setFileImage(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    if (role === 'ADMIN' || role === 'RECRUITMENTER') navigate('/dashboard/profile');
    else navigate('/interviewer/profile');
  };

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false);
  };

  console.log(fileImage);

  return (
    <>
      <Helmet>
        <title> {t('dashboadNavbar.profile')} </title>
      </Helmet>
      <Container>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} variant="filled" severity="success" sx={{ width: '100%' }}>
            {t('profileSuccess')}
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
            <Link
              to="/dashboard/profile"
              style={{ textDecoration: 'none', color: `${palette.maincolor.primary_light}` }}
            >
              {t('dashboadNavbar.profile')} &nbsp;
            </Link>
            / {t('edit')}
          </NavTi>
        </Stack>
        <FormControl>
          <Grid container>
            <Grid container md={4} sm={12} xs={12} justifyContent={'center'}>
              <AvatarDetail alt={fullName} src={avatar?.preview || url} />
              <label htmlFor="upload-photo">
                <input
                  style={{ display: 'none' }}
                  id="upload-photo"
                  name="upload-photo"
                  type="file"
                  onChange={handlePreview}
                />
                <StyledButton color="secondary" variant="contained" component="span">
                  Upload
                </StyledButton>
              </label>
            </Grid>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 3, sm: 3, md: 3 }} md={8} sm={12} xs={12}>
              <Grid item xs={6} style={{ marginTop: '10px' }}>
                <Label>{t('role')}</Label>
                <div>
                  <InputBox type="text" disabled value={roles} />
                </div>
              </Grid>
              <Grid item xs={6} style={{ marginTop: '10px' }}>
                <Label>{t('name')}</Label>
                <div>
                  <InputBox
                    type="text"
                    name="name"
                    value={newData?.name || ''}
                    error={validationErrors.name}
                    helperText={validationErrors.name}
                    onChange={handleChange}
                  />
                </div>
              </Grid>
              <Grid item xs={6} style={{ marginTop: '10px' }}>
                <Label>Email</Label>
                <div>
                  <InputBox
                    type="email"
                    name="email"
                    value={newData?.email || ''}
                    error={validationErrors.email}
                    helperText={validationErrors.email}
                    onChange={handleChange}
                  />
                </div>
              </Grid>
              <Grid item xs={6} style={{ marginTop: '10px' }}>
                <Label>{t('phoneNum')}</Label>
                <div>
                  <InputBox
                    type="number"
                    name="phone_num"
                    value={newData?.phone_num || ''}
                    error={validationErrors.phone_num}
                    helperText={validationErrors.phone_num}
                    onChange={handleChange}
                  />
                </div>
              </Grid>
              <Grid item xs={6} style={{ marginTop: '10px' }}>
                <Label>{t('street')}</Label>
                <div>
                  <InputBox type="text" name="street" value={newData?.street || ''} onChange={handleChange} />
                </div>
              </Grid>
              <Grid item xs={6} style={{ marginTop: '10px' }}>
                <Label>{t('district')}</Label>
                <div>
                  <InputBox type="text" name="district" value={newData?.district || ''} onChange={handleChange} />
                </div>
              </Grid>
              <Grid item xs={6} style={{ marginTop: '10px' }}>
                <Label>{t('city')}</Label>
                <div>
                  <InputBox type="text" name="city" value={newData?.city || ''} onChange={handleChange} />
                </div>
              </Grid>
              <Grid item xs={6} style={{ marginTop: '10px' }}>
                <Label>{t('nation')}</Label>
                <div>
                  <InputBox type="text" name="nation" value={newData?.nation || ''} onChange={handleChange} />
                </div>
              </Grid>
              <GroupButton>
                <ButtonCancel onClick={handleCancelClick}>{t('cancel')}</ButtonCancel>
                <ButtonAdd onClick={handleSubmit}>{t('save')}</ButtonAdd>
              </GroupButton>
            </Grid>
          </Grid>
        </FormControl>
      </Container>
    </>
  );
}
