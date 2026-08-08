import React from 'react';
import { DialogueBoxLeft } from './components/DialogueBoxLeft';
import { DialogueBoxRight } from './components/DialogueBoxRight';
import './App.css'; 

function App() {
  return (
    <div>
      <h1>吹き出し</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        <DialogueBoxLeft text="テストメッセージ1" />
        <DialogueBoxRight text="テストメッセージ2" />
      </div>
    </div>
  );
}

export default App;