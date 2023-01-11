import Media from 'react-media';
import { Link } from 'react-router-dom';
import css from './Header.module.css';
import logoImage from './images/wallet-logo.png';

const Header = () => {
  return (
    <header className={css.header}>
      <div className="container">
        <div className={css.header__container}>
          <Link className={css.header__logo}>
            <img
              src={logoImage}
              alt="logo"
              width="40"
              className={css.header__logo__icon}
            />
            <span className={css.header__logo__text}>Wallet</span>
          </Link>
          <div className={css.header__menu}>
            <span className={css.header__menu__name}>Name</span>
            <button type="button" className={css.header__menu__button}>
              <Media
                query="(min-width: 768px)"
                render={() => <span>Exit</span>}
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
