import { useState } from 'react';
import Form from './Form';
import createInputsProps from '../utilities/createInputsProps';
import setInputEventHandler from '../utilities/setInputEventHandler';
import '../styles/education.css';

let nextId = 8;
export default function Education({ isEditing }) {
  const [educationData, setEducationData] = useState({
    school: {
      major: { id: 0, value: '' },
      schoolName: { id: 1, value: '' },
      dateFrom: { id: 2, value: '', type: 'month' },
      dateTo: { id: 3, value: '', type: 'month' },
    },
    schools: [
      {
        major: { id: 4, value: 'major placeholder' },
        schoolName: { id: 5, value: 'School name' },
        dateFrom: { id: 6, value: 'date from' },
        dateTo: { id: 7, value: 'date to' },
      },
    ],
  });

  const onChangeHandler = (e) => {
    console.log(`onChangeHandler firing!`);
  };

  const changeEducationHandler = (e) => {
    console.log(`changeEducationHandler firing!`);
  };

  const addEducationHandler = (e) => {
    console.log(`addEducationHandler firing!`);
  };

  const deleteEducationHandler = (e) => {
    console.log(`deleteEducationHandler firing!`);
  };

  const formProps = isEditing && {
    default: {
      inputs: [
        ...createInputsProps(
          { ...educationData.school },
          {
            onChangeHandler,
          },
        ),
      ],
      button: {
        text: 'Add',
        className: 'btn education-add',
        clickHandler: addEducationHandler,
      },
    },
    set: {
      inputs: [
        ...createInputsProps(...educationData.schools, {
          className: 'visually-hidden',
          name: 'school',
          onChangeHandler: changeEducationHandler,
        }),
      ],
      button: {
        text: 'Delete',
        className: 'btn education-delete',
        clickHandler: deleteEducationHandler,
      },
    },
  };

  console.log(formProps);

  return (
    <section className="education">
      <div>
        <h2>Education</h2>
        {isEditing ? <Form className="form_education" props={formProps} /> : <div>Loading...</div>}
      </div>
    </section>
  );
}

/*
<form>
  <ul>
    <li class='form-item'>
      <label>Major:</label>
      <input type='text'></input>
    </li>

    <li class='form-item'>
      <label>School name:</label>
      <input type='text'></input>
    </li>

    <li class='form-item'>
      <label>Date From:</label>
      <input type='month'></input>
    </li>

    <li class='form-item'>
      <label>Date To:</label>
      <input type='month'></input>
    </li>
    <button>Add</button>
  </ul>

  <ul>
    <li class='form-item'>
      <label>Major0:</label>
      <input type='text'></input>
    </li>

    <li class='form-item'>
      <label>School name0:</label>
      <input type='text'></input>
    </li>

    <li class='form-item'>
      <label>Date From0:</label>
      <input type='month'></input>
    </li>

    <li class='form-item'>
      <label>Date To0:</label>
      <input type='month'></input>
    </li>
    <button>Delete</button>
  </ul>
</form>
*/
