import React from 'react';
import './NavigationBar.css';

interface NavigationBarProps {
    onAdd: () => void;
    onDelete: () => void;
    onUpdate: () => void;
    onSort: () => void;
    onNextPage: () => void;
    onPrevPage: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ onAdd, onDelete, onUpdate, onSort, onNextPage, onPrevPage }) => {
    return (
        <div className="navigation-bar">
            <h1>Flower Tattoo Inspo</h1>
            <button onClick={onAdd}>Add Flower</button>
            <button onClick={onDelete}>Delete Flower</button>
            <button onClick={onUpdate}>Update Flower</button>
            <button onClick={onSort}>Sort Flowers</button>
            <button onClick={onPrevPage}>Previous Page</button>
            <button onClick={onNextPage}>Next Page</button>
        </div>
    );
};

export default NavigationBar;
