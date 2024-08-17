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

const FormPhoneInput: React.FC<FormInputProps> = ({
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
  const handleInputChange = (inputValue: string) => {
    // 숫자만 추출 후 하이픈 추가
    const phoneNumber = inputValue.replace(/[^0-9]/g, '');
    let formattedPhoneNumber = '';

    if (phoneNumber.length < 4) {
      formattedPhoneNumber = phoneNumber;
    } else if (phoneNumber.length < 7) {
      formattedPhoneNumber = `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    } else {
      formattedPhoneNumber = `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7)}`;
    }

    onChange(formattedPhoneNumber);
  };

  return (
    <div className={styles.formInputBox}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.inputWrapper}>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register(id, validationRules)}
          onChange={(e) => handleInputChange(e.target.value)}
          onBlur={onBlur}
          value={value} // 입력된 값 반영
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

export default FormPhoneInput;
