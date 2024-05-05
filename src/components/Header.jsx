import { useState } from 'react';
import Form from './Form';
import concatenateNames from '../utilities/concatenateNames';
import createInputsProps from '../utilities/createInputsProps';
import setInputEventHandler from '../utilities/setInputEventHandler';
import '../styles/header.css';

export default function Header({ isEditing }) {
  const [headerData, setHeaderData] = useState({
    firstName: { id: 0, value: '' },
    lastName: { id: 1, value: '' },
    jobTitle: { id: 2, value: '' },
  });

  const onChangeHandler = (e) => {
    console.log('onChangeHandler firing!');
    console.log(e.currentTarget);
  };

  const formProps = isEditing && {
    default: {
      inputs: [...createInputsProps(headerData, { onChangeHandler })],
    },
  };

  return (
    <header>
      {isEditing ? <Form className="form_header" props={formProps} /> : <div>Loading...</div>}
    </header>
  );
}

/*
<form>
  <ul>
    <li class='form-item'>
      <label>First name:</label>
      <input type='text'></input>
    </li>

    <li class='form-item'>
      <label>last name:</label>
      <input type='text'></input>
    </li>

    <li class='form-item'>
      <label>Job title:</label>
      <input type='text'></input>
    </li>
  </ul>
</form>
*/
