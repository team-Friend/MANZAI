import Background from "./Background";
import Character from "./Character";
import DialogueBox from "./DialogueBox";
import ChoiceButtons from "./Buttons";
import TimingBar from "./TimingBar";
import "./Stage.css";

export default function Stage() {
  return (
    <div className="stage">
      <Background />

      <Character side="left" />
      <Character side="right" />

      <DialogueBox side="left" text="朝、起きたら..." />
      <DialogueBox side="right" text="..." />

      <ChoiceButtons />

      <TimingBar />
    </div>
  );
}
