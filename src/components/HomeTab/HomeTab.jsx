import { useDispatch, useSelector } from 'react-redux';
import Media from 'react-media';
import { BsFillTrashFill } from 'react-icons/bs';
import { deleteTransaction } from 'redux/transactions/transactionsOperations';
import { selectTransactions } from 'redux/transactions/transactionsSelectors';
import { selectTransactionCategories } from 'redux/transactions/transactionsSelectors';
import s from './HomeTab.module.css';
import { changeBalance } from 'redux/auth/authSlice';

const HomeTab = () => {
  const transactions = useSelector(selectTransactions);
  const categories = useSelector(selectTransactionCategories);
  const categoriesList = categories.map(data => data);
  const transactionsReverse = [...transactions];
  const dispatch = useDispatch();

  const onDelete = (id, amount) => {
    dispatch(deleteTransaction(id));
    dispatch(changeBalance(amount))
  };

  return (
    <>
    <Media query="(max-width:767px)" render={()=> (
              <div className={s.tableWrapMob}>
              <div className={s.scrollTableMob}>
                <div className={s.scrollTableBodyMob}>
                  {transactions.length !== 0 ? (
                    transactionsReverse
                      .reverse()
                      .sort(
                        (a, b) =>
                          new Date(b.transactionDate) - new Date(a.transactionDate)
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
                              <td>
                                {'Date'}
                              </td>
                              <td>
                                {el.transactionDate}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                {'Type'}
                              </td>
                              <td>
                                {el.type !== 'EXPENSE' ? '+' : '-'}
                              </td>
                            </tr>
    
                            <tr>
                              <td>
                                {'Category'}
                              </td>
                              <td>
                                {categoriesList.length &&
                                  categoriesList.find(
                                    cat => cat.id === el.categoryId
                                  ).name}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                {'Comment'}
                              </td>
                              <td>
                                {el.comment}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                {'Sum'}
                              </td>
                              <td>
                                {el.amount}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                {'Balance'}
                              </td>
                              <td>
                                {el.balanceAfter}
                              </td>
                            </tr>
                            <tr>
                              <td colspan="2">
                                <button
                                  type="button"
                                  className={s.scrollTableBtnMob}
                                  onClick={() => onDelete(el.id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ))
                  ) : ( 
                    <p className={s.noTransactionMob}>{'No Transactions'}</p>
                  )}
                </div>
              </div>
            </div>
    )} />
    <Media query="(min-width:768px)" render={()=> (
      <div className={s.tableWrap}>
      <div className={s.scrollTable}>
        
        <table>
          <thead className={s.abraCadabra}>
            <tr>
              <th>
                {'Date'}
              </th>
              <th>
                {'Type'}
              </th>
              <th>
                {'Category'}
              </th>
              <th>
                {'Comment'}
              </th>
              <th>
                {'Sum'}
              </th>
              <th>
                {'Balance'}
              </th>
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
                      <td>{el.transactionDate}</td>
                      <td>{el.type !== 'EXPENSE' ? '+' : '-'}</td>
                      <td>
                        {categoriesList.length &&
                          categoriesList.find(
                            cat => cat.id === el.categoryId
                          ).name}
                      </td>
                      <td>{el.comment}</td>
                      <td
                        className={el.amount > 0 ? s.positive : s.negative}
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
                  <td>{'No Transactions'}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    )}
    />
    </>
  );
};

export default HomeTab