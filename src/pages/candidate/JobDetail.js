import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Stack,
  Container,
  Typography,
  Box,
  styled,
  Button,
  Card,
  Grid,
  useMediaQuery,
  Alert,
  Snackbar,
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SmsFailedTwoToneIcon from '@mui/icons-material/SmsFailedTwoTone';
import StarsIcon from '@mui/icons-material/Stars';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import DescriptionIcon from '@mui/icons-material/Description';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { LoadingButton } from '@mui/lab';
import UploadIcon from '@mui/icons-material/Upload';

import palette from '../../theme/palette';
import { JobService } from '../../services/job';
import { decodeJwt } from '../../utils/deCode';
import { storage } from '../../services/storage';
import { CandidateInfoService } from '../../services/candidateInfo';

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
  margin: '0 auto 5em',
  padding: '2rem',
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
const SubmitButton = styled(Button)({
  marginTop: '24px',
  marginBottom: '12px',
});
const JobNotFoundedBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
});
const TypographyContent = styled(Typography)({
  marginLeft: '10px',
  textTransform: 'capitalize',
});

const JobDetail = () => {
  const [jobDetail, setJobDetail] = useState({});
  const [candidateId, setCandidateId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowApplyCvBtn, setIsShowApplyCvBtn] = useState(true);
  const [toastMessage, setToastMessage] = useState({
    isShow: false,
    status: '',
    message: '',
  });

  const { id } = useParams();
  const { t } = useTranslation();

  const token = storage.getCache('access_token');
  const { UserId } = decodeJwt(token) || 1;

  const responsiveMarginNav = useMediaQuery('(min-width: 620px)') ? '44px' : '0';

  const handleCloseToastMessage = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setToastMessage((pre) => ({ ...pre, isShow: false }));
  };

  console.log(candidateId, id);
  const handleApplyJob = () => {
    const { ApplyJob } = JobService();
    const data = {
      candidate_id: candidateId,
      job_id: id,
    };

    const postApplyJob = async () => {
      try {
        setIsLoading(true);
        const response = await ApplyJob(data);
        setIsLoading(false);

        setToastMessage({
          isShow: true,
          status: 'success',
          message: t('recruitmentDetail.applySuccess'),
        });
      } catch (error) {
        setIsLoading(false);

        if (error.response?.status === 'BAD_REQUEST') {
          setToastMessage({
            isShow: true,
            status: 'error',
            message: t('recruitmentDetail.applyFailure'),
          });
          setIsShowApplyCvBtn(false);
        } else {
          setToastMessage({
            isShow: true,
            status: 'error',
            message: `${error.response?.error}: ${error.response?.message}`,
          });
        }
      }
    };

    postApplyJob();
  };

  useEffect(() => {
    const { GetJobId } = JobService();
    const { GetCandidateInfo } = CandidateInfoService();
    const getJobDetail = async () => {
      const response = await GetJobId(id);

      setJobDetail(response);
    };
    getJobDetail();

    const getCandidateInfo = async () => {
      const response = await GetCandidateInfo(UserId);

      setCandidateId(response?.candidateId);
    };
    getCandidateInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('dashboadNavbar.recruitment')}</title>
      </Helmet>
      <Container>
        <BoxHeader>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
            mt={5}
            marginLeft={responsiveMarginNav}
          >
            <NavTi variant="h4" gutterBottom>
              <Link
                to="/candidate/jobFinding"
                style={{ textDecoration: 'none', color: `${palette.maincolor.primary_light}` }}
              >
                {t('recruimentPage.recruitmentList')} &nbsp;
              </Link>
              <Link to="" style={{ textDecoration: 'none', color: `${palette.maincolor.primary_light}` }}>
                / {t('recruimentPage.recruitmentInfor')} &nbsp;
              </Link>
            </NavTi>
          </Stack>
        </BoxHeader>
        <ContainerBox>
          {jobDetail ? (
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h3" textTransform="capitalize">
                  {jobDetail.jobTittle}
                </Typography>
                <Typography textTransform="capitalize" color="#6fde6f">
                  {t('recruitmentDetail.salary')} : {jobDetail.salary}
                </Typography>
                {isShowApplyCvBtn && (
                  <LoadingButton
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleApplyJob}
                    loading={isLoading}
                    loadingPosition="start"
                    startIcon={<UploadIcon />}
                  >
                    {t('recruitmentDetail.apllyNow')}
                  </LoadingButton>
                )}
                <Snackbar
                  open={toastMessage.isShow}
                  autoHideDuration={2500}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  onClose={handleCloseToastMessage}
                >
                  <Alert
                    onClose={handleCloseToastMessage}
                    severity={toastMessage.status || 'success'}
                    sx={{ width: '100%' }}
                  >
                    {toastMessage.message}
                  </Alert>
                </Snackbar>
              </Grid>

              <Grid item xs={12}>
                <BoxChild sx={{ boxShadow: 2 }}>
                  <MyContent>
                    <StarsIcon />
                    <TypographyContent>{jobDetail.level} </TypographyContent>
                  </MyContent>
                  <MyContent>
                    <LocationOnIcon />
                    <TypographyContent>{jobDetail.workingModel} </TypographyContent>
                  </MyContent>
                  <MyContent>
                    <BusinessIcon />
                    <TypographyContent>{jobDetail.location} </TypographyContent>
                  </MyContent>
                </BoxChild>
                <BoxChild sx={{ boxShadow: 2 }}>
                  <MyContent>
                    <LightbulbIcon />
                    <TypographyContent variant="h4">{t('skill')}</TypographyContent>
                  </MyContent>
                  <MyContent>
                    <>{jobDetail.skills?.join(', ')}</>
                  </MyContent>
                </BoxChild>
                <BoxChild sx={{ boxShadow: 2 }}>
                  <MyContent>
                    <RequestPageIcon />
                    <TypographyContent variant="h4">{t('recruitmentDetail.demand')}</TypographyContent>
                  </MyContent>
                  <MyContent>
                    <>{jobDetail.requirement}</>
                  </MyContent>
                </BoxChild>
                <BoxChild sx={{ boxShadow: 2 }}>
                  <MyContent>
                    <DescriptionIcon />
                    <TypographyContent variant="h4">{t('events.description')}</TypographyContent>
                  </MyContent>
                  <MyContent>
                    <>{jobDetail.jobDescription}</>
                  </MyContent>
                </BoxChild>
                <BoxChild sx={{ boxShadow: 2 }}>
                  <MyContent>
                    <FavoriteIcon />
                    <TypographyContent variant="h4">{t('recruitmentDetail.benefit')}</TypographyContent>
                  </MyContent>
                  <MyContent>
                    <>{jobDetail.benefit}</>
                  </MyContent>
                </BoxChild>
              </Grid>
            </Grid>
          ) : (
            <>
              <JobNotFoundedBox>
                <SmsFailedTwoToneIcon style={{ fontSize: '100px' }} />
                <Typography>{t('recruitmentDetail.notFound')}</Typography>
              </JobNotFoundedBox>
            </>
          )}
        </ContainerBox>
      </Container>
    </>
  );
};
export default JobDetail;
