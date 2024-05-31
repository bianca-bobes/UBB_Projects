import React, { useState } from 'react';
import axios from 'axios';
import './AddFlower.css';

interface AddFlowerProps {
    onAdd: () => void;
}

const AddFlower: React.FC<AddFlowerProps> = ({ onAdd }) => {
    const [showForm, setShowForm] = useState(false);
    const [popularName, setPopularName] = useState('');
    const [latinName, setLatinName] = useState('');
    const [symbolicMeaning, setSymbolicMeaning] = useState('');
    const [color, setColor] = useState('');
    const [season, setSeason] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!popularName || !latinName || !symbolicMeaning || !color || !season) {
            alert('Please fill out all fields.');
            return;
        }
        if (!['Spring', 'Summer', 'Autumn', 'Winter'].includes(season)) {
            alert('Season must be one of: Spring, Summer, Autumn, Winter');
            return;
        }
        try {
            const token = localStorage.getItem('flori');
            const response = await axios.post('https://ubb-projects.onrender.com/flowers', {
                popular_name: popularName,
                latin_name: latinName,
                symbolic_meaning: symbolicMeaning,
                color: color,
                season: season,
                is_visible: true
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            onAdd();
            setPopularName('');
            setLatinName('');
            setSymbolicMeaning('');
            setColor('');
            setSeason('');
            setShowForm(false);
            console.log('Flower added successfully:', response.data);
        } catch (error) {
            console.error('Error adding flower:', error);
            alert('Error adding flower. Please try again.');
        }
    };

    const toggleFormVisibility = () => {
        setShowForm(!showForm);
    };

    return (
        <>
            {showForm && (
                <div className="add-flower-overlay" onClick={toggleFormVisibility}></div>
            )}
            <div className={`add-flower-form ${showForm ? 'active' : ''}`}>
                <h2>Add Flower</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Popular Name:</label>
                        <input type="text" value={popularName} onChange={(e) => setPopularName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Latin Name:</label>
                        <input type="text" value={latinName} onChange={(e) => setLatinName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Symbolic Meaning:</label>
                        <input type="text" value={symbolicMeaning} onChange={(e) => setSymbolicMeaning(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Color:</label>
                        <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Season:</label>
                        <input type="text" value={season} onChange={(e) => setSeason(e.target.value)} />
                    </div>
                    <button type="submit">Add</button>
                </form>
            </div>
            <button onClick={toggleFormVisibility}>Add Flower</button>
        </>
    );
};

export default AddFlower;
