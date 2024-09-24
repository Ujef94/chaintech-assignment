import React, { useState } from "react";
// import "../App.css";
import { useNavigate } from "react-router-dom";

const Register = ({ setView }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Function to validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Handle email input change
  const handleEmailChange = (e) => {
    const lowercaseEmail = e.target.value.toLowerCase(); // Convert email to lowercase
    setEmail(lowercaseEmail);

    // Validate email format
    if (!validateEmail(lowercaseEmail)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError(''); // Clear error if valid email entered
    }
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);

    // Password Validation
    if (inputPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters');
    } else {
      setPasswordError(''); // Clear error if valid password entered
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setError(""); // it Clear previous errors

    // Check if username or password is empty
    if (email.trim() === "" || password.trim() === "" || name.trim() === "") {
      setError("Please fill out all required field");
      return; // Prevent registration if fields are empty
    }
    if (password.length < 8) {
      alert('Please enter a valid password');
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the user already exists
    if (storedUsers.find((u) => u.email === email)) {
      alert("User already exists! Please use a different email.");
      return;
    }

    // Store new user in localstorage
    storedUsers.push({ email, name, password });
    localStorage.setItem("users", JSON.stringify(storedUsers));

    // Clear fields
    setEmail("");
    setName("");
    setPassword("");
    setError(""); // Ensure error is cleared on success

    // Show success alert and redirect to login
    alert("Registration successful! You can now log in.");
    setView("Login");
    navigate("/Login"); // Redirect to login page
  };

  return (
    <div className="container d-flex">
      <h2>Register</h2>
      {error && <p className="error text-danger mb-2">{error}</p>}{" "}
      {/* Only show error if fields are empty */}
      <input
        className="p-2 my-3"
        type="email"
        placeholder="Enter Your Email"
        value={email}
        onChange={handleEmailChange}
        required
      />
      {emailError && <p className="error text-danger">{emailError}</p>}
      <input
        className="p-2 my-3"
        type="name"
        placeholder="Enter Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="p-2 my-3"
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter Your Password"
        value={password}
        onChange={handlePasswordChange}
        required
      />
      {passwordError && <p className="error text-danger">{passwordError}</p>} {/* Display password error for minimum 8 char required */}

      <div className="form-group show-password">
        <input
          type="checkbox"
          id="showPassword"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        />
        <label htmlFor="showPassword">Show Password</label>
      </div>

      <button
        className="btn btn-primary"
        type="submit"
        onClick={handleRegister}
      >
        Register
      </button>
      {/* <button
        className="btn btn-primary"
        onClick={() => navigate("/Login")}
      >
        Login
      </button> */}
      <p className="p-2 mt-3 mb-1 mx-5">
        <a class="link-opacity-100-hover" href="/Login">
          Already have account? Log In
        </a>
      </p>
    </div>
  );
};

export default Register;
