import { StyledLink } from './Navigation.styled';
import css from './Navigation.module.css';
import sprite from './images/symbol-defs.svg';
import Media from 'react-media';
import translation from 'assets/translation/navigation.json';
import { translationSelector } from 'redux/translation/translationSelectors';
import { useSelector } from 'react-redux';

const Navigation = () => {
  const language = useSelector(translationSelector);
  return (
    <section className={css.navigation}>
      <StyledLink to="" end>
        <svg width="18" height="18" className={css.navigation__icon}>
          <use href={sprite + '#home-icon'}></use>
        </svg>
        <Media
          query="(min-width:768px)"
          render={() => <>{translation[language].home}</>}
        />
      </StyledLink>
      <StyledLink to="statistics">
        <svg width="18" height="18" className={css.navigation__icon}>
          <use href={sprite + '#statistic-icon'}></use>
        </svg>
        <Media
          query="(min-width:768px)"
          render={() => <>{translation[language].statistics}</>}
        />
      </StyledLink>
      <Media
        query="(max-width:768px)"
        render={() => (
          <StyledLink to="currency">
            <svg width="38" height="38">
              <use href={sprite + '#currency-icon'}></use>
            </svg>
          </StyledLink>
        )}
      />
    </section>
  );
};

export default Navigation;
