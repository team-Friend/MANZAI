import React from 'react';
import './DialogueBox.css';
import rightBubbleImg from '../assets/bubble_right.png';

export const DialogueBoxRight = ({ text }) => {
  return (
    <div className="dialogue-container">
      <img src={rightBubbleImg} alt="右の吹き出し" className="bubble-image" />
      <div className="text-wrapper">
        <p className="pixel-text">{text}</p>
      </div>
    </div>
  );
};