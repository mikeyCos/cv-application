import { useState } from 'react';
import Form from './Form';
import createInputsProps from '../utilities/createInputsProps';
import setInputEventHandler from '../utilities/setInputEventHandler';
import '../styles/contact.css';

export default function Contact({ isEditing }) {
  const [contactData, setContactData] = useState({
    email: { id: 0, value: '', type: 'email' },
    phone: { id: 1, value: '', type: 'tel' },
    address: { id: 2, value: '' },
  });

  const onChangeHandler = (e) => {
    console.log('onChangeHandler firing!');
    console.log(e.currentTarget);
  };

  const formProps = isEditing && {
    default: {
      inputs: [...createInputsProps(contactData, { onChangeHandler })],
    },
  };

  return (
    <section className="contact">
      <div>
        <h2>Contact</h2>
        {isEditing ? (
          <Form className="form_contact" props={formProps} />
        ) : (
          <ul>
            <li>Email: {contactData.email.value}</li>
            <li>Phone: {contactData.phone.value}</li>
            <li>Address: {contactData.address.value}</li>
          </ul>
        )}
      </div>
    </section>
  );
}

/*
Email: placeholder@email.com
Phone: (000) 123-4567
Address: 123 Something St., City, State
*/
