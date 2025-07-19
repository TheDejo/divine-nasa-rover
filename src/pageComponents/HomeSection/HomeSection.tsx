'use client'
import Input from '@/components/Input/Input'
import Output from '@/components/Output/Output'
import { debounce } from '@/utils/helpers';
import React, { useState } from 'react'
import styles from './homeSection.module.scss'

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
          <p>Seperate characters with spaces - (NB:it submits automatically after 2 seconds)</p>
          <div>
              <Input
                  label="Enter your text"
                  placeholder="Type characters separated by spaces"
                  onChange={handleInputChange}
              />
          </div>
          <Output output={output} />
    </div>
  )
}
