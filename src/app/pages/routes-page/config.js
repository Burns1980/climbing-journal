// the name property needs to match the name in the database
export const formFields = [
  {
    label: 'Route name',
    inputProps: { required: true, type: 'text' },
    name: 'name',
  },
  {
    label: 'Date climbed',
    inputProps: { type: 'date', min: '1900-01-01' },
    name: 'dateClimbed',
  },
  {
    label: 'YDS grade',
    inputProps: { type: 'text', required: true },
    name: 'grade',
  },
  {
    label: 'Type',
    inputProps: { type: 'text' },
    name: 'type',
  },
  {
    label: 'Length',
    inputProps: { type: 'text' },
    name: 'length',
  },
  {
    label: 'Pitches',
    inputProps: { type: 'number' },
    name: 'pitches',
  },
  {
    label: 'Grade',
    inputProps: { type: 'text' },
    name: 'commitmentGrade',
  },
  {
    label: 'Description',
    inputProps: {
      type: 'textarea',
      placeholder: 'What do you have to say about the route?',
    },
    name: 'description',
  },
  {
    label: 'Gear',
    inputProps: {
      type: 'textarea',
      placeholder:
        'Add some gear here, unless you free soloed. What kind of shoes did you wear?',
    },
    name: 'gear',
  },
  {
    label: 'Cover image URL',
    inputProps: { type: 'text' },
    name: 'imageCoverUrl',
  },
];
