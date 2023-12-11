/* eslint-disable */
import PropTypes from 'prop-types';
import {
  Stack,
  Paper,
  Avatar,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  IconButton,
  styled,
} from '@mui/material';
// components

import { format } from 'date-fns';
import { useNavigate, useLocation } from 'react-router-dom';
import Label from '../../label';
import Iconify from '../../iconify';
import { formatDayJs } from '../../../utils/formatTime';
import Edit from '../../../pages/interviewer/modal/editQuestion';
import TableMore from './TableMore';
import { useEffect, useState } from 'react';
import { is } from 'date-fns/locale';
import { useTransition } from 'react';
import { useTranslation } from 'react-i18next';

export default function TableListData({
  filteredUsers,
  filteredDays,
  filteredManyStatus,
  page,
  rowsPerPage,
  selected,
  handleClick,
  handleDelete = (id, name) => {},
  findFilterWords,
  findFilterDays,
  findFilterStatus,
  data,
}) {
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredUsers.length) : 0;
  const isNotFound = !filteredUsers.length || !filteredDays.length || !filteredManyStatus.length;
  const filterName = findFilterWords;
  const filterDay = findFilterDays;
  const filterStatus = findFilterStatus;

  const [dataFilter, setDataFilter] = useState(data);
  const { t } = useTranslation()
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState('');

  const url = location.pathname;
  const RenderCheckbox = !url.includes('/interviewer/list');

  // && !url.includes('/dashboard/recruitment');

  const CustomTableCell = styled(TableCell)({
    display: 'flex',
    alignItems: 'center',
  });

  const InvisibleTableCell = styled(TableCell)({
    display: 'none',
  });

  const PaddingTableCell = styled(TableCell)({
    padding: '32px 0',
  });

  const StyledIconify = styled(Iconify)({
    color: 'red',
  });

  const AlignPaper = styled(Paper)({
    textAlign: 'center',
  });

  const handleClickId = (id) => {
    navigate(`${url}/detail/${id}`);
  };

  useEffect(() => {
    {
      const filteredData = data.filter((user) => {
        return filteredUsers.includes(user) && filteredDays.includes(user) && filteredManyStatus.includes(user);
      });
      setDataFilter(filteredData);
    }
  }, [filterName, filterDay, filterStatus, data]);

  // const handleEdit = (id, position, question) => {
  //   setSelectedPosition(position );
  //   setOpen(true);
  // };
  const handleEdit = (id, position, question) => {
    const data = {
      id: id,
      skill: position,
      question: question,
    };
    setEditData(data);
    setOpen(true);
  };

  return (
    <TableBody>
      {dataFilter.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
        const { id, jobTitle } = row;
        const selectedUser = selected.indexOf(row.name) !== -1;
        const disableInteractivity = url.includes('/interviewer/question') && !url.includes('/interviewer/list');
        return (
          <TableRow
            onClick={() => handleClickId(id)}
            hover
            key={id}
            tabIndex={-1}
            role="checkbox"
            selected={selectedUser}
          >
            {Object.keys(row).map((key) => {
              if (key === 'name') {
                return (
                  <TableCell
                    component="th"
                    scope="row"
                    padding="none"
                    style={disableInteractivity ? { pointerEvents: 'none' } : null}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar sx={{ marginLeft: 2 }} alt={row.name} src={row.avatarUrl} />
                      <Typography variant="subtitle2" noWrap>
                        {row[key]}
                      </Typography>
                    </Stack>
                  </TableCell>
                );
              }
              {
              }
              if (key === 'statusSeeking') {
                return (
                  <TableCell align="left" style={disableInteractivity ? { pointerEvents: 'none' } : null}>
                    {(row[key] === 'WAIT_SCHEDULE' && <Label color={'warning'}>Chờ xếp lịch</Label>) ||
                      (row[key] === 'WAIT_INTERVIEW' && <Label color={'muted'}>Chờ Phỏng vấn</Label>) ||
                      (row[key] === 'WAIT_APPROVAL' && <Label color={'shadow'}>Chờ duyệt</Label>) ||
                      (row[key] === 'PASS' && <Label color={'success'}>Được nhận</Label>) ||
                      (row[key] === 'FAILED' && <Label color={'error'}>Trượt</Label>) ||
                      (row[key] === 'NOTINTERVIEWED' && <Label color={'error'}>{t("list.filterStatus_notInterviewed")}</Label>) ||
                      (row[key] === 'INTERVIEWED' && <Label color={'success'}>{t("list.filterStatus_interviewed")}</Label>)}
                  </TableCell>
                );
              }

              if (key === 'id' || key === 'avatarUrl') {
                return (
                  <InvisibleTableCell style={disableInteractivity ? { pointerEvents: 'none' } : null}>
                    {row[key]}
                  </InvisibleTableCell>
                );
              }
              if (key === 'dateRelease' || key === 'dateStart' || key === 'dateEnd') {
                // return <TableCell align="left">{row[key].substring(0, 10)}</TableCell>;
                return <TableCell align="left">{formatDayJs(row[key])} </TableCell>;
              }

              if (key === 'description') {
                return '';
                return '';
              }

              return (
                <TableCell align="left" style={disableInteractivity ? { pointerEvents: 'none' } : null}>
                  {row[key]}{' '}
                </TableCell>
              );
            })}

            {url.includes('/interviewer/question') && !url.includes('/interviewer/list') && (
              <CustomTableCell align="left">
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    handleEdit(id, row.skill, row.question);
                  }}
                  size="medium"
                >
                  <Iconify icon={'eva:edit-fill'} />
                </IconButton>

                <IconButton
                  size="medium"
                  onClick={(event) => {
                    handleDelete(id, jobTitle);
                    event.stopPropagation();
                  }}
                >
                  <StyledIconify icon={'eva:trash-2-outline'} />
                </IconButton>
              </CustomTableCell>
            )}

            {url.startsWith('/interviewer/list') && <CustomTableCell align="left" />}

            {!url.includes('/interviewer/question') &&
              !url.includes('/interviewer/list') &&
              !url.includes('/dashboard/interviewers') && (
                <CustomTableCell align="left">
                  <IconButton
                    size="medium"
                    onClick={(event) => {
                      handleDelete(id, jobTitle);
                      event.stopPropagation();
                    }}
                  >
                    <StyledIconify icon={'eva:trash-2-outline'} />
                  </IconButton>
                </CustomTableCell>
              )}
          </TableRow>
        );
      })}

      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}

      {isNotFound && (
        <TableRow>
          <PaddingTableCell align="center" colSpan={6}>
            <AlignPaper>
              <Typography variant="h6" paragraph>
                Not found
              </Typography>

              <Typography variant="body2">
                No results found for &nbsp;
                <strong>&quot;{filterName || filterDay || filterStatus}&quot;</strong>.
                <br /> Try checking for type or using complete words.
              </Typography>
            </AlignPaper>
          </PaddingTableCell>
        </TableRow>
      )}
      <Edit open={open} setOpen={setOpen} edit={editData} />
    </TableBody>
  );
}

TableListData.propTypes = {
  filteredUsers: PropTypes.array.isRequired,
  filteredDays: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  selected: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  findFilterWords: PropTypes.string.isRequired,
  findFilterDays: PropTypes.string.isRequired,
};
