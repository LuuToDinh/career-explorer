import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { Grid, Stack, Typography, Box, Paper, styled, Avatar, Container } from '@mui/material';
import * as MuiIcon from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';
import { useTranslation } from 'react-i18next';
import InformationContext from '../../../components/information/InformationContext';
import palette from '../../../theme/palette';
import {GetAccountDetailAction} from '../../../redux/actions/AccountAction'


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
  flexGrow: 1
});
const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: `${palette.maincolor.primary_light}`,
});

const ManageDetail = () => {
  const {t}=useTranslation()
  const { id } = useParams();
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account.accountdetail);
  useEffect(() => {
    dispatch(GetAccountDetailAction(id));
  }, [dispatch, id]);
  const { fullName ,userName, roles, email,phoneNumber,fullLocation, avatarUrl } = account;
  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <NavTi variant="h4" gutterBottom>
            <StyledLink to="/dashboard/accounts">
            {t("dashboadNavbar.account")} &nbsp;
            </StyledLink>
            / {t("detail")}
          </NavTi>
        </Stack>
        <StyledBox>
          <Grid justifyContent="center" alignItems="center" container spacing={2}>
            <Grid item spacing={2} xs={10}>
              <Item>
                <AvatarDetail alt={fullName} src={avatarUrl} />
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
              <InformationContext icon={MuiIcon.Phone} title={t("phoneNum")} context={[phoneNumber]} md={5} />
              <InformationContext icon={MuiIcon.SettingsSuggestSharp} title={t("level")} context={[roles]} md={5} />
              <InformationContext icon={MuiIcon.Home} title={t("address")} context={[fullLocation]} md={5} />
            </Grid>
          </Grid>
        </StyledBox>
      </Container>
    </>
  );
};
export default ManageDetail;
