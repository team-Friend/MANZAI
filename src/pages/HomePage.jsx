import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <h1>マンザイ</h1>

      <Link to="/game">
        <button>ゲーム開始</button>
      </Link>
    </div>
  );
}
