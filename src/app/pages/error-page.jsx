import { useRouteError } from 'react-router-dom';
import { Header, NavigationBar } from '../components';
import PageWrapper from './PageWrapper';

export default function ErrorPage() {
  const error = useRouteError();

  console.log(error);
  let title = 'Sorry, an unexpected error has occurred.';
  let message = 'Something went wrong.';

  if (error.status === 400) {
    message = JSON.parse(error.data).message;
  }

  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }

  if (error.status === 404) {
    title = 'Not found!';
    message = 'Page or resource was not found.';
  }

  return (
    <>
      <Header />
      <NavigationBar />
      <main>
        <PageWrapper
          title="Oops"
          className="text-md text-center container"
          id="error-page"
        >
          <p className="text-sm">{title}</p>
          <p className="text-sm">
            <i>{message}</i>
          </p>
        </PageWrapper>
      </main>
    </>
  );
}
