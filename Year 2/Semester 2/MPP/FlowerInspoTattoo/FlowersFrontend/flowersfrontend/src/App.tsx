import { useState } from 'react';
import './App.css';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import MainApp from './MainApp';
import axios from 'axios';

function App() {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [showLoginForm, setShowLoginForm] = useState<boolean>(true);
    const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);

    const handleLogin = async (username: string, password: string) => {
        try {
            const response = await axios.post('https://ubb-projects.onrender.com/flowers/login', { username, password });
            const token = response.data.token;
            localStorage.setItem('flori', token);
            setLoggedIn(true);
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Login failed. Please check your credentials.');
        }
    };

    const handleRegister = async (username: string, password: string) => {
        try {
            await axios.post('https://ubb-projects.onrender.com/flowers/register', { username, password });
            setShowRegisterForm(false);
            setShowLoginForm(true);
        } catch (error) {
            console.error('Error registering:', error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className="app-container">
            {loggedIn ? (
                <MainApp />
            ) : (
                <>
                    {showLoginForm && !showRegisterForm && (
                        <>
                            <Login onLogin={handleLogin} />
                            <button onClick={() => { setShowLoginForm(false); setShowRegisterForm(true); }}>
                                Register
                            </button>
                        </>
                    )}
                    {!showLoginForm && showRegisterForm && (
                        <>
                            <Register onRegister={handleRegister} />
                            <button onClick={() => { setShowLoginForm(true); setShowRegisterForm(false); }}>
                                Back to Login
                            </button>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default App;
