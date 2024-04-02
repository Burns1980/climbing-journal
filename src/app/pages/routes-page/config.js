// Field types definition
export const DEFAULT_OPTIONS_VALUE = '--Choose aid from climb type--';
export const fieldTypes = {
  input: 'input',
  select: 'select',
  textarea: 'textarea',
};

// Options for select fields
export const optionSets = {
  climbTypes: ['sport', 'traditional', 'boulder', 'aid', 'ice', 'mixed'],
  YDSGrades: [
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
  ],
  iceGrades: ['WI1', 'WI2', 'WI3', 'WI4', 'WI5', 'WI6', 'WI7'],
  boulderGrades: [
    'V0',
    'V1',
    'V2',
    'V3',
    'V4',
    'V5',
    'V6',
    'V7',
    'V8',
    'V9',
    'V10',
    'V11',
    'V12',
    'V13',
    'V14',
    'V15',
    'V16',
  ],
  mixedGrades: [
    'M1',
    'M2',
    'M3',
    'M4',
    'M5',
    'M6',
    'M7',
    'M8',
    'M9',
    'M10',
    'M11',
    'M12',
    'M13',
    'M14',
    'M15',
    'M16',
  ],
  disabledAid: [DEFAULT_OPTIONS_VALUE],
  aidRatings: [
    'C1',
    'C2',
    'C3',
    'C4',
    'C5',
    'A0',
    'A1',
    'A2',
    'A3',
    'A4',
    'A5',
  ],
  seriousnessRatings: ['G', 'PG', 'PG-13', 'R', 'X'],
  commitmentGrades: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'],
};

// Form fields definition
export const formFields = [
  {
    label: 'Route name',
    type: fieldTypes.input,
    configProps: {
      // required: true,
      type: 'text',
      name: 'name',
    },
  },
  {
    label: 'Date climbed',
    type: fieldTypes.input,
    configProps: { type: 'date', min: '1900-01-01', name: 'dateClimbed' },
  },
  {
    label: 'Climb type',
    type: fieldTypes.select,
    configProps: {
      name: 'type',
      required: true,
    },
    optionsKey: 'climbTypes',
  },
  {
    label: 'Difficulty grade',
    type: fieldTypes.select,
    configProps: {
      required: true,
      name: 'grade',
    },
    optionsKey: 'YDSGrades',
  },
  {
    label: 'Aid rating',
    type: fieldTypes.select,
    configProps: {
      name: 'aidRating',
    },
    optionsKey: 'disabledAid',
  },
  {
    label: 'Seriousness rating',
    type: fieldTypes.select,
    configProps: { name: 'seriousnessRating' },
    optionsKey: 'seriousnessRatings',
  },
  {
    label: 'Length',
    type: fieldTypes.input,
    configProps: { type: 'text', name: 'length' },
  },
  {
    label: 'Pitches',
    type: fieldTypes.input,
    configProps: { type: 'number', name: 'pitches' },
  },
  {
    label: 'Grade',
    type: fieldTypes.select,
    configProps: { name: 'commitmentGrade' },
    optionsKey: 'commitmentGrades',
  },
  {
    label: 'Description',
    type: fieldTypes.textarea,
    configProps: {
      placeholder: 'What do you have to say about the route?',
      name: 'description',
    },
  },
  {
    label: 'Gear',
    type: fieldTypes.textarea,
    configProps: {
      placeholder:
        'Add some gear here, unless you free soloed. What kind of shoes did you wear?',
      name: 'gear',
    },
  },
  {
    label: 'Cover image URL',
    type: fieldTypes.input,
    configProps: { type: 'text', name: 'imageCoverUrl' },
  },
];
