import { useState } from 'react';
import Form from './Form';
import setInputProps from '../utilities/setInputProps';
import setInputEventHandler from '../utilities/setInputEventHandler';
import '../styles/contact.css';

export default function Contact({ isEditing }) {
  const [contactData, setContactData] = useState({
    email: { id: 0, value: '', type: 'email' },
    phone: { id: 1, value: '', type: 'tel' },
    address: { id: 2, value: '' },
  });

  const onChangeHandler = setInputEventHandler(contactData, setContactData, true);
  const propsForInputs = isEditing && setInputProps(contactData);

  return (
    <section className="contact">
      <div>
        <h2>Contact</h2>
        {isEditing ? (
          <Form props={[{ inputs: propsForInputs, onChangeHandler: onChangeHandler }]} />
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
