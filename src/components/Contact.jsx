import { useState } from 'react';
import '../styles/contact.css';

export default function Contact({ isEditing }) {
  const [contactData, setContactData] = useState({
    email: '',
    phone: '',
    address: '',
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
          <form>
            <ul>
              <li>
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  value={contactData.email}
                  type="email"
                  name="email"
                  onChange={onChangeHandler}
                />
              </li>
              <li>
                <label htmlFor="phone">Phone:</label>
                <input
                  id="phone"
                  value={contactData.phone}
                  type="tel"
                  name="phone"
                  onChange={onChangeHandler}
                />
              </li>
              <li>
                <label htmlFor="address">Address:</label>
                <input
                  id="address"
                  value={contactData.address}
                  type="text"
                  name="address"
                  onChange={onChangeHandler}
                />
              </li>
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
