import NavBar from "./NavBar";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  return (
    <>
      <NavBar />
      <Box padding={3}>
        <Typography variant="h2" fontWeight="600">
          Welcome to LeadGen:
        </Typography>
        <Typography
          variant="h3"
          fontWeight="400"
          marginTop={3}
          marginBottom={4}
        >
          Let's get started...
        </Typography>
        {/* <Stack  spacing={2}> */}
        <Button
          sx={{ marginRight: 2 }}
          size="large"
          variant="contained"
          color="secondary"
        >
          SEARCH ORGANIZATIONS
        </Button>
        <Button size="large" variant="contained">
          SEARCH FOR LEADS
        </Button>
        {/* </Stack> */}
      </Box>
      ;
    </>
  );
};

export default Home;
