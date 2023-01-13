import styles from './Currency.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Circles } from 'react-loader-spinner';

export const Currency = () => {
  const [currency, setCurrency] = useState([]);

  useEffect(() => {
    async function getCurrency() {
      try {
        const response = await axios.get(
          'https://api.monobank.ua/bank/currency'
        );
        console.log(response.data);
        const Currency = [response.data[0], response.data[1]];
        setCurrency(Currency);
        console.log(Currency);
        localStorage.setItem('currency', JSON.stringify(Currency));
      } catch (e) {
        console.log(e);
      }
    }
    getCurrency();
    if (currency.length === 0) {
      setCurrency(JSON.parse(localStorage.getItem('currency')));
    }
  }, []);
  const parsedCurrency = JSON.parse(localStorage.getItem('currency'));

  return currency.length ? (
    <div className={styles.currencyContainer}>
      <table>
        <tbody>
          <tr>
            <td>Purchase</td>
            <td>Currency</td>
            <td>Sale</td>
          </tr>
          <tr>
            <td>USD</td>
            <td>{currency[0].rateBuy.toFixed(2)}</td>
            <td>{currency[0].rateSell.toFixed(2)}</td>
          </tr>

          <tr>
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
