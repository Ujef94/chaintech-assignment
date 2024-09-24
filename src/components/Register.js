import React, { useState } from "react";
// import "../App.css";
import { useNavigate } from "react-router-dom";

const Register = ({ setView }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    setError(""); // it Clear previous errors

    // Check if username or password is empty
    if (email.trim() === "" || password.trim() === "" || name.trim() === "") {
      setError("Please fill out all required field");
      return; // Prevent registration if fields are empty
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
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="p-2 my-3"
        type="name"
        placeholder="Enter Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="p-2 my-3"
        type="password"
        placeholder="Enter Your Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
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
