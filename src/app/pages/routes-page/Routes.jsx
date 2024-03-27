import { useContext, useRef } from 'react';

import { DataContext } from '../../store';
import { Modal, RoutesCard, DataEntryForm } from '../../containers';
import { PageWrapper } from '../';
import { Error, LoadSpinner } from '../../components';
import { useMenuToggle, useRouteForm } from '../../customHooks';
import { formFields } from './config';

import './routes.css';

export default function Routes() {
  const modalRef = useRef();

  useMenuToggle();

  function handleAddRoute() {
    modalRef.current.open();
  }

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
    <>
      <Modal ref={modalRef}>
        <DataEntryForm title="Enter new route" fields={formFields} />
      </Modal>
      <PageWrapper handleAddClick={handleAddRoute} title="Routes I've done">
        {content}
      </PageWrapper>
    </>
  );
}
