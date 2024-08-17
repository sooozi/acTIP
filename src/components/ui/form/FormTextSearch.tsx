'use client';

import styles from './FormTextSearch.module.css';

interface FormTextSearchProps {
  value?: string;
  placeholder?: string;
  onClick?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormTextSearch({
  value,
  placeholder,
  onClick,
  onChange,
}: FormTextSearchProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClick();
    }
  };

  return (
    <div className={styles.formTextSearchMain}>
      <input
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        type="text"
      />
      <button onClick={onClick}>검색</button>
    </div>
  );
}
