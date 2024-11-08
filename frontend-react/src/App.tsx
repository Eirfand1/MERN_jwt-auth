import './App.css'
import React from 'react'
import NavApp from './components/NavApp'
import AppRoutes from './routes/index'


const App: React.FC = () => {

  return (
    <div data-theme="light" className="min-h-screen">
      <NavApp />
      <AppRoutes />
    </div>
  )
}

export default App
