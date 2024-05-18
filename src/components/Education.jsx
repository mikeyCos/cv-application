import { useState } from 'react';
import { education as initialEducationsState } from '../data/data.initialStates';
import FormItem from './FormItem';
import Button from './Button';
import parseDate from '../utilities/parseDate';
import { validateForm } from '../utilities/formValidation';
import '../styles/education.css';

let nextId = 1;
export default function Education({ isEditing, setModal, deleteRef }) {
  const [educationData, setEducationData] = useState({
    ...initialEducationsState,
  });

  const onChangeHandler = (e) => {
    const input = e.currentTarget;
    const value = input.value;
    const { id, key, subKey, prop } = { prop: input.name, ...input.dataset };
    const data = educationData[key];
    const newData = Array.isArray(data)
      ? data.map((item) => {
          return item.id === +id
            ? {
                ...item,
                [prop]: typeof item[prop] === 'object' ? { ...item[prop], [subKey]: value } : value,
              }
            : item;
        })
      : {
          ...data,
          [prop]: typeof data[prop] === 'object' ? { ...data[prop], [subKey]: value } : value,
        };
    setEducationData({
      ...educationData,
      [key]: newData,
    });
  };

  const addEducationHandler = () => {
    const newSchool = { ...educationData.school, id: ++nextId };
    console.log(newSchool);
    setEducationData({
      school: {
        ...initialEducationsState.school,
      },
      schools: [...educationData.schools, newSchool],
    });
  };

  const deleteEducationHandler = (btn) => {
    const { id } = btn.dataset;
    setEducationData({
      ...educationData,
      schools: educationData.schools.filter((school) => {
        return school.id !== +id && school;
      }),
    });
  };

  const resetEducationHandler = (e) => {
    console.log(e.currentTarget.closest('form'));
    setEducationData({
      school: {
        ...initialEducationsState.school,
      },
      schools: [...educationData.schools],
    });
  };

  return (
    <section className="education" data-is-editing={isEditing}>
      <div>
        <h2 className="content-heading">Education</h2>
        {isEditing ? (
          <div>
            <form
              className="no-validate-all"
              noValidate={true}
              onSubmit={(e) => validateForm(e, addEducationHandler)}
            >
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
                  label={{ text: '*' }}
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
                  label={{ text: '*' }}
                />

                <FormItem
                  tag={'select'}
                  id="education_dateFrom_month"
                  value={educationData.school.dateFrom.month}
                  name="dateFrom"
                  onChange={onChangeHandler}
                  dataAttributes={{ 'data-key': 'school', 'data-sub-key': 'month' }}
                  label={{ text: '*' }}
                />

                <FormItem
                  id="education_dateFrom_year"
                  value={educationData.school.dateFrom.year}
                  name="dateFrom"
                  onChange={onChangeHandler}
                  type="number"
                  dataAttributes={{ 'data-key': 'school', 'data-sub-key': 'year' }}
                  placeholder="Year"
                  label={{ text: '*', className: 'visibility-hidden' }}
                />

                <FormItem
                  tag={'select'}
                  id="education_dateTo_month"
                  value={educationData.school.dateTo.month}
                  name="dateTo"
                  onChange={onChangeHandler}
                  dataAttributes={{ 'data-key': 'school', 'data-sub-key': 'month' }}
                  label={{ text: '*' }}
                />

                <FormItem
                  id="education_dateTo_year"
                  value={educationData.school.dateTo.year}
                  name="dateTo"
                  onChange={onChangeHandler}
                  type="number"
                  dataAttributes={{ 'data-key': 'school', 'data-sub-key': 'year' }}
                  placeholder="Year"
                  label={{ text: '*', className: 'visibility-hidden' }}
                />

                <div className="btn-container">
                  <button className="btn-form btn-add" type="submit">
                    Add
                  </button>
                  <button
                    className="btn-form btn-reset"
                    type="button"
                    onClick={resetEducationHandler}
                  >
                    Reset
                  </button>
                </div>
              </ul>
            </form>
            {educationData.schools.length > 0 && (
              <form noValidate={true} onSubmit={(e) => validateForm(e)}>
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
                        value={school.schoolName}
                        name="schoolName"
                        onChange={onChangeHandler}
                        dataAttributes={{
                          'data-id': school.id,
                          'data-key': 'schools',
                        }}
                        placeholder="School name"
                      />

                      <FormItem
                        tag={'select'}
                        id={`education_dateFrom_month_${school.id}`}
                        value={school.dateFrom.month}
                        name="dateFrom"
                        onChange={onChangeHandler}
                        dataAttributes={{
                          'data-id': school.id,
                          'data-key': 'schools',
                          'data-sub-key': 'month',
                        }}
                      />

                      <FormItem
                        id={`education_dateFrom_year_${school.id}`}
                        value={school.dateFrom.year}
                        name="dateFrom"
                        onChange={onChangeHandler}
                        type="number"
                        dataAttributes={{
                          'data-id': school.id,
                          'data-key': 'schools',
                          'data-sub-key': 'year',
                        }}
                        placeholder="Year"
                        label={{ className: 'visibility-hidden' }}
                      />

                      <FormItem
                        tag={'select'}
                        id={`education_dateTo_month_${school.id}`}
                        value={school.dateTo.month}
                        name="dateTo"
                        onChange={onChangeHandler}
                        dataAttributes={{
                          'data-id': school.id,
                          'data-key': 'schools',
                          'data-sub-key': 'month',
                        }}
                      />

                      <FormItem
                        id={`education_dateTo_year_${school.id}`}
                        value={school.dateTo.year}
                        name="dateTo"
                        onChange={onChangeHandler}
                        type="number"
                        dataAttributes={{
                          'data-id': school.id,
                          'data-key': 'schools',
                          'data-sub-key': 'year',
                        }}
                        placeholder="Year"
                        label={{ className: 'visibility-hidden' }}
                      />

                      <div className="btn-container">
                        <Button
                          className="btn-form btn-delete"
                          text="Delete"
                          onClick={(e) => {
                            deleteRef.current = {
                              callback: deleteEducationHandler,
                              btn: e.currentTarget,
                            };
                            setModal(true);
                          }}
                          dataAttributes={{ 'data-id': school.id }}
                        />
                      </div>
                    </ul>
                  );
                })}
              </form>
            )}
          </div>
        ) : (
          educationData.schools.length > 0 && (
            <div className="education-container">
              {educationData.schools.map((school) => {
                return (
                  <article className="education-item" key={school.id}>
                    <ul>
                      <li>{school.degree}</li>
                      <li>{school.schoolName}</li>
                      <li>
                        <span>
                          {/* parseDate(school.dateFrom) */}
                          {school.dateFrom.month}/{school.dateFrom.year}
                        </span>
                        -
                        <span>
                          {school.dateTo.month}/{school.dateTo.year}
                        </span>
                      </li>
                    </ul>
                  </article>
                );
              })}
            </div>
          )
        )}
      </div>
    </section>
  );
}
