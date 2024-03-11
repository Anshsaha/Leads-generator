import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { Link } from "@mui/material";

export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const navigate = useNavigate();

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

  const handleUsers = () => {
    toggleDrawer(false);
    navigate("/users");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="secondary" position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)} // Open drawer on click
          >
            <MenuIcon />
          </IconButton>
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            sx={{ flexGrow: 1 }}
            // onClick={() => navigate("/home")}
            href="/home"
          >
            LeadGen
          </Link>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
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
          },
        }}
        open={openDrawer}
        onClose={toggleDrawer(false)}
      >
        <Box border="ButtonFace">
          <Typography sx={{ marginTop: 1 }} fontWeight="bold" padding={2}>
            LeadGen
          </Typography>
        </Box>
        <List>
          <ListItem button onClick={toggleDrawer(false)}>
            <ListItemText primary="Generate Organizations" />
          </ListItem>
          <ListItem button onClick={toggleDrawer(false)}>
            <ListItemText primary="Generate Leads" />
          </ListItem>
          <ListItem button onClick={handleUsers}>
            <ListItemText primary="Users" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
