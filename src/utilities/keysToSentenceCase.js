export default function keyToSentenceCase(key) {
  // Splits key into words/characters that start with a uppercase
  // keysToSentenceCase('firstName'); returns 'first Name'
  const wordRegex = /[A-Z]?[a-z]+|[0-9]+|[A-Z]+(?![a-z])/g;
  return key.match(wordRegex).join(' ');
}
