import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Login } from "../services/Auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = {
      email: email?.trim(),
      password: password?.trim(),
    };
    const { data, error }: any = await Login(user);
    if (error) {
      toast.error("Email or Password incorrect!");
    } else {
      toast.success(data);
      navigate("/home");
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid item xs={12} sm={8} md={6} component={Paper}>
        <Box
          sx={{
            my: 20,
            // mx: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#4032AF" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in to LeadGen
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              sx={{
                marginBottom: 1,
                "& .MuiInputLabel-root": {
                  color: "#4032AF",
                },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#4032AF",
                },
              }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              sx={{
                marginBottom: 1,
                "& .MuiInputLabel-root": {
                  color: "#4032AF",
                },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#4032AF",
                },
              }}
              onChange={(p) => setPassword(p.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#4032AF",
                "&:hover": {
                  backgroundColor: "#4032AF",
                },
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" color="#4032AF">
                  Forgot password?
                </Link>
              </Grid>
              {/* <Grid item></Grid> */}
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        sx={{
          // backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          // backgroundColor: (t) =>
          //   t.palette.mode === "light"
          //     ? t.palette.grey[50]
          //     : t.palette.grey[900],
          backgroundColor: "#4032AF",
          backgroundSize: "cover",
          // backgroundPosition: "center",
        }}
      >
        <Typography variant="h1" fontWeight="bold" padding={8} color="white">
          LEADGEN
        </Typography>
        <Typography variant="h3" fontWeight="400" padding={8} color="white">
          Retrieve organizations and leads data according to your requirement,
          from around the world.
        </Typography>
      </Grid>
    </Grid>
  );
};
