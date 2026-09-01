import test from 'node:test';
import assert from 'node:assert/strict';
import {
  addAudienceScore,
  canAdvanceDialogue,
  getAudienceGaugeProgress,
  getAudienceReactionState,
  getTimingScore,
  resolveRound,
} from './gameLogic.js';

test('タイミングの近さで点数が計算される', () => {
  assert.equal(getTimingScore(50, 50), 100);
  assert.equal(getTimingScore(58, 50), 80);
  assert.equal(getTimingScore(65, 50), 50);
  assert.equal(getTimingScore(80, 50), 0);
});

test('正解でなければ最終スコアは0になる', () => {
  const result = resolveRound({
    selectedAnswer: 'A',
    correctAnswer: 'B',
    currentPosition: 50,
    targetPosition: 50,
  });

  assert.equal(result.isCorrect, false);
  assert.equal(result.finalScore, 0);
  assert.equal(result.timingScore, 0);
});

test('正解ならタイミングの点数がそのまま最終スコアになる', () => {
  const result = resolveRound({
    selectedAnswer: 'B',
    correctAnswer: 'B',
    currentPosition: 58,
    targetPosition: 50,
  });

  assert.equal(result.isCorrect, true);
  assert.equal(result.timingScore, 80);
  assert.equal(result.finalScore, 80);
});

test('観客の笑い反応はスコアに応じて強くなる', () => {
  assert.deepEqual(getAudienceReactionState(0), { isLaughing: false, intensity: 0 });
  assert.deepEqual(getAudienceReactionState(50), { isLaughing: true, intensity: 1 });
  assert.deepEqual(getAudienceReactionState(90), { isLaughing: true, intensity: 2 });
  assert.deepEqual(getAudienceReactionState(98), { isLaughing: true, intensity: 2 });
});

test('問題数に応じて満点が全問満点で最大化される', () => {
  assert.equal(getAudienceGaugeProgress({ totalScore: 0, totalProblems: 10 }), 0);
  assert.equal(getAudienceGaugeProgress({ totalScore: 500, totalProblems: 10 }), 50);
  assert.equal(getAudienceGaugeProgress({ totalScore: 1000, totalProblems: 10 }), 100);
  assert.equal(getAudienceGaugeProgress({ totalScore: 250, totalProblems: 4 }), 62.5);
});

test('正解ごとにスコアが蓄積され、ステージ全体で満点を超えない', () => {
  assert.equal(addAudienceScore({ currentScore: 0, gainedScore: 100, totalProblems: 10 }), 100);
  assert.equal(addAudienceScore({ currentScore: 800, gainedScore: 200, totalProblems: 10 }), 1000);
  assert.equal(addAudienceScore({ currentScore: 950, gainedScore: 100, totalProblems: 10 }), 1000);
});

test('解答後なら次の会話へ進める', () => {
  assert.equal(canAdvanceDialogue({ showChoiceUi: true, selectedAnswer: 'B', isTimingActive: false }), true);
  assert.equal(canAdvanceDialogue({ showChoiceUi: true, selectedAnswer: null, isTimingActive: false }), false);
  assert.equal(canAdvanceDialogue({ showChoiceUi: true, selectedAnswer: 'B', isTimingActive: true }), false);
  assert.equal(canAdvanceDialogue({ showChoiceUi: false, selectedAnswer: null, isTimingActive: false }), true);
});
