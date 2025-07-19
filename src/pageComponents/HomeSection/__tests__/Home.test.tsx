import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import HomeSection from '../HomeSection'

describe('Page', () => {
    it('renders a heading', () => {
        render(<HomeSection />)

       screen.debug();
    })
})