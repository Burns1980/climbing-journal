import './header.css';
import IconButton from '../icon-button/IconButton';
import Button from '../button/Button';

export default function Header() {
  function handleClick() {
    console.dir('clicked hamburger button');
  }

  return (
    <header>
      <div className="header-wrapper container">
        <div className="mobile-menu-icon">
          <IconButton
            onClick={handleClick}
            className="fa-solid fa-bars fa-2xl"
          />
        </div>
        <div className="desktop-header-wrapper">
          <Button>Menu</Button>
          <Button>Search</Button>
          <h1 className="title text-xxl">Climbing bag</h1>
          <Button>Sign up</Button>
        </div>
      </div>
    </header>
  );
}
