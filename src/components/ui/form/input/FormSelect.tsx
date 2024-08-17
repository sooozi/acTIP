'use client';

import React from 'react';
import styles from './FormSelect.module.css';

interface FormSelectProps {
  id?: string;
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function FormSelect({
  id,
  label,
  value,
  onChange,
}: FormSelectProps) {
  return (
    <div className={styles.formSelectWrap}>
      {label && <label htmlFor={id}>{label}</label>}
      <select id={id} onChange={onChange} className={styles.formSelect}>
        <option value="1">운동</option>
        <option value="2">뷰티&패션</option>
        <option value="3">요리</option>
        <option value="4">공부</option>
        <option value="5">독서</option>
        <option value="6">금융</option>
        <option value="7">인간관계</option>
        <option value="8">회사생활</option>
        <option value="9">기타</option>
      </select>
    </div>
  );
}
