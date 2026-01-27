import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import LoginOption from './Pages/LoginOption';
import Signup from './Pages/Signup';

function App() {

  return (
    <div className='h-screen w-full bg-blue-50'>
        {/* <Navbar /> */}
      <LoginOption/>
      {/* <Signup/> */}
    </div>
  )
}

export default App;