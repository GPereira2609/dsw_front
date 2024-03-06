import React from 'react'
import Sidebar from '../components/Sidebar'
import { logout } from '../service/AuthService'


function Home() {
  // logout()  
  return (
    <div className='flex h-screen'>
      <div>
        <Sidebar />
      </div>
      <div className='w-full flex flex-col justify-center items-center'>
        <div className='flex w-full h-1/3 justify-center items-center'>
          
        </div>
        <div className='flex w-full h-2/3 justify-center items-center bg-red'></div>
      </div>
    </div>
  )
}

export default Home