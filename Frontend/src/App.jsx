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
import AdminPanel from './Pages/AdminPanel';
import AdminAllPatients from './Pages/AdminAllPatients';
import AdminCheckedIn from './Pages/AdminCheckedIn';
import AdminTodayPatients from './Pages/AdminTodayPatients';
import AdminGenerateIDs from './Pages/AdminGenerateIDs';
import AdminFiterDownload from './Pages/AdminFiterDownload';
import AdminDeletePatients from './Pages/AdminDeletePatients';
import DateAppointments from './Pages/DateAppointments';

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
        <Route path='/admin-dashboard' element={<AdminPanel />} />
        
        <Route path='/admin-dashboard/all-patients' element={<AdminAllPatients />} />
        <Route path='/admin-dashboard/filter-download' element={<AdminFiterDownload />} />
        <Route path='/admin-dashboard/checked-in' element={<AdminCheckedIn />} />
        <Route path='/admin-dashboard/today-patients' element={<AdminTodayPatients />} />    
        <Route path='/admin-dashboard/generate-ids' element={<AdminGenerateIDs />} />
        <Route path='/admin-dashboard/delete-patients' element={<AdminDeletePatients />} />
        <Route path='/date-appointments' element={<DateAppointments />} />
      </Routes>
    </div>
  )
}

export default App;

