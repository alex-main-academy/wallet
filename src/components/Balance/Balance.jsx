import css from './Balance.module.css';

const Balance = () => {
  return (
    <div className={css.balance}>
      <span className={css.balance__title}>Your balance</span>
      <p className={css.balance__sum}>
        <span>₴</span> 24 000.00
      </p>
    </div>
  );
};

export default Balance;
