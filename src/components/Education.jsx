import { useState } from 'react';
import Form from './Form';
import setInputProps from '../utilities/setInputProps';
import setInputEventHandler from '../utilities/setInputEventHandler';
import '../styles/education.css';

let nextId = 1;
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
        id: 0,
        major: { id: 0, value: 'major placeholder' },
        schoolName: { id: 1, value: 'School name' },
        dateFrom: { id: 2, value: 'date from' },
        dateTo: { id: 3, value: 'date to' },
      },
    ],
  });

  const onChangeHandler = setInputEventHandler(educationData, setEducationData, true);
  const onChangeHandlerUpdate = setInputEventHandler(educationData, (id, value) => {
    const newSchools = Object.values(educationData.schools).map((school) => {
      return school.id === +id ? { id: +id, value } : school;
    });

    setEducationData({
      ...setEducationData,
      schools: newSchools,
    });
  });

  const addEducationHandler = () => {
    setEducationData({
      school: {
        ...educationData.school,
        value: '',
      },
      schools: [...educationData.schools, { id: nextId++, value: setEducationData.school.value }],
    });
  };

  const deleteEducationHandler = (e) => {
    setEducationData({
      ...educationData,
      schools: [
        ...educationData.skills.filter((school) => school.id !== +e.currentTarget.dataset.id),
      ],
    });
  };

  const propsForInputs = isEditing && setInputProps({ school: { ...educationData.school } });
  const propsForSchools =
    isEditing &&
    setInputProps(
      Object.values(educationData.schools).reduce((accumulator, currentValue) => {
        return {
          ...accumulator,
          [`school${currentValue.id}`]: { ...currentValue },
        };
      }, {}),
    );

  console.log(propsForInputs);
  console.log(propsForSchools);

  return (
    <section className="education">
      <div>
        <h2>Education</h2>
        {isEditing ? (
          <Form
            props={[
              {
                id: 0,
                inputs: propsForInputs,
                onChangeHandler: onChangeHandler,
                button: {
                  text: 'Add',
                  className: 'education-add',
                  clickHandler: addEducationHandler,
                },
              },
              {
                id: 1,
                inputs: propsForSchools,
                onChangeHandler: onChangeHandlerUpdate,
                button: {
                  text: 'Delete',
                  className: 'education-delete',
                  clickHandler: deleteEducationHandler,
                },
              },
            ]}
          />
        ) : (
          <div>
            {/* <article>
              <h3>{educationData.major.value}</h3>
              <h4>{educationData.schoolName.value}</h4>
              <h4>
                {educationData.dateFrom.value} - {educationData.dateTo.value}
              </h4>
            </article> */}
          </div>
        )}
      </div>
    </section>
  );
}
