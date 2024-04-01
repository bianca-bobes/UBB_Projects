import React, { useState, useEffect } from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar/NavigationBar';
import FlowerGrid from './components/FlowerGrid/FlowerGrid';
import AddFlower from './components/AddFlower/AddFlower';
import DeleteFlower from './components/DeleteFlower/DeleteFlower';
import UpdateFlower from './components/UpdateFlower/UpdateFlower';
import SeasonChart from './components/SeasonChart/SeasonChart';
import { Flower } from '../Backend/Flowers Backend/model/Flower';
import axios from 'axios';

const flowersPerPage = 3;

function App() {
    const [allFlowers, setAllFlowers] = useState<Flower[]>([]);
    const [flowers, setFlowers] = useState<Flower[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [showAddForm, setShowAddForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:1337/flowers/visible')
            .then(response => {
                setAllFlowers(response.data);
                updateFlowers(currentPage, response.data);
                console.log('i ve got the flowrs');
            })
            .catch(error => {
                console.error('Error fetching flowers:', error);
                // Handle error (e.g., show error message)
            });
    }, [currentPage]);

    const updateFlowers = (page: number, allFlowers: Flower[]) => {
        const startIndex = (page - 1) * flowersPerPage;
        const endIndex = startIndex + flowersPerPage;
        setFlowers(allFlowers.slice(startIndex, endIndex));
    };


    const handleNextPage = () => {
        if (currentPage < Math.ceil(allFlowers.length / flowersPerPage)) {
            setCurrentPage(currentPage + 1);
        } else {
            alert('You are already on the last page.');
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else {
            alert('You are already on the first page.');
        }
    };


    const handleAddFlower = async (popularName: string, latinName: string, symbolicMeaning: string, color: string, season: string) => {
        try {
            // Check if the flower already exists
            const response = await axios.get(`http://localhost:1337/flowers/${popularName}`);
            if (response.data) {
                alert('There is a flower with that name');
                return;
            }

            // If the flower does not exist, add it
            await axios.post('http://localhost:1337/flowers', {
                popular_name: popularName,
                latin_name: latinName,
                symbolic_meaning: symbolicMeaning,
                color: color,
                season: season
            });

            // Update the flowers list
            const updatedFlowers = await axios.get('http://localhost:1337/flowers/visible');
            setAllFlowers(updatedFlowers.data);
            setShowAddForm(false);
        } catch (error) {
            console.error('Error adding flower:', error);
            alert('An error occurred while adding the flower. Please try again later.');
        }
    };

    const handleDeleteFlower = async (name: string) => {
        try {
            // Delete the flower
            await axios.delete(`http://localhost:1337/flowers/${name}`);

            // Update the flowers list
            const updatedFlowers = await axios.get('http://localhost:1337/flowers/visible');
            setAllFlowers(updatedFlowers.data);
            setShowDeleteForm(false);
        } catch (error) {
            console.error('Error deleting flower:', error);
            alert('An error occurred while deleting the flower. Please try again later.');
        }
    };

    const handleUpdateFlower = async (popularName: string, latinName: string, symbolicMeaning: string, color: string, season: string) => {
        try {
            // Check if the flower exists
            const response = await axios.get(`http://localhost:1337/flowers/${popularName}`);
            if (!response.data) {
                alert('No flower with that name');
                return;
            }

            // If the flower exists, update it
            await axios.put(`http://localhost:1337/flowers/${popularName}`, {
                popular_name: popularName,
                latin_name: latinName,
                symbolic_meaning: symbolicMeaning,
                color: color,
                season: season
            });

            // Update the flowers list
            const updatedFlowers = await axios.get('http://localhost:1337/flowers/visible');
            setAllFlowers(updatedFlowers.data);
            setShowUpdateForm(false);
        } catch (error) {
            console.error('Error updating flower:', error);
            alert('An error occurred while updating the flower. Please try again later.');
        }
    };


    const handleSort = () => {
        // Toggle the sort direction between 'asc' and 'desc'
        const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        setSortDirection(newSortDirection);

        // Sort the flowers based on the popular name and direction
        const sortedFlowers = allFlowers.sort((a, b) => {
            if (newSortDirection === 'asc') {
                return a.popular_name.localeCompare(b.popular_name);
            } else {
                return b.popular_name.localeCompare(a.popular_name);
            }
        });
        setAllFlowers(sortedFlowers);

        // Reset to the first page after sorting
        setCurrentPage(1);
    };

    return (
        <div className="app-container">
            <div className="navigation-container">
                <NavigationBar
                    onAdd={() => setShowAddForm(!showAddForm)}
                    onDelete={() => setShowDeleteForm(!showDeleteForm)}
                    onUpdate={() => setShowUpdateForm(!showUpdateForm)}
                    onSort={handleSort}
                    onNextPage={handleNextPage}
                    onPrevPage={handlePreviousPage}
                />
            </div>
            <div className="flower-grid-container">
                <FlowerGrid flowers={flowers} />
            </div>
            <div className="season-chart-container">
                <SeasonChart flowers={allFlowers} />
            </div>
            {showAddForm && <AddFlower onAdd={handleAddFlower} />}
            {showDeleteForm && <DeleteFlower onDelete={handleDeleteFlower} />}
            {showUpdateForm && <UpdateFlower onUpdate={handleUpdateFlower} />}
        </div>
    );
}
export default App;
