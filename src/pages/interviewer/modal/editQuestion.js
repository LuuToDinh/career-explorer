import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { styled, DialogActions, TextField, FormLabel, Box, Select, MenuItem } from '@mui/material';
import palette from '../../../theme/palette';
import { UpdateQuestionAction, GetQuestionAction } from '../../../redux/actions/questionAction';

const ButtonCancel = styled(Button)({
  color: 'red',
});
const InputBox = styled(Box)({
  marginLeft: '20px',
  marginRight: '20px',
  width: '30rem',
});
const InputText = styled(TextField)({
  width: '100%',
});
const SelectBox = styled(Select)({
  width: '100%',
});
const Title = styled(DialogTitle)({
  color: `${palette.maincolor.primary}`,
  fontSize: '24px',
});
const Label = styled(FormLabel)({
  color: 'black',
});
export default function EditQuestion({ setOpen, open, edit }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [validationErrors, setValidationErrors] = useState('');
  const [editPosition, setEditPosition] = useState(edit?.skill || '');
  const [editQuestion, setEditQuestion] = useState(edit?.question || '');
  const [data, setData] = useState({
    skill: editPosition,
    question: editQuestion,
  });
  useEffect(() => {
    setEditPosition(edit?.skill || '');
    setEditQuestion(edit?.question || '');
    setData({
      ...data,
      skill: editPosition,
      question: editQuestion,
    });
  }, [edit]);
  useEffect(() => {
    setData({
      id: edit.id,
      skill: editPosition,
      question: editQuestion,
    });
    setValidationErrors(editQuestion? '' : t('modalAdd.error'));
  }, [editPosition, editQuestion]);
  const handleClose = () => {
    setOpen(false);
  };
  const handleEditClick = async () => {
    const response = await dispatch(UpdateQuestionAction(data));
    if (response) {
      await dispatch(GetQuestionAction(1, 50));
      setOpen(false);
    }
  };
  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <Title>{t('modalEdit.addQuestion')} </Title>
        <InputBox>
          <Label>{t('modalEdit.addQuestion')}</Label>
          <InputText
            value={editQuestion}
            onChange={(e) => setEditQuestion(e.target.value)}
            helperText={validationErrors}
            error={Boolean(validationErrors)}
          />
          <Label>{t('modalEdit.selectField')}</Label>
          <SelectBox value={editPosition} onChange={(e) => setEditPosition(e.target.value)}>
            <MenuItem value={'FontEnd'}>FrontEnd</MenuItem>
            <MenuItem value={'BackEnd'}>BackEnd</MenuItem>
            <MenuItem value={'Database'}>Database</MenuItem>
            <MenuItem value={'AI Programmer'}>AI Programer</MenuItem>
            <MenuItem value={'Data Analyst'}>Data Analyst</MenuItem>
            <MenuItem value={'Training Officer'}>Training Officer</MenuItem>
            <MenuItem value={'Java'}>Java</MenuItem>
            <MenuItem value={'Project Manager'}>Project Manager</MenuItem>
          </SelectBox>
        </InputBox>
        <DialogActions>
          <ButtonCancel onClick={handleClose}>{t('modalEdit.cancelbtn')}</ButtonCancel>
          <Button onClick={handleEditClick}>{t('modalEdit.savebtn')}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
EditQuestion.propTypes = {
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  edit: PropTypes.object.isRequired,
};
