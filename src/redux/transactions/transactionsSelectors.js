export const selectTransactions = state => state.transactions.items;
export const selectIsLoading = state => state.transactions.isLoading;
export const selectError = state => state.transactions.error;
export const selectTransactionCategories = state =>
  state.transactions.transactionCategories.items;
export const selectTransactionIsLoading = state =>
  state.transactionCategories.isLoading;

export const selectStatistic = state => state.transactions.summaryItems;
