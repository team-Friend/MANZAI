import React, { useState, useEffect, useRef } from 'react';
import './TimingBar.css';

export const TimingBar = () => {
  const [position, setPosition] = useState(0);
  const [targetPosition, setTargetPosition] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(null);

  const directionRef = useRef(1);
  const requestRef = useRef(null);
  const exactPositionRef = useRef(0); 

  const startGame = () => {
    setTargetPosition(Math.floor(Math.random() * 60) + 20);
    setPosition(0);
    exactPositionRef.current = 0;
    directionRef.current = 1;
    setScore(null);
    setIsPlaying(true);
  };

  useEffect(() => {
    const animate = () => {
      let nextPos = exactPositionRef.current + 1.2 * directionRef.current;

      if (nextPos >= 100) {
        nextPos = 100;
        directionRef.current = -1;
      } else if (nextPos <= 0) {
        nextPos = 0;
        directionRef.current = 1;
      }
      
      exactPositionRef.current = nextPos;
      setPosition(nextPos);
      requestRef.current = requestAnimationFrame(animate);
    };

    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying]);

  const handleStop = () => {
    if (!isPlaying) return;
    
    cancelAnimationFrame(requestRef.current);
    setIsPlaying(false);

    const diff = Math.abs(exactPositionRef.current - targetPosition);

    if (diff <= 3) {
      setScore(100);
    } else if (diff <= 8) {
      setScore(80);
    } else if (diff <= 15) {
      setScore(50);
    } else {
      setScore(0);
    }
    
    console.log("今回の点数:", score); 
  };

  return (
    <div className="timing-bar-wrapper">
      <div className="timing-bar-container">
        
        <div 
          className="target-area" 
          style={{ left: `${targetPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="target-green"></div>
          <div className="target-brown"></div>
          <div className="target-orange"></div>
          <div className="target-marker">▼</div>
        </div>
        
        <div 
          className="moving-line" 
          style={{ left: `${position}%` }}
        ></div>
        
      </div>

      <div className="controls">
        {!isPlaying && score === null && (
          <button onClick={startGame}>ゲームスタート</button>
        )}
        {isPlaying && (
          <button 
            onPointerDown={handleStop} 
            style={{ backgroundColor: '#ff5555', color: 'white', touchAction: 'manipulation' }}
          >
            ツッコむ
          </button>
        )}
        {score !== null && (
          <div className="result-text">
            <button onClick={startGame}>もう一度</button>
          </div>
        )}
      </div>
    </div>
  );
};