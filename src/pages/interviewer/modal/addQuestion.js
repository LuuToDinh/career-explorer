import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { styled, DialogActions, TextField, FormLabel, Box, Select, MenuItem } from '@mui/material';
import palette from '../../../theme/palette';
import { CreateQuestionAction, GetQuestionAction } from '../../../redux/actions/questionAction';

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

export default function AddQuestion({ setOpen, open }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [validationErrors, setValidationErrors] = useState({});
  const [data, setData] = useState({
    skill: 'FontEnd',
    question: '',
  });
  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeValue = useCallback(
    (e) => {
      const { value, name } = e.target;
      setData({
        ...data,
        [name]: value,
      });
      setValidationErrors({
        ...validationErrors,
        [name]:value ? '' : t('modalAdd.error')
      })
    },
    [data, validationErrors]
  );
  const handleCreateClick = async () => {
    const response = await dispatch(CreateQuestionAction(data));
    if (response) {
      await dispatch(GetQuestionAction(1, 50));
      setOpen(false);
    }
  };
  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <Title>{t('modalAdd.title')} </Title>
        <InputBox>
          <Label>{t('modalAdd.addQuestion')}</Label>
          <InputText
            type="text"
            value={data?.question}
            name="question"
            onChange={handleChangeValue}
            helperText={validationErrors.question}
            error={Boolean(validationErrors.question)}
          />
          <Label>{t('modalAdd.selectField')}</Label>
          <SelectBox value={data.skill} name="skill" onChange={handleChangeValue}>
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
          <ButtonCancel onClick={handleClose}>{t('modalAdd.cancelbtn')}</ButtonCancel>
          <Button onClick={handleCreateClick}>{t('modalAdd.savebtn')}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
AddQuestion.propTypes = {
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

