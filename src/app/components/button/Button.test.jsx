import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Button from './Button';

describe('Button component', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(<Button>Click me</Button>);

    const buttonElement = getByText(/click me/i);

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('btn text-md');
    expect(buttonElement).toHaveAttribute('type', 'button');
  });

  it('renders correctly with custom className', () => {
    const { getByText } = render(
      <Button className="custom-class" id="test-id">
        Click me
      </Button>
    );

    const buttonElement = getByText(/click me/i);

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('custom-class');
    expect(buttonElement).toHaveAttribute('id', 'test-id');
  });

  it('renders correctly with type submit', () => {
    const { getByText } = render(<Button type="submit">Submit</Button>);

    const buttonElement = getByText(/submit/i);

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute('type', 'submit');
  });
});
