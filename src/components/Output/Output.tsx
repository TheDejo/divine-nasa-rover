import React from 'react';
import styles from './output.module.scss';
import localTexts from './output.texts.json';

interface OutputProps {
  output: string;
}

export default function Output({ output }: OutputProps) {
  return (
    <div className={styles.outputContainer}>
      {output ? (
        <div className={styles.outputContent}>
          <span className={styles.outputLabel}>{localTexts.outputLabel}</span>
          <span className={styles.outputText}>{output}</span>
        </div>
      ) : (
        <div className={styles.placeholder}>
          <span>{localTexts.placeholder}</span>
        </div>
      )}
    </div>
  );
}
