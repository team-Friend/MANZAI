export default function DialogueBox({ text, side }) {
  return <div className={`dialogue ${side}`}>{text}</div>;
}
