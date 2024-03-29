import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { Link } from "@mui/material";
import { jwtDecode } from "jwt-decode";

export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const navigate = useNavigate();

  const token: any = localStorage.getItem("token");
  const user: any = jwtDecode(token);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setAuth(event.target.checked);
  // };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    localStorage.clear();
    navigate("/");
  };

  const toggleDrawer = (open: boolean) => () => {
    setOpenDrawer(open);
  };

  const handleGenerateOrgs = () => {
    toggleDrawer(false);
    navigate("/search-organizations");
  };

  const handleGenerateLeads = () => {
    toggleDrawer(false);
    // navigate("/search-leads");
  };

  const handleUsers = () => {
    toggleDrawer(false);
    navigate("/users");
  };

  const handleResults = () => {
    toggleDrawer(false);
    navigate("/results");
  };

  return (
    <Box>
      <AppBar
        // color="secondary"
        position="static"
        sx={{ backgroundColor: "#4032AF" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Link
            variant="h6"
            fontWeight="bold"
            underline="none"
            color="inherit"
            sx={{ flexGrow: 1 }}
            href="/home"
          >
            LEADGEN
          </Link>
          {auth && (
            <div>
              <IconButton color="inherit" onClick={handleMenu}>
                {user.name
                  .split(" ")
                  .map((n: any) => n[0])
                  .join("")}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => navigate("/profile")}>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            width: 200,
            backgroundColor: "#7E6FFF",
            color: "#FFFFFF",
          },
        }}
        open={openDrawer}
        onClose={toggleDrawer(false)}
      >
        <Box border="ButtonFace">
          <Typography sx={{ marginTop: 1 }} fontWeight="bold" padding={2}>
            LEADGEN
          </Typography>
        </Box>
        <List>
          <ListItem button onClick={handleGenerateOrgs}>
            <ListItemText primary="Generate Organizations" />
          </ListItem>
          <ListItem button onClick={toggleDrawer(false)}>
            <ListItemText primary="Generate Leads" />
          </ListItem>
          <ListItem button onClick={toggleDrawer(false)}>
            <ListItemText primary="Send Bulk Emails" />
          </ListItem>
          <ListItem button onClick={handleResults}>
            <ListItemText primary="Results" />
          </ListItem>
          <ListItem button onClick={handleUsers}>
            <ListItemText primary="Users" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
