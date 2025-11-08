import React from 'react'
import { Navbar } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

const LayoutPublic = () => {
  return (
    <>
        <Navbar />
        <main className='container'>
            {NavigationActivation.state === "loading" && (
                <div className='alert alert-info-my-5'>
                    Loading...
                </div>
            )}
            <Outlet />
        </main>
    </>
  )
}

export default LayoutPublic