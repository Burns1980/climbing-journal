import RoutesCard from '../../components/routes-card/RoutesCard';
import PageWrapper from '../../routes/PageWrapper';
import './routes.css';

// using this as placeholder data until backend created
import { climbingRoutes, climbingRoutes as data } from './config';

// Will manage the state of the Routes Ive done page
export default function Routes() {
  return (
    <PageWrapper title="Routes I've done" className="container">
      {climbingRoutes.map((route, i) => (
        <RoutesCard key={i + route.routeName} routeData={route} />
      ))}
    </PageWrapper>
  );
}
