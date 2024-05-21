import { useState, useRef } from 'react';
import Controls from './Controls';
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
import Delete from './Delete';
import Footer from './Footer';
import '../styles/app.css';
import '../styles/form.css';
import '../styles/icons.css';

export default function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalHelp, setModalHelp] = useState(false);
  const deleteRef = useRef();
  const btnRef = useRef();
  const editHandler = () => {
    setIsEditing(!isEditing);
  };

  const buttonProps = isEditing
    ? { type: 'submit', className: 'cv-submit', text: 'Submit CV' }
    : { className: 'cv-edit', text: 'Edit CV' };

  return (
    <div className="app" data-is-editing={isEditing}>
      <Controls openModal={modalHelp} setModal={setModalHelp} btnRef={btnRef}>
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
      </Controls>
      <div className="content">
        <Header isEditing={isEditing} />
        <Contact isEditing={isEditing} />
        <Education
          isEditing={isEditing}
          setModal={setModalDelete}
          deleteRef={deleteRef}
          btnRef={btnRef}
        />
        <Skills
          isEditing={isEditing}
          setModal={setModalDelete}
          deleteRef={deleteRef}
          btnRef={btnRef}
        />
        <Work
          isEditing={isEditing}
          setModal={setModalDelete}
          deleteRef={deleteRef}
          btnRef={btnRef}
        />
        <References
          isEditing={isEditing}
          setModal={setModalDelete}
          deleteRef={deleteRef}
          btnRef={btnRef}
        />
        {isEditing && (
          <Modal
            btnRef={btnRef}
            className="modal-delete"
            openModal={modalDelete}
            closeModal={() => setModalDelete(false)}
          >
            <Delete
              btnRef={btnRef}
              closeModal={() => setModalDelete(false)}
              {...deleteRef.current}
            />
          </Modal>
        )}
        <Modal
          btnRef={btnRef}
          className="modal-help"
          openModal={modalHelp}
          closeModal={() => setModalHelp(false)}
        >
          <Help closeModal={() => setModalHelp(false)} />
        </Modal>
      </div>
      <Footer />
    </div>
  );
}
