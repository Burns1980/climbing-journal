import userEvent from '@testing-library/user-event';
import { it, expect, vi, describe } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { forwardRef } from 'react';

import { DataEntryForm } from '..';

const mockHandleSubmit = vi.fn();
const mockHandleChange = vi.fn();
const mockClearForm = vi.fn();

vi.mock('../modal/Modal.jsx', () => {
  const MockedModal = forwardRef(({ props, children }, ref) => {
    return (
      <dialog {...props} ref={ref} data-testid="mock-modal">
        {children}
      </dialog>
    );
  });

  MockedModal.displayName = 'MockedModal';

  return {
    default: MockedModal,
  };
});

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  const MockedForm = forwardRef(({ children }, ref) => (
    <form ref={ref} data-testid="mock-form">
      {children}
    </form>
  ));

  MockedForm.displayName = 'MockedForm';

  return {
    ...actual,
    useActionData: () => null,
    useNavigate: () => vi.fn(),
    useNavigation: () => ({ state: 'idle' }),
    Form: MockedForm,
  };
});

const mockFields = [
  {
    label: 'Climb type (required)',
    inputElementType: 'select',
    optionsKey: 'climbTypes',
    configProps: {
      name: 'testClimbType',
    },
  },
  {
    label: 'Description',
    inputElementType: 'textarea',
    configProps: {
      placeholder: 'What do you have to say about the route?',
      name: 'testDescription',
    },
  },
  {
    label: 'Route name',
    inputElementType: 'input',
    configProps: {
      type: 'text',
      name: 'testInput',
    },
  },
  {
    label: 'Number input',
    inputElementType: 'input',
    configProps: {
      type: 'number',
      name: 'testNumberInput',
    },
  },
];

const renderDataEntryForm = (isEditMode, mockFormValues) =>
  render(
    <DataEntryForm
      dataTc="RouteForm"
      isEditMode={isEditMode}
      handleSubmit={mockHandleSubmit}
      handleChange={mockHandleChange}
      fields={mockFields}
      formValues={mockFormValues}
      clearForm={mockClearForm}
    />
  );

describe('Form in non-edit mode', () => {
  const mockFormValues = [
    { name: 'testClimbType', value: '', options: ['mock1', 'mock2', 'mock3'] },
    { name: 'testDescription', value: '' },
    { name: 'testInput', value: '' },
    { name: 'testNumberInput', value: '' },
  ];

  it('should render all inputs with the correct input type as specified in the fields prop, when isEditMode=false', () => {
    renderDataEntryForm(false, mockFormValues);

    mockFields.forEach((field) => {
      const element = screen.getByLabelText(field.label);
      expect(element.tagName).toBe(field.inputElementType.toUpperCase());
    });
  });

  it('should render all <option> elements when a <select> element is clicked, when isEditMode=false', () => {
    const mockFieldSelectElement = mockFields.find((field) => field.inputElementType === 'select');
    const user = userEvent.setup();
    const foundValue = mockFormValues.find(
      (value) => value.name === mockFieldSelectElement.configProps.name
    );

    renderDataEntryForm(false, mockFormValues);

    const selectElement = screen.getByRole('combobox');

    user.click(selectElement);

    if (foundValue) {
      foundValue.options.forEach((option, idx) => {
        const optionElements = screen.getAllByRole('option');
        expect(optionElements[idx]).toHaveTextContent(option);
      });
    }
  });

  it('should render the correct buttons when a non-edited form is rendered, when isEditMode=false', async () => {
    renderDataEntryForm(false, mockFormValues);

    const formElement = screen.getByTestId('mock-form');
    const clearFormButton = within(formElement).getByRole('button', {
      name: 'Clear form',
    });
    const saveFormButton = within(formElement).getByRole('button', {
      name: 'Save',
    });

    expect(clearFormButton).toBeInTheDocument();
    expect(saveFormButton).toBeInTheDocument();
  });
});

describe('Form in edit mode', () => {
  const mockEditFormValues = [
    { name: 'testClimbType', value: 'mock2', options: ['mock1', 'mock2', 'mock3'] },
    { name: 'testDescription', value: 'test description' },
    { name: 'testInput', value: 'turtles' },
    { name: 'testNumberInput', value: '5' },
  ];

  it('should render the correct buttons when a form is rendered with isEditMode=true', async () => {
    renderDataEntryForm(true, mockEditFormValues);

    const formElement = screen.getByTestId('mock-form');

    const clearFormButton = within(formElement).getByRole('button', {
      name: 'Discard changes',
    });
    const saveFormButton = within(formElement).getByRole('button', {
      name: 'Save',
    });

    expect(clearFormButton).toBeInTheDocument();
    expect(saveFormButton).toBeInTheDocument();
  });

  it('should render all inputs with the correct input type as specified in the fields prop and the correct values should be rendered, when isEditMode=true', () => {
    renderDataEntryForm(true, mockEditFormValues);

    mockFields.forEach((field) => {
      const element = screen.getByLabelText(field.label);
      const mockValue = mockEditFormValues.find((item) => item.name === field.configProps.name);

      expect(element.tagName).toBe(field.inputElementType.toUpperCase());
      expect(element.value).toBe(mockValue.value);
    });
  });
});
