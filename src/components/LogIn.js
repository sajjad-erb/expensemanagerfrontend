import axios from 'axios'
import React, { useState } from 'react'
import RegistrationImage from '../assets/RegistrationImage.jpg'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../services/auth/authSlice'


const LogIn = () => {

  const [email , setEmail] = useState('')
	const [password , setPassword] = useState('')
	
	const navigate =useNavigate()
	const dispatch =useDispatch()

	const submitSignIn = async (e) => {
    e.preventDefault();
    axios({
      url: "http://localhost:3000/auth/sign_in",
      method: "POST",
      data: { email, password },
    }).then((Response) => {
      let accessToken = Response.headers["access-token"];
      let client = Response.headers["client"];
      let uid = Response.headers["uid"];

      dispatch(setCredentials({ accessToken, client, uid }));
      
      if (Response.status == 200) {
        navigate("/");
      }
      setEmail("");
      setPassword("");
    });
  };

  const handleSignUp = () =>{
    navigate('/signup')
  }

  return (
    <div className="align-items-center d-flex justify-content-center min-vh-100">
      <div className='border container d-flex justify-content-around '>
        <div>
          <img src={RegistrationImage} alt="" />
        </div>
        <div>
          <div className="text-center my-5">
            <h1>LogIn</h1>
            <p>Welcome back to track your Expenses </p>
          </div>
          <form onSubmit={submitSignIn}>
            <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => {setEmail(e.target.value)}} />
              <small className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group mt-4">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="Password"  onChange={(e) => {setPassword(e.target.value)}} />
            </div>
            <button type="submit" className="text-center text-indigo-400 font-bold rounded py-2 w-2/12 focus:outline-none bg-gray-900 border-2 border-indigo-400">Login</button>
          </form>
          <p onClick={handleSignUp}>Dont have an account? <span className='fw-200 text-decoration-underline text-info pointer-class'>Sign Up</span></p>
        </div>
      </div>
    </div>
  )
}

export default LogIn