import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Grid,
  Button,
  Container,
  Stack,
  Typography,
  TextField,
  FormControl,
  styled,
  FormLabel,
  Avatar,
  Box,
  Autocomplete,
  Chip,
  Alert,
  Snackbar,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';

import { decodeJwt } from '../../../utils/deCode';
import { storage } from '../../../services/storage';
import { UpdateCandidateInfoAction, UpdateCandidateAvatarAction } from '../../../redux/actions/CandidateInfoAction';

import palette from '../../../theme/palette';
import './styleUpFile.css';

const LoadingButtonUpdate = styled(LoadingButton)({
  margin: '10px',
  textAlign: 'center',
  width: '150px',
  height: '50px',
  backgroundColor: `${palette.maincolor.primary}`,
  color: 'white',
  ':hover': {
    backgroundColor: '#043860',
  },
});
const ButtonCancel = styled(Button)({
  margin: '10px',
  textAlign: 'center',
  width: '150px',
  height: '50px',
  backgroundColor: `${palette.maincolor.dark}`,
  color: 'white',
  '&:hover': {
    backgroundColor: '#1e2124',
  },
});
const GroupButton = styled(Container)({
  textAlign: 'center',
  marginTop: '10px',
});
const Label = styled(FormLabel)({
  fontSize: '16px',
  fontWeight: 'bold',
  color: 'grey',
  '&.Mui-focused': {
    color: 'grey',
  },
});
const NavTi = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: `${palette.maincolor.primary_light}`,
});
const InputBox = styled(TextField)({
  width: '100%',
});
const AvatarDetail = styled(Avatar)({
  width: '15.625rem',
  height: '15.625rem',
});
const StyledSelect = styled(Select)({
  display: 'block',
  '& label.Mui-focused': {
    color: 'red',
  },
});
const StyledSnackbar = styled(Snackbar)({
  whiteSpace: 'pre-wrap',
  textAlign: 'center',
});

const recommendedSkillList = ['C++', 'Java', 'JavaScript', 'Python', 'C#', 'Ruby', 'Typecript'];

export default function ProfileEdit() {
  const [avatar, setAvatar] = useState({
    preview: null,
    url: null,
  });
  const [fileImage, setFileImage] = useState(null);
  const [candidateInfoInputs, setCandidateInfoInputs] = useState({});
  const [isEmptyInputs, setIsEmptyInputs] = useState([]);
  const [validateEmail, setValidateEmail] = useState('');
  const [validatePhoneNumber, setValidatePhoneNumber] = useState('');

  const candidateInfo = useSelector((state) => state.candidateInfo.info);
  const isLoading = useSelector((state) => state.candidateInfo.isLoading);
  const toastMessage = useSelector((state) => state.candidateInfo.toastMessage);
  const error = useSelector((state) => state.candidateInfo.error);

  const token = storage.getCache('access_token');
  const { UserId } = decodeJwt(token);

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dataInputList = [
    { label: t('candidateProfile.fullName'), key: 'name', col: 6 },
    { label: t('candidateProfile.gender'), key: 'sex', col: 6, component: 'select' },
    { label: 'Email', key: 'email', col: 6 },
    { label: t('candidateProfile.phone'), key: 'phone_num', col: 6, type: 'number' },
    { label: t('change.street'), key: 'street', col: 6 },
    { label: t('change.district'), key: 'district', col: 6 },
    { label: t('change.city'), key: 'city', col: 6 },
    { label: t('change.country'), key: 'nation', col: 6 },
    { label: t('candidateProfile.education'), key: 'education', col: 12, row: 3 },
    { label: t('candidateProfile.certificates'), key: 'certification', col: 12, row: 3 },
    { label: t('candidateProfile.awards'), key: 'award', col: 12, row: 3 },
    { label: t('candidateProfile.projects'), key: 'project', col: 12, row: 3 },
  ];

  const initialSkillList = useRef(
    JSON.parse(localStorage.getItem('candidateInfo')).skill?.map((skill) => skill.skill_name)
  );

  const handleCloseToastMessage = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch({ type: 'CLOSE_TOAST_MESSAGE' });

    if (!isLoading && !error) {
      navigate('/candidate/profile');
    }
  };

  const handleCancelClick = () => {
    navigate('/candidate/profile');
  };

  const handlePreview = (e) => {
    const files = e.target.files;

    if (!files || !files.length) {
      return;
    }

    const previewFile = files[0];
    previewFile.preview = URL.createObjectURL(previewFile);

    const formData = new FormData();
    formData.append('file', previewFile, previewFile.name);

    setAvatar((pre) => ({ ...pre, preview: previewFile.preview }));
    setFileImage(formData);
  };

  const handleInputsChange = (dataInput, value, index) => {
    setCandidateInfoInputs((pre) => ({
      ...pre,
      [dataInput.key]: value,
    }));

    const isEmptyInputList = [...isEmptyInputs];
    isEmptyInputList[index] = false;

    setIsEmptyInputs(isEmptyInputList);
  };

  const handelErrorMessage = (dataInput, index) => {
    if (isEmptyInputs[index]) {
      if (dataInput.key === 'email' && validateEmail === 'INVALID') {
        return t('validateMessageProfile.invalidEmail');
      }

      if (dataInput.key === 'phone_num') {
        switch (validatePhoneNumber) {
          case 'INVALID':
            return t('validateMessageProfile.invalidPhoneNumber');
          case 'ZERO_FIRST':
            return t('validateMessageProfile.zeroFirst');
          case 'OVER_BOUND':
            return t('validateMessageProfile.overBound');
          default:
            return t('validateMessageProfile.phoneNumberInput');
        }
      }

      return t('validateMessageProfile.input');
    }

    return '';
  };

  const handleSubmitEditProfile = () => {
    const {
      name,
      email,
      street,
      district,
      city,
      nation,
      phone_num: phoneNumber,
      level,
      birth_date: birthDate,
      sex,
      skillList,
      education,
      certification,
      award,
      project,
    } = candidateInfoInputs;
    const data = {
      userId: UserId,
      name,
      email,
      phone_num: phoneNumber,
      level,
      sex,
      birth_date: birthDate,
      street,
      district,
      city,
      nation,
      skill: skillList,
      education,
      certification,
      award,
      project,
    };

    const updateCandidateInfo = () => {
      let isAbletoSubmit = true;
      const invalidInputs = [];
      dataInputList.slice(0, 8).forEach((data, index) => {
        invalidInputs[index] = false;
        if (!candidateInfoInputs[data.key]) {
          invalidInputs[index] = true;
          isAbletoSubmit = false;

          setValidateEmail('');
          setValidatePhoneNumber('');
        }
        if (data.key === 'email' && candidateInfoInputs[data.key]) {
          const email = candidateInfoInputs[data.key];
          const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

          if (!pattern.test(email)) {
            invalidInputs[index] = true;
            isAbletoSubmit = false;
            setValidateEmail('INVALID');
          }
        }
        if (data.key === 'phone_num' && candidateInfoInputs[data.key]) {
          const phoneNumber = candidateInfoInputs[data.key];

          if (!Number(phoneNumber)) {
            invalidInputs[index] = true;
            isAbletoSubmit = false;
            setValidatePhoneNumber('INVALID');
          } else if (phoneNumber[0] !== '0') {
            invalidInputs[index] = true;
            isAbletoSubmit = false;
            setValidatePhoneNumber('ZERO_FIRST');
          } else if (phoneNumber.length > 11 || phoneNumber.length < 10) {
            invalidInputs[index] = true;
            isAbletoSubmit = false;
            setValidatePhoneNumber('OVER_BOUND');
          }
        }
      });
      setIsEmptyInputs(invalidInputs);

      if (isAbletoSubmit) {
        dispatch(UpdateCandidateInfoAction(data));

        if (avatar.preview) {
          dispatch(UpdateCandidateAvatarAction(fileImage, UserId));
        } else {
          dispatch({ type: 'UPDATE_CANDIDATE_INFO_ONLY' });
        }
      }
    };
    updateCandidateInfo();
  };

  useEffect(() => {
    if (Object.keys(candidateInfo).length === 0) {
      const data = JSON.parse(localStorage.getItem('candidateInfo'));
      dispatch({ type: 'GET_CANDIDATE_INFO_FROM_LOCAL_STORAGE', payload: data });
    }

    setCandidateInfoInputs({
      ...candidateInfo,
      skillList: initialSkillList.current,
    });

    if (candidateInfo.url) {
      setAvatar((pre) => ({ ...pre, url: candidateInfo.url }));
    }
  }, [candidateInfo]);

  return (
    <Box marginTop="60px" marginBottom="60px">
      <Helmet>
        <title> {t('dashboadNavbar.profile')} </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <NavTi variant="h4" gutterBottom>
            <Link
              to="/candidate/profile"
              style={{ textDecoration: 'none', color: `${palette.maincolor.primary_light}` }}
            >
              {t('candidateProfile.profileInfo')} &nbsp;
            </Link>
            / {t('change.edit')}
          </NavTi>
        </Stack>
        <FormControl>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid item md={4} xs={12} justifyContent={'center'}>
              <Grid container spacing={2}>
                <Grid item xs={12} display="flex" justifyContent={'center'}>
                  <AvatarDetail
                    alt={candidateInfoInputs.name}
                    sx={{ position: 'relative' }}
                    src={avatar.preview ?? avatar.url}
                  />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent={'center'}>
                  <label htmlFor="upload-photo">
                    <input
                      style={{ display: 'none' }}
                      id="upload-photo"
                      name="upload-photo"
                      type="file"
                      onChange={handlePreview}
                    />
                    <Button
                      sx={{ position: 'relative', left: 0 }}
                      color="secondary"
                      variant="contained"
                      component="span"
                    >
                      {t('change.changeAvt')}
                    </Button>
                  </label>
                </Grid>
              </Grid>
            </Grid>
            <Grid item rowSpacing={1} columnSpacing={{ xs: 3, sm: 3, md: 3 }} md={8} sm={12} xs={12}>
              <Grid container spacing={3}>
                {dataInputList.map((dataInput, index) =>
                  dataInput.component === 'select' ? (
                    <Grid key={dataInput.key} item xs={12} md={dataInput.col} marginTop="10px">
                      <Label>{dataInput.label}</Label>
                      <FormControl sx={{ display: 'flex' }} error={isEmptyInputs[index]}>
                        <StyledSelect
                          value={candidateInfoInputs[dataInput.key] ?? ''}
                          onChange={(e) => {
                            setCandidateInfoInputs((pre) => ({ ...pre, [dataInput.key]: e.target.value }));
                          }}
                        >
                          <MenuItem value={'Male'}>{t('change.male')}</MenuItem>
                          <MenuItem value={'Female'}>{t('change.female')}</MenuItem>
                          <MenuItem value={'None'}>{t('change.none')}</MenuItem>
                        </StyledSelect>
                        {isEmptyInputs[index] && <FormHelperText>{t('validateMessageProfile.input')}</FormHelperText>}
                      </FormControl>
                    </Grid>
                  ) : (
                    <Grid key={dataInput.key} item xs={12} md={dataInput.col} marginTop="10px">
                      <Label>{dataInput.label}</Label>
                      <div>
                        <InputBox
                          type={dataInput.type || 'text'}
                          multiline
                          rows={dataInput.row || 1}
                          value={candidateInfoInputs[dataInput.key]}
                          error={isEmptyInputs[index]}
                          helperText={handelErrorMessage(dataInput, index)}
                          onChange={(e) => handleInputsChange(dataInput, e.target.value, index)}
                        />
                      </div>
                    </Grid>
                  )
                )}
                <Grid item xs={12} marginTop="10px">
                  <Label>{t('candidateProfile.skills')}</Label>
                  <Autocomplete
                    multiple
                    options={recommendedSkillList}
                    defaultValue={initialSkillList.current}
                    onChange={(event, newValue) => {
                      setCandidateInfoInputs((pre) => ({ ...pre, skillList: newValue }));
                    }}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" placeholder={t('change.ownSkills')} />
                    )}
                  />
                </Grid>
              </Grid>
              <GroupButton>
                <ButtonCancel onClick={handleCancelClick}>{t('change.cancel')}</ButtonCancel>
                <LoadingButtonUpdate
                  loading={isLoading}
                  loadingPosition="start"
                  startIcon={<Save />}
                  variant="outlined"
                  onClick={handleSubmitEditProfile}
                >
                  {t('change.save')}
                </LoadingButtonUpdate>
                <StyledSnackbar
                  open={toastMessage.isShow}
                  autoHideDuration={2500}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  onClose={handleCloseToastMessage}
                >
                  <Alert
                    onClose={handleCloseToastMessage}
                    severity={toastMessage.status || 'success'}
                    sx={{ width: '100%' }}
                  >
                    {toastMessage.message}
                  </Alert>
                </StyledSnackbar>
              </GroupButton>
            </Grid>
          </Grid>
        </FormControl>
      </Container>
    </Box>
  );
}
