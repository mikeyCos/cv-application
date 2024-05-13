import stringToSentenceCase from '../utilities/stringToSentenceCase';

export default function FormItem({ type = 'text', dataAttributes, label, props, ...rest }) {
  const { id, value, name, onChange, placeholder, children } = rest;
  const { text: additionalText, className } = label ? label : {};
  return (
    <li className="form-item">
      <label htmlFor={id} className={className}>
        {stringToSentenceCase(name)}
        {additionalText && <span> {additionalText}</span>}:
      </label>
      <input
        id={id}
        value={value}
        type={type}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
        {...dataAttributes}
      />
      {children}
    </li>
  );
}
