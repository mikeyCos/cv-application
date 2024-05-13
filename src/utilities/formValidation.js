export default (callback) => {
  return (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formInputs = [...form.querySelectorAll('input')];
    console.log(form);
    // If form is valid, trigger callback
    const isFormValid = formInputs.every(validateInput);
    if (isFormValid) {
      callback();
    }
  };
};

const validateInput = (input) => {
  console.log(input);
  console.log(input.validity);
  return false;
};

const something = {
  // skill: {
  //     pattern:
  // }
};
