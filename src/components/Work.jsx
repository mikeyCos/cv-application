import { useState } from 'react';
import Form from './Form';
import createInputsProps from '../utilities/createInputsProps';
import setInputEventHandler from '../utilities/setInputEventHandler';
import '../styles/work.css';

export default function Work({ isEditing }) {
  const [workData, setWorkData] = useState({
    work: {
      jobTitle: { id: 0, value: '' },
      companyName: { id: 1, value: '' },
      dateFrom: { id: 2, value: '', type: 'month' },
      dateTo: { id: 3, value: '', type: 'month' },
    },
    works: [
      {
        jobTitle: { id: 4, value: 'job title placeholder' },
        companyName: { id: 5, value: 'Company name' },
        dateFrom: { id: 6, value: 'date from' },
        dateTo: { id: 7, value: 'date to' },
      },
    ],
  });

  const onChangeHandler = (e) => {
    console.log('onChangeHandler firing!');
    console.log(e.currentTarget);
  };

  const changeWorkHandler = (e) => {
    console.log(`changeWorkHandler is firing!`);
    console.log(e.currentTarget);
  };

  const addWorkHandler = (e) => {
    console.log(`addWorkHandler firing!`);
  };

  const deleteWorkHandler = (e) => {
    console.log(`deleteWorkHandler`);
  };

  const formProps = isEditing && {
    default: {
      inputs: [
        ...createInputsProps(
          { ...workData.work },
          {
            onChangeHandler,
          },
        ),
      ],
      button: {
        text: 'Add',
        className: 'btn education-add',
        clickHandler: addWorkHandler,
      },
    },
    set: {
      inputs: [
        ...createInputsProps(...workData.works, {
          className: 'visually-hidden',
          name: 'school',
          onChangeHandler: changeWorkHandler,
        }),
      ],
      button: {
        text: 'Delete',
        className: 'btn education-delete',
        clickHandler: deleteWorkHandler,
      },
    },
  };

  return (
    <section className="work">
      <div>
        <h2>Work Experience</h2>
        <div>
          {isEditing ? <Form className="form_work" props={formProps} /> : <div>Loading...</div>}
        </div>
      </div>
    </section>
  );
}

/*
<article>
            <h3>Company Name</h3>
            <h4>Date From - Date To</h4>
            <ul>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li>
                Quaerat consequuntur possimus sapiente beatae accusantium, consequatur esse, ipsa
                blanditiis, a minima fugit veritatis reprehenderit?
              </li>
              <li>Est, ratione distinctio aspernatur nulla accusamus dolores.</li>
            </ul>
          </article>
          <article>
            <h3>Company Name</h3>
            <h4>Date From - Date To</h4>
            <ul>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li>
                Quaerat consequuntur possimus sapiente beatae accusantium, consequatur esse, ipsa
                blanditiis, a minima fugit veritatis reprehenderit?
              </li>
              <li>Est, ratione distinctio aspernatur nulla accusamus dolores.</li>
            </ul>
          </article>
*/
