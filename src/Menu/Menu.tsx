import React, { useEffect, useState } from 'react';
import MenuItem from '../MenuItem/MenuItem';
import './Menu.css';

const initialMenu: MenuNode[] = [];

interface MenuNode {
    id: number;
    name: string;
    children: MenuNode[];
}

const Menu: React.FC = () => {
    const [menu, setMenu] = useState<MenuNode[]>(() => {
        const savedMenu = localStorage.getItem('menu');
        return savedMenu ? JSON.parse(savedMenu) : initialMenu;
    });

    useEffect(() => {
        localStorage.setItem('menu', JSON.stringify(menu));
    }, [menu]);

    const addDefaultItem = () => {
        const newItem: MenuNode = { id: Date.now(), name: 'root item', children: [] };
        setMenu(prevMenu => [...prevMenu, newItem]);
    };

    const addSubmenu = (parentId: number) => {
        const newItem: MenuNode = { id: Date.now(), name: 'New Item', children: [] };
        const updatedMenu = addItem(menu, parentId, newItem);
        setMenu(updatedMenu);
    };

    const renameItem = (id: number, newName: string) => {
        const updatedMenu = rename(menu, id, newName);
        setMenu(updatedMenu);
    };

    const deleteItem = (id: number) => {
        const updatedMenu = deleteById(menu, id);
        setMenu(updatedMenu);
    };

    const addItem = (items: MenuNode[], parentId: number, newItem: MenuNode): MenuNode[] => {
        return items.map(item => {
            if (item.id === parentId) {
                return { ...item, children: [...item.children, newItem] };
            }
            return { ...item, children: addItem(item.children, parentId, newItem) };
        });
    };

    const rename = (items: MenuNode[], id: number, newName: string): MenuNode[] => {
        return items.map(item => {
            if (item.id === id) {
                return { ...item, name: newName };
            }
            return { ...item, children: rename(item.children, id, newName) };
        });
    };

    const deleteById = (items: MenuNode[], id: number): MenuNode[] => {
        return items.reduce((acc: MenuNode[], item: MenuNode) => {
            if (item.id === id) {
                return acc;
            }
    
            const updatedChildren = deleteById(item.children, id);
            
            if (updatedChildren.length !== item.children.length) {
                acc.push({ ...item, children: updatedChildren });
            } else {
                acc.push(item);
            }
    
            return acc;
        }, []);
    }; 

    return (
        <div>
            <div className="centered-button-container">
                <button className="create-menu-button" onClick={addDefaultItem}>Create Menu</button>
            </div>
            
            {menu.map(item => (
                <MenuItem key={item.id} item={item} onAdd={addSubmenu} onRename={renameItem} onDelete={deleteItem} />
            ))}
        </div>
    );
};

export default Menu;
