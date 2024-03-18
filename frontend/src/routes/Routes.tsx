import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import { LoginPage } from "../components/LoginPage";
import Profile from "../components/Profile";
import Users from "../components/UsersList";
import AddUser from "../components/AddUser";
import SearchOrgs from "../components/SearchOrgs";
import Results from "../components/Results";

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
        <Route path="/search-organizations" Component={SearchOrgs} />
        <Route path="/results" Component={Results} />
      </Routes>
    </BrowserRouter>
  );
};

export default routes;
