import { useState, useRef } from 'react';
import Header from './Header';
import Contact from './Contact';
import Education from './Education';
import Skills from './Skills';
import Work from './Work';
import References from './References';
import Button from './Button';
import validateForms from '../utilities/formValidation';
import Modal from './Modal';
import Help from './Help';
import Footer from './Footer';
import '../styles/app.css';
import '../styles/form.css';

export default function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [modal, setModal] = useState(false);
  const deleteRef = useRef();
  const editHandler = () => {
    setIsEditing(!isEditing);
  };

  const buttonProps = isEditing
    ? { type: 'submit', className: 'cv-submit', text: 'Submit CV' }
    : { className: 'cv-edit', text: 'Edit CV' };

  return (
    <div className="app" data-is-editing={isEditing}>
      <div className="content">
        <Button
          {...buttonProps}
          onClick={
            !isEditing
              ? editHandler
              : () => {
                  validateForms(setIsEditing);
                }
          }
        />
        <Header isEditing={isEditing} />
        <Contact isEditing={isEditing} />
        <Education isEditing={isEditing} setModal={setModal} deleteRef={deleteRef} />
        <Skills isEditing={isEditing} setModal={setModal} deleteRef={deleteRef} />
        <Work isEditing={isEditing} setModal={setModal} deleteRef={deleteRef} />
        <References isEditing={isEditing} setModal={setModal} deleteRef={deleteRef} />
        {isEditing && (
          <>
            <Help></Help>
            <Modal
              openModal={modal}
              closeModal={() => setModal(false)}
              {...deleteRef.current}
            ></Modal>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
