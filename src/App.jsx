import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import { ToastContainer } from 'react-toastify';

import Login from "./components/AuthComponents/Login";
import Register from "./components/AuthComponents/Register";
import ForgotPassword from "./components/AuthComponents/forgotPassword";
import Home from "./components/home";
import Profile from "./components/HomeComponents/Profile";


function App() {
  const loggedIn = localStorage.getItem('user')
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/home" element={loggedIn? <Home /> : <Login />} />
          <Route path="/profile" element={loggedIn? <Profile /> : <Login />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
};

export default App;
