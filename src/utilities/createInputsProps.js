import keyToSentenceCase from './keysToSentenceCase';

export default function createInputsProps(root, options) {
  // Data and options must be objects
  // Options, incase certain inputs need to be a different type
  // return Object.entries(root).map(([key, value]) => {
  // console.log(key);
  // return Object.entries(data).map(([key, value]) => {
  // if (typeof value === 'object') {
  //   const input = value.data;
  //   return {
  //     ...options,
  //     ...input,
  //     label: isNaN(+key) ? keyToSentenceCase(key) : options.name + input.id,
  //     name: isNaN(+key) ? key : options.name + input.id,
  //     type: !input.type ? 'text' : input.type,
  //     // ...(options && options.className && { className: options.className }),
  //   };
  // }
  // console.log(value);
  // return {
  //   ...options,
  //   ...value,
  //   label: isNaN(+key) ? keyToSentenceCase(key) : options.name + value.id,
  //   name: isNaN(+key) ? key : options.name + value.id,
  //   type: !value.type ? 'text' : value.type,
  //   // ...(options && options.className && { className: options.className }),
  // };
  // });

  if (Array.isArray(root)) {
    // return root.reduce((accumulator, currentValue) => {
    //   return [...accumulator, ...createInputsProps(currentValue, options)];
    // }, []);
    return root.reduce((accumulator, currentValue) => {
      return [
        ...accumulator,
        { id: currentValue.id, inputs: createInputsProps(currentValue, options) },
      ];
    }, []);
  }

  const data = (({ id, ...rest }) => rest)(root);
  // console.log(root);
  return Object.entries(data).map(([key, value]) => {
    // console.log(key);
    // console.log(value);
    return {
      ...options,
      ...value,
      id: !isNaN(root.id) ? root.id : key,
      label: keyToSentenceCase(key),
      name: !isNaN(root.id) ? `${key}_${root.id}` : key,
      type: !value.type ? 'text' : value.type,
      // ...(options && options.className && { className: options.className }),
    };
  });
}
