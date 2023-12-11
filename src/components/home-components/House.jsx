import { Box, styled } from '@mui/material';
import React from 'react';

const House = ({ img, salary }) => {
  const HouseBox = styled(Box)(({ theme }) => ({
    backgroundColor: '#E6F0FF',
    borderRadius: '10px',
    maxWidth: '100%',
    margin: theme.spacing(0, 2, 0, 2),
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(2, 0, 2, 0),
    },
  }));

  const ImgContainer = styled(Box)(() => ({
    width: '100%',
  }));

  return (
    <HouseBox>
      <ImgContainer>
        <img src={img} alt="housePhoto" style={{ maxWidth: '100%' }} />
      </ImgContainer>
    </HouseBox>
  );
};

export default House;
