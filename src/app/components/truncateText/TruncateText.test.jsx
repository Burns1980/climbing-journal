import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import TruncateText from './TruncateText';

describe('TruncateText', () => {
  const mockOnClick = jest.fn();

  test('renders without crashing', () => {
    render(
      <TruncateText text="Test text" maxWords={10} onClick={mockOnClick} />
    );
    expect(screen.getByText('Test text')).toBeInTheDocument();
  });

  test('displays correct text without truncating when under max words', () => {
    const testText = 'Test text with eight total words.';
    render(
      <TruncateText text={testText} maxWords={10} onClick={mockOnClick} />
    );
    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  test('truncates text and shows read more button when over max words', () => {
    const testText =
      'This text has more words than the maxWords limit set and should be truncated';
    render(<TruncateText text={testText} maxWords={5} onClick={mockOnClick} />);
    expect(screen.getByText(/click to read more/)).toBeInTheDocument();
  });

  test('click to read more button triggers onClick event', () => {
    const testText =
      'This text will be truncated and a click to read more button should be visible';
    render(<TruncateText text={testText} maxWords={5} onClick={mockOnClick} />);
    fireEvent.click(screen.getByText('click to read more'));
    expect(mockOnClick).toHaveBeenCalled();
  });
});
