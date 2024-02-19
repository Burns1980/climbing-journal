import { Link } from 'react-router-dom';
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
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to='routes-by-me' >
            Routes I&apos;ve done
          </Link>
        </li>
        <li>
          <Link to="/trip-report">Trip reports</Link>
        </li>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
      </ul>
    </nav>
  );
}
