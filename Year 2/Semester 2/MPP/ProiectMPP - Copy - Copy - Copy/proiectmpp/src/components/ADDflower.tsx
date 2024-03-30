import React, { useState } from 'react';
import { flower } from '../domain/Flowers';
import './FormStyles.css'; // Import common form styles

interface ADDflowerProps {
    onAdd: (flower: flower) => void;
}

const ADDflower: React.FC<ADDflowerProps> = ({ onAdd }) => {
    const [showForm, setShowForm] = useState(false);
    const [popularName, setPopularName] = useState('');
    const [latinName, setLatinName] = useState('');
    const [symbolicMeaning, setSymbolicMeaning] = useState('');
    const [color, setColor] = useState('');
    const [season, setSeason] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!popularName || !latinName || !symbolicMeaning || !color || !season) {
            alert('Please fill in all fields');
            return;
        }
        const newFlower = new flower(0, popularName, latinName, symbolicMeaning, color, season, true);
        onAdd(newFlower);
        setShowForm(false);
        // Clear form fields
        setPopularName('');
        setLatinName('');
        setSymbolicMeaning('');
        setColor('');
        setSeason('');
    };

    return (
        <div className="form-container">
            <button className="add-button" onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Close Form' : 'Add Flower'}
            </button>
            {showForm && (
                <form onSubmit={handleSubmit} className="add-form">
                    <div className="form-group">
                        <label className="form-label">Popular Name:</label>
                        <input className="form-field" type="text" value={popularName} onChange={(e) => setPopularName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Latin Name:</label>
                        <input className="form-field" type="text" value={latinName} onChange={(e) => setLatinName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Symbolic Meaning:</label>
                        <input className="form-field" type="text" value={symbolicMeaning} onChange={(e) => setSymbolicMeaning(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Color:</label>
                        <input className="form-field" type="text" value={color} onChange={(e) => setColor(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Season:</label>
                        <input className="form-field" type="text" value={season} onChange={(e) => setSeason(e.target.value)} />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
}

export default ADDflower;
