import "./App.css";
import CreateUser from "./components/userComponents/createUser";
import showAllUsers from "./components/userComponents/showAllUsers";
import Header from "./components/header/header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* <Route> */}
        <Route path="/" Component={showAllUsers} />
        <Route path="/createUser" Component={CreateUser} />
        {/* </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
