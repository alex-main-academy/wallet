import { useSelector } from 'react-redux';
import css from './Balance.module.css';
import translation from 'assets/translation/balance.json';
import { translationSelector } from 'redux/translation/translationSelectors';

const Balance = () => {
  const language = useSelector(translationSelector);
  const userBalance = useSelector(state => state.auth.user.balance);

  return (
    <div className={css.balance}>
      <span className={css.balance__title}>
        {translation[language].balance}
      </span>
      <p className={css.balance__sum}>
        <span>₴</span> {userBalance}
      </p>
    </div>
  );
};

export default Balance;
