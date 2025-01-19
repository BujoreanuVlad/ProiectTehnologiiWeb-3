import React, { useState } from 'react';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import './app.css';
import './modal.css';
import Snowfall from './Snow.jsx';
import Cookies from 'universal-cookie';
import './snow.css';
import { loginUser } from '../api.jsx';

export default function Login() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const cookies = new Cookies();

    cookies.set("hello", "world");

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await loginUser(username, password);
            if (result.ok) {
                console.log("Autentificare reușită:", result);
                cookies.set("authToken", result.token, { path: '/' }); 
                setErrorMessage(''); 
            } else {
                setErrorMessage("Autentificare eșuată. Verifică username-ul și parola.");
            }
        } catch (error) {
            setErrorMessage("Eroare la autentificare. Te rugăm să încerci din nou.");
            console.error("Eroare:", error);
        }
    };

    return (
        <div className='main-container'>
            <Snowfall />
            <div className='app-header'>
                Events App
            </div>
            <div className='wrapper'>
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <div className='input-box'>
                        <input 
                            type='text' 
                            placeholder='Username' 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                        <FaUser className='icon' />
                    </div>
                    <div className='input-box'>
                        <input 
                            type='password' 
                            placeholder='Password' 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                        <FaLock className='icon' />
                    </div>

                    <button type="submit">Login</button>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <div className='register-link'>
                        <p>Don't have an account? 
                            <a href="#" className="link-btn" onClick={openModal}>
                                Register
                            </a>
                        </p>
                    </div>
                </form>
            </div>
            {isModalOpen && (
                <div className='modal-overlay'>
                    <div className='modal'>
                        <button className='close-btn' onClick={closeModal}>
                            &times;
                        </button>
                        <h2>Register</h2>
                        <form className='modal-form'>
                            <div className='input-box'>
                                <input type='text' placeholder='Username' required />
                                <FaUser className='icon' />
                            </div>
                            <div className='input-box'>
                                <input type='email' placeholder='Email' required />
                                <FaUser className='icon' />
                            </div>
                            <div className='input-box'>
                                <input type='password' placeholder='Password' required />
                                <FaLock className='icon' />
                            </div>
                            <button type="submit">Register</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}