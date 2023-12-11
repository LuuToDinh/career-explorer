import { Box, styled, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import cvIcon from '../../media/cv.png';
import jobinterviewIcon from '../../media/job-interview.png';
import emailIcon from '../../media/email-home.png';

const Guide = () => {
  const { t } = useTranslation();
  const CustomBox = styled(Box)(({ theme }) => ({
    width: '30%',
    [theme.breakpoints.down('md')]: {
      width: '85%',
    },
  }));

  const GuidesBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    width: '70%',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: '0',
      flexDirection: 'column',
    },
  }));

  const GuideBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 auto',
    marginTop: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(2, 0, 2, 0),
    },
  }));

  const Circle = styled('div')({
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    marginBottom: '0.5rem',
    backgroundColor: '#0C4876',
  });

  const StyledBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  });

  const StyledCustomBox = styled(Box)({
    width: '5%',
    height: '5px',
    backgroundColor: '#000339',
    margin: '0 auto',
  });

  const StyledTypography = styled(Typography)({
    fontSize: '35px', 
    fontWeight: 'bold', 
    color: '#0C4876', 
    margin: '24px 0'
  });

  const StyledSmallTypography = styled(Typography)({
    fontSize: '16px',
    fontWeight: '500',
    color: '#5A6473',
    textAlign: 'center',
  });

  const StyledMediumTypography = styled(Typography)({
    fontWeight: '500',
    fontSize: '20px',
    color: '#3B3C45',
    margin: '8px 0',
  });

  const StyledLittleTypography = styled(Typography)({
    fontWeight: 'bold', 
    fontSize: '14px', 
    color: '#343A3F', 
    textAlign: 'center'
  });

  return (
    <StyledBox>
      <StyledCustomBox />

      <StyledTypography variant="h3">
        {t('how')}
      </StyledTypography>

      <CustomBox>
        <StyledSmallTypography variant="body2">
        {t('every')}
        </StyledSmallTypography>
        <StyledSmallTypography variant="body2">
        {t('all')}
        </StyledSmallTypography>
      </CustomBox>

      <GuidesBox>
        <GuideBox>
          <img src={cvIcon} alt="buyIcon" />
          <StyledMediumTypography variant="body2">
            {t('apply')}
          </StyledMediumTypography>
          <Circle />
          <StyledBox>
            <StyledLittleTypography variant="body2">
            {t('text1')}
            </StyledLittleTypography>
          </StyledBox>
        </GuideBox>

        <GuideBox>
          <img src={jobinterviewIcon} alt="buyIcon" />
          <StyledMediumTypography variant="body2">
            {t('interview')}
          </StyledMediumTypography>

          <Circle />
          <StyledBox>
            <StyledLittleTypography variant="body2">
            {t('text2')}
            </StyledLittleTypography>
          </StyledBox>
        </GuideBox>

        <GuideBox>
          <img src={emailIcon} alt="buyIcon" />
          <StyledMediumTypography variant="body2">
            {t('notify')}
          </StyledMediumTypography>

          <Circle />
          <StyledBox>
            <StyledLittleTypography variant="body2">
              {t('text3')}
            </StyledLittleTypography>
          </StyledBox>
        </GuideBox>
      </GuidesBox>
    </StyledBox>
  );
};

export default Guide;
