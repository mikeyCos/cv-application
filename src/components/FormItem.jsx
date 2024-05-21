import Input from './Input';
import Select from './Select';
import Textarea from './Textarea';
import stringToSentenceCase from '../utilities/stringToSentenceCase';
import { validateInput } from '../utilities/formValidation';

export default function FormItem({
  tag = false,
  type = 'text',
  dataAttributes,
  label,
  props,
  ...rest
}) {
  const { id, value, name, onBlur, onChange, placeholder, children } = rest;
  const { text: additionalText, className } = label ? label : {};
  // const [button, list] = children;
  let formControl;
  // How can I refactor this?
  if (tag === 'select') {
    formControl = (
      <Select
        id={id}
        value={value}
        name={name}
        onChange={onChange}
        dataAttributes={dataAttributes}
      />
    );
  } else if (tag === 'textarea') {
    formControl = (
      <Textarea
        id={id}
        value={value}
        type={type}
        name={name}
        onBlur={validateInput}
        onChange={onChange}
        onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
        placeholder={placeholder}
        dataAttributes={dataAttributes}
        props={props}
      />
    );
  } else {
    formControl = (
      <Input
        id={id}
        value={value}
        type={type}
        name={name}
        onBlur={validateInput}
        onChange={onChange}
        onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
        placeholder={placeholder}
        dataAttributes={dataAttributes}
      />
    );
  }

  return (
    <li className="form-item">
      <label htmlFor={id} className={className}>
        {stringToSentenceCase(name)}
        {additionalText && <span>{additionalText}</span>}
      </label>
      {formControl}
      {children && children.length > 0 ? children[0] : children}
      <div className="error-message"></div>
      {children && children.length > 0 && children[1]}
    </li>
  );
}
