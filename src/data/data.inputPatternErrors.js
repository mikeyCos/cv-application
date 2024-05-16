export default {
  skill: {
    pattern: /^[A-Za-z]{3,}(?: [A-Za-z]{3,})*/,
    error:
      'Words must be at least 3 characters long. Exclude special characters, leading and trailing spaces.',
  },
  firstName: {
    pattern: /^[a-zA-Z\xC0-\uFFFF]{2,}([ \-']{0,1}[a-zA-Z\xC0-\uFFFF]+){0,2}[.]{0,1}$/,
    error:
      'First name must be at least 2 characters long. Exclude special characters, leading and trailing spaces.',
  },
  lastName: {
    pattern: /^[a-zA-Z\xC0-\uFFFF]{2,}([ \-']{0,1}[a-zA-Z\xC0-\uFFFF]+){0,2}[.]{0,1}$/,
    error:
      'Last name must be at least 2 characters long. Exclude special characters, leading and trailing spaces.',
  },
  jobTitle: {
    pattern: /^[A-Za-z]{3,}(?: [A-Za-z]{3,})*/,
    error:
      'Job title must be at least 3 characters long. Exclude special characters, leading and trailing spaces.',
  },
  companyName: {
    pattern: /^[a-zA-Z0-9-@.#&!()]+(\s[a-zA-Z0-9-@.#&!()]+)?(\s[a-zA-Z-@.#&!()]+)?$/,
    error: `Company name must be at least 1 character long. Exclude these special characters: "$%^*[]{}|\\:;"'<>,?/".`,
  },
  phone: {
    pattern: /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
    error:
      'Phone number must contain at least 10 digits. For example, (123) 456-7890, 1234567890, 123.456.7890.',
  },
  email: {
    pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}/,
    error: 'Please enter a valid email address.',
  },
  month: {
    pattern: /^(\d|Present){1,2}/,
    error: 'You must pick a selection.',
  },
  year: {
    pattern: /^(\d){4}/,
    error: 'Year must be only 4 digits long. For example, 1941.',
  },
  description: {
    pattern: /^(.){3,100}/,
    error: 'Description must be at least 3 characters long and not exceed 100 characters.',
  },
  degree: {
    pattern: /^(.)[^<>]{10,80}/,
    error: 'Degree must be at least 10 characters long and not exceed 80 characters.',
  },
  schoolName: {
    pattern: /^(.)[^<>]{5,80}/,
    error: 'School name must be at least 5 characters long and not exceed 80 characters.',
  },
  address: {
    pattern: /[A-Za-z0-9'.\-\s,]{10,70}/,
    error:
      'Address must be at least 10 characters long, and not exceed 70 characters. For example, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678.',
  },
};
