import React from 'react';

import './style.scss';

interface InputProps {
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  onPaste?: (event: React.ClipboardEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ value, type, onChange, readOnly, onPaste }) => {
  return (<input
    type={type}
    value={value}
    onChange={onChange}
    className='input'
    readOnly={readOnly}
    onPaste={(event: React.ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault();
      onPaste && onPaste(event);
    }}
  />
  );
};
export default Input;
