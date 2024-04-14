import React, { useState, useEffect } from 'react';
import './FlowerCard.css';
import axios, { AxiosError } from 'axios'; // Import Axios and AxiosError
import { Flower } from '../../../../../Flowers Backend/Flowers Backend/model/Flower';
import emptyImage from '../../../../../Flowers Backend/Flowers Backend/images/empty.png'; // Fix typo in the import path

interface FlowerCardProps {
    flower: Flower;
}

const FlowerCard: React.FC<FlowerCardProps> = ({ flower }) => {
    const [imageUrl, setImageUrl] = useState<string>('');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                if (flower && flower._popular_name) {
                    console.log('Fetching image for flower:', flower._popular_name);
                    const response = await axios.get(`http://localhost:1337/flowers/images/${flower._popular_name}`, {
                        responseType: 'blob'
                    });
                    const imageUrl = URL.createObjectURL(response.data);
                    setImageUrl(imageUrl);
                }
            } catch (error) {
                console.error('Error fetching flower image:', error);
                if (axios.isAxiosError(error) && error.response?.status === 404) {
                    setImageUrl('http://localhost:1337/flowers/images/empty');
                } else {
                    // Handle other errors
                }
            }
        };

        fetchImage();
    }, [flower?._popular_name]);

    return (
        <div className="flower-card">
            <img
                src={imageUrl || emptyImage}
                alt={flower._popular_name}
                className="flower-image"
            />
            <div className="flower-info">
                <h2>{flower._popular_name}</h2>
                <p><strong>Latin Name:</strong> {flower._latin_name}</p>
                <p><strong>Symbolic Meaning:</strong> {flower._symbolic_meaning}</p>
                <p><strong>Color:</strong> {flower._color}</p>
                <p><strong>Season:</strong> {flower._season}</p>
            </div>
        </div>
    );
};

export default FlowerCard;
