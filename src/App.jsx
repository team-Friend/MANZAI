import React from 'react';
import { DialogueBoxLeft } from './components/DialogueBoxLeft';
import { DialogueBoxRight } from './components/DialogueBoxRight';
import './App.css'; 

function App() {
  return (
    <div style={{ backgroundColor: '#222', padding: '50px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ color: 'white', fontFamily: 'sans-serif' }}>吹き出しテスト</h1>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', width: '100%', marginTop: '50px' }}>
        <DialogueBoxLeft text="テストメッセージ1（左）" />
        <DialogueBoxRight text="テストメッセージ2（右）" />
      </div>
    </div>
  );
}

export default App;