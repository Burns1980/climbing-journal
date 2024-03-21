import PropTypes from 'prop-types';

import { Sidebar } from '../containers';

import './pages.css';

function PageWrapper({ showSidebar = true, title, children, handleAddClick }) {
  return (
    <>
      {title && <h2 className="text-xl text-center page-header">{title}</h2>}
      <div className="container display-flex">
        {showSidebar && (
          <Sidebar handleAddClick={handleAddClick} className="sidebar" />
        )}
        <section className="wd-75">{children}</section>
      </div>
    </>
  );
}

PageWrapper.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  showSidebar: PropTypes.bool,
};

export default PageWrapper;
