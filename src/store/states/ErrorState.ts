import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';

import { RootState } from '../configureStore';

export interface IError {
  id: number;
  message: string;
  code?: number;
  read: boolean;
}

interface IErrorState {
  list: IError[];
}

const initialState = {
  list: [],
} as IErrorState;

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    errorHappened: (state, action: PayloadAction<{ message: string; code?: number }>) => {
      if (action.payload.message) state.list.push({ ...action.payload, read: false, id: Math.max(...state.list.map((e) => e.id), 0) + 1 });
    },
    readErrors: (state, action: PayloadAction<{ id: number }[]>) => {
      action.payload.forEach((error) => {
        const index = state.list.findIndex((e) => e.id === error.id);
        if (index >= 0) state.list[index].read = true;
      });
    },
  },
});

export const { errorHappened, readErrors } = errorSlice.actions;

export default errorSlice.reducer;

export const getUnreadErrors = createSelector(
  (state: RootState) => state.error.list,
  (errors) => errors.filter((e) => !e.read)
);
