import { useContext } from 'react';

import {
  RoutesContext,
  // RoutesDispatchContext,
} from '../../store/RoutesContext';
import RoutesCard from '../routes-card/RoutesCard';
import PageWrapper from '../../routes/PageWrapper';
import Error from '../../components/error/Error';
import './routes.css';

// Will manage the state of the Routes Ive done page
export default function Routes() {
  const climbingRoutes = useContext(RoutesContext);
  const { routes, isLoading, error, errorMessage } = climbingRoutes;

  return (
    <PageWrapper title="Routes I've done" className="container">
      {isLoading ? (
        <div>Loading</div>
      ) : error ? (
        <Error message={errorMessage} />
      ) : (
        routes.map((route) => <RoutesCard key={route._id} routeData={route} />)
      )}
    </PageWrapper>
  );
}
