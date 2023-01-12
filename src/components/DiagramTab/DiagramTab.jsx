import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { nanoid } from '@reduxjs/toolkit';
import styles from './DiagramTab.module.css';
import {
  fetchTransactionsSummaryOfPeriod,
  fetchTransactionsSummary,
} from './operation';
import { useSelector } from 'react-redux';
import { selectStatistic } from './Selector';

import { useDispatch } from 'react-redux';

ChartJS.register(ArcElement, Tooltip);

const DiagramTab = () => {
  const [month, setMonth] = useState('');
  const [year, SetYear] = useState('2023');
  const dispatch = useDispatch();

  const dataBASE = useSelector(selectStatistic);


  let DiagramaItem = null;
  let ExpenseSum = null;
  let TitleExpense = null;
  let visible = false;
  let data = null;

  if (dataBASE.categoriesSummary.length !== 0) {
    visible = true;
    DiagramaItem = dataBASE.categoriesSummary.filter(({ type }) =>
      type.includes('EXPENSE')
    );

    ExpenseSum = dataBASE.categoriesSummary
      .filter(({ type }) => type.includes('EXPENSE'))
      .map(({ total }) => Math.abs(total));

    TitleExpense = dataBASE.categoriesSummary
      .filter(({ type }) => type.includes('EXPENSE'))
      .map(({ name }) => name);

    data = {
      labels: [...TitleExpense],
      color: [
        '#FED057',
        '#FFD8D0',
        '#FD9498',
        '#C5BAFF',
        '#6E78E8',
        '#4A56E2',
        '#81E1FF',
        '#24CCA7',
        '#00AD84',
      ],
      datasets: [
        {
          label: '# of Votes',
          data: [...ExpenseSum],
          backgroundColor: [
            '#FED057',
            '#FFD8D0',
            '#FD9498',
            '#C5BAFF',
            '#6E78E8',
            '#4A56E2',
            '#81E1FF',
            '#24CCA7',
            '#00AD84',
          ],
          borderColor: [
            '#FED057',
            '#FFD8D0',
            '#FD9498',
            '#C5BAFF',
            '#6E78E8',
            '#4A56E2',
            '#81E1FF',
            '#24CCA7',
            '#00AD84',
          ],
          borderWidth: 1,
        },
      ],
    };
  }

  useEffect(() => {
    dispatch(fetchTransactionsSummary());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(fetchTransactionsSummaryOfPeriod({ month, year }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, year]);

  const onChanged = el => {
    switch (el.target.id) {
      case 'month':
        setMonth(el.target.value);
        break;
      case 'year':
        SetYear(el.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.statisticChart}>
      <div className={styles.diagram}>
        <h1 className={styles.diagramTitle}>Statistics</h1>
        {visible ? <Doughnut data={data} /> : <p>Nothing</p>}
        <p className={styles.incomeSum}>
          <span>&#8372;</span>
          {dataBASE.incomeSummary}
        </p>
      </div>

      <div className={styles.chartItem}>
        <div className={styles.select}>
          <select
            className={styles.selectItem}
            name="month"
            id="month"
            onChange={onChanged}
          >
            <option value="january">January</option>
            <option value="february">February</option>
            <option value="march">March</option>
            <option value="april">April</option>
            <option value="april">May</option>
            <option value="april">June</option>
            <option value="july">July</option>
            <option value="august">August</option>
            <option value="september">September</option>
            <option value="november">October</option>
            <option value="october">November</option>
            <option value="december">December</option>
          </select>
          <select
            className={styles.selectItem}
            name="year"
            id="year"
            onChange={onChanged}
          >
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
            <option value="2029">2029</option>
          </select>
        </div>

        <div className={styles.chart}>
          <div className={styles.title}>
            <div className={styles.titleItem}>
              <p>Category</p>
              <p>Sum</p>
            </div>
          </div>

          {visible ? (
            <ul className={styles.list}>
              {DiagramaItem.map(({ name, type, total }, index) => (
                <li key={nanoid()} className={styles.listItem}>
                  <div className={styles.expenseItem}>
                    <p
                      style={{
                        width: 24,
                        height: 24,
                        backgroundColor: [data.color[index]],
                      }}
                    ></p>
                    <div className={styles.expenseItemText}>
                      <span className={styles.nameExpense}>{name}</span>
                      <span>{Math.abs(total)}</span>
                    </div>
                  </div>
                  <div className={styles.separator}></div>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.ListEmpty}>List expenses empty</p>
          )}

          <div className={styles.totalList}>
            <p className={styles.totalListItem}>
              <span className={styles.result}>Expenses:</span>
              <span className={styles.exp}>
                {Math.abs(dataBASE.expenseSummary)}
              </span>
            </p>
            <p className={styles.totalListItem}>
              <span className={styles.result}>Income:</span>
              <span className={styles.income}> {dataBASE.periodTotal}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagramTab;

// the end
