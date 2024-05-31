import { useState, useEffect } from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar/NavigationBar';
import FlowerGrid from './components/FlowerGrid/FlowerGrid';
import AddFlower from './components/AddFlower/AddFlower';
import DeleteFlower from './components/DeleteFlower/DeleteFlower';
import UpdateFlower from './components/UpdateFlower/UpdateFlower';
import SeasonChart from './components/SeasonChart/SeasonChart';
import { Flower } from '../../../Flowers Backend/Flowers Backend/model/Flower';
import axios from 'axios';

const flowersPerPage = 3;

function MainApp() {
    const [allFlowers, setAllFlowers] = useState<Flower[]>([]);
    const [flowers, setFlowers] = useState<Flower[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [showAddForm, setShowAddForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

    useEffect(() => {
        const fetchFlowers = async () => {
            const token = localStorage.getItem('flori');
            if (!token) {
                console.error('No token found');
                return;
            }

            try {
                const response = await axios.get('https://ubb-projects.onrender.com/flowers/visible', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setAllFlowers(response.data);
                updateFlowers(currentPage, response.data);
            } catch (error) {
                console.error('Error fetching flowers:', error);
            }
        };
        fetchFlowers();
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

    const handleAddFlower = async () => {
        const token = localStorage.getItem('flori');
        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            const updatedFlowers = await axios.get('https://ubb-projects.onrender.com/flowers/visible', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAllFlowers(updatedFlowers.data);
            setShowAddForm(false);
            updateFlowers(currentPage, updatedFlowers.data);
        } catch (error) {
            console.error('Error adding flower:', error);
            alert('An error occurred while adding the flower. Please try again later.');
        }
    };

    const handleDeleteFlower = async () => {
        const token = localStorage.getItem('flori');
        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            const updatedFlowers = await axios.get('https://ubb-projects.onrender.com/flowers/visible', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAllFlowers(updatedFlowers.data);
            setShowDeleteForm(false);
            updateFlowers(currentPage, updatedFlowers.data);
        } catch (error) {
            console.error('Error deleting flower:', error);
            alert('An error occurred while deleting the flower. Please try again later.');
        }
    };

    const handleUpdateFlower = async () => {
        const token = localStorage.getItem('flori');
        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            const updatedFlowers = await axios.get('https://ubb-projects.onrender.com/flowers/visible', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAllFlowers(updatedFlowers.data);
            setShowUpdateForm(false);
            updateFlowers(currentPage, updatedFlowers.data);
        } catch (error) {
            console.error('Error updating flower:', error);
            alert('An error occurred while updating the flower. Please try again later.');
        }
    };

    const handleSort = () => {
        const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        setSortDirection(newSortDirection);

        const sortedFlowers = [...allFlowers].sort((a, b) => {
            if (newSortDirection === 'asc') {
                return a.popular_name.localeCompare(b.popular_name);
            } else {
                return b.popular_name.localeCompare(a.popular_name);
            }
        });
        setAllFlowers(sortedFlowers);
        updateFlowers(1, sortedFlowers);
    };

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <div className="app-container">
            {isOnline ? (
                <>
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
                </>
            ) : (
                <p>You are currently offline. Please check your internet connection.</p>
            )}
        </div>
    );
}

export default MainApp;
