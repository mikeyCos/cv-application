export default function Button({ type = 'button', text, className, onClick, id, dataAttributes }) {
  return (
    <button className={className} type={type} onClick={onClick} data-id={id} {...dataAttributes}>
      <span className="btn-text">{text}</span>
    </button>
  );
}
