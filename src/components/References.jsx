import { useState } from 'react';
import concatenateNames from '../utilities/concatenateNames';
import '../styles/references.css';
let nextId = 0;
export default function References({ isEditing }) {
  const [referencesData, setReferencesData] = useState({
    reference: {
      firstName: '',
      lastName: '',
      jobTitle: '',
      companyName: '',
      phone: '',
      email: '',
    },
    references: [
      {
        id: 0,
        firstName: 'Woody',
        lastName: 'Joe',
        jobTitle: 'Clown',
        companyName: 'Clown Co.',
        phone: '000-123-4567',
        email: 'email@gmail.com',
      },
    ],
  });

  const onChangeHandler = (e) => {
    const input = e.currentTarget;
    const value = input.value;
    const { id, key, prop } = { prop: input.name, ...input.dataset };
    const data = referencesData[key];
    const newData = Array.isArray(data)
      ? data.map((item) => {
          return item.id === +id ? { ...item, [prop]: value } : item;
        })
      : { ...data, [prop]: value };
    setReferencesData({
      ...referencesData,
      [key]: newData,
    });
  };

  const addReferenceHandler = () => {
    const newReference = { ...referencesData.school, id: ++nextId };
    setReferencesData({
      reference: {
        firstName: '',
        lastName: '',
        jobTitle: '',
        companyName: '',
        phone: '',
        email: '',
      },
      references: [...referencesData.references, newReference],
    });
  };

  const deleteReferenceHandler = (e) => {
    const btn = e.currentTarget;
    const { id } = btn.dataset;
    setReferencesData({
      ...referencesData,
      references: referencesData.references.filter((reference) => {
        return reference.id !== +id && reference;
      }),
    });
  };

  const resetReferenceHandler = () => {
    setReferencesData({
      reference: {
        firstName: '',
        lastName: '',
        jobTitle: '',
        companyName: '',
        phone: '',
        email: '',
      },
      references: [...referencesData.references],
    });
  };

  return (
    <section className="references">
      <div>
        <h2>References</h2>
        {isEditing ? (
          <form>
            <ul>
              <li className="form-item">
                <label htmlFor="firstName">First name:</label>
                <input
                  id="firstName"
                  value={referencesData.reference.firstName}
                  type="text"
                  name="firstName"
                  onChange={onChangeHandler}
                  data-key="reference"
                />
              </li>
              <li className="form-item">
                <label htmlFor="lastName">Last name:</label>
                <input
                  id="lastName"
                  value={referencesData.reference.lastName}
                  type="text"
                  name="lastName"
                  onChange={onChangeHandler}
                  data-key="reference"
                />
              </li>
              <li className="form-item">
                <label htmlFor="jobTitle">Job Title:</label>
                <input
                  id="jobTitle"
                  value={referencesData.reference.jobTitle}
                  type="text"
                  name="jobTitle"
                  onChange={onChangeHandler}
                  data-key="reference"
                />
              </li>
              <li className="form-item">
                <label htmlFor="companyName">Company name:</label>
                <input
                  id="companyName"
                  value={referencesData.reference.companyName}
                  type="text"
                  name="companyName"
                  onChange={onChangeHandler}
                  data-key="reference"
                />
              </li>
              <li className="form-item">
                <label htmlFor="phone">Phone:</label>
                <input
                  id="phone"
                  value={referencesData.reference.phone}
                  type="text"
                  name="phone"
                  onChange={onChangeHandler}
                  data-key="reference"
                />
              </li>
              <li className="form-item">
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  value={referencesData.reference.email}
                  type="text"
                  name="email"
                  onChange={onChangeHandler}
                  data-key="reference"
                />
              </li>
              <button type="button" onClick={addReferenceHandler}>
                Add
              </button>
              <button type="button" onClick={resetReferenceHandler}>
                Reset
              </button>
            </ul>

            {referencesData.references.map((reference) => {
              return (
                <ul key={reference.id}>
                  <li data-id={reference.id} className="form-item">
                    <label htmlFor={`firstName_${reference.id}`}>First name:</label>
                    <input
                      id={`firstName_${reference.id}`}
                      value={reference.firstName}
                      type="text"
                      name="firstName"
                      onChange={onChangeHandler}
                      data-id={reference.id}
                      data-key="references"
                    />
                  </li>
                  <li data-id={reference.id} className="form-item">
                    <label htmlFor={`lastName_${reference.id}`}>Last name:</label>
                    <input
                      id={`lastName_${reference.id}`}
                      value={reference.lastName}
                      type="text"
                      name="lastName"
                      onChange={onChangeHandler}
                      data-id={reference.id}
                      data-key="references"
                    />
                  </li>
                  <li data-id={reference.id} className="form-item">
                    <label htmlFor={`jobTitle_${reference.id}`}>Job title:</label>
                    <input
                      id={`jobTitle_${reference.id}`}
                      value={reference.jobTitle}
                      type="text"
                      name="jobTitle"
                      onChange={onChangeHandler}
                      data-id={reference.id}
                      data-key="references"
                    />
                  </li>
                  <li data-id={reference.id} className="form-item">
                    <label htmlFor={`companyName_${reference.id}`}>Company Name:</label>
                    <input
                      id={`companyName_${reference.id}`}
                      value={reference.companyName}
                      type="text"
                      name="companyName"
                      onChange={onChangeHandler}
                      data-id={reference.id}
                      data-key="references"
                    />
                  </li>
                  <li data-id={reference.id} className="form-item">
                    <label htmlFor={`phone_${reference.id}`}>Phone:</label>
                    <input
                      id={`phone_${reference.id}`}
                      value={reference.phone}
                      type="text"
                      name="phone"
                      onChange={onChangeHandler}
                      data-id={reference.id}
                      data-key="references"
                    />
                  </li>
                  <li data-id={reference.id} className="form-item">
                    <label htmlFor={`email_${reference.id}`}>Email:</label>
                    <input
                      id={`email_${reference.id}`}
                      value={reference.email}
                      type="text"
                      name="email"
                      onChange={onChangeHandler}
                      data-id={reference.id}
                      data-key="references"
                    />
                  </li>
                  <button type="button" data-id={reference.id} onClick={deleteReferenceHandler}>
                    Delete
                  </button>
                </ul>
              );
            })}
          </form>
        ) : (
          <>
            {referencesData.references.map((reference) => {
              return (
                <ul key={reference.id}>
                  <li>{concatenateNames(reference.firstName, reference.lastName)}</li>
                  <li>{reference.jobTitle}</li>
                  <li>{reference.companyName}</li>
                  <li>{reference.phone}</li>
                  <li>{reference.email}</li>
                </ul>
              );
            })}
          </>
        )}
      </div>
    </section>
  );
}
