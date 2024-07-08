import React from 'react'
import Navbar from '../Navbar/Navbar';
import "../Login/login.css";


const SignIn = () => {
  return (
    <>
    <Navbar/>
    <div className='signup-container'>
        <div className="signup">
            <div className="signupForm">
                <h3>Sign In</h3>
                <form className='form' action="">
                    <input type="email" placeholder='Enter Email' />
                    <input type="password" placeholder='Enter Password' />
                    <button type='submit'>Sign In</button>
                </form>
            </div>
        <p >Dont't have an account? <a href="">Sign Up</a></p>
        </div>
    </div>
    </>
  )
}

export default SignIn;