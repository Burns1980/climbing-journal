import * as React from 'react';
import { render, act, screen } from '@testing-library/react';
import { useLocation } from 'react-router-dom';
import '@testing-library/jest-dom';
import DataProvider, { DataContext, DataDispatchContext } from './';

import { loadRoutesToState } from '../customHooks/useLoadRoutesToState';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

jest.mock('../effects/routeEffects', () => ({
  loadRoutesToState: jest.fn(),
}));

jest.mock('../utils/http-requests', () => ({
  fetchRoutes: jest.fn(),
}));

// Mock child component that consumes DataContext
const MockChildComponent = () => {
  const { routes, areas } = React.useContext(DataContext);
  return (
    <div>
      <div data-testid="routes">{JSON.stringify(routes)}</div>
      <div data-testid="areas">{JSON.stringify(areas)}</div>
    </div>
  );
};

const initialState = {
  routes: {
    data: [],
    isLoading: true,
    isError: false,
    errorMessage: '',
  },
  areas: {
    data: [],
    isLoading: true,
    isError: false,
    errorMessage: '',
  },
};

describe('DataProvider', () => {
  // Initial state
  it('provides the correct initial state to children on explicit initial landing ', () => {
    const path = { pathname: '/' };
    useLocation.mockReturnValue(path);

    render(
      <DataProvider>
        <MockChildComponent />
      </DataProvider>
    );

    const expectedRoutesState = initialState.routes;

    const expectedAreasState = initialState.areas;

    expect(JSON.parse(screen.getByTestId('routes').textContent)).toEqual(
      expectedRoutesState
    );
    expect(JSON.parse(screen.getByTestId('areas').textContent)).toEqual(
      expectedAreasState
    );
  });

  // Context Provision Test:
  it('provides the expected values through DataContext and DataDispatchContext', () => {
    const TestConsumer = () => {
      const dataContext = React.useContext(DataContext);
      const dataDispatchContext = React.useContext(DataDispatchContext);

      return (
        <>
          <div data-testid="dataContext">{JSON.stringify(dataContext)}</div>
          <div data-testid="dataDispatchContext">
            {typeof dataDispatchContext}
          </div>
        </>
      );
    };

    render(
      <DataProvider>
        <TestConsumer />
      </DataProvider>
    );

    const dataContextValue = JSON.parse(
      screen.getByTestId('dataContext').textContent
    );
    const dataDispatchContextType = screen.getByTestId(
      'dataDispatchContext'
    ).textContent;

    expect(dataContextValue).toEqual(initialState);
    expect(dataDispatchContextType).toEqual('function');
  });

  // Effects test
  it('calls loadRoutesToState when pathname changes to /routes-by-me', () => {
    let path = '/';
    useLocation.mockImplementation(() => ({ pathname: path }));

    render(
      <DataProvider>
        <div>Test Child</div>
      </DataProvider>
    );

    expect(loadRoutesToState).not.toHaveBeenCalled();

    // Simulate pathname change
    act(() => {
      path = '/routes-by-me';
      // Rerender to trigger useEffect
      render(
        <DataProvider>
          <div>Test Child</div>
        </DataProvider>
      );
    });

    // Now, loadRoutesToState should be called
    expect(loadRoutesToState).toHaveBeenCalledTimes(1);
  });
});
