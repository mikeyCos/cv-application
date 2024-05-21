import { useState } from 'react';
import { references as initialReferencesState } from '../data/data.initialStates';
import FormItem from './FormItem';
import Button from './Button';
import concatenateNames from '../utilities/concatenateNames';
import { validateForm, validateInput } from '../utilities/formValidation';
import DeleteMessageBox from './DeleteMessageBox';
import '../styles/references.css';
let nextId = 0;
export default function References({ isEditing, setModal, deleteRef, btnRef }) {
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
    <section className="references" data-is-editing={isEditing}>
      <div>
        <h2 className="content-heading">References</h2>
        {isEditing ? (
          <div>
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
                  onBlur={validateInput}
                  onChange={onChangeHandler}
                  dataAttributes={{ 'data-key': 'reference' }}
                  placeholder="First name"
                  label={{ text: '*' }}
                />

                <FormItem
                  id="references_lastName"
                  value={referencesData.reference.lastName}
                  name="lastName"
                  onBlur={validateInput}
                  onChange={onChangeHandler}
                  dataAttributes={{ 'data-key': 'reference' }}
                  placeholder="Last name"
                  label={{ text: '*' }}
                />

                <FormItem
                  id="references_jobTitle"
                  value={referencesData.reference.jobTitle}
                  name="jobTitle"
                  onBlur={validateInput}
                  onChange={onChangeHandler}
                  dataAttributes={{ 'data-key': 'reference' }}
                  placeholder="Job title"
                  label={{ text: '*' }}
                />

                <FormItem
                  id="references_companyName"
                  value={referencesData.reference.companyName}
                  name="companyName"
                  onBlur={validateInput}
                  onChange={onChangeHandler}
                  dataAttributes={{ 'data-key': 'reference' }}
                  placeholder="Company name"
                  label={{ text: '*' }}
                />

                <FormItem
                  id="references_phone"
                  value={referencesData.reference.phone}
                  name="phone"
                  onBlur={validateInput}
                  onChange={onChangeHandler}
                  dataAttributes={{ 'data-key': 'reference' }}
                  placeholder="ex. 123-456-7777"
                  label={{ text: '*' }}
                />

                <FormItem
                  id="references_email"
                  value={referencesData.reference.email}
                  name="email"
                  onBlur={validateInput}
                  onChange={onChangeHandler}
                  dataAttributes={{ 'data-key': 'reference' }}
                  placeholder="ex. some@email.com"
                  label={{ text: '*' }}
                />

                <div className="btn-container">
                  <Button className="btn-form btn-add" type="submit" text="Add" />
                  <Button
                    className="btn-form btn-reset"
                    text="Reset"
                    onClick={resetReferenceHandler}
                  />
                </div>
              </ul>
            </form>
            {referencesData.references.length > 0 && (
              <form noValidate={true} onSubmit={(e) => validateForm(e)}>
                {referencesData.references.map((reference) => {
                  return (
                    <ul key={reference.id}>
                      <FormItem
                        id={`references_firstName_${reference.id}`}
                        value={reference.firstName}
                        name="firstName"
                        onBlur={validateInput}
                        onChange={onChangeHandler}
                        dataAttributes={{ 'data-id': reference.id, 'data-key': 'references' }}
                        placeholder="First name"
                      />

                      <FormItem
                        id={`references_lastName_${reference.id}`}
                        value={reference.lastName}
                        name="lastName"
                        onBlur={validateInput}
                        onChange={onChangeHandler}
                        dataAttributes={{ 'data-id': reference.id, 'data-key': 'references' }}
                        placeholder="Last name"
                      />

                      <FormItem
                        id={`references_jobTitle_${reference.id}`}
                        value={reference.jobTitle}
                        name="jobTitle"
                        onBlur={validateInput}
                        onChange={onChangeHandler}
                        dataAttributes={{ 'data-id': reference.id, 'data-key': 'references' }}
                        placeholder="Job title"
                      />

                      <FormItem
                        id={`references_companyName_${reference.id}`}
                        value={reference.companyName}
                        name="companyName"
                        onBlur={validateInput}
                        onChange={onChangeHandler}
                        dataAttributes={{ 'data-id': reference.id, 'data-key': 'references' }}
                        placeholder="Company name"
                      />

                      <FormItem
                        id={`references_phone_${reference.id}`}
                        value={reference.phone}
                        type="tel"
                        name="phone"
                        onBlur={validateInput}
                        onChange={onChangeHandler}
                        dataAttributes={{ 'data-id': reference.id, 'data-key': 'references' }}
                        placeholder="ex. 123-456-7777"
                      />

                      <FormItem
                        id={`references_email_${reference.id}`}
                        value={reference.email}
                        type="email"
                        name="email"
                        onBlur={validateInput}
                        onChange={onChangeHandler}
                        dataAttributes={{ 'data-id': reference.id, 'data-key': 'references' }}
                        placeholder="ex. some@email.com"
                      />

                      <div className="btn-container">
                        <Button
                          className="btn-form btn-delete"
                          text="Delete"
                          onClick={(e) => {
                            const btn = e.currentTarget;
                            btnRef.current = btn;
                            deleteRef.current = {
                              callback: deleteReferenceHandler,
                              btn: btn,
                              message: (
                                <DeleteMessageBox
                                  btn={btn}
                                  arr={referencesData.references}
                                  options={{
                                    section: 'reference',
                                    keys: ['firstName', 'lastName'],
                                  }}
                                />
                              ),
                            };
                            setModal(true);
                          }}
                          dataAttributes={{ 'data-id': reference.id, 'data-root-key': 'work' }}
                        />
                      </div>
                    </ul>
                  );
                })}
              </form>
            )}
          </div>
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
