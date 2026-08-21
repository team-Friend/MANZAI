import { Link } from "react-router-dom";
import bgImage from "../assets/images/stage1.png";
import tukkomi from "../assets/images/tukkomi.png";
import boke from "../assets/images/boke.png";
import mic from "../assets/images/mic.png";
import "./GamePage.css";

export default function GamePage() {
  return (
    <div className="game-page">
      <div className="stage-shell">
        <img src={bgImage} className="stage-background" alt="stage background" />

        <div className="game-content">
          <img src={boke} className="character boke" alt="boke" />
          <img src={tukkomi} className="character tukkomi" alt="tukkomi" />
          <img src={mic} className="character mic" alt="microphone" />

          <Link to="/result" className="result-link">
            <button type="button">結果を見る</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
