import {Link, useNavigate} from 'react-router-dom'
import React, {useContext} from 'react'
import Cookies from 'js-cookie'
import {AuthContext} from '../context/AuthContext' 

const SidebarMenu: React.FC  = () => {
  const navigate = useNavigate()
  const {setIsAuthenticated} = useContext(AuthContext)

  const logout = ()=> {
    Cookies.remove('token')
    Cookies.remove('user')

    setIsAuthenticated(false)

    navigate('/login', {replace:true})
  }

  return (

    <div className="card top-0 sticky bg-base-100 shadow-sm border rounded-sm">
      <div className="card-body p-0">
        <div className="p-4 bg-primary text-primary-content font-bold">
          MAIN MENU
        </div>
        <div className="menu bg-base-100 w-full">
          <ul className="menu-normal w-full">
            <li>
              <Link to="/admin/dashboard" className="hover:bg-base-200">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/mahasiswa" className="hover:bg-base-200">
               Mahasiswa 
              </Link>
            </li>
            <li>
              <button className="hover:bg-base-200" onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SidebarMenu
