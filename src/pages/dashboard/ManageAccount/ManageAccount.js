import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { useLocation, Outlet } from 'react-router-dom';
import { Card, Table, Container, TableContainer, styled, Snackbar, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';

import Scrollbar from '../../../components/scrollbar';
import { TableStack, TableBody } from '../../../components/@dashboard/table';
import { GetAccountAction, DeleteAccountAction } from '../../../redux/actions/AccountAction';

export default function ManageAccount() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const [dataDelete, setDataDelete] = useState([]);
  const [openBug, setOpenBug] = useState(false);
  const account = useSelector((state) => state.account.account);
  const StyledTableContainer = styled(TableContainer)({
    minWidth: 800,
  });
  useEffect(() => {
    dispatch(GetAccountAction(1, 50));
  }, [dispatch]);

  const TABLE_HEAD = [
    { id: 'name', label: t('name'), alignRight: false },
    { id: 'email', label: t('email'), alignRight: false },
    { id: 'roles', label: t('role'), alignRight: false },
    { id: '' },
  ];
  useEffect(() => {
    const newData = account.map((item) => {
      const data = {};
      TABLE_HEAD.forEach((head) => {
        const { id } = head;
        if (Object.prototype.hasOwnProperty.call(item, id)) {
          data[id] = item[id];
        }
        data.id = item.id;
        data.avatarUrl = item.avatarUrl;
      });
      return data;
    });
    setDataDelete(newData);
  }, [account]);
  const handleBugClose = () => {
    setOpenBug(false);
  };
  const handleDelete = async (id) => {
    const shouldDelete = window.confirm(`Are you sure you want to delete the account`);
    const data = {
      id,
    };
    if (shouldDelete) {
      const response = await dispatch(DeleteAccountAction(data));
      if (response?.response?.status === 'BAD_REQUEST') {
        setOpenBug(true);
      } else {
        dispatch(GetAccountAction(1, 50));
      }
    }
  };

  return (
    <>
      {location.pathname !== '/dashboard/accounts' ? (
        <Outlet />
      ) : (
        <>
          <Helmet>
            <title>{t('dashboadNavbar.account')}</title>
          </Helmet>
          <Container>
            <TableStack nameStack={t('dashboadNavbar.account')} nameButtonStack={t('create')} />
            <Card>
              <Scrollbar>
                <StyledTableContainer>
                  <Table>
                    <TableBody
                      rowCount={dataDelete.length}
                      headLabel={TABLE_HEAD}
                      dataUsers={dataDelete}
                      handleDelete={handleDelete}
                    />
                  </Table>
                </StyledTableContainer>
              </Scrollbar>
            </Card>
            <Snackbar
              open={openBug}
              onClose={handleBugClose}
              autoHideDuration={2000}
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
              <Alert elevation={6} severity={'error'} variant="filled">
                {t('bug')}
              </Alert>
            </Snackbar>
          </Container>
        </>
      )}
    </>
  );
}
