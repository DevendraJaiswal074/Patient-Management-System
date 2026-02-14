// import { useState } from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";

import LoginOption from './Pages/LoginOption';
import Signup from './Pages/Signup';
import DoctorLogin from './Pages/DoctorLogin';
import StaffLogin from './Pages/StaffLogin';
import AdminLogin from './Pages/AdminLogin';
import StaffPanel from './Pages/StaffPanel';
import DoctorPanel from './Pages/DoctorPanel';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {

  return (
    <div className='h-screen w-full bg-blue-50'>
      <Routes>
        <Route path='/' element={<LoginOption />} />
        {/* <Route path='/signup' element={<Signup />} /> */}
        <Route path='/doctor-login' element={<DoctorLogin />} />
        <Route path='/staff-login' element={<StaffLogin />} />
        <Route path='/admin-login' element={<AdminLogin />} />

        <Route path='/staff-dashboard' element={<StaffPanel />} />
        <Route path='/doctor-dashboard' element={<DoctorPanel />} />  
      </Routes>
    </div>
  )
}

export default App;

