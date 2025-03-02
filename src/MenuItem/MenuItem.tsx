import React, { useEffect, useRef, useState } from 'react';
import { MenuItemProps } from '../types';
import ContextMenu from '../ContextMenu/ContextMenu';
import './MenuItem.css';

const MenuItem: React.FC<MenuItemProps> = ({ item, onAdd, onRename, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
    const [isRenaming, setIsRenaming] = useState(!item.name);
    const [newName, setNewName] = useState(item.name);
    const [nameError, setNameError] = useState('');
    const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const contextMenuRef = useRef<HTMLDivElement | null>(null);

    const handleRightClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
    };

    const handleAdd = () => {
        onAdd(item.id);
        setContextMenu(null);
        setIsOpen(true);
    };

    const handleRename = () => {
        setIsRenaming(true);
        setContextMenu(null);
    };

    const handleDelete = () => {
        onDelete(item.id);
        setContextMenu(null);
    };

    const handleRenameSubmit = () => {
        console.log('222 handleRename false')
        if (!newName.trim()) {
            setNameError('name is mandatory');
        } else {
            onRename(item.id, newName);
            setIsRenaming(false);
        }
    };

    const handleNameInput = (value: string) => {
        setNameError('');
        setNewName(value);
    }
    
    const handleRenameCancel = () => {
        setNewName(item.name); 
        setIsRenaming(false);
    };

    const handleToggleChildren = () => {
        if (clickTimeoutRef.current) {
            clearTimeout(clickTimeoutRef.current);
        }

        clickTimeoutRef.current = setTimeout(() => {
            setIsOpen(prev => !prev);
        }, 200); 
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)) {
                setContextMenu(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div id={item.id.toString()}>
            <div className="menu-item" onClick={handleToggleChildren}>
            {isRenaming ? (
                <div>
                    <input value={newName} onChange={(e) => handleNameInput(e.target.value)} minLength={1} placeholder='Enter name'/>
                    {nameError && <span className='span-error'>{nameError}</span>}
                    <div className='button-container'>
                        <button onClick={handleRenameSubmit}>Submit</button>
                        <button onClick={handleRenameCancel} disabled={!item.name}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div>
                    <span>{item.name} {item.children.length > 0 && (isOpen ? '[-]' : '[+]')}</span>
                    <div className='context-item' onClick={handleRightClick}>...</div>
                </div>
            )}
            </div>
            {contextMenu && (
                <div ref={contextMenuRef}>
                    <ContextMenu
                        onAdd={handleAdd}
                        onRename={handleRename}
                        onDelete={handleDelete}
                        onClose={() => setContextMenu(null)}
                    />
                </div>
            )}
            {isOpen && item.children.length > 0 && (
                <div className="submenu">
                    {item.children.map((child) => (
                        <MenuItem key={child.id} item={child} onAdd={onAdd} onRename={onRename} onDelete={onDelete} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MenuItem;
