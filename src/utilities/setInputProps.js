import keyToSentenceCase from './keysToSentenceCase';

export default function setInputProps(data, options) {
  // Data and options must be objects
  // Options, incase certain inputs need to be a different type
  return Object.keys(data).map((key) => {
    const info = data[key];
    return {
      ...info,
      label: keyToSentenceCase(key),
      name: key,
      type: 'text',
      ...(options && options[key]),
    };
  });
}
