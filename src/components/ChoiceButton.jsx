import React from 'react';
import './ChoiceButton.css'; 

export const ChoiceButton = ({
  text,
  className = '',
  disabled = false,
  onClick,
  type = 'button',
}) => {
  const buttonClassName = ['choice-btn', className].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClassName}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};