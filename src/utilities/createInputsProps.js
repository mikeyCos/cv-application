import keyToSentenceCase from './keysToSentenceCase';

export default function createInputsProps(data, options) {
  // Data and options must be objects
  // Options, incase certain inputs need to be a different type
  // Object.entries(data).map(([key, value]) => {
  //   console.log(key);
  //   console.log(value);

  // });
  // if (Array.isArray(data)) {
  //   console.log('data is an array');
  // } else {
  //   console.log('data is NOT an array');
  //   Object.entries(data).map(([key, value]) => {
  //     console.log(key);
  //     console.log(value);
  //   });
  // }
  // console.log(data);

  return Object.entries(data).map(([key, value]) => {
    return {
      ...options,
      ...value,
      label: isNaN(+key) ? keyToSentenceCase(key) : options.name + value.id,
      name: isNaN(+key) ? key : options.name + value.id,
      type: !value.type ? 'text' : value.type,
      // ...(options && options.className && { className: options.className }),
    };
  });

  // return Object.keys(data).map((key) => {
  //   const info = data[key];
  //   return {
  //     ...info,
  //     label: keyToSentenceCase(key),
  //     name: key,
  //     type: !info.type ? 'text' : info.type,
  //     ...(options && options[key]),
  //   };
  // });
}
