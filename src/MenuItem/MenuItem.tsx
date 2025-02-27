import React, { useEffect, useState } from 'react';
import ContextMenu from '../ContextMenu/ContextMenu';
import './MenuItem.css';

interface MenuItemProps {
    item: MenuNode;
    onAdd: (parentId: number) => void;
    onRename: (id: number, newName: string) => void;
    onDelete: (id: number) => void;
}

interface MenuNode {
    id: number;
    name: string;
    children: MenuNode[];
}

const MenuItem: React.FC<MenuItemProps> = ({ item, onAdd, onRename, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
    const [isRenaming, setIsRenaming] = useState(false);
    const [newName, setNewName] = useState(item.name);

    const handleRightClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
    };

    const handleAdd = () => {
        onAdd(item.id);
        setContextMenu(null);
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
        onRename(item.id, newName);
        setIsRenaming(false);
    };

    const handleToggleChildren = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div className="menu-item" onContextMenu={handleRightClick} onClick={handleToggleChildren}>
                {isRenaming ? (
                    <div>
                        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
                        <button onClick={handleRenameSubmit}>Submit</button>
                    </div>
                ) : (
                    <span>{item.name} {item.children.length > 0 && (isOpen ? '[-]' : '[+]')}</span>
                )}
            </div>
            {contextMenu && (
                <ContextMenu
                    onAdd={handleAdd}
                    onRename={handleRename}
                    onDelete={handleDelete}
                    onClose={() => setContextMenu(null)}
                />
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
