import React, {useState} from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('login');
  return (
    <Router>
      <div className="app rounded-4">
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} setView={setView} />} />
          <Route path="/register" element={<Register setView={setView} />} />
          <Route path="/account" element={user ? <Account user={user} setUser={setUser} setView={setView}/> : <Login setUser={setUser} setView={setView} />} />
          <Route path="/" element={<Login setUser={view} setView={setView}/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
