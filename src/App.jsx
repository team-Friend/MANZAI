import { Routes, Route, Link } from "react-router-dom";

function TitleScreen() {
  return (
    <div>
      <h1>タイトル</h1>
      <Link to="/game">ゲーム開始</Link>
    </div>
  );
}

function GameScreen() {
  return (
    <div>
      <h2>ゲーム画面</h2>
      <Link to="/result">結果へ</Link>
    </div>
  );
}

function ResultScreen() {
  return (
    <div>
      <h2>結果画面</h2>
      <Link to="/">タイトルへ</Link>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TitleScreen />} />
      <Route path="/game" element={<GameScreen />} />
      <Route path="/result" element={<ResultScreen />} />
    </Routes>
  );
}
