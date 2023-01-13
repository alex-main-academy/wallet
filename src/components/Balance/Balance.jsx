import { useSelector } from 'react-redux';
import css from './Balance.module.css';

const Balance = () => {
  const userBalance = useSelector(state => state.auth.user.balance);

  return (
    <div className={css.balance}>
      <span className={css.balance__title}>Your balance</span>
      <p className={css.balance__sum}>
        <span>₴</span> {userBalance}
      </p>
    </div>
  );
};

export default Balance;
