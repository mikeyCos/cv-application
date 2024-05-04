import { cloneElement } from 'react';
import Button from './Button';

function Inputs({ inputs, button, onChangeHandler }) {
  return inputs.map((input) => {
    return (
      <div key={input.id} className="form-item">
        <label htmlFor={input.name}>{input.label}</label>
        <input
          id={input.name}
          data-id={input.id}
          name={input.name}
          type={input.type}
          value={input.value}
          onChange={onChangeHandler}
        />
        {button && <Button {...{ ...button, id: input.id }} />}
        {/* {button} */}
      </div>
    );
  });
}

export default function Form({ props }) {
  // const newElement = children && cloneElement(children[0], { foo: '0' });
  return (
    <form>
      {/* {inputs.map((input) => {
        return (
          <div className="form-item" key={input.id}>
            <label htmlFor={input.name}>{input.label}:</label>
            <input
              id={input.name}
              name={input.name}
              type={input.type}
              value={input.value}
              onChange={onChangeHandler}
            ></input>
          </div>
        );
      })} */}

      {props.map((prop) => {
        return (
          <Inputs
            key={prop.id}
            inputs={prop.inputs}
            button={prop.button}
            onChangeHandler={prop.onChangeHandler}
          />
        );
      })}
    </form>
  );
}
