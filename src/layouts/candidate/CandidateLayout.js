import { Outlet, useNavigate } from 'react-router-dom';
import { Box, styled } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navbar } from './Navbar';
import { Footer } from '../../components/home-components';
import { UserActionLogout } from '../../redux/actions/UserAction';
import LoadingPage from '../../components/Loading/Loading';

const StyledBox = styled(Box)({
  backgroundColor: '#E6F0FF',
});

export default function CandidateLayout() {
  const navigate = useNavigate();
  const [openLoading, setOpenLoading] = useState(false);
  const dispatch = useDispatch();
  const timeOutId = useRef(null);
  useEffect(() => {
    return () => {
      if (timeOutId.current) {
        clearTimeout(timeOutId.current);
      }
    };
  }, []);
  const handleLogOut = async () => {
    setOpenLoading(true);
    await dispatch(UserActionLogout());
    timeOutId.current = setTimeout(() => {
      setOpenLoading(false);
      navigate('/candidate');
    }, 2000);
  };
  if (openLoading) {
    return (
      <div style={{ height: '100rem', position: 'relative' }}>
        <LoadingPage />
      </div>
    );
  }

  return (
    <div className="candidate-layout">
      <StyledBox>
        <Navbar onhandlelogout={handleLogOut} />
      </StyledBox>
      <Outlet />
      <Footer />
    </div>
  );
}
