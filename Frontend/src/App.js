import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/common/Home";
import Login from "./components/common/Login";
import Register from "./components/common/Register";
import ForgotPassword from "./components/common/ForgotPassword";
import { createContext, useEffect, useState } from "react";
import UserHome from "./components/common/UserHome";
import About from "./components/common/About";
import AdminHome from "./components/admin/AdminHome"; // Import Admin Home

export const UserContext = createContext();

function App() {
  //const date = new Date().getFullYear();
  const [userData, setUserData] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const getData = async () => {
    try {
      const user = await JSON.parse(localStorage.getItem("user"));
      if (user && user !== undefined) {
        setUserData(user);
        setUserLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, userLoggedIn }}>
      <div className="App">
        <Router>
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/adminhome" element={<AdminHome />} />

              {/* Conditional Routing based on login status */}
              {userLoggedIn ? (
                <>
                  {/* Check if user is admin */}
                  {userData?.type === "admin" ? (
                    <Route path="/adminhome" element={<AdminHome />} />
                  ) : (
                    <Route path="/userhome" element={<UserHome />} />
                  )}
                </>
              ) : (
                <Route path="/login" element={<Login />} />
              )}
            </Routes>
          </div>

          {/* Footer */}
          <footer className="bg-light text-center text-lg-start">
            {/* <div className="text-center p-3">© {date} Copyright: EasyPost</div> */}
            
            <div className="text-center p-3">Copyright©: PostPro-Your Professional Blogging Platform</div>
          </footer>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
