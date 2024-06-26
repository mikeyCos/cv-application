import { useState } from 'react';
import { contact as initialContactState } from '../data/data.initialStates';
import FormItem from './FormItem';
import { validateForm, validateInput } from '../utilities/formValidation';
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
    <section className="contact" data-is-editing={isEditing}>
      <div>
        <h2 className="content-heading">Contact</h2>
        {isEditing ? (
          <form noValidate={true} onSubmit={(e) => validateForm(e)}>
            <ul>
              <FormItem
                id="contact_email"
                value={contactData.email}
                type="email"
                name="email"
                onBlur={validateInput}
                onChange={onChangeHandler}
                placeholder="some@email.com"
                label={{ text: '**' }}
              />

              <FormItem
                id="contact_phone"
                value={contactData.phone}
                type="tel"
                name="phone"
                onBlur={validateInput}
                onChange={onChangeHandler}
                placeholder="ex. 123-456-7777"
                label={{ text: '**' }}
              />
              <FormItem
                id="contact_address"
                value={contactData.address}
                type="text"
                name="address"
                onBlur={validateInput}
                onChange={onChangeHandler}
                placeholder="ex. 999 Anywhere St., Apt 555, Medford MA 02155"
                label={{ text: '**' }}
              />
            </ul>
          </form>
        ) : (
          <ul className="contact-container">
            {Object.entries(contactData).map(([key, value]) => {
              return (
                value && (
                  <li key={key}>
                    <span>{key}: </span>
                    <span>{value}</span>
                  </li>
                )
              );
            })}
            {/* {<li>Email: {contactData.email}</li>}
            <li>Phone: {contactData.phone}</li>
            <li>Address: {contactData.address}</li> */}
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
