import { useEffect, useRef } from 'react';
import Button from './Button';

export default function Modal({ openModal, closeModal, ...rest }) {
  const ref = useRef();
  const { btn, callback } = rest;
  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog ref={ref} onCancel={closeModal}>
      <Button text="Cancel" onClick={closeModal} />
      <Button
        text="Confirm"
        onClick={() => {
          callback(btn);
          closeModal();
        }}
      />
    </dialog>
  );
}
