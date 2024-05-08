import { useState } from 'react';
import '../styles/work.css';

let nextId = 1;
export default function Work({ isEditing }) {
  const [workData, setWorkData] = useState({
    work: {
      jobTitle: '',
      companyName: '',
      dateFrom: '',
      dateTo: '',
      description: '',
      descriptions: [{ id: 0, text: 'TESTING' }],
      nextId: 0,
    },
    works: [
      {
        id: 0,
        jobTitle: 'Unemployed',
        companyName: 'Unemployment Inc.',
        dateFrom: '',
        dateTo: '',
        description: '',
        descriptions: [
          { id: 0, text: 'Staring at walls.' },
          { id: 1, text: 'Sleeping' },
        ],
        nextId: 1,
      },
      {
        id: 1,
        jobTitle: 'Lifeguard',
        companyName: 'Lifeguard Inc.',
        dateFrom: '',
        dateTo: '',
        description: '',
        descriptions: [
          { id: 0, text: 'Swimming' },
          { id: 1, text: 'Monitors swimmers' },
        ],
        nextId: 1,
      },
    ],
  });

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

  const addWorkHandler = (e) => {
    const newWork = { ...workData.work, id: ++nextId };
    setWorkData({
      work: {
        jobTitle: '',
        companyName: '',
        dateFrom: '',
        dateTo: '',
        description: '',
        descriptions: [],
        nextId: 0,
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
        jobTitle: '',
        companyName: '',
        dateFrom: '',
        dateTo: '',
        description: '',
        descriptions: [],
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
      // This is gross :(
      newData = data.map((work) => {
        if (work.id === +rootId) {
          return {
            ...work,
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
            <form>
              <ul>
                <li className="form-item">
                  <label htmlFor="jobTitle">Job title:</label>
                  <input
                    id="jobTitle"
                    value={workData.work.jobTitle}
                    type="text"
                    name="jobTitle"
                    onChange={onChangeHandler}
                    data-key="work"
                  />
                </li>
                <li className="form-item">
                  <label htmlFor="companyName">Company name:</label>
                  <input
                    id="companyName"
                    value={workData.work.companyName}
                    type="text"
                    name="companyName"
                    onChange={onChangeHandler}
                    data-key="work"
                  />
                </li>
                <li className="form-item">
                  <label htmlFor="dateFrom">Date from:</label>
                  <input
                    id="dateFrom"
                    value={workData.work.dateFrom}
                    type="month"
                    name="dateFrom"
                    onChange={onChangeHandler}
                    data-key="work"
                  />
                </li>
                <li className="form-item">
                  <label htmlFor="dateTo">Date to:</label>
                  <input
                    id="dateTo"
                    value={workData.work.dateTo}
                    type="month"
                    name="dateTo"
                    onChange={onChangeHandler}
                    data-key="work"
                  />
                </li>
                <li>
                  <label htmlFor="description">Descriptions:</label>
                  <input
                    id="description"
                    value={workData.work.description}
                    type="text"
                    name="description"
                    onChange={onChangeHandlerDescription}
                    data-root-key="work"
                    data-key="description"
                  />
                  <button
                    type="button"
                    data-key="descriptions"
                    data-root-key="work"
                    onClick={addDescriptionHandler}
                  >
                    Add Description
                  </button>
                  {workData.work.descriptions.length > 0 && (
                    <ul>
                      {workData.work.descriptions.map((description) => {
                        return (
                          <li key={description.id}>
                            <label htmlFor={`description_${description.id}`}></label>
                            <input
                              id={`description_${description.id}`}
                              value={description.text}
                              type="text"
                              name="description"
                              onChange={onChangeHandlerDescription}
                              data-id={description.id}
                              data-root-key="work"
                              data-key="descriptions"
                            />
                            <button
                              type="button"
                              data-id={description.id}
                              data-root-key="work"
                              onClick={deleteDescriptionHandler}
                            >
                              Delete
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
                <button type="button" onClick={addWorkHandler}>
                  Add
                </button>
                <button type="button" onClick={resetWorkHandler}>
                  Reset
                </button>
              </ul>

              {workData.works.map((work) => {
                return (
                  <ul key={work.id}>
                    <li data-id={work.id} className="form-item">
                      <label htmlFor={`jobTitle_${work.id}`}>Job title:</label>
                      <input
                        id={`jobTitle_${work.id}`}
                        value={work.jobTitle}
                        type="text"
                        name="jobTitle"
                        onChange={onChangeHandler}
                        data-id={work.id}
                        data-key="works"
                      />
                    </li>
                    <li data-id={work.id} className="form-item">
                      <label htmlFor={`companyName_${work.id}`}>Company name:</label>
                      <input
                        id={`companyName_${work.id}`}
                        value={work.companyName}
                        type="text"
                        name="companyName"
                        onChange={onChangeHandler}
                        data-id={work.id}
                        data-key="works"
                      />
                    </li>
                    <li data-id={work.id} className="form-item">
                      <label htmlFor={`dateFrom_${work.id}`}>Date from:</label>
                      <input
                        id={`dateFrom_${work.id}`}
                        value={work.dateFrom}
                        type="month"
                        name="dateFrom"
                        onChange={onChangeHandler}
                        data-id={work.id}
                        data-key="works"
                      />
                    </li>
                    <li data-id={work.id} className="form-item">
                      <label htmlFor={`dateTo_${work.id}`}>Date to:</label>
                      <input
                        id={`dateTo_${work.id}`}
                        value={work.dateTo}
                        type="month"
                        name="dateTo"
                        onChange={onChangeHandler}
                        data-id={work.id}
                        data-key="works"
                      />
                    </li>
                    <li data-id={work.id} className="form-item">
                      <label htmlFor={`description_${work.id}`}>Descriptions:</label>
                      <input
                        id={`description_${work.id}`}
                        value={work.description}
                        type="text"
                        name="description"
                        onChange={onChangeHandlerDescription}
                        data-root-id={work.id}
                        data-root-key="works"
                        data-key="description"
                      />
                      <button
                        type="button"
                        data-key="descriptions"
                        data-root-key="works"
                        data-work-id={work.id}
                        onClick={addDescriptionHandler}
                      >
                        Add Description
                      </button>
                      {work.descriptions.length > 0 && (
                        <ul>
                          {work.descriptions.map((description) => {
                            return (
                              <li key={description.id}>
                                <label htmlFor={`description_${work.id}_${description.id}`}></label>
                                <input
                                  id={`description_${work.id}_${description.id}`}
                                  value={description.text}
                                  type="text"
                                  name="description"
                                  onChange={onChangeHandlerDescription}
                                  data-root-id={work.id}
                                  data-id={description.id}
                                  data-root-key="works"
                                  data-key="descriptions"
                                />
                                <button
                                  type="button"
                                  data-root-id={work.id}
                                  data-id={description.id}
                                  data-root-key="works"
                                  onClick={deleteDescriptionHandler}
                                >
                                  Delete
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                    <button type="button" data-id={work.id} onClick={deleteWorkHandler}>
                      Delete
                    </button>
                  </ul>
                );
              })}
            </form>
          ) : (
            <>
              {workData.works.map((work) => {
                return (
                  <article key={work.id}>
                    <h3>{work.jobTitle}</h3>
                    <h3>{work.companyName}</h3>
                    <p>
                      {work.dateFrom} - {work.dateTo}
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
