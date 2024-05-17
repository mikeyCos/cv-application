import '../styles/textarea.css';
export default function Textarea({
  id,
  value,
  type,
  name,
  onChange,
  placeholder,
  dataAttributes,
  props,
}) {
  return (
    <textarea
      className="form-control"
      id={id}
      value={value}
      type={type}
      name={name}
      onChange={onChange}
      onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
      placeholder={placeholder}
      {...dataAttributes}
      {...props}
      spellCheck={true}
      rows={2}
      cols={30}
    />
  );
}
