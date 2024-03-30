import React, { useState, useEffect } from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar/NavigationBar';
import FlowerGrid from './components/FlowerGrid/FlowerGrid';
import SeasonChart from './components/SeasonChart/SeasonChart';
import AddFlower from './components/AddFlower/AddFlower';
import DeleteFlower from './components/DeleteFlower/DeleteFlower';
import UpdateFlower from './components/UpdateFlower/UpdateFlower';
import { Flower } from './domain/Flower';
import { Repo } from './repository/Repository';

const repository = new Repo();
const flowersPerPage = 3;

function App() {
    const [allFlowers, setAllFlowers] = useState(repository.getAllVisibleFlowers());
    const [flowers, setFlowers] = useState<Flower[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [showAddForm, setShowAddForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    useEffect(() => {
        updateFlowers();
    }, [currentPage, allFlowers]);

    const updateFlowers = () => {
        const startIndex = (currentPage - 1) * flowersPerPage;
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
            {showAddForm && <AddFlower onAdd={() => setShowAddForm(false)} />}
            {showDeleteForm && <DeleteFlower onDelete={() => setShowDeleteForm(false)} />}
            {showUpdateForm && <UpdateFlower onUpdate={() => setShowUpdateForm(false)} />}
        </div>
    );
}

export default App;
