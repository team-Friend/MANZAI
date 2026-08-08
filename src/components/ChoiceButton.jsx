import React from 'react';
import './ChoiceButton.css'; 

export const ChoiceButton = ({ text }) => {
  return (
    <button className="choice-btn">
      {text}
    </button>
  );
};