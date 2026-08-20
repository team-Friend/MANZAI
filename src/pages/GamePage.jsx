import { Link } from "react-router-dom";

export default function GamePage() {
  return (
    <div>
      <h2>ゲーム中</h2>
      <p>キャラクター</p>

      <Link to="/result">
        <button>結果を見る</button>
      </Link>
    </div>
  );
}
