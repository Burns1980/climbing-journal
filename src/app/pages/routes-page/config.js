const gradeOptions = [
  '5.0',
  '5.1',
  '5.2',
  '5.3',
  '5.4',
  '5.5',
  '5.6',
  '5.7',
  '5.8-',
  '5.8',
  '5.8+',
  '5.9-',
  '5.9',
  '5.9+',
  '5.10a',
  '5.10b',
  '5.10c',
  '5.10d',
  '5.10-',
  '5.10',
  '5.10+',
  '5.11a',
  '5.11b',
  '5.11c',
  '5.11d',
  '5.11-',
  '5.11',
  '5.11+',
  '5.12a',
  '5.12b',
  '5.12c',
  '5.12d',
  '5.12-',
  '5.12',
  '5.12+',
  '5.13a',
  '5.13b',
  '5.13c',
  '5.13d',
  '5.13-',
  '5.13',
  '5.13+',
  '5.14a',
  '5.14b',
  '5.14c',
  '5.14d',
  '5.14-',
  '5.14',
  '5.14+',
  '5.15a',
  '5.15b',
  '5.15c',
  '5.15d',
  '5.15-',
  '5.15',
  '5.15+',
];

// the name property needs to match the name in the database
export const formFields = [
  {
    label: 'Route name',
    input: {
      props: { required: true, type: 'text', name: 'name' },
    },
  },
  {
    label: 'Date climbed',
    input: {
      props: { type: 'date', min: '1900-01-01', name: 'dateClimbed' },
    },
  },
  {
    label: 'YDS grade',
    select: {
      props: { required: true, name: 'grade', options: gradeOptions },
    },
  },
  {
    label: 'Seriousness rating',
    select: {
      props: { name: 'grade', options: ['G', 'PG', 'PG-13', 'R', 'X'] },
    },
  },
  {
    label: 'Type',
    select: {
      props: {
        name: 'type',
        options: ['sport', 'traditional', 'boulder', 'aid', 'ice', 'mixed'],
      },
    },
  },
  {
    label: 'Length',
    input: {
      props: { type: 'text', name: 'length' },
    },
  },
  {
    label: 'Pitches',
    input: {
      props: { type: 'number', name: 'pitches' },
    },
  },
  {
    label: 'Grade',
    select: {
      props: {
        name: 'commitmentGrade',
        options: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'],
      },
    },
  },
  {
    label: 'Description',
    textarea: {
      props: {
        placeholder: 'What do you have to say about the route?',
        name: 'description',
      },
    },
  },
  {
    label: 'Gear',
    textarea: {
      props: {
        placeholder:
          'Add some gear here, unless you free soloed. What kind of shoes did you wear?',
        name: 'gear',
      },
    },
  },
  {
    label: 'Cover image URL',
    input: {
      props: { type: 'text', name: 'imageCoverUrl' },
    },
  },
];
