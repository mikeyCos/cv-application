import { useState } from 'react';
import Form from './Form';
import concatenateNames from '../utilities/concatenateNames';
import setInputProps from '../utilities/setInputProps';
import '../styles/header.css';

export default function Header({ isEditing }) {
  const [headerData, setHeaderData] = useState({
    firstName: { id: 0, value: '' },
    lastName: { id: 1, value: '' },
    jobTitle: { id: 2, value: '' },
  });

  const fullName = concatenateNames(headerData.firstName.value, headerData.lastName.value);

  const onChangeHandler = (e) => {
    setHeaderData({
      ...headerData,
      [e.target.name]: { ...headerData[e.target.name], value: e.target.value },
    });
  };

  const propsForInputs = isEditing && setInputProps(headerData);

  return (
    <header>
      {isEditing ? (
        <Form inputs={propsForInputs} onChangeHandler={onChangeHandler} />
      ) : (
        <div>
          <h1>{fullName}</h1>
          <h3>{headerData.jobTitle.value}</h3>
        </div>
      )}
    </header>
  );
}
