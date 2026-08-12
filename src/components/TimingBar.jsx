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
      // ★変更：計算には exactPositionRef を使う
      let nextPos = exactPositionRef.current + 1.2 * directionRef.current;

      if (nextPos >= 100) {
        nextPos = 100;
        directionRef.current = -1;
      } else if (nextPos <= 0) {
        nextPos = 0;
        directionRef.current = 1;
      }
      
      // 裏側のメモを即座に更新
      exactPositionRef.current = nextPos;
      // 画面の見た目も更新
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
    
    // 即座にアニメーションを止める
    cancelAnimationFrame(requestRef.current);
    setIsPlaying(false);

    // ★変更：遅延のある position ではなく、遅延ゼロの exactPositionRef を使って判定する！
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
  };

  return (
    <div className="timing-bar-wrapper">
      <div className="timing-bar-container">
        <div className="timing-bar-bg"></div>
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
          className="moving-bar" 
          style={{ width: `${position}%` }}
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
            ここでツッコむ！！
          </button>
        )}
        {score !== null && (
          <div className="result-text">
            {score === 100 ? "大爆笑！！ (100点)" : 
             score === 80 ? "ウケた！ (80点)" : 
             score === 50 ? "ややウケ (50点)" : 
             "スベった... (0点)"}
            <br />
            <button onClick={startGame} style={{ marginTop: '10px' }}>もう一度</button>
          </div>
        )}
      </div>
    </div>
  );
};