import { Box, styled, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { Navbar } from './Navbar';

import FPTImg from '../../media/FPThomescreen.png';
import CustomButton from './CustomButton';

const Hero = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(5),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: '64px',
    color: '#000336',
    fontWeight: 'bold',
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down('sm')]: {
      fontSize: '40px',
    },
  }));

  const StyledBox = styled(Box)({
    backgroundColor: '#E6F0FF', 
    minHeight: '80vh', 
    marginBottom: 10
  });

  const StyledFlexBox = styled(Box)({
    flex: '1',
  });

  const StyledTypography = styled(Typography)({
    fontSize: '18px',
    color: '#687690',
    fontWeight: '500',
    margin: '80px 0 32px'
  });

  const StyledColorTypography = styled(Typography)({
    fontSize: '18px', 
    color: '#5A6473', 
    margin: '32px 0'
  });

  const StyledFlexABox = styled(Box)({
    flex: '1.25',
  });

  return (
    <StyledBox>
      <Container>
        <Navbar />
        <CustomBox>
          <StyledFlexBox>
            <StyledTypography variant="body2">
              Welcome to Minh Software Carrers
            </StyledTypography>
            <Title variant="h1">Find a job which you'll love to do.</Title>
            <StyledColorTypography variant="body2">
              At Minh Software, your opportunities are unlimited. No matter where you come from, what your background
              is, you will find a fit here. Live, learn, and shape the world of technology with us.
            </StyledColorTypography>
            <CustomButton backgroundColor="#0C4876" color="#fff" buttonText="More About Us" heroBtn />
          </StyledFlexBox>

          <StyledFlexABox>
            <img src={FPTImg} alt="FPTImg" style={{ maxWidth: '100%', marginBottom: '2rem', alignItems: 'center' }} />
          </StyledFlexABox>
        </CustomBox>
      </Container>
    </StyledBox>
  );
};

export default Hero;
