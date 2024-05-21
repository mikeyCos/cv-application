import Button from './Button';
import '../styles/help.css';

export default function Help({ closeModal, ...rest }) {
  return (
    <div className="help-container">
      <Button text="&#10799;" onClick={closeModal} />
      <div>
        <p>
          Get started by clicking on &apos;<span>Edit CV</span>&apos; button, and fill out inputs in
          each section as needed.
        </p>
        <p>
          Before clicking the &apos;<span>Submit CV</span>&apos; button, labels denoted with two
          asterisks (<span>**</span>) require the input to be filled appropriately.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur perferendis ut officia
          magnam consectetur hic fugiat excepturi ea, distinctio sit numquam quod dicta.
        </p>
      </div>
    </div>
  );
}
