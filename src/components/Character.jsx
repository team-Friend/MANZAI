export default function Character({ side }) {
  return (
    <img className={`character ${side}`} src={`/images/${side}.png`} alt="" />
  );
}
