import React, { useState } from 'react';
import ADDflower from './ADDflower';
import UPDATEflower from './UPDATEflower';
import DELETEflower from './DELETEflower';

interface NavigationBarProps {
    onSort: () => void;
    onPreviousPage: () => void;
    onNextPage: () => void;
    onToggleAddForm: () => void;
    onToggleDeleteForm: () => void;
    onToggleUpdateForm: () => void;
    currentPage: number;
    totalPages: number;
}


const NavigationBar: React.FC<NavigationBarProps> = ({ onSort, onPreviousPage, onNextPage, onToggleAddForm, onToggleDeleteForm, onToggleUpdateForm }) => {
    const [selectedAction, setSelectedAction] = useState<string | null>(null);

    return (
        <div className="navigation-bar">
            <select onChange={(e) => setSelectedAction(e.target.value)}>
                <option value="">Select Action</option>
                <option value="add">Add Flower</option>
                <option value="update">Update Flower</option>
                <option value="delete">Delete Flower</option>
            </select>
            {selectedAction === 'add' && <ADDflower />}
            {selectedAction === 'update' && <UPDATEflower />}
            {selectedAction === 'delete' && <DELETEflower />}
            {/* Include other navigation elements like sorting, paging buttons */}
            <button onClick={onSort}>Sort</button>
            <button onClick={onPreviousPage}>Prev</button>
            <button onClick={onNextPage}>Next</button>
        </div>
    );
}

export default NavigationBar;
