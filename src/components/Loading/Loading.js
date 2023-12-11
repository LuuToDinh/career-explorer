import CircularProgress from '@mui/material/CircularProgress';

const LoadingPage = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <CircularProgress />
    <h4>Please wait...</h4>
  </div>
);

export default LoadingPage;
