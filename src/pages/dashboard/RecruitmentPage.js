/*eslint-disable*/
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Card, Table, Container, TableContainer, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Scrollbar from '@/components/scrollbar';
import { TableStack, TableBody } from '@/components/@dashboard/table';
import { GetJobAction, DeleteJobAction } from '@/redux/actions/JobAction';

export default function RecruimentPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const job = useSelector((state) => state.job.jobs);
  const [data, setData] = useState([]);
  useEffect(() => {
    dispatch(GetJobAction(1, 1000));
  }, []);
  const TABLE_HEAD = [
    { id: 'level', label: t('level'), alignRight: false },
    { id: 'jobTitle', label: t('position'), alignRight: false },
    { id: 'number', label: t('quantity'), alignRight: false },
    { id: 'dateRelease', label: t('date'), alignRight: false },
    { id: '' },
  ];
  useEffect(() => {
    const newData = job.map((item) => {
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
    setData(newData);
  }, [job]);
  const StyledTableContainer = styled(TableContainer)({
    minWidth: 800,
  });
  const handleDelete = async (id, jobTitle) => {
    const shouldDelete = window.confirm(`Are you sure you want to delete the job with title: ${jobTitle}?`);
    if (shouldDelete) {
      try {
        await dispatch(DeleteJobAction(id));
        dispatch(GetJobAction(1, 1000));
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('dashboadNavbar.recruitment')}</title>
      </Helmet>
      <Container>
        <TableStack nameStack={t('dashboadNavbar.recruitment')} nameButtonStack={t('create')} />
        <Card>
          <Scrollbar>
            <StyledTableContainer>
              <Table>
                <TableBody rowCount={data.length} headLabel={TABLE_HEAD} dataUsers={data} handleDelete={handleDelete} />
              </Table>
            </StyledTableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
