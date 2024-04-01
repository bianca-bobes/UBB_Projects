// FlowerCard.tsx
import React from 'react';
import './FlowerCard.css';
import { Flower } from '../../../Backend/Flowers Backend/model/Flower'; // Assuming Flower.ts is located in the model folder

interface FlowerCardProps {
    flower: Flower;
}

const FlowerCard: React.FC<FlowerCardProps> = ({ flower }) => {
    return (
        <div className="flower-card">
            <img
                src={`http://localhost:1337/images/${flower.popular_name}`}
                alt={flower.popular_name}
                className="flower-image"
            />
            <div className="flower-info">
                <h2>{flower.popular_name}</h2>
                <p><strong>Latin Name:</strong> {flower.latin_name}</p>
                <p><strong>Symbolic Meaning:</strong> {flower.symbolic_meaning}</p>
                <p><strong>Color:</strong> {flower.color}</p>
                <p><strong>Season:</strong> {flower.season}</p>
            </div>
        </div>
    );
};

export default FlowerCard;
