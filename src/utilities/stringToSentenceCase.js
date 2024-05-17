export default function stringToSentenceCase(string) {
  // Splits key into words/characters that start with a uppercase
  // keysToSentenceCase('firstName'); returns 'First name'
  const wordRegex = /[A-Z]?[a-z]+|[0-9]+|[A-Z]+(?![a-z])/g;
  const newString = string.match(wordRegex).join(' ').toLowerCase();
  return newString[0].toUpperCase() + newString.substring(1);
}
