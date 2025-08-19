import React, { useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";

const SignUp = ({ onSignUpSuccess, onAuthError }) => {
    const navigate = useNavigate();
    const [ error,setError ] = useState('');
    const [ userDetails,setuserDetails ] = useState({
        name: '',
        email:'',
        password:'',
        confirm_password: ''
    })

    const handleOnchange = (e) => {
        setuserDetails({
            ...userDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(userDetails.confirm_password === '' || userDetails.password === '' || userDetails.email === '' || userDetails.name === ''){
            setError('please fill in all the required field')
            return
        }
        if(userDetails.password !== userDetails.confirm_password){
            setError('Passwords do not match');
            return;
        }

        // Check if user already exists in local storage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.email === userDetails.email);

        if (userExists) {
            setError('User with this email already exists.');
            onAuthError('User with this email already exists.');
            return;
        }

        // Store new user in local storage
        const newUser = {
            name: userDetails.name,
            email: userDetails.email,
            password: userDetails.password // In a real app, hash this password!
        };
        localStorage.setItem('users', JSON.stringify([...users, newUser]));

        console.log('User signed up:', newUser);
        setuserDetails({
            name: '',
            email:'',
            password:'',
            confirm_password: ''
        });
        setError('');
        onSignUpSuccess(newUser); // Call success callback
        navigate('/sign-in'); // Redirect to sign-in page after successful sign-up
    }

  return (
    <main className="main-sign_up_container">
    
    <form onSubmit={handleSubmit} className="sign-up-container">
        <h3>Sign up</h3>
        {error && <p className="error-paragraph" style={{color: 'red', textAlign: 'center'}}>{error}</p>}
        <div className="inputs">

        </div>
            <div className="input-div">
            <label htmlFor="name">
                Name
            </label>
            <input name="name" id="name" type="text"  
            onChange={handleOnchange}
            value={userDetails.name}
            />
            </div>
            <div className="input-div">
            <label htmlFor="email">
                Email
            </label>
            <input name="email" id="email" type="email"  
            onChange={handleOnchange}
            value={userDetails.email}
            />
            </div>
            <div className="input-div">
            <label htmlFor="password">
                password
            </label>
            <input name="password" id="password" type="text"  
            onChange={handleOnchange}
            value={userDetails.password}
            />
            </div>
            <div className="input-div">
            <label htmlFor="confirm_password">
                Confirm Password
            </label>
            <input name="confirm_password" id="confirm_password" type="password"  
            onChange={handleOnchange}
            value={userDetails.confirm_password}
            />
            </div>
            <button className="sign-up-button">
                Sign up
            </button>
            <p className="sign-up-redirect-p">Already have an account? <Link to="/sign-in">Sign in</Link></p>
    </form>
    </main>

  );
};

export default SignUp;
