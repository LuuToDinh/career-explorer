import { styled, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';

import fbIcon from '../../media/fbicon.png';
import twitterIcon from '../../media/twittericon.png';
import linkedinIcon from '../../media/linkedinicon.png';
import logoImg from '../../media/HomeLogo.png';

const Footer = () => {
  const { t } = useTranslation();
  const CustomContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      textAlign: 'center',
    },
    backgroundColor: '#608FB7',
  }));

  const IconBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  }));

  const FooterLink = styled('span')(({ theme }) => ({
    fontSize: '16px',
    color: 'white',
    fontWeight: '300',
    cursor: 'pointer',
    '&:hover': {
      color: 'white',
    },
  }));

  const StyledTypography = styled(Typography)({
    fontSize: '20px',
    color: '#1C1C1D',
    fontWeight: '700',
    margin: '16px 0',
  });

  const StyledWhiteTypography = styled(Typography)({
    fontSize: '16px',
    color: 'white',
    fontWeight: '500',
    margin: '16px 0',
  });

  const StyledBox = styled(Box)({
    padding: '80px 0',
    backgroundColor: '#608FB7',
  });

  const StyledCenterBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
  });

  return (
    <StyledBox>
      <CustomContainer>
        <StyledCenterBox>
          <img src={logoImg} alt="logo" />
        </StyledCenterBox>

        <Box>
          <StyledTypography>{t('footer.product')}</StyledTypography>

            <FooterLink>{t('footer.listing')}</FooterLink>
            <br />
            <FooterLink>{t('footer.properties')}</FooterLink>
            <br />
            <FooterLink>{t('footer.agents')}</FooterLink>
            <br />
            <FooterLink>{t('footer.blog')}</FooterLink>
          </Box>

        <Box>
          <StyledTypography>{t('footer.resource')}</StyledTypography>

            <FooterLink>{t('footer.ourHome')}</FooterLink>
            <br />
            <FooterLink>{t('footer.stories')}</FooterLink>
            <br />
            <FooterLink>{t('footer.video')}</FooterLink>
            <br />
            <FooterLink>{t('footer.free')}</FooterLink>
          </Box>

        <Box>
          <StyledTypography>{t('footer.company')}</StyledTypography>

          <FooterLink>{t('footer.partnership')}</FooterLink>
          <br />
          <FooterLink>{t('footer.term')}</FooterLink>
          <br />
          <FooterLink>{t('footer.privacy')}</FooterLink>
          <br />
          <FooterLink>{t('footer.sitemap')}</FooterLink>
        </Box>

        <Box>
          <StyledTypography>{t('footer.getIn')}</StyledTypography>

          <StyledWhiteTypography>{t('footer.you')}</StyledWhiteTypography>

          <IconBox>
            <img src={fbIcon} alt="fbIcon" style={{ cursor: 'pointer' }} />
            <img src={twitterIcon} alt="twitterIcon" style={{ cursor: 'pointer' }} />
            <img src={linkedinIcon} alt="linkedinIcon" style={{ cursor: 'pointer' }} />
          </IconBox>
        </Box>
      </CustomContainer>
    </StyledBox>
  );
};

export default Footer;
