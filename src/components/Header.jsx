import { useState } from 'react';
import Form from './Form';
import concatenateNames from '../utilities/concatenateNames';
import setInputProps from '../utilities/setInputProps';
import setInputEventHandler from '../utilities/setInputEventHandler';
import '../styles/header.css';

export default function Header({ isEditing }) {
  const [headerData, setHeaderData] = useState({
    firstName: { id: 0, value: '' },
    lastName: { id: 1, value: '' },
    jobTitle: { id: 2, value: '' },
  });

  const fullName = concatenateNames(headerData.firstName.value, headerData.lastName.value);
  const onChangeHandler = setInputEventHandler(headerData, setHeaderData, true);
  const propsForInputs = isEditing && setInputProps(headerData);
  console.log(propsForInputs);
  return (
    <header>
      {isEditing ? (
        <Form props={[{ inputs: propsForInputs, onChangeHandler: onChangeHandler }]} />
      ) : (
        <div>
          <h1>{fullName}</h1>
          <h3>{headerData.jobTitle.value}</h3>
        </div>
      )}
    </header>
  );
}
