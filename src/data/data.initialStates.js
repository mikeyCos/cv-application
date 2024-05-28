const header = {
  firstName: '',
  lastName: '',
  jobTitle: '',
};

const contact = {
  email: '',
  phone: '',
  address: '',
};

const education = {
  school: {
    degree: '',
    schoolName: '',
    dateFrom: {
      month: '',
      year: '',
    },
    dateTo: {
      month: '',
      year: '',
    },
  },
  schools: [],
};

const skills = {
  skill: '',
  skills: [],
};

const work = {
  work: {
    jobTitle: '',
    companyName: '',
    dateFrom: {
      month: '',
      year: '',
    },
    dateTo: {
      month: '',
      year: '',
    },
    description: '',
    descriptions: [],
    nextId: 0,
  },
  works: [],
};

const references = {
  reference: {
    firstName: '',
    lastName: '',
    jobTitle: '',
    companyName: '',
    phone: '',
    email: '',
  },
  references: [],
};

export { header, contact, education, skills, work, references };
