import React, { useState } from 'react';
import './FormStyles.css'; // Import common form styles

interface UPDATEflowerProps {
    onUpdate: (popularName: string, latinName: string, symbolicMeaning: string, color: string, season: string) => void;
}

const UPDATEflower: React.FC<UPDATEflowerProps> = ({ onUpdate }) => {
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
        onUpdate(popularName, latinName, symbolicMeaning, color, season);
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
            <button className="update-button" onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Close Form' : 'Update Flower'}
            </button>
            {showForm && (
                <form onSubmit={handleSubmit} className="update-form">
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

export default UPDATEflower;
