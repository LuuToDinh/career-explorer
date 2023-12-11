import { Helmet } from 'react-helmet-async';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import * as MuiIcon from '@mui/icons-material';
import {
  Stack,
  Container,
  Typography,
  Grid,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  styled,
  FormLabel,
  Alert,
  Snackbar,
  Link,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import DataEmptyPage from '../../../components/data-empty-page/DataEmptyPage';
import ObjectDetailPage from '../../../components/information/ObjectDetailPage';
import palette from '../../../theme/palette';
import { GetCvApplyAction } from '../../../redux/actions/CvApplyAction';
import {
  GetInterviewByCadidateJobAction,
  PostInterviewAction,
  PutInterviewAction,
} from '../../../redux/actions/InterviewAction';
import { GetInterviewerListAction } from '../../../redux/actions/InterviewerAction';
import LoadingPage from '../../../components/Loading/Loading';

const InputBox = styled(TextField)({
  width: '100%',
});
const SelectBox = styled(Select)({
  width: '100%',
});
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

const LabelFormSchedule = styled(FormLabel)({
  color: 'black',
  fontSize: 17,
  fontWeight: 'bold',
});
const TimePickerStyled = styled(TimePicker)({
  width: '100%',
});
const DatePickerStyled = styled(DatePicker)({
  width: '100%',
});
const ScheduleForm = ({ candidateId, jobId, statusSeeking }) => {
  const { t } = useTranslation();
  const dataScheduleApi = useSelector((state) => state.interview.interview);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetInterviewByCadidateJobAction(candidateId, jobId));
  }, [dispatch]);

  const [Announce, setAnnounce] = useState({
    announce: '',
  });
  const handleClose = () => {
    setAnnounce({ announce: '' });
  };

  const [dataSchedule, SetDataSchedule] = useState({
    interviewerId: null,
    interviewDate: dayjs().format('YYYY-MM-DD'),
    interviewTime: dayjs().format('HH:mm:ss'),
    interviewForm: null,
    location: null,
  });
  useEffect(() => {
    if (statusSeeking === 'WAIT_INTERVIEW' && dataScheduleApi) {
      SetDataSchedule({
        interviewerId: dataScheduleApi.listInterviewer[0],
        interviewDate: dataScheduleApi.interviewDate,
        interviewTime: dataScheduleApi.interviewTime,
        interviewForm: dataScheduleApi.interviewForm,
        location: dataScheduleApi.location,
      });
    }
  }, [dataScheduleApi]);
  const handleDataScheduleChange = (key, value) => {
    SetDataSchedule((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleMakeSchedule = async () => {
    const dataPost = {
      candidateId,
      jobId,
      interviewers: [dataSchedule.interviewerId],
      interviewDate: dataSchedule.interviewDate.substring(0, 10),
      interviewTime: dataSchedule.interviewTime.substring(0, 5),
      interviewForm: dataSchedule.interviewForm,
      location: dataSchedule.location,
    };
    const isCreate = window.confirm(`Are you sure you want to CREATE new schedule for this candidate?`);

    console.log(dataPost);
    if (isCreate) {
      const response = await dispatch(PostInterviewAction(dataPost));
      if (response.data) {
        setAnnounce({ announce: 'success' });
      } else {
        setAnnounce({ announce: 'error' });
      }
    }
  };

  const handleEditSchedule = async () => {
    const dataPut = {
      id: dataScheduleApi.interviewID,
      candidateId: dataScheduleApi.candidateID,
      jobId: dataScheduleApi.jobID,
      interviewer: [dataSchedule.interviewerId],
      interviewDate: dataSchedule.interviewDate.substring(0, 10),
      interviewTime: dataSchedule.interviewTime.substring(0, 5),
      interviewForm: dataSchedule.interviewForm,
      isPass: dataScheduleApi.isPass,
      active: dataScheduleApi.active,
      location: dataSchedule.location,
      note: 'Candidate lacked experience with automated testing tools',
      score: 0,
    };

    const isEdit = window.confirm(`Are you sure you want to EDIT schedule for this candidate?`);

    if (isEdit) {
      const response1 = await dispatch(PutInterviewAction(dataPut));
      if (response1.data) {
        setAnnounce({ announce: 'success' });
      } else {
        setAnnounce({ announce: 'error' });
      }
    }
  };
  const [validationErrors, setValidationErrors] = useState({});

  const handleClickButton = ({ action = 'create' }) => {
    const errors = {};
    if (!dataSchedule.interviewerId) {
      errors.interviewerId =t("Note.interviewerId");
    }
    if (!dataSchedule.interviewForm) {
      errors.interviewForm = t("Note.interviewForm");
    }
    if (!dataSchedule.interviewDate) {
      errors.interviewDate = t("Note.interviewDate");
    }
    if (!dataSchedule.interviewTime) {
      errors.interviewTime = t("Note.interviewTime");
    }
    if (!dataSchedule.location) {
      errors.location =t("Note.location");
    }


    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    if (action === 'create') {
      handleMakeSchedule();
    } else {
      handleEditSchedule();
    }
  };

  const interviewerList = useSelector((state) => state.interviewer.interviewerList);
  useEffect(() => {
    dispatch(GetInterviewerListAction(1, 100));
  }, [dispatch]);

  return (
    <>
      <Snackbar open={Boolean(Announce.announce)} onClose={handleClose} autoHideDuration={2000}>
        <Alert elevation={6} variant="filled" severity={Announce.announce}>
          {Announce.announce === 'success' ? 'Thành công!' : 'Có lỗi xảy ra!'}
        </Alert>
      </Snackbar>

      <Box>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 12, sm: 10 }} style={{ marginTop: 30 }}>
          <Grid item xs={12} md={6}>
            <LabelFormSchedule>{t('interviewer')}</LabelFormSchedule>
            <TextField
              name="interviewer"
              fullWidth
              id="outlined-select-currency"
              select
              onChange={(event) => handleDataScheduleChange('interviewerId', event.target.value)}
              value={dataSchedule.interviewerId}
              helperText={validationErrors.interviewerId || ''}
              error={!!validationErrors.interviewerId}
            >
              {interviewerList ? (
                interviewerList.map((item) => <MenuItem value={item.userId}>{item.fullName}</MenuItem>)
              ) : (
                <></>
              )}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <LabelFormSchedule>{t('interviewForm')}</LabelFormSchedule>
            <TextField
              name="interviewForm"
              fullWidth
              id="outlined-select-currency"
              select
              onChange={(event) => handleDataScheduleChange('interviewForm', event.target.value)}
              value={dataSchedule.interviewForm}
              helperText={validationErrors.interviewForm || ''}
              error={!!validationErrors.interviewForm}
            >
              <MenuItem value={'ONLINE'}>Online</MenuItem>
              <MenuItem value={'OFFLINE'}>{t('faceToFace')}</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} md={12}>
            {dataSchedule.interviewForm === 'ONLINE' ? (
              <LabelFormSchedule>Link Google Meet</LabelFormSchedule>
            ) : (
              <LabelFormSchedule>{t('interviewLocation')}</LabelFormSchedule>
            )}

            <InputBox
              type="text"
              onChange={(event) => handleDataScheduleChange('location', event.target.value)}
              value={dataSchedule.location}
              helperText={validationErrors.location || ''}
              error={!!validationErrors.location}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <LabelFormSchedule>{t('interviewDate')}</LabelFormSchedule>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePickerStyled
                  label={t("Announce.selectDate")}
                  renderInput={(params) => <TextField {...params} />}
                  value={dayjs(dataSchedule.interviewDate)}
                  onChange={(value) => {
                    handleDataScheduleChange('interviewDate', value.format('YYYY-MM-DD'));
                  }}
                  helperText={'Vui lòng KHÔNG chọn ngày hôm nay và quá khứ'}
                  error={!!validationErrors.intervieweDate}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} md={6}>
            <LabelFormSchedule>{t('interviewTime')}</LabelFormSchedule>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['TimePicker']}>
                <TimePickerStyled
                  label={t("Announce.selectTime")}
                  renderInput={(params) => <TextField {...params} />}
                  value={dayjs(`1970-01-01T${dataSchedule.interviewTime}`).set({
                    hour: dayjs(dataSchedule.interviewTime).hour(),
                    second: dayjs(dataSchedule.interviewTime).second(),
                  })}
                  onChange={(value) => {
                    handleDataScheduleChange('interviewTime', value.format('HH:mm:ss'));
                  }}
                  helperText={validationErrors.interviewTime || ''}
                  error={!!validationErrors.interviewTime}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
        </Grid>

        <GroupButton style={{ marginTop: 30 }}>
          <ButtonCancel>{t('cancel')}</ButtonCancel>
          {dataScheduleApi ? (
            <ButtonAdd onClick={() => handleClickButton({ action: 'edit' })}>{t('save')}</ButtonAdd>
          ) : (
            <ButtonAdd onClick={() => handleClickButton({ action: 'create' })}>{t('create')}</ButtonAdd>
          )}
        </GroupButton>
      </Box>
    </>
  );
};
const ComponentWhenDataOk = ({ cvApply }) => {
  const { t } = useTranslation();
  const { fullName, email, level, jobTitle, skill, statusSeeking, urlImage } = cvApply;
  const gridMeasure = [
    { id: 'job', title: t('position'), context: [jobTitle], md: 6, icon: MuiIcon.Phone },
    { id: 'role', title: t('level'), context: [level], md: 6, icon: MuiIcon.Stars },
    { id: 'skill', title: t('skill'), context: [skill], md: 12, icon: MuiIcon.Work },
    { id: 'cv', title: 'CV', context: ['CV.pdf'], md: 12, icon: MuiIcon.Assignment },
  ];
  const [dataDetail, setDataDetail] = useState({
    id: cvApply.cvApplyId,
    mail: email,
    name: fullName,
    measure: gridMeasure,
    urlImage,
  });
  return (
    <>
      <ObjectDetailPage data={dataDetail} />

      <ScheduleForm
        candidateId={cvApply.candidateId}
        jobId={cvApply.jobId}
        id={cvApply.cvApplyId}
        statusSeeking={statusSeeking}
      />
    </>
  );
};
export default function CandidateSchedule() {
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
        <title>
          {' '}
          {t('dashboadNavbar.candidate')} | {t('schedule')}{' '}
        </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <NavTi variant="h4" gutterBottom>
            <LinkText href={'/dashboard/candidatelists'}>{t('dashboadNavbar.candidate')} &nbsp;</LinkText>/ &nbsp;
            <LinkText href={`/dashboard/candidatelists/detail/${id}`}>{t('detail')} &nbsp;</LinkText>/ {t('schedule')}
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
