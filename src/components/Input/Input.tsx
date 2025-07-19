import React, { useState, useRef } from 'react';
import styles from './input.module.scss';
import localTexts from './input.texts.json';

interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  label?: string;
  rows?: number;
}

export default function Input({ 
  placeholder = localTexts.placeholder, 
  value: initialValue = "", 
  onChange,
  disabled = false,
  label,
  rows = 4
}: InputProps) {
  const [inputValue, setInputValue] = useState(initialValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (onChange) {
      onChange(value);
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
        <textarea
          ref={textareaRef}
          className={styles.inputField}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          disabled={disabled}
          rows={rows}
        />
      </div>
    </div>
  );
}
