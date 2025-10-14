import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppProvidor } from './components/context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <AppProvidor>
    <App />
  </AppProvidor>,
)
