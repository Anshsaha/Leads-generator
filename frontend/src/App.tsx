import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routes from "./routes/Routes";
import theme from "./utils/Theme";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer
          bodyStyle={{ color: "#00000", fontWeight: "400" }}
          theme="colored"
          hideProgressBar
        />
      </ThemeProvider>
      <Routes />
    </>
  );
}

export default App;
