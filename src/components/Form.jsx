import Button from './Button';

function Input({ input, onChangeHandler }) {
  return (
    <>
      <label htmlFor={input.name}>{input.label}</label>
      <input
        id={input.name}
        data-id={input.id}
        name={input.name}
        type={input.type}
        value={input.value}
        onChange={onChangeHandler}
      />
      {input.button && <Button {...input.button} />}
    </>
  );
}

function FormItemList({ inputs, button }) {
  return (
    <ul>
      {inputs.map((input, index) => {
        return (
          <li key={index}>
            {/* Is it safe to use index for key since the children of an ul will be static? */}
            <Input input={input} onChangeHandler={input.onChangeHandler} />
          </li>
        );
      })}
      {button && <Button {...button} />}
    </ul>
  );
}

export default function Form({ props, className }) {
  const { default: defaultProps, set: setProps } = props;
  return (
    <form className={className}>
      <FormItemList inputs={defaultProps.inputs} button={defaultProps.button} />
      {setProps &&
        [...setProps.inputs].map((set) => {
          return (
            <FormItemList
              key={set.id}
              inputs={set.inputs}
              button={{ id: set.id, ...setProps.button }}
            />
          );
        })}
    </form>
  );
}
