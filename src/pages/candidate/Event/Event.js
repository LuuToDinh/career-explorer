import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import {
  Grid,
  Box,
  Typography,
  Container,
  Card,
  Pagination
} from '@mui/material';

import { TableStack } from '../../../components/@dashboard/table';
import { GetEventAction } from '../../../redux/actions/EventAction';

const CardBox = styled(Card)({
  margin: '10px 0',
  padding: '20px',
  width: '100%',
  display: 'flex',
  cursor: 'pointer'
});
const StyledPaddingBox = styled(Box)({
  paddingTop: '20px',
  paddingBottom: '40px',
})

const StyledMarginBox = styled(Box)({
  marginLeft: '20px'
})

const StyledTypography = styled(Typography)({
  paddingTop: '10px'
})

const StyledTypographyMore = styled(StyledTypography)({
  position: 'absolute',
  right: '20px',
  textDecoration: 'underline'
})

const StyledPagination = styled(Pagination)({
  paddingTop: '20px',
  display: 'flex', 
  justifyContent: 'center'
})

function TruncateText({ text, limit }) {
  if (text.length <= limit) {
    return <span>{text}</span>;
  }
  return <span>{text.substring(0, limit)}...</span>;
}

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear().toString().padStart(4, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${day}-${month}-${year}`;
};

function EventCandidate() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);

  const url = location.pathname
  const data = useSelector((state) => state.event.event);
  useEffect(() => {
    dispatch(GetEventAction(1, 100))
  }, [dispatch]);
  const handleCardboxClick = (id) => {
    navigate(`${url}/detail/${id}`);
  };

  return (
    <>
      {location.pathname !== '/candidate/event' ? (
        <Outlet />
      ) : (
        <>
          <StyledPaddingBox>
            <Container maxWidth="lg">
              <TableStack nameStack={t('events.event')} />
              <Grid container spacing={{ xs: 8, lg: 2 }}>
                <Grid container md={12}>
                  {data.slice(page * 5, (page + 1) * 5).map((item) =>
                  (<CardBox key={item.id} onClick={() => handleCardboxClick(item.id)}>
                    <img src={item.bannerUrl} style={{ width: '200px', height: '200px', objectFit: 'cover' }} alt="ag" />
                    <StyledMarginBox>
                      <Typography variant="h3">
                        {item.title}
                      </Typography>
                      <StyledTypography variant="subtitle1">
                        {formatDate(item.dateStart)} / {formatDate(item.dateEnd)}
                      </StyledTypography>
                      <StyledTypography variant="body1">
                        <TruncateText text={item.description} limit={300} />
                      </StyledTypography>
                      <StyledTypographyMore variant="subtitle1">
                        {t('events.seeMore')}
                      </StyledTypographyMore>
                    </StyledMarginBox>
                  </CardBox>)
                  )}
                </Grid>
              </Grid>
              <StyledPagination
                    count={Math.ceil(data.length / 5)}
                    page={page + 1}
                    onChange={(event, value) => setPage(value - 1)}
                    color="primary"
                  />
            </Container>
          </StyledPaddingBox>
        </>
      )}
    </>
  );
}

export default EventCandidate;
