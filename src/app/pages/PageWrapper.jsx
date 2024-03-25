import PropTypes from 'prop-types';

import { Sidebar } from '../containers';

import './pages.css';

function PageWrapper({ showSidebar = true, title, children, handleAddClick }) {
  return (
    <section className="container">
      {title && <h2 className="text-xl text-center page-header">{title}</h2>}
      <div className="display-flex">
        {showSidebar && (
          <Sidebar handleAddClick={handleAddClick} className="sidebar" />
        )}
        <div className="page-main-content">{children}</div>
      </div>
    </section>
  );
}

PageWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  showSidebar: PropTypes.bool,
};

export default PageWrapper;
