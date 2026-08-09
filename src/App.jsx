import React from 'react';
import { AudienceGauge } from './components/AudienceGauge';

function App() {
  return (
    <div style={{ backgroundColor: '#222', padding: '50px', minHeight: '100vh' }}>
      
      {/* 数字（score）を渡すだけで、長さが勝手に変わる！ */}
      <AudienceGauge score={10} />
      <AudienceGauge score={50} />
      <AudienceGauge score={100} />
      
    </div>
  );
}

export default App;