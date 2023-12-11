/*eslint-disable*/
import { Helmet } from 'react-helmet-async';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Stack, Container, Typography, Box, styled, Button, Card, Grid } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SmsFailedTwoToneIcon from '@mui/icons-material/SmsFailedTwoTone';
import StarsIcon from '@mui/icons-material/Stars';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import DescriptionIcon from '@mui/icons-material/Description';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useTranslation } from 'react-i18next';
import palette from '@/theme/palette';
import { GetJobIdAction } from '@/redux/actions/JobAction';

const RecruitmentDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const JobId = useSelector((state) => state.job.job);
  useEffect(() => {
    dispatch(GetJobIdAction(id));
  }, []);
  const MyContent = styled(Stack)({
    margin: '20px 0',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  });
  const BoxHeader = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
  });
  const ContainerBox = styled(Card)({
    margin: '5em auto',
    padding: '2rem',
    background: 'none',
  });
  const BoxChild = styled(Card)({
    margin: '10px 0',
    padding: '1rem',
  });
  const NavTi = styled(Typography)({
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: `${palette.maincolor.primary_light}`,
  });
  const StyledBoxChild = styled(BoxChild)({
    boxShadow: 2,
  });
  const handleEditPage = () => {
    navigate(`/dashboard/recruitment/edit/${id}`);
  };
  return (
    <>
      <Helmet>
        <title>
          {t('dashboadNavbar.recruitment')} | {t('detail')}
        </title>
      </Helmet>
      <Container>
        <BoxHeader>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <NavTi>
              <Link
                to="/dashboard/recruitment"
                style={{ textDecoration: 'none', color: `${palette.maincolor.primary_light}` }}
              >
                {t('dashboadNavbar.recruitment')} &nbsp;
              </Link>
              / {t('detail')}
            </NavTi>
          </Stack>
          <Button variant="contained" sx={{ height: '3em', width: '7em' }} onClick={handleEditPage}>
            {t('edit')}
          </Button>
        </BoxHeader>
        <ContainerBox>
          {JobId ? (
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h3" textTransform="capitalize">
                  {JobId.jobTittle}
                </Typography>
                <MyContent style={{ color: '#6fde6f' }}>
                  <AttachMoneyIcon style={{ fontSize: '2rem' }} />
                  <Typography variant="h4" textTransform="capitalize">
                    {t('upto')} ${JobId.salary}
                  </Typography>
                </MyContent>
                <MyContent>
                  <PersonIcon style={{ fontSize: '2rem', marginRight: '10px' }} />
                  <Typography variant="h4" textTransform="capitalize">
                    {JobId.number} {t('dashboadNavbar.candidate')}
                  </Typography>
                </MyContent>
              </Grid>
              <Grid item xs={12}>
                <StyledBoxChild>
                  <MyContent>
                    <StarsIcon />
                    <Typography marginLeft="10px" textTransform="capitalize">
                      {JobId.level}{' '}
                    </Typography>
                  </MyContent>
                  <MyContent>
                    <LocationOnIcon />
                    <Typography marginLeft="10px" textTransform="capitalize">
                      {JobId.workingModel}
                    </Typography>
                  </MyContent>
                  <MyContent>
                    <BusinessIcon />
                    <Typography marginLeft="10px" textTransform="capitalize">
                      {JobId.location}
                    </Typography>
                  </MyContent>
                </StyledBoxChild>
                <StyledBoxChild>
                  <MyContent>
                    <LightbulbIcon />
                    <Typography marginLeft="10px" variant="h4" textTransform="capitalize">
                      {t('skills')}
                    </Typography>
                  </MyContent>
                  <MyContent>
                    <Typography marginLeft="10px" textTransform="capitalize">
                      {JobId?.skills.map((skill, index) => (
                        <span key={index}>
                          {skill}
                          {index !== JobId.skills.length - 1 && ', '}
                        </span>
                      ))}
                    </Typography>
                  </MyContent>
                </StyledBoxChild>
                <StyledBoxChild>
                  <MyContent>
                    <RequestPageIcon />
                    <Typography marginLeft="10px" variant="h4" textTransform="capitalize">
                      {t('requirements')}
                    </Typography>
                  </MyContent>
                  <MyContent>
                    <Typography marginLeft="10px" textTransform="capitalize">
                      {JobId?.requirement}
                    </Typography>
                  </MyContent>
                </StyledBoxChild>
                <StyledBoxChild>
                  <MyContent>
                    <DescriptionIcon />
                    <Typography marginLeft="10px" variant="h4" textTransform="capitalize">
                      {t('description')}
                    </Typography>
                  </MyContent>
                  <MyContent>
                    <Typography marginLeft="10px" textTransform="capitalize">
                      {JobId?.jobDescription}
                    </Typography>
                  </MyContent>
                </StyledBoxChild>
                <StyledBoxChild>
                  <MyContent>
                    <FavoriteIcon />
                    <Typography marginLeft="10px" variant="h4" textTransform="capitalize">
                      {t('benefit')}
                    </Typography>
                  </MyContent>
                  <MyContent>
                    <Typography marginLeft="10px" textTransform="capitalize">
                      {JobId?.benefit}
                    </Typography>
                  </MyContent>
                </StyledBoxChild>
              </Grid>
            </Grid>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <SmsFailedTwoToneIcon style={{ fontSize: '100px' }} />
                <Typography> {t('Recruitment.messageloading')}</Typography>
              </div>
            </>
          )}
        </ContainerBox>
      </Container>
    </>
  );
};
export default RecruitmentDetail;
