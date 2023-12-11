import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Box, Typography, Pagination, styled } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import JobItem from './JobItem';
import { JobService } from '../../../../services/job';

const ListStateTypography = styled(Typography)({
  width: '100%',
  textAlign: 'center',
});

const lightTheme = createTheme({ palette: { mode: 'light' } });
const numJobsEachPage = 6;

function JobList({ filter, search = '' }) {
  const { t } = useTranslation();

  const [jobList, setJobList] = useState([]);
  const [lowerSalary, upperSalary] = String(filter.salary).split(' ');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingJobList, setIsLoadingJobList] = useState(true);

  const isMatchedSalaryFilter = useCallback((salary, lowerSalary, upperSalary) => {
    if (lowerSalary === 'all') {
      return true;
    }
    if (lowerSalary === 'upper') {
      return salary >= upperSalary;
    }
    return salary >= lowerSalary && salary < upperSalary;
  }, []);
  const filteredJobList = jobList.filter((job) => {
    const isMatchedSearch = job?.jobTitle.toLowerCase().includes(search.toLowerCase());
    const isMatchedLevel = filter.level === 'all' ? true : job?.level.toLowerCase() === filter.level.toLowerCase();
    const isMatchedWorkModel =
      filter.workModel === 'all' ? true : job?.workModel.toLowerCase() === filter.workModel.toLowerCase();
    const isMatchedSalary = isMatchedSalaryFilter(Number.parseInt(job?.salary, 10), lowerSalary, upperSalary);

    return isMatchedSearch && isMatchedLevel && isMatchedSalary && isMatchedWorkModel;
  });

  const totalPage = Math.ceil(filteredJobList.length / numJobsEachPage);
  const firstJobIndex = numJobsEachPage * (currentPage - 1);
  const lastJobIndex = firstJobIndex + numJobsEachPage;
  const jobListCurrentPage = filteredJobList.slice(firstJobIndex, lastJobIndex);

  const handelPageChange = (e, value) => {
    setCurrentPage(value);
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, search]);

  useEffect(() => {
    const { GetJob } = JobService();
    async function fetchJobList() {
      setIsLoadingJobList(true);
      const response = await GetJob();
      setIsLoadingJobList(false);

      const jobListResponse = response.listGeneralJobInfoResponse;
      setJobList(jobListResponse);
    }

    fetchJobList();
  }, []);

  return (
    <ThemeProvider theme={lightTheme}>
      <Box>
        <Grid container spacing={2}>
          {isLoadingJobList ? (
            <ListStateTypography variant="h5">{t('recruimentPage.jobListLoading')}</ListStateTypography>
          ) : jobListCurrentPage.length > 0 ? (
            jobListCurrentPage.map((recruitment) => (
              <Grid item xs={12} md={6} key={recruitment.id}>
                <JobItem recruitment={recruitment} />
              </Grid>
            ))
          ) : (
            <ListStateTypography variant="h5">{t('recruimentPage.emptyJobList')}</ListStateTypography>
          )}
        </Grid>
        {jobListCurrentPage.length > 0 && (
          <Pagination
            count={totalPage}
            variant="outlined"
            color="primary"
            size="large"
            sx={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}
            page={currentPage}
            onChange={handelPageChange}
          />
        )}
      </Box>
    </ThemeProvider>
  );
}

JobList.propTypes = {
  filter: PropTypes.object,
  search: PropTypes.string,
};

export default JobList;
