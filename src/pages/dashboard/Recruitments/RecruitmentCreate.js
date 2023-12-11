/*eslint-disable*/
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Stack, Container, Typography, Box, styled, Button, Grid, Snackbar } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import MuiAlert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';
import palette from '@/theme/palette';
import { CreateJobAction } from '@/redux/actions/JobAction';

const WorkingForm = [
  {
    value: 'ONLINE',
    label: 'ONLINE',
  },
  {
    value: 'OFFLINE',
    label: 'OFFLINE',
  },
  {
    value: 'HYBRID',
    label: 'HYBRID',
  },
  {
    value: 'REMOTE',
    label: 'REMOTE',
  },
  {
    value: 'FULLTIME',
    label: 'FULLTIME',
  },
  {
    value: 'AT_HOME',
    label: 'AT_HOME',
  },
];
const PositionForm = [
  {
    value: 'Front-end Developer',
    label: 'Front-end Developer',
  },
  {
    value: 'Back-end Developer',
    label: 'Back-end Developer',
  },
  {
    value: 'REACT Developer',
    label: 'REACT Developer',
  },
  {
    value: 'JAVA Developer',
    label: 'JAVA Developer',
  },
  {
    value: 'Fullstack Developer',
    label: 'Fullstack Developer',
  },
  {
    value: 'Devs-Ops',
    label: 'Devs-Ops',
  },
];
const LevelForm = [
  {
    value: 'INTERN',
    label: 'INTERN',
  },
  {
    value: 'FRESHER',
    label: 'FRESHER',
  },
  {
    value: 'SENIOR',
    label: 'SENIOR',
  },
  {
    value: 'MANAGER',
    label: 'MANAGER',
  },
  {
    value: 'DIRECTOR',
    label: 'DIRECTOR',
  },
];
const LocationForm = [
  {
    value: 'FTown1',
    label: 'FTown1',
  },
  {
    value: 'FTown2',
    label: 'FTown2',
  },
  {
    value: 'FTown3',
    label: 'FTown3',
  },
];
const BoxHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '3rem',
});
const NavTi = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: `${palette.maincolor.primary_light}`,
});
const StyledSnackbar = styled(Snackbar)({
  position: 'relative',
  top: '0',
  left: '0',
  width: 'fit-content',
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

export default function RecruitmentCreatePage() {
  const { t } = useTranslation();
  const [newData, setNewData] = useState(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState({});
  useEffect(() => {
    setNewData({
      level: '',
      workingModel: '',
      jobTittle: '',
      jobDescription: '',
      number: 0,
      salary: 0,
      requirement: '',
      benefit: '',
      skills: [],
      location: '',
    });
  }, []);
  const handleCreate = async () => {
    const errors = {};
    if (!newData.jobTittle) {
      errors.jobTittle = t('Recruitment.jobTittleerror');
    }
    if (!newData.level) {
      errors.level = t('Recruitment.levelerror');
    }
    if (!newData.workingModel) {
      errors.workingModel = t('Recruitment.workingModelerror');
    }
    if (!newData.number) {
      errors.number = t('Recruitment.numbererror');
    }
    if (!newData.salary) {
      errors.salary = t('Recruitment.salaryerror');
    }
    if (!newData.location) {
      errors.location = t('Recruitment.locationerror');
    }
    if (newData.skills.length === 0) {
      errors.skills = t('Recruitment.skillserror');
    }
    if (!newData.requirement) {
      errors.requirement = t('Recruitment.requirementerror');
    }
    if (!newData.jobDescription) {
      errors.jobDescription = t('Recruitment.descriptionerror');
    }
    if (!newData.benefit) {
      errors.benefit = t('Recruitment.benefiterror');
    }
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    setOpen(true);
    const response = await dispatch(CreateJobAction(newData));
    if (response) {
      navigate(`/dashboard/recruitment`);
    }
  };
  const handleDenied = () => {
    navigate(`/dashboard/recruitment`);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevJob) => ({
      ...prevJob,
      [name]: value,
    }));
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };
  const handleSkill = (event, selectedValues) => {
    setNewData((prevJob) => ({
      ...prevJob,
      skills: selectedValues,
    }));
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      skills: '',
    }));
  };
  const handleClick = () => {
    navigate(`/dashboard/recruitment`);
  };
  return (
    <>
      <Helmet>
        <title>
          {t('dashboadNavbar.recruitment')} | {t('create')}
        </title>
      </Helmet>
      <StyledSnackbar open={open} autoHideDuration={2000}>
        <MuiAlert severity="success" sx={{ width: '100%' }}>
          {t('Recruitment.messagecreate')}
        </MuiAlert>
      </StyledSnackbar>
      <Container maxWidth="xlx">
        <BoxHeader>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <NavTi variant="h4" gutterBottom>
              <Link
                to="/dashboard/recruitment"
                style={{ textDecoration: 'none', color: `${palette.maincolor.primary_light}` }}
                onClick={handleClick}
              >
                {t('dashboadNavbar.recruitment')} &nbsp;
              </Link>
              / {t('create')}
            </NavTi>
          </Stack>
        </BoxHeader>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            {t('position')}
            <TextField
              name="jobTittle"
              fullWidth
              id="outlined-select-currency"
              select
              helperText={validationErrors.jobTittle || t('Recruitment.jobTittle')}
              onChange={handleChange}
              error={!!validationErrors.jobTittle}
            >
              {PositionForm.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            {t('level')}
            <TextField
              name="level"
              fullWidth
              id="outlined-select-currency"
              select
              helperText={validationErrors.level || t('Recruitment.level')}
              onChange={handleChange}
              error={!!validationErrors.level}
            >
              {LevelForm.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            {t('workForm')}
            <TextField
              name="workingModel"
              fullWidth
              id="outlined-select-currency"
              select
              helperText={validationErrors.workingModel || t('Recruitment.workingModel')}
              onChange={handleChange}
              error={!!validationErrors.workingModel}
            >
              {WorkingForm.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            {t('quantity')}
            <TextField
              fullWidth
              name="number"
              id="outlined-number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              helperText={validationErrors.number || t('Recruitment.number')}
              onChange={handleChange}
              error={!!validationErrors.number}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            {t('salary')}
            <TextField
              name="salary"
              fullWidth
              id="outlined-number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              helperText={validationErrors.salary || t('Recruitment.salary')}
              onChange={handleChange}
              error={!!validationErrors.salary}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            {t('workLocation')}
            <TextField
              name="location"
              fullWidth
              id="outlined-select-currency"
              select
              helperText={validationErrors.location || t('Recruitment.location')}
              onChange={handleChange}
              error={!!validationErrors.location}
            >
              {LocationForm.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={12}>
            {t('skills')}
            <Autocomplete
              name="skills"
              multiple
              id="tags-outlined"
              options={TDskill.map((option) => option.title)}
              filterSelectedOptions
              onChange={handleSkill}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={validationErrors?.skills || ''}
                  helperText={validationErrors.skills || t('Recruitment.skills')}
                  placeholder={t('skills')}
                />
              )}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={12}>
            {t('requirements')}
            <TextField
              name="requirement"
              id="outlined-textarea"
              placeholder={t('requirements')}
              multiline
              rows={4}
              fullWidth
              helperText={validationErrors.requirement || t('Recruitment.requirement')}
              onChange={handleChange}
              error={!!validationErrors.requirement}
              sx={{
                '& textarea': {
                  height: 10,
                  overflowY: 'scroll',
                },
              }}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={12}>
            {t('description')}
            <TextField
              name="jobDescription"
              id="outlined-textarea"
              placeholder={t('description')}
              multiline
              rows={4}
              fullWidth
              helperText={validationErrors.jobDescription || t('Recruitment.description')}
              onChange={handleChange}
              error={!!validationErrors.jobDescription}
              sx={{
                '& textarea': {
                  height: 10,
                  overflowY: 'scroll',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={12}>
            {t('benefit')}
            <TextField
              name="benefit"
              id="outlined-textarea"
              placeholder={t('benefit')}
              multiline
              rows={4}
              fullWidth
              helperText={validationErrors.benefit || t('Recruitment.benefit')}
              onChange={handleChange}
              error={!!validationErrors.benefit}
              sx={{
                '& textarea': {
                  height: 10,
                  overflowY: 'scroll',
                },
              }}
            />
          </Grid>
        </Grid>
        <Box m={1} display="flex" justifyContent="center" alignItems="center">
          <GroupButton>
            <ButtonCancel onClick={handleDenied}>{t('cancel')}</ButtonCancel>
            <ButtonAdd onClick={handleCreate}>{t('Recruitment.create')}</ButtonAdd>
          </GroupButton>
        </Box>
      </Container>
    </>
  );
}

const TDskill = [
  { title: '.NET' },
  { title: 'React' },
  { title: 'Angular' },
  { title: 'Python' },
  { title: 'C++' },
  { title: 'Ada' },
  { title: 'Firebase' },
  { title: 'Java Programming' },
  { title: 'React Programming' },
  { title: 'AI Programming' },
  { title: 'Figma' },
];
