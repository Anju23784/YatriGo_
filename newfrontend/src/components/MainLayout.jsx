import React from 'react'
import LeftSidebar from './LeftSidebar'
import { Outlet } from 'react-router-dom'
import RightSidebar from './RightSidebar'

const MainLayout = () => {
  return (
    <div>
         { <LeftSidebar/>}
        <div>
            <Outlet/>
        </div> 
        {/* { <RightSidebar/>} */}
    </div>
  )
}

export default MainLayout