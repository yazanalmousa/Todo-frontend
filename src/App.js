import "./App.css";
import LogInForm from "./components/LogInForm";
import SignUp from "./components/SignUp.js";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import Todo from "./components/Todo";
import { UserContext } from "./helper/Context.js";
import { useState } from "react";
import { UserEmail } from "./helper/Context.js";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  return (
    <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
      <UserEmail.Provider value={{ userEmail, setUserEmail }}>
        <div className="nav-container">
          <NavBar className="nav" />
        </div>
        <Routes>
          <Route path="/" element={<LogInForm />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
        <ToastContainer />
      </UserEmail.Provider>{""}
    </UserContext.Provider>
  );
}

export default App;
