import React, { useState } from 'react';
import './DeleteFlower.css';

interface DeleteFlowerProps {
    onDelete: (popularName: string) => void;
}

const DeleteFlower: React.FC<DeleteFlowerProps> = ({ onDelete }) => {
    const [showForm, setShowForm] = useState(false);
    const [popularName, setPopularName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Validate form field
        if (!popularName) {
            alert('Please enter the popular name of the flower.');
            return;
        }
        // Call the onDelete function passed from the parent component
        onDelete(popularName);
        // Clear form field after submission
        setPopularName('');
        // Hide the form after submission
        setShowForm(false);
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