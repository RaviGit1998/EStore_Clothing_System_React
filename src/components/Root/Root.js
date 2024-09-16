import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'

function Root() {
  return (
    <div className="root-container">
    <Header/>
    <main className="content-wrap">
      <Outlet /> {/* This renders the child routes, like SignupPage or LoginPage */}
    </main>
    <Footer /> {/* Footer is always at the bottom */}
  </div>
  )
}

export default Root