import { useContext } from 'react';

import { DataContext } from '../../store/DataContext';
import { RoutesCard } from '../index';
import PageWrapper from '../../routes/PageWrapper';
import { Error, LoadSpinner } from '../../components';
import useMenuToggle from '../../customHooks/useMenuToggle';

import './routes.css';

// Will manage the state of the Routes Ive done page
export default function Routes() {
  useMenuToggle();
  const { routes } = useContext(DataContext);
  const { data, isLoading, isError, errorMessage } = routes;

  const content = isLoading ? (
    <LoadSpinner />
  ) : isError ? (
    <Error message={errorMessage} title="Error occurred getting routes" />
  ) : (
    data.map((route) => <RoutesCard key={route._id} routeData={route} />)
  );

  return (
    <PageWrapper title="Routes I've done" className="container">
      {content}
    </PageWrapper>
  );
}
