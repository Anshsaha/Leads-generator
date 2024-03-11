import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import { LoginPage } from "../components/LoginPage";
import Profile from "../components/Profile";
import Users from "../components/UsersList";
import AddUser from "../components/AddUser";

const routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} Component={LoginPage} />
        <Route path="/home" Component={Home} />
        <Route path="/profile" Component={Profile} />
        <Route path="/users" Component={Users} />
        <Route path="/add-user" Component={AddUser} />
        <Route path="/edit-user" Component={AddUser} />
      </Routes>
    </BrowserRouter>
  );
};

export default routes;
