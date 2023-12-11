import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import {
  Grid,
  Box,
  Paper,
  Typography,
  InputAdornment,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Button,
  Container,
} from '@mui/material';
import { Search } from '@mui/icons-material';

import { JobList } from './JobList';
import { TableStack } from '../../../components/@dashboard/table';

const ContainerBox = styled(Box)({
  paddingBottom: '36px',
  paddingTop: '12px',
});
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'transparent',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const StyledBox = styled(Box)({
  display: 'flex',
  alignItems: 'flex-end',
});
const StyledTypography = styled(Typography)({
  marginTop: '20px',
  marginBottom: '6px',
});
const FilterButton = styled(Button)({
  marginTop: '24px',
});
const StyledSelect = styled(Select)({
  height: 48,
});

function JobFinding() {
  const { t } = useTranslation();

  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('all');
  const [salary, setSalary] = useState('all');
  const [workModel, setWorkModel] = useState('all');
  const [filter, setFilter] = useState({
    level: 'all',
    salary: 'all',
    workModel: 'all',
  });

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleChangeLevel = (event) => {
    setLevel(event.target.value);
  };
  const handleChangeSalary = (event) => {
    setSalary(event.target.value);
  };
  const handleChangeWorkModel = (event) => {
    setWorkModel(event.target.value);
  };

  const handleFilter = () => {
    setFilter({
      level,
      salary,
      workModel,
    });
  };

  return (
    <ContainerBox>
      <Container maxWidth="lg">
        <Box marginTop="44px" marginLeft="44px">
          <TableStack nameStack={t('recruimentPage.title')} />
        </Box>

        <Grid container spacing={{ xs: 8, lg: 2 }}>
          <Grid item xs={12} lg={4}>
            <Item>
              <StyledBox>
                <TextField
                  value={search}
                  variant="outlined"
                  placeholder={t('recruimentPage.search')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                    style: {
                      height: 48,
                    },
                  }}
                  fullWidth
                  onChange={handleChangeSearch}
                />
              </StyledBox>
              <div className="filters">
                <div className="filter">
                  <StyledTypography variant="p" component="h3" textAlign="left">
                    {t('recruimentPage.role')}
                  </StyledTypography>
                  <FormControl fullWidth>
                    <StyledSelect value={level} onChange={handleChangeLevel}>
                      <MenuItem value="all">{t('recruimentPage.all')}</MenuItem>
                      <MenuItem value="intern">Intern</MenuItem>
                      <MenuItem value="fresher">Fresher</MenuItem>
                      <MenuItem value="junior">Junior</MenuItem>
                      <MenuItem value="senior">Senior</MenuItem>
                      <MenuItem value="manager">{t('dropDown.manager')}</MenuItem>
                    </StyledSelect>
                  </FormControl>
                </div>

                <div className="filter">
                  <StyledTypography variant="p" component="h3" textAlign="left">
                    {t('recruimentPage.salary')}
                  </StyledTypography>
                  <FormControl fullWidth>
                    <StyledSelect value={salary} onChange={handleChangeSalary}>
                      <MenuItem value={'all'}>{t('recruimentPage.all')}</MenuItem>
                      <MenuItem value={'0 500'}>$0 - $500</MenuItem>
                      <MenuItem value={'500 1000'}>$500 - $1000</MenuItem>
                      <MenuItem value={'1000 2000'}>$1000 - $2000</MenuItem>
                      <MenuItem value={'upper 2000'}>$2000 {t('up')}</MenuItem>
                    </StyledSelect>
                  </FormControl>
                </div>

                <div className="filter">
                  <StyledTypography variant="p" component="h3" textAlign="left">
                    {t('recruimentPage.workingForm')}
                  </StyledTypography>
                  <FormControl fullWidth>
                    <StyledSelect value={workModel} defaultValue={1} onChange={handleChangeWorkModel}>
                      <MenuItem value="all">{t('recruimentPage.all')}</MenuItem>
                      <MenuItem value="onsite">{t('recruimentPage.w1')}</MenuItem>
                      <MenuItem value="remote">{t('recruimentPage.w2')}</MenuItem>
                      <MenuItem value="at_home">{t('recruimentPage.w3')}</MenuItem>
                      <MenuItem value="hybrid">{t('recruimentPage.w4')}</MenuItem>
                    </StyledSelect>
                  </FormControl>
                </div>
              </div>
              <FilterButton variant="contained" size="large" onClick={handleFilter}>
                {t('recruimentPage.apply')}
              </FilterButton>
            </Item>
          </Grid>
          <Grid item xs={12} lg={8}>
            <Item>
              <JobList filter={filter} search={search} />
            </Item>
          </Grid>
        </Grid>
      </Container>
    </ContainerBox>
  );
}

export default JobFinding;
