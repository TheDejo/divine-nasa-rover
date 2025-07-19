import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import HomeSection from '../HomeSection';



const renderComponent = () => {
    const user = userEvent.setup();
    const result = render(<HomeSection />)
    return { result, user }
}


describe('  happy path', () => {
    test('should render the home section', () => {
        renderComponent();

        screen.debug();
    });
});