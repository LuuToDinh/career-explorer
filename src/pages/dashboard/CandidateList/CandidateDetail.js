import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import * as MuiIcon from '@mui/icons-material';
import { Stack, Container, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import palette from '../../../theme/palette';
import DataEmptyPage from '../../../components/data-empty-page/DataEmptyPage';
import ObjectDetailPage from '../../../components/information/ObjectDetailPage';
import { GetCvApplyAction } from '../../../redux/actions/CvApplyAction';
import LoadingPage from '../../../components/Loading/Loading';

const ComponentWhenDataOk = ({ cvApply }) => {
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
  } = cvApply;
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
  const [dataDetail, setDataDetail] = useState({
    id: cvApply.cvApplyId,
    mail: email,
    name: fullName,
    status: statusSeeking,
    measure: gridMeasure,
    avatarUrl: `/assets/images/avatars/avatar_1.jpg`,
    urlImage,
  });
  return <ObjectDetailPage data={dataDetail} subject={'candidatedetail'} />;
};

export default function CandidateDetail() {
  const { id } = useParams();
  const { t } = useTranslation();
  const cvApply = useSelector((state) => state.cvApply.cvApply);
  const dispatch = useDispatch();
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
  const BoxContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  });
  const BoxData = styled(Box)({
    width: '85%',
  });
  const LinkText = styled(Link)({
    textDecoration: 'none',
    color: `${palette.maincolor.primary_light}`,
  });
  return (
    <>
      <Helmet>
        <title> {t('dashboadNavbar.candidate')} | { t('detail')} </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <NavTi variant="h4" gutterBottom>
            <LinkText to="/dashboard/candidatelists">{t('dashboadNavbar.candidate')} &nbsp;</LinkText>/ {t('detail')}
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
