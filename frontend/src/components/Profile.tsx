import { jwtDecode } from "jwt-decode";
import NavBar from "./NavBar";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Box, Typography } from "@mui/material";

const Profile = () => {
  const token: any = localStorage.getItem("token");
  const userInfo: any = jwtDecode(token);
  return (
    <>
      <NavBar />
      <Box display="flex" alignItems="center" marginLeft={30} marginTop={10}>
        <AccountBoxIcon
          sx={{ color: "#4032AF", fontSize: "200px", marginRight: "20px" }}
        />
        <Box>
          <Typography marginBottom={2} fontWeight="bold">
            {userInfo.name}
          </Typography>
          <Typography marginBottom={2}>{userInfo.email}</Typography>
          <Typography>{userInfo.user_role}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
