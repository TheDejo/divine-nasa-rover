import React from 'react';
import styles from './output.module.scss';

interface OutputProps {
  output: string;
}

export default function Output({ output }: OutputProps) {
  return (
    <div className={styles.outputContainer}>
      {output ? (
        <div className={styles.outputContent}>
          <span className={styles.outputLabel}>Output:</span>
          <span className={styles.outputText}>{output}</span>
        </div>
      ) : (
        <div className={styles.placeholder}>
          <span>Waiting for input...</span>
        </div>
      )}
    </div>
  );
}
