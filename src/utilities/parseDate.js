export default (date) => {
  // Parses date, YYYY-MM, to MMM YYYY
  // What if date is the current date?
  //  Return 'Present'?
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const splitDate = date.split('-').reduce((accumulator, currentValue) => {
    return { ...accumulator, [currentValue.length === 4 ? 'year' : 'month']: currentValue };
  }, {});
  const newDate = `${months[splitDate.month - 1]} ${splitDate.year}`;

  return newDate;
};
