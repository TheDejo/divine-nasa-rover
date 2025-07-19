import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import HomeSection from '../HomeSection';
import userEvent from '@testing-library/user-event';
import localTexts from '../homeSection.texts.json';
import { constants } from '@/config/constants';

const { ERROR_MESSAGES } = constants;

const HAPPY_PATH_INPUT = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;

const INVALID_DIRECTION_INPUT = `5 5
1 2 X
LMLMLMLMM`;

const INVALID_PLATEAU_INPUT = `X Y
1 2 N
LMLMLMLMM`;

const DEBOUNCE_DELAY_MS = 3000;

describe('HomeSection', () => {
    let user: ReturnType<typeof userEvent.setup>;
    let textarea: HTMLElement;

    beforeEach(() => {
        user = userEvent.setup();
        render(<HomeSection />);
        textarea = screen.getByRole('textbox');
    });

    describe('Initial Render', () => {
        test('renders the input label', () => {
            expect(screen.getByText(new RegExp(localTexts.inputLabel, 'i'))).toBeInTheDocument();
        });

        test('renders waiting for input when no input is provided', () => {
            expect(screen.getByText(new RegExp(localTexts.waitingForInput, 'i'))).toBeInTheDocument();
        });
    });

    describe('Happy Path', () => {
        test('renders correct output for valid input', async () => {
            await user.clear(textarea);
            await user.type(textarea, HAPPY_PATH_INPUT);

            await waitFor(() => {
                expect(screen.getByText('1 3 N')).toBeInTheDocument();
                expect(screen.getByText('5 1 E')).toBeInTheDocument();
            }, { timeout: DEBOUNCE_DELAY_MS });
        });
    });

    describe('Error Paths', () => {
        test('shows an error message for invalid direction', async () => {
            await user.clear(textarea);
            await user.type(textarea, INVALID_DIRECTION_INPUT);

            await waitFor(() => {
                expect(screen.getByText(new RegExp(ERROR_MESSAGES.INVALID_DIRECTION, 'i'))).toBeInTheDocument();
            }, { timeout: DEBOUNCE_DELAY_MS });
        });

        test('shows an error message for invalid plateau', async () => {
            await user.clear(textarea);
            await user.type(textarea, INVALID_PLATEAU_INPUT);

            await waitFor(() => {
                expect(screen.getByText(new RegExp(ERROR_MESSAGES.INVALID_PLATEAU, 'i'))).toBeInTheDocument();
            }, { timeout: DEBOUNCE_DELAY_MS });
        });
    });
});
