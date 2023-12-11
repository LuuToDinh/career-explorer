import PropTypes from 'prop-types';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled } from '@mui/material';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { Link, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import ListAltIcon from '@mui/icons-material/ListAlt';
import HomeIcon from '@mui/icons-material/Home';
import { Container } from '@mui/system';

import { storage } from '../../services/storage';
import InterviewerPopover from './InterviewerPopover';
import logoImg from '../../media/HomeLogo.png';
import CustomButton from '../../components/home-components/CustomButton';
import LanguagePopover from '../dashboard/header/LanguagePopover';

export const Navbar = ({ noSignupButton = false, onhandlelogout }) => {
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

  const getToken = storage.getCache('access_token');
  console.log(getToken);

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

  const StyledNavbarContainer = styled(NavbarContainer)({
    position: 'relative',
  });

  const StyledBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2.5rem',
  });

  const StyledCenterBox = styled(Box)({
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
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
    <StyledNavbarContainer>
      <StyledBox>
        <StyledFlexBox>
          <CustomMenuIcon onClick={toggleDrawer('left', true)} />
          <Drawer anchor="left" open={mobileMenu.left} onClose={toggleDrawer('left', false)}>
            {list('left')}
          </Drawer>
          <Link to='/interviewer/list'>
            <NavbarLogo src={logoImg} alt="logo" />
          </Link>
        </StyledFlexBox>
      </StyledBox>

      <StyledCenterBox position="absolute">
        <Typography variant="h3" fontWeight={700} color="#0C4876" component="h1">
        {t('mark.recruitment')}
        </Typography>
      </StyledCenterBox>
      {getToken ? (
        <StyledSmallerBox>
          <LanguagePopover />
          <InterviewerPopover handleLogOut={onhandlelogout} />
        </StyledSmallerBox>
      ) : (
        <StyledSmallerBox>{!noSignupButton && <CustomButton buttonText="Đăng ký" />}</StyledSmallerBox>
      )}
    </StyledNavbarContainer>
  );
};

Navbar.propTypes = {
  noSignupButton: PropTypes.bool,
};

export default Navbar;
