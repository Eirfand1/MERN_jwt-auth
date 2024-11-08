import React from "react";
import { Navbar, Button, Menu } from 'react-daisyui'
import { Link } from 'react-router-dom'

const NavApp: React.FC = () => {
  return (
    <Navbar className="top-0 sticky max-h-screen z-50 p-0 m-0 bg-gray-800 text-gray-100  ">
      <div className="flex-1 sticky ">
        <Link to="/">
          <Button tag="a" color="ghost" className="normal-case text-xl">
            SiAKAD
          </Button>
        </Link>
      </div>
      <div className="flex-none">
        <Menu horizontal={true} className="px-1">
          <Menu.Item>
            <a>Register</a>
          </Menu.Item>
         <Menu.Item>
            <a>Login</a>
          </Menu.Item>
        </Menu>
      </div>
    </Navbar>
  )
}

export default NavApp

