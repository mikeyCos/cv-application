export default function Select({ id, value, name, onChange, dataAttributes }) {
  return (
    <select
      className="form-control"
      id={id}
      value={value}
      name={name}
      onChange={onChange}
      {...dataAttributes}
    >
      {options[dataAttributes['data-sub-key']].map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        );
      })}
    </select>
  );
}

const options = {
  month: [
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
  ],
};
