import React from 'react'
import Homepage from './Homepage'
import { Outlet } from 'react-router-dom'

function Root() {
  return (
    <div>
    <Homepage/>
    <Outlet/>
    </div>
  )
}

export default Root