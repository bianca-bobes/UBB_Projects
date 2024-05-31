import React, { useState } from 'react';
import axios from 'axios';
import './DeleteFlower.css';

interface DeleteFlowerProps {
    onDelete: () => void;
}

const DeleteFlower: React.FC<DeleteFlowerProps> = ({ onDelete }) => {
    const [showForm, setShowForm] = useState(false);
    const [popularName, setPopularName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!popularName) {
            alert('Please enter the popular name of the flower to delete.');
            return;
        }
        try {
            const token = localStorage.getItem('flori');
            const response = await axios.delete(`https://ubb-projects.onrender.com/flowers/${popularName}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            onDelete();
            setPopularName('');
            setShowForm(false);
            console.log('Flower deleted successfully:', response.data);
        } catch (error) {
            console.error('Error deleting flower:', error);
            alert('Error deleting flower. Please try again.');
        }
    };

    const toggleFormVisibility = () => {
        setShowForm(!showForm);
    };

    return (
        <>
            {showForm && (
                <div className="delete-flower-overlay" onClick={toggleFormVisibility}></div>
            )}
            <div className={`delete-flower-form ${showForm ? 'active' : ''}`}>
                <h2>Delete Flower</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Popular Name:</label>
                        <input type="text" value={popularName} onChange={(e) => setPopularName(e.target.value)} />
                    </div>
                    <button type="submit">Delete</button>
                </form>
            </div>
            <button onClick={toggleFormVisibility}>Delete Flower</button>
        </>
    );
};

export default DeleteFlower;
