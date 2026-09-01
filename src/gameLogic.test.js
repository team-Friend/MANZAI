import test from 'node:test';
import assert from 'node:assert/strict';
import { getAudienceReactionState, getTimingScore, resolveRound } from './gameLogic.js';

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
});
