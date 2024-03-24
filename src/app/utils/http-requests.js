import { GET_ROUTES_URL } from '../../utils/constants';
import { apiUrl } from '../../utils/envVars';

export const fetchRoutes = async (httpVerb, data, filter = undefined) => {
  switch (httpVerb.toUpperCase()) {
    case 'GET': {
      if (!filter) {
        const res = await fetch(`${apiUrl}${GET_ROUTES_URL}`, {});

        if (!res.ok) {
          throw new Response(
            JSON.stringify({
              message: 'The fetch routes operation failed. Try refreshing',
            }),
            { status: 500 }
          );
        }

        return res;
      }

      // filtered get requests here
    }

    case 'POST': {
      console.log(data);
      const res = await fetch(`${apiUrl}${GET_ROUTES_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        // body: data,
      });

      if (!res.ok) {
        throw new Response(
          JSON.stringify({
            message: 'The fetch routes operation failed. Try refreshing',
          }),
          { status: 500 }
        );
      }

      return res;

      // filtered get requests here
    }
    default: {
      throw Error('unknown http request');
    }
  }
};
