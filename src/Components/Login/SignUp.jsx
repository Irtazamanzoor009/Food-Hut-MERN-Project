import React from 'react'
import HomePage from '../HomePage/HomePage'
import Navbar from '../Navbar/Navbar'
import Slider from '../Slider/Slider'
import "./login.css"

const SignUp = () => {
  return (
    <>
    <Navbar/>
    <div className='signup-container'>
        <div className="signup">
            <div className="signupForm">
                <h3>Sign Up</h3>
                <form className='form' action="">
                    <input type="text" placeholder='Enter Username' />
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

export default SignUp