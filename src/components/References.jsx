import { useState } from 'react';
import { references as initialReferencesState } from '../data/data.initialStates';
import FormItem from './FormItem';
import Button from './Button';
import concatenateNames from '../utilities/concatenateNames';
import { validateForm } from '../utilities/formValidation';
import '../styles/references.css';
let nextId = 0;
export default function References({ isEditing, setModal, deleteRef }) {
  const [referencesData, setReferencesData] = useState({
    ...initialReferencesState,
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
        ...initialReferencesState.reference,
      },
      references: [...referencesData.references, newReference],
    });
  };

  const deleteReferenceHandler = (btn) => {
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
        ...initialReferencesState.reference,
      },
      references: [...referencesData.references],
    });
  };

  return (
    <section className="references">
      <div>
        <h2>References</h2>
        {isEditing ? (
          <>
            <form
              className="no-validate-all"
              noValidate={true}
              onSubmit={(e) => validateForm(e, addReferenceHandler)}
            >
              <ul>
                <FormItem
                  id="references_firstName"
                  value={referencesData.reference.firstName}
                  name="firstName"
                  onChange={onChangeHandler}
                  dataAttributes={{ 'data-key': 'reference' }}
                  placeholder="First name"
                  label={{ text: '*' }}
                />

                <FormItem
                  id="references_lastName"
                  value={referencesData.reference.lastName}
                  name="lastName"
                  onChange={onChangeHandler}
                  dataAttributes={{ 'data-key': 'reference' }}
                  placeholder="Last name"
                  label={{ text: '*' }}
                />

                <FormItem
                  id="references_jobTitle"
                  value={referencesData.reference.jobTitle}
                  name="jobTitle"
                  onChange={onChangeHandler}
                  dataAttributes={{ 'data-key': 'reference' }}
                  placeholder="Job title"
                  label={{ text: '*' }}
                />

                <FormItem
                  id="references_companyName"
                  value={referencesData.reference.companyName}
                  name="companyName"
                  onChange={onChangeHandler}
                  dataAttributes={{ 'data-key': 'reference' }}
                  placeholder="Company name"
                  label={{ text: '*' }}
                />

                <FormItem
                  id="references_phone"
                  value={referencesData.reference.phone}
                  name="phone"
                  onChange={onChangeHandler}
                  dataAttributes={{ 'data-key': 'reference' }}
                  placeholder="ex. 123-456-7777"
                  label={{ text: '*' }}
                />

                <FormItem
                  id="references_email"
                  value={referencesData.reference.email}
                  name="email"
                  onChange={onChangeHandler}
                  dataAttributes={{ 'data-key': 'reference' }}
                  placeholder="ex. some@email.com"
                  label={{ text: '*' }}
                />

                {/* <Button text="Add" onClick={addReferenceHandler}></Button> */}
                <Button type="submit" text="Add"></Button>
                <Button text="Reset" onClick={resetReferenceHandler}></Button>
              </ul>
            </form>
            <form noValidate={true} onSubmit={(e) => validateForm(e)}>
              {referencesData.references.map((reference) => {
                return (
                  <ul key={reference.id}>
                    <FormItem
                      id={`references_firstName_${reference.id}`}
                      value={reference.firstName}
                      name="firstName"
                      onChange={onChangeHandler}
                      dataAttributes={{ 'data-id': reference.id, 'data-key': 'references' }}
                      placeholder="First name"
                    />

                    <FormItem
                      id={`references_lastName_${reference.id}`}
                      value={reference.lastName}
                      name="lastName"
                      onChange={onChangeHandler}
                      dataAttributes={{ 'data-id': reference.id, 'data-key': 'references' }}
                      placeholder="Last name"
                    />

                    <FormItem
                      id={`references_jobTitle_${reference.id}`}
                      value={reference.jobTitle}
                      name="jobTitle"
                      onChange={onChangeHandler}
                      dataAttributes={{ 'data-id': reference.id, 'data-key': 'references' }}
                      placeholder="Job title"
                    />

                    <FormItem
                      id={`references_companyName_${reference.id}`}
                      value={reference.companyName}
                      name="companyName"
                      onChange={onChangeHandler}
                      dataAttributes={{ 'data-id': reference.id, 'data-key': 'references' }}
                      placeholder="Company name"
                    />

                    <FormItem
                      id={`references_phone_${reference.id}`}
                      value={reference.phone}
                      type="tel"
                      name="phone"
                      onChange={onChangeHandler}
                      dataAttributes={{ 'data-id': reference.id, 'data-key': 'references' }}
                      placeholder="ex. 123-456-7777"
                    />

                    <FormItem
                      id={`references_email_${reference.id}`}
                      value={reference.email}
                      type="email"
                      name="email"
                      onChange={onChangeHandler}
                      dataAttributes={{ 'data-id': reference.id, 'data-key': 'references' }}
                      placeholder="ex. some@email.com"
                    />

                    <Button
                      text="Delete"
                      onClick={(e) => {
                        deleteRef.current = {
                          callback: deleteReferenceHandler,
                          btn: e.currentTarget,
                        };
                        setModal(true);
                      }}
                      dataAttributes={{ 'data-id': reference.id, 'data-root-key': 'work' }}
                    ></Button>
                  </ul>
                );
              })}
            </form>
          </>
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
