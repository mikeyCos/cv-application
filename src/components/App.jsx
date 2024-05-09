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
  const editHandler = () => setIsEditing(!isEditing);
  const buttonProps = isEditing
    ? { type: 'submit', className: 'cv-submit', text: 'Submit CV' }
    : { type: 'button', className: 'cv-edit', text: 'Edit CV' };

  return (
    <div className="app">
      <Button {...buttonProps} clickHandler={editHandler} />
      {/* <Header isEditing={isEditing} /> */}
      {/* <Contact isEditing={isEditing} /> */}
      {/* <Education isEditing={isEditing} /> */}
      <Skills isEditing={isEditing} />
      {/* <Work isEditing={isEditing} /> */}
      {/* <References isEditing={isEditing} /> */}
    </div>
  );
}
