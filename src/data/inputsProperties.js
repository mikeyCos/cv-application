// How to fetch and input props?
export default (key, options) => {
  console.log(key);
  //   console.log(properties[key]);
};

const properties = {
  // Header.jsx
  header: {},
  // Contact.jsx
  contact: {},
  // Education.jsx
  education: {},
  // Skills.jsx
  skill: {
    id: 'skill',
    // value:{skillsData.skill},
    name: 'skill',
    // onChange: { onChangeHandler },
    dataAttributes: { 'data-key': 'skill' },
  },
  skills: {},
  // Work.jsx
  work: {
    // jobTitle: {
    //   id: `jobTitle_${work.id}`,
    //   value: work.jobTitle,
    //   name: 'jobTitle',
    //   onChange: onChangeHandler,
    //   dataAttributes: {
    //     'data-id': work.id,
    //     'data-key': 'works',
    //   },
    // },
  },
  works: {},
  // References.jsx
  reference: {},
  references: {},
};
