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
      <ul className='navigation-list'>
        <li>
          <a href="#">
            Home
          </a>
        </li>
        <li>
          <a href="https://www.mountainproject.com/" target="_blank">
           Routes I&apos;ve done 
          </a>
        </li>
        <li>
          <a href="https://www.mountainproject.com/" target="_blank">
            Trip reports
          </a>
        </li>
        <li>
          <a href="https://www.mountainproject.com/" target="_blank">
            Projects
          </a>
        </li>
      </ul>
    </nav>
  );
}
