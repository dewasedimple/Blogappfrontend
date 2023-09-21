import Admin from "./pages/admin";
import Blog from "./pages/blog";
import "./App.css";
import Mainpage from "./components/mainpage";
import { BrowserRouter ,Routes,Route,Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import React, { useState } from "react";


function App() {
  const [showLogin, setShowLogin] = useState(true);
const [isAuthenticated, setIsAuthenticated] = useState(false);

const toggleSignup = () => {
  setShowLogin(!showLogin);

};

 const handleLogin=()=>{
  setIsAuthenticated(true);
 };
 const handleLogout=()=>{
  setIsAuthenticated(false);
 };
  return (
    <BrowserRouter>
    <div className="App">
    <Routes>
  <Route
    path="/"
    element={showLogin?
      (isAuthenticated ? (
        <Navigate to="/mainpage" />
      ) : (
        <Login onLogin={handleLogin} toggleSignup={toggleSignup} />
      )):
      (isAuthenticated ? (
        <Navigate to="/mainpage" />
      ) : (
        <Signup onLogin={handleLogin} toggleSignup={toggleSignup} />
      ))
    }
  />
  <Route path="/signup" element={<Signup toggleSignup={toggleSignup} />} />
  <Route
    path="/mainpage"
    element={isAuthenticated ? <Mainpage onLogout={handleLogout} /> : <Navigate to="/" />}
  />
  <Route
    path="/admin"
    element={isAuthenticated ? <Admin /> : <Navigate to="/" />}
  />
  <Route
    path="/blog"
    element={isAuthenticated ? <Blog /> : <Navigate to="/" />}
  />
</Routes>

</div>
    </BrowserRouter>
  );
}

export default App;