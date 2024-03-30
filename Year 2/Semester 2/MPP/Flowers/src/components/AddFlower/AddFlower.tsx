import React, { useState } from 'react';
import './AddFlower.css';

interface AddFlowerProps {
    onAdd: (flowerData: any) => void;
}

const AddFlower: React.FC<AddFlowerProps> = ({ onAdd }) => {
    const [showForm, setShowForm] = useState(false);
    const [popularName, setPopularName] = useState('');
    const [latinName, setLatinName] = useState('');
    const [symbolicMeaning, setSymbolicMeaning] = useState('');
    const [color, setColor] = useState('');
    const [season, setSeason] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Validate form fields
        if (!popularName || !latinName || !symbolicMeaning || !color || !season) {
            alert('Please fill out all fields.');
            return;
        }
        if (!['Spring', 'Summer', 'Autumn', 'Winter'].includes(season)) {
            alert('Season must be one of: Spring, Summer, Autumn, Winter');
            return;
        }
        // Construct flower data
        const flowerData = {
            popular_name: popularName,
            latin_name: latinName,
            symbolic_meaning: symbolicMeaning,
            color: color,
            season: season
        };
        // Call the onAdd function passed from the parent component
        onAdd(flowerData);
        // Clear form fields after submission
        setPopularName('');
        setLatinName('');
        setSymbolicMeaning('');
        setColor('');
        setSeason('');
        // Hide the form after submission
        setShowForm(false);
    };

    return (
        <>
            <div className={`add-flower-overlay ${showForm ? 'show' : ''}`} onClick={() => setShowForm(false)}></div>
            <div className={`add-flower-form ${showForm ? 'show' : ''}`}>
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
            <button onClick={() => setShowForm(!showForm)}>Add Flower</button>
        </>
    );
};

export default AddFlower;
