import { describe, it, expect } from 'vitest';
import { groupFieldsIntoRows } from './helpers';

describe('groupFieldsIntoRows', () => {
  it('should group fields into rows of two', () => {
    const fields = [
      { name: 'field1', inputElementType: 'input' },
      { name: 'field2', inputElementType: 'input' },
      { name: 'field3', inputElementType: 'input' },
      { name: 'field4', inputElementType: 'input' },
    ];

    const expectedRows = [
      [
        { name: 'field1', inputElementType: 'input' },
        { name: 'field2', inputElementType: 'input' },
      ],
      [
        { name: 'field3', inputElementType: 'input' },
        { name: 'field4', inputElementType: 'input' },
      ],
    ];

    const result = groupFieldsIntoRows(fields);
    expect(result).toEqual(expectedRows);
  });

  it('should handle an odd number of fields', () => {
    const fields = [
      { name: 'field1', inputElementType: 'input' },
      { name: 'field2', inputElementType: 'input' },
      { name: 'field3', inputElementType: 'input' },
    ];

    const expectedRows = [
      [
        { name: 'field1', inputElementType: 'input' },
        { name: 'field2', inputElementType: 'input' },
      ],
      [{ name: 'field3', inputElementType: 'input' }],
    ];

    const result = groupFieldsIntoRows(fields);
    expect(result).toEqual(expectedRows);
  });

  it('should return an empty array when no fields are provided', () => {
    const fields = [];

    const expectedRows = [];

    const result = groupFieldsIntoRows(fields);
    expect(result).toEqual(expectedRows);
  });
});
