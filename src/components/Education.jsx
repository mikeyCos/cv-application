import { useState } from 'react';
import '../styles/education.css';

let nextId = 1;
export default function Education({ isEditing }) {
  const [educationData, setEducationData] = useState({
    school: {
      major: '',
      schoolName: '',
      dateFrom: '',
      dateTo: '',
    },
    schools: [
      {
        id: 0,
        major: 'major placeholder 0',
        schoolName: 'Hogwards',
        dateFrom: 'Jan 2020',
        dateTo: 'Feb 2024',
      },
      {
        id: 1,
        major: 'major placeholder 1',
        schoolName: 'Helms Deep',
        dateFrom: 'Mar 2024',
        dateTo: 'Apr 2028',
      },
    ],
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
        major: '',
        schoolName: '',
        dateFrom: '',
        dateTo: '',
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
        major: '',
        schoolName: '',
        dateFrom: '',
        dateTo: '',
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
              <li className="form-item">
                <label htmlFor="major">Major:</label>
                <input
                  id="major"
                  value={educationData.school.major}
                  type="text"
                  name="major"
                  onChange={onChangeHandler}
                  data-key="school"
                />
              </li>

              <li className="form-item">
                <label htmlFor="schoolName">School Name</label>
                <input
                  id="schoolName"
                  value={educationData.school.schoolName}
                  type="text"
                  name="schoolName"
                  onChange={onChangeHandler}
                  data-key="school"
                />
              </li>
              <li className="form-item">
                <label htmlFor="dateFrom">date From</label>
                <input
                  id="dateFrom"
                  value={educationData.school.dateFrom}
                  type="month"
                  name="dateFrom"
                  onChange={onChangeHandler}
                  data-key="school"
                />
              </li>
              <li className="form-item">
                <label htmlFor="dateTo">date To</label>
                <input
                  id="dateTo"
                  value={educationData.school.dateTo}
                  type="month"
                  name="dateTo"
                  onChange={onChangeHandler}
                  data-key="school"
                />
              </li>
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
                  <li data-id={school.id} className="form-item">
                    <label htmlFor={`major_${school.id}`}>Major:</label>
                    <input
                      id={`major_${school.id}`}
                      value={school.major}
                      type="text"
                      name="major"
                      onChange={onChangeHandler}
                      data-id={school.id}
                      data-key="schools"
                    />
                  </li>
                  <li data-id={school.id} className="form-item">
                    <label htmlFor={`schoolName_${school.id}`}>School Name</label>
                    <input
                      id={`schoolName_${school.id}`}
                      value={school.schoolName}
                      type="text"
                      name="schoolName"
                      onChange={onChangeHandler}
                      data-id={school.id}
                      data-key="schools"
                    />
                  </li>
                  <li data-id={school.id} className="form-item">
                    <label htmlFor={`dateFrom_${school.id}`}>date From</label>
                    <input
                      id={`dateFrom_${school.id}`}
                      value="2000-02"
                      type="month"
                      name="dateFrom"
                      onChange={onChangeHandler}
                      data-id={school.id}
                      data-key="schools"
                    />
                  </li>
                  <li data-id={school.id} className="form-item">
                    <label htmlFor={`dateTo_${school.id}`}>dateTo</label>
                    <input
                      id={`dateTo_${school.id}`}
                      value="2020-03"
                      type="month"
                      name="dateTo"
                      onChange={onChangeHandler}
                      data-id={school.id}
                      data-key="schools"
                    />
                  </li>
                  <button type="button" data-id={school.id} onClick={deleteEducationHandler}>
                    Delete
                  </button>
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
