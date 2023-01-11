import { StyledLink } from './Navigation.styled';
import css from './Navigation.module.css';
import sprite from './images/symbol-defs.svg';
import Media from 'react-media';

const Navigation = () => {
  return (
    <section className={css.navigation}>
      <StyledLink to="" end>
        <svg width="18" height="18" className={css.navigation__icon}>
          <use href={sprite + '#home-icon'}></use>
        </svg>
        <Media query="(min-width:768px)" render={() => <>Home</>} />
      </StyledLink>
      <StyledLink to="statistics">
        <svg width="18" height="18" className={css.navigation__icon}>
          <use href={sprite + '#statistic-icon'}></use>
        </svg>
        <Media query="(min-width:768px)" render={() => <>Statistics</>} />
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
