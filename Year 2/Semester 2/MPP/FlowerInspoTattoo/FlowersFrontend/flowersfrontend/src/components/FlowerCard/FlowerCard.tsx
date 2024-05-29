import React, { useState, useEffect } from 'react';
import './FlowerCard.css';
import axios from 'axios'; // Import Axios and AxiosError
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
                if (flower && flower.popular_name) {
                    console.log('Fetching image for flower:', flower.popular_name);

                    // Get the token from localStorage
                    const token = localStorage.getItem('token');

                    const response = await axios.get(`https://ubb-projects.onrender.com/flowers/images/${flower.popular_name}`, {
                        responseType: 'blob',
                        headers: {
                            Authorization: `Bearer ${token}`, // Add the token to the request headers
                        },
                    });
                    const imageUrl = URL.createObjectURL(response.data);
                    setImageUrl(imageUrl);
                }
            } catch (error) {
                console.error('Error fetching flower image:', error);
                if (axios.isAxiosError(error) && error.response?.status === 404) {
                    setImageUrl('https://ubb-projects.onrender.com/flowers/images/empty');
                } else {
                    // Handle other errors
                }
            }
        };

        fetchImage();
    }, [flower?.popular_name]);

    return (
        <div className="flower-card">
            <img
                src={imageUrl || emptyImage}
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
