import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import { Toaster } from 'sonner';

import Login from "./components/auth-components/Login.jsx";
import Register from "./components/auth-components/Register.jsx";
import ForgotPassword from "./components/auth-components/Forgot-Password.jsx";
import Home from "./components/Home.jsx";
import Profile from "./components/home-components/Profile.jsx";
import EditProfile from "./components/home-components/EditProfile.jsx";

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
          <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        richColors
        closeButton
      />
    </>
  )
};

export default App;
