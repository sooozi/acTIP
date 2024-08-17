'use client';

import styles from './ButtonKeyword.module.css';

interface ButtonKeyword {
  text: string;
  className?: string;
}

export default function ButtonKeyword({ text, className }: ButtonKeyword) {
  return <div className={styles.buttonKeyword + ' ' + className}>{text}</div>;
}
