import inputPatternErrors from '../data/data.inputPatternErrors';

export default (callback) => {
  const forms = [...document.querySelectorAll('form:not(.no-validate-all)')];
  const areFormsValid = forms.reduce((accumulator, currentForm) => {
    const isFormValid = validateForm(currentForm);
    return accumulator && isFormValid;
  }, true);

  if (areFormsValid && callback) callback(false);
};

export const validateForm = (e, callback) => {
  if (e.target) e.preventDefault();
  const form = e.nodeType ? e : e.currentTarget;
  const formInputs = [...form.querySelectorAll('.form-control:not([data-key="description"])')];
  // If form is valid, trigger callback
  const isFormValid = formInputs.reduce((accumulator, currentInput) => {
    const isInputValid = validateInput(currentInput);
    return accumulator && isInputValid;
  }, true);

  return isFormValid && callback ? callback() : isFormValid;
};

export const validateInput = (input) => {
  const inputValue = input.value;
  const { key, subKey } = { ...input.dataset };
  const errorContainer = input.parentElement.querySelector('.error-message');
  const { pattern, error } = inputPatternErrors[subKey ? subKey : input.name];
  const isInputValid = pattern.test(inputValue);
  errorContainer.textContent = isInputValid ? '' : error;
  return isInputValid;
};
