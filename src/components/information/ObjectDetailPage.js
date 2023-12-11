import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import { Typography, Grid, Box, Paper, Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import { Email } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import InformationContext from './InformationContext';
import palette from '../../theme/palette';

import { GetUserAvatarIdAction } from '../../redux/actions/UserAction';

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
const ButtonGoal = styled(Button)({
  height: '50px',
  width: '150px',

  backgroundColor: `${palette.maincolor.primary}`,
  color: `${palette.maincolor.white}`,
});
const PassedItem = styled(Box)({
  height: '50px',
  width: '150px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: `${palette.maincolor.success}`,
  color: `${palette.maincolor.light}`,
  borderRadius: 10,
});
const FailedItem = styled(Box)({
  height: '50px',
  width: '150px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: `${palette.maincolor.danger}`,
  color: `${palette.maincolor.light}`,
  borderRadius: 10,
});

const StyledEmail = styled(Email)({
  marginRight: '0.5rem',
});

const ObjectDetailPage = ({ data, subject = '' }) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleScheduleClick = () => {
    navigate(`/dashboard/candidatelists/schedule/${id}`, { replace: false });
  };
  const handleResultClick = () => {
    navigate(`/dashboard/candidatelists/result/${id}`, { replace: false });
  };

  const { id, name, mail, measure, urlImage } = data;

  return (
    <>
      <Box>
        <Grid container spacing={2}>
          <Grid item spacing={2} xs={12}>
            <Item>
              {<AvatarDetail alt={name} src={urlImage} />}

              <Grid container spacing={2}>
                <Grid xs={12}>
                  <ItemDetailName>{name}</ItemDetailName>
                </Grid>
                <Grid xs={12}>
                  <ItemDetail>
                    <StyledEmail />
                    {mail}
                  </ItemDetail>
                </Grid>
              </Grid>
              <Grid>
                {(subject === 'candidatedetail' &&
                  (((data.status === 'WAIT_SCHEDULE' || data.status === 'WAIT_INTERVIEW') && (
                    <ButtonGoal variant="contained" onClick={() => handleScheduleClick(id)}>
                      {t('schedule')}
                    </ButtonGoal>
                  )) ||
                    ((data.status === 'FAILED' || data.status === 'PASS') && (
                      <ButtonGoal variant="contained" onClick={() => handleResultClick(id)}>
                        {t('result')}
                      </ButtonGoal>
                    )) ||
                    (data.status === 'WAIT_APPROVAL' && (
                      <ButtonGoal variant="contained" onClick={() => handleResultClick(id)}>
                        {t('decisionCandidate')}
                      </ButtonGoal>
                    )))) ||
                  (subject === 'candidateResult' &&
                    ((data.status === 'FAILED' && (
                      <FailedItem>
                        <Typography variant="h6">{t('failed')}</Typography>{' '}
                      </FailedItem>
                    )) ||
                      (data.status === 'PASS' && (
                        <PassedItem>
                          <Typography variant="h6">{t('passed')}</Typography>
                        </PassedItem>
                      ))))}
              </Grid>
            </Item>
          </Grid>

          {measure.map((field) => {
            return <InformationContext icon={field.icon} title={field.title} context={field.context} md={field.md} />;
          })}
        </Grid>
      </Box>
    </>
  );
};
export default ObjectDetailPage;
