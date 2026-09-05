import { Link, useLocation } from "react-router-dom";
import kannpeki from "../assets/images/kannpeki.png";
import { getAudienceGaugeProgress } from "../gameLogic";
import "./ResultPage.css";

export default function ResultPage() {
  const { state } = useLocation();
  const finalScore = Math.round(
    getAudienceGaugeProgress({
      totalScore: state?.audienceScore,
      totalProblems: state?.totalProblems,
    }),
  );

  return (
    <div>
      <h2>結果</h2>
      <p>あなたのスコア: {finalScore}</p>
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
