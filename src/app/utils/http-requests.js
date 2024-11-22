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
      try {
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
      } catch (error) {
        if (error.status) {
          throw error;
        }
        throw new Error('An unexpected error occurred', { cause: error });
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

          throw new Response(
            JSON.stringify({
              title: 'The request to add a new route failed.',
              message: resBody.message,
            }),
            { status: 400 }
          );
        }
        if (res.status === 404) {
          const resBody = await res.json();

          throw new Response(
            JSON.stringify({
              title: 'The resource requested was not found',
              message: resBody.message,
            }),
            { status: 404 }
          );
        }
        if (!res.ok) {
          throw new Response(
            JSON.stringify({
              title: 'An unknow error occurred.',
              message: await res.json().message,
            }),
            { status: res.status }
          );
        }

        return res;
      } catch (error) {
        if (error.status) {
          throw error;
        }
        throw new Error('An unexpected error occurred', { cause: error });
      }
    }
    case 'PUT': {
      const body = JSON.stringify(data);

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

          throw new Response(
            JSON.stringify({
              title: 'The request to update the route failed.',
              message: resBody.message,
            }),
            { status: 400 }
          );
        }
        if (res.status === 404) {
          const resBody = await res.json();

          throw new Response(
            JSON.stringify({
              title: 'The resource requested was not found',
              message: resBody.message,
            }),
            { status: 404 }
          );
        }
        if (!res.ok) {
          throw new Response(
            JSON.stringify({
              title: 'An unknow error occurred.',
              message: await res.json().message,
            }),
            { status: res.status }
          );
        }

        return res;
      } catch (error) {
        if (error.status) {
          throw error;
        }
        throw new Error('An unexpected error occurred', { cause: error });
      }
    }
    default: {
      throw Error('unknown http request');
    }
  }
};
