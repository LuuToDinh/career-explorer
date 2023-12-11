import { Box } from '@mui/material';
import Companies from '../../components/home-components/Companies';
import Guide from '../../components/home-components/Guide';
import Properties from '../../components/home-components/Properties';
import Footer from '../../components/home-components/Footer';
import HeroNoNavbar from '../../components/home-components/HeroNoNavbar'

function Home() {
  return (
    <Box sx={{ backgroundColor: '#E6F0FF' }}>
      <HeroNoNavbar />
      <Companies />
      <Guide />
      <Properties />
    </Box>
  );
}

export default Home;
