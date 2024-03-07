import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import { LoginPage } from "../components/LoginPage";
import Navbar from "../components/NavBar";
import Profile from "../components/Profile";
import Users from "../components/Users";

const routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} Component={LoginPage} />
        <Route path="/home" Component={Home} />
        <Route path="/profile" Component={Profile} />
        <Route path="/users" Component={Users} />
      </Routes>
    </BrowserRouter>
  );
};

export default routes;
