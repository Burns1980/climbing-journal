import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock createPortal globally
vi.mock('react-dom', async () => {
  const actual = await vi.importActual('react-dom');
  return {
    ...actual,
    createPortal: (node) => node, // Just renders the content normally
  };
});
