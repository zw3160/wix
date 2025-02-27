import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Menu from './Menu';

describe('Menu Component', () => {
    test('renders without crashing', () => {
        render(<Menu />);
    });

    test('adds item when button is clicked', () => {
        const { getByText } = render(<Menu />);
        const button = getByText(/Create Menu/i);
        fireEvent.click(button);
        expect(getByText(/root item/i)).toBeInTheDocument();
    });
});
