import { useEffect, useRef } from 'react';

export default function Modal({ btnRef, className, openModal, closeModal, children }) {
  const refDefault = useRef(null);
  // const btnBounds = btnRef.current && btnRef.current.getBoundingClientRect();
  // if (btnBounds) {
  // console.log(btnRef.current);
  // console.log(btnBounds);
  // }
  // Need to make use of ResizeObserver
  // const observer = new ResizeObserver(callback);
  // btnRef.current && observer.observe(btnRef.current);

  useEffect(() => {
    const observer = new ResizeObserver((entries) =>
      callback(entries, refDefault.current, btnRef.current),
    );
    if (openModal) {
      const content = document.querySelector('.content');
      observer.observe(content);
      refDefault.current?.showModal();
    } else {
      refDefault.current?.close();
    }

    return () => {
      observer.disconnect();
    };
  }, [btnRef, openModal]);
  return (
    <dialog
      style={
        // btnBounds &&
        {
          // transform: `translate(${btnBounds.x}px, ${btnBounds.bottom}px)`,
          // marginTop: `${btnBounds.bottom}px`,
          // marginRight: `${(window.innerWidth / btnBounds.x) * 10}%`,
          // marginLeft: 'auto',
        }
      }
      onClick={(e) => e.target.tagName === 'DIALOG' && closeModal()}
      onKeyDown={(e) => e.key === 'Escape' && closeModal()}
      className={className}
      ref={refDefault}
    >
      {children}
    </dialog>
  );
}

// This callback function will be used to update the dialog's x and y position
const callback = (entries, dialog, btnRef) => {
  for (let entry of entries) {
    if (entry.contentBoxSize) {
      if (entry.contentBoxSize[0]) {
        const targetBounds = entry.target.getBoundingClientRect();
        const btnBounds = btnRef.getBoundingClientRect();
        const dialogBounds = dialog.getBoundingClientRect();
        console.log(`content container bounds:`);
        console.log(targetBounds);
        console.log(`dialog container bounds:`);
        console.log(dialogBounds);
        console.log(`btn container bounds:`);
        console.log(btnBounds);
        dialog.style.transform = `translateY(${btnBounds.bottom + 8}px)`;
      }
    }
  }
};
