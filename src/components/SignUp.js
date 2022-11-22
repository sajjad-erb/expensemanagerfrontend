import axios from 'axios'
import React, { useState } from 'react'
import RegistrationImage from '../assets/RegistrationImage.jpg'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../services/auth/authSlice'

const SignUp = () => {

	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [userName, setUserName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const submitSignUp = async (e) => {
		e.preventDefault();
		axios({
			url: "http://localhost:3000/auth",
			method: "POST",
			data: { firstName, lastName, userName, email, password },
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

	const handleSignIn = () => {
		navigate('/login')
	}

	return (
		<div className="align-items-center d-flex justify-content-center min-vh-100">
			<div className='border container d-flex justify-content-around align-items-center'>
				<div>
					<img src={RegistrationImage} alt="" />
				</div>
				<div>
					<div className="text-center my-5">
						<h1>SignUp</h1>
						<p>Register Youself</p>
					</div>
					<form onSubmit={submitSignUp}>
						<div className="form-group">
							<label>First Name</label>
							<input type="text" className="form-control" placeholder="Enter First name" onChange={(e) => { setFirstName(e.target.value) }} />
						</div>
						<div className="form-group">
							<label>Last Name</label>
							<input type="text" className="form-control" placeholder="Enter Last name" onChange={(e) => { setLastName(e.target.value) }} />
						</div>
						<div className="form-group">
							<label>username</label>
							<input type="text" className="form-control" placeholder="Enter Username" onChange={(e) => { setUserName(e.target.value) }} />
						</div>
						<div className="form-group">
							<label>Email address</label>
							<input type="email" className="form-control" placeholder="Enter email" onChange={(e) => { setEmail(e.target.value) }} />
							<small className="form-text text-muted">We'll never share your email with anyone else.</small>
						</div>
						<div className="form-group mt-4">
							<label>Password</label>
							<input type="password" className="form-control" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
						</div>
						<button type="submit" className="btn btn-primary mt-4 w-25 mb-5">Submit</button>
						<p onClick={handleSignIn}>Already have an account? <span className='fw-200 text-decoration-underline text-info pointer-class'>Sign In</span></p>
					</form>
				</div>
			</div>
		</div>
	)
}

export default SignUp