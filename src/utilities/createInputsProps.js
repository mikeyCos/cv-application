import keyToSentenceCase from './stringToSentenceCase';

export default function createInputsProps(root, options) {
  if (Array.isArray(root)) {
    return root.reduce((accumulator, currentValue) => {
      return [
        ...accumulator,
        { id: currentValue.id, inputs: createInputsProps(currentValue, options) },
      ];
    }, []);
  }

  const data = (({ id, ...rest }) => rest)(root);
  console.log(data);
  console.log(root);
  return Object.entries(data).map(([key, value]) => {
    console.log(value);
    return {
      ...options,
      ...value,
      // ...(typeof value !== 'object' ? { value } : value),
      id: !isNaN(root.id) ? root.id : key,
      label: keyToSentenceCase(key),
      name: !isNaN(root.id) ? `${key}_${root.id}` : key,
      type: !value.type ? 'text' : value.type,
      // ...(options && options.className && { className: options.className }),
    };
  });
}
