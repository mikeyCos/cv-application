export default function Button({ type = 'button', text, className, clickHandler, id }) {
  console.log(id);
  return (
    <button className={className} type={type} onClick={clickHandler} data-id={id}>
      <span className="btn-text">{text}</span>
    </button>
  );
}
