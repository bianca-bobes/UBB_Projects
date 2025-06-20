// FlowerGrid.tsx
import React from 'react';
import FlowerCard from '../FlowerCard/FlowerCard';
import './FlowerGrid.css';
import { Flower } from '../../../../../Flowers Backend/Flowers Backend/model/Flower';
interface FlowerGridProps {
    flowers: Flower[];
}

const FlowerGrid: React.FC<FlowerGridProps> = ({ flowers }) => {
    return (
        <div className="flower-grid">
            {flowers.map((flower, index) => (
                <FlowerCard key={index} flower={flower} />
            ))}
        </div>
    );
};

export default FlowerGrid;
