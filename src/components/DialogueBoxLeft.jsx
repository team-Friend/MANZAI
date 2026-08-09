import React from 'react';
import './DialogueBox.css';
import leftBubbleImg from '../assets/bubble_left.png';

export const DialogueBoxLeft = ({ text }) => {
  return (
    <div className="dialogue-container">
      <img src={leftBubbleImg} alt="左の吹き出し" className="bubble-image" />
      <div className="text-wrapper">
        <p className="pixel-text">{text}</p>
      </div>
    </div>
  );
};