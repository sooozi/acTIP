'use client';

import React from 'react';
import styles from './FormTextInput.module.css';

interface FormTextInputProps {
  value?: string;
  id?: string;
  placeholder?: string;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  label?: string;
  className?: string;
  showIcon?: boolean;
}

export default function FormTextSearchMain({
  value,
  id,
  placeholder,
  onClick,
  onChange,
  type,
  label,
  className = '',
  showIcon = false,
}: FormTextInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onClick) {
      onClick();
    }
  };

  const handleClearClick = () => {
    if (onChange) {
      const event = {
        target: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  return (
    <div className={styles.formInputBox}>
      {label && <label htmlFor={id}>{label}</label>}
      <div className={styles.inputWrapper}>
        <input
          className={`${styles.formTextInput} ${className}`}
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          type={type}
        />
        {showIcon && <div className={styles.iconGrnChk}></div>}
        {value && value.length > 0 && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClearClick}
          >
            &times;
          </button>
        )}
      </div>
    </div>
  );
}
