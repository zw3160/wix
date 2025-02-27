import React from 'react';
import './ContextMenu.css';

interface ContextMenuProps {
    onAdd: () => void;
    onRename: () => void;
    onDelete: () => void;
    onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ onAdd, onRename, onDelete, onClose }) => {
    return (
        <div className='context'
            style={{
                position: 'absolute',
                border: '1px solid black',
                backgroundColor: 'white',
                zIndex: 1000,
            }}
            onMouseLeave={onClose}
        >
            <div onClick={onAdd}>Add Submenu</div>
            <div onClick={onRename}>Rename</div>
            <div onClick={onDelete}>Delete</div>
        </div>
    );
};

export default ContextMenu;
