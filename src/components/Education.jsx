import { useState } from 'react';
import Form from './Form';
import createInputsProps from '../utilities/createInputsProps';
import setInputEventHandler from '../utilities/setInputEventHandler';
import '../styles/education.css';

let nextId = 8;
export default function Education({ isEditing }) {
  const [educationData, setEducationData] = useState({
    school: {
      // id: 0,
      major: { value: '' },
      schoolName: { value: '' },
      dateFrom: { value: '', type: 'month' },
      dateTo: { value: '', type: 'month' },
    },
    schools: [
      {
        id: 0,
        major: { value: 'major placeholder 0' },
        schoolName: { value: 'School name 0' },
        dateFrom: { value: 'date from', type: 'month' },
        dateTo: { value: 'date to', type: 'month' },
      },
      {
        id: 1,
        major: { value: 'major placeholder 1' },
        schoolName: { value: 'School name 1' },
        dateFrom: { value: 'date from', type: 'month' },
        dateTo: { value: 'date to', type: 'month' },
      },
    ],
  });

  const onChangeHandler = (e) => {
    const key = e.currentTarget.id;
    const value = e.currentTarget.value;
    setEducationData({
      ...educationData,
      school: { ...educationData.school, [key]: { ...educationData.school[key], value } },
    });
  };

  const changeEducationHandler = (e) => {
    console.log(`changeEducationHandler firing!`);
    console.log(e.currentTarget);
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
        ...createInputsProps(educationData.school, {
          onChangeHandler,
        }),
      ],
      button: {
        text: 'Add',
        className: 'btn education-add',
        clickHandler: addEducationHandler,
      },
    },
    set: {
      // inputs: [
      //   ...createInputsProps(educationData.schools, {
      //     className: 'visually-hidden',
      //     name: 'school',
      //     onChangeHandler: changeEducationHandler,
      //   }),
      // ],
      inputs: createInputsProps(educationData.schools, {
        className: 'visually-hidden',
        name: 'school',
        onChangeHandler: changeEducationHandler,
      }),
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

  <ul>
    <li class='form-item'>
      <label>Major1:</label>
      <input type='text'></input>
    </li>

    <li class='form-item'>
      <label>School name1:</label>
      <input type='text'></input>
    </li>

    <li class='form-item'>
      <label>Date From1:</label>
      <input type='month'></input>
    </li>

    <li class='form-item'>
      <label>Date To1:</label>
      <input type='month'></input>
    </li>
    <button>Delete</button>
  </ul>
</form>
*/
