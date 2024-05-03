import { useState } from 'react';
import Header from './Header';
import Contact from './Contact';
import Education from './Education';
import Skills from './Skills';
import Work from './Work';
import References from './References';
import Button from './Button';
import Form from './Form';
import '../styles/app.css';

export default function App() {
  const [isEditing, setIsEditing] = useState(false);
  const editHandler = () => setIsEditing(!isEditing);
  const buttonProps = isEditing
    ? { type: 'submit', className: 'cv_submit', text: 'Submit CV' }
    : { type: 'button', className: 'cv_edit', text: 'Edit CV' };

  return (
    <div className="app">
      <Button {...buttonProps} clickHandler={editHandler} />
      <Header isEditing={isEditing} />
      {/* <Contact />
      <Education />
      <Skills />
      <Work />
      <References /> */}
    </div>
  );
}
