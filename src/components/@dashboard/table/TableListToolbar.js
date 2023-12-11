import PropTypes from 'prop-types';
import { useState } from 'react';

// @mui
import { styled, alpha } from '@mui/material/styles';

import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  TextField,
  MenuItem,
} from '@mui/material';
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTranslation } from 'react-i18next';
// component
import Iconify from '../../iconify';

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

TableListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function TableListToolbar({
  numSelected,

  filterName,
  onFilterName,
  setFilterName,

  filterDay,
  onFilterDay,
  setFilterDay,

  filterStatus,
  onFilterStatus,
  setFilterStatus,
}) {
  const { t } = useTranslation();

  const Vitri = [
    {
      value: 'NOTINTERVIEWED',
      label: t('list.filterStatus_notInterviewed'),
    },
    {
      value: 'INTERVIEWED',
      label: t('list.filterStatus_interviewed'),
    },
  ];
  const location = useLocation();
  const url = location.pathname;
  const RenderCheckbox = url.includes('/interviewer/list');

  return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {RenderCheckbox && (
        <>
          <StyledSearch
            value={filterName}
            onChange={onFilterName}
            placeholder={t('list.searchUser')}
            startAdornment={
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            }
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']} sx={{ paddingTop: -1 }}>
              <DatePicker
                label={t('FilterDate')}
                defaultValue={dayjs('2022-04-17')}
                format="DD/MM/YYYY"
                value={null}
                onChange={onFilterDay}
              />
            </DemoContainer>
          </LocalizationProvider>

          <TextField
            sx={{ width: '20%' }}
            select
            defaultValue={'NOTINTERVIEWED'}
            value={filterStatus}
            onChange={onFilterStatus}
          >
            {Vitri.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <IconButton
            onClick={() => {
              setFilterDay(null);
              setFilterStatus('');
              setFilterName('');
            }}
          >
            <Iconify icon={'mdi:filter'} />
          </IconButton>
        </>
      )}
      {!RenderCheckbox && (
        <>
          {numSelected > 0 ? (
            <Typography component="div" variant="subtitle1">
              {numSelected} selected
            </Typography>
          ) : (
            <StyledSearch
              value={filterName}
              onChange={onFilterName}
              placeholder={t('SearchFilter')}
              startAdornment={
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              }
            />
          )}
        </>
      )}

      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      )}
    </StyledRoot>
  );
}
