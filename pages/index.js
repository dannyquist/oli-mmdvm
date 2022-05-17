import useSWR from 'swr'
import Container from "@mui/material/Container";
import Tgif from "@components/Tgif"
import Dmr from "@components/Dmr"
import Box from "@mui/material/Box"

const Homepage = () => {
  return (
    <>
      {/* <Container maxWidth="100%">
        <h1>OLI MMDVM</h1>
      </Container> */}
      <Tgif />
      </>
  );
};

export default Homepage;
