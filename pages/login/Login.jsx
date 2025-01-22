import React, { useState } from 'react';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import './app.css';
import './modal.css';
import Snowfall from './Snow.jsx';
import Cookies from 'universal-cookie';
import './snow.css';
import CryptoJS from 'crypto-js';
import { loginUser, registerUser } from '../api.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerPhone, setRegisterPhone] = useState('');
    const [registerBirthDate, setRegisterBirthDate] = useState('');
    const [registerName, setRegisterName] = useState('');
    const [registerPrenume, setRegisterPrenume] = useState('');

    const [errors, setErrors] = useState({}); 

    const cookies = new Cookies();

    const validateForm = () => {
        const errObj = {};

        if (!registerPrenume.trim() || registerPrenume.length < 3) {
            errObj.prenume = "Numele de utilizator trebuie să aibă cel puțin 3 caractere.";
        }

        if (!registerName.trim() || registerName.length < 3) {
            errObj.name = "Numele de utilizator trebuie să aibă cel puțin 3 caractere.";
        }

        if (!registerUsername.trim() || registerUsername.length < 3) {
            errObj.username = "Numele de utilizator trebuie să aibă cel puțin 3 caractere.";
        }

        if (!registerEmail.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(registerEmail)) {
            errObj.email = "Email-ul nu este valid.";
        }

        if (!registerPassword.trim() || registerPassword.length < 6) {
            errObj.password = "Parola trebuie să aibă cel puțin 6 caractere.";
        }

        if (!registerPhone.trim() || !/^\d{10}$/.test(registerPhone)) {
            errObj.phone = "Numărul de telefon trebuie să aibă 10 cifre.";
        }

        if (!registerBirthDate) {
            errObj.birthDate = "Data nașterii este obligatorie.";
        }

        setErrors(errObj);
        return Object.keys(errObj).length; 
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            const userData = {
                nume:registerName,
                prenume: registerPrenume,
                username: registerUsername,
                email: registerEmail,
                password: registerPassword,
                nrTelefon: registerPhone,
                dataNastere: registerBirthDate,
            };

            try {
                const response = await registerUser(userData); 
                console.log("Înregistrare reușită:", response);
                toast.success('Înregistrare reușită!', {
                    position: "top-right",
                    autoClose: 5000,
                    theme: "light",
                });
                
                closeModal(); 
            } catch (error) {
                console.error("Eroare la înregistrare:", error);
                toast.error("A apărut o eroare. Te rugăm să încerci din nou."); 
            }
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await loginUser(username, password);
            if (result.ok) {
                cookies.set("authToken", result.token, { path: '/' }); 
                setErrorMessage('');

                let token = CryptoJS.AES.decrypt(result.token, "cheie magica").toString(CryptoJS.enc.Utf8);
                if (token.length < ";SECURITY_T0KEN".length || token.substring(token.length - ";SECURITY_T0KEN".length) !== ";SECURITY_T0KEN") {
                    setErrorMessage("Autentificare eșuată. Verifică username-ul și parola.");
                    toast.error("Autentificare eșuată. Verifică username-ul și parola."); 
                } else {
                    console.log("Log in successful");
                    let user = token.substring(0, token.length - ";SECURITY_T0KEN".length);
                    if (user === "admin") {
                        console.log("Rutare admin");
                        toast.success("Autentificare reușită! Bun venit, Admin."); 
                        navigate("/admin");
                    } else {
                        console.log("Rutare user");
                        toast.success("Autentificare reușită! Bun venit!"); 
                        navigate("/user", {state: {"username": user}});
                    }
                }
            } else {
                setErrorMessage("Autentificare eșuată. Verifică username-ul și parola.");
                toast.error("Autentificare eșuată. Verifică username-ul și parola."); // Notificare eroare
            }
        } catch (error) {
            setErrorMessage("Eroare la autentificare. Te rugăm să încerci din nou.");
            toast.error("Eroare la autentificare. Te rugăm să încerci din nou."); // Notificare eroare
            console.error("Eroare:", error);
        }
    };

    return (
        <div className='main-container'>
            <Snowfall />
            <ToastContainer />
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
                <div className='unique-modal-overlay'>
                    <div className='unique-modal'>
                        <button className='unique-close-btn' onClick={closeModal}>
                            &times;
                        </button>
                        <h2>Register</h2>
                        <form className='unique-modal-form' onSubmit={handleRegister}>
                            <div className='unique-input-box'>
                                <input
                                    type='nume'
                                    placeholder='Nume'
                                    value={registerName}
                                    onChange={(e) => setRegisterName(e.target.value)}
                                    required
                                />
                                <FaUser className='icon' />
                                {errors.name && <small className="error">{errors.name}</small>}
                            </div>
                            <div className='unique-input-box'>
                                <input
                                    type='prenume'
                                    placeholder='Prenume'
                                    value={registerPrenume}
                                    onChange={(e) => setRegisterPrenume(e.target.value)}
                                    required
                                />
                                <FaUser className='icon' />
                                {errors.prenume && <small className="error">{errors.prenume}</small>}
                            </div>
                            <div className='unique-input-box'>
                                <input
                                    type='text'
                                    placeholder='Username'
                                    value={registerUsername}
                                    onChange={(e) => setRegisterUsername(e.target.value)}
                                    required
                                />
                                <FaUser className='icon' />
                                {errors.username && <small className="error">{errors.username}</small>}
                            </div>
                            <div className='unique-input-box'>
                                <input
                                    type='email'
                                    placeholder='Email'
                                    value={registerEmail}
                                    onChange={(e) => setRegisterEmail(e.target.value)}
                                    required
                                />
                                <FaUser className='icon' />
                                {errors.email && <small className="error">{errors.email}</small>}
                            </div>
                            <div className='unique-input-box'>
                                <input
                                    type='password'
                                    placeholder='Password'
                                    value={registerPassword}
                                    onChange={(e) => setRegisterPassword(e.target.value)}
                                    required
                                />
                                <FaLock className='icon' />
                                {errors.password && <small className="error">{errors.password}</small>}
                            </div>
                            <div className='unique-input-box'>
                                <input
                                    type='tel'
                                    placeholder='Phone Number'
                                    value={registerPhone}
                                    onChange={(e) => setRegisterPhone(e.target.value)}
                                    required
                                />
                                {errors.phone && <small className="error">{errors.phone}</small>}
                            </div>
                            <div className='unique-input-box'>
                                <input
                                    type='date'
                                    placeholder='Date of Birth'
                                    value={registerBirthDate}
                                    onChange={(e) => setRegisterBirthDate(e.target.value)}
                                    required
                                />
                                {errors.birthDate && <small className="error">{errors.birthDate}</small>}
                            </div>
                            <button type="submit">Register</button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}
