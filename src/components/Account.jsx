import React, { useEffect, useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const Account = ({ user, setUser, setView }) => {

    const navigate = useNavigate('')

    const [newEmail, setNewEmail] = useState(user.email);
    const [newName, setNewName] = useState(user.name);
    const [newPassword, setNewPassword] = useState(user.password);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setNewEmail(user.email);
        setNewName(user.name);
        setNewPassword(user.password);
    }, [user]);

    const handleUpdate = () => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const updatedUsers = storedUsers.map(u => {
            if (u.email === user.email) {
                return { ...u, email: newEmail, name: newName, password: newPassword };
            }
            return u;
        });
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setUser({ email: newEmail, name: newName, password: newPassword });
        alert('Account updated successfully!'); // Success alert
    };

    const handleLogout = () => {
        setUser(null);
        alert('Logout successful!'); // Success alert
        setView('login');
        navigate('/Login')
    };

    return (
        <div className="container d-flex">
            <h2>Account Information</h2>
            <input
                className='p-2'
                type="email"
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
            />
            <input
                className='mt-2 p-2'
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
            />
            <input
                className='mt-2 p-2'
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
            />
            <div className="form-group show-password">
                <input
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                />
                <label htmlFor="showPassword">Show Password</label>
            </div>
            <div className=''>
                <button className='mt-3 p-2 bg-primary border-none rounded-1 text-white' onClick={handleUpdate}>Update</button>
                <button className='mt-1 p-2 bg-primary border-none rounded-1 text-white' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Account;
