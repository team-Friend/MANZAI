import { Link } from "react-router-dom";
import { ChoiceButton } from "../components/ChoiceButton";
import "./HomePage.css";

const stageButtons = [
  { id: 1, label: "第1ステージ", to: "/game", locked: false },
  { id: 2, label: "第2ステージ", to: "/game", locked: false },
  { id: 3, label: "🔒", to: "", locked: true },
  { id: 4, label: "🔒", to: "", locked: true },
];

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="home-stage-panel">
        {stageButtons.map((stage) => {
          const button = (
            <ChoiceButton
              text={stage.label}
              className="home-stage-btn"
              disabled={stage.locked}
            />
          );

          if (stage.locked) {
            return <div key={stage.id}>{button}</div>;
          }

          return (
            <Link key={stage.id} to={stage.to} className="home-stage-link">
              {button}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
