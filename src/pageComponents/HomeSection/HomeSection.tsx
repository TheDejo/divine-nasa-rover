'use client';
import Input from '@/components/Input/Input';
import Output from '@/components/Output/Output';
import { debounce } from '@/utils/helpers';
import React, { useState } from 'react';
import styles from './homeSection.module.scss';
import localTexts from './homeSection.texts.json';
import { constants } from '@/config/constants';

const { ERROR_MESSAGES, DEBOUNCE_DELAY_MS } = constants;

const VALID_COMMANDS = ['L', 'R', 'M'] as const;
const DIRECTIONS = ['N', 'E', 'S', 'W'] as const;

type Command = typeof VALID_COMMANDS[number];
type Direction = typeof DIRECTIONS[number];

interface Position {
    x: number;
    y: number;
    direction: Direction;
}

const directionMap: Record<Direction, { L: Direction; R: Direction }> = {
    N: { L: 'W', R: 'E' },
    E: { L: 'N', R: 'S' },
    S: { L: 'E', R: 'W' },
    W: { L: 'S', R: 'N' },
};

const movementDelta: Record<Direction, { dx: number; dy: number }> = {
    N: { dx: 0, dy: 1 },
    E: { dx: 1, dy: 0 },
    S: { dx: 0, dy: -1 },
    W: { dx: -1, dy: 0 },
};

function rotate(direction: Direction, turn: 'L' | 'R'): Direction {
    return directionMap[direction][turn];
}

function move(pos: Position): Position {
    const delta = movementDelta[pos.direction];
    return {
        ...pos,
        x: pos.x + delta.dx,
        y: pos.y + delta.dy,
    };
}

function runCommands(start: Position, commands: string, maxX: number, maxY: number): Position {
    let current = { ...start };

    for (const char of commands.split('')) {
        const cmd = char as Command;

        if (!VALID_COMMANDS.includes(cmd)) continue;

        if (cmd === 'L' || cmd === 'R') {
            current.direction = rotate(current.direction, cmd);
        } else if (cmd === 'M') {
            const next = move(current);
            const isInBounds = next.x >= 0 && next.x <= maxX && next.y >= 0 && next.y <= maxY;
            if (isInBounds) {
                current = next;
            }
        }
    }

    return current;
}

function processInput(input: string): string {
    const lines = input.trim().split('\n');
    if (lines.length < 3 || lines.length % 2 === 0) return ERROR_MESSAGES.INVALID_INPUT;

    const [maxX, maxY] = lines[0].split(' ').map(Number);
    if (isNaN(maxX) || isNaN(maxY)) return ERROR_MESSAGES.INVALID_PLATEAU_COORDINATES;

    const output: string[] = [];

    for (let i = 1; i < lines.length; i += 2) {
        const [xStr, yStr, dir] = lines[i].split(' ');
        const commands = lines[i + 1];
        const x = parseInt(xStr, 10);
        const y = parseInt(yStr, 10);

        if (!DIRECTIONS.includes(dir as Direction)) return `${ERROR_MESSAGES.INVALID_DIRECTION}: ${dir}`;
        if (isNaN(x) || isNaN(y)) return `${ERROR_MESSAGES.INVALID_POSITION}: ${lines[i]}`;

        const start: Position = { x, y, direction: dir as Direction };
        const final = runCommands(start, commands, maxX, maxY);
        output.push(`${final.x} ${final.y} ${final.direction}`);
    }

    return output.join('\n');
}

export default function HomeSection() {
    const [output, setOutput] = useState<string>('');

    const debouncedSubmit = debounce((value: string) => {
        const result = processInput(value);
        setOutput(result);
    }, DEBOUNCE_DELAY_MS);

    const handleInputChange = (value: string) => {
        debouncedSubmit(value);
    };

    return (
        <div className={styles.homeSection}>
            <div>
                <Input
                    label={`${localTexts.inputLabel} ${localTexts.autoSubmitLabel}`}
                    placeholder={localTexts.inputPlaceholder}
                    onChange={handleInputChange}
                />
            </div>
            <Output output={output} />
        </div>
    );
}
