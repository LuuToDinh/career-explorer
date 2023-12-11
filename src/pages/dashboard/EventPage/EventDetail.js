import { Helmet } from 'react-helmet-async';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Card, Stack, Button, Container, Typography, styled } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AssignmentIcon from '@mui/icons-material/Assignment';
import dayjs from 'dayjs';
import palette from '../../../theme/palette';
import { GetEventDetailAction } from '../../../redux/actions/EventAction';

const getFormattedDate = (date) => {
  if (!date) return '';
  return dayjs(date).format('DD-MM-YYYY');
};

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
  padding: '20px',
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
const StyledBox = styled(Box)({
  margin: 'auto', 
  width: '70%', 
  display: 'flex',
  justifyContent: 'center'
});

export default function EventDetail() {
  const {t} = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const events = useSelector((state) => state.event.eventDetail);
  useEffect(() => {
    dispatch(GetEventDetailAction(id));
  }, [dispatch, id]);

  const navigate = useNavigate();
  const { title, dateStart, dateEnd, bannerUrl, description } = events;
  const handleToID = (id) => {
    navigate(`/dashboard/event/edit/${id}`);
  };
  return (
    <>
      <Helmet>
        <title> {t("events.event")} </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
          <NavTi>
            <Link to="/dashboard/event" style={{ textDecoration: 'none', color: `${palette.maincolor.primary_light}` }}>
              {t("events.event")} &nbsp;
            </Link>
            / {t("events.details")}
          </NavTi>
          <Button variant="contained" onClick={() => handleToID(id)}>
            {t("edit")}
          </Button>
        </Stack>
        <StyledBox>
          <img src={bannerUrl} alt="Event" />
        </StyledBox>
        <Title1>{title}</Title1>
        <Box>
          <CardBox>
            <Title2 variant="h5">
              <TimeIcon />
                {t("events.deadline")}
            </Title2>
            {getFormattedDate(dateStart)} / {getFormattedDate(dateEnd)}
          </CardBox>
          <CardBox>
            <Title2 variant="h5">
              {' '}
              <AssignIcon />
                {t("events.description")}
            </Title2>
            {description}
          </CardBox>
        </Box>
      </Container>
    </>
  );
}
