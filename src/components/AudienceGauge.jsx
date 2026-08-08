import React from 'react';
import './AudienceGauge.css';

export const AudienceGauge = ({ score }) => {
  const displayScore = Math.min(100, Math.max(0, score));

  return (
    <div className="gauge-container">
      <div className="gauge-label">ウケ度</div>
      <div className="gauge-bar-bg">
        <div 
          className="gauge-bar-fill" 
          style={{ width: `${displayScore}%` }}
        ></div>
      </div>
    </div>
  );
};