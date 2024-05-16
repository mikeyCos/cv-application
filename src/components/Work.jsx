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
    const { workId, rootKey, key } = btn.dataset;
    const input = e.currentTarget.parentElement.querySelector('input');
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
    <section className="work">
      <div>
        <h2>Work Experience</h2>
        <div>
          {isEditing ? (
            <>
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
                  />
                  <FormItem
                    id="work_companyName"
                    value={workData.work.companyName}
                    name="companyName"
                    onChange={onChangeHandler}
                    dataAttributes={{ 'data-key': 'work' }}
                    placeholder="Company name"
                  />
                  <FormItem
                    defaultTag={false}
                    id="work_dateFrom_month"
                    value={workData.work.dateFrom.month}
                    name="dateFrom"
                    onChange={onChangeHandler}
                    dataAttributes={{ 'data-key': 'work', 'data-sub-key': 'month' }}
                  />
                  <FormItem
                    id="work_dateFrom_year"
                    value={workData.work.dateFrom.year}
                    name="dateFrom"
                    onChange={onChangeHandler}
                    type="number"
                    dataAttributes={{ 'data-key': 'work', 'data-sub-key': 'year' }}
                    placeholder="Year"
                    label={{ className: 'visibility-hidden' }}
                  />
                  <FormItem
                    defaultTag={false}
                    id="work_dateTo_month"
                    value={workData.work.dateTo.month}
                    name="dateTo"
                    onChange={onChangeHandler}
                    dataAttributes={{ 'data-key': 'work', 'data-sub-key': 'month' }}
                  />
                  <FormItem
                    id="work_dateTo_year"
                    value={workData.work.dateTo.year}
                    name="dateTo"
                    onChange={onChangeHandler}
                    type="number"
                    dataAttributes={{ 'data-key': 'work', 'data-sub-key': 'year' }}
                    placeholder="Year"
                    label={{ className: 'visibility-hidden' }}
                  />
                  <FormItem
                    id="work_description"
                    value={workData.work.description}
                    name="description"
                    onChange={onChangeHandlerDescription}
                    dataAttributes={{ 'data-key': 'description', 'data-root-key': 'work' }}
                    placeholder="Job description"
                  >
                    <Button
                      text="Add description"
                      // type='submit'
                      onClick={addDescriptionHandler}
                      dataAttributes={{ 'data-key': 'descriptions', 'data-root-key': 'work' }}
                    ></Button>
                    {workData.work.descriptions.length > 0 && (
                      <ul>
                        {workData.work.descriptions.map((description) => {
                          return (
                            <FormItem
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
                              placeholder="Edit or delete job description"
                            >
                              <Button
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
                              ></Button>
                            </FormItem>
                          );
                        })}
                      </ul>
                    )}
                  </FormItem>
                  <Button text="Add" type="submit"></Button>
                  <Button text="Reset" onClick={resetWorkHandler}></Button>
                </ul>
              </form>
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
                        defaultTag={false}
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
                        defaultTag={false}
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
                        id={`work_description_${work.id}`}
                        value={work.description}
                        name="description"
                        onChange={onChangeHandlerDescription}
                        dataAttributes={{
                          'data-root-id': work.id,
                          'data-root-key': 'works',
                          'data-key': 'description',
                        }}
                        placeholder="Job description"
                      >
                        <Button
                          text="Add description"
                          onClick={addDescriptionHandler}
                          dataAttributes={{
                            'data-key': 'descriptions',
                            'data-root-key': 'works',
                            'data-work-id': work.id,
                          }}
                        ></Button>

                        {work.descriptions.length > 0 && (
                          <ul>
                            {work.descriptions.map((description) => {
                              return (
                                <FormItem
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
                                  placeholder="Edit or delete job description"
                                  label={{ className: 'visibility-hidden' }}
                                >
                                  <Button
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
                                  ></Button>
                                </FormItem>
                              );
                            })}
                          </ul>
                        )}
                      </FormItem>
                      <Button
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
                      ></Button>
                    </ul>
                  );
                })}
              </form>
            </>
          ) : (
            <>
              {workData.works.map((work) => {
                return (
                  <article key={work.id}>
                    <h3>{work.jobTitle}</h3>
                    <h3>{work.companyName}</h3>
                    <p>{/* {parseDate(work.dateFrom)} - {parseDate(work.dateTo)} */}loading...</p>
                    <ul>
                      {work.descriptions.map((description) => {
                        return <li key={description.id}>{description.text}</li>;
                      })}
                    </ul>
                  </article>
                );
              })}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
