import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover, styled } from '@mui/material';

import { GetUserIdAction, GetUserAvatarIdAction } from '../../redux/actions/UserAction';
import { decodeJwt } from '../../utils/deCode';
import { storage } from '../../services/storage';

// ----------------------------------------------------------------------

export default function InterviewerPopover({ handleLogOut }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(null);
  const token = storage.getCache('access_token');
  const { UserId } = decodeJwt(token);

  const profile = useSelector((state) => state.session.user);
  const avatarUrl = useSelector((state) => state.session.userAvatar);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetUserIdAction(UserId));
    dispatch(GetUserAvatarIdAction(UserId));
  }, [UserId]);

  const { fullName, email } = profile;
  const { urlImage } = avatarUrl ?? { urlImage: '123' };

  const navigate = useNavigate()

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null)
  };

  const handleProfile = () => {
    navigate('/interviewer/profile');
    setOpen(null);
  }

  const handleSchedule = () => {
    navigate('/interviewer/schedule');
    setOpen(null);
  }

  const handleQuestion = () => {
    navigate('/interviewer/question');
    setOpen(null);
  }

  const handleList = () => {
    navigate('/interviewer/list');
    setOpen(null);
  }

  const handleChangePass = () => {
    navigate('/interviewer/changepass');
    setOpen(null);
  }

  const StyledBox = styled(Box)({
    padding: '18px',
  });

  const StyledTypography = styled(Typography)({
    color: 'text.secondary',
    marginTop: '1.2em'
  });

  const StyledStack = styled(Stack)({
    display: 'flex'
  });

  return (
    <>
      <>
        <IconButton
          onClick={handleOpen}
          sx={{
            p: 0,
            ...(open && {
              '&:before': {
                zIndex: 1,
                content: "''",
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
              },
            }),
          }}
        >
          <Avatar src={urlImage} alt="photoURL" />
        </IconButton>

        <Popover
          open={Boolean(open)}
          anchorEl={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: {
              p: 0,
              mt: 1.5,
              ml: 0.75,
              width: 180,
              '& .MuiMenuItem-root': {
                typography: 'body2',
                borderRadius: 0.75,
              },
            },
          }}
        >
          <StyledBox>
            <Typography variant="inherit" fontWeight='700' color={{ color: '#19527d' }} noWrap>
              {fullName}
            </Typography>
            <StyledTypography variant="body2" noWrap>
              {email}
            </StyledTypography>
          </StyledBox>
          <Divider />

          <StyledStack>
            <MenuItem onClick={handleProfile}>
              {t('tippy.infor')}
            </MenuItem>
            <MenuItem onClick={handleSchedule}>
              {t('tippy.schedule')}
            </MenuItem>
            <MenuItem onClick={handleQuestion}>
              {t('tippy.questionManagement')}
            </MenuItem>
            <MenuItem onClick={handleList}>
              {t('tippy.candidateList')}
            </MenuItem>
            <MenuItem onClick={handleChangePass}>
              {t('changePass')}
            </MenuItem>
          </StyledStack>
          <Divider />

          <MenuItem onClick={handleLogOut} >
          {t('tippy.LogOut')}
          </MenuItem>
        </Popover>
      </>
    </>
  );
}
