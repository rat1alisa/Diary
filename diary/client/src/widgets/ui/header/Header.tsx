import { ThemeToggle } from '@shared/ui/ThemeToggle';
import { Link } from 'react-router-dom';
import './Header.scss';

export const Header = () => {
  const closeMenu = () => {
    const toggle = document.getElementById('main-navigation-toggle') as HTMLInputElement;
    if (toggle) {
      toggle.checked = false;
    }
  };

  return (
      <div className="CLASS__NAME-container"> 
        <input
          type="checkbox"
          id="main-navigation-toggle"
          className="btn btn--close"
          title="Toggle main navigation"
        />
        <label htmlFor="main-navigation-toggle" className="menu-open">
          <span />
        </label>

        <nav id="main-navigation" className="nav-main">
          <ul className="menu">
            <li className="menu__item">
              <Link to="/" className="menu__link sixpx" onClick={closeMenu}>
                Library
              </Link>
            </li>
            <li className="menu__item">
              <Link to="/weather" className="menu__link sixpx" onClick={closeMenu}>
                Weather
              </Link>
            </li>
            <li className="menu__item">
              <Link to="/timer" className="menu__link sixpx" onClick={closeMenu}>
                Timer
              </Link>
            </li>
            <li className="menu__item">
              <Link to="/clock" className="menu__link sixpx" onClick={closeMenu}>
                Stopwatch
              </Link>
            </li>
            <li className="menu__item">
              <a className="menu__link sixpx" href="#0">
                Sign in/up
              </a>
              <ul className="submenu">
                <li className="menu__item">
                  <Link to="/login" className="menu__link threerpx" onClick={closeMenu}>
                    Login
                  </Link>
                </li>
                <li className="menu__item">
                  <Link to="/registration" className="menu__link threerpx" onClick={closeMenu}>
                    Register
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>

        {/*<ThemeToggle />*/}
      </div>
  );
};
