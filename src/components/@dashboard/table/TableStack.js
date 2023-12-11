// @mui
import { Stack, Button, Typography, styled } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import palette from '../../../theme/palette';
// components
import Iconify from '../../iconify';

export default function TableStack({ nameStack, nameButtonStack }) {
  const StyledTypography = styled(Typography)({
    color: `${palette.maincolor.primary_light}`
  });

  const location = useLocation();
  const navigate = useNavigate();
  const url = location.pathname;
  const handleNavigateToCreatePage = () => {
    navigate(`${url}/create`);
  };
  if (!nameButtonStack) {
    return (
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <StyledTypography variant="h4" gutterBottom>
          {nameStack}
        </StyledTypography>
      </Stack>
    );
  }

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
      <StyledTypography variant="h4" gutterBottom>
        {nameStack}
      </StyledTypography>
      <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleNavigateToCreatePage}>
        {nameButtonStack}
      </Button>
    </Stack>
  );
}
