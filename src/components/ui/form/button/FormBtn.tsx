'use client';

interface FormBtnProps {
  text: string;
  className?: string;
  onClick?: () => void;
}

const FormBtn = ({ text, className, onClick }: FormBtnProps) => {
  return (
    <button
      onClick={onClick}
      className={className ? 'formBtn ' + className : 'formBtn'}
    >
      {text}
    </button>
  );
};

export default FormBtn;
