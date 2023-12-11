import { Button, styled } from '@mui/material';

const CustomButton = ({ backgroundColor, color, buttonText, heroBtn, guideBtn, getStartedBtn,handleEvent }) => {
  const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: color,
    color: backgroundColor,
    fontWeight: '700',
    fontSize: '14px',
    cursor: 'pointer',
    padding: '0.5rem 1.25rem',
    borderRadius: '7px',
    textTransform: 'none',
    display: 'block',
    border: '2px solid transparent',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    '&:hover': {
      backgroundColor: color,
      color: backgroundColor,
      borderColor: backgroundColor,
    },
    [theme.breakpoints.down('md')]: {
      margin: (heroBtn || getStartedBtn) && theme.spacing(0, 'auto', 3, 'auto'),
      width: (heroBtn || getStartedBtn) && '90%',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: guideBtn && theme.spacing(3),
      width: guideBtn && '90%',
    },
  }));
  return <StyledButton onClick={handleEvent}>{buttonText}</StyledButton>;
};

export default CustomButton;
