import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import * as MuiIcon from '@mui/icons-material';
import { Stack, Container, Typography, Grid, Box, Paper, Link, Button, Alert, Snackbar } from '@mui/material';
import { useTranslation } from 'react-i18next';

import palette from '../../../theme/palette';
import DataEmptyPage from '../../../components/data-empty-page/DataEmptyPage';
import ObjectDetailPage from '../../../components/information/ObjectDetailPage';
import { AcceptCvApplyAction, GetCvApplyAction, RejectCvApplyAction } from '../../../redux/actions/CvApplyAction';
import { GetInterviewByCadidateJobAction } from '../../../redux/actions/InterviewAction';
import LoadingPage from '../../../components/Loading/Loading';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#f9fafb',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: 'black',
  display: 'flex',
  alignItems: 'center',
}));
const ButtonPass = styled(Button)({
  height: '3.125rem',
  width: '9.4rem',
  margin: '1rem',

  backgroundColor: `${palette.maincolor.success}`,
  color: `${palette.maincolor.white}`,
});
const ButtonFail = styled(Button)({
  height: '3.125rem',
  width: '9.4rem',
  margin: '1rem',
  backgroundColor: `${palette.maincolor.danger}`,
  color: `${palette.maincolor.white}`,
});

const EvaluateComponent = ({ id, name }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [Announce, setAnnounce] = useState({
    announce: '',
  });
  const handleClose = () => {
    setAnnounce({ announce: '' });
  };
  const handleAccept = async () => {
    const isAccept = window.confirm(`Are you sure you want to ACCEPT this canididate: ${name}?`);

    if (isAccept) {
      const response = await dispatch(AcceptCvApplyAction(id));
      if (response.data) {
        setAnnounce({ announce: 'success' });
        window.location.reload();
      } else {
        setAnnounce({ announce: 'error' });
      }
    }
  };
  const handleReject = async () => {
    const isReject = window.confirm(`Are you sure you want to REJECT this canididate: ${name}?`);
    if (isReject) {
      const response = await dispatch(RejectCvApplyAction(id));
      if (response.data) {
        setAnnounce({ announce: 'success' });
        window.location.reload();
      } else {
        setAnnounce({ announce: 'error' });
      }
    }
  };
  return (
    <>
      <Snackbar open={Boolean(Announce.announce)} onClose={handleClose} autoHideDuration={2000}>
        <Alert elevation={6} variant="filled" severity={Announce.announce}>
          {Announce.announce === 'success' ? 'Successful!' : 'Failed!Some thing went wrong!'}
        </Alert>
      </Snackbar>
      <Grid item spacing={2} xs={12}>
        <Item>
          <Grid container spacing={2}>
            <h2>{t('decisionCandidate')}:</h2>
          </Grid>
          <ButtonFail variant="error" onClick={() => handleReject()}>
            {t('reject')}
          </ButtonFail>
          <ButtonPass variant="success" onClick={() => handleAccept()}>
            {t('accept')}
          </ButtonPass>
        </Item>
      </Grid>
    </>
  );
};
const ComponentWhenDataOk = ({ cvApply }) => {
  const { t } = useTranslation();
  const { fullName, email, cvApplyId, jobTitle, level, statusSeeking, candidateId, jobId, urlImage } = cvApply;
  const dispatch = useDispatch();

  const gridMeasure = [
    { id: 'job', title: t('position'), context: [jobTitle], md: 6, icon: MuiIcon.Work },
    { id: 'role', title: t('level'), context: [level], md: 6, icon: MuiIcon.Stars },
  ];

  useEffect(() => {
    dispatch(GetInterviewByCadidateJobAction(candidateId, jobId)).then((res) =>
      setDataDetail({
        ...dataDetail,
        measure: [
          ...gridMeasure,
          {
            id: 'idate',
            title: t('interviewDate'),
            context: [res?.interviewDate.substring(0, 10)],
            md: 6,
            icon: MuiIcon.Transgender,
          },
          { id: 'result', title: t('day.interviewScore'), context: [res?.score], md: 6, icon: MuiIcon.Grade },
          {
            id: 'evaluate',
            title: t('day.interviewerAssessment'),
            context: [res?.note],
            md: 12,
            icon: MuiIcon.Lightbulb,
          },
        ],
      })
    );
  }, [cvApply]);

  const [dataDetail, setDataDetail] = useState({
    id: cvApplyId,
    mail: email,
    name: fullName,
    status: statusSeeking,
    measure: gridMeasure,
    urlImage,
  });
  return (
    <>
      <ObjectDetailPage data={dataDetail} subject={'candidateResult'} />

      {statusSeeking === 'WAIT_APPROVAL' ? <EvaluateComponent name={fullName} id={cvApplyId} /> : <></>}
    </>
  );
};
export default function CandidateResult() {
  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cvApply = useSelector((state) => state.cvApply.cvApply);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(GetCvApplyAction(id)).finally(() => setIsLoading(false));
  }, [dispatch]);
  if (isLoading)
    return (
      <>
        <LoadingPage />
      </>
    );

  const NavTi = styled(Typography)({
    fontSize: '24px',
    fontWeight: 'bold',
    color: `${palette.maincolor.primary_light}`,
  });

  const LinkText = styled(Link)({
    textDecoration: 'none',
    color: `${palette.maincolor.primary_light}`,
  });
  const BoxContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  });
  const BoxData = styled(Box)({
    width: '85%',
  });

  return (
    <>
      <Helmet>
        <title> {t('dashboadNavbar.candidate')} | {t('result')}</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <NavTi variant="h4" gutterBottom>
            <LinkText href={'/dashboard/candidatelists'}>{t('dashboadNavbar.candidate')} &nbsp;</LinkText>/ &nbsp;
            <LinkText href={`/dashboard/candidatelists/detail/${id}`}>{t('detail')} &nbsp;</LinkText>/ {t('result')}
          </NavTi>
        </Stack>
        <BoxContainer>
          {cvApply ? (
            <BoxData>
              <ComponentWhenDataOk cvApply={cvApply} />
            </BoxData>
          ) : (
            <DataEmptyPage />
          )}
        </BoxContainer>
      </Container>
    </>
  );
}
