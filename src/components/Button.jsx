export default function Button({
  type = 'button',
  text,
  className,
  clickHandler,
  id,
  dataAttributes,
}) {
  return (
    <button
      className={className}
      type={type}
      onClick={clickHandler}
      data-id={id}
      {...dataAttributes}
    >
      <span className="btn-text">{text}</span>
    </button>
  );
}
