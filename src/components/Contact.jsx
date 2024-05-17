import { useState } from 'react';
import { contact as initialContactState } from '../data/data.initialStates';
import FormItem from './FormItem';
import Button from './Button';
import { validateForm } from '../utilities/formValidation';
import '../styles/contact.css';

export default function Contact({ isEditing }) {
  const [contactData, setContactData] = useState({
    ...initialContactState,
  });

  const onChangeHandler = (e) => {
    const input = e.currentTarget;
    const value = input.value;
    const prop = input.name;

    setContactData({
      ...contactData,
      [prop]: value,
    });
  };

  return (
    <section className="contact">
      <div>
        <h2>Contact</h2>
        {isEditing ? (
          <form noValidate={true} onSubmit={(e) => validateForm(e)}>
            <ul>
              <FormItem
                id="contact_email"
                value={contactData.email}
                type="email"
                name="email"
                onChange={onChangeHandler}
                placeholder="some@email.com"
                label={{ text: '**' }}
              />

              <FormItem
                id="contact_phone"
                value={contactData.phone}
                type="tel"
                name="phone"
                onChange={onChangeHandler}
                placeholder="ex. 123-456-7777"
                label={{ text: '**' }}
              />
              <FormItem
                id="contact_address"
                value={contactData.address}
                type="text"
                name="address"
                onChange={onChangeHandler}
                placeholder="ex. 999 Anywhere St., Apt 555, Medford MA 02155"
                label={{ text: '**' }}
              />
            </ul>
          </form>
        ) : (
          <ul>
            <li>Email: {contactData.email}</li>
            <li>Phone: {contactData.phone}</li>
            <li>Address: {contactData.address}</li>
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
