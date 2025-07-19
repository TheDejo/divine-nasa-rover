import React from 'react';
import styles from './output.module.scss';
import localTexts from './output.texts.json';
import cx from 'classnames';

interface OutputProps {
  output: string;
}

export default function Output({ output }: OutputProps) {
  const isError = output.trim().toLowerCase().startsWith('invalid');
  const lines = output.split('\n').filter(Boolean);

  return (
    <div className={cx(styles.outputContainer, { [styles.error]: isError })}>
      {output ? (
        <div className={styles.outputContent}>
          <span className={styles.outputLabel}>{localTexts.outputLabel}</span>
          <div className={styles.outputLines}>
            {lines.map((line, idx) => (
              <span key={idx} className={styles.outputLine}>
                {line}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.placeholder}>
          <span>{localTexts.placeholder}</span>
        </div>
      )}
    </div>
  );
}
