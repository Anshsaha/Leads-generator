import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addUser, editUser } from "../services/User";

export default function SimpleContainer() {
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [IsEditPage, setIsEditPage] = useState(false);
  const [currentID, setCurrentID] = useState("");
  const navigate = useNavigate();
  const roles = ["Admin", "User"];

  useEffect(() => {
    setIsEditPage(location?.pathname?.includes("edit"));
    if (location?.pathname?.includes("edit")) {
      setCurrentID(location?.state?.row?.id);
      setName(location?.state?.row?.name);
      setEmail(location?.state?.row?.email);
      setRole(location?.state?.row?.user_role);
    }
  }, [location]);

  const handleClick = () => {
    IsEditPage ? handleEditUser() : handleAddUser();
  };

  const handleAddUser = async () => {
    const payload = {
      name: name,
      email: email,
      user_role: role,
    };
    const { data, error }: any = await addUser(payload);
    if (error) {
      toast.error(error);
    } else {
      toast.success(data);
      navigate("/users");
    }
  };

  const handleEditUser = async () => {
    const payload = {
      name: name,
      email: email,
      user_role: role,
    };
    const { data, error }: any = await editUser(currentID, payload);
    if (error) {
      toast.error(error);
    } else {
      toast.success(data);
      navigate("/users");
    }
  };

  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Box
          boxShadow={10}
          marginTop={5}
          sx={{
            bgcolor: "#cfe8fc",
            height: "80vh",
            "& .MuiTextField-root": {
              m: 2,
              width: "90%",
              marginLeft: 4,
            },
          }}
          component="form"
          noValidate
          autoComplete="off"
        >
          <FormControl fullWidth required sx={{ m: 1 }}>
            <Typography
              variant="h3"
              fontWeight="400"
              marginLeft={4}
              paddingY={3}
            >
              {IsEditPage ? "Edit" : "Add"} User
            </Typography>
            <TextField
              required
              id="outlined-required"
              label="Name"
              value={name}
              helperText="Enter the name of the user"
              onChange={(n) => setName(n.target.value)}
            />
            <TextField
              required
              id="outlined-required"
              label="Email"
              value={email}
              helperText="Provide the email address of the user"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormControl>
              <InputLabel sx={{ marginLeft: 4, marginTop: 2 }} required>
                Role
              </InputLabel>
              <Select
                value={role}
                label="Roles"
                onChange={handleRoleChange}
                sx={{
                  m: 2,
                  width: "90%",
                  marginLeft: 4,
                }}
                // inputProps={{
                //   name: "role",
                //   id: "role",
                // }}
              >
                {roles &&
                  roles.map((item: any) => {
                    return (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
              </Select>
              <FormHelperText sx={{ marginTop: -2, marginLeft: 6 }}>
                Assign a role to the user
              </FormHelperText>
            </FormControl>
          </FormControl>
          <Button
            sx={{ float: "right", marginRight: 7, marginTop: 2 }}
            variant="contained"
            onClick={handleClick}
          >
            {IsEditPage ? "SUBMIT" : "ADD USER"}
          </Button>
        </Box>
      </Container>
    </React.Fragment>
  );
}
