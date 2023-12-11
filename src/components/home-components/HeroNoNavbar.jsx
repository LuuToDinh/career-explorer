import { Box,styled, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useTranslation } from 'react-i18next';

import FPTImg from "../../media/FPThomescreen.png";
import CustomButton from "./CustomButton";

const HeroNoNavbar = () => {
  const { t } = useTranslation();
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#000336",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
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
        <CustomBox>
          <StyledFlexBox>
            <StyledTypography variant="body2">
            {t('welcome')}
            </StyledTypography>
            <Title variant="h1">
            {t('title')}
            </Title>
            <StyledColorTypography>
            {t('descriptionCan')}
            </StyledColorTypography>
            <CustomButton
              backgroundColor="#0C4876"
              color="#fff"
              buttonText={t('moreAbout')}
              heroBtn
            />
          </StyledFlexBox>

          <StyledFlexABox>
            <img
              src={FPTImg}
              alt="FPTImg"
              style={{ maxWidth: "100%", marginBottom: "2rem" , alignItems: "center" }}
            />
          </StyledFlexABox>
        </CustomBox>
      </Container>
    </StyledBox>
  );
};

export default HeroNoNavbar;
