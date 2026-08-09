import React from 'react';
import { DialogueBoxLeft } from './components/DialogueBoxLeft';
import { DialogueBoxRight } from './components/DialogueBoxRight';
import { ChoiceButton } from './components/ChoiceButton';
import { AudienceGauge } from './components/AudienceGauge';
import './App.css';

function App() {
  return (
    <div style={{ backgroundColor: '#222', padding: '50px', minHeight: '100vh', color: 'white' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>UIコンポーネント 全部乗せテスト</h2>

      {/* 1. ウケ度ゲージ */}
      <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
        <AudienceGauge score={80} />
      </div>

      {/* 2. 吹き出し（横並び） */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px' }}>
        <DialogueBoxLeft text="こんにちは！" />
        <DialogueBoxRight text="こんにちは！" />
      </div>

      {/* 3. 選択肢ボタン */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <ChoiceButton text="なんでやねん！" />
        <ChoiceButton text="どういうことやねん！" />
        <ChoiceButton text="もうええわ！" />
      </div>

    </div>
  );
}

export default App;