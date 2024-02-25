/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';

import config from './nav-config';
import './navigationBar.css';

/*
will contain links to the pages of:
Home
Routes I've done
Trip report
Github projects
*/

export default function NavigationBar({ isMobileMenuActive }) {
  return (
    <nav
      className={`top-navigation ${
        isMobileMenuActive ? 'visible mobile-menu' : 'invisible'
      }`}
    >
      <div className="container">
        <ul className="navigation-list text-md">
          {config.map((page) => (
            <li key={page.title}>
              <NavLink to={page.to}>{page.title}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
