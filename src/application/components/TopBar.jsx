import React, {useEffect, useState} from 'react'
import UserAuth from './auth/UserAuth'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const TopBar = () => {
    const [authForm, setAuthForm] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [showRegister, setShowRegister] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem('loginToken');
        setIsLoggedIn(!!token);
    },[isLoggedIn])
    
    const showRegisterHandler = ()=>{
        setShowRegister(true);
        setShowLogin(false)
        setAuthForm(true)
}
    const showLoginHandler = ()=>{
        setShowLogin(true)
        setShowRegister(false)
        setAuthForm(true)
}




    const showAuthHandler = ()=>{
        setAuthForm(true)
    }
    const closeAuthHandler = ()=>{
        setAuthForm(false)
    }
    const logOutHandler =()=>{
        confirm("Are you sure, you want to logout?")
            localStorage.removeItem('loginToken');
            localStorage.removeItem('firmId');
            localStorage.removeItem('username');
            localStorage.removeItem('userId');
            setIsLoggedIn(false);
                navigate('/')
    }

  return (
<>
<section className="topBarSection">
<Link to='/'>
<div className="companyTitle">
        <h2 style={{ color:"orangered" }}>Ruby</h2>
    </div>
</Link>
    <div className="searchBar">
        {/* <input type="text" placeholder='Search' /> */}
    </div>
{isLoggedIn ? (
 <div className="userLR">   
 <span onClick={logOutHandler}>Logout</span>
</div>
) : (
    <div className="userLR">
        <span onClick={showLoginHandler}>Log In </span> 
        <span>/</span>
        <span onClick={showRegisterHandler}> Register</span>

    </div>
)} 
   <Link to='/cart'>
   <div className="userCart">
        Cart
    </div>
   </Link>
   </section>
   {authForm && <UserAuth showLogin={showLogin} showRegister={showRegister}
   closeAuthHandler = {closeAuthHandler}
   />}
</>
  )
}

export default TopBar