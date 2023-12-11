import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, Outlet } from 'react-router-dom';
import { Card, Table, Container, TableContainer, styled } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { GetCvApplyLitstAction, DeleteCvApplyAction } from '../../redux/actions/CvApplyAction';
import Scrollbar from '../../components/scrollbar';
import { TableStack, TableBody } from '../../components/@dashboard/table';

export default function CandidateListPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();

  const CVApplyList = useSelector((state) => state.cvApply.cvApplyList);

  const [dataDelete, setDataDelete] = useState([]);

  useEffect(() => {
    dispatch(GetCvApplyLitstAction(1, 1000));
  }, []);

  const TABLE_HEAD = [
    { id: 'statusSeeking', label: `${t('status')}`, alignRight: false },
    { id: 'fullName', label: `${t('name')}`, alignRight: false },
    { id: 'jobTitle', label: `${t('position')}`, alignRight: false },
    { id: 'level', label: `${t('level')}`, alignRight: false },
    { id: '' },
  ];
  useEffect(() => {
    const avatar = '/assets/images/avatars/avatar_$1.jpg';
    const newData = CVApplyList.map((item) => {
      const data = {};
      TABLE_HEAD.forEach((head) => {
        const { id } = head;
        if (Object.prototype.hasOwnProperty.call(item, id)) {
          data[id] = item[id];
        }
        data.id = item.cvApplyId;
        data.avatarUrl = avatar;
      });
      return data;
    });
    setDataDelete(newData);
  }, [CVApplyList]);

  const StyledTableContainer = styled(TableContainer)({
    minWidth: 800,
  });

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm(`Are you sure you want to delete the job ?`);
    if (shouldDelete) {
      await dispatch(DeleteCvApplyAction(id));
      dispatch(GetCvApplyLitstAction(1, 20));
    }
  };

  return (
    <>
      <Helmet>
        <title> {t('dashboadNavbar.candidate')} </title>
      </Helmet>

      <Container>
        <TableStack nameStack={t('dashboadNavbar.candidate')} />

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
