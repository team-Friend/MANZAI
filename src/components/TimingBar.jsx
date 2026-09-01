import React, { useState, useEffect, useRef } from 'react';
import './TimingBar.css';
import { getTimingScore } from '../gameLogic';

export const TimingBar = ({ isActive, onFinish }) => {
  const [position, setPosition] = useState(0);
  const [targetPosition, setTargetPosition] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(null);

  const directionRef = useRef(1);
  const requestRef = useRef(null);
  const exactPositionRef = useRef(0);

  useEffect(() => {
    if (!isActive) {
      cancelAnimationFrame(requestRef.current);
      setIsPlaying(false);
      setScore(null);
      setPosition(0);
      exactPositionRef.current = 0;
      directionRef.current = 1;
      return;
    }

    const nextTarget = Math.floor(Math.random() * 60) + 20;
    setTargetPosition(nextTarget);
    setPosition(0);
    exactPositionRef.current = 0;
    directionRef.current = 1;
    setScore(null);
    setIsPlaying(true);
  }, [isActive]);

  useEffect(() => {
    if (!isPlaying) return undefined;

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

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying]);

  const handleStop = () => {
    if (!isPlaying) return;

    cancelAnimationFrame(requestRef.current);
    setIsPlaying(false);

    const timingScore = getTimingScore(exactPositionRef.current, targetPosition);
    setScore(timingScore);

    onFinish?.({
      timingScore,
      currentPosition: exactPositionRef.current,
      targetPosition,
    });
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

        <div className="moving-line" style={{ left: `${position}%` }}></div>
      </div>

      <div className="controls">
        {isActive && isPlaying && (
          <button
            onPointerDown={handleStop}
            style={{ backgroundColor: '#ff5555', color: 'white', touchAction: 'manipulation' }}
          >
            ツッコむ
          </button>
        )}

        {score !== null && !isPlaying && (
          <div className="result-text">{score}点</div>
        )}
      </div>
    </div>
  );
};