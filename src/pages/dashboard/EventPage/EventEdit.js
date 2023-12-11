import * as React from 'react';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Grid, Button, Container, Stack, Typography, TextField, FormControl, styled, FormLabel, Snackbar, Alert } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import palette from '../../../theme/palette';
import {
  UpdateEventIdAction,
  GetEventDetailAction,
  uploadImageFiles,
} from '../../../redux/actions/EventAction';
import { decodeJwt } from '../../../utils/deCode';
import { storage } from '../../../services/storage';

const ButtonAdd = styled(Button)({
  margin: '10px',
  textAlign: 'center',
  width: '150px',
  height: '50px',
  backgroundColor: `${palette.maincolor.primary}`,
  color: 'white',
});
const ButtonCancel = styled(Button)({
  margin: '10px',
  textAlign: 'center',
  width: '150px',
  height: '50px',
  backgroundColor: `${palette.maincolor.dark}`,
  color: 'white',
});
const GroupButton = styled(Container)({
  textAlign: 'center',
  marginTop: '10px',
});
const Label = styled(FormLabel)({
  fontSize: '16px',
  fontWeight: 'bold',
  color: 'grey',
});
const NavTi = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: `${palette.maincolor.primary_light}`,
});
const InputBox = styled(TextField)({
  width: '100%',
});
const StyledGrid = styled(Grid)({
  marginTop: '10px',
});

const getFormattedDate = (date) => {
  if (!date) return '';
  return dayjs(date).format('YYYY-MM-DD');
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear().toString().padStart(4, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function EventEdit() {
  const { t } = useTranslation();
  const [newData, setNewData] = useState();
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = storage.getCache('access_token');
  const { UserId } = decodeJwt(token);

  const data = useSelector((state) => state.event.eventDetail);
  useEffect(() => {
    dispatch(GetEventDetailAction(id));
  }, [id]);
  const { title, dateStart, dateEnd, description } = data;
  useEffect(() => {
    if (data) {
      setNewData({
        event_id: parseIdToInt(id),
        actorId: parseIdToInt(UserId),
        title,
        dateStart: getFormattedDate(dateStart),
        dateEnd: getFormattedDate(dateEnd),
        description,
      });
    }
  }, [data, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const parseIdToInt = (id) => {
    return parseInt(id, 10);
  };

  const handleDateStart = (date) => {
    setNewData((preEvent) => ({
      ...preEvent,
      dateStart: getFormattedDate(date),
    }));
  };

  const handleDateEnd = (date) => {
    setNewData((preEvent) => ({
      ...preEvent,
      dateEnd: getFormattedDate(date),
    }));
  };

  const handleUploads = async(e) => {
    const file = e.target.files;
    if (!file || !file.length) {
      return;
    }
    const formData = new FormData();
    formData.append('file', file[0], { type: 'application/octet-stream' });
    const url = await dispatch(uploadImageFiles(formData, id));
  };

  const handleCancelClick = () => {
    navigate('/dashboard/event', { replace: true });
  };

  const handleSubmit = () => {
    const errors = {};
    if (!newData.title) {
      errors.title = t("events.errorTitle");
    }
    if (!newData.dateStart) {
      errors.dateStart = t("events.errorStart");
    }
    if (!newData.dateEnd) {
      errors.dateEnd = t("events.errorEnd");
    }
    if (!newData.description) {
      errors.description = t("events.errorDes");
    }
    const today = new Date();
    const setToday = formatDate(today);
    if (newData.dateStart && newData.dateStart < setToday) {
      errors.dateStart = t("events.errorNow");
    }
    if (newData.dateStart && newData.dateEnd && newData.dateStart >= newData.dateEnd) {
      errors.dateEnd = t("events.errorAfter");
    }

    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    const response = dispatch(UpdateEventIdAction(newData));
    if (response?.response?.status) {
      setOpenError(true);
      setMessage(response?.response?.message);
    } else setOpen(true)
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    navigate(`/dashboard/event/detail/${id}`);
  };

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false)
  };
  
  return (
    <>
      <Helmet>
        <title> {t("events.event")} </title>
      </Helmet>
      <Container>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}>
          <Alert onClose={handleClose} variant='filled' severity="success" sx={{ width: '100%' }}>
            {t("eventSuccess")}
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          open={openError}
          autoHideDuration={6000}
          onClose={handleCloseError}>
          <Alert onClose={handleCloseError} variant='filled' severity="error" sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <NavTi variant="h4" gutterBottom>
            <Link to="/dashboard/event" style={{ textDecoration: 'none', color: `${palette.maincolor.primary_light}` }}>
              {t("events.event")} &nbsp;
            </Link>
            / {t("edit")}
          </NavTi>
        </Stack>
        <FormControl>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            rowSpacing={1}
            columnSpacing={{ xs: 10, sm: 10, md: 10 }}
          >
            <StyledGrid item xs={10}>
              <Label>{t("events.event")}</Label>
              <div>
                <InputBox type="text" disabled value={data.title} />
              </div>
            </StyledGrid>
            <StyledGrid item xs={10}>
              <Label>{t("events.description")}</Label>
              <div>
                <InputBox
                  type="text"
                  id="outlined-multiline-static"
                  name="description"
                  multiline
                  rows={4}
                  defaultValue={data.description}
                  helperText={validationErrors.description}
                  error={!!validationErrors.description}
                  onChange={handleChange}
                />
              </div>
            </StyledGrid>
            <StyledGrid item xs={3}>
              <Label>{t("startTime")}</Label>
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      value={dayjs(data.dateStart)}
                      name="dateStart"
                      slotProps={{
                        textField: {
                          helperText: validationErrors.dateStart,
                          error: !!validationErrors.dateStart
                        },
                      }}
                      onChange={handleDateStart} />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </StyledGrid>
            <StyledGrid item xs={3}>
              <Label>{t("endTime")}</Label>
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      value={dayjs(data.dateEnd)}
                      slotProps={{
                        textField: {
                          helperText: validationErrors.dateEnd,
                          error: !!validationErrors.dateEnd
                        },
                      }}
                      onChange={handleDateEnd} />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </StyledGrid>
            <StyledGrid item xs={4}>
              <Label>{t("events.imgDes")}</Label>
              <div style={{ paddingTop: '8px' }}>
                <InputBox
                  type="file"
                  id="image_uploads"
                  name="bannerUrl"
                  accept="image/*"
                  onChange={(e) => {
                    handleUploads(e);
                  }}
                />
              </div>
            </StyledGrid>
          </Grid>
        </FormControl>
        <GroupButton>
          <ButtonCancel onClick={handleCancelClick}>{t("cancel")}</ButtonCancel>
          <ButtonAdd onClick={handleSubmit}>{t("detailsPage.save")}</ButtonAdd>
        </GroupButton>
      </Container>
    </>
  );
}
