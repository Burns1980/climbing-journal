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

export default function NavigationBar() {
  return (
    <nav className="top-navigation">
      <ul className="navigation-list">
        {config.map((page) => (
          <li key={page.title}>
            <NavLink to={page.to}>{page.title}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
