import stringToSentenceCase from '../utilities/stringToSentenceCase';

export default function FormItem({
  defaultTag = true,
  type = 'text',
  dataAttributes,
  label,
  props,
  ...rest
}) {
  const { id, value, name, onChange, placeholder, children } = rest;
  const { text: additionalText, className } = label ? label : {};
  return (
    <li className="form-item">
      <label htmlFor={id} className={className}>
        {stringToSentenceCase(name)}
        {additionalText && <span> {additionalText}</span>}:
      </label>
      {defaultTag ? (
        <input
          className="form-control"
          id={id}
          value={value}
          type={type}
          name={name}
          onChange={onChange}
          onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
          placeholder={placeholder}
          {...props}
          {...dataAttributes}
        />
      ) : (
        <select
          className="form-control"
          id={id}
          value={value}
          name={name}
          onChange={onChange}
          {...dataAttributes}
        >
          {selectOptions.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            );
          })}
        </select>
      )}
      <div className="error-message"></div>
      {children}
    </li>
  );
}

const selectOptions = [
  { value: '', text: 'Select month' },
  { value: 'Present', text: 'Present' },
  { value: 1, text: 'January' },
  { value: 2, text: 'February' },
  { value: 3, text: 'March' },
  { value: 4, text: 'April' },
  { value: 5, text: 'May' },
  { value: 6, text: 'June' },
  { value: 7, text: 'July' },
  { value: 8, text: 'August' },
  { value: 9, text: 'September' },
  { value: 10, text: 'October' },
  { value: 11, text: 'November' },
  { value: 12, text: 'December' },
];

// const selectOptions = [
//   '',
//   'Present',
//   'January',
//   'February',
//   'March',
//   'April',
//   'May',
//   'June',
//   'July',
//   'August',
//   'September',
//   'October',
//   'November',
//   'December',
// ];
