import React, {useState, useEffect} from 'react';
import { API_URL } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const UserAuth = ({showLogin, showRegister, closeAuthHandler}) => {
  const [activeLogin, setActiveLogin] = useState(false);

  const toggleActiveLogin = () => {
    setActiveLogin(!activeLogin);
};


const UserLogin = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
            window.location.reload();
            const data = await response.json();
            const userId = data.userId;
            const userName = data.username;
            const loginToken = data.token;
            console.log(userId);
            console.log(userName);
            alert("Login Successfull");
            navigate('/')
            localStorage.setItem('userId', userId);
            localStorage.setItem('username', userName);
            localStorage.setItem('loginToken', loginToken);
            console.log('this is the loginToken', loginToken); 
        } catch (error) {
            console.error('Error:', error.message);
            alert(error.message)
          
        }
    };

    return (
        <section className="formSection">
            <h3>User Login</h3>
            <form onSubmit={handleSubmit} className='authForm' >
                <label>User Email</label><br />
                <input type="text" name="email" value={formData.email} onChange={handleChange} /><br />
                <label>Password</label><br />
                <input type="password" name="password" value={formData.password} onChange={handleChange} /><br /><br />
                <button type="submit" className="submitBtn">
                    Login
                </button>
            </form>
        </section>
    );
};



const UserRegister = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if(response.ok){
                alert("Registration Successfull")
                setActiveLogin(true)
            }else if(data === "Email already taken"){
                alert("You are a registered user, Please login");
                setActiveLogin(true)
            }

            console.log(data); 
        } catch (error) {
            console.error('Error:', error.message);
            alert("Registration failed")
        }
    };

    return (
        <section className="formSection">
            <h3>User Register</h3>
            <form onSubmit={handleSubmit} className='authForm'>
                <label>Username</label><br />
                <input type="text" name="username" value={formData.username} onChange={handleChange} /><br />
                <label>User Email</label><br />
                <input type="text" name="email" value={formData.email} onChange={handleChange} /><br />
                <label>Password</label><br />
                <input type="password" name="password" value={formData.password} onChange={handleChange} /><br />
                {/* Other form fields */}
              <br /><br />
                <button type="submit" className="submitBtn">
                    Submit
                </button>
            </form>
        </section>
    );
};


  return (
   <section className="userAuthSection">
    <div className="clsBtn">
    <button className='authBtn' onClick={closeAuthHandler}>Close</button>
        </div>
        <div className="userLogin">
        {(showLogin || activeLogin) && <UserLogin />}
        </div>
        <div className="userRegister">
        {showRegister && !activeLogin && <UserRegister onRegistrationSuccess={toggleActiveLogin} />}
        </div>
        
   </section>
  )
}

export default UserAuth