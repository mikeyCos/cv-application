export default function setInputEventHandler(data, callback, isDefaultOn) {
  return (e) => {
    const input = e.target;
    return isDefaultOn
      ? callback({
          ...data,
          [input.name]: { ...data[input.name], value: input.value },
        })
      : callback(input.dataset.id, input.value);
  };
}
