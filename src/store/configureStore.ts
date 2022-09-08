import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { errorMiddleware } from './middleware/Error';
import searchReducer from './states/SearchState';
import errorReducer from './states/ErrorState';
import httpService from './httpService';

export const createNewStore = () => {
  const store = configureStore({
    reducer: { search: searchReducer, error: errorReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(errorMiddleware),
  });

  httpService.setup(store.dispatch);
  return store;
};

export const store = createNewStore();

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
