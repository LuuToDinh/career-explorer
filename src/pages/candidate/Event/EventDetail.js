import { Helmet } from 'react-helmet-async';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Card, Stack, Container, Typography, styled } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AssignmentIcon from '@mui/icons-material/Assignment';

import palette from '../../../theme/palette';
import { GetEventDetailAction } from '../../../redux/actions/EventAction';

const TimeIcon = styled(AccessTimeIcon)({
  width: '2rem',
  height: '2rem',
  marginRight: '5px',
});

const AssignIcon = styled(AssignmentIcon)({
  width: '2rem',
  height: '2rem',
  marginRight: '5px',
});

const CardBox = styled(Card)({
  margin: '10px 0',
  padding: '20px 20px 20px 20px',
});

const NavTi = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: `${palette.maincolor.primary_light}`,
});

const Title1 = styled(Typography)({
  margin: 'auto',
  fontSize: '3rem',
  fontWeight: 'bold',
  width: '70%',
  textAlign: 'center',
});

const Title2 = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
});

const StyledContainer = styled(Container)({
  paddingTop: '20px'
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear().toString().padStart(4, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${day}-${month}-${year}`;
};

export default function EventDetailCandidate() {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const events = useSelector((state) => state.event.eventDetail);
  useEffect(() => {
    dispatch(GetEventDetailAction(id));
  }, [id]);
  const { title, dateStart, dateEnd, bannerUrl, description } = events;

  return (
    <>
      <Helmet>
        <title> {t("events.event")} </title>
      </Helmet>
      <StyledContainer>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
          <NavTi>
            <Link to="/candidate/event" style={{ textDecoration: 'none', color: `${palette.maincolor.primary_light}` }}>
              {t('events.event')} &nbsp;
            </Link>
            / {t('events.details')}
          </NavTi>
        </Stack>
        <Box style={{ margin: 'auto', width: '70%', display: 'flex', justifyContent: 'center' }}>
          <img src={bannerUrl} alt="Event" />
        </Box>
        <Title1>{title}</Title1>
        <Box>
          <CardBox>
            <Title2 variant="h5">
              <TimeIcon />
                {t('events.deadline')}
            </Title2>
            {formatDate(dateStart)} / {formatDate(dateEnd)}
          </CardBox>
          <CardBox>
            <Title2 variant="h5">
              {' '}
              <AssignIcon />
                {t('events.description')}
            </Title2>
            {description}
          </CardBox>
        </Box>
      </StyledContainer>
    </>
  );
}
