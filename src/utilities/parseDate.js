export default ({ month, year }) => {
  // Parses date, YYYY-MM, to MMM YYYY
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

  if (month === 'Present') return month;
  const index = month - 1;
  return `${months[index]}/${year}`;
};
