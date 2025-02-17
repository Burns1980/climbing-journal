import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { act } from "react";
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';
import { fetchRoutes } from '../../utils';

import RouteForm from './RouteForm';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../../utils', () => ({
  fetchRoutes: jest.fn(),
}));

const mockRoute = { name: 'Test Route', grade: '5.10b' };

describe('RouteForm', () => {
  it('renders the form and submits data', async () => {
    render(
      <MemoryRouter>
        <RouteForm />
      </MemoryRouter>
    );

    const routeNameInput = screen.getByLabelText('Route Name');
    const difficultyInput = screen.getByLabelText('Difficulty');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    fireEvent.change(routeNameInput, { target: { value: mockRoute.name } });
    fireEvent.change(difficultyInput, { target: { value: mockRoute.grade } });

    await act(async () => {
      userEvent.click(submitButton);
    });

    // Check if fetchRoutes was called with the data from the form fields
    expect(fetchRoutes).toHaveBeenCalledWith('POST', {
      data: [mockRoute],
    });
  });

  it('calls useNavigate with /routes-climbed on successful form submission', async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    render(
      <MemoryRouter>
        <RouteForm />
      </MemoryRouter>
    );

    const routeNameInput = screen.getByLabelText('Route Name');
    const difficultyInput = screen.getByLabelText('Difficulty');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    fireEvent.change(routeNameInput, { target: { value: 'Test Route' } });
    fireEvent.change(difficultyInput, { target: { value: 'Intermediate' } });

    await act(async () => {
      userEvent.click(submitButton);
    });

    // Check if useNavigate was called with /routes-climbed
    expect(navigate).toHaveBeenCalledWith('/routes-climbed');
  });
});
