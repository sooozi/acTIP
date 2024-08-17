'use client';

import styles from './FormBtnSubmit.module.css';

interface FormBtnSubmitProps {
  text: string;
  className?: string;
}

const FormBtnSubmit = ({ text }: FormBtnSubmitProps) => {
  const handleSubmit = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <button
      type="submit"
      className={styles.formBtnSubmit}
      onKeyDown={handleSubmit}
    >
      {text}
    </button>
  );
};

export default FormBtnSubmit;
