import './header.css';
import IconButton from '../icon-button/IconButton';

export default function Header() {
  return (
    <header>
      <div className='header-wrapper'>
        <div className="mobile-menu-icon">
          <IconButton onClick={() => console.dir('clicked')} className='fa-solid fa-bars fa-2xl'/>
        </div>
        <div className="desktop-header-wrapper">
          <div className="first-btn-column">
            <button type="button">Menu</button>
            <button type="button">Search</button>
          </div>
          <div className="title">Climbing portfolio</div>
          <div className="last-btn-column">
            <button type="button">Sign up</button>
          </div>
        </div>
      </div>
    </header>
  );
}
