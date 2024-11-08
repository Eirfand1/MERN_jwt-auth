import React from 'react'
import SidebarMenu from '../../components/SidebarMenu'
import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'

const Dashboard: React.FC  = () => {
  const [user, setUser] = useState([])

  useEffect(() => {
    const userData = Cookies.get('user')

    if(userData){
      setUser(JSON.parse(userData))
    }
  
  },[])
  
  return (
    <div className=" min-h-screen mx-auto p-8 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-3">
          <SidebarMenu />
        </div>
        <div className="md:col-span-9">
          <div className="card bg-base-100 shadow-sm rounded-sm border">
            <div className="card-body">
              <h2 className="card-title bg-primary text-primary-content p-4 -mx-6 -mt-6">
                DASHBOARD
              </h2>
              <div className="mt-4">
                Selamat Datang, <span className="font-bold">{user?.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 
