import NavBar from "./NavBar";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

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
        <Button
          sx={{
            marginRight: 2,
            backgroundColor: "#4032AF",
            "&:hover": {
              backgroundColor: "#4032AF",
            },
          }}
          size="large"
          variant="contained"
          onClick={() => navigate("/search-organizations")}
        >
          SEARCH ORGANIZATIONS
        </Button>
        <Button
          size="large"
          variant="contained"
          sx={{
            backgroundColor: "#5542FF",
            "&:hover": {
              backgroundColor: "#5542FF", // Custom hover color
            },
          }}
        >
          SEARCH FOR LEADS
        </Button>
        {/* </Stack> */}
      </Box>
      ;
    </>
  );
};

export default Home;
