jest.mock('../../utils/envVars', () => ({
  apiUrl: jest.fn(() => 'http://localhost:3000'),
}));

import { fetchRoutes } from './http-requests.js';

global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
});

it('calls fetch with the correct url for GET requests', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ data: 'test' }),
  });

  const data = await fetchRoutes('GET');
  expect(data).toEqual({ data: 'test' });
});

it('throws an error when fetch response is not ok', async () => {
  fetch.mockResolvedValueOnce({
    ok: false,
  });

  await expect(fetchRoutes('GET')).rejects.toThrow(
    'The response from the fetch operation was not "ok." Try refreshing'
  );
});

it('throws an error for unknown HTTP verbs', async () => {
  await expect(fetchRoutes('UNKNOWN')).rejects.toThrow('unknown http request');
});
