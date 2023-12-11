/*eslint-disable*/
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SmsFailedTwoToneIcon from '@mui/icons-material/SmsFailedTwoTone';
import { Stack, Container, Typography, Box, styled, Card, Grid, Divider, Pagination } from '@mui/material';
import palette from '../../theme/palette';
import { storage } from '../../services/storage';
import { decodeJwt } from '../../utils/deCode';
import { CandidateGetCvAction,ClearCandidateAction } from '../../redux/actions/CandidateRolesAction';
import LoadingPage from '../../components/Loading/Loading';

const NavTi = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: `${palette.maincolor.primary_light}`,
});
const BoxHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
});
const ContainerBox = styled(Card)({
  marginTop: '1em',
  marginBottom: '1em',

  padding: '2rem',
  background: 'none',
});
const BoxAnnounce = styled(Card)({
  margin: '6em auto',
  padding: '2rem',
  background: 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});
const MyContent = styled(Stack)({
  margin: '20px 0',
});
const BoxContent = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});
const HeadContent = styled(Typography)({
  fontSize: '2em',
  fontWeight: 'bold',
});
const SalaryText = styled(Typography)({
  color: '#6fde6f',
});
const Status = styled(Typography)(({ theme, color, isWaiting }) => ({
  marginTop: '1.1em',
  color: isWaiting ? '#f0c021' : color === 'FAIL' ? theme.palette.error.main : theme.palette.success.main,
}));
const ContentData = styled('span')({
  marginLeft: '1em',
});

const getToken = storage.getCache('access_token');
const token = getToken && decodeJwt(getToken);
const UserId = token && token.UserId;

function History() {
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const getCvCurrent = useSelector((state) => state.candidateCurrent.info);
  
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);

    const fetchData = async  () => {
     dispatch(ClearCandidateAction())

     dispatch(CandidateGetCvAction(UserId));
      setLoading(false);
    };

    fetchData().finally(() => setLoading(false));
  }, [UserId]);

  if (isLoading) {
    return (
      <div> 
        <LoadingPage />
      </div>
    );
  }

  if (!getCvCurrent || getCvCurrent.info.length === 0) {
    return (
      <BoxAnnounce>
        <SmsFailedTwoToneIcon style={{ fontSize: '4rem' }} />
        <Typography>{t('his.announce')}</Typography>
      </BoxAnnounce>
    );
  } else {
    const getinfoData = getCvCurrent && getCvCurrent.info;

  return (
    <>
      <Helmet>
        <title>{t('history')}</title>
      </Helmet>
      <Container>
        <BoxHeader>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <NavTi>{t('his.job')}</NavTi>
          </Stack>
        </BoxHeader>
        <ContainerBox>
          {getinfoData.slice(page * 5, (page + 1) * 5).map((data) => (
            <ContainerBox key={data?.id}>
              <Grid xl={6}>
                <BoxContent>
                  {data?.jobInfo.map((job) => (
                    <>
                      <MyContent>
                        <HeadContent>{job?.jobTittle}</HeadContent>
                        <Typography>
                          {t('his.day')}: <ContentData> {job?.dateRelease.substring(0, 10)}</ContentData>
                        </Typography>
                        <Typography>
                          {t('his.form')}:<ContentData> {job?.workingModel} </ContentData>
                        </Typography>
                      </MyContent>
                      <MyContent>
                        <SalaryText>{t('his.salary')}: {job?.salary}$</SalaryText>
                      </MyContent>
                    </>
                  ))}
                </BoxContent>
                <Divider />
                <Status
                  color={data?.statusSeeking === 'FAIL' ? 'red' : 'green'}
                  isWaiting={data?.statusSeeking.startsWith('WAIT')}
                >
                  {t('his.status')}: {data?.statusSeeking}
                </Status>{' '}
              </Grid>
            </ContainerBox>
          ))}
          <Pagination
            count={Math.ceil(getinfoData.length / 5)}
            page={page + 1}
            onChange={(event,value) => setPage(value - 1)}
            color="primary"
          />
        </ContainerBox>
      </Container>
    </>
  );
}
}

export default History
