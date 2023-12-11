import PropTypes from 'prop-types';
import { Table, TableContainer, Button, styled } from '@mui/material';
import { filter } from 'lodash';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { format } from 'date-fns';

import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
// components
import TableListHead from './TableListHead';
import TableListToolbar from './TableListToolbar';
import TableListData from './TableListData';
import TableCustomPagination from './TableCustomPagination';
import Scrollbar from '../../scrollbar';
import Iconify from '../../iconify';
// ----------------------------------------------------------------------

dayjs.extend(localizedFormat);

const StyledTableContainer = styled(TableContainer)({
  minWidth: 800,
});

export default function TableBody({ rowCount, headLabel, dataUsers, handleDelete }) {
  const location = useLocation();

  const url = location.pathname;
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [filterDay, setFilterDay] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(dataUsers);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleFilterByDay = (value) => {
    const selectedDate = dayjs(value);
    const day = selectedDate.date().toString().padStart(2, '0');
    const month = (selectedDate.month() + 1).toString().padStart(2, '0');
    const year = selectedDate.year();
    const formattedDate = `${day}/${month}/${year}`;
    setPage(0);
    setFilterDay(formattedDate);
  };

  const handleFilterByStatus = (event) => {
    setPage(0);
    setFilterStatus(event.target.value);
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    if (query) {
      return filter(array, (_user) => {
        const keys = Object.keys(_user);
        return keys.some((key) => {
          const value = _user[key];
          if (typeof value === 'string') {
            return value.toLowerCase().includes(query.toLowerCase());
          }
          return false;
        });
      });
    }

    return stabilizedThis.map((el) => el[0]);
  }

  function applyDayFilter(array, filterDay) {
    // Nếu filterDay là null, gán giá trị thành chuỗi rỗng ''
    filterDay = filterDay || '';

    if (filterDay) {
      return array.filter((user) => {
        const usertDate = dayjs(user.interviewDate, 'DD/MM/YYYY');
        const filterDate = dayjs(filterDay, 'DD/MM/YYYY');

        return filterDate.isSame(usertDate);
      });
    }
    return array;
  }


  function applyStatusFilter(array, filterStatus) {
    if (filterStatus) {
      return array.filter((user) => user.statusSeeking === filterStatus);
    }
    return array;
  }

  const filteredUsers = applySortFilter(dataUsers, getComparator(order, orderBy), filterName);

  const dataSort = applySortFilter(dataUsers, getComparator(order, orderBy));

  useEffect(() => {
    setData(dataSort);
  }, [orderBy, order]);

  const filteredDays = applyDayFilter(dataUsers, filterDay || '');

  const filteredManyStatus = applyStatusFilter(dataUsers, filterStatus);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  // const handleDelete = (id) => {
  //   const updatedData = data.filter((row) => row.id !== id);
  //   setData(updatedData);
  // };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dataUsers.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  return (
    <>
      <TableListToolbar
        numSelected={selected.length}
        filterName={filterName}
        setFilterName={setFilterName}
        onFilterName={handleFilterByName}
        filterDay={filterDay}
        setFilterDay={setFilterDay}
        onFilterDay={handleFilterByDay}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        onFilterStatus={handleFilterByStatus}
      />

      <Scrollbar>
        <StyledTableContainer>
          <Table>
            <TableListHead
              order={order}
              orderBy={orderBy}
              rowCount={rowCount}
              headLabel={headLabel}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableListData
              filteredUsers={filteredUsers}
              findFilterWords={filterName}
              filteredDays={filteredDays}
              filteredManyStatus={filteredManyStatus}
              findFilterDays={filterDay}
              findFilterStatus={filterStatus}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={selected}
              handleClick={handleClick}
              data={data}
              handleDelete={handleDelete}
            />
          </Table>
        </StyledTableContainer>
      </Scrollbar>

      <TableCustomPagination
        count={dataUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

TableBody.propTypes = {
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
  dataUsers: PropTypes.array,
};
