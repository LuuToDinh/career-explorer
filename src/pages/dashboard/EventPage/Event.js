import { Helmet } from 'react-helmet-async';
import { useLocation, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Card, Table, Container, TableContainer, styled } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import Scrollbar from '../../../components/scrollbar';
import { TableStack, TableBody } from '../../../components/@dashboard/table';
import { GetEventAction, DeleteEventAction } from '../../../redux/actions/EventAction';


export default function Event() {
  const {t} = useTranslation();

  const TABLE_HEAD = [
    { id: 'title', label: `${t('events.event')}`, alignRight: false },
    { id: 'dateStart', label: `${t('startTime')}`, alignRight: false },
    { id: 'dateEnd', label: `${t('endTime')}`, alignRight: false },
    { id: '' },
  ];

  const dispatch = useDispatch();
  const data = useSelector((state) => state.event.event);
  const [dataDelete, setDataDelete] = useState([]);

  useEffect(() => {
    dispatch(GetEventAction(1, 100));
  }, []);

  useEffect(() => {
    const dataMock = data.map((item) => {
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
    setDataDelete(dataMock);
  }, [data]);

  const StyledTableContainer = styled(TableContainer)({
    minWidth: 800,
  });

  const handleDelete = (id, jobTitle) => {
    const shouldDelete = window.confirm(`Are you sure you want to delete the job with title: ${jobTitle}?`);

    if (shouldDelete) {
      dispatch(DeleteEventAction(id));
      const updatedData = dataDelete.filter((job) => job.id !== id);
      setDataDelete(updatedData);
    } 
  };

  return (
    <>
      <Helmet>
        <title> {t("events.event")} </title>
      </Helmet>
      <Container>
        <TableStack nameStack={t("events.event")} nameButtonStack={t("create")} />
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
