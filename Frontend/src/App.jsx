// import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import LoginOption from './Pages/LoginOption';
import Signup from './Pages/Signup';
import { Route, Routes } from "react-router-dom";
import HomePage from './Pages/HomePage';

function App() {

  return (
    <div className='h-screen w-full bg-blue-50'>
      <Routes>
        <Route path='/' element={<LoginOption />} />
        <Route path='/dashboard' element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App;

