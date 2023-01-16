import { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { nanoid } from '@reduxjs/toolkit';
import styles from './DiagramTab.module.css';
import {
  fetchTransactionsSummaryOfPeriod,
  fetchTransactionsSummary,
} from 'redux/transactions/transactionsOperations';
import { useSelector } from 'react-redux';
import { selectStatistic } from 'redux/transactions/transactionsSelectors';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import translation from 'assets/translation/diagram_tab.json';
import { translationSelector } from 'redux/translation/translationSelectors';

ChartJS.register(ArcElement, Tooltip);

const monthNumber = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DiagramTab = () => {
  const language = useSelector(translationSelector);
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  // const [month, setMonth] = useState(today.getMonth());
  // const [year, SetYear] = useState(today.getFullYear());
  const dispatch = useDispatch();
  const dataBASE = useSelector(selectStatistic);

  const [params, setParams] = useSearchParams();

  let DiagramaItem = null;
  let ExpenseSum = null;
  let TitleExpense = null;
  let visible = false;
  let data = null;

  if (dataBASE.categoriesSummary) {
    if (dataBASE.categoriesSummary.length !== 0) {
      visible = true;
    }

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
    const month = params.get('month');
    const year = params.get('year');

    if (!month || !year) {
      return;
    }
    dispatch(fetchTransactionsSummaryOfPeriod({ month, year }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  // useEffect(() => {
  //   dispatch(fetchTransactionsSummaryOfPeriod({ month, year }));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [month, year]);

  const onChanged = el => {
    switch (el.target.id) {
      case 'month':
        const mons = monthNumber.findIndex(
          elment => elment.toLowerCase() === el.target.value
        );
        console.log(mons, el.target.value);
        // setMonth(el.target.value);
        setParams({ month: mons + 1, year });
        break;
      case 'year':
        // SetYear(el.target.value);
        setParams({ month, year: el.target.value });
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.statisticChart}>
      <div className={styles.diagram}>
        <h1 className={styles.diagramTitle}>
          {translation[language].statistics}
        </h1>
        {visible ? (
          <>
            <Doughnut data={data} />
            <p className={styles.incomeSum}>
              <span>&#8372;</span>
              {dataBASE.periodTotal}
            </p>
          </>
        ) : (
          <p>Nothing</p>
        )}
      </div>

      <div className={styles.chartItem}>
        <div className={styles.select}>
          <select
            className={styles.selectItem}
            name="month"
            id="month"
            defaultValue={month}
            onChange={onChanged}
          >
            <option value="january"> {translation[language].months[0]}</option>
            <option value="february"> {translation[language].months[1]}</option>
            <option value="march"> {translation[language].months[2]}</option>
            <option value="april"> {translation[language].months[3]}</option>
            <option value="april"> {translation[language].months[4]}</option>
            <option value="april">{translation[language].months[5]}</option>
            <option value="july"> {translation[language].months[6]}</option>
            <option value="august"> {translation[language].months[7]}</option>
            <option value="september">{translation[language].months[8]}</option>
            <option value="november"> {translation[language].months[9]}</option>
            <option value="october">{translation[language].months[10]}</option>
            <option value="december">{translation[language].months[11]}</option>
          </select>
          <select
            className={styles.selectItem}
            name="year"
            id="year"
            defaultValue={year}
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
              <p>{translation[language].category}</p>
              <p>{translation[language].sum}</p>
            </div>
          </div>
          <di></di>
          {visible ? (
            <ul className={styles.list}>
              {DiagramaItem.map(({ name, total }, index) => (
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
            <p className={styles.ListEmpty}>{translation[language].list}</p>
          )}

          <div className={styles.totalList}>
            <p className={styles.totalListItem}>
              <span className={styles.result}>
                {translation[language].expenses}
              </span>
              <span className={styles.exp}>
                {Math.abs(dataBASE.expenseSummary)}
              </span>
            </p>
            <p className={styles.totalListItem}>
              <span className={styles.result}>
                {translation[language].income}
              </span>
              <span className={styles.income}> {dataBASE.incomeSummary}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagramTab;
