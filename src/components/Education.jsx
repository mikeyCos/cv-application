import { useState } from 'react';
import { education as initialEducationsState } from '../data/data.initialStates';
import FormItem from './FormItem';
import Button from './Button';
import parseDate from '../utilities/parseDate';
import '../styles/education.css';

let nextId = 1;
export default function Education({ isEditing, validateForm }) {
  const [educationData, setEducationData] = useState({
    ...initialEducationsState,
  });

  const onChangeHandler = (e) => {
    const input = e.currentTarget;
    const value = input.value;
    const { id, key, prop } = { prop: input.name, ...input.dataset };
    const data = educationData[key];
    const newData = Array.isArray(data)
      ? data.map((item) => {
          return item.id === +id ? { ...item, [prop]: value } : item;
        })
      : { ...data, [prop]: value };
    setEducationData({
      ...educationData,
      [key]: newData,
    });
  };

  const addEducationHandler = () => {
    const newSchool = { ...educationData.school, id: ++nextId };
    setEducationData({
      school: {
        ...initialEducationsState.school,
      },
      schools: [...educationData.schools, newSchool],
    });
  };

  const deleteEducationHandler = (e) => {
    const btn = e.currentTarget;
    const { id } = btn.dataset;
    setEducationData({
      ...educationData,
      schools: educationData.schools.filter((school) => {
        return school.id !== +id && school;
      }),
    });
  };

  const resetEducationHandler = () => {
    setEducationData({
      school: {
        ...initialEducationsState.school,
      },
      schools: [...educationData.schools],
    });
  };

  return (
    <section className="education">
      <div>
        <h2>Education</h2>
        {isEditing ? (
          <>
            <form noValidate={true} onSubmit={validateForm(() => addEducationHandler())}>
              <ul>
                <FormItem
                  id="education_degree"
                  value={educationData.school.degree}
                  name="degree"
                  onChange={onChangeHandler}
                  dataAttributes={{
                    'data-key': 'school',
                  }}
                  placeholder="Degree"
                />

                <FormItem
                  id="education_schoolName"
                  value={educationData.school.schoolName}
                  name="schoolName"
                  onChange={onChangeHandler}
                  dataAttributes={{
                    'data-key': 'school',
                  }}
                  placeholder="School name"
                />

                <FormItem
                  id="education_dateFrom"
                  value={educationData.school.dateFrom}
                  name="dateFrom"
                  onChange={onChangeHandler}
                  type="month"
                  dataAttributes={{
                    'data-key': 'school',
                  }}
                />

                <FormItem
                  id="education_dateTo"
                  value={educationData.school.dateTo}
                  name="dateTo"
                  onChange={onChangeHandler}
                  type="month"
                  dataAttributes={{
                    'data-key': 'school',
                  }}
                />

                <button type="submit">Add</button>

                <button type="button" onClick={resetEducationHandler}>
                  Reset
                </button>
              </ul>
            </form>
            <form>
              {educationData.schools.map((school) => {
                return (
                  <ul key={school.id}>
                    <FormItem
                      id={`education_degree_${school.id}`}
                      value={school.degree}
                      name="degree"
                      onChange={onChangeHandler}
                      dataAttributes={{
                        'data-id': school.id,
                        'data-key': 'schools',
                      }}
                      placeholder="Degree"
                    />

                    <FormItem
                      id={`education_schoolName_${school.id}`}
                      value={school.name}
                      name="schoolName"
                      onChange={onChangeHandler}
                      dataAttributes={{
                        'data-id': school.id,
                        'data-key': 'schools',
                      }}
                      placeholder="School name"
                    />

                    <FormItem
                      id={`education_dateFrom_${school.id}`}
                      value={school.dateFrom}
                      type="month"
                      name="dateFrom"
                      onChange={onChangeHandler}
                      dataAttributes={{
                        'data-id': school.id,
                        'data-key': 'schools',
                      }}
                      label={{ text: '(MMM YYYY)' }}
                    />

                    <FormItem
                      id={`education_dateTo_${school.id}`}
                      value={school.dateTo}
                      type="month"
                      name="dateTo"
                      onChange={onChangeHandler}
                      dataAttributes={{
                        'data-id': school.id,
                        'data-key': 'schools',
                      }}
                      label={{ text: '(MMM YYYY)' }}
                    />

                    <Button
                      text="Delete"
                      onClick={deleteEducationHandler}
                      dataAttributes={{ 'data-id': school.id }}
                    ></Button>
                  </ul>
                );
              })}
            </form>
          </>
        ) : (
          <>
            {educationData.schools.map((school) => {
              return (
                <ul key={school.id}>
                  <li>{school.degree}</li>
                  <li>{school.schoolName}</li>
                  <li>From: {parseDate(school.dateFrom)}</li>
                  <li>To: {parseDate(school.dateTo)}</li>
                </ul>
              );
            })}
          </>
        )}
      </div>
    </section>
  );
}
