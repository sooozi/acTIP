'use client';

import styles from './FormTextSearchMain.module.css';

interface FormTextSearchMainProps {
  value?: string;
  placeholder?: string;
  onClick?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormTextSearchMain({
  value,
  placeholder,
  onClick,
  onChange,
}: FormTextSearchMainProps) {
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
