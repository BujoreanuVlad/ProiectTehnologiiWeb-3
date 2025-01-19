import React, { useState } from 'react'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import './app.css'
import './modal.css'
import Snowfall from './Snow.jsx';
import Cookies from 'universal-cookie';
import './snow.css'
export default function Login() {
    const [isModalOpen, setIsModalOpen] = useState(false);
	const cookies = new Cookies()

	cookies.set("hello", "world")

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
        <div className='main-container'>
            <Snowfall />
            <div className='app-header'>
                Events App
            </div>
            <div className='wrapper'>
                <form action="">
                    <h1>Login</h1>
                    <div className='input-box'>
                        <input type='text' placeholder='Username' required />
                        <FaUser className='icon' />
                    </div>
                    <div className='input-box'>
                        <input type='password' placeholder='Password' required />
                        <FaLock className='icon' />
                    </div>

                    <button type="submit">Login</button>

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
