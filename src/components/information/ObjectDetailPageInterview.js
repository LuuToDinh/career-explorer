import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import * as MuiIcon from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';
import { Grid, Box, Paper, Avatar, Typography, Container, Modal, TextField, Snackbar, Alert } from '@mui/material';
import Button from '@mui/material/Button';
import { Email } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import InformationContext from './InformationContext';
import palette from '../../theme/palette';
import { InterviewResultService } from '../../services/interviewResult';

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

const Name = styled(Typography)({
  fontSize: '30px',
  fontWeight: 'bold',
  marginLeft: '10px',
  marginBottom: '15px',
});

const ShowBox = styled(Box)({
  marginLeft: '100px',
  marginRight: '100px',
  marginTop: '30px',
  marginBottom: '30px',
});

const Email1 = styled(EmailIcon)({
  width: '1.5rem',
  height: '1.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  verticalAlign: 'middle',
  marginRight: '5px',
});

const EmailDetail = styled(Typography)({
  fontSize: '20px',
  display: 'flex',
  marginLeft: '10px',
  marginBottom: '10px',
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
  textAlign: 'right',
  marginTop: '20px',
});

const StyledEmail = styled(Email)({
  marginRight: '0.5rem',
});

const ButtonAdd = styled(Button)({
  margin: '10px',
  textAlign: 'center',
  width: '150px',
  height: '50px',
  backgroundColor: `${palette.maincolor.primary}`,
  color: 'white',
});

const InputText = styled(TextField)({
  width: '45rem',
});

const ObjectDetailPageInterview = ({ data, subject = '' }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [comment, setComment] = useState();
  const [interviewResult, setInterviewResult] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPostResult, setIsLoadingPostResult] = useState(false);
  const [validateScore, setValidateScore] = useState('');
  const [isShowToastMessage, setIsShowToastMessage] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const navigate = useNavigate();
  const handleInterviewClick = () => {
    navigate(`/interviewer/mark/${idInterview}/${id}`, { replace: false });
  };

  const { id, level, jobTitle, name, mail, measure, idInterview, urlImage, interviewDate } = data;

  const date = dayjs(interviewDate).format('YYYY-MM-DD');
  const currentDate = dayjs(new Date()).format('YYYY-MM-DD');

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '62.5rem',
    height: '80vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '10px',
    overflowY: 'scroll',
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleScore = (event) => {
    setScore(event.target.value);
    setValidateScore('');
  };

  const handleComment = (event) => {
    setComment(event.target.value);
  };

  const validateMarkResult = () => {
    switch (validateScore) {
      case 'empty':
        return t('modalRe.empty');
      case 'invalid':
        return t('modalRe.invalid');
      case 'overbound':
        return t('modalRe.overbound');
      default:
        return '';
    }
  };

  const handleCloseToastMessage = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsShowToastMessage(false);
  };

  const handleItemClick = (value) => {
    let isAbleToSubmit = true;

    // Validate score
    if (!score) {
      isAbleToSubmit = false;
      setValidateScore('empty');
    } else if (!Number(score)) {
      isAbleToSubmit = false;
      setValidateScore('invalid');
    } else if (score < 0 || score > 10) {
      isAbleToSubmit = false;
      setValidateScore('overbound');
    } else {
      setValidateScore('');
    }

    if (isAbleToSubmit) {
      setOpen(value);
      const dataChange = {
        interviewId: idInterview,
        question: interviewResult.question,
        note: comment,
        score,
      };
      const { SubmitInterviewResult } = InterviewResultService();
      const postInterviewResult = async () => {
        try {
          setIsLoadingPostResult(true);
          await SubmitInterviewResult(dataChange);
          setIsLoadingPostResult(false);
          setIsShowToastMessage(true);

          setTimeout(() => {
            navigate('/interviewer/list');
          }, 2000);
          
        } catch (error) {
          setIsLoadingPostResult(false);
        }
      };
      postInterviewResult();
    }
  };

  const formatQuestionList = (arr) => {
    const formatArr = arr?.map((question, index) => {
      return `${index + 1}. ${question}`;
    });
    return formatArr?.join('\n');
  };

  useEffect(() => {
    const { GetInterviewResult } = InterviewResultService();
    const fetchInterviewResult = async () => {
      const response = await GetInterviewResult(idInterview);
      setInterviewResult(response);
      setComment(response.note);
      setScore(response.score);
    };
    fetchInterviewResult();
  }, [id]);

  return (
    <>
      <Box>
        <Grid container spacing={2}>
          <Grid item spacing={2} xs={12}>
            <Item>
              <AvatarDetail alt={name} src={urlImage} />
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
                {subject === 'candidatedetail' &&
                  date <= currentDate &&
                  ((data.status !== 'WAIT_INTERVIEW' && (
                    <>
                      <ButtonGoal variant="contained" onClick={handleOpen}>
                        {t('result')}
                      </ButtonGoal>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <ShowBox>
                            <Name> {name}</Name>
                            <EmailDetail>
                              <Email1 /> {mail}
                            </EmailDetail>
                            <Grid container justifyContent="center" alignItems="center" spacing={2}>
                              <InformationContext
                                icon={MuiIcon.Work}
                                title={t('modalRe.jobPosition')}
                                context={[jobTitle]}
                                md={6}
                              />
                              <InformationContext
                                icon={MuiIcon.Stars}
                                title={t('modalRe.level')}
                                context={[level]}
                                md={6}
                              />
                              <InformationContext
                                icon={MuiIcon.Help}
                                title={t('modalRe.interviewQuestion')}
                                context={[formatQuestionList(interviewResult.question)]}
                                md={12}
                              />
                              <Grid item xs={12} md={12}>
                                <Paper elevation={3} sx={{ height: '100%' }}>
                                  <Box padding="12px" display="flex">
                                    <MuiIcon.Star fontSize="small" sx={{ marginRight: '0.5rem', color: 'grey' }} />
                                    <Box>
                                      <Typography variant="body1" sx={{ color: 'grey' }}>
                                        {t('result')}
                                      </Typography>
                                      <InputText
                                        type="text"
                                        value={score}
                                        name="score"
                                        error={!!validateScore}
                                        helperText={validateMarkResult()}
                                        onChange={handleScore}
                                      />
                                    </Box>
                                  </Box>
                                </Paper>
                              </Grid>
                              <Grid item xs={12} md={12}>
                                <Paper elevation={3} sx={{ height: '100%' }}>
                                  <Box padding="12px" display="flex">
                                    <MuiIcon.Assignment
                                      fontSize="small"
                                      sx={{ marginRight: '0.5rem', color: 'grey' }}
                                    />
                                    <Box>
                                      <Typography variant="body1" sx={{ color: 'grey' }}>
                                        {t('modalRe.assessment')}
                                      </Typography>
                                      <InputText
                                        type="text"
                                        value={comment}
                                        name="commemt"
                                        rows={3}
                                        multiline
                                        onChange={handleComment}
                                      />
                                    </Box>
                                  </Box>
                                </Paper>
                              </Grid>
                            </Grid>
                            <GroupButton>
                              <ButtonCancel onClick={handleClose}>{t('modalRe.cancelbtn')}</ButtonCancel>
                              <ButtonAdd onClick={() => handleItemClick(!open)}>{t('modalRe.savebtn')}</ButtonAdd>
                            </GroupButton>
                          </ShowBox>
                        </Box>
                      </Modal>
                    </>
                  )) ||
                    (data.status === 'WAIT_INTERVIEW' && (
                      <ButtonGoal variant="contained" onClick={() => handleInterviewClick(id)}>
                        {t('interview')}
                      </ButtonGoal>
                    )))}
              </Grid>
            </Item>
          </Grid>
          {measure.map((field) => {
            return <InformationContext icon={field.icon} title={field.title} context={field.context} md={field.md} />;
          })}
        </Grid>
        <Snackbar
          open={isShowToastMessage}
          autoHideDuration={3000}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          onClose={handleCloseToastMessage}
        >
          <Alert onClose={handleCloseToastMessage} severity="success" sx={{ width: '100%' }}>
            {t('modalRe.alterRe')}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default ObjectDetailPageInterview;
