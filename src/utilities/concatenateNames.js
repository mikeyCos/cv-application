export default function concatenateNames(firstName, lastName) {
  // firstName and lastName must be passed
  return firstName + (firstName.length > 0 && lastName.length > 0 ? ' ' + lastName : lastName);
}
