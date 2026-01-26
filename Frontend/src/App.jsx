import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='h-screen w-full bg-gray-800'>
      <p className='text-2xl py-4 px-10 bg-gray-900 font-bold text-white text-center'>Patient-Management-System</p>
    </div>
  )
}

export default App
