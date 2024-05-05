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
  console.log(inputs);
  return (
    <ul>
      {inputs.map((input) => {
        return (
          <li key={input.id}>
            <Input input={input} onChangeHandler={input.onChangeHandler} />
          </li>
        );
      })}
      {button && <Button {...button} />}
    </ul>
  );
}

export default function Form({ props, className }) {
  console.log(props);
  console.log(Object.entries(props));
  return (
    <form className={className}>
      {Object.entries(props).map(([key, set]) => {
        return <FormItemList key={key} inputs={set.inputs} button={set.button} />;
      })}
    </form>
  );
}
