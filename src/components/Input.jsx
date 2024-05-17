export default function Input({ id, value, type, name, onChange, placeholder, dataAttributes }) {
  return (
    <input
      className="form-control"
      id={id}
      value={value}
      type={type}
      name={name}
      onChange={onChange}
      onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
      placeholder={placeholder}
      {...dataAttributes}
    />
  );
}
