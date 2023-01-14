import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import css from './Header.module.css';
import logoImage from './images/wallet-logo.png';
import LogoutFeature from 'components/LogoutFeature/LogoutFeature';
import LanguageToggler from 'components/LanguageToggler/LanguageToggler';
import translation from 'assets/translation/header.json';
import { translationSelector } from 'redux/translation/translationSelectors';

const Header = () => {
  const language = useSelector(translationSelector);
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
            <span className={css.header__logo__text}>
              {translation[language].wallet}
            </span>
          </Link>
          <div className={css.header__menu}>
            <LanguageToggler />
            <div style={{ display: 'flex', gap: 8 }}>
              <span className={css.header__menu__name}>{userName}</span>
              <LogoutFeature />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
