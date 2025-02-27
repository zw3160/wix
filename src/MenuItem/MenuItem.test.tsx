import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MenuItem from './MenuItem';

const mockItem = {
    id: 1,
    name: 'Test Item',
    children: [],
};

describe('MenuItem Component', () => {
    test('renders without crashing', () => {
        render(<MenuItem item={mockItem} onAdd={() => {}} onRename={() => {}} onDelete={() => {}} />);
    });

    test('calls onAdd when Add Submenu is clicked', () => {
        const onAddMock = jest.fn();
        const { getByText } = render(<MenuItem item={mockItem} onAdd={onAddMock} onRename={() => {}} onDelete={() => {}} />);
        
        const menuItem = getByText(/Test Item/i);
        fireEvent.contextMenu(menuItem);

        const addSubmenu = getByText(/Add Submenu/i);
        fireEvent.click(addSubmenu);
        
        expect(onAddMock).toHaveBeenCalled();
    });

    test('calls onDelete when Delete is clicked', () => {
        const onDeleteMock = jest.fn();
        const { getByText } = render(<MenuItem item={mockItem} onAdd={() => {}} onRename={() => {}} onDelete={onDeleteMock} />);
        
        const menuItem = getByText(/Test Item/i);
        fireEvent.contextMenu(menuItem);

        const deleteButton = getByText(/Delete/i);
        fireEvent.click(deleteButton);
        
        expect(onDeleteMock).toHaveBeenCalled();
    });
});
