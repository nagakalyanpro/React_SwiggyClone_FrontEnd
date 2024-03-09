import React from 'react'
import LandingPage from './application/pages/LandingPage'
import { Routes, Route } from 'react-router-dom'


import './App.css'
import FirmMenu from './application/components/FirmMenu'
import TopBar from './application/components/TopBar'
import UserAuth from './application/components/auth/UserAuth'
import CartItems from './application/components/CartItems'

const App = () => {
  return (
   <>
      <TopBar />
      {/* <UserAuth /> */}
    <div className='landingPage'>
      <Routes>
        <Route path='/' element= {<LandingPage />} />
        <Route path='/products/:firmId/:firmName' element= {<FirmMenu />} />
        <Route path='/cart' element={<CartItems />} />
        <Route path='/login' element= {<UserAuth />} />
      </Routes>

    </div>
   </>
  )
}

export default App