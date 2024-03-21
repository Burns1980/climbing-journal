export const formFields = [
  {
    name: 'Route name',
    inputProps: { required: true, type: 'text' },
  },
  {
    name: 'Date climbed',
    inputProps: { type: 'date' },
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
      placeholder: 'placeholder text for description',
    },
  },
  {
    name: 'Gear',
    inputProps: {
      type: 'textarea',
      placeholder: 'placeholder text for gear',
    },
  },
  {
    name: 'Picture attachments',
    inputProps: { type: 'file' },
  },
];
