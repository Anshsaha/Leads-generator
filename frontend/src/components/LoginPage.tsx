import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Container,
  TextField,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Login } from "../services/Auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token: any = localStorage.getItem("token");
  //   if (token) {
  //     console.log(token, "444444444444444");
  //     const userInfo: any = jwtDecode(token);
  //     console.log(userInfo);
  //   }
  // }, []);

  const handleTogglePasswordVisibility = () => {
    {
      showPassword ? setShowPassword(false) : setShowPassword(true);
    }
  };

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   const response = Login(data);
  // };

  const handleLogin = async () => {
    const user = {
      email: email?.trim(),
      password: password?.trim(),
    };
    const { data, error }: any = await Login(user);
    if (error) {
      toast.error("Email or password incorrect!");
    } else {
      toast.success(`Login Successful!`);
      navigate("/home");
    }
  };

  return (
    <>
      <Typography variant="h1" padding={8} align="center">
        Leads-Generator
      </Typography>
      <Container maxWidth="sm" sx={{ marginTop: 9, fontWeight: "bold" }}>
        Login
        <Box
          sx={{ marginBottom: 2, marginTop: 2 }}
          // component="form"
          // onSubmit={handleSubmit}
        >
          <TextField
            className="email"
            label="Email"
            variant="filled"
            color="secondary"
            fullWidth
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              style: { color: "white" },
            }}
            sx={{ backgroundColor: "GrayText" }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className="password"
            margin="normal"
            label="Password"
            variant="filled"
            fullWidth
            color="secondary"
            type={showPassword ? "text" : "password"}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              style: { color: "white" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ backgroundColor: "GrayText" }}
            onChange={(p) => setPassword(p.target.value)}
          />
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            sx={{
              marginTop: 1,
            }}
            onClick={handleLogin}
          >
            Submit
          </Button>
        </Box>
      </Container>
    </>
  );
};
