import React, { useState, useEffect } from 'react';
import './App.css';
import ADDflower from './components/ADDflower';
import DELETEflower from './components/DELETEflower';
import UPDATEflower from './components/UPDATEflower';
import DisplayFlowerList from './components/DisplayFlowerList';
import { flower } from './domain/Flowers';
import { Repo } from './repository/Repo';
import SeasonChart from './components/SeasonChart';
import NavigationBar from './components/NavigationBar';

const repository = new Repo();
const flowersPerPage = 3;

function App() {
    const [allFlowers, setAllFlowers] = useState<flower[]>(repository.getAllVisibleFlowers());
    const [flowers, setFlowers] = useState<flower[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [showAddForm, setShowAddForm] = useState<boolean>(false);
    const [showDeleteForm, setShowDeleteForm] = useState<boolean>(false);
    const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);

    useEffect(() => {
        updateFlowers();
    }, [currentPage, allFlowers]);

    const updateFlowers = () => {
        const startIndex = (currentPage - 1) * flowersPerPage;
        const endIndex = startIndex + flowersPerPage;
        const slicedFlowers = allFlowers.slice(startIndex, endIndex);
        const sortedFlowers = sortFlowers(slicedFlowers);
        setFlowers(sortedFlowers);
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

    const handleSortByLatinName = () => {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        updateFlowers();
    };

    const sortFlowers = (flowersToSort: flower[]) => {
        return flowersToSort.sort((a, b) => {
            return sortDirection === 'asc' ? a.latin_name.localeCompare(b.latin_name) : b.latin_name.localeCompare(a.latin_name);
        });
    };

    const handleToggleAddForm = () => {
        setShowAddForm(!showAddForm);
        setShowDeleteForm(false);
        setShowUpdateForm(false);
    };

    const handleToggleDeleteForm = () => {
        setShowDeleteForm(!showDeleteForm);
        setShowAddForm(false);
        setShowUpdateForm(false);
    };

    const handleToggleUpdateForm = () => {
        setShowUpdateForm(!showUpdateForm);
        setShowAddForm(false);
        setShowDeleteForm(false);
    };

    const totalPages = Math.ceil(allFlowers.length / flowersPerPage);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Popular Flowers</h1>
                <NavigationBar
                    onSort={handleSortByLatinName}
                    onPreviousPage={handlePreviousPage}
                    onNextPage={handleNextPage}
                    onToggleAddForm={handleToggleAddForm}
                    onToggleDeleteForm={handleToggleDeleteForm}
                    onToggleUpdateForm={handleToggleUpdateForm}
                    currentPage={currentPage}
                    totalPages={totalPages} // Pass totalPages to the NavigationBar component
                />
                <DisplayFlowerList flowers={flowers} />
                <SeasonChart flowers={allFlowers} />
                {showAddForm && <ADDflower onAdd={handleAddFlower} />}
                {showDeleteForm && <DELETEflower onDelete={handleDeleteFlower} />}
                {showUpdateForm && <UPDATEflower onUpdate={handleUpdateFlower} />}
                <div>
                    <button onClick={handleSortByLatinName}>Sort By Latin Name</button>
                    <button onClick={handlePreviousPage}>Previous Page</button>
                    <button onClick={handleNextPage}>Next Page</button>
                </div>
            </header>
        </div>
    );
}

export default App;
