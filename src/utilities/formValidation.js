export default (callback) => {
  return (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formInputs = [...form.querySelectorAll('.form-control:not([data-key="description"])')];
    console.log(form);
    console.log(formInputs);
    // If form is valid, trigger callback
    const isFormValid = formInputs.reduce((accumulator, currentInput) => {
      const isInputValid = validateInput(currentInput);
      return accumulator && isInputValid;
    }, true);

    console.log(isFormValid);
    // If input is valid return true
    if (isFormValid) callback();
  };
};

export const validateInput = (input) => {
  console.log(input);
  console.log(input.validity);
  const { value: inputValue, key, subKey } = { ...input, ...input.dataset };
  const errorContainer = input.parentElement.querySelector('.error-message');
  const { pattern, error } = inputs[subKey ? subKey : input.name];
  console.log(inputValue);
  console.log(typeof inputValue);
  console.log(pattern);
  const isInputValid = pattern.test(inputValue);
  errorContainer.textContent = isInputValid ? '' : error;
  return isInputValid;
};

const inputs = {
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
    error: `Company name must be at least 1 character long. Exclude these special characters: $%^*[]{}|\\:;"'<>,?/`,
  },
  phone: {
    pattern: /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
    error:
      'Phone number must contain at least 10 digits. Acceptable numbers: (123) 456-7890, 1234567890, 123.456.7890',
  },
  email: {
    pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}/,
    error: 'Please enter a valid email address.',
  },
  month: {
    pattern: /^(\d|Present){1,2}/,
    error: 'MONTH Do not leave blank; date format will be MMM-YYYY',
  },
  year: {
    pattern: /^(\d){4}/,
    error: 'YEAR Do not leave blank; date format will be MMM-YYYY',
  },
  description: {
    pattern: /^(.){3,100}/,
    error: 'Description must be at least 3 characters long and not exceed 100 characters.',
  },
  degree: {
    pattern: /a/,
    error: '',
  },
  schoolName: {
    pattern: /a/,
    error: '',
  },
};
