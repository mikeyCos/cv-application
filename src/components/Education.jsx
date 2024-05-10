import { useState } from 'react';
import { education as initialEducationsState } from '../data/data.initialStates';
import FormItem from './FormItem';
import Button from './Button';
import '../styles/education.css';

let nextId = 1;
export default function Education({ isEditing }) {
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
          <form>
            <ul>
              <FormItem
                id="major"
                value={educationData.school.major}
                name="major"
                onChange={onChangeHandler}
                dataAttributes={{
                  'data-key': 'school',
                }}
              />

              <FormItem
                id="schoolName"
                value={educationData.school.schoolName}
                name="schoolName"
                onChange={onChangeHandler}
                dataAttributes={{
                  'data-key': 'school',
                }}
              />

              <FormItem
                id="dateFrom"
                value={educationData.school.dateFrom}
                name="dateFrom"
                onChange={onChangeHandler}
                type="month"
                dataAttributes={{
                  'data-key': 'school',
                }}
              />

              <FormItem
                id="dateTo"
                value={educationData.school.dateTo}
                name="dateTo"
                onChange={onChangeHandler}
                type="month"
                dataAttributes={{
                  'data-key': 'school',
                }}
              />

              <button type="button" onClick={addEducationHandler}>
                Add
              </button>

              <button type="button" onClick={resetEducationHandler}>
                Reset
              </button>
            </ul>

            {educationData.schools.map((school) => {
              return (
                <ul key={school.id}>
                  <FormItem
                    id={`major_${school.id}`}
                    value={school.major}
                    name="major"
                    onChange={onChangeHandler}
                    dataAttributes={{
                      'data-id': school.id,
                      'data-key': 'schools',
                    }}
                  />

                  <FormItem
                    id={`schoolName_${school.id}`}
                    value={school.name}
                    name="schoolName"
                    onChange={onChangeHandler}
                    dataAttributes={{
                      'data-id': school.id,
                      'data-key': 'schools',
                    }}
                  />

                  <FormItem
                    id={`dateFrom_${school.id}`}
                    value={school.dateFrom}
                    type="month"
                    name="dateFrom"
                    onChange={onChangeHandler}
                    dataAttributes={{
                      'data-id': school.id,
                      'data-key': 'schools',
                    }}
                  />

                  <FormItem
                    id={`dateTo_${school.id}`}
                    value={school.dateTo}
                    type="month"
                    name="dateTo"
                    onChange={onChangeHandler}
                    dataAttributes={{
                      'data-id': school.id,
                      'data-key': 'schools',
                    }}
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
        ) : (
          <>
            {educationData.schools.map((school) => {
              return (
                <ul key={school.id}>
                  <li>{school.major}</li>
                  <li>{school.schoolName}</li>
                  {/* Need to convert input value YYYY-MM to MMM YYYY */}
                  <li>From: {school.dateFrom}</li>
                  <li>From: {school.dateTo}</li>
                </ul>
              );
            })}
          </>
        )}
      </div>
    </section>
  );
}
