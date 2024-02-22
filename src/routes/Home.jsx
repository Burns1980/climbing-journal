import PageWrapper from './PageWrapper';
import Standings from '../apps/standings/standings';

export default function Home() {
  return (
    <PageWrapper title="Home" className="container">
      <Standings />
    </PageWrapper>
  );
}
