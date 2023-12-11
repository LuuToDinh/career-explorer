import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Paper, Box, Divider, Chip, styled } from '@mui/material';
import { Apartment, AttachMoney, Groups, Stars } from '@mui/icons-material';

const StyledPaper = styled(Paper)({
  textAlign: 'left ',
  padding: '16px',
  borderRadius: '8px',
});
const StyledTypography = styled(Typography)({
  marginBottom: '16px',
});
const StyledDivider = styled(Divider)({
  marginBottom: '16px',
});
const StyledChip = styled(Chip)({
  marginRight: '6px',
});

const StyledIcon = ({ Icon, color }) => (
  <Icon color={color || 'inherit'} fontSize="small" sx={{ marginRight: '6px' }} />
);

function JobItem({ recruitment }) {
  const { t } = useTranslation();

  const formatedDate = useCallback((dateReleaseJob) => {
    if (dateReleaseJob) {
      const dateNowStr = new Date().toLocaleDateString();
      const dateNow = dateNowStr.split('/').map((time) => {
        if (time.length < 2) {
          return '0'.concat(time);
        }
        return time;
      });
      const temp = dateNow[0];
      dateNow[0] = dateNow[1];
      dateNow[1] = temp;

      const dateReleaseStr = dateReleaseJob.slice(0, 10);
      const dateRelease = dateReleaseStr.split('-').reverse();

      if (dateNow[1] === dateRelease[1] && dateNow[2] === dateRelease[2]) {
        const passedDate = dateNow[0] - dateRelease[0];
        switch (passedDate) {
          case 0:
            return t('recruimentPage.postedToday');
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
            return `${t('recruimentPage.postedAgo')} ${passedDate} ${t('recruimentPage.postedDate')}`;
          default:
            return `${t('recruimentPage.postedAt')} ${dateRelease.join('/')}`;
        }
      }
      return `${t('recruimentPage.postedAt')} ${dateRelease.join('/')}`;
    }
    return '';
  }, []);

  return (
    <Link to={`/candidate/jobDetail/${recruitment?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <StyledPaper elevation={3}>
        <StyledTypography variant="body2" component="h6">
          {formatedDate(recruitment?.dateRelease)}
        </StyledTypography>
        <StyledTypography fontWeight={600} variant="h6">
          {recruitment?.jobTitle}
        </StyledTypography>
        <Box marginBottom="16px" display="flex" alignItems="center">
          <StyledIcon Icon={AttachMoney} color="success" />
          <Typography variant="body1" component="h1" fontWeight="600" color="#2e7d32" lineHeight={1}>
            {t('recruimentPage.upTo')} {recruitment.salary}
          </Typography>
        </Box>
        <Box marginBottom="16px" display="flex" alignItems="center">
          <StyledIcon Icon={Groups} />
          <Typography variant="body2" component="h6">
            {recruitment.number} {t('recruimentPage.People')}
          </Typography>
        </Box>

        <StyledDivider variant="middle" />

        <Box marginBottom="16px" display="flex" alignItems="center">
          <StyledIcon Icon={Stars} />
          <Typography variant="body2" component="h6">
            {recruitment.level}
          </Typography>
        </Box>
        <Box marginBottom="16px" display="flex" alignItems="center">
          <StyledIcon Icon={Apartment} />
          <Typography variant="body2" component="h6">
            {recruitment.location}
          </Typography>
        </Box>

        <Box
          marginTop="12px"
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          overflow="auto"
          minHeight={32}
          sx={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {recruitment.skills?.map((skill, index) => (
            <StyledChip key={index} label={skill} variant="outlined" />
          ))}
        </Box>
      </StyledPaper>
    </Link>
  );
}

JobItem.propTypes = {
  recruitment: PropTypes.object.isRequired,
};

export default JobItem;
