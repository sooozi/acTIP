import React from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';
import styles from './FormTextInput.module.css';

interface FormData {
  email: string;
  name: string;
  phone: string;
  password: string;
  passwordChk: string;
  requiredChk01: boolean;
  requiredChk02: boolean;
  optionalChk: boolean;
}

interface FormInputProps {
  id: keyof FormData;
  label: string;
  type: string;
  placeholder?: string;
  register: UseFormRegister<FormData>;
  validationRules: RegisterOptions<FormData, keyof FormData>;
  errorMessage: string;
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onBlur?: () => void;
}

const FormUserInput: React.FC<FormInputProps> = ({
  id,
  label,
  type,
  placeholder,
  register,
  validationRules,
  errorMessage,
  value,
  onChange,
  onClear,
  onBlur,
}) => {
  return (
    <div className={styles.formInputBox}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.inputWrapper}>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register(id, validationRules)}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={`${styles.formTextInput} ${errorMessage ? 'is-invalid' : ''}`}
        />
        {value && (
          <button
            type="button"
            className={`${styles.clearButton} visible`}
            onClick={onClear}
          >
            &times;
          </button>
        )}
      </div>
      <div className={styles.txtWarning}>
        {errorMessage && (
          <span className="txt-invalid font-12 font-red">{errorMessage}</span>
        )}
      </div>
    </div>
  );
};

export default FormUserInput;
