import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import * as MuiIcon from '@mui/icons-material';
import { Stack, Container, Typography, Box, CircularProgress } from '@mui/material';

import palette from '../../theme/palette';
import DataEmptyPage from '../../components/data-empty-page/DataEmptyPage';
import { GetCvApplyAction } from '../../redux/actions/CvApplyAction';
import ObjectDetailPageInterview from '../../components/information/ObjectDetailPageInterview';

const ComponentWhenDataOk = ({ CvApplyData }) => {
  const { t } = useTranslation();
  const {
    fullName,
    email,
    phoneNumber,
    level,
    jobTitle,
    skill,
    educations,
    personalProjects,
    fullLocation,
    sex,
    certifications,
    statusSeeking,
    awards,
    linkCV,
    urlImage,
    interviewDate,
  } = CvApplyData;

  const gridMeasure = [
    { id: 'jobTitle', title: t('position'), context: [jobTitle], md: 6, icon: MuiIcon.Work },
    { id: 'jobLevel', title: t('level'), context: [level], md: 6, icon: MuiIcon.Stars },
    { id: 'sex', title: t('gender'), context: [sex === 'MALE' ? 'Nam' : 'Nữ'], md: 6, icon: MuiIcon.Transgender },
    { id: 'phone', title: t('phoneNum'), context: [phoneNumber], md: 6, icon: MuiIcon.Phone },
    { id: 'fullLocation', title: t('address'), context: [fullLocation], md: 12, icon: MuiIcon.LocationOn },
    { id: 'skill', title: t('skill'), context: [skill], md: 12, icon: MuiIcon.Lightbulb },
    {
      id: 'education',
      title: t('education'),
      context: educations.map((item) => item.description),
      md: 12,
      icon: MuiIcon.School,
    },
    {
      id: 'certificate',
      title: t('certificate'),
      context: certifications.map((item) => item.description),
      md: 12,
      icon: MuiIcon.EventNote,
    },
    {
      id: 'award',
      title: t('trophies'),
      context: awards.map((item) => item.description),
      md: 12,
      icon: MuiIcon.WorkspacePremium,
    },
    {
      id: 'project',
      title: t('project'),
      context: personalProjects.map((item) => item.description),
      md: 12,
      icon: MuiIcon.Task,
    },
    { id: 'cv', title: 'CV', context: [linkCV], md: 12, icon: MuiIcon.Assignment },
  ];
  const dataDetail = {
    id: CvApplyData.cvApplyId,
    idInterview: CvApplyData.interviewId,
    mail: email,
    name: fullName,
    status: statusSeeking,
    measure: gridMeasure,
    level,
    jobTitle,
    urlImage,
    interviewDate,
    
  };
  return <ObjectDetailPageInterview data={dataDetail} subject={'candidatedetail'} />;
};

export default function CandidateDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const CvApplyData = useSelector((state) => state.cvApply.cvApply);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetCvApplyAction(id));
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const NavTi = styled(Typography)({
    fontSize: '24px',
    fontWeight: 'bold',
    color: `${palette.maincolor.primary_light}`,
  });

  return (
    <>
      <Helmet>
        <title>{t('infor.titlePage')}</title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <NavTi variant="h4" gutterBottom>
            <Link
              to="/interviewer/list"
              style={{ textDecoration: 'none', color: `${palette.maincolor.primary_light}` }}
            >
              {t('detailInter.titlePageInfor_1')} &nbsp;
            </Link>
            {t('detailInter.titlePageInfor_2')}
          </NavTi>
        </Stack>
        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {isLoading && !CvApplyData ? (
            <Box sx={{ flexGrow: 1, textAlign: 'center', justifyContent: 'center' }}>
              {' '}
              <CircularProgress />{' '}
            </Box>
          ) : CvApplyData ? (
            <>
              <Box style={{ width: '85%' }}>
                <ComponentWhenDataOk CvApplyData={CvApplyData} />
              </Box>
            </>
          ) : (
            <DataEmptyPage />
          )}
        </Box>
      </Container>
    </>
  );
}
