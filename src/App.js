import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import { useState, useEffect } from "react";

const App = () => {
  const [userID, setUserID] = useState();

  useEffect(() => {
    const userID = localStorage.getItem("user");
    if (userID) {
      setUserID(userID);
    }
  }, []);

  const style = {
    padding: 5,
  };

  const handleLogout = () => {
    setUserID(null);
    localStorage.clear();
  };

  if (userID) {
    return (
      <Router>
        <div>
          <Link style={style} to="/">
            home
          </Link>
          <button onClick={handleLogout}>Log out</button>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div>
        <Link style={style} to="/">
          home
        </Link>
        <Link style={style} to="/register">
          register
        </Link>
        <Link style={style} to="/login">
          login
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setUserID={setUserID} />} />
      </Routes>
    </Router>
  );
};

export default App;
