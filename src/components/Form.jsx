export default function Form({ inputs, onChangeHandler }) {
  console.log(inputs);
  return (
    <form>
      {inputs.map((input) => {
        return (
          <div className="form_item" key={input.id}>
            <label>{input.label}:</label>
            <input
              name={input.name}
              type={input.type}
              value={input.value}
              onChange={onChangeHandler}
            ></input>
          </div>
        );
      })}
    </form>
  );
}
