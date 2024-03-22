import React from 'react';
import './style.scss';

interface ButtonProps {
  onClick: () => void;
  text: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, text, disabled }) => {
  return (
    <button onClick={onClick} className='btn' disabled={disabled}>
      {text}
    </button>
  );
};
export default Button;
