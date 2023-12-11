import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// mui
import {
  Grid,
  Stack,
  Typography,
  Box,
  Paper,
  styled,
  Avatar,
  Container,
  Button,
  CircularProgress,
} from '@mui/material';
import * as MuiIcon from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';

import InformationContext from '../../components/information/InformationContext';
import palette from '../../theme/palette';
import { decodeJwt } from '../../utils/deCode';
import { storage } from '../../services/storage';
import { GetCandidateInfoAction, GetCandidateAvatarAction } from '../../redux/actions/CandidateInfoAction';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#F9FAFB',
  padding: theme.spacing(1),
  textAlign: 'left',
  color: 'black',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));
const AvatarDetail = styled(Avatar)({
  width: '100px',
  height: '100px',
});
const ItemDetail = styled(Item)({
  marginLeft: '20px',
  fontSize: '20px',
  justifyContent: 'flex-start',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
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
const ButtonGoal = styled(Button)({
  height: '50px',
  width: '150px',
  marginRight: '32px',
  backgroundColor: `${palette.maincolor.primary}`,
  color: `${palette.maincolor.white}`,
});
const LoadingProgressBox = styled(Box)({
  flexGrow: 1,
  textAlign: 'center',
  justifyContent: 'center',
});
const StyledContainer = styled(Container)({
  marginTop: '60px',
  marginBottom: '60px',
  paddingRight: 0,
});
const HideTextOverflowBox = styled(Box)({
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
});

export default function CandidateInfo() {
  const dispatch = useDispatch();

  const candidateInfo = useSelector((state) => state.candidateInfo.info);
  const isLoading = useSelector((state) => state.candidateInfo.isLoading);

  const { t } = useTranslation();

  const combineArrayToStr = useCallback((arr, key, splitValue = ', ', listedStyle = '') => {
    const formattedArray = arr?.map((ele) => ele[key] && listedStyle + ele[key]);

    return formattedArray?.join(splitValue);
  }, []);

  const dataList = [
    {
      icon: MuiIcon.Person,
      title: t('candidateProfile.gender'),
      context: [candidateInfo.sex || t('candidateProfile.noData')],
      col: 5,
    },
    {
      icon: MuiIcon.Phone,
      title: t('candidateProfile.phone'),
      context: [candidateInfo.phone_num || t('candidateProfile.noData')],
      col: 5,
    },
    {
      icon: MuiIcon.Business,
      title: t('candidateProfile.address'),
      context: [`${candidateInfo.street} ${candidateInfo.district} ${candidateInfo.city} ${candidateInfo.nation}`],
      col: 10,
    },
    {
      icon: MuiIcon.TipsAndUpdates,
      title: t('candidateProfile.skills'),
      context: [combineArrayToStr(candidateInfo.skill, 'skill_name') || t('candidateProfile.noData')],
      col: 10,
    },
    {
      icon: MuiIcon.School,
      title: t('candidateProfile.education'),
      context: [candidateInfo.education || t('candidateProfile.noData')],
      col: 10,
    },
    {
      icon: MuiIcon.Badge,
      title: t('candidateProfile.certificates'),
      context: [candidateInfo.certification || t('candidateProfile.noCertificate')],
      col: 10,
    },
    {
      icon: MuiIcon.WorkspacePremium,
      title: t('candidateProfile.awards'),
      context: [candidateInfo.award || t('candidateProfile.noAward')],
      col: 10,
    },
    {
      icon: MuiIcon.AccountTree,
      title: t('candidateProfile.projects'),
      context: [candidateInfo.project || t('candidateProfile.noProject')],
      col: 10,
    },
  ];

  const navigate = useNavigate();

  const token = storage.getCache('access_token');
  const { UserId } = decodeJwt(token);

  const handleNavigate = () => {
    navigate(`/candidate/profileEdit`);
  };

  useEffect(() => {
    dispatch(GetCandidateInfoAction(UserId));
    dispatch(GetCandidateAvatarAction(UserId));
  }, []);

  return (
    <StyledContainer maxWidth="lg">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <NavTi variant="h4" gutterBottom>
          {t('candidateProfile.profileInfo')}
        </NavTi>
      </Stack>
      {isLoading ? (
        <LoadingProgressBox>
          <CircularProgress />
          <Typography variant="h4">{t('candidateProfile.loading')}</Typography>
        </LoadingProgressBox>
      ) : (
        <StyledBox>
          <Grid justifyContent="center" alignItems="center" container spacing={2}>
            <Grid item xs={12} md={10}>
              <Item>
                <Grid container spacing={2} marginBottom="28px">
                  <Grid item xs={12} md={9}>
                    <Item>
                      <AvatarDetail alt={candidateInfo.name} src={candidateInfo.url} />
                      <Grid container textOverflow="ellipsis" overflow="hidden">
                        <Grid item xs={12}>
                          <ItemDetailName>{candidateInfo.name} </ItemDetailName>
                        </Grid>
                        <Grid item xs={12}>
                          <ItemDetail>
                            <EmailIconDetail />
                            <HideTextOverflowBox>{candidateInfo.email}</HideTextOverflowBox>
                          </ItemDetail>
                        </Grid>
                      </Grid>
                    </Item>
                  </Grid>
                  <Grid item xs={12} md={3} display="flex" justifyContent="center" alignItems="center">
                    <ButtonGoal variant="contained" onClick={handleNavigate}>
                      {t('candidateProfile.edit')}
                    </ButtonGoal>
                  </Grid>
                </Grid>
              </Item>
            </Grid>
            <Grid container justifyContent="center" alignItems="center" spacing={2}>
              {dataList.map((dataItem) => (
                <InformationContext
                  key={dataItem.title}
                  icon={dataItem.icon}
                  title={dataItem.title}
                  context={dataItem.context}
                  md={dataItem.col}
                />
              ))}
            </Grid>
          </Grid>
        </StyledBox>
      )}
    </StyledContainer>
  );
}
