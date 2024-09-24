import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser, setView }) => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');


    // Function to validate email format
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e) => {
        const lowercaseEmail = e.target.value.toLowerCase(); // Convert email to lowercase
        setEmail(lowercaseEmail);

        // Validate email format
        if (!validateEmail(lowercaseEmail)) {
            setEmailError('Invalid email format');
        } else {
            setEmailError('');
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();

        // Validate if fields are empty
        if (!email || !password) {
            setError('Please enter both email and password');
            return; // Prevent further execution if fields are empty
        }

        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const user = storedUsers.find(u => u.email === email && u.password === password);
        if (user) {
            setUser(user);
            alert('Login successful!'); // Success alert
            setView('account');
            navigate('/account')
        } else {
            setError('User not found or Invalid credentials');
        }
    };

    return (
        <div className="container d-flex">
            <h2>Login</h2>
            {error && <p className="error text-danger mb-2">{error}</p>}
            <input
                className="p-2 my-3"
                type="email"
                placeholder="Enter Your Email"
                value={email}
                required
                onChange={handleEmailChange}
            />
            {emailError && <p className="error text-danger mb-2">{emailError}</p>} {/* Display email error */}
            <input
                className='p-2 my-3'
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            <button className='btn btn-primary' onClick={handleLogin}>Login</button>
            {/* <button className='btn btn-primary' onClick={() => navigate('/Register')}>Don't have an account</button> */}
            <p className='p-2 mt-3 mb-1 mx-5'><a class="link-opacity-100-hover" href="/Register">Don't have an account? Sign Up</a></p>
        </div>
    );
};

export default Login;