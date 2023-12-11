/*eslint-disable*/
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Card, Table, Container, TableContainer, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Scrollbar from '@/components/scrollbar/Scrollbar';
import { TableStack, TableBody } from '@/components/@dashboard/table';
import { GetBlacklistAction, DeleteBlacklistAction } from '@/redux/actions/BlackListAction';

export default function BlackList() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [dataDelete, setDataDelete] = useState([]);
  const blist = useSelector((state) => state.blist.blists);
  useEffect(() => {
    dispatch(GetBlacklistAction(1, 100));
  }, []);
  const TABLE_HEAD = [
    { id: 'fullname', label: t('fullName'), alignRight: false },
    { id: 'email', label: t('email'), alignRight: false },
    { id: 'phone', label: t('phoneNum'), alignRight: false },
    { id: '' },
  ];
  useEffect(() => {
    const newData = blist.map((item) => {
      const data = {};
      TABLE_HEAD.forEach((head) => {
        const { id } = head;
        if (Object.prototype.hasOwnProperty.call(item, id)) {
          data[id] = item[id];
        }
        data.id = item.id;
      });
      return data;
    });
    setDataDelete(newData);
  }, [blist]);
  const handleDelete = async (id) => {
    const shouldDelete = window.confirm(`Are you sure you want to delete this blacklisted person?`);
    if (shouldDelete) {
      await dispatch(DeleteBlacklistAction(id));
      dispatch(GetBlacklistAction(1, 100));
    }
  };
  const StyledTableContainer = styled(TableContainer)({
    minWidth: 800,
  });

  return (
    <>
      <Helmet>
        <title>{t('blackList')}</title>
      </Helmet>
      <Container>
        <TableStack nameStack={t('blackList')} nameButtonStack={t('create')} />
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
      </Container>
    </>
  );
}
