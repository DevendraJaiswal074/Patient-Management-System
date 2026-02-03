// import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import LoginOption from './Pages/LoginOption';
import Signup from './Pages/Signup';
import DoctorLogin from './Pages/DoctorLogin';
import StaffLogin from './Pages/StaffLogin';
import AdminLogin from './Pages/AdminLogin';
import { Route, Routes } from "react-router-dom";
import HomePage from './Pages/HomePage';
import DoctorPanel from './Pages/DoctorPanel';

function App() {

  return (
    <div className='h-screen w-full bg-blue-50'>
      <Routes>
        <Route path='/' element={<LoginOption />} />
        <Route path='/dashboard' element={<HomePage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/doctor-login' element={<DoctorLogin />} />
        <Route path='/staff-login' element={<StaffLogin />} />
        <Route path='/admin-login' element={<AdminLogin />} />
        <Route path='/doctor-dashboard' element={<DoctorPanel />} />  
      </Routes>
    </div>
  )
}

export default App;

