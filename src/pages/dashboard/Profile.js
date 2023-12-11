import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Grid, Stack, Typography, Box, Paper, styled, Avatar, Container, Button } from '@mui/material';
import * as MuiIcon from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';

import InformationContext from '../../components/information/InformationContext';
import palette from '../../theme/palette';

import { GetUserIdAction, GetUserAvatarIdAction } from '../../redux/actions/UserAction';
import { decodeJwt } from '../../utils/deCode';
import { storage } from '../../services/storage';
//----------------------------------------------------------------------------------

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#F9FAFB',
  padding: theme.spacing(1),
  textAlign: 'left',
  color: 'black',
  display: 'flex',
  alignItems: 'center',
}));
const AvatarDetail = styled(Avatar)({
  width: '100px',
  height: '100px',
});
const ItemDetail = styled(Item)({
  marginLeft: '20px',
  fontSize: '20px',
});
const ItemDetailName = styled(Item)({
  marginLeft: '20px',
  fontSize: '32px',
  fontWeight: 'bold',
});
const EmailIconDetail = styled(EmailIcon)({
  marginRight: '5px',
  width: '2rem',
  height: '2rem',
});
const NavTi = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: `${palette.maincolor.primary_light}`,
});

const StyledBox = styled(Box)({
  flexGrow: 1,
});

const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state) => state.session.user);
  const avatarUrl = useSelector((state) => state.session.userAvatar);
  const token = storage.getCache('access_token');
  const { UserId } = decodeJwt(token);
  const { Roles } = decodeJwt(token);
  const role = Roles[0];

  useEffect(() => {
    dispatch(GetUserIdAction(UserId));
    dispatch(GetUserAvatarIdAction(UserId));
  }, [UserId]);

  const { userName, fullName, phoneNumber, roles, email, fullLocation, url } = profile;
  const { urlImage } = avatarUrl ?? { urlImage: '123' };

  const handleToID = () => {
    if (role === "ADMIN" || role === "RECRUITMENTER")
      navigate(`/dashboard/profile/edit`);
    else
      navigate(`/interviewer/profile/edit`);
  };

  return (
    <>
      <Helmet>
        <title> {t('dashboadNavbar.profile')} </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <NavTi variant="h4" gutterBottom>
            <Link
              to="/dashboard/profile"
              style={{ textDecoration: 'none', color: `${palette.maincolor.primary_light}` }}
            >
              {t('dashboadNavbar.profile')} &nbsp;
            </Link>
          </NavTi>
          <Button variant="contained" onClick={() => handleToID()}>
            {t('edit')}
          </Button>
        </Stack>
        <StyledBox>
          <Grid justifyContent="center" alignItems="center" container spacing={2}>
            <Grid item spacing={2} xs={10}>
              <Item>
                <AvatarDetail alt={fullName} src={urlImage} />
                <Grid spacing={2}>
                  <Grid xs={12}>
                    <ItemDetailName>{fullName}</ItemDetailName>
                  </Grid>
                  <Grid xs={12}>
                    <ItemDetail>
                      <EmailIconDetail />
                      {email}
                    </ItemDetail>
                  </Grid>
                </Grid>
              </Item>
              <Grid item spacing={2} xs={1} />
            </Grid>
            <Grid container justifyContent="center" alignItems="center" spacing={2}>
              <InformationContext icon={MuiIcon.Person} title="Username" context={[userName]} md={5} />
              <InformationContext icon={MuiIcon.Phone} title={t('phoneNum')} context={[phoneNumber]} md={5} />
              <InformationContext icon={MuiIcon.SettingsSuggestSharp} title={t('role')} context={[roles]} md={5} />
              <InformationContext icon={MuiIcon.Home} title={t('address')} context={[fullLocation]} md={5} />
            </Grid>
          </Grid>
        </StyledBox>
      </Container>
    </>
  );
};
export default Profile;
