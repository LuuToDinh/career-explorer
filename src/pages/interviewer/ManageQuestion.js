import { useLocation, Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState ,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Card, Table, Container, TableContainer, styled } from '@mui/material';

import Scrollbar from '../../components/scrollbar';
import AddQuestionModal from './modal/addQuestion';
import { TableStackNoNavigate, TableBody } from '../../components/@dashboard/table';
import { GetQuestionAction , DeleteQuestionAction } from '../../redux/actions/questionAction';


export default function ManageQuestion() {
  
  const { t } = useTranslation();
  const StyledTableContainer = styled(TableContainer)({
    minWidth: 800
  });

  const TABLE_HEAD = [
    { id: 'skill', label: t('question.columnField'), alignRight: false },
    { id: 'question', label: t('question.columnQuestion'), alignRight: false },
    { id: '' },
  ];
  
  const location = useLocation();
  const dispatch = useDispatch();
  const questionData= useSelector((state) => state.question.questions);

  useEffect(() => {
    dispatch(GetQuestionAction(1,50));
  }, [dispatch]);

  const [openModal, setOpenModal] = useState(false)
  const [dataDelete, setDataDelete] = useState([]);

  useEffect(() => {
    const newData = questionData.map((item) => {
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
  }, [questionData]);

  const handleOpenModal = () => { setOpenModal(true) }
  
  const handleDelete = (id) => {
    const shouldDelete = window.confirm(t('question.deleteQue'));
    if (shouldDelete) {
      dispatch(DeleteQuestionAction(id));
      const updatedData = dataDelete.filter((job) => job.id !== id);
      setDataDelete(updatedData);
    } 
  };

  return (
    <>
      {location.pathname !== '/interviewer/question' ? (
        <Outlet />
      ) : ( 
            <>
                <Helmet>
                    <title> {t('question.titlePage')} </title>
                </Helmet>
                <Container>
                  <TableStackNoNavigate nameStack={t('question.titleQuestion')} nameButtonStack={t('question.add')} onClick={handleOpenModal} />
                  <AddQuestionModal open={openModal} setOpen={setOpenModal} />
                    <Card>
                        <Scrollbar>
                            <StyledTableContainer>
                                <Table>
                                    <TableBody rowCount={dataDelete.length} headLabel={TABLE_HEAD} dataUsers={dataDelete} handleDelete={handleDelete} />
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