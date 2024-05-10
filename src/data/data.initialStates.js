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
      dateFrom: '1990-03',
      dateTo: '1999-09',
    },
    {
      id: 1,
      major: 'major placeholder 1',
      schoolName: 'Helms Deep',
      dateFrom: '2000-01',
      dateTo: '2020-05',
    },
  ],
};

const skills = {
  skill: '',
  skills: [
    { id: 0, value: 'test' },
    { id: 1, value: 'test again' },
  ],
};

const work = {
  work: {
    jobTitle: '',
    companyName: '',
    dateFrom: '',
    dateTo: '',
    description: '',
    // descriptions: [{ id: 0, text: 'TESTING' }],
    descriptions: [],
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
  references: [
    {
      id: 0,
      firstName: 'Woody',
      lastName: 'Joe',
      jobTitle: 'Clown',
      companyName: 'Clown Co.',
      phone: '000-123-4567',
      email: 'email@gmail.com',
    },
  ],
};

export { header, contact, education, skills, work, references };
