import { useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Card, Table, Container, TableContainer, styled } from '@mui/material';
import dayjs from 'dayjs';

import { decodeJwt } from '../../utils/deCode';
import { storage } from '../../services/storage';
import { GetCvApplyLitstAction } from '../../redux/actions/CvApplyAction';
import Scrollbar from '../../components/scrollbar';
import { TableStack, TableBody } from '../../components/@dashboard/table';

export default function InterviewListPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();

  const token = storage.getCache('access_token');
  const { UserId } = decodeJwt(token);

  const CVApplyList = useSelector((state) => state.cvApply.cvApplyList);

  useEffect(() => {
    dispatch(GetCvApplyLitstAction(1, 1000));
  }, [dispatch]);

  const TABLE_HEAD = [
    { id: 'statusSeeking', label: t('list.columnStatus'), alignRight: false },
    { id: 'interviewDate', label: t('list.columnDate'), alignRight: false },
    { id: 'fullName', label: t('list.columnName'), alignRight: false },
    { id: 'jobTitle', label: t('list.jobPosition'), alignRight: false },
    { id: 'level', label: t('list.level'), alignRight: false },
    { id: '' },
  ];

  const cvApplyFilter = CVApplyList.filter(
    (item) =>
      item.statusSeeking !== 'WAIT_SCHEDULE' &&
      item.interviewers.some((interviewer) => interviewer.userId === Number.parseInt(UserId, 10))
  );

  const dataTable = cvApplyFilter.map((item) => {
    const data = {};
    TABLE_HEAD.forEach((head) => {
      const { id } = head;
      if (Object.prototype.hasOwnProperty.call(item, id)) {
        data[id] = item[id];
      }
    });
    data.id = item.cvApplyId;
    data.statusSeeking = item.statusSeeking === 'WAIT_INTERVIEW' ? 'NOTINTERVIEWED' : 'INTERVIEWED';
    data.interviewDate = dayjs(item.interviewDate).format('DD/MM/YYYY');
    return data;
  });

  const StyledTableContainer = styled(TableContainer)({
    minWidth: 800,
  });

  return (
    <>
      {location.pathname !== '/interviewer/list' ? (
        <Outlet />
      ) : (
        <>
          <Helmet>
            <title> {t('list.titlePage')} </title>
          </Helmet>
          <Container>
            <TableStack nameStack={t('detailInter.titlePageInfor_1')} />
            <Card>
              <Scrollbar>
                <StyledTableContainer>
                  <Table>
                    <TableBody rowCount={CVApplyList.length} headLabel={TABLE_HEAD} dataUsers={dataTable} />
                  </Table>
                </StyledTableContainer>
              </Scrollbar>
            </Card>
          </Container>
        </>
      )}
    </>
  );
}
