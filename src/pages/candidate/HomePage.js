import { Box, styled } from '@mui/material';
import Companies from '../../components/home-components/Companies';
import Guide from '../../components/home-components/Guide';
import HeroNoNavbar from '../../components/home-components/HeroNoNavbar';
import Properties from '../../components/home-components/Properties';

function Home() {
  const StyledBox = styled(Box)({
    backgroundColor: '#E6F0FF',
  });

  return (
    <StyledBox>
      <HeroNoNavbar />
      <Companies />
      <Guide />
      <Properties />
    </StyledBox>
  );
}

export default Home;
