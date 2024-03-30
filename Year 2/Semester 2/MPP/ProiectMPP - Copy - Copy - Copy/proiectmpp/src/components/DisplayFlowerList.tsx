import React from 'react';
import { flower } from '../domain/Flowers';
import './DisplayFlowerList.css';

interface FlowerListProps {
    flowers: flower[];
}

const DisplayFlowerList: React.FC<FlowerListProps> = ({ flowers }) => {
    return (
        <div className="flower-grid">
            {flowers.map(flower => (
                <div key={flower.id} className="flower-card">
                    <img
                        src={`../images/${flower.popular_name}.png`}
                        alt={flower.popular_name}
                        className="flower-image"
                    />
                    <div className="flower-info">
                        <h3 className="flower-name">{flower.popular_name}</h3>
                        <div className="additional-info">
                            <p><strong>Latin Name:</strong> {flower.latin_name}</p>
                            <p><strong>Symbolic Meaning:</strong> {flower.symbolic_meaning}</p>
                            <p><strong>Color:</strong> {flower.color}</p>
                            <p><strong>Season:</strong> {flower.season}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default DisplayFlowerList;
