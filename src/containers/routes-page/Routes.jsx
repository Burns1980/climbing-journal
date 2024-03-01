import { useContext } from 'react';

import {
  RoutesContext,
  // RoutesDispatchContext,
} from '../../store/RoutesContext';
import RoutesCard from '../routes-card/RoutesCard';
import PageWrapper from '../../routes/PageWrapper';
import './routes.css';

// Will manage the state of the Routes Ive done page
export default function Routes() {
  const climbingRoutes = useContext(RoutesContext);

  return (
    <PageWrapper title="Routes I've done" className="container">
      {climbingRoutes.map((route, i) => (
        <RoutesCard key={i + route.routeName} routeData={route} />
      ))}
    </PageWrapper>
  );
}
