export function getTimingScore(currentPosition, targetPosition) {
  const diff = Math.abs(currentPosition - targetPosition);

  if (diff <= 3) return 100;
  if (diff <= 8) return 80;
  if (diff <= 15) return 50;
  return 0;
}

export function getAudienceReactionState(score) {
  const safeScore = Math.min(100, Math.max(0, score));

  if (safeScore <= 0) {
    return { isLaughing: false, intensity: 0 };
  }

  if (safeScore >= 80) {
    return { isLaughing: true, intensity: 2 };
  }

  return { isLaughing: true, intensity: 1 };
}

export function resolveRound({
  selectedAnswer,
  correctAnswer,
  currentPosition,
  targetPosition,
}) {
  const isCorrect = selectedAnswer === correctAnswer;

  if (!isCorrect) {
    return {
      isCorrect: false,
      timingScore: 0,
      finalScore: 0,
    };
  }

  const timingScore = getTimingScore(currentPosition, targetPosition);

  return {
    isCorrect: true,
    timingScore,
    finalScore: timingScore,
  };
}
