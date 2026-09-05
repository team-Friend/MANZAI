export function getTimingScore(currentPosition, targetPosition) {
  const diff = Math.abs(currentPosition - targetPosition);

  if (diff <= 5) return 100;
  if (diff <= 12) return 80;
  if (diff <= 15) return 50;
  return 0;
}

export function isPerfectTimingScore(score) {
  return Number(score) === 100;
}

export function getAudienceGaugeProgress({ totalScore, totalProblems }) {
  const safeTotalProblems = Math.max(1, Number(totalProblems) || 0);
  const maxScore = safeTotalProblems * 100;
  const safeTotalScore = Math.max(0, Number(totalScore) || 0);

  if (maxScore <= 0) {
    return 0;
  }

  return Math.min(100, (safeTotalScore / maxScore) * 100);
}

export function addAudienceScore({ currentScore, gainedScore, totalProblems }) {
  const safeCurrentScore = Math.max(0, Number(currentScore) || 0);
  const safeGainedScore = Math.max(0, Number(gainedScore) || 0);
  const maxScore = Math.max(1, Number(totalProblems) || 0) * 100;

  return Math.min(maxScore, safeCurrentScore + safeGainedScore);
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

export function canAdvanceDialogue({
  showChoiceUi,
  selectedAnswer,
  isTimingActive,
}) {
  if (!showChoiceUi) {
    return true;
  }

  return Boolean(selectedAnswer) && !isTimingActive;
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
