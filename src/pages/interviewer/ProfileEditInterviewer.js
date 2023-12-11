import * as React from 'react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Grid, Button, Container, Stack, Typography, TextField, FormControl, styled, FormLabel, Avatar } from '@mui/material';

import palette from '../../theme/palette';
import { GetUserIdAction, GetUserAvatarIdAction, UpdateUserIdAction, UpdateUserAvatarIdAction } from '../../redux/actions/UserAction';
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
const AvatarDetail = styled(Avatar)({
  width: '15.625rem',
  height: '15.625rem',
  position: 'relative'
});

const StyledButton = styled(Button)({
  position: 'absolute',
  left: 0
});

export default function ProfileEditInterviewer() {
  const { t } = useTranslation();
  const [newData, setNewData] = useState();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.session.user);
  const avatarUrl = useSelector((state) => state.session.userAvatar);
  const token = storage.getCache('access_token');
  const { UserId } = decodeJwt(token);

  useEffect(() => {
    dispatch(GetUserIdAction(UserId));
  }, [dispatch]);
  useEffect(() => {
    dispatch(GetUserAvatarIdAction(UserId));
  }, [dispatch]);

  const { fullName, phoneNumber, roles, email, level, sex, birthDate, street, district, city, nation } = profile;
  const { urlImage } = avatarUrl ?? { urlImage: '123' };
  useEffect(() => {
    if (profile) {
      setNewData({
        userId: UserId,
        name: fullName,
        email,
        pass: "pass123",
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
  const [avatar, setAvatar] = useState(urlImage)
  const navigate = useNavigate();
  const handleCancelClick = () => {
    navigate('/interviewer/profile', { replace: true });
  };
  const handleSubmit = () => {
    const response1 = dispatch(UpdateUserIdAction(newData));
    const response2 = dispatch(UpdateUserAvatarIdAction(UserId))
    if (response1 && response2) {
      alert("Thông tin cá nhân đã được cập nhật thành công!");
      setTimeout(() => {
        dispatch(GetUserIdAction(UserId))
        navigate(`/interviewer/profile`)
      }, 1000)
    }
  };
  const handlePreview = (e) => {
    const file = e.target.files[0]
    file.preview = URL.createObjectURL(file)
    setAvatar(file)
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };


  return (
    <>
      <Helmet>
        <title> {t('dashboadNavbar.profile')} </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <NavTi variant="h4" gutterBottom>
            <Link to="/dashboard/profile" style={{ textDecoration: 'none', color: `${palette.maincolor.primary_light}` }}>
            {t('editInter.titleLink')} &nbsp;
            </Link>
            / {t('editInter.title')}
          </NavTi>
        </Stack>
        <FormControl>
          <Grid container>
            <Grid container md={4} sm={12} xs={12} justifyContent={'center'}>
              <AvatarDetail alt={fullName}
                src={avatar !== undefined ? avatar.preview : urlImage } />
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
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 3, sm: 3, md: 3 }}
              md={8} sm={12} xs={12}>
              <Grid item xs={6} style={{ marginTop: '10px' }}>
                <Label>{t('editInter.authorization')}</Label>
                <div>
                  <InputBox type="text" disabled defaultValue={roles !== undefined ? roles : ''} />
                </div>
              </Grid>
              <Grid item xs={6} style={{ marginTop: '10px' }}>
                <Label>{t('editInter.fullname')}</Label>
                <div>
                  <InputBox type="text" name='name' defaultValue={fullName !== undefined ? fullName : ''} onChange={handleChange} />
                </div>
              </Grid>
              <Grid item xs={6} style={{ marginTop: '10px' }}>
                <Label>Email</Label>
                <div>
                  <InputBox type="text" name='email' defaultValue={email !== undefined ? email : ''} onChange={handleChange} />
                </div>
              </Grid>
              <Grid item xs={6} style={{ marginTop: '10px' }}>
                <Label>{t('editInter.phone')}</Label>
                <div>
                  <InputBox type="number" name='phone_num' defaultValue={phoneNumber !== undefined ? phoneNumber : ''} onChange={handleChange} />
                </div>
              </Grid>
              <Grid item xs={6} style={{ marginTop: '10px' }}>
                <Label>{t('editInter.t1')}</Label>
                <div>
                  <InputBox type="text" name='street' defaultValue={street !== undefined ? street : ''} onChange={handleChange} />
                </div>
              </Grid>
              <Grid item xs={6} style={{ marginTop: '10px' }}>
                <Label>{t('editInter.t2')}</Label>
                <div>
                  <InputBox type="text" name='district' defaultValue={district !== undefined ? district : ''} onChange={handleChange} />
                </div>
              </Grid>
              <Grid item xs={6} style={{ marginTop: '10px' }}>
                <Label>{t('editInter.t3')}</Label>
                <div>
                  <InputBox type="text" name='city' defaultValue={city !== undefined ? city : ''} onChange={handleChange} />
                </div>
              </Grid>
              <Grid item xs={6} style={{ marginTop: '10px' }}>
                <Label>{t('editInter.t4')}</Label>
                <div>
                  <InputBox type="text" name='nation' defaultValue={nation !== undefined ? nation : ''} onChange={handleChange} />
                </div>
              </Grid>
              <GroupButton>
                <ButtonCancel onClick={handleCancelClick}>{t('editInter.cancelbtn')}</ButtonCancel>
                <ButtonAdd onClick={handleSubmit}>{t('editInter.savebtn')}</ButtonAdd>
              </GroupButton>
            </Grid>
          </Grid>
        </FormControl>
      </Container>
    </>
  );
}
