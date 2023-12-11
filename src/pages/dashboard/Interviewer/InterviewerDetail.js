import { Helmet } from 'react-helmet-async';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import * as MuiIcon from '@mui/icons-material';
import { Stack, Container, Typography, Grid, Box, Paper, Avatar, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { GetCvApplyByCandidateJobAction } from '../../../redux/actions/CvApplyAction';
import DataEmptyPage from '../../../components/data-empty-page/DataEmptyPage';
import ObjectDetailPage from '../../../components/information/ObjectDetailPage';
import { GetInterviewerAction } from '../../../redux/actions/InterviewerAction';
import palette from '../../../theme/palette';
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
const ButtonGoal = styled(Button)({
  height: '50px',
  width: '150px',
  backgroundColor: `${palette.maincolor.primary}`,
  color: `${palette.maincolor.light}`,
});
const CandidateItem = styled(Item)({
  backgroundColor: `${palette.maincolor.primary_shadow}`,
  padding: '1rem',
  marginTop: '1rem',
  marginBottom: '1rem',
});
const AvatarCandidate = styled(Avatar)({
  width: '4.3rem',
  height: '4.3rem',
  marginRight: 20,
});

const StyledGrid = styled(Grid)({
  marginTop: '1rem',
});

const BoxNameCandidate = styled(Box)({
  fontWeight: 'bold',
  fontSize: 20,
  marginBottom: '0.3rem',
});
const BoxContextCandidate = styled(Box)({
  display: 'grid',
  fontSize: 15,
  marginLeft: '0.4rem',
});
const BoxTextCandidate = styled(Box)({
  marginBottom: '0.1rem',
});

const CandidateIsInterviewedList = ({ candidateList }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [jobId, setJobId] = useState(0);
  const [candidateId, setCandidateId] = useState(0);
  const cvApply = useSelector((state) => state.cvApply.cvApply);

  useEffect(() => {
    dispatch(GetCvApplyByCandidateJobAction(candidateId, jobId));
  }, [dispatch,candidateId, jobId]);

  const handleClick = async ({ jobId, candidateId }) => {
    setCandidateId(candidateId);
    setJobId(jobId);
    if (cvApply) {
      navigate(`/dashboard/candidatelists/result/${cvApply?.id}`);
    }
  };
  const sortedCandidates = candidateList?.sort((a, b) => {
    return a.active === b.active ? 0 : a.active ? -1 : 1;
  });
  return (
    <StyledGrid item spacing={2} xs={12} md={12}>
      <Typography variant="h4">{t('candidateList')}</Typography>

      {sortedCandidates?.map((item) => (
        <CandidateItem>
          <AvatarCandidate alt="name" src={`/assets/images/avatars/avatar_1.jpg`} />
          <Grid container>
            <Box>
              <BoxNameCandidate>{item.fullName}</BoxNameCandidate>

              <BoxContextCandidate>
                <BoxTextCandidate>{item.jobTittle}</BoxTextCandidate>
                <BoxTextCandidate>{item.level}</BoxTextCandidate>
              </BoxContextCandidate>
            </Box>
          </Grid>
          {item.active ? (
            <ButtonGoal onClick={() => handleClick({ candidateId: item.candidate_id, jobId: item.job_id })}>
              {t('result')}
            </ButtonGoal>
          ) : (
            <></>
          )}
        </CandidateItem>
      ))}
    </StyledGrid>
  );
};
const ComponentWhenDataOk = ({ Interviewer }) => {
  const { t } = useTranslation();
  const { phone, level, skill, email, fullName } = Interviewer;
  const dispatch=useDispatch()
  const userInterviewer=useSelector((status)=>status.session.user)
  const gridMeasure = [
    { id: 'phone', title: t('phoneNum'), context: [phone], md: 6, icon: MuiIcon.Phone },
    { id: 'level', title: t('level'), context: [level], md: 6, icon: MuiIcon.Stars },
    { id: 'skill', title: t('skill'), context: [skill], md: 12, icon: MuiIcon.Work },
  ];
  const [dataDetail,setDataDetail] = useState({
    id: Interviewer.userId,
    mail: email,
    name: fullName,
    measure: gridMeasure,
  });
  return (
    <Box style={{ width: '85%' }}>
      <ObjectDetailPage data={dataDetail} />
      <CandidateIsInterviewedList candidateList={Interviewer.listHistoryInterviewByInterviewerResponse} />
    </Box>
  );
};
export default function InterviewerDetail() {
  const { id } = useParams();
  const {t}=useTranslation()
  const [isLoading, setIsLoading] = useState(true);
  const Interviewer = useSelector((state) => state.interviewer.interviewer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetInterviewerAction(id)).finally(() => setIsLoading(false));
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


  return (
    <>
      <Helmet>
        <title> {t('interviewer')} | {t('detail')} </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <NavTi variant="h4" gutterBottom>
            <LinkText to="/dashboard/interviewers">{t('dashboadNavbar.interviewer')} &nbsp;</LinkText>/ {t('detail')}
          </NavTi>
        </Stack>

        <BoxContainer>
          {Interviewer ? <ComponentWhenDataOk Interviewer={Interviewer} /> : <DataEmptyPage />}
        </BoxContainer>
      </Container>
    </>
  );
}
