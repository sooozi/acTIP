'use client';

import styles from './FormBtnCancel.module.css';

interface FormBtnCancelProps {
  text: string;
  className?: string;
}

export default function FormBtnCancel({ text }: FormBtnCancelProps) {
  return (
    <button type="button" className={styles.formBtnCancel}>
      {text}
    </button>
  );
}
