import styles from './Currency.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Circles } from 'react-loader-spinner';
import translation from 'assets/translation/currency.json';
import { translationSelector } from 'redux/translation/translationSelectors';
import { useSelector } from 'react-redux';

export const Currency = () => {
  const [currency, setCurrency] = useState([]);
  const language = useSelector(translationSelector);

  useEffect(() => {
    const date = new Date();
    const currentHour = date.getHours();
    const currentMinute = date.getMinutes();
    const currentTime = `${currentHour}-${currentMinute}`;
    async function getCurrency() {
      try {
        const response = await axios.get(
          'https://api.monobank.ua/bank/currency'
        );
        const Currency = [response.data[0], response.data[1]];
        setCurrency(Currency);
        localStorage.setItem('time', `${currentHour + 1}-${currentMinute}`);
        localStorage.setItem('currency', JSON.stringify(Currency));
      } catch (e) {
        console.log(e);
        if (currency.length === 0) {
          setCurrency(JSON.parse(localStorage.getItem('currency')));
        }
      }
    }

    const localStorageTime = localStorage.getItem('time');
    if (localStorageTime) {
      if (localStorageTime > currentTime) {
        setCurrency(JSON.parse(localStorage.getItem('currency')));
        return;
      } else if (localStorageTime <= currentTime) {
        getCurrency();
      }
    } else {
      getCurrency();
    }
  }, [currency.length]);

  return currency.length ? (
    <div className={styles.currency__wrapper}>
      <table className={styles.table}>
        <tbody>
          <tr className={styles.tableHead}>
            <td className={styles.currency}>
              {translation[language].currency}
            </td>
            <td className={styles.purchase}>
              {translation[language].purchase}
            </td>
            <td className={styles.sale}>{translation[language].sale}</td>
          </tr>
        </tbody>
        <tbody className={styles.tableBody}>
          <tr className={styles.tableValues}>
            <td>USD</td>
            <td>{currency[0].rateBuy.toFixed(2)}</td>
            <td>{currency[0].rateSell.toFixed(2)}</td>
          </tr>

          <tr className={styles.tableValues}>
            <td>EUR</td>
            <td>{currency[1].rateSell.toFixed(2)}</td>
            <td>{currency[1].rateBuy.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  ) : (
    <div>
      <Circles
        height="30"
        width="30"
        color="#4A56E2"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};
export default Currency;
