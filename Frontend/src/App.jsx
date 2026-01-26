import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import LoginOption from './Pages/LoginOption';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='h-screen w-full bg-blue-50'>
        {/* <Navbar /> */}
      <LoginOption/>
    </div>
  )
}

export default App;