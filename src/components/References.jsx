import { useState } from 'react';
import FormItem from './FormItem';
import Button from './Button';
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
    const newReference = { ...referencesData.reference, id: ++nextId };
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
              <FormItem
                id="firstName"
                value={referencesData.reference.firstName}
                name="firstName"
                onChange={onChangeHandler}
                dataAttributes={{ 'data-key': 'reference' }}
              />

              <FormItem
                id="lastName"
                value={referencesData.reference.lastName}
                name="lastName"
                onChange={onChangeHandler}
                dataAttributes={{ 'data-key': 'reference' }}
              />

              <FormItem
                id="jobTitle"
                value={referencesData.reference.jobTitle}
                name="jobTitle"
                onChange={onChangeHandler}
                dataAttributes={{ 'data-key': 'reference' }}
              />

              <FormItem
                id="companyName"
                value={referencesData.reference.companyName}
                name="companyName"
                onChange={onChangeHandler}
                dataAttributes={{ 'data-key': 'reference' }}
              />

              <FormItem
                id="phone"
                value={referencesData.reference.phone}
                name="phone"
                onChange={onChangeHandler}
                dataAttributes={{ 'data-key': 'reference' }}
              />

              <FormItem
                id="email"
                value={referencesData.reference.email}
                name="email"
                onChange={onChangeHandler}
                dataAttributes={{ 'data-key': 'reference' }}
              />

              <Button text="Add" clickHandler={addReferenceHandler}></Button>
              <Button text="Reset" clickHandler={resetReferenceHandler}></Button>
            </ul>

            {referencesData.references.map((reference) => {
              return (
                <ul key={reference.id}>
                  <FormItem
                    id={`firstName_${reference.id}`}
                    value={reference.firstName}
                    name="firstName"
                    onChange={onChangeHandler}
                    dataAttributes={{ 'data-id': reference.id, 'data-key': 'references' }}
                  />

                  <FormItem
                    id={`lastName_${reference.id}`}
                    value={reference.lastName}
                    name="lastName"
                    onChange={onChangeHandler}
                    dataAttributes={{ 'data-id': reference.id, 'data-key': 'references' }}
                  />

                  <FormItem
                    id={`jobTitle_${reference.id}`}
                    value={reference.jobTitle}
                    name="jobTitle"
                    onChange={onChangeHandler}
                    dataAttributes={{ 'data-id': reference.id, 'data-key': 'references' }}
                  />

                  <FormItem
                    id={`companyName_${reference.id}`}
                    value={reference.companyName}
                    name="companyName"
                    onChange={onChangeHandler}
                    dataAttributes={{ 'data-id': reference.id, 'data-key': 'references' }}
                  />

                  <FormItem
                    id={`phone_${reference.id}`}
                    value={reference.phone}
                    type="tel"
                    name="phone"
                    onChange={onChangeHandler}
                    dataAttributes={{ 'data-id': reference.id, 'data-key': 'references' }}
                  />

                  <FormItem
                    id={`email_${reference.id}`}
                    value={reference.email}
                    type="email"
                    name="email"
                    onChange={onChangeHandler}
                    dataAttributes={{ 'data-id': reference.id, 'data-key': 'references' }}
                  />

                  <Button
                    text="Delete"
                    clickHandler={deleteReferenceHandler}
                    dataAttributes={{ 'data-id': reference.id, 'data-root-key': 'work' }}
                  ></Button>
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
