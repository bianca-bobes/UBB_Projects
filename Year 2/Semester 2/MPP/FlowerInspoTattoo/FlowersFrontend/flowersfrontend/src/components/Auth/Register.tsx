import './Auth.css';
import React, { useState } from 'react';

interface RegisterProps {
    onRegister: (username: string, password: string) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !password) {
            alert('Please enter username and password.');
            return;
        }
        onRegister(username, password);
        // Clear input fields after registration
        setUsername('');
        setPassword('');
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
