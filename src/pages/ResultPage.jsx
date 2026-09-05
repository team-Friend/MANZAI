import { Link, useLocation } from "react-router-dom";
import kanpeki from "../assets/images/kanpeki.png";
import { getAudienceGaugeProgress, getResultLevel } from "../gameLogic";
import "./ResultPage.css";
import hutuu from "../assets/images/hutuu.png";
import uwo from "../assets/images/uwo.png";
import sainounasi from "../assets/images/sainounasi.png";

const resultImages = {
  kanpeki: {
    src: kanpeki,
    alt: "完璧",
  },
  hutuu: {
    src: hutuu,
    alt: "普通",
  },
  uwo: {
    src: uwo,
    alt: "うお",
  },
  sainounasi: {
    src: sainounasi,
    alt: "才能なし",
  },
};

export default function ResultPage() {
  const { state } = useLocation();
  const finalScore = Math.round(
    getAudienceGaugeProgress({
      totalScore: state?.audienceScore,
      totalProblems: state?.totalProblems,
    }),
  );
  const resultImage = resultImages[getResultLevel(finalScore)];

  return (
    <div>
      <h2>結果</h2>
      <p>あなたのスコア: {finalScore}</p>
      <img
        src={resultImage.src}
        alt={resultImage.alt}
        className="result-image"
      />
      <Link to="/">
        <button>タイトルへ</button>
      </Link>
      <Link to="/game">
        <button>もう一度</button>
      </Link>
    </div>
  );
}
