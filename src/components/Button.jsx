export default function Button({ type = 'button', text, className, clickHandler }) {
  return (
    <button className={className} type={type} onClick={clickHandler}>
      <span className="btn_text">{text}</span>
    </button>
  );
}
