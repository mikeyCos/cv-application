import { useState } from 'react';
import Header from './Header';
import Contact from './Contact';
import Education from './Education';
import Skills from './Skills';
import Work from './Work';
import References from './References';
import Button from './Button';
import '../styles/app.css';

export default function App() {
  const [isEditing, setIsEditing] = useState(false);
  const editHandler = () => {
    setIsEditing(!isEditing);
  };

  const validateForms = () => {
    console.log('check firing!');
    if (areFormsValid() && isEditing) {
      setIsEditing(!isEditing);
    }
  };

  console.log(isEditing);

  const buttonProps = isEditing
    ? { type: 'submit', className: 'cv-submit', text: 'Submit CV' }
    : { type: 'button', className: 'cv-edit', text: 'Edit CV' };

  return (
    <div className="app">
      <Button {...buttonProps} onClick={!isEditing ? editHandler : validateForms} />
      <Header isEditing={isEditing} />
      <Contact isEditing={isEditing} />
      <Education isEditing={isEditing} />
      <Skills isEditing={isEditing} />
      <Work isEditing={isEditing} />
      <References isEditing={isEditing} />
    </div>
  );
}

const areFormsValid = () => {
  const forms = document.querySelectorAll('form');

  console.log(forms);

  // Return true if all form inputs are valid
  // Return false if a form input is invalid
  return false;
};
