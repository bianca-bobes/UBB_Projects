import React, { useState } from 'react';
import './FormStyles.css'; // Import common form styles

interface DELETEflowerProps {
    onDelete: (name: string) => void;
}

const DELETEflower: React.FC<DELETEflowerProps> = ({ onDelete }) => {
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name) {
            alert('Please enter the name of the flower to delete');
            return;
        }
        onDelete(name);
        setShowForm(false); // Hide the form after submission
        setName('');
    };

    return (
        <div className="form-container">
            <button className="delete-button" onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Close Form' : 'Delete Flower'}
            </button>
            {showForm && (
                <form onSubmit={handleSubmit} className="delete-form">
                    <div className="form-group">
                        <label className="form-label">Name:</label>
                        <input className="form-field" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
}

export default DELETEflower;
