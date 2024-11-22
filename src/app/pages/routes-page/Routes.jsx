import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { DataContext } from '../../store';
import { Modal, RoutesCard, DataEntryForm } from '../../containers';
import { PageWrapper } from '../';
import { Error, LoadSpinner } from '../../components';
import { useMenuToggle } from '../../customHooks';
import { formInputFields } from './config';

import './routes.css';

export default function Routes() {
  const modalRef = useRef();
  const navigate = useNavigate();

  useMenuToggle();

  function handleAddRoute() {
    navigate('/routes-climbed/add-new-route');
  }

  const { routes } = useContext(DataContext);

  /////////////////////////////////

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
      {/* <Modal ref={modalRef}>
        <DataEntryForm title="Enter new route" fields={formInputFields} />
      </Modal> */}
      <PageWrapper
        sidebarProps={{ handleAddClick: handleAddRoute }}
        title="Routes I've done"
      >
        {content}
      </PageWrapper>
    </>
  );
}
