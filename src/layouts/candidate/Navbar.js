/*eslint-disable*/
import PropTypes from 'prop-types';
import * as React from 'react';
import Box from '@mui/material/Box';
import { Link, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import ListAltIcon from '@mui/icons-material/ListAlt';
import HomeIcon from '@mui/icons-material/Home';
import { Container } from '@mui/system';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled } from '@mui/material';
import { useState } from 'react';

import logoImg from '../../media/HomeLogo.png';
import CustomButton from '../../components/home-components/CustomButton';
import LanguagePopover from '@/layouts/dashboard/header/LanguagePopover';

import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { storage } from '../../services/storage';
import CandidatePopover from './CandidatePopover';

export const Navbar = ({ noSignupButton = false, onhandlelogout }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [mobileMenu, setMobileMenu] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.type === 'Tab' || event.type === 'Shift')) {
      return;
    }

    setMobileMenu({ ...mobileMenu, [anchor]: open });
  };

  const getToken = storage.getCache('access_token')
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Trang Chủ', 'Giới Thiệu', 'Tuyển Dụng', 'Sự Kiện'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 && <HomeIcon />}
                {index === 1 && <FeaturedPlayListIcon />}
                {index === 2 && <MiscellaneousServicesIcon />}
                {index === 3 && <ListAltIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const NavLink = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    color: '#4F5361',
    fontWeight: 'bold',
    cursor: 'pointer',
    '&:hover': {
      color: '#0C4876',
    },
  }));

  const NavbarLinksBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  }));

  const CustomMenuIcon = styled(MenuIcon)(({ theme }) => ({
    cursor: 'pointer',
    display: 'none',
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  }));

  const NavbarContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2),
    },
  }));

  const NavbarLogo = styled('img')(({ theme }) => ({
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  }));

  const StyledBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2.5rem',
  });

  const StyledFlexBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
  });

  const StyledSmallerBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
  });

  return (
    <NavbarContainer>
      <StyledBox>
        <StyledFlexBox>
          <CustomMenuIcon onClick={toggleDrawer('left', true)} />
          <Drawer anchor="left" open={mobileMenu.left} onClose={toggleDrawer('left', false)}>
            {list('left')}
          </Drawer>
          <NavbarLogo src={logoImg} alt="logo" />
        </StyledFlexBox>

        <NavbarLinksBox>
          <Link to="/candidate/home" style={{ textDecoration: 'none' }}>
            <NavLink variant="body2">{t('Navbar.home')}</NavLink>
          </Link>

          <Link to="/candidate/aboutus" style={{ textDecoration: 'none' }}>
            <NavLink variant="body2">{t('Navbar.aboutus')}</NavLink>
          </Link>

          <Link to="/candidate/jobFinding" style={{ textDecoration: 'none' }}>
            <NavLink variant="body2">{t('Navbar.career')}</NavLink>
          </Link>

          <Link to="/candidate/event" style={{ textDecoration: 'none' }}>
            <NavLink variant="body2">{t('Navbar.event')}</NavLink>
          </Link>
        </NavbarLinksBox>
      </StyledBox>
      {getToken ? (
        <StyledSmallerBox>
          <LanguagePopover />
          <CandidatePopover handleLogOut={onhandlelogout} />
        </StyledSmallerBox>
      ) : (
        <StyledSmallerBox>
          <LanguagePopover />
          {!noSignupButton && (
            <CustomButton buttonText={t('Navbar.registerbtn')} handleEvent={() => navigate('/candidate/register')} />
          )}
          <CustomButton
            backgroundColor="#ffffff"
            color="#0C4876"
            buttonText={t('Navbar.loginbtn')}
            handleEvent={() => navigate('/candidate/login')}
          />
        </StyledSmallerBox>
      )}
    </NavbarContainer>
  );
};

Navbar.propTypes = {
  noSignupButton: PropTypes.bool,
};

export default Navbar;
