import { useState } from 'react';
import { work as initialWorkState } from '../data/data.initialStates';
import FormItem from './FormItem';
import Button from './Button';
import { validateForm, validateInput } from '../utilities/formValidation';
import parseDate from '../utilities/parseDate';
import '../styles/work.css';

let nextId = 1;
export default function Work({ isEditing, setModal, deleteRef }) {
  const [workData, setWorkData] = useState({ ...initialWorkState });
  const onChangeHandler = (e) => {
    const input = e.currentTarget;
    const value = input.value;
    const { id, key, subKey, prop } = { prop: input.name, ...input.dataset };
    const data = workData[key];
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
    setWorkData({
      ...workData,
      [key]: newData,
    });
  };

  const addWorkHandler = () => {
    const newWork = { ...workData.work, id: ++nextId };
    setWorkData({
      work: {
        ...initialWorkState.work,
      },
      works: [...workData.works, newWork],
    });
  };

  const deleteWorkHandler = (btn) => {
    const { id } = btn.dataset;
    setWorkData({
      ...workData,
      works: workData.works.filter((work) => {
        return work.id !== +id && work;
      }),
    });
  };

  const resetWorkHandler = () => {
    setWorkData({
      work: {
        ...initialWorkState.work,
      },
      works: [...workData.works],
    });
  };

  const onChangeHandlerDescription = (e) => {
    const input = e.currentTarget;
    const value = input.value;
    const { rootId, id, rootKey, key } = { ...input.dataset };
    const data = workData[rootKey];

    let newData;
    if (Array.isArray(data)) {
      newData = data.map((work) => {
        if (work.id === +rootId) {
          return {
            ...work,
            // Duplicate code
            [key]: Array.isArray(work[key])
              ? work[key].map((description) => {
                  return description.id === +id ? { ...description, text: value } : description;
                })
              : value,
          };
        } else {
          return work;
        }
      });
    } else {
      newData = {
        ...data,
        // Duplicate code
        [key]: Array.isArray(data[key])
          ? data[key].map((description) => {
              return description.id === +id ? { ...description, text: value } : description;
            })
          : value,
      };
    }
    setWorkData({ ...workData, [rootKey]: newData });
  };

  const addDescriptionHandler = (e) => {
    const btn = e.currentTarget;
    const btnContainer = e.currentTarget.parentElement;
    const { workId, rootKey, key } = btn.dataset;
    const input = btnContainer.parentElement.querySelector('.form-control');
    const data = workData[rootKey];
    const isDescriptionValid = validateInput(input);

    if (isDescriptionValid)
      setWorkData({
        ...workData,
        [rootKey]: Array.isArray(data)
          ? data.map((work) => {
              if (work.id === +workId) {
                return {
                  ...work,
                  nextId: ++work.nextId,
                  description: '',
                  descriptions: [...work.descriptions, { id: work.nextId, text: work.description }],
                };
              } else {
                return work;
              }
            })
          : {
              ...data,
              nextId: ++data.nextId,
              description: '',
              descriptions: [...data.descriptions, { id: data.nextId, text: data.description }],
            },
      });
  };

  const deleteDescriptionHandler = (btn) => {
    // const btn = e.currentTarget;
    const { rootId, id, rootKey } = btn.dataset;
    const data = workData[rootKey];

    setWorkData({
      ...workData,
      [rootKey]: Array.isArray(data)
        ? data.map((work) =>
            work.id === +rootId
              ? {
                  ...work,
                  descriptions: work.descriptions.filter((description) => description.id !== +id),
                }
              : work,
          )
        : {
            ...data,
            descriptions: data.descriptions.filter((description) => description.id !== +id),
          },
    });
  };

  return (
    <section className="work" data-is-editing={isEditing}>
      <div>
        <h2 className="content-heading">Work Experience</h2>
        {isEditing ? (
          <div>
            <form
              className="no-validate-all"
              noValidate={true}
              onSubmit={(e) => validateForm(e, addWorkHandler)}
            >
              <ul>
                <FormItem
                  id="work_jobTitle"
                  value={workData.work.jobTitle}
                  name="jobTitle"
                  onChange={onChangeHandler}
                  dataAttributes={{
                    'data-key': 'work',
                  }}
                  placeholder="Job title"
                  label={{ text: '*' }}
                />
                <FormItem
                  id="work_companyName"
                  value={workData.work.companyName}
                  name="companyName"
                  onChange={onChangeHandler}
                  dataAttributes={{ 'data-key': 'work' }}
                  placeholder="Company name"
                  label={{ text: '*' }}
                />
                <FormItem
                  tag={'select'}
                  id="work_dateFrom_month"
                  value={workData.work.dateFrom.month}
                  name="dateFrom"
                  onChange={onChangeHandler}
                  dataAttributes={{ 'data-key': 'work', 'data-sub-key': 'month' }}
                  label={{ text: '*' }}
                />
                <FormItem
                  id="work_dateFrom_year"
                  value={workData.work.dateFrom.year}
                  name="dateFrom"
                  onChange={onChangeHandler}
                  type="number"
                  dataAttributes={{ 'data-key': 'work', 'data-sub-key': 'year' }}
                  placeholder="Year"
                  label={{ text: '*', className: 'visibility-hidden' }}
                />
                <FormItem
                  tag={'select'}
                  id="work_dateTo_month"
                  value={workData.work.dateTo.month}
                  name="dateTo"
                  onChange={onChangeHandler}
                  dataAttributes={{ 'data-key': 'work', 'data-sub-key': 'month' }}
                  label={{ text: '*' }}
                />
                <FormItem
                  id="work_dateTo_year"
                  value={workData.work.dateTo.year}
                  name="dateTo"
                  onChange={onChangeHandler}
                  type="number"
                  dataAttributes={{ 'data-key': 'work', 'data-sub-key': 'year' }}
                  placeholder="Year"
                  label={{ text: '*', className: 'visibility-hidden' }}
                />
                <FormItem
                  tag={'textarea'}
                  id="work_description"
                  value={workData.work.description}
                  name="description"
                  onChange={onChangeHandlerDescription}
                  dataAttributes={{ 'data-key': 'description', 'data-root-key': 'work' }}
                  placeholder="Min 3 characters, and max 100 characters."
                  label={{ text: '*' }}
                  props={{ maxLength: 100 }}
                >
                  <div className="btn-container">
                    <Button
                      className="btn-form btn-add"
                      text="Add description"
                      onClick={addDescriptionHandler}
                      dataAttributes={{ 'data-key': 'descriptions', 'data-root-key': 'work' }}
                    />
                  </div>

                  {workData.work.descriptions.length > 0 && (
                    <ul className="descriptions">
                      {workData.work.descriptions.map((description) => {
                        return (
                          <FormItem
                            tag={'textarea'}
                            key={description.id}
                            id={`work_description_${description.id}`}
                            value={description.text}
                            name="description"
                            onChange={onChangeHandlerDescription}
                            dataAttributes={{
                              'data-id': description.id,
                              'data-root-key': 'work',
                              'data-key': 'descriptions',
                            }}
                            label={{ className: 'visibility-hidden' }}
                            placeholder="Min 3 characters, and max 100 characters."
                            props={{ maxLength: 100 }}
                          >
                            <div className="btn-container">
                              <Button
                                className="btn-form btn-delete"
                                text="Delete description"
                                onClick={(e) => {
                                  deleteRef.current = {
                                    callback: deleteDescriptionHandler,
                                    btn: e.currentTarget,
                                  };
                                  setModal(true);
                                }}
                                dataAttributes={{
                                  'data-id': description.id,
                                  'data-root-key': 'work',
                                  'data-key': 'descriptions',
                                }}
                              />
                            </div>
                          </FormItem>
                        );
                      })}
                    </ul>
                  )}
                </FormItem>
                <div className="btn-container">
                  <Button className="btn-form btn-add" text="Add" type="submit" />
                  <Button className="btn-form btn-reset" text="Reset" onClick={resetWorkHandler} />
                </div>
              </ul>
            </form>
            {workData.works.length > 0 && (
              <form noValidate={true} onSubmit={(e) => validateForm(e)}>
                {workData.works.map((work) => {
                  return (
                    <ul key={work.id}>
                      <FormItem
                        id={`work_jobTitle_${work.id}`}
                        value={work.jobTitle}
                        name="jobTitle"
                        onChange={onChangeHandler}
                        dataAttributes={{
                          'data-id': work.id,
                          'data-key': 'works',
                        }}
                        placeholder="Job title"
                      />

                      <FormItem
                        id={`work_companyName_${work.id}`}
                        value={work.companyName}
                        name="companyName"
                        onChange={onChangeHandler}
                        dataAttributes={{
                          'data-id': work.id,
                          'data-key': 'works',
                        }}
                        placeholder="Company name"
                      />
                      <FormItem
                        tag={'select'}
                        id={`work_dateFrom_month_${work.id}`}
                        value={work.dateFrom.month}
                        name="dateFrom"
                        onChange={onChangeHandler}
                        dataAttributes={{
                          'data-id': work.id,
                          'data-key': 'works',
                          'data-sub-key': 'month',
                        }}
                      />
                      <FormItem
                        id={`work_dateFrom_year_${work.id}`}
                        value={work.dateFrom.year}
                        name="dateFrom"
                        onChange={onChangeHandler}
                        type="number"
                        dataAttributes={{
                          'data-id': work.id,
                          'data-key': 'works',
                          'data-sub-key': 'year',
                        }}
                        placeholder="Year"
                        label={{ className: 'visibility-hidden' }}
                      />
                      <FormItem
                        tag={'select'}
                        id={`work_dateTo_month_${work.id}`}
                        value={work.dateTo.month}
                        name="dateTo"
                        onChange={onChangeHandler}
                        dataAttributes={{
                          'data-id': work.id,
                          'data-key': 'works',
                          'data-sub-key': 'month',
                        }}
                      />
                      <FormItem
                        id={`work_dateTo_year_${work.id}`}
                        value={work.dateTo.year}
                        name="dateTo"
                        onChange={onChangeHandler}
                        type="number"
                        dataAttributes={{
                          'data-id': work.id,
                          'data-key': 'works',
                          'data-sub-key': 'year',
                        }}
                        placeholder="Year"
                        label={{ className: 'visibility-hidden' }}
                      />
                      <FormItem
                        tag={'textarea'}
                        id={`work_description_${work.id}`}
                        value={work.description}
                        name="description"
                        onChange={onChangeHandlerDescription}
                        dataAttributes={{
                          'data-root-id': work.id,
                          'data-root-key': 'works',
                          'data-key': 'description',
                        }}
                        placeholder="Min 3 characters, and max 100 characters."
                        props={{ maxLength: 100 }}
                      >
                        <div className="btn-container">
                          <Button
                            className="btn-form btn-add"
                            text="Add description"
                            onClick={addDescriptionHandler}
                            dataAttributes={{
                              'data-key': 'descriptions',
                              'data-root-key': 'works',
                              'data-work-id': work.id,
                            }}
                          />
                        </div>

                        {work.descriptions.length > 0 && (
                          <ul className="descriptions">
                            {work.descriptions.map((description) => {
                              return (
                                <FormItem
                                  tag={'textarea'}
                                  key={description.id}
                                  id={`work_description_${work.id}_${description.id}`}
                                  value={description.text}
                                  name="description"
                                  onChange={onChangeHandlerDescription}
                                  dataAttributes={{
                                    'data-root-id': work.id,
                                    'data-id': description.id,
                                    'data-root-key': 'works',
                                    'data-key': 'descriptions',
                                  }}
                                  label={{ className: 'visibility-hidden' }}
                                  placeholder="Min 3 characters, and max 100 characters."
                                  props={{ maxLength: 100 }}
                                >
                                  <div className="btn-container">
                                    <Button
                                      className="btn-form btn-delete"
                                      text="Delete description"
                                      onClick={(e) => {
                                        deleteRef.current = {
                                          callback: deleteDescriptionHandler,
                                          btn: e.currentTarget,
                                        };
                                        setModal(true);
                                      }}
                                      dataAttributes={{
                                        'data-root-id': work.id,
                                        'data-id': description.id,
                                        'data-root-key': 'works',
                                      }}
                                    />
                                  </div>
                                </FormItem>
                              );
                            })}
                          </ul>
                        )}
                      </FormItem>
                      <div className="btn-container">
                        <Button
                          className="btn-form btn-delete"
                          text="Delete"
                          onClick={(e) => {
                            deleteRef.current = {
                              callback: deleteWorkHandler,
                              btn: e.currentTarget,
                            };
                            setModal(true);
                          }}
                          dataAttributes={{
                            'data-id': work.id,
                          }}
                        />
                      </div>
                    </ul>
                  );
                })}
              </form>
            )}
          </div>
        ) : (
          workData.works.length > 0 && (
            <div className="work-container">
              {workData.works.map((work) => {
                return (
                  <article className="work-item" key={work.id}>
                    <h3>{work.jobTitle}</h3>
                    <h4>{work.companyName}</h4>
                    <p>{/* {parseDate(work.dateFrom)} - {parseDate(work.dateTo)} */}loading...</p>
                    {work.descriptions.length > 0 && (
                      <ul className="descriptions-list">
                        {work.descriptions.map((description) => {
                          return <li key={description.id}>{description.text}</li>;
                        })}
                      </ul>
                    )}
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
