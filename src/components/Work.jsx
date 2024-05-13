import { useState } from 'react';
import { work as initialWorkState } from '../data/data.initialStates';
import FormItem from './FormItem';
import Button from './Button';
import parseDate from '../utilities/parseDate';
import '../styles/work.css';

let nextId = 1;
export default function Work({ isEditing }) {
  const [workData, setWorkData] = useState({ ...initialWorkState });
  const onChangeHandler = (e) => {
    const input = e.currentTarget;
    const value = input.value;
    const { id, key, prop } = { prop: input.name, ...input.dataset };
    const data = workData[key];
    const newData = Array.isArray(data)
      ? data.map((item) => {
          return item.id === +id ? { ...item, [prop]: value } : item;
        })
      : { ...data, [prop]: value };
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

  const deleteWorkHandler = (e) => {
    const btn = e.currentTarget;
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
    const data = workData[rootKey];

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

  const deleteDescriptionHandler = (e) => {
    const btn = e.currentTarget;
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
              <form>
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
                    id="work_dateFrom"
                    value={workData.work.dateFrom}
                    name="dateFrom"
                    onChange={onChangeHandler}
                    type="month"
                    dataAttributes={{ 'data-key': 'work' }}
                    label={{ text: '(MMM YYYY)' }}
                  />
                  <FormItem
                    id="work_dateTo"
                    value={workData.work.dateFrom}
                    name="dateTo"
                    onChange={onChangeHandler}
                    type="month"
                    dataAttributes={{ 'data-key': 'work' }}
                    label={{ text: '(MMM YYYY)' }}
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
                                onClick={deleteDescriptionHandler}
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
                  <Button text="Add" onClick={addWorkHandler}></Button>
                  <Button text="Reset" onClick={resetWorkHandler}></Button>
                </ul>
              </form>
              <form>
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
                        id={`work_dateFrom_${work.id}`}
                        value={work.dateFrom}
                        name="dateFrom"
                        onChange={onChangeHandler}
                        type="month"
                        dataAttributes={{
                          'data-id': work.id,
                          'data-key': 'works',
                        }}
                      />
                      <FormItem
                        id={`work_dateTo_${work.id}`}
                        value={work.dateTo}
                        name="dateTo"
                        onChange={onChangeHandler}
                        type="month"
                        dataAttributes={{
                          'data-id': work.id,
                          'data-key': 'works',
                        }}
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
                                    onClick={deleteDescriptionHandler}
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
                        onClick={deleteWorkHandler}
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
                    <p>
                      {parseDate(work.dateFrom)} - {parseDate(work.dateTo)}
                    </p>
                    <ul>
                      {work.descriptions.map((description) => {
                        <li key={description.id}>{description.text}</li>;
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
