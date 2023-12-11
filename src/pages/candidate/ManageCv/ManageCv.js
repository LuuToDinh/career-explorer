/*eslint-disable*/
import { useEffect, useState } from 'react';
import Iframe from 'react-iframe';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { Grid, Button, Container, TextField, styled, FormLabel, Snackbar, Alert, Box } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import palette from '../../../theme/palette';
import './index.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { UploadCVForCandidate, GetCandidateCv } from '../../../redux/actions/ManagecvAction';
import { decodeJwt } from '../../../utils/deCode';
import { storage } from '../../../services/storage';
import { useDispatch } from 'react-redux';

const StyledGrid = styled(Grid)({
  marginTop: '10px',
});

const Label = styled(FormLabel)({
  fontSize: '16px',
  fontWeight: 'bold',
  color: 'grey',
});

const InputBox = styled(TextField)({
  width: '100%',
});

const GroupButton = styled(Container)({
  textAlign: 'center',
  marginTop: '10px',
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

function ManageCv() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = storage.getCache('access_token');
  const { UserId } = decodeJwt(token);

  console.log(UserId);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [pdfFile, setPdfFile] = useState(null);
  const [pdffilePreview, setPdfFilePreview] = useState(null);
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [pdfError, setPdfError] = useState('');
  const [dataDetail, setDataDetail] = useState();

  const allowedFiles = ['application/pdf'];

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (allowedFiles.includes(selectedFile.type)) {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfError('');
          setPdfFilePreview(e.target.result);
          const base64String = e.target.result.split(',')[1];
          const decodedData = atob(base64String);
          const blob = new Blob([decodedData], { type: 'application/pdf' });
          const formData = new FormData();
          formData.append('file', blob, selectedFile.name);
          setPdfFile(formData);
        };
      } else {
        setPdfError('Not a valid pdf: Please select only PDF');
      }
    } else {
      console.log('please select a PDF');
    }
  };

  const handleSubmit = async () => {
    if (pdfFile) {
      const response = await dispatch(UploadCVForCandidate(pdfFile, UserId));
      console.log(response);
      if (response) {
        setOpen(true);
      }
    } else {
      setOpenError(true);
      setPdfError('Please select a PDF');
    }
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/candidate');
  };

  const handleCancel = () => {
    navigate('/candidate');
  };

  const handleErrorClose = () => {
    setOpenError(false);
  };

  useEffect(() => {
    dispatch(GetCandidateCv(UserId)).then((res) => setDataDetail(res));
  }, [UserId]);

  return (
    <Container>
      <form>
        {!dataDetail?.url && (
          <StyledGrid item xs={4}>
            <Label>{t('upPDF')}</Label>
            <div style={{ paddingTop: '8px' }}>
              <InputBox type="file" id="image_uploads" onChange={handleFile} />
              {pdfError && (
                <MuiAlert severity="error" sx={{ width: '100%' }}>
                  {pdfError}
                </MuiAlert>
              )}
            </div>
          </StyledGrid>
        )}
        <Label>{t('viewPDF')}</Label>

        {!pdffilePreview && (
          <Box sx={{ display: 'flex', justifyContent: 'center', height: '800px' }}>
            <Iframe
              url={
                // 'https://cdn.filestackcontent.com/JmkWB35PS0mh5wb2SJYQ?fbclid=IwAR2jwP_z9Z7MR6ulS3FyA3Qi5N-5GI1yLjnu6AZSYzJcwtxg7mfZKeMJo8M' ||
                dataDetail?.url
              }
              width="80%"
              height="100%"
              display="initial"
              position="absolute"
            />
          </Box>
        )}
        {pdffilePreview && !dataDetail?.url && (
          <div className="viewer">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
              <Viewer fileUrl={pdffilePreview} plugins={[defaultLayoutPluginInstance]}></Viewer>
            </Worker>

            {!pdffilePreview && <>No file is selected yet</>}
          </div>
        )}

        {!dataDetail?.url && (
          <GroupButton>
            <ButtonCancel onClick={handleCancel}>{t('cancel')}</ButtonCancel>
            <ButtonAdd onClick={handleSubmit}>{t('detailsPage.save')}</ButtonAdd>
          </GroupButton>
        )}
      </form>

      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={500}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Alert elevation={6} severity="success" variant="filled">
          {t('uploadcv.success')}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openError}
        onClose={handleErrorClose}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Alert elevation={6} severity={'error'} variant="filled">
          {t('uploadcv.failed')}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default ManageCv;
