import { useRouteError } from 'react-router-dom';

import { Error } from '../components';
import { Header, NavigationBar } from '../components';
import PageWrapper from './PageWrapper';

export default function ErrorPage() {
  const error = useRouteError();

  let title = 'Sorry, an unexpected error has occurred.';
  let message = 'Something went wrong.';

  if (error.status === 400 || error.status === 404) {
    const errorData = JSON.parse(error.data);
    message = errorData.message;
    title = errorData.title || title;
  }

  if (error.status === 500) {
    message = JSON.parse(error.data).message || message;
  }

  return (
    <>
      <Header />
      <NavigationBar />
      <main>
        <PageWrapper className="text-md text-center container" id="error-page">
          <Error title={title} message={message} />
        </PageWrapper>
      </main>
    </>
  );
}
