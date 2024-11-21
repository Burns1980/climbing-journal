import { GET_ROUTES_URL } from '../../utils/constants';
import { apiUrl } from '../../utils/envVars';

export const fetchRoutes = async (
  httpVerb,
  data,
  routeId,
  filter = undefined
) => {
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
      const body = JSON.stringify(data);

      try {
        const res = await fetch(`${apiUrl}${GET_ROUTES_URL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body,
        });

        if (res.status === 400) {
          const resBody = await res.json();

          return resBody;
        }
        if (!res.ok) {
          throw new Response(
            JSON.stringify({
              message:
                'The request to save the data to the database failed. Ensure all data fields are correct.',
            }),
            { status: res.status }
          );
        }

        return res;
      } catch (error) {
        throw new Response(
          JSON.stringify({
            message:
              'The request to save the data to the database failed. Ensure all data fields are correct.',
          }),
          { status: 500 }
        );
      }
    }
    case 'PUT': {
      const body = JSON.stringify(data);

      console.log('body', data);

      try {
        const res = await fetch(`${apiUrl}${GET_ROUTES_URL}/${routeId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body,
        });

        if (res.status === 400) {
          const resBody = await res.json();

          return resBody;
        }
        if (!res.ok) {
          throw new Response(
            JSON.stringify({
              message:
                'The request to save the data to the database failed. Ensure all data fields are correct.',
            }),
            { status: res.status }
          );
        }

        return res;
      } catch (error) {
        throw new Response(
          JSON.stringify({
            message:
              'The request to save the data to the database failed. Ensure all data fields are correct.',
          }),
          { status: 500 }
        );
      }
    }
    default: {
      throw Error('unknown http request');
    }
  }
};
