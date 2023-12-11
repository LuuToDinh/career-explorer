import { Box, Container, styled, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import logosImg from '../../media/logos.png';

const Companies = () => {
  const { t } = useTranslation();
  const CustomContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      marginBottom: theme.spacing(4),
    },
  }));

  const CustomBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(4),
    },
  }));

  const StyledBox = styled(Box)({
    backgroundColor: '#E6F0FF',
  });

  const StyledTypography = styled(Typography)({
    color: '#7D8589',
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '16px'
  });

  const StyledContainer = styled(Container)({
    display: 'flex', 
    flexDirection: 'column', 
    marginBottom: '2rem', 
    marginTop: '1rem'
  });

  return (
    <StyledBox>
      <CustomContainer>
        <CustomBox>
          <StyledTypography variant="body2">
            {t('moreThan')}
          </StyledTypography>
        </CustomBox>
      </CustomContainer>

      <StyledContainer>
        <img src={logosImg} alt="logos" />
      </StyledContainer>
    </StyledBox>
  );
};

export default Companies;
