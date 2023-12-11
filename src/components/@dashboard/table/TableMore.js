// @mui
import { TableCell, IconButton, styled } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

// components
import Iconify from '../../iconify';

export default function TableMore() {
  const CustomTableCell = styled(TableCell)({
    display: 'flex',
    alignItems: 'center',
  });
  const location = useLocation();

  const url = location.pathname;

  const handleDelete = (event) => {
    event.stopPropagation();
  }

  return (
    <>
      {url.includes('/interviewersquestion') && !url.includes('/interviewerslist') && (
        <CustomTableCell align="left">
          <IconButton size="medium">
            <Iconify icon={'eva:edit-fill'} />
          </IconButton>

          <IconButton size="medium" onClick={handleDelete}>
            <Iconify icon={'eva:trash-2-outline'} sx={{ color: 'error.main' }} />
          </IconButton>
        </CustomTableCell>
      )}

      {url.startsWith('/interviewerslist') && <CustomTableCell align="left" />}

      {!url.includes('/interviewersquestion') && !url.includes('/interviewerslist') && (
        <CustomTableCell align="left">
          <IconButton size="medium" onClick={handleDelete}>
            <Iconify icon={'eva:trash-2-outline'} sx={{ color: 'error.main' }} />
          </IconButton>
        </CustomTableCell>
      )}
    </>
  );
}
