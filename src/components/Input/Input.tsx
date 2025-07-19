import React, { useState, useRef } from 'react';
import styles from './input.module.scss';

interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  label?: string;
}

const COMMA_SEPARATOR = ', ';
const COMMA_SEPARATOR_LENGTH = COMMA_SEPARATOR.length;
const DEFAULT_CURSOR_POSITION = 0;

export default function Input({ 
  placeholder = "Enter text...", 
  value: initialValue = "", 
  onChange,
  disabled = false,
  label
}: InputProps) {
  const [inputValue, setInputValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (onChange) {
      onChange(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ') {
      e.preventDefault();
      
      const cursorPosition = e.currentTarget.selectionStart ?? DEFAULT_CURSOR_POSITION;
      const currentValue = e.currentTarget.value;
      
      if (currentValue.trim() === '' || currentValue.endsWith(COMMA_SEPARATOR)) {
        return;
      }
      
      const newValue = currentValue.slice(0, cursorPosition) + COMMA_SEPARATOR + currentValue.slice(cursorPosition);
      
      setInputValue(newValue);
      
      setTimeout(() => {
        if (inputRef.current) {
          const newCursorPosition = cursorPosition + COMMA_SEPARATOR_LENGTH;
          inputRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
        }
      }, 0);
      
      if (onChange) {
        onChange(newValue);
      }
    }
  };

  return (
    <div className={styles.inputContainer}>
      {label && (
        <label className={styles.inputLabel}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        <input
          ref={inputRef}
          type="text"
          className={styles.inputField}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
