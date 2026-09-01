import { Link } from "react-router-dom";
import kannpeki from "../assets/images/kannpeki.png";
import "./ResultPage.css";

export default function ResultPage() {
  return (
    <div>
      <h2>結果</h2>
      <p>あなたのスコア: 80</p>
      <img src={kannpeki} alt="完璧" className="kannpeki-image" />
      <Link to="/">
        <button>タイトルへ</button>
      </Link>
      <Link to="/game">
        <button>もう一度</button>
      </Link>
    </div>
  );
}
