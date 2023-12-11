// @mui
import { Stack, Button, Typography } from '@mui/material';
import { useLocation} from 'react-router-dom';
import palette from '../../../theme/palette';
// components
import Iconify from '../../iconify';

export default function TableStackNoNavigate({ nameStack, nameButtonStack, onClick }) {
  const location = useLocation();

  const url = location.pathname;
  if (!nameButtonStack) {
    return (
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography sx={{ color: `${palette.maincolor.primary_light}` }} variant="h4" gutterBottom>
          {nameStack}
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
      <Typography sx={{ color: `${palette.maincolor.primary_light}` }} variant="h4" gutterBottom>
        {nameStack}
      </Typography>
      <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={onClick}>
        {nameButtonStack}
      </Button>
    </Stack>
  );
}
