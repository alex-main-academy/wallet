import { useDispatch, useSelector } from 'react-redux';
import Media from 'react-media';
import { BsFillTrashFill } from 'react-icons/bs';
import { deleteTransaction } from 'redux/transactions/transactionsOperations';
import { selectTransactions } from 'redux/transactions/transactionsSelectors';
import { selectTransactionCategories } from 'redux/transactions/transactionsSelectors';
import s from './HomeTab.module.css';
import { changeBalance } from 'redux/auth/authSlice';
import translation from 'assets/translation/home_tab.json';
import { translationSelector } from 'redux/translation/translationSelectors';
import ButtonAddTransactions from 'components/ButtonAddTransactions/ButtonAddTransactions';

const HomeTab = () => {
  const language = useSelector(translationSelector);
  const transactions = useSelector(selectTransactions);
  const categories = useSelector(selectTransactionCategories);
  const categoriesList = categories.map(data => data);
  const transactionsReverse = [...transactions];
  const dispatch = useDispatch();

  const onDelete = (id, amount) => {
    dispatch(deleteTransaction(id));
    dispatch(changeBalance(amount));
  };

  return (
    <>
      <Media
        query="(max-width:767px)"
        render={() => (
          <div className={s.tableWrapMob}>
            <div className={s.scrollTableMob}>
              <div className={s.scrollTableBodyMob}>
                {transactions.length !== 0 ? (
                  transactionsReverse
                    .reverse()
                    .sort(
                      (a, b) =>
                        new Date(b.transactionDate) -
                        new Date(a.transactionDate)
                    )
                    .map(el => (
                      <table
                        className={
                          el.amount > 0 ? s.tablePositive : s.tableNegative
                        }
                        key={el.id}
                      >
                        <tbody>
                          <tr>
                            <td>{translation[language].date}</td>
                            <td>
                              {new Date(el.transactionDate)
                                .toLocaleDateString()
                                .split('.')
                                .join('-')}
                            </td>
                          </tr>
                          <tr>
                            <td>{translation[language].type}</td>
                            <td>{el.type !== 'EXPENSE' ? '+' : '-'}</td>
                          </tr>

                          <tr>
                            <td>{translation[language].category}</td>
                            <td>
                              {categoriesList.length &&
                                categoriesList.find(
                                  cat => cat.id === el.categoryId
                                ).name}
                            </td>
                          </tr>
                          <tr>
                            <td>{translation[language].comment}</td>
                            <td>{el.comment || '-'}</td>
                          </tr>
                          <tr>
                            <td>{translation[language].sum}</td>
                            <td>{el.amount}</td>
                          </tr>
                          <tr>
                            <td>{translation[language].balance}</td>
                            <td>{el.balanceAfter}</td>
                          </tr>
                          <tr>
                            <td colspan="2">
                              <button
                                type="button"
                                className={s.scrollTableBtnMob}
                                onClick={() => onDelete(el.id, el.amount)}
                              >
                                {translation[language].delete}
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ))
                ) : (
                  <p className={s.noTransactionMob}>
                    {translation[language].transactions}
                  </p>
                )}
              </div>
            </div>
            <ButtonAddTransactions />
          </div>
        )}
      />
      <Media
        query="(min-width:768px)"
        render={() => (
          <div className={s.tableWrap}>
            <div className={s.scrollTable}>
              <table>
                <thead className={s.abraCadabra}>
                  <tr>
                    <th> {translation[language].date}</th>
                    <th> {translation[language].type}</th>
                    <th> {translation[language].category}</th>
                    <th> {translation[language].comment}</th>
                    <th> {translation[language].sum}</th>
                    <th> {translation[language].balance}</th>
                    <th></th>
                  </tr>
                </thead>
              </table>
              <div className={s.scrollTableBody}>
                <table>
                  <tbody>
                    {transactions.length ? (
                      transactionsReverse
                        .reverse()
                        .sort(
                          (a, b) =>
                            new Date(b.transactionDate) -
                            new Date(a.transactionDate)
                        )
                        .map(el => (
                          <tr key={el.id}>
                            <td>
                              {new Date(el.transactionDate)
                                .toLocaleDateString()
                                .split('.')
                                .join('-')}
                            </td>
                            <td>{el.type !== 'EXPENSE' ? '+' : '-'}</td>
                            <td>
                              {categoriesList.length &&
                                categoriesList.find(
                                  cat => cat.id === el.categoryId
                                ).name}
                            </td>
                            <td>{el.comment || '-'}</td>
                            <td
                              className={
                                el.amount > 0 ? s.positive : s.negative
                              }
                            >
                              {el.amount}
                            </td>
                            <td>{el.balanceAfter}</td>
                            <td>
                              <button
                                type="button"
                                onClick={() => onDelete(el.id, el.amount)}
                                className={s.scrollTableBtn}
                              >
                                <BsFillTrashFill style={{ fill: '#fff' }} />
                              </button>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td>{translation[language].transactions}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <ButtonAddTransactions />
          </div>
        )}
      />
    </>
  );
};

export default HomeTab;
