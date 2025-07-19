'use client'
import Input from '@/components/Input/Input'
import Output from '@/components/Output/Output'
import { debounce } from '@/utils/helpers';
import React, { useState } from 'react'
import styles from './homeSection.module.scss'
import localTexts from './homeSection.texts.json'

const TWO_SECONDS = 2000;


export default function HomeSection() {
    const [output, setOutput] = useState<string>('');

    const debouncedSubmit = debounce((value: string) => {
        setOutput(value);
    }, TWO_SECONDS);

    const handleInputChange = (value: string) => {
        debouncedSubmit(value);
    };
    
  return (
    <div className={styles.homeSection}>
          <p>{localTexts.description}</p>
          <div>
              <Input
                  label={localTexts.inputLabel}
                  placeholder={localTexts.inputPlaceholder}
                  onChange={handleInputChange}
              />
          </div>
          <Output output={output} />
    </div>
  )
}
