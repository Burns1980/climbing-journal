import { apiUrl } from '../../utils/envVars';

export const fetchRoutes = async (httpVerb, filter = undefined) => {
  switch (httpVerb.toUpperCase()) {
    case 'GET': {
      if (!filter) {
        const res = await fetch(`${apiUrl}/api/v1/routes`, {});

        if (!res.ok) {
          throw new Error(
            'The response from the fetch operation was not "ok." Try refreshing'
          );
        }

        return await res.json();
      }

      // filtered get requests here
    }
    default: {
      throw Error('unknown http request');
    }
  }
};
