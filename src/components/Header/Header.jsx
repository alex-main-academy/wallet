import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import css from './Header.module.css';
import logoImage from './images/wallet-logo.png';
import LogoutFeature from 'components/LogoutFeature/LogoutFeature';
import LanguageToggler from 'components/LanguageToggler/LanguageToggler';

const Header = () => {
  const userName = useSelector(state => state.auth.user.username);

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
            <span className={css.header__menu__name}>{userName}</span>
            <LogoutFeature />
            <LanguageToggler />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
