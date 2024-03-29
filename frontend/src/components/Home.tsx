import NavBar from "./NavBar";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <Box
        padding={8}
        alignItems="center"
        textAlign="center"
        bgcolor="#4032AF"
        // border={10}
        // borderColor="#FFFFFF"
      >
        <Typography
          variant="h2"
          fontWeight="700"
          marginBottom={3}
          color="#ffffff"
        >
          WELCOME TO LEADGEN
        </Typography>
        <Typography
          variant="h3"
          fontWeight="400"
          marginBottom={4}
          color="#FFFFFF"
        >
          Let's get started...
        </Typography>
        <Box display="flex" justifyContent="center" marginBottom={4}>
          <Button
            size="large"
            variant="contained"
            sx={{
              marginRight: 2,
              backgroundColor: "#6B5AFF",
              "&:hover": {
                backgroundColor: "#4730cc",
              },
            }}
            onClick={() => navigate("/search-organizations")}
          >
            SEARCH ORGANIZATIONS
          </Button>
          <Button
            size="large"
            variant="contained"
            sx={{
              backgroundColor: "#6B5AFF",
              "&:hover": {
                backgroundColor: "#4730cc",
              },
            }}
            onClick={() => navigate("/search-leads")}
          >
            SEARCH FOR LEADS
          </Button>
        </Box>
      </Box>
      <Box padding={3} paddingY={5}>
        <Typography variant="h4" fontWeight="bold">
          ABOUT LEADGEN:
        </Typography>
        <Typography marginTop={2} variant="h5">
          - Leadgen is is a powerful tool designed to streamline and automate
          the process of generating potential business leads.
          <br />
          <br />- By leveraging various data sources and algorithms, it
          identifies and compiles information on individuals or organizations
          according to the input provided by the user, enabling businesses to
          efficiently target and nurture potential customers.
          <br />
          <br />- This application empowers businesses to expand their customer
          base, improve conversion rates, and ultimately drive growth and
          success.
        </Typography>
        <Typography
          variant="h4"
          fontWeight="bold"
          marginTop={5}
          marginBottom={1}
        >
          Features you can access with Leadgen:
        </Typography>
        <Stack direction="row" padding={4}>
          <Card sx={{ width: 400, marginRight: 6, boxShadow: 5 }}>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CorporateFareIcon
                sx={{
                  fontSize: 150,
                  height: 140,
                  color: "#4032AF",
                }}
              />
            </CardContent>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Search Organizations
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Get the data of organizations from around the world bu just
                entering the requirements like industries, locations,
                employee-size, etc.
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ width: 400, marginRight: 6, boxShadow: 5 }}>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <PersonSearchIcon
                sx={{
                  fontSize: 150,
                  height: 140,
                  color: "#4032AF",
                }}
              />
            </CardContent>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Search Leads
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Want the personal data of the decision-makers of big firms?
                Check out the Search for Leads feature.
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ width: 400, marginRight: 3, boxShadow: 5 }}>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <MailOutlineIcon
                sx={{
                  fontSize: 150,
                  height: 140,
                  color: "#4032AF",
                }}
              />
            </CardContent>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Send Bulk Emails
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Now you can send emails to a bulk of leads and that too on a
                daily basis. Just write down the email which you want to send
                and submit. That's it!
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      </Box>
      <Box bgcolor="#4032AF" sx={{ height: 400 }}>
        <Typography variant="h3" fontWeight="700" padding={3} color="#ffffff">
          Contact us:
        </Typography>
        <Typography variant="h5" fontWeight="700" padding={3} color="#ffffff">
          Email: anshsahax1@gmail.com
          <br />
          <br />
          LinkedIn:{" "}
          <Link color="inherit">https://www.linkedin.com/AnshSaha</Link>
          <br />
          <br />
          Instagram:{" "}
          <Link color="inherit">https://www.instagram.com/anshsaha</Link>
          <br />
          <br />
          X: <Link color="inherit">https://www.x.com/anshsaha</Link>
        </Typography>
      </Box>
    </>
  );
};

export default Home;
