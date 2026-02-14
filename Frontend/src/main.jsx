import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import PatientContextProvider from './context/PatientContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <PatientContextProvider>
      <App />
    </PatientContextProvider>
  </BrowserRouter>
)
