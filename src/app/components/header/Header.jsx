import { Button, IconButton } from '../';
import logo from '../../assets/images/climbing-bag-logo.jpg';
import './header.css';

export default function Header() {
  return (
    <header>
      <div className="header-wrapper container">
        <div className="mobile-menu-icon">
          <IconButton
            onClick={() => console.log('hamburger')}
            iconClassName="fa-solid fa-bars fa-2xl"
          />
        </div>
        <div className={`desktop-header-wrapper`}>
          <Button>Menu</Button>
          <Button>Search</Button>
          <h1 className="title text-xxl">
            Climbing bag
            <span>
              <img width="100xp" src={logo}></img>
            </span>
          </h1>
          <Button>Sign up</Button>
        </div>
      </div>
    </header>
  );
}
