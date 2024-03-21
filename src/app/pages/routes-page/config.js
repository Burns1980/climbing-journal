export const formFields = [
  {
    name: 'Route name',
    inputProps: { required: true, type: 'text' },
  },
  {
    name: 'Date climbed',
    inputProps: { type: 'date', min: '1900-01-01' },
  },
  {
    name: 'YDS grade',
    inputProps: { type: 'text' },
  },
  {
    name: 'Type',
    inputProps: { type: 'text' },
  },
  {
    name: 'Length',
    inputProps: { type: 'text' },
  },
  {
    name: 'Pitches',
    inputProps: { type: 'number' },
  },
  {
    name: 'Grade',
    inputProps: { type: 'text' },
  },
  {
    name: 'Description',
    inputProps: {
      type: 'textarea',
      placeholder: 'What do you have to say about the route?',
    },
  },
  {
    name: 'Gear',
    inputProps: {
      type: 'textarea',
      placeholder:
        'Add some gear here, unless you free soloed. What kind of shoes did you wear?',
    },
  },
  {
    name: 'Picture attachments',
    inputProps: { type: 'file' },
  },
];
