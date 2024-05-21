import Button from './Button';
import '../styles/delete.css';

export default function Delete({ closeModal, btnRef, ...rest }) {
  const { btn, callback, message } = rest;
  return (
    <div className="delete-container">
      {message}
      <div className="btn-container">
        <Button text="Cancel" onClick={closeModal} />
        <Button
          text="Confirm"
          onClick={() => {
            callback(btn);
            closeModal();
          }}
        />
      </div>
    </div>
  );
}
