/*eslint-disable*/
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Stack, Paper, Container, Typography, Box, styled, Grid, Avatar } from '@mui/material';
import * as MuiIcon from '@mui/icons-material';
import SmsFailedTwoToneIcon from '@mui/icons-material/SmsFailedTwoTone';
import { useTranslation } from 'react-i18next';
import BlacklistContext from '@/components/information/BlacklistContext';
import palette from '@/theme/palette';
import { GetBlacklistIdAction } from '@/redux/actions/BlackListAction';

const BlackListDetail = (props) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const blistId = useSelector((state) => state.blist.blist);
  useEffect(() => {
    dispatch(GetBlacklistIdAction(id));
  }, []);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#f9fafb',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: 'black',
    display: 'flex',
    alignItems: 'center',
  }));
  const AvatarDetail = styled(Avatar)({
    width: '100px',
    height: '100px',
    marginRight: '1rem',
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
  const EmailIconDetail = styled(MuiIcon.Email)({
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
    marginTop: '4rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  });
  return (
    <>
      <Helmet>
        <title>
          {t('blackList')} | {t('detail')}
        </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <NavTi variant="h4" gutterBottom>
            <Link
              to="/dashboard/blacklists"
              style={{ textDecoration: 'none', color: `${palette.maincolor.primary_light}` }}
            >
              {t('blackList')} &nbsp;
            </Link>
            / {t('detail')}
          </NavTi>
        </Stack>
        <>
          {blistId ? (
            <StyledBox>
              <Box style={{ width: '85%' }}>
                <Grid container spacing={2}>
                  <Grid item spacing={2} xs={10}>
                    <Item>
                      <AvatarDetail
                        src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
                        sx={{ marginRight: '1rem' }}
                      />
                      <Grid container spacing={2}>
                        <Grid xs={12}>
                          <ItemDetailName> {blistId.fullname} </ItemDetailName>
                        </Grid>
                        <Grid xs={12}>
                          <ItemDetail>
                            <EmailIconDetail />
                            {blistId.email}{' '}
                          </ItemDetail>
                        </Grid>
                      </Grid>
                    </Item>
                  </Grid>
                  <Grid item spacing={2} xs={1} />
                  <BlacklistContext icon={MuiIcon.Phone} title={t('phoneNum')} context={blistId.phone} md={4} />
                  <BlacklistContext icon={MuiIcon.Home} title={t('cccd')} context={blistId.identifier} md={8} />
                  <BlacklistContext icon={MuiIcon.Close} title={t('reason')} context={blistId.note} md={12} />
                </Grid>
              </Box>
            </StyledBox>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <SmsFailedTwoToneIcon style={{ fontSize: '100px' }} />
                <Typography>{t('Blacklisted.messageloading')}</Typography>
              </div>
            </>
          )}
        </>
      </Container>
    </>
  );
};
export default BlackListDetail;
