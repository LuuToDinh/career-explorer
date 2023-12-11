// import Hero from '../../components/home-components/Hero'
import { Box, styled, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from '@mui/system';
import { Navbar } from '../../components/home-components/Navbar';
import Footer from '../../components/home-components/Footer';
import AboutUsImg1 from '../../media/AboutUs/AboutUsImage1.png';
import AboutUsImg2 from '../../media/AboutUs/AboutUsImage2.png';
import CampusImg1 from '../../media/AboutUs/CampusImage1.png';
import CampusImg2 from '../../media/AboutUs/CampusImage2.png';
import CampusImg3 from '../../media/AboutUs/CampusImage3.png';
import CampusImg4 from '../../media/AboutUs/CampusImage4.png';
import GuideImg1 from '../../media/AboutUs/GuideImage1.png';
import GuideImg2 from '../../media/AboutUs/GuideImage2.png';
import GuideImg3 from '../../media/AboutUs/GuideImage3.png';

function AboutUs() {
  const { t } = useTranslation();
  const CustomBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(5),
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
  const CustomBox2 = styled(Box)(({ theme }) => ({
    width: '50%',
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

  const StyledColorBox = styled(Box)({
    backgroundColor: '#E6F0FF',
  });

  const StyledColorMarginBox = styled(StyledColorBox)({
    marginBottom: '40px',
  });

  const StyledFlexBox = styled(Box)({
    flex: '1',
  });

  const StyledTitle = styled(Title)({
    color: '#0C4876',
  });

  const StyledTypography = styled(Typography)({
    fontSize: '18px',
    color: '#5A6473',
    margin: '32px 0',
  });

  const StyledFlexBoxImage = styled(StyledFlexBox)({
    justifyContent: 'center',
    maxWidth: '100%',
    backgroundSize: 'cover',
    // marginBottom: '40px'
  });

  const StyledFlexBoxDirection = styled(StyledFlexBox)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  });

  const StyledBigTypography = styled(Typography)({
    fontSize: '35px',
    fontWeight: 'bold',
    color: '#0C4876',
    margin: '24px 0',
  });

  const StyledContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'row',
  });

  const StyledBigFlexBox = styled(Box)({
    flex: '1.25',
  });

  const StyledLargeFlexBox = styled(Box)({
    flex: '3',
  });

  return (
    <StyledColorBox>
      <StyledColorMarginBox>
        <Container>
          <CustomBox>
            <StyledFlexBox>
              <StyledTitle variant="h2">{t('aboutUsPage.AboutUs')}</StyledTitle>
              <StyledTypography variant="body2">
                {t('aboutUsPage.aboutDecription')}
              </StyledTypography>
            </StyledFlexBox>
          </CustomBox>
        </Container>
      </StyledColorMarginBox>

      <StyledFlexBoxImage>
        <img src={AboutUsImg1} alt="FPTImg" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
      </StyledFlexBoxImage>

      <StyledFlexBoxDirection>
        <GuidesBox>
          <GuideBox>
            <img src={GuideImg1} alt="GuideImg1" />
          </GuideBox>
          <GuideBox>
            <img src={GuideImg2} alt="GuideImg2" />
          </GuideBox>
          <GuideBox>
            <img src={GuideImg3} alt="GuideImg3" />
          </GuideBox>
        </GuidesBox>
      </StyledFlexBoxDirection>

      <StyledFlexBoxImage>
        <img src={AboutUsImg2} alt="FPTImg" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
      </StyledFlexBoxImage>

      <StyledFlexBoxDirection>
        <StyledBigTypography variant="h2">{t('aboutUsPage.campus')}</StyledBigTypography>

        <CustomBox2>
          <StyledTypography variant="body2">
            {t('aboutUsPage.text1')}
          </StyledTypography>
        </CustomBox2>

        <GuidesBox>
          <GuideBox>
            <img src={CampusImg1} alt="CampusImg1" />
          </GuideBox>
          <GuideBox>
            <img src={CampusImg2} alt="CampusImg2" />
          </GuideBox>
          <GuideBox>
            <img src={CampusImg3} alt="CampusImg3" />
          </GuideBox>
        </GuidesBox>

        <CustomBox>
          <StyledContainer>
            <StyledBigFlexBox>
              <StyledTitle variant="h2">HO CHI MINH M-Town</StyledTitle>
            </StyledBigFlexBox>

            <StyledLargeFlexBox>
              <StyledTypography variant="body2">
                {t('aboutUsPage.text2')}
              </StyledTypography>
            </StyledLargeFlexBox>
          </StyledContainer>
        </CustomBox>
      </StyledFlexBoxDirection>

      <StyledFlexBoxImage>
        <img src={CampusImg4} alt="FPTImg" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
      </StyledFlexBoxImage>

      <Footer />
    </StyledColorBox>
  );
}

export default AboutUs;
