import { NavLink } from 'react-router-dom';
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
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="routes-by-me">Routes I&apos;ve done</NavLink>
        </li>
        <li>
          <NavLink to="/trip-report">Trip reports</NavLink>
        </li>
        <li>
          <NavLink to="/projects">Projects</NavLink>
        </li>
      </ul>
    </nav>
  );
}
