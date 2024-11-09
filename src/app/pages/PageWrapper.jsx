import PropTypes from 'prop-types';

import { Sidebar } from '../containers';

import './pages.css';

function PageWrapper({
  title,
  children,
  sidebarProps,
  showSidebar = true,
  ...props
}) {
  return (
    <section {...props} className="container">
      {title && <h2 className="text-xxl text-center page-header">{title}</h2>}
      <div className="full-page-content display-flex">
        {showSidebar && <Sidebar {...sidebarProps} className="sidebar" />}
        <div className="page-main-content">{children}</div>
      </div>
    </section>
  );
}

PageWrapper.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  showSidebar: PropTypes.bool,
};

export default PageWrapper;
