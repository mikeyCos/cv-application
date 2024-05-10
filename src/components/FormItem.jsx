import stringToSentenceCase from '../utilities/stringToSentenceCase';

export default function FormItem({ type = 'text', dataAttributes, ...rest }) {
  const { id, value, name, onChange, children } = rest;
  return (
    <li className="form-item">
      <label htmlFor={id}>{stringToSentenceCase(name)}:</label>
      <input
        id={id}
        value={value}
        type={type}
        name={name}
        onChange={onChange}
        {...dataAttributes}
      />
      {children}
    </li>
  );
}
