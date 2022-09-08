import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { AppDispatch, RootState } from '../configureStore';
import API from '../httpService';

const limit = 10;

interface IRecord {
  wrapperType?: string;
  kind?: string;
  artistId?: number;
  collectionId?: number;
  trackId?: number;
  artistName?: string;
  collectionName?: string;
  trackName?: string;
  collectionCensoredName?: string;
  trackCensoredName?: string;
  artistViewUrl?: string;
  collectionViewUrl?: string;
  trackViewUrl?: string;
  previewUrl?: string;
  artworkUrl30?: string;
  artworkUrl60?: string;
  artworkUrl100?: string;
  collectionPrice?: number;
  trackPrice?: number;
  releaseDate?: Date;
  collectionExplicitness?: string;
  trackExplicitness?: string;
  discCount?: number;
  discNumber?: number;
  trackCount?: number;
  trackNumber?: number;
  trackTimeMillis?: number;
  country?: string;
  currency?: string;
  primaryGenreName?: string;
  contentAdvisoryRating?: string;
  isStreamable?: boolean;
  collectionType?: string;
  amgArtistId?: number;
  copyright?: string;
  collectionArtistId?: number;
  collectionArtistName?: string;
  collectionArtistViewUrl?: string;
}

export interface IAPIResult {
  resultCount?: number;
  results?: IRecord[];
}

export type SearchEntityParameter = ('musicArtist' | 'song' | 'album')[];

interface ISearchState {
  term?: string;
  entity?: SearchEntityParameter;
  result: IRecord[];
  endOfRecords: boolean;
  isLoading: boolean;
}

interface INewSearch {
  term: string;
  entity: SearchEntityParameter;
}

const initialState = {
  entity: [ 'musicArtist', 'song', 'album' ],
  result: [],
  endOfRecords: true,
  isLoading: false,
} as ISearchState;

const createSearchURL = (parameters: { term: string; entity: SearchEntityParameter; offset?: number }) =>
  `/search?term=${encodeURI(parameters.term.replace(/[\s]/, '+'))}&entity=${parameters.entity.join(',')}&limit=${limit}${
    parameters.offset ? '&offset=' + parameters.offset : ''
  }&sort=recent`;

export const newSearch = createAsyncThunk<IAPIResult, INewSearch>('search/newSearch', async ({ term, entity }, thunkAPI) => {
  thunkAPI.dispatch(searchRenewed({ term, entity, isLoading: true }));
  return await API.get<IAPIResult>(createSearchURL({ term, entity }));
});

export const continueSearch = createAsyncThunk<
  IAPIResult,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('search/continue', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;

  const { entity, term, result } = state.search;
  if (!term || !entity || entity.length === 0 || !result) throw new Error('Search parameters not found');

  return await API.get<IAPIResult>(createSearchURL({ term, entity, offset: result.length + 1 }));
});

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchRenewed: (state, action: PayloadAction<Partial<ISearchState>>) => ({ ...initialState, ...action.payload }),
  },
  extraReducers: (builder) => {
    const setLoadingReducer = (isLoading: boolean) => (state: ISearchState) => {
      state.isLoading = isLoading;
    };

    const resultReceivedReducer = (state: ISearchState, action: PayloadAction<IAPIResult>) => {
      state.result.push(...(action.payload.results || []));
      state.endOfRecords = (action.payload?.resultCount || 0) < limit;
      state.isLoading = false;
    };

    builder.addCase(newSearch.pending, setLoadingReducer(true)).addCase(continueSearch.pending, setLoadingReducer(true));
    builder.addCase(newSearch.rejected, setLoadingReducer(false)).addCase(continueSearch.rejected, setLoadingReducer(false));
    builder.addCase(newSearch.fulfilled, resultReceivedReducer).addCase(continueSearch.fulfilled, resultReceivedReducer);
  },
});

const { searchRenewed } = searchSlice.actions;

export default searchSlice.reducer;
