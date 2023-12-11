import {
  Box,
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  Stack,
  Autocomplete,
  ThemeProvider,
  createTheme,
  Snackbar,
  Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Work, Delete, Stars, Lightbulb, Star, ListAlt, Save } from '@mui/icons-material';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';

import palette from '../../theme/palette';
import { useDebounce } from '../../hooks/useDebounce';
import { InterviewResultService } from '../../services/interviewResult';
import { QuestionService } from '../../services/question';
import { CvApplyService } from '../../services/cv_apply';

const theme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          minHeight: 42,
          border: '1px solid #707070',
          boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.4)',
          borderRadius: '5px',
        },
      },
    },
  },
});

const ContentFrame = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 42,
  minWidth: 42,
  borderRadius: 8,
});
const QuestionIndexBox = styled(ContentFrame)({
  border: '1px solid #000',
  height: 42,
  boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.4)',
});
const NavTi = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: `${palette.maincolor.primary_light}`,
});
const StyledContainer = styled(Container)({
  marginTop: '44px',
  marginBottom: '44px',
});
const StyledPaper = styled(Paper)({
  borderRadius: '12px',
  padding: '32px',
});
const AboutCandidateBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '24px',
  marginBottom: '24px',
});
const SubmitButton = styled(LoadingButton)({
  display: 'flex',
  margin: 'auto',
  color: '#fff',
  height: '42px',
});
const AddQuestionButton = styled(Button)({
  marginTop: '12px',
  marginBottom: '20px',
});
const RemoveQuestionButton = styled(Button)({
  height: '42px',
  border: '1px solid #AF8181',
  boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.4)',
});
const InterviewResultBox = styled(Box)({
  borderRadius: '4px',
  border: '1px solid #0C4876',
  padding: '18px',
});
const StyledSnackbar = styled(Snackbar)({
  textAlign: 'center',
  whiteSpace: 'pre-wrap',
});

const ContentFrameBox = ({ Icon, title, children }) => {
  return (
    <Paper elevation={3} sx={{ height: '100%' }}>
      <Box padding="12px" display="flex">
        <Icon fontSize="small" sx={{ marginRight: '6px' }} />
        <Box width="100%">
          <Typography variant="body1" component="h1" fontWeight="600" lineHeight={1} marginBottom="8px">
            {title}
          </Typography>
          {children}
        </Box>
      </Box>
    </Paper>
  );
};

function InterviewerMark() {
  const [mark, setMark] = useState(null);
  const [review, setReview] = useState('');
  const [questionInputList, setQuestionInputList] = useState([]);
  const [suggestedQuestionList, setSuggestedQuestionList] = useState([]);
  const [cvApplyInfo, setCvApplyInfo] = useState({});
  const [isLoadingPostResult, setIsLoadingPostResult] = useState(false);
  const [isOpenConfirm, setOpenConfirm] = useState(false);
  const [isEmptyQuestions, setIsEmptyQuestions] = useState([]);
  const [validateMark, setValidateMark] = useState('');
  const [isEmptyReview, setIsEmptyReview] = useState(false);
  const [searchQuestion, setSearchQuestion] = useState('');
  const [toastMessage, setToastMessage] = useState({
    isShow: false,
    status: '',
    message: '',
  });
  const [errorResponse, setErrorResponse] = useState(null);

  const { interviewId, cvApplyId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const responsiveMarginNav = useMediaQuery('(min-width: 620px)') ? '44px' : '0';

  const questionList = useRef([]);
  const idQuestionRemove = useRef(null);
  const indexQuestionRemove = useRef(null);

  const searchQuestionDebounce = useDebounce(searchQuestion, 1500);

  const validateMarkResult = () => {
    switch (validateMark) {
      case 'EMPTY':
        return t('validateInterviewResult.emptyMark');
      case 'INVALID':
        return t('validateInterviewResult.requiredNumber');
      case 'OVER_BOUND':
        return t('validateInterviewResult.overBound');
      default:
        return '';
    }
  };

  const handleOpenConFirm = (id, index) => {
    idQuestionRemove.current = id;
    indexQuestionRemove.current = index;
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleCloseToastMessage = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setToastMessage((pre) => ({ ...pre, isShow: false }));

    if (!isLoadingPostResult && !errorResponse) {
      navigate('/interviewer/list');
    }
  };

  const handleAddQuestion = () => {
    const newQuestionInputList = questionInputList.concat({
      id: questionInputList[questionInputList.length - 1]?.id + 1 || 1,
    });
    setQuestionInputList(newQuestionInputList);

    questionList.current = [...questionList.current, ''];
  };

  const handleRemoveQuestion = (id, index) => {
    const newQuestionInputList = questionInputList.filter((question) => question.id !== id);
    setQuestionInputList(newQuestionInputList);

    questionList.current.splice(index, 1);

    handleCloseConfirm();
  };

  const handleUpdateQuestionList = (value, index) => {
    questionList.current[index] = value;

    const isEmptyQuestionsList = [...isEmptyQuestions];
    isEmptyQuestionsList[index] = false;
    setIsEmptyQuestions(isEmptyQuestionsList);

    setSearchQuestion(value);
  };

  const handleChangeMarkInput = (e) => {
    setMark(e.target.value);
    setValidateMark('');
  };

  const handleChangeReviewInput = (e) => {
    setReview(e.target.value);
    setIsEmptyReview(false);
  };

  const handleSubmitResult = () => {
    let isAbleToSubmit = true;
    if (!mark) {
      isAbleToSubmit = false;
      setValidateMark('EMPTY');
    } else if (!Number(mark)) {
      isAbleToSubmit = false;
      setValidateMark('INVALID');
    } else if (mark < 0 || mark > 10) {
      isAbleToSubmit = false;
      setValidateMark('OVER_BOUND');
    } else {
      setValidateMark('');
    }
    if (!review) {
      isAbleToSubmit = false;
      setIsEmptyReview(true);
    } else {
      setIsEmptyReview(false);
    }
    const invalidQuestions = [];
    questionList.current.forEach((question, index) => {
      invalidQuestions[index] = false;
      if (!question) {
        isAbleToSubmit = false;
        invalidQuestions[index] = true;
      }
    });
    setIsEmptyQuestions(invalidQuestions);

    if (isAbleToSubmit) {
      const { SubmitInterviewResult } = InterviewResultService();
      const data = {
        interviewId,
        question: questionList.current,
        note: review,
        score: mark,
      };

      const postInterviewResult = async () => {
        try {
          setIsLoadingPostResult(true);

          await SubmitInterviewResult(data);

          setIsLoadingPostResult(false);
          setErrorResponse(null);
          setToastMessage({
            isShow: true,
            status: 'success',
            message: t('toastMessage.updateSuccess'),
          });
        } catch (error) {
          setIsLoadingPostResult(false);
          setErrorResponse(error);

          if (error.response?.status === 'NOT_FOUND') {
            setToastMessage({
              isShow: true,
              status: 'error',
              message: t('toastMessage.notFounded'),
            });
          } else {
            setToastMessage({
              isShow: true,
              status: 'error',
              message: `${t('toastMessage.updateFailure')}\n${error.response?.error}: ${error.response?.message}`,
            });
          }
        }
      };

      postInterviewResult();
    }
  };

  useEffect(() => {
    const { GetCvApply } = CvApplyService();
    const getCandidateInfo = async () => {
      const response = await GetCvApply(cvApplyId);

      setCvApplyInfo(response);
    };

    getCandidateInfo();
  }, []);

  useEffect(() => {
    const { SearchQuestion } = QuestionService();
    const getSuggestedQuestionList = async () => {
      const response = await SearchQuestion(searchQuestionDebounce);

      const responseData = response.data;
      const questionListResponse = responseData.listQuestion;

      const questionListStr = questionListResponse.map((question) => question.question);
      setSuggestedQuestionList(questionListStr);
    };

    getSuggestedQuestionList();
  }, [searchQuestionDebounce]);

  return (
    <StyledContainer maxWidth="lg">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} marginLeft={responsiveMarginNav}>
        <NavTi variant="h4" gutterBottom>
          <Link to="/interviewer/list" style={{ textDecoration: 'none', color: `${palette.maincolor.primary_light}` }}>
            {t('detailInter.titlePageInfor_1')} &nbsp;
          </Link>
          <Link
            to={`/interviewer/list/detail/${cvApplyId}`}
            style={{ textDecoration: 'none', color: `${palette.maincolor.primary_light}` }}
          >
            {t('detailInter.titlePageInfor_2')} &nbsp;
          </Link>
          <Link to="" style={{ textDecoration: 'none', color: `${palette.maincolor.primary_light}` }}>
            / {t('detailInter.interviewbtn')} &nbsp;
          </Link>
        </NavTi>
      </Stack>

      <StyledPaper elevation={4}>
        <Typography variant="h3" fontWeight="700">
          {cvApplyInfo?.fullName}
        </Typography>
        <AboutCandidateBox>
          <Grid container spacing={{ xs: 2, md: 4 }}>
            <Grid item xs={12} md={3}>
              <ContentFrameBox Icon={Work} title={t('detailInter.jobPosition')}>
                <Typography variant="body2">{cvApplyInfo?.jobTitle}</Typography>
              </ContentFrameBox>
            </Grid>
            <Grid item xs={12} md={3}>
              <ContentFrameBox Icon={Stars} title={t('detailInter.level')}>
                <Typography variant="body2">{cvApplyInfo?.level}</Typography>
              </ContentFrameBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <ContentFrameBox Icon={Lightbulb} title={t('detailInter.skill')}>
                <Typography variant="body2">{cvApplyInfo?.skill}</Typography>
              </ContentFrameBox>
            </Grid>
          </Grid>
        </AboutCandidateBox>

        <InterviewResultBox>
          {/* Questions */}
          <Typography variant="h4" marginBottom="12px">
            {t('day.titleQuestion')}
          </Typography>
          <Box className="questions">
            {questionInputList.map((question, index) => (
              <Box
                key={question.id}
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                marginTop="12px"
              >
                <QuestionIndexBox>{index + 1}</QuestionIndexBox>
                <ContentFrame flex="1" marginRight="16px" marginLeft="16px">
                  <ThemeProvider theme={theme}>
                    <Autocomplete
                      freeSolo
                      options={suggestedQuestionList}
                      fullWidth
                      onChange={(e, value) => handleUpdateQuestionList(value, index)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          variant="outlined"
                          placeholder={t('day.text1')}
                          error={isEmptyQuestions[index]}
                          helperText={isEmptyQuestions[index] && t('day.text1')}
                          onChange={(e) => handleUpdateQuestionList(e.target.value, index)}
                        />
                      )}
                    />
                  </ThemeProvider>
                </ContentFrame>
                <ContentFrame>
                  <RemoveQuestionButton
                    variant="contained"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => {
                      handleOpenConFirm(question.id, index);
                    }}
                  >
                    {t('day.delete')}
                  </RemoveQuestionButton>
                </ContentFrame>
              </Box>
            ))}

            <AddQuestionButton onClick={handleAddQuestion}>{t('day.titleAddQuestion')}</AddQuestionButton>
            <Dialog open={isOpenConfirm} onClose={handleCloseConfirm}>
              <DialogTitle id="alert-dialog-title">{t('day.text4')}</DialogTitle>
              <DialogContent>
                <DialogContentText>{t('day.text3')}</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    handleRemoveQuestion(idQuestionRemove.current, indexQuestionRemove.current);
                  }}
                >
                  {t('day.delete')}
                </Button>
                <Button variant="contained" color="primary" onClick={handleCloseConfirm} autoFocus>
                  {t('day.cancel')}
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
          <Box className="results" display="flex" justifyContent="space-between" marginBottom="24px">
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <ContentFrameBox Icon={Star} title={t('day.interviewScore')}>
                  <Box height="100%">
                    <TextField
                      required
                      size="small"
                      variant="standard"
                      placeholder={t('day.text5')}
                      fullWidth
                      error={!!validateMark}
                      helperText={validateMarkResult()}
                      onChange={handleChangeMarkInput}
                    />
                  </Box>
                </ContentFrameBox>
              </Grid>
              <Grid item xs={12} md={8}>
                <ContentFrameBox Icon={ListAlt} title={t('day.interviewerAssessment')}>
                  <Box height="100%">
                    <TextField
                      required
                      size="small"
                      variant="standard"
                      placeholder={t('day.text6')}
                      fullWidth
                      error={isEmptyReview}
                      helperText={isEmptyReview && t('validateInterviewResult.emptyNote')}
                      onChange={handleChangeReviewInput}
                    />
                  </Box>
                </ContentFrameBox>
              </Grid>
            </Grid>
          </Box>

          <SubmitButton
            variant="contained"
            type="submit"
            color="success"
            size="medium"
            loading={isLoadingPostResult}
            loadingPosition={'start'}
            startIcon={<Save />}
            onClick={handleSubmitResult}
          >
            {isLoadingPostResult ? t('day.saving') : t('day.saveResults')}
          </SubmitButton>
          <StyledSnackbar
            open={toastMessage.isShow}
            autoHideDuration={2500}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            onClose={handleCloseToastMessage}
          >
            <Alert onClose={handleCloseToastMessage} severity={toastMessage.status || 'success'} sx={{ width: '100%' }}>
              {toastMessage.message}
            </Alert>
          </StyledSnackbar>
        </InterviewResultBox>
      </StyledPaper>
    </StyledContainer>
  );
}

export default InterviewerMark;
