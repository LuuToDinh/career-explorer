import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  styled,
  Box,
  TextField,
  Typography,
  Modal,
  Grid,
  Container,
  Paper,
} from '@mui/material';
import * as MuiIcon from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';

import InformationContext from '../../components/information/InformationContext';
import palette from '../../theme/palette';

const Name = styled(Typography)({
  fontSize: '30px',
  fontWeight: 'bold',
  marginLeft: '10px',
});
const ShowBox = styled(Box)({
  marginLeft: '100px',
  marginRight: '100px',
  marginTop: '30px',
  marginBottom: '30px',
});
const Email = styled(EmailIcon)({
  width: '1.5rem',
  height: '1.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  verticalAlign: 'middle',
  marginRight: '5px',
});
const EmailDetail = styled(Typography)({
  fontSize: '20px',
  display: 'flex',
  marginLeft: '10px',
});
const ButtonAdd = styled(Button)({
  margin: '10px',
  textAlign: 'center',
  width: '150px',
  height: '50px',
  backgroundColor: `${palette.maincolor.primary}`,
  color: 'white',
});
const ButtonCancel = styled(Button)({
  margin: '10px',
  textAlign: 'center',
  width: '150px',
  height: '50px',
  backgroundColor: `${palette.maincolor.dark}`,
  color: 'white',
});
const GroupButton = styled(Container)({
  textAlign: 'right',
  marginTop: '20px',
});
const InputText = styled(TextField)({
  width: '720px',
});

export default function SimpleDialogDemo() {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState('frontend');
  const [role, setRole] = React.useState('senior');
  const [question, setQuestion] = React.useState(['abc', 'abc']);
  const [score, setScore] = React.useState(0);
  const [comment, setComment] = React.useState('kĩ năng tốt');

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '1000px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '10px',
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleScore = (event) => {
    setScore(event.target.value);
  };
  const handleItemClick = (value) => {
    setOpen(value);
  };

  const handleComment = (event) => {
    setComment(event.target.value);
  };
  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ShowBox>
            <Name> Trịnh Hoàng Minh</Name>
            <EmailDetail>
              <Email /> {'minh@gmail.com'}
            </EmailDetail>
            <Grid container justifyContent="center" alignItems="center" spacing={2}>
              <InformationContext icon={MuiIcon.Work} title="Vị trí ứng tuyển" context={[position]} md={6} />
              <InformationContext icon={MuiIcon.Stars} title={'Cấp bậc'} context={[role]} md={6} />
              <InformationContext icon={MuiIcon.Help} title={'Câu hỏi phỏng vấn'} context={[question]} md={12} />
              <Grid item xs={12} md={12}>
                <Paper elevation={3} sx={{ height: '100%' }}>
                  <Box padding="12px" display="flex">
                    <MuiIcon.Star fontSize="small" sx={{ marginRight: '0.5rem', color: 'grey' }} />
                    <Box>
                      <Typography variant="body1" sx={{ color: 'grey' }}>
                        {t('day.interviewScore')}
                      </Typography>
                      <InputText type="text" value={score} name="score" onChange={handleScore} />
                    </Box>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={12}>
                <Paper elevation={3} sx={{ height: '100%' }}>
                  <Box padding="12px" display="flex">
                    <MuiIcon.Assignment fontSize="small" sx={{ marginRight: '0.5rem', color: 'grey' }} />
                    <Box>
                      <Typography variant="body1" sx={{ color: 'grey' }}>
                        {t('day.interviewerAssessment')}
                      </Typography>
                      <InputText
                        type="text"
                        value={comment}
                        name="commemt"
                        rows={4}
                        multiline
                        onChange={handleComment}
                      />
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
            <GroupButton>
              <ButtonCancel onClick={handleClose}>{t('modalEdit.cancelbtn')}</ButtonCancel>
              <ButtonAdd onClick={() => handleItemClick(!open)}>{t('modalEdit.savebtn')}</ButtonAdd>
            </GroupButton>
          </ShowBox>
        </Box>
      </Modal>
    </>
  );
}
