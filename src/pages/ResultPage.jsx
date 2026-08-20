import { Link } from "react-router-dom";

export default function ResultPage() {
  return (
    <div>
      <h2>結果</h2>
      <p>あなたのスコア: 80</p>
      <Link to="/">
        <button>タイトルへ</button>
      </Link>
      <Link to="/game">
        <button>もう一度</button>
      </Link>
    </div>
  );
}
