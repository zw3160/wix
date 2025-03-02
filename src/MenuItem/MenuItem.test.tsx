import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MenuItem from './MenuItem';

const mockOnAdd = jest.fn();
const mockOnRename = jest.fn();
const mockOnDelete = jest.fn();

const item = {
    id: 1, 
    name: 'Test Item',
    children: [],
};

describe('MenuItem Component', () => {
    beforeEach(() => {
        render(<MenuItem item={item} onAdd={mockOnAdd} onRename={mockOnRename} onDelete={mockOnDelete} />);
    });

    test('renders item name', () => {
        const menuItem = document.getElementById('1');
        expect(menuItem).toBeInTheDocument();
        expect(menuItem).toHaveTextContent('Test Item');
    });

    test('opens context menu on right click', () => {
        const menuItem = document.getElementById('1');
        if (menuItem) {
            fireEvent.contextMenu(menuItem);
            expect(document.querySelector('.context-item')).toBeInTheDocument();
        }
    });

    test('calls onAdd when add is clicked from context menu', () => {
        const menuItem = document.getElementById('1');
        if (menuItem) {
            fireEvent.contextMenu(menuItem);
            const addButton = Array.from(document.querySelectorAll('.context-item button')).find(button => button.textContent === 'Add');
            if (addButton) {
                fireEvent.click(addButton);
                expect(mockOnAdd).toHaveBeenCalledWith(item.id);
            }
        }
    });

    test('enters renaming mode', () => {
        const menuItem = document.getElementById('1');
        if (menuItem) {
            fireEvent.contextMenu(menuItem);
            const renameButton = Array.from(document.querySelectorAll('.context-item button')).find(button => button.textContent === 'Rename');
            if (renameButton) {
                fireEvent.click(renameButton);
                expect(document.querySelector('input[placeholder="Enter name"]')).toBeInTheDocument();
            }
        }
    });

    test('handles renaming submission', () => {
        const menuItem = document.getElementById('1');
        if (menuItem) {
            fireEvent.contextMenu(menuItem);
            const renameButton = Array.from(document.querySelectorAll('.context-item button')).find(button => button.textContent === 'Rename');
            if (renameButton) {
                fireEvent.click(renameButton);
                const input = document.querySelector('input[placeholder="Enter name"]');
                if (input) {
                    fireEvent.change(input, { target: { value: 'New Name' } });
                    const submitButton = Array.from(document.querySelectorAll('button')).find(button => button.textContent === 'Submit');
                    if (submitButton) {
                        fireEvent.click(submitButton);
                        expect(mockOnRename).toHaveBeenCalledWith(item.id, 'New Name');
                    }
                }
            }
        }
    });

    test('shows error on empty name submission', () => {
        const menuItem = document.getElementById('1');
        if (menuItem) {
            fireEvent.contextMenu(menuItem);
            const renameButton = Array.from(document.querySelectorAll('.context-item button')).find(button => button.textContent === 'Rename');
            if (renameButton) {
                fireEvent.click(renameButton);
                const submitButton = Array.from(document.querySelectorAll('button')).find(button => button.textContent === 'Submit');
                if (submitButton) {
                    fireEvent.click(submitButton);
                    expect(document.querySelector('.span-error')).toHaveTextContent('name is mandatory');
                }
            }
        }
    });

    test('calls onDelete when delete is clicked from context menu', () => {
        const menuItem = document.getElementById('1');
        if (menuItem) {
            fireEvent.contextMenu(menuItem);
            const deleteButton = Array.from(document.querySelectorAll('.context-item button')).find(button => button.textContent === 'Delete');
            if (deleteButton) {
                fireEvent.click(deleteButton);
                expect(mockOnDelete).toHaveBeenCalledWith(item.id);
            }
        }
    });
});
