import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, Outlet } from 'react-router-dom';
import { Card, Table, Container, TableContainer, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Scrollbar from '../../components/scrollbar';
import { TableStack, TableBody } from '../../components/@dashboard/table';
import interviewerList from '../../_mock/interviewer';
import { GetInterviewerListAction } from '../../redux/actions/InterviewerAction';

export default function InterviewerPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const interviewerList1 = useSelector((state) => state.interviewer.interviewerList);

  useEffect(() => {
    dispatch(GetInterviewerListAction(1, 100));
  }, []);
  const location = useLocation();
  const TABLE_HEAD = [
    { id: 'fullName', label: t('name'), alignRight: false },
    { id: 'level', label: t('level'), alignRight: false },
    { id: 'skill', label: t('skill'), alignRight: false },
  ];

  const dataMock = interviewerList1.map((item) => {
    const data = {};
    TABLE_HEAD.forEach((head) => {
      const { id } = head;
      if (Object.prototype.hasOwnProperty.call(item, id)) {
        data[id] = item[id];
      }
    });
    data.id = item.userId;
    data.avatarUrl = item.avatarUrl;

    return data;
  });

  const StyledTableContainer = styled(TableContainer)({
    minWidth: 800,
  });

  return (
    <>
      {location.pathname !== '/dashboard/interviewers' ? (
        <Outlet />
      ) : (
        <>
          <Helmet>
            <title> {t('interviewer')} </title>
          </Helmet>

          <Container>
            <TableStack nameStack={t('dashboadNavbar.interviewer')} />

            <Card>
              <Scrollbar>
                <StyledTableContainer>
                  <Table>
                    <TableBody rowCount={interviewerList.length} headLabel={TABLE_HEAD} dataUsers={dataMock} />
                  </Table>
                </StyledTableContainer>
              </Scrollbar>
            </Card>
          </Container>
        </>
      )}
      ;
    </>
  );
}
