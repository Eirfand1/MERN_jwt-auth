import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../views/home'
import Register from '../views/auth/register'
import Login from '../views/auth/login'
import Dashboard from '../views/admin'
import MahasiswaIndex from '../views/admin/mahasiswa/index'
import MahasiswaCreate from '../views/admin/mahasiswa/create'
import MahasiswaEdit from '../views/admin/mahasiswa/edit'

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext)
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/register" element={
        isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Register />
      } />
      <Route path='/login' element={
        isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Login />
      } />
      <Route path='/admin/dashboard' element={
        isAuthenticated ? <Dashboard/> : <Navigate to='/login' replace/>
      }/>
      <Route path='/admin/mahasiswa' element={
        isAuthenticated ? <MahasiswaIndex/> : <Navigate to='/login' replace/>
      }/>
      <Route path='/admin/mahasiswa/create' element={
        isAuthenticated ? <MahasiswaCreate/> : <Navigate to='/login' replace/>
      }/>
      <Route path='admin/mahasiswa/edit/:id' element={
      isAuthenticated ? <MahasiswaEdit/> : <Navigate to='/login'replace/>
      }/>
    </Routes>
  )
}

export default AppRoutes



